---
step_id: 03-c-decision-matrix
auto_runnable: false
gate: human-approval
inputs: [migration-context.json, migration-options.json]
outputs: [decision-matrix.json]
---

# Step 03 — Per-axis decision matrix (cohort × rollback × dry-run)

## Purpose

Per active axis, score the combinatorial space (cohort_selection_method × rollback_method × dry_run cadence) against four decision axes; user reviews + selects per-axis combination + acknowledges trade-offs.

## Decision axes (per migration axis)

| Axis | Question | Weight |
|---|---|---|
| Safety | Does this combination minimize blast radius (small cohort + each-cohort dry-run + low-coupling rollback)? | High |
| Speed | Does this combination complete the migration within operational budget (larger cohorts + once-pre-rollout cadence + faster rollback)? | Medium |
| Operational complexity | How much human-attention overhead (per-cohort sign-off; pause/resume; dashboard watching)? | Medium |
| Cost (compute + storage during cutover) | Dual-write doubles writes; blue-green doubles compute capacity during window; canary requires per-cohort dry-run resource | Low-Medium |

## Per-method axis fitness (reference; tier axis)

| cohort_selection_method | Safety | Speed | Op-complexity | Cost |
|---|---|---|---|---|
| `rollout_tier_hint_driven` | Medium (cohort size from tier; self-serve cohorts are larger ⇒ blast radius higher) | Fast (parallelizable per tier) | Low (tier-driven scope is automatic) | Low |
| `risk_stratified` | Excellent (canary first; expand on green) | Slowest (sequential canary → small → larger) | Medium (per-cohort risk scoring + sign-off) | Medium |
| `explicit` | Variable (depends on user's cohort selection) | Variable | High (per-cohort hand-crafted) | Variable |

| rollback_method | Safety | Speed | Op-complexity | Cost |
|---|---|---|---|---|
| `blue_green_flip` | Excellent (instant flip-back) | Fast | Medium (2x compute during cutover) | High (2x compute) |
| `canary_revert` | Excellent (canary-only rollback; uncutover cohorts untouched) | Fast on canary; full-cohort revert is slower | Low (only canary in flight at rollback time) | Low (no doubled resources) |
| `cell_failback` | Variable (state reattach requires brief downtime) | Slow (downtime per tenant) | High (per-tenant state migration) | Medium (cell-local state must be preserved) |
| `dual_write_revert` | Good (no state loss; promote source) | Medium | High (dual-write infrastructure required) | High (2x writes during window) |

| cadence | Safety | Speed | Op-complexity | Cost |
|---|---|---|---|---|
| `each_cohort` | Excellent (rehearsed before every cohort) | Slow (re-rehearsal overhead) | High | Medium (per-cohort dry-run resource) |
| `once_pre_rollout` | Lower (one rehearsal for whole rollout) | Fast | Low | Low |

## Per-method axis fitness (reference; region axis)

| cohort_selection_method | Safety | Speed | Op-complexity | Cost |
|---|---|---|---|---|
| `rollout_tier_hint_driven` | Medium (tier-based cohort scoping; residency-cross may not align with tier) | Fast (parallelizable per tier) | Medium (tier × residency intersection) | Medium |
| `risk_stratified` | Excellent (1-tenant canary; expand on green; mandatory for cross-region per `migration-cohort-selection.md` CRITICAL) | Slowest | High (per-cohort signoff after observe window) | Medium |
| `explicit` | Variable (user-named cohorts; residency-scope often natural fit) | Variable | High | Variable |

| rollback_method | Safety | Speed | Op-complexity | Cost |
|---|---|---|---|---|
| `blue_green_flip` | Excellent for cross-region (DNS flip back; both regions stay live during cutover) | Fast (DNS-flip TTL bounded) | High (2x region capacity during cutover) | Very High (2x cross-region cost) |
| `canary_revert` | Excellent | Fast (DNS revert for canary only) | Low | Low |
| `cell_failback` | Variable (state reattach across regions adds latency) | Slow | High (cross-region cell state migration) | High |
| `dual_write_revert` | Good (writes-to-source + writes-to-target during cutover; reconcile on promote) | Medium | Very High (cross-region dual-write infrastructure) | Very High |

| cadence | Safety | Speed | Op-complexity | Cost |
|---|---|---|---|---|
| `each_cohort` | Excellent (cross-region rehearsal per cohort) | Slow | Very High (per-cohort cross-region staging) | High |
| `once_pre_rollout` | Medium-Low (one cross-region rehearsal for whole rollout; risky) | Fast | Medium | Medium |

## Recommended combinations

| Project posture | Tier-axis recommendation | Region-axis recommendation |
|---|---|---|
| Greenfield / low-stakes | rollout_tier_hint_driven + canary_revert + once_pre_rollout | risk_stratified + canary_revert + each_cohort (mandatory canary) |
| Regulated / high-stakes | risk_stratified + blue_green_flip + each_cohort | risk_stratified + blue_green_flip + each_cohort |
| Existing customers (pre-launch) | risk_stratified + dual_write_revert + each_cohort | risk_stratified + dual_write_revert + each_cohort |

## Zero-downtime filter

When `migration-context.json#zero_downtime_required == true`:
- `cell_failback` rollback_method is REJECTED for every axis (spec invariant 12); decision matrix MUST NOT score it as eligible.
- step-04 will exit 70 if user nonetheless attempts to lock `cell_failback`.

## Process

1. **For each active axis**, present the combinatorial space (3 cohort methods × 4 rollback methods × 2 cadences = up to 24 combinations per axis; reduced by zero-downtime filter when applicable).

2. **Present recommended-combination per project posture.** Default to "Regulated / high-stakes" for projects with `tenancy_model in {cell-based, hybrid}` OR `regions[*].residency_zone` containing EU; default to "Greenfield" otherwise.

3. **User selects per-axis combination.** Each axis gets one combination; combinations across axes need NOT be the same (e.g., tier-axis: rollout_tier_hint_driven + canary_revert + once_pre_rollout; region-axis: risk_stratified + blue_green_flip + each_cohort).

4. **User reviews axis fitness scores** + acknowledges trade-offs per axis.

5. **Verify zero-downtime filter:** If `zero_downtime_required: true` AND any axis selects `cell_failback` → flag + force user to re-select (spec invariant 12).

## Output

`_bmad/bam/cache/.../{date}/decision-matrix.json`:

```json
{
  "per_axis": {
    "tier": {
      "cohort_selection_method": "rollout_tier_hint_driven",
      "rollback_method": "canary_revert",
      "cadence": "once_pre_rollout",
      "fitness_score": {"safety": 4, "speed": 4, "op_complexity": 3, "cost": 4},
      "user_acknowledged_tradeoffs": ["self-serve cohort blast-radius accepted on basis of fast canary revert + once-pre-rollout dry-run sufficiency for tier-flip"]
    },
    "region": {
      "cohort_selection_method": "risk_stratified",
      "rollback_method": "blue_green_flip",
      "cadence": "each_cohort",
      "fitness_score": {"safety": 5, "speed": 2, "op_complexity": 4, "cost": 2},
      "user_acknowledged_tradeoffs": ["2x region capacity cost accepted on basis of cross-region rollback safety", "each-cohort dry-run accepted on basis of regulatory deadline being lenient"]
    }
  },
  "zero_downtime_filter_applied": true,
  "cell_failback_blocked": true,
  "user_signed_off": true
}
```

When `migration_axes: ["tier"]` only — `per_axis.region` is OMITTED (key absent).
When `migration_axes: ["region"]` only — `per_axis.tier` is OMITTED (key absent).

## Gate

Human approval — user signs off on per-axis combinations + acknowledges trade-offs.

## Next step

`step-04-c-recommendation.md`
