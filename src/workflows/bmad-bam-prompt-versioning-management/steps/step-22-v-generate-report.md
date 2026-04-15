# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Generate the final validation report for the prompt versioning architecture, documenting findings, gate decision, and required remediation.

---

## Prerequisites

- Step 21 completed: Validation checks executed
- Findings categorized by severity
- Gate decision determined

---

## Inputs

- Validation findings from Step 21
- Gate decision (PASS/CONDITIONAL/FAIL)
- Pattern registry references

---

## Actions

### 1. Generate Report Header

Create validation report with:
- Document title and date
- Artifact under validation
- Validator information
- Gate decision summary

### 2. Document Findings

For each finding:

| ID | Component | Severity | Finding | Remediation |
|----|-----------|----------|---------|-------------|
| F-001 | {component} | {severity} | {description} | {action} |

### 3. Summarize Gate Decision

| Category | Status | Notes |
|----------|--------|-------|
| Version Schema | PASS/FAIL | {notes} |
| A/B Testing | PASS/FAIL | {notes} |
| Rollback | PASS/FAIL | {notes} |
| Deployment | PASS/FAIL | {notes} |
| **Overall** | **{decision}** | {summary} |

### 4. Define Remediation Plan

If CONDITIONAL or FAIL:

| Finding | Priority | Owner | Due Date |
|---------|----------|-------|----------|
| {finding} | {P0/P1/P2} | {owner} | {date} |

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into remediation planning
- **P (Party Mode)**: Bring stakeholder perspectives on report
- **C (Continue)**: Accept report and complete validation
- **[Specific refinements]**: Describe report adjustments

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: report findings, remediation plan
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report for prompt versioning architecture"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Mark Validate mode complete

---

## Verification

- [ ] Report generated with all sections
- [ ] Gate decision documented
- [ ] Remediation plan defined (if needed)
- [ ] Report saved to output location

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/validation/prompt-versioning-validation-report.md`
- Gate decision record
- Remediation plan (if applicable)

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Workflow Complete

Validate mode is complete. If FAIL, return to Create or Edit mode to address findings.
