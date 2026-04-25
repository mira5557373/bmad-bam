# BAM Scaling Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing scaling strategies, rate limiting, capacity planning, or performance isolation. Load when user mentions scaling, rate limits, throttling, capacity, performance, noisy neighbor, horizontal scaling, auto-scaling, GPU allocation.

**Integrates with:** Architect (Atlas persona), DevOps agent, SRE roles, Developer (implementation)

---

## Core Concepts

### Scaling Dimensions

Multi-tenant platforms require scaling across multiple dimensions simultaneously.

| Dimension | Scaling Unit | Trigger Metrics |
|-----------|--------------|-----------------|
| Compute | Pod/Container | CPU, memory, request queue |
| Database | Connections, replicas | Query latency, connection pool |
| Cache | Memory, nodes | Hit rate, eviction rate |
| AI Inference | GPU, model instances | Queue depth, latency |
| Storage | IOPS, capacity | Throughput, utilization |

### Multi-Tenant Scaling Challenges

| Challenge | Impact | Mitigation Strategy |
|-----------|--------|---------------------|
| Noisy Neighbor | One tenant degrades others | Per-tenant resource limits |
| Unpredictable Load | Capacity planning difficult | Tier-based quotas + auto-scaling |
| Cost Attribution | Hard to bill accurately | Per-tenant metering + usage tracking |
| Fair Scheduling | Unequal access to resources | Weighted fair queuing |
| Connection Exhaustion | Database bottleneck | Connection pooling + tenant routing |

### Scaling vs Tenant Tier

| Tier | Scaling Model | Resource Pool | Burst Capacity |
|------|---------------|---------------|----------------|
| Free | Shared, throttled | Common pool | None |
| Pro | Shared, prioritized | Common pool | 2x for 5 min |
| Enterprise | Dedicated + shared | Dedicated + overflow | 5x for 15 min |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and must be followed for multi-tenant scaling implementations.

### Rate Limit Key Format

All rate limiting keys must follow the tenant-scoped format:

```
ratelimit:{tenant}:{endpoint}
```

**Key Pattern Examples:**

| Pattern | Example | Purpose |
|---------|---------|---------|
| `ratelimit:{tenant_id}:{endpoint}` | `ratelimit:tenant_abc:api/users` | Per-tenant endpoint limit |
| `ratelimit:{tenant_id}:global` | `ratelimit:tenant_abc:global` | Tenant-wide rate limit |
| `ratelimit:{tenant_id}:{user_id}:{endpoint}` | `ratelimit:tenant_abc:user_123:api/chat` | Per-user within tenant |

### Tier-Based Quotas

Standard quota configuration for multi-tenant SaaS:

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| API requests/min | 10 | 100 | 1000 |
| API requests/day | 1,000 | 50,000 | Unlimited (fair use) |
| AI tokens/day | 10K | 100K | Unlimited |
| Concurrent agents | 1 | 5 | 50 |
| Storage (GB) | 1 | 50 | 500+ |
| File uploads/hour | 5 | 50 | 500 |
| Webhook calls/min | 5 | 25 | 100 |
| Concurrent sessions | 5 | 50 | 500 |

### Cache Key Conventions

Cache keys must include tenant isolation:

```
# Pattern: {tenant}:{resource_type}:{identifier}
tenant:abc:user:123
tenant:abc:session:xyz
tenant:abc:config:theme
```

### Queue Priority Weights

| Tier | Priority Weight | Description |
|------|-----------------|-------------|
| Enterprise | 10 | Highest priority processing |
| Pro | 5 | Standard priority |
| Free | 1 | Best-effort processing |

---

## Decision Framework

