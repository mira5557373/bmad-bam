---
id: rollout-strategies-comparison
title: Rollout Strategies — Blue-Green, Canary, Rolling, Feature-Flag
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [deployment, rollout, blue-green, canary, feature-flags]
references:
  - "Jez Humble & David Farley, Continuous Delivery (Addison-Wesley, 2010)"
  - "https://martinfowler.com/bliki/BlueGreenDeployment.html"
  - "https://martinfowler.com/bliki/CanaryRelease.html"
  - "Google SRE Book, Chapter 8 — Release Engineering"
---

# Rollout Strategies — Blue-Green, Canary, Rolling, Feature-Flag

A **rollout strategy** is how new code reaches tenants. The four strategies in widespread use — blue-green, canary, rolling-update, and feature-flag — are not interchangeable. Each has a distinct shape of *blast radius*, *rollback latency*, *infrastructure cost*, and *suitability per tier*. A multi-tenant SaaS that picks one strategy for the entire platform pays for it in either over-conservative free-tier velocity or under-conservative enterprise-tier surprises.

This fragment is consumed by `design-deployment-topology` (skill) to choose a primary strategy *per tier* and by `design-evolutionary-architecture` as the change-management lever. R3 consolidated separate blue-green and canary fragments into this comparison because the decision is *which* strategy, not *how* each one works in isolation.

---

## When to Use

Apply explicit rollout-strategy selection when:

- **The platform serves multiple tiers with different risk profiles.** A free-tier outage costs goodwill; an enterprise-tier outage costs contractual remedies. The same rollout strategy cannot be right for both. Choosing per-tier is the cheapest mechanism for tier-appropriate blast-radius.

- **You deploy more than once per week.** Below weekly cadence, ad-hoc rollouts work because the team can pay attention to each one. Above weekly cadence, the strategy has to be automated, observable, and rollback-budgeted — explicit strategy selection is the precondition.

- **A regression's blast radius could cross tenants.** If a bad deploy hurts more than one tenant simultaneously, the cost of *not* selecting a containment strategy is at least the sum of tenants affected. Cell-based or canary strategies localize this; rolling-update without cohorts does not.

- **Stakeholders ask "how fast can you roll back?"** The answer must be a *number* (minutes, max), and that number is a property of the strategy. Without an explicit rollout strategy, the answer is "it depends" — which fails any incident-response review.

- **Compliance auditors care about change control.** SOC 2 CC8.1 and ISO 27001 A.14.2 require documented change-management procedures. An explicit rollout-strategy-per-tier with documented gates is the cheapest way to satisfy this without instituting heavy change-advisory bureaucracy.

- **Feature delivery is gated independently of code delivery.** Trunk-based development plus feature flags lets the same binary serve different tenants different feature sets. This requires feature-flag rollout as a first-class strategy, not an afterthought.

---

## When NOT to Use

Skip explicit rollout-strategy selection when:

- **You deploy quarterly or less.** A waterfall release cadence does not need a rollout-strategy framework; it needs a release-readiness checklist. Imposing canary on a quarterly release is theatre.

- **The platform has one tenant.** A single-tenant deployment (an on-prem appliance, or a dedicated-instance customer) does not have cohort design; it has a maintenance window. Use scheduled-downtime conventions instead.

- **Pre-production with no users.** Pre-launch products should deploy via the simplest mechanism (often just `kubectl apply` or `git push` to a PaaS). Premature rollout sophistication is one of the most common pre-PMF anti-patterns.

- **The infrastructure cannot support cohorting.** A monolith deployed to one VM cannot do canary in any meaningful sense. Either fix the infrastructure first (cross-reference `[[cell-based-architecture]]` for the cell shape that enables this) or accept that "rolling-update" is your only honest option.

- **The team has no on-call coverage during deploys.** Canary and blue-green strategies assume an operator (or alert pipeline) is watching the canary's metrics. Deploying canary into the void is worse than rolling-update because it provides a false sense of safety.

---

## Architecture

### The four strategies

| Strategy | Infrastructure shape | Rollback latency | Blast radius during deploy | Capacity multiplier |
|---|---|---|---|---|
| **Blue-Green** | Two parallel environments (blue=live, green=new); cutover via traffic switch | Seconds (flip back to blue) | 0 during deploy, 100% at cutover instant | 2× peak |
| **Canary** | One environment, weighted traffic split (e.g., 1% → 5% → 25% → 100%) | Minutes (drain canary, route to stable) | Equal to canary weight | 1.05–1.25× peak |
| **Rolling-Update** | One environment, replace pods/instances N at a time | Minutes to hours (replace back, in reverse) | Proportional to wave-size / fleet-size | 1.1× peak (surge) |
| **Feature-Flag** | Same binary everywhere; behavior gated by flag service | Seconds (flip the flag) | 0 for unflipped flag; controlled per-flag | 1× (no extra infra) |

