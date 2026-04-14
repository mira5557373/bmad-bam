# BAM Context Compiler Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing AI agent memory architecture, context management, or prompt engineering for multi-tenant agents.

**Integrates with:** Architect (Nova persona), Dev agent

---

## Core Concepts

### What is a Context Compiler?

A context compiler assembles, prioritizes, and formats information from multiple memory tiers into a coherent context window for LLM consumption. It solves the challenge of fitting relevant information into limited token budgets while maintaining coherence.

### Context Compilation Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    Context Compilation Pipeline                  │
│                                                                  │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │  Gather  │──►│  Score   │──►│ Compress │──►│  Format  │    │
│  │ Sources  │   │ Relevance│   │ Content  │   │  Output  │    │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘    │
│       │              │              │              │            │
│       ▼              ▼              ▼              ▼            │
│  Memory tiers   Recency +      Summarize      Structured       │
│  Documents      Similarity     Truncate       Prompt           │
│  Tools          User prefs     Dedupe         XML/JSON         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Memory Tier Integration

### Tier Priority Matrix

| Tier | Priority | Token Budget | Refresh Rate |
|------|----------|--------------|--------------|
| Working Memory | 1 (highest) | 40% | Every turn |
| Episodic Memory | 2 | 25% | On relevance |
| Semantic Memory | 3 | 20% | On query match |
| Procedural Memory | 4 | 10% | On task type |
| Collective Memory | 5 (lowest) | 5% | Rare |

### Tier Source Mapping

```
Working Memory
├── Current conversation turns
├── Active tool results
├── Immediate task context
└── User's current request

Episodic Memory
├── Recent conversation summaries
├── Past task outcomes
├── Error patterns (last N)
└── User preference signals

Semantic Memory
├── Domain knowledge (RAG)
├── Documentation chunks
├── FAQ responses
└── Product information

Procedural Memory
├── Workflow templates
├── Task execution patterns
├── Tool usage examples
└── Best practice guides

Collective Memory (Tenant-Scoped)
├── Organization knowledge
├── Team conventions
├── Shared documents
└── Cross-user insights
```

---

## Compilation Strategies

### Strategy 1: Token Budget Allocation

```python
# Conceptual budget allocation
context_budget = {
    "system_prompt": 500,      # Fixed
    "working_memory": 2000,    # 40% of remaining
    "episodic_memory": 1250,   # 25%
    "semantic_memory": 1000,   # 20%
    "procedural_memory": 500,  # 10%
    "collective_memory": 250,  # 5%
    "user_message": 500,       # Reserved
    "buffer": 500              # Safety margin
}
# Total: ~6500 tokens for 8K context
```

### Strategy 2: Relevance Scoring

| Factor | Weight | Calculation |
|--------|--------|-------------|
| Recency | 0.3 | Exponential decay from timestamp |
| Similarity | 0.4 | Cosine similarity to current query |
| User preference | 0.15 | Explicit user ratings/feedback |
| Task alignment | 0.15 | Match to current task type |

```
final_score = (recency * 0.3) + (similarity * 0.4) + 
              (user_pref * 0.15) + (task_align * 0.15)
```

### Strategy 3: Compression Techniques

| Technique | Use Case | Compression Ratio |
|-----------|----------|-------------------|
| Summarization | Long conversations | 5-10x |
| Entity extraction | Document context | 10-20x |
| Key-value extraction | Structured data | 3-5x |
| Truncation | Overflow handling | Variable |
| Deduplication | Repeated info | 1.5-2x |

---

## Tenant-Aware Compilation

### Tenant Context Injection

