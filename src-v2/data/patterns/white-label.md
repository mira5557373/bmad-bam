---
pattern_id: white-label
shortcode: ZWL
category: platform
qg_ref: QG-PL3
version: 1.0.0
last_reviewed: 2026-04-30
---

# White-Label - BAM Pattern

**Loaded by:** ZWL  
**Applies to:** Multi-tenant SaaS platforms enabling brand customization for resellers

---

## When to Use

- Enabling partners to sell under their own brand
- Enterprise customers requiring brand consistency
- B2B2B distribution model
- Agency/consultant reseller programs
- Regional market localization
- Franchise-like SaaS distribution

## When NOT to Use

- Direct-to-consumer only products
- Strong platform brand identity required
- Simple single-brand deployment
- When customization complexity exceeds value
- Early-stage MVP

## Architecture

### White-Label Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATFORM CORE                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Shared Business Logic                     │  │
│  │              (Multi-tenant Foundation)                 │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌─────────────────────────┼─────────────────────────────┐  │
│  │            CUSTOMIZATION LAYER                         │  │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐         │  │
│  │  │ Branding  │  │ Features  │  │ Domain    │         │  │
│  │  │ Config    │  │ Toggles   │  │ Routing   │         │  │
│  │  └───────────┘  └───────────┘  └───────────┘         │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌─────────────────────────┼─────────────────────────────┐  │
│  │            TENANT PRESENTATION                         │  │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐         │  │
│  │  │Partner A  │  │Partner B  │  │Partner C  │         │  │
│  │  │ Branding  │  │ Branding  │  │ Branding  │         │  │
│  │  └───────────┘  └───────────┘  └───────────┘         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Customization Tiers

| Tier | Branding | Domain | Features | Support |
|------|----------|--------|----------|---------|
| Basic | Logo + colors | Subdomain | Standard | Platform |
| Pro | Full UI theme | Custom domain | Select features | Platform |
| Enterprise | Complete rebrand | Multi-domain | Custom features | Partner |
| Full White-label | No platform mention | Full DNS control | Full control | Partner |

### Brand Configuration Flow

```
Partner Setup
      │
      ▼
┌─────────────────┐
│ Branding Config │
│ - Logo          │
│ - Colors        │
│ - Fonts         │
│ - Email templates│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Domain Config   │
│ - Custom domain │
│ - SSL cert      │
│ - DNS routing   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Feature Config  │
│ - Enabled features│
│ - Custom limits │
│ - Pricing       │
└────────┬────────┘
         │
         ▼
    Partner Live
```

### Configuration Schema

```yaml
white_label:
  partner_id: uuid
  tenant_type: reseller
  bam_controlled: true
  
  branding:
    logo_url: string
    favicon_url: string
    primary_color: string  # hex
    secondary_color: string
    font_family: string
    custom_css_url: string
    
  domain:
    custom_domain: string  # e.g., "app.partner.com"
    ssl_certificate: enum[managed, custom]
    redirect_www: bool
    
  email:
    from_domain: string
    from_name: string
    reply_to: string
    templates:
      - template_id: string
        custom_content: string
        
  feature_gates:
    enabled_features: string[]
    disabled_features: string[]
    custom_limits:
      - feature: string
        limit: int
        
  support:
    support_email: string
    documentation_url: string
    help_widget_enabled: bool
    platform_branding_in_support: bool
    
  legal:
    terms_url: string
    privacy_url: string
    cookie_policy_url: string
    platform_attribution_required: bool
```

### Multi-Domain Routing

```
┌─────────────────────────────────────────────────────────────┐
│                   DOMAIN ROUTING                             │
│                                                              │
│  Incoming Request                                            │
│        │                                                     │
│        ▼                                                     │
│  ┌─────────────────┐                                        │
│  │ Domain Lookup   │ ← Map domain to partner_id             │
│  └────────┬────────┘                                        │
│           │                                                  │
│     ┌─────┴─────┬─────────────┐                            │
│     ▼           ▼             ▼                            │
│  app.platformco.com    app.partner1.com    whitelabel.io   │
│  (platform default)    (Partner 1)         (Partner 2)     │
│        │                    │                   │           │
│        ▼                    ▼                   ▼           │
│  ┌─────────┐          ┌─────────┐         ┌─────────┐      │
│  │Platform │          │Partner 1│         │Partner 2│      │
│  │Branding │          │Branding │         │Branding │      │
│  └─────────┘          └─────────┘         └─────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Sub-tenant Hierarchy

```
Platform (Super Admin)
      │
      ├── Partner A (white_label: true)
      │       │
      │       ├── Customer A1 (sub-tenant)
      │       ├── Customer A2 (sub-tenant)
      │       └── Customer A3 (sub-tenant)
      │
      ├── Partner B (white_label: true)
      │       │
      │       ├── Customer B1 (sub-tenant)
      │       └── Customer B2 (sub-tenant)
      │
      └── Direct Customers (white_label: false)
              │
              ├── Customer C1
              └── Customer C2
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| CSS-only theming | Simple, fast | Limited customization | Basic white-label |
| Full brand config | High customization | Complexity | Enterprise partners |
| Separate deployments | Complete isolation | Maintenance overhead | Regulatory requirements |
| Component library | Consistency + flex | Development investment | Long-term scale |

## Quality Checks

- [ ] Partner branding isolated from platform
- [ ] Custom domains with valid SSL
- [ ] Email sender reputation maintained
- [ ] Sub-tenant data isolation
- [ ] **CRITICAL:** No cross-partner data or brand leakage

## Web Research Queries

- "white-label SaaS architecture {date}"
- "multi-tenant custom domain routing {date}"
- "reseller program implementation {date}"
- "white-label email configuration {date}"
- "B2B2B SaaS model patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-PL3 | Pattern implementation verified |

## Related Patterns

- [reseller-model.md](reseller-model.md) - Partner programs
- [tenant-isolation.md](tenant-isolation.md) - Sub-tenant isolation
