# BAM RAG Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing RAG systems, vector databases, embedding pipelines, or retrieval patterns. Load when user mentions RAG, retrieval augmented generation, vector database, embeddings, semantic search, document retrieval, knowledge base, tenant-scoped knowledge, similarity search, chunking strategies.
**Integrates with:** Architect (Nova persona for AI Runtime), Dev agent, Data Engineer roles, DevOps (Infrastructure)

---

## Core Concepts

### Tenant-Scoped Knowledge Retrieval

Multi-tenant RAG systems must ensure tenants only access their own knowledge while maintaining performance. This requires isolation at every pipeline stage.

| RAG Component | Multi-Tenant Concern | Solution |
|---------------|---------------------|----------|
| Retrieval | Cross-tenant data leak | Tenant-scoped vector queries with mandatory filters |
| Context | Mixed tenant information | Isolated context windows per tenant |
| Generation | Hallucinated tenant data | Grounded responses only from verified sources |
| Embeddings | Shared embedding space | Namespace-prefixed vectors with tenant metadata |
| Storage | Vector co-mingling | Tenant-partitioned collections or namespaces |

### Knowledge Hierarchy

RAG systems in multi-tenant platforms operate across multiple knowledge tiers with different access patterns.

| Level | Scope | Examples | Access Control |
|-------|-------|----------|----------------|
| Platform | All tenants (read-only) | Product docs, help articles, system guides | Public to all tenants |
| Tier | Tenants in tier | Feature guides, best practices, tier-specific docs | Filtered by subscription tier |
| Tenant | Single tenant | Custom docs, internal knowledge, company data | Strict tenant_id isolation |
| User | Single user | Personal notes, preferences, conversation history | User-level RLS |

### Multi-Tenant RAG Pipeline

```
┌─────────────────────────────────────────────────────┐
│           Tenant-Aware RAG Pipeline                  │
│                                                      │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐        │
│  │  Query   │──►│ Retriever │──►│ Context  │        │
│  │  + TID   │   │ (scoped) │   │ Builder  │        │
│  └──────────┘   └──────────┘   └────┬─────┘        │
│                                      │              │
│                               ┌──────▼─────┐        │
│                               │ Generator  │        │
│                               │ (grounded) │        │
│                               └──────┬─────┘        │
│                                      │              │
│                               ┌──────▼─────┐        │
│                               │  Response  │        │
│                               │ + Sources  │        │
│                               └────────────┘        │
└─────────────────────────────────────────────────────┘
```

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and must be followed for multi-tenant RAG systems.

### Vector Namespace Format

All vectors must use tenant-scoped namespacing:

| Convention | Format | Example |
|------------|--------|---------|
| Namespace prefix | `{tenant_id}:{collection}` | `abc123:documents` |
| Vector ID | `{tenant_id}:{doc_id}:{chunk_id}` | `abc123:doc_001:chunk_5` |
| Metadata filter | `tenant_id` in payload | `{"tenant_id": "abc123", "doc_type": "policy"}` |
| Hybrid approach | Prefix + metadata | Defense in depth for critical data |

### Embedding Model Conventions

| Tier | Default Model | Dimensions | Notes |
|------|---------------|------------|-------|
| Free | text-embedding-3-small | 1536 | Cost-efficient, good quality |
| Pro | text-embedding-3-large | 3072 | Higher quality for production |
| Enterprise | Custom or text-embedding-3-large | Varies | Tenant-specific fine-tuned models allowed |

### Chunking Standards

| Document Type | Chunk Size | Overlap | Strategy |
|---------------|------------|---------|----------|
| General text | 512 tokens | 50 tokens | Fixed size |
| Technical docs | 1024 tokens | 100 tokens | Semantic boundaries |
| FAQs | 1-5 sentences | 1 sentence | Sentence-based |
| Legal/Contracts | Paragraph | None | Natural breaks |

### Context Window Allocation

