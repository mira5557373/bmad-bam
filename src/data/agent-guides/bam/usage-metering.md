# BAM Usage Metering Guide

**When to load:** During Phase 3 (Solutioning) when designing tenant usage tracking, or when implementing billing integration, consumption-based pricing, or resource attribution.

**Integrates with:** Architect (Atlas persona), Dev agent, PM agent

---

## Core Concepts

### What is Usage Metering?

Usage metering tracks and records tenant consumption of platform resources for billing, analytics, and capacity planning. It translates technical resource usage into business metrics for consumption-based pricing models.

### Metering Dimensions

| Dimension | Description | Example Metrics |
|-----------|-------------|-----------------|
| Request-based | API calls, agent runs | Requests/month |
| Storage-based | Data volume, files | GB stored |
| Compute-based | Processing time, tokens | CPU-hours, tokens |
| Feature-based | Feature access | Active features |

---

## Application Guidelines

When implementing usage metering in multi-tenant systems:

1. **Capture usage at point of consumption**: Emit events as resources are used, not after the fact
2. **Include full context in usage events**: Tenant, user, feature, and timestamp are required
3. **Design for idempotent processing**: Metering pipelines must handle duplicate events gracefully
4. **Separate metering from billing**: Track usage in real-time, apply pricing rules separately
5. **Provide usage visibility to tenants**: Self-service dashboards build trust and reduce support

---

## Implementation Patterns

### Pattern 1: Metering Pipeline

```
┌─────────────────────────────────────────────────────────┐
│               Usage Metering Pipeline                    │
│                                                          │
│   Resource Usage                                         │
│        │                                                 │
│        ▼                                                 │
│   ┌────────────┐    ┌────────────┐    ┌────────────┐   │
│   │  Capture   │───►│  Enrich    │───►│  Aggregate │   │
│   │  Events    │    │  Context   │    │  Rollups   │   │
│   └────────────┘    └────────────┘    └────────────┘   │
│                                              │          │
│        ┌─────────────────────────────────────┘          │
│        │                                                │
│        ▼                                                │
│   ┌────────────┐    ┌────────────┐    ┌────────────┐   │
│   │   Store    │───►│   Rate     │───►│  Invoice   │   │
│   │   Usage    │    │   Apply    │    │  Generate  │   │
│   └────────────┘    └────────────┘    └────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Pipeline Stages:**

| Stage | Responsibility | Latency |
|-------|----------------|---------|
| Capture | Emit usage events | Real-time |
| Enrich | Add tenant/user context | < 100ms |
| Aggregate | Hourly/daily rollups | Batch |
| Store | Persist to usage store | Async |
| Rate | Apply pricing rules | On-demand |
| Invoice | Generate billing records | Monthly |

### Pattern 2: Usage Event Schema

```
┌─────────────────────────────────────────────────────────┐
│               Usage Event Structure                      │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │ event_id:     "evt_abc123"                  │       │
│   │ tenant_id:    "tenant_xyz"                  │       │
│   │ timestamp:    "{date}-01-15T10:30:00Z"        │       │
│   │ metric_type:  "agent_run"                   │       │
│   │ quantity:     1                             │       │
│   │ dimensions:                                 │       │
│   │   - model: "gpt-4"                         │       │
│   │   - tokens_in: 1500                        │       │
│   │   - tokens_out: 500                        │       │
│   │   - duration_ms: 2500                      │       │
│   │ idempotency_key: "run_xyz_{date}-01-15"     │       │
│   └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Pattern 3: Aggregation Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│             Usage Aggregation Levels                     │
│                                                          │
│   Raw Events (real-time)                                │
│        │                                                 │
│        ▼                                                 │
│   Hourly Rollups                                        │
│   └── tenant_id + metric_type + hour                    │
│        │                                                 │
│        ▼                                                 │
│   Daily Summaries                                       │
│   └── tenant_id + metric_type + day                     │
│        │                                                 │
│        ▼                                                 │
│   Billing Period Totals                                 │
│   └── tenant_id + metric_type + billing_period          │
└─────────────────────────────────────────────────────────┘
```

**Retention Policy:**

| Level | Retention | Query Access |
|-------|-----------|--------------|
| Raw events | 7 days | Debug only |
| Hourly | 90 days | Analytics |
| Daily | 2 years | Reports |
| Billing period | 7 years | Compliance |

### Pattern 4: Billing Integration

```
┌─────────────────────────────────────────────────────────┐
│              Billing System Integration                  │
│                                                          │
│   Usage Store                                            │
│        │                                                 │
│        ▼                                                 │
│   ┌────────────────────────────────────┐                │
│   │        Rating Engine               │                │
│   │                                    │                │
│   │   Metric     │ Unit Rate │ Tier   │                │
│   │   ───────────┼───────────┼─────── │                │
│   │   agent_run  │ $0.01     │ 0-1K   │                │
│   │   agent_run  │ $0.008    │ 1K-10K │                │
│   │   agent_run  │ $0.005    │ 10K+   │                │
│   │   storage_gb │ $0.10     │ all    │                │
│   │   tokens_1k  │ $0.002    │ all    │                │
│   └────────────────────────────────────┘                │
│        │                                                 │
│        ▼                                                 │
│   ┌────────────┐    ┌────────────┐                      │
│   │   Stripe   │    │  Invoice   │                      │
│   │  Adapter   │    │  Service   │                      │
│   └────────────┘    └────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

