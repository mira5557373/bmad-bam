# Step 4: Design Access Revocation

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design the access revocation procedures that execute when a tenant transitions to SUSPENDED state.

---

## Prerequisites

- Grace period design completed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design access revocation procedures for each system component:

---

## API Access Revocation

| Component | Revocation Action | Timing |
|-----------|-------------------|--------|
| API Gateway | Block tenant API keys | Immediate |
| Rate Limiter | Remove tenant quotas | Immediate |
| JWT Validation | Invalidate tenant tokens | Immediate |
| Service Mesh | Update tenant allow-list | < 30 seconds |

---

## UI Access Revocation

| Component | Revocation Action | Timing |
|-----------|-------------------|--------|
| Session Store | Invalidate all sessions | Immediate |
| Auth Provider | Disable tenant users | Immediate |
| Redirect Logic | Show suspension page | Immediate |

---

## Background Service Revocation

| Service | Revocation Action | Timing |
|---------|-------------------|--------|
| Agent Runtime | Terminate running agents | Graceful (30s timeout) |
| Scheduled Jobs | Pause tenant cron jobs | Immediate |
| Webhook Delivery | Suspend outbound webhooks | Immediate |
| Queue Processors | Skip tenant messages | Immediate |

---

## Data Access Revocation

| Data Layer | Revocation Action | Timing |
|------------|-------------------|--------|
| Database | RLS policy update (deny) | Immediate |
| Cache | Clear tenant cache | Immediate |
| Storage | Remove pre-signed URLs | Immediate |
| Vector Store | Disable tenant queries | Immediate |

**Note:** Data is preserved during suspension, not deleted.

---

## Revocation Order

Execute revocation in this order to prevent partial access:

1. Invalidate all sessions (UI)
2. Block API keys (API)
3. Terminate agents (Background)
4. Update RLS policies (Data)
5. Clear caches (Data)
6. Log revocation completion

---

## Revocation Verification

After revocation, verify:

- [ ] No active sessions for tenant users
- [ ] All API calls return 403
- [ ] No running agents for tenant
- [ ] No pending webhooks for tenant
- [ ] RLS policies deny access

**Verify current best practices with web search:**
Search the web: "access revocation tenant lifecycle {date}"
Search the web: "tenant access control multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the access revocation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into revocation edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for revocation review
- **C (Continue)**: Accept revocation design and proceed to notification sequence
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass revocation context: components, timing, verification
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into revocation design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review access revocation: {summary of procedures and timing}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save access revocation design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-design-notification-sequence.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the suspension mechanics design.**

Present summary of:
- Access revocation procedures for API, UI, and background services
- Data access revocation with RLS policy updates
- Revocation order and verification checklist

Ask for confirmation before proceeding to notification sequence design.

---

## Verification

- [ ] API revocation procedures defined
- [ ] UI revocation procedures defined
- [ ] Background service revocation defined
- [ ] Data access revocation defined
- [ ] Revocation order specified
- [ ] Verification checklist complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Access revocation procedures
- Revocation order specification
- Verification checklist

---

## Next Step

Proceed to `step-05-c-design-notification-sequence.md` to design notification sequences.
