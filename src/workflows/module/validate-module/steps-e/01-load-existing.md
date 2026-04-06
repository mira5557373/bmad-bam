# Step 1: Load Existing Artifact

Load the existing validation report for modification.

## Load Artifacts

Load the existing validation report:
- `{output_folder}/planning-artifacts/modules/{module-name}/validation-report.md`

If the file does not exist, inform the user and suggest running validation in Create mode first.

## Also Load Context

- Module architecture: `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Sprint status: `{output_folder}/sprint-status.yaml`

## Parse and Display Summary

Extract and present:

1. **Previous Validation Result**
   - Overall status (PASS/CONDITIONAL/FAIL)
   - Date of validation
   - Gate results (QG-M1, QG-M2, QG-M3)

2. **Previous Findings**
   - Blocking issues identified
   - Warnings documented
   - Recommendations made

3. **Current Module State**
   - Sprint-status.yaml module status
   - Any changes since last validation

## Confirm Modification Scope

Ask the user what modifications are needed:

- [ ] Re-run specific quality gate(s)
- [ ] Update findings based on architecture changes
- [ ] Mark issues as resolved
- [ ] Add new findings discovered manually
- [ ] Update recommendations
- [ ] Change overall gate decision

Capture the specific changes requested before proceeding.
