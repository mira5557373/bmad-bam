# BAM Economic Loop Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing cost management,
or when user mentions budgets, quotas, or usage limits.

**Integrates with:** Atlas (Platform), billing workflows

---

## Core Concepts

### Economic Loop Overview

The Economic Loop enforces per-tenant resource budgets in real-time.

```
Budget → Monitor → Alert → Throttle → Invoice
   │        │        │        │          │
   └────────┴────────┴────────┴──────────┘
                Economic Loop
            (Real-time cost control)
```

### Budget Dimensions

| Dimension | Unit | Enforcement Point |
|-----------|------|-------------------|
| Tokens | Per-request | Pre-execution |
| API calls | Per-minute | Rate limiter |
| Compute | GPU-seconds | Scheduler |
| Storage | GB | Write path |

### Tier-Based Budgets

```yaml
budgets:
  free_tier:
    tokens_per_day: 10000
    api_calls_per_minute: 10
    overage_action: hard_block
  
  standard_tier:
    tokens_per_day: 100000
    api_calls_per_minute: 100
    overage_action: soft_throttle
  
  enterprise_tier:
    tokens_per_day: unlimited
    api_calls_per_minute: 1000
    overage_action: alert_only
```

### Budget Enforcement Flow

| Stage | Action | Tenant Notification |
|-------|--------|---------------------|
| 50% usage | Log | Dashboard update |
| 75% usage | Warn | Email notification |
| 90% usage | Alert | Slack/PagerDuty |
| 100% usage | Enforce | Block/Throttle/Alert |

## Application Guidelines

1. **Check budget before execution** - Not after
2. **Alert at 80% usage** - Give time to react
3. **Soft throttle before hard block** - Better UX
4. **Track cost per action type** - Optimize expensive operations

### Real-Time Budget Tracking

Budget enforcement must happen before action execution, not after. Pre-execution checks verify the tenant has sufficient budget for the estimated cost. Post-execution reconciliation adjusts the actual usage. Any discrepancy should trigger alerts for investigation.

```yaml
budget_check_flow:
  pre_execution:
    - estimate_cost
    - check_remaining_budget
    - reserve_budget
    - proceed_or_reject
  
  post_execution:
    - calculate_actual_cost
    - reconcile_reservation
    - update_usage_metrics
    - trigger_alerts_if_needed
```

### Cost Attribution

Accurate cost attribution enables fair billing and optimization insights. Each action should track its resource consumption across multiple dimensions including tokens, compute time, storage, and external API calls. Shared resources should be allocated proportionally based on usage patterns.

| Cost Dimension | Unit | Attribution Method | Billing Model |
|----------------|------|-------------------|---------------|
| LLM tokens | Per-token | Direct | Usage-based |
| Compute | GPU-second | Direct | Usage-based |
| Storage | GB-month | Proportional | Tiered |
| External APIs | Per-call | Direct | Pass-through |

### Overage Handling

Different tiers require different overage handling strategies. Free tiers should hard-block at the limit to prevent abuse. Paid tiers should soft-throttle to maintain service while alerting the tenant. Enterprise tiers should alert-only with post-billing for overages to avoid service disruption.

## Decision Framework

| Scenario | Budget Strategy | Rationale |
|----------|----------------|-----------|
| Startup tier | Hard limits | Prevent bill shock |
| Growth tier | Soft limits + alerts | Flexibility |
| Enterprise | Alert only | Trust + SLA |
| Trial | Strict sandbox | Prevent abuse |

## Related Workflows

- `bmad-bam-usage-metering-design` - Metering pipeline
- `bmad-bam-usage-alerts-design` - Alert configuration
- `bmad-bam-pricing-tier-configuration` - Tier setup

## Related Patterns

Load from pattern registry:

- **Economic patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `economic-loop-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI usage metering multi-tenant {date}"
- Search: "token budget management LLM {date}"
