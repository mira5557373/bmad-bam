# Step 4: Budget Alert Configuration

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Configure budget thresholds, alert routing, anomaly detection, and cost forecasting for proactive cost management.

---

## Prerequisites

- Tenant cost attribution verified (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: cost

---

## Actions

### 1. Budget Thresholds by Category

| Category | Monthly Budget | Warning (80%) | Critical (100%) | Current |
|----------|---------------|---------------|-----------------|---------|
| Total | ${value} | ${value} | ${value} | ${value} |
| Compute | ${value} | ${value} | ${value} | ${value} |
| AI/LLM | ${value} | ${value} | ${value} | ${value} |
| Database | ${value} | ${value} | ${value} | ${value} |
| Free tier | ${value} | ${value} | ${value} | ${value} |

### 2. Alert Routing

| Alert Type | Channel | Recipients | Escalation |
|------------|---------|------------|------------|
| Budget warning (80%) | Slack | #finance-alerts | None |
| Budget critical (100%) | Slack + Email | Finance team | Eng lead |
| AI overspend | PagerDuty | AI team | Eng lead |
| Anomaly detected | Slack | #cost-alerts | Finance |

### 3. Anomaly Detection

| Detection Type | Threshold | Window | Status |
|----------------|-----------|--------|--------|
| Daily spend spike | > {x}% above average | 24h | Enabled/Disabled |
| AI usage spike | > {x}% above average | 1h | Enabled/Disabled |
| New high-cost tenant | > ${value}/day | Daily | Enabled/Disabled |
| Runaway job detection | > ${value}/hour | 1h | Enabled/Disabled |

### 4. Forecasting Setup

| Forecast | Method | Frequency | Accuracy |
|----------|--------|-----------|----------|
| Monthly cost forecast | Linear regression | Weekly | {%} |
| AI cost forecast | Usage-based | Daily | {%} |
| Capacity cost forecast | Growth-based | Monthly | {%} |

**Verify current best practices with web search:**
Search the web: "FinOps budget alerts best practices {date}"
Search the web: "cloud cost anomaly detection {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into alert configuration
- **P (Party Mode)**: Bring finance and SRE perspectives
- **C (Continue)**: Finalize cost optimization review
- **[Specific refinements]**: Describe alert concerns

Select an option:
```

#### If 'C' (Continue):
- Save budget alert configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Mark workflow as complete

---

## Verification

- [ ] Budget thresholds set
- [ ] Alert routing configured
- [ ] Anomaly detection enabled
- [ ] Forecasting set up

---

## Outputs

- Budget alert configuration
- Cost optimization review summary
- **Load template:** `{project-root}/_bmad/bam/data/templates/cost-optimization-template.md`

---

## Workflow Complete

The cost optimization review workflow is complete. Key artifacts produced:
- Cost optimization review: `{output_folder}/operations/cost/cost-optimization-review-{date}.md`
- Optimization recommendations: `{output_folder}/operations/cost/optimization-recommendations-{date}.md`

Next steps:
- Prioritize and implement optimization opportunities
- Monitor budget alerts
- Schedule next cost review
- Consider running `validate` mode to verify QG-CS1 compliance
