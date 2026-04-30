---
pattern_id: context-compilation
shortcode: ZCC
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Context Compilation - BAM Pattern

**Loaded by:** ZCC  
**Applies to:** Multi-tenant RAG systems  
**See also:** [rag-pipeline.md](rag-pipeline.md), [context-window-optimization.md](context-window-optimization.md)

---

## When to Use

- Assembling retrieved chunks into LLM context
- Multi-source retrieval (vector, graph, structured data)
- Complex prompts with system instructions + examples + retrieved context
- Citation tracking requirements
- Context deduplication and ordering

## When NOT to Use

- Simple single-chunk retrieval
- Fixed prompt templates without dynamic context
- Non-RAG LLM applications

## Architecture

### Context Assembly Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                  CONTEXT COMPILATION PIPELINE                    │
│                                                                  │
│  Retrieved Sources                                               │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Vector Chunks    Graph Facts    Structured Data             ││
│  │ ┌────────────┐   ┌──────────┐   ┌──────────────┐           ││
│  │ │ chunk_1    │   │ fact_1   │   │ table_row_1  │           ││
│  │ │ chunk_2    │   │ fact_2   │   │ table_row_2  │           ││
│  │ │ chunk_3    │   │ fact_3   │   │              │           ││
│  │ └────────────┘   └──────────┘   └──────────────┘           ││
│  └────────────────────────────────────────────────────────────-┘│
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   DEDUPLICATION                              ││
│  │  Remove near-duplicates based on semantic similarity        ││
│  │  threshold = 0.95                                           ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   RELEVANCE RANKING                          ││
│  │  Re-rank by relevance to query                              ││
│  │  Prioritize recent, authoritative sources                   ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   TOKEN BUDGETING                            ││
│  │  Allocate tokens: system(2K) + context(6K) + response(2K)  ││
│  │  Truncate if over budget                                    ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   CONTEXT FORMATTING                         ││
│  │  Apply template with citations                              ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Context Template Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                  COMPILED CONTEXT                                │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ SYSTEM PROMPT                                    ~500 tokens ││
│  │ You are a helpful assistant for {tenant_name}...            ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ RETRIEVED CONTEXT                              ~4000 tokens ││
│  │                                                              ││
│  │ <context>                                                    ││
│  │ <source id="1" doc="user-guide.md" section="SSO Setup">    ││
│  │ To configure SSO, navigate to Settings > Security...       ││
│  │ </source>                                                    ││
│  │                                                              ││
│  │ <source id="2" doc="api-docs.md" section="Auth">           ││
│  │ The authentication endpoint accepts SAML assertions...      ││
│  │ </source>                                                    ││
│  │                                                              ││
│  │ <source id="3" type="knowledge-graph">                      ││
│  │ Entity: SSO Provider -> Relation: supports -> SAML 2.0     ││
│  │ </source>                                                    ││
│  │ </context>                                                   ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ FEW-SHOT EXAMPLES (optional)                    ~1000 tokens ││
│  │ Q: How do I reset my password?                              ││
│  │ A: Based on [source 1], you can reset your password by...  ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ USER QUERY                                       ~100 tokens ││
│  │ How do I configure SAML SSO for my organization?           ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Reserved for response:                            ~2000 tokens │
└─────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
context_compilation:
  version: "1.0.0"
  bam_controlled: true
  
  deduplication:
    enabled: true
    similarity_threshold: 0.95
    method: "embedding"  # embedding, hash, exact
    
  ranking:
    method: "reciprocal_rank_fusion"
    source_weights:
      vector: 0.5
      graph: 0.3
      structured: 0.2
    recency_boost: true
    recency_decay_days: 30
    
  token_budget:
    max_total: 8000
    allocations:
      system: 500
      context: 5500
      examples: 1000
      response: 1000
    overflow_strategy: "truncate_oldest"  # truncate_oldest, truncate_lowest_score, summarize
    
  formatting:
    template: "xml_sources"  # xml_sources, markdown, plain
    citation_format: "[source N]"
    include_metadata:
      - doc_name
      - section
      - last_updated
      - confidence_score
      
  tenant_config:
    per_tenant_templates: true
    per_tenant_budgets: true
    tier_budgets:
      free: 4000
      pro: 8000
      enterprise: 32000
```

### Source Prioritization

| Source Type | Priority | Token Allocation | Rationale |
|-------------|----------|------------------|-----------|
| Exact match | 1 (highest) | 30% | Direct answer |
| High-score vector | 2 | 40% | Semantic relevance |
| Graph facts | 3 | 15% | Structured knowledge |
| Related chunks | 4 | 10% | Supporting context |
| Examples | 5 | 5% | Format guidance |

## Trade-offs

| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| Greedy by score | Simple, fast | May miss diversity | Single-topic queries |
| Diversity sampling | Broad coverage | May miss best | Multi-aspect queries |
| Summarization | More content | Loses details | Large doc sets |
| Hierarchical | Structured | Complex | Nested documents |

## Quality Checks

- [ ] Context fits within token budget
- [ ] Citations traceable to source documents
- [ ] Deduplication removes redundancy
- [ ] **CRITICAL:** All sources from same tenant
- [ ] Relevance ranking improves answer quality
- [ ] Template formatting consistent

## Web Research Queries

- "RAG context window management {date}"
- "LLM prompt context assembly patterns {date}"
- "citation tracking in RAG systems {date}"
- "token budget optimization RAG {date}"
- "context deduplication strategies {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | Context compilation quality verified |

## Related Patterns

- [rag-pipeline.md](rag-pipeline.md) - End-to-end orchestration
- [context-window-optimization.md](context-window-optimization.md) - Token management
- [hybrid-search.md](hybrid-search.md) - Multi-source retrieval
- [streaming-rag.md](streaming-rag.md) - Streaming context
