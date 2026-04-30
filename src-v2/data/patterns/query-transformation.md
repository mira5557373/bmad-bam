---
pattern_id: query-transformation
shortcode: ZQT
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Query Transformation - BAM Pattern

**Loaded by:** ZQT  
**Applies to:** Multi-tenant RAG systems  
**See also:** [rag-pipeline.md](rag-pipeline.md), [hybrid-search.md](hybrid-search.md)

---

## When to Use

- Improving retrieval quality through query rewriting
- Handling ambiguous or incomplete user queries
- Multi-step reasoning requiring query decomposition
- Domain-specific terminology expansion
- Conversation context integration into queries

## When NOT to Use

- Simple exact-match lookups
- Direct keyword searches
- When query latency is critical (<50ms)
- Fixed vocabulary systems

## Architecture

### Query Transformation Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│               QUERY TRANSFORMATION PIPELINE                      │
│                                                                  │
│  Original Query: "How do I fix the SSO issue?"                  │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   QUERY ANALYSIS                             ││
│  │  Intent: troubleshooting                                     ││
│  │  Entities: SSO, issue                                        ││
│  │  Missing: what issue? which SSO provider?                    ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   EXPANSION                                  ││
│  │  SSO → Single Sign-On, SAML, OAuth, OIDC                    ││
│  │  issue → error, problem, not working, failure               ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   REWRITING                                  ││
│  │  "troubleshoot Single Sign-On authentication errors         ││
│  │   SAML OAuth configuration problems"                        ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   DECOMPOSITION (optional)                   ││
│  │  Sub-query 1: "common SSO authentication errors"            ││
│  │  Sub-query 2: "SSO configuration troubleshooting steps"     ││
│  │  Sub-query 3: "SAML assertion validation issues"            ││
│  └─────────────────────────────────────────────────────────────┘│
│                           │                                      │
│                           ▼                                      │
│  Multiple retrieval passes → Merged results                      │
└─────────────────────────────────────────────────────────────────┘
```

### Transformation Strategies

```
┌─────────────────────────────────────────────────────────────────┐
│              TRANSFORMATION STRATEGIES                           │
│                                                                  │
│  HYPOTHETICAL DOCUMENT EMBEDDING (HyDE)                         │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Query: "How to configure rate limiting?"                    ││
│  │                    │                                         ││
│  │                    ▼                                         ││
│  │ LLM generates hypothetical answer:                          ││
│  │ "To configure rate limiting, navigate to the API gateway    ││
│  │  settings. Set the requests_per_minute parameter to your    ││
│  │  desired limit. Enable the rate_limit_exceeded_response..." ││
│  │                    │                                         ││
│  │                    ▼                                         ││
│  │ Embed hypothetical → Search for similar real docs           ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  STEP-BACK PROMPTING                                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Query: "Why is my SAML assertion failing at 2pm daily?"    ││
│  │                    │                                         ││
│  │                    ▼                                         ││
│  │ Step-back query: "What causes time-based SAML failures?"   ││
│  │ Retrieves: clock skew documentation, certificate expiry    ││
│  │                    │                                         ││
│  │                    ▼                                         ││
│  │ Combined with original query for better context             ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  MULTI-QUERY RETRIEVAL                                          │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Query: "Compare RLS vs schema isolation for compliance"    ││
│  │                    │                                         ││
│  │         ┌──────────┼──────────┐                              ││
│  │         ▼          ▼          ▼                              ││
│  │    "RLS tenant"  "schema"   "compliance                     ││
│  │    "isolation"   "isolation" "requirements                  ││
│  │    "patterns"    "patterns"  "multi-tenant"                 ││
│  │         │          │          │                              ││
│  │         └──────────┼──────────┘                              ││
│  │                    ▼                                         ││
│  │           Reciprocal Rank Fusion                            ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
query_transformation:
  version: "1.0.0"
  bam_controlled: true
  
  analysis:
    intent_detection: true
    entity_extraction: true
    model: "claude-3-haiku"
    
  expansion:
    enabled: true
    methods:
      - synonyms
      - acronyms
      - domain_terms
    domain_vocabulary:
      SSO: ["Single Sign-On", "SAML", "OAuth", "OIDC"]
      RLS: ["Row-Level Security", "tenant isolation"]
      API: ["REST", "GraphQL", "endpoint"]
      
  rewriting:
    enabled: true
    model: "claude-3-haiku"
    max_tokens: 100
    temperature: 0.3
    
  decomposition:
    enabled: true
    max_sub_queries: 4
    strategy: "parallel"  # parallel, sequential, adaptive
    
  hyde:
    enabled: false  # computationally expensive
    model: "claude-3-5-sonnet"
    hypothetical_length: 200
    
  step_back:
    enabled: true
    model: "claude-3-haiku"
    
  caching:
    enabled: true
    ttl_seconds: 3600
    max_entries: 10000
    
  tenant_config:
    per_tenant_vocabulary: true
    tier_features:
      free:
        expansion: true
        rewriting: false
        decomposition: false
      pro:
        expansion: true
        rewriting: true
        decomposition: false
      enterprise:
        expansion: true
        rewriting: true
        decomposition: true
        hyde: true
```

### Transformation Comparison

| Strategy | Latency | Quality Gain | Cost | Best For |
|----------|---------|--------------|------|----------|
| Expansion | +10ms | +10-20% | Low | Acronyms, synonyms |
| Rewriting | +200ms | +20-30% | Medium | Ambiguous queries |
| Decomposition | +500ms | +30-50% | High | Complex questions |
| HyDE | +1-2s | +40-60% | High | Low recall scenarios |
| Step-back | +300ms | +25-35% | Medium | Reasoning queries |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| No transformation | Fastest | Lower recall | Simple queries |
| Light (expansion) | Fast, cheap | Limited improvement | Production default |
| Medium (rewriting) | Good balance | Latency overhead | Interactive apps |
| Heavy (HyDE+decomp) | Best recall | Slow, expensive | Batch/research |

## Quality Checks

- [ ] Query latency within SLA
- [ ] Expansion vocabulary tenant-specific
- [ ] Rewriting preserves intent
- [ ] Decomposition improves recall
- [ ] **CRITICAL:** Transformed queries maintain tenant context
- [ ] Cache hit rate monitored

## Web Research Queries

- "RAG query rewriting techniques {date}"
- "HyDE hypothetical document embeddings {date}"
- "multi-query retrieval patterns {date}"
- "LangChain query transformation {date}"
- "step-back prompting RAG {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | Query transformation quality verified |

## Related Patterns

- [rag-pipeline.md](rag-pipeline.md) - End-to-end orchestration
- [hybrid-search.md](hybrid-search.md) - Search fusion
- [context-compilation.md](context-compilation.md) - Context assembly
- [streaming-rag.md](streaming-rag.md) - Real-time retrieval
