# Platform - BAM Domain Context

**Loaded by:** ZPS, ZPF, ZWL, ZRM, ZAI, ZPA, ZPG  
**Related Workflows:** bmad-bam-marketplace-design, bmad-bam-partner-integration

---

## Overview

Platform patterns for multi-tenant SaaS encompass business model implementation including pricing strategies, marketplace fee structures, white-labeling, reseller models, and partner API management that enable platform ecosystem growth.

## Core Concepts

### Platform Business Models

| Model | Revenue Source | Tenant Type | Complexity |
|-------|---------------|-------------|------------|
| Direct SaaS | Subscriptions | End customers | Low |
| Marketplace | Transaction fees | Buyers + Sellers | Medium |
| White-label | License fees | Resellers | Medium |
| Partner/Reseller | Revenue share | Partners | High |
| API Platform | Usage fees | Developers | High |

### Platform Ecosystem

```
┌─────────────────────────────────────────────────────────────┐
│                     Platform Core                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Multi-tenant Foundation                 │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐         │    │
│  │  │ Direct    │ │Marketplace│ │White-label│         │    │
│  │  │ Customers │ │ Vendors   │ │ Resellers │         │    │
│  │  └───────────┘ └───────────┘ └───────────┘         │    │
│  │       │              │              │               │    │
│  │       └──────────────┴──────────────┘               │    │
│  │                      │                              │    │
│  │              ┌───────▼───────┐                      │    │
│  │              │  Partner APIs  │                     │    │
│  │              └───────────────┘                      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Revenue Attribution

| Channel | Attribution | Fee Model |
|---------|-------------|-----------|
| Direct | 100% platform | Subscription |
| Marketplace | Split (platform % + vendor %) | Transaction fee |
| White-label | License fee | Flat + usage |
| Reseller | Revenue share | % of customer spend |
| API | 100% platform | Per-call or tier |

### Tenant Hierarchy

```
Platform Owner (Super Admin)
      │
      ├── Direct Tenants (Type: direct)
      │
      ├── Marketplace Vendors (Type: vendor)
      │       │
      │       └── Vendor Customers (Sub-tenants)
      │
      ├── White-label Partners (Type: reseller)
      │       │
      │       └── Reseller Customers (Sub-tenants)
      │
      └── API Partners (Type: api_consumer)
```

## Decision Matrix

| Scenario | Model | Implementation Priority |
|----------|-------|------------------------|
| B2B SaaS startup | Direct | MVP focus |
| Two-sided marketplace | Marketplace | Vendor onboarding |
| Enterprise expansion | White-label | Brand customization |
| Channel growth | Reseller | Partner portal |
| Developer ecosystem | API Platform | Documentation + SDKs |

## Quality Checks

- [ ] Revenue attribution tracks all channels
- [ ] Partner fee structures are configurable
- [ ] White-label customization respects tenant boundaries
- [ ] **CRITICAL:** Sub-tenant isolation maintained for resellers
- [ ] API rate limiting per partner tier

## Web Research Queries

- "SaaS platform business models {date}"
- "marketplace fee structure design {date}"
- "white-label SaaS architecture {date}"
- "partner API management patterns {date}"

## Related Patterns

**Platform:**
- `{project-root}/_bmad/bam/data/patterns/pricing-strategies.md` - SaaS pricing models
- `{project-root}/_bmad/bam/data/patterns/platform-fees.md` - Marketplace fee structures
- `{project-root}/_bmad/bam/data/patterns/white-label.md` - White-labeling patterns
- `{project-root}/_bmad/bam/data/patterns/reseller-model.md` - Reseller/partner patterns
- `{project-root}/_bmad/bam/data/patterns/api-integration.md` - API integration patterns
- `{project-root}/_bmad/bam/data/patterns/partner-apis.md` - Partner API management
- `{project-root}/_bmad/bam/data/patterns/plugin-architecture.md` - Extensibility and plugin marketplace

### Web Research

- "SaaS pricing strategy optimization {date}"
- "reseller partner program design {date}"
- "API monetization patterns {date}"
