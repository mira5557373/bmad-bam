---
id: migration-cohort-selection
title: Migration Cohort Selection
category: lifecycle
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-D1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [cohort, canary, risk-stratified, rollout, migration, blast-radius, multi-tenant]
references:
  - "Continuous Delivery (Humble + Farley) — cohort + canary patterns"
  - "Google SRE Book — error budgets + canary rollout"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/tenant-cohort-design.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/rollout-strategies-comparison.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/migration-rollback-and-abort.md"
---

# Migration Cohort Selection

Migration cohorts answer a single question: **how do we move tenants such that one cohort's failure doesn't take down all the others?** The naive answer ("everyone at once") trades blast-radius safety for operational simplicity — and is the root cause of most published migration disasters. The principled answer is cohort-by-cohort with progressive blast-radius expansion: start small, observe, expand, repeat. The catch: how small is "small enough" depends on the migration's risk profile, which depends on what's being migrated, which depends on the migration axis (tier vs. region) and the underlying tenancy mechanism.

This fragment is the **design vocabulary** for the cohort_plan section of `migration-runbook.json#per_axis.<axis>.cohort_plan`. It enumerates the three cohort selection methods, the size heuristics, and the cross-cutting concern of canary-first execution under the risk-stratified method. The migration runbook locks the plan; this fragment is the pattern catalogue + rationale the runbook draws from.

The CRITICAL contract that drives risk-stratified design: **risk-stratified cohorts MUST start with a 1-tenant canary before expanding to ≥10-tenant cohorts**. The canary is the proof-of-concept; without it, every "small cohort" is at risk of being the discovery cohort for an unknown failure mode.

---

## When to Use

- **Any tenant migration in a multi-tenant platform.** Cohort selection is mandatory for migration runbooks; the only question is which method, not whether to use cohorts.

- **Tier-upgrade with new feature shipping.** New schema + new code path + tier-flip = high-stakes change. Risk-stratified is the default unless tier-model's `upgrade_mode` clearly dictates rollout_tier_hint_driven (e.g., self_serve tiers with stable schema).

- **Region-migration crossing residency.** Cross-region with residency-change is always high-stakes (regulatory + customer-trust); risk-stratified with 1-tenant canary is mandatory.

- **Cell-relocation tied to tier-upgrade.** The most-coupled migration scenario; risk-stratified is the safe default.

- **Quarterly review of existing runbook.** Cohort sizes drift from operational reality (cohort that was 50 self-serve tenants 6mo ago may now be 500 because tier-population shifted); re-check sizing against current tenant distribution.

- **After a near-miss in production.** A cohort that "almost failed" surfaces a sizing or method-choice problem; revisit the runbook + tighten the next cohort's parameters.

---

## When NOT to Use

- **Single-tenant platforms.** Not multi-tenant; cohort selection is degenerate (cohort size = 1 by construction).

- **Pre-launch (no production tenants yet).** Before any tenants exist, cohort design is aspirational. Defer until the platform has live tenant traffic.

- **Migrations that aren't cohort-shaped.** Schema-only migrations that don't touch tenant data per-tenant (e.g., adding a non-tenant-scoped index) may not need cohorts. Confirm by checking: does the migration's failure affect different tenants differently? If no → no cohort needed.

- **Customer-initiated single-tenant migrations.** A specific enterprise customer initiating their own tier-upgrade is a single-tenant operation; cohort design degenerates to "this one tenant." The runbook still applies but the cohort plan has size 1.

---

## Architecture: the three cohort selection methods

### Method 1: rollout_tier_hint_driven

**When to use.** The platform has tier-model.json with `upgrade_mode` per tier populated; cohort scoping follows naturally from the tier taxonomy:
- `self_serve` tiers → cohort size 50+ (self-serve upgrades batch by who-clicked-upgrade-in-window)
- `assisted` tiers → cohort size 10 (success-team-driven batches)
- `white_glove` tiers → cohort size 1 (individual customer migrations)

**Best fit scenarios:**
- Tier-axis migrations on a well-understood pricing model
- Rollout to existing tenant population where tier-population is stable
- Maintenance migrations within a tier's existing scope (e.g., feature-flag flip for all pro-tier tenants)

**Limitations:**
- Doesn't account for per-tenant risk variance within a tier (an enterprise tenant with custom integrations is riskier than an enterprise tenant on stock config; rollout_tier_hint_driven treats them the same)
- Assumes tier population is the relevant cohort axis; doesn't help for cross-tier migrations (e.g., free + starter both move to a new shared platform feature)

**Sizing heuristics:**

