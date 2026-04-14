# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Generate a validation report for LLM gateway configuration design.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: llm-gateway-configuration
---

## Actions

Generate executive summary and QG-M3 gate status.

---

## Outputs

- Validation report
- **Output to:** `{output_folder}/planning-artifacts/ai-runtime/llm-gateway-validation-report.md`

---

## Verification

- [ ] Executive summary generated
- [ ] All findings documented
- [ ] Gate status determined
- [ ] Patterns align with pattern registry

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Workflow Complete

Validation mode complete. Report saved.

**Gate Status: {PASS/CONDITIONAL/FAIL}**
