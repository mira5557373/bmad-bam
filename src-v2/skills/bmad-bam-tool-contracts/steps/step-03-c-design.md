# Step 03: Design Tool Registration

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design tool registry with tenant scoping and versioning
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Tool registration, discovery, versioning, capability-based access
- 🚫 Do NOT: Design execution environment (that's Step 04)
- 🔍 Use web search: Verify tool registry patterns for AI agents
- ⚠️ Gate: Tool registration must support tenant isolation for QG-I2

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Tool registry architecture with tenant scoping
- Dynamic tool discovery mechanisms
- Tool versioning strategy
- Capability-based tool access control
- Tool metadata and documentation

**OUT OF SCOPE:**
- Tool execution environment (Step 04)
- Sandboxing and resource limits (Step 04)
- Tool contract compilation (Step 05)

---

## Purpose

Design the tool registration system that enables tenant-scoped tool access, dynamic discovery, versioning, and capability-based access control. The registry serves as the single source of truth for all available tools.

---

## Prerequisites

- Step 02 completed: Tool schemas defined
- Permission requirements mapped
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-registry
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Inputs

- Tool schemas from Step 02
- Permission requirements matrix
- AI runtime configuration
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design tool registration system with tenant-aware scoping and discovery.

---

## Main Sequence

### 1. Design Tool Registry Architecture

Define the tool registry structure:

| Component | Purpose | Storage | Access |
|-----------|---------|---------|--------|
| Global Registry | All available tools | Database/Config | Read-only |
| Tenant Registry | Tenant-enabled tools | Per-tenant config | Tenant scoped |
| Session Registry | Session-bound tools | Memory | Session scoped |

**Registry Hierarchy:**

```
Global Registry (All Tools)
    │
    ├── Tenant Registry (Enabled Tools)
    │       │
    │       └── Session Registry (Active Tools)
    │
    └── Tool Metadata Store
```

### 2. Design Tool Registration Entry

Define the structure for each tool registration:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tool_id | string | YES | Unique tool identifier |
| name | string | YES | Human-readable name |
| version | string | YES | Semantic version |
| category | string | YES | Tool category |
| module | string | YES | Owning module |
| input_schema | object | YES | JSON Schema for inputs |
| output_schema | object | YES | JSON Schema for outputs |
| permissions | string[] | YES | Required permissions |
| tier_access | string[] | YES | Tiers that can access |
| rate_limits | object | YES | Rate limit configuration |
| enabled | boolean | YES | Global enable/disable |
| deprecated | boolean | NO | Deprecation flag |
| deprecation_date | string | NO | When deprecated |
| replacement_tool | string | NO | Suggested replacement |

### 3. Design Tenant Scoping

Define tenant-specific tool configuration:

| Tenant Config | Purpose | Example |
|---------------|---------|---------|
| enabled_tools | Tools enabled for tenant | `["query_database", "send_email"]` |
| disabled_tools | Explicitly disabled | `["dangerous_tool"]` |
| custom_limits | Override rate limits | `{"query_database": 500}` |
| tool_configs | Tool-specific settings | API keys, endpoints |

**Tenant Tool Resolution:**

```
1. Check global registry for tool existence
2. Check tool.enabled == true
3. Check tenant tier has access
4. Check tenant enabled_tools (if explicit list)
5. Check tenant disabled_tools (blacklist)
6. Apply tenant custom_limits override
7. Return tenant-scoped tool definition
```

### 4. Design Dynamic Tool Discovery

Enable agents to discover available tools:

| Discovery Method | Description | When to Use |
|------------------|-------------|-------------|
| List All | Get all available tools for tenant | Agent initialization |
| By Category | Filter tools by category | Task-specific agent |
| By Permission | Filter by granted permissions | Security-aware agent |
| By Capability | Search by capability tags | Smart tool selection |

**Discovery Response Schema:**

```yaml
ToolDiscoveryResponse:
  type: object
  properties:
    tools:
      type: array
      items:
        $ref: "#/definitions/ToolSummary"
    pagination:
      type: object
      properties:
        total: integer
        offset: integer
        limit: integer
```

### 5. Design Tool Versioning Strategy

Define versioning approach:

| Version Type | Format | Example | Impact |
|--------------|--------|---------|--------|
| Major | X.0.0 | 2.0.0 | Breaking changes |
| Minor | X.Y.0 | 1.5.0 | New features |
| Patch | X.Y.Z | 1.5.3 | Bug fixes |

**Version Selection Strategy:**

| Strategy | Description | Configuration |
|----------|-------------|---------------|
| Latest | Always use latest compatible | `version: "latest"` |
| Pinned | Use exact version | `version: "1.5.3"` |
| Range | Use version in range | `version: "^1.5.0"` |
| Minimum | Use minimum or higher | `version: ">=1.5.0"` |

**Deprecation Policy:**

| Phase | Duration | Action |
|-------|----------|--------|
| Notice | 30 days | Add deprecation warning |
| Migration | 60 days | Log usage, suggest replacement |
| Sunset | 90 days | Return error, force migration |

### 6. Design Capability-Based Access

Map capabilities to tool access:

| Capability | Tools Granted | Description |
|------------|---------------|-------------|
| data_reader | query_database, read_document | Read-only data access |
| data_writer | write_document, update_record | Write data access |
| external_api | call_external_api, webhook | External integrations |
| file_manager | read_file, write_file, list_files | File operations |
| admin_ops | delete_resource, manage_users | Administrative tools |

**Capability Composition:**

```yaml
agent_capabilities:
  research_agent:
    - data_reader
    - external_api
  
  editor_agent:
    - data_reader
    - data_writer
    - file_manager
  
  admin_agent:
    - data_reader
    - data_writer
    - admin_ops
```

### 7. Web Research Verification

**Verify current best practices:**

Search the web: "AI agent tool registry design patterns {date}"
Search the web: "LangGraph tool registration best practices {date}"
Search the web: "capability-based access control patterns {date}"

_Source: [Document findings with URLs]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tool registration design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific registry decisions
- **P (Party Mode)**: Bring architect perspectives on registration design
- **C (Continue)**: Accept design and proceed to tool execution
- **[Specific topic]**: Describe topic to explore in detail

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: registry architecture, versioning strategy, capability mapping
- Process enhanced insights on registration patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tool registration design for agent runtime: {summary}"
- Process AI Runtime Architect (Nova) and Integration Architect (Kai) perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document tool registration decisions
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## SUCCESS METRICS:

- [ ] Tool registry architecture defined
- [ ] Tenant scoping mechanism designed
- [ ] Dynamic discovery API designed
- [ ] Versioning strategy documented
- [ ] Capability-based access mapped

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| No tenant scoping | Add tenant_id filtering to registry |
| Missing versioning | Implement semantic versioning |
| Unclear discovery | Define explicit discovery API |
| Capability gaps | Review agent requirements |

---

## Verification

- [ ] Registry architecture documented
- [ ] Tenant scoping complete
- [ ] Discovery mechanisms defined
- [ ] Versioning strategy clear
- [ ] Capabilities mapped to tools
- [ ] Patterns align with pattern registry

---

## Outputs

- Tool registry architecture
- Tenant scoping mechanism
- Discovery API specification
- Versioning strategy document
- Capability-to-tool mapping

---

## NEXT STEP:

Proceed to `step-04-c-document.md` to design tool execution with sandboxing and resource limits.
