# Step 6: Design Incident Communication

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

Design the incident communication workflow for notifying tenants about system issues, outages, degradation, and resolution, ensuring timely and transparent communication throughout incident lifecycle.

---

## Prerequisites

- Step 5 (Establish Escalation Paths) completed
- Escalation path design document available
- Incident classification framework
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident-communication
- **Web research (if available):** Search for incident communication best practices

---

## Inputs

- Escalation path design from Step 5
- Incident classification framework
- Tenant tier definitions
- Status page requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Incident Classification

Establish incident severity and communication mapping:

| Severity | Definition | Communication Scope | Timeline |
|----------|------------|---------------------|----------|
| P1 - Critical | Full outage, all tenants | All tenants, status page | 5 min initial |
| P2 - Major | Partial outage, multiple tenants | Affected tenants, status page | 15 min initial |
| P3 - Minor | Limited impact, workaround exists | Affected tenants | 30 min initial |
| P4 - Low | Minimal impact | Optional notification | 1 hour if needed |

### 2. Design Communication Lifecycle

Map communication points in incident timeline:

| Phase | Communication Type | Timing | Content |
|-------|-------------------|--------|---------|
| Detection | Initial Alert | Within SLA | Issue detected, investigating |
| Investigation | Update | Every 15-30 min | Investigation progress |
| Identification | Root Cause | When identified | Cause identified, working on fix |
| Mitigation | Workaround Available | When available | Temporary workaround steps |
| Resolution | Fix Applied | When applied | Issue resolved, monitoring |
| Post-incident | Summary | Within 24-48h | Full incident summary |

### 3. Specify Per-Severity Communication

Document communication requirements by severity:

| Severity | Initial | Updates | Resolution | Postmortem |
|----------|---------|---------|------------|------------|
| P1 | All channels, immediate | Every 15 min | All channels | Required, public |
| P2 | Email + Status page | Every 30 min | Email + Status | Required, affected |
| P3 | Email to affected | Hourly | Email | Optional |
| P4 | In-app only | None | In-app | None |

### 4. Design Status Page Integration

Specify status page requirements:

| Component | Specification | Update Frequency |
|-----------|---------------|------------------|
| Overall Status | Operational / Degraded / Outage | Real-time |
| Component Status | Per-service health | Real-time |
| Incident Log | Active and recent incidents | Per update |
| Scheduled Maintenance | Upcoming maintenance windows | As scheduled |
| Historical Uptime | 30/90/365 day metrics | Daily |
| Tenant-Specific | Per-tenant status (Enterprise) | Real-time |

### 5. Plan Targeted Communication

Define audience targeting for incidents:

| Targeting Criteria | Use Case | Implementation |
|-------------------|----------|----------------|
| All Tenants | Platform-wide outage | Broadcast |
| Affected Region | Regional outage | Region filter |
| Affected Tier | Tier-specific feature | Tier filter |
| Affected Service | Component outage | Usage-based filter |
| Individual Tenant | Tenant-specific issue | Direct contact |

### 6. Design AI-Specific Incident Types

Document AI workload incident communication:

| AI Incident | Communication Approach | Special Handling |
|-------------|------------------------|------------------|
| LLM Provider Outage | All AI users, fallback status | Include provider status |
| Token Exhaustion | Affected tenant, usage details | Include remediation |
| Agent Failure | Technical contacts, diagnostics | Include error context |
| Rate Limiting | Affected users, quota info | Include tier upgrade option |
| Model Deprecation | Advance notice, migration guide | Minimum 30 days notice |
| Prompt Injection | Security contacts, isolation | Redact sensitive details |

### 7. Specify Communication Templates

Document incident-specific templates:

| Template ID | Purpose | Key Variables |
|-------------|---------|---------------|
| INC-INITIAL | Initial notification | severity, summary, impact, eta |
| INC-UPDATE | Progress update | update_number, progress, next_update |
| INC-RESOLVED | Resolution notice | resolution_time, summary, next_steps |
| INC-POSTMORTEM | Post-incident summary | root_cause, timeline, prevention |
| INC-MAINTENANCE | Scheduled maintenance | window, impact, actions_required |

**Verify current best practices with web search:**
Search the web: "incident communication SaaS best practices {date}"
Search the web: "status page design patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the incident communication design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into incident lifecycle or status page design
- **P (Party Mode)**: Bring SRE, support, and communication perspectives
- **C (Continue)**: Accept incident design and proceed to feature announcements
- **[Specific refinements]**: Describe incident communication concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: incident classification, lifecycle, templates
- Process enhanced insights on incident communication
- Ask user: "Accept these refined incident decisions? (y/n)"
- If yes, integrate into incident design document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident communication design for multi-tenant AI platform"
- Process SRE, support, and communication perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save incident communication design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-plan-feature-announcements.md`

---

## Verification

- [ ] Incident classification defined
- [ ] Communication lifecycle documented
- [ ] Per-severity requirements specified
- [ ] Status page integration planned
- [ ] Targeted communication designed
- [ ] AI-specific incidents covered
- [ ] Communication templates specified

---

## Outputs

- Incident communication design document
- Status page specification
- Incident template catalog
- **Load template:** `{project-root}/_bmad/bam/templates/incident-communication-template.md`

---

## Next Step

Proceed to `step-07-c-plan-feature-announcements.md` to design feature rollout communications.
