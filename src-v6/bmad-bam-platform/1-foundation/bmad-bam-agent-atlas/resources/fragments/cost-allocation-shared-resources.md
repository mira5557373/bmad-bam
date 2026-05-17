---
id: cost-allocation-shared-resources
title: Cost Allocation for Shared Resources
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [finops, cost-allocation, overhead, shared-infrastructure, multi-tenant]
references:
  - "FinOps Foundation, Cloud FinOps (O'Reilly, 2nd ed., 2023)"
  - "https://www.finops.org/framework/capabilities/cost-allocation/"
  - "AWS Cost Categories documentation"
  - "https://cloud.google.com/billing/docs/how-to/cost-table"
---

# Cost Allocation for Shared Resources

Some infrastructure does not trace cleanly to a single tenant. A control-plane Postgres database holds metadata for every tenant; a Prometheus server scrapes metrics from every cell; a security-audit pipeline runs for the platform as a whole. These costs are real — they appear on the cloud bill — and they must be allocated to tenants for unit economics to add up. **Shared-resource allocation** is the discipline of doing this allocation *deterministically*, with a published rule, so that per-tenant cost numbers are reproducible and defensible.

This fragment is consumed by `design-finops-model` (skill) as the second half of attribution — the half that handles what `[[per-tenant-cost-attribution-with-hooks]]` cannot trace — and by every operational skill that adds shared infrastructure to the platform (the cost must be allocated *from day one*, not retrofitted).

---

## When to Use

Apply explicit shared-resource cost allocation when:

- **Per-tenant attribution leaves an unattributed gap.** Some infrastructure inherently doesn't trace: control-plane services, monitoring stacks, security tooling, CI/CD. These costs need a home. Allocation is the home.

- **Unit economics is required to reconcile to total spend.** If unit economics reports $400k/mo of attributed cost but the cloud bill is $480k/mo, the $80k delta has to come from somewhere — usually shared resources. Allocation closes the gap.

- **You sell at multiple tiers with different premium-feature loads.** Enterprise tenants impose more "shared" cost (more audit, more support, more observability retention) than free-tier. Allocation should reflect this asymmetry, not split overhead uniformly.

- **You need chargeback or showback to internal/external customers.** A B2B-platform offering ("here's your share of the platform's cost") requires an explicit, defensible allocation. Ad-hoc allocation does not survive customer questioning.

- **Investors / board members ask "what does your overhead look like?"** Overhead-allocation transparency builds confidence; murky allocation invites scrutiny.

- **You're considering moving a shared resource to per-tenant (or vice versa).** Allocation makes the cost of the shared resource visible; without it, "we could give each tenant their own X" has no number attached.

---

## When NOT to Use

Skip explicit shared-resource allocation when:

- **All resources are per-tenant.** A database-per-tenant model with no shared services has trivial allocation (everything traces). Don't engineer allocation for resources that don't share.

- **Shared resources are <5% of total spend.** Below this threshold, allocation overhead exceeds the precision it adds. Document the choice not to allocate and revisit if shared spend grows.

- **You can't agree on an allocation rule.** A bad allocation rule is worse than no rule because it produces a precise-looking number that's actually random. If finance and engineering can't reach consensus on a rule, escalate; don't pick arbitrarily.

- **Pre-PMF / pre-revenue.** Unit economics is fiction at this stage; sub-allocation of overhead is doubly so.

- **The product is single-tenant dedicated.** Each instance is its own world; "shared resources" across customers don't really exist.

---

## Architecture

### What counts as a shared resource

| Category | Examples | Allocation challenge |
|---|---|---|
| **Control plane** | Metadata DB, identity service, tenant registry | Used by every tenant; cost per use is small but non-zero |
| **Observability** | Prometheus, Loki, traces backend, log retention | Heavy users (verbose tenants) cost more; allocation by volume is natural |
| **Security / compliance** | Audit pipeline, vulnerability scanning, SIEM | Fixed cost; allocation by proportional rule |
| **CI/CD** | Build farm, image registry, artifact storage | Tied to engineering, not tenants — usually goes to opex, not COGS |
| **Networking** | Load balancers, NAT gateways, VPN, transit gateways | Often per-cell shared; allocation by tenant-traffic-share |
| **Disaster recovery** | DR replica, backup storage, restore-test capacity | Insurance; flat allocation by tier or proportional |

### Three canonical allocation models

| Model | Rule | Best for | Worst for |
|---|---|---|---|
| **Proportional** | `tenant_share = tenant_revenue / total_revenue` (or tenant_traced_cost / total_traced) | Most overhead categories | Loss-leaders (subsidized by paying tenants in a way that may not be intentional) |
| **Fixed** | `tenant_share = total_overhead / tenant_count` (flat split) | Resources every tenant uses equally regardless of size (e.g., identity check per login) | Wildly different-sized tenants (a 10,000-user enterprise tenant treated identically to a 1-user free tenant) |
| **Tiered** | `tenant_share = tier_weight × total_overhead / total_tier_weights` (free: 0.1, pro: 1.0, ent: 5.0) | Premium-load asymmetries (enterprise gets more SLA, more audit) | When tier-weights are stale or unmaintained — easily becomes drift-prone |

