# Step 10: Load Existing Streaming Design

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

Load and review existing streaming design to identify sections requiring modification.

## Prerequisites

- Existing streaming design documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: event-driven

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing streaming design documents:
- `{output_folder}/planning-artifacts/streaming/event-streaming-design.md`
- `{output_folder}/planning-artifacts/streaming/schema-registry-config.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current streaming design:
- Event domains and schemas
- Topic architecture
- Schema registry configuration
- Consumer strategy

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into streaming design and modification needs
- **P (Party Mode)**: Bring analyst and architect perspectives for design review
- **C (Continue)**: Accept loaded state and proceed to apply changes
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass design context: loaded sections, modification candidates
- Process enhanced insights from deep questioning
- Ask user: "Accept this analysis? (y/n)"
- If yes, document modification plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review loaded streaming design for modification: {summary of current state}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm sections to modify
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] All streaming design documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current streaming design state
- List of sections to modify

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
