# Step 22: Generate Privacy Compliance Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Focus: Generate comprehensive QG-CC validation report
- Track: `stepsCompleted: [20, 21, 22]` when complete
- Context: Compile all validation findings into report
- Do NOT: Modify the original artifact
- Use web search: Not required for report generation

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Compiling validation results
- Generating formal report
- Determining QG-CC outcome

**OUT OF SCOPE:**
- Modifying the artifact
- Re-running validation
- Implementing fixes

## YOUR TASK

Generate a comprehensive QG-CC validation report from the validation results. Determine the gate outcome (PASS/CONDITIONAL/FAIL). Present the report with executive summary, detailed findings, and next steps.

---

## Purpose

Generate the formal QG-CC (Continuous Compliance) validation report, documenting all findings, the compliance outcome, and recommended next steps.

## Prerequisites

- Step 21 completed with all checks executed
- Validation evidence documented
- Issues identified and classified

## Actions

### 1. Compile Validation Results

Aggregate all validation results:

```yaml
validation_summary:
  artifact: privacy-compliance.md
  validation_date: {current_date}
  validator: {user_name}
  
  checks_executed:
    critical: {count}
    required: {count}
    recommended: {count}
    total: {total}
    
  results:
    passed: {count}
    failed: {count}
    partial: {count}
    skipped: {count}
    
  compliance_score:
    raw: {points}/{max_points}
    percentage: {percentage}%
```

### 2. Determine QG-CC Outcome

**Apply outcome criteria:**

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | All CRITICAL pass, >80% Required pass | Proceed to next workflow |
| **CONDITIONAL** | All CRITICAL pass, 60-80% Required pass | Proceed with mitigation plan |
| **FAIL** | Any CRITICAL fails | Enter recovery protocol |

### 3. Generate Executive Summary

```markdown
## QG-CC Validation Report - Executive Summary

**Artifact:** Privacy Compliance Design
**Date:** {current_date}
**Validator:** {user_name}

### Outcome: [PASS | CONDITIONAL | FAIL]

**Compliance Score:** {percentage}% ({points}/{max_points})

### Summary
- **CRITICAL Checks:** {passed}/{total} passed
- **Required Checks:** {passed}/{total} passed
- **Recommended Checks:** {passed}/{total} passed

### Key Findings
1. [Most significant finding]
2. [Second finding]
3. [Third finding]

### Recommendation
[Proceed to implementation | Proceed with mitigations | Enter recovery]
```

### 4. Generate Detailed Findings

```markdown
## Detailed Validation Findings

### CRITICAL Checks

| ID | Check | Status | Evidence | Notes |
|----|-------|--------|----------|-------|
| DSR-1 | Art. 15-22 rights | PASS | Rights table complete | - |
| DSR-2 | Tenant isolation | PASS | RLS documented | - |
| LB-1 | Lawful basis | FAIL | Missing 2 activities | See Issue #1 |

### Required Checks

| ID | Check | Status | Evidence | Notes |
|----|-------|--------|----------|-------|
| EXP-1 | Export format | PASS | JSON defined | - |
| CON-1 | Consent workflow | PARTIAL | Missing double opt-in | See Issue #3 |

### Recommended Checks

| ID | Check | Status | Evidence | Notes |
|----|-------|--------|----------|-------|
| REG-1 | Processing register | PASS | Schema present | - |
| UX-1 | No dark patterns | PARTIAL | Needs review | See Issue #5 |
```

### 5. Generate Issue Report

```markdown
## Issues Requiring Resolution

### CRITICAL Issues (Block Compliance)

**Issue #1: [Title]**
- **Check:** [Check ID]
- **Finding:** [Description]
- **Impact:** [Compliance impact]
- **Recommendation:** [Action required]
- **Owner:** [Role]
- **Timeline:** Immediate

### HIGH Issues (Significant Gaps)

**Issue #2: [Title]**
- **Check:** [Check ID]
- **Finding:** [Description]
- **Recommendation:** [Action required]
- **Timeline:** 1 week

### MEDIUM Issues (Partial Compliance)

**Issue #3: [Title]**
...

### LOW Issues / Recommendations

**Issue #4: [Title]**
...
```

### 6. Generate Mitigation Plan (if CONDITIONAL)

```markdown
## Mitigation Plan

**Gate Outcome:** CONDITIONAL

The following mitigations allow proceeding to implementation:

| Issue | Mitigation | Owner | Deadline |
|-------|------------|-------|----------|
| #2 | [Short-term action] | [Role] | [Date] |
| #3 | [Short-term action] | [Role] | [Date] |

### Acceptance Criteria
- [ ] Mitigation #1 complete by [date]
- [ ] Mitigation #2 complete by [date]
- [ ] Re-validation scheduled for [date]

### Sign-off
- [ ] Technical Lead approval
- [ ] Compliance Officer approval
```

### 7. Generate Recovery Plan (if FAIL)

```markdown
## Recovery Protocol

**Gate Outcome:** FAIL

CRITICAL issues must be resolved before proceeding.

### Recovery Steps

**Attempt 1:**
1. Address CRITICAL Issue #1: [Action]
2. Re-run validation
3. Expected completion: [Date]

**Attempt 2 (if Attempt 1 fails):**
1. Deep review with stakeholders
2. Root cause analysis
3. Revised approach

**Mandatory Course Correction (if Attempt 2 fails):**
1. Escalate to project leadership
2. Consider architecture changes
3. External compliance review

### Recovery Timeline
- Attempt 1: [Date]
- Attempt 2: [Date + 1 week]
- Escalation: [Date + 2 weeks]
```

### 8. Save Validation Report

Save the report:
```
{output_folder}/planning-artifacts/compliance/privacy-compliance-validation-{date}.md
```

---

## SUCCESS METRICS

- Validation results compiled
- QG-CC outcome determined
- Executive summary generated
- Detailed findings documented
- Issues cataloged with severity
- Mitigation/Recovery plan (if applicable)
- Report saved to output location

---

## FAILURE MODES

- **Missing validation data:** Cannot generate report - return to step 21
- **Ambiguous outcome:** Apply conservative interpretation (lower outcome)
- **Write failure:** Retry, present report in conversation

---

## Verification

- [ ] All validation results compiled
- [ ] QG-CC outcome correctly determined
- [ ] Executive summary accurate
- [ ] All findings documented
- [ ] Issues properly classified
- [ ] Mitigation/Recovery plan included (if needed)
- [ ] Report saved successfully

## Outputs

- `{output_folder}/planning-artifacts/compliance/privacy-compliance-validation-{date}.md`
- QG-CC outcome determination
- Issue resolution roadmap
- Mitigation or recovery plan

## Next Step

Based on outcome:
- **PASS:** Proceed to `bmad-bam-compliance-mapping` or `bmad-bam-audit-logging`
- **CONDITIONAL:** Implement mitigations, schedule re-validation
- **FAIL:** Execute recovery protocol, re-run Create mode

---

**Navigation:** Validation complete. Report generated.
