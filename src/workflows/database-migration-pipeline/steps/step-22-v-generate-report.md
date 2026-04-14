# Step 22: Generate Validation Report

## Purpose

Generate a comprehensive validation report summarizing findings from the migration pipeline validation.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Migration pipeline validation performed

---

## Actions

### 1. Compile Validation Results

| Category | Status | Notes |
|----------|--------|-------|
| Migration Execution | | Scripts executed |
| Data Validation | | Integrity verified |
| Tenant Impact | | Impact assessed |
| Rollback Testing | | Rollback verified |
| QG-MG1 Compliance | | All patterns verified |

### 2. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All required QG-MG1 patterns verified |
| **CONDITIONAL** | Minor gaps documented |
| **NEEDS REVISION** | Critical pattern failing |

---

## Outputs

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Improvement recommendations

---

## Workflow Complete

Validation mode complete for database-migration-pipeline workflow.


## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Next Step

Proceed to next step or complete workflow.
