# Step 1: Load Existing Artifact

Load the existing internal contract design documents:
- `{output_folder}/planning-artifacts/contracts/{module-name}-contracts.md`
- `{output_folder}/planning-artifacts/contracts/{module-name}-boundaries.md`
- `{module_path}/src/contracts/*.ts` (contract interface files)

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current contracts:
- Contract inventory
- Interface definitions
- Boundary specifications
- Version status
- Consumer list

Confirm with the user which contracts need modification.
