# Step 22: Generate Deletion Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion

---

## Purpose

Generate a comprehensive validation report summarizing GDPR Article 17 compliance status, identified gaps, and remediation recommendations.

## Prerequisites

- Deletion validation completed (Step 21 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---

## Actions

### 1. Compile Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| Overall Article 17 Compliance | {Percentage}% | {Pass/Conditional/Fail} |
| Request Handling | {X}/{Y} | {Status} |
| Data Discovery | {X}/{Y} | {Status} |
| Deletion Execution | {X}/{Y} | {Status} |
| Critical Gaps | {Count} | {Severity} |

### 2. Detail Gap Analysis
### 3. Generate Remediation Roadmap
### 4. Generate Final Report

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Export validation report to `{output_folder}/planning-artifacts/deletion-validation-report.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-deletion.md`
- **C3**: Return to workflow overview

---

## Verification

- [ ] Executive summary complete
- [ ] All gaps documented with severity
- [ ] Remediation roadmap created
- [ ] Report exported to output folder

## Outputs

- `{output_folder}/planning-artifacts/deletion-validation-report.md`
- Gap analysis spreadsheet
- Remediation roadmap

## Next Step

Validation complete.
