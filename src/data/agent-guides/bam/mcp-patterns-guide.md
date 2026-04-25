# BAM MCP Patterns Guide

**When to load:** During Phase 3-4 when designing MCP server integration, tool execution, or multi-tenant tool isolation. Load when user mentions MCP, Model Context Protocol, tool execution, tool isolation, MCP server, MCP client.

**Integrates with:** Architect (Nova persona), Dev agent, Security agent, Platform architect

---

## Core Concepts

### What is MCP?

Model Context Protocol (MCP) is a standardized protocol for AI agents to discover, connect to, and invoke external tools and resources. In a multi-tenant SaaS context, MCP servers must be architected for tenant isolation, security, and scalability.

### MCP Architecture Components

| Component | Purpose | Multi-Tenant Consideration |
|-----------|---------|---------------------------|
| MCP Server | Exposes tools and resources | Tenant-scoped or shared with filtering |
| MCP Client | Agent-side protocol handler | Connection pooling per tenant |
| Tool Registry | Available tool catalog | Tenant-filtered discovery |
| Resource Provider | External data access | Tenant credential isolation |
| Tool Middleware | Authorization and audit | Per-tenant policy enforcement |

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Multi-Tenant MCP Architecture             │
│                                                              │
│   ┌───────────────┐     ┌─────────────────────────────┐     │
│   │   Agent A     │     │        MCP Gateway           │     │
│   │  (Tenant X)   │────►│   ┌───────────────────┐     │     │
│   └───────────────┘     │   │  Tenant Router    │     │     │
│                         │   └─────────┬─────────┘     │     │
│   ┌───────────────┐     │             │               │     │
│   │   Agent B     │────►│   ┌─────────▼─────────┐     │     │
│   │  (Tenant Y)   │     │   │  Tool Middleware  │     │     │
│   └───────────────┘     │   │  [Auth][Rate][Log]│     │     │
│                         │   └─────────┬─────────┘     │     │
│                         │             │               │     │
│                         │   ┌─────────▼─────────┐     │     │
│                         │   │  MCP Server Pool   │     │     │
│                         │   │  [Shared][Tenant]  │     │     │
│                         │   └───────────────────┘     │     │
│                         └─────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and must be followed for all MCP implementations in multi-tenant SaaS platforms.

### Tool Naming Convention

| Convention | Format | Example |
|------------|--------|---------|
| Platform tools | `{category}_{action}` | `document_search`, `data_validate` |
| Tenant tools | `tenant_{tenant_id}_{tool}` | `tenant_abc_crm_sync` |
| Tier-restricted | `{tier}_{tool}` | `enterprise_bulk_export` |
| Admin tools | `admin_{action}` | `admin_tenant_provision` |

### Tenant Context Propagation

Every MCP tool invocation MUST include tenant context:

| Context Field | Source | Validation |
|---------------|--------|------------|
| tenant_id | JWT claim | Required, verified against session |
| user_id | JWT claim | Required, verified against tenant |
| tier | Tenant metadata | Used for rate limiting and tool access |
| permissions | RBAC lookup | Tool-level authorization |
| session_id | Agent session | Audit correlation |

### MCP Security Standards

| Standard | Requirement | Implementation |
|----------|-------------|----------------|
| Credential isolation | Per-tenant secrets | Vault/KMS with tenant scoping |
| Input validation | All parameters | JSON Schema validation |
| Output sanitization | All responses | Tenant data filtering |
| Audit logging | All invocations | 90-day retention minimum |
| Rate limiting | Per-tenant quotas | Token bucket algorithm |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When should tenants have dedicated MCP servers? | When tenant provides custom tools or has strict compliance requirements | Dedicated servers provide process-level isolation and prevent tool conflicts between tenants |
| When is shared MCP server appropriate? | When only platform tools are used and tenant count is manageable | Shared servers reduce infrastructure cost while tenant context middleware ensures logical isolation |
| How to handle compliance requirements? | Per-tenant MCP server with full audit logging | Regulatory compliance often requires demonstrable isolation and complete audit trails |
| When to implement connection pooling? | High tool invocation volume (>100 calls/min per tenant) | Pooling reduces connection overhead and improves latency for high-frequency tool usage |
| Which sandbox level for code execution? | Container sandbox (Docker/Firecracker) minimum | Code execution requires strong isolation to prevent tenant escape and resource abuse |
| Direct vs pooled client? | Pooled for high-volume; direct for simplicity | Pool amortizes connection cost across requests |
| Gateway vs direct connection? | Gateway for complex routing; direct for simple cases | Gateway adds latency but simplifies management |
| When to require human approval? | External API calls, write operations to sensitive data, admin actions | Human-in-the-loop prevents irreversible actions and provides audit accountability |
| How to set tool execution timeouts? | 30s default, 60s for heavy operations, 10s for read-only | Prevents runaway executions while accommodating legitimate operations |

