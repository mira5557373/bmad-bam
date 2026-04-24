# Step 5: Generate Production Readiness Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

## Purpose

Generate comprehensive production readiness report with QG-P1 gate decision.

## Prerequisites

- Steps 1-4 completed

---

## Actions

1. **Compile All Results**
   - Aggregate findings from all validation areas
   - Calculate overall pass/fail rates

2. **Determine Deployment Decision**
   - APPROVED: All critical checks pass
   - APPROVED WITH CONDITIONS: Minor gaps with timeline
   - NOT APPROVED: Critical issues

3. **Generate Report**
   - **Load template:** `{project-root}/_bmad/bam/data/templates/production-readiness-template.md`
   - **Output to:** `{output_folder}/planning-artifacts/quality/production-readiness-report.md`

4. **Web Research Verification**
   
   Search the web: "production readiness checklist SaaS {date}"
   Search the web: "QG-P1 production gate validation best practices {date}"

---

## Verification

- [ ] All findings compiled
- [ ] Deployment decision determined
- [ ] Report generated with sign-off section

## Outputs

- Production readiness report
- QG-P1 gate decision

## Next Step

Based on decision:
- **APPROVED:** Proceed to production deployment
- **APPROVED WITH CONDITIONS:** Deploy with tracked conditions
- **NOT APPROVED:** Address critical issues, re-validate

## Workflow Complete

Create mode complete for production readiness validation.
