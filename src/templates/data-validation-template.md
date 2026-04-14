---
name: data-validation-template
description: Define data validation rules, integrity checks, and reconciliation procedures for multi-tenant systems
category: operations
version: 1.0.0
type: template
---

# Data Validation Framework: {{project_name}}

## Purpose

Use this template to establish comprehensive data validation procedures for multi-tenant SaaS platforms. This document defines validation rules by data type, integrity check procedures, reconciliation criteria, error handling protocols, and tenant-scoped validation requirements to ensure data quality and consistency across all tenant boundaries.

## Document Metadata

| Field | Value |
|-------|-------|
| Project Name | {{project_name}} |
| Version | {{version}} |
| Created Date | {{date}} |
| Last Updated | {{last_updated}} |
| Author | {{author}} |
| Status | {{status}} |
| Review Cycle | {{review_cycle}} |
| Next Review | {{next_review_date}} |

## Table of Contents

1. [Validation Architecture Overview](#validation-architecture-overview)
2. [Validation Rules by Data Type](#validation-rules-by-data-type)
3. [Integrity Check Procedures](#integrity-check-procedures)
4. [Reconciliation Criteria](#reconciliation-criteria)
5. [Error Handling Protocols](#error-handling-protocols)
6. [Tenant-Scoped Validation](#tenant-scoped-validation)
7. [Validation Pipeline Configuration](#validation-pipeline-configuration)
8. [Monitoring and Alerting](#monitoring-and-alerting)
9. [Recovery Procedures](#recovery-procedures)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

---

## Validation Architecture Overview

### Validation Layers

| Layer | Scope | Validation Type | Enforcement |
|-------|-------|-----------------|-------------|
| API Gateway | Request ingress | Schema validation | Synchronous |
| Service Layer | Business logic | Rule validation | Synchronous |
| Data Access | Persistence | Constraint validation | Synchronous |
| Async Pipeline | Background jobs | Reconciliation | Asynchronous |
| Audit Layer | All operations | Compliance validation | Asynchronous |

### Tenant Context Propagation

| Component | Tenant ID Source | Validation Method | Fallback Behavior |
|-----------|------------------|-------------------|-------------------|
| {{component_1}} | {{tenant_source_1}} | {{validation_method_1}} | {{fallback_1}} |
| {{component_2}} | {{tenant_source_2}} | {{validation_method_2}} | {{fallback_2}} |
| {{component_3}} | {{tenant_source_3}} | {{validation_method_3}} | {{fallback_3}} |

---

## Validation Rules by Data Type

### String Validation Rules

| Field Pattern | Min Length | Max Length | Regex Pattern | Sanitization | Tenant Scope |
|---------------|------------|------------|---------------|--------------|--------------|
| `*_name` | 1 | 255 | `^[a-zA-Z0-9_\-\s]+$` | HTML escape | Per-tenant |
| `*_email` | 5 | 320 | RFC 5322 compliant | Lowercase | Per-tenant |
| `*_phone` | 7 | 20 | E.164 format | Strip non-digits | Per-tenant |
| `*_url` | 10 | 2048 | Valid URL | Protocol check | Per-tenant |
| `*_code` | 2 | 50 | `^[A-Z0-9_]+$` | Uppercase | Per-tenant |
| `*_description` | 0 | 5000 | UTF-8 valid | XSS sanitize | Per-tenant |

### Numeric Validation Rules

| Field Pattern | Min Value | Max Value | Precision | Scale | Null Allowed |
|---------------|-----------|-----------|-----------|-------|--------------|
| `*_amount` | 0 | 999999999.99 | 12 | 2 | No |
| `*_quantity` | 0 | 2147483647 | 10 | 0 | No |
| `*_percentage` | 0 | 100 | 5 | 2 | Yes |
| `*_rate` | 0 | 9999.9999 | 8 | 4 | No |
| `*_count` | 0 | 9223372036854775807 | 19 | 0 | Yes |

### Date and Time Validation Rules

| Field Pattern | Format | Min Value | Max Value | Timezone | Tenant Context |
|---------------|--------|-----------|-----------|----------|----------------|
| `*_date` | ISO 8601 | 1970-01-01 | 2099-12-31 | Tenant TZ | Use tenant timezone |
| `*_datetime` | ISO 8601 | 1970-01-01T00:00:00Z | 2099-12-31T23:59:59Z | UTC | Store UTC, display tenant TZ |
| `*_timestamp` | Unix epoch | 0 | 4102444800 | UTC | Store UTC |
| `*_duration` | ISO 8601 duration | PT0S | P365D | N/A | Validate bounds |

### Identifier Validation Rules

| Identifier Type | Format | Generation | Uniqueness Scope | Cross-Tenant Check |
|-----------------|--------|------------|------------------|-------------------|
| Tenant ID | UUID v4 | System | Global | N/A |
| User ID | UUID v4 | System | Per-tenant | Required |
| Resource ID | UUID v7 | System | Per-tenant | Required |
| External ID | String | Client | Per-tenant | Required |
| Correlation ID | UUID v4 | Per-request | Global | N/A |

### JSON/Object Validation Rules

| Schema Name | Schema Location | Max Depth | Max Size | Validation Mode |
|-------------|-----------------|-----------|----------|-----------------|
| {{schema_1}} | {{schema_location_1}} | 10 | 1MB | Strict |
| {{schema_2}} | {{schema_location_2}} | 5 | 100KB | Permissive |
| {{schema_3}} | {{schema_location_3}} | 15 | 5MB | Strict |

---

## Integrity Check Procedures

### Referential Integrity Checks

| Check ID | Parent Table | Child Table | Foreign Key | Tenant Scoped | Schedule |
|----------|--------------|-------------|-------------|---------------|----------|
| RI-001 | {{parent_table_1}} | {{child_table_1}} | {{fk_column_1}} | Yes | Hourly |
| RI-002 | {{parent_table_2}} | {{child_table_2}} | {{fk_column_2}} | Yes | Hourly |
| RI-003 | {{parent_table_3}} | {{child_table_3}} | {{fk_column_3}} | Yes | Daily |

### Cross-Table Consistency Checks

| Check ID | Tables Involved | Consistency Rule | Severity | Auto-Fix |
|----------|-----------------|------------------|----------|----------|
| CC-001 | {{tables_1}} | {{rule_1}} | Critical | No |
| CC-002 | {{tables_2}} | {{rule_2}} | High | Yes |
| CC-003 | {{tables_3}} | {{rule_3}} | Medium | Yes |

### Aggregate Integrity Checks

| Check ID | Source | Aggregate Table | Calculation | Tolerance | Schedule |
|----------|--------|-----------------|-------------|-----------|----------|
| AI-001 | {{source_1}} | {{agg_table_1}} | SUM | 0.01% | Every 15min |
| AI-002 | {{source_2}} | {{agg_table_2}} | COUNT | 0 | Hourly |
| AI-003 | {{source_3}} | {{agg_table_3}} | AVG | 0.1% | Daily |

### Tenant Boundary Integrity

| Check ID | Resource Type | Tenant Column | Check Method | Alert Threshold |
|----------|---------------|---------------|--------------|-----------------|
| TB-001 | All tables | tenant_id | RLS policy audit | Any violation |
| TB-002 | File storage | path prefix | Prefix validation | Any violation |
| TB-003 | Cache keys | key prefix | Key pattern check | Any violation |
| TB-004 | Queue messages | header | Header extraction | Any violation |

---

## Reconciliation Criteria

### Financial Reconciliation

| Reconciliation Type | Source System | Target System | Match Criteria | Tolerance | Frequency |
|--------------------|---------------|---------------|----------------|-----------|-----------|
| Transaction totals | {{source_system_1}} | {{target_system_1}} | Amount, Date, Tenant | $0.01 | Daily |
| Invoice balances | {{source_system_2}} | {{target_system_2}} | Invoice ID, Amount | $0.00 | Real-time |
| Credit allocations | {{source_system_3}} | {{target_system_3}} | Account, Credits | 0 | Hourly |

### Usage Reconciliation

| Metric Type | Metering Source | Billing Target | Match Fields | Variance Threshold |
|-------------|-----------------|----------------|--------------|-------------------|
| API calls | {{metering_1}} | {{billing_1}} | Tenant, Date, Count | 0.1% |
| Storage | {{metering_2}} | {{billing_2}} | Tenant, Date, Bytes | 1% |
| Compute | {{metering_3}} | {{billing_3}} | Tenant, Date, Units | 0.5% |

### State Reconciliation Matrix

| Entity | Source of Truth | Replicas | Sync Method | Max Lag | Conflict Resolution |
|--------|-----------------|----------|-------------|---------|---------------------|
| {{entity_1}} | {{sot_1}} | {{replicas_1}} | {{sync_1}} | 5 min | Last-write-wins |
| {{entity_2}} | {{sot_2}} | {{replicas_2}} | {{sync_2}} | 1 min | Source wins |
| {{entity_3}} | {{sot_3}} | {{replicas_3}} | {{sync_3}} | Real-time | Merge |

---

## Error Handling Protocols

### Validation Error Classification

| Error Category | Severity | User Feedback | Logging Level | Alert | Retry |
|----------------|----------|---------------|---------------|-------|-------|
| Schema violation | Error | Detailed message | WARN | No | No |
| Business rule violation | Error | User-friendly message | INFO | No | No |
| Data format error | Error | Field-specific | WARN | No | No |
| Integrity violation | Critical | Generic + support ID | ERROR | Yes | No |
| Cross-tenant leak attempt | Critical | Block + generic | CRITICAL | Immediate | No |

### Error Response Format

| Field | Description | Example | Required |
|-------|-------------|---------|----------|
| `error_code` | Machine-readable code | `VALIDATION_FAILED` | Yes |
| `error_message` | Human-readable message | `Invalid email format` | Yes |
| `field_errors` | Per-field error details | `[{field: "email", message: "..."}]` | Conditional |
| `correlation_id` | Request tracking ID | `uuid` | Yes |
| `tenant_id` | Tenant context (masked) | `ten_***xyz` | Yes |
| `timestamp` | Error occurrence time | ISO 8601 | Yes |

### Error Escalation Matrix

| Error Pattern | Threshold | Time Window | Escalation Action | Owner |
|---------------|-----------|-------------|-------------------|-------|
| Same validation error | 100 occurrences | 5 minutes | Alert on-call | {{owner_1}} |
| Cross-tenant attempt | 1 occurrence | N/A | Immediate page | {{owner_2}} |
| Integrity check failure | 5 failures | 1 hour | Alert + auto-pause | {{owner_3}} |
| Reconciliation mismatch | 3 consecutive | N/A | Alert + investigation | {{owner_4}} |

---

## Tenant-Scoped Validation

### Tenant Configuration Validation

| Configuration | Validation Rule | Default | Override Allowed | Tier Restriction |
|---------------|-----------------|---------|------------------|------------------|
| `max_records_per_request` | 1-1000 | 100 | Yes | Enterprise only |
| `custom_validation_rules` | JSON Schema | None | Yes | Pro and above |
| `field_masks` | Pattern list | None | Yes | All tiers |
| `required_fields` | Field list | Default set | Yes | Pro and above |

### Per-Tenant Validation Rules

| Rule ID | Tenant Tier | Field | Rule Type | Rule Definition | Enabled |
|---------|-------------|-------|-----------|-----------------|---------|
| TV-001 | Enterprise | {{field_1}} | Regex | {{regex_1}} | Yes |
| TV-002 | Pro | {{field_2}} | Range | {{range_def}} | Yes |
| TV-003 | All | {{field_3}} | Enum | {{enum_values}} | Yes |

### Tenant Isolation Validation

| Validation Point | Check Type | Implementation | Failure Action |
|------------------|------------|----------------|----------------|
| Request entry | Tenant header present | Middleware | 401 Unauthorized |
| Query execution | Tenant filter applied | RLS/query wrapper | Log + block |
| Response exit | No cross-tenant data | Response filter | Log + sanitize |
| Background job | Tenant context set | Job wrapper | Skip + alert |

### Tenant Data Quality Metrics

| Metric | Calculation | Target | Warning | Critical | Per-Tenant |
|--------|-------------|--------|---------|----------|------------|
| Validation pass rate | Pass / Total | >99% | <98% | <95% | Yes |
| Field completeness | Non-null / Total | >95% | <90% | <80% | Yes |
| Format compliance | Valid / Total | 100% | <99% | <95% | Yes |
| Uniqueness violations | Duplicates | 0 | >0 | >10 | Yes |

---

## Validation Pipeline Configuration

### Pipeline Stages

| Stage | Order | Timeout | Failure Mode | Bypass Conditions |
|-------|-------|---------|--------------|-------------------|
| Schema validation | 1 | 100ms | Reject | None |
| Sanitization | 2 | 50ms | Sanitize | None |
| Business rules | 3 | 200ms | Reject | Admin override |
| Cross-reference | 4 | 500ms | Reject | Batch mode |
| Tenant validation | 5 | 100ms | Reject | None |

### Validation Cache Configuration

| Cache Type | TTL | Invalidation | Tenant Scope | Max Size |
|------------|-----|--------------|--------------|----------|
| Schema cache | 1 hour | On deploy | Global | 100MB |
| Rule cache | 5 min | On update | Per-tenant | 10MB |
| Reference cache | 15 min | On change | Per-tenant | 50MB |

---

## Monitoring and Alerting

### Validation Metrics

| Metric Name | Type | Labels | Alert Condition | Dashboard |
|-------------|------|--------|-----------------|-----------|
| `validation_total` | Counter | rule, result, tenant | N/A | {{dashboard_1}} |
| `validation_duration_ms` | Histogram | stage, tenant | p99 > 500ms | {{dashboard_2}} |
| `validation_errors_total` | Counter | error_type, tenant | Rate > 100/min | {{dashboard_3}} |
| `integrity_check_failures` | Gauge | check_id | Any > 0 | {{dashboard_4}} |

### Alert Configuration

| Alert Name | Condition | Severity | Notification | Runbook |
|------------|-----------|----------|--------------|---------|
| High validation failure rate | >5% errors in 5min | Warning | Slack | {{runbook_1}} |
| Integrity check failure | Any check fails | Critical | PagerDuty | {{runbook_2}} |
| Cross-tenant validation | Any attempt | Critical | Immediate page | {{runbook_3}} |
| Reconciliation variance | >threshold | High | Email + Slack | {{runbook_4}} |

---

## Recovery Procedures

### Data Correction Workflow

| Step | Action | Approval Required | Audit Trail | Rollback |
|------|--------|-------------------|-------------|----------|
| 1 | Identify affected records | No | Auto-logged | N/A |
| 2 | Create correction proposal | No | Required | N/A |
| 3 | Review and approve | Yes - {{approver}} | Required | N/A |
| 4 | Execute correction | No | Required | Available |
| 5 | Verify correction | No | Required | Available |
| 6 | Close incident | Yes - {{approver}} | Required | N/A |

### Bulk Validation Re-run

| Scenario | Trigger | Scope | Impact | Duration Estimate |
|----------|---------|-------|--------|-------------------|
| Schema update | Deploy | All affected records | Read-only mode | {{duration_1}} |
| Rule change | Config update | Tenant-scoped | None | {{duration_2}} |
| Data import | Import complete | Import batch | None | {{duration_3}} |
| Incident recovery | Manual | Specified range | Depends | Variable |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "data validation patterns multi-tenant SaaS {date}"
- "database integrity check automation enterprise {date}"
- "tenant data isolation validation strategies {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Validation rules cover all data types used in the system
- [ ] String validation includes sanitization for security
- [ ] Numeric validation defines precision and scale appropriately
- [ ] Date/time validation accounts for tenant timezone requirements
- [ ] Identifier validation ensures cross-tenant uniqueness checks
- [ ] Referential integrity checks are scheduled appropriately
- [ ] Cross-table consistency rules are documented with severity
- [ ] Tenant boundary integrity checks cover all storage layers
- [ ] Financial reconciliation has zero or near-zero tolerance where required
- [ ] Error classification distinguishes security-critical errors
- [ ] Error responses include correlation IDs for debugging
- [ ] Tenant-scoped validation rules are tier-appropriate
- [ ] Validation pipeline stages are ordered correctly
- [ ] Monitoring metrics cover all validation dimensions
- [ ] Alert thresholds are appropriate for each error type
- [ ] Recovery procedures include approval workflows
- [ ] All tenant isolation points have validation checks

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
