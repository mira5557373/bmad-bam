---
step_id: 04-c-recommendation
auto_runnable: false
gate: human-approval
inputs: [decision-matrix.json, testing-context.json, testing-options.json]
outputs: [recommendation.json]
---

# Step 04 — Lock catalogue scope

## Purpose

Lock the catalogue scope: **must-have** (CI-blocking; QG-M2 sign-off depends on these passing), **should-have** (CI-non-blocking; warn on red), **deferred** (out-of-scope at current wave; tracked for re-evaluation), **excluded** (explicit non-applicability with rationale). Emit final `tests[]` array shape per spec §3.4.

## Actions

1. **Compose the locked `tests[]` array** by merging:
   - `testing-options.json#applicable_tests_for_this_model` (the filtered class library)
   - `decision-matrix.json#severity_overrides[]` (user-applied severity adjustments)

2. **Apply must-have / should-have / nice-to-have severity tags per the override-resolved set.** Result: every entry's `severity` is locked.

3. **`evidence_signature` finalization.** Verify each entry has length ≥ 20. Atlas may need to enrich short signatures; user signs off.

4. **`traceable_to[]` finalization.** Each entry's `traceable_to[]` MUST match `^QG-[A-Z]+\d+\.[CH]\d+$`. Forward-references (e.g., `QG-D1.H1` when QG-D1 hasn't shipped) → step-07-v emits WARN (not ERROR). User confirms forward-refs are intentional.

5. **Hybrid resolution capture.** If `testing-context.json#tenancy_model == "hybrid"`, propagate `hybrid_resolution` into `recommendation.json` for the schema emit in step-05. Each tier_id MUST have a mechanism value; step-07-v will validate completeness against tier-model.

6. **Cross-tenant-cache deferral note.** Coverage report for `cross-tenant-cache` category MUST have `must_have: 0` + `note: "Deferred to P5 ai (model-cache-isolation)"`. The category is included in the catalogue for forward-traceability, but no must-have test is locked at this wave.

7. **Sanity checks (machine-checkable before step-05):**
   - `tests[]` is non-empty
   - ≥1 entry has `category: isolation` AND `universal: true`
   - All `tests[*].id` are unique within the array
   - `coverage_report` counts match `tests[]` filtered by category × severity (after severity overrides)
   - When `tenancy_model == "hybrid"`, `hybrid_resolution` has entries for EVERY `testing-context.json#tier_ids`

8. **User signs off** on locked catalogue.

## Output

`_bmad/bam/cache/.../{date}/recommendation.json`:

```json
{
  "schema_version": "1.0",
  "decided_at": "<ISO-8601 UTC>",
  "tenancy_model": "row-level-security",
  "hybrid_resolution": null,
  "coverage_report": {
    "isolation":          {"must_have": 5, "should_have": 1, "nice_to_have": 0},
    "noisy-neighbor":     {"must_have": 1, "should_have": 2, "nice_to_have": 2},
    "quota":              {"must_have": 3, "should_have": 1, "nice_to_have": 0},
    "rls-bypass":         {"must_have": 5, "should_have": 1, "nice_to_have": 0},
    "cross-tenant-cache": {"must_have": 0, "should_have": 2, "nice_to_have": 1, "note": "Deferred to P5 ai (model-cache-isolation)"}
  },
  "tests": [
    {
      "id": "ISO-001",
      "name": "tenant-context-propagation-across-async-boundary",
      "applies_to": ["row-level-security", "schema-per-tenant", "cell-based"],
      "universal": true,
      "category": "isolation",
      "severity": "must-have",
      "evidence_signature": "structured-log entry with tenant_id at every async resume point",
      "traceable_to": ["QG-M2.C5"]
    }
  ],
  "user_signed_off": true
}
```

## Gate

Human approval — user signs off on the locked catalogue.

## Next step

`step-05-c-write-design.md`
