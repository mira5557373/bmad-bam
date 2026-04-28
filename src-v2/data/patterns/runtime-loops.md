# Runtime Loops - BAM Pattern

**Loaded by:** ZRL  
**Applies to:** NEXUS 40-Layer Architecture, production-grade orchestration, multi-tenant lifecycle

---

## When to Use

- NEXUS 40-Layer Architecture implementations requiring coordinated loops
- Production-grade AI orchestration with predictable behavior
- Multi-tenant lifecycle management with per-tenant isolation
- Systems requiring continuous adaptation and learning
- Cost-controlled AI deployments with budget enforcement
- High-availability systems with self-healing requirements

## When NOT to Use

- Simple single-shot agent invocations (no state, no learning)
- Prototype or proof-of-concept systems
- Systems without learning or adaptation needs
- Single-tenant deployments with no isolation requirements
- Development/sandbox environments with relaxed constraints

## Architecture

### The 5 Runtime Loops Overview

The NEXUS architecture defines 5 runtime loops that coordinate to provide production-grade AI orchestration:

| Loop | Purpose | Frequency | Tenant Scope |
|------|---------|-----------|--------------|
| **Request** | Handle user-agent interactions | Per-request (<100ms) | Per-request tenant routing |
| **Control** | Manage agent state transitions | Continuous (1-10 Hz) | Per-agent namespace isolation |
| **Learning** | Improve model behavior over time | Scheduled (daily/weekly) | Per-tenant or federated |
| **Economic** | Enforce resource budgets | Real-time (per-action) | Per-tenant budget tracking |
| **Recovery** | Handle failures and rollback | On-demand (event-driven) | Tenant-scoped blast radius |

### Loop Interaction Diagram

```
                    ┌─────────────────────────────────────────────┐
                    │              NEXUS 5 Runtime Loops           │
                    │                                              │
User ──► REQUEST ───┼──► CONTROL ──► Agent Execution              │
  │        │        │       │                 │                    │
  │        │        │       ▼                 │                    │
  │        │        │   ECONOMIC ◄────────────┘                    │
  │        │        │   (Budget Check)                             │
  │        │        │       │                                      │
  │        │        │       ▼                                      │
  │        │        │   Failure? ──YES──► RECOVERY                 │
  │        │        │       │                 │                    │
  │        │        │      NO                 │                    │
  │        │        │       │                 │                    │
  ◄────────┼────────┼───────┘◄────────────────┘                    │
Response  │        │                                               │
          │        │   LEARNING ◄──────── Feedback                 │
          │        │   (Async improvement)                         │
          │        └───────────────────────────────────────────────┘
```

### Request Loop

The Request Loop handles synchronous user-agent interactions with aggressive latency targets.

```yaml
request_loop:
  name: REQUEST
  purpose: Synchronous user-agent interactions
  target_latency_ms: 100
  
  stages:
    validate:
      operations:
        - schema_validation
        - auth_token_verification
        - tenant_context_extraction
      timeout_ms: 10
      
    enrich:
      operations:
        - tenant_tier_lookup
        - feature_flag_evaluation
        - rate_limit_check
      timeout_ms: 15
      
    execute:
      operations:
        - agent_invocation
        - action_contract_enforcement
        - tool_execution
      timeout_ms: 50
      
    finalize:
      operations:
        - response_formatting
        - metrics_emission
        - audit_logging
      timeout_ms: 25
  
  tenant_routing:
    enterprise:
      priority: 1
      dedicated_pool: true
      timeout_multiplier: 2.0
    pro:
      priority: 2
      shared_pool: true
      timeout_multiplier: 1.0
    free:
      priority: 3
      rate_limited: true
      timeout_multiplier: 0.5
  
  metrics:
    - request_latency_p50
    - request_latency_p99
    - error_rate_per_tenant
    - tenant_routing_decisions
```

### Control Loop

The Control Loop manages agent state transitions and workflow orchestration.

```yaml
control_loop:
  name: CONTROL
  purpose: Agent state transitions and workflow management
  frequency_hz: 10
  
  monitors:
    state_health:
      check_interval_ms: 100
      metrics:
        - active_agents_count
        - state_transition_rate
        - checkpoint_lag_ms
        
    workflow_progress:
      check_interval_ms: 500
      metrics:
        - pending_workflows
        - blocked_workflows
        - completion_rate
        
    resource_utilization:
      check_interval_ms: 1000
      metrics:
        - memory_per_agent
        - cpu_per_workflow
        - connection_pool_usage
  
  adjustments:
    scale_agents:
      trigger: active_agents_count > threshold
      action: spawn_additional_workers
      cooldown_sec: 30
      
    checkpoint_frequency:
      trigger: checkpoint_lag_ms > 1000
      action: increase_checkpoint_rate
      cooldown_sec: 60
      
    workflow_timeout:
      trigger: blocked_workflows > 10
      action: timeout_and_cleanup
      cooldown_sec: 120
  
  state_isolation:
    strategy: namespace_prefix
    pattern: "tenant:{tenant_id}:agent:{agent_id}:state:{key}"
    ttl_policy:
      conversation: 3600      # 1 hour
      workflow: 86400         # 24 hours
      checkpoint: 604800      # 7 days
```

