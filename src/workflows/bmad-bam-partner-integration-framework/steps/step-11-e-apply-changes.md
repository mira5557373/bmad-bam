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

Apply requested modifications to partner framework while maintaining program integrity.

## Prerequisites

- Step 10 completed with identified modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-integration

---

## Actions

Based on the user's requested changes, identify affected sections, present current content, apply modifications while preserving document structure, validate against quality gates, and write updated documents.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] Changes applied correctly
- [ ] No unintended side effects
- [ ] Program consistency maintained
- [ ] Patterns align with pattern registry

## Outputs

- Updated partner framework documents

## Next Step

Return to workflow for validation or completion.
