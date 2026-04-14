# BAM Scaling Patterns Guide

**When to load:** During capacity planning, performance optimization, or when user mentions horizontal scaling, auto-scaling, database scaling, GPU allocation.

**Integrates with:** Architect (design), DevOps (operations), Developer (implementation)

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

### Scaling vs Tenant Tier

| Tier | Scaling Model | Resource Pool | Burst Capacity |
|------|---------------|---------------|----------------|
| Free | Shared, throttled | Common pool | None |
| Pro | Shared, prioritized | Common pool | 2x for 5 min |
| Enterprise | Dedicated + shared | Dedicated + overflow | 5x for 15 min |

---

## Application Guidelines

When implementing scaling for multi-tenant systems:

1. **Scale based on tenant activity, not just aggregate load**: Prevent noisy neighbors from triggering unnecessary scaling
2. **Differentiate scaling by tier**: Enterprise tenants may have dedicated scaling groups
3. **Implement predictive scaling**: Use time-of-day and historical patterns for proactive scaling
4. **Set scaling limits per tier**: Prevent any single tenant from consuming unbounded resources
5. **Monitor scaling events and costs**: Track when scaling occurs and attribute costs to tenants

---

## Horizontal Scaling Per Tier

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

---

## Vertical Scaling Thresholds

### When to Scale Up vs Out

| Metric | Scale Up Threshold | Scale Out Threshold |
|--------|-------------------|---------------------|
| CPU | > 80% sustained (5 min) | > 70% with HPA active |
| Memory | > 85% | > 75% with HPA active |
| Network | > 70% bandwidth | Add load balancer capacity |
| Disk IOPS | > 80% | Add read replicas |

### Resource Class Definitions

| Class | CPU | Memory | Use Case |
|-------|-----|--------|----------|
| Small | 0.5-1 vCPU | 1-2 GB | Free tier, light workloads |
| Medium | 2-4 vCPU | 4-8 GB | Pro tier, standard workloads |
| Large | 8-16 vCPU | 16-32 GB | Enterprise, heavy workloads |
| XLarge | 32+ vCPU | 64+ GB | Dedicated enterprise |

### Vertical Scaling Decision Matrix

| Current Load | Duration | Action |
|--------------|----------|--------|
| 70-80% | < 5 min | Monitor |
| 70-80% | 5-15 min | Scale out (horizontal) |
| 80-90% | < 5 min | Scale out (horizontal) |
| 80-90% | 5-15 min | Scale up (vertical) |
| > 90% | Any | Immediate scale up + out |

---

## Auto-Scaling Policies

### HPA Configuration Patterns

| Workload Type | Min Replicas | Max Replicas | Target Metric |
|---------------|--------------|--------------|---------------|
| API Gateway | 3 | 50 | 70% CPU, < 100ms p95 |
| Worker Pool | 2 | 20 | Queue depth < 100 |
| Agent Runtime | 2 | 30 | Active agents < 80% capacity |
| WebSocket | 2 | 20 | Connections < 8K per pod |

### Scaling Cooldown Periods

| Direction | Cooldown | Rationale |
|-----------|----------|-----------|
| Scale up | 30 seconds | Respond quickly to load |
| Scale down | 5 minutes | Prevent thrashing |
| Emergency scale | 0 seconds | Critical threshold breach |

### Predictive Scaling

| Pattern | Implementation | Accuracy Target |
|---------|----------------|-----------------|
| Time-of-day | Historical load curves | > 80% |
| Day-of-week | Weekly patterns | > 85% |
| Seasonal | Monthly/quarterly trends | > 70% |
| Event-driven | Known events calendar | Manual input |

---

## Database Scaling

### Read Replica Strategy

| Tier | Primary | Read Replicas | Replica Distribution |
|------|---------|---------------|---------------------|
| Free | Shared | 1-2 shared | Same region |
| Pro | Shared | 2-4 shared | Multi-AZ |
| Enterprise | Dedicated option | 2-8 dedicated | Multi-region option |

### Connection Pool Sizing

| Factor | Calculation | Example |
|--------|-------------|---------|
| Per-pod connections | Pods * connections_per_pod | 10 * 20 = 200 |
| Headroom | Total * 1.5 | 200 * 1.5 = 300 |
| Max connections | Database limit | 500 |
| PgBouncer pool | Total * 0.8 | 300 * 0.8 = 240 |

