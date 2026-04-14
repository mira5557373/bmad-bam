# Step 20: Load Artifact (Validate Mode)

## Purpose

Load the capacity plan documents for validation against the QG-CP1 quality gate criteria.

## Prerequisites

- Capacity plan artifact exists to validate

## Actions

### 1. Load Existing Documents

Load the existing capacity planning documents.

### 2. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Capacity baseline | Yes/No | {ready/incomplete} |
| Growth projection | Yes/No | {ready/incomplete} |
| Scaling thresholds | Yes/No | {ready/incomplete} |
| Resource allocation | Yes/No | {ready/incomplete} |

## COLLABORATION MENUS (A/P/C):

#### If 'C' (Continue):
- Confirm artifact loaded successfully
- Proceed to next step: `step-21-v-validate.md`

## Outputs

- Validation context prepared

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
