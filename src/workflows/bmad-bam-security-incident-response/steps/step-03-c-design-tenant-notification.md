# Step 3: Design Tenant Notification

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- CYCLE **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- MEMO Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics


---

## Purpose

Design the tenant notification framework including notification triggers, communication channels, regulatory compliance requirements, and post-incident reporting.

## Prerequisites

- Incident classification defined in Step 1
- Response procedures defined in Step 2
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- Incident classification from Step 1
- Response procedures from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Notification Triggers

Based on incident severity and tenant impact:

| Trigger | Notification Required | Timeline | Audience |
|---------|----------------------|----------|----------|
| Data breach confirmed | Yes | Within 72 hours | Affected tenants |
| Service disruption >4hr | Yes | Within 1 hour | All tenants |
| Security vulnerability | No (unless exploited) | Best effort | None |
| Account compromise | Yes | Within 24 hours | Affected tenant |
| AI safety incident | Yes | Within 48 hours | Affected tenants |

### 2. Define Communication Channels

Per tenant tier:

| Tier | Primary Channel | Secondary Channel | Escalation |
|------|-----------------|-------------------|------------|
| Free | Email, status page | In-app notification | None |
| Pro | Email, dedicated Slack | Phone (business hours) | Account manager |
| Enterprise | Dedicated phone line | Executive briefing | Named contact |

### 3. Define Regulatory Notification

Per compliance framework:

| Regulation | Notification Timeline | Authority | Content Required |
|------------|----------------------|-----------|------------------|
| GDPR | 72 hours | DPA | Nature, scope, measures, contact |
| HIPAA | 60 days | HHS | PHI details, individuals affected |
| SOC2 | As per contract | Auditor | Incident summary |
| State laws | Varies (24hr-90 days) | State AG | Per state requirements |

### 4. Define Post-Incident Reporting

Create reporting requirements:

| Report Type | Audience | Timeline | Content |
|-------------|----------|----------|---------|
| Initial Notice | Affected tenants | Within SLA | What happened, immediate actions |
| Status Update | Affected tenants | Daily during active | Progress, timeline |
| Resolution Notice | Affected tenants | At closure | Root cause, remediation |
| Incident Report | Internal, regulators | Within 30 days | Full analysis, lessons learned |

**Soft Gate:** Steps 1-3 complete the core incident response design. Present summary and ask for confirmation before proceeding to final documentation.

**Verify current best practices with web search:**
Search the web: "breach notification requirements GDPR {date}"
Search the web: "security incident communication best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review notification triggers against SLAs
- **A2**: Analyze communication channel effectiveness
- **A3**: Evaluate regulatory compliance completeness
- **A4**: Assess post-incident reporting adequacy

### [P]ropose Changes
- **P1**: Propose notification trigger adjustments
- **P2**: Propose communication channel improvements
- **P3**: Suggest regulatory notification refinements
- **P4**: Recommend reporting enhancements

### [C]ontinue
- **C1**: Accept current tenant notification design and proceed to documentation
- **C2**: Mark step complete and load `step-04-c-create-incident-response-plan.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Notification triggers defined per severity
- [ ] Communication channels documented per tier
- [ ] Regulatory notifications addressed
- [ ] Post-incident reporting defined
- [ ] Patterns align with pattern registry

## Outputs

- Notification trigger matrix
- Communication channel configuration
- Regulatory notification procedures
- Post-incident reporting templates

## Next Step

Proceed to `step-04-c-create-incident-response-plan.md` to create the final documentation.
