# Step 1: Define State Machine

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

Define the tenant lifecycle state machine with all valid states and transitions.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-lifecycle`

---


## Inputs

- User requirements and constraints for tenant suspension design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define the tenant lifecycle state machine:

| State | Description | Allowed Transitions |
|-------|-------------|---------------------|
| ACTIVE | Tenant has full platform access | SUSPENDED |
| SUSPENDED | Access revoked, data preserved | REACTIVATED, ARCHIVED |
| REACTIVATED | Restored from suspension | ACTIVE |
| ARCHIVED | Permanently deactivated, data archived | None (terminal) |

---

## State Transition Rules

For each transition, define:

| From | To | Trigger | Validation | Side Effects |
|------|----|---------|------------|--------------|
| ACTIVE | SUSPENDED | Billing failure, policy violation, admin action | Confirm grace period elapsed | Revoke access, stop agents, pause webhooks |
| SUSPENDED | REACTIVATED | Payment received, appeal approved | Verify payment/appeal | Restore access, resume services |
| SUSPENDED | ARCHIVED | Grace period exceeded, user request | Confirm archive readiness | Export data, purge active resources |
| REACTIVATED | ACTIVE | Automatic | Verify services healthy | Log reactivation, send notification |

---

## State Persistence

- Store current state in tenant record
- Maintain state history with timestamps
- Record transition reason and actor (system/admin/user)
- Enable audit queries on state transitions

**Verify current best practices with web search:**
Search the web: "tenant state machine tenant lifecycle {date}"
Search the web: "tenant status workflow multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the state machine above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into state transitions and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for state review
- **C (Continue)**: Accept state machine and proceed to suspension triggers
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass state context: states, transitions, side effects
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into state machine
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review state machine: {summary of states and transitions}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save state machine to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-define-suspension-triggers.md`

---

## Verification

- [ ] All states defined with descriptions
- [ ] All transitions documented
- [ ] Side effects specified for each transition
- [ ] State persistence strategy defined
- [ ] Patterns align with pattern registry

---

## Outputs

- State machine definition
- Transition rules matrix

---

## Next Step

Proceed to `step-02-c-define-suspension-triggers.md` to define suspension triggers.
