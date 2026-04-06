# Step 1: Load Artifact

Load the existing emergency change documents:
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-request.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-impact.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-approval.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-implementation.md`

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the document structure and prepare for validation against the quality criteria.