```
┌─────────────────────────────────────────────────────────────┐
│                 Tenant Context Layer                         │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Tenant Config   │  │ Tenant Features │                  │
│  │ - tier          │  │ - enabled tools │                  │
│  │ - preferences   │  │ - custom prompts│                  │
│  │ - limits        │  │ - integrations  │                  │
│  └────────┬────────┘  └────────┬────────┘                  │
│           │                    │                            │
│           └─────────┬──────────┘                            │
│                     ▼                                        │
│           ┌─────────────────┐                               │
│           │ Context Compiler│                               │
│           │ (Tenant-Scoped) │                               │
│           └─────────────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

### Tenant Isolation in Context

| Component | Isolation Method |
|-----------|------------------|
| Memory retrieval | Filter by tenant_id |
| Document search | Tenant-scoped index |
| Tool availability | Feature flags per tier |
| System prompts | Tenant-specific overrides |
| Collective memory | Strict tenant boundary |

### Cross-Tenant Prevention

```
# Context compilation MUST include tenant filter
compiled_context = compiler.compile(
    query=user_query,
    tenant_id=current_tenant,  # Required
    memory_tiers=enabled_tiers,
    tool_filter=tenant_tools
)

# Validation
assert all(
    item.tenant_id == current_tenant 
    for item in compiled_context.items
)
```

---

## Output Formatting

### Format 1: Structured XML

```xml
<context>
  <system>
    <role>You are a helpful assistant for {{tenant_name}}.</role>
    <capabilities>{{available_tools}}</capabilities>
  </system>
  
  <memory type="working">
    <turn role="user">{{recent_user_message}}</turn>
    <turn role="assistant">{{recent_assistant_response}}</turn>
  </memory>
  
  <memory type="episodic">
    <summary>{{conversation_summary}}</summary>
    <relevant_past>{{similar_past_interaction}}</relevant_past>
  </memory>
  
  <memory type="semantic">
    <document relevance="0.92">{{relevant_doc_chunk}}</document>
  </memory>
  
  <memory type="procedural">
    <workflow>{{applicable_workflow}}</workflow>
  </memory>
</context>
```

### Format 2: Hierarchical Markdown

```markdown
## System Context
- Role: {{role_description}}
- Tenant: {{tenant_name}} ({{tier}} tier)
- Available tools: {{tool_list}}

## Current Conversation
{{working_memory_turns}}

## Relevant History
{{episodic_memory_summary}}

## Knowledge Base
{{semantic_memory_chunks}}

## Guidelines
{{procedural_memory_instructions}}
```

### Format 3: JSON Structure

```json
{
  "system": {
    "role": "assistant",
    "tenant": {"id": "...", "name": "...", "tier": "pro"},
    "tools": ["search", "calculate", "generate"]
  },
  "context": {
    "working": [...],
    "episodic": [...],
    "semantic": [...],
    "procedural": [...]
  },
  "constraints": {
    "token_limit": 8000,
    "response_format": "markdown"
  }
}
```

---

## Caching Strategies

### Cache Layers

| Layer | Scope | TTL | Invalidation |
|-------|-------|-----|--------------|
| Compiled context | Per-conversation | 5 min | New message |
| Memory embeddings | Per-tenant | 1 hour | Memory update |
| Document chunks | Per-document | 24 hours | Document change |
| System prompts | Per-tenant-tier | 1 hour | Config change |

### Cache Key Structure

```
context:{tenant_id}:{conversation_id}:{turn_number}
memory:{tenant_id}:{memory_tier}:{hash(query)}
chunk:{tenant_id}:{document_id}:{chunk_index}
```

---

## Performance Optimization

### Parallel Retrieval

```
┌─────────────────────────────────────────────────────────┐
│              Parallel Memory Retrieval                   │
│                                                          │
│  Query ──┬──► Working Memory ────┐                      │
│          │                        │                      │
│          ├──► Episodic Memory ───┼───► Merge & Rank    │
│          │                        │                      │
│          ├──► Semantic Memory ───┤                      │
│          │                        │                      │
│          └──► Procedural Memory ─┘                      │
│                                                          │
│  Latency: max(tier_latencies) vs sum(tier_latencies)    │
└─────────────────────────────────────────────────────────┘
```

### Optimization Techniques

| Technique | Impact | Implementation |
|-----------|--------|----------------|
| Async retrieval | 3-5x faster | Parallel tier queries |
| Embedding cache | 10x faster | Pre-computed vectors |
| Incremental compile | 2x faster | Delta updates only |
| Lazy loading | Memory efficient | Load on demand |

---

## Error Handling

### Graceful Degradation

| Failure | Fallback | User Impact |
|---------|----------|-------------|
| Semantic memory unavailable | Skip tier, proceed | Reduced context |
| Embedding service down | Use keyword search | Lower relevance |
| Cache miss | Direct retrieval | Slower response |
| Token overflow | Truncate lower priority | Some context lost |

### Recovery Patterns

```
try:
    context = compiler.compile_full(query, tenant_id)
