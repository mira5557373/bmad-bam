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

Generate a comprehensive validation report summarizing the revenue recognition design ASC 606 compliance assessment.

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
- ASC 606 five-step compliance status
- Detailed findings by category
- Recommendations for improvement

### 2. Generate Report Document

Output to: `{output_folder}/planning-artifacts/billing/revenue-recognition-validation-report.md`

### 3. Archive Validation Artifacts

Store validation evidence for audit trail.

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept report and complete validation mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

---

## Verification

- [ ] Report includes executive summary
- [ ] ASC 606 compliance status documented
- [ ] All findings documented with severity
- [ ] Recommendations actionable
- [ ] Patterns align with pattern registry

---

## Outputs

- `{output_folder}/planning-artifacts/billing/revenue-recognition-validation-report.md`
- Validation evidence archive

---

## Next Step

Validation mode complete. Based on gate decision:
- **PASS**: Proceed to implementation
- **CONDITIONAL**: Address gaps during implementation
- **FAIL**: Return to Create mode for remediation
