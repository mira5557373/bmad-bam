---
name: Rate Limiting Template
description: Template for documenting per-tenant rate limiting configuration and throttling strategy
category: architecture
version: 1.0.0
type: "operations"
---

## Purpose

Template for documenting per-tenant rate limiting configuration and throttling strategy

# Rate Limiting Specification

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

## Overview

### 1.1 Purpose

This document specifies the rate limiting strategy for {{project_name}}, ensuring fair API usage across tenants while protecting system resources and maintaining service quality for all users.

### 1.2 Goals

- Protect backend services from overload
- Ensure fair resource distribution across tenants
- Provide predictable API behavior per tier
- Enable graceful degradation under load
- Support burst traffic patterns appropriately

### 1.3 Scope

| Component | Rate Limited | Notes |
|-----------|--------------|-------|
| Public API | Yes | All endpoints |
| Internal API | Conditional | {{internal_api_policy}} |
| Webhooks | Yes | Outbound rate limits |
| Agent Runs | Yes | Per-tenant concurrency |
| File Uploads | Yes | Size and frequency |

---

## Rate Limiting Strategy

### 2.1 Strategy Overview

| Aspect | Configuration |
|--------|---------------|
| Primary Strategy | {{primary_strategy}} |
| Enforcement Point | {{enforcement_point}} |
| Storage Backend | {{rate_limit_storage}} |
| Sync Method | {{sync_method}} |
| Failover Behavior | {{failover_behavior}} |

### 2.2 Rate Limit Scopes

| Scope | Description | Key Format |
|-------|-------------|------------|
| Global | System-wide limits | `global:{resource}` |
| Per-Tenant | Tenant-level limits | `tenant:{tenant_id}:{resource}` |
| Per-User | User-level within tenant | `user:{tenant_id}:{user_id}:{resource}` |
| Per-IP | IP-based limits (public) | `ip:{ip_address}:{resource}` |
| Per-Endpoint | Endpoint-specific | `endpoint:{tenant_id}:{path}` |

### 2.3 Rate Limit Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Global System Limits                      │
│              (Circuit breaker, max capacity)                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Tenant Limits  │ │  Tenant Limits  │ │  Tenant Limits  │
│   (Per Tier)    │ │   (Per Tier)    │ │   (Per Tier)    │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                   │                   │
    ┌────┴────┐         ┌────┴────┐         ┌────┴────┐
    ▼         ▼         ▼         ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