**The Atlas default**: proportional for variable-cost overheads (observability, network), tiered for fixed-cost premium-load overheads (audit, premium support), flat for uniform-use overheads (identity).

### The unattributed-vs-overhead distinction

Two failure modes look similar but differ:

| Symptom | Diagnosis | Fix |
|---|---|---|
| **Unattributed**: hooks fire without tenant_id | A code path is missing instrumentation | Fix the hook; cross-reference `[[per-tenant-cost-attribution-with-hooks]]` |
| **Overhead**: resource has no per-tenant traceability by nature | Inherently shared infrastructure | Allocate via the rule; *do not* try to instrument |

Mistaking overhead for unattributed leads to wasted instrumentation effort. Mistaking unattributed for overhead lets real cost-tracking gaps hide behind allocation rules. The diagnostic question: "Could a perfectly-instrumented system tell me which tenant caused this cost?" Yes → attribute; no → allocate.

### Diagram — allocation pipeline

```
       ┌──────────────────────────────────────────┐
       │           Cloud bill (total)             │
       └─────────────────┬────────────────────────┘
                         │
            ┌────────────┴────────────────┐
            ▼                             ▼
    ┌──────────────┐               ┌──────────────┐
    │  Traceable   │               │   Shared /   │
    │   resources  │               │   overhead   │
    │              │               │              │
    │ Attribution  │               │ Allocation   │
    │  pipeline    │               │  rules       │
    └──────┬───────┘               └──────┬───────┘
           │                              │
           │                  ┌───────────┼───────────┐
           │                  ▼           ▼           ▼
           │            Proportional  Tiered     Flat
           │                  │           │           │
           │                  └─────┬─────┴───────────┘
           │                        │
           ▼                        ▼
    ┌──────────────────────────────────────┐
    │   Combined per-tenant cost table     │
    │   tenant │ traced │ allocated │ tot │
    └──────────────────────────────────────┘
```

### Maintaining tier weights

Tiered allocation requires tier weights to stay current. Defaults:

```yaml
tier_weights:
  free: 0.1
  pro: 1.0
  enterprise: 5.0
  dedicated: 10.0
review_cadence: quarterly
last_reviewed: 2026-04-15
```

Weights are revisited quarterly with finance. Drift in weights *or* drift in tenant-mix can shift the effective allocation in ways the team didn't intend.

---

## Trade-offs

| Dimension | Pro (explicit allocation) | Con (explicit allocation) |
|---|---|---|
| **Reconciliation** | Unit economics = traced + allocated = cloud bill. Numbers add up. | Allocation is approximate by definition; precision is bounded by the rule. |
| **Defensibility** | Published rule survives external scrutiny (auditors, customers, investors). | Wrong rule produces precise-looking but misleading numbers. |
| **Operational ownership** | Each overhead category has a named allocation rule and owner. | Overhead-budget conversations need a forum (often the FinOps council). |
| **Optimization clarity** | High-allocation tenants are visible; subsidy questions can be asked. | Allocation can mask shared-resource bloat — a $1M Prometheus deployment "allocated fairly" still looks fair on a tenant level. Watch absolute shared spend separately. |
| **Tenant transparency** | Chargeback reports can include the allocation explicitly. | Some tenants will dispute allocation rules; have the conversation early. |

---

## Implementation Patterns

### 1. Allocation manifest

Maintain a versioned `allocation-rules.yml` in source control:

```yaml
rules:
  control_plane_db:
    resource_filter: "tags.role == 'control-plane'"
    method: proportional
    basis: traced_cost
    review_cadence: quarterly

  prometheus_observability:
    resource_filter: "tags.role == 'observability'"
    method: proportional
    basis: log_volume_bytes  # tenant's own log volume drives their share

  audit_pipeline:
    resource_filter: "tags.role == 'security-audit'"
    method: tiered
    weights:
      free: 0.1
      pro: 1.0
      enterprise: 5.0

  identity_service:
    resource_filter: "tags.role == 'identity'"
    method: flat  # every tenant gets identity checks
```

### 2. Daily allocation job

The allocation job runs after attribution:

```python
def allocate_overhead(period):
    cloud_bill = fetch_cloud_bill(period)
    traced = sum_traced_cost(period)
    overhead = cloud_bill - traced
    overhead_by_resource = partition_by_resource_filter(overhead, rules)

    per_tenant_allocation = defaultdict(float)
    for resource, amount in overhead_by_resource.items():
        rule = rules[resource]
        allocation = apply_method(rule.method, amount, ...)
        for tenant, share in allocation.items():
            per_tenant_allocation[tenant] += share
    return per_tenant_allocation
```

