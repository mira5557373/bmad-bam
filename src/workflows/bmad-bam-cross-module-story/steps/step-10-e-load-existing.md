# Step 1: Load Existing Artifact

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

Load and review existing cross-module story documents to identify sections requiring modification.

## Prerequisites

- Existing cross-module story documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing cross-module story documents:
- `{output_folder}/planning-artifacts/stories/cross-module-epic.md`
- `{output_folder}/planning-artifacts/stories/module-stories/*.md`
- `{output_folder}/planning-artifacts/stories/dependency-graph.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current story plan:
- Modules involved and their roles
- Dependency structure
- Integration points defined
- Story coordination status
- Overall progress

Confirm with the user which sections need modification.

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

### Menu Options

**[A]nalyze** - Existing Artifact Analysis:
- A1: Analyze current module involvement completeness
- A2: Review existing dependency structure for gaps
- A3: Assess integration point coverage
- A4: Evaluate story coordination status

**[P]ropose** - Edit Mode Proposals:
- P1: Propose sections requiring modification
- P2: Suggest priority order for edits
- P3: Recommend scope of changes needed
- P4: Propose validation approach after edits

**[C]ontinue** - Proceed to apply changes:
- C1: Continue to Step 11 (Apply Changes) with identified modifications
- C2: Save current analysis and pause

Select an option or provide feedback:

---

## Verification

- [ ] All story documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current cross-module story state
- List of sections to modify

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
