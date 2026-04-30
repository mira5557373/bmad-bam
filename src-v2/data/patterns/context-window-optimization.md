---
pattern_id: context-window-optimization
shortcode: ZCW
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Context Window Optimization - BAM Pattern

**Loaded by:** ZCW  
**Applies to:** Multi-tenant RAG systems  
**See also:** [context-compilation.md](context-compilation.md), [rag-pipeline.md](rag-pipeline.md)

---

## When to Use

- Maximizing LLM context utilization
- Cost optimization for token-based billing
- Long document processing with limited windows
- Multi-turn conversations with context carryover
- Balancing context quality vs. quantity

## When NOT to Use

- Unlimited context models (future models)
- Simple single-turn Q&A with short answers
- Non-RAG applications with fixed prompts

## Architecture

### Token Budget Management

```
┌─────────────────────────────────────────────────────────────────┐
│               CONTEXT WINDOW OPTIMIZATION                        │
│                                                                  │
│  Model: Claude 3.5 Sonnet (200K tokens)                         │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                                                              ││
│  │  ┌──────────────────────────────────────────────────────┐   ││
│  │  │ System Prompt                              2,000 tok │   ││
│  │  └──────────────────────────────────────────────────────┘   ││
│  │                                                              ││
│  │  ┌──────────────────────────────────────────────────────┐   ││
│  │  │ Conversation History (compressed)          8,000 tok │   ││
│  │  └──────────────────────────────────────────────────────┘   ││
│  │                                                              ││
│  │  ┌──────────────────────────────────────────────────────┐   ││
│  │  │ Retrieved Context (prioritized)           32,000 tok │   ││
│  │  │ ┌────────────────────────────────────────────────┐   │   ││
│  │  │ │ Tier 1: Direct matches           12,000 tok    │   │   ││
│  │  │ ├────────────────────────────────────────────────┤   │   ││
│  │  │ │ Tier 2: High relevance           12,000 tok    │   │   ││
│  │  │ ├────────────────────────────────────────────────┤   │   ││
│  │  │ │ Tier 3: Supporting context        8,000 tok    │   │   ││
│  │  │ └────────────────────────────────────────────────┘   │   ││
│  │  └──────────────────────────────────────────────────────┘   ││
│  │                                                              ││
│  │  ┌──────────────────────────────────────────────────────┐   ││
│  │  │ Current Query                                100 tok │   ││
│  │  └──────────────────────────────────────────────────────┘   ││
│  │                                                              ││
│  │  ┌──────────────────────────────────────────────────────┐   ││
│  │  │ Reserved for Response                      4,000 tok │   ││
│  │  └──────────────────────────────────────────────────────┘   ││
│  │                                                              ││
│  │  Remaining buffer:                          153,900 tok     ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Compression Strategies

```
┌─────────────────────────────────────────────────────────────────┐
│               CONTEXT COMPRESSION STRATEGIES                     │
│                                                                  │
│  CONVERSATION COMPRESSION                                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Raw History (15 turns)          Compressed (5 turns + summary│
│  │ ┌───────────────────────┐       ┌───────────────────────┐   ││
│  │ │ Turn 1: [500 tok]     │       │ Summary: [800 tok]    │   ││
│  │ │ Turn 2: [400 tok]     │       │ "User asked about     │   ││
│  │ │ Turn 3: [600 tok]     │       │  SSO, billing, and    │   ││
│  │ │ ...                   │  ───► │  API access..."       │   ││
│  │ │ Turn 14: [300 tok]    │       │ Turn 11: [300 tok]    │   ││
│  │ │ Turn 15: [400 tok]    │       │ Turn 12: [350 tok]    │   ││
│  │ │                       │       │ ...                   │   ││
│  │ │ Total: 6,000 tok      │       │ Total: 2,500 tok      │   ││
│  │ └───────────────────────┘       └───────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  DOCUMENT COMPRESSION                                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Strategy         │ Compression │ Quality │ Use Case         ││
│  │──────────────────┼─────────────┼─────────┼──────────────────││
│  │ Extractive       │ 50-70%      │ High    │ Key sentences    ││
│  │ Abstractive      │ 70-90%      │ Medium  │ Summaries        ││
│  │ Selective        │ Variable    │ High    │ Relevant passages││
│  │ Hierarchical     │ 60-80%      │ High    │ Structured docs  ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
context_window_optimization:
  version: "1.0.0"
  bam_controlled: true
  
  model_limits:
    default_model: "claude-3-5-sonnet"
    models:
      claude-3-5-sonnet:
        max_tokens: 200000
        recommended_output: 4000
      gpt-4-turbo:
        max_tokens: 128000
        recommended_output: 4000
      gpt-4o:
        max_tokens: 128000
        recommended_output: 16000
        
  budget_allocation:
    system_prompt:
      fixed: 2000
    conversation_history:
      percentage: 10
      max_tokens: 16000
      compression_threshold: 8000
    retrieved_context:
      percentage: 60
      tiered: true
      tiers:
        - name: "direct_matches"
          percentage: 40
        - name: "high_relevance"
          percentage: 35
        - name: "supporting"
          percentage: 25
    response_reserve:
      fixed: 4000
      
  compression:
    conversation:
      method: "summarize_old"
      keep_recent_turns: 5
      summary_model: "claude-3-haiku"
    documents:
      method: "extractive"
      target_reduction: 0.6
      preserve_headers: true
      
  tenant_config:
    tier_budgets:
      free:
        max_context: 8000
        model: "claude-3-haiku"
      pro:
        max_context: 32000
        model: "claude-3-5-sonnet"
      enterprise:
        max_context: 128000
        model: "claude-3-5-sonnet"
        
  overflow_handling:
    strategy: "tiered_truncation"  # tiered_truncation, summarize, error
    truncation_order:
      - "supporting_context"
      - "older_history"
      - "high_relevance"
    preserve_always:
      - "direct_matches"
      - "recent_history"
```

### Optimization Techniques

| Technique | Savings | Quality Impact | Complexity |
|-----------|---------|----------------|------------|
| History summarization | 40-60% | Low | Medium |
| Extractive compression | 30-50% | Low | Low |
| Tiered truncation | 20-40% | Medium | Low |
| Dynamic allocation | 10-30% | None | Medium |
| Caching repeated context | 20-50% | None | Medium |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Fixed allocation | Predictable, simple | Inflexible | Consistent workloads |
| Dynamic allocation | Optimized per query | Complex | Variable queries |
| Aggressive compression | Max context | Quality loss | Token-constrained |
| Conservative | Quality preserved | Less context | High-value queries |

## Quality Checks

- [ ] Context within model limits
- [ ] Response reserve adequate
- [ ] Compression preserves meaning
- [ ] **CRITICAL:** Tenant budget limits enforced
- [ ] Tiered allocation matches priorities
- [ ] History compression maintains coherence

## Web Research Queries

- "LLM context window optimization techniques {date}"
- "conversation history compression RAG {date}"
- "token budget management multi-tenant {date}"
- "extractive summarization for context {date}"
- "Claude 200K context window best practices {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | Context window optimization verified |

## Related Patterns

- [context-compilation.md](context-compilation.md) - Context assembly
- [rag-pipeline.md](rag-pipeline.md) - End-to-end orchestration
- [streaming-rag.md](streaming-rag.md) - Streaming context
- [semantic-chunking.md](semantic-chunking.md) - Document splitting
