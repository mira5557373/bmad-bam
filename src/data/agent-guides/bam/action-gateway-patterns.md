# BAM Action Gateway Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing AI agent tool execution, action governance, or implementing tool-based access control (TBAC) patterns.

**Integrates with:** Architect (Nova persona), Dev agent, Security agent

---

## Core Concepts

### What is an Action Gateway?

An Action Gateway is a centralized control point that governs all agent tool executions. It enforces policies, manages approvals, ensures tenant isolation, and provides audit logging for AI agent actions.

### Gateway Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Action Gateway                              │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Request Handler                        │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  ┌─────────────┬───────────┼───────────┬─────────────┐        │
│  ▼             ▼           ▼           ▼             ▼        │
│ ┌───┐       ┌───┐       ┌───┐       ┌───┐       ┌───┐        │
│ │Auth│      │TBAC│      │Rate│      │Audit│     │Exec│        │
│ │    │ ──► │    │ ──► │Limit│ ──► │Log │ ──► │    │        │
│ └───┘       └───┘       └───┘       └───┘       └───┘        │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Response Handler                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Application Guidelines

When implementing Action Gateway patterns in multi-tenant systems:

1. **Centralize all tool execution**: Route every agent action through the gateway for consistent policy enforcement
2. **Design for async approval**: Sensitive operations should support pending states and approval workflows
3. **Implement defense in depth**: Combine authentication, authorization, rate limiting, and audit logging
4. **Make policies configurable**: Allow per-tenant and per-tier policy customization
5. **Ensure full auditability**: Log every action attempt with context for compliance and debugging

---

## Tool-Based Access Control (TBAC)

### Permission Model

| Level | Scope | Example |
|-------|-------|---------|
| Platform | All tenants | Core tools (search, calculate) |
| Tenant | Single tenant | Custom integrations |
| User | Single user | Personal API keys |
| Session | Current session | Temporary elevated access |

### TBAC Policy Structure

```yaml
tool_policies:
  - tool_id: "web_search"
    default_permission: allow
    tier_overrides:
      free: deny
      pro: allow
      enterprise: allow
    rate_limits:
      free: 0
      pro: 100/hour
      enterprise: unlimited
    
  - tool_id: "database_query"
    default_permission: require_approval
    approval_roles: ["admin", "data_analyst"]
    tenant_scoped: true
    audit_level: detailed
    
  - tool_id: "external_api"
    default_permission: deny
    tier_overrides:
      enterprise: allow
    requires_credentials: true
    credential_scope: tenant
```

### Permission Resolution Flow

```
┌─────────────────────────────────────────────────────────────┐
│               Permission Resolution                          │
│                                                              │
│  1. Check tool exists                                        │
│     └── 404 if not found                                     │
│                                                              │
│  2. Check tenant tier permission                             │
│     └── 403 if tier denied                                   │
│                                                              │
│  3. Check user role permission                               │
│     └── 403 if role denied                                   │
│                                                              │
│  4. Check rate limits                                        │
│     └── 429 if exceeded                                      │
│                                                              │
│  5. Check approval requirement                               │
│     └── 202 Accepted (pending) if approval needed            │
│                                                              │
│  6. Execute tool                                             │
│     └── Return result                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Approval Workflows

### Approval States

```
┌─────────┐     ┌─────────┐     ┌──────────┐
│ Pending │────►│Approved │────►│ Executed │
└────┬────┘     └─────────┘     └──────────┘
     │
     │          ┌─────────┐
     └─────────►│ Denied  │
                └─────────┘
                     │
                     ▼
                ┌─────────┐
                │ Expired │
                └─────────┘
```

### Approval Configuration

| Approval Type | Trigger | Approvers | Timeout |
|---------------|---------|-----------|---------|
| Human-in-the-loop | Sensitive actions | User | Immediate |
| Manager approval | High-risk tools | User's manager | 24 hours |
| Admin approval | System tools | Platform admin | 48 hours |
| Auto-approve | Low-risk tools | System | N/A |

### Approval Request Schema

```json
{
  "approval_id": "apr_123",
  "tool_id": "database_write",
  "tenant_id": "tenant_456",
  "user_id": "user_789",
  "agent_run_id": "run_abc",
  "action": {
    "type": "INSERT",
    "table": "customers",
    "data_preview": "..."
  },
  "risk_assessment": {
    "level": "medium",
    "factors": ["data_modification", "pii_access"]
  },
  "status": "pending",
  "requested_at": "{date}-01-15T10:30:00Z",
  "expires_at": "{date}-01-16T10:30:00Z",
  "approvers": ["admin@company.com"]
}
```

---

## Tenant Isolation

### Isolation Boundaries

| Resource | Isolation Method |
|----------|------------------|
| Tool registry | Tenant-scoped tools |
| Credentials | Encrypted per-tenant |
| Rate limits | Per-tenant counters |
| Audit logs | Tenant-partitioned |
| Approval queues | Tenant-filtered |

### Tenant Context Propagation

```
Agent Request
    │
    ▼
