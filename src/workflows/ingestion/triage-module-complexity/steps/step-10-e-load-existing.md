# Step 10: Load Existing Artifact (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

This step loads the existing complexity assessment artifact for modification. Edit mode allows re-evaluation of specific complexity questions, score updates, or classification overrides without performing a full reassessment from scratch.

## Prerequisites

- Existing complexity assessment artifacts to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: module-boundaries`


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing complexity assessment artifacts:
- `{output_folder}/planning-artifacts/modules/{module-name}/complexity-assessment.md`
- `sprint-status.yaml` (module complexity section)

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current assessment:
- Current complexity classification (SIMPLE/STANDARD/COMPLEX)
- Score breakdown (Q1-Q8)
- Total score and whether upgrade rule was applied
- Assessment date and any documented caveats

Confirm with the user which aspects need re-evaluation:
- Re-assess specific questions (e.g., AI involvement changed)
- Update scores based on new requirements
- Override classification with justification
- Add new evidence or rationale

## Verification

- [ ] Assessment artifacts loaded correctly
- [ ] Summary accurately reflects current scores
- [ ] Re-evaluation scope clearly identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current complexity assessment
- Confirmed re-evaluation scope from user

## Next Step

Proceed to `step-11-e-apply-changes.md` with confirmed re-evaluation scope.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file
