# Step 3: Design Alerting

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

---

## Purpose

Design alerting strategy for proactive tenant health management.

---

## Prerequisites

- Step 2 completed (Health scoring defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`

---

## Actions

### 1. Alert Severity Levels

| Severity | Condition | Response Time | Notification |
|----------|-----------|---------------|--------------|
| Critical | Score < 40 | Immediate | PagerDuty + Slack |
| High | Score < 60 | 1 hour | Slack + Email |
| Medium | Score < 75 | 4 hours | Email |
| Low | Declining trend | Next business day | Dashboard |

### 2. Alert Rules

| Alert | Condition | Tier Context | Channel |
|-------|-----------|--------------|---------|
| Availability SLO breach | Uptime < SLO | Per tier | Critical |
| Performance degradation | P95 > 2x baseline | All | High |
| Rapid score decline | -15 points/day | All | High |
| Quota approaching | > 90% usage | All | Medium |
| Engagement drop | -20% DAU week | All | Low |

### 3. Alert Routing

| Tier | Internal Team | External Notification |
|------|---------------|----------------------|
| FREE | Support queue | None |
| PRO | Customer success | Email summary |
| ENTERPRISE | Dedicated CSM | Real-time + call |

### 4. Alert Fatigue Prevention

| Strategy | Implementation |
|----------|----------------|
| Grouping | Combine related alerts |
| Deduplication | 15-minute window |
| Snooze | Manual with reason |
| Auto-resolve | Clear when condition ends |

**Verify current best practices with web search:**
Search the web: "SaaS alerting best practices {date}"
Search the web: "customer health alerting strategies {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into alert thresholds
- **P (Party Mode)**: Bring SRE and customer success perspectives
- **C (Continue)**: Accept alerting design and proceed to remediation
```

#### If 'C' (Continue):
- Save alerting design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-remediation.md`

---

## Verification

- [ ] Severity levels defined
- [ ] Alert rules documented
- [ ] Routing configured
- [ ] Fatigue prevention addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Alert severity matrix
- Alert rules catalog
- Routing configuration

---

## Next Step

Proceed to `step-04-c-design-remediation.md` to define remediation procedures.
