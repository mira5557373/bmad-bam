# Workflow router — bmad-bam-design-tenant-onboarding

CEV (Create/Edit/Validate) workflow.

## Modes

### Create mode (default)

Greenfield onboarding flow design. Runs steps 01-c through 06-c, then verify (07-v).

1. `steps/step-01-c-elicit-context.md` — read 3 inputs + 6-step validation; hybrid resolution
2. `steps/step-02-c-load-options.md` — load 3 flow templates; pre-fill per-tier from upgrade_mode
3. `steps/step-03-c-decision-matrix.md` — score per-tier flow against 4 axes
4. `steps/step-04-c-recommendation.md` — lock per-tier flow + provisioning + verification step
5. `steps/step-05-c-write-design.md` — emit onboarding-flow.md + .json
6. `steps/step-06-c-record-adr.md` — write sidecar ADR
7. `steps/step-07-v-verify-completeness.md` — schema validation; emit QG-M2-onboarding-evidence.md

### Edit mode

Re-runs steps 02-06 (skipping elicit) when new tier added.

### Validate mode

Runs step-07-v alone against existing outputs; emits refresh report; bumps last_reviewed.

## Flags

None.

## Convention

Outputs to `{project-root}/docs/architecture/` (narrative) and `{project-root}/_bmad/bam/evidence/QG-M2/` (JSON + human evidence narrative).
