# QG-OC: Continuous Operations Checklist

> Gate ID: QG-OC (Operations Continuous)
> Operational health MUST be verified continuously in production.
> Gate definition: verifies operational procedures, postmortem process, and continuous improvement.
> Workflow integration: BAM operations workflows feed into this gate.
> Executing workflow: `postmortem-process`
>
> **Operational Gate:** Unlike pre-release gates, QG-OC is evaluated continuously
> during production operations. Failures trigger process improvement reviews.

## Postmortem Process Verification

### Postmortem Document Completeness

- [ ] Incident timeline documented with timestamps
- [ ] Root cause analysis completed (5 Whys or similar)
- [ ] Contributing factors identified beyond root cause
- [ ] Impact assessment quantified (tenants, duration, severity)
- [ ] Detection method documented (automated vs manual)
- [ ] Response timeline evaluated against SLOs
- [ ] Resolution steps documented in detail
- [ ] Lessons learned section completed

### Action Item Tracking

- [ ] Action items have owners assigned
- [ ] Action items have due dates
- [ ] Action items categorized (prevention, detection, response)
- [ ] High-priority items have implementation timeline
- [ ] Action item completion rate tracked
- [ ] Recurring issues identified and escalated
- [ ] Cross-team dependencies documented

### Postmortem Review Process

- [ ] Postmortem conducted within 5 business days
- [ ] Blameless culture maintained in discussion
- [ ] All stakeholders participated or reviewed
- [ ] Follow-up meeting scheduled for action items
- [ ] Postmortem shared with relevant teams
- [ ] Learnings added to knowledge base

## Operational Metrics

### Incident Metrics

- [ ] Mean Time to Detect (MTTD) tracked per incident type
- [ ] Mean Time to Respond (MTTR) tracked per severity
- [ ] Mean Time to Resolve tracked per category
- [ ] Incident recurrence rate monitored
- [ ] Tenant impact correlation analyzed
- [ ] SLO breach correlation tracked

### Process Metrics

- [ ] Postmortem completion rate > 95% for SEV1-2
- [ ] Action item completion rate > 80% within 30 days
- [ ] Recurring incident rate < 10%
- [ ] Time to postmortem < 5 business days
- [ ] Stakeholder participation rate tracked

## Continuous Improvement

### Knowledge Management

- [ ] Runbooks updated based on incidents
- [ ] Playbooks created for new incident types
- [ ] Automation opportunities identified
- [ ] Training needs identified and scheduled
- [ ] Documentation gaps addressed

### Process Improvement

- [ ] Alerting rules refined based on false positives
- [ ] Detection coverage expanded for missed issues
- [ ] Response procedures optimized
- [ ] Escalation paths validated
- [ ] Communication templates improved

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns {date}" - Confirm validation approach
- [ ] _Source: [URL]_ citations documented for key decisions

## Related Patterns

Load decision criteria from pattern registry:

- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `operations-*`
- **Reliability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `reliability-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "postmortem process best practices {date}"
- Search: "blameless incident review SRE {date}"
- Search: "continuous operations improvement SaaS {date}"

## Gate Decision

| Outcome | Criteria |
|---------|----------|
| **PASS** | All categories GREEN — Continue monitoring |
| **CONDITIONAL** | Any CRITICAL category YELLOW — Remediate within 5 business days, proceed with mitigation plan |
| **FAIL** | Any CRITICAL category RED — Trigger process improvement review, block release |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category                    | Classification | CONDITIONAL Threshold | FAIL Threshold |
| --------------------------- | -------------- | ------------------ | ------------------ |
| Postmortem Document         | CRITICAL       | Missing sections   | No postmortem >5d  |
| Action Item Tracking        | CRITICAL       | Completion <60%    | Completion <40%    |
| Postmortem Review Process   | Non-critical   | Review delayed     | No stakeholders    |
| Operational Metrics         | CRITICAL       | Metrics gaps       | No metrics tracked |
| Continuous Improvement      | Non-critical   | Docs outdated      | No improvement     |

## Recovery Protocol

**If QG-OC triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Immediate remediation (target: 5 business days)
   - Identify missing postmortem document sections
   - Assign owners to orphaned action items
   - Schedule overdue postmortem review meetings
   - Update operational metrics dashboards
   - Review runbooks for identified gaps
   - Re-evaluate gate status after corrections
   - **Lock passed categories** — focus on remaining gaps

2. **Attempt 2:** Deep investigation (target: 1-2 weeks)
   - Engage SRE and Engineering leads
   - Analyze action item completion blockers
   - Review recurring incident patterns
   - Update postmortem template for missing sections
   - Implement automation for metric collection
   - Create training for blameless culture
   - Re-evaluate gate status after improvements
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to VP Engineering and SRE leadership
   - Document systemic process failures
   - Conduct retrospective on operations culture
   - Consider external operations maturity assessment
   - Create organizational improvement plan
   - Define operations excellence OKRs
   - Schedule follow-up review within 30 days

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Postmortem Document | Complete missing sections | No postmortem for SEV1-2 |
| Action Item Tracking | Assign owners, set deadlines | Completion rate <40% |
| Postmortem Review | Schedule review, invite stakeholders | Review >10 days late |
| Operational Metrics | Fix metric collection, update dashboards | Critical metrics missing |
| Continuous Improvement | Update runbooks, create automation | Recurring incidents |

## Related Workflows

- `bmad-bam-postmortem-process` - Postmortem creation
- `bmad-bam-tenant-aware-observability` - Observability setup
- `bmad-bam-incident-response-operations` - Incident handling

**PASS CRITERIA:** All CRITICAL checkboxes completed, operations excellence maintained
**OWNER:** SRE Lead
**REVIEWERS:** Engineering Manager, VP Engineering
