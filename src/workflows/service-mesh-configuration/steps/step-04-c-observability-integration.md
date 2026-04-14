# Step 4: Observability Integration

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices

---

## Purpose

Configure observability features including distributed tracing, metrics, and tenant-tagged telemetry.

---

## Prerequisites

- Step 1: Mesh Architecture completed
- Step 2: Traffic Management completed
- Step 3: Tenant Routing completed

---

## Actions

### 1. Distributed Tracing

Configure tracing integration:

| Component | Technology | Configuration |
|-----------|------------|---------------|
| Trace Collection | Jaeger/Zipkin | 100% sampling (dev), 10% (prod) |
| Span Export | OTLP | Tenant-tagged spans |
| Trace Storage | Elasticsearch | 7-day retention |
| Visualization | Grafana Tempo | Service map enabled |

### 2. Service Metrics

Define mesh metrics collection:

| Metric Type | Examples | Labels |
|-------------|----------|--------|
| Request Count | istio_requests_total | tenant_id, service |
| Latency | istio_request_duration | tenant_id, percentile |
| Error Rate | istio_request_errors | tenant_id, error_type |
| Connection Count | istio_tcp_connections | tenant_id |

### 3. Tenant-Tagged Telemetry

Ensure all telemetry includes tenant context:

- Automatic tenant_id label injection
- Per-tenant dashboards in Grafana
- Tenant-scoped alerting
- Cost attribution by tenant

### 4. Service Mesh Dashboard

Configure visualization:

| Dashboard | Purpose | Refresh |
|-----------|---------|---------|
| Mesh Overview | Global health | 30s |
| Tenant Health | Per-tenant metrics | 1m |
| Service Map | Dependency visualization | 5m |
| Traffic Flow | Real-time traffic | 10s |

**Verify current best practices with web search:**
Search the web: "service mesh observability best practices {date}"
Search the web: "Istio Grafana dashboard configuration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into observability design
- **P (Party Mode)**: Bring operations perspectives
- **C (Continue)**: Finalize service mesh configuration
```

#### If 'C' (Continue):
- Save complete service mesh configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final artifact

---

## Verification

- [ ] Distributed tracing configured
- [ ] Service metrics defined
- [ ] Tenant-tagged telemetry implemented
- [ ] Dashboards specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Distributed tracing configuration
- Service metrics definitions
- Tenant-tagged telemetry spec
- Service mesh dashboard configuration
- **Load template:** `{project-root}/_bmad/bam/templates/service-mesh-template.md`

---

## Workflow Complete

Create mode complete for service-mesh-configuration workflow.
