# Multi-Tenant Patterns

**When to load:** When designing tenant isolation strategy, selecting isolation model, or when user mentions schema-per-tenant, database-per-tenant, or tenant separation.

**Integrates with:** Architect (Atlas persona), Security agent, Dev agent

---

## Core Concepts

### What is Multi-Tenancy?

Multi-tenancy enables a single application instance to serve multiple customers (tenants) while maintaining data isolation, security, and customization. The isolation model balances security, cost, and operational complexity.

### Isolation Models

| Model | Isolation Level | Cost | Complexity |
|-------|-----------------|------|------------|
| Row-Level Security | Low | Lowest | Low |
| Schema-per-Tenant | Medium | Medium | Medium |
| Database-per-Tenant | High | Highest | High |
| Hybrid | Variable | Variable | High |

### Multi-Tenant Architecture Overview

```
Request → Gateway → Tenant Resolver → Tenant Context
                                            │
              ┌─────────────────────────────┼─────────────────────────────┐
              │                             │                             │
        ┌─────▼─────┐               ┌───────▼───────┐             ┌───────▼───────┐
        │    RLS    │               │ Schema-per-   │             │ DB-per-       │
        │  Shared   │               │   Tenant      │             │   Tenant      │
        │  Tables   │               │   Isolated    │             │   Complete    │
        │tenant_id  │               │   Schemas     │             │   Isolation   │
        └───────────┘               └───────────────┘             └───────────────┘
```

---

## Key Patterns

### Pattern 1: Row-Level Security (RLS)

| Aspect | Implementation | Consideration |
|--------|----------------|---------------|
| Data model | `tenant_id` column | All tables |
| Isolation | Database policies | Transparent to app |
| Scaling | Shared resources | <10K tenants |
| Backup/Restore | Table-level | Complex per-tenant |

### RLS Implementation Checklist

- [ ] All tables have `tenant_id` column
- [ ] RLS policies enabled on all tables
- [ ] Session variable set at connection start
- [ ] Policies enforced on SELECT, INSERT, UPDATE, DELETE
- [ ] Indexes include `tenant_id` for query performance
- [ ] Audit logging captures tenant context

### Pattern 2: Schema-per-Tenant

| Aspect | Implementation | Consideration |
|--------|----------------|---------------|
| Data model | Schema per tenant | Schema routing |
| Isolation | Schema boundaries | Stronger isolation |
| Scaling | Schema pool | 100s of tenants |
| Backup/Restore | Schema dump | Per-tenant possible |

### Pattern 3: Database-per-Tenant

| Aspect | Implementation | Consideration |
|--------|----------------|---------------|
| Data model | Separate database | Connection routing |
| Isolation | Complete separation | Maximum security |
| Scaling | Database per tenant | Enterprise tier |
| Backup/Restore | Full DB backup | Simple per-tenant |

---

## Decision Criteria

### Selection Matrix

| Factor | RLS | Schema | Database |
|--------|-----|--------|----------|
| Tenant count | High | Medium | Low |
| Cost per tenant | Lowest | Medium | Highest |
| Isolation level | Logical | Logical | Physical |
| Compliance | Basic | Better | Best |
| Noisy neighbor | Risk | Reduced | None |

### When to Choose Each Model

| Scenario | Recommended Model | Rationale |
|----------|-------------------|-----------|
| Startup, MVP | RLS | Fast, cost-effective |
| B2B SaaS, moderate compliance | Schema-per-tenant | Balance of isolation and cost |
| Healthcare, finance | Database-per-tenant | Compliance requirements |
| Mixed tiers | Hybrid | Tier-appropriate isolation |

### Migration Path Considerations

| Migration | Complexity | Downtime | Data Risk |
|-----------|------------|----------|-----------|
| RLS → Schema | Medium | Minutes | Low |
| Schema → Database | High | Hours | Medium |
| RLS → Database | Very High | Hours | Medium |

---

## Application Guidelines

- Designing new multi-tenant platform
- Evaluating isolation requirements
- Planning tenant data migration
- Addressing compliance requirements
- Scaling tenant infrastructure

---

## Hybrid Approaches

| Approach | Description | Use Case |
|----------|-------------|----------|
| Tier-based | RLS for free, DB for enterprise | Tiered pricing |
| Hot/Cold | RLS for active, archive for inactive | Cost optimization |
| Data-class | RLS for metadata, schema for PII | Compliance |

### Hybrid Implementation Example

```
Tenant Request
    │
    ├── Resolve tenant tier
    │
    ├── If Free/Pro tier:
    │   └── Route to shared RLS database
    │
    └── If Enterprise tier:
        └── Route to dedicated database
```

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Missing tenant_id index | Query performance | Composite indexes with tenant_id |
| RLS bypass in admin | Security hole | Separate admin connection |
| Shared connection pool | Context leakage | Tenant-aware pooling |
| No cross-tenant query prevention | Data leakage | Query analysis, audit |
| Hardcoded tenant in tests | Test pollution | Dynamic tenant fixtures |
| Ignoring noisy neighbor | Performance variance | Per-tenant resource limits |

### Security Verification Checklist

- [ ] RLS policies tested with cross-tenant queries
- [ ] Connection strings never contain tenant data
- [ ] Audit log captures all data access
- [ ] Backup encryption per tenant
- [ ] Network isolation for DB-per-tenant
- [ ] Regular penetration testing

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Tenant Routing | Connection selection | Correct database routing |
| Context Propagation | Tenant ID flow | Consistent isolation |
| RLS Best Practices | Policy implementation | Security enforcement |
| Testing Tenant Isolation | Verification | Security validation |
| Observability | Per-tenant metrics | Performance monitoring |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which isolation model for a new SaaS product? | Start with RLS, plan for schema migration path | RLS is cost-effective for launch; schema-per-tenant available when needed for compliance |
| When to offer database-per-tenant? | Enterprise tier with compliance requirements or data residency needs | Maximum isolation justifies higher cost for regulated industries |
| Should all tenants use same isolation model? | No, use hybrid with tier-based isolation | Match isolation level to tenant requirements and willingness to pay |
| How to handle noisy neighbor risk in RLS? | Per-tenant resource quotas and query timeouts | Prevents single tenant from degrading shared infrastructure |
| When to migrate a tenant to higher isolation? | On tier upgrade, compliance requirement, or performance issues | Triggered by business need rather than preemptive migration |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`
- **tenant-routing:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-routing`
- **Related guides:** `rls-best-practices`, `testing-tenant-isolation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant database patterns {date}"
- Search: "schema-per-tenant PostgreSQL {date}"
- Search: "multi-tenant isolation comparison {date}"
- Search: "noisy neighbor prevention multi-tenant {date}"

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Select and implement isolation model
- `bmad-bam-tenant-tier-migration` - Handle tenant migration between isolation levels
- `bmad-bam-tenant-onboarding-design` - Provision tenant infrastructure based on pattern
- `bmad-bam-security-review` - Validate isolation implementation security
- `bmad-bam-performance-baseline` - Verify noisy neighbor prevention
