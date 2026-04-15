# Step 3: Chargeback Reports

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Design chargeback and showback reporting to provide tenants and internal stakeholders with clear visibility into costs.

---

## Prerequisites

- Step 2 completed: Allocation rules defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

### 1. Define Report Types

Identify required cost reports:

| Report | Audience | Purpose | Frequency |
|--------|----------|---------|-----------|
| Tenant Invoice | Customer | Billing | Monthly |
| Usage Summary | Customer | Visibility | Real-time |
| Cost Breakdown | Customer | Analysis | On-demand |
| Internal Showback | Product teams | Cost awareness | Weekly |
| Margin Analysis | Finance | Profitability | Monthly |
| Cost Trend | Leadership | Planning | Monthly |
| Anomaly Alert | Operations | Cost control | Real-time |

### 2. Design Tenant Invoice Report

Define invoice structure:

| Section | Content | Data Source |
|---------|---------|-------------|
| Header | Tenant info, period, totals | Billing system |
| Plan Charges | Base subscription fees | Billing system |
| Usage Charges | Metered usage by category | Metering system |
| AI Usage | LLM tokens, agent runs | AI metering |
| Overages | Usage above plan limits | Metering system |
| Credits | Promotional, SLA credits | Billing system |
| Taxes | Applicable taxes | Tax engine |
| Total Due | Final amount | Calculated |

### 3. Design Usage Dashboard

Define real-time usage visibility:

| Widget | Metrics | Visualization |
|--------|---------|---------------|
| Current Period | MTD spend, limit | Gauge |
| Usage by Category | Breakdown by type | Pie chart |
| Daily Trend | Spend over time | Line chart |
| Top Consumers | Highest cost items | Bar chart |
| Forecast | Projected month-end | Line + projection |
| Budget Alert | % of budget used | Status indicator |
| Plan Limits | Usage vs limits | Progress bars |

### 4. Design Internal Showback

Define internal cost allocation reports:

| Report | Content | Audience | Frequency |
|--------|---------|----------|-----------|
| Team costs | Costs by product team | Engineering leads | Weekly |
| Feature costs | Cost per feature | Product managers | Monthly |
| Environment costs | Dev/staging/prod | Engineering | Weekly |
| Customer profitability | Revenue vs cost | Finance | Monthly |
| Trend analysis | Cost changes | Leadership | Monthly |

### 5. Design Cost Alerts

Define proactive cost notifications:

| Alert | Condition | Recipient | Channel |
|-------|-----------|-----------|---------|
| Budget warning | > 80% of budget | Tenant admin | Email |
| Budget exceeded | > 100% of budget | Tenant admin | Email + SMS |
| Anomaly detected | > 2x normal spend | Tenant admin + Ops | Email + Slack |
| Spike alert | > 50% increase in 1h | Operations | PagerDuty |
| Forecast breach | Projected > limit | Tenant admin | Email |

### 6. Design Self-Service Portal

Define tenant cost portal features:

| Feature | Description | Access Level |
|---------|-------------|--------------|
| Current usage | Real-time metering | All users |
| Historical reports | Past invoices, usage | Admin |
| Cost breakdown | Detailed analysis | Admin |
| Export | Download CSV/PDF | Admin |
| Budget setting | Set spend alerts | Admin |
| Forecast | Projected costs | Admin |
| Recommendations | Cost optimization tips | Admin |

**Verify current best practices with web search:**
Search the web: "SaaS billing and invoicing best practices {date}"
Search the web: "cost transparency dashboard design {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the reporting design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific report formats
- **P (Party Mode)**: Bring finance and UX perspectives
- **C (Continue)**: Accept reports and proceed to optimization
- **[Specific refinements]**: Describe reporting concerns

Select an option:
```

#### If 'C' (Continue):
- Save chargeback reports to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-optimization.md`

---

## Verification

- [ ] Report types defined
- [ ] Invoice format designed
- [ ] Usage dashboard specified
- [ ] Internal showback designed
- [ ] Cost alerts configured
- [ ] Self-service portal designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Report type catalog
- Invoice template design
- Usage dashboard specification
- Internal showback reports
- Alert configuration
- Self-service portal design

---

## Next Step

Proceed to `step-04-c-optimization.md` to design cost optimization.
