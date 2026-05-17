---
step_id: 04-c-recommendation
auto_runnable: false
gate: human-approval
inputs: [decision-matrix.json, finops-context.json, tier-model.json]
outputs: [recommendation.json]
---

# Step 04 — Atlas recommends attribution + budgeting + per-tier cost ceilings

## Purpose

The matrix surfaces the top attribution mechanism + budgeting strategy; Atlas reads the matrix + context + tier-model and recommends a single `per_tenant_attribution` set, a single `budgeting_strategy`, and a `cost_ceiling_per_tier` table calibrated against tier-model.json hints. **Atlas does not finalize a recommendation the user has not approved.**

## Actions

1. Read `decision-matrix.json` + `finops-context.json` from the cache dir. Read `tier-model.json` from the path captured in `finops-context.json#tier_model_path`.

2. Pick the attribution mechanism set:
   - For each of (compute, storage, network, third_party), select the mechanism with the highest `weighted_sum`. (In v6.0 there's only one mechanism per category after step-02 filtering, so this is degenerate — but the structure supports future per-category multi-mechanism scoring.)
   - If any selected mechanism is in `weak_options` (weighted_sum < 3.0), call this out explicitly and offer to relax instrumentation_maturity or revisit step-02 filtering.

3. Pick the budgeting strategy:
   - Highest `weighted_sum` from `budgeting_matrix` wins by default.
   - If `instrumentation_maturity == "greenfield"` AND the top strategy is `quota-hard`, prefer the second-best (typically `quota-soft` or `alert-only`) — hard quotas on greenfield instrumentation produce false positives that block paying tenants.
   - If the top strategy is `mixed-per-tier`, this is acceptable but step-05 will require per-tier strategy elicitation.

4. Generate per-tier cost ceilings (USD/month). **Default starting points** drawn from `tier-model.json#tiers[*].cost_ceiling_usd_per_month_hint`:

   For each tier id in tier-model.json:
   - Read `cost_ceiling_usd_per_month_hint` if present.
   - Compute `default_ceiling = round(price_usd_per_month * (1 - gross_margin_target_pct/100), 2)`:
     - e.g., price=`100`, gross_margin_target=`70` → default_ceiling=`30` USD/month.
   - If the hint is present AND within 20% of `default_ceiling`, use the hint (keeps tier-model and finops aligned — verify-coherence rewards this).
   - If the hint is present AND drift > 20% vs `default_ceiling`, prompt the user: "tier `X` hint=$H but gross-margin target implies $D. Use hint, use computed, or override?"
   - If the hint is absent, use `default_ceiling`.

   For the 5-default tier ids (free, starter, pro, business, enterprise) when present and prices are unknown, fall back to the spec §3.R1 example ladder:

   | tier_id | default ceiling (USD/mo) |
   |---|---|
   | free | 0.50 |
   | starter | 5.00 |
   | pro | 25.00 |
   | business | 125.00 |
   | enterprise | 625.00 |

5. Generate budget alert thresholds. For each tier id, propose `alert_at_pct_of_ceiling` + `channel`:

   - `free` / `starter` → `80%` alert, `channel: email` (low-stakes; cap via quota at 100%).
   - `pro` → `80%` alert, `channel: slack`.
   - `business` / `enterprise` → `75%` alert + `90%` warn, `channel: pagerduty` (white-glove; account team gets paged before customer impact).
   - Custom tiers → prompt explicitly; no automatic default.

6. Construct a 2-3 sentence rationale citing ≥ 2 axes from the matrix by name. The rationale MUST address each entry in `weak_options` (defend retention or justify rejection).

7. Determine confidence:
   - `high` — top attribution + budgeting both have `weighted_sum ≥ 4.0` AND `instrumentation_maturity` is `partial` or `mature` AND no per-tier ceiling required user override.
   - `medium` — at least one option has `weighted_sum ∈ [3.0, 4.0)` OR `pricing_maturity == "pre-revenue"` (ceilings are softer pre-revenue).
   - `low` — any selected option is in `weak_options`, OR `instrumentation_maturity == "greenfield"` AND a quota-* strategy was chosen, OR ≥ 2 per-tier ceilings deviate > 20% from tier-model hints.

8. Present the recommendation to the user for approval. If the user disagrees, capture their reasoning + revise. **Atlas does not finalize a recommendation the user has not approved.**

9. Write `recommendation.json` to the cache dir.

## Output

Write `{project-root}/_bmad/bam/cache/finops-model-design/{date}/recommendation.json`:

```json
{
  "schema_version": "1.0",
  "recommended_at": "<ISO-8601 UTC>",
  "per_tenant_attribution": {
    "compute": "tenant_id_in_trace_span",
    "storage": "by_predicate | by_schema | by_cell_then_intra | mixed",
    "network": "tenant_context_header",
    "third_party": "tenant_aware_client_logging"
  },
  "budgeting_strategy": "alert-only | quota-soft | quota-hard | mixed-per-tier",
  "cost_ceiling_per_tier": {
    "<tier_id>": <USD/month float>
  },
  "budget_alert_thresholds": [
    { "tier": "<tier_id>", "alert_at_pct_of_ceiling": 80, "channel": "slack | email | pagerduty" }
  ],
  "confidence": "high | medium | low",
  "rationale_text": "<2-3 sentences citing ≥2 axes by name; addresses every weak_option>",
  "user_approved": true
}
```

Population rules:
- `per_tenant_attribution.storage` ∈ {`by_predicate`, `by_schema`, `by_cell_then_intra`, `mixed`} matching the tenancy_model filter from step-02.
- `cost_ceiling_per_tier` keys MUST exactly match the set of tier ids in tier-model.json (no missing tiers; no extras). Each value is a non-negative float (USD/month).
- `budget_alert_thresholds` has one entry per tier_id; each `alert_at_pct_of_ceiling` ∈ [50, 100]; each `channel` ∈ {`slack`, `email`, `pagerduty`}.
- `user_approved` MUST be `true` before step-05 runs (gate is human-approval).

## Gate

Human-approval. Never auto-runs; the user must explicitly approve the recommended attribution + budgeting + per-tier ceilings (or substitute their own) before step-05 executes. Auxiliary machine check: `per_tenant_attribution.storage` matches the tenancy_model filter from step-02; `cost_ceiling_per_tier` keys exactly match tier-model.json tier ids.

## Next step

`step-05-c-write-design.md`
