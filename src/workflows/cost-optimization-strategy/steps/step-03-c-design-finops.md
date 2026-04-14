# Step 3: Design FinOps Practices

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

Design FinOps practices and governance for sustainable cost optimization.

---

## Prerequisites

- Step 2 completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: finops

---

## Actions

### 1. FinOps Maturity Model

| Phase | Capabilities | Focus Areas |
|-------|--------------|-------------|
| Crawl | Basic visibility, tagging | Cost awareness |
| Walk | Allocation, forecasting | Cost optimization |
| Run | Automation, unit economics | Cost efficiency |

### 2. Cost Governance Framework

| Component | Description | Frequency |
|-----------|-------------|-----------|
| Cost reviews | Team cost performance reviews | Weekly |
| Budget alerts | Automated threshold notifications | Real-time |
| Approval workflows | Cost-impacting change approvals | Per change |
| Chargeback reports | Tenant cost allocation reports | Monthly |
| Optimization sprints | Dedicated cost reduction efforts | Quarterly |

### 3. Cost Visibility Tools

| Tool Category | Purpose | Examples |
|---------------|---------|----------|
| Cost explorer | Ad-hoc cost analysis | Cloud native, Kubecost |
| Dashboards | Real-time visibility | Grafana, custom |
| Alerts | Anomaly detection | PagerDuty, custom |
| Reports | Scheduled summaries | Email, Slack |
| Forecasting | Budget prediction | ML-based |

### 4. Unit Economics Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Cost per tenant | Total cost / Active tenants | Decrease over time |
| Cost per API call | Infra cost / API requests | < $0.001 |
| LLM cost per query | LLM spend / LLM queries | < $0.01 |
| Gross margin | (Revenue - COGS) / Revenue | > 70% |
| CAC payback | CAC / Monthly revenue | < 12 months |

**Verify current best practices with web search:**
Search the web: "FinOps framework best practices {date}"
Search the web: "SaaS unit economics optimization {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing FinOps design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into FinOps governance
- **P (Party Mode)**: Bring finance and engineering perspectives for review
- **C (Continue)**: Accept FinOps practices and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save FinOps practices to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-assembly.md`

---

## Verification

- [ ] FinOps maturity model defined
- [ ] Governance framework documented
- [ ] Visibility tools specified
- [ ] Unit economics metrics established
- [ ] Patterns align with pattern registry

---

## Outputs

- FinOps practices framework
- Governance structure
- Unit economics dashboard spec

---

## Next Step

Proceed to `step-04-c-assembly.md` to assemble final document.
