# Step 21: Validate Dashboard

## Purpose

Validate dashboard specification completeness and correctness.

## Prerequisites

- Step 20 complete (artifact loaded)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-operations-continuous.md`

## Actions

### 1. Validate Components

| Component | Required | Present | Valid |
|-----------|----------|---------|-------|
| Metrics definitions | Yes | | |
| Visualizations | Yes | | |
| Alert configuration | Yes | | |
| Access control | Yes | | |
| Tenant filtering | Yes | | |

### 2. Validate Security

- [ ] Tenant isolation enforced
- [ ] Access control defined
- [ ] No cross-tenant data leakage

## Verification

- [ ] Metrics definitions are complete
- [ ] Visualizations are properly configured
- [ ] Alert configuration is valid
- [ ] Access control is defined
- [ ] Tenant filtering is enforced
- [ ] No cross-tenant data leakage possible

## Outputs

- Validation results

## Next Step

Proceed to `step-22-v-generate-report.md`.
