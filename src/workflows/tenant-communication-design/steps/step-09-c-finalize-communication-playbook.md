# Step 9: Finalize Communication Playbook

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

Consolidate all communication design artifacts into a comprehensive playbook that serves as the operational guide for tenant communications, including runbooks, decision trees, and implementation guidelines.

---

## Prerequisites

- Steps 1-8 completed
- All communication design documents available
- Compliance validation passed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: communication-playbook
- **Web research (if available):** Search for communication playbook best practices

---

## Inputs

- Communication needs analysis (Step 1)
- Notification channel design (Step 2)
- Message template catalog (Step 3)
- Tenant preference design (Step 4)
- Escalation path design (Step 5)
- Incident communication design (Step 6)
- Feature announcement design (Step 7)
- Compliance validation report (Step 8)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Compile Playbook Structure

Organize the communication playbook:

| Section | Content | Source |
|---------|---------|--------|
| 1. Overview | Communication strategy summary | Step 1 |
| 2. Channels | Channel specifications and routing | Step 2 |
| 3. Templates | Template catalog and guidelines | Step 3 |
| 4. Preferences | Preference management guide | Step 4 |
| 5. Escalation | Escalation procedures | Step 5 |
| 6. Incidents | Incident communication runbook | Step 6 |
| 7. Releases | Feature announcement process | Step 7 |
| 8. Compliance | Compliance requirements | Step 8 |
| 9. Appendices | Reference materials | All steps |

### 2. Create Decision Trees

Document key decision flows:

| Decision | Inputs | Outcomes | Runbook Section |
|----------|--------|----------|-----------------|
| Channel Selection | Message type, urgency, tier | Channel(s) to use | 2.3 |
| Escalation Trigger | Ack status, severity, time | Escalation level | 5.2 |
| Incident Notification | Severity, scope, phase | Communication plan | 6.1 |
| Template Selection | Message type, channel, tier | Template ID | 3.2 |
| Compliance Check | Regulation, region, content | Approval required | 8.1 |

### 3. Define Key Metrics

Establish communication performance metrics:

| Metric | Definition | Target | Alert Threshold |
|--------|------------|--------|-----------------|
| Delivery Rate | Messages delivered / sent | > 99% | < 95% |
| Open Rate | Messages opened / delivered | > 40% | < 20% |
| Ack Rate | Acknowledged / sent | > 80% (critical) | < 60% |
| Escalation Rate | Escalations / alerts | < 5% | > 15% |
| MTTA | Mean time to acknowledgement | < 5 min (P1) | > 15 min |
| Unsubscribe Rate | Unsubscribes / sent | < 0.5% | > 2% |
| Bounce Rate | Bounces / sent | < 2% | > 5% |

### 4. Document Operational Runbooks

Create operational procedures:

| Runbook | Purpose | Trigger | Steps |
|---------|---------|---------|-------|
| RB-001 | Incident Communication | P1/P2 incident | 1. Assess 2. Draft 3. Review 4. Send |
| RB-002 | Maintenance Notification | Scheduled maintenance | 1. Schedule 2. Notify 3. Remind 4. Confirm |
| RB-003 | Security Alert | Security event | 1. Classify 2. Draft 3. Legal review 4. Send |
| RB-004 | Feature Launch | Release ready | 1. Schedule 2. Preview 3. Launch 4. Follow-up |
| RB-005 | Escalation Response | Unacked alert | 1. Verify 2. Escalate 3. Document 4. Resolve |
| RB-006 | Compliance Audit | Audit request | 1. Gather 2. Review 3. Report 4. Submit |

### 5. Create Quick Reference Guides

Design reference cards for operators:

| Guide | Audience | Key Content |
|-------|----------|-------------|
| Channel Matrix | All operators | Channel routing by message type |
| Escalation Card | On-call | Escalation levels and timing |
| Template Finder | Content team | Template selection guide |
| Compliance Checklist | All operators | Pre-send compliance checks |
| Contact Directory | All operators | Key contacts by role |

