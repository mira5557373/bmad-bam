# BAM Tenant Migration Patterns Context

**When to load:** During tenant tier upgrades/downgrades, regional migrations, or isolation model transitions. Load when planning data migrations, cutover strategies, or rollback procedures for multi-tenant environments.

**Integrates with:** Atlas (Platform Architect), DevOps agents, PM agents

---

## Core Concepts for Tenant Migration

### Migration Types Matrix

| Migration Type | Trigger | Complexity | Risk Level |
|----------------|---------|------------|------------|
| Tier Upgrade | Tenant purchases higher tier | Medium | Medium |
| Tier Downgrade | Tenant reduces subscription | Medium | High (data loss risk) |
| Regional Migration | Compliance/latency requirements | High | High |
| Isolation Model Change | RLS to schema or schema to dedicated | Very High | Critical |
| Platform Version Upgrade | New platform release | Low-Medium | Low |
| Disaster Recovery Failover | Primary region failure | High | Critical |

### Tier Migration Patterns

#### Upgrade Path (FREE -> PRO -> ENTERPRISE)

| From | To | Data Changes | Infrastructure Changes |
|------|-----|--------------|------------------------|
| FREE | PRO | Enable premium features flag | Allocate larger quotas |
| PRO | ENTERPRISE | Copy to dedicated schema/DB | Provision dedicated resources |
| FREE | ENTERPRISE | Full data migration + dedicated provisioning | Complete infrastructure setup |

#### Downgrade Path (ENTERPRISE -> PRO -> FREE)

| From | To | Data Changes | Risk Mitigation |
|------|-----|--------------|-----------------|
| ENTERPRISE | PRO | Merge back to shared infrastructure | Archive dedicated data first |
| PRO | FREE | Disable premium features, archive data exceeding limits | Grace period notification |
| ENTERPRISE | FREE | Full reverse migration | Extended archive retention |

### Regional Migration Patterns

#### Data Residency Requirements

| Region | Data Sovereignty | Compliance Framework | Storage Location |
|--------|------------------|----------------------|------------------|
| EU | GDPR | EU AI Act, DORA | eu-west-1, eu-central-1 |
| US | CCPA, state laws | SOC 2, HIPAA | us-east-1, us-west-2 |
| APAC | PDPA, PIPL | ISO 27001 | ap-southeast-1, ap-northeast-1 |
| UK | UK GDPR | FCA regulations | eu-west-2 |

#### Cross-Region Migration Strategy

| Phase | Duration | Actions | Rollback Point |
|-------|----------|---------|----------------|
| Pre-Migration | 1-2 weeks | Data inventory, compliance check, stakeholder notification | Full rollback |
| Data Replication | 24-72 hours | Async replication to target region | Full rollback |
| Validation | 4-8 hours | Data integrity verification, compliance audit | Full rollback |
| DNS Cutover | 15-30 minutes | Traffic routing switch | Immediate failback |
| Post-Migration | 24-48 hours | Monitoring, source cleanup | Limited rollback |

### Isolation Model Migration Patterns

#### RLS to Schema-per-Tenant

| Step | Action | Tenant Impact | Duration |
|------|--------|---------------|----------|
| 1 | Create tenant schema | None | Minutes |
| 2 | Copy tables with tenant data | None (read replica) | Hours |
| 3 | Set up replication | None | Minutes |
| 4 | Cutover application routing | Brief downtime (<5 min) | Minutes |
| 5 | Verify and cleanup | None | Hours |

#### Schema-per-Tenant to Database-per-Tenant

| Step | Action | Tenant Impact | Duration |
|------|--------|---------------|----------|
| 1 | Provision dedicated database | None | Hours |
| 2 | Full schema migration | None | Hours |
| 3 | Data migration (pg_dump/restore) | Read-only mode | Hours |
| 4 | Application connection string update | Brief downtime | Minutes |
| 5 | Verify and decommission source | None | Days |

### Data Migration Strategies

#### Online Migration (Zero/Minimal Downtime)

| Strategy | Use Case | Complexity | Tenant Impact |
|----------|----------|------------|---------------|
| Dual-Write | Critical tenants | High | Zero downtime |
| Change Data Capture (CDC) | Large datasets | High | Zero downtime |
| Logical Replication | PostgreSQL-native | Medium | Zero downtime |
| Blue-Green Database | Coordinated cutover | Medium | Brief maintenance window |

#### Offline Migration (Maintenance Window)

| Strategy | Use Case | Duration | Tenant Impact |
|----------|----------|----------|---------------|
| pg_dump/pg_restore | Small datasets (<100GB) | Hours | Full downtime |
| Parallel pg_dump | Medium datasets (100GB-1TB) | Hours | Full downtime |
| AWS DMS | Cross-platform or cloud migration | Hours-Days | Full downtime |

### Cutover Planning Framework

#### Pre-Cutover Checklist

| Category | Check | Critical |
|----------|-------|----------|
| Data | All data synchronized | Yes |
| Data | Integrity checksums match | Yes |
| Infrastructure | Target resources provisioned | Yes |
| Infrastructure | DNS TTL lowered (5 min) | Yes |
| Application | Connection strings updated | Yes |
| Application | Feature flags configured | Yes |
| Monitoring | Alerts configured for target | Yes |
| Communication | Tenant notification sent | Yes |

