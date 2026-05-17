---
step_id: 02-c-load-options
auto_runnable: true
gate: machine-checkable
inputs: [tier-model-context.json]
outputs: [options-loaded.json]
---

# Step 02 — Load tier-design fragments and present the tier scaffold

## Purpose

Load Atlas's tier-design fragments + present either the 5-tier default scaffold (free/starter/pro/business/enterprise per spec §3.Q3) or an N-tier custom scaffold (when `custom_tiers_mode` is true). The user can eliminate clearly-bad-fit tiers before the matrix.

## Actions

1. Read the elicited context from `_bmad/bam/cache/tier-model-design/{date}/tier-model-context.json`.

2. Load the following Atlas fragments via Read tool. Resolve each path by trying these in order (first hit wins, per BMAD tool-specific install convention; this mirrors step-02 of design-modular-monolith):
   - `{project-root}/.claude/skills/bmad-bam-agent-atlas/resources/fragments/<name>.md` (claude-code)
   - `{project-root}/.cursor/skills/bmad-bam-agent-atlas/resources/fragments/<name>.md` (cursor)
   - `{project-root}/_bmad/bbp/bmad-bam-agent-atlas/resources/fragments/<name>.md` (BMAD-internal manifest path)

   Required fragments (drive the tier scaffold + economics):
   - `tier-design-principles` — what makes a tier matrix coherent vs. arbitrary
   - `feature-gating-patterns` — feature-axis vs. limit-axis gating; soft vs. hard gates
   - `limit-and-quota-design` — how to pick numeric limits that scale across tiers
   - `tier-transition-economics` — upgrade triggers, downgrade economics, rate-arbitrage risks
   - `tier-cliff-avoidance` — smoothing the jump between adjacent tiers so users self-upgrade

   (Path notes: BMAD installs the bmad-bam-platform module's config at `_bmad/bbp/` but the persona-skill content lives at the tool-specific `<tool>/skills/<skill>/` per BMAD installer behavior. Workflow steps reference Atlas's fragments by Read-at-runtime rather than via persistent_facts `file:` entries — BMM convention — because explicit cross-skill `file:` paths do not resolve uniformly across tool dirs.)

3. Branch on `custom_tiers_mode`:

   **If `custom_tiers_mode == false` (default; tier_count_target = 5):**
   Present the 5-tier default scaffold:

   - **free** — onboarding-only; aggressive limits; community support. Self-service upgrade. Cost ceiling ~$0.50/mo per tenant (per spec §3.Q3 default).
   - **starter** — first paid tier; single-team SMB; self-service upgrade. ~$19/mo. Cost ceiling ~$5/mo.
   - **pro** — growing SMB; multi-seat; self-service upgrade. ~$99/mo. Cost ceiling ~$25/mo.
   - **business** — mid-market; sales-assisted upgrade; SSO + audit. ~$499/mo. Cost ceiling ~$125/mo.
   - **enterprise** — named accounts; custom pricing; sales-assisted upgrade; DPA + custom SLAs. Cost ceiling ~$625/mo (5× business, per spec §3.Q3).

   **If `custom_tiers_mode == true` (tier_count_target = N, 3 ≤ N ≤ 7):**
   Present an N-tier custom scaffold:

   - For each of the N tiers, generate a placeholder id (`tier-1`, `tier-2`, ..., `tier-N`) and ask the user to name it + describe target segment. Step-05 will elicit per-tier price/limits/features.
   - Remind the user: the 5-tier default is the well-trodden path; custom-tier projects must justify the departure (downstream finops + deployment skills are tuned to the 5-default rollout-tier hints).

4. Present a comparison-of-shape table for whichever scaffold applies: tier id, target segment, upgrade mode (self_service vs. sales_assisted), cost-ceiling-hint band.

5. Ask user: "Any tiers to remove from consideration before the decision matrix?"

Write `{project-root}/_bmad/bam/cache/tier-model-design/{date}/options-loaded.json`.

## Output

```json
{
  "schema_version": "1.0",
  "loaded_at": "<ISO-8601 UTC>",
  "scaffold_mode": "default-5 | custom-N",
  "tier_ids_considered": ["free", "starter", "pro", "business", "enterprise"],
  "tier_ids_eliminated_by_user": [],
  "fragments_loaded": [
    "tier-design-principles",
    "feature-gating-patterns",
    "limit-and-quota-design",
    "tier-transition-economics",
    "tier-cliff-avoidance"
  ]
}
```

Population rules:
- `scaffold_mode` = `default-5` when `custom_tiers_mode == false`; `custom-N` (replace N with the tier count) when `true`.
- `tier_ids_considered` = the 5-default list above when `default-5`; placeholder ids `tier-1`...`tier-N` when `custom-N`.
- `fragments_loaded` is non-empty; covers all 5 fragments above.

## Gate

Machine-checkable: file exists + `tier_ids_considered` has between 1 and `tier_count_target` entries (after user elimination) + `fragments_loaded` non-empty.

## Next step

`step-03-c-decision-matrix.md`
