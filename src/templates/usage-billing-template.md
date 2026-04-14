---
name: usage-billing-template
description: Template for usage-based billing model documentation including metering strategies, rate calculation, threshold management, and consumption tracking in multi-tenant SaaS platforms
category: billing
version: 1.0.0
type: template
---

# Usage-Based Billing Specification: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Purpose

This document defines the usage-based billing framework for {{project_name}}, establishing standardized procedures for metering configuration, rate calculation, usage aggregation, threshold management, and consumption tracking across all tenant tiers.

---

## Document Metadata

| Field | Value |
|-------|-------|
| Document Type | Usage-Based Billing Specification |
| Project Name | {{project_name}} |
| Version | {{version}} |
| Created | {{date}} |
| Author | {{author}} |
| Status | {{document_status}} |
| Last Reviewed | {{last_review_date}} |
| Review Frequency | {{review_frequency}} |
| Classification | {{document_classification}} |

---

## Table of Contents

1. [Metering Configuration](#metering-configuration)
2. [Usage Metrics](#usage-metrics)
3. [Rate Calculation](#rate-calculation)
4. [Threshold Management](#threshold-management)
5. [Usage Aggregation](#usage-aggregation)
6. [Overage Handling](#overage-handling)
7. [Tenant Tier Usage Limits](#tenant-tier-usage-limits)
8. [Usage Reporting](#usage-reporting)
9. [Billing Integration](#billing-integration)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

---

## Metering Configuration

### 1.1 Meter Definition

| Meter ID | Metric Name | Unit | Aggregation | Billing Dimension |
|----------|-------------|------|-------------|-------------------|
| {{meter_1_id}} | {{meter_1_name}} | {{meter_1_unit}} | {{meter_1_aggregation}} | {{meter_1_dimension}} |
| {{meter_2_id}} | {{meter_2_name}} | {{meter_2_unit}} | {{meter_2_aggregation}} | {{meter_2_dimension}} |
| {{meter_3_id}} | {{meter_3_name}} | {{meter_3_unit}} | {{meter_3_aggregation}} | {{meter_3_dimension}} |
| {{meter_4_id}} | {{meter_4_name}} | {{meter_4_unit}} | {{meter_4_aggregation}} | {{meter_4_dimension}} |

### 1.2 Metering Configuration Schema

```yaml
metering_config:
  meter_id: string                    # Unique meter identifier
  name: string                        # Human-readable name
  description: string                 # Meter description
  unit: enum                          # requests, tokens, GB, minutes, etc.
  aggregation_type: enum              # sum, max, average, count
  billing_dimension: string           # Dimension for billing calculation
  collection:
    method: enum                      # push, pull, streaming
    interval_seconds: integer         # Collection interval
    buffer_size: integer              # Event buffer size
    retry_policy:
      max_attempts: integer           # Retry attempts
      backoff_ms: integer             # Backoff delay
  filtering:
    include_patterns: array           # Patterns to include
    exclude_patterns: array           # Patterns to exclude
  tenant_context:
    isolation_level: enum             # strict, shared, hybrid
    cross_tenant_aggregation: boolean # Allow cross-tenant aggregation
```

### 1.3 Meter Collection Methods

| Method | Use Case | Latency | Reliability |
|--------|----------|---------|-------------|
| Push | {{push_use_case}} | {{push_latency}} | {{push_reliability}} |
| Pull | {{pull_use_case}} | {{pull_latency}} | {{pull_reliability}} |
| Streaming | {{streaming_use_case}} | {{streaming_latency}} | {{streaming_reliability}} |
| Batch | {{batch_use_case}} | {{batch_latency}} | {{batch_reliability}} |

### 1.4 Metering Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Metering Architecture                         │
│                                                                  │
│  SERVICE ──► METER_SDK ──► EVENT_COLLECTOR                      │
│      │           │              │                                │
│      │           │              ▼                                │
│      │           │         EVENT_QUEUE ──► AGGREGATOR           │
│      │           │              │              │                 │
│      │           │              │              ▼                 │
│      │           │              │         USAGE_STORE           │
│      │           │              │              │                 │
│      │           │              │              ▼                 │
│      │           │              │         BILLING_ENGINE        │
│      │           │              │              │                 │
│      │           │              │         ┌────┴────┐           │
│      │           │              │         ▼         ▼           │
│      │           │              │    INVOICE   THRESHOLD_ALERT   │
│      │           │              │                                │
│      └───────────┴──────────────┴────────────────────────────────┘
└─────────────────────────────────────────────────────────────────┘
```

---

## Usage Metrics

### 2.1 Core Metrics

| Metric | Description | Unit | Collection Frequency |
|--------|-------------|------|---------------------|
| {{metric_1_name}} | {{metric_1_desc}} | {{metric_1_unit}} | {{metric_1_frequency}} |
| {{metric_2_name}} | {{metric_2_desc}} | {{metric_2_unit}} | {{metric_2_frequency}} |
| {{metric_3_name}} | {{metric_3_desc}} | {{metric_3_unit}} | {{metric_3_frequency}} |
| {{metric_4_name}} | {{metric_4_desc}} | {{metric_4_unit}} | {{metric_4_frequency}} |

### 2.2 Metric Categories

| Category | Metrics Included | Billing Impact |
|----------|------------------|----------------|
| Compute | {{compute_metrics}} | {{compute_billing}} |
| Storage | {{storage_metrics}} | {{storage_billing}} |
| Network | {{network_metrics}} | {{network_billing}} |
| AI/ML | {{aiml_metrics}} | {{aiml_billing}} |
| API | {{api_metrics}} | {{api_billing}} |

### 2.3 Metric Event Schema

```yaml
usage_event:
  event_id: uuid                      # Unique event identifier
  tenant_id: uuid                     # Tenant context
  meter_id: string                    # Meter reference
  timestamp: iso8601                  # Event timestamp
  value: number                       # Metric value
  unit: string                        # Unit of measure
  dimensions:
    resource_id: string               # Resource identifier
    region: string                    # Geographic region
    tier: string                      # Service tier
    custom: object                    # Custom dimensions
  metadata:
    source: string                    # Event source
    correlation_id: string            # Correlation ID
    idempotency_key: string           # Deduplication key
```

---

## Rate Calculation

### 3.1 Pricing Models

| Model | Description | Formula | Use Case |
|-------|-------------|---------|----------|
| Flat Rate | {{flat_desc}} | {{flat_formula}} | {{flat_use_case}} |
| Tiered | {{tiered_desc}} | {{tiered_formula}} | {{tiered_use_case}} |
| Volume | {{volume_desc}} | {{volume_formula}} | {{volume_use_case}} |
| Graduated | {{graduated_desc}} | {{graduated_formula}} | {{graduated_use_case}} |

### 3.2 Rate Card Configuration

| Tier | Range Start | Range End | Unit Price | Currency |
|------|-------------|-----------|------------|----------|
| {{tier_1_name}} | {{tier_1_start}} | {{tier_1_end}} | {{tier_1_price}} | {{tier_1_currency}} |
| {{tier_2_name}} | {{tier_2_start}} | {{tier_2_end}} | {{tier_2_price}} | {{tier_2_currency}} |
| {{tier_3_name}} | {{tier_3_start}} | {{tier_3_end}} | {{tier_3_price}} | {{tier_3_currency}} |
| {{tier_4_name}} | {{tier_4_start}} | {{tier_4_end}} | {{tier_4_price}} | {{tier_4_currency}} |

### 3.3 Rate Calculation Schema

```yaml
rate_calculation:
  meter_id: string                    # Meter reference
  pricing_model: enum                 # flat, tiered, volume, graduated
  currency: string                    # ISO currency code
  billing_period: enum                # hourly, daily, monthly
  
  tiers:
    - tier_id: string                 # Tier identifier
      range_start: number             # Start of range (inclusive)
      range_end: number               # End of range (exclusive)
      unit_price: decimal             # Price per unit
      flat_fee: decimal               # Optional flat fee
      
  adjustments:
    committed_discount: percentage    # Commitment discount
    volume_discount: percentage       # Volume discount
    promotional_discount: percentage  # Promotional discount
    
  rounding:
    mode: enum                        # up, down, nearest
    precision: integer                # Decimal places
```

### 3.4 Calculation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Rate Calculation Flow                          │
│                                                                  │
│  USAGE_RECORD ──► AGGREGATE ──► APPLY_TIERS                     │
│        │              │              │                           │
│        │              │              ▼                           │
│        │              │         CALCULATE_BASE                   │
│        │              │              │                           │
│        │              │              ▼                           │
│        │              │         APPLY_DISCOUNTS                  │
│        │              │              │                           │
│        │              │         ┌────┴────┐                      │
│        │              │         ▼         ▼                      │
│        │              │    COMMITTED  PROMOTIONAL                │
│        │              │         │         │                      │
│        │              │         └────┬────┘                      │
│        │              │              ▼                           │
│        │              │         APPLY_CREDITS                    │
│        │              │              │                           │
│        │              │              ▼                           │
│        │              │         CALCULATE_TAX                    │
│        │              │              │                           │
│        │              │              ▼                           │
│        │              │         FINAL_AMOUNT                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Threshold Management

### 4.1 Threshold Definitions

| Threshold Type | Trigger Point | Action | Notification |
|----------------|---------------|--------|--------------|
| Soft Limit | {{soft_trigger}} | {{soft_action}} | {{soft_notification}} |
| Hard Limit | {{hard_trigger}} | {{hard_action}} | {{hard_notification}} |
| Budget Alert | {{budget_trigger}} | {{budget_action}} | {{budget_notification}} |
| Anomaly Detection | {{anomaly_trigger}} | {{anomaly_action}} | {{anomaly_notification}} |

### 4.2 Threshold Configuration

| Meter | Warning (%) | Critical (%) | Limit Action | Reset Period |
|-------|-------------|--------------|--------------|--------------|
| {{threshold_meter_1}} | {{threshold_warn_1}} | {{threshold_crit_1}} | {{threshold_action_1}} | {{threshold_reset_1}} |
| {{threshold_meter_2}} | {{threshold_warn_2}} | {{threshold_crit_2}} | {{threshold_action_2}} | {{threshold_reset_2}} |
| {{threshold_meter_3}} | {{threshold_warn_3}} | {{threshold_crit_3}} | {{threshold_action_3}} | {{threshold_reset_3}} |

### 4.3 Threshold Alert Schema

```yaml
threshold_alert:
  alert_id: uuid                      # Alert identifier
  tenant_id: uuid                     # Tenant context
  meter_id: string                    # Meter reference
  threshold_type: enum                # warning, critical, budget
  current_value: number               # Current usage value
  threshold_value: number             # Threshold value
  percentage: number                  # Percentage of threshold
  triggered_at: iso8601               # Alert timestamp
  
  notification:
    channels: array                   # email, slack, webhook
    recipients: array                 # Notification recipients
    template: string                  # Notification template
    
  action:
    auto_action: enum                 # none, throttle, block, upgrade_prompt
    escalation_delay_minutes: integer # Time before escalation
```

### 4.4 Threshold Response Matrix

| Threshold Level | Customer Action | System Action | Support Escalation |
|-----------------|-----------------|---------------|-------------------|
| 50% | {{50_customer}} | {{50_system}} | {{50_escalation}} |
| 75% | {{75_customer}} | {{75_system}} | {{75_escalation}} |
| 90% | {{90_customer}} | {{90_system}} | {{90_escalation}} |
| 100% | {{100_customer}} | {{100_system}} | {{100_escalation}} |

---

## Usage Aggregation

### 5.1 Aggregation Periods

| Period | Granularity | Retention | Use Case |
|--------|-------------|-----------|----------|
| Real-time | {{realtime_granularity}} | {{realtime_retention}} | {{realtime_use_case}} |
| Hourly | {{hourly_granularity}} | {{hourly_retention}} | {{hourly_use_case}} |
| Daily | {{daily_granularity}} | {{daily_retention}} | {{daily_use_case}} |
| Monthly | {{monthly_granularity}} | {{monthly_retention}} | {{monthly_use_case}} |

### 5.2 Aggregation Rules

| Metric Type | Aggregation Method | Null Handling | Precision |
|-------------|-------------------|---------------|-----------|
| Count | {{count_method}} | {{count_null}} | {{count_precision}} |
| Sum | {{sum_method}} | {{sum_null}} | {{sum_precision}} |
| Average | {{avg_method}} | {{avg_null}} | {{avg_precision}} |
| Max | {{max_method}} | {{max_null}} | {{max_precision}} |
| Percentile | {{percentile_method}} | {{percentile_null}} | {{percentile_precision}} |

### 5.3 Aggregation Schema

```yaml
usage_aggregation:
  aggregation_id: uuid                # Aggregation identifier
  tenant_id: uuid                     # Tenant context
  meter_id: string                    # Meter reference
  period_start: iso8601               # Period start timestamp
  period_end: iso8601                 # Period end timestamp
  granularity: enum                   # minute, hour, day, month
  
  values:
    count: integer                    # Event count
    sum: decimal                      # Sum of values
    min: decimal                      # Minimum value
    max: decimal                      # Maximum value
    average: decimal                  # Average value
    
  dimensions:
    breakdown: object                 # Dimension breakdown
    top_resources: array              # Top consuming resources
    
  billing:
    billable_amount: decimal          # Billable quantity
    estimated_cost: decimal           # Estimated cost
    currency: string                  # Currency code
```

---

## Overage Handling

### 6.1 Overage Policies

| Tier | Overage Allowed | Overage Rate | Max Overage | Action |
|------|-----------------|--------------|-------------|--------|
| Free | {{free_overage_allowed}} | {{free_overage_rate}} | {{free_max_overage}} | {{free_overage_action}} |
| Pro | {{pro_overage_allowed}} | {{pro_overage_rate}} | {{pro_max_overage}} | {{pro_overage_action}} |
| Enterprise | {{enterprise_overage_allowed}} | {{enterprise_overage_rate}} | {{enterprise_max_overage}} | {{enterprise_overage_action}} |

### 6.2 Overage Calculation

```
┌─────────────────────────────────────────────────────────────────┐
│                   Overage Calculation Flow                       │
│                                                                  │
│  CURRENT_USAGE ──► COMPARE_ALLOCATION ──► WITHIN_LIMIT?         │
│        │                    │                   │                │
│        │                    │              ┌────┴────┐           │
│        │                    │              ▼         ▼           │
│        │                    │           YES         NO           │
│        │                    │              │         │           │
│        │                    │              │         ▼           │
│        │                    │              │    OVERAGE_ALLOWED? │
│        │                    │              │         │           │
│        │                    │              │    ┌────┴────┐      │
│        │                    │              │    ▼         ▼      │
│        │                    │              │   YES        NO     │
│        │                    │              │    │         │      │
│        │                    │              │    ▼         ▼      │
│        │                    │              │ CALCULATE  BLOCK    │
│        │                    │              │ OVERAGE    SERVICE  │
│        │                    │              │    │                │
│        │                    │              │    ▼                │
│        │                    │              │ APPLY_RATE         │
│        │                    │              │    │                │
│        │                    │              └────┴──► BILL        │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Overage Notification Schema

```yaml
overage_notification:
  notification_id: uuid               # Notification identifier
  tenant_id: uuid                     # Tenant context
  meter_id: string                    # Meter reference
  allocation: number                  # Allocated amount
  current_usage: number               # Current usage
  overage_amount: number              # Overage quantity
  overage_cost: decimal               # Overage cost
  
  notification:
    sent_at: iso8601                  # Notification timestamp
    channels: array                   # Notification channels
    template: string                  # Notification template
    
  action_required:
    upgrade_options: array            # Available upgrades
    add_on_options: array             # Available add-ons
    deadline: iso8601                 # Action deadline
```

---

## Tenant Tier Usage Limits

### 7.1 Tier Allocations

| Metric | Free Tier | Pro Tier | Enterprise Tier |
|--------|-----------|----------|-----------------|
| {{limit_metric_1}} | {{free_limit_1}} | {{pro_limit_1}} | {{enterprise_limit_1}} |
| {{limit_metric_2}} | {{free_limit_2}} | {{pro_limit_2}} | {{enterprise_limit_2}} |
| {{limit_metric_3}} | {{free_limit_3}} | {{pro_limit_3}} | {{enterprise_limit_3}} |
| {{limit_metric_4}} | {{free_limit_4}} | {{pro_limit_4}} | {{enterprise_limit_4}} |

### 7.2 Rate Limits

| Tier | Requests/Second | Requests/Minute | Requests/Day |
|------|-----------------|-----------------|--------------|
| Free | {{free_rps}} | {{free_rpm}} | {{free_rpd}} |
| Pro | {{pro_rps}} | {{pro_rpm}} | {{pro_rpd}} |
| Enterprise | {{enterprise_rps}} | {{enterprise_rpm}} | {{enterprise_rpd}} |

### 7.3 Tier Upgrade Triggers

| Trigger Condition | Current Tier | Recommended Tier | Automation |
|-------------------|--------------|------------------|------------|
| {{upgrade_trigger_1}} | {{upgrade_from_1}} | {{upgrade_to_1}} | {{upgrade_auto_1}} |
| {{upgrade_trigger_2}} | {{upgrade_from_2}} | {{upgrade_to_2}} | {{upgrade_auto_2}} |
| {{upgrade_trigger_3}} | {{upgrade_from_3}} | {{upgrade_to_3}} | {{upgrade_auto_3}} |

---

## Usage Reporting

### 8.1 Report Types

| Report | Frequency | Recipients | Format |
|--------|-----------|------------|--------|
| Usage Summary | {{summary_frequency}} | {{summary_recipients}} | {{summary_format}} |
| Cost Breakdown | {{cost_frequency}} | {{cost_recipients}} | {{cost_format}} |
| Trend Analysis | {{trend_frequency}} | {{trend_recipients}} | {{trend_format}} |
| Anomaly Report | {{anomaly_frequency}} | {{anomaly_recipients}} | {{anomaly_format}} |

### 8.2 Self-Service Reporting

| Feature | Free Tier | Pro Tier | Enterprise Tier |
|---------|-----------|----------|-----------------|
| Real-time Dashboard | {{free_dashboard}} | {{pro_dashboard}} | {{enterprise_dashboard}} |
| Historical Data | {{free_historical}} | {{pro_historical}} | {{enterprise_historical}} |
| Export Formats | {{free_export}} | {{pro_export}} | {{enterprise_export}} |
| API Access | {{free_api}} | {{pro_api}} | {{enterprise_api}} |
| Custom Reports | {{free_custom}} | {{pro_custom}} | {{enterprise_custom}} |

### 8.3 Report Schema

```yaml
usage_report:
  report_id: uuid                     # Report identifier
  tenant_id: uuid                     # Tenant context
  report_type: enum                   # summary, detailed, cost, trend
  period_start: iso8601               # Report period start
  period_end: iso8601                 # Report period end
  generated_at: iso8601               # Generation timestamp
  
  summary:
    total_usage: object               # Usage by meter
    total_cost: decimal               # Total cost
    currency: string                  # Currency code
    
  details:
    by_meter: array                   # Breakdown by meter
    by_dimension: array               # Breakdown by dimension
    by_day: array                     # Breakdown by day
    
  trends:
    month_over_month: object          # MoM comparison
    forecast: object                  # Usage forecast
    
  distribution:
    format: enum                      # pdf, csv, json
    channels: array                   # email, s3, webhook
```

---

## Billing Integration

### 9.1 Billing Cycle Integration

| Event | Trigger | Billing Action | Timing |
|-------|---------|----------------|--------|
| Period End | {{period_end_trigger}} | {{period_end_action}} | {{period_end_timing}} |
| Threshold Reached | {{threshold_trigger}} | {{threshold_action}} | {{threshold_timing}} |
| Overage Detected | {{overage_trigger}} | {{overage_action}} | {{overage_timing}} |
| Tier Change | {{tier_change_trigger}} | {{tier_change_action}} | {{tier_change_timing}} |

### 9.2 Invoice Line Item Generation

| Usage Type | Line Item Description | Calculation | Tax Treatment |
|------------|----------------------|-------------|---------------|
| Base Usage | {{base_line_desc}} | {{base_calculation}} | {{base_tax}} |
| Overage | {{overage_line_desc}} | {{overage_calculation}} | {{overage_tax}} |
| Add-ons | {{addon_line_desc}} | {{addon_calculation}} | {{addon_tax}} |
| Credits | {{credit_line_desc}} | {{credit_calculation}} | {{credit_tax}} |

### 9.3 Integration Schema

```yaml
billing_integration:
  tenant_id: uuid                     # Tenant context
  billing_period:
    start: iso8601                    # Period start
    end: iso8601                      # Period end
    
  usage_summary:
    meters: array                     # Usage by meter
    total_units: object               # Total units by type
    
  charges:
    base_charges: decimal             # Base subscription
    usage_charges: decimal            # Usage-based charges
    overage_charges: decimal          # Overage charges
    credits_applied: decimal          # Credits applied
    subtotal: decimal                 # Subtotal
    tax: decimal                      # Tax amount
    total: decimal                    # Total amount
    
  invoice_lines:
    - description: string             # Line description
      quantity: number                # Quantity
      unit_price: decimal             # Unit price
      amount: decimal                 # Line amount
```

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "usage-based billing metering strategies SaaS {date}"
- "consumption billing patterns multi-tenant architecture {date}"
- "real-time usage tracking best practices cloud billing {date}"
- "tiered pricing calculation algorithms SaaS billing {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### Usage Billing Checklist

- [ ] All meters defined with appropriate units
- [ ] Metering collection methods configured
- [ ] Rate calculation models documented
- [ ] Threshold alerts configured for all tiers
- [ ] Aggregation rules defined for all periods
- [ ] Overage policies documented per tier
- [ ] Tenant tier limits specified
- [ ] Usage reporting configured
- [ ] Billing integration documented
- [ ] All placeholders replaced with actual values

### Technical Checklist

- [ ] Metering SDK integration verified
- [ ] Event collection reliability tested
- [ ] Rate calculation accuracy validated
- [ ] Threshold notifications tested
- [ ] Cross-tenant isolation verified
- [ ] Idempotency handling confirmed

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
