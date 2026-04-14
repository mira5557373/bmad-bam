# Billing Integration Patterns

**When to load:** When designing usage-based billing, integrating with payment providers, or when user mentions Stripe, billing cycles, invoicing, or revenue recognition.

**Integrates with:** Architect (Atlas persona), Dev agent, PM agent

---

## Core Concepts

### What is Billing Integration?

Billing integration connects usage metering with payment processing in a multi-tenant SaaS platform. It handles subscription management, usage aggregation, invoice generation, and payment collection while maintaining tenant isolation.

### Billing Models

| Model | Description | Use Case |
|-------|-------------|----------|
| Subscription | Fixed recurring fee | Base platform access |
| Usage-based | Pay per consumption | AI tokens, API calls |
| Hybrid | Base + overage | Most SaaS platforms |
| Tiered | Volume discounts | High-volume tenants |
| Credit-based | Prepaid consumption | Enterprise commitments |

---

## Key Patterns

### Pattern 1: Usage Metering Pipeline

| Stage | Description | Latency |
|-------|-------------|---------|
| Collection | Capture usage events | Real-time |
| Aggregation | Sum by tenant/dimension | Minutes |
| Rating | Apply pricing rules | Hourly |
| Billing | Generate invoice items | Daily/Monthly |

### Pattern 2: Stripe Integration Points

| Stripe Object | SaaS Mapping | Tenant Data |
|---------------|--------------|-------------|
| Customer | Tenant account | tenant_id |
| Subscription | Service plan | tier, features |
| Price | Pricing tier | rate, model |
| Invoice | Billing period | usage summary |
| UsageRecord | Metered usage | dimension, quantity |

### Pattern 3: Billing Event Types

| Event | Trigger | Action |
|-------|---------|--------|
| Subscription created | Tenant signup | Provision resources |
| Subscription updated | Plan change | Adjust quotas |
| Invoice paid | Payment success | Continue service |
| Invoice failed | Payment failure | Grace period → suspend |
| Subscription cancelled | Churn | Offboarding workflow |

---

## Application Guidelines

- Implementing usage-based pricing
- Integrating Stripe/payment provider
- Building tenant billing dashboards
- Designing quota enforcement
- Creating revenue analytics

---

## Grace Period Handling

| Event | Grace Period | Actions |
|-------|--------------|---------|
| Payment failed | 7 days | Notify, retry 3x |
| Card expiring | 30 days | Warning emails |
| Subscription lapsed | 14 days | Read-only mode |
| Final notice | 7 days | Data export offered |

---

## Per-Tier Billing Features

| Tier | Billing Cycle | Payment Methods | Invoice Access |
|------|---------------|-----------------|----------------|
| Free | N/A | N/A | N/A |
| Pro | Monthly | Card, ACH | Self-service |
| Enterprise | Annual | Invoice, PO | Custom terms |

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which billing model for AI features? | Usage-based with optional prepaid credits | Aligns cost with value; credits provide predictability for enterprise |
| How to handle metering latency? | Near-real-time for quota enforcement, batch for invoicing | Quota needs quick feedback; billing can tolerate hourly aggregation |
| Should free tier have billing integration? | Yes, capture usage for upgrade prompts and abuse detection | Enables informed upgrade suggestions and protects against abuse |
| How long a grace period for failed payments? | 7 days with escalating notifications | Balances customer retention with revenue protection |
| When to offer annual vs monthly billing? | Monthly default, annual discount for Pro, annual required for Enterprise | Monthly reduces friction; annual improves cash flow and retention |

---

## Related Workflows

- `bmad-bam-usage-metering-design` - Design usage metering for billing integration
- `bmad-bam-tenant-onboarding-design` - Configure billing during tenant provisioning
- `bmad-bam-tenant-offboarding-design` - Handle billing during tenant offboarding

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Billing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `usage-metering`, `quota-management`, `tenant-lifecycle`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "Stripe multi-tenant SaaS integration {date}"
- Search: "usage-based billing patterns {date}"
- Search: "SaaS billing architecture {date}"
