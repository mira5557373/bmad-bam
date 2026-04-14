# Step 6: Real-time vs Batch Processing

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

Define the processing architecture for analytics data including real-time streaming, batch processing, and hybrid approaches.

---

## Prerequisites

- Visualization design defined (Step 5)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: analytics,streaming

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define real-time vs batch processing for tenant analytics:

## Processing Architecture Overview

```
Lambda Architecture
├── Speed Layer (Real-time)
│   ├── Event Stream (Kafka)
│   ├── Stream Processing (Flink)
│   └── Real-time Store (Redis)
│
├── Batch Layer (Batch)
│   ├── Raw Data Lake (S3)
│   ├── Batch Processing (Spark/dbt)
│   └── Data Warehouse (Snowflake)
│
└── Serving Layer
    ├── Query Router
    ├── Cache Layer
    └── API Layer
```

## Use Case Classification

| Use Case | Latency Requirement | Processing Type | Data Source |
|----------|---------------------|-----------------|-------------|
| Live usage counters | < 1 second | Real-time | Speed layer |
| Current session metrics | < 5 seconds | Real-time | Speed layer |
| Last hour trends | < 30 seconds | Near real-time | Speed layer + batch |
| Daily reports | < 5 minutes | Batch | Batch layer |
| Historical analysis | < 30 seconds | Batch | Batch layer |
| Ad-hoc queries | Variable | Batch | Batch layer |

## Real-time Processing Pipeline

```yaml
realtime_pipeline:
  # Event ingestion
  ingestion:
    source: application_events
    transport: kafka
    topic_pattern: "events.{tenant_id}.{event_type}"
    partitioning: tenant_id
    
  # Stream processing
  processing:
    engine: flink
    checkpointing: 30_seconds
    parallelism: tenant_aware
    
  # Real-time aggregations
  aggregations:
    - name: request_rate
      window: 1_minute
      tumbling: true
      metrics: [count, avg_latency]
      
    - name: error_rate
      window: 5_minutes
      sliding: 1_minute
      metrics: [count, percentage]
      
    - name: active_users
      window: 15_minutes
      session: true
      metrics: [distinct_count]
      
  # Output sinks
  sinks:
    - type: redis_timeseries
      ttl: 24_hours
      
    - type: websocket
      topic: "dashboard.{tenant_id}"
```

## Batch Processing Pipeline

```yaml
batch_pipeline:
  # Data ingestion
  ingestion:
    source: s3://raw-events/
    format: parquet
    partitioning: [date, tenant_id]
    
  # Transformation jobs
  transformations:
    - name: daily_aggregation
      schedule: "0 2 * * *"
      engine: spark
      input: raw_events
      output: daily_summaries
      
    - name: tenant_metrics
      schedule: "0 3 * * *"
      engine: dbt
      input: daily_summaries
      output: tenant_metrics
      
    - name: cohort_analysis
      schedule: "0 4 * * 0"  # Weekly
      engine: spark
      input: daily_summaries
      output: cohort_reports
      
  # Quality checks
  quality:
    - name: completeness
      check: "row_count > 0"
      
    - name: freshness
      check: "max(event_time) > now() - 2h"
      
    - name: tenant_coverage
      check: "distinct(tenant_id) >= expected_tenants * 0.95"
```

## Hybrid Query Strategy

```yaml
hybrid_queries:
  # Query routing logic
  routing:
    realtime_eligible:
      - time_range: "< 24 hours"
      - aggregation: "simple (count, sum, avg)"
      - dimensions: "< 3"
      
    batch_required:
      - time_range: "> 24 hours"
      - aggregation: "complex (percentile, distinct)"
      - dimensions: ">= 3"
      
  # Query merge strategy
  merge:
    enabled: true
    boundary: "midnight UTC"
    strategy: "union with dedup"
    
  # Example merged query
  example:
    request: "Last 48 hours of API calls"
    execution:
      - realtime: "Last 24 hours from Redis"
      - batch: "Prior 24 hours from warehouse"
      - merge: "Union ordered by timestamp"
```

## Tier-Based Processing

| Tier | Real-time Refresh | Batch Refresh | Data Retention |
|------|-------------------|---------------|----------------|
| Free | 5 minutes | Daily | 7 days |
| Pro | 1 minute | Hourly | 90 days |
| Enterprise | 10 seconds | 15 minutes | 2 years |

## WebSocket Push Updates

```yaml
websocket_updates:
  # Connection management
  connections:
    auth: jwt_token
    tenant_scoping: mandatory
    heartbeat: 30_seconds
    
  # Channel subscriptions
  channels:
    - pattern: "dashboard.{tenant_id}.kpis"
      rate_limit: 1_per_second
      
    - pattern: "dashboard.{tenant_id}.alerts"
      rate_limit: unlimited
      
    - pattern: "dashboard.{tenant_id}.{widget_id}"
      rate_limit: 5_per_second
      
  # Backpressure handling
  backpressure:
    strategy: sample
    threshold: 100_messages_queued
```

**Verify current best practices with web search:**
Search the web: "real-time vs batch analytics architecture {date}"
Search the web: "lambda kappa architecture analytics best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After defining processing architecture, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific processing patterns or tier configurations
- **P (Party Mode)**: Bring data engineer and platform architect perspectives on processing
- **C (Continue)**: Accept processing architecture and proceed to export capabilities
- **[Specific refinements]**: Describe additional processing requirements

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: processing pipelines, tier-based processing, hybrid queries
- Process enhanced insights on processing architecture
- Ask user: "Accept this detailed processing analysis? (y/n)"
- If yes, integrate into processing specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review real-time vs batch processing for tenant analytics"
- Process data engineer and platform architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save processing architecture to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-export-capabilities.md`

---

## Verification

- [ ] Processing architecture defined
- [ ] Use case classification completed
- [ ] Real-time pipeline specified
- [ ] Batch pipeline configured
- [ ] Hybrid query strategy documented
- [ ] Tier-based processing differentiated
- [ ] WebSocket updates configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Processing architecture specification
- Pipeline configurations
- Query routing rules

---

## Next Step

Proceed to `step-07-c-export-capabilities.md` to define export capabilities.