┌─────────────────────────────────────┐
│         Action Gateway              │
│                                     │
│  tenant_id = extract_tenant(req)    │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ All downstream calls include │   │
│  │ tenant_id in context        │   │
│  └─────────────────────────────┘   │
│                                     │
│  tool.execute(params, tenant_id)    │
│  audit.log(event, tenant_id)        │
│  metrics.record(data, tenant_id)    │
└─────────────────────────────────────┘
```

### Cross-Tenant Prevention

```python
# Gateway MUST validate tenant on every request
def execute_tool(request):
    # Extract and validate tenant
    tenant_id = request.context.tenant_id
    if not tenant_id:
        raise SecurityError("Missing tenant context")
    
    # Verify tool is available for tenant
    tool = tool_registry.get(request.tool_id, tenant_id)
    if not tool:
        raise NotFoundError("Tool not available for tenant")
    
    # Verify credentials belong to tenant
    if request.credentials:
        validate_credential_ownership(
            request.credentials, 
            tenant_id
        )
    
    # Execute with tenant context
    return tool.execute(
        params=request.params,
        tenant_context=tenant_id
    )
```

---

## Rate Limiting

### Rate Limit Tiers

| Tier | Requests/min | Concurrent | Burst |
|------|--------------|------------|-------|
| Free | 10 | 1 | 2x for 10s |
| Pro | 100 | 5 | 3x for 30s |
| Enterprise | 1000 | 50 | 5x for 60s |

### Rate Limit Scopes

| Scope | Key Pattern | Use Case |
|-------|-------------|----------|
| Global | `global:{tool_id}` | Platform protection |
| Tenant | `tenant:{tenant_id}:{tool_id}` | Tenant isolation |
| User | `user:{user_id}:{tool_id}` | User fairness |
| Session | `session:{session_id}:{tool_id}` | Session control |

### Rate Limit Response

```json
{
  "error": "rate_limit_exceeded",
  "tool_id": "web_search",
  "tenant_id": "tenant_456",
  "limit": 100,
  "window": "1h",
  "current": 100,
  "reset_at": "{date}-01-15T11:00:00Z",
  "retry_after_seconds": 1800
}
```

---

## Audit Logging

### Audit Event Schema

```json
{
  "event_id": "evt_xyz",
  "event_type": "tool_execution",
  "timestamp": "{date}-01-15T10:30:00Z",
  "tenant_id": "tenant_456",
  "user_id": "user_789",
  "agent_run_id": "run_abc",
  "tool": {
    "id": "web_search",
    "version": "1.2.0"
  },
  "request": {
    "params": {"query": "..."},
    "params_hash": "sha256:..."
  },
  "response": {
    "status": "success",
    "duration_ms": 150,
    "result_preview": "..."
  },
  "context": {
    "ip_address": "10.0.0.1",
    "user_agent": "...",
    "session_id": "sess_123"
  }
}
```

### Audit Levels

| Level | What's Logged | Retention |
|-------|---------------|-----------|
| Minimal | Tool ID, status, timestamp | 30 days |
| Standard | + User, tenant, duration | 90 days |
| Detailed | + Params (redacted), result preview | 1 year |
| Full | + Raw params, full result | 7 years |

### Sensitive Data Handling

| Data Type | Handling |
|-----------|----------|
| PII | Redact or hash |
| Credentials | Never log |
| API keys | Mask (show last 4) |
| File contents | Log metadata only |
| Query params | Redact patterns |

---

## Sandboxing

### Sandbox Levels

| Level | Description | Use Case |
|-------|-------------|----------|
| None | Direct execution | Trusted tools |
| Process | Separate process | Untrusted input |
| Container | Isolated container | Untrusted code |
| VM | Full VM isolation | High-risk tools |

### Sandbox Configuration

```yaml
sandbox_policies:
  - tool_pattern: "code_*"
    level: container
    resources:
      cpu: "0.5"
      memory: "512Mi"
      timeout: 30s
      network: deny
    
  - tool_pattern: "web_*"
    level: process
    resources:
      timeout: 10s
      network: allow
      allowed_hosts:
        - "*.example.com"
