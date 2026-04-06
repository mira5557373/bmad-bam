# BAM Multi-Tenant Discovery Context

**When to load:** During Phase 2 (Requirements Discovery) when analyzing multi-tenant SaaS requirements, or when user mentions tenants, tiers, or isolation.

**Integrates with:** Mary (Analyst), Saga (WDS Analyst), PM agents

---

## Core Concepts for Multi-Tenant Discovery

### Tenant Model Patterns

| Pattern | Use When | Isolation Level | Complexity |
|---------|----------|-----------------|------------|
| **Row-Level Security** | Most SaaS, <1000 tenants | Shared tables, filtered queries | Low |
| **Schema-Per-Tenant** | Regulated industries, compliance needs | Separate schemas, same DB | Medium |
| **Database-Per-Tenant** | Enterprise SaaS, max isolation | Dedicated databases | High |

### Tenant Persona Hierarchy

```
Organization (Billing Entity)
  └── Workspace (Collaboration Boundary)
      └── User (Individual Access)
          └── API Key (Programmatic Access)
```

Most SaaS platforms use at least Organization + User. Add Workspace when:
- Teams within an org need data separation
- Different billing centers within one org
- White-label reseller scenarios

### Discovery Questions to Ask

1. **Who pays?** (Identifies Organization level)
2. **Who collaborates?** (Identifies Workspace level)
3. **What data is shared vs isolated?** (Defines isolation boundaries)
4. **What features vary by pricing tier?** (Defines entitlements)
5. **What compliance requirements exist?** (Defines isolation level)

---

## Tier-Based Feature Differentiation

### Standard SaaS Tier Model

| Capability | Free | Pro | Enterprise |
|------------|------|-----|------------|
| Users | 5 | 50 | Unlimited |
| Storage | 1GB | 10GB | 100GB |
| AI Tokens/month | 10K | 100K | 1M |
| API Rate Limit | 10/min | 100/min | 1000/min |
| Support | Community | Email | Dedicated |
| Custom Domain | No | Yes | Yes |
| SSO/SAML | No | No | Yes |
| Audit Logs | No | 30 days | Unlimited |
| Data Retention | 30 days | 1 year | Custom |

### Feature Flag Strategy

- **Soft limits**: Enforce quotas, show upgrade prompts
- **Hard limits**: Block action, require upgrade
- **Tier gates**: Feature completely unavailable until upgrade
- **Graceful degradation**: Reduced functionality at limit

---

## Application Guidelines

When Mary/Saga discovers requirements:

1. **Always identify tenant hierarchy first** - Don't assume single-level
2. **Map data ownership explicitly** - Which entity owns each data type?
3. **Document isolation requirements** - Legal, compliance, competitive
4. **Capture tier differentiation** - Features, limits, SLAs per tier
5. **Note cross-tenant scenarios** - Admin views, aggregations, marketplace

### Red Flags to Watch For

- "Just use user_id everywhere" → Missing org/workspace level
- "All tenants share the same..." → Missing isolation requirement
- "We'll add tiers later" → Build tier awareness from day one
- "Admin can see everything" → Audit logging required

---

## Integration with BAM Workflows

After discovery, route to:
- `bmad-bam-create-master-architecture` → Foundation design
- `bmad-bam-tenant-model-isolation` → Isolation strategy
- `bmad-bam-module-boundary-design` → Context boundaries

---

## Checklist for Discovery Completion

- [ ] Tenant hierarchy documented (org/workspace/user)
- [ ] Isolation requirements captured per data type
- [ ] Pricing tiers defined with feature matrix
- [ ] Compliance requirements listed
- [ ] Cross-tenant scenarios identified
- [ ] Admin/support access rules defined