#### Cutover Execution Phases

| Phase | Duration | Actions | Success Criteria |
|-------|----------|---------|------------------|
| Freeze | 5 min | Stop writes to source | Queue depth = 0 |
| Sync | 5-15 min | Final data sync | Lag = 0 |
| Switch | 1-2 min | Update routing/DNS | Traffic on target |
| Validate | 5-10 min | Health checks, smoke tests | All green |
| Monitor | 60 min | Active monitoring | No anomalies |

### Rollback Procedures

#### Rollback Decision Matrix

| Scenario | Rollback Time | Data Loss Risk | Automatic |
|----------|---------------|----------------|-----------|
| Cutover failed immediately | <5 min | None | Yes |
| Issues detected within 1 hour | <30 min | Minimal | Yes |
| Issues detected within 24 hours | 1-4 hours | Some transactions | Manual |
| Issues detected after 24 hours | Not recommended | Significant | No - fix forward |

#### Rollback Types

| Type | When to Use | Procedure | Recovery Time |
|------|-------------|-----------|---------------|
| Instant Rollback | Pre-cutover validation fails | Cancel migration, no changes | Seconds |
| DNS Rollback | Post-cutover, within TTL | Point DNS to original | TTL duration |
| Data Rollback | Data corruption detected | Restore from point-in-time | 1-4 hours |
| Full Rollback | Complete migration failure | Full reverse migration | 4-24 hours |

### Multi-Tenant Migration Considerations

#### Tenant Isolation During Migration

| Concern | Mitigation | Verification |
|---------|------------|--------------|
| Data leakage during copy | Tenant filter in migration scripts | Audit log review |
| Cross-tenant access | Separate migration connections per tenant | RLS policy testing |
| Resource contention | Throttled migration rate | Performance monitoring |
| Rollback isolation | Per-tenant rollback capability | Rollback testing |

#### Tenant Communication Template

| Phase | Communication | Channel | Timing |
|-------|---------------|---------|--------|
| Announcement | Migration scheduled | Email, In-app | 2 weeks prior |
| Reminder | Migration tomorrow | Email, SMS | 24 hours prior |
| Start | Migration beginning | Status page | At start |
| Progress | Migration in progress | Status page | Hourly |
| Complete | Migration successful | Email, In-app | At completion |
| Issues | Problem encountered | All channels | Immediate |

### Migration Monitoring

#### Key Metrics During Migration

| Metric | Warning Threshold | Critical Threshold | Action |
|--------|-------------------|-------------------|--------|
| Replication Lag | >30 seconds | >5 minutes | Pause migration |
| Error Rate | >0.1% | >1% | Investigate immediately |
| Latency (p99) | >2x baseline | >5x baseline | Consider rollback |
| Data Sync Progress | <50% at midpoint | Stalled >30 min | Escalate |

#### Post-Migration Validation

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Row Counts | Compare source vs target | Exact match |
| Checksums | MD5/SHA256 of critical tables | Exact match |
| Application Health | Synthetic transactions | All pass |
| User Access | Login verification | All users can authenticate |
| Feature Parity | Feature flag verification | All enabled features work |

---

## Application Guidelines

1. **Always test migrations in staging** - Never perform untested migrations on production tenants
2. **Communicate early and often** - Tenants need advance notice for any downtime
3. **Design for rollback** - Every migration must have a tested rollback procedure
4. **Isolate tenant migrations** - One tenant's migration should never affect others
5. **Monitor aggressively** - Increase monitoring during and after migrations

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When should zero-downtime migration be used vs maintenance window? | Zero-downtime for tier upgrades and regional migrations; maintenance window acceptable for isolation model changes | Customer experience vs complexity tradeoff |
| How long should migration rollback capability be maintained? | Minimum 7 days for tier changes, 30 days for regional/isolation changes | Allows detection of delayed issues while managing storage costs |
| Should all tenant data be migrated or can some be archived? | Migrate active data, archive historical data with retrieval SLA documented | Reduces migration time and cost; tenant must agree to archive terms |
| How to handle migration failures mid-way through? | Implement idempotent migration steps; resume from last checkpoint rather than restart | Reduces migration time; prevents duplicate data |
| When should tenant be notified of migration? | 2 weeks advance notice for planned migrations; immediate for emergency migrations | Builds trust; allows tenants to plan around downtime |

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Design initial tenant isolation strategy
- `bmad-bam-tenant-onboarding-design` - New tenant provisioning workflows
- `bmad-bam-tenant-offboarding-design` - Tenant data cleanup and archival
- `bmad-bam-disaster-recovery-design` - DR failover procedures
- `validate-foundation` - Verify migration infrastructure readiness

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` → all rows for isolation comparison
- **Migration patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `tenant-lifecycle`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant data migration patterns {date}"
- Search: "PostgreSQL logical replication tenant migration {date}"
- Search: "zero-downtime database migration strategies {date}"
- Search: "SaaS tier upgrade migration patterns {date}"
