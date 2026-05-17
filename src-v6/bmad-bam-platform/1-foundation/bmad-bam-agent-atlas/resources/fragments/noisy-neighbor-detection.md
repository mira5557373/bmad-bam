---
id: noisy-neighbor-detection
title: Noisy Neighbor Detection
category: tenant-isolation
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [noisy-neighbor, slo, sla, p99, quota, rate-limit, observability, multi-tenant, isolation]
references:
  - "Google SRE Book (chapters on SLO/SLI design)"
  - "AWS Multi-Tenant SaaS Best Practices (whitepaper)"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/tenant-isolation-testing-patterns.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/limit-and-quota-design.md"
---

# Noisy Neighbor Detection

This fragment specifies the **test design vocabulary** for noisy-neighbor detection — the test specs in `test-catalogue.json#tests[]` whose `category: noisy-neighbor`. A noisy neighbor in multi-tenant SaaS is a tenant whose abnormal load degrades other tenants' SLAs without crossing security boundaries: a hot tenant's queries saturate the connection pool, a runaway analytics job blocks the database planner, a runaway inference call drains the GPU budget, a chatty integration explodes observability cardinality. None of these are "data leaks" — but all of them are isolation failures from the SLA-availability standpoint.

The tests in this category PROVE the platform's per-tier SLA preservation under deliberate abuse: when tenant_a sustains 4x normal load, tenant_b's p99 stays under the enterprise-tier budget. The catalogue entries (NN-001 through NN-005 in the default class library) target the five most-published noisy-neighbor failure modes from the post-incident record: connection-pool exhaustion, query timeout absence, observability cardinality explosion, cache thundering-herd, and the canonical "enterprise tenant degraded by free-tier tenant" SLA breach.

Severity for noisy-neighbor entries is **tier-dependent**: enterprise tenants have non-negotiable SLAs; mid-tier tenants have softer SLAs; entry-tier tenants have best-effort guarantees. The catalogue's step-02 reads `tier-model.json` (soft input) to assign severity per tier; absent tier-model, severity defaults to uniform `should-have`.

---

## When to Use

- **Any production multi-tenant deployment with tier-differentiated SLAs.** If the project has an enterprise tier with an SLA commitment (99.9% / p99 < 200ms / etc.), this test category is mandatory at QG-M2 sign-off. The catalogue's `coverage_report.noisy-neighbor.must_have ≥ 1` invariant enforces this when an enterprise-equivalent tier exists.

- **After any shared-resource introduction.** A shared cache layer, a shared inference cluster, a shared connection pool, a shared observability pipeline — each shared resource is a noisy-neighbor surface. Add tests when the resource ships.

- **After any tier-model change.** New tiers, removed tiers, or tier-SLA changes (e.g., enterprise tightens from p99 < 500ms to p99 < 200ms) require re-running this test class to confirm the platform meets the revised commitments under abuse.

- **Before contract negotiations with an enterprise customer.** Enterprise contracts typically include SLA-credit clauses (e.g., 1 hour of SLA breach = X% credit). Test evidence proves the contract is defensible.

- **After any change to rate-limiting, quota-enforcement, or per-tenant budgeting infrastructure.** These layers are the active defense against noisy neighbors; a regression in any of them silently invalidates SLA claims. Re-run on every PR touching these.

- **Quarterly at production-like scale.** Nightly synthetic-tenant runs (~100-1500 tenants, varied load profiles) catch SLA degradation that small-scale CI tests miss.

---

## When NOT to Use

- **Single-tier platforms with uniform best-effort SLA.** When the only SLA commitment is "best-effort", noisy-neighbor tests are not blocking — the platform has made no formal commitment to preserve. Document the choice; consider downgrading severity to `nice-to-have`.

- **Per-customer dedicated installs.** A per-tenant dedicated cluster has no shared resources; noisy-neighbor is not applicable. Test for cluster-level overload instead (queue depth, pod CPU saturation).

- **Read-only analytics replica with no tenant write path.** Read-only replicas have a different noisy-neighbor surface (replica-lag under upstream-tenant write storm; analytics query runaway). Use those-model-specific tests; not this category.

- **Prototype / PoC before tier-model lock.** Before tier-model is committed, the SLA targets are aspirational. Defer this test class until tier-model lock.

---

## Architecture: noisy-neighbor surface enumeration

The five canonical noisy-neighbor surfaces map to NN-001 through NN-005 in the default catalogue class library.

### NN-001: enterprise-p99-under-free-tier-flood

**Surface.** The headline test: a free-tier tenant sustains 4x normal request load; an enterprise-tier tenant simultaneously runs normal traffic; assert enterprise p99 stays under enterprise SLA.

**Why this matters.** This test is the SLA-defensibility evidence. Enterprise contracts typically include "your tenants do not degrade due to other tenants" language; this test demonstrates compliance.

**Evidence signature.** `enterprise p99 < SLA threshold while free tier sustains 4x normal load`

**Test logic (specification — actual test code generated by BMM):**

