# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Generate a comprehensive validation report documenting the SOC2 evidence collection design validation results.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: soc2-evidence-collection
---

## Actions

### 1. Generate Executive Summary

| Metric | Value |
|--------|-------|
| Validation Date | {date} |
| Overall Score | {score}/100 |
| Pass/Fail Status | **{status}** |
| Control Coverage | {%}% |
| Automation Coverage | {%}% |

### 2. Document Findings

**Critical Gaps:**

| Control | Gap | Remediation |
|---------|-----|-------------|
| {control} | {description} | {action} |

### 3. QG-P1 Gate Status

| Status | Description |
|--------|-------------|
| **{PASS/CONDITIONAL/FAIL}** | {Summary} |

---

## Outputs

- Validation report
- QG-P1 gate status
- **Output to:** `{output_folder}/planning-artifacts/compliance/soc2-validation-report.md`

---

## Verification

- [ ] Executive summary generated
- [ ] Critical gaps documented
- [ ] QG-P1 gate status determined
- [ ] Patterns align with pattern registry

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Workflow Complete

Validation mode complete. Report saved.

**Gate Status: {PASS/CONDITIONAL/FAIL}**
