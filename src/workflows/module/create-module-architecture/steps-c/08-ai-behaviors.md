# Step 8: AI Behaviors (if applicable)

## Purpose

Define AI agent interactions, tool permissions, and memory scope rules for this module. Skip this step if the module has no AI involvement.

## Actions

### 1. Identify AI Use Cases

For each AI-powered feature in this module:
- What is the agent's purpose?
- What data does it access?
- What actions can it take?
- What tier restrictions apply?

### 2. Define Tool Permissions

Document each tool the module exposes to agents:
- **Tool name:** Clear identifier
- **Description:** What the tool does
- **Parameters:** Input schema
- **Permissions:** Which tiers can use it
- **Approval required:** Yes/No for sensitive actions

### 3. Configure Memory Scope

Define what data agents can remember:
- **Ephemeral:** Current conversation only
- **Working:** Session-scoped (tenant-isolated)
- **Long-term:** Persistent (tenant-isolated)

### 4. Establish Safety Boundaries

- Actions that require human approval
- Rate limits per tenant/tier
- Data that cannot be exposed to agents
- Fallback behavior on agent failures

## Output

Document in module architecture:
- AI use cases table
- Tool permission matrix
- Memory scope configuration
- Safety boundary rules

## Questions to Consider

- Does this module's AI need access to other module facades?
- What happens if the AI agent fails mid-operation?
- Are there compliance implications for AI memory retention?

**Soft Gate:** Steps 1-8 complete the analysis and design phases. Present a summary of identity, domain model, facade design, dependencies, events, and AI behaviors. Ask for confirmation before proceeding to assembly. In headless mode, auto-proceed.