### When to Use Which Scaling Strategy

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When to scale horizontally vs vertically? | Horizontal first for stateless components; vertical only when horizontal exhausted | Horizontal provides better availability and cost efficiency; vertical has hard limits |
| How to set per-tier resource limits? | Start with ratios (Free:1x, Pro:10x, Enterprise:100x); adjust based on actual usage | Simple initial model; data-driven refinement prevents over/under provisioning |
| When to implement predictive scaling? | After collecting 3+ months of traffic patterns; accuracy target >80% | Insufficient data leads to poor predictions; reactive scaling handles edge cases |
| How to handle GPU allocation for AI workloads? | Shared pool for Free/Pro with queue; dedicated for Enterprise | Cost-efficient for lower tiers; SLA guarantees require dedicated resources |
| When to shard the database? | When write latency exceeds SLA or connection pool saturated | Sharding adds complexity; prefer read replicas and optimization first |
| Which rate limiting algorithm? | Token bucket for balanced burst and rate | Allows burst while maintaining average rate |
| When to use dedicated resources? | Enterprise tier with strict SLAs | Guaranteed performance, isolation from noisy neighbors |
| How to handle rapid growth? | Over-provision by 50% | Avoid service degradation during scaling |

---

## §horizontal-scaling

### Pattern: Horizontal Scaling

Horizontal scaling adds more instances rather than increasing instance size, providing better availability and cost efficiency for multi-tenant platforms.

### Compute Scaling Matrix

| Component | Free Tier | Pro Tier | Enterprise Tier |
|-----------|-----------|----------|-----------------|
| API Pods | Shared (2-4 pods) | Shared (4-10 pods) | Dedicated (2-20 pods) |
| Worker Pods | Shared (2-4 pods) | Shared (4-8 pods) | Dedicated (2-10 pods) |
| Agent Executors | Queue-based | Pool-based | Dedicated pool |

### Scaling Strategies by Component

| Component | Strategy | Metric | Target |
|-----------|----------|--------|--------|
| Stateless API | HPA (Horizontal Pod Autoscaler) | CPU, RPS | 70% CPU, < 100ms p95 |
| Background workers | KEDA (Event-driven) | Queue depth | < 100 pending |
| WebSocket servers | HPA + sticky sessions | Connections | < 10K per pod |
| Scheduled jobs | CronJob with concurrency | Job duration | Within SLA |

### Tenant-Aware Scaling Signals

| Signal | Weight | Description |
|--------|--------|-------------|
| Active tenant count | High | Number of tenants with recent activity |
| Tier distribution | Medium | Enterprise tenants trigger faster scaling |
| Request rate per tenant | Medium | Detect noisy neighbors |
| Time-of-day patterns | Low | Predictive scaling |

### Auto-Scaling Triggers

| Metric | Scale-Out Threshold | Scale-In Threshold | Cooldown |
|--------|--------------------|--------------------|----------|
| CPU utilization | > 70% for 5 min | < 30% for 15 min | 5 min |
| Memory utilization | > 80% for 3 min | < 40% for 15 min | 5 min |
| Request queue depth | > 100 pending | < 10 pending | 3 min |
| Active tenant sessions | > 85% capacity | < 50% capacity | 10 min |

### Scaling Cooldown Periods

| Direction | Cooldown | Rationale |
|-----------|----------|-----------|
| Scale up | 30 seconds | Respond quickly to load |
| Scale down | 5 minutes | Prevent thrashing |
| Emergency scale | 0 seconds | Critical threshold breach |

---

## §rate-limiting

### Pattern: Rate Limiting

Per-tenant rate limits ensure fair resource allocation and prevent any single tenant from consuming disproportionate resources while supporting tiered pricing models.

### Rate Limiting Dimensions

| Dimension | Scope | Purpose |
|-----------|-------|---------|
| Global | Platform-wide | Infrastructure protection |
| Tenant | Per-tenant | Resource fairness |
| User | Per-user | User fairness |
| Endpoint | Per-API | Targeted protection |
| Resource | Per-operation | Cost control |
| IP | Per-address | DDoS mitigation |

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

### Algorithm Comparison

| Algorithm | Description | Use Case | Tenant Fit |
|-----------|-------------|----------|------------|
| Fixed Window | Count per time window | Simple limits | Basic tiers |
| Sliding Window | Rolling time window | Smoother limits | Standard |
| Token Bucket | Tokens replenish over time | Burst allowed | Pro tiers |
| Adaptive | Dynamic based on load | Complex scenarios | Enterprise |

