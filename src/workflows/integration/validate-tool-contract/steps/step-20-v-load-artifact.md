# Step 20: Load Artifact

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

This step loads the tool contract validation report for meta-validation. The validation report documents schema compliance, permission validation, tenant context verification, and contract test results for an AI tool definition.

## Prerequisites

- Tool contract validation has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

1. **Locate Validation Report**
   - Find report in `{output_folder}/planning-artifacts/ai-runtime/`
   - Identify by tool name

2. **Parse Complete Report**
   - Load all validation sections
   - Extract test results
   - Read recommendations
   - Load overall status

3. **Prepare for Meta-Validation**
   - Check for completeness of validation
   - Verify all required areas were tested
   - Confirm results are consistent

If the validation report does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

#### Checkpoint: Artifact Loaded for Validation

Before proceeding, confirm:
- [ ] Validation report located
- [ ] All sections parsed
- [ ] Report structure verified
- [ ] Ready for meta-validation

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

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] No placeholder content remaining
- [ ] Patterns align with pattern registry

## Outputs

Confirm successful loading with:
- Tool identifier
- Validation date
- Number of validation areas covered
- Overall status

## Next Step

Once the validation report is successfully loaded and structure is confirmed, proceed to Step 21: Validate Tool Contract Validation to perform meta-validation of the report quality and completeness.
