# Step 1: Load Existing Artifact

Load the existing facade contract specification.

## Tasks

1. **Locate Contract Document**
   - Search for contract in `{output_folder}/planning-artifacts/contracts/`
   - Match by provider module name or contract identifier
   - Load the most recent version if multiple exist

2. **Parse Contract Structure**
   - Extract interface definitions
   - Parse DTO schemas
   - Load error code enumeration
   - Read version and metadata

3. **Display Contract Summary**
   - Show contract name and current version
   - List all defined operations
   - Show consumer modules using this contract
   - Display last modification date

If the contract file does not exist, inform the user and suggest switching to Create mode.

## Output

Present a summary of the existing contract:
- Contract identifier and version
- Provider module and bounded context
- Number of operations defined
- List of operation names with their types (query/command)

Confirm with the user which sections need modification.
