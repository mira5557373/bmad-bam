# Step 1: Load Artifact

Load the existing module epics document for validation.

## Load Artifacts

Load the epics document:
- `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

## Also Load Context for Validation

- Module architecture: `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Sprint status: `{output_folder}/sprint-status.yaml`

## Parse Document Structure

Extract for validation:

1. **Epics**
   - Epic count and names
   - Epic boundaries (aggregates covered)
   - Dependencies per epic

2. **Stories**
   - Story count per epic
   - Story structure completeness
   - Acceptance criteria presence

3. **Module Alignment**
   - Aggregates referenced vs architecture
   - Facade methods planned vs defined
   - Events referenced vs published

Prepare document structure for validation against quality criteria in Step 2.
