# Tenant Search Indexing Patterns

**When to load:** When designing search capabilities, implementing indexing, or when user mentions Elasticsearch, search isolation, or full-text search.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What is Tenant Search Indexing?

Tenant search indexing enables full-text search capabilities while maintaining strict data isolation between tenants. This includes index design, query filtering, and performance optimization.

### Indexing Strategy Comparison

| Strategy | Isolation | Complexity | Use Case |
|----------|-----------|------------|----------|
| Shared Index | Logical (filter) | Low | Most SaaS |
| Index-Per-Tenant | Physical | Medium | Compliance |
| Filtered Search | Logical | Low | Simple cases |
| Cluster-Per-Tenant | Complete | High | Enterprise |

---

## Key Patterns

### Pattern 1: Shared Index with Tenant Filter

All tenants share index with mandatory tenant filtering.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Index Design | Single index | tenant_id field required |
| Indexing | Include tenant_id | Every document |
| Query | Filter by tenant | Mandatory clause |
| Security | Application-level | Enforce in all queries |

### Shared Index Structure

```
┌─────────────────────────────────────────┐
│           Shared Index                   │
│                                          │
│  Document 1:                            │
│    tenant_id: "tenant_a"                │
│    content: "..."                       │
│                                          │
│  Document 2:                            │
│    tenant_id: "tenant_b"                │
│    content: "..."                       │
│                                          │
│  Query: filter + {tenant_id: "tenant_a"}│
└─────────────────────────────────────────┘
```

### Pattern 2: Index-Per-Tenant

Dedicated index for each tenant.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Index Naming | `{app}_{tenant}_{type}` | Unique per tenant |
| Index Lifecycle | Per-tenant management | Separate policies |
| Queries | Route to tenant index | Index selection |
| Scaling | Independent scaling | Per-tenant resources |

### Per-Tenant Index Architecture

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Index:     │  │  Index:     │  │  Index:     │
│  app_abc_   │  │  app_xyz_   │  │  app_123_   │
│  docs       │  │  docs       │  │  docs       │
│             │  │             │  │             │
│  (tenant A) │  │  (tenant B) │  │  (tenant C) │
└─────────────┘  └─────────────┘  └─────────────┘
```

### Pattern 3: Alias-Based Routing

Use aliases for tenant-to-index mapping.

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| Write Alias | Index routing | `{tenant}_write` -> index |
| Read Alias | Query routing | `{tenant}_read` -> indices |
| Reindexing | Zero-downtime | Alias switch |
| Tenant Isolation | Access control | Alias permissions |

### Alias Flow

```
Application
    │
    └── Alias: tenant_abc_read
              │
              └── Index: app_abc_docs_v2
```

### Pattern 4: Real-Time vs Batch Indexing

Choose indexing strategy.

| Strategy | Latency | Use Case |
|----------|---------|----------|
| Real-time | Seconds | Search freshness critical |
| Near Real-time | Minutes | Good balance |
| Batch | Hours | Large volume, cost-sensitive |

### Indexing Pipeline

```
Data Change
     │
     v
┌──────────────────┐
│  Change Capture  │
│  (CDC/Events)    │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    v         v
Real-time   Batch
Queue       Job
    │         │
    v         v
  Index     Bulk
  Doc       Index
```

---

## Application Guidelines

When implementing search indexing:

1. **Always filter by tenant** - Never expose cross-tenant data
2. **Index tenant_id** - Make filtering efficient
3. **Consider index strategy** - Based on isolation requirements
4. **Monitor query performance** - Per-tenant metrics
5. **Plan for scale** - Index lifecycle management

---

## Per-Tier Search Configuration

| Tier | Strategy | Max Documents | Custom Analyzers |
|------|----------|---------------|------------------|
| Free | Shared (filtered) | 10,000 | No |
| Pro | Shared (filtered) | 1,000,000 | Limited |
| Enterprise | Index-per-tenant | Unlimited | Yes |

---

## Document Structure

| Field | Required | Description |
|-------|----------|-------------|
| _id | Yes | Unique document ID |
| tenant_id | Yes | Tenant identifier |
| content | Yes | Searchable text |
| created_at | Yes | Indexing timestamp |
| source_id | Yes | Original record reference |
| type | No | Document classification |
| metadata | No | Additional fields |

---

## Query Best Practices

| Practice | Description | Implementation |
|----------|-------------|----------------|
| Mandatory Filter | Always filter by tenant | Query wrapper |
| Field Boosting | Prioritize important fields | Boost scores |
| Pagination | Efficient result sets | Search after |
| Caching | Reduce load | Query cache |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Missing tenant filter | Data leakage | Mandatory filter |
| Non-indexed tenant_id | Slow queries | Index the field |
| Deep pagination | Performance issues | Search after |
| No monitoring | Silent issues | Per-tenant metrics |
| Unbounded results | Memory issues | Always paginate |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Shared vs per-tenant index? | Shared for most; per-tenant for compliance | Simpler ops vs stronger isolation |
| Real-time vs batch? | Based on freshness requirements | Balance cost vs latency |
| Elasticsearch vs alternatives? | Based on scale and features | Consider managed services |
| Custom analyzers? | Enterprise tier only | Complexity and testing overhead |

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Configure search isolation
- `bmad-bam-tenant-onboarding-design` - Provision search indices
- `bmad-bam-convergence-verification` - Verify search isolation

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Search indexing:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `search-indexing`
- **Tenant isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Performance isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `performance-isolation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant search indexing {date}"
- Search: "Elasticsearch tenant isolation {date}"
- Search: "search index per tenant patterns {date}"
