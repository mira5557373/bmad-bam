# Step 1: Load Existing Artifact

Load the existing AI eval safety design documents:
- `{output_folder}/planning-artifacts/safety/safety-criteria.md`
- `{output_folder}/planning-artifacts/safety/golden-tasks.md`
- `{output_folder}/planning-artifacts/safety/guardrail-config.md`
- `{output_folder}/planning-artifacts/safety/eval-pipeline.md`
- `{output_folder}/planning-artifacts/safety/monitoring-config.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current design:
- Safety dimensions and criteria
- Golden task coverage
- Guardrail configuration
- Eval pipeline status
- Monitoring coverage

Confirm with the user which sections need modification.
