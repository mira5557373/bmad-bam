# QG-IR1: Incident Response Checklist

> Gate ID: QG-IR1 (Incident Response)
> Incident response checklist MUST be followed for all production incidents.
> Gate definition: structured response process ensuring rapid mitigation and tenant protection.
> Workflow integration: Activated when incident detected or reported.
> Executing workflow: `incident-response-procedure` (manual with automation support)
>
> **Incident Lifecycle:** Detection → Classification → Response → Investigation →
> Mitigation → Resolution → Postmortem. This gate tracks each phase to ensure
> consistent, effective incident handling that protects tenant SLAs.
> Severity determines response timelines and escalation requirements.

## Incident Classification

### Severity Matrix

| Severity | Definition | Response Time | Resolution Target |
|----------|------------|---------------|-------------------|
| **P1 - Critical** | Service outage affecting multiple tenants, data breach | < 15 min | < 4 hours |
| **P2 - High** | Major feature unavailable, single tenant severely impacted | < 30 min | < 8 hours |
| **P3 - Medium** | Degraded performance, workaround available | < 2 hours | < 24 hours |
| **P4 - Low** | Minor issue, minimal impact | < 8 hours | < 72 hours |

### Classification Checklist

- [ ] **CRITICAL:** Incident severity classified (P1/P2/P3/P4)
- [ ] **CRITICAL:** Affected tenants identified
- [ ] Impact scope documented (users, features, data)
- [ ] Business impact assessed
- [ ] Incident ticket created with unique ID

## Initial Response

### Acknowledgment (within response time target)

- [ ] **CRITICAL:** Incident acknowledged by on-call
- [ ] **CRITICAL:** Incident commander designated (P1/P2)
- [ ] Initial assessment completed
- [ ] Response team assembled (for P1/P2)

### Communication

- [ ] **CRITICAL:** Internal stakeholders notified
- [ ] Status page updated (P1/P2)
- [ ] Affected tenant notification initiated (P1/P2)
- [ ] Executive notification (P1 only)
- [ ] Regular update cadence established

### Tenant Notification Requirements

| Severity | Notification Required | Timeline |
|----------|----------------------|----------|
| P1 | All affected tenants | Within 30 minutes |
| P2 | Enterprise tier tenants | Within 1 hour |
| P3 | Upon request | Within 4 hours |
| P4 | Not required | N/A |

## Escalation Matrix

| Escalation Level | Trigger | Contacts |
|------------------|---------|----------|
| Level 1 | Initial response | On-call engineer |
| Level 2 | > 30 min P1, > 1 hr P2 | Engineering manager, SRE lead |
| Level 3 | > 1 hr P1, > 2 hr P2 | VP Engineering, CTO |
| Level 4 | Data breach, legal impact | Executive team, Legal |

- [ ] Escalation path documented and accessible
- [ ] Current escalation level tracked
- [ ] Escalation notifications sent as required

## Investigation Steps

### Data Collection

- [ ] **CRITICAL:** Relevant logs collected (application, system, audit)
- [ ] **CRITICAL:** Distributed traces captured
- [ ] Metrics snapshots taken (before, during incident)
- [ ] Error messages documented
- [ ] User reports collected

### Analysis

- [ ] Timeline of events reconstructed
- [ ] Root cause hypothesis formed
- [ ] Change correlation checked (recent deployments, config changes)
- [ ] **CRITICAL:** Tenant isolation verified (no cross-tenant impact)
- [ ] Blast radius determined

## Mitigation Actions

### Immediate Mitigation Options

| Action | When to Use | Considerations |
|--------|-------------|----------------|
| Rollback | Bad deployment identified | Verify rollback safe, check data migrations |
| Scaling | Resource exhaustion | Cost implications, temporary measure |
| Isolation | Single tenant/component affected | Impact on affected parties |
| Feature disable | Feature-specific issue | User communication required |
| Failover | Infrastructure failure | Verify DR readiness |

### Mitigation Checklist

