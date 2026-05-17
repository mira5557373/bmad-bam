---
id: rollback-strategies
title: Rollback Strategies — Instant, Gradual, and Trigger-Driven
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [deployment, rollback, incident-response, slo, synthetic-traffic]
references:
  - "Google SRE Book, Chapter 14 — Managing Incidents"
  - "Charity Majors, Observability Engineering (O'Reilly, 2022)"
  - "https://martinfowler.com/articles/measuring-architecture.html"
---

# Rollback Strategies — Instant, Gradual, and Trigger-Driven

A **rollback strategy** is the documented mechanism for restoring a prior-known-good version. Most rollout failures are not failures of the rollout — they are failures of the rollback: a deploy went sideways, but the path back was unrehearsed, the database had already migrated, the feature flag was load-bearing, or nobody knew which version was "good." Rollback design is the *insurance policy* that makes aggressive rollout strategies safe.

This fragment is consumed by `design-deployment-topology` (skill) as the third pillar (after strategy and cohort) and by `design-evolutionary-architecture` because rollback is itself a fitness function: a system that cannot roll back has lost an evolutionary degree of freedom.

---

## When to Use

Apply explicit rollback-strategy design when:

- **You deploy more than once per week.** Anything more frequent than weekly will eventually deploy a regression that requires rollback. Without a documented path, the incident becomes ad-hoc and the rollback time becomes unpredictable.

- **You use any rollout strategy other than blue-green-with-manual-cutover.** Canary, rolling-update, and feature-flag all have failure modes where a rollback is needed mid-rollout. Each requires a distinct rollback mechanism — see Architecture below.

- **The platform has SLOs.** SLOs imply error budgets; error budget burn rates imply automated rollback triggers. Without explicit triggers, the SLO is decorative.

- **Database schema changes accompany code deploys.** Schema rollback is qualitatively different from code rollback (data may have been written in the new shape). Without a schema-rollback strategy, "rolling back the code" leaves the database in a hybrid state. Cross-reference `[[zero-downtime-migrations]]` for the expand/contract pattern that keeps rollback feasible.

- **You have on-call rotations.** On-call exists because rollback decisions happen at 3 AM. The strategy must be operable by the least-senior on-call engineer with documented runbooks.

- **Synthetic traffic monitors run continuously.** Synthetic monitors are the *trigger source* for many automated rollbacks. They make the difference between a 5-minute rollback (detected by synthetics) and a 50-minute rollback (detected by customer support tickets).

---

## When NOT to Use

Skip explicit rollback-strategy design when:

- **You ship quarterly with a maintenance window.** A maintenance window *is* the rollback strategy: take downtime, restore prior state. Adding canary-rollback to a quarterly release is theatre.

- **The product has no users yet.** Pre-launch products do not need rollback infrastructure; they need a working forward path.

- **You deploy via PaaS one-click rollback.** Heroku, Vercel, Fly.io etc. provide built-in rollback for stateless apps. Designing your own rollback strategy on top of these is reinvention. (You still need a *schema* rollback strategy if you have a database — that the PaaS does not solve.)

- **The blast radius is one tenant.** A single-tenant dedicated instance has rollback semantics identical to "restore from backup at time T." This is a backup-and-restore problem, not a rollout problem.

- **Rollback is contractually forbidden.** Some regulated systems (medical devices, payment switches) ship with non-rollback semantics by regulation — you forward-fix only. In those domains, the *forward-fix* discipline replaces rollback and gets its own runbook.

---

## Architecture

### Rollback shapes by strategy

| Source rollout | Rollback mechanism | Time-to-prior-version |
|---|---|---|
| **Blue-green** | Flip traffic from green back to blue | Seconds |
| **Canary** | Set canary weight to 0; drain | 30 sec – 5 min |
| **Rolling-update** | Replace pods/instances in reverse order | Minutes to hours |
| **Feature-flag** | Toggle flag off | Seconds (per flag) |
| **Schema migration (expand)** | Stop reading new shape; data remains | Seconds; no data loss |
| **Schema migration (contract)** | Re-add removed column from backup | Hours to days; high-risk |

The asymmetry here is the central design constraint: **schema-contract is not rollback-friendly.** A platform that has executed a contract migration cannot easily roll back the code that depended on the pre-contract schema. The mitigation is the expand-contract discipline (see `[[zero-downtime-migrations]]`).

### Trigger conditions

Rollback triggers fall into three classes:

