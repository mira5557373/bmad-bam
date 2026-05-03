# Step 01: Gather MCP Requirements

## MANDATORY EXECUTION RULES

- 🛑 NEVER generate configuration without understanding requirements
- 📖 Load MCP patterns before proceeding
- ⏸️ Pause after gathering requirements for user confirmation

---

## YOUR TASK

Gather MCP server requirements including:
- Server scope (local, shared, enterprise)
- Tenant isolation requirements
- Tool categories to expose
- Authentication method

---

## Main Sequence

### 1. Load MCP Patterns

Read: `{project-root}/_bmad/bam/data/patterns/mcp-*.md`

### 2. Gather Requirements

| Dimension | Question |
|-----------|----------|
| Server Scope | Local per-user, shared per-tenant, or enterprise? |
| Isolation | How should tools be scoped per tenant? |
| Tool Types | What tool categories? (files, APIs, databases) |
| Auth | OAuth, API key, or service account? |

### 3. Confirm Requirements

Present summary and await user confirmation.

---

## NEXT STEP

Proceed to `step-02-c-server.md` for server architecture design.
