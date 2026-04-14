# BAM SLA Management Guide

**When to load:** During SLA design, service level monitoring, tier planning, or when user mentions SLA, SLO, SLI, uptime, availability, service credits.

**Integrates with:** Architect (platform), DevOps (operations), PM (product), Billing (billing-bam)

---

## Core Concepts

### SLA Hierarchy

Service Level Agreements form a hierarchy from measurements to commitments.

| Level | Definition | Example |
|-------|------------|---------|
| SLI (Indicator) | Measurable metric | API latency P99 |
| SLO (Objective) | Target for SLI | P99 latency < 200ms |
| SLA (Agreement) | Contractual commitment | 99.9% availability |
| Error Budget | Allowable SLO violations | 0.1% downtime/month |

### Tier-Based SLA Matrix

| Tier | Availability | Latency P99 | Support Response | Data Durability |
|------|-------------|-------------|------------------|-----------------|
| Free | 99% | 2000ms | Community | 99% |
| Pro | 99.9% | 500ms | 24h business | 99.9% |
| Enterprise | 99.95% | 200ms | 4h 24/7 | 99.99% |
| Enterprise+ | 99.99% | 100ms | 1h 24/7 + TAM | 99.999% |

### Error Budget Calculation

```
Monthly Error Budget = (100% - SLA%) x (Minutes in Month)

Example for 99.9% SLA (30-day month):
Error Budget = 0.1% x 43,200 minutes = 43.2 minutes downtime allowed
```

---

## Application Guidelines

When designing SLA management for multi-tenant AI platforms:

1. **Tier SLAs to revenue**: Higher-paying tenants expect better guarantees
2. **Include AI-specific SLIs**: Agent response time, completion rate, quality
3. **Measure at tenant level**: Per-tenant SLI tracking, not just global
4. **Automate credit calculation**: Integrate with billing system
5. **Communicate proactively**: Alert tenants before SLA breach

---

## SLI Categories

### Availability SLIs

| SLI | Measurement | Calculation |
|-----|-------------|-------------|
| Service availability | Successful health checks | (Successful / Total) x 100 |
| API availability | Non-5xx responses | ((Total - 5xx) / Total) x 100 |
| Feature availability | Feature health checks | Per-feature success rate |
| Tenant availability | Tenant-scoped success | Per-tenant success rate |

### Latency SLIs

| SLI | Measurement | Typical Targets |
|-----|-------------|-----------------|
| API latency P50 | 50th percentile response | < 100ms |
| API latency P99 | 99th percentile response | < 500ms |
| Agent latency | Time to first token | < 2000ms |
| Agent completion | Full response time | < 30000ms |

### AI-Specific SLIs

| SLI | Measurement | Target |
|-----|-------------|--------|
| Agent completion rate | Successful completions / Total | > 99% |
| Agent quality score | User ratings, automated eval | > 4.0/5.0 |
| Guardrail false positive | Blocked legitimate requests | < 0.1% |
| Tool success rate | Successful tool executions | > 99.5% |
| Memory retrieval accuracy | Relevant memory retrieved | > 95% |

### Throughput SLIs

| SLI | Measurement | Per-Tier Targets |
|-----|-------------|------------------|
| Requests per second | Sustained throughput | Tier quota |
| Concurrent agents | Active agent sessions | Tier limit |
| Token throughput | Tokens per minute | Model limit |
| Data processing | Records per hour | Pipeline capacity |

---

## SLO Design

### SLO Template

```
SLO: {Name}
Category: {Availability|Latency|Throughput|Quality}
SLI: {Specific metric}
Target: {Numeric target with units}
Window: {Rolling 30 days|Calendar month|etc.}
Tier Applicability: {Free|Pro|Enterprise|All}

Measurement:
- Data source: {Prometheus|Datadog|Custom}
- Query: {PromQL or equivalent}
- Aggregation: {P99|Average|Sum}

Error Budget Policy:
- Warning: {threshold}% consumed
- Critical: {threshold}% consumed
- Frozen: {threshold}% consumed
```

### Example SLO Set

| SLO Name | SLI | Target | Tier |
|----------|-----|--------|------|
| API Availability | Successful requests | 99.9% | Pro+ |
| API Latency | P99 response time | < 500ms | Pro+ |
| Agent Completion | Successful completions | 99% | All |
| Agent Quality | Quality score | > 4.0 | Enterprise |
| Data Durability | No data loss events | 99.99% | All |

---

## SLA Contract Design

### Contract Components

| Component | Description | Example |
|-----------|-------------|---------|
| Service scope | What's covered | Core platform, AI agents, API |
| Exclusions | What's not covered | Third-party integrations, beta |
| Measurement method | How SLA is calculated | Monthly rolling window |
| Credit schedule | Compensation for breaches | 10% per 0.1% below SLA |
| Claim process | How to request credit | Support ticket within 30 days |

### Credit Schedule Template

