# BAM Edge Computing Guide

**When to load:** During Phase 3 (Solutioning) when designing edge deployments,
or when user mentions edge functions, CDN, edge caching, low latency, tenant-aware edge.

**Integrates with:** Architect (Platform Design), DevOps (Infrastructure), Dev (Implementation)

---

## Core Concepts

### Edge Computing for Multi-Tenant SaaS

Edge computing brings computation closer to users, reducing latency while maintaining tenant isolation.

| Edge Layer | Function | Tenant Awareness |
|------------|----------|------------------|
| CDN Edge | Static content, caching | Cache key includes tenant |
| Edge Functions | Dynamic compute | Tenant context in headers |
| Edge Database | Read replicas | Tenant-filtered queries |

### Multi-Tenant Edge Architecture

```
┌─────────────────────────────────────────────────┐
│                 Edge Network                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ POP 1   │  │ POP 2   │  │ POP N   │         │
│  │ (US-E)  │  │ (EU-W)  │  │ (APAC)  │         │
│  └────┬────┘  └────┬────┘  └────┬────┘         │
│       │            │            │               │
│  ┌────▼────────────▼────────────▼────┐         │
│  │      Edge Function Runtime         │         │
│  │  ┌─────────────────────────────┐  │         │
│  │  │ Tenant Context Middleware   │  │         │
│  │  └─────────────────────────────┘  │         │
│  └───────────────────┬───────────────┘         │
│                      │                          │
│              ┌───────▼───────┐                  │
│              │ Origin Server │                  │
│              │ (Regional)    │                  │
│              └───────────────┘                  │
└─────────────────────────────────────────────────┘
```

### Edge Function Use Cases

| Use Case | Edge Benefit | Multi-Tenant Concern |
|----------|--------------|---------------------|
| Auth validation | Low latency auth | Tenant JWT validation |
| A/B testing | Edge-based assignment | Per-tenant experiments |
| Personalization | Fast response | Tenant preferences |
| Rate limiting | Distributed enforcement | Per-tenant quotas |
| Geo-routing | Nearest origin | Tenant region affinity |

---

## Application Guidelines

When implementing edge computing for multi-tenant:

1. **Validate tenant at edge** - Extract and verify tenant context early
2. **Design cache keys** - Include tenant identifier in all cache keys
3. **Implement edge quotas** - Enforce rate limits at the edge
4. **Plan for cold starts** - Minimize edge function initialization time
5. **Handle edge failures** - Graceful fallback to origin

---

## Edge Functions

### Function Architecture

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| Context extraction | Get tenant from JWT | Edge middleware |
| Request routing | Direct to tenant region | Lookup + redirect |
| Response transformation | Tenant branding | Header/body modification |
| Caching decision | Tenant-aware TTL | Vary by tenant tier |

### Edge Function Providers

| Provider | Runtime | Cold Start | Multi-Tenant |
|----------|---------|------------|--------------|
| Cloudflare Workers | V8 Isolates | < 5ms | KV for tenant config |
| AWS Lambda@Edge | Node/Python | 50-200ms | DynamoDB Global Tables |
| Vercel Edge | V8 Isolates | < 10ms | Edge Config |
| Fastly Compute | WASM | < 1ms | KV Store |

### Tenant Context at Edge

```
┌─────────────────────────────────────────────────┐
│           Edge Function Flow                     │
│                                                  │
│  1. Request arrives at edge POP                 │
│  2. Extract JWT from Authorization header       │
│  3. Validate signature (cached public key)      │
│  4. Extract tenant_id from claims               │
│  5. Lookup tenant config from edge KV           │
│  6. Apply tenant-specific rules                 │
│  7. Route to appropriate origin                 │
│  8. Cache response with tenant-aware key        │
└─────────────────────────────────────────────────┘
```

---

## CDN Integration

### Cache Key Strategy

