# Workflow router — bmad-bam-design-tenant-offboarding

CEV (Create/Edit/Validate) workflow.

## Modes

### Create mode (default)

Greenfield offboarding policy design. Runs steps 01-c through 06-c, then verify (07-v).

1. `steps/step-01-c-elicit-context.md` — read 4 inputs (2 req, 2 soft) + honor `--regulatory-profile`; elicit legal-holds + cross-module handoffs
2. `steps/step-02-c-load-options.md` — load 3 deletion modes (hard / soft / anonymize); pre-fill per-tier from profile preset
3. `steps/step-03-c-decision-matrix.md` — score per-tier mode against 4 axes
4. `steps/step-04-c-recommendation.md` — lock per-tier mode + retention window + erasure fast-path + tear-down hooks + handoffs + legal-holds
5. `steps/step-05-c-write-design.md` — emit offboarding-policy.md + .json
6. `steps/step-06-c-record-adr.md` — write sidecar ADR
7. `steps/step-07-v-verify-completeness.md` — schema validation + retention-floor + mandatory-true invariants; emit QG-M2-offboarding-evidence.md

### Edit mode

Re-runs steps 02-06 (skipping elicit) when regulatory profile changes OR new tier added.

### Validate mode

Runs step-07-v alone against existing outputs; emits refresh report; bumps last_reviewed.

## Flags

- `--regulatory-profile {gdpr_baseline | hipaa | sox_or_pci | none}` (default: `gdpr_baseline`).

## Convention

Outputs to `{project-root}/docs/architecture/` (narrative) and `{project-root}/_bmad/bam/evidence/QG-M2/` (JSON + human evidence narrative).
