# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report documenting QG-IR1 gate results and any required remediation actions.

---

## Prerequisites

- Validation completed (Step 21)
- Gate outcome determined

---

## Inputs

- Validation results from Step 21
- Gate outcome

---

## Actions

### 1. Generate Validation Report

Create validation report document:

```markdown
# QG-IR1 Validation Report

## Incident: {incident-id}

**Validation Date:** {date}
**Validator:** {name}
**Gate Outcome:** {PASS/CONDITIONAL/FAIL}

## Executive Summary

{Brief summary of validation results}

## Validation Results

### Critical Checks
| Check | Result | Notes |
|-------|--------|-------|
| Severity assigned | PASS/FAIL | {notes} |
| Response team assembled | PASS/FAIL | {notes} |
| Root cause identified | PASS/FAIL | {notes} |
| Mitigation documented | PASS/FAIL | {notes} |
| Resolution verified | PASS/FAIL | {notes} |

### Non-Critical Checks
| Category | Passed | Failed | Score |
|----------|--------|--------|-------|
| Classification | {n} | {n} | {%} |
| Response | {n} | {n} | {%} |
| Investigation | {n} | {n} | {%} |
| Mitigation | {n} | {n} | {%} |
| Resolution | {n} | {n} | {%} |
| Postmortem | {n} | {n} | {%} |

## Remediation Required

{List of failed checks requiring remediation}

## Recommendations

{Recommendations for improving incident response quality}
```

### 2. Document Remediation Actions

If gate outcome is CONDITIONAL or FAIL:

| Failed Check | Remediation Action | Owner | Deadline |
|--------------|-------------------|-------|----------|
| {check} | {action needed} | {name} | {date} |

### 3. Archive Validation Results

Save validation report:
- `{output_folder}/operations/incidents/incident-{id}-validation-report.md`

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into remediation planning
- **P (Party Mode)**: Get stakeholder perspectives on validation report
- **C (Continue)**: Finalize validation report
- **[Specific sections]**: Modify report sections

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, remediation actions
- Process enhanced insights on improvement priorities
- Ask user: "Accept this remediation plan? (y/n)"
- If yes, finalize report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-IR1 validation report"
- Process stakeholder perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Mark validation workflow as complete

---

## Verification

- [ ] Validation report generated
- [ ] Remediation actions documented (if applicable)
- [ ] Report archived

---

## Outputs

- Validation report: `{output_folder}/operations/incidents/incident-{id}-validation-report.md`

---

## Workflow Complete

Validation mode complete. Gate outcome: {PASS/CONDITIONAL/FAIL}

If CONDITIONAL or FAIL:
- Review remediation actions
- Address failed checks
- Re-run validation after remediation
