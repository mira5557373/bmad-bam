---
name: cache-isolation-template
description: Documents cache isolation strategy for strict tenant data separation across all caching layers
category: tenant-isolation
version: "1.0.0"
---

# Cache Isolation Design Template

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

This template documents the cache isolation strategy for ensuring strict tenant data separation in all caching layers, preventing cross-tenant data leakage and cache pollution.

## Cache Architecture

### Multi-Layer Cache Design

```
┌─────────────────────────────────────────────────────────────────┐
│                        Application Layer                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   L1 Cache  │  │   L2 Cache  │  │   L3 Cache  │             │
│  │  (In-Memory)│  │   (Redis)   │  │    (CDN)    │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         ▼                ▼                ▼                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Tenant Context Propagation                  │   │
│  │           (tenant_id prefix on all keys)                 │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Key Naming Strategy

### Tenant-Prefixed Keys

```
Format: t:{tenant_id}:{namespace}:{key}

Examples:
- t:tenant_123:users:user_456
- t:tenant_123:sessions:sess_789
- t:tenant_123:config:feature_flags
- t:tenant_123:ai:embeddings:doc_001
```

### Global Keys (Shared Across Tenants)

```
Format: g:{namespace}:{key}

Examples:
- g:system:feature_flags
- g:system:rate_limits
- g:models:embedding_config
```

## Isolation Mechanisms

### Redis Configuration

```yaml
redis:
  isolation_mode: prefix  # prefix | database | cluster
  
  prefix_strategy:
    format: "t:{tenant_id}:"
    validation: strict  # Reject keys without prefix
    
  # Alternative: Database per tenant (0-15 limit)
  database_strategy:
    enabled: false
    tenant_mapping: dynamic
    
  # Alternative: Cluster with tenant routing
  cluster_strategy:
    enabled: false
    shard_by_tenant: true
```

### Cache Middleware

```typescript
interface TenantCacheConfig {
  tenantId: string;
  tier: 'free' | 'pro' | 'enterprise';
  maxMemoryMB: number;
  ttlSeconds: number;
  allowedNamespaces: string[];
}
```

## Cache Policies by Tier

### Tier-Based Limits

| Tier | Max Memory | Max Keys | Default TTL | Eviction Policy |
|------|------------|----------|-------------|-----------------|
| Free | 50 MB | 10,000 | 1 hour | LRU |
| Pro | 500 MB | 100,000 | 24 hours | LRU |
| Enterprise | 5 GB | 1,000,000 | 7 days | LFU |

### Namespace Limits

| Namespace | Max Keys | Max Value Size | TTL |
|-----------|----------|----------------|-----|
| `sessions` | 1,000 | 10 KB | 24h |
| `users` | 10,000 | 50 KB | 1h |
| `config` | 100 | 100 KB | 5m |
| `ai:embeddings` | 100,000 | 10 KB | 7d |
| `ai:responses` | 10,000 | 100 KB | 1h |

## Isolation Verification

### Cross-Tenant Tests

| Test ID | Description | Expected Result |
|---------|-------------|-----------------|
| CI-001 | Read other tenant's key | Key not found |
| CI-002 | Write to other tenant's key | Permission denied |
| CI-003 | List other tenant's keys | Empty result |
| CI-004 | Scan without prefix | Only own keys |

### Verification Queries

```bash
# Verify no cross-tenant key access
redis-cli KEYS "t:tenant_a:*" | wc -l  # Should match tenant_a count
redis-cli KEYS "t:tenant_b:*" | wc -l  # Should match tenant_b count

# Verify no unprefixed keys
redis-cli KEYS "*" | grep -v "^t:" | grep -v "^g:" | wc -l  # Should be 0
```

## Cache Invalidation

### Tenant-Scoped Invalidation

| Pattern | Command | Use Case |
|---------|---------|----------|
| Single key | `DEL t:{tenant_id}:{key}` | Item update |
| Namespace | `SCAN t:{tenant_id}:{ns}:*` + DEL | Bulk update |
| Tenant | `SCAN t:{tenant_id}:*` + DEL | Tenant reset |

### Event-Driven Invalidation

```yaml
invalidation_events:
  - event: tenant.updated
    action: invalidate_namespace
    namespace: config
    
  - event: user.deleted
    action: invalidate_pattern
    pattern: "t:{tenant_id}:users:{user_id}*"
    
  - event: tenant.offboarded
    action: invalidate_tenant
    purge: true
```

## Monitoring

### Cache Metrics by Tenant

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| `cache_hit_rate` | Hit rate per tenant | < 80% |
| `cache_memory_used` | Memory per tenant | > 90% of limit |
| `cache_evictions` | Evictions per tenant | > 1000/min |
| `cache_latency_p99` | Latency per tenant | > 10ms |

## Verification Checklist

- [ ] All keys include tenant prefix
- [ ] No unprefixed application keys exist
- [ ] Cross-tenant access tests pass
- [ ] Tier-based limits enforced
- [ ] Eviction policies configured
- [ ] Invalidation events wired
- [ ] Monitoring dashboards created
- [ ] Tenant offboarding purges cache

## Web Research Queries

- Search: "Redis multi-tenant cache isolation {date}"
- Search: "cache key prefixing patterns {date}"
- Search: "tenant cache isolation strategies {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
