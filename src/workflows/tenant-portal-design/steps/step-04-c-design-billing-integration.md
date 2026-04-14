# Step 4: Design Billing Integration

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design the billing portal integration including usage display, payment management, and plan changes.

---

## Prerequisites

- Tier options configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `usage-metering`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design billing portal integration:

---

## Usage Display (Orb Integration)

| Metric | Display Type | Update Frequency |
|--------|--------------|------------------|
| API Calls | Count + graph | Real-time |
| Agent Runs | Count + success % | Real-time |
| Storage | GB used / quota | Hourly |
| Vector Embeddings | Count / limit | Daily |
| Active Users | Count / seats | Real-time |

Usage Dashboard Components:
- Current billing period summary
- Usage trend charts (daily/weekly/monthly)
- Quota utilization bars
- Projected month-end usage
- Compare to previous period

---

## Invoice Management (Stripe Integration)

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Invoice List | Paginated invoice history | Stripe API |
| Invoice Download | PDF download | Stripe hosted |
| Invoice Details | Line items, taxes | Portal display |
| Payment Status | Paid, pending, failed | Real-time sync |
| Retry Payment | Retry failed payments | Stripe action |

---

## Payment Methods

| Feature | Description | Availability |
|---------|-------------|--------------|
| Add Card | Credit/debit card | All paid tiers |
| Add Bank | ACH/SEPA | ENTERPRISE |
| Default Method | Set primary payment | All paid tiers |
| Remove Method | Delete saved method | All paid tiers |
| Update Method | Edit card details | All paid tiers |

Payment Security:
- PCI-compliant card collection (Stripe Elements)
- Tokenized storage (no raw card data)
- 3D Secure support

---

## Plan Management

| Action | FREE -> PRO | PRO -> ENT | PRO -> FREE |
|--------|-------------|------------|-------------|
| Self-Service | Yes | Contact Sales | Yes (downgrade) |
| Proration | Immediate | Custom | End of period |
| Data Migration | Automatic | Assisted | Feature limited |
| Approval | None | Sales approval | Confirmation modal |

Plan Change Flow:
1. Select new plan
2. Show feature comparison
3. Calculate proration
4. Confirm payment method
5. Execute change
6. Send confirmation email

---

## Billing Alerts

| Alert Type | Trigger | Channel |
|------------|---------|---------|
| Payment Failed | Charge declined | Email + In-app |
| Usage Warning | 80% of quota | Email + In-app |
| Overage | Exceeded quota | Email + In-app |
| Invoice Generated | New invoice | Email |
| Payment Received | Successful charge | Email |
| Plan Changed | Upgrade/downgrade | Email |

**Verify current best practices with web search:**
Search the web: "billing portal integration tenant lifecycle {date}"
Search the web: "SaaS billing UI design multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the billing integration design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into billing flows and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for billing review
- **C (Continue)**: Accept billing integration and proceed to portal wireframes
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass billing context: usage, invoices, payments, alerts
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into billing integration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review billing integration: {summary of features and flows}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save billing integration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-create-portal-wireframes.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the portal functionality design.**

Present summary of:
- Usage display with Orb integration specifications
- Invoice and payment management flows
- Plan change workflows and billing alert configurations

Ask for confirmation before proceeding to portal wireframes.

---

## Verification

- [ ] Usage display designed
- [ ] Invoice management specified
- [ ] Payment methods defined
- [ ] Plan management flows complete
- [ ] Billing alerts configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Billing integration specification
- Plan change flow diagrams

---

## Next Step

Proceed to `step-05-c-create-portal-wireframes.md` to create portal wireframes.
