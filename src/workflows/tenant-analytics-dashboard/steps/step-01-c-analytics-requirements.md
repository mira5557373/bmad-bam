# Step 1: Analytics Requirements

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- REFERENCE Reference pattern registry `web_queries` for search topics


---

## Purpose

Define the analytics requirements for the multi-tenant SaaS platform including KPIs, metrics, and reporting needs.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: analytics,dashboard

---


## Inputs

- User requirements and constraints for tenant analytics
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define the analytics requirements for the multi-tenant SaaS platform:

## Business Analytics Requirements

| Category | Metrics | Purpose | Audience |
|----------|---------|---------|----------|
| Usage Analytics | API calls, storage, compute | Track resource consumption | Tenant Admin |
| Engagement Analytics | Active users, sessions, features used | Measure product adoption | Product Team |
| Revenue Analytics | MRR, churn, expansion | Business performance | Leadership |
| Operational Analytics | Latency, errors, uptime | Platform health | Operations |

## Tenant-Facing Analytics

| Metric Category | Description | Refresh Rate |
|-----------------|-------------|--------------|
| Usage Summary | API calls, storage, active users | Real-time |
| Cost Breakdown | Resource consumption by service | Daily |
| Performance Trends | Latency, error rates over time | Hourly |
| AI Agent Metrics | Token usage, success rates, cost | Real-time |

## Platform Analytics (Internal)

| Metric Category | Description | Aggregation |
|-----------------|-------------|-------------|
| Tenant Health | Per-tenant health scores | Real-time |
| Capacity Planning | Resource utilization forecasts | Weekly |
| Revenue Attribution | Revenue by tier, feature, region | Daily |
| Churn Indicators | Early warning signals | Daily |

## Analytics KPIs

Define key performance indicators:

| KPI | Definition | Target | Alert Threshold |
|-----|------------|--------|-----------------|
| Monthly Active Tenants | Tenants with activity in last 30 days | Growth > 10% | Decline > 5% |
| Net Revenue Retention | Expansion - Churn - Contraction | > 120% | < 100% |
| Platform Uptime | % time all services available | 99.9% | < 99.5% |
| Tenant Satisfaction | NPS score from tenant surveys | > 50 | < 30 |

## Data Sources

Identify data sources for analytics:

| Source | Data Type | Volume | Latency |
|--------|-----------|--------|---------|
| Application Events | User actions, API calls | High | < 1 min |
| System Metrics | CPU, memory, network | Medium | Real-time |
| Billing Events | Charges, payments | Low | < 5 min |
| AI Runtime Logs | Inference, tool calls | High | < 1 min |

**Verify current best practices with web search:**
Search the web: "SaaS analytics requirements multi-tenant platforms {date}"
Search the web: "tenant analytics KPIs best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After defining analytics requirements, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific KPIs or data source requirements
- **P (Party Mode)**: Bring product manager and data analyst perspectives on analytics needs
- **C (Continue)**: Accept analytics requirements and proceed to data aggregation strategy
- **[Specific refinements]**: Describe additional requirements to consider

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: analytics requirements, KPIs, data sources
- Process enhanced insights on analytics needs
- Ask user: "Accept this detailed analytics analysis? (y/n)"
- If yes, integrate into requirements catalog
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review analytics requirements for multi-tenant dashboard"
- Process product manager and data analyst perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save analytics requirements catalog to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-data-aggregation-strategy.md`

---

## Verification

- [ ] Business analytics requirements defined
- [ ] Tenant-facing analytics identified
- [ ] Platform analytics specified
- [ ] Analytics KPIs established
- [ ] Data sources mapped
- [ ] Patterns align with pattern registry

---

## Outputs

- Analytics requirements catalog
- KPI definitions document

---

## Next Step

Proceed to `step-02-c-data-aggregation-strategy.md` to define data aggregation strategy.
