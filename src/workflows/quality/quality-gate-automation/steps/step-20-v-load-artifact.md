# Step 20: Load Automation Artifact

## Purpose

Load gate automation specification for validation.

## Prerequisites

- Quality-gate configuration exists at `{output_folder}/planning-artifacts/quality-gate-config.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `quality-gate-*`

## Actions

### 1. Load Specification

Read from: `{output_folder}/quality-artifacts/gate-automation-spec.md`

## Verification

- [ ] Specification file exists at expected path
- [ ] Specification successfully loaded
- [ ] File format is valid
- [ ] All required sections present

## Outputs

- Loaded specification

## Next Step

Proceed to `step-21-v-validate.md`.
