---
pattern_id: cost-attribution-engine
shortcode: ZCA
category: monetization
qg_ref: QG-P1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Cost Attribution Engine - BAM Pattern

**Loaded by:** ZCA  
**Applies to:** Multi-tenant AI systems requiring cost tracking and allocation  
**See also:** [usage-metering.md](usage-metering.md), [llm-cost-tracking.md](llm-cost-tracking.md)

---

## When to Use

- Usage-based billing for AI features
- Cost allocation across business units
- Budget enforcement per tenant/tier
- Cost optimization initiatives

## When NOT to Use

- Fixed-price AI offerings
- Single-tenant deployments
- Minimal AI usage scenarios

## Architecture

### Attribution Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                  Cost Attribution Engine                     │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Token       │    │ Compute     │    │ Storage     │      │
│  │ Metering    │    │ Metering    │    │ Metering    │      │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            ▼                                 │
│                   ┌─────────────────┐                        │
│                   │ Attribution     │                        │
│                   │ Engine          │                        │
│                   └────────┬────────┘                        │
│                            │                                 │
│    ┌───────────────────────┼───────────────────────┐        │
│    ▼                       ▼                       ▼        │
│ [Tenant]              [User]                  [Agent]       │
│                                                              │
│  Alerts: [Warning %] [Critical %] [Budget Exceeded]         │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-05)

```yaml
cost_attribution_engine:
  version: "1.0.0"
  bam_controlled: true
  
  attribution_dimensions:
    tenant: bool
    user: bool
    agent: bool
    operation_type: bool
    model: bool
    tool: bool
    
  metering:
    tokens:
      input: bool
      output: bool
      embedding: bool
      
    compute:
      gpu_seconds: bool
      cpu_seconds: bool
      
    storage:
      embeddings_gb: bool
      traces_gb: bool
      
  reporting:
    real_time: bool
    aggregation_interval: enum[minute, hour, day]
    export_format: enum[json, csv, parquet]
    
  tenant_configuration:
    per_tenant_budgets: bool
    budget_enforcement: enum[soft, hard]
    alert_thresholds:
      warning_percent: int
      critical_percent: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Per-request tracking | Precise | High overhead | Enterprise billing |
| Aggregated tracking | Low overhead | Less precise | Internal chargeback |
| Real-time attribution | Immediate visibility | Complexity | Budget enforcement |
| Batch attribution | Simple | Delayed insights | Reporting only |

## Web Research Queries

- "LLM cost attribution multi-tenant {date}"
- "AI token metering billing patterns {date}"
- "usage-based AI pricing implementation {date}"
- "OpenAI cost allocation enterprise {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-P1 | Cost tracking active, budget alerts configured |

## Related Patterns

- [usage-metering.md](usage-metering.md) - General usage tracking
- [quota-management.md](quota-management.md) - Quota enforcement
