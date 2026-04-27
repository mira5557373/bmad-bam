# BAM Cost Optimization Patterns Guide

**When to load:** During infrastructure cost analysis, margin optimization, resource efficiency planning, or when implementing cost controls for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), DevOps teams, Finance, analytics-bam extension.

---

## Core Concepts

### Cost Categories in Multi-Tenant SaaS

| Category | Components | Attribution |
|----------|------------|-------------|
| Compute | Servers, containers, functions | Per-tenant usage |
| Storage | Databases, files, backups | Per-tenant volume |
| Network | Bandwidth, CDN, DNS | Per-tenant traffic |
| AI/ML | LLM tokens, embeddings, training | Per-tenant consumption |
| Third-Party | APIs, services, tools | Per-tenant or shared |

### Cost Attribution Model

```
┌─────────────────────────────────────────────────┐
│            Cost Attribution Layers               │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │         Direct Tenant Costs               │   │
│  │  (API calls, storage, compute time)       │   │
│  └────────────────────┬─────────────────────┘   │
│                       │                          │
│  ┌────────────────────▼─────────────────────┐   │
│  │         Shared Infrastructure             │   │
│  │  (Allocated by usage percentage)          │   │
│  └────────────────────┬─────────────────────┘   │
│                       │                          │
│  ┌────────────────────▼─────────────────────┐   │
│  │         Platform Overhead                 │   │
│  │  (Spread across all tenants)              │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Optimization Strategies by Cost Type

| Cost Type | Strategy | Expected Savings |
|-----------|----------|------------------|
| Compute | Right-sizing, spot instances | 30-60% |
| Storage | Tiered storage, compression | 40-70% |
| Database | Connection pooling, query optimization | 20-40% |
| Network | Caching, CDN, compression | 30-50% |
| AI/LLM | Caching, smaller models, batching | 50-80% |

### Per-Tenant Cost Tracking

| Metric | Measurement | Granularity |
|--------|-------------|-------------|
| API Calls | Per-request counter | Per-tenant, per-endpoint |
| Compute Time | Container CPU-seconds | Per-tenant, per-service |
| Storage | GB-months | Per-tenant, per-type |
| LLM Tokens | Input + output tokens | Per-tenant, per-model |
| Bandwidth | GB transferred | Per-tenant, per-region |

### Cost Controls by Tier

| Control | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Spending Cap | Hard limit | Soft warning | Customizable |
| Overage Handling | Block | Bill | Negotiate |
| Reserved Capacity | None | Optional | Included |
| Cost Visibility | Basic | Detailed | Real-time |
| Optimization Tools | None | Recommendations | Dedicated support |

### Multi-Tenant Efficiency Patterns

| Pattern | Description | Benefit |
|---------|-------------|---------|
| Resource Pooling | Shared infrastructure | Higher utilization |
| Tenant Bin-Packing | Optimize placement | Reduced waste |
| Off-Peak Discounts | Incentivize off-peak usage | Smoother load |
| Noisy Neighbor Throttling | Limit abusive tenants | Protect margins |

---

## Application Guidelines

When implementing cost optimization in a multi-tenant context:

1. **Track costs per tenant** - You can't optimize what you can't measure
2. **Implement spending controls** - Protect margins with caps and alerts
3. **Optimize shared resources** - Higher utilization means lower per-tenant cost
4. **Right-size by tier** - Free tier doesn't need enterprise resources
5. **Cache aggressively** - Reduce expensive compute and API calls
6. **Review costs regularly** - Monthly cost reviews per tenant tier

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Cost attribution method? | Usage-based with floor | Fair and simple |
| When to alert on spend? | 80% of budget/estimate | Early warning |
| Shared vs dedicated resources? | Shared for most, dedicated for enterprise | Cost efficiency |
| How to handle unprofitable tenants? | Usage analysis + tier adjustment | Protect margins |
| Frequency of cost reviews? | Weekly automated, monthly deep-dive | Balance oversight with effort |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Cost patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `cost-*`
- **Efficiency patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `efficiency-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS cost optimization multi-tenant {date}"
- Search: "cloud cost attribution patterns {date}"
- Search: "LLM cost optimization strategies {date}"

---

## Related Workflows

- `bmad-bam-cost-optimization-strategy` - Analyze cost structure
- `bmad-bam-usage-metering-design` - Design metering system
- `bmad-bam-capacity-planning-review` - Plan capacity efficiently
