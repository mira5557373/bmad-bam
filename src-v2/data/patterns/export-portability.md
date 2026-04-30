---
pattern_id: export-portability
shortcode: ZEP
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Export Portability - BAM Pattern

**Loaded by:** ZEP  
**Applies to:** Data portability and export automation  
**See also:** [gdpr-compliance.md](gdpr-compliance.md), [right-to-deletion.md](right-to-deletion.md)

---

## When to Use

- GDPR Article 20 data portability
- Tenant offboarding data export
- User data download requests
- Migration to competing service
- Regulatory audit requirements

## When NOT to Use

- Real-time data streaming
- Derived/aggregated data only
- Third-party data without rights
- Export would breach other users' privacy

## Architecture

### Export Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Export Service                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Request Handler                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ export_id │ user_id │ tenant_id │ format │ status│  │  │
│  │  │ exp_001   │ user_a  │ tenant_x  │ json   │ queue │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │                Data Aggregator                         │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Source         │ Records │ Size    │ Status    │  │  │
│  │  │ Profile        │ 1       │ 2 KB    │ collected │  │  │
│  │  │ Documents      │ 156     │ 45 MB   │ collected │  │  │
│  │  │ Messages       │ 2,341   │ 12 MB   │ collecting│  │  │
│  │  │ Activity       │ 15,678  │ 8 MB    │ pending   │  │  │
│  │  │ AI Sessions    │ 234     │ 3 MB    │ pending   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Format Transformer                       │  │
│  │  • JSON (machine-readable)                             │  │
│  │  • CSV (spreadsheet-compatible)                        │  │
│  │  • XML (legacy systems)                                │  │
│  │  • ZIP (bundled with manifest)                         │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Secure Delivery                          │  │
│  │  • Encrypted at rest                                   │  │
│  │  • Time-limited download link                          │  │
│  │  • Download verification                               │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Export Flow

```
Export Request
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Verify    │────▶│   Collect   │────▶│  Transform  │
│   Identity  │     │   Data      │     │   Format    │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                    ┌─────────────────────────┘
                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Package   │────▶│   Encrypt   │────▶│   Notify    │
│   Archive   │     │   Store     │     │   User      │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Data Categories

| Category | Included | Format | Notes |
|----------|----------|--------|-------|
| Profile | Yes | JSON | User provided |
| Documents | Yes | Original | User uploaded |
| Messages | Yes | JSON | Sent by user |
| Activity | Optional | JSON | Derived |
| AI Sessions | Yes | JSON | User interactions |
| System metadata | No | - | Platform internal |

## Configuration Schema

```yaml
export_portability:
  bam_controlled: true
  
  request_handling:
    max_concurrent_exports: int
    queue_priority: enum[fifo, tenant_tier]
    timeout_hours: int
    
  data_sources:
    - name: string
      table: string
      columns: string[]
      include_by_default: bool
      user_selectable: bool
      
  formats:
    supported: enum[json, csv, xml]
    default: string
    include_schema: bool
    include_manifest: bool
    
  packaging:
    compression: enum[zip, gzip, none]
    split_size_mb: int
    include_readme: bool
    
  encryption:
    at_rest: bool
    algorithm: string
    user_password_option: bool
    
  delivery:
    download_link_expiry_hours: int
    max_downloads: int
    notification_channels: string[]
    
  compliance:
    gdpr_article_20: bool
    ccpa_disclosure: bool
    timeline_days: int
    
  audit:
    log_requests: bool
    log_downloads: bool
    retention_days: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| On-demand | Fresh data | Wait time | Small exports |
| Scheduled | Predictable | Stale data | Large tenants |
| Streaming | Real-time | Complex | API integration |
| Pre-generated | Fast download | Storage cost | Frequent exports |

## Quality Checks

- [ ] All user-provided data included
- [ ] Format is machine-readable
- [ ] Download link encrypted
- [ ] Identity verification required
- [ ] Export audit trail complete
- [ ] No other users' data included
- [ ] **CRITICAL:** Timeline compliance (30 days GDPR)

## Web Research Queries

- "GDPR data portability implementation {date}"
- "data export SaaS architecture {date}"
- "machine-readable format requirements {date}"
- "secure data download patterns {date}"
- "tenant data export automation {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Export portability compliance verified |
| QG-CC | Timeline tracking active |

## Related Patterns

- [gdpr-compliance.md](gdpr-compliance.md) - GDPR implementation
- [right-to-deletion.md](right-to-deletion.md) - Erasure handling
- [data-retention.md](data-retention.md) - Data lifecycle
