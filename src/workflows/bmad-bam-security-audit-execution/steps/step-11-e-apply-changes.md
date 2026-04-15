# Step 11: Apply Targeted Modifications

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step applies the identified changes to the existing security audit artifacts. Changes are applied incrementally while preserving document structure and unaffected findings.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections in the audit documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Document structure
   - Unaffected findings
   - Historical audit data
4. If modifying findings or remediation:
   - Update finding status
   - Adjust remediation timelines
   - Document change justification
5. Validate the modified documents against completeness criteria
6. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact
- **P (Party Mode)**: Bring security and compliance perspectives for review
- **C (Continue)**: Accept changes and finalize audit update
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

#### If 'C' (Continue):
- Save updated audit documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] QG-SA1 requirements still met

---

## Outputs

- Updated security audit report
- Updated findings (if affected)
- Updated remediation plans (if affected)

---

## Next Step

Run security audit validation (QG-SA1) to verify changes against audit requirements.
