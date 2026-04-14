# Site Reliability Engineering Guide - BAM Extension

**When to load:** When implementing SRE practices for multi-tenant platforms, designing SLOs/SLIs, implementing error budgets, or when user mentions reliability, SRE, SLOs, error budgets, or toil reduction.
**Integrates with:** Dev (bmad-agent-dev), Architect (bmad-agent-architect)

This guide provides BAM-specific context for SRE practices in multi-tenant agentic AI platforms, extending DevOps capabilities with reliability engineering focus.

---

## Role Context

As a site reliability engineer on a BAM project, you focus on:
- Defining and maintaining per-tenant SLOs and error budgets
- Implementing blast radius containment for tenant failures
- Managing on-call with tenant-aware escalation
- Reducing operational toil through automation
- Ensuring reliability without sacrificing tenant isolation

---

## Core Concepts

### Multi-Tenant Reliability Model

Reliability in multi-tenant systems requires balancing per-tenant SLOs against shared infrastructure constraints. A single tenant's reliability issues should not cascade to affect other tenants (blast radius containment), while platform-wide reliability must meet the most demanding tenant's requirements.

### Tenant-Aware SLOs

| Tier | Availability SLO | Latency SLO (p99) | Error Rate SLO | Error Budget (monthly) |
|------|------------------|-------------------|----------------|------------------------|
| Free | 99% | 1000ms | 5% | 7.2 hours downtime |
| Pro | 99.9% | 500ms | 1% | 43.8 minutes downtime |
| Enterprise | 99.99% | 200ms | 0.1% | 4.38 minutes downtime |

### SLI Categories for Multi-Tenant AI Platforms

| Category | SLI | Measurement | Tenant Scope |
|----------|-----|-------------|--------------|
| Availability | Request success rate | Successful / Total requests | Per tenant |
| Latency | Response time distribution | p50, p95, p99 by tenant | Per tenant |
| AI Quality | Agent task completion rate | Successful completions / Total | Per tenant |
| AI Latency | Time to first token, total response | p50, p95, p99 | Per tenant |
| Throughput | Requests per second capacity | Peak sustainable RPS | Per tier |
| Freshness | Data sync latency | Time from source to available | Per tenant |

---

## Decision Framework

| Scenario | Recommendation | Rationale |
|----------|---------------|-----------|
| SLO breach for single tenant | Investigate tenant-specific factors first | May be tenant config, not platform |
| Platform-wide SLO breach | Invoke incident response, pause deployments | Protect all tenants |
| Error budget exhausted | Freeze feature releases, focus on reliability | Contractual obligation |
| Noisy neighbor detected | Apply rate limiting, consider tier upgrade | Protect other tenants |
| AI agent degradation | Check model endpoints, fallback chains | AI-specific failure mode |
| Cross-region latency spike | Verify routing, check regional issues | Data residency may restrict options |

---

## Error Budget Management

### Error Budget Calculation

```
Monthly Error Budget = (1 - SLO) × Total Minutes in Month

Example for 99.9% SLO (Pro tier):
Error Budget = (1 - 0.999) × 43,200 minutes = 43.2 minutes

Remaining Budget = Error Budget - Accumulated Downtime
```

### Error Budget Policies by Tier

| Tier | Budget Threshold | Policy When Exhausted |
|------|------------------|----------------------|
| Free | Not tracked | Best effort continues |
| Pro | < 25% remaining | Feature freeze, reliability focus |
| Enterprise | < 50% remaining | Executive escalation, dedicated response |

### Error Budget Burn Rate Alerting

| Burn Rate | Window | Action |
|-----------|--------|--------|
| 14.4x | 1 hour | Page on-call immediately |
| 6x | 6 hours | Page on-call |
| 3x | 24 hours | Create ticket, investigate |
| 1x | 72 hours | Review in weekly meeting |

---

## Tenant Isolation for Reliability

### Blast Radius Containment

| Component | Isolation Method | Blast Radius |
|-----------|------------------|--------------|
| Compute | Namespace quotas, pod limits | Single tenant |
| Database | Connection pools per tenant | Single tenant |
| Cache | Memory limits per tenant | Single tenant |
| Queue | Dedicated queues by tier | Tier-based |
| AI Runtime | Token limits, timeout enforcement | Single tenant |

