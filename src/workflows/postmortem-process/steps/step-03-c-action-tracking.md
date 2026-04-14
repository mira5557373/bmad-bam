# Step 3: Action Tracking

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices

---

## Purpose

Configure action item management, tracking, and escalation procedures.

---

## Prerequisites

- Step 1: Template Design completed
- Step 2: Facilitation Guide completed

---

## Actions

### 1. Action Item Prioritization

Define priority levels:

| Priority | Timeline | Criteria |
|----------|----------|----------|
| P0 | 24-48 hours | Prevents recurrence of SEV-1 |
| P1 | 1 week | Critical systemic improvement |
| P2 | 2 weeks | Important process improvement |
| P3 | 1 month | Nice-to-have enhancement |

### 2. Owner Assignment Process

Define ownership rules:

| Action Type | Default Owner | Escalation Path |
|-------------|---------------|-----------------|
| Infrastructure | On-call engineer -> Platform team | Engineering Manager |
| Process | Incident owner -> Operations | Engineering Director |
| Security | Security team member | Security Lead |
| Customer Communication | Customer Success | VP Customer Success |

### 3. Status Reporting

Configure tracking cadence:

| Frequency | Report | Audience |
|-----------|--------|----------|
| Daily | P0 status update | Incident channel |
| Weekly | All open actions | Engineering leads |
| Monthly | Completion metrics | Leadership |
| Quarterly | Trend analysis | Executive team |

### 4. Escalation Procedures

Define escalation triggers:

| Condition | Escalation Action |
|-----------|-------------------|
| P0 overdue by 24h | Notify engineering director |
| P1 overdue by 3 days | Notify engineering manager |
| >5 open P0/P1 actions | Executive review |
| Recurrence of resolved incident | Mandatory re-review |

**Soft Gate:** Steps 1-3 complete the action tracking design. Present a summary of priorities and tracking. Ask for confirmation before proceeding to knowledge base.

**Verify current best practices with web search:**
Search the web: "incident action item tracking best practices {date}"
Search the web: "postmortem action follow-up process {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tracking processes
- **P (Party Mode)**: Bring project management perspectives
- **C (Continue)**: Accept action tracking and proceed to knowledge base
```

#### If 'C' (Continue):
- Save action tracking to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-knowledge-base.md`

---

## Verification

- [ ] Priority levels defined
- [ ] Owner assignment process documented
- [ ] Status reporting configured
- [ ] Escalation procedures specified
- [ ] Patterns align with pattern registry

---

## Next Step

Proceed to `step-04-c-knowledge-base.md` to build incident learning repository.
