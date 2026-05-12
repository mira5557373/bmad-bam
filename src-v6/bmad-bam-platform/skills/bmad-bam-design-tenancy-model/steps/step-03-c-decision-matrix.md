---
step_id: 03-c-decision-matrix
auto-runnable: true
gate: machine-checkable
inputs: [tenancy-context.json, options-loaded.json]
outputs: [decision-matrix.json]
---

# Step 03 — Score options against context

## Purpose

Quantitative scoring: each option scored 1-5 on each dimension (tenant-count-fit, cost-fit, isolation-strength, migration-cost-fit, ops-complexity-fit). Highest total wins... usually. Final recommendation is Atlas's call (step 04), not the matrix's.

## Actions

For each remaining option, score on these 5 dimensions:

| Dimension | Score 1-5 source |
|---|---|
| **Tenant-count fit** | Compare elicited tenant_count_12mo to option's sweet-spot per fragment |
| **Cost fit** | Compare cost_ceiling_per_tenant to option's typical per-tenant cost |
| **Isolation strength** | Compare blast_radius_tolerance to option's isolation guarantees |
| **Migration cost from current** | If brownfield: penalize options requiring large migration. If greenfield: all = 5 |
| **Ops complexity fit** | Compare ops_team_size to option's ops overhead |

Compute total + identify any tie-breaker dimensions.

## Output

Write `{project-root}/_bmad/bam/cache/tenancy-design/{date}/decision-matrix.json`:

```json
{
  "scored_at": "<ISO-8601 UTC>",
  "matrix": {
    "rls": {
      "tenant-count-fit": <1-5>,
      "cost-fit": <1-5>,
      "isolation-strength": <1-5>,
      "migration-cost-fit": <1-5>,
      "ops-complexity-fit": <1-5>,
      "total": <sum>
    },
    "schema-per-tenant": { ... },
    "cell-based": { ... },
    "hybrid": { ... }
  },
  "ranked": ["rls", "cell-based", "schema-per-tenant", "hybrid"]
}
```

## Gate

Machine-checkable: each scored option has 5 dimensions + total = sum.

## Next step

`step-04-c-recommendation.md`
