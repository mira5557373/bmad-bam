---
step_id: 03-c-decision-matrix
auto_runnable: false
gate: human-approval
inputs: [offboarding-context.json, offboarding-options.json]
outputs: [decision-matrix.json]
---

# Step 03 — Decision matrix

## Purpose

Score per-tier deletion-mode assignment against 4 axes; user reviews + may override pre-fill.

## Axes

| Axis | Question | Weight |
|---|---|---|
| Regulatory-conformance | Does this mode satisfy retention-floor + Art 17 + Art 20 obligations for this tier's data class? | CRITICAL (no waiver) |
| Data-integrity (analytics) | Does this mode preserve aggregate analytics (cohort sizes, retention curves) without leaking PII? | High |
| Reversibility | Does the org need a recover-from-mistake window before deletion becomes irreversible? | Medium |
| Cost | Storage + per-tenant indexing cost of retained tombstones / anonymized rows vs hard-delete (storage savings) | Low-Medium |

## Per-mode axis fitness (reference table)

| Mode | Regulatory-conformance | Analytics integrity | Reversibility | Cost |
|---|---|---|---|---|
| `hard_delete` | Excellent (full Art 17); zero retention | Poor (cohort lost) | None (irreversible) | Best (storage freed) |
| `soft_delete` | Conditional — Art 17 satisfied iff `post_retention_action` fires within window; bridge mode | Excellent (rows queryable for analytics with tombstone flag) | Excellent (un-delete trivially) | Worst (full storage retained) |
| `anonymize` | Excellent if irreversible-by-construction (see fragment); pseudonymization is NOT anonymization | Good (aggregates preserved; PII columns hashed) | None (correctly implemented anonymization is irreversible) | Medium (rows retained but PII columns may shrink) |

## Process

1. For each tier, present pre-fill from step-02 + axis scores + regulatory-floor compatibility check.
2. If `regulatory_profile != "none"` AND `retention_window_days < regulatory_floor_days`: flag for mandatory override in step-04.
3. User confirms or overrides per tier; capture rationale per override.
4. For tiers under `legal_holds[]` scope, mark `retention_window_source: legal_hold` and effective retention as infinite-until-release.

## Output

`_bmad/bam/cache/.../{date}/decision-matrix.json`:
```json
{
  "per_tier": [
    {
      "tier_id": "free",
      "deletion_mode": "soft_delete",
      "retention_window_days": 7,
      "retention_window_source": "tier_hint",
      "axis_scores": {"regulatory": 5, "analytics": 5, "reversibility": 5, "cost": 2},
      "regulatory_floor_compatible": true,
      "override_rationale": null
    }
  ]
}
```

## Gate

Human approval — user signs off on per-tier assignments + acknowledges any regulatory-floor mandatory-overrides.

## Next step

`step-04-c-recommendation.md`
