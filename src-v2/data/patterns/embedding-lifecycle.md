---
pattern_id: embedding-lifecycle
shortcode: ZEL
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Embedding Lifecycle - BAM Pattern

**Loaded by:** ZEL  
**Applies to:** Multi-tenant RAG systems  
**See also:** [rag-pipeline.md](rag-pipeline.md), [vector-store-multi-tenant.md](vector-store-multi-tenant.md)

---

## When to Use

- Managing embedding model versions across tenants
- Migrating to new embedding models
- A/B testing embedding strategies
- Maintaining backward compatibility during upgrades
- Per-tenant embedding model configurations

## When NOT to Use

- Single embedding model with no version changes planned
- Small datasets where full re-embedding is trivial
- Prototypes without production requirements

## Architecture

### Embedding Version Management

```
┌─────────────────────────────────────────────────────────────────┐
│                EMBEDDING LIFECYCLE MANAGEMENT                    │
│                                                                  │
│  Model Registry                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Model Version  │ Dimensions │ Status     │ Tenants         ││
│  │────────────────┼────────────┼────────────┼─────────────────││
│  │ ada-002        │ 1536       │ deprecated │ 5               ││
│  │ text-embed-3-s │ 1536       │ active     │ 150             ││
│  │ text-embed-3-l │ 3072       │ active     │ 45              ││
│  │ custom-v1      │ 768        │ testing    │ 2               ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Per-Document Tracking                                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ doc_id    │ chunk_id │ model_version   │ embedded_at       ││
│  │───────────┼──────────┼─────────────────┼───────────────────││
│  │ doc_001   │ chunk_1  │ text-embed-3-s  │ 2026-04-30T10:00 ││
│  │ doc_001   │ chunk_2  │ text-embed-3-s  │ 2026-04-30T10:00 ││
│  │ doc_002   │ chunk_1  │ ada-002         │ 2025-01-15T08:00 ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Migration Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                   EMBEDDING MIGRATION                            │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    PARALLEL MIGRATION                        ││
│  │                                                              ││
│  │  Old Index (ada-002)          New Index (text-embed-3-s)    ││
│  │  ┌──────────────────┐         ┌──────────────────┐          ││
│  │  │  All docs        │──────►  │  Migrating...    │          ││
│  │  │  (1536 dims)     │  batch  │  (1536 dims)     │          ││
│  │  └──────────────────┘         └──────────────────┘          ││
│  │                                                              ││
│  │  Query Router                                                ││
│  │  ┌──────────────────────────────────────────────────────┐   ││
│  │  │ if doc.model_version == "ada-002":                   │   ││
│  │  │     query old_index with ada-002 embedding           │   ││
│  │  │ else:                                                │   ││
│  │  │     query new_index with text-embed-3-s embedding   │   ││
│  │  └──────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    SHADOW MIGRATION                          ││
│  │                                                              ││
│  │  Production Index              Shadow Index                  ││
│  │  ┌──────────────────┐         ┌──────────────────┐          ││
│  │  │  ada-002         │         │  text-embed-3-s  │          ││
│  │  │  (serving)       │         │  (testing)       │          ││
│  │  └────────┬─────────┘         └────────┬─────────┘          ││
│  │           │                            │                     ││
│  │           ▼                            ▼                     ││
│  │       Results A                    Results B                 ││
│  │           │                            │                     ││
│  │           └──────────┬─────────────────┘                     ││
│  │                      ▼                                       ││
│  │              Compare & Log Metrics                           ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
embedding_lifecycle:
  version: "1.0.0"
  bam_controlled: true
  
  model_registry:
    default_model: "text-embedding-3-small"
    models:
      - id: "text-embedding-3-small"
        provider: "openai"
        dimensions: 1536
        status: "active"
        cost_per_1k_tokens: 0.00002
      - id: "text-embedding-3-large"
        provider: "openai"
        dimensions: 3072
        status: "active"
        cost_per_1k_tokens: 0.00013
      - id: "ada-002"
        provider: "openai"
        dimensions: 1536
        status: "deprecated"
        deprecation_date: "2026-06-01"
        
  tenant_config:
    allow_model_override: true
    tier_defaults:
      free: "text-embedding-3-small"
      pro: "text-embedding-3-small"
      enterprise: "text-embedding-3-large"
      
  migration:
    strategy: "parallel"  # parallel, shadow, big-bang
    batch_size: 1000
    rate_limit_per_minute: 3000
    rollback_enabled: true
    validation:
      sample_size: 100
      similarity_threshold: 0.8
      
  versioning:
    track_per_document: true
    track_per_chunk: true
    metadata_fields:
      - model_version
      - embedded_at
      - embedding_hash
      
  cleanup:
    retain_old_embeddings_days: 30
    archive_before_delete: true
```

### Migration Workflow

| Phase | Action | Rollback |
|-------|--------|----------|
| 1. Prepare | Create new index, validate model | Delete new index |
| 2. Shadow | Dual-write, compare results | Disable shadow |
| 3. Migrate | Batch re-embed existing docs | Keep old index |
| 4. Validate | Sample comparison, metric check | Revert routing |
| 5. Switch | Route queries to new index | Route to old |
| 6. Cleanup | Archive/delete old index | Restore from archive |

## Trade-offs

| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| Parallel | Zero downtime, gradual | Dual storage cost | Production systems |
| Shadow | Safe testing | Compute overhead | Critical migrations |
| Big-bang | Simple, clean | Downtime required | Small datasets |
| Per-tenant | Isolated risk | Complex routing | Enterprise tenants |

## Quality Checks

- [ ] **CRITICAL:** Query embedding model matches document model
- [ ] Migration progress tracked per tenant
- [ ] Rollback tested before production migration
- [ ] Old embeddings archived before deletion
- [ ] Cost attribution by model version
- [ ] Deprecation notices sent to tenants

## Web Research Queries

- "embedding model migration strategies {date}"
- "OpenAI text-embedding-3 migration {date}"
- "vector store embedding version management {date}"
- "A/B testing embedding models RAG {date}"
- "embedding model benchmarking MTEB {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | Embedding lifecycle management verified |

## Related Patterns

- [rag-pipeline.md](rag-pipeline.md) - End-to-end orchestration
- [vector-store-multi-tenant.md](vector-store-multi-tenant.md) - Vector isolation
- [index-management.md](index-management.md) - Index lifecycle
- [semantic-chunking.md](semantic-chunking.md) - Document splitting
