---
pattern_id: hipaa-compliance
shortcode: ZHC
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# HIPAA Compliance - BAM Pattern

**Loaded by:** ZHC  
**Applies to:** HIPAA Privacy and Security Rule safeguards  
**See also:** [soc2-compliance.md](soc2-compliance.md), [data-classification.md](data-classification.md)

---

## When to Use

- Healthcare SaaS applications
- PHI processing or storage
- Healthcare provider customers
- Health tech integrations
- Business Associate relationships

## When NOT to Use

- No PHI in application
- Consumer wellness (non-HIPAA)
- Non-US healthcare data only
- De-identified data only

## Architecture

### HIPAA Safeguard Framework

```
┌─────────────────────────────────────────────────────────────┐
│                     HIPAA Safeguards                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               ADMINISTRATIVE (164.308)               │    │
│  │  • Security Management Process                       │    │
│  │  • Workforce Security                                │    │
│  │  • Information Access Management                     │    │
│  │  • Security Awareness Training                       │    │
│  │  • Contingency Plan                                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               PHYSICAL (164.310)                     │    │
│  │  • Facility Access Controls                          │    │
│  │  • Workstation Use and Security                      │    │
│  │  • Device and Media Controls                         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               TECHNICAL (164.312)                    │    │
│  │  • Access Control                                    │    │
│  │  • Audit Controls                                    │    │
│  │  • Integrity Controls                                │    │
│  │  • Transmission Security                             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Multi-Tenant PHI Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  PHI Isolation Model                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Non-HIPAA Tenants                       │    │
│  │  Standard isolation (RLS or schema)                  │    │
│  │  Standard encryption                                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              HIPAA Tenants (Enterprise)              │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ Enhanced Isolation                           │    │    │
│  │  │ • Database-per-tenant (recommended)          │    │    │
│  │  │ • Customer-managed encryption keys           │    │    │
│  │  │ • Dedicated audit logging                    │    │    │
│  │  │ • BAA required before onboarding             │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Breach Notification Timeline

```
Breach Discovery
    │
    ▼ (within 24 hours)
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Internal   │────▶│   Risk      │────▶│   Notify    │
│  Response   │     │ Assessment  │     │   Covered   │
│             │     │             │     │   Entity    │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                          ┌───────────────────┘
                          ▼ (Covered Entity: 60 days)
                    ┌─────────────┐
                    │   HHS       │
                    │   Report    │
                    │   (if >500) │
                    └─────────────┘
```

### PHI Data Elements

| Category | Elements | Encryption | Access |
|----------|----------|------------|--------|
| Identifiers | Name, SSN, MRN | Field-level | Minimum necessary |
| Contact | Address, phone, email | At-rest | Role-based |
| Clinical | Diagnoses, treatments | Field-level | Care team only |
| Financial | Insurance, billing | At-rest | Billing team |
| Dates | DOB, admission, discharge | At-rest | As needed |

## Configuration Schema

```yaml
hipaa_compliance:
  bam_controlled: true
  
  tenant_designation:
    hipaa_enabled: bool
    baa_signed: bool
    baa_signed_date: date
    covered_entity_name: string
    
  phi_handling:
    data_elements:
      - element: string
        classification: string
        encryption_level: enum[transport, at_rest, field_level]
        access_restriction: string
        
    minimum_necessary:
      enabled: bool
      role_mapping: object
      
  technical_safeguards:
    access_control:
      unique_user_id: bool
      automatic_logoff_minutes: int
      encryption_decryption: bool
      
    audit_controls:
      log_all_phi_access: bool
      tamper_evident: bool
      retention_years: int
      
    integrity:
      mechanism: enum[hash, digital_signature]
      verification_frequency: string
      
    transmission:
      encryption_required: bool
      minimum_tls_version: string
      
  breach_notification:
    internal_response_hours: int
    covered_entity_notify_hours: int
    hhs_threshold_records: int
    media_notify_state_threshold: int
    
  baa_management:
    template_version: string
    required_provisions: string[]
    renewal_alert_days: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Database isolation | Maximum security | High cost | Enterprise HIPAA |
| Schema isolation | Good balance | Moderate cost | Mid-market |
| Encryption focus | Lower cost | Shared infra | Startups |
| Hybrid | Flexible | Complexity | Mixed tenants |

## Quality Checks

- [ ] BAA signed before PHI access
- [ ] Minimum necessary implemented
- [ ] All PHI encrypted
- [ ] Audit logging enabled
- [ ] Breach response plan documented
- [ ] Training records maintained
- [ ] **CRITICAL:** No unauthorized PHI disclosure

## Web Research Queries

- "HIPAA SaaS multi-tenant architecture {date}"
- "PHI encryption requirements {date}"
- "HIPAA breach notification requirements {date}"
- "business associate agreement SaaS {date}"
- "HIPAA audit controls cloud {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | HIPAA compliance verified |
| QG-CC | PHI safeguards active |

## Related Patterns

- [soc2-compliance.md](soc2-compliance.md) - Overlapping controls
- [data-classification.md](data-classification.md) - PHI labeling
- [tenant-isolation.md](tenant-isolation.md) - Enhanced isolation
