# Tool Resilience - BAM Pattern

**Loaded by:** ZTR  
**Applies to:** Robust tool execution, external API failures, retry/fallback strategies

---

## When to Use

- External API dependencies with unreliable availability
- Multi-tenant systems requiring fair resource usage
- AI agent workflows with tool chains
- Systems requiring graceful degradation
- Cost-sensitive environments with budget constraints
- High-availability requirements with SLA commitments

## When NOT to Use

- Tools with guaranteed SLA (internal synchronous calls)
- Development/testing environments where failures should surface
- Simple single-tool workflows without alternatives
- Synchronous-only systems where latency is critical
- Prototype applications without production requirements

## Architecture

### Tool Timeout Management

Configure timeouts by tool category to prevent resource exhaustion and provide predictable failure modes.

| Tool Category | Default Timeout | Max Timeout | Rationale |
|---------------|-----------------|-------------|-----------|
| Database query | 5s | 30s | Prevent connection pool exhaustion |
| External API | 10s | 60s | Account for network latency variance |
| LLM call | 30s | 120s | Complex reasoning may require extended time |
| File operation | 5s | 15s | I/O should be fast, long waits indicate issues |
| Search/retrieval | 15s | 45s | Index operations vary by data size |
| Batch processing | 60s | 300s | Large operations need extended windows |

### Timeout Configuration Schema

```yaml
timeout_config:
  # Global defaults
  defaults:
    connect_timeout_ms: 5000
    read_timeout_ms: 30000
    total_timeout_ms: 60000
  
  # Per-category overrides
  categories:
    database:
      connect_timeout_ms: 2000
      read_timeout_ms: 5000
      total_timeout_ms: 30000
      pool_wait_ms: 3000
    
    external_api:
      connect_timeout_ms: 5000
      read_timeout_ms: 10000
      total_timeout_ms: 60000
      dns_timeout_ms: 2000
    
    llm:
      connect_timeout_ms: 5000
      read_timeout_ms: 30000
      total_timeout_ms: 120000
      streaming_chunk_timeout_ms: 10000
    
    file_io:
      connect_timeout_ms: 1000
      read_timeout_ms: 5000
      total_timeout_ms: 15000
  
  # Tenant tier multipliers
  tier_multipliers:
    free: 1.0
    pro: 1.5
    enterprise: 2.0
```

### Tool Fallback Chains

Define ordered fallback sequences to maintain functionality when primary tools fail.

| Use Case | Primary Tool | Fallback 1 | Fallback 2 | Final Fallback |
|----------|--------------|------------|------------|----------------|
| Search | Vector DB | Full-text search | Cached results | Static response |
| LLM inference | Claude Opus | Claude Sonnet | Claude Haiku | Cached template |
| Data fetch | Live API | Read replica | Local cache | Stale data + warning |
| File storage | S3 primary | S3 secondary | Local disk | Error + queue retry |
| Email delivery | Primary SMTP | Backup SMTP | Queue for retry | Log + alert |
| Payment | Primary processor | Backup processor | Queue offline | Reject + notify |

### Fallback Chain Schema

```yaml
fallback_chains:
  search:
    tenant_id: "{{tenant_id}}"
    primary:
      tool: "vector_db_search"
      timeout_ms: 15000
      health_check_interval_ms: 30000
    fallbacks:
      - tool: "fulltext_search"
        timeout_ms: 10000
        condition: "primary_timeout OR primary_error"
      - tool: "cached_results"
        timeout_ms: 1000
        condition: "all_previous_failed"
        max_age_seconds: 3600
      - tool: "static_response"
        timeout_ms: 100
        condition: "all_previous_failed"
        response_template: "search_unavailable"
    circuit_breaker:
      failure_threshold: 5
      recovery_timeout_ms: 30000
  
  llm_inference:
    tenant_id: "{{tenant_id}}"
    primary:
      tool: "claude_opus"
      timeout_ms: 120000
      max_tokens: 4096
    fallbacks:
      - tool: "claude_sonnet"
        timeout_ms: 60000
        max_tokens: 2048
        condition: "primary_timeout OR cost_exceeded"
      - tool: "claude_haiku"
        timeout_ms: 30000
        max_tokens: 1024
        condition: "all_previous_failed"
      - tool: "cached_template"
        timeout_ms: 100
        condition: "all_previous_failed"
        degraded_mode: true
    cost_tracking:
      budget_key: "llm_monthly"
      alert_threshold: 0.8
```

