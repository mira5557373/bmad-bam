# BAM Data Pipeline Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing data pipelines for multi-tenant systems,
or when user mentions ETL, data sync, data ingestion, batch processing, streaming, data integration.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### Multi-Tenant Data Pipeline Challenges

Data pipelines in multi-tenant systems must handle tenant isolation while enabling efficient processing:

| Challenge | Single-Tenant | Multi-Tenant |
|-----------|---------------|--------------|
| Data isolation | N/A | Strict tenant boundaries |
| Resource allocation | Dedicated | Shared with quotas |
| Schema management | Single schema | Per-tenant variations |
| Failure handling | Global impact | Tenant-scoped blast radius |
| Backfill operations | Full dataset | Per-tenant backfill |

### Pipeline Architecture Types

| Type | Latency | Use Case | Tenant Isolation |
|------|---------|----------|------------------|
| Batch ETL | Hours | Reports, aggregations | Job-level isolation |
| Micro-batch | Minutes | Near-real-time analytics | Partition-level isolation |
| Streaming | Seconds | Real-time events | Topic/partition isolation |
| CDC | Subsecond | Database sync | Row-level isolation |
| Hybrid | Varies | Lambda architecture | Layer-specific isolation |

### Tenant Data Ownership

| Data Type | Ownership | Pipeline Handling |
|-----------|-----------|-------------------|
| Tenant-generated | Tenant | Full isolation |
| Platform-generated | Platform | Aggregation allowed |
| Derived/enriched | Depends on source | Inherit source isolation |
| Third-party | Per agreement | Contractual rules |

## Application Guidelines

When implementing data pipelines for multi-tenant systems:

1. **Enforce tenant isolation in every pipeline stage**: Source to destination
2. **Quota resource consumption per tenant**: CPU, memory, storage, throughput
3. **Support tenant-specific schema evolution**: Not all tenants upgrade simultaneously
4. **Design for per-tenant backfill**: Enable reprocessing without affecting others
5. **Monitor pipeline health per tenant**: Detect and isolate tenant-specific issues

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| High-volume batch processing | Spark/Flink with tenant partitioning | Scalable parallel processing |
| Real-time event streaming | Kafka with per-tenant topics/partitions | Natural tenant isolation |
| Database sync | Debezium CDC with tenant filtering | Low-latency replication |
| Cross-tenant aggregation | Separate anonymized pipeline | Protect tenant data |
| Tenant-specific transformations | Config-driven transforms | Flexibility without code changes |
| Data quality validation | Per-tenant quality gates | Tenant-specific standards |

## Implementation Patterns

### Pattern 1: Tenant-Partitioned Batch ETL

| Stage | Implementation | Tenant Isolation |
|-------|----------------|------------------|
| Extract | Query with tenant_id filter | Source-level isolation |
| Stage | Per-tenant directories | Storage isolation |
| Transform | Tenant-specific configs | Logic isolation |
| Load | Per-tenant tables or RLS | Destination isolation |
| Audit | Per-tenant lineage | Audit isolation |

### Pattern 2: Streaming Pipeline Architecture

| Component | Multi-Tenant Strategy | Isolation Level |
|-----------|----------------------|-----------------|
| Message broker | Topic per tenant or shared with partition | Topic/partition |
| Stream processor | Consumer groups per tenant | Processing isolation |
| State store | Keyed by tenant_id | State isolation |
| Sink | Per-tenant targets | Output isolation |

### Pattern 3: CDC Pipeline Design

| CDC Stage | Implementation | Tenant Handling |
|-----------|----------------|-----------------|
| Capture | Database log reading | All tenant changes captured |
| Filter | Tenant-based routing | Route to tenant pipeline |
| Transform | Schema mapping | Per-tenant schema config |
| Apply | Target database | Per-tenant target or RLS |

## Multi-Tenant Pipeline Patterns

### Resource Quota Management

| Resource | Quota Type | Enforcement |
|----------|------------|-------------|
| Compute slots | Per-tenant limit | Scheduler-enforced |
| Memory | Per-job limit | OOM protection |
| Storage staging | Per-tenant quota | Write rejection |
| Throughput | Records/second | Rate limiting |
| Concurrent jobs | Per-tenant limit | Queue management |

### Tenant-Specific Schema Management

| Scenario | Approach | Implementation |
|----------|----------|----------------|
| Shared schema | Global schema with tenant_id | RLS enforcement |
| Extended schema | Base + tenant extensions | Dynamic columns |
| Per-tenant schema | Separate schemas | Schema routing |
| Schema versioning | Multi-version support | Version-aware processing |

### Pipeline Failure Handling

| Failure Scope | Response | Impact Containment |
|---------------|----------|-------------------|
| Single record | Dead letter queue | Tenant-specific DLQ |
| Batch failure | Retry with backoff | Per-tenant retry |
| Source failure | Pause tenant pipeline | Other tenants continue |
| Transform error | Skip + alert | Tenant-specific alert |
| Sink failure | Queue + retry | Per-tenant queue |

## Data Quality Patterns

### Per-Tenant Quality Gates

| Gate | Check | Action on Failure |
|------|-------|-------------------|
| Schema validation | Match expected schema | Reject batch |
| Completeness | Required fields present | Flag records |
| Consistency | Cross-field validation | Flag records |
| Freshness | Data not stale | Alert on delay |
| Volume | Within expected range | Alert on anomaly |

### Data Reconciliation

| Reconciliation Type | Frequency | Method |
|---------------------|-----------|--------|
| Row count | Per batch | Source vs. destination count |
| Checksum | Per batch | Hash comparison |
| Business rules | Daily | Business logic validation |
| Cross-system | Weekly | Full reconciliation |

## Operational Patterns

### Pipeline Monitoring Dashboard

| Metric | Dimension | Alert Threshold |
|--------|-----------|-----------------|
| Records processed | Per tenant | < 50% of average |
| Processing latency | Per tenant | > 2x SLA |
| Error rate | Per tenant | > 1% |
| Resource utilization | Per tenant | > 80% quota |
| Queue depth | Per tenant | > 1000 records |

### Backfill Strategy

| Backfill Type | Scope | Isolation |
|---------------|-------|-----------|
| Historical | Full tenant history | Dedicated job |
| Incremental | Time range | Parallel to live |
| Schema migration | Schema version update | Rolling per tenant |
| Reprocessing | Re-run transforms | Per-tenant queue |

## Data Integration Patterns

### Third-Party Integration

| Integration Type | Data Flow | Tenant Handling |
|------------------|-----------|-----------------|
| Pull integration | Fetch from external | Per-tenant credentials |
| Push integration | Receive from external | Tenant identification |
| Bi-directional | Both directions | Sync state per tenant |
| Webhook | Event-driven | Tenant routing |

### Cross-Tenant Data Sharing

| Sharing Type | Method | Privacy Control |
|--------------|--------|-----------------|
| Aggregated insights | Anonymous aggregation | k-anonymity |
| Benchmarking | Opt-in comparison | Consent-based |
| Data marketplace | Explicit export | Contract-based |
| Federated queries | No data movement | Access control |

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Data isolation design
- `bmad-bam-event-streaming-design` - Event-driven pipeline design
- `bmad-bam-tenant-aware-observability` - Pipeline monitoring

## Related Patterns

Load decision criteria from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `data`, `integration`

### Web Research

Use `web_queries` from pattern registry:
- Search: "multi-tenant data pipeline patterns {date}"
- Search: "ETL multi-tenant SaaS best practices {date}"
- Search: "streaming data pipeline tenant isolation {date}"
