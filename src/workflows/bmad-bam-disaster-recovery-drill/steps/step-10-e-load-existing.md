# Step 10: Load Existing Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array

---

## Purpose

This step loads existing DR drill documents for modification. Edit mode allows updates to drill results or findings without re-running the entire drill.

---

## Prerequisites

- Existing DR drill artifacts to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`

---

## Actions

### 1. Load Artifacts

Load the existing DR drill documents:
- `{output_folder}/operations/dr-drill-report.md`
- `{output_folder}/operations/failover-test-results.md`
- `{output_folder}/operations/rto-rpo-measurements.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current documents.

### 3. Confirm Modification Targets

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifacts, present options and if 'C' (Continue):
- Confirm modification targets with user
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Existing artifacts loaded successfully
- [ ] Modification scope confirmed with user

---

## Outputs

- Summary of current drill status
- Confirmed list of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
