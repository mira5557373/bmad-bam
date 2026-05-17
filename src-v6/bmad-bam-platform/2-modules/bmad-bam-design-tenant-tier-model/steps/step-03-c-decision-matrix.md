---
step_id: 03-c-decision-matrix
auto_runnable: true
gate: machine-checkable
inputs: [tier-model-context.json, options-loaded.json]
outputs: [decision-matrix.json]
---

# Step 03 — Score each tier against context

## Purpose

Quantitative per-tier scoring: each tier (the surviving subset from `tier_ids_considered`) is scored 1-5 on each of 4 axes. Apply per-axis weights. Per-tier weighted sums surface which tiers in the scaffold are weakly justified and may warrant collapsing or repositioning before step-04's recommendation.

## Actions

1. Read `tier-model-context.json` + `options-loaded.json` from `_bmad/bam/cache/tier-model-design/{date}/`.

2. For each surviving tier (from `tier_ids_considered` minus `tier_ids_eliminated_by_user`), score on these 4 axes (1 = poor fit / strong concern, 5 = strong fit / low concern):

   | Axis | Score 1-5 source | Default weight |
   |---|---|---|
   | **target-segment-fit** | Does this tier match a real segment in `target_tenant_types`? Free + starter for consumer/smb; business + enterprise for enterprise; pro bridges. Score low if no clear segment maps to the tier (= dead tier risk). | 0.30 |
   | **price-point-alignment** | Is the price coherent with the surrounding tiers (rough 5× geometric progression per spec §3.Q3) and with the segment's willingness-to-pay? Score low if the gap to adjacent tiers is too narrow (cannibalization) or too wide (cliff). | 0.25 |
   | **feature-cliff-risk** | Inverse: 5 = low cliff risk, 1 = high. Score low if the tier sits between two tiers whose feature deltas force users to skip it. Anchored by `tier-cliff-avoidance` fragment. | 0.25 |
   | **upgrade-path-clarity** | Is the trigger for moving up from this tier obvious to a tenant (a clear limit they will hit, a clear feature they will need)? Score low if the next tier looks identical from this one's perspective. | 0.20 |

3. Compute weighted sum per tier:
   `weighted_sum = Σ (score_axis × weight_axis)`

   Flag any tier whose `weighted_sum < 3.0` — these are candidates for collapse/removal at step-04. Per spec §3.Q3 the 5-default matrix is the well-trodden path; a flagged tier inside the 5-default should be defended explicitly in step-04's rationale rather than silently retained.

4. Write `decision-matrix.json` to the cache dir.

## Output

Write `{project-root}/_bmad/bam/cache/tier-model-design/{date}/decision-matrix.json`:

```json
{
  "schema_version": "1.0",
  "scored_at": "<ISO-8601 UTC>",
  "weights": {
    "target_segment_fit": 0.30,
    "price_point_alignment": 0.25,
    "feature_cliff_risk": 0.25,
    "upgrade_path_clarity": 0.20
  },
  "matrix": {
    "free": {
      "target_segment_fit": <1-5>,
      "price_point_alignment": <1-5>,
      "feature_cliff_risk": <1-5>,
      "upgrade_path_clarity": <1-5>,
      "weighted_sum": <float>
    },
    "starter": { ... },
    "pro": { ... },
    "business": { ... },
    "enterprise": { ... }
  },
  "weak_tiers": ["<tier-id with weighted_sum < 3.0>", "..."]
}
```

## Gate

Machine-checkable: each surviving tier has all 4 axes + `weighted_sum`. Weights sum to 1.0 (±0.001). `weak_tiers` is an array (possibly empty) drawn from the matrix keys.

## Next step

`step-04-c-recommendation.md`
