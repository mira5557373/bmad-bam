# Step 1: Load Existing Artifact

Load the existing requirement ingestion artifacts:
- `{output_folder}/planning-artifacts/features/requirement-matrix.md`
- `{output_folder}/planning-artifacts/features/module-mapping.md`
- `{output_folder}/planning-artifacts/features/cross-cutting-concerns.md`
- `{output_folder}/planning-artifacts/features/index.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current artifacts:
- Total requirements ingested
- Module assignments (count per module)
- Cross-cutting concerns identified
- Dependency graph status (acyclic verified?)

Confirm with the user which sections need modification:
- Add new requirements to existing matrix
- Reassign requirements to different modules
- Update cross-cutting classifications
- Modify dependency relationships
