---
step_id: 02-c-load-options
auto_runnable: true
gate: machine-checkable
inputs: [migration-context.json]
outputs: [migration-options.json]
---

# Step 02 — Load playbook templates per active axis

## Purpose

For each axis active in `migration-context.json#migration_axes`, load the playbook templates: cohort-selection options, dry-run environment options, rollback method options, abort-criteria defaults, observability-hook defaults. Each axis has axis-specific patterns; the shared spine (cohort + dry-run + rollback + abort + observability) is the same.

## Tier-axis playbook templates (when "tier" in migration_axes)

### Cohort selection methods (tier axis)

| cohort_selection_method | When to use | Mechanics |
|---|---|---|
| `rollout_tier_hint_driven` | tier-model has `upgrade_mode` populated (self_serve, assisted, white_glove); cohort scope from upgrade_mode taxonomy | self_serve tiers (free, starter) migrate in larger cohorts (≥50); assisted (pro, business) migrate in 10-tenant cohorts; white_glove (enterprise) migrate 1-tenant per cohort |
| `risk_stratified` | new-feature rollout; per-tenant risk scoring available; want canary-first | First cohort: 1 tenant (canary) chosen by risk-score-lowest; second: ≥10 tenants risk-medium; full rollout after canary green |
| `explicit` | one-off migration; user names cohorts directly | User-supplied named cohorts with per-cohort tenant list; size and risk profile user-asserted |

### Dry-run environment options (tier axis)

| dry_run_environment | When to use |
|---|---|
| `staging` | Staging mirrors production schema; tier-upgrade dry-run runs once before any cohort migrates |
| `canary_tenant` | Production-environment canary tenant; tier-upgrade rehearsed on canary tenant before each cohort |
| `shadow` | Dual-write tier-upgrade attempted in shadow; results compared against current-tier output before promoting |

### Dry-run cadence options (tier axis)

| cadence | When to use |
|---|---|
| `each_cohort` | Re-run dry-run before each cohort; high safety for risky migrations (schema changes; new features) |
| `once_pre_rollout` | One dry-run before whole rollout; lower cost; appropriate for low-risk migrations (UI flag flip with no schema change) |

### Rollback method options (tier axis)

| rollback_method | Mechanics | Zero-downtime compatible |
|---|---|---|
| `blue_green_flip` | Pre-migration version retained as blue; post-migration version cuts over to green; rollback flips back to blue | YES (no state-loss reattach needed) |
| `canary_revert` | Canary cohort tier-upgrade reverted via reverse-migration script; remaining cohorts paused | YES (no state-loss reattach needed) |
| `cell_failback` | Cell-based tiers: failback to source cell from target cell; requires brief downtime for state reattach | **NO** (downtime required; conflicts with `zero_downtime_required: true`; invariant 12) |
| `dual_write_revert` | If dual-write active during cutover, halt writes to new tier; promote old-tier-state as canonical; reconcile diff | YES (no state-loss reattach needed) |

### Tier-axis specific concerns

- **Billing proration:** EVERY tier-axis playbook MUST include billing proration at upgrade timestamp (see fragment `tenant-tier-upgrade-mechanics.md` CRITICAL). Full-price-from-day-N is the anti-pattern (see `tier-upgrade-without-billing-prorate.md`).
- **Feature-flip ordering:** Per-tier `upgrade_mode` informs flip cadence:
  - `self_serve`: flip immediately on payment confirmation
  - `assisted`: flip after success-team handoff (typically 24-48h post-payment)
  - `white_glove`: flip after data migration verification (per-tenant; days-to-weeks)
- **Schema/data migration:** Higher tiers may ship additional per-tenant tables (e.g., `enterprise_audit_log`, `business_export_history`). Runbook MUST enumerate these + the migration script + the rollback script (see `tenant-tier-upgrade-mechanics.md`).
- **Mechanism awareness:** Per `tenancy_model` from context:
  - RLS: tier-upgrade adds new RLS policies; rollback drops them — straightforward
  - schema-per-tenant: tier-upgrade adds tables to schema; rollback drops them; per-tier-schema migrations applied atomically (BYP-104 pattern from testing catalogue)
  - cell-based: tier-upgrade may require cell relocation (e.g., free → enterprise might move tenant from shared cell to dedicated cell); deferred to region-axis if same-region or coupled with `cell_failback` rollback

