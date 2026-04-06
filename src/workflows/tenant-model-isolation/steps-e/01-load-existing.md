# Step 1: Load Existing Artifact

Load the existing tenant model and isolation documents:
- `{output_folder}/planning-artifacts/architecture/tenant-model.md`
- `{output_folder}/planning-artifacts/architecture/tenant-isolation-matrix.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current documents:
- Tenant entity structure and tier model
- Isolation matrix coverage
- Context propagation boundaries covered

Confirm with the user which sections need modification.
