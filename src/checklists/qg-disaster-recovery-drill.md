# QG-DR1: Disaster Recovery Drill Checklist

> Gate ID: QG-DR1 (Disaster Recovery Drill)
> DR readiness MUST be verified through drills quarterly.
> Gate definition: verifies DR plan documentation, failover testing, and recovery validation.
> Workflow integration: BAM operations workflows feed into this gate.
> Executing workflow: `disaster-recovery-drill` (quarterly)
>
> **Operational Gate:** QG-DR1 is evaluated after each DR drill.
> Failures trigger DR plan remediation before next production incident.

## DR Plan Documentation

### DR Plan Completeness

- [ ] DR plan document exists and is current (<6 months old)
- [ ] Recovery objectives defined (RTO, RPO per service)
- [ ] Critical service inventory documented
- [ ] Service dependency map current
- [ ] Data criticality classification documented
- [ ] DR team roles and responsibilities defined
- [ ] Communication plan documented
- [ ] Escalation matrix current

### RTO/RPO Definitions

- [ ] RTO per service tier defined
  - [ ] Tier 0 (Critical): RTO < 15 minutes
  - [ ] Tier 1 (High): RTO < 1 hour
  - [ ] Tier 2 (Medium): RTO < 4 hours
  - [ ] Tier 3 (Low): RTO < 24 hours
- [ ] RPO per data type defined
  - [ ] Transactional data: RPO < 5 minutes
  - [ ] User data: RPO < 15 minutes
  - [ ] Analytics data: RPO < 1 hour
  - [ ] Logs/telemetry: RPO < 24 hours
- [ ] RTO/RPO aligned with SLAs

### Multi-Tenant DR Considerations

- [ ] Per-tenant recovery priority documented
- [ ] Enterprise tenant SLA recovery guarantees
- [ ] Tenant data isolation maintained during DR
- [ ] Tenant notification procedures defined
- [ ] Tenant-specific RPO requirements captured

## Failover Testing

### Database Failover

- [ ] Primary to replica failover tested
- [ ] Failover time measured (<RTO target)
- [ ] Data consistency verified post-failover
- [ ] Automatic failover trigger tested
- [ ] Manual failover procedure tested
- [ ] Connection string failover verified
- [ ] Application reconnection verified

### Application Failover

- [ ] Multi-region failover tested (if applicable)
- [ ] Load balancer failover verified
- [ ] DNS failover tested (TTL appropriate)
- [ ] Session failover handled
- [ ] In-flight request handling verified
- [ ] Tenant context preserved during failover

### AI Service Failover

- [ ] LLM provider failover tested
- [ ] Model fallback chain verified
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

## Recovery Validation

### Data Recovery Testing

- [ ] Database point-in-time recovery tested
- [ ] Backup restoration successful
- [ ] Data integrity verified post-recovery
- [ ] Recovery time measured (<RTO target)
- [ ] Recovery point verified (<RPO target)
- [ ] Cross-tenant data isolation verified post-recovery

### Service Recovery Testing

- [ ] Service startup sequence documented and tested
- [ ] Dependency health checks verified
- [ ] Service mesh recovery verified
- [ ] API functionality verified post-recovery
- [ ] End-to-end user journey tested
- [ ] Monitoring/alerting restored

### Tenant Recovery Testing

- [ ] Tenant data accessibility verified
- [ ] Tenant-specific configurations restored
- [ ] Tenant billing state consistent
- [ ] Tenant audit trail preserved
- [ ] Enterprise tenant SLA met

## Runbook Verification

### Runbook Completeness

- [ ] Failover runbook current and accurate
- [ ] Recovery runbook current and accurate
- [ ] Rollback runbook documented
- [ ] Communication runbook documented
- [ ] Post-incident verification runbook exists

### Runbook Testing

- [ ] Runbook executed during drill
- [ ] Runbook timing measured
- [ ] Runbook gaps identified and documented
- [ ] Runbook updates made post-drill
- [ ] On-call personnel can execute runbooks

## Drill Execution Metrics

### Drill Results

