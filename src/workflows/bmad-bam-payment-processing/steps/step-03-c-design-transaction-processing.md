# Step 3: Design Transaction Processing

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
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the complete transaction processing flow including authorization, capture, and retry logic.

---

## Prerequisites

- Payment methods configured (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: payment-processing
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: saga-orchestration

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Authorization Flow

| Stage | Action | Timeout | Fallback |
|-------|--------|---------|----------|
| Create intent | Create payment intent | 30s | Retry |
| Authenticate | 3D Secure challenge | 5m | Cancel |
| Authorize | Request authorization | 30s | Retry |
| Confirm | Confirm authorization | 30s | Manual review |

### 2. Capture Strategies

| Strategy | Use Case | Timing |
|----------|----------|--------|
| Immediate capture | Subscription renewal | At authorization |
| Delayed capture | Usage-based | End of period |
| Manual capture | Enterprise wire | Upon verification |

### 3. Subscription Payment Scheduling

| Event | Timing | Action |
|-------|--------|--------|
| Renewal reminder | -7 days | Email notification |
| Pre-charge | -1 day | Validate payment method |
| Charge attempt | Day 0 | Process payment |
| Retry 1 | +3 days | Automatic retry |
| Retry 2 | +7 days | Automatic retry |
| Final notice | +14 days | Enter dunning |

### 4. Retry Logic Configuration

| Failure Type | Retry Strategy | Max Attempts |
|--------------|----------------|--------------|
| Soft decline | Immediate retry | 3 |
| Insufficient funds | Delayed (24h) | 5 |
| Card expired | No retry | 0 |
| Fraud decline | Manual review | 0 |
| Network error | Exponential backoff | 5 |

### 5. Idempotency Implementation

| Component | Key Format | TTL |
|-----------|------------|-----|
| Payment intent | `pi_{tenant}_{invoice}` | 24h |
| Charge | `ch_{tenant}_{intent}_{attempt}` | 24h |
| Refund | `rf_{tenant}_{charge}` | 24h |

### 6. Currency Handling

| Scenario | Handling |
|----------|----------|
| Single currency | Tenant billing currency |
| Multi-currency | Convert at charge time |
| Settlement | Gateway native currency |
| Display | Tenant locale preference |

**Verify current best practices with web search:**
Search the web: "payment transaction processing patterns SaaS {date}"
Search the web: "Stripe payment intent best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the transaction processing design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into transaction flows using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for transaction analysis
- **C (Continue)**: Accept transaction design and proceed to webhook integration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass transaction context: flows, retry logic, idempotency
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into transaction summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review transaction processing for payment processing: {summary of flows and retry logic}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save transaction design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-configure-webhooks.md`

---

## Soft Gate Checkpoint

**Steps 1-3 complete the payment foundation design.**

Present summary of:
- Gateway selection and integration architecture
- Payment method configurations
- Transaction processing flows and retry logic

Ask for confirmation before proceeding to webhook integration and dunning.

---

## Verification

- [ ] Authorization flow handles all scenarios
- [ ] Capture strategies match billing model
- [ ] Subscription scheduling defined
- [ ] Retry logic covers all failure types
- [ ] Idempotency prevents duplicate charges
- [ ] Currency handling specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Transaction processing specification
- Retry and failure handling documentation
- Idempotency implementation guide

---

## Next Step

Proceed to `step-04-c-configure-webhooks.md` to design webhook handling.
