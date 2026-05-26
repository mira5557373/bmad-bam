---
step_id: 01-c-elicit-context
auto_runnable: false
gate: human-approval
inputs: []
outputs: [migration-context.json]
---

# Step 01 — Elicit context

## Purpose

Read 3 required inputs (tier-model + deployment-topology + tenancy-decision) + 2 soft inputs (onboarding-flow + offboarding-policy); honor `--migration-axis` flag; elicit zero-downtime constraints + abort gates + observability hooks from the user; confirm extracted context.

## Actions

1. **Resolve `--migration-axis` flag.** Default `both` when absent. Enum check: `{tier, region, both}` — exit 64 with diagnostic listing valid values on unknown. Normalize:
   - `tier` → `migration_axes: ["tier"]`
   - `region` → `migration_axes: ["region"]`
   - `both` → `migration_axes: ["tier", "region"]`

2. **Read tier-model.json** with tool-aware-path-fallback:
   - Try `{project-root}/docs/architecture/tier-model.json` then `{project-root}/_bmad/bam/evidence/QG-F1/tier-model.json`
   - On absent: emit diagnostic + exit 64 (`Run bmad-bam-design-tenant-tier-model before this skill`)
   - On parse failure: exit 65
   - On empty: exit 66
   - Validate `schema_version` (warn if missing; assume "1.0"); apply auto-fill per Section 1.4 spec rules
   - schema 1.0 + default tier_id → auto-fill OK (uses 5-default presets; tier-model 1.1 auto-fill semantics apply uniformly)
   - schema 1.0 + custom tier_id → exit 70 (must re-run tier-model to schema 1.1 with explicit fields per Section 1.4 spec rules)
   - schema 1.1 → trust explicit fields
   - Extract `tiers[*].id` (tier list) + `tiers[*].upgrade_mode` (per-tier upgrade semantics)

3. **Read deployment-topology.json** with same fallback pattern. On absent: exit 64 (`Run bmad-bam-design-deployment-topology before this skill`). Extract:
   - `regions[*]` (region list with residency tags)
   - `cells[*]` (cell topology if applicable; per-region cell counts; per-cell tenant capacity)
   - `data_residency_zones[*]` (residency boundary set — EU/US/APAC/etc.)
   - When `migration_axes` includes `region` AND `len(regions) < 2`: warn — region-migration playbook will be designed but no actual region-pair is available; runbook is prospective only.

4. **Read tenancy-decision.json** with same fallback pattern. Extract:
   - `tenancy_model` (closed enum `{row-level-security, schema-per-tenant, cell-based, hybrid}`)
   - `hybrid_resolution` (if hybrid; per-tier mechanism map; each value MUST be one of `{row-level-security, schema-per-tenant, cell-based}` — no nested "hybrid")
   - Cohort migration mechanics differ per mechanism — RLS cohorts move via row-tagged migration; schema-per-tenant cohorts move via dump-and-restore per schema; cell-based cohorts move via cell-fail-forward.

5. **Read onboarding-flow.json (soft)** with same fallback pattern.
   - On absent → warn + record `onboarding_flow_present: false`; step-02 will emit generic provisioning at target (no hook-id references); step-05 will OMIT `references.onboarding_hook_ids` entirely (no empty array — key absent).
   - On parse failure → record `onboarding_flow_malformed: true`; step-01 emits diagnostic; step-05 sets `references_degraded: true`; downstream uses generic provisioning at target.
   - On present + parses → extract `flows[*].provisioning_hooks[*].id` for downstream references; record `onboarding_flow_present: true`.

6. **Read offboarding-policy.json (soft)** with same fallback pattern.
   - On absent → warn + record `offboarding_policy_present: false`; step-02 will emit generic tear-down at source (no policy-id references); step-05 will OMIT `references.offboarding_policy_ids` entirely.
   - On parse failure → record `offboarding_policy_malformed: true`; step-01 emits diagnostic; step-05 sets `references_degraded: true`; downstream uses generic tear-down at source.
   - On present + parses → extract `per_tier[*].policy_id` for downstream references; record `offboarding_policy_present: true`.