### Tier-mapped defaults (per spec §3.Q3)

| Tier | Primary strategy | Canary weight progression | Rollback budget |
|---|---|---|---|
| **Free** | Aggressive canary | 5% → 25% → 50% → 100% in <60min | 10 min max, <$50 cost |
| **Pro** | Conservative canary | 1% → 5% → 25% → 100% over 4–24h | 5 min max, <$500 cost |
| **Enterprise** | Blue-green with canary in green | Green takes 1% → 25% → 100% over 24–72h before cutover | 2 min max, <$5000 cost |
| **Dedicated** | Maintenance window + blue-green | Pre-announced; cutover during window | 60 sec; rollback is part of the window |

### Diagram — strategy comparison

```
Blue-Green:
  ┌──Blue (v1.0)──┐
  │  100% traffic │ ───┐
  └───────────────┘    │ flip
                       ▼
  ┌──Green (v1.1)─┐  100%
  │   0 → 100%    │
  └───────────────┘

Canary:
  ┌────Stable (v1.0)────┐   95% traffic
  └─────────────────────┘
  ┌────Canary (v1.1)────┐   5% traffic ──> watch metrics ──> 25% ──> 100%
  └─────────────────────┘

Rolling-Update:
  [v1.0][v1.0][v1.0][v1.0][v1.0]   wave 1: replace 1
  [v1.1][v1.0][v1.0][v1.0][v1.0]   wave 2: replace 2
  [v1.1][v1.1][v1.0][v1.0][v1.0]   ...
  [v1.1][v1.1][v1.1][v1.1][v1.1]   done

Feature-Flag:
  ┌──Single environment (v1.1)──┐
  │  if (flag.new_pricing) {    │
  │     // tenant-A, tenant-B   │
  │  } else {                   │
  │     // everyone else        │
  │  }                          │
  └─────────────────────────────┘
```

### Strategy + cohort composition

Strategies *combine* with cohort design (see `[[tenant-cohort-design]]`). Canary-by-tenant-hash is different from canary-by-region is different from canary-by-tier. The strategy answers *how much traffic*; the cohort answers *whose traffic*.

---

## Trade-offs

| Dimension | Blue-Green | Canary | Rolling-Update | Feature-Flag |
|---|---|---|---|---|
| **Rollback speed** | Fastest (seconds) | Fast (minutes) | Slow (full reverse wave) | Fastest (flag flip) |
| **Infra cost** | Highest (2× during deploy) | Low (5–25% surge) | Lowest (only surge) | Lowest (no infra delta) |
| **Stateful-service friendliness** | Hard (DB schema must support both versions) | Hard (same) | OK (rolling DB changes) | Easy (one binary, gated) |
| **Blast radius at peak** | 100% at cutover instant | Equal to canary weight | Equal to wave size | Per flag scope |
| **Observability requirements** | Light (just monitor green pre-cutover) | Heavy (per-cohort metrics, automated gates) | Medium (health checks per wave) | Heavy (per-flag telemetry) |
| **Operator burden** | Low (binary decision) | Medium (multiple weight steps) | Low (automated) | High (flag hygiene = real cost) |
| **Compliance evidence** | Strong (clean cutover log) | Strong (audit per weight bump) | Weak (continuous; hard to point at "the release") | Weak (deploys decoupled from launches) |

**Atlas's rule of thumb:** start with rolling-update + feature-flags for early-stage teams; add canary when you have enough traffic to populate cohort metrics; add blue-green when the cost of being wrong exceeds 2× infra during the window.

---

## Implementation Patterns

### 1. Per-tier strategy declaration

In the platform's deployment manifest, declare strategy *per tier*:

```yaml
rollout_strategy:
  free:
    primary: canary
    progression: [0.05, 0.25, 0.50, 1.00]
    dwell_per_step: 5m
    rollback_budget: { time: 10m, cost_usd: 50 }
  pro:
    primary: canary
    progression: [0.01, 0.05, 0.25, 1.00]
    dwell_per_step: 30m
    rollback_budget: { time: 5m, cost_usd: 500 }
  enterprise:
    primary: blue_green
    inner_strategy: canary  # within green, before cutover
    progression: [0.01, 0.25, 1.00]
    dwell_per_step: 8h
    rollback_budget: { time: 2m, cost_usd: 5000 }
```

### 2. Automated gates between progression steps

Every progression step must have an automated *gate* that decides "advance, hold, or rollback." Gates read SLO indicators (error rate, p99 latency, business KPI deviation):

```python
def evaluate_canary_gate(canary_metrics, baseline_metrics, slo):
    if canary_metrics.error_rate > slo.max_error_rate:
        return "ROLLBACK"
    if canary_metrics.p99_ms > baseline_metrics.p99_ms * slo.max_latency_ratio:
        return "ROLLBACK"
    if canary_metrics.business_kpi_delta < -slo.max_kpi_regression:
        return "HOLD"  # human review
    return "ADVANCE"
```

