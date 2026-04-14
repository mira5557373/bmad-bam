# Step 6: Tracking and Analytics

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design notification tracking, delivery analytics, and A/B testing capabilities with tenant-scoped visibility.

---

## Prerequisites

- Step 5 completed with delivery infrastructure
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`

---


## Inputs

- Delivery infrastructure from Step 5
- Channel design from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Design the notification tracking and analytics system:

### Delivery Status Tracking

| Status | Description | Timestamp | Source |
|--------|-------------|-----------|--------|
| created | Notification request received | created_at | System |
| queued | Added to delivery queue | queued_at | Queue |
| processing | Being processed by worker | processing_at | Worker |
| sent | Sent to provider | sent_at | Provider API |
| delivered | Confirmed delivery | delivered_at | Webhook |
| opened | Recipient opened (email/push) | opened_at | Tracking pixel/callback |
| clicked | Recipient clicked link | clicked_at | Link tracking |
| bounced | Delivery failed (hard/soft) | bounced_at | Webhook |
| complained | Marked as spam | complained_at | Feedback loop |
| unsubscribed | Recipient opted out | unsubscribed_at | Link tracking |

**Tracking Schema:**

| Field | Type | Description |
|-------|------|-------------|
| notification_id | UUID | Unique notification identifier |
| tenant_id | UUID | Tenant isolation key |
| user_id | UUID | Recipient user |
| channel | enum | Delivery channel |
| template_id | UUID | Template used |
| status | enum | Current status |
| status_history | jsonb | Full status timeline |
| metadata | jsonb | Channel-specific metadata |
| error_message | text | Failure details (if any) |

### Analytics Metrics

| Metric | Calculation | Aggregation | Tenant Scope |
|--------|-------------|-------------|--------------|
| Delivery Rate | delivered / sent | By channel, template | Per tenant |
| Open Rate | opened / delivered | By template, time | Per tenant |
| Click Rate | clicked / opened | By template, link | Per tenant |
| Bounce Rate | bounced / sent | By domain, type | Per tenant |
| Complaint Rate | complained / delivered | By template | Per tenant |
| Unsubscribe Rate | unsubscribed / delivered | By category | Per tenant |

**Analytics Storage:**
- Real-time: Redis counters for current metrics
- Historical: ClickHouse for time-series aggregations
- Raw events: S3/data lake for detailed analysis

### Tenant Analytics Dashboard

| Widget | Metrics | Time Range | Drill-down |
|--------|---------|------------|------------|
| Delivery Overview | Sent, delivered, failed | Last 24h/7d/30d | By channel |
| Engagement | Opens, clicks by template | Last 7d/30d | By template |
| Channel Health | Bounce rate, complaints | Last 30d | By domain |
| Quota Usage | Used vs limit per channel | Current period | By channel |
| Top Templates | Most used templates | Last 30d | By category |

### A/B Testing

| Component | Description | Implementation |
|-----------|-------------|----------------|
| Variant Definition | Define test variants | Template variant tagging |
| Traffic Split | Assign users to variants | Consistent hashing on user_id |
| Metrics Collection | Track per-variant | Variant tag in tracking |
| Statistical Analysis | Significance calculation | Bayesian or frequentist |
| Winner Selection | Auto or manual | Threshold-based automation |

**A/B Test Schema:**

| Field | Type | Description |
|-------|------|-------------|
| test_id | UUID | Test identifier |
| tenant_id | UUID | Tenant scope |
| name | string | Test name |
| variants | jsonb | Variant definitions |
| traffic_split | jsonb | Percentage per variant |
| metrics | array | Metrics to track |
| status | enum | draft, running, completed |
| winner | UUID | Winning variant (if completed) |
| start_date | timestamp | Test start |
| end_date | timestamp | Test end |

### Privacy and Data Retention

| Data Type | Retention Period | Anonymization | GDPR Basis |
|-----------|-----------------|---------------|------------|
| Tracking events | 90 days | After 90 days | Legitimate interest |
| Aggregated metrics | 2 years | N/A (aggregated) | Legitimate interest |
| User preferences | Until deletion | On user deletion | Consent |
| A/B test results | 1 year | After analysis | Legitimate interest |

**Verify current best practices with web search:**
Search the web: "email tracking analytics best practices {date}"
Search the web: "notification A/B testing implementation {date}"
Search the web: "multi-tenant analytics dashboard design {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tracking and analytics design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into analytics architecture and A/B testing
- **P (Party Mode)**: Bring analyst and architect perspectives for analytics review
- **C (Continue)**: Accept tracking/analytics design and proceed to escalation rules
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass analytics context: tracking, metrics, A/B testing
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into analytics design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tracking analytics: {summary of metrics and A/B testing}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tracking/analytics design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-escalation-rules.md`

---

## Verification

- [ ] Delivery status tracking defined
- [ ] Analytics metrics documented
- [ ] Tenant dashboard designed
- [ ] A/B testing capability specified
- [ ] Data retention policies defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Tracking schema specification
- Analytics metrics catalog
- A/B testing design

---

## Next Step

Proceed to `step-07-c-escalation-rules.md` to design notification escalation rules.
