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

## Purpose

This step loads the existing tool validation report for modification. Edit mode allows re-running specific validation checks, updating findings, or modifying recommendations without performing a complete validation from scratch.

Load the existing tool validation report.

## Prerequisites

- Existing tool validation report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tool-execution`

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

1. **Locate Validation Report**
   - Search for report in `{output_folder}/planning-artifacts/ai-runtime/`
   - Match by tool name or validation date
   - Load the most recent validation if multiple exist

2. **Parse Validation State**
   - Extract schema validation results
   - Load permission validation results
   - Read tenant context validation results
   - Parse contract test results

3. **Display Validation Summary**
   - Show tool identifier and validation date
   - Display overall validation status
   - List failed validation items
   - Show recommendations from previous validation

If the validation report does not exist, inform the user and suggest switching to Create mode.

#### Checkpoint: Existing Artifact Loaded

Before proceeding, confirm:
- [ ] Validation report located
- [ ] All validation sections parsed
- [ ] Summary displayed to user
- [ ] Revalidation scope identified

**STOP: Present the A/P/C menu to the user**

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

## Output

Present a summary of the existing validation:
- Tool identifier and last validation date
- Overall status (PASS/CONDITIONAL/FAIL)
- Number of passed/failed/skipped checks
- Key issues found

Confirm with the user which aspects of the validation need re-running or modification.

## Verification

- [ ] Validation report loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Revalidation scope clearly identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current validation state
- Confirmed revalidation scope from user

## Next Step

Proceed to `step-11-e-apply-changes.md` with confirmed revalidation scope.
