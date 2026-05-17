---
step_id: 04-c-recommendation
auto_runnable: false
gate: human-approval
inputs: [decision-matrix.json, onboarding-context.json, onboarding-options.json]
outputs: [recommendation.json]
---

# Step 04 — Recommendation

## Purpose

Lock final per-tier flow + provisioning hooks + isolation_verification_step per flow.

## Actions

1. For each tier from decision-matrix, finalize:
   - `flow_type` (locked from step-03)
   - `live_traffic` (default `true`; explicitly `false` for demo/sandbox tiers per spec Section 3.2)
   - `provisioning_mode` (auto/scripted/manual per flow type)
   - `provisioning_hooks[]` (mechanism-aware per Section 2.1 + hybrid resolution)
   - `isolation_verification_step` object:
     - `step_name` (length >= 5)
     - `test_artifact` (length >= 10; concrete description of cross-tenant probe)
     - `blocking` (MUST be true when `live_traffic: true`)
     - `blocking_rationale`

2. Verify global uniqueness of `provisioning_hooks[*].id` across all flows.

3. For custom tier_ids, hard-elicit (no defaults).

## Output

`_bmad/bam/cache/.../{date}/recommendation.json` — full per-tier lockdown.

## Gate

Human approval — user signs off.

## Next step

`step-05-c-write-design.md`
