# Step 1: Load Existing Contract

Load the current facade contract that needs to evolve.

## Tasks

1. **Locate Current Contract**
   - Find contract in `{output_folder}/planning-artifacts/contracts/`
   - Verify the contract version to evolve
   - Load all related contract artifacts (TypeScript definitions, schemas)

2. **Identify Active Consumers**
   - List all modules currently consuming this contract
   - Check integration tests for consumer usage patterns
   - Note any external (third-party) consumers if applicable

3. **Document Current State**
   - Extract current version number
   - List all existing operations
   - Catalog all DTOs and error codes
   - Note any existing deprecation warnings

4. **Load Contract History**
   - Review previous version changes
   - Understand evolution patterns already established
   - Note any deferred breaking changes

## Output

Document the baseline for evolution:
- Current contract version
- Complete operation inventory
- List of known consumers
- Previous change history summary
