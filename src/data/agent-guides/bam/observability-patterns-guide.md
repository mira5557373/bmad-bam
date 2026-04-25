# BAM Observability Patterns Guide

**When to load:** During observability design, monitoring setup, alerting configuration, SRE practices, or when user mentions metrics, logs, traces, SLOs, SLIs, error budgets, dashboards, audit logging.
**Integrates with:** Architect (Winston/Atlas), DevOps agents, SRE teams, Security agents

---

## Core Concepts

Observability in multi-tenant platforms requires tenant-aware implementation across all three pillars while maintaining platform-wide visibility for operators.

### Key Principles

| Principle | Description |
|-----------|-------------|
| Tenant Context Required | Every metric, log, and trace must carry tenant_id |
| Platform + Tenant Views | Operators see aggregate; tenants see only their data |
| Tier-Based SLOs | Different tiers have different reliability targets |
| Fail-Safe Logging | Missing tenant context should be flagged, not ignored |

### Three Pillars in Multi-Tenant Context

| Pillar | Single-Tenant | Multi-Tenant Consideration |
|--------|--------------|---------------------------|
| Metrics | Application metrics | Per-tenant + aggregate with tenant_id label |
| Logs | Centralized logging | Tenant-scoped access, structured JSON with tenant_id |
| Traces | Request tracing | Tenant context propagation via headers |

### AI Observability (Fourth Pillar)

| Aspect | What to Track | Tenant Dimension |
|--------|---------------|-----------------|
| Token Usage | Input/output tokens per model | Per-tenant, per-agent |
| Latency | Model response time | Per-tenant, per-model |
| Safety Events | Guardrail triggers | Per-tenant, per-violation type |
| Cost | Model inference cost | Per-tenant (billing) |
| Reasoning | Agent decision traces | Per-tenant (debugging) |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### Required HTTP Headers

| Header | Purpose | Required |
|--------|---------|----------|
| `X-Tenant-ID` | Tenant identification in all requests | Yes |
| `X-Request-ID` | Request tracing within a service | Yes |
| `X-Trace-ID` | Distributed tracing across services | Yes |
| `X-Correlation-ID` | Business process correlation | Optional |

### Structured Log Format

```json
{
  "timestamp": "2026-04-25T10:30:00.000Z",
  "level": "INFO",
  "service": "billing-service",
  "tenant_id": "tenant_abc123",
  "trace_id": "trace_xyz789",
  "request_id": "req_def456",
  "user_id": "user_123",
  "message": "Invoice generated",
  "metadata": {
    "invoice_id": "inv_001",
    "amount": 99.99
  }
}
```

### Tenant Log Path Convention

```
Pattern: logs/{tenant_id}/{date}/{service}.log

Examples:
- logs/tenant_abc123/2026-04-25/billing-service.log
- logs/tenant_abc123/2026-04-25/agent-runtime.log
- logs/tenant_abc123/2026-04-25/api-gateway.log
```

### Metric Naming Convention

```
Pattern: {service}_{component}_{metric}_{unit}

Examples:
- billing_invoice_generated_total
- agent_llm_tokens_consumed_total
- api_request_duration_seconds
- cache_hit_ratio_percent

Required Labels:
- tenant_id (always)
- tier (for SLA correlation)
- service (source service)
- Additional context-specific labels
```

### Quality Gate IDs (Observability)

| Gate | Purpose |
|------|---------|
| QG-O1 | Logging standards verified |
| QG-O2 | Metrics collection verified |
| QG-O3 | Distributed tracing verified |
| QG-O4 | Alerting configuration verified |
| QG-O5 | SLO monitoring verified |
| QG-O6 | Audit logging verified |

---

## Decision Framework

### Quick Decision Matrix

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Observability stack selection | OpenTelemetry for collection | Vendor-agnostic, industry standard |
| Log retention by tier | 7/30/90 days (Free/Pro/Enterprise) | Balance cost with compliance |
| Tenant dashboard access | Self-service for Pro+, read-only for Free | Tiered value, reduce support |
| Trace sampling | 100%/10%/1% (Enterprise/Pro/Free) | Cost efficiency by tier |
| SLO target starting point | 99.5% availability | Conservative baseline, tune with data |
| Alert routing | Tier-based with Enterprise direct contact | Match support expectations |

