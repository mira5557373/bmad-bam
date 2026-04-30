---
pattern_id: hybrid-search
shortcode: ZHS
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Hybrid Search - BAM Pattern

**Loaded by:** ZHS  
**Applies to:** Multi-tenant RAG systems  
**See also:** [rag-pipeline.md](rag-pipeline.md), [query-transformation.md](query-transformation.md)

---

## When to Use

- Combining semantic similarity with keyword matching
- Queries requiring exact term matches (names, codes, IDs)
- Improving recall for diverse query types
- Domain-specific terminology that embeddings may miss
- Legal/medical/technical documents with precise terms

## When NOT to Use

- Pure semantic search sufficient for use case
- Very short documents where BM25 underperforms
- Real-time constraints where dual search is too slow
- Simple FAQ/Q&A with high embedding quality

## Architecture

### Hybrid Search Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      HYBRID SEARCH                               │
│                                                                  │
│  Query: "How do I configure SAML SSO for enterprise?"           │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   QUERY PROCESSING                           ││
│  │  ┌─────────────────┐         ┌─────────────────┐            ││
│  │  │ Query Embedding │         │   Query Terms   │            ││
│  │  │  [0.12, 0.87..] │         │  SAML, SSO,     │            ││
│  │  │                 │         │  enterprise,    │            ││
│  │  │                 │         │  configure      │            ││
│  │  └────────┬────────┘         └────────┬────────┘            ││
│  └───────────┼──────────────────────────┼──────────────────────┘│
│              │                          │                        │
│              ▼                          ▼                        │
│  ┌─────────────────────┐    ┌─────────────────────┐             │
│  │   VECTOR SEARCH     │    │    BM25 SEARCH      │             │
│  │                     │    │                     │             │
│  │ Semantic similarity │    │ Term frequency      │             │
│  │ Dense embeddings    │    │ Sparse matching     │             │
│  │                     │    │                     │             │
│  │ Results:            │    │ Results:            │             │
│  │ [doc_a: 0.92]       │    │ [doc_b: 8.5]        │             │
│  │ [doc_c: 0.88]       │    │ [doc_a: 7.2]        │             │
│  │ [doc_d: 0.85]       │    │ [doc_e: 6.8]        │             │
│  └──────────┬──────────┘    └──────────┬──────────┘             │
│             │                          │                         │
│             └────────────┬─────────────┘                         │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   SCORE FUSION                               ││
│  │                                                              ││
│  │  Reciprocal Rank Fusion (RRF):                              ││
│  │  score = Σ 1/(k + rank_i) for each ranking                  ││
│  │                                                              ││
│  │  Weighted Combination (alpha = 0.7):                        ││
│  │  score = alpha * vector_score + (1-alpha) * bm25_score_norm ││
│  │                                                              ││
│  │  Final Ranking:                                              ││
│  │  [doc_a: 0.95, doc_b: 0.82, doc_c: 0.78, ...]               ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Tenant-Aware Hybrid Search

```
┌──────────────────────────────────────────────────────────────┐
│              TENANT-AWARE HYBRID SEARCH                       │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Tenant Context: acme-corp (Enterprise tier)             │ │
│  │ Search Config: alpha=0.8, boost_exact=true              │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           │                                   │
│           ┌───────────────┼───────────────┐                   │
│           ▼               ▼               ▼                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  │ Vector Index │ │  BM25 Index  │ │Tenant Config │          │
│  │ (namespace:  │ │ (partition:  │ │ (alpha=0.8,  │          │
│  │  acme-corp)  │ │  acme-corp)  │ │  boost=true) │          │
│  └──────────────┘ └──────────────┘ └──────────────┘          │
│           │               │               │                   │
│           └───────────────┼───────────────┘                   │
│                           ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Fusion with tenant-specific alpha and boosting          │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
hybrid_search:
  version: "1.0.0"
  bam_controlled: true
  
  vector_search:
    provider: "pinecone"
    embedding_model: "text-embedding-3-large"
    top_k: 20
    score_threshold: 0.5
    
  keyword_search:
    provider: "elasticsearch"  # elasticsearch, opensearch, typesense
    algorithm: "BM25"
    k1: 1.2
    b: 0.75
    top_k: 20
    
  fusion:
    method: "rrf"  # rrf, weighted, convex
    rrf_k: 60
    alpha: 0.7  # vector weight for weighted/convex
    normalize_scores: true
    
  boosting:
    exact_match_boost: 2.0
    phrase_match_boost: 1.5
    field_boosts:
      title: 2.0
      summary: 1.5
      content: 1.0
      
  tenant_config:
    per_tenant_alpha: true
    default_alpha: 0.7
    tier_defaults:
      enterprise: 0.8  # More semantic
      pro: 0.7
      free: 0.6  # More keyword
      
  reranking:
    enabled: true
    model: "cross-encoder/ms-marco-MiniLM-L-6-v2"
    top_n: 10
```

### Fusion Algorithms

| Algorithm | Formula | Best For |
|-----------|---------|----------|
| RRF | score = Σ 1/(k + rank_i) | Diverse rankings, no calibration needed |
| Weighted | α * vec + (1-α) * kw | Tuned systems with calibrated scores |
| Convex | max(α * vec, (1-α) * kw) | When one signal dominates |
| Cascade | vec → filter by kw | High precision requirements |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Pure vector | Semantic understanding | Misses exact terms | Conversational queries |
| Pure BM25 | Exact matches, fast | No semantic similarity | Keyword-heavy domains |
| RRF fusion | Simple, effective | Ignores score magnitudes | General purpose |
| Weighted fusion | Tunable, interpretable | Requires score calibration | Optimized systems |

## Quality Checks

- [ ] Both vector and keyword indexes tenant-isolated
- [ ] Fusion weights tuned per domain
- [ ] Exact match boost for technical terms
- [ ] Reranking improves NDCG metrics
- [ ] **CRITICAL:** Tenant filters applied to both search paths
- [ ] Latency within SLA (p99 < 200ms)

## Web Research Queries

- "hybrid search RAG vector keyword fusion {date}"
- "Reciprocal Rank Fusion implementation {date}"
- "BM25 vs vector search comparison {date}"
- "Elasticsearch hybrid search with embeddings {date}"
- "reranking cross-encoder RAG {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | Hybrid search retrieval quality verified |

## Related Patterns

- [rag-pipeline.md](rag-pipeline.md) - End-to-end orchestration
- [query-transformation.md](query-transformation.md) - Query rewriting
- [vector-store-multi-tenant.md](vector-store-multi-tenant.md) - Vector isolation
- [index-management.md](index-management.md) - Index lifecycle
