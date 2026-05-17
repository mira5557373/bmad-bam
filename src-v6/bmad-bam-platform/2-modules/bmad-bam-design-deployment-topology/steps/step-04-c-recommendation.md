---
step_id: 04-c-recommendation
auto_runnable: false
gate: human-approval
inputs: [decision-matrix.json, deployment-topology-context.json]
outputs: [recommendation.json]
---

# Step 04 — Atlas recommends rollout primitive + per-tier strategy

## Purpose

The matrix surfaces the top primitive(s); Atlas reads the matrix + context + applies judgment to recommend a single `rollout_primitive` plus the `rollout_per_tier` assignment. The 5-default per-tier mapping from spec §3.Q3b is the well-trodden path; the user may override per tier. **Atlas does not finalize a recommendation the user has not approved.**

## Actions

1. Read `decision-matrix.json` + `deployment-topology-context.json` from the cache dir.

2. Pick the `rollout_primitive`:
   - Highest `weighted_sum` from `matrix` wins by default.
   - If the top two primitives are within `0.20` of each other AND one of them is `hybrid`, prefer `hybrid` when `risk_tolerance_per_tier` spans ≥ 3 distinct values (wide tier tolerance benefits from primitive-mixing).
   - If the top primitive is in `weak_primitives` (weighted_sum < 3.0), call this out explicitly to the user and offer alternatives (the second-best primitive, OR `hybrid` as escape hatch).

3. Generate per-tier rollout assignments. **Defaults per spec §3.Q3b:**

   | tier id | default rollout strategy |
   |---|---|
   | free | `aggressive_canary` |
   | starter | `canary` |
   | pro | `canary` |
   | business | `blue_green_synthetics` |
   | enterprise | `blue_green_pilot` |

   For tier ids present in `deployment-topology-context.json#risk_tolerance_per_tier`:
   - If a tier's `risk_tolerance` is at its default per spec §3.Q3b (aggressive for free, standard for starter+pro, conservative for business, white-glove for enterprise) AND the tier id matches one of the 5-defaults, pre-fill with the table above.
   - If the user's `risk_tolerance` for a tier deviates from the spec §3.Q3b default, prompt for an override (e.g., `risk_tolerance == "conservative"` on a free tier → suggest `canary` instead of `aggressive_canary`).
   - For custom tier ids (not in the 5-default set), prompt explicitly — no automatic default applies.

   **Allowed values for `rollout_per_tier` entries:**
   `aggressive_canary` / `canary` / `blue_green_synthetics` / `blue_green_pilot`

   These match the `rollout_tier_hint` enum in tier-model.json so the two contracts compose.

4. Construct a 2-3 sentence rationale citing ≥ 2 axes from the matrix by name. The rationale MUST address each entry in `weak_primitives` (defend retention or justify rejection).

5. Determine confidence:
   - `high` — top primitive's `weighted_sum ≥ 4.0` AND `weak_primitives` is empty (or contains only primitives the user explicitly removed in step-02).
   - `medium` — top primitive's `weighted_sum ∈ [3.0, 4.0)` OR `weak_primitives` is non-empty but the chosen primitive is not weak.
   - `low` — top primitive is itself in `weak_primitives`, OR there is a `< 0.20` tie at the top.

6. Present the recommendation to the user for approval. If the user disagrees, capture their reasoning + revise. **Atlas does not finalize a recommendation the user has not approved.**

7. Write `recommendation.json` to the cache dir.

## Output

Write `{project-root}/_bmad/bam/cache/deployment-topology-design/{date}/recommendation.json`:

```json
{
  "schema_version": "1.0",
  "recommended_at": "<ISO-8601 UTC>",
  "rollout_primitive": "app-canary | per-schema-rollout | per-cell-blue-green | hybrid",
  "rollout_per_tier": {
    "free": "aggressive_canary",
    "starter": "canary",
    "pro": "canary",
    "business": "blue_green_synthetics",
    "enterprise": "blue_green_pilot"
  },
  "confidence": "high | medium | low",
  "rationale_text": "<2-3 sentences citing ≥2 axes by name; addresses every weak_primitive>",
  "user_approved": true
}
```

Population rules:
- `rollout_primitive` ∈ {`app-canary`, `per-schema-rollout`, `per-cell-blue-green`, `hybrid`}.
- `rollout_per_tier` — keys MUST exactly match the set of tier ids present in `deployment-topology-context.json#risk_tolerance_per_tier` (no missing tiers; no extras). Each value MUST be in {`aggressive_canary`, `canary`, `blue_green_synthetics`, `blue_green_pilot`}.
- `user_approved` MUST be `true` before step-05 runs (gate is human-approval).

## Gate

Human-approval. Never auto-runs; the user must explicitly approve the recommended primitive + per-tier mapping (or substitute their own) before step-05 executes. Auxiliary machine check: `rollout_primitive` in the allowed set AND `rollout_per_tier` keys exactly match `risk_tolerance_per_tier` keys from context.

## Next step

`step-05-c-write-design.md`
