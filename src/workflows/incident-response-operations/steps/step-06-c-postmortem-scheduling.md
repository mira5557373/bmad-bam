# Step 6: Postmortem Scheduling

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

---

## Purpose

Schedule the postmortem meeting, assign action item owners, document lessons learned, and update runbooks to prevent recurrence and improve future incident response.

---

## Prerequisites

- Resolution verified (Step 5)
- Incident closed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident-response

---

## Inputs

- Full incident report from Steps 1-5
- Team availability
- Runbook repository
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Schedule Postmortem Meeting

| Field | Value |
|-------|-------|
| Meeting date | {date within SLA} |
| Duration | {30-60 min typical} |
| Attendees | {required attendees} |
| Facilitator | {name} |
| Scribe | {name} |

Postmortem SLA by severity:

| Severity | Postmortem Deadline |
|----------|---------------------|
| P1 | Within 3 business days |
| P2 | Within 5 business days |
| P3 | Within 10 business days |
| P4 | Monthly review (batched) |

### 2. Prepare Postmortem Document

Structure initial postmortem document:

| Section | Content |
|---------|---------|
| Incident summary | {brief description} |
| Timeline | {from Step 3} |
| Root cause | {from investigation} |
| Impact | {tenant and service impact} |
| Mitigation | {actions taken} |
| Detection | How was it detected? |
| Response | Response effectiveness |
| Recovery | Recovery process review |

### 3. Identify Action Items

Document action items with owners and deadlines:

| ID | Action Item | Owner | Priority | Deadline | Status |
|----|-------------|-------|----------|----------|--------|
| AI-1 | {action description} | {name} | P1/P2/P3 | {date} | Open |
| AI-2 | {action description} | {name} | P1/P2/P3 | {date} | Open |
| AI-3 | {action description} | {name} | P1/P2/P3 | {date} | Open |

Action item categories:
- **Detection**: Improve monitoring/alerting
- **Prevention**: Prevent recurrence
- **Response**: Improve response procedures
- **Recovery**: Improve recovery capabilities

### 4. Document Lessons Learned

| Category | Lesson | Recommendation |
|----------|--------|----------------|
| What went well | {description} | Continue doing |
| What didn't go well | {description} | Improve by {action} |
| Where we got lucky | {description} | Address with {action} |

### 5. Update Runbooks

Identify runbook updates needed:

| Runbook | Update Needed | Owner | Status |
|---------|---------------|-------|--------|
| {runbook name} | {description of update} | {name} | Pending |
| {runbook name} | {description of update} | {name} | Pending |

New runbooks to create:
- [ ] {new runbook description}
- [ ] {new runbook description}

**Verify current best practices with web search:**
Search the web: "blameless postmortem best practices SaaS {date}"
Search the web: "incident postmortem action items tracking {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the postmortem scheduling above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into action item prioritization
- **P (Party Mode)**: Bring engineering and SRE perspectives on lessons learned
- **C (Continue)**: Finalize incident response workflow
- **[Specific refinements]**: Describe postmortem concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: action items, lessons learned, runbook updates
- Process enhanced insights on improvement priorities
- Ask user: "Accept these refined postmortem plans? (y/n)"
- If yes, integrate into postmortem document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident postmortem planning for multi-tenant AI platform"
- Process engineering and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save postmortem scheduling to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Mark workflow as complete

---

## Verification

- [ ] Postmortem meeting scheduled within SLA
- [ ] Postmortem document prepared
- [ ] Action items assigned with owners and deadlines
- [ ] Lessons learned documented
- [ ] Runbook updates identified

---

## Outputs

- Postmortem meeting invitation
- Initial postmortem document
- Action items tracker
- Runbook update plan
- **Load template:** `{project-root}/_bmad/bam/templates/postmortem-template.md`

---

## Workflow Complete

The incident response workflow is complete. Key artifacts produced:
- Incident report: `{output_folder}/operations/incidents/incident-{id}-report.md`
- Postmortem document: `{output_folder}/operations/incidents/incident-{id}-postmortem.md`

Next steps:
- Conduct postmortem meeting as scheduled
- Track action items to completion
- Update runbooks as identified
- Consider running `validate` mode to verify QG-IR1 compliance
