# Step 1: Load Existing Artifact

Load the existing convergence report from `{output_folder}/planning-artifacts/quality/convergence-report.md`.

If the file does not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current report:
- Previous verification results per phase
- Previous release recommendation
- Any documented blockers

Confirm with the user which verification phases need to be re-run or updated.