## Region-axis playbook templates (when "region" in migration_axes)

### Cohort selection methods (region axis)

| cohort_selection_method | When to use | Mechanics |
|---|---|---|
| `rollout_tier_hint_driven` | Migrate cohorts by `upgrade_mode` similarity (self_serve cohorts move in 50-tenant batches; white_glove move singly); same `upgrade_mode` taxonomy applies |
| `risk_stratified` | Cross-region is inherently riskier than tier-upgrade; canary tenant MUST be 1-tenant first; expand to ≥10-tenant cohorts only after canary green (per fragment `migration-cohort-selection.md` CRITICAL) |
| `explicit` | Residency-driven migration (e.g., move all EU tenants from us-east-1 to eu-west-1 by regulatory deadline); user names cohorts by residency-zone scope |

### Dry-run environment options (region axis)

| dry_run_environment | When to use |
|---|---|
| `staging` | Staging environments in both source + target regions; full DNS + dual-write rehearsed |
| `canary_tenant` | Per-region canary tenant (1 tenant migrated; observed for hours-to-days; full rollout after canary green) |
| `shadow` | Dual-write to target region with reads still served by source; results compared; flip after match |

### Dry-run cadence options (region axis)

| cadence | When to use |
|---|---|
| `each_cohort` | Re-rehearse before each cohort; recommended for cross-region (each cohort is high-stakes) |
| `once_pre_rollout` | One full rehearsal before whole rollout; only acceptable for low-data-volume cohorts |

### Rollback method options (region axis)

