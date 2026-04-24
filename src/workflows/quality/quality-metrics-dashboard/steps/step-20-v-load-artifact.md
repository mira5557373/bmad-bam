# Step 20: Load Dashboard Artifact

## Purpose

Load dashboard specification for validation.

## Prerequisites

- Quality-metrics configuration exists at `{output_folder}/planning-artifacts/quality-metrics-config.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `quality-metrics-*`

## Actions

### 1. Load Specification

Read from: `{output_folder}/quality-artifacts/quality-dashboard-spec.md`

### 2. Parse Components

Extract all specification components for validation.

## Verification

- [ ] Specification file exists at expected path
- [ ] Specification successfully loaded
- [ ] File format is valid
- [ ] All required sections present
- [ ] Components extracted for validation

## Outputs

- Loaded specification for validation

## Next Step

Proceed to `step-21-v-validate.md`.
