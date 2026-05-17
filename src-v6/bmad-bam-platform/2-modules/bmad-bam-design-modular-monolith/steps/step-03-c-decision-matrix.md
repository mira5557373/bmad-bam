---
step_id: 03-c-decision-matrix
auto_runnable: true
gate: machine-checkable
inputs: [modular-monolith-context.json, options-loaded.json]
outputs: [decision-matrix.json]
---

# Step 03 — Score options against context

## Purpose

Quantitative scoring: each remaining option is scored 1-5 on each of 6 axes. Apply per-axis weights. Highest weighted sum wins... usually. Final recommendation is Atlas's call (step 04), not the matrix's.

## Actions

1. Read `modular-monolith-context.json` + `options-loaded.json` from `_bmad/bam/cache/modular-monolith-design/{date}/`.

2. For each remaining option (from `options_considered` minus `options_eliminated_by_user`), score on these 6 axes (1 = poor fit, 5 = strong fit):

   | Axis | Score 1-5 source | Default weight |
   |---|---|---|
   | **Tenant-count fit** | Does the option scale to the tenant-count implied by `tenancy_model` (if known)? RLS → tight tenant boundary affinity favors hybrid; cell-based → coarser boundary tolerates DDD-pure. | 0.20 |
   | **Team-size fit** | Solo/2-5 favor coarser modules (ports-pure or small DDD). 20+ tolerates DDD-pure with many contexts. | 0.20 |
   | **Domain complexity** | Shallow domain → ports-pure scores higher. Rich domain → DDD-pure or hybrid. | 0.20 |
   | **Migration cost** | Greenfield → all = 5. Brownfield-monolith → penalize options requiring boundary surgery. Brownfield-microservices → vertical-slice scores lower (already sliced). | 0.15 |
   | **Test ergonomics** | Ports-pure makes adapter mocking cheap → high score. Vertical-slice scores lower for cross-slice tenant scenarios. | 0.15 |
   | **AI-agent comprehensibility** | How easily can a coding agent reason about the boundary? Ports-pure + hybrid score higher (explicit ports = explicit contracts). | 0.10 |

3. Compute weighted sum per option:
   `weighted_sum = Σ (score_axis × weight_axis)`

4. Pick winner = highest `weighted_sum`. On tie, prefer `hybrid` (recommended default per spec §2.3).

5. Write `decision-matrix.json` to the cache dir.

## Output

Write `{project-root}/_bmad/bam/cache/modular-monolith-design/{date}/decision-matrix.json`:

```json
{
  "schema_version": "1.0",
  "scored_at": "<ISO-8601 UTC>",
  "weights": {
    "tenant_count_fit": 0.20,
    "team_size_fit": 0.20,
    "domain_complexity": 0.20,
    "migration_cost": 0.15,
    "test_ergonomics": 0.15,
    "ai_agent_comprehensibility": 0.10
  },
  "matrix": {
    "ddd-pure": {
      "tenant_count_fit": <1-5>,
      "team_size_fit": <1-5>,
      "domain_complexity": <1-5>,
      "migration_cost": <1-5>,
      "test_ergonomics": <1-5>,
      "ai_agent_comprehensibility": <1-5>,
      "weighted_sum": <float>
    },
    "ports-pure": { ... },
    "hybrid": { ... },
    "vertical-slice": { ... }
  },
  "ranked": ["hybrid", "ports-pure", "ddd-pure", "vertical-slice"],
  "winner": "hybrid",
  "tie_broken": false
}
```

## Gate

Machine-checkable: each scored option has all 6 axes + `weighted_sum` + a single `winner` field that matches `ranked[0]`. Weights sum to 1.0 (±0.001).

## Next step

`step-04-c-recommendation.md`
