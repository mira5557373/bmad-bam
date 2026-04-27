# BAM Billing Guide

**When to load:** During billing integration design, payment processing implementation, or subscription management tasks. Load when user mentions billing, payments, invoicing, subscriptions, or revenue.

**Integrates with:** bmad-agent-pm (Product Management), bmad-agent-analyst (Business Analysis)

---

## Core Concepts

### Multi-Tenant Billing Architecture

Billing in multi-tenant SaaS requires careful isolation and flexibility to handle diverse customer needs while maintaining operational efficiency. The billing system must integrate seamlessly with tenant lifecycle management and support various pricing models.

Key architectural considerations:

- **Tenant Billing Accounts**: Each tenant has isolated billing context with separate payment methods, invoices, and transaction history. Billing data must respect tenant boundaries while allowing platform administrators visibility for support.
- **Usage Aggregation**: Metering events aggregated per tenant with configurable aggregation windows (hourly, daily, monthly). Event deduplication and idempotency prevent double-billing scenarios.
- **Tiered Pricing**: Support for multiple pricing tiers (Free, Pro, Enterprise) with different feature sets, limits, and pricing models. Each tier may have distinct billing cycles and payment terms.
- **Multi-Currency**: Handle international customers with currency conversion, local payment methods, and region-specific tax requirements.

### Billing Provider Integration

Common providers and integration patterns:

- **Stripe**: Most common choice offering excellent API, comprehensive webhooks, and built-in subscription management. Supports usage-based billing, multiple currencies, and extensive payment method coverage.
- **Paddle**: Handles taxes and compliance as merchant of record, simplifying international sales. Best for teams wanting to minimize compliance burden.
- **Custom**: Full control over billing logic but higher maintenance overhead. Consider only when existing providers cannot meet specific requirements.

### Subscription Lifecycle States

Understanding subscription state transitions is critical for proper billing behavior:

```
TRIAL → ACTIVE → PAST_DUE → CANCELED
         ↓
      PAUSED
```

| State | Billing Action | Access Level |
|-------|---------------|--------------|
| TRIAL | No charge | Full features |
| ACTIVE | Regular billing | Full features |
| PAST_DUE | Retry payment | Degraded |
| PAUSED | No charge | Read-only |
| CANCELED | Final invoice | None |

### Payment Processing Patterns

Implement robust payment handling to minimize revenue loss:

- **Dunning Management**: Automated retry sequences for failed payments with escalating notifications
- **Smart Retries**: Retry at optimal times based on historical success patterns
- **Payment Method Updating**: Prompts for expired cards before failure occurs
- **Graceful Degradation**: Maintain service access during payment resolution

## Application Guidelines

When designing billing systems:

1. **Idempotent Webhook Handlers**: Always implement idempotent webhook processing to handle provider retries safely. Store webhook event IDs and check for duplicates before processing.

2. **Audit Trail**: Store all payment events for compliance and dispute resolution. Include timestamps, amounts, status transitions, and actor information.

3. **Retry Logic**: Implement configurable retry logic for failed payments with exponential backoff. Consider time-of-day optimization for retry timing.

4. **Graceful Degradation**: Design service behavior during billing outages. Users should not lose access due to temporary billing provider issues.

5. **PCI Compliance**: Never store raw card numbers. Use tokenization and ensure all card data flows through PCI-compliant channels. Regular security assessments are mandatory.

## Decision Framework

| Scenario | Recommendation | Rationale |
|----------|---------------|-----------|
| < 1000 tenants | Stripe/Paddle | Lower complexity, faster time to market |
| Enterprise focus | Custom billing | Flexible contracts, custom terms |
| International | Paddle | Tax handling, MoR simplification |
| Usage-based | Stripe Metering | Built-in support, real-time processing |
| High compliance | Custom + Audit | Full control over data handling |

## Related Workflows

- `bmad-bam-tenant-billing-integration` - Billing system integration
- `bmad-bam-usage-metering-design` - Usage tracking
- `bmad-bam-pricing-tier-configuration` - Tier setup
- `bmad-bam-invoice-generation` - Invoice automation
- `bmad-bam-billing-disputes` - Dispute handling

## Related Patterns

Load decision criteria from pattern registry:

- **Billing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `billing-*`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "SaaS billing architecture {date}"
- Search: "subscription management patterns {date}"
- Search: "PCI compliance SaaS billing {date}"
