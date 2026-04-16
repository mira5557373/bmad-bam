# BAM Performance Patterns Guide

**When to load:** During performance optimization, caching design, load testing, or when implementing performance controls for multi-tenant SaaS platforms.

**Integrates with:** James (Dev), Winston (Architect), SRE teams.

---

## Core Concepts

### Multi-Tenant Performance Isolation

Performance in multi-tenant systems requires isolation to prevent one tenant from affecting others.

| Isolation Type | Description | Implementation |
|----------------|-------------|----------------|
| Resource Limits | CPU/memory per tenant | Container quotas, cgroups |
| Fair Scheduling | Equal access to shared resources | Weighted fair queuing |
| Request Throttling | Rate limits per tenant | API gateway, Redis |
| Connection Pooling | Shared pools with tenant affinity | PgBouncer with tenant routing |

### Caching Strategies

| Strategy | Single-Tenant | Multi-Tenant Approach |
|----------|--------------|----------------------|
| Application Cache | Global cache | Tenant-prefixed keys |
| Database Cache | Query cache | Tenant-scoped cache |
| CDN | Single origin | Tenant-specific paths |
| Session Cache | User sessions | Tenant + user compound key |

#### Cache Key Patterns

```
# Bad: No tenant isolation
cache.get("user:123")

# Good: Tenant-isolated
cache.get("tenant:abc:user:123")
```

### Database Performance

| Optimization | RLS Impact | Implementation |
|--------------|------------|----------------|
| Indexing | Index on tenant_id + key columns | Composite indexes |
| Query Planning | RLS policy overhead | Prepared statements |
| Connection Pooling | Per-tenant isolation | Tenant-aware pool |
| Read Replicas | Tenant-specific routing | Enterprise tier |

### Noisy Neighbor Mitigation

| Mitigation | Detection | Response |
|------------|-----------|----------|
| Resource Quotas | Usage monitoring | Enforce limits |
| Request Throttling | Rate tracking | 429 responses |
| Circuit Breakers | Error rate tracking | Tenant isolation |
| Queue Prioritization | SLA tier | Priority queues |

### Performance SLOs by Tier

| Metric | Free | Pro | Enterprise |
|--------|------|-----|------------|
| API Latency (p99) | 500ms | 200ms | 100ms |
| Availability | 99% | 99.9% | 99.99% |
| Throughput | 100 RPM | 1000 RPM | Unlimited |
| Burst | 2x for 1min | 5x for 5min | Custom |

---

## Application Guidelines

When implementing performance in a multi-tenant context:

1. **Always include tenant_id in cache keys** - Prevents cross-tenant cache pollution
2. **Implement tiered resource limits** - Free tier gets less, Enterprise gets more
3. **Monitor per-tenant metrics** - Identify performance issues per tenant
4. **Use connection pooling wisely** - Balance pool size with tenant count
5. **Design for horizontal scaling** - Add capacity by adding instances, not vertical scaling
6. **Implement request timeouts** - Prevent long-running requests from blocking others

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How to prevent noisy neighbors? | Per-tenant resource quotas + rate limiting | Protect platform from resource hogs |
| What caching strategy for multi-tenant? | Tenant-prefixed keys in shared cache | Balance isolation with efficiency |
| How to handle database performance? | RLS + composite indexes + connection pooling | Optimize for tenant_id access pattern |
| Should we use read replicas? | Yes for Enterprise tier, optional for Pro | Cost-effective scaling for high-value tenants |
| How to measure performance per tenant? | Per-tenant metrics with tier-based SLOs | Enable self-service performance visibility |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Performance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `performance-*`
- **Caching patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `caching-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant performance optimization patterns {date}"
- Search: "SaaS caching strategies multi-tenant {date}"
- Search: "noisy neighbor mitigation cloud {date}"

---

## Related Workflows

- `bmad-bam-performance-baseline` - Establish performance baselines
- `bmad-bam-performance-review-execution` - Conduct performance reviews
- `bmad-bam-capacity-planning-review` - Plan capacity for performance
