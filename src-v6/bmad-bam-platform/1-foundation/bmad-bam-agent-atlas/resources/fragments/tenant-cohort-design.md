---
id: tenant-cohort-design
title: Tenant Cohort Design for Progressive Rollouts
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [deployment, cohorts, canary, multi-tenant, stickiness]
references:
  - "https://martinfowler.com/articles/patterns-of-distributed-systems/sticky-routing.html"
  - "AWS Well-Architected Framework — Operational Excellence Pillar"
  - "Google SRE Workbook, Chapter 16 — Canarying Releases"
---

# Tenant Cohort Design for Progressive Rollouts

A **cohort** is a deliberate grouping of tenants that share the same rollout schedule. Cohorts are the *unit of progressive delivery* in a multi-tenant SaaS: a 5% canary means "5% of cohorts," not "5% of arbitrarily-selected requests." Cohort design determines whether your canary surfaces real signal (because it represents a coherent slice of behavior) or noise (because it splits a tenant across versions and corrupts both halves of the comparison).

This fragment is consumed by `design-deployment-topology` (skill) immediately after a primary rollout strategy is chosen, and by every subsequent operational skill that must reason about *which* tenants are on *which* version.

---

## When to Use

Apply explicit cohort design when:

- **The platform serves more than 50 tenants.** Below this scale, ad-hoc tenant selection ("ship to acme-corp first") is cheaper than a cohort framework. Above it, the question "which tenants got v1.7 yesterday?" becomes unanswerable without an explicit cohort registry.

- **You use canary, blue-green, or feature-flag rollouts.** All three strategies need a *target* — and the target is a cohort. Without cohort design, you end up with implicit cohorts (e.g., "whatever tenants happened to hit the new pods") that are unrepeatable and unauditable.

- **Tenants vary materially in tier, region, or workload.** A 5% sample of a heterogeneous tenant population is meaningless if all 5% are free-tier hobbyists while your paying customers run the old version. Cohorts encode the *stratification* needed for meaningful comparison.

- **You have enterprise tenants with rollout pinning rights.** Enterprise contracts often include "we go last" or "we require pre-deploy notice." Cohort design is the mechanism that makes this contractual promise into operational reality.

- **Compliance requires deterministic deployment evidence.** "Which tenant ran which version on which date" is a SOC 2 / ISO 27001 audit artifact. Cohorts make this query a primary-key lookup; without cohorts it is forensic archaeology.

- **You run experiments (A/B tests, dark launches).** Experimentation infrastructure overlaps heavily with cohort infrastructure. Designing cohorts well once pays dividends across both.

---

## When NOT to Use

Skip explicit cohort design when:

- **You have one tenant.** A dedicated-instance product has no cohort question; it has a maintenance-window question.

- **You deploy quarterly and notify everyone.** A waterfall release notified by email does not need cohort plumbing; it needs a calendar.

- **The platform has <10 tenants.** A 10-tenant platform should keep the cohort list in a Google Doc, not engineer a cohort framework. Premature cohort sophistication is a familiar over-engineering trap.

- **You run all tenants on a shared cell with no shaping.** If the infrastructure cannot route traffic per-tenant, cohort design has no executor. Fix the infrastructure first (cross-reference `[[cell-based-architecture]]`).

- **Cohort assignment would leak business-sensitive information.** If exposing "tenant X is in the early-canary cohort" would damage a relationship, the cohort scheme must be private — and possibly the cohort idea is the wrong tool for that particular rollout.

---

## Architecture

### Four cohort strategies

| Strategy | Assignment basis | Stickiness | When to use |
|---|---|---|---|
| **By-tier** | Tenant.tier ∈ {free, pro, enterprise, dedicated} | Naturally sticky (tier rarely changes) | Tier-mapped rollout speeds (see `[[rollout-strategies-comparison]]`) |
| **By-region** | Tenant.primary_region | Naturally sticky (region rarely changes) | Region-by-region rollouts; residency-sensitive deploys |
| **By-explicit-list** | Curated list per cohort (e.g., friendly tenants first) | Sticky by design | Beta programs, design-partner pilots, enterprise opt-in |
| **By-tenant-hash** | `hash(tenant_id) % N` | Mathematically sticky (deterministic) | Statistical sampling when no business signal applies |

In practice, real systems use a **composition** of these:

```
cohort_assignment(tenant) =
  if tenant.opt_in_beta: "beta"
  elif tenant.tier == "enterprise": "enterprise-last"
  elif tenant.primary_region == "eu-west-1": "eu-cohort"
  else: hash_cohort(tenant.id, num_buckets=10)
```

