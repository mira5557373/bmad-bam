---
pattern_id: anonymization
shortcode: ZAY
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Anonymization - BAM Pattern

**Loaded by:** ZAY  
**Applies to:** Data anonymization and pseudonymization pipelines  
**See also:** [privacy-by-design.md](privacy-by-design.md), [right-to-deletion.md](right-to-deletion.md)

---

## When to Use

- Analytics on personal data
- AI/ML training data preparation
- Cross-tenant aggregated reporting
- Data sharing with third parties
- Research and development datasets

## When NOT to Use

- Operational data requiring re-identification
- Audit logs requiring attribution
- Billing data requiring customer link
- Real-time personalization

## Architecture

### Anonymization Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                   Anonymization Pipeline                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Source Data                           │  │
│  │  Raw PII: name, email, phone, address, tenant_id       │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │              Transformation Layer                      │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Technique     │ Field        │ Result           │  │  │
│  │  │ Tokenization  │ email        │ tok_a8f3...      │  │  │
│  │  │ Hashing       │ user_id      │ 3a7f9b2c...      │  │  │
│  │  │ Generalization│ age          │ 30-40            │  │  │
│  │  │ Suppression   │ phone        │ [REDACTED]       │  │  │
│  │  │ Masking       │ credit_card  │ ****-****-1234   │  │  │
│  │  │ Perturbation  │ salary       │ +/- 5%           │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │              K-Anonymity Validation                    │  │
│  │  Ensure k >= 5 for quasi-identifiers                   │  │
│  │  L-diversity for sensitive attributes                  │  │
│  │  T-closeness for distribution similarity               │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │              Anonymized Output                         │  │
│  │  No direct identifiers, quasi-identifier generalized   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Technique Selection

```
Data Classification
    │
    ├── Direct Identifier ──► Tokenization/Suppression
    │   (name, email, SSN)
    │
    ├── Quasi-Identifier ──► Generalization
    │   (age, zip, gender)
    │
    ├── Sensitive Attribute ──► L-Diversity
    │   (salary, health)
    │
    └── Non-Sensitive ──► Pass Through
        (preferences)
```

### Anonymization vs Pseudonymization

| Aspect | Anonymization | Pseudonymization |
|--------|--------------|------------------|
| Reversible | No | Yes (with key) |
| GDPR scope | Out of scope | In scope |
| Use case | Analytics | Operational |
| Key management | None | Required |
| Re-identification risk | Minimal | Moderate |

## Configuration Schema

```yaml
anonymization:
  bam_controlled: true
  
  pipelines:
    - name: string
      source_table: string
      destination_table: string
      schedule: cron
      
      transformations:
        - field: string
          technique: enum[tokenize, hash, generalize, suppress, mask, perturb]
          params:
            salt: encrypted  # For hashing
            ranges: object   # For generalization
            mask_pattern: string
            perturbation_range: float
            
  validation:
    k_anonymity:
      enabled: bool
      min_k: int
      quasi_identifiers: string[]
      
    l_diversity:
      enabled: bool
      min_l: int
      sensitive_attributes: string[]
      
    t_closeness:
      enabled: bool
      max_t: float
      
  pseudonymization:
    key_vault: string
    key_rotation_days: int
    reverse_lookup_allowed_roles: string[]
    
  audit:
    log_transformations: bool
    log_access: bool
    retention_days: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full anonymization | Maximum privacy | Data utility loss | Public sharing |
| Pseudonymization | Reversible | Still regulated | Internal analytics |
| Generalization | Preserves patterns | Group size limits | Research |
| Differential privacy | Mathematical guarantee | Complexity | ML training |

## Quality Checks

- [ ] All direct identifiers removed/tokenized
- [ ] K-anonymity threshold met (k >= 5)
- [ ] Quasi-identifier combination checked
- [ ] Re-identification risk assessed
- [ ] Pseudonymization keys secured
- [ ] Pipeline audit trail complete
- [ ] **CRITICAL:** No tenant data leakage in output

## Web Research Queries

- "data anonymization GDPR compliance {date}"
- "k-anonymity l-diversity implementation {date}"
- "differential privacy ML training {date}"
- "pseudonymization key management {date}"
- "re-identification risk assessment {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Anonymization compliance verified |
| QG-CC | Pipeline execution validated |

## Related Patterns

- [privacy-by-design.md](privacy-by-design.md) - Privacy architecture
- [right-to-deletion.md](right-to-deletion.md) - Erasure support
- [data-retention.md](data-retention.md) - Lifecycle management
