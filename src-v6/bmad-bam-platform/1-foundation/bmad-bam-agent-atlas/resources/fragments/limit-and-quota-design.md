---
id: limit-and-quota-design
title: Limit and Quota Design
category: tenant-tier-model
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
references:
  - "https://cloud.google.com/architecture/rate-limiting-strategies-techniques"
  - "https://stripe.com/docs/rate-limits"
  - "https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting"
tested_against: []
---

# Limit and Quota Design

A foundation fragment for `bmad-bam-design-tenant-tier-model` covering the **quantitative** dimension of tiers: how many seats, how many API calls per second, how much storage, how much compute. Limits are where tier design meets infrastructure economics — they are the primary defense against runaway tenants and the primary signal for upgrade conversations.

This fragment focuses on **what limits to set and what happens at the limit**. The mechanics of enforcing entitlements (boolean: feature on/off) live in [[feature-gating-patterns]]. The economics of tier transitions live in [[tier-transition-economics]].

---

## When to Use

Apply when designing or restructuring quantitative limits per tier. Concrete triggers:

- **Pre-launch tier model definition.** Each tier needs limits before launch; without them, all tenants effectively have infinite quotas and your unit economics are upside-down.

- **First runaway-tenant incident.** A single tenant has consumed N× the next-largest tenant's resources, and your AWS bill spiked. The fix is rate limits + quotas, not "talk to the customer" (which fails the second time it happens).

- **Tier-cliff abuse pattern observed.** Customers are buying multiple lower-tier accounts because the upgrade ratio is too steep. Limits should be re-tuned so the upgrade has a smooth motivation curve.

- **New compute-heavy or AI feature launch.** AI inference, vector search, and similar compute-heavy features can blow up cost-per-tenant 10×. Limits prevent the first runaway.

- **Compliance or SLA implication.** A customer's contract specifies a guaranteed throughput. The limit design must enforce that minimum (not just the maximum) — guaranteeing throughput against noisy neighbors is a per-tier capacity allocation problem.

---

## When NOT to Use

- **Flat-rate enterprise-only product.** No tiers, no need for graduated limits. A single global rate limit suffices.
- **Pre-revenue prototype.** Hardcode a generous limit. Designing the full quota matrix burns time better spent on PMF.
- **Limit already enforced upstream.** If your cloud provider (e.g., a third-party API you proxy) enforces limits, do not duplicate. Reflect their limits at your tier boundaries.

---

## Decision Inputs

| Input | Type | Required | Source | Notes |
|---|---|---|---|---|
| `dimensions_to_limit` | enum set | yes | product + finops | Subset of `{seats, api_calls, storage_bytes, compute_seconds, sessions, events_emitted, model_tokens, integrations, webhook_events}`. |
| `current_usage_distribution` | per-dimension | yes | telemetry | P50, P90, P99 per dimension per current tier. |
| `cost_per_unit` | per-dimension | yes | finops | Marginal cost to serve one more of each unit. |
| `tenant_count_per_tier` | integer | yes | billing | How many tenants on each tier today. |
| `slo_committed_throughput` | per-tier | recommended | sales contracts | Throughput minimums committed in contracts. Differs from limit (maximum). |
| `noisy_neighbor_history` | enum | recommended | incidents | `{none, occasional, frequent}`. |

---

## Limit Categories

Limits fall into several categories, each with different policy implications.

### Category 1: Static quotas (per-period absolute)

**Examples:** "5 seats per workspace", "100 GB storage", "10,000 events per month".

**Reset cadence:** lifetime, daily, monthly, or rolling-window.

**Implementation:** counter table or aggregation query; enforce at write time.

**Policy at limit:** typically hard-stop (return 4xx) with upgrade prompt. Some products allow soft-block with admin override.

### Category 2: Rate limits (per-second / per-minute throughput)

**Examples:** "100 API calls per second", "10 webhook deliveries per minute".

**Implementation:** token bucket, leaky bucket, or sliding window. Redis is the typical store.

**Policy at limit:** throttle (return 429 with `Retry-After`) or queue (process later, may violate latency SLO). Throttle is more common.