| Component | Include in Key | Rationale |
|-----------|----------------|-----------|
| URL path | Yes | Different content |
| tenant_id | Yes | Tenant isolation |
| Tier | Optional | Different features |
| Accept-Language | Optional | Localization |
| User-Agent | No | Reduce fragmentation |

### Cache Key Examples

| Resource Type | Cache Key Pattern | TTL |
|---------------|-------------------|-----|
| Static assets | `{tenant_id}:{path}:{version}` | 1 year |
| API response | `{tenant_id}:{endpoint}:{query_hash}` | 5 min |
| User-specific | `{tenant_id}:{user_id}:{resource}` | 1 min |

### CDN Configuration by Tier

| Tier | Edge Caching | Purge Capability | Custom Domains |
|------|--------------|------------------|----------------|
| Free | Shared cache | Platform-wide | No |
| Pro | Tenant-isolated | Per-tenant | Subdomain |
| Enterprise | Dedicated cache | Instant | Custom domain |

---

## Tenant-Aware Caching

### Cache Isolation Patterns

| Pattern | Implementation | Isolation Level |
|---------|----------------|-----------------|
| Key prefix | `tenant:{id}:resource` | Logical |
| Namespace | Separate cache namespace | Strong |
| Instance | Dedicated cache cluster | Physical |

### Cache Invalidation

| Trigger | Scope | Method |
|---------|-------|--------|
| Content update | Single resource | Purge by key |
| Tenant config change | All tenant cache | Purge by prefix |
| Global update | All tenants | Purge all |

### Stale-While-Revalidate

| Tier | Stale TTL | Background Refresh |
|------|-----------|-------------------|
| Free | 1 hour | No |
| Pro | 5 minutes | Yes |
| Enterprise | 1 minute | Yes + webhook |

---

## Rate Limiting at Edge

### Distributed Rate Limiting

| Algorithm | Accuracy | Latency | Best For |
|-----------|----------|---------|----------|
| Token bucket | High | Low | Burst allowance |
| Sliding window | Very high | Medium | Precise limits |
| Fixed window | Medium | Very low | Simple implementation |

### Per-Tenant Rate Limits

| Tier | Requests/sec | Burst | Edge Action |
|------|--------------|-------|-------------|
| Free | 10 | 20 | 429 + retry header |
| Pro | 100 | 200 | 429 + upgrade CTA |
| Enterprise | 1000+ | Custom | Alert + queue |

### Rate Limit Headers

| Header | Purpose | Example |
|--------|---------|---------|
| X-RateLimit-Limit | Max requests | 100 |
| X-RateLimit-Remaining | Requests left | 45 |
| X-RateLimit-Reset | Reset timestamp | 1699900800 |
| Retry-After | Seconds to wait | 30 |

---

## Edge Security

### Security at Edge

| Concern | Edge Mitigation | Implementation |
|---------|-----------------|----------------|
| DDoS | Rate limiting + WAF | Edge rules |
| Bot attacks | Challenge pages | CAPTCHA at edge |
| Data leakage | Response validation | Edge function |
| Auth bypass | JWT validation | Edge middleware |

### Tenant Isolation Security

| Risk | Mitigation | Verification |
|------|------------|--------------|
| Cache poisoning | Tenant in cache key | Automated testing |
| Cross-tenant data | Response validation | Security audit |
| Privilege escalation | Edge auth check | Penetration testing |

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| Global user base | Full edge deployment | Latency reduction |
| Single region users | Origin + CDN only | Cost efficiency |
| Real-time features | Edge compute | Sub-100ms response |
| Heavy computation | Origin only | Edge resource limits |
| Compliance constraints | Region-locked edge | Data residency |

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Edge in platform architecture
- `bmad-bam-multi-region-architecture` - Edge with regional strategy
- `bmad-bam-api-gateway-design` - Edge + gateway integration

## Related Patterns

Load decision criteria and web search queries from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `edge-*`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "edge computing multi-tenant SaaS {date}"
- Search: "Cloudflare Workers tenant isolation {date}"
- Search: "CDN caching multi-tenant patterns {date}"
