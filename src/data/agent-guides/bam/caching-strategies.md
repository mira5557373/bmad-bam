# BAM Caching Strategies Guide

**When to load:** During performance optimization, cache design, or when user mentions cache keys, TTL, cache invalidation, LLM caching.

**Integrates with:** Developer (implementation), Architect (design), DevOps (operations)

---

## Core Concepts

### Cache Layers

Multi-tenant caching requires multiple layers with tenant-aware isolation.

| Layer | Technology | Scope | Use Case |
|-------|------------|-------|----------|
| L1 - Application | In-memory (local) | Pod/instance | Hot data, config |
| L2 - Distributed | Redis/Memcached | Cluster-wide | Shared state, sessions |
| L3 - CDN | Edge cache | Global | Static assets, API responses |
| L4 - Database | Query cache | Database | Repeated queries |

### Tenant Cache Isolation Levels

| Level | Implementation | Isolation Strength |
|-------|----------------|-------------------|
| Key prefix | `tenant:{id}:*` | Basic (namespace) |
| Logical database | Redis DB number per tenant | Medium |
| Cluster slot | Hash tag routing | Medium |
| Physical isolation | Dedicated Redis instance | Strong |

---

## Application Guidelines

When implementing caching in multi-tenant systems:

1. **Always prefix keys with tenant ID**: Mandatory isolation prevents cross-tenant data leakage
2. **Use consistent key naming conventions**: Document and enforce key structure across the platform
3. **Set appropriate TTLs per data type**: Balance freshness with performance
4. **Implement per-tenant quotas**: Prevent any single tenant from consuming excessive cache resources
5. **Monitor cache hit rates by tenant**: Identify optimization opportunities and abuse patterns

---

## Tenant-Prefixed Cache Keys

### Key Structure

```
{tenant_id}:{domain}:{entity}:{identifier}:{version}
```

| Component | Required | Example |
|-----------|----------|---------|
| tenant_id | Yes | `t_abc123` |
| domain | Yes | `user`, `agent`, `config` |
| entity | Yes | `profile`, `session`, `embedding` |
| identifier | Yes | UUID, slug, hash |
| version | Optional | `v1`, hash suffix |

### Key Examples

| Use Case | Key Pattern | TTL |
|----------|-------------|-----|
| User session | `t_abc:session:user:u_xyz` | 1 hour |
| Tenant config | `t_abc:config:tier:current` | 5 min |
| Agent state | `t_abc:agent:state:a_123` | 30 min |
| API response | `t_abc:api:response:{hash}` | 5 min |
| Embedding | `t_abc:vector:embedding:{doc_id}` | 24 hours |
| Rate limit | `t_abc:ratelimit:endpoint:{endpoint}` | 1 min |

### Key Naming Rules

| Rule | Rationale | Example |
|------|-----------|---------|
| Always prefix with tenant_id | Isolation | `t_abc:...` |
| Use colons as separators | Redis convention | `domain:entity:id` |
| Lowercase all components | Consistency | `user_profile` not `UserProfile` |
| Include version for mutable data | Cache busting | `...:v1` or `...:hash` |
| Max key length 256 bytes | Redis limit | Hash long values |

---

## Cache Isolation Strategies

### Strategy Comparison

| Strategy | Isolation | Performance | Complexity | Cost |
|----------|-----------|-------------|------------|------|
| Key prefix | Basic | Best | Low | Lowest |
| Logical DB | Medium | Good | Medium | Low |
| Hash tags | Medium | Good | Medium | Low |
| Dedicated instance | Strong | Best | High | High |

### Per-Tier Cache Strategy

| Tier | Primary Strategy | Fallback | Resource Limit |
|------|------------------|----------|----------------|
| Free | Key prefix (shared) | None | 100MB quota |
| Pro | Key prefix (prioritized) | None | 1GB quota |
| Enterprise | Dedicated instance option | Shared fallback | 10GB+ quota |

### Cross-Tenant Cache Prevention

| Risk | Mitigation | Verification |
|------|------------|--------------|
| Key collision | Mandatory tenant prefix | Key audit |
| Wildcard queries | Disable KEYS, use SCAN with prefix | Security review |
| Memory pressure | Per-tenant quotas | Monitoring |
| Cache poisoning | Input validation on keys | Security testing |

---

## LLM Response Caching

### Semantic Cache Architecture

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| Prompt hash | Exact match cache | SHA-256 of normalized prompt |
| Semantic embedding | Similar prompt matching | Vector similarity search |
| Response store | Cached completions | Redis + compressed storage |

### Cache Decision Matrix

| Prompt Type | Cacheable | Strategy | TTL |
|-------------|-----------|----------|-----|
| Factual query | Yes | Semantic + exact | 1 hour |
| Creative task | Limited | Exact only | 5 min |
| Personalized | Yes (per-user) | Exact with context | 30 min |
| Real-time data | No | - | - |
| Confidential | Tenant-only | Exact with tenant scope | 15 min |

### Cache Key Components for LLM

| Component | Include In Key | Rationale |
|-----------|---------------|-----------|
| Tenant ID | Always | Isolation |
| Model ID | Always | Different outputs |
| Prompt hash | Always | Core identifier |
| Temperature | If > 0 | Affects output |
| System prompt hash | Always | Context affects output |
| User ID | If personalized | Per-user caching |

### Semantic Cache Thresholds