---

## §mcp-integration

### Pattern: MCP Integration

MCP integration patterns for connecting AI agents to external tools in multi-tenant environments.

### Server Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Shared MCP Server                           │
│                                                              │
│   ┌─────────────────────────────────────────────┐           │
│   │            Tenant Context Middleware         │           │
│   │   [Extract] ──► [Validate] ──► [Inject]     │           │
│   └─────────────────────────────────────────────┘           │
│                          │                                   │
│   ┌──────────────────────▼──────────────────────┐           │
│   │              Tool Registry                   │           │
│   │  ┌─────────────────────────────────────┐    │           │
│   │  │  Platform Tools (all tenants)       │    │           │
│   │  │  [search] [calculate] [format]      │    │           │
│   │  └─────────────────────────────────────┘    │           │
│   │  ┌─────────────────────────────────────┐    │           │
│   │  │  Tenant-Specific Tools              │    │           │
│   │  │  [tenant_A:crm] [tenant_B:erp]      │    │           │
│   │  └─────────────────────────────────────┘    │           │
│   └─────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### Connection Management

| Management Aspect | Strategy | Tenant Consideration |
|-------------------|----------|---------------------|
| Connection lifecycle | Per-agent or pooled | Cleanup on agent termination |
| Health monitoring | Active health checks | Per-tenant status tracking |
| Failover | Automatic reconnection | Tenant-aware retry policies |
| Load balancing | Round-robin or weighted | Tier-based prioritization |

### Tool Authorization Matrix

| Tool Type | Authorization | Context Required |
|-----------|---------------|------------------|
| Platform read | Auto-approve | tenant_id |
| Platform write | User confirmation | tenant_id, user_id |
| Tenant custom | Tool-specific policy | Full context |
| Admin | Role-based check | Admin role claim |
| External API | Manager approval | Full context + justification |

---

## §mcp-server-isolation

### Pattern: MCP Server Isolation

Isolation strategies for MCP servers in multi-tenant environments.

### Isolation Strategy Comparison

| Strategy | Description | Isolation Level | Cost | Use Case |
|----------|-------------|-----------------|------|----------|
| Shared Server | All tenants share, filtered | Logical | Low | Cost-efficient, low-risk tools |
| Tenant Server | Per-tenant instance | Process | High | Regulated industries |
| Hybrid | Shared common + tenant-specific | Mixed | Medium | Enterprise tier differentiation |

### Per-Tenant Server Architecture

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Tenant A    │  │  Tenant B    │  │  Tenant C    │
│  MCP Server  │  │  MCP Server  │  │  MCP Server  │
│  ┌────────┐  │  │  ┌────────┐  │  │  ┌────────┐  │
│  │ Tools  │  │  │  │ Tools  │  │  │  │ Tools  │  │
│  │ Config │  │  │  │ Config │  │  │  │ Config │  │
│  │ Creds  │  │  │  │ Creds  │  │  │  │ Creds  │  │
│  └────────┘  │  │  └────────┘  │  │  └────────┘  │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └─────────────────┼─────────────────┘
                         │
              ┌──────────▼──────────┐
              │    MCP Router       │
              │  (Tenant Dispatch)  │
              └─────────────────────┘
