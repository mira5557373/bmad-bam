---
step_id: 05-c-write-design
auto_runnable: true
gate: machine-checkable
inputs: [tenancy-context.json, recommendation.json]
outputs: [tenancy-model.md, tenancy-decision.json]
template_ref: tenancy-model.md.template
---

# Step 05 — Write the tenancy-model design doc

## Purpose

Produce a tenancy-model.md design doc using the template + inputs from prior steps. This is the artifact downstream architecture work depends on. Additionally emit a machine-readable `tenancy-decision.json` contract consumed by P3.1 downstream skills (deployment-topology, finops-model, tenant-tier-model).

## Actions

1. Read template at `../templates/tenancy-model.md.template` (skill-relative; BMM convention).
2. Substitute placeholders with values from `tenancy-context.json` + `recommendation.json` + relevant fragments.
3. Write the populated doc to `{project-root}/docs/architecture/tenancy-model.md`.
4. Validate sections present per template.
5. Write the machine-readable decision contract `tenancy-decision.json` to BOTH locations (ensure parent dirs exist via `mkdir -p`):
   - `{project-root}/docs/architecture/tenancy-decision.json` (human-readable copy alongside the markdown narrative)
   - `{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json` (gate-evidence pointer for QG-F1)

   JSON schema (exact):

   ```json
   {
     "schema_version": "1.0",
     "decided_at": "<ISO-8601 UTC>",
     "tenancy_model": "rls | schema-per-tenant | cell-based | hybrid",
     "attribution_affordances": {
       "compute": "tenant_id_in_trace_span",
       "storage": "by_predicate | by_schema | by_cell_then_intra",
       "network": "tenant_context_header"
     },
     "rationale_ref": "docs/architecture/tenancy-model.md"
   }
   ```

   Population rules:
   - `tenancy_model` = chosen option's id from `recommendation.json` (existing step-04 output).
   - `attribution_affordances.storage` derives from `tenancy_model`:
     - `rls` → `by_predicate`
     - `schema-per-tenant` → `by_schema`
     - `cell-based` → `by_cell_then_intra`
     - `hybrid` → `by_predicate` (default; per-tier may override)
   - `attribution_affordances.compute` = `tenant_id_in_trace_span` (universal).
   - `attribution_affordances.network` = `tenant_context_header` (universal).
   - `decided_at` = current ISO-8601 UTC timestamp.
   - `rationale_ref` = `docs/architecture/tenancy-model.md` (relative path to the narrative companion).

## Output

1. `{project-root}/docs/architecture/tenancy-model.md` — the design doc. Schema:

   - Frontmatter (yaml): id, title, status (`draft`), date, persona (`atlas`), workflow_run_id
   - ## Decision: <chosen option> with confidence
   - ## Context: paraphrase from tenancy-context.json
   - ## Rationale: from recommendation.json primary_reasoning
   - ## Architecture: per-option-specific section pulled from fragments (RLS schema, schema-per-tenant pgbouncer config, etc.)
   - ## Risks + Mitigations
   - ## Migration trigger
   - ## Alternatives considered
   - ## Quality gate references (links to QG-M2)
   - ## Next steps (link to design-modular-monolith workflow + design-tenant-tier-model workflow)

2. `{project-root}/docs/architecture/tenancy-decision.json` — machine-readable decision contract (schema above) — human-visible copy.

3. `{project-root}/_bmad/bam/evidence/QG-F1/tenancy-decision.json` — identical JSON content written as the QG-F1 gate evidence pointer.

## Gate

Machine-checkable:

- `tenancy-model.md` exists at expected path + all 9 required sections present.
- `tenancy-decision.json` exists at BOTH destinations (`docs/architecture/` and `_bmad/bam/evidence/QG-F1/`) as required QG-F1 evidence.
- JSON content validation:
  - `schema_version` field is present.
  - `tenancy_model` is one of: `rls`, `schema-per-tenant`, `cell-based`, `hybrid`.
  - `attribution_affordances` block is present and non-empty (compute, storage, network keys populated).

## Next step

`step-06-c-record-adr.md`