7. **Compute `references_degraded`:**
   - `true` iff at least one soft input was **present but malformed** (parse-failed) at this step
   - `false` if soft inputs are absent (no `references` block emitted at all) OR present + parsed cleanly
   - Spec §3.5: `references_degraded: true` iff a soft input was malformed; absent input = no `references` block + `references_degraded: false`

8. **Elicit zero-downtime constraint:** Prompt user — "Is zero-downtime required during migration windows? (yes/no)". Default `false` when not specified. When `true`, step-04 will reject any axis using `rollback_method: cell_failback` (spec invariant 12 — `cell_failback` requires brief downtime to reattach cell-local state).

9. **Elicit abort gates (zero-or-more):** Prompt user — "Any project-specific abort criteria beyond defaults? (e.g., 'p99 latency > 2x baseline for 10min', 'error rate > 5% sustained')". Default suggestions: error_rate_threshold, latency_threshold, customer_complaint_threshold, data_integrity_violation. Capture per-criterion: `criterion_name`, `threshold`, `measurement_window`, `action` (abort | pause | alert).

10. **Elicit observability hooks (zero-or-more):** Prompt user — "Which observability signals will be monitored during migration? (e.g., 'tenant-id-tagged error logs', 'per-cohort progress dashboard', 'rollback-decision audit log')". Default suggestions per axis. Capture per-hook: `hook_name`, `signal_type`, `dashboard_ref`.

11. **Confirm with user:** present extracted context (migration_axes; tier count; region count; tenancy_model; soft-input availability + degraded state; zero_downtime_required; abort-gate count; observability-hook count). Pause for human-approval.

## Output

Write cache to `_bmad/bam/cache/bmad-bam-design-tenant-migration-tooling/{date}/migration-context.json`:

```json
{
  "migration_axes": ["tier", "region"],
  "migration_axis_flag_raw": "both",
  "tier_ids": ["free", "starter", "pro", "business", "enterprise"],
  "tier_upgrade_modes": {"free": "self_serve", "starter": "self_serve", "pro": "assisted", "business": "assisted", "enterprise": "white_glove"},
  "tier_model_schema_version": "1.1",
  "regions": [
    {"id": "us-east-1", "residency_zone": "US"},
    {"id": "eu-west-1", "residency_zone": "EU"}
  ],
  "cells": [],
  "data_residency_zones": ["US", "EU"],
  "tenancy_model": "row-level-security",
  "hybrid_resolution": null,
  "onboarding_flow_present": true,
  "onboarding_flow_malformed": false,
  "onboarding_provisioning_hook_ids": ["db_create_row", "apply_rls_policy"],
  "offboarding_policy_present": true,
  "offboarding_policy_malformed": false,
  "offboarding_policy_ids": ["starter:soft_delete", "enterprise:anonymize"],
  "references_degraded": false,
  "zero_downtime_required": true,
  "abort_criteria_elicited": [
    {"criterion_name": "error_rate", "threshold": "5% sustained 10min", "measurement_window": "10min", "action": "abort"}
  ],
  "observability_hooks_elicited": [
    {"hook_name": "tenant_id_error_log", "signal_type": "structured-log", "dashboard_ref": "grafana://migration-dashboard"}
  ],
  "user_confirmed": true
}
```

When `migration_axes == ["tier"]` (region-axis disabled):
- `regions[]` may still be populated (informational); the region-playbook is NOT emitted in step-05.

When `migration_axes == ["region"]` (tier-axis disabled):
- `tier_upgrade_modes` may still be populated (informational); the tier-playbook is NOT emitted in step-05.

When a soft input is absent (e.g., `onboarding_flow_present: false`):
- `onboarding_provisioning_hook_ids` is `null` (no `[]` placeholder)
- step-05 will OMIT `references.onboarding_hook_ids` from output

When a soft input is malformed (e.g., `offboarding_policy_malformed: true`):
- `offboarding_policy_ids` is `[]` (empty array; could not extract)
- `references_degraded: true` propagates through step-05

## Gate

Human approval — user confirms the elicited context (axes, zero-downtime, abort gates, observability hooks, soft-input state) before step-02 loads playbook templates.

## Next step

`step-02-c-load-options.md`