- [ ] **CRITICAL:** Mitigation action selected
- [ ] **CRITICAL:** Mitigation action executed
- [ ] Mitigation effectiveness verified
- [ ] Temporary vs permanent fix documented
- [ ] **CRITICAL:** Tenant service restored

## Resolution Verification

### Root Cause

- [ ] **CRITICAL:** Root cause identified
- [ ] Contributing factors documented
- [ ] Fix developed or identified
- [ ] **CRITICAL:** Fix deployed (or scheduled for permanent fix)

### Verification

- [ ] **CRITICAL:** Service fully restored
- [ ] **CRITICAL:** All affected tenants verified operational
- [ ] Monitoring confirms normal operation
- [ ] No recurring symptoms observed
- [ ] Incident marked as resolved

## Post-Incident

### Immediate (within 24 hours)

- [ ] **CRITICAL:** Postmortem scheduled (P1/P2)
- [ ] Initial incident summary documented
- [ ] Customer communication sent (resolution notice)
- [ ] Status page updated to resolved

### Follow-up (within 5 business days)

- [ ] Blameless postmortem completed
- [ ] Action items created with owners and due dates
- [ ] Runbooks updated if gaps identified
- [ ] Monitoring/alerting improvements identified
- [ ] Architecture improvements documented (if applicable)

### Action Item Tracking

| Priority | Due Date | Category |
|----------|----------|----------|
| P1 - Prevent recurrence | 7 days | Detection, Prevention |
| P2 - Improve detection | 14 days | Monitoring, Alerting |
| P3 - Process improvement | 30 days | Documentation, Training |

- [ ] All action items assigned
- [ ] Action item review scheduled

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | Incident resolved, service restored, postmortem scheduled, action items documented |
| **CONDITIONAL** | Service restored but root cause unclear — extended monitoring, expedited postmortem |
| **FAIL** | Service not restored, ongoing impact — remain in incident mode, escalate |
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

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Incident Classification | CRITICAL | Severity delayed >5 min | Severity not assigned |
| Initial Response | CRITICAL | Acknowledgment delayed | No acknowledgment |
| Communication | CRITICAL | Partial notification | No internal notification |
| Investigation Steps | CRITICAL | Partial log collection | No logs/traces |
| Mitigation Actions | CRITICAL | Mitigation delayed | No mitigation executed |
| Resolution Verification | CRITICAL | Root cause unclear | Service not restored |
| Post-Incident | CRITICAL | Postmortem delayed | No postmortem for P1/P2 |
| Escalation Matrix | Non-critical | Escalation not tracked | N/A |
| Action Item Tracking | Non-critical | Action items incomplete | N/A |

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Immediate incident remediation (target: per severity SLA)
   - Re-assess incident severity and impact
   - Verify all critical response steps executed
   - Ensure mitigation actions completed
   - Confirm service restoration
   - Re-evaluate gate status
   - **Lock passed categories**

2. **Attempt 2:** Extended incident response (target: 2x severity SLA)
   - Escalate to next level per escalation matrix
   - Expand response team with additional expertise
   - Consider alternate mitigation strategies
   - Engage subject matter experts
   - Re-evaluate gate status
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to VP Engineering and CTO
   - Document incident response failures
   - Communicate extended timeline to stakeholders
   - Conduct emergency architecture review if systemic
   - Document all attempts for postmortem analysis

## Web Research Verification

- [ ] Search the web: "incident response SaaS platform best practices {date}" - Verify response procedures
- [ ] Search the web: "multi-tenant incident communication patterns {date}" - Confirm notification patterns are current
- [ ] _Source: [URL]_ citations documented for key incident response decisions

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Incident monitoring setup
- `bmad-bam-disaster-recovery-design` - Recovery procedures
- `bmad-bam-postmortem-process` - Post-incident analysis
- `bmad-bam-tenant-communication-design` - Tenant notification

**PASS CRITERIA:** Service restored, all CRITICAL items completed, postmortem scheduled
**OWNER:** Incident Commander (designated per incident)
**REVIEWERS:** Engineering Manager, SRE Lead
