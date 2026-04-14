# Step 3: Design Escalation Paths

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

Configure escalation rules and automatic action triggers.

---

## Prerequisites

- Notification channels configured (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

### 1. Define Self-Service Resolution Paths

| Alert | Self-Service Action | Location |
|-------|---------------------|----------|
| Approaching limit | Upgrade tier | Dashboard |
| Budget reached | Increase budget | Settings |
| Quota exceeded | Purchase add-on | Billing page |

### 2. Configure Admin Escalation

| Trigger | Escalation | Timing |
|---------|------------|--------|
| No action after 24h | Email admin | Auto |
| Critical unresolved | Email manager | 4 hours |
| Payment issue | Account management | Immediate |

### 3. Design Automatic Actions

| Trigger | Action | Approval |
|---------|--------|----------|
| Hard limit reached | Throttle API | Automatic |
| Budget exceeded | Notify + continue | Automatic |
| Payment failed | Grace period | Automatic |

### 4. Configure Account Management Alerts

| Scenario | Alert To | Action |
|----------|----------|--------|
| Enterprise at 90% | CSM | Proactive outreach |
| High-value churn risk | Sales | Retention call |
| Sustained overage | Success | Upsell opportunity |

**Verify current best practices with web search:**
Search the web: "usage alert escalation patterns enterprise {date}"
Search the web: "SaaS customer success alerting {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into escalation design
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept escalation paths and complete Create mode

Select an option:
```

---

## Soft Gate Checkpoint

**Steps 1-3 complete the usage alerts design.**

Present summary of:
- Alert thresholds
- Notification channels
- Escalation paths

Ask for confirmation before proceeding to Edit or Validate modes.

---

## Verification

- [ ] Self-service paths defined
- [ ] Admin escalation configured
- [ ] Automatic actions specified
- [ ] Account management alerts designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Escalation path specification
- Automatic action rules
- **Load template:** `{project-root}/_bmad/bam/templates/usage-alerts-template.md`

---

## Next Step

Create mode complete. Proceed to Edit mode (`step-10-e-load-existing.md`) or Validate mode (`step-20-v-load-artifact.md`).
