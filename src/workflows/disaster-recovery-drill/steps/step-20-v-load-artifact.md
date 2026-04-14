# Step 20: Load Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Track progress in `stepsCompleted` array

---

## Purpose

This step loads the DR drill artifacts for validation against QG-DR1 criteria.

---

## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-DR1`

---

## Actions

### 1. Load Artifact

- Read the artifacts from `{output_folder}/operations/` location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid

---

## Artifact Locations

Load the existing DR drill documents:
- `{output_folder}/operations/dr-drill-report.md`
- `{output_folder}/operations/failover-test-results.md`
- `{output_folder}/operations/rto-rpo-measurements.md`

---

## COLLABORATION MENUS (A/P/C):

After loading the artifacts, if 'C' (Continue):
- Confirm documents loaded successfully
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present

---

## Outputs

- Loaded artifact for validation
- Validation checklist

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation checks.
