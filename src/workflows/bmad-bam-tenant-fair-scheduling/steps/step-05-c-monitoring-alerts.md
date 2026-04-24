# Step 5: Monitoring and Alerts

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Set up noisy neighbor detection and alerting to identify and respond to resource contention issues before they impact tenant experience.

---

## Prerequisites

- Isolation mechanisms completed (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Noisy Neighbor Detection Metrics

Identify key metrics for detecting noisy neighbors:

| Metric | Description | Threshold (Warning) | Threshold (Critical) | Source |
|--------|-------------|---------------------|----------------------|--------|
| CPU Steal Time | CPU time stolen by other tenants | > 5% | > 15% | Node exporter |
| Memory Pressure | Memory contention indicator | > 50 | > 100 | cgroups |
| I/O Wait | Time waiting for I/O | > 10% | > 25% | iostat |
| Network Latency | Cross-tenant interference | > 10ms p99 | > 50ms p99 | Application |
| Queue Depth | Request queue backup | > 100 | > 500 | Load balancer |
| Throttle Events | Resource limit hits | > 10/min | > 50/min | Kubernetes |

### 2. Configure Alert Rules

Define alerting rules for noisy neighbor detection:

| Alert Name | Condition | Severity | Notification | Auto-Action |
|------------|-----------|----------|--------------|-------------|
| TenantCPUExceeded | cpu_usage > 80% for 5m | Warning | Slack | Log |
| TenantCPUCritical | cpu_usage > 95% for 2m | Critical | PagerDuty | Throttle |
| TenantMemoryPressure | memory_high > 90% for 5m | Warning | Email | None |
| TenantMemoryOOM | memory_max hit | Critical | PagerDuty | Evict + notify |
| NoisyNeighborDetected | neighbor_impact > 10% | Warning | Slack | Log + investigate |
| NoisyNeighborCritical | neighbor_impact > 25% | Critical | PagerDuty | Isolate tenant |
| QuotaExhausted | quota_usage >= 100% | Warning | Email | Notify tenant |

### 3. Design Detection Algorithms

Define algorithms for identifying noisy neighbors:

| Algorithm | Purpose | Implementation | Accuracy |
|-----------|---------|----------------|----------|
| Correlation Analysis | Link tenant activity to impact | Time-series correlation | High |
| Anomaly Detection | Identify unusual patterns | ML-based (Isolation Forest) | Medium |
| Threshold Breach | Simple limit violations | Rule-based | High |
| Trend Analysis | Predict resource exhaustion | Linear regression | Medium |
| Peer Comparison | Compare to similar tenants | Percentile ranking | Medium |

### 4. Configure Monitoring Dashboards

Define dashboards for resource fairness monitoring:

| Dashboard | Audience | Key Panels | Refresh |
|-----------|----------|------------|---------|
| Platform Overview | SRE | Total capacity, utilization, alerts | 30s |
| Tenant Health | SRE | Per-tenant resources, quotas, violations | 1m |
| Noisy Neighbor | SRE | Correlation matrix, impact scores | 1m |
| Tenant Self-Service | Tenant Admin | My usage, quotas, alerts | 5m |
| Capacity Planning | Platform Team | Trends, forecasts, recommendations | 1h |

### 5. Design Automated Remediation

Define automated actions for resource contention:

| Trigger | Action | Escalation | Rollback |
|---------|--------|------------|----------|
| CPU > 90% | Reduce CPU shares | Alert if sustained | Auto-restore after 5m |
| Memory > 95% | Kill non-critical processes | Alert ops | N/A |
| I/O > 80% | Throttle I/O operations | Alert if queues grow | Auto-restore |
| Network > 90% | Apply traffic shaping | Alert if packets drop | Auto-restore |
| Quota > 100% | Reject new requests | Notify tenant | N/A |
| Noisy Neighbor | Isolate to dedicated resources | Alert for review | Manual restore |

### 6. Define Incident Response Procedures

Document response procedures for resource issues:

| Severity | Response Time | Initial Action | Escalation Path |
|----------|---------------|----------------|-----------------|
| P1 (Critical) | 5 min | Auto-remediate + page | SRE -> Platform Lead |
| P2 (High) | 15 min | Investigate + remediate | SRE |
| P3 (Medium) | 1 hour | Review + plan | Platform Team |
| P4 (Low) | 24 hours | Document + track | Sprint backlog |

---

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/tenant-fair-scheduling.md`
- `{output_folder}/planning-artifacts/operations/fair-scheduling-runbook.md`

**Verify current best practices with web search:**
Search the web: "noisy neighbor detection alerting multi-tenant {date}"
Search the web: "resource contention monitoring Kubernetes {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the monitoring and alerts above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into alert tuning and incident response
- **P (Party Mode)**: Bring analyst and architect perspectives for monitoring review
- **C (Continue)**: Accept monitoring design and finalize fair scheduling
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass monitoring context: metrics, alerts, remediation
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into monitoring design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review monitoring and alerts: {summary of detection and response}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Generate final fair scheduling documentation

---

## Verification

- [ ] Detection metrics defined
- [ ] Alert rules configured
- [ ] Detection algorithms documented
- [ ] Monitoring dashboards designed
- [ ] Automated remediation defined
- [ ] Incident response procedures documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Noisy neighbor detection metrics
- Alert rule configurations
- Detection algorithm documentation
- Dashboard specifications
- Automated remediation playbook
- **Load template:** `{project-root}/_bmad/bam/data/templates/fair-scheduling-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/operational-runbook-template.md`

---

## Next Step

Proceed to `bmad-bam-tenant-capacity-planning` if capacity forecasting is needed, or validation mode to verify fair scheduling design.
