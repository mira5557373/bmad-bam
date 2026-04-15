---
name: analytics-cleanup-template
description: Cleanup procedures for analytics data during tenant offboarding
category: architecture
version: 1.0.0
type: "operations"
module: bam
---

## Purpose

Cleanup procedures for analytics data during tenant offboarding

# Analytics Cleanup Template

**Version:** {{version}}
**Date:** {{date}}
**Project:** {{project_name}}
**Tenant ID:** {{tenant_id}}

---

## Overview

This template defines the cleanup procedures for analytics data during tenant offboarding. Analytics systems often use different storage engines and partitioning strategies, requiring specialized cleanup approaches.

---

## Analytics Data Inventory

### Data Categories to Clean

| Category | Description | Typical Storage | Retention Note |
|----------|-------------|-----------------|----------------|
| Usage metrics | Resource consumption data | Time-series DB | May need billing archive |
| Event logs | User activity events | ClickHouse/BigQuery | Audit trail considerations |
| Aggregated reports | Pre-computed dashboards | Data warehouse | Remove after raw data |
| Real-time streams | Live analytics feeds | Kafka/Kinesis | Drain before deletion |

---

## ClickHouse Cleanup Procedures

### Partition-Based Cleanup

| Action | Description | Verification |
|--------|-------------|--------------|
| Identify partitions | List partitions containing tenant data | Query system.parts |
| Drop partitions | Remove tenant-specific partitions | Partition not in system.parts |
| Verify deletion | Confirm no rows remain | COUNT(*) = 0 for tenant |

### Tenant Data Location Pattern

| Table Type | Partition Key | Filter Column |
|------------|---------------|---------------|
| Events | toYYYYMM(timestamp) | tenant_id |
| Aggregates | toYYYYMM(period_start) | tenant_id |
| Metrics | toYYYYMM(metric_time) | tenant_id |

---

## TimescaleDB Cleanup Procedures

### Chunk-Based Cleanup

| Action | Description | Verification |
|--------|-------------|--------------|
| Identify chunks | List chunks with tenant data | Query timescaledb_information.chunks |
| Delete rows | Remove tenant rows from hypertable | Rows deleted count |
| Compress/reorder | Optimize after deletion | Compression ratio maintained |

---

## Data Warehouse Cleanup (BigQuery/Snowflake/Redshift)

### Table Cleanup Pattern

| Action | Description | Cost Consideration |
|--------|-------------|-------------------|
| Identify tables | List tables with tenant_id column | Query metadata |
| Delete rows | Remove tenant data | May incur query costs |
| Verify deletion | Confirm removal | Run verification query |
| Vacuum/optimize | Reclaim storage | Schedule during low-usage |

---

## Real-time Analytics Cleanup

### Streaming Data

| System | Cleanup Action | Verification |
|--------|---------------|--------------|
| Kafka | Drain topic partitions with tenant data | Consumer lag = 0 |
| Kinesis | Process remaining records | Shard iterator exhausted |
| Flink | Cancel tenant-specific jobs | Job status = CANCELED |
| Spark Streaming | Stop tenant contexts | Context status = STOPPED |

### Materialized Views

| Action | Description | Status |
|--------|-------------|--------|
| Identify views | List views with tenant dependency | [ ] |
| Refresh/rebuild | Remove tenant data from views | [ ] |
| Drop if tenant-specific | Remove tenant-only views | [ ] |

---

## Dashboard/Reporting Cleanup

| System | Cleanup Action | Verification |
|--------|---------------|--------------|
| Grafana | Delete tenant dashboards | Dashboard not found |
| Metabase | Delete tenant questions/dashboards | Resources removed |
| Looker | Delete tenant explores/dashboards | Resources removed |
| Custom dashboards | Delete tenant configurations | Config removed |

---

## Data Retention Exceptions

### Legal/Compliance Holds

| Data Type | Retention Requirement | Archive Location |
|-----------|----------------------|------------------|
| Billing records | 7 years (financial compliance) | Cold storage archive |
| Audit logs | Per regulation (SOX, GDPR) | Compliance archive |
| Security events | Per policy | Security archive |

### Archive Before Deletion

| Data | Archive Format | Archive Location | Retention |
|------|---------------|------------------|-----------|
| Final billing summary | JSON/Parquet | S3 Glacier | 7 years |
| Audit trail extract | JSON | Compliance bucket | Per policy |
| Usage summary | CSV/Parquet | Archive bucket | 2 years |

---

## Cleanup Execution Order

1. **Stop ingestion** - Halt new analytics data for tenant
2. **Drain streams** - Process pending real-time data
3. **Archive required data** - Copy to compliance storage
4. **Delete real-time** - Remove streaming data
5. **Delete aggregates** - Remove pre-computed data
6. **Delete raw events** - Remove event-level data
7. **Clean dashboards** - Remove visualization configs
8. **Verify cleanup** - Run verification queries
9. **Document completion** - Generate cleanup record

---

## Web Research Queries

For platform-specific procedures:
- "ClickHouse partition deletion multi-tenant {date}"
- "TimescaleDB data deletion best practices {date}"
- "BigQuery tenant data deletion cost optimization {date}"
- "Snowflake data purge compliance {date}"
- "Kafka topic cleanup multi-tenant {date}"

---

## Cleanup Verification Checklist

- [ ] All streaming data drained
- [ ] All raw events deleted
- [ ] All aggregates removed
- [ ] All materialized views refreshed/deleted
- [ ] All dashboards removed
- [ ] Required data archived to compliance storage
- [ ] Verification queries return 0 rows
- [ ] Storage reclaimed (vacuum/optimize run)
- [ ] Cleanup certificate generated

---

## Cleanup Record

```yaml
analytics_cleanup_record:
  tenant_id: "{{tenant_id}}"
  cleanup_timestamp: "{{cleanup_timestamp}}"
  systems_cleaned:
    - name: "[analytics_system_name]"
      tables_affected: [count]
      rows_deleted: [count]
      storage_reclaimed_gb: [size]
  archives_created:
    - type: "billing_summary"
      location: "[archive_path]"
      retention_until: "[date]"
  verification_status: "[PASSED/FAILED]"
  operator: "[operator_email]"
```

---

## Verification Checklist

- [ ] All analytics data categories identified and inventoried
- [ ] Streaming data sources drained before deletion
- [ ] Legal/compliance holds reviewed and archived data preserved
- [ ] ClickHouse partitions verified dropped for tenant
- [ ] TimescaleDB chunks verified cleaned for tenant
- [ ] Data warehouse tables verified empty for tenant
- [ ] Materialized views refreshed or deleted as appropriate
- [ ] All dashboards and reporting configs removed
- [ ] Verification queries return zero rows for tenant
- [ ] Storage reclamation (vacuum/optimize) completed
- [ ] Cleanup certificate generated with audit trail
- [ ] Multi-tenant isolation verified (no data leakage to other tenants)

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
