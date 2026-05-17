---
step_id: 04-c-recommendation
auto_runnable: false
gate: human-approval
inputs: [decision-matrix.json, migration-context.json, migration-options.json]
outputs: [recommendation.json]
---

# Step 04 — Lock per-axis playbook

## Purpose

Lock per-axis playbook (cohort_plan + dry_run_plan + rollback_gate + abort_criteria + observability_hooks). Each active axis gets the full 5-sub-field set. Output JSON shape per spec §3.5.

## Actions

1. **For each active axis** (`migration_axes` from context), compose the 5 sub-fields:

   **cohort_plan:**
   - `cohort_selection_method` (locked from decision-matrix; closed enum `{rollout_tier_hint_driven, risk_stratified, explicit}`)
   - `cohorts[]` — non-empty array of cohort objects. Each cohort has:
     - `name` (string; unique within axis)
     - `size_estimate` (int ≥ 1; tenant count estimate)
     - For tier-axis: `billing_prorate` (boolean; MUST be `true` per `tenant-tier-upgrade-mechanics.md` CRITICAL)
     - For region-axis: `residency_change` (boolean; `true` if crossing residency boundary; consent-first applies)
   - **Risk-stratified canary check:** if `cohort_selection_method == "risk_stratified"`, the FIRST cohort MUST have `size_estimate: 1` (canary; per `migration-cohort-selection.md` CRITICAL); subsequent cohorts ≥10 tenants.
   - **Empty cohorts: []` → ERROR (spec §3.5; step-07-v exit 70)**

   **dry_run_plan:**
   - `dry_run_environment` (locked from decision-matrix; closed enum `{staging, canary_tenant, shadow}`)
   - `cadence` (locked from decision-matrix; closed enum `{each_cohort, once_pre_rollout}`)

   **rollback_gate:**
   - `rollback_trigger[]` — non-empty array of trigger conditions (e.g., "error_rate > 5% sustained 10min", "data_integrity_violation detected")
   - `rollback_method` (locked from decision-matrix; closed enum `{blue_green_flip, canary_revert, cell_failback, dual_write_revert}`)
   - **Zero-downtime invariant 12:** if `zero_downtime_required: true` AND `rollback_method == "cell_failback"` → exit 70 with diagnostic (`cell_failback requires brief downtime; conflicts with zero_downtime_required`).

   **abort_criteria[]:**
   - Array of abort-criterion strings; merge `migration-context.json#abort_criteria_elicited` + axis-scoped defaults from `migration-options.json#shared_abort_defaults` (filter `axis_scope` matches).
   - Empty `[]` → WARN (not ERROR per spec §3.5).

   **observability_hooks[]:**
   - Array of hook descriptors; merge `migration-context.json#observability_hooks_elicited` + axis-scoped defaults from `migration-options.json#shared_observability_defaults`.
   - Empty `[]` → WARN (not ERROR per spec §3.5).

2. **Build `references` block (conditional):**
   - If `onboarding_flow_present: true` AND not malformed: include `references.onboarding_hook_ids[]` = `migration-context.json#onboarding_provisioning_hook_ids`.
   - If `offboarding_policy_present: true` AND not malformed: include `references.offboarding_policy_ids[]` = `migration-context.json#offboarding_policy_ids`.
   - If both soft inputs are ABSENT (not malformed; truly absent): OMIT the `references` block entirely.
   - If at least one soft input is PRESENT (even if also malformed): include `references` block with whatever keys are populated; OMIT keys for absent inputs.

3. **Set `references_degraded` (boolean):**
   - `true` iff at least one soft input was present-but-malformed at step-01 (from `migration-context.json#onboarding_flow_malformed OR offboarding_policy_malformed`).
   - `false` otherwise (including when soft inputs are entirely absent).

4. **Set `zero_downtime_required` (boolean):** from `migration-context.json#zero_downtime_required`.

