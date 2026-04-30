---
pattern_id: privacy-by-design
shortcode: ZPB
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Privacy by Design - BAM Pattern

**Loaded by:** ZPB  
**Applies to:** Privacy-first architecture principles  
**See also:** [gdpr-compliance.md](gdpr-compliance.md), [data-classification.md](data-classification.md)

---

## When to Use

- GDPR Article 25 compliance
- New feature development with PII
- System architecture design
- AI/ML system design
- Third-party integration planning

## When NOT to Use

- Legacy system documentation only
- Systems with no personal data
- Fully anonymized data processing
- Internal tools with minimal data

## Architecture

### Privacy by Design Principles

```
┌─────────────────────────────────────────────────────────────┐
│              7 Foundational Principles                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. PROACTIVE NOT REACTIVE                                  │
│     Prevent privacy issues before they occur                 │
│                                                              │
│  2. PRIVACY AS DEFAULT                                       │
│     Maximum privacy without user action required             │
│                                                              │
│  3. PRIVACY EMBEDDED                                         │
│     Built into design, not bolted on                         │
│                                                              │
│  4. FULL FUNCTIONALITY                                       │
│     Privacy + functionality, not either/or                   │
│                                                              │
│  5. END-TO-END SECURITY                                     │
│     Lifecycle protection from collection to deletion         │
│                                                              │
│  6. VISIBILITY AND TRANSPARENCY                             │
│     Open to scrutiny, verifiable claims                      │
│                                                              │
│  7. USER-CENTRIC                                            │
│     Respect user interests, provide controls                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                Privacy-First Architecture                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               Data Minimization Layer               │    │
│  │  • Collect only necessary data                       │    │
│  │  • Purpose limitation enforcement                    │    │
│  │  • Retention automation                              │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Consent & Control Layer                  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Feature     │ Default │ User Control │ Opt-out │  │  │
│  │  │ Analytics   │ Off     │ Granular     │ Easy    │  │  │
│  │  │ AI Training │ Off     │ Explicit     │ Easy    │  │  │
│  │  │ Marketing   │ Off     │ Granular     │ Easy    │  │  │
│  │  │ Essential   │ On      │ N/A          │ N/A     │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Protection Layer                         │  │
│  │  • Encryption by default                               │  │
│  │  • Pseudonymization where possible                     │  │
│  │  • Access control enforcement                          │  │
│  │  • Audit logging                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### DPIA Integration

```
New Feature Proposal
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Privacy   │────▶│    Risk     │────▶│   DPIA      │
│   Screening │     │  Assessment │     │   Required? │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
              ┌───────────┬───────────┬───────┘
              ▼           ▼           ▼
           Low Risk   Medium Risk  High Risk
              │           │           │
              ▼           ▼           ▼
          Document   Mini-DPIA   Full DPIA
          + Proceed  + Review    + DPO Sign-off
```

### Privacy Controls Matrix

| Control | Default | User Override | Tenant Override |
|---------|---------|---------------|-----------------|
| Data collection | Minimal | Opt-in more | Restrict further |
| Processing purpose | Limited | View only | Restrict |
| Retention | Shortest | Cannot extend | Shorten only |
| Third-party sharing | None | Opt-in | Block |
| AI training | Off | Explicit opt-in | Block |

## Configuration Schema

```yaml
privacy_by_design:
  bam_controlled: true
  
  data_minimization:
    enforce_purpose_limitation: bool
    required_fields_only: bool
    auto_delete_unused: bool
    unused_threshold_days: int
    
  consent_defaults:
    - purpose: string
      default_status: enum[granted, denied]
      user_controllable: bool
      opt_out_easy: bool
      
  protection:
    encryption_default: bool
    pseudonymization_enabled: bool
    access_control_default: enum[deny_all, need_to_know]
    
  transparency:
    privacy_dashboard: bool
    data_usage_visibility: bool
    processing_explainability: bool
    
  dpia:
    screening_required: bool
    risk_threshold_for_full_dpia: float
    dpo_review_required: bool
    
  vendor_assessment:
    required_for_pii: bool
    minimum_controls: string[]
    
  audit:
    log_all_pii_access: bool
    log_consent_changes: bool
    retention_days: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Strict defaults | Maximum privacy | Less functionality | B2C, regulated |
| User choice | Flexibility | Choice fatigue | Power users |
| Tiered | Balanced | Complexity | Enterprise |
| Context-aware | Optimal | Implementation cost | Mature systems |

## Quality Checks

- [ ] Data minimization enforced
- [ ] Privacy defaults set correctly
- [ ] DPIA process documented
- [ ] Consent controls implemented
- [ ] Transparency dashboard available
- [ ] Vendor assessment completed
- [ ] **CRITICAL:** No privacy-invasive defaults

## Web Research Queries

- "privacy by design GDPR Article 25 {date}"
- "data minimization SaaS patterns {date}"
- "DPIA automation best practices {date}"
- "privacy-first architecture patterns {date}"
- "privacy engineering principles {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Privacy by design compliance verified |
| QG-CC | Privacy controls active |

## Related Patterns

- [gdpr-compliance.md](gdpr-compliance.md) - GDPR implementation
- [data-classification.md](data-classification.md) - Data labeling
- [consent-management.md](consent-management.md) - Consent tracking
