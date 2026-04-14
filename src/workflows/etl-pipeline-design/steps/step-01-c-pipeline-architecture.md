# Step 1: Pipeline Architecture

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

Design the overall ETL pipeline architecture for multi-tenant data processing.

---

## Prerequisites

- Tenant isolation strategy defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-pipeline`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- User requirements for data integration
- Tenant model configuration
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Design the overall ETL pipeline architecture:

## Pipeline Orchestration Selection

| Orchestrator | Use Case | Tenant Support |
|--------------|----------|----------------|
| Apache Airflow | Complex DAGs, mature ecosystem | Variable isolation |
| Dagster | Asset-based, strong typing | Native partition support |
| Prefect | Cloud-native, dynamic flows | Tenant-parameterized |
| Temporal | Long-running workflows | Strong isolation |

## Extract Sources

```yaml
extract_sources:
  databases:
    - type: postgresql
      isolation: RLS policy or schema prefix
      connection: Tenant-scoped connection pool
      
    - type: external_db
      isolation: Tenant credentials vault
      connection: Per-tenant connection string
      
  apis:
    - type: rest_api
      isolation: Tenant API key from vault
      rate_limiting: Per-tenant limits
      
    - type: webhook
      isolation: Tenant-signed payloads
      validation: Tenant signature verification
      
  files:
    - type: s3
      isolation: Tenant-prefixed paths
      access: Tenant-scoped IAM role
      
  streams:
    - type: kafka
      isolation: Tenant-partitioned topics
      consumer: Tenant-filtered consumer group
```

## Transform Processing

```yaml
transform_processing:
  batch:
    scheduler: Airflow/Dagster
    isolation: Tenant-parameterized DAGs
    resource_limits:
      FREE: 2 CPU, 4GB RAM
      PRO: 4 CPU, 8GB RAM
      ENTERPRISE: custom
      
  streaming:
    engine: Flink/Spark Streaming
    isolation: Tenant-keyed windows
    checkpointing: Tenant-scoped state
    
  micro_batch:
    engine: Spark Structured Streaming
    isolation: Tenant-filtered micro-batches
    trigger: Every 5 minutes per tenant tier
```

## Load Destinations

```yaml
load_destinations:
  data_warehouse:
    - type: snowflake
      isolation: Tenant-prefixed schemas
      access: Row-level policies
      
    - type: bigquery
      isolation: Dataset per tenant or row-level
      access: IAM per tenant
      
  analytics:
    - type: clickhouse
      isolation: Tenant partitions
      access: RLS policies
      
  exports:
    - type: s3_export
      isolation: Tenant-prefixed paths
      format: Parquet with tenant metadata
```

## Pipeline Scheduling

```yaml
scheduling:
  triggers:
    - cron: Daily batch at 2 AM UTC
    - event: On data arrival
    - manual: User-initiated
    
  tenant_prioritization:
    ENTERPRISE: Priority queue
    PRO: Standard queue
    FREE: Best-effort queue
    
  concurrency:
    global_limit: 100 pipelines
    per_tenant_limit:
      FREE: 1 concurrent
      PRO: 5 concurrent
      ENTERPRISE: 20 concurrent
```

## Resource Allocation

```yaml
resource_allocation:
  compute:
    FREE:
      cpu: 1
      memory: 2GB
      timeout: 30 minutes
      
    PRO:
      cpu: 4
      memory: 8GB
      timeout: 2 hours
      
    ENTERPRISE:
      cpu: custom
      memory: custom
      timeout: custom
      
  storage:
    staging: Tenant-isolated temp storage
    retention: 7 days (configurable)
```

**Verify current best practices with web search:**
Search the web: "ETL pipeline architecture best practices {date}"
Search the web: "multi-tenant data pipeline design patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the pipeline architecture above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into architecture requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for architecture analysis
- **C (Continue)**: Accept architecture and proceed to tenant isolation design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass architecture context: orchestrator, sources, processing, destinations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into architecture summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review ETL pipeline architecture for multi-tenant processing: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save pipeline architecture to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-tenant-isolation-design.md`

---

## Verification

- [ ] Orchestration strategy selected
- [ ] Extract sources defined with isolation
- [ ] Transform processing designed
- [ ] Load destinations configured
- [ ] Scheduling strategy established
- [ ] Resource allocation per tier defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Pipeline architecture document
- Orchestration selection rationale
- Source/destination matrix
- Resource allocation table
- **Load template:** `{project-root}/_bmad/bam/templates/data-template.md`

---

## Next Step

Proceed to `step-02-c-tenant-isolation-design.md` to design tenant isolation.
