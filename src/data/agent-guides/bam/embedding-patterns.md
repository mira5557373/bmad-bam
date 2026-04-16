# BAM Embedding Patterns Guide

**When to load:** During RAG pipeline design, semantic search implementation, embedding model selection, or when implementing embedding patterns for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), Nova (AI Runtime), James (Dev), ml-bam extension.

---

## Core Concepts

### Embedding Model Selection

| Model | Dimensions | Speed | Quality | Use Case |
|-------|------------|-------|---------|----------|
| text-embedding-3-small | 1536 | Fast | Good | Cost-sensitive |
| text-embedding-3-large | 3072 | Medium | Best | Quality-critical |
| Cohere embed-v3 | 1024 | Fast | Good | Multilingual |
| Local (e5-large) | 1024 | Varies | Good | Data privacy |

### Multi-Tenant Embedding Architecture

```
┌─────────────────────────────────────────────────┐
│          Embedding Service                       │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ Tenant A │    │ Tenant B │    │ Tenant C │  │
│  │   Docs   │    │   Docs   │    │   Docs   │  │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘  │
│       │               │               │         │
│       └───────┬───────┴───────┬───────┘         │
│               │               │                 │
│        ┌──────▼──────┐ ┌──────▼──────┐         │
│        │  Embedding  │ │   Tenant    │         │
│        │   Queue     │ │  Metadata   │         │
│        └──────┬──────┘ └─────────────┘         │
│               │                                 │
│        ┌──────▼──────┐                         │
│        │   Vector    │                         │
│        │   Store     │                         │
│        │(Partitioned)│                         │
│        └─────────────┘                         │
└─────────────────────────────────────────────────┘
```

### Tenant Isolation Strategies for Embeddings

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Namespace | Same index, tenant prefix filter | Cost-efficient |
| Separate Index | Index per tenant | Strong isolation |
| Collection | Collection per tenant within DB | Balance |
| Database | Dedicated vector DB per tenant | Enterprise tier |

### Chunking Strategies

| Strategy | Chunk Size | Overlap | Use Case |
|----------|------------|---------|----------|
| Fixed Size | 512-1024 tokens | 50-100 | General documents |
| Semantic | Varies | N/A | Complex documents |
| Sentence | 1-5 sentences | 1 sentence | QA systems |
| Paragraph | Natural breaks | None | Long-form content |

### Embedding Pipeline Stages

| Stage | Action | Multi-Tenant Consideration |
|-------|--------|---------------------------|
| Ingestion | Accept documents | Tenant auth + quota check |
| Preprocessing | Clean, normalize | Tenant-specific rules |
| Chunking | Split into pieces | Tenant-configurable strategy |
| Embedding | Generate vectors | Rate limit per tenant |
| Storage | Save to vector DB | Tenant-partitioned storage |
| Indexing | Build search index | Per-tenant index optimization |

### Cost Optimization

| Technique | Savings | Trade-off |
|-----------|---------|-----------|
| Batch embedding | 50-70% | Increased latency |
| Smaller model | 60-80% | Lower quality |
| Dimension reduction | 30-50% | Slight quality loss |
| Caching | Variable | Storage cost |
| Deduplication | 20-40% | Processing overhead |

---

## Application Guidelines

When implementing embeddings in a multi-tenant context:

1. **Partition by tenant** - Never mix tenant embeddings in same namespace
2. **Batch for efficiency** - Process documents in batches per tenant
3. **Implement quota limits** - Prevent runaway embedding costs
4. **Cache repeated queries** - Same query returns cached embedding
5. **Version embedding model** - Track which model created which embeddings
6. **Plan for re-embedding** - Model upgrades require full re-index

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which embedding model? | Start with text-embedding-3-small, upgrade as needed | Cost vs quality balance |
| Chunking strategy? | Fixed 512 tokens with 50 overlap for general use | Good recall with efficiency |
| Tenant isolation? | Namespace for most, separate index for enterprise | Cost-proportionate isolation |
| When to re-embed? | On model upgrade or major quality improvement | Expensive but necessary |
| Local or cloud embedding? | Cloud unless data sovereignty requires local | Simpler operations |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Embedding patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `embedding-*`
- **RAG patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `rag-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant embedding architecture {date}"
- Search: "vector embedding chunking strategies {date}"
- Search: "embedding model selection comparison {date}"

---

## Related Workflows

- `bmad-bam-rag-pipeline-design` - Design RAG pipeline
- `bmad-bam-vector-database-design` - Choose vector database
- `bmad-bam-agent-runtime-architecture` - Integrate with agents
