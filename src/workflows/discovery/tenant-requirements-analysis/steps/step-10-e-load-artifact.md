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

Load the existing tenant requirements analysis for modification.

## Prerequisites

- Existing analysis at `{output_folder}/planning-artifacts/tenant-requirements-analysis.md`


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Current Analysis

Read the existing tenant requirements analysis document.

### 2. Identify Modification Scope

Ask user what needs to be changed:
- Tenant segments
- Persona updates
- Compliance requirements
- Scaling assumptions

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for change analysis
- **C (Continue)**: Accept loaded state and proceed to apply changes
- **[Specific refinements]**: Describe what sections you want to modify

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass artifact context: loaded sections, modification candidates
- Process enhanced insights from deep questioning
- Ask user: "Accept this analysis? (y/n)"
- If yes, document modification plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review loaded tenant requirements for modification: {summary of current state}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm sections to modify
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Existing artifact loaded
- [ ] Modification scope identified
- [ ] Patterns align with pattern registry

## Outputs

- Loaded artifact content
- Change scope definition

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified changes.
