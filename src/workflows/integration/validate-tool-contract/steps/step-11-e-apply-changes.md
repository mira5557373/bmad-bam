# Step 11: Apply Targeted Modifications

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

This step applies the identified changes to the existing tool validation report. Changes are applied incrementally by re-running targeted validations, merging new results with preserved unchanged results, and updating recommendations based on current findings.

Apply requested changes to the tool validation.

## Prerequisites

- Step 10 (Load Existing Artifact) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tool-execution`

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

1. **Identify Revalidation Scope**
   - Determine which validation areas need re-running
   - Check if tool definition has changed since last validation
   - Note if permission model has been updated

2. **Present Current Results**
   - Show relevant sections of the validation report
   - Highlight items that will be revalidated

3. **Re-run Targeted Validations**
   Based on user request:
   - Re-run schema validation if definition changed
   - Re-run permission checks if access model changed
   - Re-run tenant context validation if isolation rules changed
   - Re-run contract tests if behavior changed

4. **Merge Results**
   - Update validation report with new results
   - Preserve unchanged validation results
   - Update validation timestamp for re-run areas

5. **Update Recommendations**
   - Review recommendations based on new results
   - Remove recommendations for fixed issues
   - Add new recommendations for newly found issues

#### Checkpoint: Changes Applied

Before proceeding, confirm:
- [ ] Revalidation scope identified
- [ ] Targeted validations re-run
- [ ] Results merged correctly
- [ ] Recommendations updated

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

Write updated validation report to its original location.

Present a diff summary showing:
- Changed validation results
- Updated recommendations
- New issues found
- Issues resolved

Ask for confirmation before finalizing.

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Validation results accurately merged
- [ ] Recommendations updated appropriately
- [ ] Patterns align with pattern registry

## Outputs

- Updated validation report

## Next Step

Edit mode complete. Return to workflow selection or proceed to validation.
