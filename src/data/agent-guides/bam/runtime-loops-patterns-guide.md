# BAM Runtime Loops Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing AI agent runtime loops, feedback mechanisms, or control systems. Load when user mentions runtime loops, feedback loops, control loops, learning loops, recovery loops.
**Integrates with:** Architect (Nova persona), Dev agent

---

## Core Concepts

### Runtime Loop Types

Multi-tenant AI platforms require five core loop patterns that work together to create robust, adaptive, and cost-effective agent systems. Each loop operates at different timescales and serves distinct purposes while maintaining strict tenant isolation.

```
Request Loop (ms)     ──►  Control Loop (s)     ──►  Recovery Loop (min)
      │                         │                          │
      │    Real-time ops        │    State mgmt            │    Fault handling
      │                         │                          │
      ▼                         ▼                          ▼
Learning Loop (hrs)   ──►  Economic Loop (continuous)
      │                         │
      │    Improvement          │    Cost control
      │                         │
      └─────────────────────────┴─────────────────────────────►
                          Tenant Isolation Boundary
```

### Multi-Tenant Loop Isolation

Each loop must maintain strict tenant boundaries to prevent data leakage and ensure fair resource allocation.

| Loop Type | Isolation Scope | Boundary Mechanism | Cross-Tenant |
|-----------|----------------|-------------------|--------------|
| Request | Per-request | Tenant ID extraction | Never |
| Control | Per-session/workflow | Namespace prefixing | Never |
| Learning | Per-tenant or federated | Differential privacy | Consent only |
| Recovery | Per-tenant | Blast radius containment | Never |
| Economic | Per-tenant | Budget enforcement | Never |

### Loop Interaction Matrix

Understanding how loops interact is critical for system design:

| Loop A | Loop B | Interaction | Example |
|--------|--------|-------------|---------|
| Request | Control | State updates | Request triggers state transition |
| Control | Recovery | Error escalation | Failed state triggers recovery |
| Request | Economic | Budget check | Pre-execution cost validation |
| Learning | Control | Model updates | New model affects state decisions |
| Recovery | Economic | Cost accounting | Recovery attempts consume budget |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and must be followed for all runtime loop implementations.

### Loop Naming Conventions

All loop-related components must follow consistent naming:

| Component | Pattern | Example |
|-----------|---------|---------|
| State keys | `tenant:{tenant_id}:loop:{loop_type}:{entity_id}` | `tenant:abc123:loop:control:agent_001` |
| Metrics | `bam.loop.{loop_type}.{metric}` | `bam.loop.request.latency_p99` |
| Events | `bam.{loop_type}_loop.{event}` | `bam.recovery_loop.failover_triggered` |
| Checkpoints | `checkpoint:{tenant_id}:{workflow_id}:{step}` | `checkpoint:abc123:wf_001:step_3` |

### Tenant Context Propagation

Tenant context must flow through all loop stages without exception:

```yaml
tenant_context_schema:
  tenant_id: string          # Primary identifier
  tier: enum                 # free|standard|enterprise
  budget_remaining: number   # Current budget status
  preferences: object        # Tenant-specific settings
  session_id: string         # Current session
  trace_id: string           # Distributed tracing
  
propagation_rules:
  - Extract tenant_id from JWT in first loop stage
  - Validate tenant_id against allow-list
  - Attach context to all downstream calls
  - Include tenant_id in all log entries
  - Pass context through message queues
```

### Loop Configuration Standards

```yaml
loop_defaults:
  request:
    timeout_ms: 3000
    retry_attempts: 3
    circuit_breaker_threshold: 5
    
  control:
    checkpoint_interval: 5_actions
    state_ttl_hours: 24
    max_concurrent_workflows: 10
    
  learning:
    min_feedback_samples: 100
    aggregation_interval_hours: 24
    consent_required: true
    
  recovery:
    max_retry_attempts: 3
    backoff_multiplier: 2
    escalation_threshold: 2
    
  economic:
    budget_check_interval_ms: 1000
    alert_threshold_percent: 80
    enforcement_mode: soft_throttle
```

---

## Decision Framework

### When to Use Which Loop Pattern

| Scenario | Primary Loop | Supporting Loops | Rationale |
|----------|--------------|------------------|-----------|
| Real-time user chat | Request | Control, Economic | Low latency required |
| Multi-step workflow | Control | Request, Recovery | State management needed |
| Model improvement | Learning | Economic | Long-term optimization |
| System failure | Recovery | Control | Fault tolerance |
| Cost optimization | Economic | All loops | Budget enforcement |
| Complex agent task | Control + Request | Recovery, Economic | Coordinated execution |

