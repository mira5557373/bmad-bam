---
pattern_id: vendor-management
shortcode: ZVM
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Vendor Management - BAM Pattern

**Loaded by:** ZVM  
**Applies to:** Third-party risk and vendor compliance  
**See also:** [soc2-compliance.md](soc2-compliance.md), [privacy-by-design.md](privacy-by-design.md)

---

## When to Use

- Third-party SaaS integrations
- Cloud infrastructure providers
- AI/LLM API providers
- Payment processors
- Data processing sub-processors

## When NOT to Use

- First-party services only
- Open-source self-hosted tools
- Internal development tools
- Non-production environments

## Architecture

### Vendor Risk Management Platform

```
┌─────────────────────────────────────────────────────────────┐
│                 Vendor Management Platform                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Vendor Registry                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Vendor      │ Tier  │ Data Access │ Risk Score │  │  │
│  │  │ AWS         │ Infra │ All data    │ Low        │  │  │
│  │  │ OpenAI      │ AI    │ Prompts     │ Medium     │  │  │
│  │  │ Stripe      │ Pay   │ Payment     │ Low        │  │  │
│  │  │ Analytics X │ Tool  │ Usage data  │ High       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Risk Assessment                          │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Category        │ Weight │ Score │ Threshold   │  │  │
│  │  │ Security        │ 30%    │ 85    │ 70          │  │  │
│  │  │ Compliance      │ 25%    │ 90    │ 80          │  │  │
│  │  │ Business        │ 20%    │ 75    │ 60          │  │  │
│  │  │ Technical       │ 15%    │ 80    │ 70          │  │  │
│  │  │ Financial       │ 10%    │ 95    │ 50          │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Continuous Monitoring                    │  │
│  │  • Compliance certificate tracking                     │  │
│  │  • Security incident alerts                            │  │
│  │  • Contract renewal reminders                          │  │
│  │  • Risk score recalculation                            │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Vendor Onboarding Flow

```
Vendor Request
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Initial   │────▶│   Risk      │────▶│   Security  │
│   Screening │     │   Classify  │     │   Review    │
└─────────────┘     └─────────────┘     └─────────────┘
                          │                    │
              ┌───────────┴───────────┐       │
           Low Risk              High Risk     │
              │                       │        │
              ▼                       ▼        ▼
        ┌──────────┐           ┌──────────┐
        │  Fast    │           │   Full   │
        │  Track   │           │  Review  │
        └──────────┘           └──────────┘
                                    │
                                    ▼
                            ┌──────────────┐
                            │  DPO / Legal │
                            │   Approval   │
                            └──────────────┘
```

### Vendor Classification

| Tier | Data Access | Review Depth | Frequency |
|------|-------------|--------------|-----------|
| Critical | PII/Sensitive | Full | Quarterly |
| High | Business data | Standard | Semi-annual |
| Medium | Metadata only | Streamlined | Annual |
| Low | No data | Self-attest | Biennial |

## Configuration Schema

```yaml
vendor_management:
  bam_controlled: true
  
  registry:
    vendor:
      name: string
      vendor_id: uuid
      tier: enum[critical, high, medium, low]
      status: enum[active, under_review, suspended, terminated]
      
      data_access:
        categories: string[]
        tenant_data: bool
        pii: bool
        
      compliance:
        soc2: bool
        iso27001: bool
        gdpr_dpa: bool
        hipaa_baa: bool
        
      contracts:
        start_date: date
        end_date: date
        auto_renew: bool
        
  risk_assessment:
    categories:
      - name: string
        weight: float
        questions: string[]
        threshold: int
        
    scoring:
      method: enum[weighted, max_of]
      risk_levels:
        low: int
        medium: int
        high: int
        
  monitoring:
    certificate_tracking:
      enabled: bool
      expiry_alert_days: int
      
    incident_alerts:
      enabled: bool
      sources: string[]
      
    contract_renewals:
      alert_days_before: int
      
  onboarding:
    fast_track_threshold: float
    required_documents: string[]
    approval_chain: string[]
    
  offboarding:
    data_deletion_verification: bool
    access_revocation: bool
    certificate_return: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual review | Thorough | Slow | High-risk vendors |
| Automated scoring | Fast, consistent | May miss nuance | Volume |
| Continuous monitoring | Real-time | Cost | Critical vendors |
| Risk-based tiering | Efficient | Classification effort | Mixed portfolio |

## Quality Checks

- [ ] All vendors registered
- [ ] Risk scores current
- [ ] Compliance certs tracked
- [ ] Contracts documented
- [ ] Offboarding process defined
- [ ] Monitoring enabled
- [ ] **CRITICAL:** PII vendors have DPA

## Web Research Queries

- "third-party risk management SaaS {date}"
- "vendor security assessment automation {date}"
- "GDPR sub-processor management {date}"
- "AI vendor compliance requirements {date}"
- "vendor risk scoring methodologies {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Vendor management compliance verified |
| QG-CC | Vendor monitoring active |

## Related Patterns

- [soc2-compliance.md](soc2-compliance.md) - SOC 2 controls
- [privacy-by-design.md](privacy-by-design.md) - Privacy requirements
- [gdpr-compliance.md](gdpr-compliance.md) - GDPR compliance
