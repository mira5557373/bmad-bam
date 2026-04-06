# Step 1: Load Existing Artifact

Load the existing tenant offboarding documents:
- `{output_folder}/planning-artifacts/operations/tenant-offboarding-runbook.md`
- `{output_folder}/planning-artifacts/architecture/tenant-deprovisioning-flow.md`
- `{output_folder}/planning-artifacts/compliance/data-retention-policy.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current documents:
- Deprovisioning stages defined
- Data retention policies
- Active resource handling procedures
- Cleanup isolation steps
- Runbook completeness

Confirm with the user which sections need modification.
