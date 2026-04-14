# Step 3: Define Communication Plan

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when defining communication plans
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Define communication cadence, channels, and templates for each stakeholder group, ensuring effective information flow and engagement throughout the platform initiative.

## Prerequisites

- Stakeholders identified (Step 1)
- Interests and influence mapped (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: governance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: communication


---

## Inputs

- Stakeholder registry and interest mapping from Steps 1-2
- Interest-influence matrix
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Communication Cadence

Establish communication frequency per stakeholder category:

| Category | Cadence | Format | Owner |
|----------|---------|--------|-------|
| Core | Daily standups, Weekly syncs | Sync meetings, Slack | Project Lead |
| Advisory | Bi-weekly reviews | Steering committee | Program Manager |
| Informed | Monthly updates | Newsletter, Email | Communications |
| Peripheral | Quarterly briefings | All-hands, Docs | Leadership |

### 2. Define Communication Channels

Map appropriate channels per stakeholder type and urgency:

| Stakeholder Group | Primary Channel | Secondary Channel | Escalation Channel |
|-------------------|-----------------|-------------------|-------------------|
| Engineering | Slack, GitHub | Email | Direct call |
| Product | Slack, Jira | Email, Confluence | Video call |
| Operations | PagerDuty, Slack | Email | War room |
| Security | Secure channel | Email | Incident bridge |
| Enterprise Customers | Dedicated Slack | Email, Support | Account manager |
| Pro Customers | Email, In-app | Support portal | Escalation email |
| Partners | Partner portal | Email | Partner manager |

**Channel Selection Criteria:**
- Urgency: Real-time vs asynchronous
- Sensitivity: Public vs private
- Formality: Documentation needs
- Accessibility: Timezone considerations

### 3. Create Communication Templates

Define templates for common communication types:

| Template Type | Use Case | Audience | Format |
|---------------|----------|----------|--------|
| Status Update | Weekly progress | Core, Advisory | Structured report |
| Decision Request | Approval needed | Decision makers | Brief with options |
| Incident Notification | Service impact | All affected | Alert with details |
| Milestone Announcement | Major achievement | All stakeholders | Celebration format |
| Change Notification | Breaking changes | Partners, Customers | Technical notice |
| Feedback Request | Input gathering | Selected groups | Survey/form |

**Status Update Template Structure:**
1. Executive Summary (2-3 sentences)
2. Progress Since Last Update
3. Key Decisions Made
4. Blockers and Risks
5. Upcoming Milestones
6. Action Items

### 4. Schedule Regular Touchpoints

Define scheduled communication events:

| Event | Frequency | Participants | Duration | Owner |
|-------|-----------|--------------|----------|-------|
| Daily Standup | Daily | Core engineering | 15 min | Tech Lead |
| Sprint Review | Bi-weekly | Core + Product | 1 hour | PM |
| Architecture Review | Bi-weekly | Technical Advisory | 1.5 hours | Architect |
| Steering Committee | Monthly | Executive sponsors | 1 hour | Program Mgr |
| Customer Advisory Board | Quarterly | Key customers | 2 hours | Customer Success |
| Partner Sync | Monthly | Technology partners | 1 hour | Partner Mgr |
| All-Hands Update | Quarterly | All stakeholders | 30 min | Leadership |

### 5. Define Escalation Paths

Establish escalation procedures:

| Severity | Timeline | Escalation Path | Communication |
|----------|----------|-----------------|---------------|
| Critical | Immediate | Tech Lead -> VP Eng -> CTO | War room, Executive brief |
| High | < 4 hours | PM -> Director -> VP | Urgent email, Status page |
| Medium | < 24 hours | Team Lead -> Manager | Standard channels |
| Low | < 1 week | Normal workflow | Async updates |

**Soft Gate:** Steps 1-3 complete the core stakeholder analysis.

Present summary of identified stakeholders, interest mapping, and communication plan. Ask for confirmation before proceeding to RACI matrix creation.

**Verify current best practices with web search:**
Search the web: "stakeholder communication plan SaaS {date}"
Search the web: "enterprise software stakeholder engagement {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze Options
- **A1**: Review communication cadence appropriateness
- **A2**: Analyze channel selection for each stakeholder
- **A3**: Evaluate template coverage for common scenarios
- **A4**: Assess escalation path completeness

### [P]ropose Changes
- **P1**: Propose cadence adjustments based on stakeholder needs
- **P2**: Suggest alternative communication channels
- **P3**: Recommend additional communication templates
- **P4**: Propose escalation path refinements

### [C]ontinue
- **C1**: Accept communication plan and proceed to RACI matrix
- **C2**: Mark step complete and load `step-04-c-create-raci-matrix.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Communication cadence defined for all categories
- [ ] Channels mapped per stakeholder group
- [ ] Templates created for common communications
- [ ] Regular touchpoints scheduled
- [ ] Escalation paths documented
- [ ] Patterns align with pattern registry

## Outputs

- Communication cadence matrix
- Channel mapping documentation
- Communication templates
- Touchpoint schedule
- Escalation procedures
- **Load template:** `{project-root}/_bmad/bam/templates/stakeholder-map-template.md`

## Next Step

Proceed to `step-04-c-create-raci-matrix.md` to create RACI matrix for platform decisions.
