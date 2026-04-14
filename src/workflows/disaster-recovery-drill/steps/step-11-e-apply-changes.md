# Step 11: Apply Targeted Modifications

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

This step applies the identified changes to the existing DR drill artifacts.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections
2. Present the current content
3. Apply the requested modifications
4. Validate the modified documents
5. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, if 'C' (Continue):
- Save updated drill documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] QG-DR1 requirements still met

---

## Outputs

- Updated DR drill report
- Updated RTO/RPO measurements (if affected)

---

## Next Step

Run DR drill validation (QG-DR1) to verify changes.
