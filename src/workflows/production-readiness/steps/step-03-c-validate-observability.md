# Step 3: Validate Observability Setup

## Purpose

Validate observability infrastructure including metrics, logging, tracing, and alerting.

## Prerequisites

- Steps 1-2 complete
- Observability stack deployed
- **Load template:** `{project-root}/_bmad/bam/templates/observability-template.md`

## Actions

### 1. Metrics Coverage

| Metric Category | Metrics Defined | Dashboard | Alerts | Status |
|-----------------|-----------------|-----------|--------|--------|
| Infrastructure | CPU, Memory, Disk | | | |
| Application | Latency, Errors, Throughput | | | |
| AI/ML | Inference time, Token usage | | | |
| Business | Active users, Requests/tenant | | | |
| Security | Auth failures, Threats | | | |

### 2. Logging Verification

| Log Type | Collection | Retention | Searchable | Status |
|----------|------------|-----------|------------|--------|
| Application logs | Centralized | 30 days | Yes | |
| Audit logs | Immutable | 7 years | Yes | |
| Access logs | Centralized | 90 days | Yes | |
| Error logs | Centralized | 90 days | Yes | |
| AI operation logs | Centralized | 30 days | Yes | |

### 3. Distributed Tracing

| Trace Capability | Implementation | Coverage | Status |
|------------------|----------------|----------|--------|
| Request tracing | OpenTelemetry | 100% | |
| Cross-service correlation | Trace ID propagation | All services | |
| AI inference tracing | Custom spans | All models | |
| External API tracing | HTTP client instrumentation | All calls | |

### 4. Alerting Configuration

| Alert Category | Alerts Defined | Escalation | On-call Integration | Status |
|----------------|----------------|------------|---------------------|--------|
| Critical (P1) | Service down | Immediate | PagerDuty/Opsgenie | |
| High (P2) | Degradation | 5 min | Slack + On-call | |
| Medium (P3) | Warning | 15 min | Slack | |
| Low (P4) | Info | Daily | Email | |

**Verify observability setup with web search:**
Search the web: "observability checklist production {date}"
Search the web: "monitoring coverage SaaS platform {date}"

## Verification

- [ ] All metric categories covered
- [ ] Logging complete and searchable
- [ ] Distributed tracing working
- [ ] Alerting configured and tested

## Outputs

- Observability validation findings

## Next Step

Proceed to `step-04-c-test-disaster-recovery.md`
