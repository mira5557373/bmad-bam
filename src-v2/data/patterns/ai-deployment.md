---
pattern_id: ai-deployment
shortcode: ZDP
category: ai-ops
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-29
---

# AI Deployment - BAM Pattern

**Loaded by:** ZDP  
**Applies to:** AI agent production deployment, version management, gradual rollouts

---

## When to Use

- Deploying AI agents to production environments
- Managing prompt/model version rollbacks
- Gradual rollout of new AI capabilities
- Cold start latency optimization for AI models
- Feature flag control of AI behavior
- A/B testing AI agent variations
- Multi-region AI deployments

## When NOT to Use

- Local development environments only
- Single-use batch processing agents
- Prototypes without version requirements
- Static AI configurations that never change
- Non-production experimentation

## Architecture

### Prompt Rollback Automation

AI agents rely on multiple versioned components that must be rolled back atomically when issues occur.

#### Versioned Components

| Component | Version Strategy | Storage | Rollback Granularity |
|-----------|------------------|---------|---------------------|
| System prompts | Semantic versioning | Git + DB | Per-tenant or global |
| Few-shot examples | Content hash | Blob storage | Per-model or global |
| Tool schemas | Schema version | Registry | Per-agent or global |
| Model configuration | Config hash | Parameter store | Per-deployment |
| Guardrails/filters | Rule version | Policy store | Per-tenant tier |

#### Rollback Triggers

| Trigger | Detection Method | Auto-Rollback | Manual Review |
|---------|------------------|---------------|---------------|
| Error rate spike | > 5% increase over baseline | Yes (immediate) | Post-mortem required |
| Latency increase | P95 > 2x baseline | Yes (if > 3min) | Alert only if < 3min |
| User feedback | Negative sentiment > 15% | No | Dashboard alert |
| Cost spike | > 150% of hourly baseline | Yes (with budget cap) | Finance notification |
| Safety violation | Any guardrail trigger | Yes (immediate) | Incident review |
| Confidence drop | Avg confidence < 0.7 | No | Alert + investigation |

#### Rollback Configuration

```yaml
rollback_automation:
  version_tracking:
    prompt_versions:
      storage: "git"
      retention_days: 90
      max_versions: 50
    few_shot_examples:
      storage: "s3"
      content_hash: "sha256"
      retention_days: 180
    tool_schemas:
      storage: "schema_registry"
      compatibility_check: "backward"
  
  triggers:
    error_rate:
      threshold_percent: 5
      window_minutes: 5
      auto_rollback: true
    latency_p95:
      threshold_multiplier: 2.0
      sustained_minutes: 3
      auto_rollback: true
    cost_hourly:
      threshold_multiplier: 1.5
      auto_rollback: true
      notify: ["finance@company.com"]
    safety_violation:
      any_trigger: true
      auto_rollback: true
      escalate: ["security@company.com"]
  
  rollback_strategy:
    type: "atomic"  # atomic | component | gradual
    verification_timeout_ms: 30000
    health_check_interval_ms: 5000
    rollback_on_verification_failure: true
```

### Model Warm-up Patterns

Cold starts significantly impact AI agent response times. Warm-up strategies ensure models are ready for traffic.

#### Warm-up Strategies

| Strategy | Use Case | Resource Cost | Latency Reduction |
|----------|----------|---------------|-------------------|
| Periodic ping | Consistent traffic | Low | Moderate (prevents cold) |
| Traffic prediction | Variable load | Medium | High (proactive scaling) |
| Geographic distribution | Global users | High | Very high (edge proximity) |
| Replica pooling | High availability | Medium-High | High (pre-warmed pool) |

#### Warm-up Configuration

```yaml
model_warmup:
  # Strategy 1: Periodic health pings
  periodic_ping:
    enabled: true
    interval_seconds: 30
    timeout_ms: 5000
    payload:
      prompt: "Health check - respond with 'OK'"
      max_tokens: 5
    failure_threshold: 3
    alert_on_failure: true
  
  # Strategy 2: Traffic-based prediction
  traffic_prediction:
    enabled: true
    historical_window_hours: 168  # 1 week
    prediction_horizon_minutes: 15
    scale_up_threshold: 0.7  # 70% predicted capacity
    scale_down_threshold: 0.3
    min_replicas: 2
    max_replicas: 20
  
  # Strategy 3: Geographic distribution
  geographic_distribution:
    enabled: true
    regions:
      - region: "us-east-1"
        min_replicas: 3
        priority: primary
      - region: "eu-west-1"
        min_replicas: 2
        priority: secondary
      - region: "ap-southeast-1"
        min_replicas: 1
        priority: tertiary
    latency_routing: true
    failover_enabled: true
  
  # Strategy 4: Replica pooling
  replica_pool:
    enabled: true
    pool_size: 5
    preload_prompts:
      - "Initialize system context"
      - "Load tool definitions"
    refresh_interval_minutes: 60
    health_check_enabled: true
```

### Model Feature Flags

