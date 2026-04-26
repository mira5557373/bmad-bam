# Storage - BAM Domain Context

**Loaded by:** ZSF, ZSO  
**Related Workflows:** bmad-bam-storage-architecture, bmad-bam-file-management

---

## Overview

Storage systems in multi-tenant SaaS require path-based or bucket-based isolation for tenant data.

## Core Concepts

### Storage Path Convention

All tenant data uses prefixed paths:
```
tenants/{tenant_id}/uploads/
tenants/{tenant_id}/exports/
tenants/{tenant_id}/backups/
```

### Storage Tiers

| Tier | Storage | Access | Cost |
|------|---------|--------|------|
| Hot | SSD/NVMe | Milliseconds | $$$ |
| Warm | HDD/S3 | Seconds | $$ |
| Cold | Glacier | Minutes-Hours | $ |

### Data Lifecycle

| Stage | Retention | Storage Tier |
|-------|-----------|--------------|
| Active | Current | Hot |
| Archive | 1-7 years | Warm |
| Compliance | 7+ years | Cold |
| Deleted | 30-day grace | Marked |

## Decision Matrix

| Data Type | Storage | Tenant Isolation | Encryption |
|-----------|---------|------------------|------------|
| User uploads | Object store | Path prefix | Server-side |
| Database | Managed DB | RLS/Schema | TDE |
| Backups | Cold storage | Separate files | Customer key |
| Logs | Log store | Index separation | Platform key |

## Quality Checks

- [ ] Storage paths include tenant segment
- [ ] Access policies enforce tenant boundaries
- [ ] Quota enforcement per tenant
- [ ] **CRITICAL:** No cross-tenant file access

## Web Research Queries

- "multi-tenant storage patterns {date}"
- "S3 tenant isolation patterns {date}"
