---
step_id: 01-c-elicit-context
auto_runnable: false
gate: human-approval
inputs: []
outputs: [onboarding-context.json]
---

# Step 01 — Elicit context

## Purpose

Read 3 required inputs (tier-model + tenancy-decision + optional deployment-topology); resolve hybrid tenancy if applicable; confirm with user.

## Actions

1. **Read tier-model.json** with tool-aware-path-fallback:
   - Try `{project-root}/docs/architecture/tier-model.json` then `{project-root}/_bmad/bam/evidence/QG-F1/tier-model.json`
   - On absent: emit diagnostic + exit 64 (`Run bmad-bam-design-tenant-tier-model before this skill`)
   - On parse failure: exit 65
   - On empty: exit 66
   - Validate schema_version (warn if missing; assume "1.0"); apply auto-fill per Section 1.4 spec rules
   - On custom-mode 1.0: exit 70 with diagnostic naming re-run requirement

2. **Read tenancy-decision.json** with same fallback pattern.

3. **Read deployment-topology.json** (soft); on absent → warn + skip cohort-hint use.

4. **Hybrid resolution:** if `tenancy-decision.json#tenancy_model == "hybrid"`, read `hybrid_resolution` map. Each tier_id MUST be present (validated against tier-model tier_ids).

5. **Confirm with user:** present extracted context (tier count, isolation_model, flow_count assumptions). Pause for human-approval.

## Output

Write cache to `_bmad/bam/cache/bmad-bam-design-tenant-onboarding/{date}/onboarding-context.json`:

```json
{
  "tier_ids": ["free", "starter", "pro", "business", "enterprise"],
  "tier_upgrade_modes": {"free": "self_service", ...},
  "tenancy_model": "row-level-security",
  "hybrid_resolution": null,
  "deployment_cohort_hints": {...} | null,
  "user_confirmed": true
}
```

## Gate

Human approval — user confirms the elicited context before step-02 loads options.

## Next step

`step-02-c-load-options.md`
