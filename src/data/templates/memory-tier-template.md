---
name: memory-tier-template
description: Template for documenting memory tier architecture for AI agents with storage optimization
category: ai-runtime
version: "1.0.0"
---

# Memory Tier Design Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Module** | {{module_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents the memory tier architecture for AI agents, defining storage tiers based on access patterns, performance requirements, and cost optimization while maintaining tenant isolation.

## Tier Architecture

### Memory Tier Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Memory Tier Architecture                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  HOT TIER (L1)                                            │  │
│  │  In-Memory Cache | <1ms latency | Active conversations   │  │
│  └────────────────────────────┬─────────────────────────────┘  │
│                               │                                  │
│  ┌────────────────────────────▼─────────────────────────────┐  │
│  │  WARM TIER (L2)                                           │  │
│  │  Redis/Vector DB | <10ms latency | Recent sessions        │  │
│  └────────────────────────────┬─────────────────────────────┘  │
│                               │                                  │
│  ┌────────────────────────────▼─────────────────────────────┐  │
│  │  COLD TIER (L3)                                           │  │
│  │  PostgreSQL/S3 | <100ms latency | Historical data         │  │
│  └────────────────────────────┬─────────────────────────────┘  │
│                               │                                  │
│  ┌────────────────────────────▼─────────────────────────────┐  │
│  │  ARCHIVE TIER (L4)                                        │  │
│  │  S3 Glacier | <hours latency | Compliance/backup          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Tier Definitions

### Tier Specifications

| Tier | Storage | Latency | Retention | Cost |
|------|---------|---------|-----------|------|
| Hot (L1) | In-Memory | <1ms | 1 hour | $$$$$ |
| Warm (L2) | Redis | <10ms | 7 days | $$$$ |
| Cold (L3) | PostgreSQL | <100ms | 90 days | $$ |
| Archive (L4) | S3 Glacier | <12h | 7 years | $ |

### Data Classification

| Data Type | Default Tier | Promotion Trigger | Demotion Trigger |
|-----------|--------------|-------------------|------------------|
| Active conversation | Hot | - | Session end |
| Recent context | Warm | High access | 7 days idle |
| User preferences | Cold | Access request | 90 days idle |
| Historical logs | Archive | - | Age > 90 days |

## Tier Movement

### Promotion Rules

```yaml
promotion:
  warm_to_hot:
    trigger: access_count > 3 in 60s
    action: cache_in_memory
    ttl: 300s
    
  cold_to_warm:
    trigger: access_requested
    action: load_to_redis
    ttl: 86400s
    
  archive_to_cold:
    trigger: explicit_request
    action: restore_from_glacier
    async: true
    notify: true
```

### Demotion Rules

```yaml
demotion:
  hot_to_warm:
    trigger: 
      - session_ended
      - ttl_expired
      - memory_pressure > 80%
    action: evict_to_redis
    
  warm_to_cold:
    trigger:
      - idle_days > 7
      - memory_pressure > 80%
    action: persist_to_postgres
    
  cold_to_archive:
    trigger:
      - age_days > 90
      - compliance_requirement
    action: archive_to_glacier
```

## Tenant Tier Limits

### Per-Tenant Quotas

| Tier | Free | Pro | Enterprise |
|------|------|-----|------------|
| Hot | 10 MB | 100 MB | 1 GB |
| Warm | 100 MB | 1 GB | 10 GB |
| Cold | 1 GB | 10 GB | 100 GB |
| Archive | 10 GB | 100 GB | Unlimited |

### Quota Enforcement

```yaml
quota_enforcement:
  tenant_123:
    tier_limits:
      hot: 100MB
      warm: 1GB
      cold: 10GB
      
    overage:
      action: demote  # demote | reject | alert
      priority: oldest_first
      
    alerts:
      - threshold: 80%
        action: notify
      - threshold: 95%
        action: warn
      - threshold: 100%
        action: enforce
```

## Storage Configuration

### Hot Tier (In-Memory)

