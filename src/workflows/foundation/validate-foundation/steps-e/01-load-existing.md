# Step 1: Load Existing Artifact

Load the existing foundation gate report and validation artifacts:

- `{output_folder}/planning-artifacts/foundation-gate-report.md`
- `{output_folder}/sprint-status.yaml` (foundation section)

If the gate report does not exist, inform the user and suggest switching to Create mode to perform initial validation.

Parse and display a summary of the current validation state:

- Previous gate decision (PASS / CONDITIONAL / FAIL)
- Date of last validation
- Category results from previous run
- Outstanding gaps or mitigation items
- Recovery attempt count (if applicable)

## CONDITIONAL Pass Review

If previous result was CONDITIONAL:
- Check if mitigation deadline has passed
- Review status of non-critical gaps
- Determine if gaps have been addressed

## FAIL Recovery Review

If previous result was FAIL:
- Check recovery attempt count
- Review locked categories (should not re-test)
- Identify failed categories requiring re-validation
- Load salvage report if available

Confirm with the user what modifications to the validation are needed:

1. Re-run specific categories only
2. Update mitigation plan
3. Add new findings
4. Update recovery status
