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

Generate a comprehensive validation report documenting QG-PR1 gate results and any required remediation actions.

---

## Prerequisites

- Validation completed (Step 21)
- Gate outcome determined

---

## Actions

### 1. Generate Validation Report

Create validation report document with executive summary, validation results, and recommendations.

### 2. Document Remediation Actions

If gate outcome is CONDITIONAL or FAIL, document required remediation.

### 3. Archive Validation Results

Save validation report to output folder.

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

- Validation report: `{output_folder}/operations/performance/performance-review-{date}-validation.md`

---

## Workflow Complete

Validation mode complete. Gate outcome: {PASS/CONDITIONAL/FAIL}
