# Step 22: Generate Validation Report

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Generate the final validation report for QG-AI2.

## Prerequisites

- Step 21 completed (validation performed)

## Actions

### 1. Compile Results

| Gate | Status | Critical Checks | Non-Critical Checks |
|------|--------|-----------------|---------------------|
| QG-AI2.1 | | /4 | /1 |
| QG-AI2.2 | | /2 | /2 |
| QG-AI2.3 | | /2 | /2 |
| QG-AI2.4 | | /2 | /2 |

### 2. Determine Overall Outcome

| Outcome | Criteria |
|---------|----------|
| **PASS** | All critical checks pass |
| **CONDITIONAL** | All critical pass, some non-critical fail |
| **FAIL** | Any critical check fails |

### 3. Generate Report Document

Write to: `{output_folder}/planning-artifacts/quality/action-contract-validation-report.md`

```markdown
# Action Contract Validation Report

**Date:** {{date}}
**Artifact:** action-contract-spec.md
**Gate:** QG-AI2

## Overall Result: {{PASS/CONDITIONAL/FAIL}}

## Check Results

### QG-AI2.1: Schema Completeness
- Status: {{status}}
- Critical: {{passed}}/4
- Details: {{details}}

### QG-AI2.2: Confidence Thresholds
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

- `action-contract-validation-report.md`
- QG-AI2 gate status

## Next Step

If PASS: Ready for PRG gate setup.
If CONDITIONAL: Address non-critical issues, proceed with caution.
If FAIL: Return to Edit mode to remediate.
