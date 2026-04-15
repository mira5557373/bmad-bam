# Step 10: Load Existing Artifact (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Load and review existing SOC2 evidence collection design documents to identify sections requiring modification.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: soc2-evidence-collection
---

## Actions

### 1. Load Existing Documents

Load the existing SOC2 evidence collection documents:
- `{output_folder}/planning-artifacts/compliance/soc2-control-mapping.md`
- `{output_folder}/planning-artifacts/compliance/evidence-collection-plan.md`
- `{output_folder}/planning-artifacts/compliance/automation-design.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

| Component | Status | Key Content |
|-----------|--------|-------------|
| Control mapping | Yes/No | {control count} controls |
| Evidence sources | Yes/No | {source count} sources |
| Collection automation | Yes/No | {job count} jobs |
| Report generation | Yes/No | {report count} reports |

### 3. Identify Modification Targets

Confirm with the user which sections need modification:
- Update control mappings
- Add new evidence sources
- Modify collection automation
- Update report templates

---

## Outputs

- Summary of current design state
- List of sections to modify

---

## Verification

- [ ] All existing documents loaded successfully
- [ ] Document structure parsed
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
