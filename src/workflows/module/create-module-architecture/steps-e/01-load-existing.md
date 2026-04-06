# Step 1: Load Existing Artifact

Load the existing module architecture document from `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`.

If the file does not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current document:
- Module identity and bounded context
- Domain model (aggregate roots, entities)
- Public facade design
- Dependencies and events
- AI behaviors (if applicable)

Confirm with the user which sections need modification.
