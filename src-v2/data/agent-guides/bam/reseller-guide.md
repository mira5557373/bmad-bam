# BAM Reseller Guide

**When to load:** During partner program design, white-label implementation, or reseller management tasks. Load when user mentions resellers, partners, white-label, ISV, or marketplace.

**Integrates with:** bmad-agent-pm (Product Management), bmad-agent-ux-designer (Partner Portal UX)

---

## Core Concepts

### Reseller Architecture

Multi-tenant reseller support enables partners to onboard and manage their own customers while leveraging your platform infrastructure. This model accelerates market reach and creates a scalable partner ecosystem. Key architectural components include:

- **Tenant Hierarchy**: Reseller → Sub-tenants relationship with clear permission boundaries. Resellers manage their customers while platform administrators maintain system-wide control.
- **White-Label**: Custom branding per reseller including domain, visual identity, and communication templates. Degree of customization often varies by partner tier.
- **Revenue Sharing**: Commission and payout management with transparent tracking. Support for various commission models (percentage, flat fee, tiered) and payout schedules.
- **Permission Delegation**: Reseller admin capabilities allowing partners to self-serve customer management while respecting platform security policies.

### Partner Program Tiers

Structure partner tiers to incentivize growth while managing support costs:

```
REGISTERED → SILVER → GOLD → PLATINUM
    ↓          ↓        ↓        ↓
  Basic     Standard  Premium  Enterprise
  10%        20%       30%       40%
```

| Tier | Requirements | Benefits |
|------|--------------|----------|
| Registered | Basic agreement | Access to resale |
| Silver | 5+ customers, certification | Marketing support, co-selling |
| Gold | 20+ customers, dedicated contact | Lead sharing, priority support |
| Platinum | Enterprise commitment | Custom terms, strategic planning |

### White-Label Layers

Implement white-labeling across multiple customization layers, with depth varying by tier:

1. **Domain/Subdomain**: Custom URLs (partner.yourplatform.com or partner's own domain)
2. **Branding**: Logo, colors, favicon, login screens
3. **Email Templates**: Custom sender address, branded templates
4. **Feature Flags**: Reseller-specific features and tier gating
5. **Documentation**: Branded help docs and knowledge base

### Revenue and Billing Models

Support flexible revenue arrangements:

| Model | Description | Best For |
|-------|-------------|----------|
| Referral Fee | One-time payment per customer | Lead generation partners |
| Revenue Share | Percentage of recurring revenue | Resellers |
| Wholesale | Discounted pricing, reseller sets final price | Full white-label |
| Hybrid | Base plus commission | Strategic partnerships |

## Application Guidelines

When designing reseller systems:

1. **Plan Hierarchy Depth Limits**: Define maximum tenant hierarchy depth (typically 2-3 levels). Each level adds complexity to permission calculations and query performance.

2. **Implement Permission Inheritance Carefully**: Decide whether permissions cascade down the hierarchy or are independently assigned. Document the model clearly for partner training.

3. **Design Billing Rollup**: Determine how billing aggregates: individual invoices per sub-tenant, consolidated reseller invoices, or hybrid approaches. Plan for disputes and credits.

4. **Consider Data Residency**: Sub-tenants may have different data residency requirements. Design infrastructure to support geographic distribution when needed.

5. **Build Reseller-Specific Reporting**: Partners need visibility into their business: customer count, revenue, usage trends. Provide dashboards and export capabilities.

## Decision Framework

| Scenario | Recommendation | Rationale |
|----------|---------------|-----------|
| Simple reselling | Revenue share only | Lower complexity, faster launch |
| Full white-label | Dedicated infrastructure | Complete isolation, premium tier |
| Marketplace | App store model | Ecosystem growth, self-service |
| ISV partners | API-first | Integration focus, technical partners |
| Geographic expansion | Local resellers | Market knowledge, compliance |

## Related Workflows

- `bmad-bam-tenant-hierarchy-design` - Hierarchy setup
- `bmad-bam-tenant-portal-design` - Portal design
- `bmad-bam-marketplace-design` - Marketplace
- `bmad-bam-partner-integration-framework` - Partner APIs

## Related Patterns

Load decision criteria from pattern registry:

- **Customization patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `customization`
- **Hierarchy patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `tenant-isolation`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "SaaS partner program design {date}"
- Search: "white-label architecture {date}"
- Search: "reseller management platform {date}"
