# Step 10: Load Existing Artifact (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Load and review existing capacity planning documents to identify sections requiring modification.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-capacity-planning
---

## Actions

### 1. Load Existing Documents

Load the existing capacity planning documents:
- `{output_folder}/planning-artifacts/operations/capacity-planning.md`
- `{output_folder}/planning-artifacts/operations/scaling-triggers.md`
- `{output_folder}/planning-artifacts/operations/resource-allocation.md`

If files do not exist, suggest Create mode.

### 2. Parse Document Structure

| Component | Status | Key Content |
|-----------|--------|-------------|
| Usage analysis | Yes/No | {metrics count} |
| Growth projections | Yes/No | {scenarios} |
| Resource allocation | Yes/No | {quotas defined} |
| Scaling triggers | Yes/No | {triggers count} |

### 3. Identify Modification Targets

Confirm sections needing modification.

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
