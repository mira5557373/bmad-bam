---
pattern_id: usage-analytics
shortcode: ZUA
category: scaling
qg_ref: QG-SC6
version: 1.0.0
last_reviewed: 2026-04-30
---

# Usage Analytics - BAM Pattern

**Loaded by:** ZUA  
**Applies to:** Multi-tenant SaaS platforms tracking tenant behavior and resource consumption

---

## When to Use

- Understanding tenant usage patterns
- Capacity planning based on actual usage
- Identifying upsell opportunities
- Detecting anomalous behavior
- Churn prediction and prevention
- AI/LLM token consumption tracking

## When NOT to Use

- Privacy-first applications with minimal tracking
- Applications without tiered pricing
- Internal tools without billing requirements
- When analytics infrastructure cost exceeds value

## Architecture

### Analytics Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    ANALYTICS PIPELINE                        │
│                                                              │
│  Event Source ──▶ Collection ──▶ Processing ──▶ Storage    │
│       │               │              │              │        │
│       ▼               ▼              ▼              ▼        │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐   ┌─────────┐   │
│  │ App     │    │ Kafka/  │    │ Stream  │   │ Data    │   │
│  │ Events  │    │ Kinesis │    │ Process │   │ Lake    │   │
│  └─────────┘    └─────────┘    └─────────┘   └─────────┘   │
│       │                              │              │        │
│       ▼                              ▼              ▼        │
│  ┌─────────┐                   ┌─────────┐   ┌─────────┐   │
│  │ SDK     │                   │ Real-   │   │ BI/     │   │
│  │ Capture │                   │ time    │   │ Reports │   │
│  └─────────┘                   │ Metrics │   └─────────┘   │
│                                └─────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

### Tenant Usage Metrics

| Category | Metrics | Granularity | Retention |
|----------|---------|-------------|-----------|
| API Usage | Requests, latency, errors | Per-minute | 90 days |
| Resource | Storage, compute, tokens | Hourly | 1 year |
| Feature | Feature adoption, frequency | Daily | 2 years |
| Billing | Usage vs. plan, overages | Monthly | 7 years |

### Usage Event Schema

```
Usage Event
      │
      ▼
┌─────────────────┐
│ Event Capture   │
│ - tenant_id     │
│ - user_id       │
│ - action        │
│ - resource      │
│ - quantity      │
│ - timestamp     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Aggregation     │
│ - Per minute    │
│ - Per hour      │
│ - Per day       │
└────────┬────────┘
         │
    ┌────┴────┬─────────┐
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│Real-  │ │Billing│ │BI     │
│time   │ │Report │ │Export │
│Alerts │ │       │ │       │
└───────┘ └───────┘ └───────┘
```

### Configuration Schema

```yaml
usage_analytics:
  tenant_id: uuid
  tier: enum[free, pro, enterprise]
  bam_controlled: true
  
  collection:
    sdk_enabled: bool
    server_side_enabled: bool
    sampling_rate: float  # 0.0 to 1.0
    batch_size: int
    flush_interval_seconds: int
    
  metrics:
    api_calls:
      track: bool
      dimensions: string[]  # endpoint, method, status
      
    resource_usage:
      track: bool
      resources: string[]  # storage, compute, tokens
      
    feature_usage:
      track: bool
      features: string[]
      
  aggregation:
    realtime_window_seconds: int
    hourly_rollup: bool
    daily_rollup: bool
    
  storage:
    raw_retention_days: int
    aggregated_retention_days: int
    cold_storage_after_days: int
    
  privacy:
    anonymize_users: bool
    pii_masking: bool
    consent_required: bool
    
  ai_tracking:
    token_usage: bool
    model_usage: bool
    inference_latency: bool
    cost_per_request: bool
```

### AI/LLM Usage Tracking

```
┌─────────────────────────────────────────────────────────────┐
│                   AI USAGE ANALYTICS                         │
│                                                              │
│  AI Request ──▶ Token Counter ──▶ Cost Calculator ──▶ Log  │
│       │              │                  │                    │
│       ▼              ▼                  ▼                    │
│  ┌─────────┐    ┌─────────┐       ┌─────────┐              │
│  │ Model   │    │ Input   │       │ Price   │              │
│  │ Type    │    │ Output  │       │ per 1K  │              │
│  │         │    │ Tokens  │       │ Tokens  │              │
│  └─────────┘    └─────────┘       └─────────┘              │
│                                                              │
│  Aggregations:                                               │
│  - Per tenant daily token usage                             │
│  - Per model cost attribution                               │
│  - Usage vs. budget alerts                                  │
└─────────────────────────────────────────────────────────────┘
```

### Usage-Based Alerts

| Alert Type | Trigger | Action |
|------------|---------|--------|
| Quota Warning | 80% of plan limit | Notify tenant |
| Overage | Exceeds plan limit | Notify + optional throttle |
| Anomaly | 3x normal usage | Security review |
| Budget | 90% of spend limit | Notify + optional block |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Real-time streaming | Instant insights | Infrastructure cost | Alerts, dashboards |
| Batch processing | Cost effective | Delayed insights | Billing, reports |
| Sampling | Low overhead | Statistical approximation | High-volume events |
| Full capture | Complete data | Storage costs | Audit, compliance |

## Quality Checks

- [ ] All billable resources tracked
- [ ] Tenant isolation in analytics pipeline
- [ ] Privacy compliance (consent, PII handling)
- [ ] Alert thresholds configured per tier
- [ ] **CRITICAL:** No cross-tenant data leakage in reports

## Web Research Queries

- "usage analytics multi-tenant SaaS {date}"
- "LLM token tracking billing {date}"
- "product analytics event schema design {date}"
- "real-time usage monitoring patterns {date}"
- "privacy-compliant analytics GDPR {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-SC6 | Pattern implementation verified |

## Related Patterns

- [pricing-strategies.md](pricing-strategies.md) - Usage-based pricing
- [cost-attribution-engine.md](cost-attribution-engine.md) - AI cost tracking
