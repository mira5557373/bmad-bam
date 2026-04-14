# Step 10: Load Existing Artifact (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Load and review existing cost attribution documents to identify sections requiring modification.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-cost-attribution
---

## Actions

### 1. Load Existing Documents

Load the existing cost attribution documents:
- `{output_folder}/planning-artifacts/operations/cost-allocation-model.md`
- `{output_folder}/planning-artifacts/operations/chargeback-design.md`
- `{output_folder}/planning-artifacts/operations/cost-optimization.md`

If files do not exist, suggest Create mode.

### 2. Identify Modification Targets

Confirm sections needing modification:
- Update cost categories
- Modify allocation rules
- Update reports
- Revise optimization strategies

---

## Verification

- [ ] All existing documents loaded successfully
- [ ] Document structure parsed
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded document content
- Parsed document structure
- Modification/validation targets identified

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