### Observability Stack Selection

| Component | Recommended | Alternatives | Multi-Tenant Consideration |
|-----------|-------------|--------------|---------------------------|
| Collection | OpenTelemetry | Vendor agents | Single SDK, multiple backends |
| Metrics | Prometheus + Thanos | Datadog, New Relic | tenant_id label required |
| Logs | Loki or Elasticsearch | Splunk, Datadog | Tenant-filtered queries |
| Traces | Jaeger or Tempo | Zipkin, Datadog | Trace context propagation |
| Dashboards | Grafana | Datadog, custom | Per-tenant dashboards |
| Alerting | AlertManager + PagerDuty | OpsGenie, VictorOps | Tier-based routing |

---

## §distributed-tracing

### Pattern: Distributed Tracing

**When to use:** All multi-tenant services
**Phase:** foundation

#### Trace Context Propagation

| Span Attribute | Required | Purpose |
|----------------|----------|---------|
| tenant.id | Yes | Primary tenant identifier |
| tenant.tier | Yes | Service tier for SLA correlation |
| user.id | Yes | User within tenant |
| agent.id | Conditional | AI agent identifier (if applicable) |
| operation.type | Yes | read/write/compute |

#### Per-Tier Sampling Strategy

| Tier | Sampling Rate | Retention | Rationale |
|------|---------------|-----------|-----------|
| Free | 1% | 24 hours | Cost efficiency |
| Pro | 10% | 7 days | Balance debugging needs |
| Enterprise | 100% | 30 days | Full debugging capability |

#### Trace Propagation Headers

```
W3C Trace Context (Required):
  traceparent: 00-{trace_id}-{span_id}-{flags}
  tracestate: tenant={tenant_id},tier={tier}

BAM Headers (Always propagate):
  X-Tenant-ID: {tenant_id}
  X-Trace-ID: {trace_id}
  X-Request-ID: {request_id}
```

---

## §log-aggregation

### Pattern: Log Aggregation

**When to use:** All multi-tenant logging
**Phase:** foundation

#### Multi-Tenant Logging Architecture

```
Request
   │
   v
API Gateway ──► Add tenant_id, trace_id to context
   │
   v
Services ──► Structured JSON logs with tenant context
   │
   v
Log Aggregator (Loki/Elasticsearch)
   │
   ├──► Platform Index (full access for operators)
   │
   └──► Tenant-Filtered Views (tenant_id = X only)
```

#### Log Access Control

| Role | Access Scope | Query Filter |
|------|--------------|--------------|
| Platform Operator | All tenants | None |
| Tenant Admin | Own tenant | `tenant_id == {self.tenant_id}` |
| Tenant User | Own tenant, limited | `tenant_id == {self.tenant_id} AND level != DEBUG` |

#### Per-Tier Log Features

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Retention | 7 days | 30 days | 90 days |
| Query access | Dashboard only | API + Dashboard | Full API + Export |
| Log level | INFO+ | DEBUG+ | All |
| Real-time | No | Yes | Yes + Streaming |

---

## §metrics-monitoring

### Pattern: Metrics Monitoring

**When to use:** All tenant-aware metrics
**Phase:** foundation

#### Business Metrics Per Tenant

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tenant_active_users | Gauge | tenant_id, tier | Current active users |
| tenant_feature_usage_total | Counter | tenant_id, feature | Feature adoption tracking |
| tenant_revenue_mrr_dollars | Gauge | tenant_id, tier | Monthly recurring revenue |
| tenant_engagement_score | Gauge | tenant_id | Usage engagement metric |

#### Technical Metrics Per Tenant

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| api_request_total | Counter | tenant_id, endpoint, status | Request volume |
| api_request_duration_seconds | Histogram | tenant_id, endpoint | Latency distribution |
| api_error_total | Counter | tenant_id, error_type | Error tracking |
| tenant_quota_usage_ratio | Gauge | tenant_id, resource | Resource consumption |
| tenant_rate_limit_hit_total | Counter | tenant_id, endpoint | Rate limiting events |