| Class | Examples | Response time |
|---|---|---|
| **SLO-burn-rate** | error rate > 2× baseline for 5min; p99 latency > 1.5× baseline for 10min | Automatic, <60 sec from threshold |
| **Synthetic-traffic failure** | scripted user journey fails 3 consecutive runs | Automatic, <2 min from threshold |
| **Manual** | operator initiates via runbook, often based on customer reports | 5–30 min (human in the loop) |

Automated triggers must have **bypass overrides** (e.g., "rollback ignored, holding for forensics") because some incidents need the bad version in production briefly to capture a coredump or reproduce.

### Instant vs gradual rollback

| Mode | Mechanism | When to use |
|---|---|---|
| **Instant** | Flip traffic 100% back in one step | Severe regression; clear cause; cost of staying high |
| **Gradual** | Drain new version in steps (reverse of canary) | Suspected regression; need to keep observability live; cost of staying tolerable |

Default to **instant** for SEV-1; default to **gradual** for SEV-2/3. The choice is encoded in the strategy declaration, not made under pressure.

### Diagram — automated rollback pipeline

```
       ┌─────────────────┐
       │  Canary running │
       │  v1.7 @ 25%     │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐       ┌──────────────────┐
       │ SLO evaluator   │◄──────│ Synthetic traffic │
       │ (every 30 sec)  │       │ (every 60 sec)    │
       └────────┬────────┘       └──────────────────┘
                │
       ┌────────┼────────┬─────────────┐
       │        │        │             │
       ▼        ▼        ▼             ▼
   ADVANCE   HOLD    ROLLBACK    PAGE-ONLY
       │        │        │             │
       │        │        ▼             ▼
       │        │  ┌──────────┐   on-call engineer
       │        │  │ Auto-    │   reviews & decides
       │        │  │ rollback │
       │        │  │ runbook  │
       │        │  └──────────┘
       │        │
       └────────┴── continue dwell
```

### Coordination with synthetic-traffic monitoring

Synthetic monitors run as a *parallel* probe of system health, independent of user traffic. They are uniquely valuable for rollback decisions because they:

1. Generate consistent load — comparisons across deploys are valid.
2. Cover user journeys that may have low organic frequency.
3. Detect *correctness* failures (output mismatch), not just availability.

Cross-reference `[[synthetic-traffic-monitoring]]` (forthcoming) for the probe-design pattern. Without synthetics, rollback triggers rely on user-traffic-derived SLOs, which can miss regressions affecting low-traffic features.

---

## Trade-offs

| Dimension | Pro (designed rollback) | Con (designed rollback) |
|---|---|---|
| **Mean time to recover (MTTR)** | Documented, tested rollback gives predictable MTTR. | Maintaining the rollback path is non-trivial engineering — and a stale rollback path is worse than no rollback path. |
| **Deploy aggressiveness** | Strong rollback enables aggressive rollout (canary, frequent deploys). | Without rollback infrastructure, aggressive deploys are reckless. |
| **Schema flexibility** | Expand-contract discipline preserves rollback safety. | Constrains schema design — no in-place column renames, no immediate contracts. |
| **Operator cognitive load at 3 AM** | Clear trigger thresholds + runbook = mechanical decision. | A rich strategy with many trigger classes can overwhelm; keep the runbook short. |
| **Forward-fix culture** | Rollback is one option; forward-fix is the other. Healthy teams use both. | Over-reliance on rollback can become a substitute for fixing root cause; track rollback frequency as a leading indicator. |

---

## Implementation Patterns

### 1. Rollback runbook (per service)

Each service has a one-page rollback runbook:

```yaml
service: orders-api
last_tested: 2026-05-10
rollback_modes:
  - mode: instant
    command: "kubectl rollout undo deployment/orders-api"
    expected_time: 30s
    side_effects: "in-flight requests retry on stable version"
  - mode: gradual
    command: "argo rollout abort orders-api-rollout"
    expected_time: 5m
    side_effects: "canary pods drain; metrics remain available"
schema_state:
  current_migration: "20260512_add_priority_column"
  rollback_compatible: true
  contract_migration_blocked_until: "2026-06-15"
contact: orders-team-oncall
```

The `last_tested` field is enforced — runbooks older than 30 days fail CI.

### 2. SLO-burn-rate trigger configuration

```yaml
trigger: orders-api-error-rate
indicator: error_rate
baseline: 0.001  # 0.1%
threshold: 0.005  # 0.5%, i.e., 5× baseline
window: 5m
action: ROLLBACK
mode: instant
notify: [slack/orders, pagerduty/orders]
```

### 3. Pre-deploy rollback test

Before a strategy is approved for production use, the rollback path is *exercised* in staging:

