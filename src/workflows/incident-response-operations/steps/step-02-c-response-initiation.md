# Step 2: Response Initiation

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

---

## Purpose

Assemble the incident response team, establish communication channels, notify affected stakeholders, and set up incident tracking based on the classified severity level.

---

## Prerequisites

- Incident classification completed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident-response

---

## Inputs

- Incident classification from Step 1
- On-call schedules
- Stakeholder contact lists
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Assemble Response Team

Based on severity level, assemble appropriate team:

| Role | P1 | P2 | P3 | P4 | Assigned |
|------|----|----|----|----|----------|
| Incident Commander | Required | Required | Optional | Optional | {name} |
| Technical Lead | Required | Required | Required | Optional | {name} |
| Communications Lead | Required | Optional | Optional | N/A | {name} |
| Security Lead | If security-related | If security-related | Optional | N/A | {name} |
| AI/ML Lead | If AI-related | If AI-related | Optional | N/A | {name} |

### 2. Establish Communication Channels

Set up communication infrastructure:

| Channel | Purpose | Status |
|---------|---------|--------|
| War room (Slack/Teams) | Real-time coordination | [ ] Created |
| Bridge call | Voice coordination (P1/P2) | [ ] Initiated |
| Status page | External communication | [ ] Updated |
| Internal wiki | Documentation | [ ] Created |

### 3. Notify Stakeholders

Execute notification matrix:

| Stakeholder | P1 | P2 | P3 | P4 | Method | Notified |
|-------------|----|----|----|----|--------|----------|
| Engineering leadership | Immediate | 15 min | Daily summary | Weekly | Slack/Page | [ ] |
| Customer success | Immediate | 30 min | 4 hours | As needed | Email/Slack | [ ] |
| Affected tenants | 30 min | 1 hour | 8 hours | N/A | Status page/Email | [ ] |
| Executive team | If extended | Major impact | N/A | N/A | Email | [ ] |

### 4. Set Up Incident Tracking

Create incident tracking record:

| Field | Value |
|-------|-------|
| Incident ID | INC-{YYYY}-{NNNN} |
| Status | Investigating / Identified / Monitoring / Resolved |
| Start time | {timestamp} |
| Severity | P{1-4} |
| Affected tenants | {list or count} |
| War room link | {URL} |
| Status page link | {URL} |

### 5. Define Communication Cadence

Establish update schedule:

| Severity | Internal Updates | External Updates |
|----------|------------------|------------------|
| P1 | Every 15 minutes | Every 30 minutes |
| P2 | Every 30 minutes | Every hour |
| P3 | Every 2 hours | As needed |
| P4 | Daily | N/A |

---

## COLLABORATION MENUS (A/P/C):

After completing the response initiation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into team composition and communication strategy
- **P (Party Mode)**: Bring SRE and customer success perspectives on stakeholder management
- **C (Continue)**: Accept response initiation and proceed to investigation
- **[Specific refinements]**: Describe response concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: team composition, communication channels, notification status
- Process enhanced insights on response coordination
- Ask user: "Accept these refined response decisions? (y/n)"
- If yes, integrate into incident report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident response initiation for multi-tenant AI platform"
- Process SRE and customer success perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save response initiation to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-investigation-procedures.md`

---

**Verify current best practices with web search:**
Search the web: "response initiation best practices {date}"
Search the web: "response initiation multi-tenant SaaS {date}"

## Verification

- [ ] Response team assembled
- [ ] Communication channels established
- [ ] Stakeholders notified per severity level
- [ ] Incident tracking record created
- [ ] Communication cadence defined

---

## Outputs

- Response team roster
- Communication channel links
- Stakeholder notification log
- Incident tracking record

---

## Next Step

Proceed to `step-03-c-investigation-procedures.md` to begin investigation.
