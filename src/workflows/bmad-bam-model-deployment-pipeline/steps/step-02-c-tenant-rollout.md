# Step 2: Design Tenant Rollout

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design tenant-specific rollout procedures including tier-based sequencing, opt-in/opt-out mechanisms, scheduling windows, and communication triggers.

---

## Prerequisites

- Step 1 completed with deployment strategy defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `model-deployment`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`

---

## Inputs

- Deployment strategy from Step 1
- Tenant tier definitions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Tier-Based Rollout Sequence

Select rollout strategy:

| Strategy | Order | Rationale |
|----------|-------|-----------|
| Enterprise-First | Enterprise -> Pro -> Free | Highest value tenants get early access, quick feedback |
| Free-First | Free -> Pro -> Enterprise | Test with lower-risk tenants, scale validation |
| Opt-In Only | Based on tenant preference | Maximum flexibility, self-selection |
| Parallel Cohorts | Percentage from each tier | Balanced risk distribution |

Document the chosen strategy with justification.

### 2. Configure Opt-In/Opt-Out Mechanisms

| Mechanism | Implementation | User Experience |
|-----------|----------------|-----------------|
| Feature Flag | GrowthBook/LaunchDarkly | Automatic enrollment |
| Admin Toggle | Tenant admin dashboard | Manual control |
| API Setting | Configuration endpoint | Programmatic control |
| Support Request | Ticket-based | High-touch control |

For each tier, specify:
- Default enrollment state (opt-in vs opt-out)
- Override capabilities
- Cooldown periods
- Reversion procedures

### 3. Define Rollout Scheduling

| Window Type | Description | Applicable Tiers |
|-------------|-------------|------------------|
| Maintenance Window | Scheduled downtime (if needed) | All tiers |
| Business Hours | Rollout during support coverage | Pro, Enterprise |
| Off-Peak | Rollout during low traffic | Free |
| Custom | Tenant-defined windows | Enterprise |

Establish:
- Default rollout windows per tier
- Blackout periods (holidays, major events)
- Time zone considerations
- Rollout velocity (tenants per hour)

### 4. Configure Communication Triggers

| Event | Notification Type | Recipients | Timing |
|-------|-------------------|------------|--------|
| Rollout Scheduled | Email + In-App | Admins | 7 days before |
| Rollout Starting | Email + Webhook | Admins, Devs | 1 hour before |
| Rollout Complete | Email + In-App | Admins | Immediate |
| Issues Detected | Email + SMS | Admins, Support | Immediate |
| Rollback Initiated | Email + SMS + Webhook | All stakeholders | Immediate |

**Verify current best practices with web search:**
Search the web: "tenant rollout strategies multi-tenant SaaS {date}"
Search the web: "feature flag rollout best practices {date}"
Search the web: "staged deployment communication patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant rollout design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tier sequencing and opt-in mechanism design
- **P (Party Mode)**: Bring analyst and architect perspectives for rollout review
- **C (Continue)**: Accept tenant rollout design and proceed to canary deployment
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass rollout context: tier sequencing, opt-in mechanisms, scheduling
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into rollout design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant rollout: {summary of tier sequence and mechanisms}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant rollout design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-canary-deployment.md`

---

## Verification

- [ ] Tier-based rollout sequence defined
- [ ] Opt-in/opt-out mechanisms configured
- [ ] Rollout scheduling windows established
- [ ] Communication triggers documented
- [ ] Rollout velocity determined
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant rollout strategy
- Opt-in/opt-out configuration
- Scheduling matrix
- Communication workflow

---

## Next Step

Proceed to `step-03-c-canary-deployment.md` to configure canary release process.
