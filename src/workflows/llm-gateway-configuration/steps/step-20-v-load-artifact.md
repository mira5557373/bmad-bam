# Step 20: Load Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Load LLM gateway configuration documents for validation.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: llm-gateway-configuration
---

## Actions

Load all documents and verify structure is present.

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Structure validated for completeness
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded document content
- Parsed document structure
- Modification/validation targets identified

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
