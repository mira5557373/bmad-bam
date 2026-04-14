# Tool Execution Middleware

**When to load:** When designing agent tool infrastructure, implementing tool authorization, or when user mentions tool middleware, action gateway, or tool security.

**Integrates with:** Architect (Nova persona), Security agent, Dev agent

---

## Core Concepts

### What is Tool Execution Middleware?

Tool execution middleware intercepts AI agent tool calls to enforce authorization, rate limiting, audit logging, and tenant isolation. It acts as a gateway between the agent's intent and actual tool execution.

### Middleware Pipeline

| Stage | Purpose | Actions |
|-------|---------|---------|
| Authentication | Verify agent identity | Validate agent token |
| Authorization | Check permissions | TBAC policy check |
| Validation | Verify input | Schema validation |
| Rate limiting | Enforce limits | Check quotas |
| Execution | Run tool | Invoke actual tool |
| Audit | Record action | Log to audit trail |

---

## Key Patterns

### Pattern 1: Pre-Execution Checks

| Check | Description | Failure Response |
|-------|-------------|------------------|
| Agent identity | Valid agent session | Reject |
| Tenant match | Tool tenant == agent tenant | Reject |
| Tool enabled | Tool active for tenant | Reject |
| Permission | Agent has capability | Reject |
| Budget | Within run contract | Pause/reject |
| Rate limit | Under rate threshold | Queue/reject |

### Pattern 2: Tool Categories

| Category | Approval | Audit Level | Examples |
|----------|----------|-------------|----------|
| Read-only | None | Standard | fetch_document, search |
| Write | None/approval | Detailed | update_record, send_email |
| External | Approval | Detailed | call_api, webhook |
| Admin | Always | Full | delete_tenant, modify_config |
| Sensitive | Approval | Full | access_pii, financial |

### Pattern 3: Approval Workflow

| State | Description | Actions |
|-------|-------------|---------|
| Pending | Tool call requested | Notify approver |
| Approved | Approver accepted | Execute tool |
| Rejected | Approver declined | Return to agent |
| Timeout | No response | Default action |
| Auto-approved | Policy allows | Execute immediately |

---

## Application Guidelines

- Designing agent tool framework
- Implementing tool authorization
- Building audit trails for agent actions
- Creating human-in-the-loop patterns
- Enforcing tenant tool isolation

---

## Per-Tier Tool Access

| Tier | Read Tools | Write Tools | External | Custom |
|------|------------|-------------|----------|--------|
| Free | Basic | Limited | None | None |
| Pro | All | All | Selected | 5 max |
| Enterprise | All | All | All | Unlimited |

---

## Middleware Configuration

| Config | Description | Default |
|--------|-------------|---------|
| timeout | Max tool execution time | 30s |
| retry | Retry failed tools | 0 |
| fallback | Action on failure | error |
| approval_timeout | Time for human approval | 5 min |
| audit_level | Logging verbosity | standard |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When to require human approval for tool execution? | External API calls, write operations to sensitive data, admin actions | Human-in-the-loop prevents irreversible actions and provides audit accountability |
| How to set tool execution timeouts? | 30s default, 60s for heavy operations, 10s for read-only | Prevents runaway executions while accommodating legitimate long-running operations |
| When to implement tool-level rate limiting? | Always, with per-tenant limits based on tier | Rate limiting prevents resource abuse and ensures fair usage across tenants |
| Should all tool executions be audited? | Yes, but with varying detail levels by tool category | Complete audit trail required for compliance; detail level balances storage vs. forensic needs |
| When to auto-approve vs. queue for approval? | Auto-approve read-only platform tools; queue external and write operations | Balances agent autonomy with security; read operations have lower risk profile |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tool patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tool-execution`
- **Related guides:** `agent-identity-tbac-patterns`, `agent-runtime-patterns`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent tool middleware patterns {date}"
- Search: "LLM tool authorization {date}"
- Search: "agent action gateway design {date}"

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design agent tool execution framework
- `bmad-bam-security-review` - Audit tool authorization and access controls
- `bmad-bam-ai-agent-debug` - Debug tool execution failures and permission issues
