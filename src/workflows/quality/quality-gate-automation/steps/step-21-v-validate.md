# Step 21: Validate Automation

## Purpose

Validate gate automation configuration completeness.

## Prerequisites

- Step 20 complete (artifact loaded)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`

## Actions

### 1. Validate Components

| Component | Required | Valid |
|-----------|----------|-------|
| Gate mappings | Yes | |
| Thresholds | Yes | |
| Bypass policy | Yes | |
| Pipeline config | Yes | |

## Verification

- [ ] Gate mappings are complete and valid
- [ ] Thresholds are defined for all gates
- [ ] Bypass policy is documented
- [ ] Pipeline configuration is valid
- [ ] All required components present

## Outputs

- Validation results

## Next Step

Proceed to `step-22-v-generate-report.md`.