### The stickiness invariant

**Stickiness** is the property that a given tenant always lands in the same cohort across rollouts of the same strategy. Without stickiness, a tenant can experience version-thrashing: hits v1.7 on Monday, v1.6 on Tuesday, v1.7 on Wednesday — which corrupts both their experience and your metrics.

Stickiness is **not the same as immutability**. A tenant can be *moved* between cohorts (e.g., upgraded to enterprise, opted into beta) — but that move is a discrete event recorded in the cohort registry, not a function of dice. The invariant is: within a single rollout window, no tenant changes cohort.

### Cohort registry

The cohort registry is a versioned data store. Conceptually:

```yaml
tenant_id: acme-corp
cohort_history:
  - effective: 2026-04-01T00:00:00Z
    cohort: enterprise-last
    reason: "tier upgrade to enterprise"
  - effective: 2026-05-15T00:00:00Z
    cohort: beta
    reason: "opt-in to beta program (ticket #4421)"
current_cohort: beta
```

Routing layer reads `current_cohort` at request-time; analytics reads `cohort_history` to attribute events.

### Diagram — cohort composition for a 4-tier rollout

```
        ┌────────────────────────────────────────────┐
        │              All Tenants                   │
        └────────────────────┬───────────────────────┘
                             │
            ┌────────────────┼─────────────────┐
            ▼                ▼                 ▼
       ┌────────┐       ┌────────┐       ┌──────────┐
       │  Beta  │       │  Free  │       │  Pro     │
       │  (5)   │       │  hash  │       │  hash    │
       │opt-in  │       │ %10    │       │  %4      │
       └────┬───┘       └───┬────┘       └────┬─────┘
            │               │                 │
            │               ▼                 ▼
            │     bucket-0..bucket-9   bucket-0..bucket-3
            │
            ▼
   ┌─────────────────┐
   │  Enterprise-    │
   │  Last           │
   │  (explicit-list)│
   └─────────────────┘

Rollout order:    beta  →  free.bucket-0  →  free.bucket-1..9
                        →  pro.bucket-0   →  pro.bucket-1..3
                        →  enterprise-last (after T+72h of pro at 100%)
```

---

## Trade-offs

| Dimension | Pro (explicit cohorts) | Con (explicit cohorts) |
|---|---|---|
| **Signal quality from canary** | Stratified sampling yields meaningful comparisons; cohort = statistical unit. | Cohort design requires understanding tenant variance; getting it wrong (e.g., omitting region) produces confounded metrics. |
| **Contractual fulfillment** | Enterprise "we go last" promises become deterministic. | Each contractual cohort is an exception in the registry; cohort schema accumulates one-offs. |
| **Operational evidence** | "Tenant X on version Y on date Z" is one query. | Registry is now a critical system; corruption is a high-severity incident. |
| **Rollback containment** | Bad deploy contained to current-rollout-cohort. | Cross-cohort issues (e.g., shared dependency) escape containment; cohorts are not bulkheads by themselves. |
| **Experimentation reuse** | Same cohort plumbing powers A/B tests. | Conflating rollout-cohort with experiment-cohort can confound both; separate registries for production-rollout vs experiments. |
| **New-tenant onboarding** | Cohort-assignment-on-create is a one-line policy. | A platform of millions of tenants will spend non-trivial CPU on cohort routing; cache aggressively. |

---

## Implementation Patterns

### 1. Cohort assignment on tenant creation

When a tenant is created, the platform must assign a cohort *immediately* and record it in the registry. Late assignment (computed on first request) creates a window where the same tenant hits different cohorts depending on which routing layer evaluates them first.

```python
def on_tenant_created(tenant):
    cohort = compute_cohort(tenant)
    cohort_registry.write(
        tenant_id=tenant.id,
        cohort=cohort,
        effective=now(),
        reason="tenant_created",
    )
```

### 2. Cohort lookup in the routing layer

The routing layer (load balancer, service mesh, edge function) reads cohort *before* version selection:

```python
def route_request(req):
    tenant_id = req.tenant_id  # from auth context
    cohort = cohort_registry.get(tenant_id)  # cached, sub-ms
    version = rollout_plan.version_for(cohort)
    return route_to(version, req)
```

### 3. Cohort migration as an audited event

Changing a tenant's cohort is an audited event with a reason and an effective-time:

