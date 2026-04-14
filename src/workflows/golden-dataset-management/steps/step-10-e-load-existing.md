# Step 10: Load Existing Artifact

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Load and review existing golden dataset management documents to identify sections requiring modification.

## Prerequisites

- Existing golden dataset management documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-testing, llmops

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing golden dataset management documents:
- `{output_folder}/planning-artifacts/quality/golden-dataset.md`

If the file does not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current design:
- Dataset schema specification
- Curation workflow procedures
- Version control configuration
- Test case management system

Confirm with the user which sections need modification.

## COLLABORATION MENUS (A/P/C):

After completing the artifact loading above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into existing design gaps and improvement opportunities
- **P (Party Mode)**: Bring MLOps Engineer, QA Lead, and Data Engineer perspectives
- **C (Continue)**: Accept identified modifications and proceed to Step 11: Apply Changes
- **Specify sections**: Describe specific sections or components to modify

Select an option:
```

#### If 'C' (Continue):
- Save modification targets to session context
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Golden dataset document loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current golden dataset management state
- List of sections to modify

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
