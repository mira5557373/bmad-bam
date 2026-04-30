---
pattern_id: data-retention
shortcode: ZDRP
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Data Retention - BAM Pattern

**Loaded by:** ZDRP  
**Applies to:** Retention policy automation and enforcement  
**See also:** [right-to-deletion.md](right-to-deletion.md), [gdpr-compliance.md](gdpr-compliance.md)

---

## When to Use

- Regulatory retention requirements (GDPR, HIPAA, SOX)
- Tenant-specific retention policies
- Cost optimization through data lifecycle
- Legal hold and e-discovery support
- AI training data lifecycle management

## When NOT to Use

- Transient session data only
- Fully anonymized datasets
- Real-time systems without persistence
- Data required indefinitely by contract

## Architecture

### Retention Lifecycle Manager

```
┌─────────────────────────────────────────────────────────────┐
│                  Retention Policy Engine                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Policy Definition                     │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Data Type   │ Retention │ Archive │ Purge      │  │  │
│  │  │ user_data   │ 3 years   │ cold    │ soft+hard  │  │  │
│  │  │ audit_logs  │ 7 years   │ glacier │ hard only  │  │  │
│  │  │ ai_sessions │ 90 days   │ none    │ immediate  │  │  │
│  │  │ analytics   │ 2 years   │ cold    │ soft+hard  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Lifecycle State Machine                  │  │
│  │                                                         │  │
│  │  ACTIVE ──► ARCHIVE_PENDING ──► ARCHIVED ──► PURGE    │  │
│  │     │              │               │          PENDING   │  │
│  │     │              │               │             │      │  │
│  │     ▼              ▼               ▼             ▼      │  │
│  │  LEGAL_HOLD   LEGAL_HOLD     LEGAL_HOLD      PURGED    │  │
│  │                                                         │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │                  Execution Engine                      │  │
│  │  • Scheduled jobs (daily/weekly)                       │  │
│  │  • Tenant-aware processing                             │  │
│  │  • Legal hold exemption                                │  │
│  │  • Audit logging                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Retention Flow

```
Data Created
    │
    ├── created_at recorded
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Active    │────▶│   Archive   │────▶│   Purge     │
│   Period    │     │   Period    │     │   Queue     │
└─────────────┘     └─────────────┘     └─────────────┘
    │                     │                   │
    ▼                     ▼                   ▼
 3 years               + 2 years          Soft delete
 (hot storage)         (cold storage)     then hard delete
```

### Tier-Based Retention

| Tier | Active | Archive | Total | Legal Hold |
|------|--------|---------|-------|------------|
| Free | 1 year | - | 1 year | - |
| Pro | 3 years | 2 years | 5 years | Add-on |
| Enterprise | Custom | Custom | Custom | Included |

## Configuration Schema

```yaml
data_retention:
  bam_controlled: true
  
  policies:
    - name: string
      data_type: string
      tenant_override_allowed: bool
      
      retention:
        active_period_days: int
        archive_period_days: int
        total_period_days: int
        
      archive:
        enabled: bool
        storage_class: enum[cold, glacier, deep_archive]
        encryption: bool
        
      purge:
        soft_delete_first: bool
        soft_delete_days: int
        hard_delete_method: enum[immediate, batch, scheduled]
        verification_required: bool
        
  legal_hold:
    enabled: bool
    matter_tracking:
      matter_id: string
      custodians: string[]
      data_scope: string
      hold_start: timestamp
      hold_end: timestamp
      
  exceptions:
    - data_type: string
      reason: string
      retention_days: int
      
  execution:
    schedule: cron
    batch_size: int
    rate_limit: int
    tenant_parallel: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Hard delete | Storage savings | No recovery | Cost-sensitive |
| Soft + hard | Recovery window | More storage | Standard |
| Archive only | Full history | Storage cost | Compliance |
| Tiered | Flexible | Complex | Enterprise |

## Quality Checks

- [ ] All data types have retention policy
- [ ] Legal hold exemption working
- [ ] Archive encryption enabled
- [ ] Purge jobs running on schedule
- [ ] Audit trail of deletions
- [ ] Tenant policy overrides validated
- [ ] **CRITICAL:** Regulatory minimums enforced

## Web Research Queries

- "data retention policy automation SaaS {date}"
- "GDPR data retention requirements {date}"
- "legal hold e-discovery multi-tenant {date}"
- "data lifecycle management best practices {date}"
- "archival storage tiering patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Data retention compliance verified |
| QG-CC | Retention jobs executing correctly |

## Related Patterns

- [right-to-deletion.md](right-to-deletion.md) - Erasure requests
- [gdpr-compliance.md](gdpr-compliance.md) - GDPR implementation
- [anonymization.md](anonymization.md) - Data anonymization