```python
def migrate_cohort(tenant_id, new_cohort, reason, ticket=None):
    cohort_registry.write(
        tenant_id=tenant_id,
        cohort=new_cohort,
        effective=now(),
        reason=reason,
        ticket_ref=ticket,
    )
    emit_audit_event("cohort.migrated", ...)
```

No silent reassignments. Ever.

### 4. Cohort governance per region/residency

For data-residency obligations, cohort-by-region must align with the residency policy. A tenant pinned to eu-west-1 cannot be in a us-east-1-only canary cohort. Cross-reference `[[tenancy-decision-framework]]` for the residency framework.

### 5. Cohort observability

Every metric, log, and trace carries a `cohort_id` tag. Dashboards filterable by cohort make rollout health visible per-cohort, which is the only level at which canary signal is meaningful.

---

## Quality Checks

- **CRITICAL:** tenant cohort assignment is **sticky** — within a rollout window, the same tenant goes to the same cohort across every routing decision. Non-sticky cohort assignment (e.g., randomized per-request) corrupts canary signal because a single tenant's requests get split across versions, contaminating both halves of the comparison and rendering A/B inference invalid. Stickiness is enforced by (a) writing cohort at tenant-creation, (b) caching cohort with the auth context, (c) banning runtime randomization in routing. A platform that cannot prove stickiness via audit query cannot use cohort-based canaries — full stop.

- **Cohort registry is versioned and audit-logged.** Every cohort change records who, why, when. Silent edits create unreproducible incidents.

- **Cohort assignment runs on tenant-create, not on first request.** Late assignment has a race-window where the same tenant can resolve to different cohorts in parallel routing layers.

- **Enterprise tenants always go last by default.** Contracts can override (an enterprise tenant may *request* beta participation), but the default is *last*. Mis-routing an enterprise tenant into early canary is a SEV-1 incident in most B2B contracts.

- **Cohort schema versions explicitly.** Adding a new cohort dimension (e.g., adding "by-feature-flag-group") is a schema change requiring registry migration. Ad-hoc cohort dimensions create unmaintainable registries.

- **Cohort coverage is 100%.** Every active tenant has exactly one cohort assignment. An uncohorted tenant is undeployable — they will either be missed (stay on old version forever) or be hit by every canary (worst-of-both-worlds).

- **Cross-cohort dependency tracking.** A shared service (e.g., a centralized search index) consumed across cohorts is *not* contained by cohort-rollout. Document these dependencies; canary-the-dependency-first is the answer.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh cohort design practice:

- `tenant cohort canary rollout SaaS multi-tenant {date}` — practitioner write-ups; LinkedIn Engineering and Slack Engineering are reliable sources.
- `sticky routing tenant deployment patterns {date}` — finds the routing-layer mechanics.
- `progressive delivery cohort stratification {date}` — covers stratified sampling for canary analysis.
- `feature flag targeting rules per-tenant {date}` — overlap with cohort design for feature-flag rollouts.
- `data residency tenant routing multi-region {date}` — cohort + residency intersection.
- `enterprise customer deployment notification SLA {date}` — surfaces the "we go last" contractual pattern.

Treat content older than 30 months as orientation; cohort terminology is stabilizing but tooling shifts.

---

## Cross-references

**Companion fragments (Task 9):**

- [[rollout-strategies-comparison]] — strategy answers *how much*; cohort answers *whose*.
- [[rollback-strategies]] — cohort containment determines rollback blast-radius.
- [[zero-downtime-migrations]] — schema migrations must respect cohort routing.

**Atlas existing fragments:**

- [[cell-based-architecture]] — cells and cohorts often align; one cell per cohort is a common pattern.
- [[tenancy-decision-framework]] — residency constraints inform cohort design.
- [[evolutionary-architecture]] — cohort stickiness can be enforced via fitness function.

**Anti-patterns:**

- [[deployment-without-cohorts]] (forthcoming, Task 12) — the failure mode this fragment prevents.
- [[silent-tenant-reassignment]] (forthcoming) — cohort migration without audit.

**Quality gate:**

- `QG-F1` (foundation) — a foundation design without a cohort policy fails QG-F1 if the platform uses progressive rollouts.

**Upstream specs:**

- `docs/v6-final-architecture.md` §3.Q3 (cohort design references), §6.3 (fragment schema).
- Google SRE Workbook, chapter 16 (canary cohorts).

**Downstream consumers:**

- `design-deployment-topology` skill (P3.1) — primary consumer.
- `design-finops-model` skill — cohort-tagged cost reports inherit from cohort registry.
