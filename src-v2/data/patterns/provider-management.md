# Provider Management - BAM Pattern

**Loaded by:** ZAL  
**Applies to:** Multi-provider LLM orchestration, quota management, cost optimization

---

## When to Use

- Managing multiple LLM provider quotas (OpenAI, Anthropic, Azure, etc.)
- Intelligent routing based on cost, latency, and availability
- Cost optimization across provider tiers
- High availability requirements with provider failover
- Workload distribution to avoid rate limits
- Budget enforcement per tenant or project

## When NOT to Use

- Single provider deployments with no failover needs
- Fixed provider requirements (contractual or compliance)
- Cost-insensitive applications with unlimited budgets
- Prototype/development environments
- Applications with deterministic provider selection

## Architecture

### Provider Quota Management

Track and manage quotas across LLM providers:

| Provider | Quota Type | Limit | Reset Period | Overage Handling |
|----------|------------|-------|--------------|------------------|
| OpenAI | Tokens/minute | 90,000 | 1 minute | Queue or failover |
| OpenAI | Requests/minute | 3,500 | 1 minute | Queue or failover |
| OpenAI | Tokens/day | 1,000,000 | 24 hours | Failover to secondary |
| Anthropic | Tokens/minute | 100,000 | 1 minute | Queue or failover |
| Anthropic | Requests/minute | 4,000 | 1 minute | Queue or failover |
| Azure OpenAI | Tokens/minute | Varies by PTU | 1 minute | Scale PTU or failover |
| Azure OpenAI | Requests/minute | Varies by deployment | 1 minute | Load balance deployments |

### Quota Tracking Schema

```yaml
provider_quotas:
  providers:
    openai:
      api_key_ref: "secrets/openai-api-key"
      quotas:
        tokens_per_minute:
          limit: 90000
          current: 0
          reset_at: "2026-04-28T10:31:00Z"
        requests_per_minute:
          limit: 3500
          current: 0
          reset_at: "2026-04-28T10:31:00Z"
        tokens_per_day:
          limit: 1000000
          current: 245000
          reset_at: "2026-04-29T00:00:00Z"
      models:
        - gpt-4o
        - gpt-4o-mini
        - gpt-4-turbo
      health_status: "healthy"
      last_error: null
      
    anthropic:
      api_key_ref: "secrets/anthropic-api-key"
      quotas:
        tokens_per_minute:
          limit: 100000
          current: 0
          reset_at: "2026-04-28T10:31:00Z"
        requests_per_minute:
          limit: 4000
          current: 0
          reset_at: "2026-04-28T10:31:00Z"
      models:
        - claude-sonnet-4-20250514
        - claude-3-5-haiku-20241022
        - claude-opus-4-20250514
      health_status: "healthy"
      last_error: null
      
    azure_openai:
      api_key_ref: "secrets/azure-openai-key"
      endpoint: "https://myorg.openai.azure.com"
      quotas:
        tokens_per_minute:
          limit: 120000  # Based on PTU allocation
          current: 0
          reset_at: "2026-04-28T10:31:00Z"
      deployments:
        - name: "gpt-4o-prod"
          model: "gpt-4o"
          capacity: 50  # PTUs
        - name: "gpt-4o-mini-prod"
          model: "gpt-4o-mini"
          capacity: 100
      health_status: "healthy"
      last_error: null
```

### Intelligent Routing

Route requests to optimal provider based on weighted factors:

| Factor | Weight | Measurement | Optimization Goal |
|--------|--------|-------------|-------------------|
| Cost | 0.4 | USD per 1M tokens | Minimize spend |
| Latency | 0.3 | P95 response time (ms) | Minimize wait |
| Availability | 0.2 | Success rate (%) | Maximize reliability |
| Quota headroom | 0.1 | % remaining capacity | Avoid rate limits |

### Routing Decision Schema

```yaml
routing_decision:
  strategy: "weighted_score"
  weights:
    cost: 0.4
    latency: 0.3
    availability: 0.2
    quota_headroom: 0.1
  
  request_context:
    tenant_id: "tenant_abc123"
    request_type: "chat_completion"
    model_tier: "standard"  # standard | premium | budget
    priority: "normal"  # low | normal | high | critical
    max_latency_ms: 5000
    max_cost_usd: 0.10
    
  provider_scores:
    openai:
      cost_score: 0.7      # Normalized 0-1 (lower cost = higher score)
      latency_score: 0.8   # Normalized 0-1 (lower latency = higher score)
      availability_score: 0.95
      quota_score: 0.6     # 60% headroom remaining
      weighted_total: 0.745
      
    anthropic:
      cost_score: 0.65
      latency_score: 0.85
      availability_score: 0.98
      quota_score: 0.8
      weighted_total: 0.783
      
    azure_openai:
      cost_score: 0.8      # PTU pricing advantage
      latency_score: 0.75
      availability_score: 0.99
      quota_score: 0.9
      weighted_total: 0.833
      
  selected_provider: "azure_openai"
  fallback_order: ["anthropic", "openai"]
  decision_reason: "Highest weighted score with best quota headroom"
```

