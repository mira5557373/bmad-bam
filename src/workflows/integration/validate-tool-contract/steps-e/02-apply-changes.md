# Step 2: Apply Targeted Modifications

Apply requested changes to the tool validation.

## Tasks

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

## Output

Write updated validation report to its original location.

Present a diff summary showing:
- Changed validation results
- Updated recommendations
- New issues found
- Issues resolved

Ask for confirmation before finalizing.
