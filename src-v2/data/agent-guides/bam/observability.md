# BAM Observability Guide

**When to load:** During operations design, monitoring setup, or when user mentions dashboards, alerts, metrics, traces.

**Integrates with:** DevOps (operations), Architect (design), Developer (implementation)

---

## Core Concepts

### Tenant-Aware Metrics

All metrics must include `tenant_id` as a dimension to enable per-tenant analysis and billing correlation.

| Metric Type | Dimension Strategy | Example Labels |
|-------------|-------------------|----------------|
| Business | tenant_id, tier, feature | `{tenant_id="t_123", tier="pro", feature="export"}` |
| Technical | tenant_id, service, endpoint | `{tenant_id="t_123", service="api", endpoint="/v1/chat"}` |
| AI | tenant_id, model, agent | `{tenant_id="t_123", model="gpt-4", agent="support"}` |
| Infrastructure | tenant_id, resource_pool | `{tenant_id="t_123", pool="shared"}` |

### Log Context Propagation

Structured logging with tenant context ensures traceability across distributed services.

```
Required Log Fields:
- tenant_id: string (UUID)
- correlation_id: string (request trace)
- session_id: string (user session)
- timestamp: ISO 8601
- level: INFO|WARN|ERROR|DEBUG
- service: string
- message: string
- metadata: object (additional context)
```

### Distributed Tracing

Trace context must propagate tenant information across service boundaries.

| Span Attribute | Required | Purpose |
|----------------|----------|---------|
| tenant.id | Yes | Primary tenant identifier |
| tenant.tier | Yes | Service tier for SLA correlation |
| user.id | Yes | User within tenant |
| agent.id | Conditional | AI agent identifier (if applicable) |
| operation.type | Yes | read/write/compute |

---

## Application Guidelines

When implementing observability in multi-tenant systems:

1. **Include tenant_id in all telemetry**: Every metric, log, and trace must carry tenant context
2. **Aggregate by tenant for dashboards**: Enable per-tenant views for both platform operators and tenants
3. **Set tier-appropriate SLO alerts**: Different tiers have different service level expectations
4. **Protect tenant data in logs**: Sanitize sensitive information before logging
5. **Support tenant self-service dashboards**: Allow tenants to view their own metrics and usage

---

## Metric Patterns

### Business Metrics Per Tenant

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tenant_active_users | Gauge | tenant_id, tier | Current active users |
| tenant_feature_usage | Counter | tenant_id, feature | Feature adoption tracking |
| tenant_revenue_mrr | Gauge | tenant_id, tier | Monthly recurring revenue |
| tenant_churn_signal | Gauge | tenant_id | Churn risk score (0-1) |
| tenant_engagement_score | Gauge | tenant_id | Usage engagement metric |

### Technical Metrics Per Tenant

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tenant_request_total | Counter | tenant_id, endpoint, status | Request volume |
| tenant_request_duration_seconds | Histogram | tenant_id, endpoint | Latency distribution |
| tenant_error_total | Counter | tenant_id, error_type | Error tracking |
| tenant_quota_usage | Gauge | tenant_id, resource | Resource consumption |
| tenant_rate_limit_hits | Counter | tenant_id, endpoint | Rate limiting events |

### AI Metrics Per Tenant

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tenant_ai_tokens_total | Counter | tenant_id, model, direction | Token consumption |
| tenant_ai_completion_rate | Gauge | tenant_id, agent | Successful completions |
| tenant_ai_safety_violations | Counter | tenant_id, violation_type | Safety guardrail triggers |
| tenant_ai_latency_seconds | Histogram | tenant_id, model | Model response time |
| tenant_ai_cost_dollars | Counter | tenant_id, model | AI spend tracking |

---

## Per-Tier Dashboard Templates

### Free Tier Dashboard

