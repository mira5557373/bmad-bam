# Step 22: Generate Memory Tier Validation Report (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate comprehensive validation report
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Use validation results from Step 21
- 🚫 Do NOT: Re-run validation checks
- 🔍 Use web search: Not required (report generation)
- ⚠️ Note: Include remediation guidance for any failures

---

## Purpose

Generate a comprehensive validation report documenting all findings, the gate decision, and remediation recommendations. This report serves as the official QG-M3 validation artifact.

---

## Prerequisites

- Step 21 completed: Validation checks run
- Gate decision calculated
- All findings documented

---

## Actions

### 1. Generate Executive Summary

```markdown
## Executive Summary

**Artifact:** Memory Tier Design
**Quality Gate:** QG-M3 (Agent Runtime)
**Validation Date:** {{date}}
**Validator:** AI Architect

### Gate Decision: {{PASS/CONDITIONAL/FAIL}}

**Summary:**
- Total Checks: 37
- Passed: {{passed}}
- Failed: {{failed}}
- Critical Checks: 6 ({{critical_passed}} passed)

{{One paragraph summary of validation outcome}}
```

### 2. Compile Detailed Results

```markdown
## Detailed Validation Results

### Memory Tier Completeness
| Check | Result | Notes |
|-------|--------|-------|
{{results_table}}

### Context Management
| Check | Result | Notes |
|-------|--------|-------|
{{results_table}}

### Vector Store Architecture
| Check | Result | Notes |
|-------|--------|-------|
{{results_table}}

### Isolation (CRITICAL)
| Check | Result | Notes |
|-------|--------|-------|
{{results_table}}

### Compliance
| Check | Result | Notes |
|-------|--------|-------|
{{results_table}}

### Implementation
| Check | Result | Notes |
|-------|--------|-------|
{{results_table}}
```

### 3. Document Critical Issues

```markdown
## Critical Issues

{{If no critical issues:}}
No critical issues found. All isolation requirements verified.

{{If critical issues exist:}}
| Issue ID | Check | Description | Impact | Remediation |
|----------|-------|-------------|--------|-------------|
| CRIT-01 | ISO-xx | {{desc}} | {{impact}} | {{fix}} |
```

### 4. Document Non-Critical Issues

```markdown
## Non-Critical Issues

{{If no issues:}}
No non-critical issues found.

{{If issues exist:}}
| Issue ID | Check | Description | Priority | Remediation |
|----------|-------|-------------|----------|-------------|
| NC-01 | {{check}} | {{desc}} | {{priority}} | {{fix}} |
```

### 5. Generate Remediation Plan (If Applicable)

```markdown
## Remediation Plan

{{If FAIL or CONDITIONAL:}}

### Required Remediations (FAIL → CONDITIONAL/PASS)

| Issue | Action | Owner | Deadline | Status |
|-------|--------|-------|----------|--------|
| {{issue}} | {{action}} | {{owner}} | {{date}} | Open |

### Recommended Improvements (CONDITIONAL → PASS)

| Issue | Action | Owner | Deadline | Status |
|-------|--------|-------|----------|--------|
| {{issue}} | {{action}} | {{owner}} | {{date}} | Open |

### Re-validation Steps

1. Address all critical issues
2. Re-run Edit mode to update design
3. Re-run Validate mode
4. Confirm PASS outcome

{{If PASS:}}

No remediation required. Design meets all QG-M3 criteria.

### Recommended Enhancements (Optional)

| Enhancement | Benefit | Effort |
|-------------|---------|--------|
| {{enhancement}} | {{benefit}} | {{effort}} |
```

### 6. Generate Gate Decision Certificate

```markdown
## QG-M3 Gate Decision

**Gate:** QG-M3 (Agent Runtime)
**Artifact:** Memory Tier Design
**Decision:** {{PASS/CONDITIONAL/FAIL}}
**Date:** {{date}}

### Decision Rationale

{{Detailed explanation of why this decision was reached}}

### Conditions (If CONDITIONAL)

| Condition | Deadline | Acceptance Criteria |
|-----------|----------|---------------------|
| {{condition}} | {{date}} | {{criteria}} |

### Sign-off

- [ ] Architect review complete
- [ ] Security review complete (if applicable)
- [ ] Compliance review complete (if applicable)
```

### 7. Save Validation Report

Save to: `{output_folder}/planning-artifacts/validation/memory-tiers-validation-report.md`

### 8. Present Final Summary

Display gate outcome to user:

| Metric | Value |
|--------|-------|
| Gate | QG-M3 (Agent Runtime) |
| Decision | **{{PASS/CONDITIONAL/FAIL}}** |
| Total Checks | 37 |
| Passed | {{passed}} |
| Critical Issues | {{count}} |
| Non-Critical Issues | {{count}} |

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring perspectives on next steps
- **C (Continue)**: Complete validation workflow

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complete report, gate decision
- Process enhanced insights on findings and remediation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review memory tier validation report and next steps"
- Present synthesized recommendations from Atlas, Nova, Kai
- Return to A/P/C menu

#### If 'C' (Continue):
- Mark Validate mode complete

---

## Verification

- [ ] Executive summary generated
- [ ] Detailed results compiled
- [ ] Critical issues documented (if any)
- [ ] Non-critical issues documented (if any)
- [ ] Remediation plan included (if applicable)
- [ ] Gate decision certificate generated
- [ ] Report saved to correct location
- [ ] Final summary presented

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/validation/memory-tiers-validation-report.md`
- Gate decision certificate
- Remediation plan (if applicable)

---

## Next Step

Validate workflow complete. Proceed based on gate decision:
- **PASS**: Memory tier design approved. Proceed to implementation.
- **CONDITIONAL**: Address documented conditions by deadline, then proceed.
- **FAIL**: Return to Edit mode to address critical issues, then re-validate.

---

## Workflow Complete

Validate mode is complete.

**Gate Decision: {{PASS/CONDITIONAL/FAIL}}**

{{If PASS:}}
Memory tier design meets all QG-M3 criteria. Design is approved for implementation.

{{If CONDITIONAL:}}
Memory tier design meets critical requirements but has non-critical gaps. Proceed with implementation while addressing documented conditions.

{{If FAIL:}}
Memory tier design has critical issues. Return to Edit mode to address:
{{list of critical issues}}

Re-run Validate mode after fixes are applied.
