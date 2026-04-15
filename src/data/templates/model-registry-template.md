---
name: model-registry-template
description: Template for documenting AI/LLM model registry design with tenant-specific access controls
category: ai-runtime
version: "1.0.0"
---

> **Note:** Model names in this template (e.g., gpt-4o, claude-3-sonnet) are examples only.
> Update to current model versions before use. Verify latest models and pricing via provider documentation.

# Model Registry Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Registry** | {{registry_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents the AI/LLM model registry design for managing model configurations, versioning, routing, and tenant-specific model access in a multi-tenant platform.

## Registry Architecture

### Model Registry Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                       Model Registry                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   LLM       │  │  Embedding  │  │  Specialty  │             │
│  │   Models    │  │   Models    │  │   Models    │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         ▼                ▼                ▼                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Model Router / Gateway                      │   │
│  │       (Tenant config, load balancing, fallback)          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Model Definition Schema

### Core Model Schema

```json
{
  "model_id": "{{model_id}}",
  "name": "{{display_name}}",
  "provider": "{{openai|anthropic|google|azure|bedrock|custom}}",
  "version": "{{model_version}}",
  
  "capabilities": {
    "type": "{{chat|completion|embedding|vision|audio}}",
    "context_window": {{context_length}},
    "max_output_tokens": {{max_output}},
    "supports_functions": {{true|false}},
    "supports_vision": {{true|false}},
    "supports_streaming": {{true|false}}
  },
  
  "pricing": {
    "input_cost_per_1k": {{input_cost}},
    "output_cost_per_1k": {{output_cost}},
    "currency": "USD",
    "effective_date": "{{iso8601}}"
  },
  
  "performance": {
    "latency_p50_ms": {{latency_p50}},
    "latency_p99_ms": {{latency_p99}},
    "throughput_tokens_per_sec": {{throughput}},
    "availability_sla": {{availability_pct}}
  },
  
  "access": {
    "tier_minimum": "{{free|pro|enterprise}}",
    "regions": ["{{region_1}}", "{{region_2}}"],
    "rate_limits": {
      "rpm": {{requests_per_minute}},
      "tpm": {{tokens_per_minute}}
    }
  },
  
  "status": {
    "availability": "{{available|deprecated|preview|disabled}}",
    "deprecation_date": "{{iso8601|null}}",
    "sunset_date": "{{iso8601|null}}"
  }
}
```

## Model Catalog

### LLM Models

| Model ID | Provider | Context | Input Cost | Output Cost | Tier |
|----------|----------|---------|------------|-------------|------|
| gpt-4o | OpenAI | 128K | $0.005 | $0.015 | Pro |
| gpt-4o-mini | OpenAI | 128K | $0.00015 | $0.0006 | Free |
| claude-3-opus | Anthropic | 200K | $0.015 | $0.075 | Enterprise |
| claude-3-sonnet | Anthropic | 200K | $0.003 | $0.015 | Pro |
| claude-3-haiku | Anthropic | 200K | $0.00025 | $0.00125 | Free |
| gemini-1.5-pro | Google | 1M | $0.00125 | $0.005 | Pro |

### Embedding Models

| Model ID | Provider | Dimensions | Cost/1K | Tier |
|----------|----------|------------|---------|------|
| text-embedding-3-small | OpenAI | 1536 | $0.00002 | Free |
| text-embedding-3-large | OpenAI | 3072 | $0.00013 | Pro |
| voyage-3 | Voyage | 1024 | $0.00006 | Pro |

## Tenant Model Configuration

### Per-Tenant Settings

```yaml
tenant_models:
  tenant_123:
    default_llm: claude-3-sonnet
    default_embedding: text-embedding-3-small
    
    allowed_models:
      - claude-3-sonnet
      - claude-3-haiku
      - gpt-4o-mini
      
    blocked_models:
      - gpt-4o  # Cost control
      
    custom_models:
      - model_id: tenant_123_finetuned
        base: gpt-4o-mini
        endpoint: "{{custom_endpoint}}"
        
    routing:
      cost_optimization: true
      prefer_region: us-east-1
      fallback_enabled: true
```

