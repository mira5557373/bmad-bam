# Step 22: Generate Audit Readiness Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Generate a comprehensive validation report summarizing audit readiness status, identified gaps, and remediation recommendations.

## Prerequisites

- Audit validation completed (Step 21 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---

## Actions

### 1. Compile Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| Overall Audit Readiness | {Percentage}% | {Pass/Conditional/Fail} |
| Evidence Coverage | {X}/{Y} | {Status} |
| Collection Procedures | {X}/{Y} | {Status} |
| Testing Plan | {X}/{Y} | {Status} |
| Critical Gaps | {Count} | {Severity} |

### 2. Detail Gap Analysis
### 3. Generate Remediation Roadmap
### 4. Generate Final Report

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Export validation report to `{output_folder}/planning-artifacts/audit-readiness-validation-report.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-audit.md`
- **C3**: Return to workflow overview

---

## Outputs

- `{output_folder}/planning-artifacts/audit-readiness-validation-report.md`
- Gap analysis spreadsheet
- Remediation roadmap

---

## Verification

- [ ] Results compiled successfully
- [ ] Status determined correctly
- [ ] Report generated
- [ ] Output exported to correct location

---

## Next Step

Validation complete.
