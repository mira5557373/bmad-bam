# Step 10: Load Existing MCP Configuration

## MANDATORY EXECUTION RULES

- 🛑 NEVER modify the MCP configuration during this step - load only
- 📖 Load MCP patterns before proceeding
- ⏸️ Pause after presenting findings and await user direction

---

## YOUR TASK

Locate, load, and parse the existing MCP server configuration document. Extract current settings and present a structured summary for the user to identify what needs modification.

---

## Load Sequence

### 1. Locate Document

Search in priority order:

| Priority | Location |
|----------|----------|
| 1 | `{output_folder}/planning-artifacts/mcp-server-config.md` |
| 2 | `{project-root}/docs/architecture/mcp-server-config.md` |
| 3 | `{project-root}/**/mcp-server-config.md` (fallback) |

**If not found:** Suggest Create mode (step-01-c-start.md) or request path.

### 2. Parse Configuration

Extract current settings:

```yaml
mcp_config:
  server_scope: [local|shared|enterprise]
  isolation_level: [process|container|namespace]
  auth_method: [oauth|api-key|service-token]
  tool_categories: [list]
```

### 3. Present Edit Menu

Display configuration summary:

```
================================================================================
MCP SERVER CONFIGURATION - EDIT MODE
================================================================================
Document: mcp-server-config.md
Version: {version}
================================================================================

CURRENT CONFIGURATION:
- Server Scope: {scope}
- Isolation Level: {isolation}
- Auth Method: {auth}
- Tool Categories: {categories}

EDITABLE SECTIONS:
[1] Server Architecture - Modify deployment model
[2] Tool Discovery - Update tool categories
[3] Tenant Isolation - Change isolation strategy
[4] Authentication - Modify auth configuration
[5] Rate Limiting - Adjust rate limits
[6] Caching - Update cache settings

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ MCP configuration document located
- ✅ Current settings extracted and displayed
- ✅ Edit menu presented
- ✅ User has selected section(s) to edit

---

## NEXT STEP

After user identifies modifications, proceed to `step-11-e-apply.md`.
