# Step 1: Load Existing Artifact

Load the existing emergency change documents:
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-request.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-impact.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-approval.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-implementation.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current emergency change:
- Emergency ID and classification
- Current status (documenting/assessing/approving/implementing/closing)
- Impact summary
- Approval status
- Implementation progress

Confirm with the user which phase or section needs modification.
