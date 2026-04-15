# Step 22: Generate Training Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Generate a comprehensive validation report summarizing training compliance status, identified gaps, and remediation recommendations.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: compliance-training-tracking
---

## Actions

### 1. Compile Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| Overall Training Compliance | {Percentage}% | {Pass/Conditional/Fail} |
| Framework Coverage | {X}/{Y} | {Status} |
| Curriculum Completeness | {X}/{Y} | {Status} |
| Tracking Capabilities | {X}/{Y} | {Status} |
| Critical Gaps | {Count} | {Severity} |

### 2. Generate Final Report

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Export validation report to `{output_folder}/planning-artifacts/training-validation-report.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-training.md`
- **C3**: Return to workflow overview

---

## Outputs

- `{output_folder}/planning-artifacts/training-validation-report.md`
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

Workflow complete. Present Training Validation Report to user for review and approval.
