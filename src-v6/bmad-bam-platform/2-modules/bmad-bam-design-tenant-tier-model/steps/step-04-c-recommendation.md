---
step_id: 04-c-recommendation
auto_runnable: false
gate: human-approval
inputs: [decision-matrix.json, tier-model-context.json]
outputs: [recommendation.json]
---

# Step 04 — Atlas recommends final tier count + reasons

## Purpose

The matrix surfaces weak tiers; Atlas reads the matrix + context + applies judgment to recommend the final tier count and tier set. The 5-default scaffold is the well-trodden path (per spec §3.Q3); custom-N projects must justify the deviation here. Atlas may collapse a weak tier into a neighbor when:

- The weak tier's `target_segment_fit < 3` and the adjacent tier already serves the segment.
- The price gap between adjacent tiers is < 3× (typical floor for distinct tiers per the §3.Q3 progression).
- The business-model maturity is `pre-mmr` — keep the matrix small until the revenue model proves out.

## Actions

1. Read `decision-matrix.json` + `tier-model-context.json`.

2. Determine the recommended final tier count:
   - If `custom_tiers_mode == true`, recommended `tier_count = tier_count_target` (user has explicitly chosen N).
   - Else recommended `tier_count = 5` (default), unless `business_model_maturity == "pre-mmr"` and any tier is flagged in `weak_tiers` — in that case recommend collapsing weak tiers and propose a smaller count (3 or 4).

3. Construct a 2-3 sentence rationale citing the axes from the matrix. The rationale MUST reference at least two axes by name (e.g., "target_segment_fit and price_point_alignment justified retaining the pro tier because..."). When `weak_tiers` is non-empty, the rationale MUST address each weak tier — defend it or recommend collapse.

4. Determine confidence:
   - `high` — recommendation is the 5-default OR `custom_tiers_mode == true` with no weak tiers.
   - `medium` — recommendation differs from input scaffold by one tier (one collapse or one split).
   - `low` — recommendation differs by ≥ 2 tiers OR the matrix shows ≥ 2 weak tiers.

5. Present the recommendation to the user for approval. If the user disagrees, capture their reasoning + revise. **Atlas does not finalize a recommendation the user has not approved.**

6. Write `recommendation.json` to the cache dir.

## Output

Write `{project-root}/_bmad/bam/cache/tier-model-design/{date}/recommendation.json`:

```json
{
  "schema_version": "1.0",
  "recommended_at": "<ISO-8601 UTC>",
  "tier_count": 5,
  "custom_tiers_mode": false,
  "final_tier_ids": ["free", "starter", "pro", "business", "enterprise"],
  "collapsed_tiers": [],
  "confidence": "high | medium | low",
  "rationale_text": "<2-3 sentences citing ≥2 axes by name; addresses every weak_tier from decision-matrix>",
  "user_approved": true
}
```

Population rules:
- `tier_count` ∈ {3, 4, 5, 6, 7}. Must match `len(final_tier_ids)`.
- `custom_tiers_mode` carries forward from `tier-model-context.json`; if Atlas recommends collapsing a default-5 tier down to 4, `custom_tiers_mode` flips to `true` (matrix is no longer the 5-default).
- `collapsed_tiers` = ids that the matrix considered but the recommendation drops (informs step-05's design doc).
- `final_tier_ids` is the source of truth for step-05's tier list.

## Gate

Human-approval. Never auto-runs; the user must explicitly approve the recommended tier set (or substitute one) before step-05 executes. Auxiliary machine check: `tier_count == len(final_tier_ids)` and `tier_count ∈ [3, 7]`.

## Next step

`step-05-c-write-design.md`
