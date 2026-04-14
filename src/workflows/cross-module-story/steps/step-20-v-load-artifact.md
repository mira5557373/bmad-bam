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

This step loads the Cross-Module Story artifact for validation. Cross-module stories coordinate features spanning multiple modules, ensuring proper dependency mapping, facade contract alignment, and synchronized development across module boundaries.

## Prerequisites

- Cross-module story artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

## Artifact Location

Load the existing cross-module story documents:
- `{output_folder}/planning-artifacts/stories/cross-module-epic.md`
- `{output_folder}/planning-artifacts/stories/module-stories/*.md`
- `{output_folder}/planning-artifacts/stories/dependency-graph.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- Epic document defines the cross-module feature
- Module stories exist for each participating module
- Dependency graph shows module relationships
- No orphaned module stories without epic linkage

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If files exist but dependency graph is missing or incomplete, document the gap and prompt for guidance on how to proceed.



---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
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

### Menu Options

**[A]nalyze** - Pre-Validation Analysis:
- A1: Analyze artifact structure completeness
- A2: Review module story coverage
- A3: Assess dependency graph integrity
- A4: Evaluate epic linkage consistency

**[P]ropose** - Validation Preparation Proposals:
- P1: Propose validation focus areas based on artifact state
- P2: Suggest pre-validation fixes for identified gaps
- P3: Recommend validation criteria prioritization
- P4: Propose scope of validation for current artifact

**[C]ontinue** - Proceed to validation:
- C1: Continue to Step 21 (Validate) with loaded artifact
- C2: Save current analysis and pause

Select an option or provide feedback:

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation criteria defined
- [ ] Patterns align with pattern registry

## Outputs

- Validation context prepared
- Document structure parsed

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against quality criteria.
