---
pattern_id: ai-verification
shortcode: ZAV
category: testing
qg_ref: QG-I3
version: 1.0.0
last_reviewed: 2026-04-29
---

# AI Verification - BAM Pattern

**Loaded by:** ZAV  
**Applies to:** LLM output verification, fact-checking, attribution tracking

---

## When to Use

- Verifying LLM outputs against source documents
- Implementing citation and attribution for generated content
- Fact-checking pipelines for knowledge-intensive applications
- RAG systems requiring traceable answers
- Compliance requirements for verifiable AI outputs
- Multi-tenant systems where attribution accuracy affects trust
- Signals: grounding, verification, attribution, fact-checking, citation, RAG validation

## When NOT to Use

- Creative content generation (fiction, brainstorming)
- No accuracy requirements (casual chat, entertainment)
- Development/sandbox environments
- Performance-critical paths where latency is prohibitive
- Single-source systems with trusted, static content

## Architecture

### Grounding Verification Levels

Grounding verification ensures LLM outputs are supported by source evidence. Select verification level based on accuracy requirements:

| Level | Method | Accuracy | Latency | Use Case |
|-------|--------|----------|---------|----------|
| Lexical | Exact/fuzzy string matching | Low | <10ms | Quick validation, keyword presence |
| Semantic | Embedding similarity (cosine) | Medium | 50-100ms | Paraphrase detection, concept matching |
| Entailment | NLI model classification | High | 100-300ms | Logical consistency, claim verification |
| Hybrid | Multi-stage pipeline | Highest | 200-500ms | High-stakes decisions, compliance |

### Grounding Schema

```yaml
grounding_config:
  verification_levels:
    lexical:
      enabled: true
      threshold: 0.8  # fuzzy match ratio
      algorithm: levenshtein
      
    semantic:
      enabled: true
      threshold: 0.75  # cosine similarity
      model: text-embedding-3-small
      index: vector_store
      
    entailment:
      enabled: true
      threshold: 0.85  # entailment probability
      model: cross-encoder/nli-deberta-v3-base
      labels: [entailment, neutral, contradiction]
      
    hybrid:
      pipeline:
        - lexical   # Fast filter
        - semantic  # Candidate ranking
        - entailment  # Final verification
      require_all: false  # Pass if any level passes
      
  on_ungrounded:
    action: flag  # flag | block | replace
    fallback_response: "I cannot verify this information from available sources."
    log_event: true
    notify_threshold: 0.5  # Notify if >50% claims ungrounded
    
  sources:
    retrieval:
      type: vector_search
      top_k: 5
      rerank: true
    cache:
      enabled: true
      ttl: 3600
    tenant_isolation: true  # Only search tenant's documents
```

### Chunk-Level Attribution Types

Attribution granularity determines the precision of source citations:

| Granularity | Resolution | Storage Cost | Precision | Use Case |
|-------------|------------|--------------|-----------|----------|
| Document-level | Entire document | Low | Low | General references, disclaimers |
| Page-level | Page/section | Medium | Medium | Legal documents, reports |
| Chunk-level | Paragraph/chunk | High | High | Knowledge bases, RAG systems |
| Sentence-level | Individual sentence | Very High | Highest | Academic, medical, legal AI |

### Attribution Schema

```yaml
attribution_config:
  granularity: chunk  # document | page | chunk | sentence
  
  tracking:
    source_ids: true
    chunk_ids: true
    confidence_scores: true
    timestamp: true
    retrieval_context: true
    
  output_format: inline  # inline | footnote | appendix | structured
  
  schema:
    # Structured attribution output
    attributed_response:
      type: object
      properties:
        content:
          type: string
          description: Generated response text
        citations:
          type: array
          items:
            type: object
            properties:
              text_span:
                type: object
                properties:
                  start: { type: integer }
                  end: { type: integer }
              source_id:
                type: string
              chunk_id:
                type: string
              confidence:
                type: number
                minimum: 0.0
                maximum: 1.0
              source_text:
                type: string
                description: Original text from source
        metadata:
          type: object
          properties:
            total_citations: { type: integer }
            avg_confidence: { type: number }
            sources_used: { type: array, items: { type: string } }
```

### Verification Pipeline

Complete pipeline combining retrieval, grounding verification, and attribution:

```yaml
verification_pipeline:
  steps:
    - name: extract_claims
      description: Parse LLM output into atomic claims
      config:
        model: claim_extractor
        output_format: claims_list
        
    - name: retrieve_sources
      description: Find relevant source documents for each claim
      config:
        retriever: hybrid_search
        top_k: 5
        tenant_scoped: true
        
    - name: verify_grounding
      description: Check each claim against retrieved sources
      config:
        method: hybrid
        min_confidence: 0.7
        parallel: true
        
    - name: generate_attribution
      description: Create citation links for verified claims
      config:
        format: inline_citation
        include_confidence: true
        include_source_text: true
        
  error_handling:
    on_verification_failure:
      action: partial_response  # partial_response | full_block | flag_only
      include_unverified: true
      mark_unverified: "[unverified]"
      
    on_retrieval_failure:
      action: fallback
      fallback_message: "Unable to verify from available sources."
```