```
1. Provision 3 tenants: free_a, free_b, enterprise_c
2. Generate sustained load from free_a: 4x normal RPS for 60s
3. Concurrently, measure enterprise_c p99 over the same 60s window for normal traffic
4. Assert enterprise_c p99 < enterprise_tier_sla_p99_ms
5. Assert free_a's load was actually applied (sanity check; failed-to-load runs invalidate the test)
```

### NN-002: per-tenant-connection-pool-cap-enforced

**Surface.** Connection-pool exhaustion is the most-published noisy-neighbor failure mode in the database-backed SaaS literature. A tenant that opens connections without releasing (or whose query pattern requires high concurrent connections) starves other tenants of pool capacity.

**Why this matters.** Without per-tenant pool caps, one tenant can consume the entire pool and effectively black-hole all other tenants.

**Evidence signature.** `tenant exceeding pool cap receives 429; other tenants' pool unaffected`

**Test logic:**

```
1. Configure per-tenant pool cap (e.g., 20 connections per tenant in a 200-connection pool)
2. Tenant_a opens 25 connections concurrently
3. Assert: connections 21-25 receive 429 (or queue and timeout)
4. Tenant_b acquires a connection within budget; succeeds with normal latency
5. Assert: tenant_b's request not blocked by tenant_a's storm
```

### NN-003: per-tenant-query-timeout-enforced

**Surface.** A runaway query (recursive CTE, missing index, cartesian join) consumes resources until it times out. Without per-tenant query timeouts, the runaway can hold a connection + planner cache + shared buffers for minutes.

**Why this matters.** Long-running queries from one tenant degrade the database planner cache for all tenants. Postgres planner stats are global; replanning under cache pressure adds latency platform-wide.

**Evidence signature.** `runaway query terminated at tenant timeout; replanner not triggered for peers`

**Test logic:**

```
1. Configure per-tenant query timeout (e.g., 30s for free, 120s for enterprise)
2. Tenant_a issues a query that would run > timeout
3. Assert: query terminated at tenant timeout boundary (statement_timeout error)
4. Concurrently, tenant_b's normal queries observe normal p99
5. Assert: planner stats not invalidated (test by p99 stability)
```

### NN-004: observability-cardinality-bounded-per-tenant

**Surface.** Metric cardinality explosion: a tenant uses high-cardinality tag values (per-user UUIDs as Prometheus labels, per-request ids in StatsD tags), inflating the time-series database. Once the metric backend's series limit is hit, all metrics across all tenants degrade or get dropped.

**Why this matters.** Observability cardinality is a global shared resource; one tenant's poor practice degrades visibility for all tenants — including incident response visibility.

**Evidence signature.** `per-tenant metric-series count capped; runaway tenant cannot blow up observability`

**Test logic:**

```
1. Configure per-tenant cardinality cap (e.g., 10,000 unique label combinations per tenant per hour)
2. Tenant_a emits 100,000 metric events with unique label values
3. Assert: cardinality enforcer drops events after 10,000 unique combinations
4. Assert: tenant_b's metrics continue to flow normally
5. Assert: alert fires for tenant_a's cardinality overflow
```

### NN-005: shared-cache-thundering-herd-bounded

**Surface.** Cache-miss thundering-herd: tenant_a's hot dataset gets invalidated; many requests miss the cache simultaneously; all stampede the upstream (database, model server, third-party API); the upstream saturates; other tenants whose cache happens to be cold also stampede; cascading failure.

**Why this matters.** Cache layers are shared. A noisy tenant's cache miss can degrade other tenants' cache hit rates by saturating the upstream.

**Evidence signature.** `cache-miss storm from one tenant bounded; other tenants' p99 unchanged`

**Test logic:**

```
1. Pre-warm cache for tenant_a + tenant_b
2. Invalidate tenant_a's cache entirely (simulate eviction)
3. Generate 1000 concurrent requests for tenant_a's data (would all miss + stampede)
4. Concurrently, tenant_b issues normal traffic (cache-hit baseline)
5. Assert: tenant_b's cache-hit rate stays high; tenant_b's p99 unchanged
6. Assert: upstream service did NOT receive 1000 concurrent requests (singleflight / coalescing worked)
```

---

## Trade-offs

| Test design choice | Pro | Con |
|---|---|---|
| Use real load generator (k6, locust) vs. synthesized | Reproduces realistic failure modes | CI cost; load-generator infrastructure |
| Run on per-PR vs. nightly only | Catches regressions immediately | CI runtime cost (~5-10 min for full noisy-neighbor suite at 100 tenants) |
| Measure p99 vs. p95 vs. p999 | p99 standard for enterprise SLA | p99 sample noise; need adequate sample count |
| Assert absolute thresholds vs. relative regression | Absolute matches contract language | Brittle to environment performance variation |
| Synthesize tenants vs. use production-like fixtures | Predictable, controlled scenarios | May miss interaction effects with real data shapes |

---

## Quality Checks

- **CRITICAL:** Per-tier SLA MUST be tested under worst-case lower-tier abuse; enterprise SLA breach is non-negotiable.

- **Severity follows tier-model.** Catalogue assigns severity per tier: enterprise → `must-have`; mid-tier → `should-have`; entry-tier → `nice-to-have`. Tier-model upstream is the source-of-truth; if tier-model absent, default to uniform `should-have` per spec §2.0 soft-input fallback policy.