### Learning Loop

The Learning Loop enables tenant-aware model improvement without cross-contamination.

```yaml
learning_loop:
  name: LEARNING
  purpose: Tenant-isolated model improvement
  
  schedule:
    prompt_optimization: daily_2am_utc
    few_shot_selection: weekly_sunday
    tool_usage_analysis: monthly_first
    model_evaluation: quarterly
  
  tasks:
    prompt_optimization:
      description: Refine system prompts based on success metrics
      isolation: per_tenant_with_consent
      min_samples: 100
      inputs:
        - successful_completions
        - user_corrections
        - explicit_feedback
      outputs:
        - optimized_prompt_variants
        - a_b_test_assignments
        
    few_shot_selection:
      description: Curate exemplars for in-context learning
      isolation: per_tenant
      min_samples: 50
      inputs:
        - high_quality_interactions
        - domain_specific_examples
      outputs:
        - few_shot_example_sets
        - retrieval_index_updates
        
    tool_usage_analysis:
      description: Optimize tool selection and sequencing
      isolation: federated_with_consent
      min_samples: 500
      inputs:
        - tool_call_sequences
        - success_failure_outcomes
        - latency_measurements
      outputs:
        - tool_ranking_updates
        - sequence_recommendations
  
  deployment:
    strategy: canary
    rollout_percent: [5, 25, 50, 100]
    rollback_trigger: success_rate_drop > 5%
    tenant_opt_out: true
  
  privacy:
    differential_privacy:
      enabled: true
      epsilon: 1.0
      delta: 1e-5
    data_retention:
      raw_feedback: 30_days
      aggregated_metrics: 365_days
      model_artifacts: indefinite
```

### Economic Loop

The Economic Loop enforces per-tenant resource budgets in real-time.

```yaml
economic_loop:
  name: ECONOMIC
  purpose: Real-time budget enforcement
  frequency_hz: 100
  
  tracking:
    token_usage:
      granularity: per_request
      storage: redis_timeseries
      aggregation_windows: [1m, 1h, 1d, 30d]
      
    api_calls:
      granularity: per_request
      storage: redis_counter
      reset_window: 1_minute
      
    compute_time:
      granularity: per_agent_run
      storage: prometheus
      aggregation: sum_per_tenant
      
    storage_usage:
      granularity: daily_snapshot
      storage: postgresql
      growth_tracking: true
  
  actions:
    warn:
      trigger: usage >= 80% of budget
      notification:
        - email_tenant_admin
        - in_app_banner
        - webhook_if_configured
        
    throttle:
      trigger: usage >= 95% of budget
      effect:
        - reduce_priority
        - increase_latency
        - queue_non_critical
        
    block:
      trigger: usage >= 100% of budget
      effect:
        - reject_new_requests
        - allow_admin_access
        - grace_period_5_minutes
        
    alert_billing:
      trigger: projected_overage > $100
      notification:
        - billing_team_slack
        - tenant_account_manager
  
  tier_budgets:
    free:
      tokens_per_day: 10000
      api_calls_per_minute: 10
      storage_mb: 100
      overage_action: block
    pro:
      tokens_per_day: 100000
      api_calls_per_minute: 100
      storage_mb: 10000
      overage_action: throttle
    enterprise:
      tokens_per_day: unlimited
      api_calls_per_minute: 1000
      storage_mb: unlimited
      overage_action: warn
```

### Recovery Loop

The Recovery Loop handles failures and implements tenant-scoped rollback.

