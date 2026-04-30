---
pattern_id: consent-management
shortcode: ZCM
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Consent Management - BAM Pattern

**Loaded by:** ZCM  
**Applies to:** User consent tracking and enforcement  
**See also:** [gdpr-compliance.md](gdpr-compliance.md), [privacy-by-design.md](privacy-by-design.md)

---

## When to Use

- GDPR, CCPA, or privacy regulation compliance
- Marketing and analytics consent requirements
- Cookie consent management
- AI/ML training data consent
- Third-party data sharing authorization

## When NOT to Use

- B2B SaaS with contract-based processing only
- Internal tools with no user data
- Fully anonymized data processing
- Legitimate interest processing only

## Architecture

### Consent Platform Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Consent Management Platform                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               Consent Collection Layer               │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐         │    │
│  │  │  Cookie   │ │  In-App   │ │   API     │         │    │
│  │  │  Banner   │ │  Modal    │ │  Consent  │         │    │
│  │  └───────────┘ └───────────┘ └───────────┘         │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │                Consent Store (Per Tenant)              │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ user_id │ tenant_id │ purpose │ status │ date   │  │  │
│  │  │ user_1  │ tenant_a  │ analytics│ granted│ 2026  │  │  │
│  │  │ user_1  │ tenant_a  │ marketing│ denied │ 2026  │  │  │
│  │  │ user_1  │ tenant_a  │ ai_train │ pending│ -     │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Consent Enforcement Engine               │  │
│  │  • Pre-processing checks                               │  │
│  │  • Real-time consent verification                      │  │
│  │  • Downstream system sync                              │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Consent Flow

```
User Action
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Present   │────▶│   Capture   │────▶│   Store     │
│   Choices   │     │   Response  │     │   Consent   │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                    ┌─────────────────────────┘
                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Sync      │────▶│   Enforce   │────▶│   Audit     │
│   Systems   │     │   Rules     │     │   Trail     │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Purpose Categories

| Purpose | Description | Default | Withdrawable |
|---------|-------------|---------|--------------|
| essential | Service delivery | Implied | No |
| analytics | Usage tracking | Opt-in | Yes |
| marketing | Email campaigns | Opt-in | Yes |
| ai_training | ML model training | Opt-in | Yes |
| third_party | Partner sharing | Opt-in | Yes |
| profiling | Automated decisions | Opt-in | Yes |

## Configuration Schema

```yaml
consent_management:
  bam_controlled: true
  
  purposes:
    - name: string
      description: string
      legal_basis: enum[consent, contract, legitimate_interest]
      required: bool
      default_status: enum[granted, denied, pending]
      retention_days: int
      
  collection:
    banner_config:
      position: enum[bottom, top, center]
      blocking: bool
      granular_options: bool
      
    modal_config:
      trigger: enum[signup, first_visit, feature_access]
      allow_skip: bool
      
  storage:
    consent_record:
      user_id: uuid
      tenant_id: uuid
      purpose: string
      status: enum[granted, denied, withdrawn, pending]
      granted_at: timestamp
      withdrawn_at: timestamp
      version: string
      source: enum[banner, modal, api, import]
      
  enforcement:
    pre_check: bool
    block_on_missing: bool
    cache_ttl_seconds: int
    
  sync:
    downstream_systems:
      - system: string
        purposes: string[]
        sync_frequency: string
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Binary consent | Simple UX | Less control | Basic needs |
| Granular | Full control | Complex UX | GDPR strict |
| Progressive | Low friction | Delayed capture | Growth focus |
| Pre-checked | Higher rates | Legal risk | Non-EU |

## Quality Checks

- [ ] All purposes clearly described
- [ ] Consent version tracked
- [ ] Withdrawal mechanism exists
- [ ] Downstream systems synced
- [ ] Consent audit trail complete
- [ ] No processing without valid consent
- [ ] **CRITICAL:** AI training consent explicit and separate

## Web Research Queries

- "GDPR consent management platform patterns {date}"
- "granular consent UX best practices {date}"
- "AI training data consent requirements {date}"
- "consent enforcement SaaS architecture {date}"
- "consent withdrawal automation patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Consent management compliance verified |
| QG-CC | Consent enforcement active |

## Related Patterns

- [gdpr-compliance.md](gdpr-compliance.md) - GDPR implementation
- [privacy-by-design.md](privacy-by-design.md) - Privacy architecture
- [data-retention.md](data-retention.md) - Retention policies