### Noisy Neighbor Prevention

| Resource | Detection Method | Mitigation |
|----------|------------------|------------|
| CPU | Usage > 2x average for tier | Rate limiting |
| Memory | Approaching quota limit | Alert + throttle |
| Database | Long-running queries | Query timeout + logging |
| API calls | Rate exceeds limit | 429 responses |
| AI tokens | Budget exceeded | Request rejection |

### Circuit Breakers for Tenant Protection

```
Tenant Request
    │
    ├── Check tenant circuit breaker state
    │   ├── CLOSED (healthy) → Process request
    │   ├── OPEN (failing) → Fast fail, return cached/default
    │   └── HALF-OPEN (testing) → Allow limited requests
    │
    ├── Execute request with timeout
    │
    ├── Track success/failure
    │   ├── Failure threshold reached → Open circuit
    │   └── Success threshold reached → Close circuit
    │
    └── Report metrics with tenant context
```

---

## On-Call for Multi-Tenant Platforms

### Escalation by Tenant Tier

| Alert Type | Free Tier | Pro Tier | Enterprise Tier |
|------------|-----------|----------|-----------------|
| Single tenant issue | Queue for business hours | Page if SLA risk | Page immediately |
| Platform degradation | Page if widespread | Page immediately | Page immediately |
| Data integrity | Page immediately | Page immediately | Page + executive |
| Security incident | Page immediately | Page immediately | Page + executive + tenant |

### On-Call Runbook Structure

1. **Alert Context**
   - Which tenants affected (IDs and tiers)
   - SLO impact assessment
   - Error budget burn rate

2. **Diagnostic Steps**
   - Tenant-scoped log queries
   - Tenant-scoped trace analysis
   - Metrics dashboard links (pre-filtered)

3. **Mitigation Actions**
   - Tenant isolation options
   - Failover procedures
   - Rollback steps

4. **Communication**
   - Tenant notification templates by tier
   - Internal escalation paths
   - Status page updates

### Tenant Context in Pages

Every page must include:
- Affected tenant IDs and tiers
- Current SLO status per affected tenant
- Error budget impact
- Tenant contact (for Enterprise)

---

## Capacity Planning for Multi-Tenant

### Per-Tenant Capacity Model

| Resource | Measurement | Planning Horizon |
|----------|-------------|------------------|
| Compute | vCPU-seconds per request × RPS | Weekly review |
| Memory | Working set per tenant | Monthly review |
| Storage | Growth rate per tenant | Quarterly review |
| Database | Connections per tenant × count | Weekly review |
| AI Tokens | Tokens per day per tenant | Weekly review |

### Capacity Alerts

| Threshold | Alert Type | Lead Time |
|-----------|------------|-----------|
| 60% capacity | Informational | 4-6 weeks |
| 75% capacity | Warning | 2-3 weeks |
| 85% capacity | Critical | 1 week |
| 95% capacity | Emergency | Immediate |

### Tenant Growth Forecasting

```
Predicted Capacity Need = Current Usage × Growth Rate × Safety Margin

Where:
- Growth Rate = Historical tenant growth + anticipated additions
- Safety Margin = 1.5x for Pro, 2x for Enterprise
```

---

## AI-Specific Reliability Patterns

### AI Runtime SLOs

| Metric | Free | Pro | Enterprise |
|--------|------|-----|------------|
| Model availability | 95% | 99% | 99.9% |
| Time to first token (p99) | 5s | 2s | 500ms |
| Total response time (p99) | 60s | 30s | 15s |
| Completion rate | 90% | 95% | 99% |

### AI Fallback Chains

```
Primary Model Request
    │
    ├── Success → Return response
    │
    └── Failure (timeout, error, quality)
        │
        ├── Try Secondary Model
        │   ├── Success → Return response
        │   └── Failure → Try Fallback
        │
        └── Try Fallback (simpler model)
            ├── Success → Return response
            └── Failure → Return cached/default
```

### AI Cost as Reliability Factor

| Situation | Reliability Impact | Mitigation |
|-----------|-------------------|------------|
| Tenant budget exhausted | Service denial | Warn at 80%, throttle at 90% |
| Model cost spike | Margin erosion | Budget alerts, auto-fallback |
| Token explosion | Timeout, poor UX | Max token limits, truncation |

