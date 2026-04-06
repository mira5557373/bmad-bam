# Step 2: Verify Schema

Validate the tool definition against the ToolDefinition schema.

## Tasks

1. **Validate Against JSON Schema**
   - Verify tool definition matches ToolDefinition schema
   - Check all required fields are present
   - Validate field types and formats
   - Report any schema violations

2. **Check Input Parameter Schema**
   - Verify all parameters have type definitions
   - Check required vs optional parameters
   - Validate parameter descriptions are clear
   - Verify default values are appropriate
   - Check for parameter naming consistency

3. **Validate Output Schema**
   - Verify output structure is defined
   - Check for nullable/optional output fields
   - Validate error response format
   - Verify output matches what implementation returns

4. **Check Description Quality**
   - Tool description is clear and actionable
   - Parameter descriptions explain purpose
   - Examples provided for complex parameters
   - Description suitable for LLM consumption

5. **Verify Idempotency Declaration**
   - Tool correctly declares if idempotent
   - Idempotent tools are safe to retry
   - Non-idempotent tools have appropriate safeguards

## Output

Schema validation report:
- Schema compliance status (pass/fail)
- Specific violations found
- Description quality assessment
- Recommendations for improvement
