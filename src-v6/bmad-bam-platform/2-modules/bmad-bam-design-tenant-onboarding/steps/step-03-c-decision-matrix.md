---
step_id: 03-c-decision-matrix
auto_runnable: false
gate: human-approval
inputs: [onboarding-context.json, onboarding-options.json]
outputs: [decision-matrix.json]
---

# Step 03 — Decision matrix

## Purpose

Score per-tier flow_type assignment against 4 axes; user reviews + may override pre-fill.

## Axes

| Axis | Question | Weight |
|---|---|---|
| Friction-vs-conversion | How much signup friction does this tier tolerate while still converting? | High |
| AE-bandwidth | Does sales-team capacity support assisted/sales-led for this tier volume? | Medium |
| Security-review-overhead | Does tier require DPA/security review (regulated buyers)? | High for enterprise; Low for free |
| Time-to-first-value | How quickly must tenant see value after signup? | High for free (instant); Low for enterprise (procurement-paced) |

## Process

1. For each tier, present pre-fill from step-02 + axis scores.
2. User confirms or overrides per tier.
3. Capture rationale per override.

## Output

`_bmad/bam/cache/.../{date}/decision-matrix.json`:
```json
{
  "per_tier": [
    {
      "tier_id": "free",
      "flow_type": "self_serve",
      "axis_scores": {"friction": 5, "ae_bandwidth": 5, "security": 5, "time_to_value": 5},
      "override_rationale": null
    }
  ]
}
```

## Gate

Human approval — user signs off on per-tier assignments.

## Next step

`step-04-c-recommendation.md`
