# Step 10: Load Existing Data Retention Policy

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Load an existing data retention policy design document for modification.

---

## Prerequisites

- Existing data retention policy document exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-archival`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Existing data retention policy document path
- Modification requirements from user
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Locate Existing Document

Search for the data retention policy at:
- `{output_folder}/planning-artifacts/compliance/data-retention-policy.md`

### 2. Load and Parse Document

- Read the existing document
- Parse frontmatter and sections
- Identify current retention policies and archival rules

### 3. Present Current State

Display summary of existing:
- Retention periods by data type
- Archival rules
- Deletion procedures
- Compliance mappings

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into current document
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Proceed to apply changes

Select an option:
```

#### If 'C' (Continue):
- Confirm document loaded
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Document loaded successfully
- [ ] All sections parsed correctly
- [ ] Current state presented to user
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded document ready for modifications

---

## Next Step

Proceed to `step-11-e-apply-changes.md` to apply modifications.