except MemoryTierUnavailable as e:
    context = compiler.compile_partial(
        query, 
        tenant_id,
        exclude_tiers=[e.tier]
    )
    log.warning(f"Degraded context: missing {e.tier}")
except TokenOverflow as e:
    context = compiler.compile_with_budget(
        query,
        tenant_id,
        max_tokens=e.available_tokens
    )
```

---

## Testing Context Compilation

### Unit Tests

- [ ] Token budget respected
- [ ] Relevance scoring consistent
- [ ] Tenant isolation enforced
- [ ] Format output valid
- [ ] Compression ratios acceptable

### Integration Tests

- [ ] End-to-end compilation flow
- [ ] Memory tier retrieval
- [ ] Cache hit/miss behavior
- [ ] Error recovery paths

### Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Relevance precision | > 0.8 | Human evaluation |
| Context coherence | > 0.85 | LLM self-evaluation |
| Compilation latency | < 200ms | P95 timing |
| Token efficiency | > 90% | Used vs budget |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design context compilation within agent runtime
- `bmad-bam-tenant-model-isolation` - Implement tenant-scoped context boundaries
- `bmad-bam-ai-eval-safety-design` - Evaluate context compilation safety

## Related Patterns

- `memory-tiers` pattern in `bam-patterns.csv`
- `memory-tiers.md` agent guide
- `ai-runtime.md` agent guide
- `tool-patterns.md` for tool context

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI context compilation patterns {date}"
- Search: "multi-tenant prompt engineering {date}"
- Search: "LLM context window optimization {date}"

---

## Application Guidelines

When designing context compilation for multi-tenant AI systems:

1. **Context Isolation**
   - Enforce tenant_id filtering at the retrieval layer before compilation begins
   - Validate all context sources belong to the requesting tenant
   - Use tenant-scoped embedding indices to prevent cross-tenant similarity matches
   - Implement audit logging for context access patterns per tenant

2. **Token Optimization**
   - Apply compression strategies based on memory tier priority (working > episodic > semantic)
   - Use incremental summarization for long conversation histories
   - Deduplicate overlapping information across memory tiers before budget allocation
   - Reserve buffer tokens (5-10%) for runtime adjustments and tool responses

3. **Performance Considerations**
   - Cache compiled contexts at the conversation level with turn-based invalidation
   - Use parallel retrieval across memory tiers to minimize compilation latency
   - Pre-compute and cache tenant-specific embeddings during off-peak hours
   - Monitor P95 compilation latency per tenant tier (target: <200ms)

4. **Security**
   - Sanitize all context inputs to prevent prompt injection attacks
   - Implement strict tenant boundary enforcement at the compilation layer
   - Validate that collective memory retrieval respects organization boundaries
   - Log and alert on any cross-tenant context access attempts

5. **Tier-Aware Compilation**
   - Adjust token budgets based on tenant subscription tier (free/pro/enterprise)
   - Enable advanced memory tiers (collective, procedural) only for higher tiers
   - Apply rate limiting on context compilation requests per tenant
   - Provide graceful degradation when tenant exceeds allocated resources

6. **Quality Assurance**
   - Validate relevance scores meet minimum thresholds before including context
   - Test context coherence using LLM self-evaluation on sample compilations
   - Monitor token efficiency (used vs budget) to identify optimization opportunities
   - Implement fallback strategies when primary memory tiers are unavailable

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Limited token budget? | Aggressive compression, prioritize working memory |
| Long conversations? | Summarize episodic, keep recent turns |
| Knowledge-heavy tasks? | Increase semantic memory budget |
| Procedural tasks? | Load relevant workflows |
| Multi-tenant platform? | Strict tenant filtering on all tiers |
