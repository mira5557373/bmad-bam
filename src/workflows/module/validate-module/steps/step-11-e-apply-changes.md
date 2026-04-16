# Step 2: Apply Targeted Modifications

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

This step applies the identified changes to the existing module validation report. Changes are applied incrementally by re-running quality gates, updating findings, marking resolved issues, and ensuring gate decisions remain consistent with current findings.

Apply the requested changes to the validation report.

---

## Prerequisites

- Step 01 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts



---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Requested Changes

- Process modifications as specified
- Maintain document consistency
- Preserve unchanged sections

### 2. Validate Changes

- Verify modifications are correct
- Check for unintended side effects
- Validate cross-references

### 3. Update Metadata

- Update document timestamps
- Record change history
- Update version numbers

---

---

## Modification Process

Based on the user's requested changes:

### Re-run Quality Gates

If re-running gates:
1. Load current module architecture
2. Execute requested gate checks (Steps 2-5 from Create mode)
3. Update gate results in report
4. Preserve history of previous validation

### Update Findings

If updating findings:
1. Present current findings
2. Apply modifications:
   - Mark resolved issues as closed (with resolution date)
   - Add new issues with severity classification
   - Update existing issue descriptions
3. Recalculate overall gate decision based on remaining open issues

### Mark Issues Resolved

For each issue to mark resolved:
1. Verify the fix is reflected in module architecture
2. Record resolution date and method
3. Move from "Blocking Issues" to "Resolved Issues" section
4. Update gate result if blocking issue cleared

### Update Recommendations

If updating recommendations:
1. Remove completed recommendations
2. Add new recommendations with priority
3. Link recommendations to specific findings

### Change Gate Decision

If changing overall decision:
1. Verify decision is consistent with open findings
2. Document rationale for manual override
3. Record reviewer name and date

## Validation After Changes

- [ ] Gate decisions consistent with findings
- [ ] No blocking issues remain if decision is PASS
- [ ] All changes tracked with timestamps
- [ ] Report structure maintained

## Output

Write updated report to: `{output_folder}/planning-artifacts/modules/{module-name}/validation-report.md`

Update sprint-status.yaml if overall decision changed:
- PASS: module status to 'validated'
- CONDITIONAL: module status to 'validated-conditional'
- FAIL: module status to 'validation-failed'

Present a summary of changes made.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific changes or their implications
- **P (Party Mode)**: Bring architect and QA perspectives on applied modifications
- **C (Continue)**: Accept applied changes and finalize updated validation report
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: changes applied, gate decisions, findings updates
- Process enhanced insights on change impact
- Ask user: "Accept this detailed change analysis? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied modifications to validation report"
- Process architect and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated validation report
- Update sprint-status.yaml if needed
- Update frontmatter `stepsCompleted: [10, 11]`
- Edit mode complete

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Gate decisions consistent with findings
- [ ] Sprint status updated appropriately

---

## Outputs

- Updated validation report
- Updated sprint-status.yaml (if decision changed)

---

## Next Step

Proceed to implementation or address remaining findings based on updated validation status.
