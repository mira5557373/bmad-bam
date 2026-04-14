# Step 3: Configure Aggregation

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

Define the usage aggregation strategy for billing.

---

## Prerequisites

- Metering events designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define the usage aggregation strategy for billing:

## Aggregation Levels

```
Level 1: Raw Events
    └── Individual metering events (short retention)
    
Level 2: Hourly Aggregates
    └── Per tenant, per resource type, per hour
    
Level 3: Daily Aggregates
    └── Per tenant, per resource type, per day
    
Level 4: Billing Period Aggregates
    └── Per tenant, per resource type, per billing period (month)
```

## Aggregation Schema

**Load template:** `{project-root}/_bmad/bam/templates/usage-aggregation-schema-template.md`

Refer to the template for schema design patterns. Use web research for current best practices.

## Aggregation Pipeline

```yaml
aggregation_jobs:
  # Real-time: event to hourly (streaming)
  event_to_hourly:
    trigger: continuous
    source: metering_events
    destination: usage_hourly
    window: 1_hour tumbling
    group_by: [tenant_id, resource_type, resource_subtype]
    aggregations:
      - SUM(quantity) as quantity_sum
      - COUNT(*) as quantity_count
      - MIN(quantity) as quantity_min
      - MAX(quantity) as quantity_max
      
  # Scheduled: hourly to daily
  hourly_to_daily:
    trigger: cron("0 1 * * *")  # 1 AM daily
    source: usage_hourly
    destination: usage_daily
    lookback: 25_hours  # Handle late events
    
  # Scheduled: daily to billing period
  daily_to_billing:
    trigger: cron("0 2 * * *")  # 2 AM daily
    source: usage_daily
    destination: usage_billing_period
    lookback: current_month + previous_month
```

## Late Event Handling

```yaml
late_events:
  # Events can arrive late due to network issues
  max_acceptable_delay: 24_hours
  
  # Reaggregation trigger
  reaggregate_threshold: 100_late_events
  
  # Correction process
  correction:
    - Identify affected aggregation windows
    - Reaggregate affected windows
    - Update billing period totals
    - Log correction in audit trail
```

## Storage-Based Aggregation

For storage resources that are measured by snapshots:

```yaml
storage_aggregation:
  # Snapshot collection
  snapshot_interval: 1_hour
  
  # Daily average calculation
  daily_calculation: |
    SELECT 
      tenant_id,
      toDate(snapshot_time) as day,
      avg(storage_bytes) as avg_bytes,
      max(storage_bytes) as peak_bytes
    FROM storage_snapshots
    WHERE snapshot_time >= today() - 1
    GROUP BY tenant_id, day
    
  # GB-month calculation
  gb_month_formula: |
    SUM(daily_avg_bytes / 1073741824) / days_in_month
```

## Quota Tracking

```yaml
quota_tracking:
  # Real-time quota checks
  cache_key: "quota:{tenant_id}:{resource_type}:{billing_period}"
  cache_ttl: 5_minutes
  
  # Quota calculation
  used: SUM(quantity) for current billing period
  limit: tenant_tier_limits[resource_type]
  remaining: limit - used
  
  # Quota enforcement
  enforcement_mode:
    FREE: hard_limit (block at 100%)
    PRO: soft_limit (allow overage, charge)
    ENTERPRISE: custom (per contract)
```

## Data Retention

```yaml
retention:
  raw_events: 7_days
  hourly_aggregates: 90_days
  daily_aggregates: 2_years
  billing_period_aggregates: 7_years  # Regulatory
```

**Verify current best practices with web search:**
Search the web: "configure aggregation best practices {date}"
Search the web: "configure aggregation enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the aggregation configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into aggregation strategy using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for aggregation analysis
- **C (Continue)**: Accept aggregation design and proceed to billing integration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass aggregation context: levels defined, pipeline configured
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into aggregation summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review aggregation configuration for usage metering: {summary of levels and pipeline}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save aggregation summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-integrate-billing.md`

---

## Verification

- [ ] Aggregation levels defined
- [ ] Aggregation schemas created
- [ ] Pipeline jobs configured
- [ ] Late event handling specified
- [ ] Quota tracking configured
- [ ] Retention policies set
- [ ] Patterns align with pattern registry

---

## Outputs

- Aggregation schema definitions
- Pipeline job configurations
- Retention policy document

---

## Next Step

Proceed to `step-04-c-integrate-billing.md` to define billing system integration.
