# Step 22: Generate Validation Report

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Generate the final validation report for agent tracing design.

---

## Prerequisites

- Step 21 completed (validation performed)

---

## Actions

### 1. Compile Results

| Gate | Status | Critical Checks | Non-Critical Checks |
|------|--------|-----------------|---------------------|
| QG-M3.1 Trace Schema | | /4 | /1 |
| QG-I2 Tenant Isolation | | /3 | /2 |
| QG-M3.2 Context Propagation | | /2 | /2 |
| QG-P1 Analysis Capabilities | | /2 | /2 |

### 2. Determine Overall Outcome

| Outcome | Criteria |
|---------|----------|
| **PASS** | All critical checks pass |
| **CONDITIONAL** | All critical pass, some non-critical fail |
| **FAIL** | Any critical check fails |

### 3. Generate Report Document

Write to: `{output_folder}/planning-artifacts/quality/agent-tracing-validation-report.md`

```markdown
# Agent Tracing Design Validation Report

**Date:** {{date}}
**Artifact:** agent-tracing-design.md
**Gates:** QG-M3, QG-I2, QG-P1

## Overall Result: {{PASS/CONDITIONAL/FAIL}}

## Check Results

### QG-M3.1: Trace Schema
- Status: {{status}}
- Critical: {{passed}}/4
- Details: {{details}}

### QG-I2: Tenant Isolation
- Status: {{status}}
- Critical: {{passed}}/3
- Details: {{details}}

### QG-M3.2: Context Propagation
- Status: {{status}}
- Critical: {{passed}}/2
- Details: {{details}}

### QG-P1: Analysis Capabilities
- Status: {{status}}
- Critical: {{passed}}/2
- Details: {{details}}

## Findings Summary

### Passed Checks
{{List of passed checks}}

### Failed Checks
{{List of failed checks with remediation}}

## Recommendations

{{If CONDITIONAL or FAIL, list remediation steps}}

### Immediate Actions
- {{Action 1}}
- {{Action 2}}

### Follow-up Actions
- {{Follow-up 1}}
- {{Follow-up 2}}

## Sign-off

- [ ] Reviewed by: _______________
- [ ] Date: _______________
- [ ] Approved for: {{next phase}}
```

### 4. Determine Next Steps

| Outcome | Next Step |
|---------|-----------|
| PASS | Proceed to implementation |
| CONDITIONAL | Address non-critical issues, proceed with caution |
| FAIL | Return to Edit mode to remediate critical issues |

---

## Verification

- [ ] All results compiled
- [ ] Outcome determined
- [ ] Report generated
- [ ] Next steps documented

---

## Outputs

- `agent-tracing-validation-report.md`
- Quality gate status (QG-M3, QG-I2, QG-P1 components)

---

## Next Step

| Outcome | Action |
|---------|--------|
| PASS | Ready for implementation. Proceed to coding phase. |
| CONDITIONAL | Address non-critical issues. Implementation may proceed with documented gaps. |
| FAIL | Return to Edit mode (`step-10-e-load.md`) to remediate critical failures. |