### Token Bucket Configuration

| Tier | Capacity (Burst Size) | Refill Rate | Effective RPM |
|------|----------|-------------|---------------|
| Free | 10 | 0.17/s | 10/min |
| Pro | 100 | 1.67/s | 100/min |
| Enterprise | 1000 | 16.67/s | 1000/min |

### Sliding Window Intervals

| Window Type | Duration | Use Case |
|-------------|----------|----------|
| Second | 1s | Burst protection |
| Minute | 60s | API rate limiting |
| Hour | 3600s | Quota enforcement |
| Day | 86400s | Daily limits |

### Burst Handling

| Tier | Multiplier | Duration | Cooldown |
|------|------------|----------|----------|
| Free | 1.5x | 10s | 60s |
| Pro | 2x | 30s | 30s |
| Enterprise | 3x | 60s | 15s |

### Response Headers

| Header | Purpose | Example |
|--------|---------|---------|
| X-RateLimit-Limit | Max requests allowed | 100 |
| X-RateLimit-Remaining | Requests left | 45 |
| X-RateLimit-Reset | Reset timestamp | 1712678400 |
| Retry-After | Seconds to wait | 30 |

---

## §capacity-planning

### Pattern: Capacity Planning

Per-tenant capacity planning enables predictive resource provisioning based on tenant tier, usage patterns, and growth projections.

### Tenant Growth Modeling

| Growth Model | Description | Planning Horizon |
|--------------|-------------|------------------|
| Linear | Steady tenant acquisition rate | 6-12 months |
| Exponential | Viral growth, rapid scaling | 3-6 months |
| Seasonal | Predictable peaks (e.g., Q4) | 12+ months |
| Event-driven | Launches, marketing campaigns | 1-3 months |

### Capacity Planning Formula

```
Required Capacity = 
  (Peak Tenant Load x Tenant Count x Growth Factor) 
  / Utilization Target

Where:
- Peak Tenant Load: p99 resource usage per tenant
- Growth Factor: 1.5 for 6-month projection
- Utilization Target: 0.7 (70% target utilization)
```

### Resource Pool Architecture

```
+---------------------------------------------+
|              Resource Pool Manager           |
|  +----------+  +----------+  +----------+   |
|  | Compute  |  | Storage  |  |  Memory  |   |
|  |   Pool   |  |   Pool   |  |   Pool   |   |
|  +----+-----+  +----+-----+  +----+-----+   |
|       |             |             |          |
|  +----v-------------v-------------v----+    |
|  |        Tenant Quota Allocator        |    |
|  +----+-----------+-----------+----+        |
|       |           |           |              |
|  +----v----+ +----v----+ +----v----+        |
|  |Tenant A | |Tenant B | |Tenant C |        |
|  | (Free)  | | (Pro)   | |(Enterp.)|        |
|  +---------+ +---------+ +---------+        |
+---------------------------------------------+
```

### Cost Projection Framework

| Cost Component | Free | Pro | Enterprise |
|----------------|------|-----|------------|
| Compute ($/mo) | $0.10 | $5.00 | $50.00 |
| Storage ($/GB) | $0.02 | $0.02 | $0.015 |
| AI tokens ($/1K) | $0.002 | $0.002 | $0.0015 |
| Support ($/mo) | $0 | $10 | $100+ |

### Capacity Planning Checklist

| Planning Phase | Key Activities |
|----------------|----------------|
| Discovery | Identify usage patterns, peak times, growth rate |
| Modeling | Build tenant growth and resource consumption models |
| Quota Design | Define tier limits, overage policies, fair use |
| Scaling Config | Set auto-scaling rules, thresholds, cooldowns |
| Cost Analysis | Project costs, validate tier profitability |
| Monitoring | Implement capacity dashboards, alerts |

---

## §performance-isolation

### Pattern: Performance Isolation

Noisy neighbor prevention and resource partitioning ensure one tenant's workload does not degrade performance for other tenants.

