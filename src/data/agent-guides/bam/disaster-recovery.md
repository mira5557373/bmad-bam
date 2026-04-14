# BAM Disaster Recovery Guide

**When to load:** During infrastructure planning, backup strategy design, or when user mentions RTO, RPO, failover, geo-redundancy.

**Integrates with:** DevOps (operations), Architect (design), Security (compliance)

---

## Core Concepts

### RTO/RPO Per Tier

Recovery Time Objective (RTO) and Recovery Point Objective (RPO) vary by service tier.

| Tier | RPO | RTO | Backup Frequency | Retention |
|------|-----|-----|------------------|-----------|
| Free | 24 hours | 48 hours | Daily | 7 days |
| Pro | 1 hour | 4 hours | Hourly | 30 days |
| Enterprise | 15 minutes | 1 hour | Continuous | 90 days |
| Enterprise+ | 0 (sync replication) | 15 minutes | Continuous | 1 year |

### DR Tier Classification

| DR Level | Description | Cost Factor | Use Case |
|----------|-------------|-------------|----------|
| Cold | Backup-only, manual restore | 1x | Free tier, dev environments |
| Warm | Standby infrastructure, scripted restore | 2-3x | Pro tier |
| Hot | Active-passive, automated failover | 3-5x | Enterprise |
| Active-Active | Multi-region active, no failover | 5-10x | Enterprise+ |

---

## Application Guidelines

When implementing disaster recovery for multi-tenant systems:

1. **Tier RPO/RTO to tenant tiers**: Higher-paying tenants expect faster recovery
2. **Test restore procedures regularly**: DR plans fail if not practiced
3. **Enable per-tenant restore**: Support restoring individual tenants without full platform recovery
4. **Include all tenant data components**: Database, files, embeddings, configurations, and secrets
5. **Document runbooks for each failure scenario**: Clear procedures reduce recovery time

---

## Tenant-Aware Backup Strategies

### Database Backup Matrix

| Tenant Model | Backup Strategy | Isolation Level |
|--------------|-----------------|-----------------|
| RLS (shared tables) | Full database backup + tenant export scripts | Logical |
| Schema-per-tenant | Schema-level backup | Schema |
| Database-per-tenant | Database-level backup | Database |

### Backup Components Per Tenant

| Component | Backup Type | Frequency | Retention |
|-----------|-------------|-----------|-----------|
| Relational data | Point-in-time | Per-tier | Per-tier |
| Vector embeddings | Snapshot | Daily | 30 days |
| File storage | Incremental | Hourly | Per-tier |
| Agent memory (Mem0) | Export | Daily | 90 days |
| Configuration | Version control | On change | Indefinite |
| Secrets/Keys | Encrypted backup | On change | 7 versions |

### Tenant Data Export Format

```
Tenant Export Package:
- metadata.json (tenant config, tier, created_at)
- database/
  - schema.sql
  - data.sql (encrypted)
- files/
  - manifest.json
  - blobs/ (encrypted)
- vectors/
  - embeddings.parquet
- memory/
  - agent_memory.json
```

---

## Per-Tenant Restore Procedures

### Restore Priority Matrix

| Priority | Criteria | SLA Impact | Restore Order |
|----------|----------|------------|---------------|
| P1 | Enterprise+ tier, active incident | Revenue/Legal | First |
| P2 | Enterprise tier, degraded service | SLA breach | Second |
| P3 | Pro tier, data loss reported | Customer impact | Third |
| P4 | Free tier, routine restore | Minimal | Queue-based |

### Restore Verification Checklist

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Data integrity | Checksum validation | All checksums match |
| Record count | Pre/post comparison | Counts match +/- 0.1% |
| Relationship integrity | Foreign key validation | No orphaned records |
| Tenant isolation | Cross-tenant query test | Zero cross-tenant results |
| Application functionality | Smoke test suite | All critical paths pass |
| Performance baseline | Load test subset | Within 20% of baseline |

