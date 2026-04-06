# Step 5: Update Dependents

Propagate the architecture change to all dependent artifacts and systems:

## Dependent Artifact Updates

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

## Dependent Team Notification

**Immediate Notification:**
- Teams owning affected modules
- On-call engineering
- Customer support (if customer-facing impact)

**Scheduled Notification:**
- All engineering via architecture digest
- Product management
- Executive summary (for critical changes)

## Post-Emergency Tasks

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

## Closure

**Emergency Change Closure Checklist:**
- [ ] All dependent artifacts updated
- [ ] All teams notified
- [ ] Post-emergency review scheduled
- [ ] Technical debt items created
- [ ] Emergency change marked complete in tracking system
- [ ] Lessons learned documented

Output: Closure report with dependent updates and post-emergency action items.
