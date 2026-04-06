# Step 1: Load Artifact

Load the existing facade contract for validation.

## Tasks

1. **Locate Contract Document**
   - Search for contract in `{output_folder}/planning-artifacts/contracts/`
   - Identify by provider module name or contract identifier

2. **Parse Contract Completely**
   - Load all interface definitions
   - Extract all DTO schemas
   - Read error handling specifications
   - Load metadata and version info

3. **Prepare for Validation**
   - Index all operations for completeness check
   - Catalog all DTO references for consistency check
   - List all error codes for coverage check

If the contract file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

## Output

Confirm successful loading and prepare validation context with:
- Contract identifier and version
- Operation count
- DTO count
- Error code count
