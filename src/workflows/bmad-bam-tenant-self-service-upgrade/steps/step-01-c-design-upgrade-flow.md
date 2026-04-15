# Step 1: Design Upgrade Flow

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

Design the self-service upgrade user flow, including UI/UX considerations, plan selection, and confirmation steps to minimize friction and maximize conversion.

---

## Prerequisites

- Master architecture document loaded with tier definitions
- Tenant tier migration design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- User requirements and constraints for self-service upgrade
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Map Upgrade Paths

Define all valid self-service upgrade paths:

| Current Tier | Target Tier | Self-Service | Approval Required |
|--------------|-------------|--------------|-------------------|
| FREE | PRO | Yes | No |
| FREE | ENTERPRISE | Conditional | Sales approval for large orgs |
| PRO | ENTERPRISE | Yes | No |
| TRIAL | PRO | Yes | No |
| TRIAL | ENTERPRISE | Conditional | Sales approval for large orgs |

### 2. Design Upgrade Flow Steps

Define the self-service upgrade journey:

| Step | Screen | Actions | Validation |
|------|--------|---------|------------|
| 1 | Current Plan | View current tier, click "Upgrade" | User authenticated |
| 2 | Plan Selection | Compare plans, select target tier | Valid upgrade path |
| 3 | Seat/Usage Selection | Configure seats, resources | Within tier limits |
| 4 | Billing Period | Monthly vs Annual selection | Payment method ready |
| 5 | Price Summary | Review total, discounts, proration | Price calculated |
| 6 | Payment | Enter/confirm payment method | Payment valid |
| 7 | Confirmation | Review final details, confirm | All validations pass |
| 8 | Success | Show success, new features | Upgrade complete |

### 3. Design UI Components

Specify key UI elements:

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| Plan Comparison Table | Show tier differences | Feature highlight, pricing |
| Seat Selector | Configure team size | Slider, quantity input |
| Price Calculator | Real-time pricing | Proration, discounts |
| Payment Form | Collect payment | Stripe/Braintree embed |
| Confirmation Modal | Final review | Summary, terms checkbox |
| Success Banner | Confirm upgrade | Feature tour CTA |

### 4. Define Error Handling

Map error scenarios and responses:

| Error | Detection | User Message | Recovery |
|-------|-----------|--------------|----------|
| Payment Declined | Payment API error | "Payment unsuccessful" | Retry with different card |
| Insufficient Permissions | RBAC check | "Admin approval needed" | Request upgrade flow |
| Provisioning Failure | Backend error | "Upgrade processing" | Auto-retry, support link |
| Session Expired | Auth check | "Please sign in again" | Redirect to login |
| Plan Unavailable | Plan API check | "Plan not available" | Show alternatives |

### 5. Design Mobile Experience

Specify mobile-specific considerations:

| Aspect | Mobile Adaptation | Rationale |
|--------|-------------------|-----------|
| Plan Comparison | Swipe carousel | Limited screen width |
| Payment | Mobile wallets (Apple Pay, Google Pay) | Faster checkout |
| Seat Selection | Simplified stepper | Touch-friendly |
| Confirmation | Full-screen modal | Focus attention |

**Verify current best practices with web search:**
Search the web: "SaaS self-service upgrade UX best practices {date}"
Search the web: "subscription upgrade flow optimization {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the upgrade flow design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific flow steps or UI components
- **P (Party Mode)**: Bring UX and product perspectives on upgrade experience
- **C (Continue)**: Accept upgrade flow design and proceed to payment integration
- **[Specific refinements]**: Describe upgrade flow concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: upgrade paths, flow steps, UI components
- Process enhanced insights on upgrade friction points
- Ask user: "Accept these refined flow insights? (y/n)"
- If yes, integrate into upgrade flow design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review self-service upgrade flow for multi-tenant platform"
- Process UX and product perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save upgrade flow design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-payment-integration.md`

---

## Verification

- [ ] All upgrade paths documented
- [ ] Flow steps defined with validations
- [ ] UI components specified
- [ ] Error handling comprehensive
- [ ] Mobile experience addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Upgrade path matrix
- Flow step definitions
- UI component specifications
- Error handling matrix
- Mobile adaptation notes

---

## Next Step

Proceed to `step-02-c-design-payment-integration.md` to design payment integration.
