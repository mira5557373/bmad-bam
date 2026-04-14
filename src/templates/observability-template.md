---
name: observability-template
description: Template for documenting observability strategy with tenant-aware instrumentation
category: operations
version: "1.0.0"
---

# Observability Design Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Module** | {{module_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents the observability strategy for multi-tenant AI platforms, covering metrics, logging, tracing, and alerting with tenant-aware instrumentation.

## Observability Pillars

### Three Pillars Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Observability Platform                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Metrics   │  │   Logging   │  │   Tracing   │             │
│  │ (Prometheus)│  │ (Loki/ES)   │  │  (Jaeger)   │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         ▼                ▼                ▼                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           Tenant Context Enrichment Layer                │   │
│  │         (tenant_id, tier, region in all data)            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Grafana Dashboards                    │   │
│  │              (Per-tenant and platform views)             │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Metrics Design

### Standard Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `request_total` | Counter | tenant_id, endpoint, status | Request count |
| `request_duration_seconds` | Histogram | tenant_id, endpoint | Response time |
| `active_users` | Gauge | tenant_id | Concurrent users |
| `ai_tokens_total` | Counter | tenant_id, model | Token usage |
| `ai_latency_seconds` | Histogram | tenant_id, model | AI response time |

### AI-Specific Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `llm_requests_total` | Counter | tenant_id, model, status | LLM API calls |
| `llm_tokens_input` | Counter | tenant_id, model | Input tokens |
| `llm_tokens_output` | Counter | tenant_id, model | Output tokens |
| `llm_cost_usd` | Counter | tenant_id, model | Cost tracking |
| `agent_runs_total` | Counter | tenant_id, agent_id, status | Agent executions |
| `tool_calls_total` | Counter | tenant_id, tool_name, status | Tool invocations |

### Tenant-Aware Labels

```yaml
required_labels:
  - tenant_id       # Always required for tenant isolation
  - tier            # free, pro, enterprise
  - region          # Deployment region
  
optional_labels:
  - user_id         # For user-level metrics
  - agent_id        # For AI agent metrics
  - module          # For module-level metrics
```

## Logging Strategy

### Log Schema

```json
{
  "timestamp": "{{iso8601}}",
  "level": "{{info|warn|error|debug}}",
  "message": "{{message}}",
  
  "context": {
    "tenant_id": "{{tenant_id}}",
    "user_id": "{{user_id}}",
    "request_id": "{{request_id}}",
    "trace_id": "{{trace_id}}"
  },
  
  "service": {
    "name": "{{service_name}}",
    "version": "{{version}}",
    "instance": "{{instance_id}}"
  },
  
  "metadata": {
    "module": "{{module_name}}",
    "action": "{{action}}",
    "duration_ms": {{duration}}
  }
}
```

### Log Levels by Tier

| Tier | Default Level | Debug Available | Retention |
|------|---------------|-----------------|-----------|
| Free | WARN | No | 7 days |
| Pro | INFO | On request | 30 days |
| Enterprise | DEBUG | Always | 90 days |

### Log Filtering

```yaml
log_filtering:
  pii_redaction: true
  
  redact_fields:
    - email
    - password
    - api_key
    - credit_card
    
  tenant_isolation:
    enforce: true
    filter_by: tenant_id
```

## Distributed Tracing

### Trace Context Propagation

```yaml
tracing:
  sampler:
    type: probabilistic
    param: 0.1  # 10% sampling for all tenants
    
  tenant_override:
    enterprise:
      param: 1.0  # 100% for enterprise
    debug_mode:
      param: 1.0  # 100% when debugging
      
  propagation:
    formats:
      - w3c-traceparent
      - jaeger
      
  tags:
    always_include:
      - tenant_id
      - tier
      - user_id
```

### AI Agent Tracing

```yaml
agent_tracing:
  spans:
    - agent_run
    - llm_call
    - tool_execution
    - memory_access
    
  attributes:
    agent_run:
      - agent_id
      - model
      - total_tokens
      - total_cost
      
    llm_call:
      - model
      - input_tokens
      - output_tokens
      - latency_ms
      
    tool_execution:
      - tool_name
      - success
      - duration_ms
```

## Alerting

### Alert Hierarchy

| Level | Scope | Response Time | Notification |
|-------|-------|---------------|--------------|
| P1 | Platform-wide | < 5 min | PagerDuty |
| P2 | Multiple tenants | < 15 min | Slack + Email |
| P3 | Single tenant | < 1 hour | Email |
| P4 | Non-critical | < 24 hours | Ticket |

### Standard Alerts

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| High Error Rate | error_rate > 5% | P2 | Investigate |
| High Latency | p99 > 3s | P3 | Monitor |
| Budget Exceeded | cost > budget | P3 | Throttle |
| Token Spike | tokens > 10x avg | P3 | Alert tenant |
| Agent Failure | fail_rate > 10% | P2 | Disable agent |

### Tenant-Specific Alerts

```yaml
tenant_alerts:
  template: tenant_{{tenant_id}}_alert
  
  rules:
    - name: budget_warning
      expr: |
        sum(rate(ai_cost_usd{tenant_id="{{tenant_id}}"}[1d])) 
        > ({{budget}} * 0.8 / 30)
      severity: warning
      
    - name: rate_limit_breach
      expr: |
        rate(rate_limit_hits{tenant_id="{{tenant_id}}"}[5m]) > 10
      severity: info
```

## Dashboards

### Platform Dashboard

| Panel | Query | Purpose |
|-------|-------|---------|
| Request Rate | `sum(rate(request_total[5m]))` | Overall traffic |
| Error Rate | `sum(rate(request_total{status=~"5.."}[5m]))` | Health check |
| Active Tenants | `count(count by (tenant_id)(request_total))` | Tenant activity |
| AI Spend | `sum(rate(ai_cost_usd[1d]))` | Cost monitoring |

### Tenant Dashboard

| Panel | Query | Access |
|-------|-------|--------|
| My Requests | `request_total{tenant_id="$tenant"}` | All tiers |
| My Latency | `request_duration_seconds{tenant_id="$tenant"}` | All tiers |
| My AI Usage | `ai_tokens_total{tenant_id="$tenant"}` | Pro+ |
| My Costs | `ai_cost_usd{tenant_id="$tenant"}` | Pro+ |

## SLO Definitions

### Platform SLOs

| SLO | Target | Measurement | Alert At |
|-----|--------|-------------|----------|
| Availability | 99.9% | Uptime | 99.5% |
| Latency P99 | < 500ms | Response time | 600ms |
| Error Rate | < 0.1% | 5xx responses | 0.5% |

### Per-Tier SLOs

| Tier | Availability | Latency P95 | Support Response |
|------|-------------|-------------|------------------|
| Free | 99% | 2s | Community |
| Pro | 99.9% | 500ms | 24h |
| Enterprise | 99.99% | 200ms | 1h |

## Verification Checklist

- [ ] Tenant ID in all metrics
- [ ] Tenant ID in all logs
- [ ] Tenant ID in all traces
- [ ] PII redaction configured
- [ ] Per-tier sampling rates set
- [ ] Alerts configured
- [ ] Dashboards created
- [ ] SLOs defined and tracked

## Web Research Queries

- Search: "multi-tenant observability patterns {date}"
- Search: "tenant-aware metrics design {date}"
- Search: "AI LLM observability best practices {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