| Availability Achieved | Service Credit |
|----------------------|----------------|
| 99.9% - 99.95% | 0% (within SLA) |
| 99.0% - 99.9% | 10% of monthly fee |
| 95.0% - 99.0% | 25% of monthly fee |
| 90.0% - 95.0% | 50% of monthly fee |
| < 90.0% | 100% of monthly fee |

### SLA Exclusions

| Exclusion | Rationale |
|-----------|-----------|
| Scheduled maintenance | Pre-announced downtime |
| Force majeure | External disasters |
| Customer-caused issues | Misconfiguration, abuse |
| Third-party failures | External dependency outages |
| Beta/preview features | Not production-ready |

---

## Monitoring Implementation

### Per-Tenant SLA Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Current availability | Real-time success rate | Gauge |
| Availability trend | 30-day rolling | Time series |
| Error budget remaining | % of budget left | Gauge with thresholds |
| SLA breach risk | Projected breach | Alert indicator |
| Latency distribution | P50/P95/P99 | Histogram |

### Alerting Strategy

| Alert Level | Condition | Action |
|-------------|-----------|--------|
| Warning | Error budget 50% consumed | Team notification |
| Critical | Error budget 80% consumed | On-call escalation |
| Emergency | SLA breach imminent | All hands response |
| Breach | SLA breached | Executive notification |

### Tenant-Level Tracking

| Metric | Granularity | Retention |
|--------|-------------|-----------|
| Request success | Per-request | 7 days raw, 90 days aggregated |
| Latency | Per-request | 7 days raw, 90 days aggregated |
| Agent metrics | Per-run | 30 days raw, 1 year aggregated |
| SLA compliance | Per-hour | 2 years |

---

## Error Budget Management

### Error Budget Policy

| Budget Status | Engineering Response | Release Policy |
|--------------|---------------------|----------------|
| > 50% remaining | Normal velocity | All releases allowed |
| 25-50% remaining | Increased testing | Feature freeze optional |
| 10-25% remaining | Focus on reliability | Feature freeze |
| < 10% remaining | Emergency reliability mode | Bug fixes only |
| Exhausted | All hands on deck | No changes without approval |

### Budget Allocation

| Activity | Budget Allocation |
|----------|-------------------|
| Planned maintenance | 20% |
| Deployments | 30% |
| Experimentation | 10% |
| Unplanned incidents | 40% (reserve) |

### Recovery Strategy

| Scenario | Recovery Action |
|----------|----------------|
| Major incident consumed budget | Postpone non-critical releases |
| Multiple small incidents | Investigate systemic issues |
| Budget exhausted early | Emergency reliability sprint |
| Consistent budget surplus | Consider tightening SLOs |

---

## SLA Breach Handling

### Breach Response Process

```
SLA Breach Detected
       |
       v
1. Immediate: Acknowledge and log
       |
       v
2. 1 hour: Root cause identification
       |
       v
3. 4 hours: Impact assessment (tenants affected)
       |
       v
4. 24 hours: RCA draft + remediation plan
       |
       v
5. 48 hours: Customer communication
       |
       v
6. 30 days: Credit processing
```

### Breach Communication Template

```
Subject: Service Level Agreement Notification - {Month}

Dear {Customer},

We are writing to inform you that our platform did not meet 
the committed Service Level Agreement for {period}.

Committed SLA: {target}%
Achieved Level: {actual}%
Shortfall: {difference}%

Root Cause:
{Brief description of what happened}

Impact to Your Account:
{Tenant-specific impact description}

Service Credit:
Per our agreement, you are entitled to a {credit}% service 
credit, which will be applied to your next invoice.

Remediation Steps:
1. {Action taken}
2. {Preventive measure}

We apologize for this service disruption and remain committed 
to meeting our service level commitments.
```

---

## Decision Framework

### SLA Tier Selection

| Factor | Free | Pro | Enterprise |
|--------|------|-----|------------|
| Revenue per tenant | < $100/mo | $100-1000/mo | > $1000/mo |
| Criticality | Non-critical | Business use | Mission-critical |
| Support needs | Self-service | Some guidance | Dedicated |
| Compliance | None | Basic | Regulated industry |

### When to Adjust SLAs

| Signal | Action |
|--------|--------|
| Consistent over-performance | Consider tightening SLO |
| Frequent breaches | Investigate or relax SLO |
| Customer complaints | Review specific SLIs |
| New tier launch | Design tier-specific SLOs |
| Architecture change | Re-evaluate achievable SLOs |

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `health-scoring`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS SLA design patterns {date}"
- Search: "error budget policy SRE {date}"
- Search: "multi-tenant SLI monitoring {date}"

---

## Related Workflows

- `bmad-bam-tenant-sla-monitoring` - SLA monitoring design
- `bmad-bam-tenant-health-monitoring` - Health monitoring
- `bmad-bam-sla-contract-design` - SLA contract workflow
- `bmad-bam-sli-slo-definition` - SLI/SLO definition workflow
