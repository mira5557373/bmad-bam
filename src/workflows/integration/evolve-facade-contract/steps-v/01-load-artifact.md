# Step 1: Load Artifact

Load the contract evolution artifacts for validation.

## Tasks

1. **Locate All Evolution Documents**
   - New contract version
   - Migration guide
   - Version strategy ADR
   - Breaking change assessment

2. **Parse Complete Evolution Package**
   - Load new contract with all changes
   - Extract deprecation notices
   - Load migration steps
   - Read version justification

3. **Prepare Validation Context**
   - Index all changes for completeness check
   - Catalog breaking vs non-breaking changes
   - List all affected consumers
   - Map migration steps to breaking changes

If the evolution documents do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

## Output

Confirm successful loading with:
- New contract version
- Number of changes (breaking/non-breaking)
- Number of affected consumers
- Migration guide presence (yes/no)
