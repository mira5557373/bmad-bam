---
step_id: 03-c-decision-matrix
auto_runnable: true
gate: machine-checkable
inputs: [deployment-topology-context.json, options-loaded.json]
outputs: [decision-matrix.json]
---

# Step 03 — Score each rollout primitive against context

## Purpose

Quantitative per-primitive scoring: each surviving rollout primitive (from `primitives_considered`) is scored 1-5 on each of 4 axes. Apply per-axis weights. Per-primitive weighted sums surface which primitive best fits the tenancy + risk + cost profile elicited in step-01.

## Actions

1. Read `deployment-topology-context.json` + `options-loaded.json` from `_bmad/bam/cache/deployment-topology-design/{date}/`.

2. For each surviving primitive (from `primitives_considered`), score on these 4 axes (1 = poor / strong concern, 5 = strong fit / low concern):

   | Axis | Score 1-5 source | Default weight |
   |---|---|---|
   | **blast-radius-containment** | How small is the impact set of a bad deploy under this primitive, given `tenancy_model`? `per-cell-blue-green` on cell-based scores 5; `app-canary` on RLS scores 3 (request-percentage, not tenant-set); a primitive ill-matched to tenancy scores 1. | 0.30 |
   | **rollback-complexity** | Inverse: 5 = simple rollback within the `rollback_sla` from context, 1 = rollback cannot meet the SLA or has hard data-migration constraints. Anchored by `rollback-strategies` fragment + `zero-downtime-migrations` migration discipline. | 0.25 |
   | **tier-tolerance-fit** | How well does the primitive support the `risk_tolerance_per_tier` mix? A `single-primitive` deploy can't differentiate by tier (score 2-3 if mix spans aggressive→white-glove); `hybrid` scores high when the mix is wide; `per-cell-blue-green` scores high for white-glove tiers but penalizes free-tier rollout velocity. | 0.25 |
   | **infrastructure-cost** | Inverse: 5 = no extra infra over baseline, 1 = doubles+ infra (`per-cell-blue-green` requires standing up a parallel cell; `app-canary` requires only a small fleet slice; `per-schema-rollout` requires per-tenant migration tooling). Anchored by `rollout-strategies-comparison` fragment cost table. | 0.20 |

3. Compute weighted sum per primitive:
   `weighted_sum = Σ (score_axis × weight_axis)`

   Apply two flags that step-04 will read when generating the recommendation:
   - **single-region warning** — if `target_environments == "single-region"` from context AND the primitive is `per-cell-blue-green`, cap its `blast-radius-containment` score at 2 (per step-02 §3: a one-cell deploy IS the prod env, so the "blast radius" benefit doesn't apply).
   - **weak primitive flag** — primitives with `weighted_sum < 3.0` are flagged as `weak_primitives`. Step-04's recommendation must explicitly defend or reject a weak primitive.

4. Write `decision-matrix.json` to the cache dir.

## Output

Write `{project-root}/_bmad/bam/cache/deployment-topology-design/{date}/decision-matrix.json`:

```json
{
  "schema_version": "1.0",
  "scored_at": "<ISO-8601 UTC>",
  "weights": {
    "blast_radius_containment": 0.30,
    "rollback_complexity": 0.25,
    "tier_tolerance_fit": 0.25,
    "infrastructure_cost": 0.20
  },
  "matrix": {
    "app-canary": {
      "blast_radius_containment": <1-5>,
      "rollback_complexity": <1-5>,
      "tier_tolerance_fit": <1-5>,
      "infrastructure_cost": <1-5>,
      "weighted_sum": <float>
    },
    "per-schema-rollout": { ... },
    "per-cell-blue-green": { ... },
    "hybrid": { ... }
  },
  "weak_primitives": ["<primitive ids with weighted_sum < 3.0>"]
}
```

Population rules:
- `matrix` keys = exactly the surviving `primitives_considered` from step-02 (no extras, no omissions).
- Weights sum to 1.0 (±0.001).
- `weak_primitives` is an array (possibly empty) drawn from the matrix keys.

## Gate

Machine-checkable: each surviving primitive has all 4 axes + `weighted_sum`. Weights sum to 1.0 (±0.001). `weak_primitives` is an array drawn from the matrix keys.

## Next step

`step-04-c-recommendation.md`
