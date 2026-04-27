# BAM Data Integrity Patterns Guide

**When to load:** During data architecture design, validation implementation, consistency controls, or when implementing data integrity patterns for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), James (Dev), data-bam extension.

---

## Core Concepts

### Data Integrity Dimensions

| Dimension | Definition | Multi-Tenant Challenge |
|-----------|------------|------------------------|
| Accuracy | Data reflects reality | Validation per tenant schema |
| Consistency | Data is uniform across systems | Cross-tenant data sync |
| Completeness | All required data present | Tenant-specific required fields |
| Timeliness | Data is current | Tenant timezone handling |
| Validity | Data conforms to rules | Tenant-configurable validation |

### Multi-Tenant Integrity Boundaries

```
┌─────────────────────────────────────────────────┐
│              Data Integrity Layers               │
│                                                  │
│  ┌────────────────────────────────────────┐     │
│  │         Platform Integrity              │     │
│  │  - Cross-tenant consistency             │     │
│  │  - Reference data management            │     │
│  │  - Schema evolution                     │     │
│  └─────────────────┬──────────────────────┘     │
│                    │                            │
│  ┌─────────────────┴──────────────────┐        │
│  │        Tenant Integrity             │        │
│  │  - Tenant-specific validation       │        │
│  │  - Custom field constraints         │        │
│  │  - Referential integrity            │        │
│  └─────────────────┬──────────────────┘        │
│                    │                            │
│  ┌─────────────────┴──────────────────┐        │
│  │         User Integrity              │        │
│  │  - Input validation                 │        │
│  │  - Data sanitization                │        │
│  │  - Format enforcement               │        │
│  └────────────────────────────────────┘        │
└─────────────────────────────────────────────────┘
```

### Validation Patterns

| Pattern | Description | Multi-Tenant Use |
|---------|-------------|------------------|
| Input Validation | Check data at entry | Per-tenant rules |
| Schema Validation | Enforce structure | Tenant schema extensions |
| Business Rules | Domain logic checks | Tenant-configurable rules |
| Cross-Field | Multi-field consistency | Tenant-specific relationships |
| Referential | Foreign key integrity | Within tenant boundary |

### Consistency Models

| Model | Guarantee | Use Case |
|-------|-----------|----------|
| Strong | Immediate consistency | Financial transactions |
| Eventual | Eventually consistent | Cross-region replication |
| Causal | Preserves causality | Collaboration features |
| Session | Per-session consistency | User workflows |

### Data Quality Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Completeness | Non-null / Total × 100 | > 98% |
| Accuracy | Valid / Total × 100 | > 99.9% |
| Uniqueness | Distinct / Total × 100 | = 100% for keys |
| Timeliness | On-time / Total × 100 | > 95% |
| Consistency | Matching / Total × 100 | > 99% |

### Error Handling Strategies

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| Reject | Fail immediately | Critical validation |
| Quarantine | Isolate for review | Uncertain validity |
| Default | Apply default value | Non-critical missing data |
| Transform | Correct automatically | Known correction patterns |
| Escalate | Human review required | Business-critical decisions |

---

## Application Guidelines

When implementing data integrity in a multi-tenant context:

1. **Validate at tenant boundaries** - Prevent invalid data from entering tenant scope
2. **Use database constraints** - Don't rely solely on application validation
3. **Implement tenant-scoped referential integrity** - Foreign keys within tenant
4. **Design for schema evolution** - Handle tenant-specific customizations
5. **Monitor data quality per tenant** - Track integrity metrics by tenant
6. **Enable tenant-configurable validation** - Allow custom validation rules

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Where to validate? | All layers (defense in depth) | Catch errors early and late |
| Strong or eventual consistency? | Strong for financial, eventual for analytics | Match consistency to use case |
| How to handle validation failures? | Reject with clear error message | User experience + data quality |
| Should tenants customize validation? | Yes for business rules, no for security | Flexibility with guardrails |
| How to monitor integrity? | Per-tenant dashboards + platform alerts | Visibility at all levels |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Data patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `data-*`
- **Validation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `validation-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant data integrity patterns {date}"
- Search: "data validation SaaS architecture {date}"
- Search: "eventual consistency multi-tenant {date}"

---

## Related Workflows

- `bmad-bam-data-encryption-design` - Design data layer
- `bmad-bam-tenant-model-isolation` - Configure tenant isolation
- `bmad-bam-database-migration-pipeline` - Handle schema evolution
