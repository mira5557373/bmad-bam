# Step 5: Run Contract Tests

Execute contract tests to verify tool behavior matches specification.

## Tasks

1. **Generate Contract Test Cases**
   Based on tool definition:
   - Valid input scenarios
   - Invalid input rejection
   - Boundary conditions
   - Error handling scenarios
   - Tenant isolation scenarios

2. **Run Schema Compliance Tests**
   - Input validation works as specified
   - Output matches declared schema
   - Error responses follow format
   - Optional parameters handled correctly

3. **Run Permission Tests**
   - Tool rejects calls without required permissions
   - Permission errors are clear and actionable
   - Approval workflow triggers correctly
   - Sandbox restrictions enforced

4. **Run Tenant Isolation Tests**
   - Tool only returns tenant-specific data
   - Cross-tenant access attempts fail
   - Tenant context propagates correctly
   - Concurrent tenant requests are isolated

5. **Run Integration Tests**
   - Tool integrates with agent runtime correctly
   - Tool appears in registry as expected
   - Tool description works well with LLM
   - Tool responses are parseable by agent

6. **Document Test Results**
   - Record all test executions
   - Note any failures with details
   - Document edge cases discovered
   - Record performance observations

## Output

Write validation report to:
`{output_folder}/planning-artifacts/ai-runtime/tool-validation-{tool-name}.md`

Include:
- Schema validation results
- Permission validation results
- Tenant context validation results
- Contract test results (passed/failed/skipped)
- Overall validation status (PASS/CONDITIONAL/FAIL)
- Recommendations for improvement
