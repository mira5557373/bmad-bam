# API Throttling Patterns

**When to load:** When implementing rate limiting, tenant quotas, or when user mentions API abuse prevention, throttling, or request limiting.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What is API Throttling?

API throttling controls the rate at which tenants can make API requests, preventing abuse, ensuring fair resource distribution, and protecting system stability in a multi-tenant SaaS environment.

### Throttling Algorithm Comparison

| Algorithm | Description | Use Case | Tenant Fit |
|-----------|-------------|----------|------------|
| Fixed Window | Count per time window | Simple limits | Basic tiers |
| Sliding Window | Rolling time window | Smoother limits | Standard |
| Token Bucket | Tokens replenish over time | Burst allowed | Pro tiers |
| Adaptive | Dynamic based on load | Complex scenarios | Enterprise |

---

## Key Patterns

### Pattern 1: Fixed Window Throttling

Count requests in fixed time intervals.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Window Size | Time interval (minute/hour) | Same for all tenants |
| Counter | Request count | Per-tenant counter |
| Reset | Counter cleared at window end | Synchronized reset |
| Response | 429 when exceeded | Include retry-after |

### Fixed Window Flow

```
Window Start ────────────────────> Window End
      │                                 │
      ├── Request 1 (count=1)          │
      ├── Request 2 (count=2)          │
      ├── ...                          │
      └── Request N (count=limit) ──> 429
                                       │
                                   Counter Reset
```

### Pattern 2: Sliding Window Throttling

Rolling window provides smoother rate limiting.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Window Size | Rolling interval | Configurable per tier |
| Weighted Count | Previous + current | Tenant-specific weights |
| Precision | Sub-window buckets | Storage trade-off |
| Smoothing | Prevents edge bursts | Better user experience |

### Pattern 3: Token Bucket Throttling

Allows controlled bursting while maintaining average rate.

| Parameter | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Bucket Size | Max tokens (burst capacity) | Per-tier capacity |
| Refill Rate | Tokens per second | Per-tier rate |
| Cost | Tokens per request | Per-endpoint cost |
| Overflow | Excess tokens discarded | Prevents accumulation |

### Token Bucket Flow

```
┌─────────────────────────────────────┐
│          Token Bucket                │
│  ┌─────────────────────────────┐    │
│  │  Tokens: ████████░░░░░░░░   │    │
│  │          (current/max)      │    │
│  └─────────────────────────────┘    │
│                                      │
│  Refill: +10 tokens/second          │
│  Request Cost: 1 token              │
│  Burst: up to bucket size           │
└─────────────────────────────────────┘
```

### Pattern 4: Adaptive Throttling

Dynamic limits based on system load and tenant behavior.

| Factor | Adjustment | Tenant Consideration |
|--------|------------|---------------------|
| System Load | Reduce limits under stress | All tenants affected |
| Tenant Behavior | Reward good actors | Per-tenant reputation |
| Time of Day | Peak vs off-peak | Usage patterns |
| Resource Usage | Heavy users throttled | Fair distribution |

---

## Application Guidelines

When implementing throttling:

1. **Layer limits** - Global, per-tenant, and per-endpoint
2. **Communicate clearly** - Return remaining quota in headers
3. **Grace periods** - Soft limits before hard blocks
4. **Differentiate tiers** - Higher tiers get higher limits
5. **Monitor and adjust** - Review limits based on usage

---

## Per-Tier Throttling Limits

| Tier | Requests/Minute | Burst Size | Endpoints |
|------|-----------------|------------|-----------|
| Free | 60 | 10 | Limited |
| Pro | 600 | 100 | All |
| Enterprise | 6000 | 1000 | All + Priority |

---

## Response Headers

| Header | Purpose | Example |
|--------|---------|---------|
| X-RateLimit-Limit | Max requests allowed | 100 |
| X-RateLimit-Remaining | Requests left | 45 |
| X-RateLimit-Reset | Reset timestamp | 1712678400 |
| Retry-After | Seconds to wait | 30 |

---

## Throttling Granularity

| Level | Scope | Use Case |
|-------|-------|----------|
| Global | All requests | System protection |
| Per-Tenant | Tenant's requests | Fair sharing |
| Per-Endpoint | Specific API | Expensive operations |
| Per-User | Individual users | User fairness |
| Per-IP | Source IP | Abuse prevention |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| No tenant context | All tenants share limit | Per-tenant counters |
| Hard failures | Poor UX | Graceful degradation |
| No feedback | Users surprised | Clear headers |
| Static limits | Doesn't scale | Adaptive throttling |
| Missing metrics | Can't tune | Track rejection rates |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which algorithm for most cases? | Token bucket for balanced burst and rate | Allows burst while maintaining average rate |
| How to handle exceeded limits? | 429 with Retry-After header | Standard HTTP, clear guidance |
| Should limits vary by endpoint? | Yes, expensive operations get lower limits | Prevents abuse of costly operations |
| How to communicate limits? | Headers on every response | Proactive awareness |

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Configure tenant-specific limits
- `bmad-bam-usage-metering-design` - Track usage against limits
- `bmad-bam-tenant-tier-migration` - Adjust limits on tier change

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Throttling patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-throttling`
- **Rate limiting:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`
- **Quota management:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `quota-management`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "API throttling multi-tenant {date}"
- Search: "tenant rate limiting patterns {date}"
- Search: "token bucket rate limiting SaaS {date}"
