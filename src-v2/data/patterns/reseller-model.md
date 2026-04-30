---
pattern_id: reseller-model
shortcode: ZRM
category: platform
qg_ref: QG-PL4
version: 1.0.0
last_reviewed: 2026-04-30
---

# Reseller Model - BAM Pattern

**Loaded by:** ZRM  
**Applies to:** Multi-tenant SaaS platforms with partner/reseller distribution channels

---

## When to Use

- Expanding sales through partner channels
- Geographic market expansion via local partners
- Industry-specific vertical sales
- Value-added reseller (VAR) programs
- Managed service provider (MSP) partnerships
- System integrator (SI) relationships

## When NOT to Use

- Direct sales only strategy
- Product not suitable for indirect channels
- Insufficient margin for partner commission
- Early-stage without product-market fit
- When partner management overhead is prohibitive

## Architecture

### Partner Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATFORM OWNER                            │
│                    (Master Tenant)                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                Partner Management                      │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                 │
│       ┌────────────────────┼────────────────────┐           │
│       ▼                    ▼                    ▼           │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  RESELLER   │    │    VAR      │    │    MSP      │     │
│  │  Partner    │    │  Partner    │    │  Partner    │     │
│  │  ─────────  │    │  ─────────  │    │  ─────────  │     │
│  │  Sell as-is │    │  + Services │    │  Managed    │     │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘     │
│         │                  │                  │             │
│         ▼                  ▼                  ▼             │
│    Sub-tenants        Sub-tenants        Sub-tenants       │
│    (End customers)    (End customers)    (End customers)   │
└─────────────────────────────────────────────────────────────┘
```

### Partner Tiers

| Tier | Revenue Share | Requirements | Benefits |
|------|---------------|--------------|----------|
| Registered | 10% | Agreement signed | Deal registration |
| Silver | 20% | $10K ARR | Co-marketing, training |
| Gold | 30% | $50K ARR, cert | Technical support, leads |
| Platinum | 40%+ | $200K ARR, dedicated | Strategic planning, custom |

### Revenue Flow

```
End Customer Purchase ($1000/month)
      │
      ▼
┌─────────────────┐
│ Invoice to      │ ← Partner bills customer
│ Customer        │   OR Platform bills customer
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Revenue Split   │
│ Calculation     │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│Partner│ │Platform│
│ $300  │ │ $700  │
│ (30%) │ │ (70%) │
└───────┘ └───────┘
```

### Configuration Schema

```yaml
reseller_model:
  partner_id: uuid
  partner_type: enum[reseller, var, msp, si]
  bam_controlled: true
  
  tier:
    current: enum[registered, silver, gold, platinum]
    requirements:
      min_arr: float
      certifications: string[]
      customer_count: int
      
  revenue_share:
    percentage: float
    billing_model: enum[partner_bills, platform_bills, hybrid]
    payout_schedule: enum[monthly, quarterly]
    minimum_payout: float
    
  customer_management:
    can_create_customers: bool
    can_manage_billing: bool
    can_access_support_tickets: bool
    customer_visibility: enum[full, limited, none]
    
  portal:
    partner_portal_enabled: bool
    deal_registration: bool
    lead_distribution: bool
    commission_dashboard: bool
    
  support:
    tier: enum[basic, priority, dedicated]
    escalation_path: string
    training_required: bool
    
  contract:
    term_months: int
    auto_renewal: bool
    exclusivity_region: string[]
    non_compete_clause: bool
```

### Deal Registration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   DEAL REGISTRATION                          │
│                                                              │
│  Partner ──▶ Register Deal ──▶ Platform Review ──▶ Approval │
│       │            │                 │                │      │
│       ▼            ▼                 ▼                ▼      │
│  ┌─────────┐  ┌─────────┐      ┌─────────┐     ┌─────────┐ │
│  │ Lead    │  │ Company │      │ Conflict│     │ Deal    │ │
│  │ Info    │  │ Details │      │ Check   │     │ Approved│ │
│  └─────────┘  └─────────┘      └─────────┘     └─────────┘ │
│                                                              │
│  Deal Protection:                                            │
│  - 90-day exclusive window                                  │
│  - Commission guaranteed if closes                          │
│  - Extension requests supported                             │
└─────────────────────────────────────────────────────────────┘
```

### Partner Portal Features

```
┌─────────────────────────────────────────────────────────────┐
│                    PARTNER PORTAL                            │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │   Dashboard     │  │   Customers     │                   │
│  │  - Revenue      │  │  - Manage       │                   │
│  │  - Commission   │  │  - Provision    │                   │
│  │  - Pipeline     │  │  - Support      │                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │   Resources     │  │   Leads         │                   │
│  │  - Training     │  │  - Assign       │                   │
│  │  - Collateral   │  │  - Track        │                   │
│  │  - API Docs     │  │  - Convert      │                   │
│  └─────────────────┘  └─────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Partner bills customer | Partner control | Platform revenue visibility | Established partners |
| Platform bills customer | Full visibility | Less partner ownership | New partners |
| Referral only | Simple, low commitment | Low partner engagement | Affiliates |
| Full white-label | Complete partner brand | Complex management | Strategic partners |

## Quality Checks

- [ ] Partner tier requirements verified
- [ ] Revenue share calculations auditable
- [ ] Deal registration conflict resolution defined
- [ ] Sub-tenant isolation maintained
- [ ] **CRITICAL:** No commission attribution errors

## Web Research Queries

- "SaaS reseller program design {date}"
- "partner tier structure best practices {date}"
- "channel partner management {date}"
- "MSP billing integration patterns {date}"
- "deal registration system implementation {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-PL4 | Pattern implementation verified |

## Related Patterns

- [white-label.md](white-label.md) - Partner branding
- [platform-fees.md](platform-fees.md) - Revenue sharing
