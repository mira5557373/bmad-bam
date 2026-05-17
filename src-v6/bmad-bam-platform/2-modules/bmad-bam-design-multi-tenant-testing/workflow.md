# Workflow router — bmad-bam-design-multi-tenant-testing

CEV (Create/Edit/Validate) workflow.

## Modes

### Create mode (default)

Greenfield test-catalogue design. Runs steps 01-c through 06-c, then verify (07-v).

1. `steps/step-01-c-elicit-context.md` — read tenancy (req) + tier-model (soft); confirm `isolation_model`; if `hybrid`, resolve per-tier mechanism map from `hybrid_resolution`
2. `steps/step-02-c-load-options.md` — load test class library (universal + per-model); each entry has id/name/applies_to/category/severity/universal/evidence_signature/traceable_to
3. `steps/step-03-c-decision-matrix.md` — coverage tradeoffs: depth-vs-breadth × severity bands × must-have ratio
4. `steps/step-04-c-recommendation.md` — lock catalogue scope: must-have / deferred / excluded with rationale
5. `steps/step-05-c-write-design.md` — emit test-catalogue.md + .json
6. `steps/step-06-c-record-adr.md` — write sidecar ADR
7. `steps/step-07-v-verify-completeness.md` — schema validation; ≥1 universal isolation test; traceable_to pattern; emit QG-M2-test-catalogue-evidence.md

### Edit mode

Re-runs steps 02-06 (skipping elicit) when `isolation_model` changes OR new test class added. For class-only updates, runs 04-06.

### Validate mode

Runs step-07-v alone against existing outputs; emits refresh report; bumps last_reviewed.

## Flags

None.

## Convention

Outputs to `{project-root}/docs/architecture/` (narrative) and `{project-root}/_bmad/bam/evidence/QG-M2/` (JSON + human evidence narrative).

The skill ships 1 BMM customize-template overlay at `customize-template/bmad-qa-generate-e2e-tests/customize.toml` — installed to `{project-root}/_bmad/custom/bmad-qa-generate-e2e-tests.toml` at `bmad install bmad-bam-platform` time. Pinned to BMM v6.6.0 schema. The `bmad-design-test-strategy` overlay is DEFERRED per R3.2.6 (BMM upstream skill not yet shipped).
