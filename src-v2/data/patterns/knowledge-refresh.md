---
pattern_id: knowledge-refresh
shortcode: ZKR
category: advanced-ai
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Knowledge Refresh - BAM Pattern

**Loaded by:** ZKR  
**Applies to:** Incremental knowledge updates, stale content detection, embedding refresh

---

## When to Use

- RAG systems with frequently updated content sources
- Multi-tenant knowledge bases requiring independent refresh schedules
- Compliance environments requiring content freshness guarantees
- Systems with heterogeneous content update frequencies
- Reducing re-computation costs while maintaining freshness

## When NOT to Use

- Static knowledge bases
- Real-time streaming content (use streaming ingestion instead)
- Small knowledge bases where full refresh is acceptable
- Systems without freshness requirements

## Architecture

### Knowledge Refresh Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                  Knowledge Refresh System                        │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Change Detection Layer                    │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │   │
│  │  │  Poll   │  │ Webhook │  │   CDC   │  │  Hash   │      │   │
│  │  │ Sources │  │ Receive │  │ Stream  │  │ Compare │      │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘      │   │
│  │       │            │            │            │            │   │
│  │       └────────────┴────────────┴────────────┘            │   │
│  │                          │                                 │   │
│  │                          ▼                                 │   │
│  │               ┌─────────────────────┐                     │   │
│  │               │   Change Analyzer   │                     │   │
│  │               │ - Diff computation  │                     │   │
│  │               │ - Impact assessment │                     │   │
│  │               │ - Priority scoring  │                     │   │
│  │               └─────────────────────┘                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Tenant Scheduler                          │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  Tenant A: Hourly │ Tenant B: Daily │ Tenant C: RT  │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Refresh Executor                          │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                   │   │
│  │  │Incremental│ │Selective│ │  Full   │                   │   │
│  │  │ Update  │  │Re-embed │  │Rebuild  │                   │   │
│  │  └─────────┘  └─────────┘  └─────────┘                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Staleness Detection Strategies

| Strategy | Detection Method | Trigger |
|----------|------------------|---------|
| Time-based | TTL expiration | Content older than threshold |
| Hash-based | Content hash comparison | Hash mismatch on poll |
| CDC | Database change stream | Row update/insert/delete |
| Webhook | Source notification | External event trigger |
| Embedding drift | Similarity to fresh sample | Drift score exceeds threshold |

### Refresh Types

| Type | Description | Use Case |
|------|-------------|----------|
| Incremental | Update only changed chunks | Most common, efficient |
| Selective | Re-embed specific documents | Model upgrade, quality fix |
| Full rebuild | Recreate entire index | Major schema change |
| Cascade | Propagate through dependencies | Linked knowledge graphs |

## Configuration Schema

```yaml
bam_controlled: true

knowledge_refresh:
  staleness_detection:
    strategies:
      - type: "time_based"
        default_ttl_hours: 24
        check_interval_minutes: 60
        
      - type: "hash_based"
        algorithm: "xxhash64"
        poll_interval_minutes: 30
        
      - type: "cdc"
        enabled: true
        source: "postgres_logical"
        slot_name: "knowledge_refresh"
        
      - type: "webhook"
        enabled: true
        endpoint: "/api/v1/knowledge/refresh"
        auth: "hmac_sha256"
        
  embedding_drift:
    enabled: true
    sample_size: 100
    drift_threshold: 0.15
    check_frequency: "daily"
    
  tenant_schedules:
    tier_defaults:
      free:
        refresh_frequency: "daily"
        max_concurrent_refreshes: 1
        priority: "low"
        
      pro:
        refresh_frequency: "hourly"
        max_concurrent_refreshes: 3
        priority: "medium"
        
      enterprise:
        refresh_frequency: "real_time"
        max_concurrent_refreshes: 10
        priority: "high"
        custom_schedules: true
        
  refresh_policies:
    incremental:
      batch_size: 100
      parallelism: 4
      retry_failed: true
      
    full_rebuild:
      trigger_conditions:
        - "embedding_model_change"
        - "schema_migration"
        - "manual_request"
      require_approval: true
      backup_before_rebuild: true
      
  cost_optimization:
    enabled: true
    batch_similar_content: true
    off_peak_scheduling: true
    embedding_cache:
      enabled: true
      ttl_hours: 168
      
  monitoring:
    metrics:
      - "documents_refreshed"
      - "staleness_age_seconds"
      - "refresh_duration_seconds"
      - "embedding_cost_usd"
    alerts:
      - condition: "staleness_p99 > 86400"
        severity: "warning"
        message: "Content staleness exceeding 24 hours"
```

