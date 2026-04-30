---
pattern_id: tenant-rbac
shortcode: ZTRC
category: security
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Tenant RBAC - BAM Pattern

**Loaded by:** ZTRC  
**Applies to:** Tenant-level role-based access control  
**See also:** [agent-rbac.md](agent-rbac.md), [sso-integration.md](sso-integration.md)

---

## When to Use

- Multi-tenant SaaS with user management
- Tenant-scoped permission hierarchies
- Cross-tenant admin scenarios (resellers, MSPs)
- Custom role definitions per tenant
- Tiered feature access control

## When NOT to Use

- Single-tenant applications
- Applications without user hierarchy
- Simple API key-only authentication
- Applications with uniform access levels

## Architecture

### Multi-Layer RBAC Model

```
┌─────────────────────────────────────────────────────────────┐
│                   Platform Level (BAM)                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Platform Admin │ Tenant Manager │ Support │ Billing   │  │
│  └───────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Tenant Level                              │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │     Tenant A        │  │     Tenant B        │          │
│  │  ┌───────────────┐  │  │  ┌───────────────┐  │          │
│  │  │ Tenant Admin  │  │  │  │ Tenant Admin  │  │          │
│  │  │ Custom Roles: │  │  │  │ Custom Roles: │  │          │
│  │  │ - Analyst     │  │  │  │ - Developer   │  │          │
│  │  │ - Viewer      │  │  │  │ - Manager     │  │          │
│  │  │ - Contributor │  │  │  │ - Viewer      │  │          │
│  │  └───────────────┘  │  │  └───────────────┘  │          │
│  └─────────────────────┘  └─────────────────────┘          │
├─────────────────────────────────────────────────────────────┤
│                    Resource Level                            │
│  Project A (Tenant A)     Project B (Tenant A)              │
│  - Project Admin          - Project Admin                   │
│  - Project Editor         - Project Viewer                  │
│  - Project Viewer                                           │
└─────────────────────────────────────────────────────────────┘
```

### Permission Resolution Flow

```
User Request
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │────▶│   Tenant    │────▶│  Resource   │
│   Roles     │     │   Roles     │     │   Roles     │
└─────────────┘     └─────────────┘     └─────────────┘
    │                     │                   │
    ▼                     ▼                   ▼
┌─────────────────────────────────────────────────────┐
│              Permission Aggregator                   │
│  Effective Permissions = Union(all roles)            │
│  + Deny rules take precedence                        │
└─────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────┐     ┌─────────────┐
│   ALLOW     │ or  │    DENY     │
│   + Audit   │     │   + Audit   │
└─────────────┘     └─────────────┘
```

### Role Definition Schema

```
┌─────────────────────────────────────────────────────────────┐
│                    Role Definition                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Name: "Tenant Editor"                                       │
│  Scope: tenant                                               │
│  Tier: [pro, enterprise]  ← Available in these tiers        │
│                                                              │
│  Permissions:                                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Resource    │ Actions          │ Conditions         │    │
│  │ projects    │ read, create     │                    │    │
│  │ documents   │ read, write      │ owner OR shared    │    │
│  │ agents      │ read, execute    │ tier >= pro        │    │
│  │ billing     │ DENY             │                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  Inherits From: ["Tenant Viewer"]                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Tier-Based Feature Gates

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Custom roles | - | 5 | Unlimited |
| Role inheritance | - | 2 levels | Unlimited |
| Attribute conditions | - | - | Yes |
| Cross-tenant admin | - | - | Yes |
| Audit log access | 7 days | 90 days | Unlimited |

## Configuration Schema

```yaml
tenant_rbac:
  bam_controlled: true
  
  platform_roles:
    - name: string
      permissions: permission[]
      tenant_scope: enum[all, managed, own]
      
  tenant_roles:
    - name: string
      tenant_id: uuid
      is_custom: bool
      permissions: permission[]
      inherits: string[]
      tier_required: enum[free, pro, enterprise]
      
  resource_roles:
    - name: string
      resource_type: string
      permissions: permission[]
      
  permission:
    resource: string
    actions: string[]
    conditions:
      owner_only: bool
      attribute_match: object
      time_window: string
      ip_allowlist: string[]
      
  assignment:
    user_id: uuid
    tenant_id: uuid
    roles: string[]
    resource_grants:
      - resource_id: uuid
        role: string
        
  delegation:
    enabled: bool
    max_role_level: string
    require_mfa: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Fixed roles | Simple, predictable | Inflexible | Small tenants |
| Custom roles | Flexible | Management overhead | Enterprise |
| ABAC hybrid | Dynamic, contextual | Complex | Security-critical |
| Inheritance | DRY, scalable | Debugging complex | Large hierarchies |

## Quality Checks

- [ ] All resources have owner assignment
- [ ] Custom roles scoped to tenant
- [ ] Platform roles cannot access tenant data
- [ ] Role changes trigger audit events
- [ ] Inheritance depth limited
- [ ] Tier restrictions enforced
- [ ] **CRITICAL:** Cross-tenant role assignment blocked

## Web Research Queries

- "multi-tenant RBAC SaaS patterns {date}"
- "custom role definition enterprise {date}"
- "tenant-scoped permission hierarchy {date}"
- "ABAC RBAC hybrid patterns {date}"
- "role inheritance best practices {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Tenant RBAC compliance verified |
| QG-S5 | Authorization security validated |

## Related Patterns

- [sso-integration.md](sso-integration.md) - Authentication federation
- [agent-rbac.md](agent-rbac.md) - AI agent permissions
- [zero-trust.md](zero-trust.md) - Security boundaries
