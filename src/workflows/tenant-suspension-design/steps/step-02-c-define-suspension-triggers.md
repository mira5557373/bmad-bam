# Step 2: Define Suspension Triggers

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

Define all triggers that can initiate tenant suspension with their detection mechanisms and handling procedures.

---

## Prerequisites

- State machine defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `usage-metering`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define suspension triggers and their handling:

---

## Billing Failure Trigger

| Aspect | Configuration |
|--------|---------------|
| Detection | Payment webhook failure from Stripe/Orb |
| Grace Period | 7 days from first failure |
| Retry Logic | Automatic retry at days 1, 3, 5 |
| Auto-Suspend | Yes, after grace period |
| Notification | Email at failure, day 3, day 5, day 7 |

---

## Policy Violation Trigger

| Aspect | Configuration |
|--------|---------------|
| Detection | Manual review, automated content scan, abuse report |
| Grace Period | 0-3 days depending on severity |
| Investigation | Required before suspension |
| Auto-Suspend | Immediate for severe violations |
| Notification | Email with violation details and appeal process |

Policy violation severity levels:
- **Critical**: Immediate suspension (security threat, illegal content)
- **Major**: 24-hour notice (ToS violation, abuse)
- **Minor**: 3-day notice with warning (rate limit abuse, spam)

---

## Admin Action Trigger

| Aspect | Configuration |
|--------|---------------|
| Detection | Admin portal action |
| Grace Period | Immediate or scheduled |
| Authorization | Requires admin role + reason |
| Auto-Suspend | Yes |
| Notification | Email with suspension notice and contact info |

---

## Security Incident Trigger

| Aspect | Configuration |
|--------|---------------|
| Detection | Automated threat detection, compromised credentials |
| Grace Period | Immediate |
| Auto-Suspend | Yes |
| Notification | Email + SMS for account security |

---

## Inactivity Trigger

| Aspect | Configuration |
|--------|---------------|
| Detection | No API calls for 90 days |
| Grace Period | 30-day notice before suspension |
| Auto-Suspend | Yes, after grace period |
| Notification | Email at days 90, 100, 110, 120 |

**Verify current best practices with web search:**
Search the web: "account suspension triggers tenant lifecycle {date}"
Search the web: "tenant suspension automation multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the suspension triggers above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into trigger detection and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for trigger review
- **C (Continue)**: Accept triggers and proceed to grace period design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass trigger context: detection mechanisms, grace periods, notifications
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into suspension triggers
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review suspension triggers: {summary of triggers and handling}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save suspension triggers to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-grace-periods.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the suspension foundation design.**

Present summary of:
- State machine with transition rules
- All trigger types with detection mechanisms
- Grace periods and notification configurations

Ask for confirmation before proceeding to grace period design.

---

## Verification

- [ ] All trigger types defined
- [ ] Detection mechanisms specified
- [ ] Grace periods documented
- [ ] Auto-suspend rules clear
- [ ] Notification triggers defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Suspension trigger definitions
- Detection mechanism catalog

---

## Next Step

Proceed to `step-03-c-design-grace-periods.md` to design grace period handling.
