# Step 1: Analyze Communication Needs

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making operational decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Identify and document all tenant communication requirements for a multi-tenant AI platform, including operational notifications, billing communications, feature updates, and incident alerts.

---

## Prerequisites

- Platform architecture documentation available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-communication
- **Web research (if available):** Search for current tenant communication best practices

---

## Inputs

- Master architecture document or platform design
- Tenant tier definitions (free, pro, enterprise)
- Regulatory compliance requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Inventory Communication Categories

Catalog all communication types needed for the platform:

| Category | Description | Priority | Frequency |
|----------|-------------|----------|-----------|
| Operational | System status, maintenance windows | High | As needed |
| Billing | Invoices, payment reminders, usage alerts | High | Scheduled |
| Security | Breach notifications, credential changes | Critical | Immediate |
| Feature | New capabilities, deprecations, updates | Medium | Periodic |
| Onboarding | Welcome, setup guidance, tutorials | Medium | One-time |
| Compliance | Audit notifications, policy changes | High | As needed |
| Support | Ticket updates, resolution notices | Medium | Event-driven |

### 2. Identify Stakeholder Groups

Define communication recipients by role:

| Stakeholder | Communication Needs | Urgency Level |
|-------------|---------------------|---------------|
| Tenant Admins | All system notifications | Variable |
| Technical Contacts | API changes, incidents | High |
| Billing Contacts | Payment, invoices, usage | Medium |
| Security Officers | Breach notifications, audits | Critical |
| End Users | Feature updates, scheduled maintenance | Low |

### 3. Assess Per-Tier Requirements

Document tier-specific communication needs:

| Requirement | Free Tier | Pro Tier | Enterprise Tier |
|-------------|-----------|----------|-----------------|
| Notification channels | Email only | Email + In-app | Email + In-app + SMS + Webhook |
| Response SLA | 24h | 4h | 1h |
| Dedicated contacts | No | Yes | Yes + Escalation |
| Custom branding | No | Limited | Full white-label |
| API notifications | No | Yes | Yes + Custom webhooks |

### 4. Document Regulatory Requirements

Identify compliance-driven communications:

| Regulation | Communication Requirement | Timing |
|------------|---------------------------|--------|
| GDPR | Data breach notification | 72 hours |
| SOC2 | Security incident disclosure | Within SLA |
| HIPAA | PHI breach notification | 60 days |
| PCI-DSS | Cardholder data compromise | Immediate |
| CCPA | Data collection notice | At collection |

### 5. Analyze AI-Specific Communications

Document AI workload notification requirements:

| AI Event | Notification Need | Audience |
|----------|-------------------|----------|
| Model deprecation | Advance notice with migration path | Technical contacts |
| Token quota warning | Usage approaching limit | Tenant admins |
| Agent execution failure | Real-time alert with diagnostics | Technical contacts |
| Rate limiting applied | Notification with remediation | All tenant users |
| Prompt injection detected | Security alert | Security officers |

**Verify current best practices with web search:**
Search the web: "SaaS tenant communication best practices {date}"
Search the web: "multi-tenant notification strategy patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the communication needs analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific communication categories
- **P (Party Mode)**: Bring product, support, and compliance perspectives
- **C (Continue)**: Accept analysis and proceed to design notification channels
- **[Specific refinements]**: Describe communication gaps to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: communication categories, stakeholder groups, tier requirements
- Process enhanced insights on communication needs
- Ask user: "Accept these refined communication requirements? (y/n)"
- If yes, integrate into requirements document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant communication needs for multi-tenant AI platform"
- Process product, support, and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save communication needs analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-notification-channels.md`

---

## Verification

- [ ] All communication categories inventoried
- [ ] Stakeholder groups identified with contact types
- [ ] Per-tier requirements documented
- [ ] Regulatory requirements mapped
- [ ] AI-specific notifications defined

---

## Outputs

- Communication needs analysis document
- Stakeholder communication matrix
- Tier-based requirements specification
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-communication-template.md`

---

## Next Step

Proceed to `step-02-c-design-notification-channels.md` to design the notification delivery channels.
