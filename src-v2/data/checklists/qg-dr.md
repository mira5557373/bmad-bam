---
name: qg-dr-disaster-recovery
description: Disaster recovery gate - verifies DR plan, RTO/RPO targets, and tenant data recovery procedures
module: bam
tags: [disaster-recovery, quality-gate, multi-tenant, continuity, backup]
version: 2.0.0
---

# QG-DR: Disaster Recovery Gate Checklist

> **Gate ID:** QG-DR (Disaster Recovery)
> **Definition:** DR readiness MUST be verified through documentation and drills before production.
> **Scope:** Covers DR plan documentation, failover testing, recovery validation, and tenant data protection.
> **Recovery:** Gate failure requires DR remediation before production deployment.

**Workflow:** bmad-bam-disaster-recovery-design, bmad-bam-disaster-recovery-drill
**Prerequisites:** QG-CE1 (Chaos Engineering), evaluated quarterly after production

---

## Purpose

The Disaster Recovery Gate (QG-DR) validates business continuity capabilities. This gate ensures:

1. **DR plan** is documented, current, and comprehensive
2. **RTO/RPO targets** are defined per service tier and data type
3. **Failover procedures** are tested and working
4. **Tenant data** can be recovered within defined objectives
5. **Runbooks** are validated through regular drills

Passing QG-DR ensures the platform can recover from catastrophic failures.

---

## DR Plan Documentation

### DR Plan Completeness

- [ ] **CRITICAL:** DR plan document exists and is current (<6 months old)
- [ ] **CRITICAL:** Recovery objectives defined (RTO, RPO per service)
- [ ] **CRITICAL:** Critical service inventory documented
- [ ] Service dependency map current
- [ ] Data criticality classification documented
- [ ] DR team roles and responsibilities defined
- [ ] Communication plan documented
- [ ] Escalation matrix current

### RTO/RPO Definitions

**Recovery Time Objectives (RTO):**

- [ ] **CRITICAL:** RTO per service tier defined:
  - [ ] Tier 0 (Critical): RTO < 15 minutes
  - [ ] Tier 1 (High): RTO < 1 hour
  - [ ] Tier 2 (Medium): RTO < 4 hours
  - [ ] Tier 3 (Low): RTO < 24 hours

**Recovery Point Objectives (RPO):**

- [ ] **CRITICAL:** RPO per data type defined:
  - [ ] Transactional data: RPO < 5 minutes
  - [ ] User data: RPO < 15 minutes
  - [ ] Analytics data: RPO < 1 hour
  - [ ] Logs/telemetry: RPO < 24 hours

- [ ] **CRITICAL:** RTO/RPO aligned with tenant SLAs

### Multi-Tenant DR Considerations

- [ ] **CRITICAL:** Per-tenant recovery priority documented
- [ ] **CRITICAL:** Enterprise tenant SLA recovery guarantees defined
- [ ] **CRITICAL:** Tenant data isolation maintained during DR
- [ ] Tenant notification procedures defined
- [ ] Tenant-specific RPO requirements captured

---

## Failover Testing

### Database Failover

- [ ] **CRITICAL:** Primary to replica failover tested
- [ ] **CRITICAL:** Failover time measured (<RTO target)
- [ ] **CRITICAL:** Data consistency verified post-failover
- [ ] Automatic failover trigger tested
- [ ] Manual failover procedure tested
- [ ] Connection string failover verified
- [ ] Application reconnection verified

### Application Failover

- [ ] **CRITICAL:** Multi-region failover tested (if applicable)
- [ ] **CRITICAL:** Load balancer failover verified
- [ ] DNS failover tested (TTL appropriate)
- [ ] Session failover handled
- [ ] In-flight request handling verified
- [ ] Tenant context preserved during failover

### AI Service Failover

- [ ] **CRITICAL:** LLM provider failover tested
- [ ] **CRITICAL:** Model fallback chain verified
- [ ] Vector database failover tested
- [ ] Agent state recovery verified
- [ ] Conversation continuity maintained
- [ ] Token budget preserved across failover

### Infrastructure Failover

- [ ] Kubernetes cluster failover tested
- [ ] Object storage failover verified
- [ ] Cache failover tested (Redis/Memcached)
- [ ] Message queue failover tested
- [ ] CDN origin failover verified

---

## Recovery Validation

### Data Recovery Testing

- [ ] **CRITICAL:** Database point-in-time recovery tested
- [ ] **CRITICAL:** Backup restoration successful
- [ ] **CRITICAL:** Data integrity verified post-recovery
- [ ] **CRITICAL:** Recovery time measured (<RTO target)
- [ ] **CRITICAL:** Recovery point verified (<RPO target)
- [ ] **CRITICAL:** Cross-tenant data isolation verified post-recovery

### Service Recovery Testing

- [ ] **CRITICAL:** Service startup sequence documented and tested
- [ ] Dependency health checks verified
- [ ] Service mesh recovery verified
- [ ] API functionality verified post-recovery
- [ ] End-to-end user journey tested
- [ ] Monitoring/alerting restored

### Tenant Recovery Testing

- [ ] **CRITICAL:** Tenant data accessibility verified
- [ ] **CRITICAL:** Tenant-specific configurations restored
- [ ] Tenant billing state consistent
- [ ] Tenant audit trail preserved
- [ ] Enterprise tenant SLA met

---

## Backup Verification

### Backup Configuration

