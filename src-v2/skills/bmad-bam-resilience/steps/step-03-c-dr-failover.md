# Step 3: Design Failover Procedures

## Purpose

Design automated and manual failover procedures that maintain tenant isolation during disaster recovery scenarios.

## Prerequisites

- RTO/RPO targets defined (Step 2 complete)
- Infrastructure architecture documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `disaster-recovery`

## Execution Protocols

```
🔍 Use web search to verify current best practices
Search the web: "multi-tenant failover patterns {date}"
Search the web: "database failover tenant isolation {date}"
📋 Reference pattern registry for decision criteria
🎯 Focus on tenant-aware resilience
```

## Actions

### 1. Define Failover Triggers

Establish automatic failover conditions:

| Trigger | Threshold | Response | Tenant Impact |
|---------|-----------|----------|---------------|
| Database unavailable | 30 seconds | Promote replica | None (seamless) |
| Region outage | 5 minutes | Cross-region failover | Brief interruption |
| Service degradation | Error rate > 10% | Traffic reroute | Minimal |
| AI runtime failure | 3 consecutive failures | Fallback mode | Feature degradation |

### 2. Design Tenant-Aware Failover

Ensure tenant isolation during failover:

| Scenario | Isolation Mechanism | Verification |
|----------|---------------------|--------------|
| Database failover | RLS policies replicated | Post-failover audit |
| Service failover | Tenant context preserved | Request validation |
| Cross-region failover | Tenant affinity maintained | Routing verification |
| Partial failover | Per-tenant health checks | Continuous monitoring |

### 3. Document Failover Procedures

Create runbooks for each scenario:

| Procedure | Steps | Duration | Rollback |
|-----------|-------|----------|----------|
| Database promotion | 1. Health check 2. Promote 3. Verify | < 30 sec | Demote, restore |
| Regional failover | 1. DNS update 2. Traffic shift 3. Verify | < 5 min | DNS revert |
| Service restart | 1. Drain 2. Restart 3. Verify | < 2 min | Previous version |

### 4. Design Communication Flow

Define stakeholder notifications:

| Event | Notify | Channel | Template |
|-------|--------|---------|----------|
| Failover initiated | On-call, tenant admins | PagerDuty, email | DR-001 |
| Failover complete | Stakeholders | Slack, email | DR-002 |
| Recovery complete | All affected | Status page | DR-003 |

### 5. Plan Testing Schedule

Establish DR testing cadence:

| Test Type | Frequency | Scope | Documentation |
|-----------|-----------|-------|---------------|
| Tabletop exercise | Monthly | All scenarios | Exercise report |
| Partial failover | Quarterly | Non-production | Test results |
| Full DR test | Annually | Production (planned) | DR test report |

## Verification

- [ ] Failover triggers defined with thresholds
- [ ] Tenant isolation maintained in all scenarios
- [ ] Failover procedures documented
- [ ] Communication templates created
- [ ] Testing schedule established
- [ ] Rollback procedures defined

## Outputs

- Failover procedure runbooks
- Communication templates
- DR testing schedule
- **Load template:** `{project-root}/_bmad/bam/data/templates/disaster-recovery-template.md`

## Next Step

- If BOTH focus selected: Proceed to `step-04-c-chaos-blast-radius.md`
- Otherwise: DR design complete, proceed to validation mode