### Category 3: Concurrency limits (in-flight maximums)

**Examples:** "5 concurrent jobs", "100 concurrent connections".

**Implementation:** semaphore or in-flight counter.

**Policy at limit:** reject with 503 or queue with timeout.

### Category 4: Composite or derived limits

**Examples:** "300 model tokens per hour" (compute × time), "egress bytes per day" (network × time).

**Implementation:** depends on the composing dimensions; typically a metering pipeline writes to a counter consulted at request time.

**Policy at limit:** varies; often overage charges rather than hard-stop.

### Category 5: Floors (guaranteed minimums)

**Examples:** "guaranteed 100 req/s baseline", "guaranteed 99.9% uptime per tenant".

**Implementation:** capacity reservation at infrastructure layer; per-tenant connection pool guarantees; dedicated cells for the tenant.

**Policy:** floors are *what you deliver*, not what you limit. They constrain how *upper* limits (other tenants) are set so the floor remains achievable under contention.

---

## Policy Catalog: What Happens at the Limit

Every limit needs an explicit at-limit policy. The catalog:

### P1: Hard-stop

Return 4xx (typically 429 or 403). Operation does not happen. Customer must upgrade or wait until reset.

**Fit:** seats, storage (write blocked but reads continue), event counts.

**UX:** clear error message with link to billing/upgrade.

**Failure mode:** customer experiences feature unavailability, may churn.

### P2: Throttle (delay)

Slow operations so total throughput stays under the limit. Implemented as token bucket or queue.

**Fit:** API rate limits, webhook delivery.

**UX:** 429 with `Retry-After` header; SDK retries automatically.

**Failure mode:** latency spikes; client timeouts if `Retry-After` not respected.

### P3: Soft-block with grace

Allow N% overage for N hours before hard-stop. Sends notification immediately.

**Fit:** storage, seats (grace lets the admin onboard people, then upgrade).

**UX:** banner notification; degraded but working.

**Failure mode:** grace becomes the de-facto limit; tenants game it.

### P4: Overage billing

Allow unlimited use; bill for usage above the limit.

**Fit:** API calls in metered pricing, compute seconds, model tokens.

**UX:** dashboard shows current overage cost; billing line items at month-end.

**Failure mode:** bill shock; customer disputes; cap is needed to prevent runaway cost.

### P5: Queue with eventual processing

Accept the request, queue it, process when capacity allows.

**Fit:** background jobs, batch processing, webhooks.

**UX:** "your request is processing" rather than 429.

**Failure mode:** queue depth grows under sustained overload; latency SLO violated for queued items.

### P6: Best-effort degradation

Service the request with reduced quality (lower precision, smaller result set, cached response).

**Fit:** search results (return fewer), AI inference (use smaller model), analytics queries (sample).

**UX:** results returned but flagged as degraded.

**Failure mode:** customers may not notice degradation until reviewing results; reputational risk if degradation is silent.

**CRITICAL:** every limit has a documented "what happens at the limit" (rate-limit / throttle / hard-stop / overage charge). A limit without a documented at-limit policy is not a limit — it is a hope that customers stay under, plus an undefined behavior when they do not. The at-limit policy is part of the customer contract (visible in pricing pages, API docs, error responses) and the operational runbook (what dashboards alert, what support tickets escalate to what queue). Undocumented at-limit behavior is the source of every "I thought we paid for unlimited" support ticket.

---

## Per-Tier Limit Matrix (Worked Example)

A typical B2B SaaS limit matrix:

| Dimension | Free | Pro | Business | Enterprise |
|---|---|---|---|---|
| Seats | 3 | 10 | 50 | Custom |
| API calls / minute | 60 | 300 | 1,200 | Custom |
| API calls / month | 10K | 200K | 2M | Custom |
| Storage | 1 GB | 50 GB | 500 GB | Custom |
| Webhooks / day | 100 | 5K | 50K | Custom |
| Concurrent jobs | 1 | 5 | 20 | Custom |
| Audit log retention | 7 days | 30 days | 1 year | 7 years |
| Tier-to-tier multiplier (seats) | — | 3.3× | 5× | — |

