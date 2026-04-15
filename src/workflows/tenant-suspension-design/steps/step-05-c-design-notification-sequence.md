# Step 5: Design Notification Sequence

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

Design the notification sequences for each stage of the suspension lifecycle.

---

## Prerequisites

- Access revocation design completed (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design notification sequences for the complete suspension lifecycle:

---

## Pre-Suspension Notifications

| Trigger | When | Channel | Recipients | Content |
|---------|------|---------|------------|---------|
| Billing Warning | Grace period start | Email + In-App | Tenant Admin, Billing Contact | Payment failed, update method |
| Policy Warning | Violation detected | Email | Tenant Admin | Violation details, appeal process |
| Inactivity Warning | 90 days inactive | Email | All Users | Account will be suspended |

---

## Suspension Notifications

| Event | Channel | Recipients | Content |
|-------|---------|------------|---------|
| Account Suspended | Email + SMS | Tenant Admin | Suspension notice, reason, recovery steps |
| Agent Terminated | Email | Agent Owners | Agents stopped due to suspension |
| Webhook Paused | Email | Integration Admin | Webhooks paused |

---

## Reactivation Notifications

| Event | Channel | Recipients | Content |
|-------|---------|------------|---------|
| Payment Received | Email | Tenant Admin | Payment confirmed, reactivating |
| Appeal Approved | Email | Tenant Admin | Appeal approved, reactivating |
| Account Reactivated | Email + In-App | All Users | Account restored, services resumed |

---

## Archive Notifications

| Event | Channel | Recipients | Content |
|-------|---------|------------|---------|
| Archive Warning | Email | Tenant Admin | 7 days to archive, export data now |
| Data Export Ready | Email | Tenant Admin | Download link (valid 7 days) |
| Account Archived | Email | All Users | Account archived, data retained 30 days |
| Data Purged | Email | Tenant Admin | Data permanently deleted |

---

## Notification Templates

Define templates for each notification:

```yaml
templates:
  billing_warning:
    subject: "Payment Failed - Action Required"
    body_sections:
      - payment_failure_details
      - grace_period_timeline
      - update_payment_cta
  
  account_suspended:
    subject: "Account Suspended"
    body_sections:
      - suspension_reason
      - recovery_instructions
      - support_contact
  
  account_reactivated:
    subject: "Account Restored"
    body_sections:
      - welcome_back
      - service_status
      - next_steps
```

---

## Notification Delivery

| Channel | Provider | Retry Policy | Fallback |
|---------|----------|--------------|----------|
| Email | SendGrid/SES | 3 retries, exponential backoff | Queue for manual review |
| SMS | Twilio | 2 retries | Email fallback |
| In-App | Internal | N/A | Email if not seen in 24h |
| Webhook | Internal | 3 retries | Log for audit |

---

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/operations/tenant-suspension-runbook.md`
- `{output_folder}/planning-artifacts/architecture/suspension-state-machine.md`

**Verify current best practices with web search:**
Search the web: "suspension notification sequence tenant lifecycle {date}"
Search the web: "tenant communication automation multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the notification sequence above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into notification content and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for notification review
- **C (Continue)**: Accept notifications and finalize suspension design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass notification context: templates, channels, delivery
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into notification design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review notifications: {summary of templates and delivery}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save notification design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Generate final suspension design documentation

---

## Verification

- [ ] Pre-suspension notifications defined
- [ ] Suspension notifications defined
- [ ] Reactivation notifications defined
- [ ] Archive notifications defined
- [ ] Templates specified
- [ ] Delivery configuration complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Notification sequence catalog
- Notification templates
- **Load template:** `{project-root}/_bmad/bam/data/templates/suspension-runbook-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/operational-runbook-template.md`

---

## Next Step

Proceed to `bmad-bam-tenant-offboarding-design` if full offboarding is needed, or validation mode to verify suspension design.
