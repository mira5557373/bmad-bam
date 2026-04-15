# Step 4: Integrate Billing

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Define the billing system integration for usage metering.

---

## Prerequisites

- Aggregation configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: cost-tracking`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define the billing system integration for usage metering:

## Billing System Interface

### Provider Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| Provider | stripe | Billing provider (or custom) |
| Sync Method | push | Push usage to billing system |

### Endpoints

| Operation | Method | Endpoint | Purpose |
|-----------|--------|----------|---------|
| Report Usage | POST | /v1/subscription_items/{item}/usage_records | Submit usage data |
| Get Subscription | GET | /v1/subscriptions/{id} | Retrieve subscription details |
| Create Invoice Item | POST | /v1/invoiceitems | Add line items to invoice |

## Usage Reporting Flow

| Stage | Component | Actions |
|-------|-----------|---------|
| 1 | Usage Aggregation | Daily aggregation of usage data |
| 2 | Usage Report Generator | Calculate tier inclusions, Calculate overage quantities, Apply pricing rules |
| 3 | Billing API Reporter | Batch usage records by resource type, Submit to billing provider, Handle rate limits and retries |
| 4 | Confirmation | Confirmation and audit log creation |

## Usage Report Schema

### Report Header Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tenant_id | string | Yes | Tenant identifier |
| billing_period | string | Yes | Period (YYYY-MM format) |
| report_generated_at | datetime | Yes | Generation timestamp |
| subscription_id | string | Yes | Billing subscription reference |
| total_overage_cost | decimal | Yes | Sum of all overage costs |
| currency | string | Yes | Currency code (e.g., USD) |

### Line Item Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| resource_type | string | Yes | Type of resource metered |
| subtype | string | No | Resource subtype (e.g., input/output) |
| total_quantity | integer | Yes | Total usage quantity |
| included_quantity | integer | Yes | Quantity included in tier |
| overage_quantity | integer | Yes | Quantity exceeding inclusion |
| unit_price | decimal | Yes | Price per unit for overage |
| overage_cost | decimal | Yes | overage_quantity * unit_price |

## Billing Sync Patterns

### Real-Time Quota Enforcement

| Setting | Value | Description |
|---------|-------|-------------|
| Pre-Check Resources | llm_tokens, agent_invocations | Resources requiring quota check |
| FREE Tier Action | reject_if_over_limit | Block operations when over limit |
| PRO Tier Action | allow_with_warning | Allow with warning when approaching limit |
| Immediate Report Threshold | $10 per event | High-value events reported immediately |
| Immediate Report Method | sync API call | Synchronous billing API call |

### Daily Usage Sync

| Setting | Value | Description |
|---------|-------|-------------|
| Schedule | 0 3 * * * | Daily at 3 AM |

| Step | Action | Description |
|------|--------|-------------|
| 1 | Query previous day aggregates | Retrieve daily usage data |
| 2 | Calculate overage per resource | Determine usage exceeding tier |
| 3 | Format usage records | Prepare billing API payload |
| 4 | Submit to billing provider | Send usage data |
| 5 | Update sync status | Record successful sync |
| 6 | Alert on failures | Notify if sync fails |

### End-of-Period Finalization

| Setting | Value | Description |
|---------|-------|-------------|
| Schedule | 0 4 1 * * | 4 AM on 1st of each month |
| Grace Period | 24 hours | Wait for late events |

| Step | Action | Description |
|------|--------|-------------|
| 1 | Wait for late events | Honor grace period |
| 2 | Reaggregate if needed | Recalculate if late events arrived |
| 3 | Generate final usage report | Create period summary |
| 4 | Submit finalized usage | Send to billing provider |
| 5 | Trigger invoice generation | Initiate invoicing |
| 6 | Archive billing data | Store for audit/compliance |

## Error Handling

### Transient Errors (Retry)

| Error Type | Retry | Description |
|------------|-------|-------------|
| rate_limit_exceeded | Yes | Billing API rate limit hit |
| timeout | Yes | Request timed out |
| 5xx_errors | Yes | Server errors |

### Retry Policy

| Setting | Value | Description |
|---------|-------|-------------|
| Max Retries | 5 | Maximum retry attempts |
| Backoff | exponential | Exponential backoff strategy |
| Max Delay | 1 hour | Maximum wait between retries |

### Permanent Errors (Alert)

| Error Type | Action | Description |
|------------|--------|-------------|
| invalid_subscription | alert_billing_team, queue_for_manual_review | Subscription not found |
| invalid_price | alert_billing_team, queue_for_manual_review | Pricing configuration error |
| duplicate_usage_record | alert_billing_team, queue_for_manual_review | Already reported |

## Billing Reconciliation

### Reconciliation Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| Schedule | Weekly | Reconciliation frequency |
| Discrepancy Threshold | 1% | Alert if difference exceeds threshold |

### Reconciliation Checks

| Check | Description |
|-------|-------------|
| Usage totals comparison | Compare internal usage totals with billing provider records |
| Subscription verification | Verify all tenants have corresponding subscriptions |
| Orphaned records | Check for orphaned usage records |
| Pricing consistency | Verify pricing version consistency |

### Resolution Actions

| Action | Description |
|--------|-------------|
| Generate discrepancy report | Document differences found |
| Create adjustment records | Record corrections needed |
| Apply credits/charges | Apply adjustments to tenant accounts |

## Tenant Billing Portal Data

### Current Usage Display

| Data Element | Description |
|--------------|-------------|
| Resource type and quantity | Current usage by resource |
| Included vs used | Tier inclusion vs actual usage |
| Projected month-end | Estimated end-of-period usage |

### Historical Usage Display

| Data Element | Description |
|--------------|-------------|
| Daily breakdown | Usage by day |
| Cost trends | Cost over time |
| Comparison with previous periods | Period-over-period analysis |

### Portal Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| Refresh Interval | 5 minutes | Real-time data update frequency |

**Verify current best practices with web search:**
Search the web: "integrate billing best practices {date}"
Search the web: "integrate billing enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the billing integration design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into billing integration using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for billing analysis
- **C (Continue)**: Accept billing integration and proceed to accuracy validation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass billing context: integration points, sync patterns
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into billing summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review billing integration for usage metering: {summary of integration and reconciliation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save billing integration summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-validate-accuracy.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the usage metering and billing integration design.**

Present summary of:
- Billing system interface and sync patterns
- Usage reporting flow with reconciliation process
- Error handling and portal data requirements

Ask for confirmation before proceeding to accuracy validation.

---

## Verification

- [ ] Billing system interface defined
- [ ] Usage reporting flow designed
- [ ] Sync patterns configured
- [ ] Error handling specified
- [ ] Reconciliation process defined
- [ ] Portal data requirements documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Billing integration specification
- Sync job configurations
- Error handling procedures
- **Load template:** `{project-root}/_bmad/bam/data/templates/billing-integration-template.md`

---

## Next Step

Proceed to `step-05-c-validate-accuracy.md` to define accuracy assurance strategy.
