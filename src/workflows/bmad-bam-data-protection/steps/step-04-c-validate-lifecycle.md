# Step 4: Validate Data Lifecycle

## Purpose

Validate data lifecycle management including retention, archival, and secure deletion.

## Prerequisites

- Steps 1-3 complete
- Data retention policies defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-protection`

## Actions

### 1. Data Retention Verification

| Data Type | Retention Policy | Implementation | Status |
|-----------|------------------|----------------|--------|
| Chat history | Tenant configurable | Automated cleanup | |
| Audit logs | 7 years minimum | Archive pipeline | |
| Model outputs | 30 days default | Purge job | |
| User data | Account lifetime | Deletion trigger | |
| Backups | 90 days rolling | Automated rotation | |

### 2. Data Archival Audit

| Archive Type | Storage Tier | Encryption | Access Control | Status |
|--------------|--------------|------------|----------------|--------|
| Audit logs | Cold storage | AES-256 | Admin only | |
| Compliance data | Archive | AES-256 | Compliance team | |
| Historical analytics | Glacier | AES-256 | Analysts | |

### 3. Secure Deletion Verification

| Deletion Type | Method | Verification | Status |
|---------------|--------|--------------|--------|
| User data | Crypto shred | Cannot recover | |
| Tenant data | Full purge | No traces | |
| Backups | Scheduled purge | Retention met | |
| Cache data | TTL expiry | Auto-cleared | |
| Temporary files | Job cleanup | No orphans | |

### 4. Right to Deletion (GDPR Article 17)

| Request Type | Process | SLA | Status |
|--------------|---------|-----|--------|
| User deletion | Automated | 72 hours | |
| Data export | Self-service | 24 hours | |
| Consent withdrawal | Immediate | Real-time | |
| Processing objection | Review | 30 days | |

**Verify data lifecycle compliance with web search:**
Search the web: "data retention compliance SaaS {date}"
Search the web: "secure data deletion verification {date}"

## Verification

- [ ] Retention policies enforced
- [ ] Archival process verified
- [ ] Secure deletion confirmed
- [ ] Right to deletion implemented

## Outputs

- Data lifecycle audit findings

## Next Step

Proceed to `step-05-c-generate-report.md`
