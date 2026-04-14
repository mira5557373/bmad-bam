# step 22 v generate report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ⏸️ ALWAYS pause after presenting findings and await user direction

---

## Purpose

Generate a comprehensive validation report.

## Prerequisites

- Step 21 (Validate) completed with validation results
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-context

---

## Actions

1. Compile Results
2. Determine Status
3. Generate Report

---

## Outputs

- Comprehensive validation report
- Overall validation status (PASS/CONDITIONAL/FAIL)
- **Load template:** `{project-root}/_bmad/bam/templates/chain-of-thought-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/few-shot-prompt-template.md`
- **Output to:** `{output_folder}/planning-artifacts/reports/ai-context-management-validation.md`

---

## Verification

- [ ] Results compiled successfully
- [ ] Status determined correctly
- [ ] Report generated
- [ ] Output exported to correct location

---

## Next Step

Workflow Complete.
