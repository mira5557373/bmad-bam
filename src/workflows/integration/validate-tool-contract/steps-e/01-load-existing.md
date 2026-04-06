# Step 1: Load Existing Artifact

Load the existing tool validation report.

## Tasks

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

## Output

Present a summary of the existing validation:
- Tool identifier and last validation date
- Overall status (PASS/CONDITIONAL/FAIL)
- Number of passed/failed/skipped checks
- Key issues found

Confirm with the user which aspects of the validation need re-running or modification.
