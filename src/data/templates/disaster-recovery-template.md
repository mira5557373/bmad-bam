---
name: disaster-recovery-template
description: Template for disaster recovery planning and procedures
category: operations
version: 1.0.0
type: "operations"
web_research_enabled: true
source_verification: true
---

## Purpose

Template for disaster recovery planning and procedures

# Disaster Recovery Plan

## Document Information

| Field | Value |
|-------|-------|
| Project | {{project_name}} |
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | Draft |
| Review Date | |

---

## Executive Summary

This document outlines the disaster recovery (DR) procedures for {{project_name}}, ensuring business continuity and data protection for all tenants in the event of a disaster.

---

## Recovery Objectives

### Recovery Time Objective (RTO)

| Tier | RTO Target | Justification |
|------|------------|---------------|
| Enterprise | 1 hour | SLA commitment |
| Pro | 4 hours | Standard SLA |
| Free | 24 hours | Best effort |

### Recovery Point Objective (RPO)

| Tier | RPO Target | Backup Frequency |
|------|------------|------------------|
| Enterprise | 15 minutes | Continuous replication |
| Pro | 1 hour | Hourly snapshots |
| Free | 24 hours | Daily backups |

---

## Disaster Scenarios

### Scenario Classification

| Category | Examples | Severity | Recovery Approach |
|----------|----------|----------|-------------------|
| Infrastructure | Data center outage, network failure | Critical | Failover to DR region |
| Data | Corruption, accidental deletion | High | Point-in-time recovery |
| Application | Critical bug, deployment failure | Medium | Rollback, hotfix |
| Security | Breach, ransomware | Critical | Isolation, recovery from clean backup |
| Natural | Fire, flood, earthquake | Critical | Full DR activation |

---

## Infrastructure Architecture

### Primary Region

| Component | Service | Configuration |
|-----------|---------|---------------|
| Compute | AWS ECS/EKS | Multi-AZ |
| Database | RDS PostgreSQL | Multi-AZ, automated backups |
| Cache | ElastiCache Redis | Multi-AZ cluster |
| Storage | S3 | Cross-region replication |
| DNS | Route 53 | Health checks, failover routing |

### DR Region

| Component | Service | Configuration | Sync Method |
|-----------|---------|---------------|-------------|
| Compute | AWS ECS/EKS | Standby capacity | Infrastructure as Code |
| Database | RDS PostgreSQL | Read replica | Async replication |
| Cache | ElastiCache Redis | Warm standby | Configuration sync |
| Storage | S3 | Replicated bucket | Cross-region replication |

### Architecture Diagram

```
Primary Region (us-east-1)          DR Region (us-west-2)
┌─────────────────────────┐        ┌─────────────────────────┐
│   Route 53 (Primary)    │───────►│   Route 53 (Failover)   │
└───────────┬─────────────┘        └───────────┬─────────────┘
            │                                  │
┌───────────▼─────────────┐        ┌───────────▼─────────────┐
│   Load Balancer (ALB)   │        │   Load Balancer (ALB)   │
└───────────┬─────────────┘        └───────────┬─────────────┘
            │                                  │
┌───────────▼─────────────┐        ┌───────────▼─────────────┐
│   Application (ECS)     │        │   Application (ECS)     │
│   Multi-AZ              │        │   Standby               │
└───────────┬─────────────┘        └───────────┬─────────────┘
            │                                  │
┌───────────▼─────────────┐   Async ┌───────────▼─────────────┐
│   Database (RDS)        │────────►│   Database (Replica)    │
│   Primary               │         │   Read Replica          │
└─────────────────────────┘        └─────────────────────────┘
```

---

## Backup Strategy

### Database Backups

| Backup Type | Frequency | Retention | Storage |
|-------------|-----------|-----------|---------|
| Automated snapshots | Daily | 30 days | RDS |
| Transaction logs | Continuous | 7 days | RDS |
| Manual snapshots | Weekly | 90 days | RDS |
| Cross-region copy | Daily | 30 days | DR region |

### Application Backups

| Component | Frequency | Retention | Storage |
|-----------|-----------|-----------|---------|
| Configuration | On change | 90 days | S3 + Git |
| Secrets | On change | 90 days | Secrets Manager |
| Container images | On deploy | 30 versions | ECR |

### Tenant Data Backups

| Data Type | Frequency | Retention | Tenant Access |
|-----------|-----------|-----------|---------------|
| User data | Continuous | Per tier SLA | Self-service restore (Pro+) |
| Attachments | Daily | 90 days | Request-based |
| Audit logs | Real-time | 2 years | Compliance export |

---

## Recovery Procedures

### Procedure 1: Database Failover

**Trigger:** Primary database unavailable > 5 minutes

**Steps:**

1. **Detection** (Automated - 2 min)
   - CloudWatch alarm triggers
   - PagerDuty alert sent
   - On-call engineer notified

2. **Assessment** (Manual - 5 min)
   - Verify primary is truly unavailable
   - Check for false positive
   - Confirm DR replica is healthy

3. **Failover Execution** (15 min)
   ```bash
   # Promote read replica to primary
   aws rds promote-read-replica --db-instance-identifier dr-replica
   
   # Update application configuration
   ./scripts/update-db-endpoint.sh dr-replica.region.rds.amazonaws.com
   
   # Restart application services
   ./scripts/rolling-restart.sh
   ```

4. **Verification** (10 min)
   - Verify application connectivity
   - Run health checks
   - Verify tenant data access

5. **Communication** (Ongoing)
   - Update status page
   - Notify affected tenants
   - Post incident update

### Procedure 2: Full Region Failover

**Trigger:** Primary region unavailable

**Steps:**

1. **Detection and Decision** (10 min)
   - Multiple service failures detected
   - DR activation decision by on-call lead
   - Communicate decision to team

