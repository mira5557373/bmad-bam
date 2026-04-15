# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report for pricing tier configuration.

---

## Prerequisites

- Step 21: Validate completed successfully
- All validation findings documented

---

## Actions

### 1. Compile Validation Summary

Create report sections:
- Executive summary with gate decision
- Detailed findings by category
- Recommendations for improvement

### 2. Generate Report Document

Output to: `{output_folder}/planning-artifacts/billing/pricing-tier-validation-report.md`

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept report and complete validation mode

Select an option:
```

---

## Verification

- [ ] Report includes executive summary
- [ ] All findings documented with severity
- [ ] Recommendations actionable

---

## Outputs

- `{output_folder}/planning-artifacts/billing/pricing-tier-validation-report.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/pricing-strategy-template.md`

---

## Next Step

Validation mode complete. Based on gate decision:
- **PASS**: Proceed to implementation
- **CONDITIONAL**: Address gaps during implementation
- **FAIL**: Return to Create mode for remediation
