---
pattern_id: rag-pipeline
shortcode: ZRP
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# RAG Pipeline - BAM Pattern

**Loaded by:** ZRP  
**Applies to:** Multi-tenant RAG systems  
**See also:** [vector-store-multi-tenant.md](vector-store-multi-tenant.md), [semantic-chunking.md](semantic-chunking.md)

---

## When to Use

- Building knowledge-augmented AI assistants
- Document Q&A systems with tenant isolation
- Enterprise search with LLM synthesis
- Customer support automation with knowledge bases
- Research assistants requiring citation tracking

## When NOT to Use

- Simple keyword search without LLM synthesis
- Real-time transactional queries (use database directly)
- Highly structured data better served by SQL
- Applications without document ingestion requirements

## Architecture

### End-to-End RAG Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    RAG Pipeline Orchestration                    │
│                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │   INGESTION  │     │  RETRIEVAL   │     │  GENERATION  │    │
│  │              │     │              │     │              │    │
│  │ ┌──────────┐ │     │ ┌──────────┐ │     │ ┌──────────┐ │    │
│  │ │  Parse   │ │     │ │  Query   │ │     │ │ Context  │ │    │
│  │ │ Document │ │     │ │ Transform│ │     │ │ Compile  │ │    │
│  │ └────┬─────┘ │     │ └────┬─────┘ │     │ └────┬─────┘ │    │
│  │      │       │     │      │       │     │      │       │    │
│  │ ┌────▼─────┐ │     │ ┌────▼─────┐ │     │ ┌────▼─────┐ │    │
│  │ │ Semantic │ │     │ │ Vector   │ │     │ │ LLM      │ │    │
│  │ │  Chunk   │ │     │ │ Search   │ │     │ │ Synthesis│ │    │
│  │ └────┬─────┘ │     │ └────┬─────┘ │     │ └────┬─────┘ │    │
│  │      │       │     │      │       │     │      │       │    │
│  │ ┌────▼─────┐ │     │ ┌────▼─────┐ │     │ ┌────▼─────┐ │    │
│  │ │  Embed   │ │     │ │ Rerank   │ │     │ │ Citation │ │    │
│  │ │  Store   │ │     │ │ Filter   │ │     │ │ Attach   │ │    │
│  │ └──────────┘ │     │ └──────────┘ │     │ └──────────┘ │    │
│  └──────────────┘     └──────────────┘     └──────────────┘    │
│         │                   │                     │             │
│         └───────────────────┴─────────────────────┘             │
│                         tenant_id context                        │
└─────────────────────────────────────────────────────────────────┘
```

### Tenant Context Propagation

```
┌──────────────────────────────────────────────────────────┐
│                   Request Context                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ tenant_id: "acme-corp"                               │ │
│  │ user_id: "user-123"                                  │ │
│  │ permissions: ["read:docs", "read:kb"]                │ │
│  │ embedding_model_version: "v2.1"                      │ │
│  └─────────────────────────────────────────────────────┘ │
│                           │                               │
│           ┌───────────────┼───────────────┐               │
│           ▼               ▼               ▼               │
│     ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│     │ Chunking │    │  Vector  │    │   LLM    │         │
│     │ tenant   │    │  Store   │    │  Context │         │
│     │ config   │    │  filter  │    │  tenant  │         │
│     └──────────┘    └──────────┘    └──────────┘         │
└──────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
rag_pipeline:
  version: "1.0.0"
  bam_controlled: true
  
  ingestion:
    chunk_strategy: "semantic"  # semantic, fixed, paragraph
    chunk_size: 512
    chunk_overlap: 50
    embedding_model: "text-embedding-3-large"
    embedding_dimensions: 1536
    
  retrieval:
    vector_store: "pinecone"  # pinecone, weaviate, qdrant, pgvector
    isolation_model: "namespace"  # index-per-tenant, namespace, metadata
    top_k: 10
    rerank_model: "cross-encoder"
    rerank_top_n: 5
    hybrid_search: true
    hybrid_alpha: 0.7  # 0=keyword, 1=vector
    
  generation:
    llm_model: "claude-3-5-sonnet"
    max_context_tokens: 128000
    citation_required: true
    streaming_enabled: true
    
  tenant_config:
    per_tenant_overrides:
      - tenant_id: "enterprise-a"
        isolation_model: "index-per-tenant"
        dedicated_resources: true
```

### Pipeline Stages Table

| Stage | Component | Tenant Boundary | Failure Mode |
|-------|-----------|-----------------|--------------|
| Parse | Document Parser | Per-tenant queue | Retry with backoff |
| Chunk | Semantic Chunker | Tenant config | Fallback to fixed |
| Embed | Embedding Model | Shared, tenant-tagged | Circuit breaker |
| Store | Vector Store | Per isolation model | Write retry |
| Query | Query Transformer | Tenant context | Pass-through |
| Search | Vector + BM25 | Filtered by tenant | Empty results |
| Rerank | Cross-Encoder | Tenant-aware | Skip reranking |
| Generate | LLM | Tenant context | Cached response |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Synchronous pipeline | Simple, predictable | Higher latency | Small documents |
| Async with queues | Scalable, resilient | Complex, eventual consistency | High volume |
| Streaming pipeline | Low latency, responsive | Memory pressure | Interactive UX |
| Batch processing | Efficient, cost-effective | Delayed indexing | Bulk ingestion |

## Quality Checks

- [ ] **CRITICAL:** Tenant isolation at every pipeline stage
- [ ] **CRITICAL:** No cross-tenant data leakage in retrieval
- [ ] Embedding model version tracked per document
- [ ] Citation source tracking implemented
- [ ] Chunk boundaries preserve semantic meaning
- [ ] Reranking improves relevance metrics

## Web Research Queries

- "RAG pipeline architecture patterns {date}"
- "multi-tenant vector store isolation {date}"
- "LangChain RAG implementation best practices {date}"
- "semantic chunking strategies for RAG {date}"
- "citation tracking in RAG systems {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | RAG pipeline tenant isolation verified |

## Related Patterns

- [vector-store-multi-tenant.md](vector-store-multi-tenant.md) - Vector store isolation
- [semantic-chunking.md](semantic-chunking.md) - Document splitting
- [hybrid-search.md](hybrid-search.md) - Search fusion
- [context-compilation.md](context-compilation.md) - Context assembly
- [streaming-rag.md](streaming-rag.md) - Real-time retrieval
