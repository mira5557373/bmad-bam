---
pattern_id: data-residency
shortcode: ZDY
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Data Residency - BAM Pattern

**Loaded by:** ZDY  
**Applies to:** Data location and sovereignty requirements  
**See also:** [gdpr-compliance.md](gdpr-compliance.md), [tenant-isolation.md](tenant-isolation.md)

---

## When to Use

- Tenants with geographic data requirements
- GDPR, CCPA, or other regional compliance
- Government or public sector customers
- Data sovereignty requirements
- Cross-border transfer restrictions

## When NOT to Use

- Global tenants without location requirements
- Internal tools with no compliance mandates
- Development/testing environments
- Data already anonymized

## Architecture

### Multi-Region Deployment Model

```
┌─────────────────────────────────────────────────────────────┐
│                    Global Control Plane                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Tenant Registry │ Region Router │ Compliance Engine  │  │
│  └───────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Data Planes (Regional)                    │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   EU-West   │  │   US-East   │  │   AP-South  │         │
│  │  (Ireland)  │  │  (Virginia) │  │  (Mumbai)   │         │
│  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │         │
│  │ │Tenant A │ │  │ │Tenant C │ │  │ │Tenant E │ │         │
│  │ │Tenant B │ │  │ │Tenant D │ │  │ │Tenant F │ │         │
│  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │         │
│  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │         │
│  │ │Database │ │  │ │Database │ │  │ │Database │ │         │
│  │ │ Storage │ │  │ │ Storage │ │  │ │ Storage │ │         │
│  │ │ Cache   │ │  │ │ Cache   │ │  │ │ Cache   │ │         │
│  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Data Routing Flow

```
Request with tenant_id
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Lookup    │────▶│   Validate  │────▶│   Route to  │
│   Region    │     │   Residency │     │   Region    │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
              ┌───────────┴───────────┐
           VALID                   INVALID
              │                       │
              ▼                       ▼
        ┌──────────┐           ┌──────────┐
        │ Process  │           │  Block   │
        │ in Region│           │ + Alert  │
        └──────────┘           └──────────┘
```

### Residency Classification

| Data Type | Residency Level | Cross-Border | Encryption |
|-----------|----------------|--------------|------------|
| PII | Strict | Blocked | Required |
| Usage data | Flexible | SCCs | Recommended |
| Aggregated | Global | Allowed | Optional |
| Metadata | Global | Allowed | Optional |

## Configuration Schema

```yaml
data_residency:
  bam_controlled: true
  
  tenant_assignment:
    tenant_id: uuid
    primary_region: string
    backup_region: string
    residency_level: enum[strict, flexible, global]
    
  region_config:
    - region_code: string
      location: string
      data_center_provider: string
      compliance_certifications: string[]
      available_for_tiers: string[]
      
  cross_border_rules:
    default_action: enum[allow, block, scc]
    allowed_transfers:
      - source_region: string
        dest_region: string
        legal_basis: string
        documentation_required: bool
        
  data_classification:
    - data_type: string
      residency_level: enum[strict, flexible, global]
      encryption_required: bool
      retention_override: string
      
  monitoring:
    log_cross_border: bool
    alert_on_violation: bool
    audit_retention_days: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full isolation | Maximum compliance | High cost, latency | Enterprise |
| Regional routing | Balanced | Moderate complexity | Pro tier |
| Global with SCCs | Cost-effective | Legal complexity | Standard |
| Hybrid | Flexible | Management overhead | Mixed tenants |

## Quality Checks

- [ ] Primary region assigned to all tenants
- [ ] Cross-border transfers documented
- [ ] Legal basis for each transfer type
- [ ] Encryption in transit cross-region
- [ ] Backup region meets residency requirements
- [ ] Metadata not leaking to wrong regions
- [ ] **CRITICAL:** No PII outside designated region

## Web Research Queries

- "data residency SaaS architecture patterns {date}"
- "multi-region data sovereignty compliance {date}"
- "GDPR data localization implementation {date}"
- "cross-border data transfer legal basis {date}"
- "cloud data residency best practices {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Data residency compliance verified |
| QG-CC | Continuous compliance monitoring |

## Related Patterns

- [gdpr-compliance.md](gdpr-compliance.md) - GDPR implementation
- [tenant-isolation.md](tenant-isolation.md) - Data separation
- [disaster-recovery.md](disaster-recovery.md) - Cross-region backup
