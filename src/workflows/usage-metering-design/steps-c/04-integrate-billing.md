# Step 4: Integrate Billing

Define the billing system integration for usage metering:

## Billing System Interface

```yaml
billing_integration:
  provider: stripe  # Or custom billing system
  
  sync_method: push  # Push usage to billing system
  
  endpoints:
    report_usage: POST /v1/subscription_items/{item}/usage_records
    get_subscription: GET /v1/subscriptions/{id}
    create_invoice_item: POST /v1/invoiceitems
```

## Usage Reporting Flow

```
Usage Aggregation (Daily)
         │
         ▼
Usage Report Generator
         │
         ├── Calculate tier inclusions
         ├── Calculate overage quantities
         ├── Apply pricing rules
         │
         ▼
Billing API Reporter
         │
         ├── Batch usage records by resource type
         ├── Submit to billing provider
         ├── Handle rate limits and retries
         │
         ▼
Confirmation & Audit Log
```

## Usage Report Schema

```json
{
  "tenant_id": "tenant_abc123",
  "billing_period": "2024-01",
  "report_generated_at": "2024-02-01T00:05:00Z",
  "subscription_id": "sub_xyz789",
  "line_items": [
    {
      "resource_type": "api_requests",
      "total_quantity": 125000,
      "included_quantity": 100000,
      "overage_quantity": 25000,
      "unit_price": 0.001,
      "overage_cost": 25.00
    },
    {
      "resource_type": "llm_tokens",
      "subtype": "output",
      "total_quantity": 1500000,
      "included_quantity": 1000000,
      "overage_quantity": 500000,
      "unit_price": 0.008,
      "overage_cost": 4000.00
    }
  ],
  "total_overage_cost": 4025.00,
  "currency": "USD"
}
```

## Billing Sync Patterns

### Real-Time Quota Enforcement
```yaml
realtime_sync:
  # Check quota before expensive operations
  pre_check:
    resources: [llm_tokens, agent_invocations]
    action: reject_if_over_limit (FREE tier)
    action: allow_with_warning (PRO tier)
    
  # Report high-value events immediately
  immediate_report:
    threshold: $10 per event
    method: sync API call
```

### Daily Usage Sync
```yaml
daily_sync:
  schedule: "0 3 * * *"  # 3 AM daily
  
  process:
    1. Query previous day aggregates
    2. Calculate overage per resource
    3. Format usage records
    4. Submit to billing provider
    5. Update sync status
    6. Alert on failures
```

### End-of-Period Finalization
```yaml
period_finalization:
  schedule: "0 4 1 * *"  # 4 AM on 1st of month
  
  process:
    1. Wait for late events (grace period: 24h)
    2. Reaggregate if needed
    3. Generate final usage report
    4. Submit finalized usage
    5. Trigger invoice generation
    6. Archive billing data
```

## Error Handling

```yaml
billing_errors:
  # Transient errors (retry)
  transient:
    - rate_limit_exceeded
    - timeout
    - 5xx_errors
  retry_policy:
    max_retries: 5
    backoff: exponential
    max_delay: 1_hour
    
  # Permanent errors (alert)
  permanent:
    - invalid_subscription
    - invalid_price
    - duplicate_usage_record
  action: alert_billing_team, queue_for_manual_review
```

## Billing Reconciliation

```yaml
reconciliation:
  schedule: weekly
  
  checks:
    - Compare internal usage totals with billing provider records
    - Verify all tenants have corresponding subscriptions
    - Check for orphaned usage records
    - Verify pricing version consistency
    
  discrepancy_threshold: 1%  # Alert if difference > 1%
  
  resolution:
    - Generate discrepancy report
    - Create adjustment records
    - Apply credits/charges as needed
```

## Tenant Billing Portal Data

```yaml
portal_data:
  # Data exposed to tenant users
  current_usage:
    - Resource type and quantity
    - Included vs used
    - Projected month-end
    
  historical_usage:
    - Daily breakdown
    - Cost trends
    - Comparison with previous periods
    
  # Real-time updates
  refresh_interval: 5_minutes
```
