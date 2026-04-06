# Step 1: Load Artifact

Load the existing validation report for meta-validation.

## Load Artifacts

Load the validation report:
- `{output_folder}/planning-artifacts/modules/{module-name}/validation-report.md`

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

## Also Load Context

- Module architecture: `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Sprint status: `{output_folder}/sprint-status.yaml`

## Parse Report Structure

Extract for meta-validation:

1. **Report Metadata**
   - Validation date
   - Validator identity
   - Module name

2. **Gate Results**
   - QG-M1 status
   - QG-M2 status
   - QG-M3 status
   - Overall decision

3. **Findings**
   - Blocking issues count
   - Warnings count
   - Recommendations count

4. **Consistency Check Data**
   - Module architecture modification date
   - Validation report date
   - Sprint status module state

Prepare data for meta-validation in Step 2.