### Retry Budget Engine

Manage retry attempts across different operation types to prevent retry storms while ensuring recovery.

| Operation Type | Max Retries | Initial Delay | Max Delay | Backoff Factor |
|----------------|-------------|---------------|-----------|----------------|
| Tool execution | 10 | 100ms | 30s | 2.0 |
| LLM inference | 5 | 500ms | 60s | 2.5 |
| External API | 20 | 200ms | 120s | 1.5 |
| Database write | 3 | 50ms | 5s | 2.0 |
| File upload | 5 | 1s | 60s | 2.0 |
| Webhook delivery | 15 | 1s | 3600s | 3.0 |

### Retry Budget Schema

```yaml
retry_budget:
  # Global retry pool per tenant
  tenant_pool:
    tenant_id: "{{tenant_id}}"
    window_seconds: 60
    max_retries_per_window: 100
    current_retries: 0
    reset_at: "2026-04-28T10:31:00Z"
  
  # Per-operation-type configuration
  operation_types:
    tool_execution:
      max_retries: 10
      initial_delay_ms: 100
      max_delay_ms: 30000
      backoff_factor: 2.0
      jitter_factor: 0.2
      retryable_errors:
        - "TIMEOUT"
        - "CONNECTION_RESET"
        - "SERVICE_UNAVAILABLE"
    
    llm_inference:
      max_retries: 5
      initial_delay_ms: 500
      max_delay_ms: 60000
      backoff_factor: 2.5
      jitter_factor: 0.3
      retryable_errors:
        - "RATE_LIMITED"
        - "OVERLOADED"
        - "TIMEOUT"
      non_retryable_errors:
        - "INVALID_REQUEST"
        - "CONTENT_POLICY"
    
    external_api:
      max_retries: 20
      initial_delay_ms: 200
      max_delay_ms: 120000
      backoff_factor: 1.5
      jitter_factor: 0.25
      respect_retry_after: true
      retryable_status_codes:
        - 429
        - 500
        - 502
        - 503
        - 504
  
  # Backoff calculation
  # delay = min(max_delay, initial_delay * (backoff_factor ^ attempt)) * (1 + random(-jitter, +jitter))
```

### Tool Budget Guards

Prevent resource exhaustion and cost overruns with configurable budget limits.

| Budget Type | Scope | Default Limit | Alert Threshold | Action on Exceed |
|-------------|-------|---------------|-----------------|------------------|
| Token budget | Per-request | 10,000 tokens | 80% | Truncate + warn |
| Cost budget | Per-tenant/day | $10.00 | 90% | Downgrade tier |
| Call count | Per-tenant/hour | 1,000 calls | 85% | Rate limit |
| Time budget | Per-request | 5 minutes | N/A | Timeout + partial |
| Memory budget | Per-agent | 512 MB | 80% | GC + limit tools |
| Concurrent budget | Per-tenant | 10 parallel | 100% | Queue excess |

### Tool Budget Schema

