# Step 1: Load Existing Artifact

Load the existing API version release documents:
- `{output_folder}/planning-artifacts/releases/api-release-plan.md`
- `{output_folder}/planning-artifacts/releases/changelog.md`
- `{output_folder}/planning-artifacts/releases/migration-guide.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current release plan:
- Target version number
- Change inventory summary
- Compatibility assessment
- Migration timeline status
- Release execution status

Confirm with the user which sections need modification.
