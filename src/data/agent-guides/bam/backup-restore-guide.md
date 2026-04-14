# BAM Backup and Restore Guide

**When to load:** During backup strategy design, data recovery planning, or when user mentions backup, restore, point-in-time recovery, data protection.

**Integrates with:** DevOps (devops-bam), Security (compliance), Architect (disaster-recovery)

---

## Core Concepts

### Backup Objectives

Recovery objectives vary by tenant tier and data criticality.

| Objective | Definition | Typical Values |
|-----------|------------|----------------|
| RPO (Recovery Point Objective) | Maximum acceptable data loss | 0 min - 24 hours |
| RTO (Recovery Time Objective) | Maximum acceptable downtime | 15 min - 48 hours |
| Retention | How long to keep backups | 7 days - 7 years |
| Granularity | Smallest recoverable unit | Record, table, tenant, database |

### Tier-Based Objectives

| Tier | RPO | RTO | Retention | Granularity |
|------|-----|-----|-----------|-------------|
| Free | 24 hours | 48 hours | 7 days | Full tenant |
| Pro | 1 hour | 4 hours | 30 days | Table level |
| Enterprise | 15 minutes | 1 hour | 90 days | Record level |
| Enterprise+ | Near-zero | 15 minutes | 1 year | Point-in-time |

---

## Application Guidelines

When implementing backup and restore for multi-tenant platforms:

1. **Isolate tenant backups**: No cross-tenant data in restore packages
2. **Encrypt at rest**: All backups encrypted with tenant-aware keys
3. **Test restores regularly**: Monthly restore tests for each tier
4. **Document procedures**: Runbooks for every restore scenario
5. **Automate verification**: Validate backup integrity automatically

---

## Backup Strategy

### Data Categories

| Category | Examples | Backup Frequency | Method |
|----------|----------|------------------|--------|
| Transactional | Orders, payments | Continuous | WAL/CDC |
| Configuration | Settings, preferences | On change | Snapshot |
| User content | Documents, uploads | Continuous | Incremental |
| AI/ML data | Embeddings, memory | Daily | Snapshot |
| Audit logs | Access logs, changes | Continuous | Append-only |
| Secrets | API keys, credentials | On change | Encrypted |

### Backup Methods

| Method | Use Case | RPO Capability | Overhead |
|--------|----------|----------------|----------|
| Full snapshot | Complete state capture | Hours | High |
| Incremental | Changed data only | Minutes | Low |
| Continuous (WAL) | Transaction log | Seconds | Medium |
| CDC (Change Data Capture) | Real-time streaming | Near-zero | Medium |

### Per-Tenant Backup Architecture

```
Tenant Data Sources
       |
       v
+------------------+
| Backup Orchestrator |
|  - Tenant context   |
|  - Schedule manager |
|  - Key manager      |
+------------------+
       |
       v
+------------------+
| Backup Components |
+------------------+
       |
   +---+---+---+
   |   |   |   |
   v   v   v   v
  DB Files Vectors Configs
       |
       v
+------------------+
| Encrypted Storage |
| - Region-aware    |
| - Versioned       |
| - Immutable       |
+------------------+
```

---

## Backup Components

### Database Backup

| Tenant Model | Backup Strategy | Isolation Method |
|--------------|-----------------|------------------|
| RLS (shared) | Full DB + tenant export scripts | Logical isolation |
| Schema-per-tenant | Schema-level backup | Schema isolation |
| Database-per-tenant | Database-level backup | Physical isolation |

### File Storage Backup

| Component | Backup Type | Frequency | Retention |
|-----------|-------------|-----------|-----------|
| User uploads | Incremental | Continuous | Per tier |
| Generated files | Incremental | Continuous | 30 days |
| System files | Snapshot | Daily | 7 days |

### AI/ML Data Backup

| Component | Backup Strategy | Special Considerations |
|-----------|-----------------|----------------------|
| Vector embeddings | Snapshot + manifest | Index reconstruction |
| Agent memory | JSON export | Memory graph integrity |
| Fine-tuned models | Model snapshot | Version linkage |
| Training data | Incremental | Data provenance |

### Configuration Backup

| Config Type | Storage | Versioning | Restore Priority |
|-------------|---------|------------|------------------|
| Tenant settings | Database | Git-like history | High |
| Feature flags | Config service | Version controlled | High |
| Integration configs | Encrypted store | Versioned | Medium |
| Workflow definitions | Database | Versioned | Medium |

---

## Restore Procedures

### Restore Types

| Restore Type | Scope | Typical Use Case | Complexity |
|--------------|-------|------------------|------------|
| Full platform | Entire system | Disaster recovery | Very High |
| Single tenant | All tenant data | Tenant recovery | Medium |
| Point-in-time | Specific timestamp | Data corruption | High |
| Table/collection | Specific data set | Accidental deletion | Medium |
| Record-level | Individual records | User request | Low |

### Restore Process

