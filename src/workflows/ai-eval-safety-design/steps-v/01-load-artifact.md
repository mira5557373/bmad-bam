# Step 1: Load Artifact

Load the existing AI eval safety design documents:
- `{output_folder}/planning-artifacts/safety/safety-criteria.md`
- `{output_folder}/planning-artifacts/safety/golden-tasks.md`
- `{output_folder}/planning-artifacts/safety/guardrail-config.md`
- `{output_folder}/planning-artifacts/safety/eval-pipeline.md`
- `{output_folder}/planning-artifacts/safety/monitoring-config.md`

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the document structure and prepare for validation against the quality criteria.
