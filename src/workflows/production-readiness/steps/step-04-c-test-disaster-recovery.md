# Step 4: Test Disaster Recovery

## Purpose

Test disaster recovery procedures and validate RTO/RPO requirements are achievable.

## Prerequisites

- Steps 1-3 complete
- DR plan documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `disaster-recovery`

## Actions

### 1. Backup Verification

| Backup Type | Frequency | Retention | Last Verified | Recovery Test | Status |
|-------------|-----------|-----------|---------------|---------------|--------|
| Database full | Daily | 30 days | | | |
| Database incremental | Hourly | 7 days | | | |
| Object storage | Continuous | 90 days | | | |
| Configuration | On change | 90 days | | | |
| Secrets | On change | Versioned | | | |

### 2. RTO/RPO Validation

| Tier | Target RTO | Target RPO | Tested RTO | Tested RPO | Status |
|------|------------|------------|------------|------------|--------|
| Critical (API) | 15 min | 5 min | | | |
| High (Workers) | 30 min | 15 min | | | |
| Medium (Analytics) | 4 hours | 1 hour | | | |
| Low (Reports) | 24 hours | 24 hours | | | |

### 3. Failover Testing

| Failover Scenario | Procedure | Last Tested | Result | Status |
|-------------------|-----------|-------------|--------|--------|
| AZ failure | Auto-failover | | | |
| Region failure | Manual DR | | | |
| Database failure | Replica promotion | | | |
| DNS failure | Failover routing | | | |

### 4. Recovery Procedures

| Procedure | Documented | Tested | Owner | Status |
|-----------|------------|--------|-------|--------|
| Full system restore | | | | |
| Database point-in-time | | | | |
| Partial service recovery | | | | |
| Data corruption recovery | | | | |
| Security incident recovery | | | | |

**Verify DR testing with web search:**
Search the web: "disaster recovery testing best practices {date}"
Search the web: "RTO RPO validation methods {date}"

## Verification

- [ ] All backups verified
- [ ] RTO/RPO requirements met
- [ ] Failover procedures tested
- [ ] Recovery procedures documented and tested

## Outputs

- Disaster recovery test results

## Next Step

Proceed to `step-05-c-review-procedures.md`