### Loop Selection Matrix

| Requirement | Request | Control | Learning | Recovery | Economic |
|-------------|:-------:|:-------:|:--------:|:--------:|:--------:|
| Sub-second response | **Primary** | Supporting | - | - | Check |
| State persistence | - | **Primary** | - | Supporting | - |
| Model adaptation | - | - | **Primary** | - | Check |
| Fault tolerance | - | Supporting | - | **Primary** | - |
| Cost control | Check | Check | Check | Check | **Primary** |

### Tier-Based Loop Configuration

| Tier | Request Priority | Control Persistence | Learning Mode | Recovery SLA | Budget Enforcement |
|------|-----------------|--------------------|--------------:|--------------|-------------------|
| Free | Low | Redis (24h TTL) | Shared pool | Best effort | Hard block |
| Standard | Normal | PostgreSQL (7d) | Federated | < 30min MTTR | Soft throttle |
| Enterprise | High | PostgreSQL (90d) | Per-tenant | < 5min MTTR | Alert only |

---

## §control-loop

### Pattern: Control Loop

The Control Loop manages agent state transitions and multi-step workflows with tenant-scoped isolation.

#### Control Loop Diagram

```
State A → Decision → State B → Decision → State C
   │         │          │         │          │
   └─────────┴──────────┴─────────┴──────────┘
                  Control Loop
              (Manages agent state)
```

#### State Categories

| Category | Tenant Scope | Persistence | TTL |
|----------|--------------|-------------|-----|
| Conversation | Per-session | Redis | 30min-24hr |
| Workflow | Per-tenant | PostgreSQL | 7-90 days |
| Agent Memory | Per-tenant | Vector DB | Configurable |
| Global Config | Platform | Config store | Permanent |

#### Multi-Tenant State Isolation

```yaml
state_isolation:
  strategy: namespace_prefix
  pattern: "tenant:{tenant_id}:agent:{agent_id}:state"
  
  cleanup:
    on_session_end: archive_to_cold
    retention_days: 90
  
  verification:
    on_access: validate_tenant_match
    on_write: audit_log_required
```

#### State Transition Rules

| From State | To State | Condition | Tenant Impact |
|------------|----------|-----------|---------------|
| IDLE | PROCESSING | New request | Load tenant context |
| PROCESSING | WAITING | External call | Checkpoint state |
| WAITING | PROCESSING | Response received | Verify tenant match |
| PROCESSING | COMPLETE | Success | Archive state |
| ANY | ERROR | Failure | Isolate failure |

#### Checkpoint Best Practices

Checkpointing is critical for resumable workflows and disaster recovery:

```yaml
checkpoint_schema:
  checkpoint_id: uuid
  tenant_id: string
  agent_id: string
  state_name: string
  state_data: object
  pending_actions: array
  created_at: timestamp
  expires_at: timestamp
  version: integer          # Optimistic locking
```

#### State Machine Patterns

| State Type | Persistence | Timeout | Recovery Strategy |
|------------|-------------|---------|-------------------|
| Transient | Memory | 30s | Restart from beginning |
| Durable | PostgreSQL | 5min | Resume from checkpoint |
| Long-running | PostgreSQL | 1hr | Checkpoint every transition |
| Background | Redis | 24hr | Re-queue on failure |

#### Concurrency Control

Multi-tenant systems must prevent state corruption from concurrent access:

| Strategy | Use Case | Tenant Impact |
|----------|----------|---------------|
| Optimistic locking | Read-heavy workflows | Version conflicts retry |
| Pessimistic locking | Write-heavy operations | Per-tenant scoped only |
| Distributed locks | Cross-service coordination | Tenant namespace isolation |

---

## §request-loop

### Pattern: Request Loop

The Request Loop handles synchronous user-agent interactions with sub-100ms latency targets.

#### Request Loop Diagram

```
User Request → Validate → Route → Execute → Respond
     │            │         │        │         │
     └────────────┴─────────┴────────┴─────────┘
                    Request Loop
                   (P50 < 100ms)
```

#### Loop Stages

| Stage | Responsibility | Tenant Context | Latency Target |
|-------|----------------|----------------|----------------|
| Validate | Schema + auth check | Extract tenant_id | < 5ms |
| Route | Agent selection | Tenant tier routing | < 10ms |
| Execute | Action contract | Tenant-scoped execution | < 80ms |
| Respond | Format response | Tenant preferences | < 5ms |

#### Tenant-Aware Routing

