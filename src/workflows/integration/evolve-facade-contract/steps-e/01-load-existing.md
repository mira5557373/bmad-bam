# Step 1: Load Existing Artifact

Load the existing contract evolution artifacts.

## Tasks

1. **Locate Evolution Documents**
   - Load the new contract version from `{output_folder}/planning-artifacts/contracts/`
   - Load the migration guide if it exists
   - Load the version strategy ADR

2. **Parse Evolution State**
   - Current version number
   - Planned changes manifest
   - Breaking change assessment
   - Migration timeline

3. **Display Evolution Summary**
   - Show version transition (old -> new)
   - List breaking changes identified
   - Show deprecation timeline
   - Display migration progress (if tracking)

If the evolution documents do not exist, inform the user and suggest switching to Create mode.

## Output

Present a summary of the evolution state:
- Contract version transition
- Number of breaking changes
- Number of consumers affected
- Current migration timeline

Confirm with the user which aspects of the evolution need modification.
