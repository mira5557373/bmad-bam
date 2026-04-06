# Step 1: Load Existing Artifact

Load the existing complexity assessment artifacts:
- `{output_folder}/planning-artifacts/modules/{module-name}/complexity-assessment.md`
- `sprint-status.yaml` (module complexity section)

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current assessment:
- Current complexity classification (SIMPLE/STANDARD/COMPLEX)
- Score breakdown (Q1-Q8)
- Total score and whether upgrade rule was applied
- Assessment date and any documented caveats

Confirm with the user which aspects need re-evaluation:
- Re-assess specific questions (e.g., AI involvement changed)
- Update scores based on new requirements
- Override classification with justification
- Add new evidence or rationale
