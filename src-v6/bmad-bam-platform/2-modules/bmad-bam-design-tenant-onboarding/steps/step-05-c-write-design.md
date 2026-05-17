---
step_id: 05-c-write-design
auto_runnable: true
gate: machine-checkable
inputs: [onboarding-context.json, onboarding-options.json, decision-matrix.json, recommendation.json]
outputs: [onboarding-flow.md, onboarding-flow.json]
template_ref: onboarding-flow.md.template
---

# Step 05 — Write the design

## Purpose

Emit `onboarding-flow.md` (human narrative) + `onboarding-flow.json` (machine contract per spec §3.2).

## Actions

1. Read 4 cache files.

2. Read template at `../templates/onboarding-flow.md.template`.

3. Populate markdown narrative + write to `{project-root}/docs/architecture/onboarding-flow.md` (ensure parent dir via `mkdir -p`).

4. Build the JSON object per spec §3.2 schema:

```json
{
  "schema_version": "1.0",
  "decided_at": "<ISO-8601 UTC: YYYY-MM-DDTHH:MM:SSZ>",
  "flow_count": <int>,
  "defaults_source": {
    "tier_model_ref": "_bmad/bam/evidence/QG-F1/tier-model.json",
    "tier_model_schema_version": "<1.0 or 1.1>"
  },
  "flows": [
    {
      "tier_id": "<id>",
      "flow_type": "<self_serve|assisted_signup|sales_led>",
      "live_traffic": true,
      "provisioning_mode": "<auto|scripted|manual>",
      "isolation_verification_step": {
        "step_name": "<...>",
        "test_artifact": "<...>",
        "blocking": true,
        "blocking_rationale": "<...>"
      },
      "provisioning_hooks": [
        { "id": "<unique-id>", "module": "<lowercase pattern>", "blocking": <bool> }
      ]
    }
  ]
}
```

5. Write JSON to `{project-root}/_bmad/bam/evidence/QG-M2/onboarding-flow.json` (mkdir -p).

## Gate

Machine-checkable:
- Both files exist at expected paths
- JSON parses + has `schema_version`, `flow_count == len(flows)`
- Every flow has `isolation_verification_step.blocking: true` when `live_traffic: true`
- `provisioning_hooks[*].id` globally unique

## Next step

`step-06-c-record-adr.md`
