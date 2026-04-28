# Step 04: Design Invoicing and Payment

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Invoice generation, payment providers, failed payments, credits/refunds
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Maintain subscription and metering designs from previous steps
- 🚫 Do NOT: Generate final artifact yet - that's Step 05
- 🔍 Use web search: Verify payment integration patterns against SaaS best practices

---

## Purpose

Design the invoicing and payment processing systems including invoice generation, payment provider integration, failed payment handling, and credit/refund workflows for multi-tenant billing.

## Prerequisites

- Step 03 complete (subscription management designed)
- Tier configurations and proration rules defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `payment-*`
- **Load template:** `{project-root}/_bmad/bam/data/templates/billing-design.md`

## Actions

### 1. Design Invoice Generation

Define invoice generation architecture:

| Invoice Type | Trigger | Contents |
|--------------|---------|----------|
| **Subscription Invoice** | Billing cycle end | Base subscription + overages |
| **Upgrade Invoice** | Mid-cycle upgrade | Prorated difference |
| **Credit Memo** | Downgrade/refund | Credit amount |
| **One-time Invoice** | Ad-hoc charges | Custom line items |

**Invoice Data Model:**
```
invoice:
  invoice_id: string
  tenant_id: string
  status: draft | finalized | paid | void
  billing_period_start: date
  billing_period_end: date
  line_items:
    - description: string
      quantity: number
      unit_price_cents: integer
      amount_cents: integer
  subtotal_cents: integer
  tax_cents: integer
  total_cents: integer
  currency: string
  due_date: date
  paid_date: date | null
  payment_provider_invoice_id: string | null
```

**Web Research Directive:**
```
Search the web: "SaaS invoice generation best practices {date}"
Search the web: "Stripe billing integration patterns {date}"
```

### 2. Design Payment Provider Integration

Define payment provider integration strategy:

| Provider | Use Case | Features |
|----------|----------|----------|
| **Stripe** | Primary (recommended) | Subscriptions, usage, invoicing, tax |
| **Paddle** | MoR (Merchant of Record) | Tax compliance, global payments |
| **PayPal** | Alternative payment | Customer preference |

**Integration Architecture:**
```
App → Billing Service → Payment Provider Adapter → [Stripe | Paddle | PayPal]
```

**Provider Abstraction Layer:**
- Common interface for all providers
- Provider-specific adapters
- Webhook handlers per provider
- Idempotency keys for all operations

**Key Integration Points:**
| Operation | Provider Endpoint | Webhook Events |
|-----------|------------------|----------------|
| Create subscription | POST /subscriptions | subscription.created |
| Update subscription | POST /subscriptions/:id | subscription.updated |
| Cancel subscription | DELETE /subscriptions/:id | subscription.canceled |
| Create invoice | POST /invoices | invoice.created, invoice.finalized |
| Charge payment | POST /payment_intents | payment_intent.succeeded |
| Issue refund | POST /refunds | charge.refunded |

### 3. Design Failed Payment Handling

Define dunning (failed payment recovery) workflow:

| Retry Attempt | Timing | Action |
|---------------|--------|--------|
| **1st retry** | Day 1 | Automatic retry, email notification |
| **2nd retry** | Day 3 | Automatic retry, in-app warning |
| **3rd retry** | Day 7 | Automatic retry, email escalation |
| **Final notice** | Day 10 | Manual intervention required |
| **Suspension** | Day 14 | Account suspended, features locked |
| **Cancellation** | Day 30 | Subscription canceled, data retained |

**Failed Payment Response:**
```
payment.failed → Update subscription status: past_due
              → Queue retry attempt
              → Send customer notification
              → Log for analytics
```

**Recovery Actions:**
- Update payment method prompt
- Offer alternative payment methods
- Contact sales for enterprise accounts
- Grace period for usage during recovery

**Multi-Tenant Considerations:**
- Tenant-specific dunning schedules (enterprise may have longer grace)
- Tenant status affects feature access during dunning
- Billing admin notifications per tenant

### 4. Design Credit and Refund Workflows

Define credit and refund handling:

| Type | Trigger | Application |
|------|---------|-------------|
| **Account Credit** | Goodwill, downgrade proration | Applied to next invoice |
| **Partial Refund** | Service issue, overcharge | Refund to payment method |
| **Full Refund** | Cancellation within period | Refund to payment method |
| **Promotional Credit** | Marketing, referrals | Credit with expiration |

**Credit Data Model:**
```
credit:
  credit_id: string
  tenant_id: string
  amount_cents: integer
  currency: string
  reason: string
  expires_at: timestamp | null
  applied_to_invoice_id: string | null
  created_at: timestamp
```

**Refund Workflow:**
1. Refund request initiated (admin or automated)
2. Validate refund eligibility
3. Calculate refund amount
4. Process via payment provider
5. Void or credit invoice
6. Update subscription state if needed
7. Emit `refund.processed` event
8. Notify customer

**Dispute Handling:**
- **Load template:** `{project-root}/_bmad/bam/data/templates/billing-design.md`
- Track dispute status from payment provider webhooks
- Provide evidence submission workflow
- Handle dispute resolution outcomes

---

## COLLABORATION MENUS (A/P/C)

After completing invoicing and payment design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into payment edge cases
- **P (Party Mode)**: Multi-persona review of payment architecture
- **C (Continue)**: Accept design and proceed to compile final artifact
- **[Specific concerns]**: Describe concerns to investigate further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: invoice generation, payment integration, dunning, credits, refunds
- Explore edge cases: multi-currency, tax jurisdictions, chargeback handling
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into payment design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review invoicing and payment design for billing: provider integration, dunning, refunds"
- Process Finance Lead and Security Architect perspectives on payment compliance
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document invoicing and payment design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Verification

- [ ] Invoice generation architecture defined
- [ ] Invoice data model includes tenant_id
- [ ] Payment provider integration designed
- [ ] Provider abstraction layer specified
- [ ] Webhook handlers identified
- [ ] Failed payment (dunning) workflow documented
- [ ] Dunning respects tenant tier
- [ ] Credit and refund workflows defined
- [ ] Dispute handling process outlined
- [ ] Web research completed for payment best practices

## Outputs

- Invoice generation design
- Payment provider integration specification
- Dunning workflow documentation
- Credit/refund workflow specifications


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-05-c-complete.md` to compile the complete billing design artifact.

---

**Navigation:** Enter 'A' to amend, 'P' to proceed, or 'C' to continue