```bash
# In staging, simulate a canary failure
./scripts/canary-deploy v1.7-broken --cohort staging
./scripts/wait-for-slo-burn
./scripts/expect-rollback-within 2m
./scripts/verify-version v1.6
```

A platform that has never executed the rollback in staging cannot claim "tested rollback path" — and the CRITICAL check below applies.

### 4. Schema rollback compatibility window

After every expand migration, mark the window during which contract is forbidden:

```sql
-- expand migration
ALTER TABLE orders ADD COLUMN priority INT NULL;
-- contract migration must wait until all code consuming orders writes priority
-- min wait: 7 days OR until rollback-budget-N is exhausted, whichever later
```

Cross-reference `[[zero-downtime-migrations]]` for the full discipline.

### 5. Rollback frequency as a leading indicator

Track `rollbacks_per_deploy` over rolling 30-day window. Rising rollback frequency signals: (a) test coverage gaps, (b) canary cohort design too small to catch issues earlier, or (c) a quality regression. Healthy systems show <10% rollback rate; >25% requires a retro.

---

## Quality Checks

- **CRITICAL:** the rollback path must be **testable pre-deploy** — never deploy a rollback path that has not been exercised in staging within the last 30 days. A rollback path that has never executed is a *hypothesis*, not a strategy. The most expensive deployment failures in the industry (Knight Capital 2012, Cloudflare 2019, many smaller ones) trace to rollback paths that existed in design but were untested in fact: when the trigger fired, the rollback failed for a reason that would have been trivial to catch in staging. CI must block deploys to production if the latest staging rollback drill is >30 days old. No exceptions for "small" changes — small changes are exactly the ones that bypass review.

- **Every service has a one-page runbook with a `last_tested` timestamp.** Runbooks without dates are not runbooks; they are wishes.

- **SLO triggers are automated with manual override.** Automation handles the 99% case; override handles the forensics-needed case. Manual-only triggers are too slow; automation-only triggers prevent legitimate incident-response patterns.

- **Schema migrations declare a `rollback_compatible` flag.** When false (a contract migration just executed), the deploy pipeline knows that code rollback is unsafe and routes rollback decisions to a different runbook.

- **Coordination with synthetic-traffic monitoring is configured.** Synthetic probes provide the most reliable rollback signal; their alerts feed the same trigger pipeline as SLO evaluators.

- **Rollback events emit a structured audit record.** "Why was v1.7 rolled back at 03:47?" must be answerable from logs, not memory.

- **Rollback frequency is reviewed monthly.** Rising rollback rate is a leading indicator of test-coverage gaps and/or canary-cohort sizing problems.

- **Forward-fix is a documented alternative.** Sometimes the bad version must stay (e.g., schema is already contracted). The runbook covers this path too: hotfix expectations, communication, blast-radius mitigation.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh rollback practice:

- `automated rollback SLO burn rate canary {date}` — surfaces the SLO + auto-rollback integration patterns.
- `database migration rollback expand contract {date}` — finds the schema-rollback discipline.
- `synthetic monitoring deployment safety {date}` — Datadog, New Relic, Checkly write-ups.
- `incident response rollback vs forward-fix {date}` — SRE community decision frameworks.
- `feature flag emergency kill switch {date}` — flag-based rollback patterns.
- `chaos engineering rollback validation {date}` — using chaos drills to validate rollback paths.

Treat content older than 24 months as orientation; rollback tooling is actively evolving.

---

## Cross-references

**Companion fragments (Task 9):**

- [[rollout-strategies-comparison]] — strategy determines rollback shape and budget.
- [[tenant-cohort-design]] — cohort containment caps rollback blast radius.
- [[zero-downtime-migrations]] — schema discipline that keeps rollback feasible.

**Atlas existing fragments:**

- [[evolutionary-architecture]] — rollback testability is a fitness function.
- [[tenancy-decision-framework]] — tenancy shape affects rollback blast radius.

**Anti-patterns:**

- [[untested-rollback-path]] (forthcoming, Task 12) — the failure mode this fragment prevents.
- [[schema-contract-without-window]] (forthcoming) — premature contracts block rollback.

**Forthcoming companion fragments:**

- [[synthetic-traffic-monitoring]] — probe-design for rollback triggers.

**Quality gate:**

- `QG-F1` (foundation) — a foundation design without a tested rollback path fails QG-F1.

**Upstream specs:**

- `docs/v6-final-architecture.md` §3.Q3 (rollback budgets per tier), §6.3 (fragment schema).
- Google SRE Book, chapters 14 and 18.

**Downstream consumers:**

- `design-deployment-topology` skill (P3.1) — primary consumer.
- All operational skills inherit rollback semantics from this fragment.
