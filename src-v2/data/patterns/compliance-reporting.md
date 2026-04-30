---
pattern_id: compliance-reporting
shortcode: ZCR
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Compliance Reporting - BAM Pattern

**Loaded by:** ZCR  
**Applies to:** Automated compliance report generation  
**See also:** [soc2-compliance.md](soc2-compliance.md), [access-reviews.md](access-reviews.md)

---

## When to Use

- SOC 2 Type II audit preparation
- GDPR/CCPA compliance dashboards
- Executive compliance summaries
- Regulatory audit responses
- Customer compliance questionnaires

## When NOT to Use

- Real-time security alerts (use monitoring)
- Incident response (use incident management)
- Operational dashboards (use observability)
- Ad-hoc data queries (use analytics)

## Architecture

### Compliance Reporting Platform

```
┌─────────────────────────────────────────────────────────────┐
│                  Compliance Reporting Engine                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                Evidence Collection                     │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Source           │ Type        │ Frequency     │  │  │
│  │  │ Access logs      │ Automated   │ Continuous    │  │  │
│  │  │ Config snapshots │ Automated   │ Daily         │  │  │
│  │  │ Vuln scans       │ Automated   │ Weekly        │  │  │
│  │  │ Policy reviews   │ Manual      │ Quarterly     │  │  │
│  │  │ Training records │ Semi-auto   │ On-event      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Control Mapping                          │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Control   │ SOC2 │ GDPR │ HIPAA │ Status       │  │  │
│  │  │ Access    │ CC6.1│ A.32 │ 164.312│ Compliant   │  │  │
│  │  │ Encrypt   │ CC6.7│ A.32 │ 164.312│ Compliant   │  │  │
│  │  │ Backup    │ A1.2 │ -    │ 164.308│ Gap         │  │  │
│  │  │ Logging   │ CC7.2│ A.30 │ 164.312│ Compliant   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Report Generation                        │  │
│  │  • Executive Summary                                   │  │
│  │  • Detailed Control Matrix                             │  │
│  │  • Evidence Package                                    │  │
│  │  • Gap Analysis                                        │  │
│  │  • Remediation Roadmap                                 │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Reporting Flow

```
Schedule/Request
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Collect   │────▶│    Map      │────▶│  Generate   │
│   Evidence  │     │   Controls  │     │   Report    │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                    ┌─────────────────────────┘
                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Review    │────▶│   Approve   │────▶│  Distribute │
│   Draft     │     │   Final     │     │   Report    │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Report Types

| Report | Audience | Frequency | Format |
|--------|----------|-----------|--------|
| Executive Summary | Leadership | Monthly | PDF |
| Control Matrix | Auditors | On-demand | Excel |
| Evidence Package | External audit | Annual | ZIP |
| Gap Analysis | Compliance team | Quarterly | PDF |
| Tenant Report | Customers | On-request | PDF |

## Configuration Schema

```yaml
compliance_reporting:
  bam_controlled: true
  
  evidence_sources:
    - name: string
      type: enum[automated, semi_automated, manual]
      system: string
      collection_method: enum[api, query, upload]
      frequency: cron
      
  frameworks:
    - name: string
      version: string
      controls:
        - control_id: string
          description: string
          evidence_sources: string[]
          testing_frequency: string
          
  reports:
    - name: string
      template: string
      frameworks: string[]
      schedule: cron
      recipients: string[]
      format: enum[pdf, excel, html]
      
  tenant_reports:
    enabled: bool
    available_reports: string[]
    self_service: bool
    approval_required: bool
    
  gap_tracking:
    enabled: bool
    severity_levels: string[]
    escalation_days: int
    
  audit:
    log_generation: bool
    log_access: bool
    retention_days: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Fully automated | Consistent, fast | May miss nuance | Mature orgs |
| Manual review | Thorough | Slow, expensive | New compliance |
| Hybrid | Balanced | Complex workflow | Most cases |
| Real-time | Always current | Performance impact | Critical systems |

## Quality Checks

- [ ] All frameworks mapped to controls
- [ ] Evidence sources connected
- [ ] Report templates validated
- [ ] Distribution lists current
- [ ] Gap tracking enabled
- [ ] Tenant reports available
- [ ] **CRITICAL:** Audit trail complete

## Web Research Queries

- "SOC 2 evidence collection automation {date}"
- "compliance reporting platform patterns {date}"
- "GRC integration SaaS {date}"
- "automated compliance evidence {date}"
- "multi-framework compliance mapping {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Compliance reporting capability verified |
| QG-CC | Report generation tested |

## Related Patterns

- [soc2-compliance.md](soc2-compliance.md) - SOC 2 controls
- [access-reviews.md](access-reviews.md) - Access certification
- [gdpr-compliance.md](gdpr-compliance.md) - GDPR requirements