| `upgrade_mode` | Cohort size (target) | Cohort count (typical) | Rollout duration (typical) |
|---|---|---|---|
| self_serve | 50-500 | 2-5 cohorts | hours to days |
| assisted | 10-50 | 5-15 cohorts | days to weeks |
| white_glove | 1-5 | 5-50 cohorts | weeks to months |

The migration runbook records the actual sizing decisions; these are starting heuristics.

### Method 2: risk_stratified

**When to use.** The migration ships a change whose failure modes aren't fully understood — new schema, new code path, cross-region (Schrems II + DNS dynamics), or tier-upgrade with new per-tenant resources. Risk-stratified explicitly trades speed for safety.

**The canary-first contract (CRITICAL).** First cohort is 1 tenant; the canary. Subsequent cohorts grow only after canary green:

| Cohort N | Cohort size | Decision gate |
|---|---|---|
| 1 (canary) | 1 tenant | Observe stability for full observation window (typically 24-72h for region migrations; 1-7 days for tier-upgrades). Green → proceed. |
| 2 (small) | ≥10 tenants | Observe stability for shorter window (typically 6-24h). Green → proceed. |
| 3 (medium) | ≥50 tenants | Observe stability for short window (typically 1-6h). Green → proceed. |
| 4+ (large) | 100-500 tenants per cohort | Full rollout cadence; per-cohort observation may compress to dashboards + alert-only. |

**Canary tenant selection.** Critical decision: which tenant becomes the canary? Three strategies:

1. **Lowest-risk:** smallest data footprint; least-active integrations; pre-prod or staging tenant if available. Lowest failure-blast-radius if canary fails; weakest signal (canary may not exercise rare paths).
2. **Representative:** median tenant by data volume + integration count + traffic. Best signal-to-noise ratio; moderate blast-radius if canary fails.
3. **Highest-risk (paranoid):** tenant with most-complex integration + largest data footprint. Strongest signal (if it passes, smaller tenants likely pass); highest blast-radius if canary fails.

Per-axis selection differs:
- **Tier-upgrade canary:** typically lowest-risk (specifically an internal test tenant or beta-program participant).
- **Region-migration canary:** typically representative (the migration must verify cross-region dynamics under realistic load).

**Best fit scenarios:**
- Region migrations (always)
- Tier-upgrades with new feature or schema
- Cross-tenancy-mechanism migrations (e.g., RLS → schema-per-tenant for a cohort)
- Any migration after a near-miss or incident

**Limitations:**
- Slowest method; total rollout duration scales with cohort count
- Operationally expensive (per-cohort observation; dashboards watched by humans; per-cohort sign-off)
- Canary observation windows are long; multi-day windows for cross-region

### Method 3: explicit

**When to use.** Cohorts are user-asserted because the tier/upgrade_mode taxonomy doesn't capture the relevant axis — typically residency-driven, contract-driven, or customer-success-team driven.

**Common patterns:**

- **Residency-driven cohorts.** "All EU tenants on us-east-1 move to eu-west-1 by 2026-Q4." Cohort scope is the residency-zone match, regardless of tier.
- **Contract-driven cohorts.** "All enterprise tenants on a single shared cell move to dedicated cells in the order of their original signup date." Cohort scope is contract-attribute-driven.
- **Customer-success-team batches.** Success team prepares cohorts based on customer-readiness signals (open support tickets; upcoming renewals; customer-team availability for the migration window).

**Sizing.** No defaults; user asserts size per cohort. The runbook validates each cohort has size_estimate ≥ 1.

**Best fit scenarios:**
- One-off migrations
- Regulatory-deadline-driven cohorts
- Custom-pricing customers with bespoke timelines

