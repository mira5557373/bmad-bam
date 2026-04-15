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

This step loads the existing internal contract design documents for modification. Edit mode allows incremental updates to contract interfaces, boundary specifications, or consumer lists without recreating the entire contract inventory from scratch.

Load the existing internal contract design documents:
- `{output_folder}/planning-artifacts/contracts/{module-name}-contracts.md`
- `{output_folder}/planning-artifacts/contracts/{module-name}-boundaries.md`
- `{module_path}/src/contracts/*.ts` (contract interface files)

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current contracts:
- Contract inventory
- Interface definitions
- Boundary specifications
- Version status
- Consumer list

Confirm with the user which contracts need modification.

## Prerequisites

- Existing internal contract design documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`



---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Artifact

- Locate artifact at `{output_folder}/`
- Parse document structure
- Extract modification scope

### 2. Verify Artifact State

- Check document is valid and complete
- Identify sections requiring updates
- Document current state

### 3. Prepare Edit Context

- Load relevant patterns and templates
- Identify dependencies
- Prepare modification workflow

---

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

**[A]pprove** - Contract summary confirmed, proceed to apply modifications
**[P]ause** - Review loaded contracts, clarify modification scope
**[C]oncern** - Discuss missing contracts, loading issues, or scope questions

Select an option:

---

## Verification

- [ ] Contract documents loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current contract inventory
- Confirmed modification scope from user

## Next Step

Proceed to `step-11-e-apply-changes.md` with confirmed modification scope.
