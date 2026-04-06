# Step 2: Design Metric Aggregation

Define tenant-aware metric aggregation strategy:

## Metric Categories

### Platform Metrics (Control Plane)
```yaml
platform_metrics:
  - name: platform_tenants_total
    type: gauge
    labels: [status, tier]
    description: Total tenants by status and tier
    
  - name: platform_requests_total
    type: counter
    labels: [tenant_tier, module, status_code]
    description: Total requests by tier and module
```

### Tenant Metrics (Per-Tenant)
```yaml
tenant_metrics:
  - name: tenant_api_requests_total
    type: counter
    labels: [tenant_id, endpoint, status_code]
    description: API requests per tenant
    
  - name: tenant_agent_invocations_total
    type: counter
    labels: [tenant_id, agent_id, outcome]
    description: Agent invocations per tenant
    
  - name: tenant_storage_bytes
    type: gauge
    labels: [tenant_id, storage_type]
    description: Storage usage per tenant
    
  - name: tenant_active_users
    type: gauge
    labels: [tenant_id]
    description: Active users per tenant (rolling window)
```

### Resource Consumption Metrics
```yaml
resource_metrics:
  - name: tenant_llm_tokens_total
    type: counter
    labels: [tenant_id, model, direction]  # direction: input/output
    description: LLM tokens consumed per tenant
    
  - name: tenant_vector_operations_total
    type: counter
    labels: [tenant_id, operation]  # operation: insert/query/delete
    description: Vector store operations per tenant
    
  - name: tenant_compute_seconds_total
    type: counter
    labels: [tenant_id, resource_type]
    description: Compute time per tenant
```

## Aggregation Levels

```
Level 1: Per-request (high cardinality, short retention)
    └── Detailed metrics with full context
    
Level 2: Per-tenant (medium cardinality, medium retention)
    └── Aggregated per tenant_id + time bucket
    
Level 3: Per-tier (low cardinality, long retention)
    └── Aggregated per tenant_tier + time bucket
    
Level 4: Platform (minimal cardinality, longest retention)
    └── Global aggregates for capacity planning
```

## Pre-Aggregation Rules

```yaml
pre_aggregation:
  # Real-time: keep detailed for 1 hour
  realtime:
    granularity: 1_minute
    retention: 1_hour
    dimensions: [tenant_id, all_labels]
    
  # Short-term: aggregate to 5-minute buckets
  short_term:
    granularity: 5_minutes
    retention: 24_hours
    dimensions: [tenant_id, primary_labels]
    
  # Medium-term: aggregate to 1-hour buckets
  medium_term:
    granularity: 1_hour
    retention: 30_days
    dimensions: [tenant_tier, module]
    
  # Long-term: aggregate to daily buckets
  long_term:
    granularity: 1_day
    retention: 1_year
    dimensions: [tenant_tier]
```

## Tenant-Scoped Queries

All metric queries must be scoped to tenant unless explicitly platform-level:

```promql
# Tenant-specific query
rate(tenant_api_requests_total{tenant_id="abc123"}[5m])

# Tier-level aggregation
sum by (tenant_tier) (rate(tenant_api_requests_total[5m]))

# Never expose cross-tenant detailed metrics to tenant users
```
