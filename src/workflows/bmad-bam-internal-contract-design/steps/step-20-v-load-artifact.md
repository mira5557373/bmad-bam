# Step 1: Load Artifact

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

Load the existing internal contract design documents for validation against quality criteria.

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing internal contract design documents:
- `{output_folder}/planning-artifacts/contracts/{module-name}-contracts.md`
- `{output_folder}/planning-artifacts/contracts/{module-name}-boundaries.md`
- `{module_path}/src/contracts/*.ts` (contract interface files)

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the document structure and prepare for validation against the quality criteria.

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

**[A]pprove** - Artifacts loaded successfully, proceed to validation checks
**[P]ause** - Review loaded artifacts before validation
**[C]oncern** - Discuss missing files, loading errors, or validation scope

Select an option:

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Patterns align with pattern registry

## Outputs

- Loaded artifact for validation
- Validation checklist

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation checks.