### The Noisy Neighbor Problem

| Symptom | Cause | Impact |
|---------|-------|--------|
| Latency spikes | CPU contention | All tenants slow |
| Timeouts | Connection exhaustion | Failed requests |
| OOM errors | Memory pressure | Pod restarts |
| Queue backup | Worker saturation | Delayed jobs |

### Isolation Spectrum

```
+---------------------------------------------+
|  Shared        Partitioned      Dedicated   |
|  Resources     Resources        Resources   |
|     |              |                |       |
|  +-----+       +-----+          +-----+    |
|  |Free |       | Pro |          | Ent |    |
|  +-----+       +-----+          +-----+    |
|  Low Cost      Medium           High Cost   |
|  Low Isolation Fair             Full        |
+---------------------------------------------+
```

### Per-Tier Resource Limits

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| CPU (cores) | 0.25 shared | 1.0 guaranteed | 4.0 dedicated |
| Memory (GB) | 0.5 shared | 2.0 guaranteed | 8.0 dedicated |
| Connections | 5 | 25 | 100 |
| IOPS | 100 shared | 500 | 2000 |

### Priority Queue Architecture

```
+------------------------------------------+
|            Priority Router                |
|   Enterprise:10  Pro:5  Free:1           |
|        |          |         |            |
|        v          v         v            |
|   +--------+ +--------+ +--------+       |
|   | HIGH   | | MEDIUM | |  LOW   |       |
|   | Queue  | | Queue  | | Queue  |       |
|   +--------+ +--------+ +--------+       |
+------------------------------------------+
```

### Fair Scheduling Algorithms

| Algorithm | Best For |
|-----------|----------|
| Weighted Fair Queuing | Network/API |
| Deficit Round Robin | CPU scheduling |
| Token Bucket | API throttling |
| Leaky Bucket | Background jobs |

### Isolation Pool Architecture (Kubernetes)

```
+---------------------------------------------+
|           Kubernetes Cluster                 |
|  +---------------------------------------+  |
|  |         Shared Node Pool              |  |
|  |  +----+ +----+ +----+ +----+ +----+  |  |
|  |  |Free| |Free| |Pro | |Pro | |Pro |  |  |
|  |  +----+ +----+ +----+ +----+ +----+  |  |
|  +---------------------------------------+  |
|  +-----------------+ +-----------------+    |
|  | Dedicated Pool  | | Dedicated Pool  |    |
|  |   Enterprise A  | |   Enterprise B  |    |
|  +-----------------+ +-----------------+    |
+---------------------------------------------+
```

### Automatic Remediation

| Condition | Response | Cooldown |
|-----------|----------|----------|
| CPU > 90% | Throttle 50% | 10 min |
| Memory > 95% | Restart pod | 5 min |
| Queue > 1000 | Reject new | 2 min |

### Noisy Neighbor Detection

| Signal | Detection | Threshold |
|--------|-----------|-----------|
| CPU Usage | Per-tenant tracking | > 2 std dev |
| Memory | Container metrics | > quota |
| Requests | Rate counter | > tier limit |
| Storage Growth | Daily delta | > 10% daily |

---

## §api-throttling

### Pattern: API Throttling

Throttling strategies and graceful degradation protect system stability while maintaining acceptable user experience under load.

### Throttling Granularity

| Level | Scope | Use Case |
|-------|-------|----------|
| Global | All requests | System protection |
| Per-Tenant | Tenant's requests | Fair sharing |
| Per-Endpoint | Specific API | Expensive operations |
| Per-User | Individual users | User fairness |
| Per-IP | Source IP | Abuse prevention |

### Per-Tier Throttling Limits

| Tier | Requests/Minute | Burst Size | Endpoints |
|------|-----------------|------------|-----------|
| Free | 60 | 10 | Limited |
| Pro | 600 | 100 | All |
| Enterprise | 6000 | 1000 | All + Priority |

### Token Bucket Flow

