---
step_id: 05-c-write-design
auto_runnable: true
gate: machine-checkable
inputs: [tenancy-context.json, recommendation.json]
outputs: [tenancy-model.md]
template_ref: tenancy-model.md.template
---

# Step 05 — Write the tenancy-model design doc

## Purpose

Produce a tenancy-model.md design doc using the template + inputs from prior steps. This is the artifact downstream architecture work depends on.

## Actions

1. Read template at `../templates/tenancy-model.md.template` (skill-relative; BMM convention).
2. Substitute placeholders with values from `tenancy-context.json` + `recommendation.json` + relevant fragments.
3. Write the populated doc to `{project-root}/docs/architecture/tenancy-model.md`.
4. Validate sections present per template.

## Output

`{project-root}/docs/architecture/tenancy-model.md` — the design doc. Schema:

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

## Gate

Machine-checkable: file exists at expected path + all 9 required sections present.

## Next step

`step-06-c-record-adr.md`
