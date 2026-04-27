# BAM RAG Architecture Guide

**When to load:** During Phase 3 (Solutioning) when designing retrieval-augmented generation systems,
or when user mentions RAG, retrieval, context compilation, knowledge base, tenant-scoped knowledge.

**Integrates with:** Architect (AI Runtime), Dev (Implementation), PM (Feature Planning)

---

## Core Concepts

### Tenant-Scoped Knowledge Retrieval

Multi-tenant RAG systems must ensure tenants only access their own knowledge while maintaining performance.

| RAG Component | Multi-Tenant Concern | Solution |
|---------------|---------------------|----------|
| Retrieval | Cross-tenant data leak | Tenant-scoped vector queries |
| Context | Mixed tenant information | Isolated context windows |
| Generation | Hallucinated tenant data | Grounded responses only |

### Multi-Tenant RAG Pipeline

```
┌─────────────────────────────────────────────────┐
│           Tenant-Aware RAG Pipeline              │
│                                                  │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │  Query   │──►│ Retriever │──►│ Context  │    │
│  │  + TID   │   │ (scoped) │   │ Builder  │    │
│  └──────────┘   └──────────┘   └────┬─────┘    │
│                                      │          │
│                               ┌──────▼─────┐    │
│                               │ Generator  │    │
│                               │ (grounded) │    │
│                               └──────┬─────┘    │
│                                      │          │
│                               ┌──────▼─────┐    │
│                               │  Response  │    │
│                               │ + Sources  │    │
│                               └────────────┘    │
└─────────────────────────────────────────────────┘
```

### Knowledge Hierarchy

| Level | Scope | Examples |
|-------|-------|----------|
| Platform | All tenants (read-only) | Product docs, help articles |
| Tier | Tenants in tier | Feature guides, best practices |
| Tenant | Single tenant | Custom docs, internal knowledge |
| User | Single user | Personal notes, preferences |

---

## Application Guidelines

When designing RAG for multi-tenant systems:

1. **Enforce tenant scope** - All retrievals must include tenant_id filter
2. **Separate knowledge tiers** - Platform, tenant, and user knowledge
3. **Implement citation tracking** - Link responses to source documents
4. **Design for freshness** - Handle knowledge updates without full re-index
5. **Plan context budgets** - Allocate tokens per knowledge tier

---

## Retrieval Strategies

### Retrieval Pipeline Options

| Strategy | Description | Best For |
|----------|-------------|----------|
| Dense | Vector similarity only | General semantic search |
| Sparse | BM25/TF-IDF | Keyword-heavy domains |
| Hybrid | Dense + sparse fusion | Best quality |
| Multi-stage | Retrieve → Rerank | High precision needs |

### Tenant-Aware Retrieval

| Stage | Implementation | Isolation |
|-------|----------------|-----------|
| Query processing | Add tenant context | Query rewriting |
| Vector search | Filter by tenant_id | Namespace/metadata |
| Reranking | Tenant-specific models | Custom scoring |
| Post-processing | Verify tenant ownership | Final validation |

### Retrieval Quotas by Tier

| Tier | Max Retrieved | Reranking | Sources |
|------|---------------|-----------|---------|
| Free | 5 chunks | No | Platform only |
| Pro | 20 chunks | Basic | Platform + Tenant |
| Enterprise | 50 chunks | Advanced | All levels |

---

## Context Compilation

### Context Window Strategy

```
┌─────────────────────────────────────────────────┐
│           Context Window (8K example)            │
│  ┌─────────────────────────────────────────┐    │
│  │ System Instructions (1K tokens)         │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ Platform Knowledge (1K tokens)          │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ Tenant Knowledge (3K tokens)            │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ User Context (1K tokens)                │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ Query + Response Space (2K tokens)      │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### Context Priority Rules

| Priority | Content | Truncation |
|----------|---------|------------|
| 1 | System instructions | Never |
| 2 | Recent conversation | Last N turns |
| 3 | Highest relevance chunks | Top-K |
| 4 | Supporting context | If space allows |

### Chunk Deduplication

| Scenario | Strategy | Rationale |
|----------|----------|-----------|
| Same document | Keep highest score | Avoid redundancy |
| Overlapping chunks | Merge with context | Preserve continuity |
| Cross-tier duplicate | Prefer tenant-specific | More relevant |

---

## Generation Patterns

### Grounded Generation

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Extractive | Quote directly from sources | High precision needs |
| Abstractive | Synthesize from sources | Natural responses |
| Hybrid | Summarize with citations | Balance quality/trust |

### Multi-Tenant Safety

| Risk | Mitigation | Implementation |
|------|------------|----------------|
| Hallucinated tenant data | Grounding enforcement | Only cite retrieved sources |
| Cross-tenant leakage | Source validation | Verify tenant_id on all sources |
| Fabricated citations | Link verification | All citations must be retrievable |

---

## Knowledge Management

### Ingestion Pipeline

| Stage | Actions | Multi-Tenant |
|-------|---------|--------------|
| Upload | Validate file, extract text | Tag with tenant_id |
| Chunking | Split into semantic units | Preserve tenant metadata |
| Embedding | Generate vectors | Store in tenant namespace |
| Indexing | Add to search index | Update tenant-specific index |

### Update Strategies

| Strategy | Description | Latency |
|----------|-------------|---------|
| Full re-index | Replace all vectors | Hours |
| Incremental | Add/update changed | Minutes |
| Real-time | Stream updates | Seconds |

### Knowledge Freshness by Tier

| Tier | Update Frequency | Staleness Tolerance |
|------|------------------|---------------------|
| Free | Daily batch | 24 hours |
| Pro | Hourly | 1 hour |
| Enterprise | Real-time | Minutes |

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| Small knowledge base (<1K docs) | Dense retrieval only | Simplicity |
| Domain-specific jargon | Hybrid retrieval | Keyword matching helps |
| Compliance-heavy industry | Full citation required | Audit trail |
| High query volume | Cache common queries | Performance |
| Enterprise customization | Custom embedding models | Better relevance |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - RAG integration with agent framework
- `create-module-architecture` - Knowledge module design
- `bmad-bam-tenant-onboarding-design` - Knowledge base initialization

## Related Patterns

Load decision criteria and web search queries from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `rag-*`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "RAG architecture multi-tenant patterns {date}"
- Search: "retrieval augmented generation best practices {date}"
- Search: "LangChain RAG multi-tenant isolation {date}"
