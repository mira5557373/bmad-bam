# Step 5: Establish Escalation Paths

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

Define escalation procedures for unacknowledged notifications and critical communications, ensuring urgent messages reach appropriate stakeholders through progressively elevated channels.

---

## Prerequisites

- Step 4 (Implement Tenant Preferences) completed
- Tenant preference design document available
- Contact management specification
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: escalation-paths
- **Web research (if available):** Search for notification escalation best practices

---

## Inputs

- Tenant preference design from Step 4
- Contact management specification
- Tier-based SLA definitions
- On-call rotation schedules
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Escalation Triggers

Establish conditions that trigger escalation:

| Trigger Type | Condition | Escalation Level |
|--------------|-----------|------------------|
| No Acknowledgement | Primary notification not acked within SLA | Level 1 |
| Repeated Failure | 3+ delivery failures | Level 1 |
| Critical Unacked | Critical alert unacked 5 min | Level 2 |
| P1 Incident | Platform-wide outage | Level 3 (immediate) |
| Security Breach | Active security incident | Level 3 (immediate) |
| Payment Failure | Revenue impact detected | Level 2 |

### 2. Design Escalation Levels

Define escalation hierarchy:

| Level | Recipients | Channels | SLA |
|-------|------------|----------|-----|
| Level 0 | Primary contact | Email, In-App | Baseline |
| Level 1 | Primary + Secondary contacts | Email, In-App, SMS | 15 min after L0 |
| Level 2 | All contacts + Escalation contact | All channels | 30 min after L1 |
| Level 3 | All + Management + On-call | All + Voice | Immediate |

### 3. Specify Per-Tier Escalation SLAs

Document tier-specific escalation timing:

| Severity | Free Tier | Pro Tier | Enterprise Tier |
|----------|-----------|----------|-----------------|
| Critical | L1: 30 min, L2: 2h | L1: 15 min, L2: 1h | L1: 5 min, L2: 15 min |
| High | L1: 2h, L2: 8h | L1: 1h, L2: 4h | L1: 30 min, L2: 2h |
| Medium | L1: 24h | L1: 8h | L1: 4h |
| Low | No escalation | L1: 24h | L1: 12h |

### 4. Design Acknowledgement System

Define acknowledgement requirements:

| Mechanism | Method | Valid For | Auto-ack |
|-----------|--------|-----------|----------|
| Click ACK | Link/button in notification | 24 hours | No |
| Reply ACK | Email reply | 24 hours | No |
| SMS ACK | Reply "ACK" | 2 hours | No |
| API ACK | API call with token | 24 hours | No |
| Auto-resolve | Issue resolved | Until resolved | Yes |
| Login ACK | User login to platform | 24 hours | Yes (configurable) |

### 5. Plan Escalation Automation

Specify automation rules:

| Rule | Trigger | Action | Cooldown |
|------|---------|--------|----------|
| Auto-escalate | SLA breach | Move to next level | None |
| Re-notify | Ack expired | Re-send same level | 15 min |
| Aggregate | Multiple related alerts | Combine into digest | 5 min window |
| De-escalate | Issue resolved | Cancel pending escalations | Immediate |
| Override | Manual intervention | Pause automation | Until cleared |

### 6. Define On-Call Integration

Specify integration with on-call systems:

| Component | Integration | Purpose |
|-----------|-------------|---------|
| PagerDuty | Webhook trigger | Alert on-call engineer |
| Opsgenie | Webhook trigger | Alert management chain |
| Slack/Teams | Channel post | Team awareness |
| Internal | Custom webhook | Platform operations |

### 7. Document Escalation Flows

Map escalation paths by scenario:

| Scenario | Initial | L1 (SLA breach) | L2 (Continued) | L3 (Critical) |
|----------|---------|-----------------|----------------|---------------|
| System Outage | In-App + Email | + SMS to tech contact | + All contacts | + Voice + On-call |
| Security Alert | Email + SMS | + Security contact | + Management | + Executive + Legal |
| Billing Failure | Email | + Billing contact | + Admin | + Account manager |
| AI Agent Failure | Webhook + In-App | + Technical contact | + All contacts | + Engineering on-call |

**Verify current best practices with web search:**
Search the web: "notification escalation policies SaaS {date}"
Search the web: "on-call integration patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the escalation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into escalation automation or on-call integration
- **P (Party Mode)**: Bring SRE, support, and operations perspectives
- **C (Continue)**: Accept escalation design and proceed to incident communication
- **[Specific refinements]**: Describe escalation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: escalation levels, SLAs, automation rules
- Process enhanced insights on escalation paths
- Ask user: "Accept these refined escalation decisions? (y/n)"
- If yes, integrate into escalation design document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review escalation path design for multi-tenant AI platform"
- Process SRE, support, and operations perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save escalation path design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-design-incident-communication.md`

---

## Verification

- [ ] Escalation triggers defined
- [ ] Escalation levels established
- [ ] Per-tier SLAs documented
- [ ] Acknowledgement system designed
- [ ] Automation rules specified
- [ ] On-call integration planned
- [ ] Escalation flows documented

---

## Outputs

- Escalation path design document
- Escalation SLA matrix
- On-call integration specification
- **Load template:** `{project-root}/_bmad/bam/data/templates/escalation-path-template.md`

---

## Next Step

Proceed to `step-06-c-design-incident-communication.md` to design incident notification workflow.
