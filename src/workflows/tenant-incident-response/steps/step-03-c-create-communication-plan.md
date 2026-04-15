# Step 3: Create Communication Plan

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

Create a tenant-aware incident communication plan with notification templates, channels, escalation contacts, and update schedules.

---

## Prerequisites

- Step 2 completed: Isolation protocol designed
- Severity levels from Step 1
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Communication Channels

Document channels per audience and severity:

| Channel | Audience | Severity | Timing |
|---------|----------|----------|--------|
| Status page | All tenants | All | Real-time |
| In-app banner | Affected tenants | SEV-1, SEV-2 | Immediate |
| Email | Affected tenant admins | All | Per SLA |
| SMS | Enterprise contacts | SEV-1 | Immediate |
| Slack/Teams | Internal team | All | Immediate |
| Phone | Enterprise executives | SEV-1 | Within 15 min |

### 2. Define Notification Templates

Create templates for each incident phase:

| Phase | Template Name | Key Content |
|-------|---------------|-------------|
| Detection | `incident-detected` | Issue identified, investigating |
| Investigation | `incident-update` | Current status, ETA if known |
| Mitigation | `incident-mitigated` | Issue contained, monitoring |
| Resolution | `incident-resolved` | Issue fixed, root cause summary |
| Post-mortem | `incident-review` | Full analysis, prevention steps |

### 3. Define Tenant-Specific Communication

Customize communication based on tenant:

| Tenant Tier | Contact Method | Update Frequency | Dedicated Contact |
|-------------|---------------|------------------|-------------------|
| ENTERPRISE | Direct call + email | Every 15 min (SEV-1) | Yes (TAM) |
| PRO | Email + status page | Every 30 min (SEV-1) | No |
| FREE | Status page only | Every hour | No |

### 4. Define Internal Escalation Contacts

Document internal escalation chain:

| Role | When to Contact | Contact Method | Response SLA |
|------|-----------------|----------------|--------------|
| On-call engineer | All incidents | PagerDuty | 5 min |
| Team lead | SEV-1, SEV-2 | Phone + Slack | 10 min |
| Engineering manager | SEV-1 | Phone | 15 min |
| CTO | SEV-1 (>1 hour) | Phone | 30 min |
| CEO | SEV-1 (>4 hours, customer escalation) | Phone | 1 hour |

### 5. Define Update Schedule

Document required update cadence:

| Severity | Initial Notice | Ongoing Updates | Resolution Notice |
|----------|----------------|-----------------|-------------------|
| SEV-1 | Immediate | Every 15 min | Immediate |
| SEV-2 | 15 min | Every 30 min | Within 30 min |
| SEV-3 | 1 hour | Every 2 hours | Within 2 hours |
| SEV-4 | 4 hours | Daily | Within 24 hours |

---

## Soft Gate Checkpoint

**Steps 1-3 complete the incident response framework.**

Present summary of severity levels, isolation protocols, and communication plan. Ask for confirmation before proceeding to recovery procedures.

**Verify current best practices with web search:**
Search the web: "create communication plan best practices {date}"
Search the web: "create communication plan enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the communication plan above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into communication nuances
- **P (Party Mode)**: Bring customer success and legal perspectives on communication
- **C (Continue)**: Accept communication plan and proceed to recovery procedures
- **[Specific refinements]**: Describe communication concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: communication channels, templates, escalation chain
- Process enhanced insights on communication effectiveness
- Ask user: "Accept these refined communication plans? (y/n)"
- If yes, integrate into communication specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident communication plan for multi-tenant platform"
- Process customer success and legal perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save communication plan to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-define-recovery-procedures.md`

---

## Verification

- [ ] Communication channels defined per severity
- [ ] Notification templates created
- [ ] Tenant-specific communication rules documented
- [ ] Internal escalation contacts defined
- [ ] Update schedule documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Communication channel matrix
- Notification templates
- Tenant-specific communication rules
- Escalation contact list
- Update schedule

---

## Next Step

Proceed to `step-04-c-define-recovery-procedures.md` to define recovery procedures.
