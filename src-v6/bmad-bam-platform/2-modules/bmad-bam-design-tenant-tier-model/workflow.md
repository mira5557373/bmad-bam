# Workflow router — bmad-bam-design-tenant-tier-model

This skill follows the CEV (Create/Edit/Validate) workflow pattern (per spec §6.X).

## Modes

### Create mode (default)

Greenfield tier matrix. Runs steps 01-c through 06-c, then verify (07-v).

1. `steps/step-01-c-elicit-context.md` — gather feature gates, capacity bands, SLA tiers; honor `--custom-tiers N`
2. `steps/step-02-c-load-options.md` — load 5 default tiers (free/starter/pro/business/enterprise) or N-custom
3. `steps/step-03-c-decision-matrix.md` — score gate-placement options
4. `steps/step-04-c-recommendation.md` — write rationale + recommendation; emit downstream-contract hints
5. `steps/step-05-c-write-design.md` — produce tier-model.md + .json
6. `steps/step-06-c-record-adr.md` — write decision ADR
7. `steps/step-07-v-verify-completeness.md` — verify all outputs present

### Edit mode

Re-runs steps 02-06 starting from existing inputs (e.g., new tier added, gate moved).

### Validate mode

Runs only step 07 against existing outputs.

## Flags

- `--custom-tiers N` — integer in `[3, 7]`; default 5. When set, step-02 loads an N-tier scaffold instead of the 5-tier default. Validated by step-01 (rejects out-of-range with a clear error).

## Convention

All output artifacts go to `{project-root}/docs/architecture/` (markdown) and `{project-root}/_bmad/bam/evidence/QG-F1/` (JSON copy).