2. **DNS Failover** (5 min)
   ```bash
   # Activate DR routing
   aws route53 change-resource-record-sets \
     --hosted-zone-id ZONE_ID \
     --change-batch file://dr-failover.json
   ```

3. **Database Promotion** (15 min)
   - Promote DR replica to standalone
   - Accept potential data loss within RPO
   - Document last sync time

4. **Application Activation** (10 min)
   ```bash
   # Scale up DR application
   aws ecs update-service --cluster dr-cluster \
     --service main-service --desired-count 10
   ```

5. **Verification** (15 min)
   - Run full health check suite
   - Verify tenant isolation
   - Test critical user journeys

6. **Communication** (Ongoing)
   - Update status page to DR active
   - Send tenant notification
   - Establish regular updates

### Procedure 3: Data Recovery (Point-in-Time)

**Trigger:** Data corruption or accidental deletion

**Steps:**

1. **Identify Recovery Point** (15 min)
   - Determine when corruption occurred
   - Identify last known good state
   - Select recovery point

2. **Create Recovery Instance** (30 min)
   ```bash
   # Restore to point in time
   aws rds restore-db-instance-to-point-in-time \
     --source-db-instance-identifier production \
     --target-db-instance-identifier recovery-instance \
     --restore-time {date}-04-08T10:00:00Z
   ```

3. **Verify Recovered Data** (30 min)
   - Connect to recovery instance
   - Verify data integrity
   - Compare with production state

4. **Apply Recovery** (Variable)
   - Option A: Full database swap
   - Option B: Selective data restore
   - Option C: Tenant-specific recovery

---

## Tenant-Specific Recovery

### Per-Tenant Recovery Options

| Tier | Self-Service | Assisted | Full Restore |
|------|--------------|----------|--------------|
| Enterprise | Instant | 1 hour | 4 hours |
| Pro | Request-based | 4 hours | 24 hours |
| Free | Not available | 24 hours | 48 hours |

### Tenant Isolation During Recovery

- Recovery operations scoped to tenant_id
- Other tenants unaffected during recovery
- Audit log of all recovery actions
- Tenant notification of recovery completion

---

## Testing Schedule

### Test Types

| Test Type | Frequency | Scope | Participants |
|-----------|-----------|-------|--------------|
| Backup verification | Weekly | Automated | System |
| Failover drill | Quarterly | Full DR | Engineering + Ops |
| Tabletop exercise | Bi-annually | Scenario-based | All teams |
| Full DR test | Annually | Complete failover | Company-wide |

### Test Checklist

- [ ] Backup restoration successful
- [ ] RTO target achieved
- [ ] RPO target achieved
- [ ] Tenant isolation maintained
- [ ] Communication plan executed
- [ ] Documentation accurate

---

## Communication Plan

### Internal Communication

| Severity | Channel | Frequency | Audience |
|----------|---------|-----------|----------|
| Critical | PagerDuty + Slack | Immediate | On-call + Leadership |
| High | Slack | Every 30 min | Engineering |
| Medium | Slack | Every hour | Engineering |

### Tenant Communication

| Phase | Channel | Template |
|-------|---------|----------|
| Incident declared | Status page + Email | DR-001: Incident Notification |
| Recovery in progress | Status page | DR-002: Progress Update |
| Recovery complete | Status page + Email | DR-003: Resolution |

---

## Roles and Responsibilities

### DR Team

| Role | Primary | Backup | Responsibilities |
|------|---------|--------|------------------|
| Incident Commander | | | Overall coordination |
| Technical Lead | | | Technical decisions |
| Communications | | | Tenant/internal comms |
| DBA | | | Database recovery |
| DevOps | | | Infrastructure recovery |

### Escalation Path

```
On-Call Engineer (0-15 min)
    ↓
Engineering Manager (15-30 min)
    ↓
VP Engineering (30-60 min)
    ↓
CEO (60+ min for critical)
```

---

## Post-Incident

### Review Process

1. **Incident Timeline** - Detailed chronology
2. **Root Cause Analysis** - 5 Whys
3. **Impact Assessment** - Affected tenants, data loss
4. **Lessons Learned** - What worked, what didn't
5. **Action Items** - Improvements to implement

### Documentation Updates

- [ ] Update this DR plan
- [ ] Update runbooks
- [ ] Update monitoring/alerting
- [ ] Update training materials

---

## Appendix

### A. Contact List

| Role | Name | Phone | Email |
|------|------|-------|-------|
| | | | |

### B. Vendor Contacts

| Vendor | Service | Support Number | Account ID |
|--------|---------|----------------|------------|
| AWS | Infrastructure | | |
| PagerDuty | Alerting | | |

### C. Related Documents

- Incident Response Playbook
- Business Continuity Plan
- Security Incident Response Plan

---

## Verification Checklist

- [ ] RTO and RPO targets defined for all tenant tiers
- [ ] Disaster scenarios classified with appropriate recovery approaches
- [ ] Primary and DR region infrastructure documented
- [ ] Database backup strategy includes automated, transaction logs, and cross-region copies
- [ ] Tenant data backup frequency aligns with tier SLAs
- [ ] Recovery procedures documented for database failover, region failover, and point-in-time recovery
- [ ] Per-tenant recovery options and SLAs documented
- [ ] Tenant isolation maintained during recovery operations
- [ ] DR testing schedule includes backup verification, failover drills, and tabletop exercises
- [ ] Communication plan covers internal teams and tenants by tier
- [ ] Roles and responsibilities assigned with primary and backup contacts
- [ ] Escalation path documented with time-based triggers

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "disaster recovery procedures best practices {date}"
- "multi-tenant DR failover patterns {date}"
- "cloud disaster recovery enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
