# Step 10: Load Existing Artifact

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

This step loads the existing requirement ingestion artifacts for modification. Edit mode allows incremental updates to the requirement matrix, module mappings, and cross-cutting concerns without recreating them from scratch.

## Prerequisites

- Existing requirement ingestion artifacts to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing requirement ingestion artifacts:
- `{output_folder}/planning-artifacts/features/requirement-matrix.md`
- `{output_folder}/planning-artifacts/features/module-mapping.md`
- `{output_folder}/planning-artifacts/features/cross-cutting-concerns.md`
- `{output_folder}/planning-artifacts/features/index.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current artifacts:
- Total requirements ingested
- Module assignments (count per module)
- Cross-cutting concerns identified
- Dependency graph status (acyclic verified?)

Confirm with the user which sections need modification:
- Add new requirements to existing matrix
- Reassign requirements to different modules
- Update cross-cutting classifications
- Modify dependency relationships

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

---

## Verification

- [ ] Artifacts loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current requirement artifacts
- Confirmed modification scope from user

## Next Step

Proceed to `step-11-e-apply-changes.md` with confirmed modification scope.
