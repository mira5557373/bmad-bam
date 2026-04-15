# Step 10: Load Existing Artifact (Edit Mode)

## Purpose

Load and review existing capacity plan to identify sections requiring modification.

## Prerequisites

- Existing capacity plan to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: capacity

## Actions

### 1. Load Existing Documents

Load the existing capacity planning documents:
- `{output_folder}/operations/capacity/capacity-plan-{date}.md`
- `{output_folder}/operations/capacity/scaling-recommendations-{date}.md`

### 2. Parse Document Structure

| Component | Status | Key Information |
|-----------|--------|-----------------|
| Capacity baseline | Complete/Incomplete | {summary} |
| Growth projection | Complete/Incomplete | {summary} |
| Scaling thresholds | Complete/Incomplete | {summary} |
| Resource allocation | Complete/Incomplete | {summary} |

### 3. Identify Modification Targets

Confirm which sections need modification.

## COLLABORATION MENUS (A/P/C):

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

## Outputs

- Summary of current capacity plan state
- List of sections to modify

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
