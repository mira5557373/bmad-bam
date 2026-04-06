# Step 1: Load Artifact

Load the existing foundation gate report for meta-validation:

- `{output_folder}/planning-artifacts/foundation-gate-report.md`
- `{output_folder}/sprint-status.yaml`

If the gate report does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the report structure and prepare for validation:

1. Extract gate decision
2. Extract per-category results
3. Extract gap list and mitigation items
4. Extract recovery information (if applicable)
5. Load sprint-status.yaml foundation section

Prepare validation context:

- Verify report format matches expected template
- Check for required sections
- Identify any structural issues

**Note:** This validate mode performs meta-validation - checking that the gate report itself is complete and properly formatted, not re-running the foundation validation checks.
