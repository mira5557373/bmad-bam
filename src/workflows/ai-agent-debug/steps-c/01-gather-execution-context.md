# Step 1: Gather Execution Context

Collect all relevant information about the agent execution environment:

- Identify the agent type and orchestration model (single agent, manager+specialists, etc.)
- Load the agent's system prompt and tool configuration
- Retrieve recent execution logs and traces
- Identify the tenant context and any tenant-specific overrides
- Check memory tier contents (session, user, tenant) relevant to the execution
- Document the expected vs. actual behavior discrepancy

Required inputs:
- Agent ID or name
- Execution trace ID (if available)
- Tenant ID
- Time window for log retrieval

Output: Structured execution context document with all relevant runtime state.
