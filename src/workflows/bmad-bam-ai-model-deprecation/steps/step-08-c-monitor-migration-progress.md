# Step 8: Monitor Migration Progress

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOOP **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- WRITE Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics

---

## Purpose

Track tenant migration progress in real-time, identify at-risk tenants, measure migration health, and provide stakeholder visibility into deprecation timeline adherence.

---

## Prerequisites

- Step 07 (Implement Fallback Routing) completed
- Migration tracking infrastructure deployed
- Routing telemetry flowing
- Tenant migration registry established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv`

---

## Actions

### 1. Establish Migration Tracking Dashboard

Create real-time visibility into migration status:

| Dashboard View | Metrics | Audience | Refresh Rate |
|----------------|---------|----------|--------------|
| Executive summary | % migrated, timeline status | Leadership | Daily |
| Tier breakdown | Per-tier progress | Product | Hourly |
| Tenant detail | Individual tenant status | Support | Real-time |
| Technical health | Error rates, latency | Engineering | Real-time |
| Risk indicators | At-risk tenant list | Operations | Hourly |

### 2. Define Migration Status States

Track tenants through migration lifecycle:

| Status | Description | Criteria | Actions Available |
|--------|-------------|----------|-------------------|
| Not Started | No migration activity | No replacement model usage | Notify, assist |
| In Progress | Active migration | <100% on replacement | Monitor, support |
| Migrated | Fully on replacement | 100% on replacement | Verify, close |
| Verified | Migration validated | Quality checks passed | Mark complete |
| Blocked | Migration issue | Error/support ticket | Escalate, assist |
| Opted Out | Formal exception | Documented exception | Track separately |

### 3. Track Per-Tenant Migration Progress

Monitor individual tenant migration:

| Tenant | Tier | Status | % Migrated | Last Activity | Days Remaining | Risk |
|--------|------|--------|------------|---------------|----------------|------|
| {name} | {tier} | {status} | {%} | {date} | {days} | {risk} |

Progress indicators:
- Request volume on deprecated vs. replacement model
- Configuration changes indicating migration
- Support ticket activity
- Self-reported status

### 4. Monitor Migration Health Metrics

Track overall migration health:

| Metric | Target | Current | Trend | Alert Status |
|--------|--------|---------|-------|--------------|
| Overall migration % | 100% by {date} | {%} | {trend} | {status} |
| Daily migration velocity | {%}/day | {%}/day | {trend} | {status} |
| Active migrations | {count} | {count} | {trend} | {status} |
| Blocked migrations | 0 | {count} | {trend} | {status} |
| Error rate delta | <5% increase | {%} | {trend} | {status} |
| Latency delta | <10% increase | {%} | {trend} | {status} |

### 5. Identify At-Risk Tenants

Flag tenants requiring intervention:

| Risk Level | Criteria | Tenant Count | Intervention |
|------------|----------|--------------|--------------|
| Critical | <30 days, 0% migrated, high usage | {count} | Executive escalation |
| High | <30 days, <50% migrated | {count} | Dedicated support |
| Medium | <60 days, <75% migrated | {count} | Proactive outreach |
| Low | On track for timeline | {count} | Continue monitoring |

### 6. Generate Progress Reports

Create regular reporting cadence:

| Report | Frequency | Audience | Contents | Delivery |
|--------|-----------|----------|----------|----------|
| Daily summary | Daily | Engineering | Key metrics, blockers | Slack |
| Weekly progress | Weekly | Product/Engineering | Trend analysis, risks | Email |
| Executive update | Bi-weekly | Leadership | High-level status | Meeting |
| Tenant status | On-demand | Support | Individual detail | Portal |

### 7. Track Quality Indicators

Monitor migration quality, not just quantity:

| Quality Metric | Measurement | Target | Current | Action if Below |
|----------------|-------------|--------|---------|-----------------|
| Post-migration errors | Error rate 7 days post | <baseline+1% | {%} | Investigation |
| Performance regression | Latency comparison | <baseline+5% | {%} | Optimization |
| User satisfaction | Survey/NPS | >4/5 | {score} | Feedback review |
| Rollback rate | Tenants reverting | <5% | {%} | Root cause analysis |
| Support tickets | Migration-related | <10/day | {count} | Doc improvement |

### 8. Configure Automated Alerts

Set up proactive alerting:

| Alert | Condition | Severity | Recipients | Response |
|-------|-----------|----------|------------|----------|
| Migration stalled | No progress 7 days | Warning | Support | Outreach |
| Tenant blocked | Status = Blocked | High | Engineering | Investigate |
| Timeline at risk | Projected miss | Critical | Leadership | Escalation |
| Error spike | >2x baseline | High | Engineering | Debug |
| Bulk regression | >10 tenants impacted | Critical | All hands | War room |

**Verify current best practices with web search:**
Search the web: "migration tracking dashboard best practices {date}"
Search the web: "SaaS deprecation monitoring patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into tracking methodology
- **[P] Party Mode**: Collaborative dashboard design
- **[C] Continue**: Proceed to model decommissioning

### Menu Options

### [A]nalyze Options
- **A1**: Analyze migration velocity trends
- **A2**: Review at-risk tenant patterns
- **A3**: Evaluate quality metrics accuracy
- **A4**: Assess alert effectiveness

### [P]ropose Changes
- **P1**: Propose additional tracking metrics
- **P2**: Suggest dashboard improvements
- **P3**: Recommend report format changes
- **P4**: Identify automation opportunities

### [C]ontinue
- **C1**: Confirm monitoring operational and proceed
- **C2**: Mark step complete and load `09-decommission-deprecated-model.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Migration dashboard deployed and accessible
- [ ] Status states defined and tracked
- [ ] Per-tenant progress visible
- [ ] Health metrics monitored
- [ ] At-risk tenants identified
- [ ] Reporting cadence established
- [ ] Quality indicators tracked
- [ ] Automated alerts configured

---

## Outputs

- Migration tracking dashboard
- Status state definitions
- Per-tenant progress report
- Health metrics dashboard
- At-risk tenant list
- Report templates and schedule
- Quality metrics dashboard
- Alert configuration document

---

## Next Step

Proceed to `step-09-c-decommission-deprecated-model.md` for safe model removal.
