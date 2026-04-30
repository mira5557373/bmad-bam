---
pattern_id: right-to-deletion
shortcode: ZRD
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Right to Deletion - BAM Pattern

**Loaded by:** ZRD  
**Applies to:** GDPR Article 17 erasure implementation  
**See also:** [gdpr-compliance.md](gdpr-compliance.md), [data-retention.md](data-retention.md)

---

## When to Use

- GDPR compliance requirements
- CCPA consumer deletion requests
- User account deletion workflows
- Tenant offboarding data purge
- AI training data removal

## When NOT to Use

- Legal hold data
- Regulatory retention requirements
- Audit log retention periods
- Active contractual obligations

## Architecture

### Erasure Request Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                  Erasure Request Handler                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Request Intake                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ request_id │ user_id │ tenant_id │ status      │  │  │
│  │  │ req_001    │ user_a  │ tenant_x  │ pending     │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │              Identity Verification                     │  │
│  │  • Email verification                                  │  │
│  │  • MFA challenge                                       │  │
│  │  • Account ownership proof                             │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Data Discovery                           │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ System          │ Tables    │ Records │ Status  │  │  │
│  │  │ Primary DB      │ 12        │ 1,847   │ found   │  │  │
│  │  │ Analytics       │ 5         │ 23,456  │ found   │  │  │
│  │  │ AI Embeddings   │ 2         │ 156     │ found   │  │  │
│  │  │ Backup          │ 12        │ 1,847   │ queued  │  │  │
│  │  │ CDN Cache       │ 1         │ 45      │ purge   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Erasure Execution                        │  │
│  │  • Soft delete (immediate)                             │  │
│  │  • Hard delete (after grace period)                    │  │
│  │  • Backup purge (scheduled)                            │  │
│  │  • AI model impact assessment                          │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Completion & Audit                       │  │
│  │  • Confirmation to user                                │  │
│  │  • Audit trail preserved                               │  │
│  │  • Third-party notification                            │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Erasure State Machine

```
Request Received
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Pending   │────▶│  Verified   │────▶│ Processing  │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                          │                   │
              ┌───────────┘                   │
           REJECTED                           ▼
              │                    ┌─────────────────┐
              ▼                    │  Partial (Hold) │
        ┌──────────┐               └────────┬────────┘
        │  Closed  │                        │
        │(Rejected)│                        ▼
        └──────────┘               ┌─────────────────┐
                                   │    Completed    │
                                   └─────────────────┘
```

### Timeline Requirements

| Regulation | Response | Completion | Extension |
|------------|----------|------------|-----------|
| GDPR | 30 days | 30 days | +60 days |
| CCPA | 45 days | 45 days | +45 days |
| LGPD | 15 days | 15 days | Justified |

## Configuration Schema

```yaml
right_to_deletion:
  bam_controlled: true
  
  request_handling:
    intake_channels: enum[portal, api, email]
    auto_verification: bool
    verification_methods: string[]
    grace_period_days: int
    
  data_discovery:
    systems:
      - name: string
        type: enum[database, storage, cache, embedding, backup]
        scan_method: enum[query, api, manual]
        auto_purge: bool
        
  erasure_execution:
    soft_delete:
      enabled: bool
      retention_days: int
      
    hard_delete:
      batch_size: int
      rate_limit: int
      
    backup_purge:
      enabled: bool
      schedule: cron
      
  exemptions:
    legal_hold:
      check_enabled: bool
      hold_systems: string[]
      
    regulatory:
      - regulation: string
        data_types: string[]
        retention_override: int
        
  ai_impact:
    embedding_deletion: bool
    model_retrain_trigger: bool
    training_data_removal: bool
    
  notifications:
    user_confirmation: bool
    third_party_cascade: bool
    third_party_systems: string[]
    
  audit:
    preserve_request_log: bool
    anonymize_after_completion: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Immediate hard delete | Fast, complete | No recovery | Simple cases |
| Soft + hard | Recovery window | More steps | Standard |
| Anonymization | Preserves analytics | Not true deletion | Analytics-heavy |
| Tombstone | Audit trail | Storage overhead | Regulated |

## Quality Checks

- [ ] All data sources discovered
- [ ] Legal hold exemptions checked
- [ ] Backup purge scheduled
- [ ] AI embeddings addressed
- [ ] Third parties notified
- [ ] User confirmation sent
- [ ] **CRITICAL:** Timeline compliance met

## Web Research Queries

- "GDPR Article 17 implementation patterns {date}"
- "right to erasure SaaS architecture {date}"
- "AI training data deletion GDPR {date}"
- "data subject request automation {date}"
- "backup purge compliance patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Deletion process compliance verified |
| QG-CC | Timeline tracking active |

## Related Patterns

- [gdpr-compliance.md](gdpr-compliance.md) - GDPR implementation
- [data-retention.md](data-retention.md) - Retention policies
- [anonymization.md](anonymization.md) - Alternative to deletion
