# Step 10: Load Existing Automation

## Purpose

Load existing gate automation configuration for modification.

## Prerequisites

- Existing quality-gate configuration at `{output_folder}/planning-artifacts/quality-gate-config.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `quality-gate-*`

## Actions

### 1. Load Configuration

Read from: `{output_folder}/quality-artifacts/gate-automation-spec.md`

### 2. Parse Current State

| Component | Current |
|-----------|---------|
| Gate mappings | |
| Thresholds | |
| Bypass policy | |

## Verification

- [ ] Configuration file exists at expected path
- [ ] Configuration successfully loaded
- [ ] Gate mappings parsed correctly
- [ ] Thresholds extracted and documented
- [ ] Bypass policy identified

## Outputs

- Loaded automation configuration

## Next Step

Proceed to `step-11-e-apply-changes.md`.
