# Step 8: Document Reporting Obligations

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

Create SLA reporting requirements including report frequency, content specifications, delivery methods, and customer communication obligations.

---

## Prerequisites

- Step 7 (Design Monitoring Requirements) completed
- Monitoring requirements documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `reporting`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `communication`

---

## Inputs

- Monitoring requirements from Step 7
- Dashboard specifications
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Compliance reporting requirements

---

## Actions

### 1. Define Report Types

Establish SLA report categories:

| Report Type | Purpose | Audience | Content |
|-------------|---------|----------|---------|
| Monthly SLA Report | Performance summary | Customers | Availability, latency, credits |
| Incident Report | Breach documentation | Affected customers | Root cause, timeline, remediation |
| Quarterly Business Review | Strategic review | Enterprise customers | Trends, roadmap, optimization |
| Annual Compliance Report | Audit support | Enterprise/Legal | SOC 2, compliance status |
| Real-time Status | Current platform state | All customers | Health, active incidents |

### 2. Define Monthly SLA Report Contents

Establish monthly report structure:

| Section | Content | Format |
|---------|---------|--------|
| Executive Summary | Overall SLA performance | Text + key metrics |
| Availability | Uptime % by service | Chart + table |
| Latency | P50/P95/P99 performance | Time series chart |
| Throughput | Request volumes | Usage chart |
| Incidents | List of incidents | Table with details |
| Credits | Applied/pending credits | Financial summary |
| Trends | Month-over-month comparison | Trend charts |
| Recommendations | Optimization suggestions | Actionable items |

### 3. Define Incident Report Requirements

Establish incident report structure:

| Section | Content | Timeframe |
|---------|---------|-----------|
| Summary | Brief description | Within 30 minutes |
| Timeline | Event sequence | Within 4 hours |
| Impact | Affected tenants/services | Within 4 hours |
| Root Cause | Technical analysis | Within 5 business days |
| Remediation | Actions taken | Within 5 business days |
| Prevention | Future prevention steps | Within 5 business days |
| Customer Impact | Per-customer analysis | Within 10 business days |

### 4. Define Report Delivery Schedule

Establish report delivery requirements:

| Report | Frequency | Delivery Method | Delivery Time |
|--------|-----------|-----------------|---------------|
| Monthly SLA | Monthly | Portal + Email | 5th of month |
| Incident Report | Per incident | Email + Portal | Per schedule above |
| Quarterly Review | Quarterly | Meeting + Document | Within 2 weeks of quarter end |
| Annual Compliance | Annually | Secure portal | Within 30 days of audit |
| Real-time Status | Continuous | Status page | Real-time |

### 5. Define Status Page Requirements

Establish public status page specifications:

| Component | Requirement | Update Frequency |
|-----------|-------------|------------------|
| Overall Status | Green/Yellow/Red indicator | Real-time |
| Service Components | Status per service | Real-time |
| Incident History | Last 90 days | Per incident |
| Scheduled Maintenance | Upcoming maintenance | As scheduled |
| Historical Uptime | 90-day graph | Daily |
| Subscription | Email/webhook notifications | Per event |

### 6. Define Communication Obligations

Establish proactive communication requirements:

| Event | Notification Requirement | Channel | Timing |
|-------|-------------------------|---------|--------|
| P1 Incident Start | All affected tenants | Email, Status Page, SMS (Enterprise) | <15 minutes |
| P1 Update | All affected tenants | Email, Status Page | Every 30 minutes |
| P1 Resolution | All affected tenants | Email, Status Page | Within 1 hour |
| P2 Incident | Affected Enterprise tenants | Email, Status Page | <30 minutes |
| Maintenance Window | All affected tenants | Email, In-app | 72 hours advance |
| Emergency Maintenance | All tenants | Email, Status Page, SMS | ASAP, min 1 hour |
| SLA Credit Issued | Affected tenant | Email | Within billing cycle |
| SLA Near-Breach | Internal (Enterprise: customer) | Internal alert, Email | Immediate |

### 7. Define Report Access Controls

Establish report access by tier:

| Report | Free | Starter | Pro | Enterprise | Premium |
|--------|------|---------|-----|------------|---------|
| Real-time Status | Public page | Public page | Full dashboard | Full + private | Full + private + API |
| Monthly SLA | Self-service | Self-service | Portal | Portal + PDF | Portal + PDF + API |
| Incident Reports | Public only | Public only | Full | Full + RCA | Full + RCA + call |
| Quarterly Review | N/A | N/A | Optional | Included | Included + custom |
| Compliance Docs | N/A | N/A | Request | Included | Included + custom |

### 8. Define Data Export Requirements

Establish SLA data export capabilities:

| Export Type | Format | Availability | Retention |
|-------------|--------|--------------|-----------|
| Monthly Report | PDF, CSV | All paid tiers | 13 months |
| Raw Metrics | CSV, JSON | Pro+ | 90 days |
| API Access | JSON | Enterprise+ | Real-time |
| Bulk Export | CSV | Enterprise+ | 7 years |
| Audit Trail | JSON | Enterprise+ | 7 years |

**Verify current best practices with web search:**
Search the web: "SLA reporting best practices SaaS {date}"
Search the web: "incident communication customer obligations {date}"
Search the web: "status page design patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the reporting obligations above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific report contents and delivery mechanisms
- **P (Party Mode)**: Bring customer success and communications perspectives for reporting review
- **C (Continue)**: Accept reporting obligations and proceed to SLA feasibility validation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: report types, delivery schedules, communication obligations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into reporting obligations
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review reporting obligations: {summary of reports, delivery, communications}"
- Process collaborative analysis from customer success and communications personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save reporting obligations to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-validate-sla-feasibility.md`

---

## Verification

- [ ] All report types defined
- [ ] Monthly report contents specified
- [ ] Incident report structure documented
- [ ] Delivery schedule established
- [ ] Status page requirements defined
- [ ] Communication obligations documented
- [ ] Access controls established
- [ ] Data export capabilities defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Report specifications document
- Communication obligations matrix
- Status page requirements
- Data export specifications

---

## Next Step

Proceed to `step-09-c-validate-sla-feasibility.md` to verify SLAs are achievable.
