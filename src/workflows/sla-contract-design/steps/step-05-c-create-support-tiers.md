# Step 5: Create Support Tiers

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead
- Use web search to verify current best practices when making technology decisions

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design support response time tiers establishing response time commitments, escalation paths, and support channel availability for each tenant tier.

---

## Prerequisites

- Step 4 (Establish Isolation Guarantees) completed
- Isolation guarantees documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `support`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `incident-response`

---

## Inputs

- Isolation guarantees from Step 4
- Support team capacity and capabilities
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Industry support SLA benchmarks

---

## Actions

### 1. Define Support Priority Levels

Establish incident priority classification:

| Priority | Definition | Examples |
|----------|------------|----------|
| P1 - Critical | Complete service outage or severe degradation affecting all tenants | Platform down, data breach, security incident |
| P2 - High | Major functionality impaired for multiple tenants | AI responses failing, authentication issues |
| P3 - Medium | Partial functionality impaired for single tenant | Feature not working, performance degradation |
| P4 - Low | Minor issue with workaround available | UI bug, documentation error |

### 2. Define Response Time SLAs

Establish initial response time commitments per tier and priority:

| Tier | P1 Response | P2 Response | P3 Response | P4 Response |
|------|-------------|-------------|-------------|-------------|
| Free | Best effort | Best effort | Best effort | Best effort |
| Starter | 4 hours | 8 hours | 24 hours | 48 hours |
| Pro | 1 hour | 4 hours | 8 hours | 24 hours |
| Enterprise | 15 minutes | 1 hour | 4 hours | 8 hours |
| Premium | 5 minutes | 30 minutes | 2 hours | 4 hours |

### 3. Define Resolution Time Targets

Establish resolution time targets (not SLA commitments, but targets):

| Tier | P1 Target | P2 Target | P3 Target | P4 Target |
|------|-----------|-----------|-----------|-----------|
| Free | Best effort | Best effort | Best effort | Best effort |
| Starter | 24 hours | 48 hours | 5 days | 10 days |
| Pro | 4 hours | 24 hours | 3 days | 7 days |
| Enterprise | 2 hours | 8 hours | 24 hours | 5 days |
| Premium | 1 hour | 4 hours | 8 hours | 3 days |

### 4. Define Support Channels

Establish support channel availability per tier:

| Tier | Channels | Availability | Language |
|------|----------|--------------|----------|
| Free | Documentation, Community | 24/7 self-service | English |
| Starter | Email, Documentation | Business hours (9-5 local) | English |
| Pro | Email, Chat, Documentation | Extended hours (6am-10pm) | English + 2 languages |
| Enterprise | Email, Chat, Phone, Documentation | 24/7/365 | 10+ languages |
| Premium | All channels + Dedicated Slack | 24/7/365 + Named contacts | All major languages |

### 5. Define Escalation Paths

Establish escalation procedures per tier:

| Escalation Level | Trigger | Timeframe | Notification |
|------------------|---------|-----------|--------------|
| L1 - Frontline | Initial contact | Immediate | Ticket created |
| L2 - Engineering | L1 cannot resolve | P1: 15min, P2: 30min | Manager notified |
| L3 - Senior Engineering | L2 cannot resolve | P1: 30min, P2: 1hr | Director notified |
| L4 - Executive | P1 unresolved | P1 >2hrs | VP/CTO notified |

### 6. Define Support Exclusions

Specify what is NOT covered by support SLAs:

| Exclusion | Description | Alternative |
|-----------|-------------|-------------|
| Custom Integrations | Customer-built integrations | Professional services |
| Training Requests | How-to questions | Documentation, training programs |
| Feature Requests | New feature development | Product roadmap process |
| Third-Party Issues | Problems with customer's tools | Guidance only |
| Abuse Response | Account abuse issues | Security team |

### 7. Define On-Call Commitments (Enterprise+)

| Tier | On-Call | Dedicated TAM | Executive Sponsor |
|------|---------|---------------|-------------------|
| Enterprise | Shared on-call | Assigned TAM | No |
| Premium | Dedicated on-call | Named TAM | Named executive |

**Verify current best practices with web search:**
Search the web: "SaaS support SLA best practices {date}"
Search the web: "enterprise support tier design {date}"
Search the web: "technical support escalation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the support tiers above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into escalation procedures and channel capacity
- **P (Party Mode)**: Bring customer success and operations perspectives for support review
- **C (Continue)**: Accept support tiers and proceed to penalty clause definition
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: response times, channels, escalation paths
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into support tiers
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review support tiers: {summary of response times, channels, escalation}"
- Process collaborative analysis from customer success and operations personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save support tiers to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-define-penalty-clauses.md`

---

## Verification

- [ ] Priority levels clearly defined
- [ ] Response time SLAs established per tier
- [ ] Resolution time targets documented
- [ ] Support channels specified per tier
- [ ] Escalation paths documented
- [ ] Exclusions clearly stated
- [ ] Enterprise-specific commitments defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Support priority classification matrix
- Response time SLA matrix
- Support channel availability matrix
- Escalation procedure documentation

---

## Next Step

Proceed to `step-06-c-define-penalty-clauses.md` to establish SLA breach remedies.
