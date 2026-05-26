---
step_id: 01-c-elicit-context
auto_runnable: false
gate: human-approval
inputs: []
outputs: [testing-context.json]
---

# Step 01 — Elicit context

## Purpose

Read 1 required input (tenancy-decision.json) + 1 soft input (tier-model.json); confirm `isolation_model`; if hybrid, resolve per-tier mechanism map from `hybrid_resolution`. Soft-input fallback: tier-model absent → uniform `severity: should-have` for noisy-neighbor category in step-02.

## Actions

1. **Read tenancy-decision.json** with tool-aware-path-fallback:
   - Try `{project-root}/docs/architecture/tenancy-decision.json` then `{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json`
   - On absent: emit diagnostic + exit 64 (`Run bmad-bam-design-tenancy-model before this skill`)
   - On parse failure: exit 65
   - On empty: exit 66
   - Validate `schema_version` (warn if missing; assume "1.0")
   - Extract `tenancy_model` (closed enum `{row-level-security, schema-per-tenant, cell-based, hybrid}`)

2. **Hybrid resolution:** if `tenancy_model == "hybrid"`:
   - Read `hybrid_resolution` map (per-tier mechanism: `{tier_id: <model>}`)
   - Each entry's value MUST be one of `{row-level-security, schema-per-tenant, cell-based}` (no nested "hybrid")
   - If `tier-model.json` is present (see step 3), cross-check that `hybrid_resolution` keys are a subset of `tier-model.tiers[*].id` — missing tier → step-07-v will fail (deferred to validation).
   - If `tier-model.json` is absent, accept `hybrid_resolution` as-is + warn that completeness cannot be verified until tier-model is provided.

3. **Read tier-model.json** (soft) with same fallback pattern:
   - On absent → warn + record `tier_model_present: false`; step-02 will assign uniform `severity: should-have` for noisy-neighbor category.
   - On present → extract `tiers[*].id` for per-tier severity assignment (enterprise → `must-have`; pro/business → `should-have`; free/starter → `nice-to-have` for noisy-neighbor severity bands).
   - schema 1.0 + default tier_id → auto-fill OK (tier-model 1.1 auto-fill semantics apply uniformly)
   - schema 1.0 + custom tier_id → exit 70 (must re-run tier-model to schema 1.1 with explicit field set per Section 1.4 spec rules)
   - schema 1.1 → trust explicit fields

4. **Confirm with user:** present extracted context (tenancy_model; hybrid_resolution if applicable; tier list + count if tier-model present; degraded-mode flag if absent). Pause for human-approval.

## Output

Write cache to `_bmad/bam/cache/bmad-bam-design-multi-tenant-testing/{date}/testing-context.json`:

```json
{
  "tenancy_model": "row-level-security",
  "hybrid_resolution": null,
  "tier_model_present": true,
  "tier_ids": ["free", "starter", "pro", "business", "enterprise"],
  "tier_model_schema_version": "1.1",
  "noisy_neighbor_severity_by_tier": {
    "free": "nice-to-have",
    "starter": "nice-to-have",
    "pro": "should-have",
    "business": "should-have",
    "enterprise": "must-have"
  },
  "user_confirmed": true
}
```

When `tenancy_model == "hybrid"`:

```json
{
  "tenancy_model": "hybrid",
  "hybrid_resolution": {
    "free": "row-level-security",
    "starter": "row-level-security",
    "pro": "schema-per-tenant",
    "business": "schema-per-tenant",
    "enterprise": "cell-based"
  },
  ...
}
```

When `tier_model_present: false`:

```json
{
  "tenancy_model": "row-level-security",
  "hybrid_resolution": null,
  "tier_model_present": false,
  "tier_ids": [],
  "noisy_neighbor_severity_by_tier": {},
  "noisy_neighbor_default_severity": "should-have",
  "user_confirmed": true
}
```

## Gate

Human approval — user confirms the elicited context (tenancy_model + hybrid_resolution + tier-list or degraded-mode) before step-02 loads test classes.

## Next step

`step-02-c-load-options.md`