### Routing Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Provider Routing Flow                          │
│                                                                 │
│  ┌──────────┐    ┌──────────────┐    ┌─────────────────────┐   │
│  │  Request │───►│  Collect     │───►│  Calculate Weighted │   │
│  │          │    │  Provider    │    │  Scores             │   │
│  │          │    │  Metrics     │    │                     │   │
│  └──────────┘    └──────────────┘    └──────────┬──────────┘   │
│                                                  │              │
│                                      ┌───────────▼───────────┐  │
│                                      │   Select Highest      │  │
│                                      │   Scoring Provider    │  │
│                                      └───────────┬───────────┘  │
│                                                  │              │
│              ┌───────────────────────────────────┼──────────┐   │
│              │                                   │          │   │
│        ┌─────▼─────┐                      ┌──────▼──────┐   │   │
│        │  Success  │                      │   Failure   │   │   │
│        │  Return   │                      │   Failover  │   │   │
│        └───────────┘                      └──────┬──────┘   │   │
│                                                  │          │   │
│                                           ┌──────▼──────┐   │   │
│                                           │  Try Next   │───┘   │
│                                           │  Provider   │       │
│                                           └─────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### Cost Optimization Strategies

| Strategy | Description | Savings Potential | Implementation Complexity |
|----------|-------------|-------------------|---------------------------|
| Prompt caching | Cache repeated prompts/prefixes | 50-90% on cached tokens | Low (provider-native) |
| Model tiering | Route simple tasks to cheaper models | 60-80% per request | Medium |
| Batch requests | Use batch API for non-urgent tasks | 50% discount | Medium |
| Off-peak routing | Schedule flexible workloads | 10-30% (Azure reserved) | High |
| Response caching | Cache identical request/responses | 100% on cache hits | Medium |
| Token optimization | Compress prompts, limit outputs | 20-40% per request | Low |

### Cost Optimization Schema

```yaml
cost_optimization:
  strategies:
    prompt_caching:
      enabled: true
      provider_support:
        anthropic: true
        openai: false  # Not yet supported
        azure_openai: false
      cache_ttl_seconds: 300
      
    model_tiering:
      enabled: true
      rules:
        - condition: "task_complexity == 'simple'"
          preferred_model: "gpt-4o-mini"
          fallback_model: "claude-3-5-haiku-20241022"
        - condition: "task_complexity == 'standard'"
          preferred_model: "gpt-4o"
          fallback_model: "claude-sonnet-4-20250514"
        - condition: "task_complexity == 'complex'"
          preferred_model: "claude-opus-4-20250514"
          fallback_model: "gpt-4-turbo"
          
    batch_requests:
      enabled: true
      eligible_request_types:
        - "embedding_generation"
        - "bulk_classification"
        - "scheduled_analysis"
      max_batch_wait_seconds: 300
      min_batch_size: 10
      
    off_peak_routing:
      enabled: true
      off_peak_hours:
        start: "22:00"
        end: "06:00"
        timezone: "UTC"
      preferred_provider: "azure_openai"  # Reserved capacity
      
  budget_controls:
    tenant_daily_limit_usd: 100.00
    tenant_monthly_limit_usd: 2000.00
    alert_threshold_percent: 80
    hard_stop_threshold_percent: 100
```

## Trade-offs

| Approach | Benefit | Cost | When to Use |
|----------|---------|------|-------------|
| Cost-first routing | Lowest spend, predictable costs | Higher latency variance | Budget-constrained, latency-tolerant workloads |
| Latency-first routing | Fastest responses, best UX | Higher costs, more provider calls | Real-time applications, user-facing features |
| Single provider | Simplest implementation, consistent behavior | No failover, vendor lock-in | Contractual requirements, compliance constraints |
| Multi-provider active-active | Maximum availability, load distribution | Complex implementation, state sync | Mission-critical, high-availability requirements |
| Reserved capacity (PTU) | Predictable costs, guaranteed capacity | Upfront commitment, capacity planning | Stable, predictable workloads |

## Web Research Queries

- "LLM provider quota management patterns {date}"
- "multi-provider AI routing strategies {date}"
- "OpenAI Anthropic Azure cost optimization {date}"
- "LLM rate limiting best practices {date}"
- "AI provider failover patterns production {date}"
