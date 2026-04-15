# Step 2: Configure Usage Aggregation

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

Configure the integration between usage metering and invoice line item generation.

---

## Prerequisites

- Invoice schema defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: usage-metering
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Usage Data Sources

| Source | Data Type | Aggregation Level | Sync Frequency |
|--------|-----------|-------------------|----------------|
| Usage metering DB | Raw events | Per-resource | Real-time |
| Aggregation store | Hourly rollups | Per-tenant-resource | Hourly |
| Billing period cache | Period totals | Per-tenant | Daily |

### 2. Configure Billing Period Boundaries

| Configuration | Value | Description |
|---------------|-------|-------------|
| Cycle anchor | 1st of month | Billing cycle start |
| Timezone | Tenant-specific | Period boundary timezone |
| Grace period | 3 days | Late event acceptance |
| Finalization delay | 24 hours | Post-period processing |

### 3. Define Usage-to-Line-Item Mapping

| Resource Type | Line Item Description | Unit Display | Pricing Lookup |
|---------------|----------------------|--------------|----------------|
| api_requests | API Requests | requests | Per 1,000 |
| llm_input_tokens | LLM Input Tokens | tokens | Per 1,000 |
| llm_output_tokens | LLM Output Tokens | tokens | Per 1,000 |
| storage_gb | File Storage | GB-month | Per GB |
| agent_invocations | Agent Executions | invocations | Per unit |

### 4. Configure Proration Handling

| Scenario | Calculation Method |
|----------|-------------------|
| Mid-cycle upgrade | Daily proration of new tier |
| Mid-cycle downgrade | Credit for unused period |
| New subscription | Prorate from start date |
| Cancellation | Prorate to end date |

### 5. Define Credit Application Order

| Priority | Credit Type | Application |
|----------|-------------|-------------|
| 1 | Promotional credits | Apply first |
| 2 | Service credits | Apply second |
| 3 | Account balance | Apply third |
| 4 | Remaining balance | Charge to payment method |

### 6. Configure Adjustment Handling

| Adjustment Type | Approval Required | Audit Trail |
|-----------------|-------------------|-------------|
| Usage correction | Yes - support | Full history |
| Promotional discount | Yes - sales | Full history |
| Goodwill credit | Yes - manager | Full history |
| Tax adjustment | Yes - finance | Full history |

**Verify current best practices with web search:**
Search the web: "SaaS usage aggregation billing integration {date}"
Search the web: "proration calculation subscription billing {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the usage aggregation configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into aggregation design using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for integration analysis
- **C (Continue)**: Accept aggregation configuration and proceed to scheduling design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass aggregation context: sources, mapping, proration rules
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into aggregation summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review usage aggregation for invoice generation: {summary of sources and mapping}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save aggregation summary to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-scheduling.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the invoice data foundation.**

Present summary of:
- Invoice schema with all field definitions
- Usage aggregation sources and mapping
- Proration and credit application rules

Ask for confirmation before proceeding to scheduling and delivery design.

---

## Verification

- [ ] Usage data sources identified and configured
- [ ] Billing period boundaries defined with timezone handling
- [ ] Usage-to-line-item mapping covers all resource types
- [ ] Proration rules handle all subscription scenarios
- [ ] Credit application order defined
- [ ] Adjustment handling with approval workflow
- [ ] Patterns align with pattern registry

---

## Outputs

- Usage aggregation integration specification
- Line item mapping rules
- Proration calculation documentation
- **Load template:** `{project-root}/_bmad/bam/data/templates/billing-integration-template.md`

---

## Next Step

Proceed to `step-03-c-design-scheduling.md` to configure invoice generation scheduling.