```
+-------------------------------------+
|          Token Bucket                |
|  +-----------------------------+    |
|  |  Tokens: ########________   |    |
|  |          (current/max)      |    |
|  +-----------------------------+    |
|                                      |
|  Refill: +10 tokens/second          |
|  Request Cost: 1 token              |
|  Burst: up to bucket size           |
+-------------------------------------+
```

### Graceful Degradation Strategies

| Strategy | Trigger | Action |
|----------|---------|--------|
| Soft throttling | 80% of limit | Warn in headers |
| Hard throttling | 100% of limit | Return 429 |
| Quality reduction | High load | Reduce response fidelity |
| Feature gating | Quota exhausted | Disable non-essential features |

### Throttling Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| No tenant context | All tenants share limit | Per-tenant counters |
| Hard failures | Poor UX | Graceful degradation |
| No feedback | Users surprised | Clear headers |
| Static limits | Doesn't scale | Adaptive throttling |
| Missing metrics | Can't tune | Track rejection rates |

---

## Quality Gates

### QG-P1 Verification for Scaling

Before production deployment, verify scaling configuration:

| Check | Verification | Status |
|-------|--------------|--------|
| Rate limits configured | All tiers have defined limits | Required |
| Auto-scaling tested | HPA/KEDA triggers validated | Required |
| Capacity headroom | >30% headroom for growth | Required |
| Noisy neighbor controls | Per-tenant quotas enforced | Required |
| Monitoring dashboards | Per-tenant metrics visible | Required |
| Alert thresholds | Scaling alerts configured | Required |

### Scaling Readiness Checklist

- [ ] Rate limit key format follows `ratelimit:{tenant}:{endpoint}` convention
- [ ] All tiers have documented quotas (Free/Pro/Enterprise)
- [ ] Cache keys include tenant isolation prefix
- [ ] Connection pools are tenant-aware
- [ ] Auto-scaling triggers are defined and tested
- [ ] Circuit breakers configured for tenant isolation
- [ ] Graceful degradation paths documented
- [ ] Cost attribution per tenant is measurable

---

## Web Research

| Topic | Query |
|-------|-------|
| Multi-tenant scaling | `multi-tenant scaling patterns SaaS {date}` |
| Rate limiting | `rate limiting multi-tenant SaaS {date}` |
| Token bucket | `token bucket rate limiting patterns {date}` |
| Capacity planning | `SaaS capacity planning multi-tenant {date}` |
| Noisy neighbor | `noisy neighbor prevention multi-tenant SaaS {date}` |
| Auto-scaling | `Kubernetes auto-scaling multi-tenant {date}` |
| Performance isolation | `multi-tenant performance isolation patterns {date}` |
| API throttling | `API throttling multi-tenant SaaS {date}` |
| GPU allocation | `GPU sharing multi-tenant AI workloads {date}` |
| Database scaling | `PostgreSQL connection pooling multi-tenant {date}` |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **Scaling patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `scaling-*`
- **Rate limiting:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`
- **Capacity patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `capacity-*`
- **Performance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `performance-*`
- **API throttling:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-throttling`
- **Tenant isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `performance-isolation`

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Scaling architecture decisions
- `bmad-bam-validate-foundation` - Scaling readiness verification
- `bmad-bam-tenant-aware-observability` - Scaling metrics setup
- `bmad-bam-tenant-model-isolation` - Configure tenant-specific limits
- `bmad-bam-usage-metering-design` - Track usage against limits
- `bmad-bam-tenant-tier-migration` - Adjust limits on tier change
- `bmad-bam-capacity-planning-review` - Conduct capacity reviews
- `bmad-bam-auto-scaling-configuration` - Configure auto-scaling
- `bmad-bam-pricing-tier-configuration` - Define tier-based quotas
- `bmad-bam-performance-baseline` - Establish performance baselines

---

## Change Log

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 7 source files: scaling-patterns.md (266 lines), api-throttling.md (190 lines), rate-limiting.md (177 lines), capacity-planning-guide.md (171 lines), performance-isolation.md (154 lines), capacity-patterns.md (117 lines), performance-patterns.md (115 lines) |
