# Step 7: Configure Monitoring Integration

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Configure comprehensive monitoring and alerting for model deployments including performance metrics, tenant-scoped dashboards, alerting thresholds, and SLO tracking per model version.

---

## Prerequisites

- Steps 1-6 completed with A/B testing framework defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `model-deployment`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- Deployment configuration from Steps 1-6
- Observability requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Model Performance Metrics

| Metric Category | Metrics | Labels | Retention |
|-----------------|---------|--------|-----------|
| Latency | inference_latency_ms | model_version, tenant_id, tier | 30 days |
| Throughput | requests_per_second | model_version, tenant_id | 30 days |
| Errors | error_count, error_rate | model_version, error_type, tenant_id | 90 days |
| Quality | accuracy, f1_score | model_version, task_type | 90 days |
| Resources | gpu_utilization, memory_mb | model_version, node | 7 days |
| Cost | tokens_used, compute_cost | model_version, tenant_id | 90 days |

For each metric, configure:
- Collection interval (5s, 30s, 1m)
- Aggregation method (sum, avg, max, percentile)
- Cardinality limits (tenant sampling for high cardinality)
- Export destination (Prometheus, Datadog, CloudWatch)

### 2. Design Tenant-Scoped Dashboards

| Dashboard | Audience | Content | Refresh |
|-----------|----------|---------|---------|
| Platform Overview | Platform team | All tenants aggregated | 30s |
| Tenant Health | Tenant admin | Single tenant metrics | 1m |
| Model Version | ML team | Version comparison | 5m |
| Deployment Status | DevOps | Rollout progress | 15s |
| Cost Attribution | Finance | Usage per tenant | 1h |

Dashboard panels for each:

**Platform Overview:**
- Model version distribution (pie chart)
- Request rate by version (time series)
- Error rate by version (gauge)
- Active deployments (status)

**Tenant Health:**
- Request latency (histogram)
- Error breakdown (bar chart)
- Usage vs quota (gauge)
- Model version (info panel)

**Model Version:**
- A/B comparison metrics
- Canary vs baseline
- Quality metrics trend
- Cost per request

### 3. Configure Alerting Thresholds

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| High Latency | p99 > 3x baseline for 5m | Warning | Page on-call |
| Error Spike | Error rate > 2% for 3m | Critical | Page + escalate |
| Model Quality Drop | Accuracy < 90% baseline | Critical | Block deployment |
| Resource Exhaustion | GPU > 95% for 10m | Warning | Scale alert |
| Deployment Stalled | No progress for 30m | Warning | Notify DevOps |
| Tenant SLO Breach | SLO < target for 1h | Warning | Notify tenant |

Alert routing:

| Severity | Channel | Recipients | Escalation |
|----------|---------|------------|------------|
| Info | Slack #model-alerts | ML team | None |
| Warning | Slack + PagerDuty (low) | On-call | 30m to Critical |
| Critical | PagerDuty (high) + SMS | On-call + TL | 15m to management |
| Emergency | All channels | All stakeholders | Immediate |

### 4. Establish SLO Tracking Per Model Version

| SLO | Target | Measurement | Burn Rate Alert |
|-----|--------|-------------|-----------------|
| Availability | 99.9% | Successful requests / total | > 10x burn rate |
| Latency | 95% < 500ms | Request latency p95 | > 5x burn rate |
| Quality | 98% accuracy | Correct predictions | > 3x burn rate |
| Error Budget | 0.1% monthly | Errors allowed | > 50% consumed |

Configure:
- Error budget tracking per tenant tier
- SLO comparison across versions
- Historical SLO trend analysis
- Automated SLO reporting

**Verify current best practices with web search:**
Search the web: "ML model monitoring best practices {date}"
Search the web: "SLO tracking machine learning {date}"
Search the web: "multi-tenant observability patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the monitoring configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into metrics design and alerting strategy
- **P (Party Mode)**: Bring analyst and architect perspectives for monitoring review
- **C (Continue)**: Accept monitoring configuration and proceed to tenant notifications
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass monitoring context: metrics, dashboards, alerts, SLOs
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into monitoring configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review monitoring: {summary of metrics and alerting}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-tenant-notifications.md`

---

## Verification

- [ ] Model performance metrics defined
- [ ] Tenant-scoped dashboards designed
- [ ] Alerting thresholds configured
- [ ] SLO tracking established per version
- [ ] Alert routing documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Monitoring specification
- Dashboard configurations
- Alerting rules
- SLO definitions

---

## Next Step

Proceed to `step-08-c-tenant-notifications.md` to design tenant communication.
