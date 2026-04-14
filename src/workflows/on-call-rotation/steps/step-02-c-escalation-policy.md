# Step 2: Design Escalation Policy

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design escalation policies and tenant-priority routing.

---

## Prerequisites

- Step 1 completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident

---

## Actions

### 1. Escalation Levels

| Level | Escalate To | Timeout | Criteria |
|-------|-------------|---------|----------|
| L1 | Primary on-call | Immediate | All alerts |
| L2 | Secondary on-call | 15 min | No L1 ack |
| L3 | Team lead | 30 min | No L2 ack or severity high |
| L4 | Engineering manager | 45 min | No L3 ack or P1 |
| L5 | VP/Director | 60 min | P1 unresolved or customer impact |

### 2. Severity-Based Routing

| Severity | Initial Route | Auto-escalate | Response SLA |
|----------|---------------|---------------|--------------|
| P1 Critical | L1 + L2 + L3 | 15 min | 15 min |
| P2 High | L1 + L2 | 30 min | 30 min |
| P3 Medium | L1 | 60 min | 1 hour |
| P4 Low | L1 | 4 hours | 4 hours |

### 3. Tenant-Priority Routing

| Tenant Tier | Alert Handling | Escalation Speed | Dedicated Support |
|-------------|----------------|------------------|-------------------|
| Enterprise | Priority queue | 2x faster | Account manager + L3 |
| Business | Standard queue | Normal | CSM notification |
| Starter | Standard queue | Normal | None |
| Trial | Batch queue | Slower | None |

### 4. Communication Channels

| Channel | Use Case | Timeout |
|---------|----------|---------|
| PagerDuty | Primary alerting | 5 min |
| Slack | Team notification | Immediate |
| Phone | High severity | After 10 min |
| SMS | Backup | After 5 min |
| Email | Non-urgent | After 15 min |

**Verify current best practices with web search:**
Search the web: "incident escalation policy best practices {date}"
Search the web: "multi-tenant priority routing patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing escalation policy design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into escalation paths
- **P (Party Mode)**: Bring customer success and support perspectives
- **C (Continue)**: Accept escalation policy and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save escalation policy to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-assembly.md`

---

## Verification

- [ ] Escalation levels defined
- [ ] Severity routing documented
- [ ] Tenant-priority routing established
- [ ] Communication channels configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Escalation level definitions
- Routing rules
- Communication procedures

---

## Next Step

Proceed to `step-03-c-assembly.md` to assemble final document.
