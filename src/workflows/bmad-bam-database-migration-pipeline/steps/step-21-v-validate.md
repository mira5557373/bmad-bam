# Step 21: Validate Migration Pipeline

## Purpose

Validate the migration pipeline artifacts against QG-MG1 quality criteria.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-MG1`

---

## Actions

Execute the validation checklist below to verify migration pipeline artifacts.

## Validation Checklist

### Migration Execution
- [ ] Pre-migration checklist completed
- [ ] Migration scope documented
- [ ] Migration executed successfully
- [ ] Results documented

### Data Validation
- [ ] Row counts verified
- [ ] Consistency checks passed
- [ ] Tenant isolation confirmed
- [ ] Application validation complete

### Tenant Impact
- [ ] Per-tenant data verified
- [ ] Performance impact measured
- [ ] Feature impact documented
- [ ] Downtime analyzed

### Rollback Testing
- [ ] Rollback procedure documented
- [ ] Rollback tested (if applicable)
- [ ] Triggers documented
- [ ] Readiness confirmed

### QG-MG1 Migration Gate Verification

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| migration_executed | **YES** | [ ] Pass / [ ] Fail | Execution log |
| data_validated | **YES** | [ ] Pass / [ ] Fail | Validation results |
| tenant_impact_assessed | **YES** | [ ] Pass / [ ] Fail | Impact report |
| rollback_tested | **YES** | [ ] Pass / [ ] Fail | Rollback results |

**QG-MG1 Migration Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All required patterns verified
- **CONDITIONAL**: Minor gaps documented
- **FAIL**: Critical pattern failing

---

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Outputs

- Updated configuration or artifact

## Next Step

Proceed to `step-22-v-generate-report.md` to generate final validation report.