```

### Hybrid MCP Deployment

```
┌─────────────────────────────────────────┐
│            Hybrid MCP Setup              │
│                                          │
│  ┌──────────────┐    ┌───────────────┐  │
│  │ Core Server  │    │ Extension     │  │
│  │ (shared)     │    │ Registry      │  │
│  │ ┌──────────┐ │    │               │  │
│  │ │Core Tools│ │    │ ┌─────────┐   │  │
│  │ └──────────┘ │    │ │Tenant A │   │  │
│  └──────────────┘    │ │Extension│   │  │
│          │           │ └─────────┘   │  │
│          │           │ ┌─────────┐   │  │
│          └───────────│ │Tenant B │   │  │
│                      │ │Extension│   │  │
│                      │ └─────────┘   │  │
│                      └───────────────┘  │
└─────────────────────────────────────────┘
```

### Per-Tier MCP Configuration

| Tier | Server Type | Tool Access | Custom Tools | Pool Size |
|------|-------------|-------------|--------------|-----------|
| Free | Shared | Basic only | None | 2 |
| Pro | Shared | Standard | Limited (5) | 10 |
| Enterprise | Dedicated | Full + custom | Unlimited | 50 |

### Tool Permission Matrix

| Tool Category | Free | Pro | Enterprise |
|---------------|------|-----|------------|
| Read tools | Yes | Yes | Yes |
| Write tools | Limited | Yes | Yes |
| External APIs | No | Yes | Yes |
| Custom tools | No | Limited | Yes |
| Admin tools | No | No | Yes |

---

## §mcp-client

### Pattern: MCP Client

Client-side patterns for connecting agents to MCP servers with tenant context.

### Client Strategy Comparison

| Strategy | Description | Tenant Consideration | Use Case |
|----------|-------------|---------------------|----------|
| Direct Client | One client per agent | Per-agent lifecycle | Simple deployments |
| Pooled Client | Shared connection pool | Tenant-aware pooling | High-volume systems |
| Gateway Client | Central MCP gateway | Multi-tenant routing | Complex architectures |

### Connection Pool Architecture

```
┌─────────────────────────────────────────┐
│          MCP Connection Pool             │
│                                          │
│  Tenant A Pool          Tenant B Pool   │
│  ┌──────────────┐      ┌──────────────┐ │
│  │ Connection 1 │      │ Connection 1 │ │
│  │ Connection 2 │      │ Connection 2 │ │
│  │ Connection 3 │      │              │ │
│  └──────────────┘      └──────────────┘ │
│                                          │
│  Pool sizing based on tenant tier        │
└─────────────────────────────────────────┘
```

### Client Lifecycle Management

| Phase | Action | Tenant Consideration |
|-------|--------|---------------------|
| Initialize | Create client instance | Set tenant context |
| Connect | Establish MCP connection | Per-tenant authentication |
| Discover | Find available tools | Tenant-filtered tool list |
| Invoke | Call tools | Tenant in request headers |
| Cleanup | Close connections | Release tenant resources |

### Tool Discovery Patterns

| Discovery Type | Description | Cache Strategy |
|----------------|-------------|----------------|
| Startup Discovery | On client initialization | Cache per tenant |
| On-Demand Discovery | When tool needed | Lazy loading |
| Periodic Refresh | Scheduled update | Per-tenant schedule |
| Event-Driven | On tool change notification | Invalidate on event |

### Error Handling

| Error Type | Handling | Tenant Impact |
|------------|----------|---------------|
| Connection Failed | Retry with exponential backoff | Single tenant |
| Tool Not Found | Check permissions, refresh discovery | Tenant tool access |
| Timeout | Cancel and retry | Tenant budget tracking |
| Server Error | Circuit breaker pattern | Per-tenant state |
| Rate Limited | Queue with backoff | Tenant quota management |

---

## §tool-execution

### Pattern: Tool Execution

Patterns for secure and isolated tool execution in multi-tenant environments.

### Execution Models

| Model | Description | Isolation | Use Case |
|-------|-------------|-----------|----------|
| Direct | Agent calls tool directly | None | Trusted internal tools |
| Sandboxed | Tool runs in isolated environment | Process/Container | Untrusted input |
| Approved | Human approval required | Workflow | Sensitive actions |
| Tenant-Scoped | Tool filtered by tenant context | Logical | Custom integrations |

### Sandbox Configuration

| Sandbox Type | Memory | CPU | Network | Timeout |
|--------------|--------|-----|---------|---------|
| Light | 256MB | 0.5 | Allowed | 10s |
| Standard | 512MB | 1.0 | Restricted | 30s |
| Heavy | 2GB | 2.0 | Isolated | 60s |

### Sandboxed Execution Flow

```
┌─────────────────────────────────────────────────────────────┐
│               Sandboxed Execution Flow                       │
│                                                              │
│   Agent ──► Sandbox Manager ──► Isolated Runtime            │
│                   │                    │                     │
│                   │              ┌─────┴─────┐               │
│                   │              │ Container │               │
│                   │              │  or VM    │               │
│                   │              └─────┬─────┘               │
│                   └── Resource Limits ─┘                     │
└─────────────────────────────────────────────────────────────┘
```

### Approval Workflow States

```
┌─────────────────────────────────────────────────────────────┐
│               Approval Workflow States                       │
│                                                              │
│   ┌─────────┐    ┌──────────┐    ┌───────────┐              │
│   │ Pending │───►│ Approved │───►│ Executed  │              │
│   └────┬────┘    └──────────┘    └───────────┘              │
│        │                                                     │
│        ├────────►┌─────────┐                                 │
│        │         │ Denied  │                                 │
│        │         └────┬────┘                                 │
│        │              │                                      │
│        └──────────────┴────►┌─────────┐                     │
│                             │ Expired │                      │
│                             └─────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

