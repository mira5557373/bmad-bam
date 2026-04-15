# Step 2: Data Aggregation Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- REFERENCE Reference pattern registry `web_queries` for search topics


---

## Purpose

Define the data aggregation strategy for tenant analytics including ETL pipelines, data warehouse design, and aggregation levels.

---

## Prerequisites

- Analytics requirements defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: analytics,data-pipeline

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define data aggregation strategy for tenant analytics:

## Data Pipeline Architecture

```
Raw Events (Application)
    |
    v
Event Stream (Kafka/Kinesis)
    |
    +---> Real-time Aggregation (Flink/Spark Streaming)
    |         |
    |         v
    |     Redis/TimescaleDB (Hot Data)
    |
    +---> Batch Processing (Spark/dbt)
              |
              v
          Data Warehouse (Snowflake/BigQuery/Redshift)
              |
              v
          BI Layer (Metabase/Looker/Superset)
```

## Aggregation Levels

| Level | Granularity | Retention | Use Case |
|-------|-------------|-----------|----------|
| Raw Events | Per-event | 7 days | Debugging, forensics |
| Minute | 1-minute buckets | 24 hours | Real-time dashboards |
| Hourly | 1-hour buckets | 30 days | Trend analysis |
| Daily | Daily rollups | 1 year | Reporting |
| Monthly | Monthly summaries | 3 years | Historical analysis |

## Tenant-Scoped Aggregation

```yaml
aggregation_schema:
  dimensions:
    - tenant_id        # Always required
    - tenant_tier      # For tier comparisons
    - user_id          # For per-user analytics (hash for metrics)
    - feature          # Feature usage tracking
    - endpoint         # API analytics
    - region           # Geographic distribution
    
  measures:
    - count            # Event counts
    - sum              # Totals (bytes, tokens, cost)
    - avg              # Averages (latency, score)
    - percentiles      # P50, P95, P99
    - distinct         # Unique counts (users, sessions)
```

## Pre-Aggregation Rules

```yaml
pre_aggregation:
  # Real-time tier (hot path)
  realtime:
    source: event_stream
    target: redis_timeseries
    granularity: 1_minute
    dimensions: [tenant_id, endpoint, status]
    measures: [count, avg_latency]
    retention: 24_hours
    
  # Near-real-time tier
  near_realtime:
    source: event_stream
    target: timescaledb
    granularity: 5_minutes
    dimensions: [tenant_id, user_id_hash, feature]
    measures: [count, sum, percentiles]
    retention: 7_days
    
  # Batch tier (cold path)
  batch_hourly:
    source: raw_events_s3
    target: data_warehouse
    granularity: 1_hour
    schedule: "*/30 * * * *"
    dimensions: all
    measures: all
    retention: 1_year
    
  # Daily rollup
  batch_daily:
    source: batch_hourly
    target: data_warehouse
    granularity: 1_day
    schedule: "0 2 * * *"
    dimensions: [tenant_id, tenant_tier, feature]
    measures: [sum, avg, distinct_count]
    retention: 3_years
```

## Data Warehouse Schema

```yaml
warehouse_schema:
  fact_tables:
    - fact_api_calls:
        partition_by: [date, tenant_id]
        cluster_by: [endpoint, status_code]
        
    - fact_agent_runs:
        partition_by: [date, tenant_id]
        cluster_by: [agent_type, outcome]
        
    - fact_billing_events:
        partition_by: [date, tenant_id]
        cluster_by: [event_type]
        
  dimension_tables:
    - dim_tenant:
        columns: [tenant_id, name, tier, region, created_at]
        
    - dim_user:
        columns: [user_id, tenant_id, role, created_at]
        
    - dim_feature:
        columns: [feature_id, name, category, tier_availability]
        
    - dim_time:
        columns: [date_key, day, week, month, quarter, year]
```

## Tenant Data Partitioning

| Strategy | Pros | Cons | Recommended For |
|----------|------|------|-----------------|
| Partition by tenant_id | Fast tenant queries | Many partitions | < 10K tenants |
| Partition by date + tenant cluster | Balanced | Query routing needed | > 10K tenants |
| Separate schemas | Maximum isolation | Operational overhead | Enterprise tier |

**Verify current best practices with web search:**
Search the web: "data aggregation strategy multi-tenant analytics {date}"
Search the web: "data warehouse tenant partitioning best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After designing data aggregation strategy, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific aggregation rules or warehouse schema
- **P (Party Mode)**: Bring data engineer and analytics architect perspectives on aggregation design
- **C (Continue)**: Accept data aggregation strategy and proceed to tenant data isolation
- **[Specific refinements]**: Describe additional aggregation requirements

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: aggregation levels, pipeline architecture, warehouse schema
- Process enhanced insights on data strategy
- Ask user: "Accept this detailed aggregation analysis? (y/n)"
- If yes, integrate into data strategy
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data aggregation strategy for tenant analytics"
- Process data engineer and analytics architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save data aggregation strategy to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-data-isolation.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the analytics foundation design.**

Present summary of:
- Analytics requirements and KPIs
- Data aggregation levels and retention policies
- Pipeline architecture and warehouse schema

Ask for confirmation before proceeding to tenant data isolation.

---

## Verification

- [ ] Data pipeline architecture defined
- [ ] Aggregation levels specified
- [ ] Pre-aggregation rules configured
- [ ] Data warehouse schema designed
- [ ] Tenant partitioning strategy selected
- [ ] Patterns align with pattern registry

---

## Outputs

- Data aggregation strategy document
- Warehouse schema specification

---

## Next Step

Proceed to `step-03-c-tenant-data-isolation.md` to define tenant data isolation.
