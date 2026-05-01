---
pattern_id: regulatory-clock-engine
shortcode: ZRE
category: compliance
qg_ref: QG-P1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Regulatory Clock Engine - BAM Pattern

**Loaded by:** ZRE  
**Applies to:** AI systems operating in regulated industries with compliance deadlines  
**See also:** [compliance-reporting.md](compliance-reporting.md)

---

## When to Use

- Operating in regulated industries
- EU AI Act compliance required
- Multiple jurisdiction requirements
- Compliance deadline tracking needed

## When NOT to Use

- Unregulated domains
- Single jurisdiction
- No formal compliance requirements

## Architecture

### Regulation Tracking Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                 Regulatory Clock Engine                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                  Regulation Registry                     ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    ││
│  │  │EU AI Act│  │GDPR     │  │CCPA     │  │Custom   │    ││
│  │  │Aug 2025 │  │Ongoing  │  │Ongoing  │  │Deadline │    ││
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    ││
│  └───────┼────────────┼────────────┼────────────┼──────────┘│
│          │            │            │            │            │
│          └────────────┴────────────┴────────────┘            │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │ Deadline Engine │                        │
│                   └────────┬────────┘                        │
│                            │                                 │
│    [Warning 90d] [Warning 30d] [Critical 7d] [Overdue]      │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P3-03)

```yaml
regulatory_clock_engine:
  version: "1.0.0"
  bam_controlled: true
  
  regulations:
    - id: string
      name: string
      jurisdiction: list[string]
      effective_date: date
      requirements: list[requirement]
      
  requirement:
    id: string
    description: string
    deadline: date
    status: enum[not_started, in_progress, compliant, overdue]
    evidence_required: bool
    
  tracking:
    auto_scan: bool
    scan_interval_days: int
    
  alerts:
    warning_thresholds_days: list[int]
    critical_threshold_days: int
    notify_on_change: bool
    notification_channels: list[string]
    
  tenant_configuration:
    per_tenant_jurisdictions: bool
    tenant_overrides: bool
    
  reporting:
    generate_compliance_report: bool
    report_frequency: enum[weekly, monthly, quarterly]
    include_evidence: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual tracking | Simple | Error-prone | Small scope |
| Automated scanning | Complete | Requires maintenance | Multi-regulation |
| Third-party service | Expert updates | Cost, dependency | Enterprise |


## Quality Checks

- [ ] Compliance deadlines tracked
- [ ] Notification pipeline configured
- [ ] Audit trail complete
- [ ] Escalation paths defined
- [ ] **CRITICAL:** No missed compliance deadlines

## Web Research Queries

- "EU AI Act compliance timeline {date}"
- "regulatory compliance tracking SaaS {date}"
- "AI regulation deadline management {date}"
- "multi-jurisdiction compliance automation {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-P1 | Regulatory clock engine tracking all applicable regulations |

## Related Patterns

- [compliance-reporting.md](compliance-reporting.md) - Compliance domain context
