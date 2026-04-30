---
pattern_id: index-management
shortcode: ZIM
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Index Management - BAM Pattern

**Loaded by:** ZIM  
**Applies to:** Multi-tenant RAG systems  
**See also:** [vector-store-multi-tenant.md](vector-store-multi-tenant.md), [embedding-lifecycle.md](embedding-lifecycle.md)

---

## When to Use

- Managing vector index lifecycle across tenants
- Index creation, scaling, and deletion
- Index health monitoring and maintenance
- Tenant onboarding/offboarding with data cleanup
- Cost optimization through index consolidation

## When NOT to Use

- Single-tenant applications with simple indexing
- Static datasets with no lifecycle requirements
- Prototypes without production operations

## Architecture

### Index Lifecycle States

```
┌─────────────────────────────────────────────────────────────────┐
│                   INDEX LIFECYCLE                                │
│                                                                  │
│                      ┌──────────┐                               │
│                      │ CREATING │                               │
│                      │          │                               │
│                      └────┬─────┘                               │
│                           │                                      │
│                           ▼                                      │
│   ┌────────────┐    ┌──────────┐    ┌────────────┐             │
│   │ SCALING_UP │◄───│  ACTIVE  │───►│SCALING_DOWN│             │
│   │            │    │          │    │            │             │
│   └─────┬──────┘    └────┬─────┘    └──────┬─────┘             │
│         │                │                  │                    │
│         └────────────────┼──────────────────┘                    │
│                          │                                       │
│                          ▼                                       │
│   ┌────────────┐    ┌──────────┐    ┌────────────┐             │
│   │ REINDEXING │◄───│MAINTENANCE│───►│  BACKING   │             │
│   │            │    │          │    │    UP      │             │
│   └─────┬──────┘    └──────────┘    └──────┬─────┘             │
│         │                                   │                    │
│         └───────────────────────────────────┘                    │
│                          │                                       │
│                          ▼                                       │
│                    ┌──────────┐                                 │
│                    │ DELETING │                                 │
│                    │          │                                 │
│                    └────┬─────┘                                 │
│                         │                                        │
│                         ▼                                        │
│                    ┌──────────┐                                 │
│                    │ DELETED  │                                 │
│                    └──────────┘                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Multi-Tenant Index Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│              MULTI-TENANT INDEX ARCHITECTURE                     │
│                                                                  │
│  Index Registry                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ index_name       │ tenant_id │ status │ vectors │ tier     ││
│  │──────────────────┼───────────┼────────┼─────────┼──────────││
│  │ ent-acme-prod    │ acme      │ active │ 1.2M    │enterprise││
│  │ pro-shared-01    │ shared    │ active │ 450K    │ pro      ││
│  │ pro-shared-02    │ shared    │ active │ 380K    │ pro      ││
│  │ free-shared      │ shared    │ active │ 890K    │ free     ││
│  │ ent-globex-prod  │ globex    │ scaling│ 2.1M    │enterprise││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Index-to-Tenant Mapping                                         │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Enterprise Tier: Dedicated index per tenant                 ││
│  │ ┌──────────────┐  ┌──────────────┐                          ││
│  │ │ ent-acme     │  │ ent-globex   │                          ││
│  │ │ (dedicated)  │  │ (dedicated)  │                          ││
│  │ └──────────────┘  └──────────────┘                          ││
│  │                                                              ││
│  │ Pro/Free Tier: Shared indexes with namespaces               ││
│  │ ┌────────────────────────────────────────────┐              ││
│  │ │ pro-shared-01                              │              ││
│  │ │ ├── namespace: tenant-beta                 │              ││
│  │ │ ├── namespace: tenant-gamma                │              ││
│  │ │ └── namespace: tenant-delta                │              ││
│  │ └────────────────────────────────────────────┘              ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
index_management:
  version: "1.0.0"
  bam_controlled: true
  
  provider: "pinecone"  # pinecone, weaviate, qdrant
  
  index_naming:
    pattern: "{tier}-{tenant_or_shared}-{env}"
    max_length: 45
    
  tier_strategies:
    enterprise:
      isolation: "dedicated_index"
      auto_scale: true
      backup_enabled: true
      backup_retention_days: 90
    pro:
      isolation: "namespace"
      shared_index_prefix: "pro-shared"
      max_tenants_per_index: 50
      rebalance_threshold: 0.8
    free:
      isolation: "namespace"
      shared_index_prefix: "free-shared"
      max_tenants_per_index: 200
      
  scaling:
    auto_scale: true
    scale_up_threshold: 0.8  # utilization
    scale_down_threshold: 0.3
    min_replicas: 1
    max_replicas: 10
    cooldown_minutes: 15
    
  maintenance:
    compaction:
      enabled: true
      schedule: "0 2 * * SUN"  # Weekly at 2 AM
    backup:
      enabled: true
      schedule: "0 3 * * *"  # Daily at 3 AM
      retention_days: 30
    health_check:
      interval_minutes: 5
      
  onboarding:
    create_index_timeout_seconds: 300
    initial_vectors_warmup: true
    
  offboarding:
    soft_delete_days: 30
    archive_before_delete: true
    purge_confirmation_required: true
    
  alerts:
    utilization_warning: 0.7
    utilization_critical: 0.9
    query_latency_p99_ms: 200
```

### Index Operations Table

| Operation | Trigger | Duration | Impact |
|-----------|---------|----------|--------|
| Create | Tenant onboard | 30s-5m | None |
| Scale up | Utilization >80% | 5-15m | Temp latency |
| Scale down | Utilization <30% | 5-15m | None |
| Reindex | Model migration | Hours | Query routing |
| Backup | Scheduled | 10-60m | None |
| Delete | Tenant offboard | 1-5m | Irreversible |

## Trade-offs

| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| Dedicated per tenant | Full isolation, easy deletion | High cost | Enterprise |
| Shared with namespaces | Cost-effective | Shared limits | Pro tier |
| Metadata filtering | Lowest cost | Performance risk | Free tier |
| Hybrid | Optimized | Complex routing | Multi-tier |

## Quality Checks

- [ ] **CRITICAL:** Tenant deletion removes all vectors
- [ ] Index health monitored with alerts
- [ ] Scaling responds within SLA
- [ ] Backups tested with restore
- [ ] Namespace limits enforced
- [ ] Cost attributed per tenant

## Web Research Queries

- "Pinecone index management best practices {date}"
- "vector database scaling patterns {date}"
- "multi-tenant index architecture {date}"
- "vector store backup and recovery {date}"
- "index lifecycle automation kubernetes {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | Index management lifecycle verified |

## Related Patterns

- [vector-store-multi-tenant.md](vector-store-multi-tenant.md) - Vector isolation
- [embedding-lifecycle.md](embedding-lifecycle.md) - Embedding versioning
- [rag-pipeline.md](rag-pipeline.md) - End-to-end orchestration
- [tenant-isolation.md](tenant-isolation.md) - Tenant boundaries
