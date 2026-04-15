# Step 3: Error Handling

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

Define error handling and recovery strategies for ETL pipelines.

---

## Prerequisites

- Steps 1-2 completed (Pipeline Architecture, Tenant Isolation)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `error-handling`

---


## Inputs

- Pipeline architecture from Step 1
- Tenant isolation design from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Define error handling and recovery strategies:

## Error Classification

```yaml
error_classification:
  retryable:
    - Network timeouts
    - Rate limit exceeded
    - Temporary database unavailable
    - Transient API errors (5xx)
    
  non_retryable:
    - Authentication failures
    - Data validation errors
    - Schema mismatches
    - Permission denied
    - Business rule violations
    
  fatal:
    - Tenant context missing
    - Cross-tenant data detected
    - Security policy violation
    - Data corruption detected
```

## Retry Policies

```yaml
retry_policies:
  default:
    max_attempts: 3
    initial_delay: 1s
    max_delay: 60s
    backoff: exponential
    jitter: true
    
  network:
    max_attempts: 5
    initial_delay: 2s
    max_delay: 120s
    backoff: exponential
    
  rate_limited:
    max_attempts: 10
    initial_delay: 30s
    backoff: linear
    respect_retry_after: true
    
  database:
    max_attempts: 3
    initial_delay: 5s
    max_delay: 30s
    backoff: exponential
```

## Dead Letter Queues

```yaml
dead_letter_queues:
  structure:
    topic: etl.{pipeline_name}.dlq
    partitioning: By tenant_id
    
  record_format:
    original_record: Preserved
    error_details:
      - error_type
      - error_message
      - stack_trace
      - retry_count
      - last_attempt_timestamp
    context:
      - tenant_id
      - pipeline_run_id
      - source_system
      
  retention:
    duration: 30 days
    archive: S3 for compliance
    
  reprocessing:
    manual: Admin UI for review
    automatic: After fix deployment
```

## Partial Failure Handling

```yaml
partial_failure:
  batch_processing:
    strategy: Continue on error
    failed_records: Send to DLQ
    success_records: Proceed to load
    threshold: Fail pipeline if >10% errors
    
  streaming:
    strategy: Per-record error handling
    checkpoint: After successful batch
    recovery: Resume from last checkpoint
    
  transaction_scope:
    per_tenant: Rollback tenant batch only
    isolation: Other tenants unaffected
```

## Data Reconciliation

```yaml
reconciliation:
  frequency: After each pipeline run
  
  checks:
    - Source count vs destination count
    - Checksum validation for critical fields
    - Tenant record distribution
    - Missing record detection
    
  discrepancy_handling:
    minor: (<1% variance) Log and alert
    moderate: (1-5% variance) Investigate, may rerun
    critical: (>5% variance) Pipeline failure, manual review
    
  reporting:
    location: {output_folder}/reconciliation/
    format: JSON with details
    notification: Email/Slack for failures
```

## Alerting and Escalation

```yaml
alerting:
  severity_levels:
    INFO: Logged only
    WARNING: Slack notification
    ERROR: PagerDuty alert
    CRITICAL: Immediate escalation
    
  escalation_matrix:
    level_1: On-call engineer (5 min)
    level_2: Team lead (15 min)
    level_3: Platform manager (30 min)
    
  tenant_notification:
    ENTERPRISE: Direct notification
    PRO: Status page update
    FREE: Status page only
```

**Verify current best practices with web search:**
Search the web: "ETL error handling best practices {date}"
Search the web: "data pipeline recovery patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the error handling above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into error handling using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for error analysis
- **C (Continue)**: Accept error handling and proceed to monitoring
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass error context: classification, retry policies, DLQ design
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into error handling summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review error handling design for ETL pipelines: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save error handling to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-monitoring.md`

---

## Verification

- [ ] Error classification defined
- [ ] Retry policies established
- [ ] DLQ configuration created
- [ ] Partial failure handling designed
- [ ] Reconciliation procedures documented
- [ ] Alerting configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Error handling specification
- Retry policy configuration
- DLQ design document
- Alerting matrix

---

## Next Step

Proceed to `step-04-c-monitoring.md` to establish monitoring.