---

## Metric Types

### Request-Based Metering

| Metric | Unit | Capture Point |
|--------|------|---------------|
| api_requests | count | API gateway |
| agent_runs | count | Agent executor |
| tool_calls | count | Tool gateway |
| webhook_deliveries | count | Webhook service |

### Storage-Based Metering

| Metric | Unit | Capture Point |
|--------|------|---------------|
| file_storage | bytes | Object store |
| database_storage | bytes | DB metrics |
| vector_storage | vectors | Vector DB |
| backup_storage | bytes | Backup service |

### Compute-Based Metering

| Metric | Unit | Capture Point |
|--------|------|---------------|
| llm_tokens_in | tokens | LLM proxy |
| llm_tokens_out | tokens | LLM proxy |
| cpu_time | milliseconds | Container runtime |
| gpu_time | milliseconds | GPU scheduler |

---

## Accuracy Guarantees

| Guarantee | Implementation |
|-----------|----------------|
| At-least-once delivery | Retry with idempotency |
| Eventual consistency | Async reconciliation |
| Audit trail | Immutable event log |
| Dispute resolution | Raw event access |

### Error Handling

| Error | Recovery |
|-------|----------|
| Event loss | Dead letter queue + retry |
| Duplicate events | Idempotency key dedup |
| Late events | Accept within grace period |
| Aggregation failure | Recompute from raw |

---

## Real-Time vs Batch

| Mode | Use Case | Latency |
|------|----------|---------|
| Real-time | Quota enforcement | < 1s |
| Near real-time | Dashboard updates | < 5min |
| Batch | Billing generation | Daily |

---

## Related Workflows

- `bmad-bam-usage-metering-design` - Design complete metering and billing pipeline
- `bmad-bam-tenant-tier-migration` - Adjust metering during tier changes
- `bmad-bam-tenant-onboarding-design` - Configure initial metering for new tenants

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Consumption-based pricing? | Full metering pipeline |
| Quota enforcement needed? | Real-time counters |
| Dispute resolution required? | Immutable event store |
| Multi-currency billing? | External billing system |
| Usage-based throttling? | Integrate with rate limiter |

---

## Related Patterns

- `run-contracts` guide for execution budgets
- `observability` guide for metrics infrastructure
- `usage-metering` pattern in `bam-patterns.csv`
- `tenant-onboarding-design` workflow for quota setup
- **cost-tracking:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `cost-tracking`
- **quota-management:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `quota-management`

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `usage-metering` | `usage-based billing patterns multi-tenant SaaS {date}` |
| `usage-metering` | `SaaS metering multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.