| Similarity Score | Action | Use Case |
|------------------|--------|----------|
| > 0.98 | Return cached | Near-identical prompts |
| 0.95 - 0.98 | Return with warning | Similar prompts |
| 0.90 - 0.95 | Log for analysis | Potential cache candidate |
| < 0.90 | Execute fresh | Different intent |

---

## Embedding Cache Per Tenant

### Embedding Cache Structure

| Field | Storage | Indexed |
|-------|---------|---------|
| tenant_id | String | Yes |
| document_id | String | Yes |
| content_hash | String | Yes (uniqueness) |
| embedding | Float array | No (stored only) |
| model_version | String | Yes |
| created_at | Timestamp | Yes |

### Cache Strategy by Document Type

| Document Type | Cache Duration | Invalidation Trigger |
|---------------|----------------|---------------------|
| Static knowledge | 30 days | Manual refresh |
| User documents | 7 days | Document update |
| Conversation | 24 hours | Session end |
| Real-time data | 1 hour | Source refresh |

### Embedding Cache Size Planning

| Tier | Max Documents | Est. Cache Size | Storage |
|------|---------------|-----------------|---------|
| Free | 100 | 100MB | Shared Redis |
| Pro | 5,000 | 5GB | Shared Redis |
| Enterprise | 100,000 | 100GB | Dedicated storage |

---

## Cache Invalidation Patterns

### Invalidation Strategies

| Strategy | Implementation | Use Case |
|----------|----------------|----------|
| TTL-based | Automatic expiry | Most cases |
| Event-driven | Pub/sub on mutation | Real-time consistency |
| Version-based | Increment version in key | Controlled rollout |
| Tag-based | Secondary index lookup | Group invalidation |

### Invalidation by Event Type

| Event | Invalidation Scope | Priority |
|-------|-------------------|----------|
| User update | `tenant:user:{id}:*` | Immediate |
| Tenant config change | `tenant:config:*` | Immediate |
| Document update | `tenant:vector:embedding:{doc_id}` | Immediate |
| Model upgrade | All semantic cache | Batch |
| Tier change | `tenant:*` (rebuild) | Deferred |

### Cache Stampede Prevention

| Technique | Implementation | When to Use |
|-----------|----------------|-------------|
| Lock (mutex) | Redis SETNX | Single expensive operation |
| Early expiration | Random jitter on TTL | High-traffic keys |
| Background refresh | Async refresh before expiry | Critical paths |
| Circuit breaker | Fallback to stale | Origin unavailable |

### Invalidation Checklist

| Scenario | Keys to Invalidate | Method |
|----------|-------------------|--------|
| User profile update | `t:user:profile:*`, `t:api:*user*` | Event-driven |
| Agent configuration change | `t:agent:*`, `t:llm:response:*` | Version bump |
| Tenant tier upgrade | All tenant keys | Full rebuild |
| Tenant offboarding | `t:*` | Batch delete |

---

## Per-Tier Cache Configuration

### TTL Configuration

| Data Type | Free | Pro | Enterprise |
|-----------|------|-----|------------|
| Session | 30 min | 2 hours | 8 hours |
| API response | 1 min | 5 min | 10 min |
| LLM response | 5 min | 30 min | 1 hour |
| Embedding | 1 hour | 24 hours | 7 days |
| Config | 1 min | 5 min | 5 min |

### Memory Quotas

| Tier | Quota | Eviction Policy | Alert Threshold |
|------|-------|-----------------|-----------------|
| Free | 100MB | LRU aggressive | 80% |
| Pro | 1GB | LRU standard | 85% |
| Enterprise | 10GB+ | LRU conservative | 90% |

---

## Monitoring and Observability

### Cache Metrics Per Tenant

| Metric | Purpose | Alert Threshold |
|--------|---------|-----------------|
| Hit rate | Efficiency | < 70% |
| Miss rate | Cache effectiveness | > 30% |
| Eviction rate | Memory pressure | > 10/min |
| Memory usage | Quota management | > 85% |
| Latency p99 | Performance | > 10ms |

### Cache Health Indicators

| Indicator | Healthy | Degraded | Critical |
|-----------|---------|----------|----------|
| Hit rate | > 85% | 70-85% | < 70% |
| Latency p99 | < 5ms | 5-20ms | > 20ms |
| Connection pool | < 80% | 80-95% | > 95% |
| Memory | < 80% | 80-90% | > 90% |

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-strategy`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant caching strategies {date}"
- Search: "Redis tenant isolation patterns {date}"
- Search: "SaaS cache invalidation strategies {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Which cache isolation level for tenant data? | Use key prefix for most cases; dedicated instances for enterprise compliance | Key prefix provides sufficient isolation with low overhead; dedicated instances needed only for strict data residency requirements |
| When to implement semantic caching for LLM? | Enable when similarity > 0.95 and prompt patterns are repetitive | Reduces LLM costs significantly for common queries while maintaining response quality |
| How long should tenant cache TTLs be? | Start conservative (5 min), increase based on data volatility per entity type | Prevents stale data issues while allowing optimization based on observed patterns |
| When to invalidate cache vs wait for TTL? | Invalidate immediately for user-facing data; TTL for analytics and aggregations | User expectations require real-time consistency; background data tolerates eventual consistency |
| How to handle cache during tenant tier upgrade? | Full cache rebuild with new tier configuration | Ensures new limits and features take effect immediately without stale cached restrictions |

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Cache architecture decisions
- `bmad-bam-agent-runtime-architecture` - LLM caching design
- `bmad-bam-validate-foundation` - Cache implementation verification
