# BAM Partner Ecosystem Patterns Guide

**When to load:** During partner program design, marketplace architecture, integration partner management, or when implementing partner ecosystems for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), Chad (PM), Business Development, reseller-bam extension.

---

## Core Concepts

### Partner Types

| Partner Type | Relationship | Revenue Model |
|--------------|--------------|---------------|
| Integration Partner | Build integrations | Rev share on app store |
| Referral Partner | Refer customers | Referral fee |
| Reseller Partner | Sell your product | Reseller margin |
| Technology Partner | Platform integration | Strategic/no fee |
| Implementation Partner | Deploy for customers | Service fees |

### Partner Hierarchy

```
┌─────────────────────────────────────────────────┐
│           Partner Ecosystem Hierarchy            │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           Platform Operator               │   │
│  │  (You - the SaaS provider)                │   │
│  └────────────────────┬─────────────────────┘   │
│                       │                          │
│     ┌─────────────────┼─────────────────┐       │
│     │                 │                 │       │
│  ┌──▼───┐         ┌───▼──┐         ┌───▼──┐    │
│  │Partner│         │Partner│         │Partner│   │
│  │Tier 1 │         │Tier 2 │         │Tier 3 │   │
│  │(Elite)│         │(Gold) │         │(Silver)│  │
│  └──┬────┘         └───┬──┘         └───┬──┘    │
│     │                  │                │       │
│     └──────────────────┴────────────────┘       │
│                        │                        │
│              ┌─────────▼─────────┐              │
│              │   End Customers   │              │
│              │   (Tenants)       │              │
│              └───────────────────┘              │
└─────────────────────────────────────────────────┘
```

### Partner Tenant Model

| Model | Description | Multi-Tenant Impact |
|-------|-------------|---------------------|
| Direct | Partner manages their own tenants | Partner as tenant admin |
| Reseller | Partner's customers are sub-tenants | Hierarchical tenancy |
| White-Label | Partner's branded version | Isolated branding per partner |
| Managed Service | Partner operates on behalf of customer | Access delegation |

### Partner Portal Features by Tier

| Feature | Silver | Gold | Elite |
|---------|--------|------|-------|
| Customer Management | View only | Manage | Full control |
| Revenue Dashboard | Basic | Detailed | Real-time |
| API Access | Standard | Enhanced | Unlimited |
| Support Level | Community | Priority | Dedicated |
| Commission Rate | 10% | 20% | 30% |
| Marketing Support | None | Co-marketing | Custom campaigns |

### Integration Marketplace Architecture

| Component | Purpose | Tenant Scope |
|-----------|---------|--------------|
| App Listing | Discover integrations | Platform-wide |
| Installation | Add to tenant | Per-tenant |
| Configuration | Set up integration | Per-tenant |
| Data Exchange | Integration runtime | Tenant-scoped |
| Billing | Track usage | Per-tenant + partner |

### Partner Revenue Models

| Model | Description | Multi-Tenant Consideration |
|-------|-------------|---------------------------|
| Revenue Share | % of customer spend | Track per-tenant attribution |
| Flat Fee | Fixed per customer | Tenant-partner mapping |
| Tiered Commission | Higher % at volume | Partner-level aggregation |
| Marketplace Cut | % of app revenue | App install tracking |

---

## Application Guidelines

When implementing partner ecosystem in a multi-tenant context:

1. **Design hierarchical tenancy** - Partner → Customer relationships
2. **Implement partner attribution** - Track revenue source accurately
3. **Enable white-label for partners** - Allow partner branding
4. **Provide partner portal** - Self-service partner management
5. **Secure partner data** - Isolate partner's customer data
6. **Track partner performance** - Analytics per partner tier

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Partner as tenant or separate? | Partner as special tenant type | Unified data model |
| Hierarchical or flat tenancy? | Hierarchical for resellers | Model partner-customer relationship |
| White-label every partner? | Only elite tier | Maintenance overhead |
| Revenue share calculation? | Real-time or monthly? | Monthly simpler, real-time better UX |
| Partner API limits? | Tier-based limits | Encourage tier upgrades |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Partner patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `partner-*`
- **Marketplace patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `marketplace-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS partner ecosystem architecture {date}"
- Search: "multi-tenant reseller model patterns {date}"
- Search: "integration marketplace design {date}"

---

## Related Workflows

- `bmad-bam-partner-integration-framework` - Design partner portal
- `bmad-bam-tenant-white-labeling-design` - Enable white-label for partners
- `bmad-bam-partner-certification-workflow` - Design reseller tenancy