**Limitations:**
- Higher operational overhead (each cohort is hand-crafted)
- No safety net from method-specific patterns (rollout_tier_hint_driven assumes tier taxonomy; risk_stratified assumes canary; explicit assumes user knows what they're doing)
- Risk-stratified canary-first invariant doesn't apply — the user MAY explicitly skip canary; the runbook records the decision but doesn't enforce it

---

## Trade-offs

| Method | Safety | Speed | Op-complexity | When-default |
|---|---|---|---|---|
| rollout_tier_hint_driven | Medium (tier-population blast radius) | Fast (parallelizable by tier) | Low (auto-scoped by tier) | Tier-axis with stable upgrade_mode taxonomy |
| risk_stratified | Excellent (1-tenant canary first; expand on green) | Slowest | Medium (per-cohort observation + sign-off) | Region-axis; tier-axis with new feature/schema; any cross-mechanism migration |
| explicit | Variable (depends on user assertion) | Variable | High (per-cohort hand-crafted) | Residency-driven; contract-driven; one-off |

| Canary selection strategy | Blast-radius if canary fails | Signal strength | Op-feasibility |
|---|---|---|---|
| Lowest-risk | Lowest | Weakest | Easiest |
| Representative | Moderate | Best | Moderate |
| Highest-risk | Highest | Strongest | Hardest |

---

## Implementation Patterns

### Pattern: cohort sizing via tier population

```python
def size_cohorts_by_tier(tier_population, upgrade_modes):
    cohorts = []
    cohort_num = 1
    for tier_id, mode in upgrade_modes.items():
        tenant_count = tier_population[tier_id]
        target_cohort_size = {
            "self_serve": 100,
            "assisted": 25,
            "white_glove": 1
        }[mode]

        # Split tier into N cohorts of target_cohort_size each
        n_cohorts = max(1, tenant_count // target_cohort_size)
        for i in range(n_cohorts):
            cohorts.append({
                "name": f"{tier_id}_batch_{i+1}",
                "size_estimate": min(target_cohort_size, tenant_count - i * target_cohort_size),
                "tier_id": tier_id
            })
            cohort_num += 1
    return cohorts
```

This produces a tier-aligned cohort plan. The migration runbook serializes it into `cohort_plan.cohorts[]`.

### Pattern: risk_stratified canary-first

```python
def risk_stratified_cohort_plan(tenants, canary_strategy="representative"):
    cohorts = []

    # Cohort 1: canary (1 tenant)
    canary = select_canary(tenants, strategy=canary_strategy)
    cohorts.append({"name": "canary", "size_estimate": 1, "tenant_ids": [canary]})

    remaining = [t for t in tenants if t != canary]

    # Cohort 2: small (≥10 tenants)
    small_cohort = sample(remaining, k=min(10, len(remaining)))
    cohorts.append({"name": "small_cohort", "size_estimate": len(small_cohort), "tenant_ids": small_cohort})
    remaining = [t for t in remaining if t not in small_cohort]

    # Cohort 3+: medium-to-large (50+ each)
    while remaining:
        batch_size = min(50, len(remaining))
        batch = remaining[:batch_size]
        cohorts.append({"name": f"medium_batch_{len(cohorts)-1}", "size_estimate": batch_size, "tenant_ids": batch})
        remaining = remaining[batch_size:]

    return cohorts
```

The canary-first invariant is structural: cohorts[0].size_estimate is always 1. The step-07-v validator enforces this when `cohort_selection_method == "risk_stratified"`.

### Pattern: residency-driven explicit cohorts

```python
def residency_driven_cohorts(tenants, target_residency_zone):
    # Group tenants by residency-zone match for target
    eligible = [t for t in tenants if t.residency_zone == target_residency_zone or t.residency_zone is None]

    # Optional: sort by canary-strategy
    eligible.sort(key=lambda t: (t.last_signup_date, t.data_volume))

    # Hand-crafted cohorts (user reviews)
    cohorts = [
        {"name": "eu_canary", "size_estimate": 1, "tenant_ids": [eligible[0]]},
        {"name": "eu_small_cohort", "size_estimate": 10, "tenant_ids": eligible[1:11]},
        {"name": "eu_remainder", "size_estimate": len(eligible) - 11, "tenant_ids": eligible[11:]}
    ]
    return cohorts
```

Even an explicit method MAY follow risk-stratified shape (canary first) — explicit just means the user asserts the cohort composition rather than the method auto-deriving it.

### Pattern: observation window per cohort

```python
def observe_cohort(cohort, observation_window_hours, abort_criteria, observability_hooks):
    start_time = now()
    end_time = start_time + timedelta(hours=observation_window_hours)

    while now() < end_time:
        for criterion in abort_criteria:
            if criterion.triggered():
                emit_event("cohort_abort", {"cohort": cohort.name, "criterion": criterion.name, "timestamp": now()})
                return {"status": "aborted", "criterion": criterion.name}

        for hook in observability_hooks:
            hook.sample()

        sleep(60)  # 1-minute observation interval

    return {"status": "stable"}
```

The observation_window_hours varies per cohort + per axis:
- Region-axis canary: 24-72h
- Tier-axis canary: 24-168h (1-7 days)
- Subsequent cohorts (2, 3): 6-24h
- Large cohorts (50+): 1-6h with dashboard + alert-only

### Pattern: cohort failure → halt

```python
def execute_cohort_rollout(cohort_plan, rollback_gate, abort_criteria, observability_hooks):
    for cohort_idx, cohort in enumerate(cohort_plan.cohorts):
        print(f"Starting cohort {cohort_idx+1}: {cohort.name} ({cohort.size_estimate} tenants)")
        observation_window = compute_observation_window(cohort_idx, axis=cohort.axis)
        migrate_cohort(cohort)
        result = observe_cohort(cohort, observation_window, abort_criteria, observability_hooks)
        if result.status == "aborted":
            print(f"Cohort {cohort.name} aborted: {result.criterion}")
            initiate_rollback(cohort, rollback_gate)
            return {"status": "halted", "halted_at_cohort": cohort.name}

    return {"status": "complete"}
```

A failed cohort halts the entire rollout. Subsequent cohorts are NOT migrated until the failed cohort's investigation completes + the runbook is amended (or the rollout is declared abandoned).

---

## Quality Checks

- **CRITICAL:** Risk-stratified cohorts MUST start with 1-tenant canary before expanding to ≥10-tenant cohorts.

- **First cohort always observable.** Whichever method is chosen, cohort 1 must be sized to allow observation under realistic load. A 50-tenant cohort 1 means the first observation is at scale; if a bug surfaces, 50 tenants are affected at once.

- **Observation window per axis.** Cross-region requires longer observation (24-72h canary) than tier-upgrade (24-168h canary depending on per-tenant resource provisioning).

- **Cohort plan validates risk_stratified canary.** step-07-v: `cohort_selection_method == "risk_stratified"` ⇒ first cohort.size_estimate == 1. Violations exit 70.

- **Cohort sizing reflects current tenant population.** Quarterly review checks heuristic vs. actual tier population.

- **Canary strategy documented in runbook.** Whether canary is lowest-risk, representative, or highest-risk is captured in the ADR.

- **Cohort failure halts subsequent cohorts.** No "let's keep going + investigate later" — halt + investigate + amend or abandon.

- **Per-cohort sign-off required for risk_stratified.** Manual sign-off after observation window confirms migrator has reviewed signals before next cohort proceeds.

- **Cohort name unique within axis.** Each cohort's `name` is unique within `per_axis.<axis>.cohort_plan.cohorts[]`. Helps audit + post-hoc analysis.

- **size_estimate ≥ 1.** Zero-size cohorts are meaningless; step-07-v rejects.

- **Cohort assignments stable across edits.** When the runbook is edited mid-rollout, in-flight cohorts retain their original membership; only un-started cohorts may be re-scoped.

- **Bilateral consent for region cohorts.** Per `region-migration-playbook.md`, each tenant in a region-axis cohort has explicit consent before they're enrolled.

---

## Web Research Queries

Refresh empirical inputs annually. Replace `{date}` with current year.

- `canary deployment cohort size {date}` — practitioner patterns + SRE-book guidance.
- `risk stratified rollout SaaS {date}` — feature-management vendors (LaunchDarkly, Statsig) + their guidance.
- `feature flag canary tenant {date}` — multi-tenant canary patterns.
- `progressive delivery cohort size {date}` — vendor blog posts; common heuristics.
- `multi-tenant rollout post incident {date}` — failure modes + cohort-sizing root cause stories.
- `SLO error budget canary {date}` — Google SRE patterns; canary failure thresholds.
- `cohort migration {date}` — database / data-migration community patterns.

---

## Cross-references

**Companion fragments:**
- [[tenant-cohort-design]] — broader cohort-design context; this fragment is the migration-specific specialization
- [[migration-rollback-and-abort]] — what happens when a cohort fails; cohort failure triggers rollback
- [[tenant-tier-upgrade-mechanics]] — tier-axis cohort scoping; rollout_tier_hint_driven sources `upgrade_mode` from tier-model
- [[region-migration-playbook]] — region-axis cohort scoping; canary-first invariant is critical here
- [[rollout-strategies-comparison]] — broader rollout patterns; cohort is one of several rollout shapes

**Glossary:**
- `canary-tenant` (P3.2 implied; defined in this fragment)
- `cohort` (introduced in `tenant-cohort-design.md`; specialized here for migration)

**Quality gate:**
- `QG-D1` v0.1.0 — primary consumer; cohort_plan validation sources here
- `QG-M2` v1.1.0 — mirror consumer

**Anti-pattern:**
- [[deployment-without-cohorts]] (P3.1) — adjacent anti-pattern; this fragment is the remediation reference for cohort-less rollouts
- [[tier-upgrade-without-billing-prorate]] — sibling-axis anti-pattern

**Schemas:**
- `migration-runbook.json` schema (spec §3.5) — `per_axis.<axis>.cohort_plan` populates from this fragment's enumeration

**Downstream consumers:**
- `bmad-bam-design-tenant-migration-tooling` step-02 — loads cohort selection options from this fragment
- `bmad-bam-design-tenant-migration-tooling` step-04 — locks cohort plan; canary-first invariant enforced

**Upstream specs:**
- `docs/superpowers/specs/2026-05-17-p3-2-lifecycle-design.md` §2.4 (skill purpose), §3.5 (migration-runbook schema), §5.1.1 (fragment registration)
