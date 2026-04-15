---
name: usage-aggregation-schema-template
description: Schema structure for usage aggregation in multi-tenant billing systems
category: architecture
version: 1.0.0
type: "integration"
module: bam
---

## Purpose

Schema structure for usage aggregation in multi-tenant billing systems

# Usage Aggregation Schema Template

**Version:** {{version}}
**Date:** {{date}}
**Project:** {{project_name}}

---

## Overview

This template defines the schema structure for usage aggregation in a multi-tenant billing system. Use web research for current database-specific syntax and best practices.

---

## Aggregation Tables

### Usage Hourly Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| tenant_id | UUID | Foreign key to tenant |
| resource_type | VARCHAR | Type of resource (compute, storage, api_calls) |
| resource_subtype | VARCHAR | Subtype (e.g., gpu, cpu, bandwidth) |
| aggregation_hour | TIMESTAMP | Hour start time (UTC) |
| quantity_sum | DECIMAL | Sum of quantities in hour |
| quantity_count | INTEGER | Count of events in hour |
| quantity_min | DECIMAL | Minimum quantity in hour |
| quantity_max | DECIMAL | Maximum quantity in hour |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

**Indexes:**
- Primary: (id)
- Unique: (tenant_id, resource_type, resource_subtype, aggregation_hour)
- Query optimization: (tenant_id, aggregation_hour)

### Usage Daily Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| tenant_id | UUID | Foreign key to tenant |
| resource_type | VARCHAR | Type of resource |
| resource_subtype | VARCHAR | Subtype of resource |
| aggregation_day | DATE | Day (UTC) |
| quantity_sum | DECIMAL | Sum of quantities for day |
| quantity_count | INTEGER | Count of events for day |
| quantity_min | DECIMAL | Minimum quantity for day |
| quantity_max | DECIMAL | Maximum quantity for day |
| hourly_breakdown | JSONB | Optional hourly details |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

**Indexes:**
- Primary: (id)
- Unique: (tenant_id, resource_type, resource_subtype, aggregation_day)
- Query optimization: (tenant_id, aggregation_day)

### Usage Billing Period Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| tenant_id | UUID | Foreign key to tenant |
| billing_period_start | DATE | Billing period start |
| billing_period_end | DATE | Billing period end |
| resource_type | VARCHAR | Type of resource |
| resource_subtype | VARCHAR | Subtype of resource |
| quantity_total | DECIMAL | Total quantity for period |
| quantity_count | INTEGER | Total event count |
| quantity_avg | DECIMAL | Average quantity |
| quantity_peak | DECIMAL | Peak quantity |
| billable_units | DECIMAL | Calculated billable units |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

**Indexes:**
- Primary: (id)
- Unique: (tenant_id, billing_period_start, resource_type, resource_subtype)
- Query optimization: (tenant_id, billing_period_start, billing_period_end)

---

## Row-Level Security

Apply RLS policies to all aggregation tables:

| Table | Policy Name | Policy Type | Description |
|-------|-------------|-------------|-------------|
| usage_hourly | tenant_isolation | USING | tenant_id = current_tenant_id() |
| usage_daily | tenant_isolation | USING | tenant_id = current_tenant_id() |
| usage_billing_period | tenant_isolation | USING | tenant_id = current_tenant_id() |

---

## Partitioning Strategy

| Table | Partition Key | Partition Type | Retention |
|-------|---------------|----------------|-----------|
| usage_hourly | aggregation_hour | Range (monthly) | 90 days |
| usage_daily | aggregation_day | Range (monthly) | 2 years |
| usage_billing_period | billing_period_start | Range (yearly) | 7 years |

---

## Data Types by Database

Use web research to determine the correct data types for your target database:

| Concept | PostgreSQL | ClickHouse | TimescaleDB |
|---------|------------|------------|-------------|
| UUID | UUID | UUID | UUID |
| Decimal | NUMERIC(18,6) | Decimal64(6) | NUMERIC(18,6) |
| Timestamp | TIMESTAMPTZ | DateTime64(3) | TIMESTAMPTZ |
| JSON | JSONB | String | JSONB |

---

## Web Research Queries

For current best practices, search:
- "time-series aggregation schema design {date}"
- "multi-tenant billing database schema {date}"
- "usage metering data model best practices {date}"
- "{database} partitioning for time-series billing data {date}"

---

## Checklist

- [ ] Schema created for hourly aggregation
- [ ] Schema created for daily aggregation
- [ ] Schema created for billing period aggregation
- [ ] RLS policies applied to all tables
- [ ] Partitioning strategy implemented
- [ ] Indexes created for tenant-scoped queries
- [ ] Retention policies configured

---

## Verification Checklist

- [ ] All aggregation table schemas defined with correct column types
- [ ] Primary and unique indexes created per table specification
- [ ] Query optimization indexes in place for tenant-scoped queries
- [ ] RLS policies enforce tenant_id = current_tenant_id() on all tables
- [ ] Partitioning keys and retention periods match requirements
- [ ] Data types verified against target database (PostgreSQL/ClickHouse/TimescaleDB)
- [ ] Multi-tenant isolation verified through RLS policy testing
- [ ] Hourly, daily, and billing period aggregation logic tested
- [ ] Rollup from hourly to daily to billing period validated
- [ ] Performance tested with expected tenant count and data volume
- [ ] Retention policy automation configured and tested
- [ ] Schema migration scripts created for deployment

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
