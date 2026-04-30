---
pattern_id: gdpr-compliance
shortcode: ZGD
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# GDPR Compliance - BAM Pattern

**Loaded by:** ZGD  
**Applies to:** EU General Data Protection Regulation implementation  
**See also:** [consent-management.md](consent-management.md), [right-to-deletion.md](right-to-deletion.md)

---

## When to Use

- EU/EEA customers or users
- UK customers (UK GDPR)
- Processing EU resident data
- Selling to EU businesses
- Global SaaS with EU presence

## When NOT to Use

- US-only operations, US-only users
- Fully anonymized data only
- Internal employee tools (separate rules)
- B2B processing under DPA only

## Architecture

### GDPR Compliance Framework

```
┌─────────────────────────────────────────────────────────────┐
│                   GDPR Implementation                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              LAWFUL BASIS (Art. 6)                   │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ Basis          │ Use Case       │ Withdraw │    │    │
│  │  │ Consent        │ Marketing      │ Yes      │    │    │
│  │  │ Contract       │ Service        │ No       │    │    │
│  │  │ Legal oblig    │ Tax records    │ No       │    │    │
│  │  │ Vital interest │ Emergency      │ No       │    │    │
│  │  │ Public task    │ Gov services   │ No       │    │    │
│  │  │ Legitimate int │ Analytics      │ Opt-out  │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            DATA SUBJECT RIGHTS (Art. 15-22)          │    │
│  │  Art. 15: Access       Art. 16: Rectification       │    │
│  │  Art. 17: Erasure      Art. 18: Restriction         │    │
│  │  Art. 20: Portability  Art. 21: Object              │    │
│  │  Art. 22: No automated decision-making              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            CONTROLLER OBLIGATIONS                    │    │
│  │  • Privacy by design (Art. 25)                       │    │
│  │  • Records of processing (Art. 30)                   │    │
│  │  • Data breach notification (Art. 33-34)             │    │
│  │  • DPIA for high-risk processing (Art. 35)           │    │
│  │  • DPO appointment if required (Art. 37)             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Multi-Tenant GDPR Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Multi-Tenant GDPR Model                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Platform (Controller)                   │    │
│  │  • Privacy policy for platform                       │    │
│  │  • Handles tenant as data subject                    │    │
│  │  • DPA with tenants (processor role)                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │              Tenant (Controller)                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Tenant A       │ Tenant B       │ Tenant C     │  │  │
│  │  │ Controller     │ Controller     │ Controller   │  │  │
│  │  │ Own privacy    │ Own privacy    │ Own privacy  │  │  │
│  │  │ Own lawful     │ Own lawful     │ Own lawful   │  │  │
│  │  │ basis          │ basis          │ basis        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                         │  │
│  │  Platform as Processor for tenant's end users          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Data Subject Request Flow

```
DSR Received
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Verify    │────▶│   Route to  │────▶│   Process   │
│   Identity  │     │   Tenant    │     │   Request   │
└─────────────┘     └─────────────┘     └─────────────┘
                          │                   │
              ┌───────────┴───────────┐       │
         Platform User           Tenant User   │
              │                       │        │
              ▼                       ▼        ▼
        Handle directly      Notify tenant   Respond
        (30 days)            for action      (30 days)
```

### Cross-Border Transfer Mechanisms

| Mechanism | When to Use | Documentation |
|-----------|-------------|---------------|
| Adequacy decision | Transfer to approved countries | None required |
| SCCs | Transfer to US, other | Signed agreement + TIA |
| BCRs | Intra-group transfers | Regulatory approval |
| Consent | One-off transfers | Explicit consent |

## Configuration Schema

```yaml
gdpr_compliance:
  bam_controlled: true
  
  controller_config:
    platform_role: enum[controller, processor, joint_controller]
    dpo_required: bool
    dpo_contact: string
    lead_supervisory_authority: string
    
  processing_records:
    - purpose: string
      lawful_basis: enum[consent, contract, legal_obligation, vital_interest, public_task, legitimate_interest]
      data_categories: string[]
      recipients: string[]
      retention: string
      transfers: object[]
      
  data_subject_rights:
    access:
      automation_level: enum[full, partial, manual]
      response_days: int
      
    erasure:
      automation_level: enum[full, partial, manual]
      response_days: int
      exemptions: string[]
      
    portability:
      formats: string[]
      automation_level: enum[full, partial, manual]
      
  consent_management:
    granular: bool
    withdrawable: bool
    storage: string
    
  cross_border:
    default_mechanism: enum[adequacy, sccs, bcrs, consent]
    tia_required: bool
    
  breach_notification:
    supervisory_authority_hours: int
    data_subject_threshold: string
    internal_response_hours: int
    
  dpia:
    high_risk_triggers: string[]
    template_version: string
    review_frequency: string
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Consent-based | Clear authority | Withdrawal risk | Marketing |
| Contract-based | Stable | Limited scope | Service delivery |
| Legitimate interest | Flexible | Requires assessment | Analytics |
| Hybrid | Comprehensive | Complex | Most SaaS |

## Quality Checks

- [ ] Lawful basis documented per purpose
- [ ] Privacy notices complete
- [ ] DSR process operational
- [ ] DPA with all processors
- [ ] Cross-border transfers documented
- [ ] DPIA completed for high-risk
- [ ] **CRITICAL:** 72-hour breach notification ready

## Web Research Queries

- "GDPR SaaS multi-tenant compliance {date}"
- "data processing agreement template {date}"
- "GDPR cross-border transfer mechanisms {date}"
- "data subject request automation {date}"
- "GDPR enforcement trends {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | GDPR compliance verified |
| QG-CC | Privacy controls active |

## Related Patterns

- [consent-management.md](consent-management.md) - Consent tracking
- [right-to-deletion.md](right-to-deletion.md) - Erasure handling
- [data-residency.md](data-residency.md) - Cross-border transfers
- [export-portability.md](export-portability.md) - Portability rights