Cross-reference `[[rollback-strategies]]` for the trigger-condition catalog.

### 3. Feature flags as a complement, not a substitute

Feature flags are orthogonal to canary/blue-green/rolling. The pattern is:

1. Ship the binary via canary or rolling (code-delivery).
2. Toggle the flag per-cohort once deployed (feature-delivery).

This separates *infrastructure risk* (deploy) from *product risk* (launch) and lets each have its own rollback budget.

### 4. Stateful-service handling

For DB schema changes: schema migrations must support *both* old and new code versions during the rollout window (expand/contract pattern — see `[[zero-downtime-migrations]]`). Blue-green is most demanding here; canary is forgiving as long as the migration is backward-compatible during the canary window.

### 5. Documenting the rollback budget

Each strategy declaration must include a **rollback budget**: the maximum time and cost to restore the prior state. This is the artifact that satisfies auditors and informs incident commanders.

---

## Quality Checks

- **CRITICAL:** every rollout strategy has a **documented rollback budget** — a maximum time (in minutes) and a maximum cost (in USD or compute-hours) to return to the prior state. Without a rollback budget, the incident commander cannot make a *go/no-go* call under pressure: they don't know whether rolling back is cheaper than rolling forward. Free-tier <10min/<$50, pro-tier <5min/<$500, enterprise-tier <2min/<$5000 are the spec §3.Q3 defaults; deviations require explicit sign-off.

- **Strategy selection is per-tier, not platform-wide.** A single strategy across all tiers is either over-conservative (slowing free-tier velocity) or under-conservative (under-protecting enterprise). Reject any deployment manifest with a single `strategy:` key at the top level.

- **Canary gates are automated, not manual.** A human approver between every progression step does not scale and creates inconsistent decisions. Codify the SLO thresholds; humans review *exceptions*, not the steady state.

- **Feature flags have an expiry date.** Every flag in the system has a TTL (default 90 days). Long-lived flags become permanent forks of the codebase and are the #1 source of feature-flag debt.

- **Rolling-update never deploys without cohorts.** A rolling update across a heterogeneous fleet without cohort awareness will hit your largest tenant *first* by accident. Pair rolling-update with `[[tenant-cohort-design]]` or do not use rolling-update at all. (See `[[deployment-without-cohorts]]` anti-pattern.)

- **Blue-green requires DB-schema review.** Blue/green can only coexist when the schema supports both. Adding blue-green without a schema-compatibility check is the most common failure mode of teams adopting it.

- **Strategy changes go through change-control.** Switching tiers from canary to blue-green is not a config edit; it is a strategy change and requires the same review as a security-relevant change.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to keep rollout practices current:

- `progressive delivery patterns multi-tenant SaaS {date}` — surfaces canary-by-cohort tooling (Flagger, Argo Rollouts, Spinnaker).
- `feature flag governance long-lived flags debt {date}` — finds practical guidance on flag-hygiene and TTLs.
- `automated canary analysis SLO gates {date}` — Netflix Kayenta and successors; the state of the art for gate evaluation.
- `blue green deployment database schema compatibility {date}` — the practical question that determines whether blue-green is feasible.
- `rollback budget incident response {date}` — the operational discipline behind the rollback-budget concept.
- `deployment strategy per tier SaaS {date}` — practitioner reports on tier-mapped strategy selection.

Treat content older than 24 months as orientation; tooling moves quickly here.

---

## Cross-references

**Companion fragments (Task 9):**

- [[tenant-cohort-design]] — strategy answers *how much*; cohort answers *whose*.
- [[rollback-strategies]] — trigger conditions and execution mechanics for rollback.
- [[zero-downtime-migrations]] — the schema-change pattern that makes blue-green and canary feasible for stateful services.

**Atlas existing fragments:**

- [[cell-based-architecture]] — cell-based deployments compose naturally with canary-by-cell.
- [[tenancy-decision-framework]] — tenancy shape constrains which strategies are feasible.
- [[evolutionary-architecture]] — fitness functions can guard rollout-strategy invariants in CI.

**Anti-patterns:**

- [[deployment-without-cohorts]] (forthcoming, Task 12) — the most common rollout failure mode.
- [[feature-flag-debt]] (forthcoming) — long-lived flags as permanent forks.

**Quality gate:**

- `QG-F1` (foundation) — a foundation design without a per-tier rollout strategy and rollback budget fails QG-F1.

**Upstream specs:**

- `docs/v6-final-architecture.md` §3.Q3 (tier-mapped rollout defaults), §6.3 (fragment schema).
- Jez Humble & David Farley, *Continuous Delivery* (2010), chapters 10 and 14.

**Downstream consumers:**

- `design-deployment-topology` skill (P3.1) — primary consumer.
- `design-evolutionary-architecture` skill — rollout strategy is a fitness-function lever.