### Verification Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AI Verification Pipeline                          │
│                                                                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐   │
│  │   LLM Output │───►│    Claim     │───►│     Claims List      │   │
│  │              │    │   Extractor  │    │  [claim1, claim2...] │   │
│  └──────────────┘    └──────────────┘    └──────────┬───────────┘   │
│                                                      │               │
│                             ┌────────────────────────┘               │
│                             ▼                                        │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │                  Per-Claim Processing                     │       │
│  │  ┌────────────┐    ┌────────────┐    ┌────────────────┐  │       │
│  │  │  Retrieve  │───►│   Verify   │───►│   Attribute    │  │       │
│  │  │  Sources   │    │  Grounding │    │   Citations    │  │       │
│  │  └────────────┘    └────────────┘    └────────────────┘  │       │
│  │       │                  │                   │           │       │
│  │       ▼                  ▼                   ▼           │       │
│  │  [doc1, doc2]    [grounded: 0.87]    {src, chunk, conf}  │       │
│  └──────────────────────────────────────────────────────────┘       │
│                                                      │               │
│                             ┌────────────────────────┘               │
│                             ▼                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    Response Assembly                          │   │
│  │  - Aggregate verified claims                                  │   │
│  │  - Mark/remove unverified content                             │   │
│  │  - Format citations per output_format                         │   │
│  │  - Calculate overall confidence score                         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                           │                          │
│                                           ▼                          │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Attributed Response                                          │   │
│  │  {                                                            │   │
│  │    "content": "The policy states...[1] Furthermore...[2]",    │   │
│  │    "citations": [{...}, {...}],                               │   │
│  │    "metadata": { "avg_confidence": 0.89, ... }                │   │
│  │  }                                                            │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Multi-Tenant Verification Configuration

```yaml
verification_tenant_config:
  # Per-tier verification settings
  tiers:
    free:
      verification_level: lexical
      attribution_granularity: document
      max_claims_per_request: 10
      cache_results: true
      
    pro:
      verification_level: semantic
      attribution_granularity: chunk
      max_claims_per_request: 50
      cache_results: true
      
    enterprise:
      verification_level: hybrid
      attribution_granularity: sentence
      max_claims_per_request: unlimited
      cache_results: true
      custom_models: true
      
  # Tenant-specific overrides
  tenant_overrides:
    tenant_legal_corp:
      verification_level: hybrid
      on_ungrounded: block  # Strict compliance
      require_confidence: 0.95
      
  # Isolation
  source_isolation: true  # Tenants only verify against their documents
  model_isolation: false  # Shared verification models
```

## Trade-offs

| Approach | Benefit | Cost | Best For |
|----------|---------|------|----------|
| Real-time verification | Immediate feedback, inline citations | High latency (200-500ms), compute cost | Interactive chat, Q&A |
| Post-hoc verification | Low latency response, batch efficiency | Delayed attribution, potential retractions | Content generation, reports |
| Strict grounding | Maximum accuracy, compliance-ready | Higher rejection rate, reduced coverage | Legal, medical, financial |
| Soft grounding | Better coverage, graceful degradation | Some unverified content passes | General knowledge, assistance |
| Document-level attribution | Low overhead, simple implementation | Imprecise citations, harder to verify | Disclaimers, general reference |
| Chunk-level attribution | Precise citations, verifiable | Higher storage, retrieval complexity | RAG, knowledge bases |
| Sentence-level attribution | Maximum precision, academic-grade | Very high overhead, latency | Research, legal discovery |

### Decision Matrix

| Requirement | Verification Level | Attribution Granularity | On Ungrounded |
|-------------|-------------------|------------------------|---------------|
| Casual chat | None/Lexical | None | N/A |
| Knowledge base Q&A | Semantic | Chunk | Flag |
| Customer support | Semantic | Chunk | Flag |
| Legal documents | Hybrid | Sentence | Block |
| Medical advice | Hybrid | Sentence | Block |
| Financial reports | Entailment | Chunk | Flag + Review |
| Academic research | Hybrid | Sentence | Flag |

## Web Research Queries

- "LLM output grounding verification techniques {date}"
- "RAG attribution best practices {date}"
- "fact-checking LLM responses production systems {date}"
- "chunk-level citation generation {date}"
- "NLI entailment verification LLM {date}"
- "multi-tenant AI verification patterns {date}"
- "RAGAS evaluation grounding metrics {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-I3 | Pattern implementation verified |

## Related Patterns

- See bam-patterns.csv for related patterns