### Sharding Strategies

| Strategy | Shard Key | Use Case | Complexity |
|----------|-----------|----------|------------|
| Tenant-based | tenant_id | Strong isolation | Medium |
| Range-based | date/id range | Time-series data | Low |
| Hash-based | Consistent hash | Even distribution | Medium |
| Hybrid | Tenant + hash | Large tenants | High |

### Database Scaling Decision Tree

| Symptom | First Action | Second Action |
|---------|--------------|---------------|
| Read latency high | Add read replica | Optimize queries |
| Write latency high | Upgrade instance | Implement sharding |
| Connection exhaustion | Add PgBouncer | Increase pool size |
| Storage near limit | Archive old data | Expand storage |

---

## AI Inference Scaling

### GPU Allocation by Tier

| Tier | GPU Access | Model Options | Queue Priority |
|------|------------|---------------|----------------|
| Free | Shared pool | Small models only | Low |
| Pro | Shared pool | All models | Medium |
| Enterprise | Dedicated + shared | All + fine-tuned | High |

### Model Instance Scaling

| Model Size | Min Instances | Max Instances | Scale Trigger |
|------------|---------------|---------------|---------------|
| Small (< 7B) | 2 | 20 | Queue > 50, latency > 1s |
| Medium (7-70B) | 1 | 10 | Queue > 20, latency > 3s |
| Large (> 70B) | 1 | 5 | Queue > 10, latency > 10s |

### Inference Batching

| Strategy | Batch Size | Latency Trade-off | Throughput Gain |
|----------|------------|-------------------|-----------------|
| No batching | 1 | Lowest latency | 1x |
| Dynamic batching | 4-16 | +10-50ms | 2-4x |
| Continuous batching | 8-32 | +20-100ms | 3-6x |

### GPU Memory Management

| Technique | Memory Savings | Performance Impact |
|-----------|----------------|-------------------|
| Model quantization (8-bit) | 50% | 5-10% quality loss |
| Model quantization (4-bit) | 75% | 10-20% quality loss |
| Model offloading | Variable | Higher latency |
| Multi-model serving | Shared overhead | Slight latency |

---

## Scaling Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Vertical-only scaling | Cost explosion, limits | Design for horizontal |
| No tenant isolation in scaling | Noisy neighbor | Per-tenant metrics |
| Reactive-only scaling | Slow response | Add predictive scaling |
| Shared connection pools | Connection starvation | Per-tier pools |
| No scaling limits | Cost runaway | Max replicas + alerts |

---

## Monitoring for Scaling Decisions

| Metric | Scaling Signal | Action Threshold |
|--------|----------------|------------------|
| Request latency p99 | Scale out | > 2x SLA |
| Queue depth | Scale workers | > 100 items |
| GPU utilization | Scale inference | > 80% sustained |
| Memory pressure | Scale up | > 85% |
| Error rate | Investigate first | > 1% |

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `performance-isolation`, `rate-limiting`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant scaling patterns {date}"
- Search: "SaaS horizontal scaling strategies {date}"
- Search: "tenant-aware auto-scaling {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When to scale horizontally vs vertically? | Horizontal first for stateless components; vertical only when horizontal exhausted | Horizontal provides better availability and cost efficiency; vertical has hard limits |
| How to set per-tier resource limits? | Start with ratios (Free:1x, Pro:10x, Enterprise:100x); adjust based on actual usage | Simple initial model; data-driven refinement prevents over/under provisioning |
| When to implement predictive scaling? | After collecting 3+ months of traffic patterns; accuracy target >80% | Insufficient data leads to poor predictions; reactive scaling handles edge cases |
| How to handle GPU allocation for AI workloads? | Shared pool for Free/Pro with queue; dedicated for Enterprise | Cost-efficient for lower tiers; SLA guarantees require dedicated resources |
| When to shard the database? | When write latency exceeds SLA or connection pool saturated | Sharding adds complexity; prefer read replicas and optimization first |

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Scaling architecture decisions
- `bmad-bam-validate-foundation` - Scaling readiness verification
- `bmad-bam-tenant-aware-observability` - Scaling metrics setup
