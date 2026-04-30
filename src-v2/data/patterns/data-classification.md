---
pattern_id: data-classification
shortcode: ZDC
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Data Classification - BAM Pattern

**Loaded by:** ZDC  
**Applies to:** Data classification schemas and enforcement  
**See also:** [privacy-by-design.md](privacy-by-design.md), [anonymization.md](anonymization.md)

---

## When to Use

- Multi-tenant data governance
- Regulatory compliance (GDPR, HIPAA, PCI)
- Data access control decisions
- Retention policy automation
- AI training data filtering

## When NOT to Use

- Uniform data sensitivity levels
- Internal tools with single classification
- Fully anonymized datasets
- Transient session data only

## Architecture

### Classification Framework

```
┌─────────────────────────────────────────────────────────────┐
│                  Data Classification Engine                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Classification Levels                     │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Level      │ Color  │ Access      │ Encryption  │  │  │
│  │  │ PUBLIC     │ Green  │ Anyone      │ Optional    │  │  │
│  │  │ INTERNAL   │ Blue   │ Employees   │ In-transit  │  │  │
│  │  │ CONFIDENTIAL│ Yellow│ Need-to-know│ At-rest     │  │  │
│  │  │ RESTRICTED │ Red    │ Explicit    │ Field-level │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │              Auto-Classification                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Pattern         │ Classification │ Confidence  │  │  │
│  │  │ SSN regex       │ RESTRICTED     │ High        │  │  │
│  │  │ Credit card     │ RESTRICTED     │ High        │  │  │
│  │  │ Email pattern   │ CONFIDENTIAL   │ Medium      │  │  │
│  │  │ Name + address  │ CONFIDENTIAL   │ Medium      │  │  │
│  │  │ IP address      │ INTERNAL       │ Low         │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │              Policy Enforcement                        │  │
│  │  • Access control based on classification              │  │
│  │  • Encryption level enforcement                        │  │
│  │  • Retention policy application                        │  │
│  │  • AI training exclusion                               │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Classification Flow

```
Data Input
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Pattern   │────▶│   ML        │────▶│   Human     │
│   Match     │     │   Classify  │     │   Review    │
└─────────────┘     └─────────────┘     └─────────────┘
    │                     │                   │
    ▼                     ▼                   ▼
  High confidence    Medium confidence   Low confidence
    │                     │                   │
    └─────────────────────┴───────────────────┘
                          │
                          ▼
                  ┌──────────────┐
                  │ Apply Label  │
                  │ + Policies   │
                  └──────────────┘
```

### Classification by Data Type

| Data Type | Default Level | Auto-Elevate | AI Training |
|-----------|--------------|--------------|-------------|
| User credentials | RESTRICTED | - | Never |
| PII (direct) | RESTRICTED | - | Never |
| PII (indirect) | CONFIDENTIAL | If combined | Opt-in |
| Business data | CONFIDENTIAL | If sensitive | Review |
| Usage metrics | INTERNAL | - | Yes |
| Public content | PUBLIC | - | Yes |

## Configuration Schema

```yaml
data_classification:
  bam_controlled: true
  
  levels:
    - name: string
      color: string
      numeric_level: int
      access_control: enum[public, authenticated, role_based, explicit]
      encryption: enum[none, transit, at_rest, field_level]
      retention_default: string
      ai_training_allowed: bool
      
  auto_classification:
    enabled: bool
    confidence_threshold: float
    require_human_review: bool
    
    patterns:
      - name: string
        regex: string
        classification: string
        confidence: float
        
    ml_classifier:
      enabled: bool
      model_endpoint: string
      fallback_classification: string
      
  field_mapping:
    - table: string
      field: string
      classification: string
      override_allowed: bool
      
  tenant_overrides:
    allowed: bool
    max_level: string
    require_approval: bool
    
  enforcement:
    access_control: bool
    encryption: bool
    retention: bool
    ai_exclusion: bool
    
  audit:
    log_classifications: bool
    log_access: bool
    log_overrides: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Auto-only | Fast, scalable | May miss context | High volume |
| Manual-only | Accurate | Slow, expensive | Sensitive data |
| Hybrid | Balanced | Complex workflow | Most cases |
| Field-level | Granular | Performance impact | Mixed tables |

## Quality Checks

- [ ] All tables have classification
- [ ] Auto-classification patterns validated
- [ ] Encryption policies enforced
- [ ] Access controls aligned with level
- [ ] AI training exclusions working
- [ ] Override audit trail complete
- [ ] **CRITICAL:** RESTRICTED data protected

## Web Research Queries

- "data classification framework enterprise {date}"
- "automated PII detection patterns {date}"
- "multi-tenant data labeling {date}"
- "ML-based data classification {date}"
- "data governance SaaS best practices {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Data classification compliance verified |
| QG-CC | Classification enforcement active |

## Related Patterns

- [privacy-by-design.md](privacy-by-design.md) - Privacy architecture
- [anonymization.md](anonymization.md) - Data anonymization
- [data-retention.md](data-retention.md) - Retention policies
