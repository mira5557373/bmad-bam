# Step 1: Load Existing Artifact

Load the existing debug report from `{output_folder}/planning-artifacts/debug/agent-debug-report.md`.

If the file does not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current report:
- Agent and execution context
- Previously identified failure point
- Previous recommendations
- Resolution status

Confirm with the user which sections need modification or additional investigation.