- [ ] Drill date and duration documented
- [ ] Drill scope documented (full/partial/tabletop)
- [ ] Participants documented
- [ ] Actual RTO achieved vs target
- [ ] Actual RPO achieved vs target
- [ ] Issues encountered documented
- [ ] Lessons learned captured

### Drill Scoring

- [ ] Database failover: Pass/Fail
- [ ] Application failover: Pass/Fail
- [ ] Data recovery: Pass/Fail
- [ ] Communication: Pass/Fail
- [ ] Runbook accuracy: Pass/Fail
- [ ] Overall drill result: Pass/Conditional/Fail

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns {date}" - Confirm validation approach
- [ ] _Source: [URL]_ citations documented for key decisions

## Related Patterns

Load decision criteria from pattern registry:

- **Reliability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `reliability-*`
- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `operations-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "disaster recovery drill best practices SaaS {date}"
- Search: "multi-tenant DR testing patterns {date}"
- Search: "cloud DR testing automation {date}"
- Search: "RTO RPO validation testing {date}"

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, all RTO/RPO targets met |
| **CONDITIONAL** | All CRITICAL items pass, minor runbook gaps — remediation within 30 days |
| **FAIL** | Any CRITICAL item fails, RTO/RPO targets missed — immediate remediation |
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

| Category                    | Classification | Conditional Threshold | Fail Threshold |
| --------------------------- | -------------- | --------------------- | -------------- |
| DR Plan Documentation       | CRITICAL       | Plan >3 months old    | No plan        |
| RTO/RPO Definitions         | CRITICAL       | Minor gaps            | Undefined      |
| Database Failover           | CRITICAL       | Manual only           | Failover failed |
| Application Failover        | CRITICAL       | Partial failure       | Complete failure |
| AI Service Failover         | CRITICAL       | Degraded recovery     | No recovery    |
| Data Recovery               | CRITICAL       | RPO slightly exceeded | RPO >2x target |
| Service Recovery            | CRITICAL       | RTO slightly exceeded | RTO >2x target |
| Runbook Verification        | Non-critical   | Minor inaccuracies    | Runbook missing |
| Multi-Tenant Considerations | CRITICAL       | Minor gaps            | Isolation breach |
| Drill Execution Metrics     | Non-critical   | Incomplete docs       | No metrics     |

## Recovery Protocol

**If QG-DR1 fails:**

1. **Attempt 1:** Immediate DR improvement (target: 2 weeks)
   - Identify failover/recovery failures from drill
   - Update runbooks with corrected procedures
   - Fix identified infrastructure gaps
   - Retrain on-call personnel on updated procedures
   - Schedule focused drill on failed components
   - Re-run partial QG-DR1 validation
   - **Lock passed categories** — focus on failures

2. **Attempt 2:** Comprehensive DR remediation (target: 4 weeks)
   - Engage SRE, Platform, and Database teams
   - Review DR architecture against best practices
   - Implement automation for manual failover steps
   - Update RTO/RPO targets if unrealistic
   - Conduct full DR drill
   - Re-run complete QG-DR1 validation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to VP Engineering and CTO
   - Document DR capability gaps with risk assessment
   - Consider DR architecture changes
   - Engage cloud provider DR consulting
   - Create DR improvement roadmap with executive sign-off
   - Communicate DR status to Enterprise tenants if applicable
   - Schedule monthly DR drills until passing

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| DR Plan Documentation | Update plan, verify accuracy | Plan >6 months old |
| Database Failover | Fix replication, test failover | Failover >2x RTO |
| Application Failover | Fix LB/DNS, test routing | Complete failure |
| AI Service Failover | Add fallback providers | No model fallback |
| Data Recovery | Fix backup/restore process | RPO >2x target |
| Runbook Verification | Update runbooks, train team | Runbook unusable |
| Multi-Tenant DR | Fix isolation, test recovery | Cross-tenant risk |

## Related Workflows

- `bmad-bam-disaster-recovery-design` - DR planning
- `bmad-bam-disaster-recovery-drill` - DR drill execution
- `bmad-bam-runbook-creation` - Runbook documentation

**PASS CRITERIA:** All failovers successful, RTO/RPO targets met, runbooks accurate
**OWNER:** SRE / Platform Engineering
**REVIEWERS:** Security, Compliance, Engineering Leadership
