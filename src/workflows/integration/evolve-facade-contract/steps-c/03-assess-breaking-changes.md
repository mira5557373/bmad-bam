# Step 3: Assess Breaking Changes

Analyze the impact of proposed changes on consumers.

## Tasks

1. **Classify Change Compatibility**
   For each proposed change, determine:
   - **Backward Compatible**: Existing consumers continue to work
   - **Forward Compatible**: New consumers work with old providers
   - **Breaking**: Requires consumer code changes

2. **Breaking Change Detection Rules**
   Check for these breaking changes:
   - Removing or renaming operations
   - Adding required parameters
   - Removing response fields consumers depend on
   - Changing field types
   - Tightening validation rules
   - Changing error code semantics

3. **Impact Analysis**
   For each breaking change:
   - List affected consumers
   - Estimate migration effort
   - Identify rollback complexity
   - Assess risk level (low/medium/high)

4. **Document Non-Breaking Alternatives**
   - Can the change be made additive instead?
   - Can old and new behavior coexist?
   - Is a gradual migration path possible?

## Output

Breaking change assessment:
- List of breaking vs non-breaking changes
- Impact matrix (change x consumer)
- Risk assessment per breaking change
- Alternative approaches considered