| rollback_method | Mechanics | Zero-downtime compatible |
|---|---|---|
| `blue_green_flip` | Both regions live during cutover; DNS flips back to source on rollback; data divergence reconciled by replication lag | YES (DNS-flip latency only) |
| `canary_revert` | Canary tenant DNS reverted to source; remaining cohorts paused; cross-region replication continues until investigation completes | YES |
| `cell_failback` | Cell at target region failed back to source-cell; requires brief downtime for state reattach (each tenant's session state restored from source) | **NO** (downtime required) |
| `dual_write_revert` | Dual-write to source + target during cutover window; if rollback, halt writes to target; promote source as canonical; reconcile diff manually | YES (no downtime; reconcile is offline) |

### Region-axis specific concerns

- **Residency consent FIRST:** Region migration MUST obtain consent BEFORE any data movement crossing residency boundaries (see `region-migration-playbook.md` CRITICAL). GDPR Art 6 + Schrems II implications. Consent-then-move-then-finalize is the only pattern; move-then-consent is a regulatory breach.
- **DNS cutover semantics:** TTL-bounded; TTL set to 60s during cutover window then restored to normal (typically 300s-3600s); see `region-migration-playbook.md` for full DNS cutover pattern.
- **Dual-write contract:** During cutover, writes go to both source + target; reads from source until promotion; conflict resolution rules locked down (typically: source-wins-until-promotion, target-wins-post-promotion); see `region-migration-playbook.md` dual-write section.
- **Cross-DC blue-green:** Distinct from same-DC blue-green; cross-DC adds replication lag; promotion must wait for replication-caught-up signal.
- **Mechanism awareness:**
  - RLS: cross-region replication carries RLS state; replication-stream-must-be-tenant-context-preserving (verify post-migration RLS in target)
  - schema-per-tenant: per-tenant schemas replicate independently; partial-cohort-replication possible (some tenants moved; others not)
  - cell-based: cells map directly to regions; cell-based + region-migration becomes cell-relocate-to-different-region (high-coupling; the most natural fit)

## Shared abort-criteria defaults (both axes)

- `error_rate_threshold`: error rate > 5% sustained ≥10min during migration window → abort
- `latency_threshold`: p99 latency > 2x pre-migration baseline sustained ≥10min → abort
- `data_integrity_violation`: any tenant cross-tenant data leak observed → abort + investigation
- `replication_lag_threshold` (region-axis only): replication lag > 30min on dual-write reconciliation → abort and re-rehearse
- `customer_complaint_threshold`: ≥3 customer complaints with same root cause in 24h post-cutover → pause + investigate

## Shared observability-hook defaults (both axes)

- `migration_progress_dashboard`: per-cohort progress dashboard (cohorts completed / total; failure count per cohort; runtime per cohort)
- `tenant_id_error_log`: structured-log entries during migration window with `tenant_id` + `migration_axis` + `cohort_id` fields
- `rollback_decision_audit`: every rollback decision (auto + manual) audited with cause + timestamp + reverter
- `replication_lag_metric` (region-axis): per-source/target pair replication-lag metric exposed to dashboards
- `billing_prorate_audit` (tier-axis): every tier-upgrade billing-prorate calculation captured for compliance audit

## Output

`_bmad/bam/cache/bmad-bam-design-tenant-migration-tooling/{date}/migration-options.json`:

```json
{
  "migration_axes": ["tier", "region"],
  "tier_playbook_options": {
    "cohort_selection_methods": ["rollout_tier_hint_driven", "risk_stratified", "explicit"],
    "dry_run_environments": ["staging", "canary_tenant", "shadow"],
    "cadences": ["each_cohort", "once_pre_rollout"],
    "rollback_methods": ["blue_green_flip", "canary_revert", "cell_failback", "dual_write_revert"],
    "tier_specific_patterns": ["billing_prorate", "feature_flip_ordering", "schema_data_migration"]
  },
  "region_playbook_options": {
    "cohort_selection_methods": ["rollout_tier_hint_driven", "risk_stratified", "explicit"],
    "dry_run_environments": ["staging", "canary_tenant", "shadow"],
    "cadences": ["each_cohort", "once_pre_rollout"],
    "rollback_methods": ["blue_green_flip", "canary_revert", "cell_failback", "dual_write_revert"],
    "region_specific_patterns": ["dns_cutover", "dual_write_contract", "cross_dc_blue_green", "residency_consent_first"]
  },
  "shared_abort_defaults": [
    {"criterion_name": "error_rate_threshold", "threshold": "5% sustained 10min", "action": "abort"},
    {"criterion_name": "latency_threshold", "threshold": "p99 > 2x baseline sustained 10min", "action": "abort"},
    {"criterion_name": "data_integrity_violation", "threshold": "any cross-tenant leak", "action": "abort"},
    {"criterion_name": "replication_lag_threshold", "threshold": "> 30min on reconcile", "action": "abort", "axis_scope": ["region"]},
    {"criterion_name": "customer_complaint_threshold", "threshold": "≥3 same-cause 24h", "action": "pause"}
  ],
  "shared_observability_defaults": [
    {"hook_name": "migration_progress_dashboard", "signal_type": "metric"},
    {"hook_name": "tenant_id_error_log", "signal_type": "structured-log"},
    {"hook_name": "rollback_decision_audit", "signal_type": "audit-log"},
    {"hook_name": "replication_lag_metric", "signal_type": "metric", "axis_scope": ["region"]},
    {"hook_name": "billing_prorate_audit", "signal_type": "audit-log", "axis_scope": ["tier"]}
  ],
  "zero_downtime_required": true,
  "rollback_methods_filtered_by_zero_downtime": {
    "tier_axis_eligible": ["blue_green_flip", "canary_revert", "dual_write_revert"],
    "region_axis_eligible": ["blue_green_flip", "canary_revert", "dual_write_revert"]
  }
}
```

When `zero_downtime_required: true`, the `rollback_methods_filtered_by_zero_downtime` block excludes `cell_failback` from eligibility for each active axis (spec invariant 12). step-04 will reject any selection of `cell_failback` when `zero_downtime_required: true`.

When `migration_axes: ["tier"]` only — `region_playbook_options` is OMITTED (key absent).
When `migration_axes: ["region"]` only — `tier_playbook_options` is OMITTED (key absent).

## Gate

Machine-checkable — playbook options loaded for every active axis; abort + observability defaults loaded; zero-downtime filter applied.

## Next step

`step-03-c-decision-matrix.md`
