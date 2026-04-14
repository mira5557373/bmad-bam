---
name: rate-limit-config-template
description: Template for documenting rate limiting configuration with per-tenant tier quotas
category: tenant-isolation
version: "1.0.0"
---

# Rate Limit Configuration Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Module** | {{module_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents the rate limiting configuration for multi-tenant platforms, defining request quotas, token budgets, and throttling strategies per tenant tier.

## Rate Limit Architecture

### Rate Limit Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                        Request Flow                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Global    │  │   Tenant    │  │   User      │             │
│  │   Limits    │  │   Limits    │  │   Limits    │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         ▼                ▼                ▼                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Rate Limit Evaluator                        │   │
│  │         (Most restrictive limit applies)                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                               │                                  │
│              ┌────────────────┼────────────────┐                │
│              ▼                ▼                ▼                │
│         [ALLOW]          [THROTTLE]         [REJECT]            │
└─────────────────────────────────────────────────────────────────┘
```

## Tier-Based Limits

### Request Rate Limits

| Tier | Requests/Second | Requests/Minute | Requests/Day | Burst |
|------|-----------------|-----------------|--------------|-------|
| Free | 1 | 30 | 1,000 | 5 |
| Pro | 10 | 300 | 50,000 | 20 |
| Enterprise | 100 | 3,000 | Unlimited | 200 |

### AI/Token Limits

| Tier | Tokens/Request | Tokens/Minute | Tokens/Day | Models |
|------|----------------|---------------|------------|--------|
| Free | 4,000 | 10,000 | 100,000 | Basic |
| Pro | 16,000 | 100,000 | 5,000,000 | Standard |
| Enterprise | 128,000 | 1,000,000 | Unlimited | All |

### Concurrent Limits

| Tier | Concurrent Requests | Concurrent Agents | Concurrent Sessions |
|------|--------------------|--------------------|---------------------|
| Free | 2 | 1 | 5 |
| Pro | 20 | 5 | 50 |
| Enterprise | 200 | 50 | 500 |

## Rate Limit Configuration

### Global Configuration

```yaml
rate_limits:
  global:
    enabled: true
    storage: redis
    key_prefix: "rl:"
    
  algorithms:
    default: sliding_window
    options:
      - fixed_window
      - sliding_window
      - token_bucket
      - leaky_bucket
```

### Tenant Configuration

```yaml
tenant_limits:
  tenant_{{tenant_id}}:
    tier: {{free|pro|enterprise}}
    
    requests:
      per_second: {{rps}}
      per_minute: {{rpm}}
      per_day: {{rpd}}
      burst: {{burst}}
      
    tokens:
      per_request: {{max_tokens_request}}
      per_minute: {{tpm}}
      per_day: {{tpd}}
      
    concurrent:
      requests: {{concurrent_requests}}
      agents: {{concurrent_agents}}
      sessions: {{concurrent_sessions}}
      
    overrides:
      endpoints:
        /api/v1/chat:
          per_minute: {{chat_rpm}}
        /api/v1/embed:
          per_minute: {{embed_rpm}}
```

### Endpoint-Specific Limits

| Endpoint | Free RPM | Pro RPM | Enterprise RPM | Cost Weight |
|----------|----------|---------|----------------|-------------|
| `/api/v1/chat` | 10 | 60 | 300 | 10 |
| `/api/v1/embed` | 30 | 300 | 1,500 | 1 |
| `/api/v1/search` | 20 | 120 | 600 | 5 |
| `/api/v1/agents/run` | 5 | 30 | 150 | 20 |

## Rate Limit Keys

### Key Structure

```
Format: rl:{scope}:{tenant_id}:{identifier}:{window}

Examples:
- rl:tenant:t123::minute          # Tenant-level per minute
- rl:user:t123:u456:second        # User-level per second
- rl:endpoint:t123:/chat:minute   # Endpoint-level per minute
- rl:agent:t123:a789:day          # Agent-level per day
```

### Key Generation Logic

```typescript
interface RateLimitKey {
  scope: 'global' | 'tenant' | 'user' | 'endpoint' | 'agent';
  tenantId: string;
  identifier?: string;  // userId, endpoint path, agentId
  window: 'second' | 'minute' | 'hour' | 'day';
}

function buildKey(config: RateLimitKey): string {
  const parts = ['rl', config.scope, config.tenantId];
  if (config.identifier) parts.push(config.identifier);
  parts.push(config.window);
  return parts.join(':');
}
```

## Throttling Behavior

### Throttle Responses

| Scenario | HTTP Status | Retry-After | Body |
|----------|-------------|-------------|------|
| Rate exceeded | 429 | Seconds until reset | `{"error": "rate_limit_exceeded"}` |
| Quota exhausted | 429 | Seconds until reset | `{"error": "quota_exhausted"}` |
| Concurrent limit | 503 | 5 | `{"error": "too_many_concurrent"}` |

### Backoff Strategy

```yaml
backoff:
  initial_delay_ms: 100
  max_delay_ms: 10000
  multiplier: 2
  jitter: true
  
  client_hints:
    x-ratelimit-limit: {{limit}}
    x-ratelimit-remaining: {{remaining}}
    x-ratelimit-reset: {{reset_timestamp}}
    retry-after: {{seconds}}
```

## Fair Queuing

### Priority Levels

| Priority | Queue Weight | Max Wait | Use Case |
|----------|--------------|----------|----------|
| Critical | 10 | 100ms | Health checks |
| High | 5 | 1s | Enterprise |
| Normal | 2 | 5s | Pro |
| Low | 1 | 30s | Free |

### Queue Configuration

```yaml
fair_queuing:
  enabled: true
  
  queues:
    critical:
      weight: 10
      max_size: 100
      timeout_ms: 100
      
    tenant_{{tier}}:
      weight: {{weight}}
      max_size: {{max_size}}
      timeout_ms: {{timeout}}
```

## Monitoring

### Rate Limit Metrics

| Metric | Description | Labels |
|--------|-------------|--------|
| `ratelimit_requests_total` | Total requests | tenant_id, status |
| `ratelimit_limited_total` | Limited requests | tenant_id, reason |
| `ratelimit_remaining` | Remaining quota | tenant_id, window |
| `ratelimit_wait_seconds` | Queue wait time | tenant_id, priority |

### Alerts

| Alert | Condition | Action |
|-------|-----------|--------|
| High limit rate | > 10% requests limited | Investigate tenant |
| Quota exhaustion | Remaining < 10% | Notify tenant |
| Queue backup | Wait time > 10s | Scale resources |

## Verification Checklist

- [ ] All tiers have defined limits
- [ ] Tenant isolation in rate limit keys
- [ ] Throttle responses include retry hints
- [ ] Fair queuing configured
- [ ] Monitoring metrics exported
- [ ] Alerts configured
- [ ] Override mechanism documented
- [ ] Burst handling tested

## Web Research Queries

- Search: "multi-tenant rate limiting patterns {date}"
- Search: "API rate limiting best practices {date}"
- Search: "token bucket vs sliding window {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
