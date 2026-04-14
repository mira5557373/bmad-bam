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

Load and review existing AI eval safety design documents to identify sections requiring modification.

## Prerequisites

- Existing AI eval safety design documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing AI eval safety design documents:
- `{output_folder}/planning-artifacts/safety/safety-criteria.md`
- `{output_folder}/planning-artifacts/safety/golden-tasks.md`
- `{output_folder}/planning-artifacts/safety/guardrail-config.md`
- `{output_folder}/planning-artifacts/safety/eval-pipeline.md`
- `{output_folder}/planning-artifacts/safety/monitoring-config.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current design:
- Safety dimensions and criteria
- Golden task coverage
- Guardrail configuration
- Eval pipeline status
- Monitoring coverage

Confirm with the user which sections need modification.

## COLLABORATION MENUS (A/P/C):

After completing the artifact loading above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into existing design gaps and improvement opportunities
- **P (Party Mode)**: Bring Security Reviewer, QA Analyst, and Platform Architect perspectives
- **C (Continue)**: Accept identified modifications and proceed to Step 11: Apply Changes
- **Specify sections**: Describe specific sections or components to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current design state, identified gaps, modification candidates
- Process enhanced insights
- Ask user: "Accept these refined modification targets? (y/n)"
- If yes, integrate into modification list
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review existing AI eval safety design to identify improvement areas"
- Process Security Reviewer, QA Analyst, Platform Architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modification targets to session context
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] All safety documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current AI eval safety design state
- List of sections to modify

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
