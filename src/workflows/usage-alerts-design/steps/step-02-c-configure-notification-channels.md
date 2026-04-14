# Step 2: Configure Notification Channels

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Design multi-channel notification delivery for usage alerts.

---

## Prerequisites

- Alert thresholds defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: notification

---

## Actions

### 1. Configure Email Notifications

| Alert Level | Email Type | Recipients |
|-------------|------------|------------|
| Informational | Digest | Billing contact |
| Warning | Individual | Billing + admin |
| Critical | Immediate | All stakeholders |

### 2. Configure In-App Notifications

| Location | Persistence | Dismissible |
|----------|-------------|-------------|
| Dashboard banner | Until resolved | No |
| Toast notification | 10 seconds | Yes |
| Navigation badge | Until read | Yes |

### 3. Configure Webhook Integrations

| Event Type | Payload | Retry Policy |
|------------|---------|--------------|
| threshold.warning | Full details | 3 retries |
| threshold.critical | Full details | 5 retries |
| threshold.exceeded | Full details | 5 retries |

### 4. Configure SMS for Critical

| Trigger | Recipients | Rate Limit |
|---------|------------|------------|
| 100% exceeded | Primary contact | 1/hour |
| Payment failed | Billing contact | 1/event |

**Verify current best practices with web search:**
Search the web: "multi-channel notification design patterns {date}"
Search the web: "SaaS billing notification best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into notification channels
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept channels and proceed to escalation

Select an option:
```

---

## Verification

- [ ] Email notifications configured
- [ ] In-app notifications designed
- [ ] Webhooks specified
- [ ] SMS for critical alerts configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Notification channel specification
- Channel configuration matrix

---

## Next Step

Proceed to `step-03-c-design-escalation-paths.md` to configure escalation rules.