### Tool Middleware Pipeline

| Stage | Purpose | Actions |
|-------|---------|---------|
| Authentication | Verify agent identity | Validate agent token |
| Authorization | Check permissions | TBAC policy check |
| Validation | Verify input | Schema validation |
| Rate limiting | Enforce limits | Check tenant quotas |
| Execution | Run tool | Invoke actual tool |
| Audit | Record action | Log to audit trail |

### Pre-Execution Checks

| Check | Description | Failure Response |
|-------|-------------|------------------|
| Agent identity | Valid agent session | Reject request |
| Tenant match | Tool tenant == agent tenant | Reject request |
| Tool enabled | Tool active for tenant | Reject request |
| Permission | Agent has capability | Reject request |
| Budget | Within run contract | Pause or reject |
| Rate limit | Under rate threshold | Queue or reject |

### Tool Categories and Approval

| Category | Approval Required | Audit Level | Examples |
|----------|-------------------|-------------|----------|
| Read-only | None | Standard | fetch_document, search |
| Write | None/User | Detailed | update_record, send_email |
| External | User/Manager | Detailed | call_api, webhook |
| Admin | Always | Full | delete_tenant, modify_config |
| Sensitive | Manager | Full | access_pii, financial_data |

---

## §tool-observability

### Pattern: Tool Observability

Monitoring, tracing, and alerting patterns for tool execution.

### Tool Execution Metrics Hierarchy

| Execution Phase | Key Metrics | Purpose |
|-----------------|-------------|---------|
| Tool Selection | tool_selection_latency, tool_selection_accuracy | LLM tool choice performance |
| Input Validation | input_validation_latency, validation_failures | Pre-execution safety |
| Execution | tool_execution_latency, success_rate | Core tool performance |
| Output Processing | output_processing_latency, output_sanitization | Post-execution handling |

### Core Execution Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tool_execution_latency_seconds | Histogram | tenant_id, tool_id, agent_id | Time to execute tool |
| tool_execution_total | Counter | tenant_id, tool_id, status | Execution count by status |
| tool_execution_errors_total | Counter | tenant_id, tool_id, error_type | Error count by type |
| tool_execution_timeout_total | Counter | tenant_id, tool_id | Timeout events |
| tool_retry_attempts_total | Counter | tenant_id, tool_id | Retry attempts |

### Permission and Security Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tool_permission_checks_total | Counter | tenant_id, tool_id, result | Permission check outcomes |
| tool_permission_denied_total | Counter | tenant_id, tool_id, reason | Denied executions |
| tool_approval_required_total | Counter | tenant_id, tool_id | Human approval requests |
| tool_approval_latency_seconds | Histogram | tenant_id, tool_id | Time awaiting approval |

### Sandbox Resource Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tool_sandbox_cpu_seconds | Counter | tenant_id, sandbox_id, tool_id | CPU time consumed |
| tool_sandbox_memory_bytes_max | Gauge | tenant_id, sandbox_id, tool_id | Peak memory usage |
| tool_sandbox_network_bytes | Counter | tenant_id, sandbox_id, direction | Network I/O |
| tool_sandbox_violations_total | Counter | tenant_id, sandbox_id, violation_type | Security violations |

