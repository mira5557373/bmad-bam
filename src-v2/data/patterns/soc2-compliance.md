---
pattern_id: soc2-compliance
shortcode: ZS2
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# SOC 2 Compliance - BAM Pattern

**Loaded by:** ZS2  
**Applies to:** SOC 2 Type I and Type II controls  
**See also:** [compliance-reporting.md](compliance-reporting.md), [access-reviews.md](access-reviews.md)

---

## When to Use

- B2B SaaS requiring customer trust
- Enterprise sales requirements
- Vendor due diligence responses
- Security posture baseline
- Multi-tenant data protection

## When NOT to Use

- B2C consumer applications
- Internal tools only
- Early-stage MVP
- No enterprise customers expected

## Architecture

### SOC 2 Control Framework

```
┌─────────────────────────────────────────────────────────────┐
│                  SOC 2 Trust Service Criteria                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    SECURITY (CC)                     │    │
│  │  CC1: Control Environment                            │    │
│  │  CC2: Communication and Information                  │    │
│  │  CC3: Risk Assessment                                │    │
│  │  CC4: Monitoring Activities                          │    │
│  │  CC5: Control Activities                             │    │
│  │  CC6: Logical and Physical Access                    │    │
│  │  CC7: System Operations                              │    │
│  │  CC8: Change Management                              │    │
│  │  CC9: Risk Mitigation                                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │AVAILABILITY │ │CONFIDENTIAL │ │ PROCESSING  │           │
│  │    (A)      │ │    (C)      │ │ INTEGRITY   │           │
│  │  A1: Ops    │ │  C1: Info   │ │ PI1: Quality│           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    PRIVACY (P)                       │    │
│  │  P1-P8: Notice, Choice, Access, etc.                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Multi-Tenant Control Mapping

```
┌─────────────────────────────────────────────────────────────┐
│                Control Implementation Matrix                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Control  │ Platform │ Per-Tenant │ Evidence         │    │
│  │ CC6.1    │ SSO      │ IdP config │ Access logs      │    │
│  │ CC6.2    │ RLS      │ Isolation  │ Config audit     │    │
│  │ CC6.6    │ Encrypt  │ Key mgmt   │ Key rotation log │    │
│  │ CC7.1    │ Monitor  │ Alerts     │ Incident tickets │    │
│  │ A1.2     │ HA arch  │ SLA config │ Uptime metrics   │    │
│  │ C1.1     │ DLP      │ Data class │ Classification   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Audit Timeline

```
Type I                           Type II
  │                                │
  ▼                                ▼
┌─────────────┐               ┌─────────────┐
│ Point-in-   │               │ 6-12 month  │
│ time design │               │ operating   │
│ assessment  │               │ effectiveness│
└─────────────┘               └─────────────┘
     │                              │
     ▼                              ▼
 3-6 months                    Ongoing annual
 to complete                   recertification
```

### Key Control Categories

| Category | Control | BAM Implementation | Evidence |
|----------|---------|-------------------|----------|
| Access | CC6.1 | SSO + MFA | Auth logs |
| Access | CC6.2 | RLS + tenant isolation | DB policies |
| Encryption | CC6.6 | AES-256 at rest | Config snapshots |
| Monitoring | CC7.1 | SIEM + alerts | Alert history |
| Change | CC8.1 | CI/CD + approvals | Deploy logs |
| Availability | A1.2 | Multi-AZ + DR | Uptime metrics |

## Configuration Schema

```yaml
soc2_compliance:
  bam_controlled: true
  
  scope:
    trust_services:
      - security: true
      - availability: bool
      - confidentiality: bool
      - processing_integrity: bool
      - privacy: bool
      
    systems_in_scope: string[]
    
  controls:
    - control_id: string
      description: string
      implementation: string
      evidence_sources: string[]
      testing_frequency: enum[continuous, quarterly, annual]
      owner: string
      
  evidence:
    automated_collection:
      - source: string
        control_ids: string[]
        collection_frequency: cron
        retention_days: int
        
    manual_collection:
      - source: string
        control_ids: string[]
        due_frequency: string
        owner: string
        
  monitoring:
    continuous_controls:
      - control_id: string
        metric: string
        threshold: object
        alert_on_breach: bool
        
  audit_support:
    sample_generation: bool
    evidence_packaging: bool
    auditor_portal: bool
    
  tenant_specific:
    soc2_report_sharing: bool
    bridge_letter_generation: bool
    custom_questionnaire_support: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Type I only | Fast, cheaper | Point-in-time | New products |
| Type II | Gold standard | 6+ months, costly | Enterprise sales |
| Continuous | Always audit-ready | Tool investment | Mature orgs |
| Framework mapping | Multi-compliance | Complexity | Multiple certs |

## Quality Checks

- [ ] All CC controls documented
- [ ] Evidence collection automated
- [ ] Access reviews scheduled
- [ ] Change management enforced
- [ ] Monitoring active
- [ ] Tenant isolation verified
- [ ] **CRITICAL:** No control gaps in scope

## Web Research Queries

- "SOC 2 Type II multi-tenant SaaS {date}"
- "SOC 2 evidence automation {date}"
- "continuous compliance monitoring SOC 2 {date}"
- "SOC 2 auditor selection criteria {date}"
- "SOC 2 common criteria updates {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | SOC 2 compliance verified |
| QG-CC | Control monitoring active |

## Related Patterns

- [compliance-reporting.md](compliance-reporting.md) - Report generation
- [access-reviews.md](access-reviews.md) - CC6.2 evidence
- [vendor-management.md](vendor-management.md) - Third-party controls
