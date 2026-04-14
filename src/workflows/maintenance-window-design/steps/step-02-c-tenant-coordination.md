# Step 2: Design Tenant Coordination

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

Design tenant notification and coordination procedures for maintenance.

---

## Prerequisites

- Step 1 completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant

---

## Actions

### 1. Notification Timeline

| Phase | Timing | Channel | Audience |
|-------|--------|---------|----------|
| Announcement | 1 week prior | Email, status page | All tenants |
| Reminder | 48 hours prior | Email, in-app | Affected tenants |
| Final notice | 24 hours prior | All channels | Affected tenants |
| Start notice | At start | Status page, in-app | All |
| Completion | At end | All channels | All |

### 2. Communication Templates

| Template | Purpose | Key Elements |
|----------|---------|--------------|
| Announcement | Initial notification | Date, duration, impact, reason |
| Reminder | Follow-up notice | Countdown, action items |
| Status update | During maintenance | Progress, ETA, issues |
| Completion | Post-maintenance | Summary, verification |
| Incident | If issues occur | Impact, mitigation, resolution |

### 3. Tenant Preferences

| Preference | Options | Default |
|------------|---------|---------|
| Notification channels | Email, SMS, webhook | Email |
| Advance notice period | 24h, 48h, 72h, 1 week | 72h |
| Timezone | User's timezone | UTC |
| Language | Supported languages | English |
| Escalation contact | Primary, backup | Primary admin |

### 4. Special Handling

| Tenant Type | Special Consideration | Process |
|-------------|----------------------|---------|
| Enterprise | Dedicated windows | Account manager coordination |
| High-volume | Off-peak scheduling | Traffic analysis |
| Regulated | Compliance notification | Extended notice |
| Global | Multi-region coordination | Rolling maintenance |

**Verify current best practices with web search:**
Search the web: "SaaS maintenance notification best practices {date}"
Search the web: "customer communication during outages {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing tenant coordination design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into communication templates
- **P (Party Mode)**: Bring customer success and support perspectives
- **C (Continue)**: Accept tenant coordination and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save tenant coordination to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-assembly.md`

---

## Verification

- [ ] Notification timeline defined
- [ ] Communication templates documented
- [ ] Tenant preferences addressed
- [ ] Special handling documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Notification timeline
- Communication templates
- Tenant preference settings

---

## Next Step

Proceed to `step-03-c-assembly.md` to assemble final document.
