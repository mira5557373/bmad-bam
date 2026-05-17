# Workflow router — bmad-bam-design-deployment-topology

This skill follows the CEV (Create/Edit/Validate) workflow pattern (per spec §6.X).

## Modes

### Create mode (default)

Greenfield rollout design. Runs steps 01-c through 06-c, then verify (07-v).

1. `steps/step-01-c-elicit-context.md` — gather tenancy + tier inputs, change-window tolerance, regions
2. `steps/step-02-c-load-options.md` — load the 4 rollout defaults + cohort axes
3. `steps/step-03-c-decision-matrix.md` — score cohort options against tenancy + tier
4. `steps/step-04-c-recommendation.md` — write rationale + recommendation
5. `steps/step-05-c-write-design.md` — produce deployment-topology.md + .json
6. `steps/step-06-c-record-adr.md` — write decision ADR
7. `steps/step-07-v-verify-completeness.md` — verify all outputs present

### Edit mode

Re-runs steps 02-06 starting from existing inputs (e.g., tier model changed, re-cohort).

### Validate mode

Runs only step 07 against existing outputs.

## Convention

All output artifacts go to `{project-root}/docs/architecture/` (markdown) and `{project-root}/_bmad/bam/evidence/QG-F1/` (JSON copy).
