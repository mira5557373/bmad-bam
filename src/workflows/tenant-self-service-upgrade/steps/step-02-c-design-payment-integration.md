# Step 2: Design Payment Integration

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the payment integration for self-service upgrades, including payment provider selection, proration logic, and subscription management.

---

## Prerequisites

- Step 1 completed: Upgrade flow design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: billing

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Select Payment Provider Integration

Evaluate and document payment provider choice:

| Provider | Strengths | Considerations | Recommendation |
|----------|-----------|----------------|----------------|
| Stripe | Best APIs, global, SaaS features | Processing fees | Primary |
| Braintree | PayPal integration, good rates | Less SaaS-specific | Alternative |
| Paddle | MoR (tax handling) | Higher fees | International markets |
| Chargebee | Subscription management | Additional layer | Complex billing |

### 2. Design Proration Logic

Define how mid-cycle upgrades are handled:

| Scenario | Calculation | Example |
|----------|-------------|---------|
| Upgrade mid-month | Credit remaining days, charge new tier | 15 days left on $10/mo = $5 credit, new tier $30/mo = $15 for 15 days |
| Upgrade to annual | Credit remaining monthly, apply annual discount | $5 credit, annual $300 - $60 discount = $240 - $5 = $235 due |
| Seat addition | Pro-rate seats for remaining period | 10 days left, $10/seat/mo = $3.33/seat |
| Multiple upgrades | Latest proration wins | Most recent calculation applies |

### 3. Define Payment Flow Integration

Specify payment flow architecture:

| Step | API Call | Payload | Response Handling |
|------|----------|---------|-------------------|
| 1. Get current subscription | `GET /subscriptions/{tenant_id}` | - | Current plan, billing cycle |
| 2. Calculate proration | `POST /proration/calculate` | target_tier, seats | Credit, amount_due |
| 3. Validate payment method | `GET /payment-methods/{tenant_id}` | - | Default method, backup |
| 4. Create upgrade intent | `POST /subscriptions/upgrade` | tier, seats, payment_method | Upgrade ID, requires_action |
| 5. Confirm payment | `POST /payments/confirm` | upgrade_id, payment_intent | Payment status |
| 6. Provision tier | `POST /tenants/{id}/provision` | tier, features | Provision status |

### 4. Design Subscription Events

Document subscription lifecycle events:

| Event | Trigger | Payload | Subscribers |
|-------|---------|---------|-------------|
| `subscription.upgrade.initiated` | Upgrade started | tenant_id, from_tier, to_tier | Analytics, Audit |
| `subscription.payment.pending` | Payment processing | payment_id, amount | Billing |
| `subscription.payment.succeeded` | Payment complete | payment_id, subscription_id | Provisioning, Notify |
| `subscription.payment.failed` | Payment failed | error_code, retry_count | Support, Notify |
| `subscription.upgraded` | Tier activated | tenant_id, new_tier | All systems |

### 5. Design Invoice Generation

Specify invoice handling:

| Invoice Type | Trigger | Contents | Delivery |
|--------------|---------|----------|----------|
| Upgrade Invoice | Payment succeeded | Proration details, new tier, amount | Email, Portal |
| Credit Memo | Downgrade credit | Credit amount, reason | Email, Portal |
| Prepaid Annual | Annual upgrade | Full year, discount | Email, Portal |
| Seat Addition | Seats added | Per-seat proration | Email, Portal |

**Verify current best practices with web search:**
Search the web: "SaaS subscription payment integration patterns {date}"
Search the web: "Stripe subscription proration best practices {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-2 complete the upgrade flow and payment integration design.**

Present summary of:
- Upgrade flow UX
- Payment provider selection
- Proration logic
- Subscription events

Ask for confirmation before proceeding to instant provisioning design.

---

## COLLABORATION MENUS (A/P/C):

After completing the payment integration design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into proration or payment flow specifics
- **P (Party Mode)**: Bring billing and finance perspectives on payment design
- **C (Continue)**: Accept payment integration design and proceed to provisioning
- **[Specific refinements]**: Describe payment integration concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: payment provider, proration logic, event flow
- Process enhanced insights on payment complexity
- Ask user: "Accept these refined payment specs? (y/n)"
- If yes, integrate into payment design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review payment integration for self-service upgrade"
- Process billing and finance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save payment integration design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-instant-provisioning.md`

---

## Verification

- [ ] Payment provider selected with rationale
- [ ] Proration logic defined for all scenarios
- [ ] Payment flow APIs specified
- [ ] Subscription events documented
- [ ] Invoice generation defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Payment provider selection
- Proration logic documentation
- Payment flow API specifications
- Subscription event definitions
- Invoice requirements

---

## Next Step

Proceed to `step-03-c-design-instant-provisioning.md` to design instant provisioning.
