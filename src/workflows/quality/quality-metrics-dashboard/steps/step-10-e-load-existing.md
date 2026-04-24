# Step 10: Load Existing Dashboard

## Purpose

Load existing dashboard specification for modification.

## Prerequisites

- Existing quality-metrics configuration at `{output_folder}/planning-artifacts/quality-metrics-config.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `quality-metrics-*`

## Actions

### 1. Load Dashboard Specification

Read from: `{output_folder}/quality-artifacts/quality-dashboard-spec.md`

### 2. Extract Current Configuration

| Component | Current State |
|-----------|---------------|
| Metrics | |
| Visualizations | |
| Alerts | |
| Tenant Filtering | |

## Verification

- [ ] Dashboard specification file exists
- [ ] Specification successfully loaded
- [ ] Metrics definitions extracted
- [ ] Visualizations documented
- [ ] Alert configuration parsed
- [ ] Tenant filtering settings identified

## Outputs

- Loaded dashboard configuration

## Next Step

Proceed to `step-11-e-apply-changes.md`.
