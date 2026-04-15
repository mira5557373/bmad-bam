# Step 4: Design Health Thresholds

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design health thresholds and automated action triggers.

---

## Prerequisites

- Step 3 completed (Algorithm defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Health Status Classification

| Score Range | Status | Color | SLA Response |
|-------------|--------|-------|--------------|
| 90-100 | Excellent | Green | Monitor only |
| 75-89 | Healthy | Blue | Weekly review |
| 60-74 | Needs Attention | Yellow | Daily review |
| 40-59 | At Risk | Orange | Immediate action |
| 0-39 | Critical | Red | Escalate now |

### 2. Automated Actions

| Trigger | Condition | Action |
|---------|-----------|--------|
| Health Alert | Score drops > 15 pts | Notify CSM |
| Churn Risk | Score < 40 for 7 days | Create retention task |
| Expansion Signal | Score > 85 for 30 days | Notify sales |
| Support Escalation | Support score < 30 | Priority queue |

### 3. Notification Rules

| Recipient | Condition | Channel | Frequency |
|-----------|-----------|---------|-----------|
| CSM | Any status change | Email + Slack | Immediate |
| Manager | Critical status | PagerDuty | Immediate |
| Account Team | At Risk status | CRM alert | Daily digest |
| Executive | Critical > 5 tenants | Dashboard | Weekly |

### 4. Review Cadence

| Health Status | Review Frequency | Owner |
|---------------|------------------|-------|
| Excellent | Quarterly | CSM |
| Healthy | Monthly | CSM |
| Needs Attention | Weekly | CSM + Manager |
| At Risk | Daily | CSM + Manager |
| Critical | Daily + War Room | Executive |

**Verify current best practices with web search:**
Search the web: "customer health score thresholds best practices {date}"
Search the web: "automated customer success actions SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into threshold optimization
- **P (Party Mode)**: Bring CS and product perspectives
- **C (Continue)**: Accept thresholds and complete Create mode
```

#### If 'C' (Continue):
- Save complete health scoring design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Output to: `{output_folder}/planning-artifacts/analytics/tenant-health-scoring-design.md`
- Create mode complete

---

## Verification

- [ ] Status classifications defined
- [ ] Automated actions configured
- [ ] Notification rules established
- [ ] Review cadence documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete health scoring design document
- Threshold configuration
- Action trigger rules
- Notification matrix

---

## Next Step

Create mode complete. Based on outcome:
- **Success**: Proceed to implementation
- **Refinement needed**: Use Edit mode
- **Validation required**: Use Validate mode
