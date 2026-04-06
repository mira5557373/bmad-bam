# Step 1: Load Artifact

Load the tool validation report for meta-validation.

## Tasks

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

## Output

Confirm successful loading with:
- Tool identifier
- Validation date
- Number of validation areas covered
- Overall status
