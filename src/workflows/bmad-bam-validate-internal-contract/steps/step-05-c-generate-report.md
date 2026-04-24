# Step 5: Generate Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

## Purpose

Generate internal contract validation report with gate decision.

## Prerequisites

- Steps 1-4 completed

---

## Actions

1. **Compile Results**
   - Aggregate validation findings
   - Calculate pass/fail rates

2. **Determine Gate Decision**
   - PASS: All checks pass
   - CONDITIONAL: Minor gaps
   - FAIL: Critical issues

3. **Generate Report**
   - **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`
   - **Output to:** `{output_folder}/planning-artifacts/quality/internal-contract-validation-report.md`

4. **Web Research Verification**
   
   Search the web: "internal contract validation patterns {date}"
   Search the web: "module contract testing report best practices {date}"

---

## Verification

- [ ] All findings compiled
- [ ] Gate decision determined
- [ ] Report generated

## Outputs

- Internal contract validation report

## Next Step

Based on gate decision:
- **PASS:** Internal contract validated
- **CONDITIONAL:** Document gaps, proceed with limitations
- **FAIL:** Return to design workflow

## Workflow Complete

Create mode complete for internal contract validation.
