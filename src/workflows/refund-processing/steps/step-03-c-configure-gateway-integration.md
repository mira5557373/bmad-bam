# Step 3: Configure Gateway Integration

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **ALWAYS pause after presenting findings** and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Configure payment gateway refund integration and error handling.

---

## Prerequisites

- Approval workflow designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: payment-processing

---

## Actions

### 1. Configure Refund API Integration

| Gateway | Endpoint | Idempotency |
|---------|----------|-------------|
| Stripe | POST /v1/refunds | Yes (idempotency key) |
| Braintree | Transaction.refund | Yes (transaction ID) |
| Adyen | /refund | Yes (reference) |

### 2. Design Partial Refund Handling

| Scenario | Gateway Behavior |
|----------|------------------|
| First partial | Create refund object |
| Subsequent partial | Reference original charge |
| Exceed original | Reject with error |

### 3. Configure Cross-Border Refunds

| Consideration | Handling |
|---------------|----------|
| Currency conversion | Refund in original currency |
| FX rate changes | Customer absorbs difference |
| Regional regulations | Follow local rules |

### 4. Design Failed Refund Recovery

| Failure Type | Recovery Action |
|--------------|-----------------|
| Network timeout | Retry with backoff |
| Gateway error | Queue for manual review |
| Insufficient funds | Alert finance team |
| Card expired | Issue credit instead |

**Verify current best practices with web search:**
Search the web: "Stripe refund API best practices {date}"
Search the web: "payment gateway refund integration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into gateway integration
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept integration and complete Create mode

Select an option:
```

---

## Soft Gate Checkpoint

**Steps 1-3 complete the refund processing design.**

Present summary of:
- Refund types and policies
- Approval workflow
- Gateway integration

---

## Verification

- [ ] Refund API integration configured
- [ ] Partial refund handling specified
- [ ] Cross-border refunds addressed
- [ ] Failed refund recovery designed

---

## Outputs

- Gateway integration specification
- **Load template:** `{project-root}/_bmad/bam/data/templates/refund-processing-template.md`

---

## Next Step

Create mode complete. Proceed to Edit or Validate modes.
