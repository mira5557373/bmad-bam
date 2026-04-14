# Step 1: Notification Requirements

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Define notification categories, triggers, urgency levels, and regulatory requirements for the multi-tenant notification system.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `notification`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `compliance`

---


## Inputs

- User requirements and constraints for notification system design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define notification categories and their characteristics:

| Category | Description | Examples | Urgency | Tenant Scope |
|----------|-------------|----------|---------|--------------|
| Transactional | System-generated for user actions | Password reset, order confirmation, invoice | High | Per-user |
| Marketing | Promotional and engagement | Newsletter, feature announcements, upsell | Low | Per-tenant settings |
| System | Platform operational status | Maintenance windows, service updates | Medium | All affected tenants |
| Security | Security-related alerts | Login from new device, MFA codes, suspicious activity | Critical | Per-user |
| Billing | Payment and subscription | Payment failed, subscription expiring, usage alerts | High | Billing contacts |
| AI Agent | Agent-initiated notifications | Task completion, approval requests, insights | Medium | Per-user/team |

For each category, define:
- Notification triggers (events that initiate notifications)
- Default urgency level and SLA for delivery
- Required channels (email mandatory, SMS optional, etc.)
- Opt-out eligibility (transactional typically cannot be opted out)
- Regulatory requirements (CAN-SPAM, GDPR consent tracking)

**Regulatory Requirements Matrix:**

| Regulation | Requirement | Impact on Notifications |
|------------|-------------|------------------------|
| CAN-SPAM | Unsubscribe link, physical address | Marketing emails must include |
| GDPR | Explicit consent, data minimization | Track consent per notification type |
| TCPA | SMS consent | Explicit opt-in for SMS marketing |
| CCPA | Right to opt-out | Honor opt-out within 45 days |

**Verify current best practices with web search:**
Search the web: "notification system design patterns SaaS {date}"
Search the web: "email notification compliance CAN-SPAM GDPR {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the notification requirements above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into notification categories and regulatory edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for requirements review
- **C (Continue)**: Accept notification requirements and proceed to channel design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass requirements context: categories, triggers, regulatory requirements
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into notification requirements
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review notification requirements: {summary of categories and compliance}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save notification requirements to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-channel-design.md`

---

## Verification

- [ ] All notification categories defined
- [ ] Triggers documented for each category
- [ ] Urgency levels and SLAs specified
- [ ] Regulatory requirements mapped
- [ ] Opt-out eligibility documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Notification category definitions
- Regulatory requirements matrix
- Trigger and event mapping

---

## Next Step

Proceed to `step-02-c-channel-design.md` to design communication channels.
