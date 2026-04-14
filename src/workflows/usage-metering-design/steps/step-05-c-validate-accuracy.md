# Step 5: Validate Accuracy

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

Define the validation and accuracy assurance strategy for usage metering.

---

## Prerequisites

- Billing integration defined (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define the validation and accuracy assurance strategy for usage metering:

## Accuracy Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Event Capture Rate | 99.99% | Events captured / events generated |
| Aggregation Accuracy | 100% | Aggregated total matches sum of events |
| Billing Sync Success | 99.9% | Successfully synced / total syncs |
| Late Event Recovery | 100% | Late events eventually processed |
| Reconciliation Accuracy | 99.5% | Internal matches billing provider |

## Validation Layers

### Layer 1: Event Validation (Real-time)
```yaml
event_validation:
  # Schema validation
  - Validate against JSON schema
  - Check required fields present
  - Validate field types and ranges
  
  # Business rule validation
  - Tenant exists and is active
  - Resource type is billable
  - Quantity is positive
  - Timestamp is within acceptable range
  
  # Idempotency check
  - Check for duplicate event_id
  - Check for duplicate idempotency_key
```

### Layer 2: Pipeline Validation (Continuous)
```yaml
pipeline_validation:
  # Event flow monitoring
  - Events entering queue
  - Events processed by aggregator
  - Events written to storage
  
  # Data quality checks
  - No negative quantities in aggregates
  - No future timestamps
  - All tenants have corresponding aggregates
  
  # Latency monitoring
  - Event-to-aggregate latency < 1 hour
  - Aggregate-to-billing latency < 24 hours
```

### Layer 3: Aggregation Validation (Daily)
```yaml
aggregation_validation:
  schedule: daily
  
  checks:
    # Sum verification
    - name: hourly_sum_matches_events
      query: |
        SELECT 
          COUNT(*) as mismatches
        FROM (
          SELECT tenant_id, hour, SUM(quantity) as event_sum
          FROM raw_events
          WHERE timestamp >= yesterday()
          GROUP BY tenant_id, hour
        ) e
        JOIN usage_hourly h ON e.tenant_id = h.tenant_id AND e.hour = h.hour
        WHERE e.event_sum != h.quantity_sum
      threshold: 0
      
    # Completeness check
    - name: all_active_tenants_have_records
      query: |
        SELECT COUNT(*) as missing
        FROM tenants t
        LEFT JOIN usage_daily u ON t.id = u.tenant_id AND u.day = yesterday()
        WHERE t.status = 'ACTIVE' AND u.tenant_id IS NULL
      threshold: 0
```

### Layer 4: Billing Reconciliation (Weekly)
```yaml
billing_reconciliation:
  schedule: weekly
  
  checks:
    # Internal vs external totals
    - name: usage_totals_match_billing_provider
      process:
        1. Sum internal usage for period
        2. Query billing provider usage records
        3. Compare totals per resource type
      tolerance: 1%
      
    # Invoice accuracy
    - name: invoice_amounts_match_expected
      process:
        1. Calculate expected invoice from usage
        2. Compare with actual invoice amount
      tolerance: $1 or 0.1%
```

## Audit Trail

```yaml
audit_trail:
  events_logged:
    - Usage event received
    - Usage event validated
    - Usage event aggregated
    - Aggregation completed
    - Billing sync started
    - Billing sync completed
    - Reconciliation run
    - Discrepancy detected
    - Correction applied
    
  retention: 7_years
  
  fields:
    - timestamp
    - event_type
    - tenant_id
    - resource_type
    - quantity
    - actor (system/user)
    - outcome (success/failure)
    - details (error message, etc.)
```

## Discrepancy Handling

```yaml
discrepancy_handling:
  detection:
    - Automated reconciliation jobs
    - Customer dispute
    - Internal audit
    
  investigation:
    1. Identify affected time range
    2. Pull raw events for period
    3. Recompute aggregates
    4. Compare with stored aggregates
    5. Identify root cause
    
  resolution:
    - Under-billed: Create adjustment charge
    - Over-billed: Issue credit
    - System error: Fix and re-process
    
  documentation:
    - Create discrepancy ticket
    - Document root cause
    - Record resolution
    - Update runbook if systemic
```

## Testing Strategy

```yaml
testing:
  unit_tests:
    - Event validation logic
    - Aggregation calculations
    - Billing format conversion
    
  integration_tests:
    - End-to-end event flow
    - Billing API integration
    - Late event handling
    
  load_tests:
    - 10M events/hour throughput
    - Aggregation latency under load
    - Billing API rate limit handling
    
  chaos_tests:
    - Event queue failure recovery
    - Aggregation job failure recovery
    - Billing API unavailability
```

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/billing/usage-metering-design.md`
- `{output_folder}/planning-artifacts/billing/billing-integration-spec.md`
- `{output_folder}/planning-artifacts/operations/metering-runbook.md`

**Verify current best practices with web search:**
Search the web: "validate accuracy best practices {date}"
Search the web: "validate accuracy enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the accuracy validation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into accuracy validation using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for validation analysis
- **C (Continue)**: Accept accuracy design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass accuracy context: validation layers, audit trail
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into accuracy summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review accuracy validation for usage metering: {summary of validation layers and testing}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save accuracy validation summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Generate final output documents
- Create mode complete

---

## Verification

- [ ] Accuracy requirements defined
- [ ] Validation layers specified
- [ ] Audit trail configured
- [ ] Discrepancy handling documented
- [ ] Testing strategy established
- [ ] Patterns align with pattern registry

---

## Outputs

- Usage metering design document
- Billing integration specification
- Metering runbook
- **Load template:** `{project-root}/_bmad/bam/templates/metering-event-spec.md`
- **Load template:** `{project-root}/_bmad/bam/templates/llm-cost-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/usage-metering-template.md`

---

## Next Step

Proceed to `bmad-bam-tenant-aware-observability` for observability design.
