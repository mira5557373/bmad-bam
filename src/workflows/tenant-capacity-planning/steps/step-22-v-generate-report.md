# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Generate a validation report documenting capacity planning validation results.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-capacity-planning
---

## Actions

### 1. Generate Executive Summary

| Metric | Value |
|--------|-------|
| Validation Date | {date} |
| Overall Score | {score}/100 |
| Pass/Fail Status | **{status}** |

### 2. QG-P1 Gate Status

| Status | Description |
|--------|-------------|
| **{PASS/CONDITIONAL/FAIL}** | {Summary} |

---

## Outputs

- Validation report
- **Output to:** `{output_folder}/planning-artifacts/operations/capacity-validation-report.md`

---

## Verification

- [ ] Executive summary generated
- [ ] QG-P1 gate status determined
- [ ] Report saved to output location
- [ ] Patterns align with pattern registry

---

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Workflow Complete

Validation mode complete. Report saved.

**Gate Status: {PASS/CONDITIONAL/FAIL}**
