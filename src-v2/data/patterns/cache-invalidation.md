---
pattern_id: cache-invalidation
shortcode: ZCG
category: scaling
qg_ref: QG-SC5
version: 1.0.0
last_reviewed: 2026-04-30
---

# Cache Invalidation - BAM Pattern

**Loaded by:** ZCG  
**Applies to:** Multi-tenant SaaS platforms with distributed caching

---

## When to Use

- Multi-node deployments with local caches
- Distributed cache (Redis, Memcached) deployments
- CDN cache management
- Database query result caching
- Session data caching
- AI model inference result caching

## When NOT to Use

- Single-node deployments (no distribution)
- Purely immutable data (never changes)
- Real-time data requirements (no caching appropriate)
- Systems where eventual consistency is unacceptable

## Architecture

### Cache Layers

```
┌─────────────────────────────────────────────────────────────┐
│                      CACHE HIERARCHY                         │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │   L1: In-Process Cache (per instance)              │    │
│  │   TTL: seconds | Invalidation: local event        │    │
│  └───────────────────────────┬─────────────────────────┘    │
│                              │                               │
│  ┌───────────────────────────▼─────────────────────────┐    │
│  │   L2: Distributed Cache (Redis/Memcached)          │    │
│  │   TTL: minutes | Invalidation: pub/sub            │    │
│  └───────────────────────────┬─────────────────────────┘    │
│                              │                               │
│  ┌───────────────────────────▼─────────────────────────┐    │
│  │   L3: CDN Cache (Cloudflare/Fastly)                │    │
│  │   TTL: hours | Invalidation: API purge            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Tenant-Aware Cache Keys

| Scope | Key Pattern | Invalidation Scope |
|-------|-------------|-------------------|
| Global | `global:{resource}:{id}` | All tenants |
| Tenant | `tenant:{tid}:{resource}:{id}` | Single tenant |
| User | `tenant:{tid}:user:{uid}:{resource}` | Single user |
| Session | `session:{sid}:{resource}` | Single session |

### Invalidation Strategies

```
Data Change Event
      │
      ▼
┌─────────────────┐
│ Strategy        │
│ Selection       │
└────────┬────────┘
         │
    ┌────┴────┬─────────┬─────────┐
    ▼         ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
│ TTL   │ │ Event │ │ Tag   │ │ Purge │
│ Expiry│ │ Based │ │ Based │ │ All   │
└───────┘ └───────┘ └───────┘ └───────┘
    │         │         │         │
    ▼         ▼         ▼         ▼
  Wait     Pub/Sub   Purge by   Clear
  natural  notify    tag/prefix namespace
```

### Configuration Schema

```yaml
cache_invalidation:
  tenant_id: uuid
  tier: enum[free, pro, enterprise]
  bam_controlled: true
  
  l1_cache:
    enabled: bool
    max_items: int
    ttl_seconds: int
    eviction_policy: enum[lru, lfu, fifo]
    
  l2_cache:
    provider: enum[redis, memcached, elasticache]
    enabled: bool
    ttl_seconds: int
    key_prefix: string  # includes tenant_id
    
  invalidation:
    strategy: enum[ttl_only, event_based, tag_based, hybrid]
    
    event_based:
      channel_pattern: string  # e.g., "cache:invalidate:{tenant_id}:*"
      propagation_timeout_ms: int
      
    tag_based:
      enabled: bool
      tag_format: string  # e.g., "tenant:{tenant_id}:resource:{type}"
      
  consistency:
    write_through: bool
    write_behind: bool
    read_through: bool
    cache_aside: bool
    
  monitoring:
    hit_rate_threshold_percent: int
    alert_on_mass_invalidation: bool
    mass_invalidation_threshold: int
```

### Event-Based Invalidation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   EVENT-BASED INVALIDATION                   │
│                                                              │
│  Writer ──▶ Database ──▶ Change Event ──▶ Pub/Sub Channel  │
│                                               │              │
│                    ┌──────────────────────────┤              │
│                    │              │           │              │
│                    ▼              ▼           ▼              │
│              ┌─────────┐   ┌─────────┐  ┌─────────┐        │
│              │ Node 1  │   │ Node 2  │  │ Node 3  │        │
│              │ L1 purge│   │ L1 purge│  │ L1 purge│        │
│              └─────────┘   └─────────┘  └─────────┘        │
│                                                              │
│              ┌────────────────────────────────────┐         │
│              │        L2 Cache (Redis)            │         │
│              │        Key deleted                 │         │
│              └────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### Cache Consistency Patterns

```
┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
│   CACHE-ASIDE    │  │  WRITE-THROUGH   │  │   WRITE-BEHIND   │
│                   │  │                   │  │                   │
│  App ──▶ Cache?   │  │  App ──▶ Cache   │  │  App ──▶ Cache   │
│       │    │      │  │          │       │  │          │       │
│       │   miss    │  │          ▼       │  │          ▼       │
│       │    │      │  │        Store     │  │    (async later) │
│       ▼    ▼      │  │          │       │  │        Store     │
│      Store ──▶    │  │          ▼       │  │                   │
│       populate    │  │      Response    │  │      Response    │
└───────────────────┘  └───────────────────┘  └───────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| TTL-only | Simple, no messaging | Stale data window | Low-change data |
| Event-based | Near-real-time | Infrastructure complexity | High-consistency needs |
| Tag-based | Bulk invalidation | Index overhead | Related data sets |
| Write-through | Strong consistency | Write latency | Critical data |

## Quality Checks

- [ ] Cache keys include tenant_id
- [ ] Invalidation events propagate to all nodes
- [ ] Hit rate monitored per cache layer
- [ ] Mass invalidation throttled
- [ ] **CRITICAL:** No cross-tenant cache key collision

## Web Research Queries

- "cache invalidation patterns distributed systems {date}"
- "Redis pub/sub cache invalidation {date}"
- "CDN cache purge strategies {date}"
- "multi-tenant cache key design {date}"
- "cache consistency patterns microservices {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-SC5 | Pattern implementation verified |

## Related Patterns

- [edge-deployment.md](edge-deployment.md) - CDN caching
- [geo-distribution.md](geo-distribution.md) - Regional cache