### Alerting Patterns

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| ToolExecutionLatencyHigh | tool_execution_latency_seconds:p95 > 5s | WARNING | 5m |
| ToolExecutionLatencyCritical | tool_execution_latency_seconds:p95 > 30s | CRITICAL | 2m |
| ToolFailureRateHigh | rate(errors[5m]) / rate(total[5m]) > 0.1 | WARNING | 5m |
| ToolTimeoutSpike | rate(timeout_total[5m]) > 0.05 | WARNING | 5m |
| SandboxViolationDetected | increase(violations_total[1m]) > 0 | CRITICAL | immediate |

### Per-Tier SLA Alerts

| Tier | Execution p95 SLA | Failure Rate SLA | Alert Threshold |
|------|-------------------|------------------|-----------------|
| Enterprise | < 5s | < 1% | Immediate |
| Pro | < 15s | < 5% | 5m |
| Free | < 30s | < 10% | 15m |

### Dashboard Components

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Execution Latency Distribution | tool_execution_latency_seconds | Heatmap by tool_id |
| Success/Failure Rate | tool_execution_total by status | Stacked bar |
| Top Errors by Type | tool_execution_errors_total | Table |
| Permission Denials | tool_permission_denied_total | Table with reasons |
| CPU Usage by Tool | tool_sandbox_cpu_seconds | Time series |
| Security Violations | tool_sandbox_violations_total | Alert table |

---

## Quality Gates

### QG-M3 Verification Checklist

| Check | Criteria | Evidence |
|-------|----------|----------|
| MCP server isolation | Tenant isolation strategy documented and implemented | Architecture diagram, tenant context validation |
| Tool authorization | TBAC policies defined for all tool categories | Policy configuration, permission matrix |
| Credential isolation | Per-tenant credential storage verified | Vault configuration, access patterns |
| Audit logging | All tool invocations logged with tenant context | Log samples, retention policy |
| Rate limiting | Per-tenant rate limits configured | Rate limit configuration, test results |
| Sandbox configuration | Appropriate isolation level for each tool category | Sandbox specs, security review |
| Observability | Metrics and alerts configured | Dashboard, alert rules |

### Security Gate Checklist

- [ ] All tool parameters validated against schema
- [ ] Tenant boundary checks on every invocation
- [ ] Credential rotation policy defined
- [ ] Output sanitization preventing data leakage
- [ ] Sandbox escape prevention verified
- [ ] Rate limiting tested under load
- [ ] Audit log retention meets compliance requirements

---

## Web Research

| Topic | Query |
|-------|-------|
| MCP server isolation | `MCP server multi-tenant isolation {date}` |
| MCP client patterns | `Model Context Protocol integration patterns {date}` |
| Tool execution security | `AI agent tool execution security patterns {date}` |
| MCP observability | `MCP tool tracing best practices {date}` |
| Tool sandboxing | `AI agent tool sandboxing multi-tenant {date}` |
| LLM function calling | `LLM function calling observability {date}` |
| Agent tool authorization | `AI agent tool authorization patterns {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **MCP patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `mcp-server-isolation`, `mcp-client-patterns`
- **Tool patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tool-execution`
- **Agent patterns:** `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- **TBAC patterns:** `{project-root}/_bmad/bam/data/agent-guides/bam/agent-identity-tbac-patterns.md`
- **Action gateway:** `{project-root}/_bmad/bam/data/agent-guides/bam/action-gateway-patterns.md`

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design MCP server architecture and tool isolation
- `define-facade-contract` - Define MCP tool contracts and interfaces
- `bmad-bam-security-review` - Review MCP security controls and credential isolation
- `validate-tool-contract` - Verify tool security and contracts
- `bmad-bam-ai-agent-debug` - Debug tool execution failures and permission issues
- `bmad-bam-ai-eval-safety-design` - Tool safety validation

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 6 source files: mcp-integration.md, mcp-server-isolation.md, tool-execution-observability.md, mcp-client-patterns.md, tool-execution.md, tool-execution-middleware.md |