```
┌─────────────────────────────────────────────────────┐
│           Context Window (8K example)                │
│  ┌─────────────────────────────────────────┐        │
│  │ System Instructions (1K tokens)         │        │
│  └─────────────────────────────────────────┘        │
│  ┌─────────────────────────────────────────┐        │
│  │ Platform Knowledge (1K tokens)          │        │
│  └─────────────────────────────────────────┘        │
│  ┌─────────────────────────────────────────┐        │
│  │ Tenant Knowledge (3K tokens)            │        │
│  └─────────────────────────────────────────┘        │
│  ┌─────────────────────────────────────────┐        │
│  │ User Context (1K tokens)                │        │
│  └─────────────────────────────────────────┘        │
│  ┌─────────────────────────────────────────┐        │
│  │ Query + Response Space (2K tokens)      │        │
│  └─────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
```

---

## Decision Framework

### RAG Pattern Selection

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| Small knowledge base (<1K docs) | Dense retrieval only | Simplicity, low overhead |
| Domain-specific jargon | Hybrid retrieval (dense + sparse) | Keyword matching helps technical terms |
| Compliance-heavy industry | Full citation required | Audit trail for all responses |
| High query volume | Cache common queries | Performance optimization |
| Enterprise customization | Custom embedding models | Better relevance for domain |
| Multi-language content | Cohere embed-v3 or multilingual model | Cross-language retrieval |

### Vector Database Selection

| Database | Multi-Tenant Support | Scaling | Cost Model | Best For |
|----------|---------------------|---------|------------|----------|
| Pinecone | Namespaces | Serverless | Per-vector | Fastest start, managed |
| Weaviate | Classes + tenant | Horizontal | Compute-based | Flexible schema |
| Qdrant | Collections + payload | Horizontal | Compute-based | Performance |
| Milvus | Partitions | Horizontal | Compute-based | Large scale |
| pgvector | RLS + schema | Vertical | PostgreSQL costs | PostgreSQL shops |
| Chroma | Collections | Limited | Self-hosted | Development only |

### Isolation Model Selection

| Tenant Scale | Recommended Isolation | Rationale |
|--------------|----------------------|-----------|
| < 100 tenants | Namespace/filter | Cost efficiency |
| 100-1000 tenants | Collection per tenant | Moderate isolation |
| Enterprise tier | Database per tenant | Maximum isolation, compliance |
| Regulated industries | Dedicated infrastructure | Data sovereignty requirements |

---

## §rag-architecture

### Pattern: RAG Architecture

Design retrieval-augmented generation pipelines with proper tenant isolation at every stage.

#### Pipeline Design

| Stage | Implementation | Multi-Tenant Consideration |
|-------|----------------|---------------------------|
| Query Processing | Add tenant context | Query rewriting with tenant scope |
| Embedding | Generate query vector | Use tenant's embedding model version |
| Retrieval | Vector similarity search | Mandatory tenant_id filter |
| Reranking | Score refinement | Tenant-specific ranking models (enterprise) |
| Context Assembly | Build prompt context | Respect tier token limits |
| Generation | LLM response | Ground in retrieved context only |
| Post-processing | Verify sources | Validate tenant ownership |

#### Retrieval Strategies

| Strategy | Description | Best For |
|----------|-------------|----------|
| Dense | Vector similarity only | General semantic search |
| Sparse | BM25/TF-IDF | Keyword-heavy domains |
| Hybrid | Dense + sparse fusion | Best quality, most use cases |
| Multi-stage | Retrieve → Rerank | High precision needs |

#### Retrieval Quotas by Tier

| Tier | Max Retrieved | Reranking | Sources |
|------|---------------|-----------|---------|
| Free | 5 chunks | No | Platform only |
| Pro | 20 chunks | Basic | Platform + Tenant |
| Enterprise | 50 chunks | Advanced | All levels |

#### Grounded Generation Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Extractive | Quote directly from sources | High precision, legal |
| Abstractive | Synthesize from sources | Natural responses |
| Hybrid | Summarize with citations | Balance quality/trust |

#### Multi-Tenant Safety Controls

| Risk | Mitigation | Implementation |
|------|------------|----------------|
| Hallucinated tenant data | Grounding enforcement | Only cite retrieved sources |
| Cross-tenant leakage | Source validation | Verify tenant_id on all sources |
| Fabricated citations | Link verification | All citations must be retrievable |
| Context overflow | Token budgets | Strict per-tier limits |

---

## §vector-database

### Pattern: Vector Database

Select and configure vector databases for multi-tenant isolation with appropriate performance characteristics.

#### Multi-Tenant Architecture

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