#### AI/Agent Metrics Per Tenant

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| agent_llm_tokens_total | Counter | tenant_id, model, direction | Token consumption |
| agent_completion_success_ratio | Gauge | tenant_id, agent_type | Successful completions |
| agent_safety_violation_total | Counter | tenant_id, violation_type | Safety guardrail triggers |
| agent_inference_duration_seconds | Histogram | tenant_id, model | Model response time |
| agent_cost_dollars_total | Counter | tenant_id, model | AI spend tracking |

---

## §alerting

### Pattern: Alerting Configuration

**When to use:** SLA monitoring, anomaly detection
**Phase:** foundation

#### Tier-Based SLA Alerts

| Tier | Latency p95 | Availability | Error Rate |
|------|-------------|--------------|------------|
| Free | < 5s | 99.0% | < 5% |
| Pro | < 1s | 99.5% | < 1% |
| Enterprise | < 500ms | 99.9% | < 0.1% |

#### Noisy Neighbor Detection

| Signal | Threshold | Action |
|--------|-----------|--------|
| Resource consumption | > 3x tenant average | Throttle + alert |
| Request rate | > tier limit | Rate limit + notify |
| Queue depth | > 80% capacity | Scale or throttle |
| Memory usage | > 90% allocation | Alert operations |
| Error generation | > 50% of platform errors | Investigate tenant |

#### Alert Routing by Tier

| Severity | Enterprise | Pro | Free |
|----------|------------|-----|------|
| Critical | Direct call + Slack | Slack + Email | Email batch |
| Warning | Slack + Email | Email | Dashboard only |
| Info | Dashboard | Dashboard | None |

#### Anomaly Detection Per Tenant

| Pattern | Detection Method | Response |
|---------|-----------------|----------|
| Usage spike | Rolling average deviation | Auto-scale or throttle |
| Error burst | Rate of change | Circuit breaker |
| Latency degradation | Baseline comparison | Investigation alert |
| Cost anomaly | Daily/weekly comparison | Billing alert |

---

## §audit-logging

### Pattern: Audit Logging

**When to use:** Compliance, security, forensics
**Phase:** foundation

#### Audit vs Operational Logs

| Aspect | Audit Logs | Operational Logs |
|--------|------------|------------------|
| Purpose | Compliance, forensics | Debugging, monitoring |
| Retention | Years (regulatory) | Days to months |
| Mutability | Immutable | Can be rotated |
| Access | Restricted | DevOps team |
| Content | Who did what when | How system behaved |

#### Audit Event Schema

| Field | Description | Required |
|-------|-------------|----------|
| event_id | Unique identifier | Yes |
| timestamp | ISO 8601 UTC | Yes |
| tenant_id | Tenant context | Yes |
| actor_id | Who performed action | Yes |
| actor_type | `user`, `agent`, `system` | Yes |
| action | What was done | Yes |
| resource | Target of action | Yes |
| outcome | `success`, `failure`, `denied` | Yes |
| context | Additional metadata (IP, user_agent) | Optional |

#### AI Agent Audit Trail

| Field | Description | Purpose |
|-------|-------------|---------|
| agent_id | Agent instance | Trace to agent config |
| run_id | Execution run | Correlate multi-step |
| reasoning | Agent reasoning | Explain decisions |
| tool_calls | Tools invoked | Audit tool usage |
| model_version | LLM version used | Reproducibility |

#### Per-Tier Audit Features

| Tier | Retention | Self-Service Access | Export Format |
|------|-----------|---------------------|---------------|
| Free | 30 days | Dashboard only | N/A |
| Pro | 1 year | Dashboard + API | CSV |
| Enterprise | 7 years | Full API access | JSON, SIEM integration |

#### Compliance Mapping

| Regulation | Audit Requirements | Retention |
|------------|-------------------|-----------|
| SOC 2 | Access logs, configuration changes | 1 year |
| HIPAA | PHI access logs | 6 years |
| GDPR | Data processing logs | Varies by member state |
| PCI DSS | Cardholder data access | 1 year |

---

## §sre-patterns

### Pattern: SLO/SLI Framework

**When to use:** Reliability engineering, error budgets
**Phase:** operations

#### SLI/SLO/SLA Hierarchy

| Concept | Definition | Multi-Tenant Consideration |
|---------|------------|---------------------------|
| SLI | Measurable indicator | Per-tenant + aggregate metrics |
| SLO | Target threshold | Tier-based targets |
| SLA | Contractual commitment | Per-tenant contracts (Enterprise) |
| Error Budget | Allowable failures | Per-tier budgets |

