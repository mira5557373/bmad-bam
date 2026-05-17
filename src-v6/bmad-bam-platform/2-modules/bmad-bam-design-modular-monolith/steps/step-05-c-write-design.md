---
step_id: 05-c-write-design
auto_runnable: true
gate: machine-checkable
inputs: [modular-monolith-context.json, decision-matrix.json, recommendation.json]
outputs: [module-decomposition.md, module-decomposition.json]
template_ref: module-decomposition.md.template
---

# Step 05 — Write the module-decomposition design doc

## Purpose

Produce a `module-decomposition.md` design doc (human-readable narrative) and a `module-decomposition.json` machine-readable contract. The JSON is QG-F1 + QG-M1 evidence and is consumed by downstream P3.x skills (`design-deployment-topology`, `design-finops-model`, `verify-coherence`).

## Actions

1. Read template at `../templates/module-decomposition.md.template` (skill-relative; BMM convention).

2. Substitute placeholders with values pulled from:
   - `modular-monolith-context.json` (domain summary, team size, codebase status, tenancy model)
   - `decision-matrix.json` (per-option scores, weighted sums)
   - `recommendation.json` (chosen option, confidence, rationale text)

3. Elicit the bounded-context list from the user. For each context, capture:
   - `id` — kebab-case name (e.g., `billing`, `tenant-onboarding`)
   - `purpose` — one-sentence description
   - `adapter_ports` — list of port names if the decision is `ports-pure` or `hybrid` (e.g., `http-inbound`, `postgres-outbound`, `stripe-outbound`)
   - `depends_on` — other context ids this one depends on (no cycles allowed; step-07 verifies)
   - `tenant_aware` — boolean; true if this context reads/writes tenant-scoped data

   Require **at least 2** bounded contexts before proceeding.

4. Write the populated doc to `{project-root}/docs/architecture/module-decomposition.md` (ensure parent dir via `mkdir -p`).

5. Write the machine-readable contract `module-decomposition.json` to BOTH locations (ensure parent dirs):
   - `{project-root}/docs/architecture/module-decomposition.json` (human-visible copy alongside narrative)
   - `{project-root}/_bmad/bam/evidence/QG-F1/module-decomposition.json` (gate-evidence pointer for QG-F1 + QG-M1)

   JSON schema (exact):

   ```json
   {
     "schema_version": "1.0",
     "decided_at": "<ISO-8601 UTC>",
     "decision": "ddd-pure | ports-pure | hybrid | vertical-slice",
     "bounded_contexts": [
       {
         "id": "<kebab-case-name>",
         "purpose": "<one-sentence>",
         "adapter_ports": ["<port-name>", "..."],
         "depends_on": ["<other-context-id>", "..."],
         "tenant_aware": true
       }
     ],
     "decision_matrix_ref": "_bmad/bam/cache/modular-monolith-design/<date>/decision-matrix.json"
   }
   ```

   Population rules:
   - `decision` = `option` from `recommendation.json`.
   - `bounded_contexts` = elicited list (≥ 2 entries).
   - `adapter_ports` may be `[]` when `decision == "ddd-pure"` (ports-pure-only construct); MUST be non-empty for any context when `decision` is `ports-pure` or `hybrid`.
   - `tenant_aware` defaults to `true` for any context handling tenant-scoped data; explicit `false` only for cross-tenant infra contexts (e.g., `platform-admin`).
   - `decision_matrix_ref` = the cache path of the matrix file emitted in step-03.

## Output

1. `{project-root}/docs/architecture/module-decomposition.md` — design doc. Sections (mirrors template):
   - Frontmatter (yaml): id, title, status (`draft`), date, persona (`atlas`), workflow_run_id
   - ## Decision: <chosen-option> with confidence
   - ## Context: domain + team + codebase
   - ## Rationale: from `recommendation.json`
   - ## Bounded contexts (table)
   - ## Adapter port catalog (if ports-pure or hybrid)
   - ## Decision matrix scores (table)
   - ## Quality gate references (QG-F1, QG-M1)
   - ## Next steps (links to design-deployment-topology, design-tier-model, design-finops-model)

2. `{project-root}/docs/architecture/module-decomposition.json` — machine-readable contract (schema above).

3. `{project-root}/_bmad/bam/evidence/QG-F1/module-decomposition.json` — identical content written as QG-F1 gate evidence.

## Gate

Machine-checkable:

- `module-decomposition.md` exists at expected path + all required sections present.
- `module-decomposition.json` exists at BOTH destinations as required QG-F1 + QG-M1 evidence.
- JSON content validates:
  - `schema_version` present
  - `decision` ∈ {`ddd-pure`, `ports-pure`, `hybrid`, `vertical-slice`}
  - `bounded_contexts` is an array with ≥ 2 entries
  - Each entry has `adapter_ports` + `depends_on` (both arrays, possibly empty) + `tenant_aware` (boolean)

## Next step

`step-06-c-record-adr.md`
