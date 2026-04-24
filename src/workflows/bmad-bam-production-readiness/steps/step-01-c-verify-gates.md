# Step 1: Verify Prerequisite Gates

## Purpose

Verify all prerequisite quality gates have passed before production readiness assessment.

## Prerequisites

- All dependent workflows completed
- Gate results documented
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/qg-prod-checklist.md`

## Actions

### 1. Security Gate Status

| Gate ID | Gate Name | Required Status | Actual Status | Date Verified |
|---------|-----------|-----------------|---------------|---------------|
| QG-S4 | AI Security Gate | PASS | | |
| QG-I3 | Agent Safety Gate | PASS | | |

### 2. Data Protection Gate Status

| Gate ID | Gate Name | Required Status | Actual Status | Date Verified |
|---------|-----------|-----------------|---------------|---------------|
| QG-DR1 | Data Residency Gate | PASS | | |

### 3. Compliance Gate Status

| Gate ID | Gate Name | Required Status | Actual Status | Date Verified |
|---------|-----------|-----------------|---------------|---------------|
| QG-CP1 | Compliance Policy Gate | PASS | | |

### 4. Code Quality Gate Status

| Gate ID | Gate Name | Required Status | Actual Status | Date Verified |
|---------|-----------|-----------------|---------------|---------------|
| QG-CC | Code Coverage Gate | PASS | | |
| QG-F1 | Format Gate | PASS | | |
| QG-M2 | Module Gate | PASS | | |
| QG-P1 | PR Gate | PASS | | |

### 5. Gate Dependency Check

| Dependency | Status | Blocking |
|------------|--------|----------|
| All critical gates passed | | Yes |
| No CONDITIONAL with open items | | Yes |
| All remediation complete | | Yes |

**Stop if any blocking gates have not passed.**

**Verify gate verification with web search:**
Search the web: "quality gate verification checklist {date}"

## Verification

- [ ] All security gates verified
- [ ] Data protection gates verified
- [ ] Compliance gates verified
- [ ] Code quality gates verified
- [ ] No blocking dependencies

## Outputs

- Gate verification summary

## Next Step

If all gates passed: Proceed to `step-02-c-assess-infrastructure.md`
If gates failed: Address gate failures first
