# Step 2: Design Notification Workflows

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the notification workflows for contract renewals, including pre-renewal reminders, price change notices, and renewal confirmation communications.

---

## Prerequisites

- Step 1 completed: Renewal model analysis
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Pre-Renewal Notification Sequence

Define the notification timeline before renewal:

| Days Before | Notification Type | Channel | Content Focus |
|-------------|-------------------|---------|---------------|
| 90 | Early bird offer | Email | Early renewal discount |
| 60 | Renewal reminder | Email + In-app | Upcoming renewal, changes |
| 30 | Price change notice | Email | Required legal notice |
| 14 | Final reminder | Email + In-app | Action required |
| 7 | Last chance | Email | Urgency, contact support |
| 1 | Final notice | Email + SMS (opt-in) | Tomorrow's charge |

### 2. Design Post-Renewal Communications

Define communications after renewal:

| Event | Timing | Channel | Content |
|-------|--------|---------|---------|
| Renewal success | Immediate | Email | Receipt, thank you |
| New term started | Day 1 | In-app | New features, summary |
| Payment failed | Immediate | Email + In-app | Update payment, retry |
| Grace period | Day 3 | Email | Urgent, service impact |
| Cancellation processed | Immediate | Email | Confirmation, data export |

### 3. Design Renegotiation Workflow

Define the sales-assisted renegotiation flow:

| Step | Trigger | Actor | Action | SLA |
|------|---------|-------|--------|-----|
| 1 | User requests renegotiation | User | Submit via portal | - |
| 2 | Route to account team | System | Assign based on tier | 4 hours |
| 3 | Review account health | AE/CSM | Check usage, NPS, history | 24 hours |
| 4 | Prepare offer | AE | Custom pricing/terms | 48 hours |
| 5 | Present offer | AE | Meeting or email | 72 hours |
| 6 | Negotiate | Both | Back and forth | Per deal |
| 7 | Finalize contract | Legal | DocuSign | 48 hours |
| 8 | Apply new terms | System | Update subscription | Immediate |

### 4. Define Renewal Events

Document system events for renewal workflows:

| Event | Trigger | Payload | Subscribers |
|-------|---------|---------|-------------|
| `renewal.upcoming` | 90/60/30 days before | tenant_id, renewal_date, changes | Notification, Analytics |
| `renewal.attempted` | Renewal charge | tenant_id, amount | Billing, Analytics |
| `renewal.succeeded` | Payment success | tenant_id, new_term | All systems |
| `renewal.failed` | Payment failed | tenant_id, error_code | Support, Notifications |
| `renewal.cancelled` | User cancels | tenant_id, reason | All systems |
| `renewal.renegotiation.started` | Request submitted | tenant_id, request | Sales, CS |

### 5. Design Self-Service Renewal Portal

Specify portal capabilities:

| Feature | Description | User Action |
|---------|-------------|-------------|
| Renewal summary | Show upcoming renewal details | View |
| Price comparison | Current vs new pricing | View |
| Plan change | Upgrade/downgrade at renewal | Select |
| Payment update | Change payment method | Edit |
| Auto-renew toggle | Enable/disable auto-renewal | Toggle |
| Early renewal | Renew now with incentive | Confirm |
| Request renegotiation | Start sales conversation | Submit |

**Verify current best practices with web search:**
Search the web: "SaaS renewal notification best practices {date}"
Search the web: "subscription renewal UX patterns {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-2 complete the renewal model and notification design.**

Present summary of:
- Contract types and renewal scenarios
- Notification timeline
- Renegotiation workflow

Ask for confirmation before proceeding to runbook creation.

---

## COLLABORATION MENUS (A/P/C):

After completing the notification workflow design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific notification sequences
- **P (Party Mode)**: Bring CS and marketing perspectives on communications
- **C (Continue)**: Accept notification workflows and proceed to runbook creation
- **[Specific refinements]**: Describe notification concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: notification sequences, renegotiation flow, events
- Process enhanced insights on communication effectiveness
- Ask user: "Accept these refined notification specs? (y/n)"
- If yes, integrate into notification design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review renewal notification workflows for customer experience"
- Process CS and marketing perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save notification workflow design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-create-runbook.md`

---

## Verification

- [ ] Pre-renewal sequence documented
- [ ] Post-renewal communications defined
- [ ] Renegotiation workflow specified
- [ ] Renewal events documented
- [ ] Self-service portal features defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Pre-renewal notification sequence
- Post-renewal communication plan
- Renegotiation workflow
- Renewal event definitions
- Portal feature requirements

---

## Next Step

Proceed to `step-03-c-create-runbook.md` to create the operational runbook.