- **SLA thresholds version-controlled.** The numeric thresholds (p99 ms, RPS, pool cap, cardinality cap) live in the project's tier-model.json schema 1.1 OR in a sibling SLA-thresholds.yaml. The test reads thresholds at test time, not hard-coded. This lets tier-renegotiation flow into tests without test-code changes.

- **Test environment matches production scale-of-shape.** A noisy-neighbor test against 3 tenants doesn't surface the planner-cache cliff or the cardinality cap (caps may be set at 10k+ tenants worth of cardinality budget). Nightly synthetic run at 100-1500 tenants is the mitigation.

- **Test failures name the degraded tier + the degradation magnitude.** Required: `tenant_b (enterprise tier) p99 = 287ms exceeded enterprise SLA threshold 200ms under tenant_a (free tier) 4x load`. Rejected: `AssertionError: 287 > 200`.

- **Per-tenant budget metrics are emitted.** The platform exposes per-tenant consumption metrics (current pool usage, current rate-limit window, current inference budget remaining). The test asserts these metrics exist + are accurate, not just that the budget limit is enforced.

- **Quota-exceeded responses are structured.** A 429 with `Retry-After` header + JSON body `{error: "tenant_quota_exceeded", quota: "connection_pool", limit: 20, current: 25, retry_after_seconds: 5}` is the contract. Test asserts response shape, not just status code.

- **Graceful degradation precedes hard rejection.** Best-practice noisy-neighbor handling: at 80% budget, queue or rate-shape; at 100%, reject with 429. Test asserts the warning band exists and behaves correctly, not just the hard-reject band.

- **Tenant_a's abuse traffic is sanity-checked.** Some test failures look like "tenant_b stayed fast under tenant_a abuse" but actually mean "tenant_a's abuse never landed because the load generator failed". Test must assert tenant_a actually achieved the abuse-RPS before asserting tenant_b's preservation.

- **Alert firing is part of the test.** When tenant_a hits 80% of a budget, the operational alert MUST fire. Test asserts the alert was emitted (via a test-mode alert receiver). An ungated noisy-neighbor that doesn't surface to ops is half-isolated.

---

## Web Research Queries

Refresh empirical inputs annually. Replace `{date}` with current year.

- `multi-tenant SaaS noisy neighbor {date}` — post-incident write-ups + best-practices articles. Highest-signal source. Stripe, Heroku, Render, Supabase, Shopify all publish in this space.
- `SLO SLI multi-tenant p99 {date}` — SRE-community articles on SLA-target setting for multi-tenant platforms.
- `connection pool tenant isolation {date}` — pgbouncer, RDS Proxy, pgcat operational patterns. Refresh per-tenant cap configurations.
- `Postgres statement_timeout multi-tenant {date}` — per-tenant query timeout patterns + production guidance.
- `Prometheus cardinality limit per tenant {date}` — observability cardinality enforcement patterns; relevant to NN-004.
- `cache stampede thundering herd singleflight {date}` — cache-coalescing patterns; relevant to NN-005.
- `AWS SaaS Lens noisy neighbor {date}` — AWS reference architectures for noisy-neighbor mitigation.
- `rate limit per tenant SaaS {date}` — rate-limiting design patterns; relevant to QUO-* category and NN-002.

---

## Cross-references

**Companion fragments:**
- [[tenant-isolation-testing-patterns]] — the broader testing context this fragment lives within; NN-* tests align with the `noisy-neighbor simulation tests` section there
- [[limit-and-quota-design]] — the design-side fragment for per-tenant budget enforcement; this fragment is the test-side
- [[isolation-test-evidence-signatures]] — sibling fragment specifying the machine-parseable evidence_signature standards this fragment's tests conform to
- [[rls-bypass-test-design]] — sibling fragment; RLS deployments need both categories (this and rls-bypass)
- [[tier-design-principles]] — upstream tier-model design; this fragment reads tier-model.json for severity assignment

**Glossary:**
- `noisy-neighbor` (P3.2 glossary; new entry) — defines the term this fragment's tests prove against

**Quality gate:**
- `QG-M2` v1.1.0 — C1 (universal isolation) and C6 (per-tier SLA preservation under abuse, new in v1.1.0) source from this fragment's must-have entries

**Schemas:**
- `test-catalogue.json` schema (spec §3.4) — `tests[*]` with `category: noisy-neighbor` populate from this fragment's enumeration; severity assigned per tier-model

**Downstream consumers:**
- `bmad-bam-design-multi-tenant-testing` step-02 — loads noisy-neighbor test classes from this fragment's catalogue
- `bmad-bam-design-tenant-tier-model` (upstream) — tier-model.json's tier-list informs severity assignment
- BMM `bmad-qa-generate-e2e-tests` (via BAM overlay) — generates actual test files

**Upstream specs:**
- `docs/superpowers/specs/2026-05-17-p3-2-lifecycle-design.md` §3.4 (schema), §5.1.1 (fragment registration), §2.0 (soft-input fallback policy)
