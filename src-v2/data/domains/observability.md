# Observability - BAM Domain Context

**Loaded by:** ZOB, ZOM  
**Related Workflows:** bmad-bam-tenant-aware-observability, bmad-bam-agent-execution-tracing

---

## Overview

Observability in multi-tenant systems requires tenant-aware metrics, logs, and traces while maintaining cross-tenant operational visibility.

## Core Concepts

### Three Pillars + Tenant

| Pillar | Tenant Dimension | Example |
|--------|------------------|---------|
| Logs | `tenant_id` field | Structured JSON logs |
| Metrics | `tenant` label | Prometheus labels |
| Traces | `tenant.id` attribute | OpenTelemetry |

### Tenant-Aware Dashboards

```
┌─────────────────────────────────────┐
│ Platform Overview (all tenants)     │
├─────────────────────────────────────┤
│ Tenant Drilldown (single tenant)    │
├─────────────────────────────────────┤
│ Tier Comparison (by tier)           │
└─────────────────────────────────────┘
```

### Alert Routing

| Alert Type | Routing | Tenant Context |
|------------|---------|----------------|
| Platform | Ops team | Aggregate |
| Tenant-specific | Customer success | Single tenant |
| Billing | Finance | Per-tenant |

## Decision Matrix

| Observability Need | Tool | Tenant Isolation |
|--------------------|------|------------------|
| Log aggregation | ELK/Loki | Index per tenant |
| Metrics | Prometheus | Label filtering |
| Tracing | Jaeger/Tempo | Trace attributes |
| APM | Datadog/New Relic | Tag-based |

## Quality Checks

- [ ] All logs include tenant_id label
- [ ] Metrics are tagged with tenant dimension
- [ ] Traces propagate tenant context
- [ ] **CRITICAL:** Tenant data not exposed in shared dashboards

## Web Research Queries

- "multi-tenant observability patterns {date}"
- "tenant-aware logging metrics {date}"
