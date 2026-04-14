# Step 2: Monitoring Activation Verification

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


---

## Purpose

Verify that monitoring systems are active and receiving data from the deployed application. This includes dashboard activation, metric collection, log aggregation, and alerting rule verification.

---

## Prerequisites

- Step 1 completed (smoke tests executed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `alerting`

---

## Inputs

- Monitoring system endpoints (Prometheus, Grafana, etc.)
- Expected metrics and dashboards
- Alert rule definitions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Verify Metric Collection

Check that key metrics are being collected:

| Metric Category | Example Metrics | Source | Status |
|-----------------|-----------------|--------|--------|
| Application | request_count, latency_p99 | Prometheus | [ ] |
| Infrastructure | cpu_usage, memory_usage | Node Exporter | [ ] |
| Tenant | tenant_request_count, tenant_errors | Custom | [ ] |
| AI Runtime | agent_invocations, token_usage | AI Service | [ ] |

### 2. Validate Dashboard Activation

For each critical dashboard:
- Verify dashboard loads without errors
- Confirm live data is being displayed
- Check tenant filtering functionality
- Validate time range selection works

### 3. Test Alert Rules

For critical alerting rules:
- Verify alert rule is active in Alertmanager
- If possible, trigger test alert
- Confirm notification channels (Slack, PagerDuty, email)
- Validate alert routing to correct teams

| Alert Rule | Severity | Notification Channel | Test Status |
|------------|----------|---------------------|-------------|
| High Error Rate | Critical | PagerDuty | [ ] |
| Latency SLA Breach | Warning | Slack | [ ] |
| Tenant Quota Exceeded | Info | Email | [ ] |

### 4. Log Aggregation Check

Verify log aggregation pipeline:
- Application logs appearing in log system
- Tenant context present in log entries
- Log parsing and indexing working
- Search functionality operational

**Verify current best practices with web search:**
Search the web: "production monitoring activation checklist {date}"
Search the web: "observability verification post-deployment {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing monitoring verification, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into monitoring coverage and gaps
- **P (Party Mode)**: Bring SRE and DevOps perspectives for monitoring review
- **C (Continue)**: Accept monitoring status and proceed to tenant health checks
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass monitoring context: metrics collected, dashboards active, alert status
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into monitoring report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review monitoring activation: {summary of metrics, dashboards, alerts}"
- Process collaborative analysis from SRE and DevOps personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring status to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-health-checks.md`

---

## Verification

- [ ] All critical metrics being collected
- [ ] Dashboards loading with live data
- [ ] Alert rules active and tested
- [ ] Log aggregation operational
- [ ] Patterns align with pattern registry

---

## Outputs

- Monitoring activation status report
- Dashboard verification results
- Alert rule test results
- Log aggregation status

---

## Next Step

Proceed to `step-03-c-tenant-health-checks.md` to verify per-tenant health status.
