# Step 21: Validate PRG Configuration

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Validate PRG gate specification against QG-PRG criteria.

## Prerequisites

- Step 20 completed (artifact loaded)
- QG-PRG checklist available

## Actions

### 1. Validate Check Completeness (QG-PRG.1)

- [ ] **CRITICAL:** All 10 checks defined
- [ ] **CRITICAL:** Critical checks identified (1, 2, 4, 6, 10)
- [ ] Check methods specified
- [ ] Owners assigned

### 2. Validate Automation (QG-PRG.2)

- [ ] **CRITICAL:** 6 automated checks configured
- [ ] CI/CD pipeline defined
- [ ] Semi-auto checks have scripts
- [ ] Manual workflow documented

### 3. Validate Thresholds (QG-PRG.3)

- [ ] **CRITICAL:** Pass criteria defined for all checks
- [ ] Conditional criteria documented
- [ ] Timeouts are reasonable
- [ ] Retry policies specified

### 4. Validate Escalation (QG-PRG.4)

- [ ] **CRITICAL:** Escalation paths defined
- [ ] SLAs documented
- [ ] Exception process exists
- [ ] Approval authorities listed

## Verification

| Check | Status | Notes |
|-------|--------|-------|
| QG-PRG.1 Completeness | PASS/FAIL | |
| QG-PRG.2 Automation | PASS/FAIL | |
| QG-PRG.3 Thresholds | PASS/FAIL | |
| QG-PRG.4 Escalation | PASS/FAIL | |

## Outputs

- Validation results per check
- List of failures (if any)

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
