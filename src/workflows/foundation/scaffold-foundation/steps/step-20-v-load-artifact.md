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

Load the foundation scaffold files and master architecture reference to prepare for validation of directory structure, core components, shared kernel implementations, and zone boundary compliance.

## Prerequisites

- Foundation scaffold artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

Load the existing foundation scaffold for validation:

- `{project_root}/src/core/` - Core foundation files
- `{project_root}/src/shared_kernel/` - Shared kernel implementations
- `{project_root}/src/control_plane/` - Control plane structure
- `{project_root}/src/ai_runtime/` - AI runtime structure
- `{project_root}/ZONE_BOUNDARIES.md` - Zone boundary documentation
- `{output_folder}/planning-artifacts/master-architecture.md` - Master architecture reference

If the foundation scaffold does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the scaffold structure and prepare for validation:

1. Inventory all scaffold files
2. Load master architecture as reference for expected structure
3. Identify any missing expected components
4. Check for unexpected files in FROZEN zones

Prepare validation context for the next step.



---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure
- Verify document integrity

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

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

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation criteria defined
- [ ] Patterns align with pattern registry

## Outputs

- Validation context prepared
- Scaffold inventory complete

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against quality criteria.
