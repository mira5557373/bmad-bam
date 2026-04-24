# Step 5: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## Purpose

Generate comprehensive facade contract validation report with gate decision.

## Prerequisites

- Steps 1-4 completed
- All validation results collected

---

## Actions

1. **Compile Results**
   - Aggregate all validation findings
   - Calculate pass/fail rates

2. **Determine Gate Decision**
   - PASS: All checks pass
   - CONDITIONAL: Minor gaps
   - FAIL: Critical issues

3. **Generate Report**
   - **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`
   - **Output to:** `{output_folder}/planning-artifacts/quality/facade-contract-validation-report.md`

4. **Web Research Verification**
   
   Search the web: "facade contract validation best practices {date}"
   Search the web: "API contract testing report format {date}"

---

## Verification

- [ ] All findings compiled
- [ ] Gate decision determined
- [ ] Report generated

## Outputs

- Facade contract validation report
- Gate decision (PASS/CONDITIONAL/FAIL)

## Next Step

Based on gate decision:
- **PASS:** Facade contract validated. Proceed to integration.
- **CONDITIONAL:** Document gaps, proceed with limitations.
- **FAIL:** Return to design workflows to address issues.

## Workflow Complete

Create mode complete for facade contract validation.
