---
pattern_id: tool-permission-model
shortcode: ZTP
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Tool Permission Model - BAM Pattern

**Loaded by:** ZTP  
**Applies to:** Granular tool access control in multi-tenant AI systems  
**See also:** [mcp-tenant-isolation.md](mcp-tenant-isolation.md), [rbac-per-tool.md](rbac-per-tool.md)

---

## When to Use

- Implementing role-based tool access
- Tier-based tool availability (free vs premium)
- User-level tool permissions within tenants
- Audit requirements for tool usage

## When NOT to Use

- All tools available to all users
- No tier differentiation
- Single-user systems

## Architecture

### Permission Hierarchy

```
Platform Level (BAM)
    │
    ├── Tier Level (Free/Pro/Enterprise)
    │       │
    │       ├── Tenant Level (Org-specific)
    │       │       │
    │       │       └── User Level (Role-based)
    │       │               │
    │       │               └── Tool: allow/deny
```

### Configuration Schema

```yaml
tool_permission_model:
  version: "1.0.0"
  bam_controlled: true
  
  permission_layers:
    - platform
    - tier
    - tenant
    - user
    
  default_policy: enum[allow, deny]
  
  tool_permissions:
    - tool_id: string
      tier_requirements: list[enum]
      roles_allowed: list[string]
      rate_limit_override: optional[int]
```

## Trade-offs

| Approach | Flexibility | Complexity | Performance |
|----------|-------------|------------|-------------|
| Static config | Low | Low | Fast |
| Dynamic policies | High | High | Medium |
| Hybrid | Balanced | Medium | Good |

## Web Research Queries

- "tool permission model AI agents {date}"
- "RBAC for LLM tools {date}"
- "tier-based feature access SaaS {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Tool permissions respect tier and tenant boundaries |

## Related Patterns

- [rbac-per-tool.md](rbac-per-tool.md) - Role-based access
- [mcp-tenant-isolation.md](mcp-tenant-isolation.md) - Tenant boundaries