│User A │ │User B │ │User C │ │User D │ │User E │ │User F │
└───────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘
```

---

## Algorithm Selection

### 3.1 Algorithm Comparison Matrix

| Algorithm | Use Case | Pros | Cons | Recommended For |
|-----------|----------|------|------|-----------------|
| Token Bucket | API requests | Allows bursts, smooth rate | Memory per bucket | General API |
| Sliding Window Log | Precise limiting | Accurate, no boundary issues | Higher memory | High-value endpoints |
| Sliding Window Counter | Balanced approach | Low memory, good accuracy | Approximation at edges | Most endpoints |
| Fixed Window | Simple scenarios | Lowest memory | Boundary spike issues | Batch operations |
| Leaky Bucket | Steady output | Smoothest output rate | No burst support | Queue processing |

### 3.2 Algorithm Configuration

#### 3.2.1 Token Bucket (Primary)

| Parameter | Free | Pro | Enterprise |
|-----------|------|-----|------------|
| Bucket Size | {{bucket_size_free}} | {{bucket_size_pro}} | {{bucket_size_enterprise}} |
| Refill Rate (tokens/sec) | {{refill_rate_free}} | {{refill_rate_pro}} | {{refill_rate_enterprise}} |
| Initial Tokens | {{initial_tokens_free}} | {{initial_tokens_pro}} | {{initial_tokens_enterprise}} |
| Max Accumulation | {{max_accumulation_free}} | {{max_accumulation_pro}} | {{max_accumulation_enterprise}} |

#### 3.2.2 Sliding Window (Secondary)

| Parameter | Free | Pro | Enterprise |
|-----------|------|-----|------------|
| Window Size | {{window_size_free}} | {{window_size_pro}} | {{window_size_enterprise}} |
| Max Requests | {{window_max_free}} | {{window_max_pro}} | {{window_max_enterprise}} |
| Precision | {{window_precision_free}} | {{window_precision_pro}} | {{window_precision_enterprise}} |

### 3.3 Algorithm Selection by Endpoint

| Endpoint Category | Algorithm | Rationale |
|-------------------|-----------|-----------|
| Standard API | Token Bucket | Allows legitimate bursts |
| Authentication | Sliding Window Log | Precise for security |
| File Upload | Fixed Window | Predictable quotas |
| Webhooks Outbound | Leaky Bucket | Steady delivery rate |
| Agent Invocation | Token Bucket | Burst then sustained |
| Search/Query | Sliding Window Counter | Balanced approach |

---

## Per-Tier Limits

### 4.1 API Request Limits

| Endpoint Category | Free | Pro | Enterprise | Custom |
|-------------------|------|-----|------------|--------|
| API requests/min | {{api_rpm_free}} | {{api_rpm_pro}} | {{api_rpm_enterprise}} | {{api_rpm_custom}} |
| API requests/hour | {{api_rph_free}} | {{api_rph_pro}} | {{api_rph_enterprise}} | {{api_rph_custom}} |
| API requests/day | {{api_rpd_free}} | {{api_rpd_pro}} | {{api_rpd_enterprise}} | {{api_rpd_custom}} |

### 4.2 Resource-Specific Limits

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| Concurrent connections | {{conn_free}} | {{conn_pro}} | {{conn_enterprise}} |
| Agent runs/hour | {{agent_runs_free}} | {{agent_runs_pro}} | {{agent_runs_enterprise}} |
| File uploads/hour | {{uploads_free}} | {{uploads_pro}} | {{uploads_enterprise}} |
| Max upload size (MB) | {{upload_size_free}} | {{upload_size_pro}} | {{upload_size_enterprise}} |
| Webhook deliveries/min | {{webhook_free}} | {{webhook_pro}} | {{webhook_enterprise}} |
| Search queries/min | {{search_free}} | {{search_pro}} | {{search_enterprise}} |
| Export requests/day | {{export_free}} | {{export_pro}} | {{export_enterprise}} |

### 4.3 AI/LLM Specific Limits

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| LLM tokens/min | {{llm_tpm_free}} | {{llm_tpm_pro}} | {{llm_tpm_enterprise}} |
| LLM requests/min | {{llm_rpm_free}} | {{llm_rpm_pro}} | {{llm_rpm_enterprise}} |
| Embedding requests/min | {{embed_rpm_free}} | {{embed_rpm_pro}} | {{embed_rpm_enterprise}} |
| Vector queries/min | {{vector_rpm_free}} | {{vector_rpm_pro}} | {{vector_rpm_enterprise}} |
| Agent concurrent runs | {{agent_concurrent_free}} | {{agent_concurrent_pro}} | {{agent_concurrent_enterprise}} |

### 4.4 Endpoint-Specific Overrides

| Endpoint Pattern | Limit | Applies To | Rationale |
|------------------|-------|------------|-----------|
| `/api/auth/*` | {{auth_limit}}/min | All tiers | Security protection |
| `/api/admin/*` | {{admin_limit}}/min | Enterprise | Admin operations |
| `/api/export/*` | {{export_limit}}/hour | All tiers | Resource intensive |
| `/api/import/*` | {{import_limit}}/hour | All tiers | Resource intensive |
| `/api/agents/run` | {{agent_run_limit}}/hour | Per tier | AI cost control |
| `/api/search` | {{search_limit}}/min | Per tier | Query protection |

---

## Burst Handling

### 5.1 Burst Configuration

| Parameter | Free | Pro | Enterprise |
|-----------|------|-----|------------|
| Burst Multiplier | {{burst_mult_free}}x | {{burst_mult_pro}}x | {{burst_mult_enterprise}}x |
| Burst Duration (sec) | {{burst_duration_free}} | {{burst_duration_pro}} | {{burst_duration_enterprise}} |
| Cooldown Period (sec) | {{cooldown_free}} | {{cooldown_pro}} | {{cooldown_enterprise}} |
| Max Bursts/Hour | {{max_bursts_free}} | {{max_bursts_pro}} | {{max_bursts_enterprise}} |

### 5.2 Burst Behavior

```
Normal Operation          Burst Active             Cooldown
      │                       │                       │
      ▼                       ▼                       ▼
┌──────────┐           ┌──────────┐           ┌──────────┐
│ 100 req/ │  Spike    │ 200 req/ │  Expires  │  50 req/ │
│   min    │ ──────►   │   min    │ ──────►   │   min    │
│          │  (2x)     │ (burst)  │           │(recovery)│
└──────────┘           └──────────┘           └──────────┘
                                                    │
                                              Cooldown ends
                                                    │
                                                    ▼
                                              ┌──────────┐
                                              │ 100 req/ │
                                              │   min    │
                                              │ (normal) │
                                              └──────────┘
```

### 5.3 Burst Eligibility

| Condition | Eligible | Notes |
|-----------|----------|-------|
| Account in good standing | Yes | No payment issues |
| Previous burst < {{burst_gap_hours}} hours ago | Yes | Sufficient gap |
| Current usage < 80% of quota | Yes | Headroom available |
| Flagged for abuse | No | Manual review needed |
| Trial account | No | Upgrade required |

---

## Response Headers

### 6.1 Standard Rate Limit Headers

| Header | Description | Example |
|--------|-------------|---------|
| `X-RateLimit-Limit` | Max requests in window | `1000` |
| `X-RateLimit-Remaining` | Requests remaining | `750` |
| `X-RateLimit-Reset` | Unix timestamp of reset | `1699900800` |
| `X-RateLimit-Window` | Window size in seconds | `60` |
| `X-RateLimit-Policy` | Applied policy name | `standard-pro` |

### 6.2 Extended Headers (When Approaching Limits)

| Header | Description | Condition |
|--------|-------------|-----------|
| `X-RateLimit-Warning` | Warning message | Remaining < 20% |
| `X-RateLimit-Burst-Available` | Burst tokens available | Always |
| `X-RateLimit-Burst-Resets` | When burst refills | If burst used |
| `X-RateLimit-Tier` | Current tenant tier | Always |
| `X-RateLimit-Upgrade-URL` | Upgrade path | When limited |

### 6.3 Retry Headers (On 429 Response)

| Header | Description | Example |
|--------|-------------|---------|
| `Retry-After` | Seconds until retry | `30` |
| `X-RateLimit-Scope` | Which limit was hit | `tenant:api:minute` |
| `X-RateLimit-Contact` | Support contact | `support@{{domain}}` |

### 6.4 Response Header Configuration

```yaml
rate_limit_headers:
  enabled: true
  include_policy: {{include_policy_header}}
  include_tier: {{include_tier_header}}
  include_upgrade_url: {{include_upgrade_url}}
  warning_threshold_percent: {{warning_threshold}}
  
  custom_headers:
    - name: "{{custom_header_1_name}}"
      value: "{{custom_header_1_value}}"
    - name: "{{custom_header_2_name}}"
      value: "{{custom_header_2_value}}"
```

---

## Throttle Response Format

### 7.1 Standard 429 Response

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded for {{limit_type}}",
    "details": {
      "tenant_id": "{{tenant_id}}",
      "limit_scope": "{{limit_scope}}",
      "limit": {{limit_value}},
      "current": {{current_value}},
      "window_seconds": {{window_seconds}},
      "reset_at": "{{reset_timestamp}}",
      "retry_after_seconds": {{retry_seconds}}
    },
    "resolution": {
      "wait": "Retry after {{retry_seconds}} seconds",
      "upgrade": "{{upgrade_url}}",
      "documentation": "{{docs_url}}/rate-limits"
    }
  }
}
```

### 7.2 Graceful Degradation Response

```json
{
  "data": {{partial_response}},
  "meta": {
    "rate_limited": true,
    "degraded_mode": "{{degradation_mode}}",
    "full_results_available_at": "{{reset_timestamp}}",
    "current_limit_percent": {{usage_percent}}
  },
  "warnings": [
    {
      "code": "APPROACHING_RATE_LIMIT",
      "message": "{{usage_percent}}% of rate limit consumed",
      "recommendation": "Reduce request frequency or upgrade tier"
    }
  ]
}
```

---

## Monitoring

### 8.1 Key Metrics

| Metric Name | Type | Labels | Description |
|-------------|------|--------|-------------|
| `rate_limit_requests_total` | Counter | tenant_id, tier, endpoint, status | Total requests by status |
| `rate_limit_throttled_total` | Counter | tenant_id, tier, scope | Throttled request count |
| `rate_limit_remaining_ratio` | Gauge | tenant_id, scope | Remaining quota ratio |
| `rate_limit_latency_seconds` | Histogram | tenant_id, operation | Rate check latency |
| `rate_limit_burst_usage` | Gauge | tenant_id | Current burst utilization |

### 8.2 Dashboard Panels

| Panel | Visualization | Purpose |
|-------|---------------|---------|
| Throttle Rate by Tenant | Time series | Identify heavy users |
| Limit Utilization Heat Map | Heat map | Spot patterns |
| Burst Usage Trend | Line chart | Burst consumption |
| Top Throttled Endpoints | Bar chart | Problem areas |
| Rate Limit Storage Health | Gauge | Infrastructure health |

### 8.3 Alert Rules

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| High Throttle Rate | Throttle rate > {{throttle_alert_threshold}}% | Warning | Investigate tenant |
| Limit Storage Degraded | Latency > {{storage_latency_threshold}}ms | Critical | Check Redis/storage |
| Burst Abuse Detected | Bursts > {{burst_abuse_threshold}}/hour | Warning | Review tenant |
| Global Limit Approaching | Global usage > {{global_threshold}}% | Critical | Scale infrastructure |
| Sync Lag Detected | Replica lag > {{sync_lag_threshold}}s | Warning | Check replication |

### 8.4 Prometheus Rules

```yaml
groups:
  - name: rate_limiting
    rules:
      - alert: HighTenantThrottleRate
        expr: |
          rate(rate_limit_throttled_total[5m]) 
          / rate(rate_limit_requests_total[5m]) > {{throttle_ratio_threshold}}
        for: {{alert_duration}}
        labels:
          severity: warning
        annotations:
          summary: "High throttle rate for tenant {{ $labels.tenant_id }}"
          
      - alert: RateLimitStorageLatency
        expr: |
          histogram_quantile(0.99, rate(rate_limit_latency_seconds_bucket[5m])) 
          > {{latency_threshold_seconds}}
        for: {{alert_duration}}
        labels:
          severity: critical
        annotations:
          summary: "Rate limit storage latency exceeded threshold"
```

---

## Implementation Architecture

### 9.1 Distributed Rate Limiting

```
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway Layer                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │Gateway 1│  │Gateway 2│  │Gateway 3│  │Gateway N│        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
│       └────────────┴─────┬──────┴────────────┘              │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Rate Limit Storage (Redis Cluster)              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Primary   │◄─┤   Replica   │◄─┤   Replica   │         │
│  │    Node     │  │    Node     │  │    Node     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Rate Limit Check Flow

```
Request Arrives
      │
      ▼
┌─────────────┐
│Extract Keys │ ─► tenant_id, user_id, ip, endpoint
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│ Check Local │ ──► │Local Cache  │ (Hot tenant optimization)
│   Cache     │     │  (LRU)      │
└──────┬──────┘     └─────────────┘
       │ Miss
       ▼
┌─────────────┐     ┌─────────────┐
│Check Redis  │ ──► │Rate Counter │
│  Counter    │     │  Storage    │
└──────┬──────┘     └─────────────┘
       │
       ▼
┌─────────────┐
│ Evaluate    │
│  Limits     │
└──────┬──────┘
       │
   ┌───┴───┐
   │       │
   ▼       ▼
[Allow] [Throttle]
   │       │
   ▼       ▼
Process  Return
Request   429
```

### 9.3 Configuration Schema

```yaml
rate_limiting:
  enabled: {{rate_limiting_enabled}}
  storage:
    type: {{storage_type}}
    connection: {{storage_connection}}
    pool_size: {{storage_pool_size}}
    timeout_ms: {{storage_timeout_ms}}
    
  local_cache:
    enabled: {{local_cache_enabled}}
    ttl_seconds: {{local_cache_ttl}}
    max_entries: {{local_cache_max}}
    
  failover:
    behavior: {{failover_behavior}}
    local_limit: {{failover_local_limit}}
    
  defaults:
    algorithm: {{default_algorithm}}
    window_seconds: {{default_window}}
    sync_interval_ms: {{sync_interval}}
```

---

## Testing Requirements

### 10.1 Unit Tests

| Test Case | Description | Pass Criteria |
|-----------|-------------|---------------|
| Token bucket refill | Verify refill rate | Tokens refill at configured rate |
| Sliding window accuracy | Check boundary behavior | No boundary spikes |
| Burst activation | Verify burst triggers | Burst activates at threshold |
| Header generation | Check all headers present | All required headers included |
| Storage failover | Simulate storage failure | Graceful degradation |

### 10.2 Integration Tests

| Test Case | Description | Pass Criteria |
|-----------|-------------|---------------|
| Multi-gateway consistency | Same tenant across gateways | Consistent limits enforced |
| Tier enforcement | Different tiers, same endpoint | Correct limits per tier |
| Burst across requests | Rapid burst, then normal | Burst granted, then normal rate |
| Graceful degradation | Storage failure simulation | Service continues |
| Header accuracy | Verify header values | Headers match actual state |

### 10.3 Load Tests

| Scenario | Target | Success Criteria |
|----------|--------|------------------|
| Sustained load | {{sustained_load_rps}} RPS | < {{latency_target_ms}}ms p99 |
| Burst spike | {{burst_spike_rps}} RPS (10s) | Graceful throttling |
| Multi-tenant load | {{multi_tenant_count}} tenants | Fair distribution |
| Storage failure | Primary down | Failover < {{failover_time_ms}}ms |

---

## Implementation Checklist

### 11.1 Core Implementation

- [ ] Rate limit algorithm implemented ({{primary_algorithm}})
- [ ] Storage backend configured ({{storage_type}})
- [ ] Per-tier limits configured
- [ ] Response headers implemented
- [ ] 429 response format standardized

### 11.2 Advanced Features

- [ ] Burst handling implemented
- [ ] Graceful degradation configured
- [ ] Local cache for hot tenants
- [ ] Distributed coordination tested
- [ ] Failover behavior verified

### 11.3 Monitoring & Operations

- [ ] Metrics exposed to Prometheus
- [ ] Dashboards created
- [ ] Alert rules configured
- [ ] Runbook documented
- [ ] On-call procedures defined

### 11.4 Testing

- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Load tests passing
- [ ] Chaos tests completed
- [ ] Security review completed

---

## Appendix A: Rate Limit Bypass

### A.1 Bypass Conditions

| Condition | Bypass | Rationale |
|-----------|--------|-----------|
| Health checks | Full | Infrastructure monitoring |
| Internal services | Configurable | Service-to-service |
| Admin operations | Elevated | Emergency access |
| Allowlisted IPs | Configurable | Trusted sources |

### A.2 Bypass Configuration

```yaml
bypass:
  health_endpoints:
    - "/health"
    - "/ready"
    - "/metrics"
  internal_services:
    enabled: {{internal_bypass_enabled}}
    header: "X-Internal-Service"
    secret: "{{internal_service_secret}}"
  allowlist:
    ips: {{allowlisted_ips}}
    tenants: {{allowlisted_tenants}}
```

---

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "rate limiting best practices {date}"
- "API rate limiting multi-tenant SaaS patterns {date}"
- "throttling enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Rate limiting strategy is defined with primary algorithm and enforcement point
- [ ] Rate limit scopes are documented (Global, Per-Tenant, Per-User, Per-IP, Per-Endpoint)
- [ ] Per-tier limits are specified for Free, Pro, and Enterprise tiers
- [ ] Burst handling configuration includes multiplier, duration, and cooldown
- [ ] Response headers are defined for rate limit communication to clients
- [ ] Throttle response format includes actionable resolution information
- [ ] Monitoring metrics and dashboard panels are specified
- [ ] Alert rules are configured for throttle rate and storage health
- [ ] Distributed rate limiting architecture handles multi-gateway consistency
- [ ] Failover behavior is defined for rate limit storage failures
- [ ] Testing requirements cover unit, integration, and load scenarios
- [ ] Tenant isolation is maintained in rate limit tracking and enforcement

---

## Appendix B: Related Documents

- Pattern: `rate-limiting` in `bam-patterns.csv`
- Template: `performance-isolation-template.md`
- Template: `quota-management-template.md`
- Checklist: `production-readiness.md`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