| Panel | Metrics | Refresh |
|-------|---------|---------|
| Usage Summary | request_total, quota_usage | 5m |
| Error Rate | error_total / request_total | 1m |
| Quota Status | quota_usage / quota_limit | 1m |

### Pro Tier Dashboard

| Panel | Metrics | Refresh |
|-------|---------|---------|
| All Free Tier panels | - | - |
| Performance Overview | p50/p95/p99 latency | 1m |
| AI Usage | token consumption, cost | 5m |
| Feature Adoption | feature_usage by feature | 15m |

### Enterprise Tier Dashboard

| Panel | Metrics | Refresh |
|-------|---------|---------|
| All Pro Tier panels | - | - |
| SLA Compliance | uptime, latency vs SLA | 1m |
| Cost Attribution | resource_cost by category | 15m |
| Security Events | audit_events, access_patterns | 1m |
| Custom Panels | tenant-configured | configurable |

---

## Alerting Patterns

### Tier-Based SLA Alerts

| Tier | Latency SLA | Availability SLA | Error Rate SLA |
|------|-------------|------------------|----------------|
| Free | p95 < 5s | 99% | < 5% |
| Pro | p95 < 1s | 99.5% | < 1% |
| Enterprise | p95 < 500ms | 99.9% | < 0.1% |

### Noisy Neighbor Detection

| Signal | Threshold | Action |
|--------|-----------|--------|
| Resource consumption | > 3x average | Throttle + alert |
| Request rate | > tier limit | Rate limit |
| Queue depth | > 80% capacity | Scale or throttle |
| Memory usage | > 90% allocation | Alert operations |

### Anomaly Detection Per Tenant

| Pattern | Detection Method | Response |
|---------|-----------------|----------|
| Usage spike | Rolling average deviation | Auto-scale or throttle |
| Error burst | Rate of change | Circuit breaker |
| Latency degradation | Baseline comparison | Investigation alert |
| Cost anomaly | Daily/weekly comparison | Billing alert |

---

## Implementation Checklist

### Instrumentation

- [ ] All services emit tenant-dimensioned metrics
- [ ] Log aggregation includes tenant context
- [ ] Traces propagate tenant attributes
- [ ] AI operations tracked with token counts
- [ ] Business events captured with tenant context

### Dashboards

- [ ] Per-tier dashboard templates deployed
- [ ] Tenant admin self-service dashboards
- [ ] Operations aggregate view available
- [ ] SLA compliance dashboard per tier

### Alerting

- [ ] SLA alerts configured per tier
- [ ] Noisy neighbor detection enabled
- [ ] Cost anomaly alerts active
- [ ] On-call routing includes tenant tier

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`
- **tenant-context-propagation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-context-propagation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant observability patterns {date}"
- Search: "tenant-aware distributed tracing {date}"
- Search: "SaaS metrics aggregation strategies {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should every metric include tenant_id as a dimension? | Yes, tenant_id is mandatory for all business and technical metrics | Enables per-tenant billing correlation, SLA tracking, and noisy neighbor detection across the platform |
| How should tenant-aware alerting be configured? | Tier-based SLA thresholds with tenant-specific routing for Enterprise | Different tiers have different SLAs; Enterprise requires dedicated on-call escalation paths |
| Should tenants have access to their own metrics dashboards? | Yes, with tier-gated detail (Free: summary, Pro: detailed, Enterprise: custom) | Self-service observability reduces support burden; tiered access creates upgrade incentive |
| How should distributed traces propagate tenant context? | Include tenant.id and tenant.tier as span attributes on all spans | Enables filtering traces by tenant for debugging; tier helps correlate performance with SLA expectations |
| How should noisy neighbor detection be implemented? | Monitor per-tenant resource consumption with rolling average deviation alerts | 3x average consumption triggers investigation; prevents single tenant from degrading platform for others |

---

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Full observability design workflow
- `validate-foundation` - Verify observability implementation
- `create-master-architecture` - Architecture-level observability decisions
