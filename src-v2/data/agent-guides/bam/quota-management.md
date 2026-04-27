# BAM Quota Management Guide

**When to load:** During Phase 3 (Solutioning) when designing usage limits, metering, or overage handling.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### Quota Dimensions

| Dimension | Unit | Reset Period |
|-----------|------|--------------|
| API Calls | Requests | Rolling or calendar |
| Storage | Bytes | None (cumulative) |
| AI Tokens | Tokens | Monthly |
| Agent Runs | Executions | Monthly |
| Seats | Users | Monthly |

### Per-Tier Quota Matrix

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| API calls/min | 60 | 600 | 6000 |
| Storage (GB) | 1 | 50 | 500 |
| AI tokens/month | 10K | 500K | 5M |
| Agent runs/month | 100 | 5000 | Unlimited |

---

## Application Guidelines

When implementing quota management in multi-tenant systems:

1. **Define quotas per tier and resource type**: Different tiers get different limits across all resource dimensions
2. **Implement real-time quota checking**: Prevent overages before they occur, not after
3. **Design graceful degradation**: Soft limits with warnings before hard blocks improve UX
4. **Support quota increase requests**: Enable self-service or approval workflows for limit changes
5. **Provide usage visibility**: Dashboards showing quota consumption help tenants plan

---

## Implementation Patterns

### Quota Enforcement Architecture

```
┌─────────────────────────────────────────────────┐
│               API Gateway                        │
│  ┌───────────┐  ┌────────────┐  ┌───────────┐  │
│  │Rate Limit │─>│Quota Check │─>│ Metering  │  │
│  └─────┬─────┘  └─────┬──────┘  └─────┬─────┘  │
└────────┼──────────────┼───────────────┼────────┘
         v              v               v
    ┌────────┐    ┌──────────┐    ┌─────────┐
    │ Redis  │    │ Postgres │    │ Metrics │
    └────────┘    └──────────┘    └─────────┘
```

### Overage Handling Strategies

| Strategy | Behavior | Use Case |
|----------|----------|----------|
| Hard Block | Reject at limit | Free tier |
| Soft Cap | Allow with warning | Pro tier |
| Pay-as-you-go | Charge overage | Enterprise |
| Burst Pool | Temporary allowance | All tiers |

### Grace Period Flow

```
NORMAL ─(80%)─> WARNING ─(100%)─> GRACE ─(110%)─> BLOCKED
   ^                                   │
   └───────────(period reset)──────────┘
```

### HTTP Response Patterns

| Scenario | Status | Header |
|----------|--------|--------|
| Within quota | 200 | `X-Quota-Remaining: N` |
| Near limit | 200 | `X-Quota-Warning: true` |
| Rate limited | 429 | `Retry-After: N` |
| Quota exceeded | 402 | `X-Quota-Reset: timestamp` |

### Quota Monitoring

| Metric | Alert Threshold | Action |
|--------|-----------------|--------|
| quota_utilization | > 80% | Notify tenant |
| overage_charges | > $100 | Finance alert |
| grace_period_active | > 24h | Review tenant |

### Common Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| No grace period | Abrupt cutoff UX | Add warning state |
| Single reset time | Midnight spike | Rolling windows |
| No overage option | Lost revenue | Tier-based overage |

---

## Related Patterns

- `metering` pattern in `bam-patterns.csv`
- `rate-limiting` pattern in `bam-patterns.csv`
- `cost-tracking.md` guide for usage-based billing integration
- `tenant-routing.md` guide for tier identification
- `quota-management-template.md` for output documentation
- **api-throttling:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `api-throttling`

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `quota-management`
- `{project-root}/_bmad/bam/data/tenant-models.csv` → tier configurations

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `quota-management` | `quota management SaaS multi-tenant SaaS {date}` |
| `quota-management` | `usage quota enforcement patterns multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Related Workflows

- `bmad-bam-usage-metering-design` - Configure usage tracking and billing integration
- `bmad-bam-tenant-tier-migration` - Handle quota changes during tier upgrades/downgrades
- `bmad-bam-tenant-onboarding-design` - Set up initial quota allocation for new tenants

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Need immediate enforcement? | Redis counters | Sub-millisecond |
| Need accurate billing? | Database + audit | ACID compliance |
| High burst traffic? | Token bucket | Smooths spikes |
| Grace periods needed? | State machine | Better UX |
