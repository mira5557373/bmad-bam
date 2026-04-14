# BAM Observability SRE Guide

**When to load:** During Phase 4-6 (Implementation/Quality/Operations) when designing SRE practices,
or when user mentions SLI, SLO, SLA, error budgets, reliability, incident response, on-call.

**Integrates with:** DevOps agent, Architect (Atlas persona), Platform operations

---

## Core Concepts

### SLI/SLO/SLA Hierarchy

In multi-tenant platforms, service level indicators must account for tenant boundaries:

| Concept | Definition | Multi-Tenant Consideration |
|---------|------------|---------------------------|
| SLI | Measurable indicator | Per-tenant + aggregate metrics |
| SLO | Target threshold | Tier-based targets |
| SLA | Contractual commitment | Per-tenant contracts |
| Error Budget | Allowable failures | Per-tier budgets |

### Tenant-Aware SLI Categories

| Category | SLI Examples | Measurement |
|----------|--------------|-------------|
| Availability | Successful requests / total requests | Per-tenant, per-endpoint |
| Latency | p50, p95, p99 response time | Per-tenant distribution |
| Throughput | Requests per second capacity | Per-tenant quota utilization |
| Quality | Error-free transactions | Per-tenant error categorization |
| Freshness | Data staleness | Per-tenant data pipelines |

### Error Budget Model

| Tier | Monthly SLO | Error Budget | Budget Burn Alert |
|------|-------------|--------------|-------------------|
| Free | 99.0% | 7.2 hours | 50% in 24h |
| Pro | 99.5% | 3.6 hours | 50% in 12h |
| Enterprise | 99.9% | 43.2 minutes | 25% in 6h |

## Application Guidelines

When implementing SRE practices for multi-tenant systems:

1. **Define SLOs per tier**: Different tiers have different reliability expectations
2. **Measure SLIs per tenant**: Enable tenant-specific reliability reporting
3. **Alert on error budget burn rate**: Proactive incident detection
4. **Isolate noisy neighbors**: One tenant should not impact others
5. **Provide tenant dashboards**: Self-service reliability visibility

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Defining SLOs for new service | Start with 99.5%, adjust based on data | Conservative baseline, tune with real usage |
| Enterprise tenant SLA negotiation | Match SLO to SLA with buffer | SLO should be tighter than SLA commitment |
| Error budget depleted | Feature freeze, focus on reliability | Protect reliability before adding features |
| Cross-tenant impact incident | Prioritize by tier, communicate widely | Enterprise impacts SLA, free tier is best-effort |
| Noisy neighbor detected | Throttle offending tenant, alert their admin | Protect platform, notify tenant |
| Capacity planning | 3x headroom for Enterprise, 2x for Pro | Higher tiers expect better burst handling |

## Implementation Patterns

### Pattern 1: Tier-Based SLO Configuration

| Metric | Free SLO | Pro SLO | Enterprise SLO |
|--------|----------|---------|----------------|
| Availability | 99.0% | 99.5% | 99.9% |
| Latency p95 | < 2s | < 500ms | < 200ms |
| Latency p99 | < 5s | < 1s | < 500ms |
| Error rate | < 5% | < 1% | < 0.1% |
| Throughput | Best effort | Guaranteed quota | Guaranteed + burst |

### Pattern 2: SLI Collection Architecture

| Layer | Metrics Collected | Tenant Attribution |
|-------|-------------------|-------------------|
| Load balancer | Request count, latency | Tenant ID header |
| API Gateway | Auth, rate limiting | Tenant context |
| Application | Business metrics | Tenant in span |
| Database | Query performance | Tenant in connection |
| External deps | Third-party latency | Aggregate only |

### Pattern 3: Error Budget Policies

| Budget State | Action | Team Response |
|--------------|--------|---------------|
| > 50% remaining | Normal development | Feature work continues |
| 25-50% remaining | Caution | Prioritize reliability work |
| 10-25% remaining | Warning | Freeze features, fix reliability |
| < 10% remaining | Critical | Incident mode, all hands |
| Depleted | Lockdown | No changes except fixes |

## Multi-Tenant SRE Patterns

### Noisy Neighbor Detection

| Signal | Threshold | Action |
|--------|-----------|--------|
| Request rate | > 10x tenant average | Rate limit |
| CPU per request | > 5x average | Throttle |
| Memory pressure | Tenant consuming > 20% | Alert + throttle |
| Queue depth | Tenant backlog > 1000 | Isolate queue |
| Error generation | > 50% of platform errors | Investigate |

### Tenant Impact Classification

| Severity | Scope | Response Time | Communication |
|----------|-------|---------------|---------------|
| P1 | Multiple Enterprise tenants | 15 min | Immediate notify |
| P2 | Single Enterprise or multiple Pro | 30 min | Status page |
| P3 | Pro tenants | 2 hours | Email |
| P4 | Free tenants | Best effort | None required |

### Incident Response per Tier

| Phase | Enterprise | Pro | Free |
|-------|------------|-----|------|
| Detection | Dedicated alerting | Shared alerting | Aggregate only |
| Response | Dedicated on-call | Shared on-call | Queue-based |
| Communication | Direct contact | Status page | None |
| Post-mortem | Customer meeting | Summary email | Internal only |
| SLA credit | Automatic | On request | N/A |

## Observability Stack for SRE

### Metrics Architecture

| Component | Purpose | Tenant Isolation |
|-----------|---------|------------------|
| Prometheus | Metric collection | tenant_id label |
| Thanos | Long-term storage | Per-tenant query |
| Grafana | Visualization | Tenant dashboards |
| AlertManager | Alert routing | Tier-based routing |

### Logging for SRE

| Log Type | Retention | Tenant Access |
|----------|-----------|---------------|
| Application logs | 30 days | Own tenant only |
| Audit logs | 1 year | Own tenant + compliance |
| Security logs | 2 years | Platform only |
| Performance logs | 14 days | Own tenant + aggregate |

### Tracing Strategy

| Trace Context | Propagation | Sampling |
|---------------|-------------|----------|
| tenant_id | W3C trace context | 100% for Enterprise |
| user_id | Baggage | 10% for Pro |
| request_id | Headers | 1% for Free |

## SRE Automation

### Self-Healing Patterns

| Condition | Automated Response | Escalation |
|-----------|-------------------|------------|
| Pod unhealthy | Restart pod | Alert if > 3 restarts |
| Memory pressure | Scale horizontally | Alert at 90% capacity |
| Database connection exhaustion | Connection pool reset | Alert at 80% |
| Rate limit breach | Auto-throttle tenant | Alert tenant admin |

### Capacity Management

| Resource | Monitoring | Scaling Trigger |
|----------|------------|-----------------|
| Compute | CPU, memory utilization | > 70% sustained |
| Database | Connection count, IOPS | > 80% capacity |
| Cache | Memory, hit rate | Hit rate < 90% |
| Queue | Depth, processing time | Depth > 1000 |

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Observability design
- `bmad-bam-disaster-recovery-design` - DR and incident response
- `bmad-bam-convergence-verification` - SLO verification

## Related Patterns

Load decision criteria from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `observability`, `operations`

### Web Research

Use `web_queries` from pattern registry:
- Search: "SRE multi-tenant SaaS best practices {date}"
- Search: "SLO SLI error budget implementation {date}"
- Search: "tenant-aware incident response patterns {date}"
