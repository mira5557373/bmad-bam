# Step 2: Apply Targeted Modifications

Apply the requested changes to the validation report.

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
