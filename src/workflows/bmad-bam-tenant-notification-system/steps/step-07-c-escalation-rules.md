# Step 7: Escalation Rules

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

Design notification escalation rules including triggers, escalation paths, on-call integration, and acknowledgment tracking.

---

## Prerequisites

- Step 6 completed with tracking/analytics
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `incident-management`

---


## Inputs

- Tracking/analytics design from Step 6
- Notification requirements from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Design the notification escalation system:

### Escalation Triggers

| Trigger | Condition | Notification Type | Priority |
|---------|-----------|-------------------|----------|
| Delivery Failure | 3+ consecutive failures | Operations alert | High |
| Bounce Rate Spike | >5% in 1 hour | Operations alert | Medium |
| Complaint Spike | >0.1% in 24 hours | Operations alert | Critical |
| Queue Backlog | >10,000 pending >15 min | Operations alert | High |
| Provider Outage | Health check fails | Operations alert | Critical |
| Tenant Quota Exceeded | 90% of limit | Tenant admin alert | Medium |
| Critical Unacked | No ack in SLA time | Escalation | Critical |

### Escalation Paths

| Notification Type | Level 1 | Level 2 | Level 3 |
|-------------------|---------|---------|---------|
| Security Alert | User | Tenant Admin | Tenant Admin + Platform |
| System Outage | Tenant Admin | Tenant Admin + Escalation | Executive Contact |
| Billing Critical | Billing Contact | Tenant Admin | Account Manager |
| AI Agent Critical | User | Team Lead | Tenant Admin |
| Platform Incident | Tenant Admin | All Admins | Broadcast |

**Escalation Timing:**

| Priority | Level 1 → 2 | Level 2 → 3 | Max Time |
|----------|-------------|-------------|----------|
| Critical | 5 minutes | 15 minutes | 30 minutes |
| High | 15 minutes | 1 hour | 4 hours |
| Medium | 1 hour | 4 hours | 24 hours |
| Low | 4 hours | 24 hours | 72 hours |

### On-Call Integration

| Integration | Provider | Capabilities |
|-------------|----------|--------------|
| PagerDuty | PagerDuty API | Incident creation, escalation |
| Opsgenie | Opsgenie API | Alert routing, schedules |
| Slack | Slack API | Channel alerts, ack buttons |
| Microsoft Teams | Teams Webhooks | Channel alerts, adaptive cards |
| Custom Webhook | HTTP | Generic integration |

**On-Call Configuration Schema:**

| Field | Type | Description |
|-------|------|-------------|
| tenant_id | UUID | Tenant scope |
| integration_type | enum | pagerduty, opsgenie, slack, teams, webhook |
| config | jsonb | Provider-specific configuration |
| routing_key | string | Service/routing key |
| escalation_policy_id | string | External escalation policy |
| enabled | boolean | Integration active |

### Acknowledgment and Resolution

| State | Description | Timeout Action |
|-------|-------------|----------------|
| triggered | Alert created | Escalate to L1 |
| acknowledged | L1 acknowledged | None (stop escalation) |
| investigating | Investigation started | None |
| resolved | Issue resolved | Close alert |
| auto_resolved | System resolved | Close alert |
| escalated | Moved to next level | Continue escalation |

**Acknowledgment Schema:**

| Field | Type | Description |
|-------|------|-------------|
| alert_id | UUID | Alert identifier |
| notification_id | UUID | Source notification |
| tenant_id | UUID | Tenant scope |
| severity | enum | critical, high, medium, low |
| state | enum | Current state |
| assigned_to | UUID | Current assignee |
| acknowledged_at | timestamp | Acknowledgment time |
| resolved_at | timestamp | Resolution time |
| resolution_notes | text | Resolution details |
| escalation_level | int | Current level |
| escalation_history | jsonb | Full escalation timeline |

### Tenant Escalation Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| escalation_enabled | Enable escalation | true |
| notification_channels | Channels for escalation | email, push |
| on_call_integration | External integration | null |
| escalation_contacts | Contact list by level | Empty |
| quiet_hours_override | Override quiet hours for critical | true |
| auto_resolve_threshold | Auto-resolve after success | 3 consecutive |

**Verify current best practices with web search:**
Search the web: "notification escalation patterns incident management {date}"
Search the web: "on-call integration PagerDuty Opsgenie {date}"
Search the web: "alert acknowledgment tracking systems {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the escalation rules design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into escalation paths and on-call integration
- **P (Party Mode)**: Bring analyst and architect perspectives for escalation review
- **C (Continue)**: Accept escalation rules and proceed to tenant branding
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass escalation context: triggers, paths, on-call integration
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into escalation design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review escalation rules: {summary of triggers and paths}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save escalation rules to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-tenant-branding.md`

---

## Verification

- [ ] Escalation triggers defined
- [ ] Escalation paths documented
- [ ] On-call integrations specified
- [ ] Acknowledgment tracking designed
- [ ] Tenant configuration options defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Escalation trigger definitions
- Escalation path configurations
- On-call integration specifications

---

## Next Step

Proceed to `step-08-c-tenant-branding.md` to design tenant notification branding.
