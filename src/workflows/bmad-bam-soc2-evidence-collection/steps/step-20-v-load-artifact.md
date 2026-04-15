# Step 20: Load Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Load the SOC2 evidence collection design documents for validation against SOC2 requirements.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: soc2-evidence-collection
---

## Actions

### 1. Load Existing Documents

Load all SOC2 evidence collection documents. If files do not exist, suggest Create mode.

### 2. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Control mapping | Yes/No | {ready/incomplete} |
| Evidence sources | Yes/No | {ready/incomplete} |
| Collection automation | Yes/No | {ready/incomplete} |
| Report generation | Yes/No | {ready/incomplete} |

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Pre-validation check completed
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded document content
- Parsed document structure
- Modification/validation targets identified

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