### Partial Restore Options

| Scope | Use Case | Complexity |
|-------|----------|------------|
| Full tenant | Tenant migration, complete loss | Low |
| Time-range | Accidental deletion, corruption | Medium |
| Table/collection | Specific data recovery | Medium |
| Record-level | Single record recovery | High |

---

## Geo-Redundancy Patterns

### Multi-Region Architecture

| Pattern | Regions | Data Sync | Failover Time |
|---------|---------|-----------|---------------|
| Primary-Secondary | 2 | Async replication | 5-15 minutes |
| Primary-Primary | 2 | Sync replication | < 1 minute |
| Multi-Region Active | 3+ | Conflict resolution | Automatic |

### Tenant Region Assignment

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Region affinity | Tenant assigned to nearest region | Performance optimization |
| Region pinning | Tenant locked to specific region | Data residency compliance |
| Region following | Tenant follows active users | Global workforce |
| Multi-region | Tenant replicated across regions | Enterprise+ HA |

### Data Residency Compliance

| Requirement | Implementation | Validation |
|-------------|----------------|------------|
| GDPR (EU) | EU region primary, no US replication | Audit trail |
| CCPA (California) | US region with deletion capability | Data inventory |
| Data localization | Region-specific storage only | Network policy |
| Cross-border | Encryption + legal framework | DPA documentation |

---

## DR Testing Workflows

### Test Types

| Test Type | Frequency | Scope | Downtime |
|-----------|-----------|-------|----------|
| Backup verification | Daily | Automated checksum | None |
| Restore drill | Monthly | Single tenant | None (isolated) |
| Failover test | Quarterly | Region failover | Scheduled maintenance |
| Chaos engineering | Weekly | Random component failure | None (controlled) |
| Full DR exercise | Annually | Complete scenario | Scheduled (4-8 hours) |

### Tenant Communication During DR

| Scenario | Communication | Timeline |
|----------|---------------|----------|
| Planned DR test | 72-hour advance notice | T-72h, T-24h, T-1h |
| Unplanned incident | Status page update | Within 15 minutes |
| Failover initiated | Real-time notification | Immediate |
| Recovery complete | Confirmation + summary | Within 1 hour |

### DR Runbook Template

```
DR Runbook: {Scenario Name}
1. Detection & Declaration
   - Monitoring alerts that trigger
   - Decision criteria for DR declaration
   - Escalation path

2. Communication
   - Internal notification
   - Customer communication
   - Status page updates

3. Execution
   - Step-by-step failover procedure
   - Verification checkpoints
   - Rollback criteria

4. Recovery
   - Data sync verification
   - Service restoration
   - Performance validation

5. Post-Incident
   - Timeline documentation
   - Root cause analysis
   - Improvement actions
```

---

## Decision Framework

### When to Invoke DR

| Signal | Threshold | Action |
|--------|-----------|--------|
| Primary region unavailable | > 5 minutes | Initiate failover |
| Data corruption detected | Any critical data | Isolate + restore |
| Security breach confirmed | Any severity | Isolate + assess |
| Performance degradation | > 30 minutes | Consider failover |

### Failback Considerations

| Factor | Assessment | Decision Impact |
|--------|------------|-----------------|
| Data sync status | Fully caught up? | Proceed/Wait |
| Root cause resolved | Issue fixed? | Proceed/Defer |
| Traffic patterns | Off-peak available? | Schedule timing |
| Tenant impact | Critical operations? | Coordinate timing |

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `disaster-recovery`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant disaster recovery {date}"
- Search: "SaaS business continuity patterns {date}"
- Search: "tenant data backup isolation strategies {date}"

---

## Related Workflows

- `bmad-bam-create-master-architecture` - DR strategy in architecture
- `bmad-bam-validate-foundation` - DR readiness verification
- `bmad-bam-tenant-offboarding-design` - Tenant data export procedures
