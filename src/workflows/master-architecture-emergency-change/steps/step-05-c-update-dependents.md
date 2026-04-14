# Step 5: Update Dependents

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

Propagate the architecture change to all dependent artifacts and systems.

---

## Prerequisites

- Change applied (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### Dependent Artifact Updates

**Module Documentation:**
- Update affected module architecture docs
- Update module contracts if changed
- Update module READMEs with change notes

**API Documentation:**
- Update API specifications if affected
- Update SDK documentation if affected
- Notify API consumers if breaking

**Runbooks and Procedures:**
- Update operational runbooks
- Update incident response procedures
- Update on-call documentation

### Dependent Team Notification

**Immediate Notification:**
- Teams owning affected modules
- On-call engineering
- Customer support (if customer-facing impact)

**Scheduled Notification:**
- All engineering via architecture digest
- Product management
- Executive summary (for critical changes)

### Post-Emergency Tasks

**Schedule Post-Emergency Review:**
- Date within 2 weeks of emergency
- Attendees: All approvers + implementation team
- Agenda:
  - Was this truly an emergency?
  - Was the response appropriate?
  - What could we improve?
  - Is additional work needed?

**Technical Debt Tracking:**
- Create tech debt items for any shortcuts taken
- Link to emergency change ID
- Assign owners and target dates
- Add to sprint planning backlog

**Process Improvement:**
- If emergency revealed architecture weakness, plan remediation
- If emergency process was deficient, propose improvements
- Update emergency change runbook with lessons learned

### Closure

**Emergency Change Closure Checklist:**
- [ ] All dependent artifacts updated
- [ ] All teams notified
- [ ] Post-emergency review scheduled
- [ ] Technical debt items created
- [ ] Emergency change marked complete in tracking system
- [ ] Lessons learned documented

**Verify current best practices with web search:**
Search the web: "update dependents best practices {date}"
Search the web: "update dependents enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the dependent updates above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into lessons learned and process improvement
- **P (Party Mode)**: Bring PM and architect perspectives for closure review
- **C (Continue)**: Accept closure and complete the workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass closure context: teams notified, tech debt created, lessons identified
- Process enhanced insights on process improvement
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into closure report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review closure of emergency architecture change: {summary of change and outcomes}"
- Process collaborative analysis from PM and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save closure report to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Workflow complete - proceed to post-emergency review

---

## Verification

- [ ] Dependent artifacts updated
- [ ] Teams notified
- [ ] Post-emergency review scheduled
- [ ] Technical debt items created
- [ ] Emergency change closed
- [ ] Lessons learned documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Closure report
- Post-emergency action items
- **Load template:** `{project-root}/_bmad/bam/templates/emergency-change-template.md`

---

## Next Step

Complete post-emergency review within 2 weeks.
