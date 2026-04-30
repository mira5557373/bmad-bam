---
pattern_id: rbac-per-tool
shortcode: ZRT
category: security
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# RBAC Per Tool - BAM Pattern

**Loaded by:** ZRT  
**Applies to:** Multi-tenant AI systems requiring tool permission control  
**See also:** [action-contract.md](action-contract.md), [tool-execution.md](tool-execution.md)

---

## When to Use

- AI agents with powerful/dangerous tools
- Multi-tenant systems with tiered capabilities
- Platforms requiring per-user tool restrictions
- Systems with tools that modify external state

## When NOT to Use

- Single-tenant internal tools
- Read-only agent deployments
- Sandbox/development environments

## Architecture

### Permission Evaluation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    RBAC Tool Permission                      │
│                                                              │
│  Tool Request                                                │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Tenant Tier │───►│ User Role   │───►│ Tool Policy │      │
│  │ Check       │    │ Check       │    │ Evaluation  │      │
│  └─────────────┘    └─────────────┘    └──────┬──────┘      │
│                                               │              │
│                     ┌─────────────────────────┘              │
│                     ▼                                        │
│            ┌─────────────────┐                               │
│            │ ALLOW │ DENY │ REQUIRE_APPROVAL                │
│            └─────────────────┘                               │
│                                                              │
│  Conditions: [Time Window] [Budget] [Rate Limit] [Approval] │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-03)

```yaml
rbac_per_tool:
  version: "1.0.0"
  bam_controlled: true
  
  permission_model:
    hierarchy:
      - platform_admin
      - tenant_admin
      - tenant_user
      - agent
      
    tool_permissions:
      tool_id: string
      allowed_roles: list[string]
      denied_roles: list[string]
      conditions: list[condition]
      
    condition:
      type: enum[time_window, request_count, approval_required, budget_check]
      params: map[string, any]
      
  tenant_scoping:
    per_tenant_tools: bool
    tool_inheritance: bool
    tier_restrictions:
      free: list[string]
      pro: list[string]
      enterprise: list[string]
      
  evaluation:
    mode: enum[allow_list, deny_list, hybrid]
    cache_ttl_seconds: int
    audit_all: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Static allow-list | Simple, fast | Inflexible | Small tool sets |
| Dynamic RBAC | Flexible | Complexity | Enterprise deployments |
| Approval workflows | Maximum control | Latency | High-risk tools |
| Tier-based | Easy to understand | Coarse-grained | SaaS tiering |

## Web Research Queries

- "AI agent tool RBAC patterns {date}"
- "LangGraph tool permissions implementation {date}"
- "MCP tool access control multi-tenant {date}"
- "agent capability management enterprise {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Tool permissions verified, RBAC tests pass |

## Related Patterns

- [action-contract.md](action-contract.md) - Action validation
- [tool-execution.md](tool-execution.md) - Tool runtime patterns