```yaml
recovery_loop:
  name: RECOVERY
  purpose: Fault tolerance and self-healing
  
  triggers:
    error_rate:
      threshold: "> 5% in 1 minute"
      action: investigate_and_mitigate
      
    latency_spike:
      threshold: "p99 > 2x baseline"
      action: shed_load_and_alert
      
    agent_crash:
      threshold: "any unhandled exception"
      action: restart_with_checkpoint
      
    tenant_isolation_breach:
      threshold: "any cross-tenant data access"
      action: quarantine_and_alert_security
  
  health_checks:
    agent_health:
      interval_sec: 10
      timeout_sec: 5
      unhealthy_threshold: 3
      actions:
        - restart_agent
        - failover_to_replica
        
    database_health:
      interval_sec: 30
      timeout_sec: 10
      unhealthy_threshold: 2
      actions:
        - switch_to_replica
        - enable_read_only_mode
        
    external_service_health:
      interval_sec: 60
      timeout_sec: 15
      unhealthy_threshold: 3
      actions:
        - enable_circuit_breaker
        - use_cached_responses
  
  recovery_strategies:
    action_level:
      strategy: compensating_action
      timeout_ms: 5000
      max_retries: 3
      backoff: exponential
      
    session_level:
      strategy: checkpoint_restore
      checkpoint_interval: 5_actions
      rollback_depth: last_successful
      
    tenant_level:
      strategy: point_in_time_recovery
      retention_hours: 72
      isolation: per_tenant_only
      
    platform_level:
      strategy: blue_green_failover
      health_threshold: 95%
      manual_approval: true
  
  blast_radius_containment:
    tenant_isolation: strict
    cross_tenant_impact: prevented
    shared_resource_failure:
      strategy: graceful_degradation
      fallback: reduced_functionality
```

### Loop Coordination

```
┌────────────────────────────────────────────────────────────────────┐
│                    Loop Transition Matrix                          │
├─────────────┬─────────────┬─────────────┬─────────────┬───────────┤
│   From      │   REQUEST   │   CONTROL   │   ECONOMIC  │ RECOVERY  │
├─────────────┼─────────────┼─────────────┼─────────────┼───────────┤
│ REQUEST     │      -      │ Complex     │ Budget      │ Error     │
│             │             │ workflow    │ exceeded    │ detected  │
├─────────────┼─────────────┼─────────────┼─────────────┼───────────┤
│ CONTROL     │ Completion  │      -      │ Cost alert  │ Failure   │
│             │             │             │             │ state     │
├─────────────┼─────────────┼─────────────┼─────────────┼───────────┤
│ ECONOMIC    │ Quota reset │ Budget      │      -      │ Enforce   │
│             │             │ adjusted    │             │ failure   │
├─────────────┼─────────────┼─────────────┼─────────────┼───────────┤
│ RECOVERY    │ Restored    │ Checkpoint  │ Cost        │      -    │
│             │ request     │ loaded      │ recalculated│           │
├─────────────┼─────────────┼─────────────┼─────────────┼───────────┤
│ LEARNING    │ Async (no   │ Model       │ N/A         │ Training  │
│ (async)     │ interrupt)  │ updated     │             │ rollback  │
└─────────────┴─────────────┴─────────────┴─────────────┴───────────┘
```

## Trade-offs

| Configuration | Benefit | Cost | Recommendation |
|---------------|---------|------|----------------|
| **High frequency control** (10+ Hz) | Responsive state management, fast failure detection | CPU overhead, network traffic | Enterprise tier, critical workflows |
| **Low frequency control** (1 Hz) | Resource efficient, simple implementation | Slower reaction to failures | Free tier, batch processing |
| **Aggressive learning** (daily) | Rapid improvement, quick adaptation | Compute cost, potential instability | High-feedback domains |
| **Conservative learning** (monthly) | Stable behavior, lower cost | Slower improvement | Regulated industries |
| **Strict economic limits** (hard block) | Predictable costs, no surprises | Poor UX at limits | Free tier, strict budgets |
| **Soft economic limits** (throttle + warn) | Better UX, flexible usage | Potential overage | Pro/Enterprise tier |
| **Per-action recovery** | Fine-grained rollback, minimal data loss | Checkpoint overhead | High-value transactions |
| **Per-session recovery** | Balanced overhead, reasonable protection | May lose some progress | Standard workflows |

### Loop Frequency Guidance

| Loop | Free Tier | Pro Tier | Enterprise Tier |
|------|-----------|----------|-----------------|
| Request | 2 RPS limit | 100 RPS | 1000+ RPS |
| Control | 1 Hz | 5 Hz | 10 Hz |
| Learning | Monthly | Weekly | Daily |
| Economic | Per-request soft | Per-request real-time | Real-time + predictive |
| Recovery | Basic retry | Checkpoint restore | Full PITR |

## Web Research Queries

- "AI agent runtime loop architecture patterns {date}"
- "multi-tenant control loop state machine {date}"
- "federated learning multi-tenant privacy {date}"
- "real-time budget enforcement AI APIs {date}"
- "agent self-healing recovery patterns {date}"
- "LangGraph checkpoint restore patterns {date}"
- "token budget management LLM applications {date}"
- "circuit breaker patterns distributed agents {date}"
