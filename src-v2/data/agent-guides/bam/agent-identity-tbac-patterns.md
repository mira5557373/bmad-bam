# Agent Identity TBAC Patterns

**When to load:** When designing tool-based access control for AI agents, implementing agent identity systems, or when user mentions agent permissions, tool authorization, or TBAC.

**Integrates with:** Architect (Nova persona), Security agent, Dev agent

---

## Core Concepts

### What is Agent Identity TBAC?

Tool-Based Access Control (TBAC) governs which tools an AI agent can invoke based on the agent's identity, the current tenant context, and runtime constraints. This ensures agents operate within authorized boundaries while preventing privilege escalation.

### TBAC vs Traditional RBAC

| Aspect | Traditional RBAC | Agent TBAC |
|--------|------------------|------------|
| Subject | Human user | AI agent instance |
| Object | Data/resources | Tools/functions |
| Context | Static roles | Dynamic (tenant + run contract) |
| Verification | Login time | Per-invocation |
| Audit | Action logs | Full reasoning trace |

---

## Application Guidelines

When implementing Agent Identity TBAC patterns:

1. **Assign unique identity to every agent instance**: Enable precise tracking and authorization
2. **Bind agents to tenant context**: Ensure agents cannot access resources outside their tenant
3. **Check permissions per-invocation**: Runtime verification prevents stale authorization
4. **Design approval workflows for sensitive tools**: Allow human oversight for high-risk operations
5. **Maintain comprehensive audit trails**: Log agent identity, tool invocations, and reasoning for compliance

---

## Key Patterns

### Pattern 1: Agent Identity Registry

Every agent instance has a verifiable identity:

| Identity Component | Description | Example |
|-------------------|-------------|---------|
| Agent ID | Unique identifier | `agent_abc123` |
| Agent Type | Classification | `customer-support`, `data-analyst` |
| Tenant Binding | Associated tenant | `tenant_xyz789` |
| Capability Set | Authorized tools | `[read_kb, send_email]` |
| Trust Level | Authorization tier | `standard`, `elevated`, `restricted` |

### Pattern 2: Tool Permission Matrix

| Tool Category | Free Tier | Pro Tier | Enterprise Tier |
|---------------|-----------|----------|-----------------|
| Read-only tools | All | All | All |
| Write tools | Limited | All | All + custom |
| External APIs | None | Selected | All + private |
| Admin tools | None | None | With approval |
| Custom tools | None | 5 max | Unlimited |

### Pattern 3: Runtime Authorization

Per-invocation checks before tool execution:

| Check | Description | Failure Action |
|-------|-------------|----------------|
| Tenant match | Tool tenant == agent tenant | Reject |
| Budget check | Within run contract limits | Pause/reject |
| Tool allowlist | Tool in agent capability set | Reject |
| Rate limit | Under rate threshold | Queue/reject |
| Approval check | Sensitive tools approved | Queue for approval |

---

## When to Apply

- Designing agent tool execution middleware
- Implementing tenant-scoped tool registries
- Building approval workflows for sensitive operations
- Creating audit trails for agent actions
- Integrating with existing IAM systems

---

## Decision Framework

| Scenario | TBAC Approach | Rationale |
|----------|---------------|-----------|
| Public-facing agents | Restrictive allowlist | Minimize attack surface |
| Internal automation | Broad permissions + audit | Productivity over friction |
| Regulated industries | Approval-required for writes | Compliance mandates |
| Multi-tenant platform | Tenant-scoped registries | Isolation guarantee |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design overall agent identity and runtime patterns
- `bmad-bam-tenant-model-isolation` - Implement tenant-scoped TBAC policies
- `bmad-bam-security-review` - Validate TBAC security controls

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Agent patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tool-execution`, `agent-runtime`
- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent identity management patterns {date}"
- Search: "tool-based access control LLM agents {date}"
- Search: "multi-tenant agent authorization {date}"