#### Error Budget Model

| Tier | Monthly SLO | Error Budget | Budget Burn Alert |
|------|-------------|--------------|-------------------|
| Free | 99.0% | 7.2 hours | 50% in 24h |
| Pro | 99.5% | 3.6 hours | 50% in 12h |
| Enterprise | 99.9% | 43.2 minutes | 25% in 6h |

#### Error Budget Policy

| Budget State | Action | Team Response |
|--------------|--------|---------------|
| > 50% remaining | Normal development | Feature work continues |
| 25-50% remaining | Caution | Prioritize reliability work |
| 10-25% remaining | Warning | Freeze features, fix reliability |
| < 10% remaining | Critical | Incident mode, all hands |
| Depleted | Lockdown | No changes except fixes |

#### Incident Response by Tier

| Phase | Enterprise | Pro | Free |
|-------|------------|-----|------|
| Detection | Dedicated alerting | Shared alerting | Aggregate only |
| Response | Dedicated on-call | Shared on-call | Queue-based |
| Communication | Direct contact | Status page | None required |
| Post-mortem | Customer meeting | Summary email | Internal only |
| SLA credit | Automatic calculation | On request | N/A |

---

## Quality Gates

| Gate | Key Checks | Related Patterns |
|------|------------|------------------|
| QG-O1 | Structured JSON logs with tenant_id | Log Aggregation |
| QG-O2 | Metrics have tenant_id label | Metrics Monitoring |
| QG-O3 | Traces propagate tenant context | Distributed Tracing |
| QG-O4 | Tier-based alerts configured | Alerting |
| QG-O5 | SLOs defined per tier | SRE Patterns |
| QG-O6 | Audit logs immutable and compliant | Audit Logging |

### Gate Verification Checklist

- [ ] All services emit structured JSON logs with tenant_id
- [ ] **CRITICAL:** Logs include X-Trace-ID and X-Request-ID headers
- [ ] Metrics follow naming convention: `{service}_{component}_{metric}_{unit}`
- [ ] All metrics include tenant_id label
- [ ] Distributed traces propagate tenant.id and tenant.tier span attributes
- [ ] Per-tier sampling rates configured (100%/10%/1%)
- [ ] Tier-based SLA alerts active
- [ ] Noisy neighbor detection enabled
- [ ] Error budgets calculated per tier
- [ ] Audit logs stored with immutability controls
- [ ] AI agent actions logged with run_id and tool_calls
- [ ] Tenant self-service dashboards deployed

---

## Web Research

| Topic | Query |
|-------|-------|
| Multi-tenant observability | "multi-tenant observability patterns {date}" |
| Distributed tracing | "tenant-aware distributed tracing {date}" |
| SRE practices | "SRE multi-tenant SaaS best practices {date}" |
| Error budgets | "SLO SLI error budget implementation {date}" |
| Audit logging | "multi-tenant audit logging patterns {date}" |
| OpenTelemetry | "OpenTelemetry multi-tenant configuration {date}" |

---

## Related Patterns

Cross-references to other domain guides:

- `tenant-patterns-guide.md` §tenant-routing - Tenant context injection
- `security-patterns-guide.md` §audit-logging - Security event logging
- `ai-runtime-patterns-guide.md` §run-contracts - Agent execution monitoring
- `cost-patterns-guide.md` §usage-metering - Usage-based billing metrics

Load from pattern registry:
- `bam-patterns.csv` → filter: `observability-*`, `sre-*`
- `compliance-frameworks.csv` → audit logging requirements

Use the `web_queries` column from pattern registry for current best practices.

---

## Related Workflows

| Workflow | When to Use |
|----------|-------------|
| `bmad-bam-tenant-aware-observability` | Design full observability stack |
| `bmad-bam-distributed-tracing-design` | Implement distributed tracing |
| `bmad-bam-sli-slo-definition` | Define SLOs per tenant tier |
| `bmad-bam-ai-observability-setup` | AI-specific observability |
| `bmad-bam-compliance-design` | Audit logging for compliance |
| `validate-foundation` | Verify observability implementation (QG-F1) |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 4 source files |
