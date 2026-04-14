# BAM Vector Database Guide

**When to load:** During Phase 3 (Solutioning) when designing RAG systems or vector storage,
or when user mentions vector DB, embeddings, similarity search, RAG, tenant isolation in vectors.

**Integrates with:** Architect (AI Runtime), Dev (Implementation), DevOps (Infrastructure)

---

## Core Concepts

### Tenant Isolation in Vector Stores

Multi-tenant RAG systems require strict isolation to prevent cross-tenant data leakage in similarity searches.

| Isolation Model | Implementation | Use Case |
|-----------------|----------------|----------|
| Namespace | Tenant ID prefix on all vectors | Cost-efficient, shared index |
| Collection | Separate collection per tenant | Moderate isolation |
| Database | Separate vector DB instance | Maximum isolation, enterprise |

### Multi-Tenant Vector Architecture

```
┌─────────────────────────────────────────────────┐
│              Vector Database                     │
│  ┌─────────────────────────────────────────┐    │
│  │ Namespace: tenant_abc                    │    │
│  │  ┌───────┐ ┌───────┐ ┌───────┐         │    │
│  │  │Vec 1  │ │Vec 2  │ │Vec N  │         │    │
│  │  │[0.1,.]│ │[0.3,.]│ │[0.7,.]│         │    │
│  │  └───────┘ └───────┘ └───────┘         │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ Namespace: tenant_xyz                    │    │
│  │  ┌───────┐ ┌───────┐ ┌───────┐         │    │
│  │  │Vec 1  │ │Vec 2  │ │Vec M  │         │    │
│  │  │[0.2,.]│ │[0.5,.]│ │[0.9,.]│         │    │
│  │  └───────┘ └───────┘ └───────┘         │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### Embedding Namespace Strategy

| Strategy | Format | Example |
|----------|--------|---------|
| Prefix | `{tenant_id}:{doc_id}` | `abc123:doc_001` |
| Metadata filter | `tenant_id` in payload | `{"tenant_id": "abc123"}` |
| Hybrid | Prefix + metadata | Both for defense in depth |

---

## Application Guidelines

When designing vector storage for multi-tenant:

1. **Always include tenant_id** - Every vector must be tenant-scoped
2. **Enforce filter on query** - Never allow cross-tenant similarity search
3. **Use metadata validation** - Verify tenant ownership before operations
4. **Implement quotas** - Limit vectors per tenant based on tier
5. **Plan for scale** - Consider sharding strategy for large tenants

---

## Vector Database Selection

### Comparison Matrix

| Database | Multi-Tenant Support | Scaling | Cost Model |
|----------|---------------------|---------|------------|
| Pinecone | Namespaces | Serverless | Per-vector |
| Weaviate | Classes + tenant | Self-hosted/Cloud | Compute-based |
| Qdrant | Collections + payload | Self-hosted/Cloud | Compute-based |
| Milvus | Partitions | Self-hosted | Compute-based |
| pgvector | RLS + schema | Self-hosted | PostgreSQL costs |

### Tier-Based Database Strategy

| Tenant Tier | Vector Storage | Index Type | Query Limits |
|-------------|----------------|------------|--------------|
| Free | Shared namespace | IVF_FLAT | 10 queries/min |
| Pro | Dedicated namespace | IVF_PQ | 100 queries/min |
| Enterprise | Dedicated collection | HNSW | Unlimited |

---

## Index Management

### Index Types Per Tier

| Index Type | Recall | Speed | Memory | Tier |
|------------|--------|-------|--------|------|
| Flat | 100% | Slow | Low | Development |
| IVF_FLAT | 95%+ | Medium | Medium | Free/Pro |
| IVF_PQ | 90%+ | Fast | Low | Pro (high volume) |
| HNSW | 98%+ | Fast | High | Enterprise |

### Index Lifecycle

| Phase | Actions | Frequency |
|-------|---------|-----------|
| Creation | Build index on tenant onboard | Once |
| Optimization | Rebalance, compact | Weekly |
| Maintenance | Update statistics | Daily |
| Migration | Upgrade index type on tier change | On event |

### Tenant Index Isolation

```
┌─────────────────────────────────────────────────┐
│           Index Manager Service                  │
│  ┌─────────────────────────────────────────┐    │
│  │ Tenant Index Registry                    │    │
│  │ ┌─────────────────────────────────────┐ │    │
│  │ │ tenant_abc → HNSW (enterprise)      │ │    │
│  │ │ tenant_xyz → IVF_PQ (pro)           │ │    │
│  │ │ tenant_123 → IVF_FLAT (free)        │ │    │
│  │ └─────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  Query Router: SELECT index BY tenant_id        │
└─────────────────────────────────────────────────┘
```

---

## Query Patterns

### Tenant-Scoped Query

| Query Component | Required | Purpose |
|-----------------|----------|---------|
| tenant_id filter | **Yes** | Isolation |
| top_k limit | Yes | Performance |
| score_threshold | Optional | Quality |
| metadata filters | Optional | Refinement |

### Query Optimization

| Optimization | When to Use | Impact |
|--------------|-------------|--------|
| Pre-filtering | Small tenant dataset | Faster query |
| Post-filtering | Large tenant dataset | Better recall |
| Hybrid search | Keyword + semantic | Better relevance |
| Re-ranking | Enterprise tier | Higher quality |

---

## Data Lifecycle

### Embedding Update Strategy

| Trigger | Action | Scope |
|---------|--------|-------|
| Document updated | Re-embed document | Single vector |
| Model upgraded | Re-embed all | Tenant namespace |
| Tenant offboarded | Delete namespace | All tenant vectors |

### Retention Policies

| Tier | Retention | Backup |
|------|-----------|--------|
| Free | 30 days inactive | None |
| Pro | 1 year | Daily |
| Enterprise | Custom | Continuous |

---

## Security Considerations

| Risk | Mitigation | Implementation |
|------|------------|----------------|
| Cross-tenant search | Mandatory tenant filter | Query interceptor |
| Data exfiltration | Embedding-only storage | No raw text in vectors |
| Inference attacks | Add noise to embeddings | Differential privacy |
| Unauthorized access | Token-scoped queries | API key per tenant |

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| < 100K vectors total | Single shared index | Cost efficiency |
| > 1M vectors/tenant | Dedicated collection | Performance isolation |
| Enterprise compliance | Database-per-tenant | Maximum isolation |
| High query volume | HNSW index | Query speed |
| Memory constrained | IVF_PQ index | Compression |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Vector DB integration with agents
- `bmad-bam-create-module-architecture` - RAG module design
- `bmad-bam-tenant-offboarding-design` - Vector data deletion

## Related Patterns

Load decision criteria and web search queries from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `vector-*`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "vector database multi-tenant isolation {date}"
- Search: "Pinecone namespace tenant isolation {date}"
- Search: "RAG embedding storage patterns {date}"
