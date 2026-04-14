# BAM Per-Tenant Rate Limiting Guide

**When to load:** During Phase 3 (Solutioning) when designing API throttling, per-tenant quotas, or usage-based limits.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### Rate Limiting Dimensions

| Dimension | Scope | Purpose |
|-----------|-------|---------|
| Global | Platform-wide | Infrastructure protection |
| Tenant | Per-tenant | Resource fairness |
| User | Per-user | User fairness |
| Endpoint | Per-API | Targeted protection |
| Resource | Per-operation | Cost control |
| IP | Per-address | DDoS mitigation |

### Rate Limiting Philosophy

Rate limiting in multi-tenant platforms serves multiple purposes beyond simple traffic control. It ensures fair resource allocation among tenants, protects infrastructure from abuse, enables predictable capacity planning, and supports tiered pricing models. Effective rate limiting must be transparent to users, providing clear feedback about limits and reset times.

The hierarchical approach to rate limiting allows fine-grained control while maintaining simplicity. Requests pass through successive limit checks, with the first exceeded limit triggering a rejection. This model prevents any single tenant or user from consuming disproportionate resources while still allowing legitimate burst traffic within defined thresholds.

### Rate Limiting Architecture

```
+-----------------------------------------------------------+
|  +----------+   +----------+   +----------+   +----------+|
|  | Global   |-->| Tenant   |-->| User     |-->| Endpoint ||
|  | Limit    |   | Limit    |   | Limit    |   | Limit    ||
|  +----------+   +----------+   +----------+   +----------+|
|  First 429 stops request progression                       |
|                      |                                      |
|                      v                                      |
|               Redis Cluster (Distributed Counters)         |
+-----------------------------------------------------------+
```

### Distributed Implementation

Rate limiting counters must be synchronized across all application instances. Redis-based implementations using atomic operations ensure accurate counting even under high concurrency. Consider using Redis Cluster for high availability and horizontal scaling of the rate limiting layer.

---

## Application Guidelines

When implementing rate limiting in multi-tenant systems:

1. **Start with tenant-level limits**: Ensure fair resource allocation across tenants before refining user-level limits
2. **Use distributed counters**: Redis or similar for accurate cross-instance counting
3. **Provide clear feedback**: Include rate limit headers in all responses
4. **Design for burst handling**: Allow legitimate traffic spikes within bounds
5. **Monitor and alert**: Track 429 rates and proactively address limit exhaustion

---

## Token Bucket Algorithm

| Tier | Capacity | Refill Rate | Effective RPM |
|------|----------|-------------|---------------|
| Free | 10 | 0.17/s | 10/min |
| Pro | 100 | 1.67/s | 100/min |
| Enterprise | 1000 | 16.67/s | 1000/min |

---

## Sliding Window Algorithm

| Window Type | Duration | Use Case |
|-------------|----------|----------|
| Second | 1s | Burst protection |
| Minute | 60s | API rate limiting |
| Hour | 3600s | Quota enforcement |
| Day | 86400s | Daily limits |

---

## Per-Tier Limits

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| API requests/min | 10 | 100 | 1000 |
| AI tokens/day | 10K | 100K | Unlimited |
| Concurrent agents | 1 | 5 | 50 |
| Storage (GB) | 1 | 10 | 100 |
| File uploads/hour | 5 | 50 | 500 |
| Webhook calls/min | 5 | 25 | 100 |

### Overage Handling

Enterprise tiers may support usage beyond limits with overage billing. Track overages separately and apply configurable billing rates. Provide real-time usage dashboards so tenants can monitor consumption.

---

## Burst Handling

| Tier | Multiplier | Duration | Cooldown |
|------|------------|----------|----------|
| Free | 1.5x | 10s | 60s |
| Pro | 2x | 30s | 30s |
| Enterprise | 3x | 60s | 15s |

---

## Response Headers

| Header | Description | Example |
|--------|-------------|---------|
| X-RateLimit-Limit | Max requests | 100 |
| X-RateLimit-Remaining | Requests left | 45 |
| X-RateLimit-Reset | Reset timestamp | 1704067200 |
| Retry-After | Seconds to wait | 30 |

---

## Related Patterns

- `rate-limiting` pattern in `bam-patterns.csv`
- `tenant-isolation.md` guide for per-tenant quotas
- `tier-ux.md` guide for tier-based limit configuration
- `observability.md` guide for rate limit monitoring
- `rate-limit-config-template.md` for output documentation
- **performance-isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `performance-isolation`
- **caching-strategy:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-strategy`
- **api-throttling:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `api-throttling`

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rate-limiting`
- `{project-root}/_bmad/bam/data/tenant-models.csv` → tier configurations

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `rate-limiting` | `rate limiting multi-tenant SaaS {date}` |
| `rate-limiting` | `token bucket per-tenant multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Protecting infrastructure? | Global rate limits |
| Fair tenant access? | Per-tenant limits + burst |
| User abuse prevention? | Per-user within tenant |
| API monetization? | Tiered limits + overages |
| Noisy neighbor concern? | Strict tenant quotas |
| DDoS protection needed? | IP-based limits + WAF |
| Cost-sensitive operations? | Resource-specific limits |

---

## Related Workflows

- `bmad-bam-usage-metering-design` - Track rate limit events for billing and analytics
- `bmad-bam-tenant-model-isolation` - Design tenant-scoped rate limiting boundaries
- `bmad-bam-tenant-tier-migration` - Adjust rate limits when tenants change tiers

---

## Monitoring and Alerting

| Metric | Alert Condition | Action |
|--------|-----------------|--------|
| 429 rate | > 5% of requests | Investigate abuse |
| Limit exhaustion | Tenant at 90% | Proactive outreach |
| Burst frequency | > 10 bursts/hour | Review tenant usage |
| Global headroom | < 20% capacity | Scale infrastructure |
