# Step 4: Monitoring

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

Establish pipeline observability and monitoring for multi-tenant ETL operations.

---

## Prerequisites

- Steps 1-3 completed (Architecture, Isolation, Error Handling)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`

---


## Inputs

- Pipeline architecture from Step 1
- Tenant isolation design from Step 2
- Error handling from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Establish pipeline observability:

## Pipeline Health Metrics

```yaml
health_metrics:
  pipeline_level:
    - pipeline_runs_total
    - pipeline_runs_success
    - pipeline_runs_failed
    - pipeline_duration_seconds
    - pipeline_records_processed
    
  stage_level:
    - extract_duration_seconds
    - transform_duration_seconds
    - load_duration_seconds
    - stage_records_in
    - stage_records_out
    
  labels:
    required:
      - pipeline_name
      - tenant_id
      - environment
    optional:
      - source_system
      - destination_system
```

## Tenant-Scoped Performance

```yaml
tenant_metrics:
  per_tenant:
    - records_processed_by_tenant
    - processing_time_by_tenant
    - error_rate_by_tenant
    - resource_usage_by_tenant
    
  tier_aggregation:
    FREE:
      dashboard: Aggregate only
      detail: No individual metrics
    PRO:
      dashboard: Tenant-specific
      detail: Basic metrics
    ENTERPRISE:
      dashboard: Dedicated
      detail: Full observability
      
  isolation:
    - Tenant can only see own metrics
    - Admin can see aggregate views
    - No cross-tenant metric exposure
```

## Data Quality Monitoring

```yaml
data_quality:
  schema_validation:
    - Field type mismatches
    - Missing required fields
    - Unexpected null values
    
  content_validation:
    - Value range violations
    - Format validation failures
    - Referential integrity issues
    
  freshness:
    - Last successful run timestamp
    - Data lag in minutes
    - Stale data alerts
    
  completeness:
    - Expected vs actual record counts
    - Missing partition detection
    - Gap analysis
```

## SLA Compliance

```yaml
sla_tracking:
  metrics:
    - Pipeline completion time vs SLA
    - Data freshness vs target
    - Error rate vs threshold
    - Availability percentage
    
  sla_definitions:
    FREE:
      completion: Best effort
      freshness: 24 hours
      availability: 95%
      
    PRO:
      completion: 4 hours
      freshness: 1 hour
      availability: 99%
      
    ENTERPRISE:
      completion: Custom
      freshness: Near real-time
      availability: 99.9%
      
  breach_handling:
    notification: Immediate alert
    escalation: Per severity
    credits: ENTERPRISE only
```

## Cost Attribution

```yaml
cost_attribution:
  tracked_resources:
    - Compute hours
    - Storage bytes
    - Network transfer
    - API calls to external services
    
  allocation_method:
    direct: Tenant-specific resources
    shared: Proportional by usage
    
  reporting:
    frequency: Daily
    format: JSON cost breakdown
    destination: Billing system
    
  tenant_visibility:
    FREE: None
    PRO: Monthly summary
    ENTERPRISE: Real-time dashboard
```

## Capacity Planning

```yaml
capacity_planning:
  metrics:
    - Pipeline queue depth
    - Worker utilization
    - Storage consumption rate
    - Growth trends by tenant
    
  forecasting:
    method: Linear regression + seasonality
    horizon: 30/60/90 days
    alerts: 80% capacity warning
    
  scaling_triggers:
    automatic:
      - Queue depth > threshold
      - Processing time > SLA
    manual:
      - Capacity forecast breach
      - New enterprise tenant
```

## Dashboards

```yaml
dashboards:
  operations:
    - Pipeline health overview
    - Error rate trends
    - Resource utilization
    - Active pipeline runs
    
  tenant_admin:
    - Tenant-specific metrics
    - Data quality scores
    - SLA compliance status
    - Cost summary
    
  platform_admin:
    - Cross-tenant aggregates
    - Capacity utilization
    - Cost allocation
    - Trend analysis
```

**Verify current best practices with web search:**
Search the web: "ETL pipeline monitoring best practices {date}"
Search the web: "multi-tenant observability patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the monitoring above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into monitoring requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for observability analysis
- **C (Continue)**: Accept monitoring and finalize ETL Pipeline Design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass monitoring context: metrics, SLAs, dashboards
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into monitoring summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review monitoring design for ETL pipelines: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final ETL Pipeline Design document
- Output to `{output_folder}/planning-artifacts/data/etl-pipeline-design.md`

---

## Verification

- [ ] Health metrics defined
- [ ] Tenant-scoped performance tracking designed
- [ ] Data quality monitoring established
- [ ] SLA compliance tracking configured
- [ ] Cost attribution set up
- [ ] Capacity planning metrics defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Monitoring specification
- Dashboard configurations
- Complete ETL Pipeline Design document

---

## Workflow Complete

The ETL Pipeline Design is complete. The output document has been generated at `{output_folder}/planning-artifacts/data/etl-pipeline-design.md`.
