# BAM Tool Execution Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing AI agent tool execution, or when implementing sandboxing, approval workflows, or tenant-scoped tools.

**Integrates with:** Architect (Nova persona), Dev agent, Security agent

---

## Core Concepts

### What is Tool Execution?

Tool execution refers to how AI agents invoke external capabilities (APIs, functions, code execution) within a multi-tenant SaaS platform. Proper execution patterns ensure security, isolation, and governance.

### Execution Models

| Model | Description | Isolation | Use Case |
|-------|-------------|-----------|----------|
| Direct | Agent calls tool directly | None | Trusted internal tools |
| Sandboxed | Tool runs in isolated environment | Process/Container | Untrusted input |
| Approved | Human approval required | Workflow | Sensitive actions |
| Tenant-Scoped | Tool filtered by tenant context | Logical | Custom integrations |

---

## Application Guidelines

When implementing tool execution for AI agents:

1. **Use direct execution only for trusted tools**: Untrusted or tenant-provided tools need sandboxing
2. **Require approval for sensitive actions**: Write operations and external API calls may need human review
3. **Scope tools by tenant**: Agents should only see tools their tenant has access to
4. **Log all tool invocations**: Comprehensive audit trails are essential for debugging and compliance
5. **Implement resource limits in sandboxes**: Prevent runaway tool executions from consuming resources

---

## Implementation Patterns

### Pattern 1: Direct Execution

```
┌─────────────────────────────────────────────────────────┐
│                 Direct Execution Flow                    │
│                                                          │
│   Agent ──► Tool Registry ──► Tool ──► Result           │
│                   │                                      │
│                   └── Permission Check (fast path)       │
└─────────────────────────────────────────────────────────┘
```

**Applies when:**
- Tool is platform-provided and trusted
- No sensitive data modification
- High-frequency, low-latency requirements

### Pattern 2: Sandboxed Execution

```
┌─────────────────────────────────────────────────────────┐
│               Sandboxed Execution Flow                   │
│                                                          │
│   Agent ──► Sandbox Manager ──► Isolated Runtime        │
│                   │                    │                 │
│                   │              ┌─────┴─────┐           │
│                   │              │ Container │           │
│                   │              │  or VM    │           │
│                   │              └─────┬─────┘           │
│                   └── Resource Limits ─┘                 │
└─────────────────────────────────────────────────────────┘
```

**Sandbox Level Selection:**

| Level | Resource | Network | Timeout | Use Case |
|-------|----------|---------|---------|----------|
| Process | Shared memory | Allowed | 10s | Untrusted input |
| Container | 512MB limit | Restricted | 30s | Untrusted code |
| VM | Full isolation | Deny | 60s | High-risk tools |

### Pattern 3: Approval Workflow

```
┌─────────────────────────────────────────────────────────┐
│               Approval Workflow States                   │
│                                                          │
│   ┌─────────┐    ┌──────────┐    ┌───────────┐          │
│   │ Pending │───►│ Approved │───►│ Executed  │          │
│   └────┬────┘    └──────────┘    └───────────┘          │
│        │                                                 │
│        ├────────►┌─────────┐                             │
│        │         │ Denied  │                             │
│        │         └────┬────┘                             │
│        │              │                                  │
│        └──────────────┴────►┌─────────┐                 │
│                             │ Expired │                  │
│                             └─────────┘                  │
└─────────────────────────────────────────────────────────┘
```

**Approval Configuration:**

| Action Type | Approver | Timeout | Auto-Escalate |
|-------------|----------|---------|---------------|
| Data read | None (auto) | N/A | No |
| Data write | User | 5 min | Yes |
| External API | Manager | 1 hour | Yes |
| System config | Admin | 24 hours | Yes |

### Pattern 4: Tenant-Scoped Tools

```
┌─────────────────────────────────────────────────────────┐
│             Tenant-Scoped Tool Registry                  │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │            Platform Tools (Shared)           │       │
│   │   [search] [calculate] [format] [validate]  │       │
│   └─────────────────────────────────────────────┘       │
│                                                          │
│   ┌──────────────┐  ┌──────────────┐                    │
│   │  Tenant A    │  │  Tenant B    │                    │
│   │  [crm_api]   │  │  [erp_api]   │                    │
│   │  [slack]     │  │  [teams]     │                    │
│   └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

**Registration Schema:**

| Field | Description | Scope |
|-------|-------------|-------|
| tool_id | Unique identifier | Global |
| tenant_id | Owner tenant (null=platform) | Tenant |
| endpoint | API/function location | Tenant |
| credential_ref | Encrypted credential reference | Tenant |
| rate_limit | Per-tenant limit | Tenant |

---

## Security Considerations

### Credential Management

| Storage | Access | Rotation |
|---------|--------|----------|
| Vault/KMS | Tool executor only | Automatic |
| Encrypted DB | Service account | Policy-driven |
| Environment | Container-scoped | On deploy |

### Input Validation

- Sanitize all tool parameters before execution
- Validate against schema before sandbox entry
- Log validation failures for audit

---

## Performance Best Practices

| Strategy | Benefit | Trade-off |
|----------|---------|-----------|
| Tool result caching | Reduce API calls | Stale data risk |
| Connection pooling | Lower latency | Memory usage |
| Async execution | Non-blocking agents | Complexity |
| Batch requests | Efficiency | Higher latency |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design tool execution within agent runtime
- `bmad-bam-security-review` - Audit tool sandboxing and credential management
- `bmad-bam-ai-agent-debug` - Troubleshoot tool execution failures

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Modifies external data? | Require approval workflow |
| User-provided tool? | Maximum sandbox isolation |
| High-frequency calls? | Direct execution + caching |
| Tenant-specific API? | Tenant-scoped with credentials |
| Compliance sensitive? | Full audit logging |

---

## Related Patterns

- `action-gateway-patterns` guide for gateway architecture
- `run-contracts` guide for execution limits
- `tool-execution` pattern in `bam-patterns.csv`
- `agent-identity-tbac-patterns` for tool permissions
- **mcp-server-isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `mcp-server-isolation`
- **mcp-client-patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `mcp-client-patterns`

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `tool-execution` | `agent tool execution patterns multi-tenant SaaS {date}` |
| `tool-execution` | `MCP tool patterns multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.
