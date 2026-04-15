# Step 1: Design Rotation Schedules

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

Design on-call rotation schedules and coverage models.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

### 1. Rotation Models

| Model | Structure | Best For |
|-------|-----------|----------|
| Weekly | 7-day shifts | Small teams (< 4) |
| Follow-the-sun | Timezone handoffs | Global teams |
| Primary/Secondary | Main + backup | Medium teams |
| Team rotation | Team-based shifts | Large organizations |
| Hybrid | Mix of models | Complex environments |

### 2. Coverage Requirements

| Period | Coverage Level | Response Time |
|--------|----------------|---------------|
| Business hours | Full team | 5 minutes |
| After hours | On-call primary | 15 minutes |
| Weekends | On-call + backup | 15 minutes |
| Holidays | Skeleton crew | 30 minutes |

### 3. Rotation Schedule

| Day | Primary | Secondary | Tertiary |
|-----|---------|-----------|----------|
| Monday-Friday | Engineer A | Engineer B | Team Lead |
| Saturday-Sunday | Engineer B | Engineer A | Manager |
| Holidays | Volunteer + pay | Backup | Director |

### 4. Burnout Prevention

| Practice | Implementation | Target |
|----------|----------------|--------|
| Rotation frequency | Max 1 week/month | Mandatory |
| Comp time | Time off after shift | 1:1 ratio |
| Alert quality | Reduce noise | < 5 pages/shift |
| Shift load balance | Even distribution | +/- 10% variance |
| Handoff overlap | Transition time | 30 min minimum |

**Verify current best practices with web search:**
Search the web: "on-call rotation best practices SRE {date}"
Search the web: "on-call burnout prevention strategies {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing rotation design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into rotation models
- **P (Party Mode)**: Bring SRE and HR perspectives
- **C (Continue)**: Accept rotation design and proceed to escalation policy
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save rotation design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-escalation-policy.md`

---

## Verification

- [ ] Rotation models defined
- [ ] Coverage requirements documented
- [ ] Schedule established
- [ ] Burnout prevention addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Rotation model specification
- Coverage requirements
- Schedule template

---

## Next Step

Proceed to `step-02-c-escalation-policy.md` to design escalation policies.