5. **Mechanism awareness (mechanism-specific cohort detail):** For tier-axis, decorate cohorts with mechanism-aware tear-down + provision references where applicable:
   - RLS: cohort migration via row-tagged migration; tear-down via `db_row_*` policy unwind on rollback
   - schema-per-tenant: cohort migration via per-schema dump+restore; tear-down via schema drop on rollback
   - cell-based: cohort migration via cell-fail-forward; tear-down via cell-failback (NOT zero-downtime safe — see invariant 12)

6. **Sanity checks (machine-checkable before step-05):**
   - `migration_axes` is non-empty AND ⊆ `{"tier", "region"}` (closed set)
   - `per_axis` keys exactly match `migration_axes` (after normalization)
   - Each active axis has all 5 sub-fields present + non-empty `cohort_plan.cohorts[]`
   - When `cohort_selection_method == "risk_stratified"`: first cohort.size_estimate == 1
   - When `zero_downtime_required: true`: no axis uses `rollback_method: cell_failback`
   - `references_degraded` consistency with input state

7. **User signs off** on the locked per-axis playbook + references state.

## Output

`_bmad/bam/cache/.../{date}/recommendation.json`:

```json
{
  "schema_version": "1.0",
  "decided_at": "<ISO-8601 UTC: YYYY-MM-DDTHH:MM:SSZ>",
  "migration_axes": ["tier", "region"],
  "zero_downtime_required": true,
  "per_axis": {
    "tier": {
      "cohort_plan": {
        "cohort_selection_method": "rollout_tier_hint_driven",
        "cohorts": [
          {"name": "self_serve_batch_1", "size_estimate": 50, "billing_prorate": true},
          {"name": "assisted_batch_1", "size_estimate": 10, "billing_prorate": true},
          {"name": "white_glove_canary", "size_estimate": 1, "billing_prorate": true}
        ]
      },
      "dry_run_plan": {"dry_run_environment": "canary_tenant", "cadence": "once_pre_rollout"},
      "rollback_gate": {
        "rollback_trigger": ["error_rate > 5% sustained 10min", "billing_prorate_audit failure"],
        "rollback_method": "canary_revert"
      },
      "abort_criteria": ["error_rate_threshold breach", "data_integrity_violation", "billing_prorate audit fail"],
      "observability_hooks": ["migration_progress_dashboard", "tenant_id_error_log", "rollback_decision_audit", "billing_prorate_audit"]
    },
    "region": {
      "cohort_plan": {
        "cohort_selection_method": "risk_stratified",
        "cohorts": [
          {"name": "canary_us_to_eu_t1", "size_estimate": 1, "residency_change": true},
          {"name": "small_cohort_us_to_eu", "size_estimate": 10, "residency_change": true},
          {"name": "large_cohort_us_to_eu", "size_estimate": 50, "residency_change": true}
        ]
      },
      "dry_run_plan": {"dry_run_environment": "canary_tenant", "cadence": "each_cohort"},
      "rollback_gate": {
        "rollback_trigger": ["error_rate > 5% sustained 10min", "replication_lag > 30min on reconcile", "consent_audit failure"],
        "rollback_method": "blue_green_flip"
      },
      "abort_criteria": ["error_rate_threshold breach", "data_integrity_violation", "replication_lag_threshold breach", "consent_audit fail"],
      "observability_hooks": ["migration_progress_dashboard", "tenant_id_error_log", "rollback_decision_audit", "replication_lag_metric"]
    }
  },
  "references": {
    "onboarding_hook_ids": ["db_create_row", "apply_rls_policy"],
    "offboarding_policy_ids": ["starter:soft_delete", "enterprise:anonymize"]
  },
  "references_degraded": false,
  "user_signed_off": true
}
```

When a soft input is absent → OMIT corresponding key from `references` (or omit the whole `references` block when both absent).

## Gate

Human approval — user signs off on the locked playbook.

## Next step

`step-05-c-write-design.md`
