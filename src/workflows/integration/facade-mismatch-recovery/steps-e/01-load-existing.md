# Step 1: Load Existing Artifact

Load the existing mismatch recovery artifacts.

## Tasks

1. **Locate Recovery Documents**
   - Search for recovery reports in `{output_folder}/planning-artifacts/quality/`
   - Load the mismatch detection report
   - Load the divergence analysis
   - Load the resolution strategy document

2. **Parse Recovery State**
   - Current phase of recovery (detection, analysis, resolution, implementation, verification)
   - Resolution option chosen
   - Implementation status
   - Outstanding items

3. **Display Recovery Summary**
   - Show affected modules and operations
   - Display mismatch type and severity
   - Show resolution strategy in progress
   - List completed vs pending verification steps

If the recovery documents do not exist, inform the user and suggest switching to Create mode.

## Output

Present a summary of the recovery state:
- Mismatch identifier and affected components
- Current recovery phase
- Resolution strategy selected
- Verification status

Confirm with the user which aspects of the recovery need modification.
