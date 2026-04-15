# Step 10: Load Existing Partner Framework

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

Load and review existing partner framework to identify sections requiring modification.

## Prerequisites

- Existing partner framework documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-integration

---

## Actions

Load the existing partner framework documents. If the files do not exist, inform the user and suggest switching to Create mode. Parse and display a summary of the current partner framework. Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] All partner framework documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current partner framework state
- List of sections to modify

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
