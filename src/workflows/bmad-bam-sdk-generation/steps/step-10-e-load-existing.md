# Step 10: Load Existing SDK Configuration

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

Load and review existing SDK generation configuration to identify sections requiring modification.

## Prerequisites

- Existing SDK configuration documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: sdk-patterns

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing SDK generation documents:
- `{output_folder}/planning-artifacts/sdk/sdk-generation-config.md`
- `{output_folder}/planning-artifacts/sdk/sdk-structure-*.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current SDK configuration:
- Target languages
- Generator configurations
- Authentication schemes
- Tenant context handling
- Documentation status

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into SDK configuration and modification needs
- **P (Party Mode)**: Bring analyst and architect perspectives for configuration review
- **C (Continue)**: Accept loaded state and proceed to apply changes
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass configuration context: loaded sections, modification candidates
- Process enhanced insights from deep questioning
- Ask user: "Accept this analysis? (y/n)"
- If yes, document modification plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review loaded SDK configuration for modification: {summary of current state}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm sections to modify
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] All SDK configuration documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current SDK configuration state
- List of sections to modify

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