```typescript
interface HotTierConfig {
  maxMemoryMB: number;
  evictionPolicy: 'lru' | 'lfu' | 'fifo';
  compressionEnabled: boolean;
  perTenantNamespace: boolean;
}

const hotTierDefaults: HotTierConfig = {
  maxMemoryMB: 256,
  evictionPolicy: 'lru',
  compressionEnabled: true,
  perTenantNamespace: true
};
```

### Warm Tier (Redis)

```yaml
warm_tier:
  redis:
    cluster_mode: true
    persistence: aof
    max_memory: 16GB
    eviction_policy: volatile-lru
    
  tenant_isolation:
    method: key_prefix
    pattern: "mem:warm:{tenant_id}:*"
    
  ttl:
    default: 604800  # 7 days
    max: 2592000     # 30 days
```

### Cold Tier (PostgreSQL)

```sql
-- Partitioned by tenant for isolation
CREATE TABLE memory_cold (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    user_id UUID,
    memory_key TEXT NOT NULL,
    memory_value JSONB NOT NULL,
    embedding vector(1536),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    accessed_at TIMESTAMPTZ DEFAULT NOW(),
    access_count INTEGER DEFAULT 0
) PARTITION BY LIST (tenant_id);

-- RLS for tenant isolation
ALTER TABLE memory_cold ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON memory_cold
    USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

### Archive Tier (S3 Glacier)

```yaml
archive_tier:
  bucket: "{{bucket_name}}"
  storage_class: GLACIER_DEEP_ARCHIVE
  
  object_key_pattern: "memory/{tenant_id}/{year}/{month}/{memory_id}.json.gz"
  
  lifecycle:
    transition_days: 90
    expiration_days: 2555  # 7 years
    
  encryption:
    type: aws:kms
    key_per_tenant: true
```

## Access Patterns

### Retrieval Strategy

```
Query → Check Hot → Miss? → Check Warm → Miss? → Check Cold → Miss? → Archive
           │                    │                    │                    │
           ▼                    ▼                    ▼                    ▼
        Return               Promote             Promote              Async
                            to Hot              to Warm              Restore
```

### Cache-Aside Pattern

```typescript
async function getMemory(key: string, tenantId: string): Promise<Memory | null> {
  // 1. Check hot tier
  let memory = await hotTier.get(tenantId, key);
  if (memory) return memory;
  
  // 2. Check warm tier
  memory = await warmTier.get(tenantId, key);
  if (memory) {
    await hotTier.set(tenantId, key, memory);  // Promote
    return memory;
  }
  
  // 3. Check cold tier
  memory = await coldTier.get(tenantId, key);
  if (memory) {
    await warmTier.set(tenantId, key, memory);  // Promote
    return memory;
  }
  
  return null;  // Archive requires async restore
}
```

## Cost Optimization

### Cost per GB/Month

| Tier | Storage Cost | Access Cost | Total |
|------|--------------|-------------|-------|
| Hot | $50.00 | $0 | $50.00 |
| Warm | $10.00 | $0.01/1K | $10.00+ |
| Cold | $0.50 | $0.05/1K | $0.50+ |
| Archive | $0.004 | $0.03/req | $0.004+ |

### Optimization Recommendations

| Signal | Action | Savings |
|--------|--------|---------|
| Low access in hot tier | Aggressive demotion | 30-50% |
| Repeated cold access | Promote to warm | 20-40% |
| Large warm footprint | Reduce TTL | 15-25% |

## Monitoring

### Tier Metrics

| Metric | Description | Alert |
|--------|-------------|-------|
| `tier_memory_usage` | Usage per tier | > 80% |
| `tier_hit_rate` | Cache hit rate | < 70% |
| `tier_promotion_count` | Promotions/min | Anomaly |
| `tier_demotion_count` | Demotions/min | Anomaly |
| `tier_latency_p99` | Access latency | > SLO |

## Verification Checklist

- [ ] All tiers configured
- [ ] Tenant quotas enforced
- [ ] Promotion rules working
- [ ] Demotion rules working
- [ ] Latency SLOs met
- [ ] Cost within budget
- [ ] Tenant isolation verified
- [ ] Monitoring dashboards live

## Web Research Queries

- Search: "multi-tier caching architecture {date}"
- Search: "memory tiering AI agents {date}"
- Search: "hot warm cold storage patterns {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