### 3. Published reports

Every tenant cost report shows both buckets:

```yaml
tenant_id: pro-tenant-7
period: 2026-04
costs:
  traced: $124.50
  allocated:
    control_plane: $3.20
    observability: $8.10
    audit: $1.50
    identity: $0.40
  total: $137.70
```

This transparency is what makes chargeback survive customer scrutiny.

### 4. Drift detection on tier weights

A monthly check: simulate allocation with old weights vs new tenant mix; flag if shifts exceed 10%. This catches the case where the team grew enterprise tenant count 3× and the old weights now over-allocate to free.

### 5. Shared-resource cost watchdog

Allocation can mask absolute bloat. Track shared-resource cost as a percent of total revenue:

```yaml
metric: shared_resource_cost_pct_of_revenue
target: < 12%
yellow: 12-20%
red: > 20%
```

If the metric drifts red, optimization effort goes to the shared resource itself, not just to its allocation rule.

---

## Quality Checks

- **CRITICAL:** shared-resource allocation must be **deterministic** — the same period's cloud bill, run through the same rules, produces the same per-tenant allocations every time. **Random or non-reproducible allocation makes per-tenant cost noisy**, defeats trend analysis, undermines chargeback credibility, and corrupts unit-economics signals. Determinism requires: (a) versioned allocation rules in source control, (b) reproducible inputs (the cloud bill is itself a reproducible snapshot, not a live API query), (c) no `random()` or unstable ordering in allocation math, (d) idempotent allocation jobs (re-running for the same period produces identical output). The test: re-run last month's allocation today; results must match bit-for-bit. Any platform that cannot pass this test has allocation in name only and is reporting numbers it cannot defend.

- **Allocation rules are published and versioned.** A rule whose source-of-truth is in a finance spreadsheet is unauditable. Rules belong in the same repo as the attribution code.

- **Tier weights reviewed quarterly.** Stale weights are the single most common drift source in tiered allocation.

- **Unattributed vs overhead is diagnosed correctly.** Misclassifying lets real cost-tracking gaps hide. Engineering must answer "Is this traceable in principle?" for every cost category.

- **Per-tenant reports show both buckets.** Hiding the allocation bucket (or burying it in totals) damages credibility when customers ask for breakdowns.

- **Shared-resource cost-of-revenue % is tracked.** Allocation distributes the pain; only an absolute metric tells you whether the pain is too big.

- **Allocation jobs are idempotent and re-runnable.** Recalculating a prior month must produce the same numbers; backfills must be safe.

- **Allocation gap closes.** `traced + allocated` must equal cloud-bill total within rounding; any difference is itself an unattributed-overhead bucket to investigate.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh allocation practice:

- `shared cost allocation cloud multi-tenant {date}` — finds FinOps Foundation guidance.
- `proportional vs tiered cost allocation FinOps {date}` — practitioner debates on method selection.
- `overhead allocation SaaS chargeback {date}` — chargeback-focused write-ups (Vantage, Cloudability).
- `kubernetes shared cluster cost allocation {date}` — Kubecost / OpenCost shared-resource patterns.
- `cloud cost tagging strategy shared services {date}` — tagging discipline that supports allocation.
- `tier weight review cadence FinOps {date}` — governance practice around allocation drift.

Treat content older than 24 months as orientation; FinOps tooling and cloud-billing changes drift this quickly.

---

## Cross-references

**Companion fragments (Task 10):**

- [[per-tenant-cost-attribution-with-hooks]] — the traceable half; allocation handles the rest.
- [[unit-economics-saas]] — consumes the combined (traced + allocated) per-tenant cost.
- [[budget-alerts-and-quotas]] — alerts can fire on either traced or allocated cost.

**Atlas existing fragments:**

- [[cell-based-architecture]] — cells often host shared resources; cell cost allocates intra-cell.
- [[tenancy-decision-framework]] — tenancy model affects how much is shared vs traceable.

**Anti-patterns:**

- [[arbitrary-allocation]] (forthcoming, Task 12) — the failure mode this fragment prevents.
- [[stale-tier-weights]] (forthcoming) — drift in tiered allocation.
- [[allocation-hides-bloat]] (forthcoming) — absolute shared cost ignored.

**Quality gate:**

- `QG-F1` (foundation) — a foundation design without an allocation policy fails QG-F1 if the platform has shared resources.

**Upstream specs:**

- `docs/v6-final-architecture.md` §3.Q3 (allocation references), §6.3 (fragment schema).
- FinOps Foundation framework, cost-allocation capability.

**Downstream consumers:**

- `design-finops-model` skill (P3.1) — primary consumer.
- Every skill that adds shared infrastructure must declare its allocation rule.
