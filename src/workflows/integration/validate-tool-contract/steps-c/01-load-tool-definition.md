# Step 1: Load Tool Definition

Load the AI agent tool definition to be validated.

## Tasks

1. **Locate Tool Definition**
   - Find tool definition in `{output_folder}/planning-artifacts/ai-runtime/tools/`
   - Or load from module's tool registry if already implemented
   - Identify tool by name or module owner

2. **Parse Tool Definition**
   Extract key components:
   - Tool name and description
   - Input parameters schema
   - Output schema
   - Module owner
   - Permission requirements
   - Tenant context requirements

3. **Load Related Artifacts**
   - Load the ToolDefinition schema from shared kernel
   - Load module's tool registry configuration
   - Load any existing tool tests

4. **Identify Tool Category**
   Classify the tool:
   - Query tool (read-only, safe to retry)
   - Action tool (side effects, may need approval)
   - Sensitive tool (PII access, elevated permissions)
   - External tool (calls external services)

## Output

Document the loaded tool definition:
- Tool identifier and description
- Category classification
- Module owner
- Input/output schema summary
- Permission requirements summary