### 6. Define Review and Update Procedures

Establish playbook maintenance:

| Activity | Frequency | Owner | Output |
|----------|-----------|-------|--------|
| Template Review | Quarterly | Content team | Updated templates |
| Channel Performance | Monthly | Operations | Performance report |
| Compliance Review | Quarterly | Compliance | Gap assessment |
| Runbook Test | Bi-annually | Operations | Test results |
| Full Playbook Review | Annually | All stakeholders | Updated playbook |

### 7. Compile Implementation Checklist

Create deployment checklist:

| Phase | Task | Owner | Status |
|-------|------|-------|--------|
| Setup | Configure email provider | DevOps | [ ] |
| Setup | Configure SMS gateway | DevOps | [ ] |
| Setup | Configure webhook infrastructure | DevOps | [ ] |
| Setup | Deploy status page | DevOps | [ ] |
| Content | Create all templates | Content | [ ] |
| Content | Translate to required locales | Content | [ ] |
| Config | Configure preference defaults | Product | [ ] |
| Config | Define escalation rules | Operations | [ ] |
| Test | Test all channels | QA | [ ] |
| Test | Test escalation flows | QA | [ ] |
| Launch | Enable for pilot tenants | Product | [ ] |
| Launch | Enable for all tenants | Product | [ ] |

### 8. Generate Final Deliverables

Produce playbook artifacts:

| Artifact | Format | Distribution |
|----------|--------|--------------|
| Communication Playbook | Markdown/PDF | All teams |
| Template Catalog | JSON/YAML | Development |
| Channel Configuration | YAML | DevOps |
| Runbook Collection | Markdown | Operations |
| Quick Reference Cards | PDF | Printed/Digital |
| Compliance Matrix | Spreadsheet | Compliance/Legal |

**Verify current best practices with web search:**
Search the web: "communication playbook structure SaaS {date}"
Search the web: "operational runbook best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the playbook finalization above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific runbooks or metrics
- **P (Party Mode)**: Bring operations, product, and leadership perspectives
- **C (Complete)**: Finalize the communication playbook
- **[Specific refinements]**: Describe playbook concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: playbook structure, runbooks, metrics
- Process enhanced insights on playbook completeness
- Ask user: "Accept these refined playbook elements? (y/n)"
- If yes, integrate into final playbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review communication playbook for multi-tenant AI platform"
- Process operations, product, and leadership perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Complete):
- Generate final communication playbook
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Mark workflow as complete

---

## Verification

- [ ] Playbook structure compiled
- [ ] Decision trees documented
- [ ] Key metrics defined
- [ ] Operational runbooks created
- [ ] Quick reference guides produced
- [ ] Review procedures established
- [ ] Implementation checklist complete
- [ ] Final deliverables generated

---

## Outputs

- Complete Tenant Communication Playbook
- Template Catalog (machine-readable)
- Operational Runbook Collection
- Quick Reference Guides
- Implementation Checklist
- **Load template:** `{project-root}/_bmad/bam/data/templates/communication-playbook-template.md`

---

## Workflow Complete

The tenant communication design workflow is complete. The communication playbook provides:

1. **Strategic Foundation** - Communication strategy aligned with platform goals
2. **Channel Architecture** - Multi-channel delivery with fallback mechanisms
3. **Template System** - Reusable, localized, tier-aware templates
4. **Preference Management** - Tenant-controlled communication settings
5. **Escalation Paths** - Automated escalation for critical communications
6. **Incident Procedures** - Transparent incident communication lifecycle
7. **Release Communications** - Structured feature announcement process
8. **Compliance Assurance** - Validated regulatory compliance
9. **Operational Guides** - Runbooks and reference materials for operators

**Next Recommended Workflow:** `bmad-bam-tenant-notification-system` for implementation details.
