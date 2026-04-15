# Step 3: Usage Tracking Integration

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Integrate with usage metering to capture billable events and consumption data for accurate billing.

---

## Prerequisites

- Pricing models defined (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `usage-metering`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Integrate usage tracking with billing system:

## Usage Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Usage to Billing Flow                          │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Usage     │───►│  Metering   │───►│  Billing    │         │
│  │   Events    │    │  Pipeline   │    │  System     │         │
│  └─────────────┘    └──────┬──────┘    └─────────────┘         │
│                            │                                     │
│         ┌──────────────────┼──────────────────┐                 │
│         ▼                  ▼                  ▼                 │
│  ┌───────────┐      ┌───────────┐      ┌───────────┐           │
│  │  Quota    │      │ Aggregated│      │ Invoice   │           │
│  │  Checks   │      │   Usage   │      │ Line Items│           │
│  └───────────┘      └───────────┘      └───────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

## Billable Metrics Mapping

| Usage Metric | Billing Metric | Unit | Aggregation |
|--------------|----------------|------|-------------|
| api_requests | API Requests | requests | sum |
| agent_invocations | Agent Calls | invocations | sum |
| llm_input_tokens | Input Tokens | 1K tokens | sum |
| llm_output_tokens | Output Tokens | 1K tokens | sum |
| storage_bytes | Storage | GB-month | avg_daily |
| compute_seconds | Compute Time | hours | sum |

## Usage Collection Points

```yaml
collection_points:
  api_gateway:
    metrics: [api_requests, data_transfer]
    collection: synchronous
    latency_impact: minimal
    
  llm_proxy:
    metrics: [llm_input_tokens, llm_output_tokens]
    collection: synchronous
    source: LiteLLM/Langfuse
    
  agent_runtime:
    metrics: [agent_invocations, tool_calls]
    collection: async_event
    source: LangGraph
    
  storage_service:
    metrics: [storage_bytes, read_ops, write_ops]
    collection: periodic_snapshot
    frequency: hourly
```

## Usage Event Schema

```yaml
billing_usage_event:
  # Required fields
  tenant_id: uuid
  metric_name: string
  quantity: number
  timestamp: iso8601
  idempotency_key: string
  
  # Billing-specific fields
  subscription_id: string
  pricing_version: string
  billable: boolean
  
  # Attribution
  context:
    user_id: uuid
    agent_id: string
    request_id: string
```

## Quota Integration

```yaml
quota_integration:
  # Pre-check before expensive operations
  pre_check_metrics:
    - llm_tokens
    - agent_invocations
    
  check_flow:
    1. Get current usage from quota service
    2. Compare against tier limit
    3. Allow/deny based on tier policy
    
  tier_policies:
    FREE:
      on_limit: hard_block
      message: "Free tier limit reached. Upgrade to continue."
      
    PRO:
      on_limit: allow_with_warning
      warning_threshold: 80%
      message: "Approaching limit. Additional usage will incur charges."
      
    ENTERPRISE:
      on_limit: allow
      message: none  # Per contract terms
```

## Usage Aggregation for Billing

```yaml
billing_aggregation:
  # Aggregate usage for billing periods
  periods:
    - monthly
    
  aggregation_schedule:
    realtime_quota: continuous
    daily_summary: "0 2 * * *"  # 2 AM daily
    billing_period: "0 4 1 * *"  # 4 AM on 1st
    
  aggregation_queries:
    monthly_usage: |
      SELECT 
        tenant_id,
        metric_name,
        SUM(quantity) as total_quantity,
        billing_period
      FROM usage_daily
      WHERE billing_period = current_billing_period()
      GROUP BY tenant_id, metric_name, billing_period
```

## Usage Report Generation

```yaml
usage_report:
  format:
    tenant_id: required
    billing_period: required
    line_items:
      - metric_name
      - total_quantity
      - included_quantity
      - overage_quantity
      - unit_price
      - total_amount
      
  generation_timing:
    draft: 24h_before_billing
    final: 4h_before_billing
    
  delivery:
    - billing_system_api
    - tenant_portal
    - email_summary
```

## Late Usage Handling

```yaml
late_usage:
  # Handle usage events that arrive after billing cutoff
  grace_period: 24_hours
  
  handling:
    within_grace:
      action: include_in_current_period
      
    after_grace:
      action: include_in_next_period
      flag: late_usage_adjustment
      
  reconciliation:
    frequency: weekly
    alert_threshold: 5%  # Alert if late usage > 5%
```

**Verify current best practices with web search:**
Search the web: "usage-based billing integration patterns {date}"
Search the web: "metering to billing pipeline SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the usage tracking integration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into usage integration using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for integration analysis
- **C (Continue)**: Accept usage integration and proceed to invoice generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass integration context: metrics mapping, quota checks
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into integration summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review usage tracking integration for billing: {summary of data flow and aggregation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save usage integration summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-invoice-generation.md`

---

## Verification

- [ ] Billable metrics mapped to usage events
- [ ] Collection points identified
- [ ] Usage event schema defined
- [ ] Quota integration configured
- [ ] Aggregation schedule established
- [ ] Late usage handling defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Usage to billing mapping document
- Quota integration specification
- Aggregation configuration

---

## Next Step

Proceed to `step-04-c-invoice-generation.md` to design invoice generation.
