# Step 3: Configure Aggregation

Define the usage aggregation strategy for billing:

## Aggregation Levels

```
Level 1: Raw Events
    └── Individual metering events (short retention)
    
Level 2: Hourly Aggregates
    └── Per tenant, per resource type, per hour
    
Level 3: Daily Aggregates
    └── Per tenant, per resource type, per day
    
Level 4: Billing Period Aggregates
    └── Per tenant, per resource type, per billing period (month)
```

## Aggregation Schema

### Hourly Aggregates Table
```sql
CREATE TABLE usage_hourly (
  tenant_id String,
  resource_type String,
  resource_subtype String,
  hour DateTime,
  quantity_sum UInt64,
  quantity_count UInt32,
  quantity_min UInt64,
  quantity_max UInt64,
  metadata Map(String, String)
) ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(hour)
ORDER BY (tenant_id, resource_type, resource_subtype, hour);
```

### Billing Period Aggregates Table
```sql
CREATE TABLE usage_billing_period (
  tenant_id String,
  billing_period String,  -- YYYY-MM
  resource_type String,
  resource_subtype String,
  total_quantity UInt64,
  included_quantity UInt64,
  overage_quantity UInt64,
  unit_price Decimal(10, 6),
  total_cost Decimal(10, 2),
  updated_at DateTime
) ENGINE = ReplacingMergeTree(updated_at)
PARTITION BY billing_period
ORDER BY (tenant_id, billing_period, resource_type, resource_subtype);
```

## Aggregation Pipeline

```yaml
aggregation_jobs:
  # Real-time: event to hourly (streaming)
  event_to_hourly:
    trigger: continuous
    source: metering_events
    destination: usage_hourly
    window: 1_hour tumbling
    group_by: [tenant_id, resource_type, resource_subtype]
    aggregations:
      - SUM(quantity) as quantity_sum
      - COUNT(*) as quantity_count
      - MIN(quantity) as quantity_min
      - MAX(quantity) as quantity_max
      
  # Scheduled: hourly to daily
  hourly_to_daily:
    trigger: cron("0 1 * * *")  # 1 AM daily
    source: usage_hourly
    destination: usage_daily
    lookback: 25_hours  # Handle late events
    
  # Scheduled: daily to billing period
  daily_to_billing:
    trigger: cron("0 2 * * *")  # 2 AM daily
    source: usage_daily
    destination: usage_billing_period
    lookback: current_month + previous_month
```

## Late Event Handling

```yaml
late_events:
  # Events can arrive late due to network issues
  max_acceptable_delay: 24_hours
  
  # Reaggregation trigger
  reaggregate_threshold: 100_late_events
  
  # Correction process
  correction:
    - Identify affected aggregation windows
    - Reaggregate affected windows
    - Update billing period totals
    - Log correction in audit trail
```

## Storage-Based Aggregation

For storage resources that are measured by snapshots:

```yaml
storage_aggregation:
  # Snapshot collection
  snapshot_interval: 1_hour
  
  # Daily average calculation
  daily_calculation: |
    SELECT 
      tenant_id,
      toDate(snapshot_time) as day,
      avg(storage_bytes) as avg_bytes,
      max(storage_bytes) as peak_bytes
    FROM storage_snapshots
    WHERE snapshot_time >= today() - 1
    GROUP BY tenant_id, day
    
  # GB-month calculation
  gb_month_formula: |
    SUM(daily_avg_bytes / 1073741824) / days_in_month
```

## Quota Tracking

```yaml
quota_tracking:
  # Real-time quota checks
  cache_key: "quota:{tenant_id}:{resource_type}:{billing_period}"
  cache_ttl: 5_minutes
  
  # Quota calculation
  used: SUM(quantity) for current billing period
  limit: tenant_tier_limits[resource_type]
  remaining: limit - used
  
  # Quota enforcement
  enforcement_mode:
    FREE: hard_limit (block at 100%)
    PRO: soft_limit (allow overage, charge)
    ENTERPRISE: custom (per contract)
```

## Data Retention

```yaml
retention:
  raw_events: 7_days
  hourly_aggregates: 90_days
  daily_aggregates: 2_years
  billing_period_aggregates: 7_years  # Regulatory
```
