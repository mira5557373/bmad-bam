# Step 22: Generate Validation Report

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Generate the final validation report for QG-PRG.

## Prerequisites

- Step 21 completed (validation performed)

## Actions

### 1. Compile Results

| Gate | Status | Critical Checks | Non-Critical Checks |
|------|--------|-----------------|---------------------|
| QG-PRG.1 | | /2 | /2 |
| QG-PRG.2 | | /2 | /2 |
| QG-PRG.3 | | /2 | /2 |
| QG-PRG.4 | | /2 | /2 |

### 2. Determine Overall Outcome

| Outcome | Criteria |
|---------|----------|
| **PASS** | All critical checks pass |
| **CONDITIONAL** | All critical pass, some non-critical fail |
| **FAIL** | Any critical check fails |

### 3. Generate Report Document

Write to: `{output_folder}/planning-artifacts/quality/prg-validation-report.md`

```markdown
# PRG Gate Validation Report

**Date:** {{date}}
**Artifact:** prg-gate-spec.md
**Gate:** QG-PRG

## Overall Result: {{PASS/CONDITIONAL/FAIL}}

## Check Results

### QG-PRG.1: Check Completeness
- Status: {{status}}
- Critical: {{passed}}/2
- Details: {{details}}

### QG-PRG.2: Automation
...

## Recommendations

{{If CONDITIONAL or FAIL, list remediation steps}}

## Sign-off

- [ ] Reviewed by: _______________
- [ ] Date: _______________
```

## Verification

- [ ] All results compiled
- [ ] Outcome determined
- [ ] Report generated

## Outputs

- `prg-validation-report.md`
- QG-PRG gate status

## Next Step

If PASS: Deploy PRG gate to CI/CD.
If CONDITIONAL: Address non-critical issues.
If FAIL: Return to Edit mode to remediate.
