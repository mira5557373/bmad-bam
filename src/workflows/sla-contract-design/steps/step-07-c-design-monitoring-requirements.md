# Step 7: Design Monitoring Requirements

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead
- Use web search to verify current best practices when making technology decisions

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define the SLA monitoring approach including metrics collection, alerting thresholds, dashboard requirements, and automated breach detection.

---

## Prerequisites

- Step 6 (Define Penalty Clauses) completed
- Penalty clauses documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `monitoring`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `alerting`

---

## Inputs

- Penalty clauses from Step 6
- Uptime guarantees from Step 2
- Latency SLAs from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define SLA Metrics Collection

Establish metrics required to measure SLA compliance:

| Metric Category | Metric Name | Collection Method | Granularity |
|-----------------|-------------|-------------------|-------------|
| Availability | Platform uptime | Synthetic monitoring | Per minute |
| Availability | API success rate | Request logging | Per second |
| Availability | Error rate by type | Error tracking | Per request |
| Latency | Time to first token (TTFT) | APM instrumentation | Per request |
| Latency | End-to-end completion | Distributed tracing | Per request |
| Latency | Queue wait time | Queue instrumentation | Per request |
| Throughput | Requests per second | Request counter | Per second |
| Throughput | Tokens per minute | Token counter | Per minute |
| Support | Ticket response time | Ticketing system | Per ticket |
| Support | Resolution time | Ticketing system | Per ticket |

### 2. Define Synthetic Monitoring

Establish synthetic monitoring requirements:

| Component | Requirement | Specification |
|-----------|-------------|---------------|
| Probe Locations | Geographic distribution | 5+ regions minimum |
| Probe Frequency | Measurement interval | Every 30 seconds |
| Probe Types | Health check variety | HTTP, TCP, API functional |
| Probe Authentication | Use tenant-like credentials | Service account per region |
| Failure Detection | Consecutive failures | 3 failures = incident |
| Alert Routing | Notification targets | PagerDuty/OpsGenie integration |

### 3. Define Alerting Thresholds

Establish alert thresholds for SLA monitoring:

| SLA Type | Warning Threshold | Critical Threshold | Action |
|----------|-------------------|-------------------|--------|
| Availability | <99.95% (15min) | <99.9% (5min) | Page on-call |
| Latency P95 | >80% of SLA | >95% of SLA | Page on-call |
| Latency P99 | >70% of SLA | >90% of SLA | Alert engineer |
| Error Rate | >0.5% | >1% | Page on-call |
| Queue Depth | >70% capacity | >90% capacity | Auto-scale + alert |
| Support Response | >80% of SLA | >95% of SLA | Escalate manager |

### 4. Define Error Budget Tracking

Establish error budget monitoring:

| Tier | Monthly Error Budget | Burn Rate Warning | Burn Rate Critical |
|------|---------------------|-------------------|-------------------|
| Free | 7h 18m (99.0%) | >2x normal | >5x normal |
| Starter | 3h 39m (99.5%) | >2x normal | >5x normal |
| Pro | 43m 50s (99.9%) | >2x normal | >5x normal |
| Enterprise | 21m 55s (99.95%) | >1.5x normal | >3x normal |
| Premium | 4m 23s (99.99%) | >1.2x normal | >2x normal |

### 5. Define Dashboard Requirements

Establish SLA dashboard specifications:

| Dashboard | Audience | Metrics | Refresh Rate |
|-----------|----------|---------|--------------|
| Executive SLA | Leadership | Availability %, credit risk | 5 minutes |
| Operations | Engineering | Real-time metrics, alerts | 10 seconds |
| Tenant Health | Customer Success | Per-tenant SLA status | 1 minute |
| Customer Portal | Customers | Their SLA performance | 5 minutes |
| Incident Command | On-call | Active incidents, blast radius | Real-time |

### 6. Define Automated Breach Detection

Establish automated breach detection and response:

| Detection Type | Trigger | Automated Response |
|----------------|---------|-------------------|
| Availability breach | Rolling 30-day below target | Flag for credit review |
| Latency breach | P95/P99 exceeded for >1hr | Incident ticket created |
| Support breach | Response time exceeded | Escalation triggered |
| Error budget exhausted | 100% consumed | Feature freeze consideration |
| Pattern detection | 3+ similar incidents | Root cause investigation |

### 7. Define Tenant-Aware Monitoring

Establish per-tenant SLA monitoring:

| Dimension | Requirement | Implementation |
|-----------|-------------|----------------|
| Tenant Isolation | Metrics tagged by tenant_id | Label/tag on all metrics |
| Tier Filtering | Different thresholds per tier | Alert policy per tier |
| Aggregation | Roll-up to tier level | Dashboard grouping |
| Attribution | Identify tenant-specific issues | Correlation rules |
| Fairness | Detect noisy neighbor impact | Resource attribution |

### 8. Define Data Retention

Establish SLA data retention requirements:

| Data Type | Retention Period | Storage | Access |
|-----------|-----------------|---------|--------|
| Raw metrics | 15 days | Hot storage | Real-time |
| Aggregated metrics | 13 months | Warm storage | <1 minute |
| SLA reports | 7 years | Cold storage | <1 hour |
| Incident records | 7 years | Archive | <1 hour |
| Audit logs | 7 years | Immutable | <1 hour |

**Verify current best practices with web search:**
Search the web: "SLA monitoring best practices {date}"
Search the web: "SLO error budget tracking patterns {date}"
Search the web: "synthetic monitoring multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the monitoring requirements above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific monitoring implementations and tooling
- **P (Party Mode)**: Bring SRE and platform engineering perspectives for monitoring review
- **C (Continue)**: Accept monitoring requirements and proceed to reporting obligations
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: metrics collection, alerting, dashboards, automation
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into monitoring requirements
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review monitoring requirements: {summary of metrics, alerts, dashboards}"
- Process collaborative analysis from SRE and platform engineering personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring requirements to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-document-reporting-obligations.md`

---

## Verification

- [ ] All SLA metrics defined
- [ ] Synthetic monitoring specified
- [ ] Alert thresholds established
- [ ] Error budget tracking documented
- [ ] Dashboard requirements specified
- [ ] Breach detection automated
- [ ] Tenant-aware monitoring designed
- [ ] Data retention defined
- [ ] Patterns align with pattern registry

---

## Outputs

- SLA metrics catalog
- Alerting threshold matrix
- Dashboard specifications
- Breach detection automation rules

---

## Next Step

Proceed to `step-08-c-document-reporting-obligations.md` to create SLA reporting requirements.