```yaml
routing_rules:
  enterprise_tier:
    priority: high
    dedicated_pool: true
    timeout_ms: 5000
    max_concurrent: 100
  
  standard_tier:
    priority: normal
    shared_pool: true
    timeout_ms: 3000
    max_concurrent: 50
  
  free_tier:
    priority: low
    rate_limited: true
    timeout_ms: 2000
    max_concurrent: 10
```

#### Latency Optimization Strategies

| Stage | Optimization | Implementation |
|-------|-------------|----------------|
| Validate | Cached schema validators | Pre-compile on startup |
| Validate | Pre-validated JWT tokens | Token cache with TTL |
| Route | Connection pooling | Per-tenant pool sizing |
| Execute | Tenant context caching | Redis with 5min TTL |
| Respond | Response template caching | CDN edge caching |

#### Request Caching Strategy

```yaml
request_cache:
  tenant_context:
    ttl_seconds: 300
    storage: redis
    invalidation: on_preference_change
  
  agent_routing:
    ttl_seconds: 60
    storage: local
    invalidation: on_agent_update
  
  response_format:
    ttl_seconds: 3600
    storage: cdn
    invalidation: on_template_change
```

#### Error Handling

| Error Type | Response Code | Retry Strategy | Tenant Impact |
|------------|---------------|----------------|---------------|
| Validation | 400 | No retry | None |
| Timeout | 504 | Auto-retry (3x) | Degraded |
| Rate limit | 429 | Exponential backoff | Throttled |
| Internal | 500 | Manual investigation | Isolated |

---

## §learning-loop

### Pattern: Learning Loop

The Learning Loop enables tenant-aware model improvement without cross-contamination.

#### Learning Loop Diagram

```
Feedback → Aggregate → Validate → Train → Deploy
    │          │           │        │        │
    └──────────┴───────────┴────────┴────────┘
                   Learning Loop
              (Tenant-isolated improvement)
```

#### Feedback Categories

| Type | Source | Tenant Scope | Signal Quality | Usage |
|------|--------|--------------|----------------|-------|
| Explicit | Thumbs up/down | Per-tenant | High | Direct signal |
| Implicit | Completion rate | Per-tenant | Medium | Inferred signal |
| Correction | User edits | Per-tenant | Very high | Gold label |
| Escalation | Human takeover | Per-tenant | High | Failure signal |

#### Tenant Data Isolation in Learning

```yaml
learning_isolation:
  # Option 1: Per-tenant fine-tuning (expensive)
  per_tenant_model:
    enabled: enterprise_only
    min_samples: 1000
    cost_multiplier: 10x
  
  # Option 2: Federated learning (privacy-preserving)
  federated:
    enabled: true
    aggregation: differential_privacy
    epsilon: 1.0
    min_participants: 10
  
  # Option 3: Shared with consent
  shared_pool:
    requires_consent: true
    anonymization: required
    opt_out_available: true
```

#### Learning Pipeline Stages

| Stage | Tenant Boundary | Data Handling | Quality Gate |
|-------|-----------------|---------------|--------------|
| Collection | Per-tenant bucket | Encrypted at rest | Data validation |
| Aggregation | Cross-tenant (with consent) | Differential privacy | Privacy audit |
| Validation | Platform-wide | Quality gates | Sample quality check |
| Training | Isolated compute | No data mixing | Model validation |
| Deployment | Gradual rollout | A/B by tenant tier | Performance check |

#### Feedback Quality Gates

```yaml
quality_gates:
  explicit_feedback:
    min_confidence: 0.8
    require_context: true
    deduplicate: true
  
  implicit_feedback:
    min_session_length: 30s
    require_completion: true
    exclude_bounces: true
  
  corrections:
    require_diff: true
    min_change_length: 10
    validate_format: true
```

#### Model Versioning and Rollout

| Version Stage | Traffic % | Monitoring | Rollback Trigger |
|---------------|-----------|------------|------------------|
| Canary | 5% | Real-time | Auto (5% degradation) |
| Beta | 25% | Hourly | Manual (10% degradation) |
| Production | 100% | Daily | Emergency (any critical) |

#### Learning Strategy Decision Framework

| Scenario | Learning Strategy | Rationale |
|----------|------------------|-----------|
| Enterprise tenant | Per-tenant fine-tune | Custom behavior requirements |
| Standard tenants | Federated learning | Privacy + scale benefits |
| Free tier | Shared pool (consent) | Cost efficiency |
| Regulated industry | No cross-tenant | Compliance requirement |

---

## §recovery-loop

### Pattern: Recovery Loop

The Recovery Loop enables safe rollback and self-healing for tenant-scoped failures.

