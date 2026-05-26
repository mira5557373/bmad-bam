---
step_id: 05-c-write-design
auto_runnable: true
gate: machine-checkable
inputs: [migration-context.json, migration-options.json, decision-matrix.json, recommendation.json]
outputs: [migration-runbook.md, migration-runbook.json]
template_ref: migration-runbook.md.template
---

# Step 05 — Write the design (3-location write)

## Purpose

Emit `migration-runbook.md` (human narrative) + `migration-runbook.json` (machine contract per spec §3.5) to **3 locations**:
1. `{project-root}/docs/architecture/migration-runbook.md` — narrative
2. `{project-root}/_bmad/bam/evidence/QG-D1/migration-runbook.json` — JSON canonical (primary; QG-D1 sign-off source)
3. `{project-root}/_bmad/bam/evidence/QG-M2/migration-runbook.json` — JSON byte-identical mirror (H4 partial-proxy temporal contract; removed when P10 ships full DR)

## Actions

1. Read 4 cache files.

2. Read template at `../templates/migration-runbook.md.template`.

3. Populate markdown narrative + write to `{project-root}/docs/architecture/migration-runbook.md` (`mkdir -p` parent dir).

4. Build the JSON object per spec §3.5 schema:

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
          {"name": "self_serve_batch_1", "size_estimate": 50, "billing_prorate": true}
        ]
      },
      "dry_run_plan": {"dry_run_environment": "canary_tenant", "cadence": "once_pre_rollout"},
      "rollback_gate": {
        "rollback_trigger": ["error_rate > 5% sustained 10min"],
        "rollback_method": "canary_revert"
      },
      "abort_criteria": ["error_rate_threshold breach", "data_integrity_violation"],
      "observability_hooks": ["migration_progress_dashboard", "tenant_id_error_log"]
    },
    "region": {
      "cohort_plan": {
        "cohort_selection_method": "risk_stratified",
        "cohorts": [
          {"name": "canary_us_to_eu_t1", "size_estimate": 1, "residency_change": true}
        ]
      },
      "dry_run_plan": {"dry_run_environment": "canary_tenant", "cadence": "each_cohort"},
      "rollback_gate": {
        "rollback_trigger": ["error_rate > 5% sustained 10min", "replication_lag > 30min on reconcile"],
        "rollback_method": "blue_green_flip"
      },
      "abort_criteria": ["error_rate_threshold breach", "data_integrity_violation"],
      "observability_hooks": ["migration_progress_dashboard", "tenant_id_error_log", "replication_lag_metric"]
    }
  },
  "references": {
    "onboarding_hook_ids": ["db_create_row"],
    "offboarding_policy_ids": ["starter:soft_delete"]
  },
  "references_degraded": false
}
```

5. **`migration_axes` field:** must equal `recommendation.json#migration_axes` exactly (closed set ⊆ `["tier", "region"]`, non-empty). Order is informational — step-07-v normalizes via alpha-sort comparison.

6. **`per_axis` keys:** MUST match `migration_axes` exactly (1:1 correspondence). Each active axis has all 5 sub-fields (cohort_plan + dry_run_plan + rollback_gate + abort_criteria + observability_hooks).

7. **`references` block (conditional emit):**
   - If both soft inputs absent → OMIT entire `references` block (key absent — do not emit empty object).
   - If at least one soft input present → emit `references` block with whatever keys are populated:
     - `onboarding_hook_ids[]` present iff `onboarding_flow_present: true`
     - `offboarding_policy_ids[]` present iff `offboarding_policy_present: true`
     - Each populated key contains the upstream IDs extracted in step-01.

8. **`references_degraded` field:** ALWAYS emit (top-level boolean). `true` iff at least one soft input was present-but-malformed; `false` otherwise.

9. **`zero_downtime_required` field:** ALWAYS emit (top-level boolean).

10. **Write JSON canonical to BOTH evidence locations:**
    - `{project-root}/_bmad/bam/evidence/QG-D1/migration-runbook.json` (`mkdir -p` parent)
    - `{project-root}/_bmad/bam/evidence/QG-M2/migration-runbook.json` (`mkdir -p` parent)
    - **The JSON files MUST be byte-identical** (mirror semantics; not two different views). Verify post-write via `cmp` or hash compare.

11. **3-location write recap:**
    - `.md` → `docs/architecture/migration-runbook.md` (narrative)
    - `.json` → `_bmad/bam/evidence/QG-D1/migration-runbook.json` (primary)
    - `.json` → `_bmad/bam/evidence/QG-M2/migration-runbook.json` (mirror — byte-identical to primary)

## Gate

Machine-checkable:
- All 3 files exist at expected paths
- JSON files at QG-D1/ and QG-M2/ are byte-identical (hash compare)
- JSON parses + has `schema_version`, `migration_axes` (non-empty), `per_axis` (keys match migration_axes), `zero_downtime_required` (bool), `references_degraded` (bool)
- Each active axis in `per_axis` has all 5 sub-fields present
- `per_axis.<axis>.cohort_plan.cohorts[]` is non-empty

## Next step

`step-06-c-record-adr.md`
