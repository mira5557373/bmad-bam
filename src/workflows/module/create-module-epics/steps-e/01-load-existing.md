# Step 1: Load Existing Artifact

Load the existing module epics document for modification.

## Load Artifacts

Load the existing epics document:
- `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`

If the file does not exist, inform the user and suggest switching to Create mode.

## Also Load Context

- Module architecture: `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md` (for constraint validation)

## Parse and Display Summary

Extract and present:

1. **Epic Overview**
   - Total epic count
   - Epic names and descriptions
   - Stories per epic

2. **Story Summary**
   - Total story count
   - Stories by priority (P1/P2/P3)
   - Spike stories identified

3. **Coverage Analysis**
   - Aggregates covered
   - Facade methods planned
   - AI behaviors included

4. **Current Status**
   - Sprint-status.yaml module status
   - Any stories already completed

## Confirm Modification Scope

Ask the user which sections need modification:

- [ ] Add new epic(s)
- [ ] Modify existing epic(s)
- [ ] Add stories to existing epic
- [ ] Modify story details
- [ ] Update acceptance criteria
- [ ] Reorder or reprioritize stories
- [ ] Remove stories or epics

Capture the specific changes requested before proceeding to apply changes.
