---
pattern_id: grounding-verifier
shortcode: ZGV
category: ai-runtime
qg_ref: QG-AI3
version: 1.0.0
last_reviewed: 2026-04-30
---

# Grounding Verifier - BAM Pattern

**Loaded by:** ZGV  
**Applies to:** Verifying AI outputs are grounded in retrieved context, preventing hallucination  
**See also:** [ai-verification.md](ai-verification.md), [ai-safety.md](ai-safety.md)

---

## When to Use

- RAG (Retrieval-Augmented Generation) systems
- AI features requiring factual accuracy
- Legal, medical, or financial AI applications
- Customer support AI with knowledge bases
- Multi-tenant systems with tenant-specific documents

## When NOT to Use

- Creative writing or brainstorming AI features
- Conversational AI without knowledge bases
- Systems where hallucination is acceptable
- Development/prototyping phases

## Architecture

### Verification Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                   Grounding Verification                     │
│                                                              │
│  Retrieved Context          LLM Response                     │
│        │                         │                           │
│        ▼                         ▼                           │
│  ┌───────────┐             ┌───────────┐                    │
│  │  Source   │             │  Claims   │                    │
│  │ Documents │             │ Extractor │                    │
│  └─────┬─────┘             └─────┬─────┘                    │
│        │                         │                           │
│        └──────────┬──────────────┘                          │
│                   ▼                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Citation Verification                      │ │
│  │   • Match claims to source passages                     │ │
│  │   • Flag unsourced assertions                           │ │
│  └────────────────────────────────────────────────────────┘ │
│                   │                                          │
│                   ▼                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Semantic Similarity                        │ │
│  │   • Embedding comparison                                │ │
│  │   • Cross-reference verification                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                   │                                          │
│                   ▼                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Factual Consistency                        │ │
│  │   • Contradiction detection                             │ │
│  │   • Entailment verification                             │ │
│  └────────────────────────────────────────────────────────┘ │
│                   │                                          │
│                   ▼                                          │
│           Confidence Score + Actions                         │
└─────────────────────────────────────────────────────────────┘
```

### Verification Configuration Schema (P1-01)

```yaml
grounding_verification:
  version: "1.0.0"
  bam_controlled: true
  
  verification_methods:
    citation_check:
      enabled: bool
      require_source_attribution: bool
      max_unsourced_claims: int
      
    semantic_similarity:
      enabled: bool
      model: string
      threshold: float
      
    factual_consistency:
      enabled: bool
      cross_reference_sources: bool
      contradiction_threshold: float
      
  source_management:
    tenant_document_scope: bool
    shared_knowledge_base: enum[required, optional, disabled]
    
  output_actions:
    on_ungrounded:
      action: enum[flag, regenerate, block]
      max_regeneration_attempts: int
      
    confidence_scoring:
      include_in_response: bool
      format: enum[numeric, categorical, hidden]
```

### Tenant Isolation Schema (P1-02)

```yaml
tenant_grounding:
  document_scope:
    strategy: enum[tenant_only, tenant_plus_shared, all]
    default: string
    
  verification_strictness:
    free: enum[lenient, standard, strict]
    pro: enum[lenient, standard, strict]
    enterprise: enum[lenient, standard, strict]
    
  shared_knowledge:
    allowed_categories: list[string]
    excluded_categories: list[string]
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Citation only | Fast, simple | Misses paraphrasing | MVP |
| Semantic similarity | Catches paraphrasing | Compute cost | Standard |
| Full verification | Best accuracy | High latency | Enterprise |
| Regenerate on fail | Better output | Cost, latency | Critical apps |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Cross-tenant data leak | Strict tenant document scope |
| Adversarial sources | Source validation before indexing |
| Confidence manipulation | Server-side scoring only |
| Performance DoS | Rate limit verification requests |

## Web Research Queries

- "RAG grounding verification patterns {date}"
- "LLM hallucination detection techniques {date}"
- "citation verification AI systems {date}"
- "factual consistency checking NLP {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI3 | Grounding verification implemented |

## Related Patterns

- [ai-verification.md](ai-verification.md) - AI output verification
- [ai-safety.md](ai-safety.md) - Safety controls
- [decision-verification.md](decision-verification.md) - Decision validation