#### Tier-Based Database Strategy

| Tenant Tier | Vector Storage | Index Type | Query Limits |
|-------------|----------------|------------|--------------|
| Free | Shared namespace | IVF_FLAT | 10 queries/min |
| Pro | Dedicated namespace | IVF_PQ | 100 queries/min |
| Enterprise | Dedicated collection | HNSW | Unlimited |

#### Index Configuration

| Parameter | Low Latency | High Recall | Balance |
|-----------|-------------|-------------|---------|
| HNSW M | 16 | 48 | 32 |
| HNSW ef_construction | 100 | 400 | 200 |
| HNSW ef_search | 50 | 200 | 100 |

#### Index Types Per Tier

| Index Type | Recall | Speed | Memory | Tier |
|------------|--------|-------|--------|------|
| Flat | 100% | Slow | Low | Development |
| IVF_FLAT | 95%+ | Medium | Medium | Free/Pro |
| IVF_PQ | 90%+ | Fast | Low | Pro (high volume) |
| HNSW | 98%+ | Fast | High | Enterprise |

#### Query Optimization

| Optimization | When to Use | Impact |
|--------------|-------------|--------|
| Pre-filtering | Small tenant dataset | Faster query |
| Post-filtering | Large tenant dataset | Better recall |
| Hybrid search | Keyword + semantic | Better relevance |
| Re-ranking | Enterprise tier | Higher quality |

#### Security Considerations

| Risk | Mitigation | Implementation |
|------|------------|----------------|
| Cross-tenant search | Mandatory tenant filter | Query interceptor |
| Data exfiltration | Embedding-only storage | No raw text in vectors |
| Inference attacks | Add noise to embeddings | Differential privacy |
| Unauthorized access | Token-scoped queries | API key per tenant |

#### Retention Policies

| Tier | Retention | Backup |
|------|-----------|--------|
| Free | 30 days inactive | None |
| Pro | 1 year | Daily |
| Enterprise | Custom | Continuous |

---

## §embedding-pipeline

### Pattern: Embedding Pipeline

Design embedding generation and storage pipelines with tenant-scoped models and efficient batching.

#### Multi-Tenant Embedding Architecture

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

#### Embedding Model Selection

| Model | Dimensions | Speed | Quality | Use Case |
|-------|------------|-------|---------|----------|
| text-embedding-3-small | 1536 | Fast | Good | Cost-sensitive, free tier |
| text-embedding-3-large | 3072 | Medium | Best | Quality-critical, pro tier |
| Cohere embed-v3 | 1024 | Fast | Good | Multilingual content |
| Local (e5-large) | 1024 | Varies | Good | Data privacy requirements |

#### Pipeline Stages

| Stage | Action | Multi-Tenant Consideration |
|-------|--------|---------------------------|
| Ingestion | Accept documents | Tenant auth + quota check |
| Preprocessing | Clean, normalize | Tenant-specific rules |
| Chunking | Split into pieces | Tenant-configurable strategy |
| Embedding | Generate vectors | Rate limit per tenant |
| Storage | Save to vector DB | Tenant-partitioned storage |
| Indexing | Build search index | Per-tenant index optimization |

#### Tenant Isolation Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Namespace | Same index, tenant prefix filter | Cost-efficient, free tier |
| Separate Index | Index per tenant | Strong isolation, pro tier |
| Collection | Collection per tenant within DB | Balance cost/isolation |
| Database | Dedicated vector DB per tenant | Enterprise tier |

#### Cost Optimization

| Technique | Savings | Trade-off |
|-----------|---------|-----------|
| Batch embedding | 50-70% | Increased latency |
| Smaller model | 60-80% | Lower quality |
| Dimension reduction | 30-50% | Slight quality loss |
| Caching | Variable | Storage cost |
| Deduplication | 20-40% | Processing overhead |

#### Embedding Update Strategy

| Trigger | Action | Scope |
|---------|--------|-------|
| Document updated | Re-embed document | Single vector |
| Model upgraded | Re-embed all | Tenant namespace |
| Tenant offboarded | Delete namespace | All tenant vectors |

---

## §retrieval-patterns

### Pattern: Retrieval Patterns

Implement query strategies with hybrid search and tenant-aware re-ranking for optimal relevance.

