# BAM Cost Tracking Guide

**When to load:** During Phase 3 (Solutioning) when designing cost attribution, usage-based billing, or resource allocation.

**Integrates with:** Architect (Atlas persona), Dev agent, PM agent

---

## Core Concepts

### Cost Attribution Layers

| Layer | Examples | Attribution |
|-------|----------|-------------|
| Infrastructure | Compute, storage | Resource tagging |
| Platform | Database, cache | Usage metering |
| Third-party | AI APIs, SMS | Direct API costs |
| Shared | Load balancers | Proportional |

---

## Application Guidelines

When implementing cost tracking in multi-tenant systems:

1. **Tag all resources with tenant context**: Enable accurate attribution from infrastructure through application layers
2. **Meter usage at point of consumption**: Capture usage events as they occur for real-time visibility
3. **Design for shared resource allocation**: Define fair algorithms for resources shared across tenants
4. **Provide tenant cost dashboards**: Let tenants see their own resource consumption
5. **Support multiple pricing models**: Enable usage-based, tiered, and hybrid billing scenarios

---

## Implementation Patterns

### Cost Attribution Flow

```
┌────────────────────────────────────────────────┐
│           Cost Attribution Flow                 │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐│
│  │ Resource │─>│ Metering │─>│ Cost Engine   ││
│  │ Usage    │  │ Pipeline │  │               ││
│  └────┬─────┘  └────┬─────┘  └───────┬───────┘│
│       v             v                v        │
│  ┌────────┐    ┌─────────┐    ┌───────────┐  │
│  │ Tags   │    │ Events  │    │ Rate Cards│  │
│  └────────┘    └─────────┘    └───────────┘  │
└────────────────────────────────────────────────┘
```

### Resource Tagging Strategy

| Tag Key | Purpose | Example |
|---------|---------|---------|
| `tenant_id` | Primary attribution | `tenant_abc123` |
| `tier` | Pricing tier | `pro` |
| `module` | Feature attribution | `ai-runtime` |

### Usage-Based Attribution

| Resource | Unit | Collection |
|----------|------|------------|
| Compute | CPU-seconds | Prometheus |
| AI Tokens | Token count | API response |
| Storage | Bytes | Daily snapshot |
| Bandwidth | Bytes | CDN logs |

### Shared Resource Allocation

| Model | Formula | Best For |
|-------|---------|----------|
| Equal split | Cost / tenant_count | Simple |
| Usage-weighted | Cost * (tenant_usage / total) | Metered |
| Tier-weighted | Cost * tier_weight | Tiered |

### Allocation Example

```
┌─────────────────────────────────────────┐
│    Shared Load Balancer: $500/month     │
├─────────────────────────────────────────┤
│  Tenant A (40% traffic) ──> $200        │
│  Tenant B (35% traffic) ──> $175        │
│  Tenant C (25% traffic) ──> $125        │
└─────────────────────────────────────────┘
```

### Third-Party Pass-Through

| Service | Margin | Model |
|---------|--------|-------|
| OpenAI/LLM | 1.2x | Usage-based |
| Twilio/SMS | 1.5x | Usage-based |
| SendGrid | Included | Bundled |

---

## Profitability Analysis

| Tier | Avg Revenue | Avg Cost | Margin |
|------|-------------|----------|--------|
| Free | $0 | $5 | -$5 |
| Pro | $49 | $15 | 69% |
| Enterprise | $499 | $150 | 70% |

---

## Related Workflows

- `bmad-bam-usage-metering-design` - Design usage metering for cost attribution
- `bmad-bam-tenant-model-isolation` - Implement tenant-scoped cost tracking
- `bmad-bam-tenant-aware-observability` - Monitor cost metrics per tenant

## Related Patterns

- `billing` pattern in `bam-patterns.csv`
- `metering` pattern in `bam-patterns.csv`
- `quota-management.md` guide for usage limits enforcement
- `tenant-routing.md` guide for tenant attribution
- `cost-tracking-template.md` for output documentation

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `usage-metering`
- `{project-root}/_bmad/bam/data/tenant-models.csv` → cost implications

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `cost-tracking` | `cost allocation multi-tenant SaaS {date}` |
| `cost-tracking` | `tenant cost attribution multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Need precise attribution? | Full tagging | Accurate costs |
| Shared infrastructure? | Proportional allocation | Fair distribution |
| Usage-based pricing? | Real-time metering | Accurate billing |
| Simple tier pricing? | Averaged cost model | Less complexity |
