---
name: data-migration-template
description: Template for planning and executing tenant data migrations
category: operations
version: 1.0.0
type: "operations"
---

# Data Migration Plan

## Document Information

| Field | Value |
|-------|-------|
| Project | {{project_name}} |
| Migration ID | MIG-{{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | Draft |

---

## Migration Overview

### Purpose

Brief description of why this migration is needed and what it accomplishes.

### Scope

| In Scope | Out of Scope |
|----------|--------------|
| | |

### Success Criteria

- [ ] All data migrated without loss
- [ ] Data integrity verified
- [ ] No service interruption beyond maintenance window
- [ ] Rollback tested and documented

---

## Migration Type

- [ ] **Schema migration** - Database structure changes
- [ ] **Data migration** - Moving data between systems
- [ ] **Tenant migration** - Moving tenant between isolation models
- [ ] **Tier migration** - Moving tenant between service tiers
- [ ] **Platform migration** - Moving to new infrastructure

---

## Pre-Migration Analysis

### Source System

| Attribute | Value |
|-----------|-------|
| Database | |
| Schema | |
| Tables affected | |
| Row count | |
| Data size | |

### Target System

| Attribute | Value |
|-----------|-------|
| Database | |
| Schema | |
| Expected tables | |
| Expected row count | |
| Expected data size | |

### Data Mapping

| Source Table | Source Column | Target Table | Target Column | Transformation |
|--------------|---------------|--------------|---------------|----------------|
| | | | | |

---

## Tenant Impact Assessment

### Affected Tenants

| Tenant ID | Tenant Name | Tier | Data Volume | Special Requirements |
|-----------|-------------|------|-------------|---------------------|
| | | | | |

### Downtime Requirements

| Phase | Duration | Tenant Impact |
|-------|----------|---------------|
| Preparation | X hours | None |
| Migration | X hours | Read-only / Full outage |
| Verification | X hours | Read-only |
| Cutover | X minutes | Brief outage |

### Communication Plan

| Milestone | Notification | Recipients | Timing |
|-----------|--------------|------------|--------|
| Migration scheduled | Email | All affected tenants | 7 days before |
| Migration starting | In-app banner | All affected tenants | 1 hour before |
| Migration complete | Email | All affected tenants | Immediately after |

---

## Migration Strategy

### Approach

- [ ] **Big bang** - All data migrated at once
- [ ] **Phased** - Data migrated in batches
- [ ] **Parallel run** - Both systems active during migration
- [ ] **Blue-green** - Switch between environments

### Data Validation Strategy

| Validation Type | Method | Acceptance Criteria |
|-----------------|--------|---------------------|
| Row count | Compare source/target | 100% match |
| Checksum | MD5/SHA comparison | 100% match |
| Sample verification | Manual spot checks | No discrepancies |
| Referential integrity | FK validation | All constraints pass |

---

## Migration Steps

### Phase 1: Preparation

| Step | Description | Owner | Duration | Status |
|------|-------------|-------|----------|--------|
| 1.1 | Backup source database | DBA | 2 hours | |
| 1.2 | Create target schema | DBA | 1 hour | |
| 1.3 | Validate backup integrity | DBA | 1 hour | |
| 1.4 | Notify affected tenants | PM | - | |

### Phase 2: Migration Execution

| Step | Description | Owner | Duration | Status |
|------|-------------|-------|----------|--------|
| 2.1 | Enable maintenance mode | DevOps | 5 min | |
| 2.2 | Stop write operations | DevOps | 5 min | |
| 2.3 | Execute migration scripts | DBA | X hours | |
| 2.4 | Run data transformation | DBA | X hours | |

### Phase 3: Verification

| Step | Description | Owner | Duration | Status |
|------|-------------|-------|----------|--------|
| 3.1 | Verify row counts | DBA | 30 min | |
| 3.2 | Verify data integrity | DBA | 1 hour | |
| 3.3 | Run integration tests | QA | 1 hour | |
| 3.4 | Verify tenant isolation | Security | 30 min | |

### Phase 4: Cutover

| Step | Description | Owner | Duration | Status |
|------|-------------|-------|----------|--------|
| 4.1 | Update connection strings | DevOps | 10 min | |
| 4.2 | Disable maintenance mode | DevOps | 5 min | |
| 4.3 | Monitor for errors | DevOps | 1 hour | |
| 4.4 | Notify tenants of completion | PM | - | |

---

## Rollback Plan

### Rollback Triggers

- [ ] Data integrity check fails
- [ ] Row count mismatch > 0.1%
- [ ] Critical application errors
- [ ] Tenant reports data loss

### Rollback Steps

| Step | Description | Owner | Duration |
|------|-------------|-------|----------|
| R.1 | Stop migration process | DBA | 5 min |
| R.2 | Restore from backup | DBA | X hours |
| R.3 | Verify restored data | DBA | 1 hour |
| R.4 | Resume normal operations | DevOps | 10 min |

### Point of No Return

After step X.X, rollback is not possible. Full re-migration required.

---

## Migration Scripts

### Pre-Migration Scripts

```sql
-- Backup tenant data
-- Script location: migrations/MIG-XXX/01-backup.sql
```

### Migration Scripts

```sql
-- Main migration
-- Script location: migrations/MIG-XXX/02-migrate.sql
```

### Post-Migration Scripts

```sql
-- Verification queries
-- Script location: migrations/MIG-XXX/03-verify.sql
```

---

## Testing Plan

### Test Environment

| Environment | Purpose | Data |
|-------------|---------|------|
| Dev | Script development | Synthetic |
| Staging | Full rehearsal | Production copy |
| Production | Actual migration | Production |

### Test Cases

| Test ID | Description | Expected Result | Actual Result | Status |
|---------|-------------|-----------------|---------------|--------|
| TC-01 | Verify row count match | 100% match | | |
| TC-02 | Verify tenant isolation | No cross-tenant data | | |
| TC-03 | Verify application functionality | All features work | | |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data loss | Low | Critical | Multiple backups, verification |
| Extended downtime | Medium | High | Parallel run option |
| Tenant isolation breach | Low | Critical | Post-migration security audit |
| Performance degradation | Medium | Medium | Index optimization, monitoring |

---

## Monitoring and Alerts

### Migration Monitoring

| Metric | Threshold | Alert |
|--------|-----------|-------|
| Migration progress | < expected | PagerDuty |
| Error count | > 0 | PagerDuty |
| Disk space | < 20% | Slack |

### Post-Migration Monitoring

| Metric | Duration | Threshold |
|--------|----------|-----------|
| Error rate | 24 hours | > baseline |
| Response time | 24 hours | > 2x baseline |
| Tenant complaints | 48 hours | Any |

---

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "data migration best practices {date}"
- "tenant data migration multi-tenant SaaS patterns {date}"
- "zero-downtime database migration enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Migration type is clearly identified (schema, data, tenant, tier, platform)
- [ ] Source and target systems are fully documented with data volumes
- [ ] Data mapping includes all transformations required
- [ ] Affected tenants are identified with tier and special requirements
- [ ] Downtime requirements are specified per migration phase
- [ ] Communication plan includes pre, during, and post-migration notifications
- [ ] Data validation strategy includes row count, checksum, and integrity checks
- [ ] Rollback triggers and steps are documented with point of no return
- [ ] Migration scripts are version controlled and tested in staging
- [ ] Tenant isolation is verified after migration
- [ ] Post-migration monitoring includes error rate, response time, and complaints
- [ ] All required sign-offs obtained before execution

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Technical Lead | | | |
| DBA | | | |
| Security | | | |
| Product Owner | | | |

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