### Tier-Based Access

| Tier | LLM Models | Embedding Models | Custom Models |
|------|------------|------------------|---------------|
| Free | 2 (mini/haiku) | 1 | No |
| Pro | 5 | 3 | No |
| Enterprise | All | All | Yes |

## Model Routing

### Routing Strategy

```yaml
routing:
  strategy: cost_optimized  # cost_optimized | performance | balanced
  
  rules:
    - name: simple_queries
      condition: token_count < 100
      route_to: claude-3-haiku
      
    - name: complex_reasoning
      condition: task_type == "reasoning"
      route_to: claude-3-opus
      
    - name: code_generation
      condition: task_type == "code"
      route_to: gpt-4o
      
  fallback:
    enabled: true
    chain:
      - gpt-4o
      - claude-3-sonnet
      - gpt-4o-mini
```

### Load Balancing

```yaml
load_balancing:
  strategy: weighted_round_robin
  
  endpoints:
    claude-3-sonnet:
      - region: us-east-1
        weight: 50
        status: healthy
      - region: eu-west-1
        weight: 30
        status: healthy
      - region: ap-northeast-1
        weight: 20
        status: healthy
        
  health_check:
    interval: 30s
    timeout: 5s
    failure_threshold: 3
```

## Version Management

### Model Versioning

| Version Type | Description | Example |
|--------------|-------------|---------|
| Stable | Production-ready | claude-3-sonnet-20240229 |
| Preview | Beta testing | gpt-4o-2024-08-06-preview |
| Deprecated | End-of-life | gpt-4-0314 |

### Version Pinning

```yaml
version_policy:
  tenant_123:
    pin_versions: true
    pinned:
      claude-3-sonnet: "20240229"
      gpt-4o: "2024-05-13"
      
  default:
    pin_versions: false
    use_latest_stable: true
    
  migration:
    auto_upgrade: false
    notify_on_deprecation: true
    grace_period_days: 90
```

## Cost Management

### Cost Tracking

```typescript
interface ModelUsageEvent {
  model_id: string;
  tenant_id: string;
  user_id: string;
  
  tokens: {
    input: number;
    output: number;
    total: number;
  };
  
  cost: {
    input: number;
    output: number;
    total: number;
  };
  
  timestamp: string;
}
```

### Budget Enforcement

```yaml
budget_enforcement:
  tenant_123:
    monthly_budget: 1000.00
    
    model_limits:
      claude-3-opus:
        daily_spend: 100.00
        blocked_at_limit: true
        
    alerts:
      - at: 50%
        action: notify
      - at: 80%
        action: warn
      - at: 95%
        action: throttle
      - at: 100%
        action: block_premium
```

## Monitoring

### Registry Metrics

| Metric | Description | Alert |
|--------|-------------|-------|
| `model_availability` | Model uptime | < 99.9% |
| `model_latency_p99` | Response time | > SLA |
| `model_error_rate` | Error percentage | > 1% |
| `model_cost_daily` | Daily spend | > budget |

### Model Health

```yaml
health_monitoring:
  models:
    claude-3-sonnet:
      check_interval: 60s
      
      checks:
        - type: ping
          endpoint: /health
        - type: inference
          prompt: "Say hello"
          max_latency_ms: 2000
          
      circuit_breaker:
        failure_threshold: 5
        recovery_timeout: 60s
```

## Verification Checklist

- [ ] All models registered with pricing
- [ ] Tenant access rules configured
- [ ] Routing strategies defined
- [ ] Fallback chains tested
- [ ] Version pinning available
- [ ] Cost tracking operational
- [ ] Health checks running
- [ ] Monitoring dashboards live

## Web Research Queries

- Search: "LLM model registry design patterns {date}"
- Search: "multi-model AI gateway {date}"
- Search: "model routing strategies {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
