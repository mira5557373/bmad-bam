# Step 1: Load Artifact

Load the existing internal contract design documents:
- `{output_folder}/planning-artifacts/contracts/{module-name}-contracts.md`
- `{output_folder}/planning-artifacts/contracts/{module-name}-boundaries.md`
- `{module_path}/src/contracts/*.ts` (contract interface files)

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the document structure and prepare for validation against the quality criteria.
