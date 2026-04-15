# Step 20: Load Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ⏸️ ALWAYS pause after presenting findings and await user direction

---

## Purpose

Load the AI model registry architecture documents for validation.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-model-registry
---

## Actions

### 1. Load Existing Documents

Load: `{output_folder}/planning-artifacts/architecture/ai-model-registry-design.md`

### 2. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Registry Schema | Yes/No | {ready/incomplete} |
| Access Control | Yes/No | {ready/incomplete} |
| Deployment Integration | Yes/No | {ready/incomplete} |

---

## Outputs

- Loaded AI model registry documents
- Pre-validation status report

---

## Verification

- [ ] Documents loaded for validation
- [ ] Pre-validation check completed
- [ ] Ready for validation step
- [ ] No errors or warnings

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
