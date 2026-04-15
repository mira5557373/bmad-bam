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

Generate a comprehensive validation report summarizing the invoice generation design quality assessment.

---

## Prerequisites

- Step 21: Validate completed successfully
- All validation findings documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Inputs

- Validation findings from step 21
- Gate decision and rationale
- Pattern registry compliance status

---

## Actions

### 1. Compile Validation Summary

Create report sections:
- Executive summary with gate decision
- Detailed findings by category
- Compliance status with patterns
- Recommendations for improvement

### 2. Generate Report Document

Output to: `{output_folder}/planning-artifacts/billing/invoice-generation-validation-report.md`

### 3. Archive Validation Artifacts

Store validation evidence for audit trail.

---

## COLLABORATION MENUS (A/P/C):

After generating the report above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for report review
- **C (Continue)**: Accept report and complete validation mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: findings, recommendations
- Process enhanced insights from deep questioning
- Ask user: "Accept these findings? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report for invoice generation: {summary of findings}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Validation mode complete

---

## Verification

- [ ] Report includes executive summary
- [ ] All findings documented with severity
- [ ] Recommendations actionable and specific
- [ ] Gate decision clearly stated
- [ ] Patterns align with pattern registry

---

## Outputs

- `{output_folder}/planning-artifacts/billing/invoice-generation-validation-report.md`
- Validation evidence archive

---

## Next Step

Validation mode complete. Based on gate decision:
- **PASS**: Proceed to implementation
- **CONDITIONAL**: Address gaps during implementation
- **FAIL**: Return to Create mode for remediation