```

---

## Error Handling

### Error Categories

| Category | HTTP Status | Retry |
|----------|-------------|-------|
| Validation error | 400 | No |
| Authentication | 401 | No |
| Authorization | 403 | No |
| Not found | 404 | No |
| Rate limited | 429 | Yes (after delay) |
| Tool error | 500 | Maybe |
| Timeout | 504 | Yes |

### Error Response Format

```json
{
  "error": {
    "code": "tool_execution_failed",
    "message": "Tool execution timed out",
    "tool_id": "web_search",
    "details": {
      "timeout_ms": 10000,
      "actual_ms": 10500
    }
  },
  "request_id": "req_xyz",
  "retry_after": 5,
  "documentation_url": "https://docs.example.com/errors/timeout"
}
```

---

## Monitoring & Observability

### Key Metrics

| Metric | Type | Labels |
|--------|------|--------|
| `gateway_requests_total` | Counter | tool_id, tenant_id, status |
| `gateway_latency_seconds` | Histogram | tool_id, tenant_id |
| `gateway_rate_limit_hits` | Counter | tool_id, tenant_id |
| `gateway_approval_pending` | Gauge | tool_id, tenant_id |
| `gateway_sandbox_usage` | Gauge | sandbox_level |

### Alerting Rules

| Alert | Condition | Severity |
|-------|-----------|----------|
| High error rate | > 5% errors | Critical |
| Approval backlog | > 100 pending | Warning |
| Rate limit spike | > 1000 hits/min | Warning |
| Sandbox escape attempt | Any | Critical |

---

## Integration Patterns

### MCP Tool Integration

```
┌─────────────────────────────────────────────────────────────┐
│                 MCP Tool Integration                         │
│                                                              │
│  Agent                                                       │
│    │                                                         │
│    ▼                                                         │
│  Action Gateway                                              │
│    │                                                         │
│    ├──► Internal Tools (direct execution)                   │
│    │                                                         │
│    └──► MCP Server Proxy ──► External MCP Servers           │
│              │                                               │
│              └── Tenant context injected                     │
│              └── Rate limits applied                         │
│              └── Audit logged                                │
└─────────────────────────────────────────────────────────────┘
```

### Custom Tool Registration

```yaml
custom_tools:
  - id: "tenant_crm_lookup"
    tenant_id: "tenant_456"
    type: http
    endpoint: "https://crm.customer.com/api/lookup"
    auth:
      type: bearer
      credential_ref: "tenant_456_crm_token"
    rate_limit: 50/min
    timeout: 5s
    sandbox_level: process
```

---

## Testing Requirements

### Unit Tests

- [ ] Permission resolution logic
- [ ] Rate limit calculations
- [ ] Approval workflow state machine
- [ ] Audit event generation
- [ ] Tenant isolation validation

### Integration Tests

- [ ] End-to-end tool execution
- [ ] Cross-tenant access prevention
- [ ] Rate limit enforcement
- [ ] Approval workflow flow
- [ ] Sandbox containment

### Security Tests

- [ ] Tenant isolation penetration testing
- [ ] Sandbox escape attempts
- [ ] Rate limit bypass attempts
- [ ] Credential exposure checks

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design agent execution and tool invocation patterns
- `bmad-bam-ai-eval-safety-design` - Evaluate and implement safety controls for AI actions
- `bmad-bam-security-review` - Review security controls for action gateway implementation

## Related Patterns

- `tool-execution` pattern in `bam-patterns.csv`
- `run-contracts` pattern for execution limits
- `agent-identity-tbac-patterns` for identity
- `tool-patterns.md` agent guide

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent tool governance patterns {date}"
- Search: "action gateway security multi-tenant {date}"
- Search: "tool-based access control AI agents {date}"

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Sensitive data access? | Require approval, detailed audit |
| External API calls? | Rate limit, sandbox, timeout |
| User-provided tools? | Maximum isolation, strict validation |
| High-frequency tools? | Optimize gateway path, cache permissions |
| Compliance requirements? | Full audit logging, approval workflows |