---

## Toil Reduction for Multi-Tenant Operations

### Common Toil Sources

| Toil Category | Example | Automation Opportunity |
|---------------|---------|----------------------|
| Tenant provisioning | Manual DB schema creation | Self-service + automation |
| Config changes | Manual per-tenant updates | Config-as-code, GitOps |
| Incident triage | Manual log searching | Pre-filtered dashboards |
| Capacity requests | Manual scaling | Auto-scaling policies |
| Compliance reports | Manual data gathering | Automated evidence collection |

### Toil Reduction Targets

| Metric | Current | Target | Automation Method |
|--------|---------|--------|-------------------|
| Tenant onboarding time | 24 hours | < 5 minutes | Self-service + automation |
| Manual incident triage | 30 min/incident | < 5 min | Auto-diagnosis dashboards |
| Config change deployment | 2 hours | < 5 minutes | GitOps pipeline |
| Capacity scaling | 4 hours | Automatic | Auto-scaling policies |

---

## Observability for Reliability

### Multi-Tenant Dashboard Hierarchy

```
Platform Overview
├── All Tenants Aggregate
│   ├── Total request volume
│   ├── Overall error rate
│   ├── Platform SLO status
│   └── Capacity utilization
│
├── Tier Overview
│   ├── Enterprise tier health
│   ├── Pro tier health
│   └── Free tier health
│
└── Tenant Drill-Down
    ├── Single tenant metrics
    ├── Tenant SLO status
    ├── Tenant error budget
    └── Tenant-specific alerts
```

### Key Reliability Dashboards

| Dashboard | Primary Audience | Update Frequency |
|-----------|------------------|------------------|
| Platform Health | SRE, On-call | Real-time |
| Tier SLO Status | SRE, Management | 5-minute |
| Error Budget Burn | SRE, Engineering | Hourly |
| Capacity Planning | SRE, Ops | Daily |
| Tenant Deep-Dive | Support, SRE | On-demand |

---

## Incident Management

### Multi-Tenant Incident Classification

| Severity | Definition | Examples |
|----------|------------|----------|
| SEV1 | Platform-wide outage | All tenants affected |
| SEV2 | Major feature unavailable | Core functionality broken |
| SEV3 | Single tenant critical | Enterprise tenant impacted |
| SEV4 | Degraded performance | Latency SLO breach |
| SEV5 | Minor issue | Non-critical, workaround exists |

### Post-Incident Review Focus

For multi-tenant incidents, always analyze:
- Which tenants were affected and for how long
- Error budget impact per affected tenant
- Whether blast radius containment worked
- Tenant communication effectiveness
- Tenant-specific recovery actions needed

---

## Application Guidelines

When implementing SRE for multi-tenant platforms:

1. **Define SLOs per tier** - Different tiers have different reliability expectations
2. **Track error budgets per tenant** - Especially for Enterprise with SLA commitments
3. **Implement blast radius containment** - Single tenant failures must not cascade
4. **Automate tenant provisioning** - Eliminate toil in onboarding
5. **Build tenant-aware alerting** - Pages include tenant context and tier

When responding to incidents:

1. **Identify affected tenants immediately** - Scope the blast radius
2. **Assess SLO impact per tenant** - Prioritize by tier and error budget
3. **Communicate per tier requirements** - Enterprise needs proactive updates
4. **Track recovery per tenant** - Ensure all affected tenants are restored
5. **Conduct tenant-aware postmortem** - Include tenant impact analysis

---

## Related Workflows

- `bmad-bam-on-call-rotation` - Design on-call rotation with tenant context
- `bmad-bam-incident-response-operations` - Execute incident response
- `bmad-bam-tenant-sla-monitoring` - Monitor tenant SLA compliance
- `bmad-bam-disaster-recovery-drill` - Test recovery procedures
- `bmad-bam-chaos-engineering-design` - Design chaos experiments

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Reliability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `reliability-*`
- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `observability-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS SRE best practices {date}"
- Search: "error budget management B2B SaaS {date}"
- Search: "tenant isolation reliability engineering {date}"
- Search: "AI platform SLO design patterns {date}"