```yaml
budget_guards:
  tenant_id: "{{tenant_id}}"
  tier: "pro"  # free | pro | enterprise
  
  token_budget:
    per_request:
      limit: 10000
      alert_threshold: 0.8
      action_on_exceed: "truncate_and_warn"
    per_hour:
      limit: 100000
      alert_threshold: 0.9
      action_on_exceed: "rate_limit"
  
  cost_budget:
    per_day:
      limit_usd: 10.00
      alert_threshold: 0.9
      action_on_exceed: "downgrade_to_haiku"
    per_month:
      limit_usd: 250.00
      alert_threshold: 0.8
      action_on_exceed: "notify_admin"
  
  call_count_budget:
    per_minute:
      limit: 60
      action_on_exceed: "rate_limit_429"
    per_hour:
      limit: 1000
      alert_threshold: 0.85
      action_on_exceed: "queue_and_delay"
  
  time_budget:
    per_request:
      limit_seconds: 300
      checkpoint_interval_seconds: 30
      action_on_exceed: "return_partial_with_continuation"
  
  concurrent_budget:
    max_parallel_tools: 10
    max_parallel_agents: 3
    queue_max_depth: 50
    queue_timeout_seconds: 120
```

### Execution Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                    Tool Resilience Execution Flow                     │
│                                                                      │
│  ┌──────────┐    ┌──────────────┐    ┌─────────────────────────┐    │
│  │  Tool    │───►│   Budget     │───►│  Timeout                │    │
│  │  Request │    │   Check      │    │  Configuration          │    │
│  └──────────┘    └──────┬───────┘    └───────────┬─────────────┘    │
│                         │                        │                   │
│                   Budget OK?              Configure timeout          │
│                    │     │                       │                   │
│              ┌─────▼─┐ ┌─▼───────┐              │                   │
│              │  YES  │ │   NO    │              │                   │
│              └───┬───┘ │Degrade/ │              │                   │
│                  │     │ Queue   │              │                   │
│                  │     └─────────┘              │                   │
│                  │                              │                   │
│            ┌─────▼──────────────────────────────▼─────┐             │
│            │           Execute Primary Tool           │             │
│            └──────────────────┬──────────────────────┘             │
│                               │                                     │
│                         Success?                                    │
│                    │          │         │                           │
│              ┌─────▼─┐  ┌─────▼────┐  ┌─▼───────────┐              │
│              │ YES   │  │ TIMEOUT  │  │  ERROR      │              │
│              │Return │  │          │  │             │              │
│              └───────┘  └────┬─────┘  └──────┬──────┘              │
│                              │               │                      │
│                    ┌─────────▼───────────────▼─────────┐            │
│                    │      Retry Budget Available?       │            │
│                    └─────────────────┬─────────────────┘            │
│                                      │                              │
│                          ┌───────────┼───────────┐                  │
│                          │           │           │                  │
│                    ┌─────▼───┐ ┌─────▼───┐ ┌────▼─────┐            │
│                    │ YES:    │ │ NO:     │ │ CIRCUIT  │            │
│                    │ Backoff │ │ Try     │ │ OPEN:    │            │
│                    │ + Retry │ │ Fallback│ │ Fallback │            │
│                    └─────────┘ └─────────┘ └──────────┘            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Strategy | Benefit | Cost | When to Use |
|----------|---------|------|-------------|
| Aggressive retries | Maximizes eventual success rate | Higher latency, resource usage, potential retry storms | Idempotent operations, critical workflows |
| Fast fallback | Low latency, consistent response times | May return degraded results, more infrastructure | User-facing APIs, SLA-bound services |
| Strict budget guards | Cost predictability, fair multi-tenant usage | May reject valid requests, requires quota management | Cost-sensitive, shared infrastructure |
| Circuit breaker | Prevents cascade failures, fast failure detection | Temporary service unavailability, state management | External dependencies, microservices |
| Adaptive timeouts | Balances responsiveness with completion | Complexity, may timeout during legitimate slow ops | Variable workloads, multi-tier systems |

## Web Research Queries

- "tool retry patterns distributed systems {date}"
- "circuit breaker fallback chain best practices {date}"
- "API timeout configuration multi-tenant SaaS {date}"
- "retry budget management microservices {date}"
- "graceful degradation patterns cloud applications {date}"
- "exponential backoff jitter implementation {date}"
