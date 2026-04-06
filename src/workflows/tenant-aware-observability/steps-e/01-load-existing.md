# Step 1: Load Existing Artifact

Load the existing tenant-aware observability documents:
- `{output_folder}/planning-artifacts/observability/tenant-observability-design.md`
- `{output_folder}/planning-artifacts/observability/dashboard-specifications.md`
- `{output_folder}/planning-artifacts/observability/alert-rules.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current documents:
- Tenant dimensions defined
- Metric aggregation strategy
- Log context configuration
- Trace propagation setup
- Dashboard coverage

Confirm with the user which sections need modification.
