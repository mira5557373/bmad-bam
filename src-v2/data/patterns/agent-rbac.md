---
pattern_id: agent-rbac
shortcode: ZRB
category: security
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Agent RBAC - BAM Pattern

**Loaded by:** ZRB  
**Applies to:** Role-based access control for AI agents  
**See also:** [tenant-rbac.md](tenant-rbac.md), [rbac-per-tool.md](rbac-per-tool.md)

---

## When to Use

- AI agents accessing tenant resources
- Multi-agent systems with different permission levels
- Tool execution requiring authorization checks
- Agent actions needing audit trails
- Hierarchical agent permission structures

## When NOT to Use

- Single-purpose agents with fixed capabilities
- Internal testing environments
- Agents with no external data access
- Simple chatbots without tool use

## Architecture

### Agent Permission Model

```
┌─────────────────────────────────────────────────────────────┐
│                   Agent Permission Matrix                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   Agent Identity                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ agent_id │ tenant_id │ role │ capability_set   │  │  │
│  │  │ agent_1  │ tenant_a  │ read │ [search, query]  │  │  │
│  │  │ agent_2  │ tenant_a  │ write│ [create, update] │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │              Tool Permission Binding                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Tool        │ Required Role │ Audit Level      │  │  │
│  │  │ search_db   │ read          │ standard         │  │  │
│  │  │ write_file  │ write         │ detailed         │  │  │
│  │  │ send_email  │ admin         │ critical         │  │  │
│  │  │ delete_data │ admin         │ critical         │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │             Runtime Authorization Check                │  │
│  │  agent.role >= tool.required_role → ALLOW             │  │
│  │  agent.role < tool.required_role  → DENY + LOG        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Permission Inheritance

```
Tenant Admin
    │
    ├── Agent Admin Role
    │       ├── Create agents
    │       ├── Assign agent roles
    │       └── View agent audit logs
    │
    ├── Agent Operator Role
    │       ├── Execute agents
    │       ├── View results
    │       └── Cannot modify
    │
    └── Agent Viewer Role
            └── View-only access
```

### Authorization Flow

```
Agent Tool Call
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Extract   │────▶│   Check     │────▶│   Tenant    │
│   Context   │     │   Role      │     │   Boundary  │
└─────────────┘     └─────────────┘     └─────────────┘
                          │                    │
              ┌───────────┴───────────┐       │
             ALLOW                   DENY      │
              │                       │        │
              ▼                       ▼        ▼
        ┌──────────┐           ┌──────────┐
        │ Execute  │           │  Log +   │
        │  Tool    │           │  Reject  │
        └──────────┘           └──────────┘
```

### Role Hierarchy

| Role Level | Capabilities | Budget | Audit |
|------------|--------------|--------|-------|
| viewer | Read-only queries | Low | Basic |
| operator | Read + execute | Medium | Standard |
| editor | Read + write | High | Detailed |
| admin | All capabilities | Unlimited | Critical |

## Configuration Schema

```yaml
agent_rbac:
  bam_controlled: true
  
  roles:
    - name: string
      level: int  # Higher = more permissions
      capabilities: string[]
      budget_multiplier: float
      
  agent_assignment:
    agent_id: uuid
    tenant_id: uuid
    role: string
    scope: enum[tenant, project, resource]
    resource_filter: string[]
    
  tool_permissions:
    - tool_name: string
      required_role: string
      audit_level: enum[basic, standard, detailed, critical]
      budget_cost: float
      rate_limit: int
      
  inheritance:
    enabled: bool
    hierarchy:
      - parent: string
        children: string[]
        
  delegation:
    enabled: bool
    max_depth: int
    require_approval: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Flat roles | Simple, fast | Limited flexibility | Small deployments |
| Hierarchical roles | Scalable, organized | Complex management | Enterprise |
| Capability-based | Fine-grained | Many permissions | Security-critical |
| Attribute-based (ABAC) | Dynamic, contextual | Performance overhead | Complex policies |

## Quality Checks

- [ ] Every agent has explicit role assignment
- [ ] Tool permissions bound to roles
- [ ] Cross-tenant agent access blocked
- [ ] Permission changes audited
- [ ] Role hierarchy prevents escalation
- [ ] Budget limits per role enforced
- [ ] **CRITICAL:** No implicit admin permissions

## Web Research Queries

- "AI agent RBAC patterns enterprise {date}"
- "LangGraph tool permissions design {date}"
- "multi-agent authorization frameworks {date}"
- "agent capability-based security {date}"
- "LLM tool access control best practices {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Agent RBAC compliance verified |
| QG-AI1 | Agent security controls validated |

## Related Patterns

- [tenant-rbac.md](tenant-rbac.md) - User access control
- [rbac-per-tool.md](rbac-per-tool.md) - Tool-level permissions
- [agent-orchestration.md](agent-orchestration.md) - Agent coordination
