---
name: qg-ir-incident-response
description: Incident response gate - verifies detection, triage, resolution, and tenant notification procedures
module: bam
tags: [incident, quality-gate, multi-tenant, operations, response]
version: 2.0.0
---

# QG-IR: Incident Response Gate Checklist

> **Gate ID:** QG-IR (Incident Response)
> **Definition:** Incident response processes MUST be established before production deployment.
> **Scope:** Covers incident detection, classification, response procedures, and tenant communication.
> **Recovery:** Gate failure requires establishing incident response procedures before production.

**Workflow:** bmad-bam-incident-response-design, bmad-bam-tenant-aware-observability
**Prerequisites:** QG-OPS (Operations Gate), used during live incident response

---

## Purpose

The Incident Response Gate (QG-IR) validates incident management capabilities. This gate ensures:

1. **Incident detection** is automated with appropriate thresholds
2. **Classification** follows severity matrix with clear escalation paths
3. **Response procedures** are documented and tested
4. **Tenant communication** is timely and appropriate per SLA
5. **Post-incident** processes drive continuous improvement

Passing QG-IR ensures the team can respond effectively to production incidents.

---

## Incident Classification

### Severity Matrix

| Severity | Definition | Response Time | Resolution Target |
|----------|------------|---------------|-------------------|
| **P1 - Critical** | Service outage affecting multiple tenants, data breach | < 15 min | < 4 hours |
| **P2 - High** | Major feature unavailable, single tenant severely impacted | < 30 min | < 8 hours |
| **P3 - Medium** | Degraded performance, workaround available | < 2 hours | < 24 hours |
| **P4 - Low** | Minor issue, minimal impact | < 8 hours | < 72 hours |

### Classification Checklist

- [ ] **CRITICAL:** Severity matrix documented and accessible
- [ ] **CRITICAL:** Incident severity classification process defined
- [ ] **CRITICAL:** Affected tenant identification procedure documented
- [ ] Impact scope assessment criteria defined (users, features, data)
- [ ] Business impact assessment framework established
- [ ] Incident ticket template configured with unique ID generation

---

## Initial Response

### Acknowledgment (within response time target)

- [ ] **CRITICAL:** On-call rotation configured and staffed
- [ ] **CRITICAL:** Incident acknowledgment SLA enforced by tooling
- [ ] **CRITICAL:** Incident commander designation process for P1/P2
- [ ] Initial assessment checklist documented
- [ ] Response team assembly procedure for P1/P2

### Communication Procedures

- [ ] **CRITICAL:** Internal stakeholder notification process documented
- [ ] **CRITICAL:** Status page integration configured (P1/P2 auto-update)
- [ ] **CRITICAL:** Tenant notification templates prepared
- [ ] Executive notification process (P1 only)
- [ ] Regular update cadence defined per severity

### Tenant Notification Requirements

| Severity | Notification Required | Timeline |
|----------|----------------------|----------|
| P1 | All affected tenants | Within 30 minutes |
| P2 | Enterprise tier tenants | Within 1 hour |
| P3 | Upon request | Within 4 hours |
| P4 | Not required | N/A |

- [ ] **CRITICAL:** Tenant notification SLAs documented
- [ ] **CRITICAL:** Notification delivery verified (email, in-app)
- [ ] Per-tenant impact assessment process defined

---

## Escalation Matrix

| Escalation Level | Trigger | Contacts |
|------------------|---------|----------|
| Level 1 | Initial response | On-call engineer |
| Level 2 | > 30 min P1, > 1 hr P2 | Engineering manager, SRE lead |
| Level 3 | > 1 hr P1, > 2 hr P2 | VP Engineering, CTO |
| Level 4 | Data breach, legal impact | Executive team, Legal |

- [ ] **CRITICAL:** Escalation matrix documented and accessible
- [ ] **CRITICAL:** Escalation contacts current (verified monthly)
- [ ] Current escalation level tracking in incident tooling
- [ ] Automatic escalation triggers configured

---

## Investigation Steps

### Data Collection

- [ ] **CRITICAL:** Log aggregation configured for incident analysis
- [ ] **CRITICAL:** Distributed tracing operational
- [ ] Metrics snapshot automation available
- [ ] Error message collection from all services
- [ ] User report intake process defined

### Analysis

- [ ] Timeline reconstruction tools available
- [ ] Root cause hypothesis documentation template
- [ ] Change correlation (deployments, config changes) automated
- [ ] **CRITICAL:** Tenant isolation verification procedure
- [ ] Blast radius determination process documented

---

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

- [ ] **CRITICAL:** Mitigation action selection criteria documented
- [ ] **CRITICAL:** Mitigation execution runbooks available
- [ ] **CRITICAL:** Mitigation effectiveness verification process
- [ ] Temporary vs permanent fix classification documented
- [ ] **CRITICAL:** Tenant service restoration verification