#### Query Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Pure Vector | Similarity search only | General semantic search |
| Filtered Vector | Vector + metadata filter | Tenant-scoped search |
| Hybrid | Vector + keyword (BM25) | Document retrieval |
| Re-ranking | Vector search + re-ranker | High precision needs |

#### Tenant-Scoped Query Components

| Query Component | Required | Purpose |
|-----------------|----------|---------|
| tenant_id filter | **Yes** | Isolation enforcement |
| top_k limit | Yes | Performance |
| score_threshold | Optional | Quality |
| metadata filters | Optional | Refinement |

#### Tenant-Aware Retrieval Pipeline

| Stage | Implementation | Isolation |
|-------|----------------|-----------|
| Query processing | Add tenant context | Query rewriting |
| Vector search | Filter by tenant_id | Namespace/metadata |
| Reranking | Tenant-specific models | Custom scoring |
| Post-processing | Verify tenant ownership | Final validation |

#### Context Priority Rules

| Priority | Content | Truncation |
|----------|---------|------------|
| 1 | System instructions | Never |
| 2 | Recent conversation | Last N turns |
| 3 | Highest relevance chunks | Top-K |
| 4 | Supporting context | If space allows |

#### Chunk Deduplication

| Scenario | Strategy | Rationale |
|----------|----------|-----------|
| Same document | Keep highest score | Avoid redundancy |
| Overlapping chunks | Merge with context | Preserve continuity |
| Cross-tier duplicate | Prefer tenant-specific | More relevant |

#### Scaling Patterns

| Pattern | When to Use | Implementation |
|---------|-------------|----------------|
| Vertical | < 10M vectors | Increase memory/CPU |
| Sharding | > 10M vectors | Partition by tenant hash |
| Replication | High availability | Read replicas |
| Tiered Storage | Cold data | Move old embeddings to cold tier |

---

## §rag-observability

### Pattern: RAG Observability

Monitor retrieval quality, embedding health, and generation fidelity with tenant-scoped metrics.

#### RAG Pipeline Metrics Hierarchy

| Pipeline Stage | Key Metrics | Purpose |
|----------------|-------------|---------|
| Query Processing | query_preprocessing_latency, query_embedding_latency | Measure input processing overhead |
| Retrieval | retrieval_latency, chunks_retrieved, retrieval_recall | Track search performance |
| Reranking | rerank_latency, rerank_score_distribution | Measure relevance refinement |
| Generation | context_tokens, generation_latency, answer_quality | Track LLM augmentation |

#### Per-Tenant Metric Dimensions

| Dimension | Labels | Purpose |
|-----------|--------|---------|
| Tenant | tenant_id, tenant_tier | Per-tenant billing and SLA tracking |
| Collection | collection_id, namespace | Tenant-scoped vector collections |
| Model | embedding_model, llm_model | Model-specific performance |
| Query | query_type, use_case | Usage pattern analysis |

#### Retrieval Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| rag_retrieval_latency_seconds | Histogram | tenant_id, collection_id | Time to retrieve chunks |
| rag_chunks_retrieved_total | Counter | tenant_id, collection_id | Number of chunks returned |
| rag_retrieval_recall | Gauge | tenant_id, query_type | Retrieval recall score |
| rag_relevance_score_distribution | Histogram | tenant_id, collection_id | Distribution of chunk scores |
| rag_empty_retrieval_total | Counter | tenant_id, collection_id | Zero-result queries |

#### Embedding Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| rag_embedding_latency_seconds | Histogram | tenant_id, model | Query embedding generation time |
| rag_embedding_batch_size | Histogram | tenant_id | Batch embedding sizes |
| rag_embedding_dimension_mismatch | Counter | tenant_id, collection_id | Dimension errors |

#### Quality Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| rag_answer_groundedness_score | Gauge | tenant_id | Answer grounded in retrieved context |
| rag_answer_relevance_score | Gauge | tenant_id | Answer relevance to query |
| rag_faithfulness_score | Gauge | tenant_id | Answer faithfulness to source |
| rag_user_feedback_rating | Histogram | tenant_id | User quality feedback |

#### Per-Tier SLA Alerts

