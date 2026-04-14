# Step 3: Design Grace Periods

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

Design grace period handling with warning notifications, feature degradation, and recovery procedures.

---

## Prerequisites

- Suspension triggers defined (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design grace period handling for each trigger type:

---

## Grace Period Matrix

| Trigger | Grace Period | Warning Notifications | Feature Degradation |
|---------|--------------|----------------------|---------------------|
| Billing Failure | 7 days | Days -7, -3, -1 | Read-only at day 5 |
| Policy Violation (Minor) | 3 days | Immediate, day 2 | None |
| Policy Violation (Major) | 1 day | Immediate | None |
| Policy Violation (Critical) | 0 days | Post-suspension | N/A |
| Admin Action | Configurable | Pre-suspension | Configurable |
| Security Incident | 0 days | Post-suspension | N/A |
| Inactivity | 30 days | Days -30, -20, -10, -3 | None |

---

## Warning Notification Schedule

For billing failure (7-day grace):

| Day | Notification | Content |
|-----|--------------|---------|
| 0 | Payment Failed | Payment failed, retry in 24h |
| 1 | First Retry Failed | Update payment method |
| 3 | Second Retry Failed | Urgent: Account at risk |
| 5 | Feature Degradation | Account now read-only |
| 7 | Suspension Notice | Account suspended |

---

## Feature Degradation Rules

During grace period, progressively limit capabilities:

| Degradation Level | Restrictions |
|-------------------|--------------|
| Level 1 (Warning) | No new agent creation |
| Level 2 (Restricted) | Read-only access, no agent execution |
| Level 3 (Suspended) | API access revoked, UI login disabled |

---

## Payment Retry Logic

For billing failures:

```
Day 0: Initial failure - Notify user
Day 1: First retry - Same payment method
Day 3: Second retry - Same payment method
Day 5: Third retry - Prompt for new payment method
Day 7: Final - Suspend if not resolved
```

---

## Appeal Process

For policy violations:

1. User receives suspension notice with appeal link
2. Appeal submitted via support ticket
3. Review SLA: 24-48 hours for response
4. Outcomes: Reinstated, Partially Reinstated, Denied
5. If reinstated, transition to REACTIVATED state

**Verify current best practices with web search:**
Search the web: "subscription grace period tenant lifecycle {date}"
Search the web: "payment dunning grace period multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the grace period design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into grace period edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for grace period review
- **C (Continue)**: Accept grace periods and proceed to access revocation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass grace period context: timelines, degradation, retry logic
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into grace period design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review grace periods: {summary of timelines and degradation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save grace period design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-access-revocation.md`

---

## Verification

- [ ] Grace periods defined for all triggers
- [ ] Warning notification schedule complete
- [ ] Feature degradation levels specified
- [ ] Payment retry logic documented
- [ ] Appeal process defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Grace period configuration
- Warning notification schedule
- Feature degradation rules

---

## Next Step

Proceed to `step-04-c-design-access-revocation.md` to design access revocation procedures.
