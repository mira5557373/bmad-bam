# BAM Vector Database Patterns Guide

**When to load:** During vector database selection, semantic search implementation, RAG infrastructure design, or when implementing vector storage for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), Nova (AI Runtime), data-bam extension.

---

## Core Concepts

### Vector Database Comparison

| Database | Multi-Tenant | Scaling | Managed | Best For |
|----------|--------------|---------|---------|----------|
| Pinecone | Namespaces | Serverless | Yes | Fastest start |
| Weaviate | Classes | Horizontal | Self/Cloud | Flexible schema |
| Qdrant | Collections | Horizontal | Self/Cloud | Performance |
| Milvus | Partitions | Horizontal | Self/Zilliz | Large scale |
| pgvector | Schema/RLS | Vertical | Depends | PostgreSQL shops |
| Chroma | Collections | Limited | Self-only | Development |

### Multi-Tenant Isolation Models

```
┌─────────────────────────────────────────────────┐
│     Multi-Tenant Vector Database Models          │
│                                                  │
│  Model 1: Namespace/Filter                       │
│  ┌────────────────────────────────────────┐     │
│  │  Single Index                           │     │
│  │  ┌────────┐ ┌────────┐ ┌────────┐     │     │
│  │  │Tenant A│ │Tenant B│ │Tenant C│     │     │
│  │  │ (ns:a) │ │ (ns:b) │ │ (ns:c) │     │     │
│  │  └────────┘ └────────┘ └────────┘     │     │
│  └────────────────────────────────────────┘     │
│                                                  │
│  Model 2: Collection per Tenant                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │Collection│ │Collection│ │Collection│        │
│  │ Tenant A │ │ Tenant B │ │ Tenant C │        │
│  └──────────┘ └──────────┘ └──────────┘        │
│                                                  │
│  Model 3: Database per Tenant (Enterprise)       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │Database A│ │Database B│ │Database C│        │
│  └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────┘
```

### Query Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Pure Vector | Similarity search only | General semantic search |
| Filtered Vector | Vector + metadata filter | Tenant-scoped search |
| Hybrid | Vector + keyword (BM25) | Document retrieval |
| Re-ranking | Vector search + re-ranker | High precision needs |

### Index Configuration

| Parameter | Low Latency | High Recall | Balance |
|-----------|-------------|-------------|---------|
| HNSW M | 16 | 48 | 32 |
| HNSW ef_construction | 100 | 400 | 200 |
| HNSW ef_search | 50 | 200 | 100 |

### Scaling Patterns

| Pattern | When to Use | Implementation |
|---------|-------------|----------------|
| Vertical | < 10M vectors | Increase memory/CPU |
| Sharding | > 10M vectors | Partition by tenant hash |
| Replication | High availability | Read replicas |
| Tiered Storage | Cold data | Move old embeddings to cold tier |

### Cost Optimization

| Technique | Savings | Impact |
|-----------|---------|--------|
| Quantization | 75% storage | Slight accuracy loss |
| Dimension reduction | 50% storage | Quality trade-off |
| TTL on embeddings | Variable | Auto-cleanup |
| Cold storage tiers | 60-80% | Increased latency |
| Shared infrastructure | 40-60% | Noisy neighbor risk |

---

## Application Guidelines

When implementing vector databases in a multi-tenant context:

1. **Choose isolation model carefully** - Balance cost with security requirements
2. **Filter by tenant on every query** - Prevent cross-tenant data leakage
3. **Plan for scale** - Start with namespace, migrate to collection as needed
4. **Implement backup strategy** - Vector data is expensive to regenerate
5. **Monitor query performance** - Per-tenant latency tracking
6. **Set storage quotas** - Limit vectors per tenant by tier

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which vector database? | Pinecone for speed, pgvector for simplicity | Match team expertise |
| Isolation model? | Namespace for most, collection for enterprise | Cost-proportionate security |
| Index parameters? | Start balanced, tune based on metrics | Avoid premature optimization |
| Backup frequency? | Daily incremental, weekly full | Recovery vs cost balance |
| When to shard? | > 5M vectors per tenant | Performance degradation point |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Vector database patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `vector-*`
- **RAG patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `rag-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant vector database architecture {date}"
- Search: "Pinecone vs pgvector comparison {date}"
- Search: "vector database scaling patterns {date}"

---

## Related Workflows

- `bmad-bam-vector-database-design` - Select vector database
- `bmad-bam-rag-pipeline-design` - Design RAG pipeline
- `bmad-bam-data-encryption-design` - Overall data architecture
