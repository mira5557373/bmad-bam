---
step_id: 05-c-write-design
auto_runnable: true
gate: machine-checkable
inputs: [testing-context.json, testing-options.json, decision-matrix.json, recommendation.json]
outputs: [test-catalogue.md, test-catalogue.json]
template_ref: test-catalogue.md.template
---

# Step 05 — Write the design

## Purpose

Emit `test-catalogue.md` (human narrative) + `test-catalogue.json` (machine contract per spec §3.4) to 2 locations (docs + QG-M2/).

## Actions

1. Read 4 cache files.

2. Read template at `../templates/test-catalogue.md.template`.

3. Populate markdown narrative + write to `{project-root}/docs/architecture/test-catalogue.md` (ensure parent dir via `mkdir -p`).

4. Build the JSON object per spec §3.4 schema:

```json
{
  "schema_version": "1.0",
  "decided_at": "<ISO-8601 UTC: YYYY-MM-DDTHH:MM:SSZ>",
  "hybrid_resolution": {
    "free": "row-level-security",
    "enterprise": "cell-based"
  },
  "coverage_report": {
    "isolation":           { "must_have": 5, "should_have": 1, "nice_to_have": 0 },
    "noisy-neighbor":      { "must_have": 1, "should_have": 2, "nice_to_have": 2 },
    "quota":               { "must_have": 3, "should_have": 1, "nice_to_have": 0 },
    "rls-bypass":          { "must_have": 5, "should_have": 1, "nice_to_have": 0 },
    "cross-tenant-cache":  { "must_have": 0, "should_have": 2, "nice_to_have": 1, "note": "Deferred to P5 ai (model-cache-isolation)" }
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
  ]
}
```

5. **`hybrid_resolution` field:** include iff `recommendation.json#tenancy_model == "hybrid"`; otherwise OMIT the key entirely (do not emit `null` — key is absent).

6. **`tests[*].universal` field:** every entry MUST have the key explicitly (no default fallback). When false, `applies_to[]` is the binding selector; when true, `applies_to[]` is informational.

7. **Write JSON canonical to `_bmad/bam/evidence/QG-M2/test-catalogue.json`** (mkdir -p) — the gate evidence path.

8. **2-location write recap:**
   - `.md` → `{project-root}/docs/architecture/test-catalogue.md`
   - `.json` → `{project-root}/_bmad/bam/evidence/QG-M2/test-catalogue.json`

## Gate

Machine-checkable:
- Both files exist at expected paths
- JSON parses + has `schema_version`, `coverage_report`, `tests[]`
- `tests[]` is non-empty
- Every entry has the `universal` field (no implicit default)
- When `tenancy_model == "hybrid"`, `hybrid_resolution` key present
- When `tenancy_model != "hybrid"`, `hybrid_resolution` key absent

## Next step

`step-06-c-record-adr.md`
