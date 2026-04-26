# Step 02: Design Tool Schemas

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design tool input/output schemas with TenantContext injection
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: JSON Schema definitions, permission requirements, rate limits
- 🚫 Do NOT: Design registration system (that's Step 03)
- 🔍 Use web search: Verify JSON Schema patterns for tool definitions
- ⚠️ Gate: Tool schemas must include TenantContext for QG-I2 compliance

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Defining tool input schemas (JSON Schema format)
- Defining tool output schemas
- TenantContext injection pattern design
- Permission requirements per tool
- Rate limiting configuration per tool

**OUT OF SCOPE:**
- Tool registration system (Step 03)
- Tool execution environment (Step 04)
- Tool contract compilation (Step 05)

---

## Purpose

Design comprehensive tool schemas including input/output definitions, TenantContext injection patterns, permission requirements, and rate limiting configurations. These schemas define the contract between agents and tools.

---

## Prerequisites

- Step 01 completed: Design scope established
- Tool categories identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-schema
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- Tool list from Step 01
- AI runtime configuration
- Module architectures
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design tool schemas with tenant-aware input/output contracts.

---

## Main Sequence

### 1. Define TenantContext Schema

Define the standard TenantContext that all tools must receive:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tenant_id | string | YES | Unique tenant identifier |
| user_id | string | YES | Acting user within tenant |
| permissions | string[] | YES | Granted permissions for this call |
| tier | string | YES | Tenant tier (free/pro/enterprise) |
| quotas | object | YES | Remaining quota allocations |
| trace_id | string | YES | Request correlation ID |
| session_id | string | NO | Agent session identifier |

**CRITICAL:** TenantContext MUST be the first parameter of every tool.

### 2. Design Tool Input Schemas

For each tool identified in Step 01, define input schema:

#### 2.1 Data Access Tools

| Tool | Input Schema | TenantContext | Validation |
|------|--------------|---------------|------------|
| query_database | `{query: string, params: object}` | Required | SQL injection prevention |
| read_document | `{doc_id: string, fields: string[]}` | Required | Access control check |
| write_document | `{doc_id: string, data: object}` | Required | Schema validation |

**Example Schema (JSON Schema format):**

```yaml
query_database:
  type: object
  required: [tenant_context, query]
  properties:
    tenant_context:
      $ref: "#/definitions/TenantContext"
    query:
      type: string
      maxLength: 10000
    params:
      type: object
      additionalProperties: true
```

#### 2.2 External API Tools

| Tool | Input Schema | TenantContext | API Key Source |
|------|--------------|---------------|----------------|
| call_external_api | `{endpoint: string, method: string, body: object}` | Required | Tenant secrets vault |
| send_notification | `{channel: string, message: string, recipients: string[]}` | Required | Tenant config |

#### 2.3 File System Tools

| Tool | Input Schema | TenantContext | Path Validation |
|------|--------------|---------------|-----------------|
| read_file | `{path: string, encoding: string}` | Required | Tenant path prefix |
| write_file | `{path: string, content: string}` | Required | Tenant path prefix |
| list_files | `{directory: string, pattern: string}` | Required | Tenant path prefix |

### 3. Design Tool Output Schemas

Define standardized output schemas:

| Output Type | Schema | Example |
|-------------|--------|---------|
| Success | `{success: true, data: T, metadata: object}` | Query results |
| Error | `{success: false, error: ErrorInfo}` | Validation failure |
| Partial | `{success: true, data: T, warnings: Warning[]}` | Rate limited |

**Standard Error Schema:**

```yaml
ErrorInfo:
  type: object
  required: [code, message]
  properties:
    code:
      type: string
      enum: [VALIDATION_ERROR, PERMISSION_DENIED, RATE_LIMITED, NOT_FOUND, INTERNAL_ERROR]
    message:
      type: string
    details:
      type: object
    retry_after:
      type: integer
      description: Seconds until retry (for rate limits)
```

### 4. Define Permission Requirements

Map tools to required permissions:

| Tool | Required Permissions | Scope | Tier Required |
|------|---------------------|-------|---------------|
| query_database | `data:read` | Module | All |
| write_document | `data:write` | Module | All |
| call_external_api | `api:external` | Integration | Pro+ |
| delete_resource | `data:delete`, `admin:elevated` | Module | Enterprise |

**Permission Hierarchy:**

```
data:read < data:write < data:delete
api:internal < api:external
admin:basic < admin:elevated < admin:super
```

### 5. Configure Rate Limiting

Define rate limits per tool and tenant tier:

| Tool | Free Tier | Pro Tier | Enterprise |
|------|-----------|----------|------------|
| query_database | 100/min | 1000/min | 10000/min |
| call_external_api | 10/min | 100/min | 1000/min |
| write_file | 50/min | 500/min | 5000/min |
| send_notification | 5/min | 50/min | 500/min |

**Rate Limit Response:**

```yaml
RateLimitExceeded:
  success: false
  error:
    code: RATE_LIMITED
    message: "Rate limit exceeded for tool {tool_name}"
    details:
      limit: 100
      window: "1 minute"
      reset_at: "2026-04-26T12:00:00Z"
    retry_after: 45
```

### 6. Web Research Verification

**Verify current best practices:**

Search the web: "JSON Schema tool definition AI agents {date}"
Search the web: "OpenAI function calling schema best practices {date}"
Search the web: "rate limiting patterns multi-tenant APIs {date}"

_Source: [Document findings with URLs]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tool schema design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific schema decisions
- **P (Party Mode)**: Bring architect perspectives on tool contract design
- **C (Continue)**: Accept schemas and proceed to tool registration design
- **[Specific tool]**: Describe tool to explore schema in detail

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tool schemas, permission mappings, rate limit decisions
- Process enhanced insights on schema patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tool schema design for agent runtime: {summary}"
- Process AI Runtime Architect (Nova) and Platform Architect (Atlas) perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document tool schema decisions
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## SUCCESS METRICS:

- [ ] All tools have input schemas defined
- [ ] All tools have output schemas defined
- [ ] TenantContext injection documented for all tools
- [ ] Permission requirements mapped
- [ ] Rate limits configured per tier

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Missing TenantContext in schema | Add as first required parameter |
| Unclear permissions | Review with security architect |
| No rate limits defined | Apply default limits by category |
| Schema too permissive | Tighten validation rules |

---

## Verification

- [ ] All tool input schemas complete
- [ ] All tool output schemas complete
- [ ] TenantContext required for every tool
- [ ] Permissions documented per tool
- [ ] Rate limits defined per tier
- [ ] Patterns align with pattern registry

---

## Outputs

- Tool input schema definitions
- Tool output schema definitions
- TenantContext schema specification
- Permission requirements matrix
- Rate limiting configuration table

---

## NEXT STEP:

Proceed to `step-03-c-design.md` to design tool registration with tenant scoping and dynamic discovery.