### Refresh Job Schema

```yaml
refresh_job:
  job_id: "rj_uuid_001"
  tenant_id: "tenant_123"
  created_at: "2026-04-30T02:00:00Z"
  status: "completed"
  
  trigger:
    type: "scheduled"
    schedule: "0 2 * * *"
    
  scope:
    type: "incremental"
    filter: "updated_since_last_refresh"
    
  execution:
    documents_scanned: 15000
    documents_changed: 234
    chunks_updated: 892
    chunks_deleted: 45
    chunks_added: 127
    
  timings:
    started_at: "2026-04-30T02:00:01Z"
    completed_at: "2026-04-30T02:15:43Z"
    duration_seconds: 942
    
  costs:
    embedding_tokens: 450000
    embedding_cost_usd: 0.045
    compute_cost_usd: 0.023
    total_cost_usd: 0.068
    
  quality:
    drift_before: 0.18
    drift_after: 0.04
    freshness_score: 0.97
```

### Staleness Tracking Schema

```yaml
staleness_tracking:
  tenant_id: "tenant_123"
  last_updated: "2026-04-30T02:15:43Z"
  
  sources:
    - source_id: "confluence"
      total_documents: 5000
      stale_documents: 23
      avg_age_hours: 4.2
      oldest_document_hours: 72
      
    - source_id: "github_docs"
      total_documents: 1200
      stale_documents: 0
      avg_age_hours: 1.1
      oldest_document_hours: 24
      
    - source_id: "notion"
      total_documents: 8000
      stale_documents: 156
      avg_age_hours: 12.5
      oldest_document_hours: 168
      
  overall:
    freshness_score: 0.91
    documents_needing_refresh: 179
    estimated_refresh_time_minutes: 15
    estimated_refresh_cost_usd: 0.045
```

## Trade-offs

| Approach | Benefit | Cost |
|----------|---------|------|
| Real-time refresh | Always fresh | High compute, costs |
| Scheduled refresh | Cost predictable | Potential staleness |
| CDC-based | Efficient detection | Infrastructure complexity |
| Full rebuild | Clean state | High cost, downtime |
| Incremental | Cost efficient | Potential drift accumulation |

## Refresh Decision Matrix

| Content Type | Volatility | Recommended Strategy |
|--------------|------------|---------------------|
| Legal/compliance | Low | Daily + webhook on change |
| Product docs | Medium | Hourly scheduled |
| Support tickets | High | Real-time CDC |
| User-generated | Variable | Per-tenant config |
| External feeds | Variable | Webhook + polling fallback |

## Web Research Queries

- "RAG knowledge base refresh patterns {date}"
- "embedding drift detection techniques {date}"
- "incremental vector store update patterns {date}"
- "change data capture knowledge graph {date}"
- "multi-tenant content freshness management {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Refresh operations isolated by tenant |
| QG-AI1 | Staleness metrics per tenant |
| QG-AI1 | Refresh costs attributed correctly |

## Related Patterns

- [embedding-pipeline.md](embedding-pipeline.md) - Embedding generation
- [semantic-chunking.md](semantic-chunking.md) - Chunking strategies
- [multi-modal-rag.md](multi-modal-rag.md) - Multi-modal content
- [cost-attribution-engine.md](cost-attribution-engine.md) - Cost tracking
