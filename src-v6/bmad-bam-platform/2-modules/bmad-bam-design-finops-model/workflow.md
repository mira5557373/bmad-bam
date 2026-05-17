# Workflow router — bmad-bam-design-finops-model

This skill follows the CEV (Create/Edit/Validate) workflow pattern (per spec §6.X).
As the last foundation skill in the dependency chain, it has an 8th step
(`step-08-v-verify-coherence`) that emits `foundation-coherence.json` for QG-F1 C3.

## Modes

### Create mode (default)

Greenfield cost model. Runs steps 01-c through 06-c, then verify (07-v + 08-v).

1. `steps/step-01-c-elicit-context.md` — load tenancy + tier + deployment inputs; gather vendor pricing, AI budget
2. `steps/step-02-c-load-options.md` — load cost-attribution + allocation-method options
3. `steps/step-03-c-decision-matrix.md` — score allocation methods against tenancy + tier + deployment
4. `steps/step-04-c-recommendation.md` — write rationale + recommendation
5. `steps/step-05-c-write-design.md` — produce finops-baseline.md + .json
6. `steps/step-06-c-record-adr.md` — write decision ADR
7. `steps/step-07-v-verify-completeness.md` — verify all outputs present
8. `steps/step-08-v-verify-coherence.md` — cross-check all 4 foundation artifacts; emit foundation-coherence.json

### Edit mode

Re-runs steps 02-06 starting from existing inputs (e.g., vendor price change). Always re-runs step-08 after.

### Validate mode

Runs only steps 07 + 08 against existing outputs.

## Convention

All output artifacts go to `{project-root}/docs/architecture/` (markdown) and `{project-root}/_bmad/bam/evidence/QG-F1/` (JSON copy + foundation-coherence.json).
