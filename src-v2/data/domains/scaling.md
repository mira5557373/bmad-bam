# Scaling - BAM Domain Context

**Loaded by:** ZVT, ZGE, ZED, ZLB, ZCG, ZUA, ZPR  
**Related Workflows:** bmad-bam-production-readiness, bmad-bam-infrastructure-design

---

## Overview

Scaling patterns for multi-tenant SaaS encompass vertical and horizontal growth strategies, geographic distribution, edge deployment, and load balancing mechanisms that ensure performance isolation across tenant tiers.

## Core Concepts

### Scaling Dimensions

| Dimension | Strategy | Tenant Impact | Use Case |
|-----------|----------|---------------|----------|
| Vertical | Larger instances | All tenants benefit | Quick wins, limited scope |
| Horizontal | More instances | Per-tier capacity pools | Elastic workloads |
| Geographic | Regional deployment | Latency improvement | Global customers |
| Edge | Compute at edge | Offline capability | Real-time requirements |

### Tenant-Aware Scaling

```
Traffic Analysis
      │
      ▼
┌─────────────────┐
│ Tier Detection  │ ← Identify tenant tier from request
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Resource Pool   │ ← Route to tier-appropriate pool
│ Selection       │
└────────┬────────┘
         │
    ┌────┴────┬─────────┐
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│ Free  │ │  Pro  │ │ Ent   │
│ Pool  │ │ Pool  │ │ Pool  │
└───────┘ └───────┘ └───────┘
```

### Scaling Triggers

| Trigger | Metric | Threshold | Action |
|---------|--------|-----------|--------|
| CPU | Utilization | >70% sustained | Scale out |
| Memory | Usage | >80% | Scale up |
| Queue Depth | Pending jobs | >100 per node | Scale out |
| Latency | P99 | >500ms | Scale out |
| Error Rate | 5xx | >1% | Scale out + alert |

## Decision Matrix

| Requirement | Strategy | Trade-off |
|-------------|----------|-----------|
| Global latency <100ms | Multi-region + edge | Complexity, data sync |
| Cost efficiency | Shared pools | Noisy neighbor risk |
| Performance isolation | Dedicated pools | Higher cost |
| Burst capacity | Serverless functions | Cold start latency |

## Quality Checks

- [ ] Scaling policies defined per tenant tier
- [ ] Noisy neighbor protection in place
- [ ] **CRITICAL:** Scale-down preserves in-flight requests
- [ ] Capacity planning includes tenant growth projections

## Web Research Queries

- "Multi-tenant SaaS scaling patterns {date}"
- "Kubernetes horizontal pod autoscaling multi-tenant {date}"
- "Geographic load balancing cloud {date}"
- "Edge computing SaaS architecture {date}"

## Related Patterns

**Scaling:**
- `{project-root}/_bmad/bam/data/patterns/vertical-scaling.md` - Vertical scaling strategies
- `{project-root}/_bmad/bam/data/patterns/predictive-scaling.md` - ML-based demand forecasting
- `{project-root}/_bmad/bam/data/patterns/geo-distribution.md` - Geographic distribution
- `{project-root}/_bmad/bam/data/patterns/edge-deployment.md` - Edge compute patterns
- `{project-root}/_bmad/bam/data/patterns/load-balancing.md` - Load balancing strategies
- `{project-root}/_bmad/bam/data/patterns/cache-invalidation.md` - Cache coherence
- `{project-root}/_bmad/bam/data/patterns/usage-analytics.md` - Tenant usage analytics

### Web Research

- "auto-scaling strategies multi-tenant {date}"
- "edge deployment patterns SaaS {date}"
- "cache invalidation distributed systems {date}"
