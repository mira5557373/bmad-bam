---
step_id: 03-c-decision-matrix
auto_runnable: true
gate: machine-checkable
inputs: [finops-context.json, options-loaded.json]
outputs: [decision-matrix.json]
---

# Step 03 — Score each attribution mechanism + budgeting strategy against context

## Purpose

Quantitative scoring of (a) each attribution mechanism + (b) each budgeting strategy on 4 axes. Apply per-axis weights. Weighted sums surface which combination best fits the tenancy model, tier mix, deployment topology, and instrumentation maturity elicited in step-01.

## Actions

1. Read `finops-context.json` + `options-loaded.json` from `_bmad/bam/cache/finops-model-design/{date}/`.

2. For each attribution mechanism (compute, storage, network, third_party) score on 4 axes (1 = poor / strong concern, 5 = strong fit / low concern):

   | Axis | Score 1-5 source | Default weight |
   |---|---|---|
   | **accuracy** | What % of cloud bill is attributable to a specific tenant? 5 = ≥ 95% (per `per-tenant-cost-attribution-with-hooks` CRITICAL); 1 = < 50%. Compute via `tenant_id_in_trace_span` typically scores 4-5; shared-resource amortization (NAT, control plane) sets a ceiling. | 0.30 |
   | **instrumentation_cost** | Inverse: 5 = no new tooling needed (already mature); 1 = greenfield rebuild. Read `instrumentation_maturity` from context: `mature` → +2 to all mechanisms; `greenfield` → -2. Storage `by_cell_then_intra` scores low on greenfield (needs cell + intra-cell tooling). | 0.20 |
   | **blast_radius_on_failure** | Inverse: 5 = isolated impact (one mechanism failing degrades only one cost category); 1 = systemic (mechanism failure breaks COGS attribution entirely). Compute attribution via per-request span: 4 (degrades to bill-only). Storage `by_schema`: 4. Storage `by_cell_then_intra` on `hybrid`: 3 (more moving parts). | 0.20 |
   | **observability_ergonomics** | How easy is it to debug a per-tenant cost anomaly under this mechanism? 5 = single dashboard query; 1 = manual SQL across multiple stores. `tenant_id_in_trace_span` + good APM scores 5; `by_cell_then_intra` requires cell + intra-cell joins, scores 3-4. | 0.30 |

3. For each budgeting strategy in `budgeting_strategies_considered` score on the same 4 axes (1 = poor fit, 5 = strong fit) with the same weights. Scoring guidance:

   - `alert-only` — high observability ergonomics, low blast radius, high accuracy (nothing fires errantly), low instrumentation cost (one alerting integration). Weak on enforcement — runaway tenants don't get capped.
   - `quota-soft` — moderate ergonomics, moderate blast radius (grace period limits damage from false positives), high accuracy.
   - `quota-hard` — strong enforcement BUT high blast radius if instrumentation is wrong (a false positive blocks a paying tenant). Scores poorly on `instrumentation_maturity == greenfield`.
   - `mixed-per-tier` — best ergonomics for wide tier risk-tolerance spreads; instrumentation cost scales with tier count.

4. Compute weighted sum per option:
   `weighted_sum = Σ (score_axis × weight_axis)`

   Apply two flags that step-04 will read when generating the recommendation:
   - **instrumentation-maturity warning** — if `instrumentation_maturity == "greenfield"` AND any mechanism scores `instrumentation_cost ≥ 4`, emit a `[WARN]`: step-04 must either justify the cost or pick a cheaper mechanism.
   - **weak option flag** — options with `weighted_sum < 3.0` are flagged as `weak_options`. Step-04's recommendation must explicitly defend or reject each weak option.

5. Write `decision-matrix.json` to the cache dir.

## Output

Write `{project-root}/_bmad/bam/cache/finops-model-design/{date}/decision-matrix.json`:

```json
{
  "schema_version": "1.0",
  "scored_at": "<ISO-8601 UTC>",
  "weights": {
    "accuracy": 0.30,
    "instrumentation_cost": 0.20,
    "blast_radius_on_failure": 0.20,
    "observability_ergonomics": 0.30
  },
  "attribution_matrix": {
    "compute:tenant_id_in_trace_span": {
      "accuracy": <1-5>,
      "instrumentation_cost": <1-5>,
      "blast_radius_on_failure": <1-5>,
      "observability_ergonomics": <1-5>,
      "weighted_sum": <float>
    },
    "storage:<filtered_mechanism>": { ... },
    "network:tenant_context_header": { ... },
    "third_party:tenant_aware_client_logging": { ... }
  },
  "budgeting_matrix": {
    "alert-only": { ... },
    "quota-soft": { ... },
    "quota-hard": { ... },
    "mixed-per-tier": { ... }
  },
  "weak_options": ["<option ids with weighted_sum < 3.0>"]
}
```

Population rules:
- `attribution_matrix` keys = exactly the 4 attribution categories (compute / storage / network / third_party), with the storage key suffixed by the filtered mechanism from step-02.
- `budgeting_matrix` keys = the surviving `budgeting_strategies_considered` from step-02 (no extras, no omissions).
- Weights sum to 1.0 (±0.001).
- `weak_options` is an array (possibly empty) drawn from the matrix keys (either matrix).

## Gate

Machine-checkable: each option has all 4 axes + `weighted_sum`. Weights sum to 1.0 (±0.001). `weak_options` is an array drawn from the matrix keys.

## Next step

`step-04-c-recommendation.md`