Feature flags enable safe, gradual rollout of AI capabilities and instant rollback without deployment.

#### Common Feature Flags

| Flag Name | Type | Default | Purpose |
|-----------|------|---------|---------|
| `use_gpt4_turbo` | Boolean | false | Switch between model versions |
| `max_tool_calls` | Integer | 5 | Limit agent tool invocations |
| `enable_streaming` | Boolean | true | Toggle streaming responses |
| `temperature_override` | Float | null | Override default temperature |
| `enable_caching` | Boolean | true | Toggle prompt caching |
| `max_context_tokens` | Integer | 128000 | Limit context window usage |
| `enable_thinking` | Boolean | false | Toggle extended thinking mode |
| `tool_timeout_ms` | Integer | 30000 | Tool execution timeout |

#### Feature Flag Schema

```yaml
feature_flags:
  # Flag definition
  flags:
    use_gpt4_turbo:
      type: boolean
      default: false
      description: "Enable GPT-4 Turbo model"
      owner: "ai-platform"
      
    max_tool_calls:
      type: integer
      default: 5
      min: 1
      max: 20
      description: "Maximum tool calls per request"
      owner: "ai-platform"
      
    enable_streaming:
      type: boolean
      default: true
      description: "Enable streaming responses"
      owner: "ai-platform"
      
    temperature_override:
      type: float
      default: null
      min: 0.0
      max: 2.0
      description: "Override model temperature"
      owner: "ai-platform"
  
  # Targeting rules
  rules:
    - flag: "use_gpt4_turbo"
      conditions:
        - attribute: "tenant_tier"
          operator: "in"
          values: ["enterprise", "pro"]
        - attribute: "region"
          operator: "equals"
          value: "us-east-1"
      variation: true
      
    - flag: "max_tool_calls"
      conditions:
        - attribute: "tenant_tier"
          operator: "equals"
          value: "enterprise"
      variation: 15
  
  # Gradual rollout
  rollout:
    use_gpt4_turbo:
      strategy: "percentage"
      stages:
        - percent: 5
          duration_hours: 24
          success_criteria:
            error_rate_max: 0.02
            latency_p95_max_ms: 2000
        - percent: 25
          duration_hours: 48
          success_criteria:
            error_rate_max: 0.02
            latency_p95_max_ms: 2000
        - percent: 100
          duration_hours: null  # Final stage
      auto_rollback:
        enabled: true
        trigger: "success_criteria_failure"
```

### Deployment Pipeline Integration

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AI Deployment Pipeline                            │
│                                                                     │
│  ┌──────────┐    ┌──────────────┐    ┌─────────────────┐           │
│  │  Commit  │───►│  Version     │───►│  Feature Flag   │           │
│  │  Change  │    │  Registry    │    │  Configuration  │           │
│  └──────────┘    └──────────────┘    └────────┬────────┘           │
│                                               │                     │
│                         ┌─────────────────────┴───────────┐         │
│                         │                                 │         │
│                   ┌─────▼─────┐                    ┌──────▼──────┐  │
│                   │  Canary   │                    │  Warm-up    │  │
│                   │  Deploy   │                    │  Replicas   │  │
│                   └─────┬─────┘                    └──────┬──────┘  │
│                         │                                 │         │
│                   ┌─────▼─────────────────────────────────▼─────┐   │
│                   │            Health Monitoring                │   │
│                   │  (Error rate, Latency, Cost, Confidence)   │   │
│                   └─────────────────────┬───────────────────────┘   │
│                                         │                           │
│              ┌──────────────────────────┼──────────────────────┐    │
│              │                          │                      │    │
│        ┌─────▼─────┐             ┌──────▼──────┐        ┌──────▼──┐│
│        │  Success  │             │  Gradual    │        │ Rollback││
│        │  100%     │             │  Increase   │        │ Trigger ││
│        └───────────┘             └─────────────┘        └─────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Benefit | Cost | When to Use |
|----------|---------|------|-------------|
| Auto-rollback | Instant recovery, minimal user impact | May rollback prematurely on false positives | High-traffic production, critical paths |
| Manual rollback | Human judgment, contextual decisions | Slower response, requires on-call | Low-traffic, complex failure modes |
| A/B testing | Data-driven decisions, gradual learning | Longer rollout time, split traffic complexity | New features, uncertain impact |
| Feature flags | Instant toggle, no deployment needed | Configuration sprawl, flag cleanup burden | Frequent changes, multi-tenant variations |
| Canary deploy | Early detection, limited blast radius | Requires traffic splitting infrastructure | Major version upgrades, risky changes |
| Blue-green | Zero-downtime, easy rollback | Double infrastructure cost during deploy | Enterprise SLA requirements |

## Web Research Queries

- "AI model deployment rollback automation {date}"
- "LLM warm-up patterns cold start optimization {date}"
- "feature flags AI agents production systems {date}"
- "canary deployment machine learning models {date}"
- "prompt version management best practices {date}"
- "AI model gradual rollout strategies {date}"
