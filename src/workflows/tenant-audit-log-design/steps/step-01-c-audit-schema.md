# Step 1: Audit Schema Design

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the core audit log schema with tenant isolation, ensuring comprehensive event capture while maintaining query performance and compliance requirements.

---

## Prerequisites

- Master architecture document loaded
- Tenant model defined (`{tenant_model}`)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: audit
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- User requirements for audit logging
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Audit Event Categories

Identify categories of events requiring audit logging:

| Category | Description | Criticality | Retention |
|----------|-------------|-------------|-----------|
| Authentication | Login, logout, MFA, session events | Critical | 7 years |
| Authorization | Permission grants, denials, role changes | Critical | 7 years |
| Data Access | Read operations on sensitive data | High | 3 years |
| Data Modification | Create, update, delete operations | Critical | 7 years |
| Administrative | System configuration changes | Critical | 7 years |
| AI Agent Actions | Agent decisions, tool executions | Critical | 5 years |
| Billing/Metering | Usage tracking, subscription changes | High | 7 years |
| Security Events | Threat detection, anomalies | Critical | 7 years |

### 2. Design Core Audit Schema

Define the base audit log schema structure:

| Field | Type | Required | Description | Index |
|-------|------|----------|-------------|-------|
| `audit_id` | UUID | Yes | Unique identifier | Primary |
| `tenant_id` | UUID | Yes | Tenant identifier | Partition key |
| `event_timestamp` | TimestampTZ | Yes | Event occurrence time | Yes |
| `event_type` | Enum | Yes | Category of event | Yes |
| `event_action` | String | Yes | Specific action taken | Yes |
| `actor_id` | UUID | Yes | User or system performing action | Yes |
| `actor_type` | Enum | Yes | User, System, Agent, Service | Yes |
| `resource_type` | String | Yes | Type of resource affected | Yes |
| `resource_id` | UUID | No | Identifier of affected resource | Yes |
| `resource_path` | String | No | Full path to resource | No |
| `request_id` | UUID | No | Correlation ID for request tracing | Yes |
| `session_id` | UUID | No | User session identifier | No |
| `ip_address` | Inet | No | Source IP address | No |
| `user_agent` | String | No | Client user agent | No |
| `geo_location` | JSON | No | Geographic location data | No |
| `old_value` | JSONB | No | Previous state (for modifications) | No |
| `new_value` | JSONB | No | New state (for modifications) | No |
| `metadata` | JSONB | No | Additional context data | GIN |
| `risk_level` | Enum | No | Low, Medium, High, Critical | Yes |
| `outcome` | Enum | Yes | Success, Failure, Partial | Yes |
| `error_code` | String | No | Error code if failure | No |
| `retention_policy` | String | Yes | Retention rule identifier | No |

### 3. Define Tenant Isolation Strategy

Based on `{tenant_model}`, design isolation approach:

**For Row-Level Security:**

| Aspect | Implementation |
|--------|----------------|
| Partition strategy | Range partition by tenant_id + time |
| RLS policy | `tenant_id = current_setting('app.tenant_id')` |
| Index strategy | Composite indexes with tenant_id prefix |
| Query enforcement | Mandatory tenant context in all queries |

**For Schema-per-Tenant:**

| Aspect | Implementation |
|--------|----------------|
| Schema naming | `audit_{tenant_id}` |
| Table structure | Identical tables per schema |
| Cross-tenant queries | Admin role with explicit schema access |
| Migration strategy | Schema template with versioning |

**For Database-per-Tenant:**

| Aspect | Implementation |
|--------|----------------|
| Database naming | `tenant_{tenant_id}_audit` |
| Connection routing | Tenant-aware connection pool |
| Central aggregation | Read replicas for analytics |
| Backup strategy | Per-tenant backup schedules |

### 4. Design AI Agent Audit Extension

Extend schema for AI agent-specific events:

| Field | Type | Description |
|-------|------|-------------|
| `agent_id` | UUID | AI agent identifier |
| `agent_type` | String | Type of agent (crew, graph, etc.) |
| `run_id` | UUID | Agent run correlation ID |
| `tool_name` | String | Tool executed by agent |
| `tool_input` | JSONB | Input parameters (sanitized) |
| `tool_output` | JSONB | Output results (sanitized) |
| `confidence_score` | Decimal | Agent decision confidence |
| `approval_status` | Enum | Auto, Pending, Approved, Rejected |
| `approval_by` | UUID | User who approved (if applicable) |
| `guardrail_triggers` | JSONB | Any guardrail activations |

### 5. Define Immutability Controls

Ensure audit log integrity:

| Control | Implementation | Purpose |
|---------|----------------|---------|
| Append-only | No UPDATE/DELETE permissions | Prevent tampering |
| Cryptographic hash | SHA-256 chain linking | Detect modifications |
| Digital signatures | Event signing with HSM | Non-repudiation |
| Time-stamping | Trusted TSA integration | Temporal integrity |
| Write-once storage | WORM compliance | Regulatory compliance |

**Verify current best practices with web search:**
Search the web: "audit log schema design best practices {date}"
Search the web: "multi-tenant audit logging patterns {date}"
Search the web: "immutable audit log implementation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the audit schema design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific schema elements
- **P (Party Mode)**: Bring compliance and database perspectives on schema
- **C (Continue)**: Accept schema and proceed to retention policies
- **[Specific refinements]**: Describe schema concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: audit schema, tenant isolation strategy, AI agent extension
- Process enhanced insights on schema completeness
- Ask user: "Accept these refined schema definitions? (y/n)"
- If yes, integrate into schema design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review audit log schema design for multi-tenant AI platform"
- Process compliance and database architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save audit schema to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-retention-policies.md`

---

## Verification

- [ ] All event categories identified
- [ ] Core schema fields defined with types
- [ ] Tenant isolation strategy matches `{tenant_model}`
- [ ] AI agent audit extension designed
- [ ] Immutability controls specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Audit event categories
- Core audit log schema
- Tenant isolation design
- AI agent audit extension
- Immutability controls
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-audit-log-design-template.md`

---

## Next Step

Proceed to `step-02-c-retention-policies.md` to design retention policies.