Tier-to-tier multipliers should generally fall in 3–5× per [[tier-cliff-avoidance]]. The "Enterprise: Custom" row is intentional — Enterprise contracts often set limits per deal.

---

## Trade-offs

| Limit type | Pros | Cons |
|---|---|---|
| **Hard-stop** | Predictable cost ceiling; clear upgrade signal. | Blocks customer mid-flow; risk of churn at the wrong moment. |
| **Throttle** | Smooth degradation; clients can retry. | Latency spikes; harder to diagnose. |
| **Soft-block with grace** | Friendly UX; admin gets a chance to upgrade. | Grace becomes the new limit; effective limit is higher than advertised. |
| **Overage billing** | No artificial blocks; revenue captures spike. | Bill shock; requires cap or alerting. |
| **Queue** | No request loss; works for async workloads. | Queue depth as a hidden failure mode. |
| **Degradation** | Service stays up; user gets *something*. | Silent quality drop; reputational risk if undetected. |

A good limit set uses a mix: hard-stop on seats and storage (predictable), throttle on rate (smooth), overage on metered compute (revenue capture), degradation on AI inference under load (operational safety).

---

## Quality Checks

- **CRITICAL:** every limit has a documented at-limit policy in (a) pricing page, (b) API docs / error message, (c) operational runbook. If any of the three is missing, the limit is incomplete.
- **Limits validated against current usage distribution.** P90 of current tenants on a tier should fit under the tier's limit; if not, the tier limit is too low (or the tier is mis-sized). P99 of one tier should map to P50 of the next tier.
- **Tier-to-tier multipliers are ≤ ~5×.** Larger jumps trigger tier-cliff abuse. See [[tier-cliff-avoidance]].
- **Cost-per-unit known for every metered dimension.** Without it, overage pricing is speculation. From [[per-tenant-cost-attribution-with-hooks]].
- **Floors compatible with upper-limit summation.** If you guarantee 100 req/s per tenant and have 1,000 tenants on a 10,000 req/s cluster, you have over-committed by 10×. Check the math.
- **Reset cadence documented.** When does a monthly counter reset? UTC midnight on the 1st? Customer's billing-anchor day? Inconsistency causes support escalations.
- **Test coverage at boundaries.** Test 1 below, 1 above, 100× above each limit. The 100× case is what catches the runaway-tenant failure mode.
- **Dashboards expose current usage per tenant per dimension.** Operational visibility into "who is close to a limit" is the difference between proactive upgrade conversations and reactive support escalations.
- **Alerting at 80% utilization to the tenant's admin.** Customers should know they are approaching a limit before they hit it; surprise hard-stops generate churn.
- **Limit names appear in upgrade emails and dashboards.** "You used 95% of your monthly API calls" is a much better upgrade conversation than "you got 429s".
- **Audit log on quota changes.** Who increased tenant X's limit beyond their tier, when, why.

---

## Web Research Queries

- `API rate limiting strategies SaaS {date}` — token bucket, sliding window, etc.
- `SaaS quota design best practices {date}` — vendor guidance.
- `at limit behavior 429 throttle hard stop {date}` — at-limit policy patterns.
- `Stripe rate limit headers Retry-After {date}` — reference implementation.
- `multi-tenant noisy neighbor mitigation {date}` — how limits protect tenants from each other.
- `overage pricing SaaS metering {date}` — overage billing design.
- `quota reset cadence billing anchor {date}` — reset-period design.

---

## Cross-references

**Companion fragments:**

- [[tier-design-principles]] — tier boundaries; this fragment is the *quantitative* dimension.
- [[feature-gating-patterns]] — boolean-feature gating mechanics.
- [[tier-transition-economics]] — what limits change during a tier upgrade.
- [[tier-cliff-avoidance]] — keeping limit ratios within bounds.
- [[per-tenant-cost-attribution-with-hooks]] — cost-per-unit data.
- [[budget-alerts-and-quotas]] — cost-side companion (alerting on spend).

**Anti-patterns:**

- [[tier-cliff]] — when limit ratios are too steep.

**Quality gate:**

- `QG-F1` — foundation gate including limit-policy completeness.

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3.
