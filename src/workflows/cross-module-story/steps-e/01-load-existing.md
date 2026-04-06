# Step 1: Load Existing Artifact

Load the existing cross-module story documents:
- `{output_folder}/planning-artifacts/stories/cross-module-epic.md`
- `{output_folder}/planning-artifacts/stories/module-stories/*.md`
- `{output_folder}/planning-artifacts/stories/dependency-graph.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current story plan:
- Modules involved and their roles
- Dependency structure
- Integration points defined
- Story coordination status
- Overall progress

Confirm with the user which sections need modification.