#### Recovery Loop Diagram

```
Detect → Isolate → Diagnose → Recover → Verify
   │        │          │          │        │
   └────────┴──────────┴──────────┴────────┘
                 Recovery Loop
            (Tenant-scoped resilience)
```

#### Recovery Strategies

| Strategy | Scope | Use When | Tenant Impact |
|----------|-------|----------|---------------|
| Retry | Single request | Transient failure | Minimal delay |
| Rollback | Single action | Action failed mid-execution | Action reversed |
| Failover | Tenant session | Service degradation | Session reset |
| Quarantine | Tenant account | Suspected abuse | Account restricted |

#### Tenant-Scoped Rollback Configuration

```yaml
rollback_config:
  action_level:
    strategy: compensating_action
    timeout_ms: 5000
    max_retries: 3
  
  session_level:
    strategy: checkpoint_restore
    checkpoint_interval: 5_actions
  
  tenant_level:
    strategy: point_in_time_recovery
    retention_hours: 72
```

#### Failure Classification

| Failure Type | Blast Radius | Recovery Path | SLA Target |
|--------------|--------------|---------------|------------|
| Transient | Single request | Auto-retry | < 5s |
| Partial | Single action | Compensating action | < 30s |
| Session | User session | Checkpoint restore | < 1 min |
| Tenant | Entire tenant | Point-in-time recovery | < 1 hour |
| Platform | All tenants | Disaster recovery | < 4 hours |

#### Compensating Actions

Every write operation should define its compensating action:

```yaml
compensating_actions:
  create_resource:
    compensate: delete_resource
    timeout_ms: 5000
    idempotent: true
  
  update_balance:
    compensate: reverse_transaction
    timeout_ms: 10000
    requires_audit: true
  
  send_notification:
    compensate: send_correction_notice
    timeout_ms: 30000
    best_effort: true
```

#### Circuit Breaker Patterns

| Circuit State | Behavior | Transition Trigger | Tenant Isolation |
|---------------|----------|-------------------|------------------|
| Closed | Normal operation | - | Per-tenant state |
| Open | Fail fast | 5 failures in 10s | Per-tenant threshold |
| Half-Open | Test requests | 30s cooldown | Per-tenant testing |

#### Blast Radius Containment

| Containment Level | Scope | Mechanism | Cross-Tenant Impact |
|-------------------|-------|-----------|---------------------|
| Action | Single operation | Transaction rollback | None |
| Session | User session | Session invalidation | None |
| Tenant | Entire tenant account | Tenant isolation | None |
| Service | Single service instance | Instance restart | Minimal |
| Platform | All services | Disaster recovery | Coordinated |

#### Recovery Metrics

| Metric | Definition | SLO Target |
|--------|------------|------------|
| MTTD | Mean time to detect | < 1 minute |
| MTTR | Mean time to recover | < 5 minutes |
| Recovery success rate | Successful recoveries / attempts | > 95% |
| Blast radius | Affected tenants / total | < 1% |

---

## §economic-loop

### Pattern: Economic Loop

The Economic Loop enforces per-tenant resource budgets in real-time.

#### Economic Loop Diagram

```
Budget → Monitor → Alert → Throttle → Invoice
   │        │        │        │          │
   └────────┴────────┴────────┴──────────┘
                Economic Loop
            (Real-time cost control)
```

#### Budget Dimensions

| Dimension | Unit | Enforcement Point | Measurement |
|-----------|------|-------------------|-------------|
| Tokens | Per-request | Pre-execution | LLM API calls |
| API calls | Per-minute | Rate limiter | Request counter |
| Compute | GPU-seconds | Scheduler | Resource allocation |
| Storage | GB | Write path | Data operations |

#### Tier-Based Budgets

```yaml
budgets:
  free_tier:
    tokens_per_day: 10000
    api_calls_per_minute: 10
    storage_gb: 1
    overage_action: hard_block
  
  standard_tier:
    tokens_per_day: 100000
    api_calls_per_minute: 100
    storage_gb: 10
    overage_action: soft_throttle
  
  enterprise_tier:
    tokens_per_day: unlimited
    api_calls_per_minute: 1000
    storage_gb: 100
    overage_action: alert_only
```

#### Budget Enforcement Flow

| Stage | Usage % | Action | Tenant Notification |
|-------|---------|--------|---------------------|
| Normal | 0-50% | Log | Dashboard update |
| Warning | 50-75% | Warn | Email notification |
| Critical | 75-90% | Alert | Slack/PagerDuty |
| Exceeded | 90-100% | Enforce | Block/Throttle/Alert |

#### Real-Time Budget Tracking

