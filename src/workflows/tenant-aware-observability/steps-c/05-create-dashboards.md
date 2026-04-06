# Step 5: Create Dashboards

Define tenant-aware observability dashboards:

## Dashboard Hierarchy

```
Platform Dashboards (Operators Only)
├── Platform Overview
├── Tenant Health Matrix
├── Capacity Planning
└── Cost Attribution

Tenant Dashboards (Per-Tenant Access)
├── Tenant Overview
├── Agent Performance
├── Usage & Quotas
└── Error Analysis
```

## Platform Overview Dashboard

```yaml
dashboard: platform_overview
access: platform_operators
panels:
  - title: "Active Tenants"
    type: stat
    query: count(tenant_status{status="ACTIVE"})
    
  - title: "Requests by Tier"
    type: timeseries
    query: sum by (tenant_tier) (rate(tenant_api_requests_total[5m]))
    
  - title: "Error Rate by Module"
    type: timeseries
    query: |
      sum by (module) (rate(tenant_api_requests_total{status_code=~"5.."}[5m]))
      / sum by (module) (rate(tenant_api_requests_total[5m]))
      
  - title: "LLM Token Consumption"
    type: timeseries
    query: sum by (model) (rate(tenant_llm_tokens_total[5m]))
    
  - title: "Top Tenants by Request Volume"
    type: table
    query: topk(10, sum by (tenant_id) (rate(tenant_api_requests_total[1h])))
```

## Tenant Health Matrix Dashboard

```yaml
dashboard: tenant_health_matrix
access: platform_operators
panels:
  - title: "Tenant Health Grid"
    type: state_timeline
    query: |
      (
        1 - (sum by (tenant_id) (rate(tenant_api_requests_total{status_code=~"5.."}[5m]))
        / sum by (tenant_id) (rate(tenant_api_requests_total[5m])))
      ) * 100
    thresholds:
      - value: 99
        color: green
      - value: 95
        color: yellow
      - value: 0
        color: red
        
  - title: "Quota Utilization"
    type: gauge
    query: |
      sum by (tenant_id) (tenant_storage_bytes)
      / sum by (tenant_id) (tenant_storage_quota_bytes) * 100
```

## Tenant Overview Dashboard (Per-Tenant)

```yaml
dashboard: tenant_overview
access: tenant_users
variables:
  - name: tenant_id
    type: constant
    value: "${current_user_tenant_id}"  # Auto-set from user context
    
panels:
  - title: "Request Rate"
    type: timeseries
    query: sum(rate(tenant_api_requests_total{tenant_id="$tenant_id"}[5m]))
    
  - title: "Error Rate"
    type: stat
    query: |
      sum(rate(tenant_api_requests_total{tenant_id="$tenant_id",status_code=~"5.."}[5m]))
      / sum(rate(tenant_api_requests_total{tenant_id="$tenant_id"}[5m])) * 100
      
  - title: "Active Users"
    type: stat
    query: tenant_active_users{tenant_id="$tenant_id"}
    
  - title: "Agent Invocations"
    type: timeseries
    query: sum by (agent_id) (rate(tenant_agent_invocations_total{tenant_id="$tenant_id"}[5m]))
    
  - title: "Storage Usage"
    type: gauge
    query: tenant_storage_bytes{tenant_id="$tenant_id"} / tenant_storage_quota_bytes{tenant_id="$tenant_id"} * 100
```

## Agent Performance Dashboard (Per-Tenant)

```yaml
dashboard: agent_performance
access: tenant_users
panels:
  - title: "Agent Success Rate"
    type: stat
    query: |
      sum(rate(tenant_agent_invocations_total{tenant_id="$tenant_id",outcome="success"}[1h]))
      / sum(rate(tenant_agent_invocations_total{tenant_id="$tenant_id"}[1h])) * 100
      
  - title: "Average Response Time"
    type: timeseries
    query: |
      histogram_quantile(0.95, sum by (le) (
        rate(tenant_agent_response_duration_seconds_bucket{tenant_id="$tenant_id"}[5m])
      ))
      
  - title: "Token Usage by Agent"
    type: piechart
    query: sum by (agent_id) (tenant_llm_tokens_total{tenant_id="$tenant_id"})
    
  - title: "Tool Execution Breakdown"
    type: timeseries
    query: sum by (tool_name) (rate(tenant_tool_executions_total{tenant_id="$tenant_id"}[5m]))
```

## Alert Rules

```yaml
alerts:
  platform_level:
    - name: TenantErrorRateHigh
      expr: |
        sum by (tenant_id) (rate(tenant_api_requests_total{status_code=~"5.."}[5m]))
        / sum by (tenant_id) (rate(tenant_api_requests_total[5m])) > 0.05
      for: 5m
      severity: warning
      
    - name: TenantQuotaExceeded
      expr: tenant_storage_bytes / tenant_storage_quota_bytes > 0.95
      for: 1h
      severity: warning
      
  tenant_level:
    - name: AgentFailureRate
      expr: |
        sum(rate(tenant_agent_invocations_total{outcome="failure"}[15m]))
        / sum(rate(tenant_agent_invocations_total[15m])) > 0.1
      for: 15m
      notify: tenant_admin
```

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/observability/tenant-observability-design.md`
- `{output_folder}/planning-artifacts/observability/dashboard-specifications.md`
- `{output_folder}/planning-artifacts/observability/alert-rules.md`
