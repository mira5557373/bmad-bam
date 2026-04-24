# Step 20: Load Artifact (Validate Mode)

## Purpose

Load the cost optimization review for validation against QG-CS1 criteria.

## Prerequisites

- Cost configuration exists at `{output_folder}/planning-artifacts/cost-config.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `cost-*`

## Actions

### 1. Load Existing Documents

Load cost optimization documents.

### 2. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Cost baseline | Yes/No | {ready/incomplete} |
| Optimization opportunities | Yes/No | {ready/incomplete} |
| Tenant attribution | Yes/No | {ready/incomplete} |
| Budget alerts | Yes/No | {ready/incomplete} |

## COLLABORATION MENUS (A/P/C):

#### If 'C' (Continue):
- Proceed to next step: `step-21-v-validate.md`

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Outputs

- Updated configuration or artifact

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
