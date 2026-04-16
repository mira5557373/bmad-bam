# BAM Capacity Planning Guide

**When to load:** During Phase 3 (Solutioning) when designing infrastructure capacity,
or when user mentions resource planning, scaling, quotas, tenant growth, cost projection.

**Integrates with:** Architect (Platform Design), DevOps (Infrastructure), PM (Roadmap Planning)

---

## Core Concepts

### Tenant Growth Modeling

Multi-tenant SaaS requires predictive capacity planning based on tenant acquisition, usage patterns, and tier distribution.

| Growth Model | Description | Planning Horizon |
|--------------|-------------|------------------|
| Linear | Steady tenant acquisition rate | 6-12 months |
| Exponential | Viral growth, rapid scaling | 3-6 months |
| Seasonal | Predictable peaks (e.g., Q4) | 12+ months |
| Event-driven | Launches, marketing campaigns | 1-3 months |

### Resource Quotas Per Tier

Each tenant tier requires different resource allocations to ensure fair usage and profitability.

| Resource | Free Tier | Pro Tier | Enterprise Tier |
|----------|-----------|----------|-----------------|
| API calls/day | 1,000 | 50,000 | Unlimited (fair use) |
| Storage (GB) | 1 | 50 | 500+ |
| Compute (vCPU) | Shared | 0.5 dedicated | 2+ dedicated |
| Concurrent agents | 1 | 5 | 25+ |
| Memory (agent) | 100MB | 500MB | 2GB+ |

### Multi-Tenant Resource Pool Architecture

```
┌─────────────────────────────────────────────────┐
│              Resource Pool Manager               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Compute  │  │ Storage  │  │  Memory  │      │
│  │   Pool   │  │   Pool   │  │   Pool   │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │             │             │             │
│  ┌────▼─────────────▼─────────────▼────┐       │
│  │        Tenant Quota Allocator        │       │
│  └────┬─────────────┬─────────────┬────┘       │
│       │             │             │             │
│  ┌────▼────┐   ┌────▼────┐   ┌────▼────┐      │
│  │Tenant A │   │Tenant B │   │Tenant C │      │
│  │ (Free)  │   │ (Pro)   │   │(Enterp.)│      │
│  └─────────┘   └─────────┘   └─────────┘      │
└─────────────────────────────────────────────────┘
```

---

## Application Guidelines

When planning capacity for multi-tenant systems:

1. **Establish baseline metrics** - Measure current resource consumption per tenant tier
2. **Model growth scenarios** - Create optimistic, realistic, and pessimistic projections
3. **Set quota thresholds** - Define soft limits (warnings) and hard limits (enforcement)
4. **Plan auto-scaling triggers** - Configure scaling based on aggregate and per-tenant metrics
5. **Project costs per tier** - Ensure each tier remains profitable at scale

---

## Auto-Scaling Triggers

### Horizontal Scaling Triggers

| Metric | Scale-Out Threshold | Scale-In Threshold | Cooldown |
|--------|--------------------|--------------------|----------|
| CPU utilization | > 70% for 5 min | < 30% for 15 min | 5 min |
| Memory utilization | > 80% for 3 min | < 40% for 15 min | 5 min |
| Request queue depth | > 100 pending | < 10 pending | 3 min |
| Active tenant sessions | > 85% capacity | < 50% capacity | 10 min |

### Vertical Scaling Triggers

| Scenario | Trigger | Action |
|----------|---------|--------|
| Enterprise tenant spike | > 50% tier quota | Pre-provision reserved capacity |
| Database connections | > 80% pool | Increase connection pool |
| Vector store queries | > 90% IOPS | Upgrade storage tier |

### Tenant-Aware Scaling

| Tenant Type | Scaling Strategy | Isolation |
|-------------|------------------|-----------|
| Free | Shared pool, no guaranteed | None |
| Pro | Shared pool, burst capacity | Soft |
| Enterprise | Dedicated resources | Hard |

---

## Cost Projection Framework

### Per-Tenant Cost Model

| Cost Component | Free | Pro | Enterprise |
|----------------|------|-----|------------|
| Compute ($/mo) | $0.10 | $5.00 | $50.00 |
| Storage ($/GB) | $0.02 | $0.02 | $0.015 |
| AI tokens ($/1K) | $0.002 | $0.002 | $0.0015 |
| Support ($/mo) | $0 | $10 | $100+ |

### Profitability Matrix

| Tier | Target Margin | Break-even Tenants | Revenue/Tenant |
|------|---------------|-------------------|----------------|
| Free | 0% (funnel) | N/A | $0 |
| Pro | 60-70% | 100 | $29-99/mo |
| Enterprise | 70-80% | 10 | $500-5000/mo |

### Cost Projection Formula

```
Monthly Platform Cost = 
  (Base Infrastructure) +
  (Per-Tenant Cost × Tenant Count) +
  (Burst Capacity Reserve) +
  (AI Provider Costs)
```

---

## Capacity Planning Checklist

| Planning Phase | Key Activities |
|----------------|----------------|
| Discovery | Identify usage patterns, peak times, growth rate |
| Modeling | Build tenant growth and resource consumption models |
| Quota Design | Define tier limits, overage policies, fair use |
| Scaling Config | Set auto-scaling rules, thresholds, cooldowns |
| Cost Analysis | Project costs, validate tier profitability |
| Monitoring | Implement capacity dashboards, alerts |

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| Rapid growth expected | Over-provision by 50% | Avoid service degradation during scaling |
| Stable tenant base | Right-size with auto-scaling | Optimize costs |
| Enterprise onboarding | Pre-provision dedicated resources | Meet SLA commitments |
| Cost overruns | Review tier quotas, implement throttling | Protect margins |
| Noisy neighbor complaints | Implement resource isolation | Improve tenant experience |

---

## Related Workflows

- `create-master-architecture` - Include capacity strategy in platform design
- `bmad-bam-tenant-onboarding-design` - Resource provisioning during onboarding
- `bmad-bam-tenant-aware-observability` - Capacity monitoring and alerting

## Related Patterns

Load decision criteria and web search queries from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `capacity-*`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "multi-tenant capacity planning patterns {date}"
- Search: "SaaS resource quota management {date}"
- Search: "Kubernetes auto-scaling multi-tenant {date}"
