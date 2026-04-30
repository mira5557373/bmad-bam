---
pattern_id: streaming-rag
shortcode: ZSR
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Streaming RAG - BAM Pattern

**Loaded by:** ZSR  
**Applies to:** Multi-tenant RAG systems  
**See also:** [rag-pipeline.md](rag-pipeline.md), [context-compilation.md](context-compilation.md)

---

## When to Use

- Real-time response generation with low time-to-first-token
- Long-form responses where streaming improves UX
- Interactive chat applications
- Progressive document generation
- Reducing perceived latency in RAG systems

## When NOT to Use

- Batch processing with no user waiting
- Short responses (<50 tokens)
- Applications requiring complete response validation
- Environments without streaming support

## Architecture

### Streaming RAG Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    STREAMING RAG PIPELINE                        │
│                                                                  │
│  User Query                                                      │
│      │                                                           │
│      ▼                                                           │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────────────┐   │
│  │ Retrieve │───►│ Compile  │───►│   LLM Streaming Call     │   │
│  │ (async)  │    │ Context  │    │                          │   │
│  └──────────┘    └──────────┘    │  ┌──────────────────┐   │   │
│       │                           │  │ Token 1: "To"    │──────►│
│       │                           │  │ Token 2: "config"│──────►│
│       │                           │  │ Token 3: "ure"   │──────►│
│       │                           │  │ ...              │──────►│
│       │                           │  │ Token N: [DONE]  │──────►│
│       │                           │  └──────────────────┘   │   │
│       │                           └──────────────────────────┘   │
│       │                                      │                   │
│       └──────────────────────────────────────┘                   │
│                  │                                               │
│                  ▼                                               │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              CITATION POST-PROCESSING                        ││
│  │  Attach citations after stream completes                    ││
│  │  [1] user-guide.md  [2] api-docs.md                        ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Progressive Retrieval + Streaming

```
┌─────────────────────────────────────────────────────────────────┐
│              PROGRESSIVE RETRIEVAL WITH STREAMING               │
│                                                                  │
│  Timeline                                                        │
│  ──────────────────────────────────────────────────────────────►│
│  t=0ms        t=200ms      t=500ms       t=1000ms              │
│    │            │            │             │                    │
│    ▼            ▼            ▼             ▼                    │
│  ┌──────┐   ┌──────┐     ┌──────┐      ┌──────┐               │
│  │Query │   │First │     │Start │      │More  │               │
│  │Start │   │Chunks│     │Stream│      │Chunks│               │
│  └──────┘   └──────┘     └──────┘      └──────┘               │
│                │            │             │                     │
│                │            ▼             │                     │
│                │         "Based on        │                     │
│                │          your docs..."   │                     │
│                │            │             │                     │
│                │            ▼             ▼                     │
│                └─────────►  Streaming continues with            │
│                             additional context injected         │
│                                                                  │
│  Benefits:                                                       │
│  - User sees response at t=500ms instead of t=2000ms           │
│  - Progressive enhancement as more context arrives              │
└─────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
streaming_rag:
  version: "1.0.0"
  bam_controlled: true
  
  retrieval:
    strategy: "eager"  # eager, progressive, parallel
    initial_top_k: 3
    background_top_k: 7
    timeout_ms: 2000
    
  streaming:
    enabled: true
    provider: "openai"  # openai, anthropic, bedrock
    chunk_size: "token"  # token, sentence, paragraph
    buffer_size: 10
    
  progressive_retrieval:
    enabled: true
    initial_delay_ms: 200
    inject_additional_context: true
    max_injections: 2
    
  latency_optimization:
    parallel_retrieval: true
    cache_embeddings: true
    precompute_common_queries: true
    
  error_handling:
    stream_error_recovery: true
    fallback_to_sync: true
    partial_response_save: true
    
  citation_handling:
    mode: "post_stream"  # inline, post_stream, sidebar
    format: "numbered"
    
  tenant_config:
    tier_streaming:
      free:
        enabled: true
        max_tokens: 1000
      pro:
        enabled: true
        max_tokens: 4000
      enterprise:
        enabled: true
        max_tokens: 16000
        progressive_retrieval: true
```

### Streaming Protocol

```
┌─────────────────────────────────────────────────────────────────┐
│                   STREAMING PROTOCOL                             │
│                                                                  │
│  Server-Sent Events (SSE) Format                                │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ event: token                                                 ││
│  │ data: {"content": "To", "index": 0}                         ││
│  │                                                              ││
│  │ event: token                                                 ││
│  │ data: {"content": " configure", "index": 1}                 ││
│  │                                                              ││
│  │ event: token                                                 ││
│  │ data: {"content": " SSO", "index": 2}                       ││
│  │                                                              ││
│  │ event: metadata                                              ││
│  │ data: {"sources": ["doc1.md", "doc2.md"]}                   ││
│  │                                                              ││
│  │ event: done                                                  ││
│  │ data: {"total_tokens": 150, "citations": [...]}             ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  WebSocket Format                                                │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ {"type": "start", "query_id": "q123"}                       ││
│  │ {"type": "token", "content": "To", "i": 0}                  ││
│  │ {"type": "token", "content": " configure", "i": 1}          ││
│  │ {"type": "sources", "data": [...]}                          ││
│  │ {"type": "end", "stats": {...}}                             ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Latency Breakdown

| Stage | Non-Streaming | Streaming | Improvement |
|-------|---------------|-----------|-------------|
| Retrieval | 200ms | 200ms | - |
| Context compile | 50ms | 50ms | - |
| Time to first token | 2000ms | 300ms | 85% |
| Total response time | 2000ms | 2000ms | - |
| Perceived latency | 2000ms | 300ms | 85% |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Eager streaming | Lowest TTFT | May need correction | Chat UX |
| Buffered streaming | Smoother output | Slightly higher TTFT | Long responses |
| Progressive | Enriched context | Complex implementation | Research assistants |
| Non-streaming | Simpler, validatable | Poor UX for long | Short answers |

## Quality Checks

- [ ] Time-to-first-token <500ms
- [ ] Stream error recovery implemented
- [ ] Citations delivered post-stream
- [ ] **CRITICAL:** Tenant context in all streamed responses
- [ ] Progressive retrieval doesn't block stream
- [ ] Connection handling for dropped streams

## Web Research Queries

- "LLM streaming response patterns {date}"
- "RAG time-to-first-token optimization {date}"
- "Server-Sent Events streaming AI {date}"
- "progressive retrieval RAG architecture {date}"
- "streaming citation handling LLM {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | Streaming RAG latency metrics verified |

## Related Patterns

- [rag-pipeline.md](rag-pipeline.md) - End-to-end orchestration
- [context-compilation.md](context-compilation.md) - Context assembly
- [context-window-optimization.md](context-window-optimization.md) - Token management
- [query-transformation.md](query-transformation.md) - Query rewriting