- [ ] **CRITICAL:** Automated backups configured
- [ ] **CRITICAL:** Backup schedule meets RPO requirements
- [ ] Backup encryption enabled
- [ ] Cross-region backup replication configured
- [ ] Backup retention policy enforced

### Backup Testing

- [ ] **CRITICAL:** Backup restore tested monthly
- [ ] **CRITICAL:** Backup integrity verified
- [ ] Restore time measured and documented
- [ ] Partial restore capability verified
- [ ] Point-in-time recovery tested

---

## Runbook Verification

### Runbook Completeness

- [ ] **CRITICAL:** Failover runbook current and accurate
- [ ] **CRITICAL:** Recovery runbook current and accurate
- [ ] Rollback runbook documented
- [ ] Communication runbook documented
- [ ] Post-incident verification runbook exists

### Runbook Testing

- [ ] **CRITICAL:** Runbook executed during drill
- [ ] Runbook timing measured
- [ ] Runbook gaps identified and documented
- [ ] Runbook updates made post-drill
- [ ] On-call personnel can execute runbooks

---

## Drill Execution (Quarterly)

### Drill Results

- [ ] **CRITICAL:** Drill date and duration documented
- [ ] Drill scope documented (full/partial/tabletop)
- [ ] Participants documented
- [ ] **CRITICAL:** Actual RTO achieved vs target
- [ ] **CRITICAL:** Actual RPO achieved vs target
- [ ] Issues encountered documented
- [ ] Lessons learned captured

### Drill Scoring

- [ ] Database failover: Pass/Fail
- [ ] Application failover: Pass/Fail
- [ ] Data recovery: Pass/Fail
- [ ] Communication: Pass/Fail
- [ ] Runbook accuracy: Pass/Fail
- [ ] **CRITICAL:** Overall drill result documented

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, RTO/RPO targets met in drill |
| **CONDITIONAL** | CRITICAL items pass, minor runbook gaps - remediation within 30 days |
| **FAIL** | Any CRITICAL item fails or RTO/RPO targets missed - immediate remediation |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| DR Plan Documentation | CRITICAL | Plan >3 months old | No plan |
| RTO/RPO Definitions | CRITICAL | Minor gaps | Undefined |
| Multi-Tenant DR | CRITICAL | Minor gaps | Isolation breach risk |
| Database Failover | CRITICAL | Manual only | Failover failed |
| Application Failover | CRITICAL | Partial failure | Complete failure |
| AI Service Failover | CRITICAL | Degraded recovery | No recovery |
| Data Recovery | CRITICAL | RPO slightly exceeded | RPO >2x target |
| Service Recovery | CRITICAL | RTO slightly exceeded | RTO >2x target |
| Tenant Recovery | CRITICAL | Minor gaps | Tenant data lost |
| Backup Configuration | CRITICAL | Encryption gaps | No backups |
| Backup Testing | CRITICAL | >2 months since test | Never tested |
| Runbook Completeness | CRITICAL | Minor gaps | Runbook missing |
| Runbook Testing | Non-critical | Minor inaccuracies | N/A |
| Drill Execution | Non-critical | Incomplete docs | N/A |

---

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (VP Engineering or CTO)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If QG-DR fails:**

1. **Attempt 1:** Immediate DR improvement (target: 2 weeks)
   - Identify failover/recovery failures from drill
   - Update runbooks with corrected procedures
   - Fix identified infrastructure gaps
   - Retrain on-call personnel on updated procedures
   - Schedule focused drill on failed components
   - Re-run partial QG-DR validation
   - **Lock passed categories** - focus on failures

2. **Attempt 2:** Comprehensive DR remediation (target: 4 weeks)
   - Engage SRE, Platform, and Database teams
   - Review DR architecture against best practices
   - Implement automation for manual failover steps
   - Update RTO/RPO targets if unrealistic
   - Conduct full DR drill
   - Re-run complete QG-DR validation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to VP Engineering and CTO
   - Document DR capability gaps with risk assessment
   - Consider DR architecture changes
   - Engage cloud provider DR consulting
   - Create DR improvement roadmap with executive sign-off
   - Communicate DR status to Enterprise tenants if applicable
   - Schedule monthly DR drills until passing

---

## Web Research Verification

- [ ] Search the web: "disaster recovery best practices SaaS {date}" - Verify DR patterns
- [ ] Search the web: "multi-tenant DR testing patterns {date}" - Confirm tenant DR approach
- [ ] Search the web: "RTO RPO validation testing {date}" - Validate recovery objectives
- [ ] _Source: [URL]_ citations documented for key decisions

---

## Related Patterns

Load decision criteria from pattern registry:

- **Reliability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `reliability-*`
- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `operations-*`

---

## Related Workflows

- `bmad-bam-disaster-recovery-design` - DR planning
- `bmad-bam-disaster-recovery-drill` - DR drill execution
- `bmad-bam-backup-strategy-design` - Backup configuration
- `bmad-bam-runbook-creation` - Runbook documentation
- `bmad-bam-tenant-data-recovery` - Tenant-specific recovery

**PASS CRITERIA:** All failovers successful, RTO/RPO targets met, runbooks accurate
**OWNER:** SRE Lead / Platform Engineering Lead
**REVIEWERS:** Security, Compliance, Engineering Leadership

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | V2 BMAD format with full sections |
| 1.0.0 | - | Platform Architect | Initial V1 checklist |