---

## Resolution Verification

### Root Cause Identification

- [ ] **CRITICAL:** Root cause analysis template available
- [ ] Contributing factors documentation process
- [ ] Fix identification and verification procedure
- [ ] **CRITICAL:** Fix deployment or scheduling process

### Service Verification

- [ ] **CRITICAL:** Service restoration verification checklist
- [ ] **CRITICAL:** Affected tenant operational verification
- [ ] Monitoring confirmation of normal operation
- [ ] Recurring symptom detection window (4 hours)
- [ ] Incident resolution marking criteria

---

## Post-Incident

### Immediate (within 24 hours)

- [ ] **CRITICAL:** Postmortem scheduling requirement (P1/P2)
- [ ] Initial incident summary documentation
- [ ] Customer resolution communication sent
- [ ] Status page update to resolved

### Follow-up (within 5 business days)

- [ ] **CRITICAL:** Blameless postmortem conducted
- [ ] **CRITICAL:** Action items created with owners and due dates
- [ ] Runbook updates from gaps identified
- [ ] Monitoring/alerting improvements documented
- [ ] Architecture improvements documented (if applicable)

### Action Item Tracking

| Priority | Due Date | Category |
|----------|----------|----------|
| P1 - Prevent recurrence | 7 days | Detection, Prevention |
| P2 - Improve detection | 14 days | Monitoring, Alerting |
| P3 - Process improvement | 30 days | Documentation, Training |

- [ ] **CRITICAL:** Action item assignment verification
- [ ] Action item review scheduling

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, incident response procedures verified |
| **CONDITIONAL** | CRITICAL items pass but procedures untested - schedule drill within 30 days |
| **FAIL** | Any CRITICAL item fails - block production until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Severity Matrix | CRITICAL | Minor gaps | Not documented |
| On-Call Rotation | CRITICAL | Gaps in coverage | No on-call |
| Incident Commander | CRITICAL | Process unclear | Not defined |
| Internal Communication | CRITICAL | Partial notification | No process |
| Tenant Notification | CRITICAL | SLA unclear | Not defined |
| Escalation Matrix | CRITICAL | Contacts outdated | Not documented |
| Log/Trace Collection | CRITICAL | Partial coverage | Not operational |
| Tenant Isolation Verification | CRITICAL | Process unclear | Not defined |
| Mitigation Runbooks | CRITICAL | Partial coverage | No runbooks |
| Postmortem Process | CRITICAL | Process informal | Not defined |
| Action Item Tracking | Non-critical | Incomplete tracking | N/A |

---

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Engineering Manager or SRE Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If QG-IR fails:**

1. **Attempt 1:** Immediate documentation (target: 1 week)
   - Document missing incident response procedures
   - Configure on-call rotation and alerting
   - Create escalation matrix with contacts
   - Prepare tenant notification templates
   - Re-run QG-IR validation after documentation
   - **Lock passed categories** - do not re-test locked items

2. **Attempt 2:** Process validation (target: 1 week)
   - Conduct tabletop exercise to test procedures
   - Verify tooling integration (alerting, status page)
   - Test tenant notification delivery
   - Validate postmortem template and process
   - Re-run QG-IR validation after testing
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to VP Engineering and CTO
   - Document incident response gaps with risk assessment
   - Engage external incident management consulting if needed
   - Create incident readiness roadmap
   - Schedule weekly reviews until gate passes

---

## Web Research Verification

- [ ] Search the web: "incident response SaaS platform best practices {date}" - Verify response procedures
- [ ] Search the web: "multi-tenant incident communication patterns {date}" - Confirm notification patterns
- [ ] Search the web: "blameless postmortem best practices {date}" - Validate postmortem approach
- [ ] _Source: [URL]_ citations documented for key decisions

---

## Related Patterns

Load decision criteria from pattern registry:

- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `operations-*`
- **Reliability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `reliability-*`

---

## Related Workflows

- `bmad-bam-incident-response-design` - Incident process design
- `bmad-bam-tenant-aware-observability` - Monitoring setup
- `bmad-bam-disaster-recovery-design` - Recovery procedures
- `bmad-bam-postmortem-process` - Post-incident analysis
- `bmad-bam-tenant-communication-design` - Tenant notification

**PASS CRITERIA:** Incident response procedures documented, on-call configured, postmortem process established
**OWNER:** SRE Lead / Engineering Manager
**REVIEWERS:** Engineering, SRE, Customer Success

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | V2 BMAD format with full sections |
| 1.0.0 | - | Platform Architect | Initial V1 checklist |
