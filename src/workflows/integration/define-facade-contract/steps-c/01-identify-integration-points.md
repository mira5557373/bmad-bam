# Step 1: Identify Integration Points

Analyze the modules that need to integrate and identify all facade integration points.

## Tasks

1. **Load Module Architectures**
   - Read the module architecture documents for both the provider and consumer modules
   - Identify the bounded contexts involved
   - Note any existing facade contracts in `{output_folder}/planning-artifacts/contracts/`

2. **Map Integration Points**
   - List all operations the consumer module needs from the provider
   - Identify synchronous vs asynchronous integration needs
   - Document query vs command operations

3. **Verify Module Boundaries**
   - Confirm integration respects module boundary rules from master architecture
   - Check that no internal domain objects leak across boundaries
   - Validate tenant context propagation requirements

## Output

Document the integration points with:
- Provider module name and bounded context
- Consumer module name and bounded context
- List of required operations (name, type: query/command, sync/async)
- Tenant context requirements for each operation