| Tier | Retrieval p95 SLA | Empty Rate SLA | Alert Threshold |
|------|-------------------|----------------|-----------------|
| Enterprise | < 200ms | < 1% | Immediate |
| Pro | < 500ms | < 5% | 5m |
| Free | < 2s | < 10% | 15m |

#### RAG-Specific Alerts

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| RAGRetrievalLatencyHigh | rag_retrieval_latency_seconds:p95 > 500ms | WARNING | 5m |
| RAGRetrievalLatencyCritical | rag_retrieval_latency_seconds:p95 > 2s | CRITICAL | 2m |
| RAGEmptyRetrievalSpike | rate(rag_empty_retrieval_total[5m]) > 0.1 | WARNING | 5m |
| RAGRelevanceScoreDrop | avg(rag_relevance_score_distribution) < 0.6 | WARNING | 15m |
| RAGGroundednessLow | rag_answer_groundedness_score < 0.7 | WARNING | 15m |

#### Dashboard Components

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Retrieval Latency Distribution | rag_retrieval_latency_seconds | Heatmap |
| Chunks Retrieved Over Time | rag_chunks_retrieved_total | Time series |
| Relevance Score Distribution | rag_relevance_score_distribution | Histogram |
| Empty Retrieval Rate | rag_empty_retrieval_total | Gauge |
| Context Utilization | rag_context_utilization_ratio | Gauge |

---

## Quality Gates

### RAG Verification Checklist

| Category | Check | Critical |
|----------|-------|----------|
| **Isolation** | All vector queries include tenant_id filter | **YES** |
| **Isolation** | Namespace prefix matches tenant format | **YES** |
| **Isolation** | Cross-tenant retrieval prevented | **YES** |
| **Embedding** | Embedding model version tracked per tenant | No |
| **Embedding** | Re-embedding strategy documented | No |
| **Retrieval** | Retrieval latency within tier SLA | **YES** |
| **Retrieval** | Empty retrieval rate monitored | No |
| **Quality** | Groundedness scoring implemented | No |
| **Quality** | Citation verification active | **YES** |
| **Observability** | Per-tenant metrics exposed | **YES** |
| **Observability** | SLA alerts configured | No |

### Implementation Checklist

- [ ] All retrieval operations emit latency histograms
- [ ] Chunk relevance scores are captured per query
- [ ] Empty retrieval events are logged with query context
- [ ] Context token counts are tracked per request
- [ ] Embedding generation latency is measured
- [ ] Quality scores (groundedness, relevance) are computed
- [ ] Per-tenant RAG usage dashboard available
- [ ] Retrieval latency SLO alerts configured per tier

---

## Web Research

| Topic | Query |
|-------|-------|
| RAG Architecture | "RAG architecture multi-tenant patterns {date}" |
| RAG Best Practices | "retrieval augmented generation best practices {date}" |
| LangChain RAG | "LangChain RAG multi-tenant isolation {date}" |
| Vector Database Selection | "vector database multi-tenant isolation {date}" |
| Pinecone Multi-Tenant | "Pinecone namespace tenant isolation {date}" |
| pgvector Patterns | "pgvector PostgreSQL multi-tenant {date}" |
| Embedding Strategies | "multi-tenant embedding architecture {date}" |
| Chunking Best Practices | "vector embedding chunking strategies {date}" |
| RAG Observability | "RAG observability best practices {date}" |
| Semantic Search Metrics | "semantic search metrics production {date}" |
| RAG Tracing | "Langfuse RAG tracing {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **RAG patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `rag-*`
- **Vector patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `vector-*`
- **Embedding patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `embedding-*`
- **AI Runtime patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - RAG integration with agent framework
- `bmad-bam-rag-pipeline-design` - Design RAG pipeline end-to-end
- `bmad-bam-vector-database-design` - Select and configure vector database
- `bmad-bam-create-module-architecture` - Knowledge module design
- `bmad-bam-tenant-onboarding-design` - Knowledge base initialization for new tenants
- `bmad-bam-tenant-offboarding-design` - Vector data deletion for offboarded tenants
- `bmad-bam-tenant-aware-observability` - Tenant-scoped RAG metrics

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 5 source files: rag-architecture-guide.md (219 lines), vector-database-guide.md (209 lines), rag-observability.md (190 lines), vector-database-patterns.md (133 lines), embedding-patterns.md (132 lines) |