```yaml
budget_check_flow:
  pre_execution:
    - estimate_cost
    - check_remaining_budget
    - reserve_budget
    - proceed_or_reject
  
  post_execution:
    - calculate_actual_cost
    - reconcile_reservation
    - update_usage_metrics
    - trigger_alerts_if_needed
```

#### Cost Attribution

| Cost Dimension | Unit | Attribution Method | Billing Model |
|----------------|------|-------------------|---------------|
| LLM tokens | Per-token | Direct | Usage-based |
| Compute | GPU-second | Direct | Usage-based |
| Storage | GB-month | Proportional | Tiered |
| External APIs | Per-call | Direct | Pass-through |

#### Overage Handling Strategies

| Tier | Overage Strategy | User Experience | Business Impact |
|------|-----------------|-----------------|-----------------|
| Free | Hard block at limit | Service stops | Prevent abuse |
| Standard | Soft throttle | Degraded performance | Maintain service |
| Enterprise | Alert only | Full service | Post-billing |
| Trial | Strict sandbox | Limited features | Prevent abuse |

#### Budget Strategy Decision Framework

| Scenario | Budget Strategy | Rationale |
|----------|----------------|-----------|
| Startup tier | Hard limits | Prevent bill shock |
| Growth tier | Soft limits + alerts | Flexibility to grow |
| Enterprise | Alert only | Trust + SLA priority |
| Trial | Strict sandbox | Prevent abuse |

---

## Quality Gates

### QG-M3 Verification for Runtime Loops

All runtime loop implementations must pass QG-M3 (Agent Runtime) verification:

| Check | Requirement | Verification Method |
|-------|-------------|---------------------|
| Tenant isolation | All loops namespace by tenant_id | Code review + testing |
| State persistence | Checkpoints survive restarts | Chaos testing |
| Budget enforcement | Pre-execution checks present | Integration tests |
| Recovery paths | All failure modes have recovery | Failure injection |
| Metrics collection | All loops emit standard metrics | Observability review |

### Loop-Specific Quality Checks

| Loop | Critical Checks | Non-Critical Checks |
|------|----------------|---------------------|
| Request | < 100ms P99, tenant extraction | Caching effectiveness |
| Control | Checkpoint integrity, state isolation | TTL configuration |
| Learning | Privacy compliance, consent tracking | Sample diversity |
| Recovery | Blast radius containment, MTTR | Retry efficiency |
| Economic | Pre-execution budget check | Alert thresholds |

### Verification Checklist

- [ ] All loops extract tenant_id before processing
- [ ] State keys include tenant namespace prefix
- [ ] Budget checks occur before resource consumption
- [ ] Circuit breakers are tenant-scoped
- [ ] Learning data has consent verification
- [ ] Recovery actions have compensating operations
- [ ] Metrics include tenant dimension
- [ ] Logs include trace_id and tenant_id

---

## Web Research

| Topic | Query |
|-------|-------|
| Control loop patterns | "AI agent state machine patterns {date}" |
| Control loop multi-tenant | "LangGraph control flow multi-tenant {date}" |
| Request loop optimization | "AI agent request loop latency patterns {date}" |
| Request routing | "multi-tenant request routing best practices {date}" |
| Learning loop privacy | "federated learning multi-tenant AI {date}" |
| Learning loop RLHF | "RLHF tenant isolation patterns {date}" |
| Recovery patterns | "AI agent rollback patterns {date}" |
| Recovery isolation | "multi-tenant failure isolation {date}" |
| Economic metering | "AI usage metering multi-tenant {date}" |
| Budget management | "token budget management LLM {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load from pattern registry for decision criteria and web queries:

- **Control patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `control-loop-*`
- **Request patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `request-loop-*`
- **Learning patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `learning-loop-*`
- **Recovery patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `recovery-loop-*`
- **Economic patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `economic-loop-*`

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Overall runtime design integrating all loops
- `bmad-bam-agent-memory-optimization` - Memory tier design affecting control loop
- `bmad-bam-action-contract-design` - Contract enforcement in request loop
- `bmad-bam-ai-feedback-loop` - Feedback collection design for learning loop
- `bmad-bam-disaster-recovery-design` - DR planning for recovery loop
- `bmad-bam-tenant-incident-response` - Incident handling for recovery loop
- `bmad-bam-usage-metering-design` - Metering pipeline for economic loop
- `bmad-bam-usage-alerts-design` - Alert configuration for economic loop
- `bmad-bam-pricing-tier-configuration` - Tier setup for economic loop

---

## Change Log

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 5 source files |
