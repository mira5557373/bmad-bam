---
pattern_id: pci-dss-compliance
shortcode: ZPX
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# PCI DSS Compliance - BAM Pattern

**Loaded by:** ZPX  
**Applies to:** Payment Card Industry Data Security Standard controls  
**See also:** [soc2-compliance.md](soc2-compliance.md), [data-classification.md](data-classification.md)

---

## When to Use

- Payment processing integration
- Storing cardholder data (CHD)
- Payment page customization
- Marketplace payment flows
- Subscription billing

## When NOT to Use

- Fully delegated payments (redirect only)
- No CHD storage or transmission
- Gift card only systems
- Internal expense tools

## Architecture

### PCI DSS Requirement Domains

```
┌─────────────────────────────────────────────────────────────┐
│                    PCI DSS v4.0 Domains                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         BUILD & MAINTAIN SECURE NETWORK              │    │
│  │  Req 1: Network security controls                    │    │
│  │  Req 2: Secure configurations                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         PROTECT ACCOUNT DATA                         │    │
│  │  Req 3: Protect stored account data                  │    │
│  │  Req 4: Protect CHD during transmission              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         MAINTAIN VULNERABILITY PROGRAM               │    │
│  │  Req 5: Anti-malware solutions                       │    │
│  │  Req 6: Secure systems and software                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         STRONG ACCESS CONTROL                        │    │
│  │  Req 7: Restrict access by business need             │    │
│  │  Req 8: Identify users and authenticate              │    │
│  │  Req 9: Restrict physical access                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         MONITORING & TESTING                         │    │
│  │  Req 10: Log and monitor access                      │    │
│  │  Req 11: Test security regularly                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         INFORMATION SECURITY POLICY                  │    │
│  │  Req 12: Support information security                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Scope Reduction Architecture

```
┌─────────────────────────────────────────────────────────────┐
│               Scope Reduction Strategy                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  OPTION 1: Tokenization (Recommended)                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Customer ─► Payment Provider ─► Token ─► Your App   │    │
│  │           (CHD never touches your systems)          │    │
│  │           Scope: SAQ A or SAQ A-EP                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  OPTION 2: Redirect                                         │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Customer ─► Redirect to Provider ─► Callback        │    │
│  │           (Full delegation)                         │    │
│  │           Scope: SAQ A                              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  OPTION 3: Direct Processing (Avoid if possible)            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Customer ─► Your Server ─► Payment Provider         │    │
│  │           (CHD on your systems)                     │    │
│  │           Scope: SAQ D (full PCI)                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Multi-Tenant Payment Flow

```
Tenant Subscription
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Tenant    │────▶│   Payment   │────▶│   Provider  │
│   Portal    │     │   Form      │     │   (Stripe)  │
│   (yours)   │     │   (iframe)  │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                          │                   │
                          ▼                   ▼
                    Token returned      Payment processed
                          │
                          ▼
                    ┌──────────────┐
                    │ Store token  │
                    │ (not PAN)    │
                    └──────────────┘
```

### CHD Storage Rules

| Data Element | Can Store | Encryption | Notes |
|--------------|-----------|------------|-------|
| PAN | Yes (tokenize preferred) | Required | Last 4 OK unencrypted |
| Cardholder name | Yes | Recommended | - |
| Service code | Yes | Required | - |
| Expiration | Yes | Required | - |
| CVV/CVC | **NEVER** | N/A | Delete immediately |
| Full track data | **NEVER** | N/A | Delete immediately |
| PIN/PIN block | **NEVER** | N/A | Delete immediately |

## Configuration Schema

```yaml
pci_dss_compliance:
  bam_controlled: true
  
  scope:
    saq_type: enum[A, A-EP, D]
    payment_provider: string
    integration_type: enum[redirect, iframe, direct]
    chd_storage: bool
    
  tokenization:
    enabled: bool
    provider: string
    token_format: string
    
  network_segmentation:
    cde_isolated: bool
    firewall_rules: string[]
    
  encryption:
    transmission:
      minimum_tls: string
      cipher_suites: string[]
      
    storage:
      algorithm: string
      key_management: string
      
  access_control:
    need_to_know: bool
    unique_ids: bool
    mfa_required: bool
    
  logging:
    all_access: bool
    tamper_proof: bool
    retention_days: int
    ntp_sync: bool
    
  testing:
    asv_scan_frequency: string
    penetration_test_frequency: string
    internal_scan_frequency: string
    
  tenant_payments:
    platform_responsible: bool
    tenant_can_customize: bool
    pci_attestation_required: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full redirect | Minimum scope | Less control | Simple billing |
| Iframe/Elements | Branded, low scope | Some integration | Standard SaaS |
| Direct processing | Full control | Full PCI scope | Marketplaces |
| Hybrid | Flexible | Complex | Enterprise |

## Quality Checks

- [ ] Scope documented and minimized
- [ ] No prohibited data stored
- [ ] TLS 1.2+ enforced
- [ ] Access logging enabled
- [ ] ASV scans scheduled
- [ ] Tokenization implemented
- [ ] **CRITICAL:** CVV never stored

## Web Research Queries

- "PCI DSS v4.0 SaaS requirements {date}"
- "payment tokenization multi-tenant {date}"
- "PCI scope reduction patterns {date}"
- "Stripe Elements PCI compliance {date}"
- "PCI ASV scanning requirements {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | PCI DSS compliance verified |
| QG-CC | Payment controls active |

## Related Patterns

- [soc2-compliance.md](soc2-compliance.md) - Overlapping controls
- [data-classification.md](data-classification.md) - CHD labeling
- [zero-trust.md](zero-trust.md) - Network security
