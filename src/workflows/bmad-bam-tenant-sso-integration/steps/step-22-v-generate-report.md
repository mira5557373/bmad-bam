# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Generate the final validation report for Tenant SSO Integration design.

---

## Prerequisites

- Step 21: Validate completed successfully
- All validation findings documented
- Gate decision determined

---

## Inputs

- Validation findings from Step 21
- Gate decision and rationale
- Remediation recommendations (if applicable)

---

## Actions

### 1. Generate Report Header

| Field | Value |
|-------|-------|
| Report Type | SSO Integration Validation |
| Validation Date | {{date}} |
| Gate Decision | PASS / CONDITIONAL / FAIL |

### 2. Summarize Findings

| Category | Checks | Passed | Failed |
|----------|--------|--------|--------|
| Protocol Configuration | | | |
| IdP Integration | | | |
| Session Management | | | |
| **Total** | | | |

### 3. Generate Output File

Write report to:
`{output_folder}/planning-artifacts/validation-reports/sso-integration-validation-report.md`

---

## Verification

- [ ] Report includes all validation findings
- [ ] Gate decision clearly stated with rationale
- [ ] Remediation items assigned (if applicable)
- [ ] Report saved to correct location
- [ ] Patterns align with pattern registry

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report content
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Finalize report and complete validation

Select an option:
```

#### If 'C' (Continue):
- Save final validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Mark validation workflow complete

---

## Outputs

- `{output_folder}/planning-artifacts/validation-reports/sso-integration-validation-report.md`
- Validation gate decision documented

---

## Next Step

Validation workflow complete. SSO integration design approved for implementation.
