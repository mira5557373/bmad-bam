# Customization - BAM Domain Context

**Loaded by:** UX architects, Platform engineers  
**Related Workflows:** bmad-bam-white-labeling

---

## Overview

Customization and white-labeling enable tenants to brand, configure, and adapt the platform to their identity. This spans visual branding, domain configuration, email templates, and feature toggles.

## Core Concepts

### Customization Dimensions

| Dimension | Components | Tier Availability |
|-----------|------------|-------------------|
| Branding | Logo, colors, fonts, CSS | Free (limited) → OEM (full) |
| Domain | Custom domain, SSL, DNS | Enterprise+ |
| Email | Templates, sender, DKIM | Pro+ |
| Features | Toggles, UI visibility, menus | Pro+ |

### Customization Architecture

```
Tenant Request
    │
    ▼
┌─────────────────┐
│ Config Resolver │ ← Tenant ID + Tier
└────────┬────────┘
         │
    ┌────┴────────────┐
    ▼                 ▼
┌───────────┐   ┌───────────┐
│ Branding  │   │ Features  │
│ Config    │   │ Config    │
└─────┬─────┘   └─────┬─────┘
      │               │
      └───────┬───────┘
              ▼
       ┌────────────┐
       │ Merged     │
       │ Response   │
       └────────────┘
```

### Tier-Based Feature Matrix

| Feature | Free | Pro | Enterprise | OEM |
|---------|------|-----|------------|-----|
| Logo upload | ✓ | ✓ | ✓ | ✓ |
| Color theme | Limited | Full | Full | Full |
| Custom fonts | - | ✓ | ✓ | ✓ |
| Custom CSS | - | - | ✓ | ✓ |
| Custom domain | - | - | ✓ | ✓ |
| Email branding | - | ✓ | ✓ | ✓ |
| Remove platform branding | - | - | ✓ | ✓ |
| Reseller dashboard | - | - | - | ✓ |

## Decision Matrix

| Requirement | Approach | Rationale |
|-------------|----------|-----------|
| Asset storage | CDN per-tenant folders | Performance + isolation |
| CSS theming | CSS variables | Runtime customization |
| Domain mapping | SNI-based routing | Multi-tenant SSL |
| Feature flags | Hierarchical overrides | Flexible control |

## Quality Checks

- [ ] Branding assets isolated per tenant
- [ ] CSS injection sanitized (no XSS)
- [ ] **CRITICAL:** Custom domains verified before activation
- [ ] Feature flags respect tier boundaries

## Web Research Queries

- "SaaS white-labeling architecture patterns {date}"
- "Multi-tenant custom domain SSL automation {date}"
- "CSS theming multi-tenant applications {date}"
