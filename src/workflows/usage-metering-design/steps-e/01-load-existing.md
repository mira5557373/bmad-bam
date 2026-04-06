# Step 1: Load Existing Artifact

Load the existing usage metering documents:
- `{output_folder}/planning-artifacts/billing/usage-metering-design.md`
- `{output_folder}/planning-artifacts/billing/billing-integration-spec.md`
- `{output_folder}/planning-artifacts/operations/metering-runbook.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current documents:
- Billable resources identified
- Metering event schema
- Aggregation configuration
- Billing integration points
- Validation strategy

Confirm with the user which sections need modification.