```
Restore Request
       |
       v
1. Validate authorization
   - Requester has permission
   - Tenant owns the data
       |
       v
2. Identify backup
   - Locate backup by timestamp
   - Verify integrity (checksum)
       |
       v
3. Prepare restore environment
   - Isolate if needed
   - Allocate resources
       |
       v
4. Execute restore
   - Decrypt backup
   - Apply to target
   - Maintain tenant context
       |
       v
5. Verify restore
   - Data integrity check
   - Tenant isolation verification
   - Application smoke test
       |
       v
6. Activate restored data
   - Switch traffic (if applicable)
   - Notify tenant
       |
       v
Restore Complete
```

### Tenant Self-Service Restore

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| View restore points | Last 3 | Last 30 | All available |
| Request restore | No | Via support | Self-service |
| Point-in-time restore | No | No | Yes |
| Download backup | No | Yes (monthly) | Yes (anytime) |

---

## Verification and Testing

### Backup Verification

| Check | Frequency | Method | Alert Threshold |
|-------|-----------|--------|-----------------|
| Backup completion | Every backup | Job status | Any failure |
| Checksum validation | Daily | Hash comparison | Mismatch |
| Size consistency | Daily | Variance check | >20% change |
| Encryption verification | Daily | Key validation | Key error |

### Restore Testing

| Test Type | Frequency | Scope | Success Criteria |
|-----------|-----------|-------|------------------|
| Automated restore | Weekly | Sample tenant | Data matches |
| Full tenant restore | Monthly | Test tenant | All data intact |
| Point-in-time restore | Quarterly | Test scenario | Exact timestamp |
| Full DR restore | Annually | All data | < RTO completion |

### Restore Verification Checklist

| Verification | Method | Pass Criteria |
|--------------|--------|---------------|
| Record count | Pre/post comparison | Within 0.1% |
| Data integrity | Checksum validation | All match |
| Relationships | Foreign key check | No orphans |
| Tenant isolation | Cross-tenant query | Zero results |
| Application function | Smoke tests | All pass |
| Performance | Baseline comparison | Within 20% |

---

## Compliance and Security

### Data Protection

| Requirement | Implementation |
|-------------|----------------|
| Encryption at rest | AES-256 with tenant keys |
| Encryption in transit | TLS 1.3 |
| Access control | IAM with audit logging |
| Immutability | Write-once storage option |
| Geographic compliance | Region-locked storage |

### Retention Policies

| Data Category | Minimum Retention | Maximum Retention | Legal Hold |
|---------------|-------------------|-------------------|------------|
| Transactional | 30 days | 7 years | Indefinite |
| User content | 7 days | Per tenant tier | Indefinite |
| Audit logs | 1 year | 7 years | Indefinite |
| AI/ML data | 30 days | 1 year | Indefinite |

### Compliance Mapping

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| GDPR Art 17 | Right to erasure | Backup pruning |
| SOC 2 A1.2 | Backup procedures | Documented runbooks |
| HIPAA | Data protection | Encryption + access control |
| PCI DSS 9.5 | Media protection | Secure storage |

---

## Emergency Procedures

### Data Loss Response

```
Data Loss Detected
       |
       v
1. IMMEDIATE: Stop writes to affected area
       |
       v
2. 5 MIN: Assess scope and impact
       |
       v
3. 15 MIN: Identify best recovery point
       |
       v
4. 30 MIN: Begin restore procedure
       |
       v
5. ONGOING: Monitor restore progress
       |
       v
6. COMPLETION: Verify and activate
       |
       v
7. POST: Root cause analysis
```

### Backup Failure Response

| Scenario | Detection | Response |
|----------|-----------|----------|
| Backup job failed | Alert | Retry, then escalate |
| Storage full | Monitoring | Emergency cleanup |
| Encryption key unavailable | Alert | Key recovery procedure |
| Network failure | Alert | Retry with backoff |
| Corruption detected | Verification | Use previous backup |

---

## Decision Framework

### Backup Strategy Selection

| Factor | Consider |
|--------|----------|
| Data criticality | Higher = more frequent backups |
| Change frequency | Higher = CDC or WAL |
| Size | Larger = incremental preferred |
| Cost tolerance | Limited = optimize retention |
| Compliance | Strict = longer retention |

### Restore Priority Matrix

| Priority | Criteria | Response Time |
|----------|----------|---------------|
| P1 | Enterprise+ production data | Immediate |
| P2 | Enterprise production data | 1 hour |
| P3 | Pro production data | 4 hours |
| P4 | Non-production data | 24 hours |
| P5 | Free tier or test data | Best effort |

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant backup strategies SaaS {date}"
- Search: "point-in-time recovery multi-tenant {date}"
- Search: "tenant data isolation backup {date}"

---

## Related Workflows

- `bmad-bam-tenant-backup-restore` - Backup and restore workflow
- `bmad-bam-disaster-recovery-design` - DR planning
- `bmad-bam-data-retention-policy-design` - Retention policy workflow
