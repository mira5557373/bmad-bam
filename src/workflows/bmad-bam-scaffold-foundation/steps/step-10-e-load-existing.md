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

Load and review existing foundation scaffold artifacts to identify components requiring modification.

## Prerequisites

- Existing foundation scaffold to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing foundation scaffold artifacts:

- `{project_root}/src/core/` - Core foundation files
- `{project_root}/src/shared_kernel/` - Shared kernel implementations
- `{project_root}/src/control_plane/` - Control plane structure
- `{project_root}/src/ai_runtime/` - AI runtime structure
- `{project_root}/ZONE_BOUNDARIES.md` - Zone boundary documentation
- `{output_folder}/planning-artifacts/foundation-epics.md` - Foundation epics

If the foundation scaffold does not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current scaffold:

- Directory structure present
- Core files implemented (database.py, tenant_context.py, base_entity.py)
- Shared kernel components present (events.py, dtos.py, exceptions.py)
- Zone boundary rules defined
- Foundation epics status

Verify zone boundaries are intact:

| Zone        | Status |
|-------------|--------|
| FROZEN      | Check for unauthorized modifications |
| EXTEND ONLY | Check additions are valid |
| AUTONOMOUS  | List created modules |

Confirm with the user which components need modification.

**Warning:** Modifications to FROZEN zone files require explicit override confirmation. EXTEND ONLY files can only have additions, not replacements.

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

- [ ] All scaffold artifacts loaded successfully
- [ ] Zone boundaries verified
- [ ] Components for modification identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current foundation scaffold state
- List of components to modify

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
