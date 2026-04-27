# BAM Tenant Hierarchy Patterns Guide

**When to load:** During reseller/partner architecture design, multi-level tenant implementation, or sub-tenant management tasks. Load when user mentions tenant hierarchy, sub-tenants, resellers, parent-child relationships, or hierarchical multi-tenancy.

**Integrates with:** bmad-agent-pm (Product Management), bmad-agent-architect (Architecture), bmad-agent-analyst (Business Analysis)

---

## Core Concepts

### Tenant Hierarchy Architecture

Multi-level tenant hierarchies enable reseller and enterprise deployment models where one tenant can manage sub-tenants. This pattern is essential for partner programs, white-label deployments, and enterprise organization structures.

### Hierarchy Models

#### Two-Level Hierarchy (Reseller Model)

```
Platform
    └── Reseller (Level 1)
            └── Customer Tenant (Level 2)
```

This is the most common pattern for partner/reseller programs where partners onboard their own customers but all tenants share the same platform infrastructure.

#### Three-Level Hierarchy (Enterprise Model)

```
Platform
    └── Enterprise (Level 1)
            └── Business Unit (Level 2)
                    └── Team/Department (Level 3)
```

Used by large enterprises with complex organizational structures requiring data isolation between business units while maintaining enterprise-wide visibility.

### Permission Inheritance Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Strict Inheritance | Child inherits all parent permissions | Simple hierarchy, audit simplicity |
| Additive Override | Child can add permissions beyond parent | Delegated administration |
| Restrictive Override | Child can only restrict, not expand | Security-focused deployments |
| No Inheritance | Each level defines permissions independently | Maximum isolation |

### Data Visibility Rules

| Visibility Level | Parent Can See Child | Child Can See Parent | Sibling Isolation |
|------------------|---------------------|---------------------|-------------------|
| Full Isolation | No | No | Complete |
| Parent Visible | Yes | No | Complete |
| Hierarchy Aware | Yes (all descendants) | Limited metadata | Complete |
| Federated | Yes | Yes (limited) | Optional |

## Application Guidelines

When designing tenant hierarchies:

1. **Define Maximum Depth** - Limit hierarchy depth to prevent performance issues. Recommended maximum is 4 levels. Each additional level increases query complexity and permission calculation overhead.

2. **Plan Permission Model** - Decide early whether permissions inherit, cascade, or are independent at each level. This decision affects database schema design and query patterns significantly.

3. **Design Billing Rollup** - Determine how billing aggregates: direct billing per tenant, consolidated at parent, or hybrid approaches. Consider grace periods and dispute resolution across hierarchy levels.

4. **Consider Data Residency** - Sub-tenants may have different data residency requirements than parents. Design for geographic distribution from the start if this is a possibility.

5. **Plan Admin Delegation** - Define what administrative functions parents can delegate to child tenants. Document escalation paths and audit requirements for delegated actions.

6. **Design Reporting Aggregation** - Parent tenants often need aggregated views across children. Plan for efficient rollup queries and consider pre-aggregation strategies.

## Decision Framework

| Scenario | Recommended Model | Rationale |
|----------|------------------|-----------|
| Simple reseller program | Two-level, parent visible | Balance isolation and management |
| Enterprise multi-BU | Three-level, hierarchy aware | Organizational mapping |
| Regulated industries | Full isolation | Compliance requirements |
| Franchise model | Two-level, additive override | Local customization needs |
| SaaS marketplace | Flat + app permissions | App-level isolation sufficient |

### Performance Considerations

| Hierarchy Depth | Query Impact | Mitigation |
|-----------------|--------------|------------|
| 2 levels | Minimal | Standard RLS |
| 3 levels | Moderate | Materialized paths |
| 4+ levels | Significant | Closure tables, caching |

### Implementation Patterns

| Pattern | Pros | Cons |
|---------|------|------|
| Adjacency List | Simple, flexible | Deep queries expensive |
| Nested Sets | Fast reads | Slow writes/updates |
| Materialized Path | Good balance | Path length limits |
| Closure Table | Flexible queries | Storage overhead |

## Related Workflows

- `bmad-bam-tenant-hierarchy-design` - Design tenant hierarchy
- `bmad-bam-tenant-portal-design` - Design tenant management portal
- `bmad-bam-marketplace-design` - Design marketplace architecture
- `bmad-bam-partner-integration-framework` - Partner API design

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Hierarchy patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `tenant-isolation`, `customization`
- **Reseller patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `reseller`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant hierarchy patterns SaaS {date}"
- Search: "reseller tenant architecture {date}"
- Search: "hierarchical multi-tenancy database design {date}"
