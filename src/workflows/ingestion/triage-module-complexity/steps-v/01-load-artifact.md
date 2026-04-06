# Step 1: Load Artifact

Load the existing complexity assessment artifacts:
- `{output_folder}/planning-artifacts/modules/{module-name}/complexity-assessment.md`
- `sprint-status.yaml` (module complexity section)

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the assessment structure and prepare for validation against the quality criteria:
- Extract score breakdown
- Extract classification
- Extract evidence/rationale for each question
- Load related sprint-status.yaml entries
