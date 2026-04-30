---
pattern_id: event-driven-agents
shortcode: ZEA
category: agent-communication
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Event-Driven Agents - BAM Pattern

**Loaded by:** ZEA  
**Applies to:** Multi-agent multi-tenant systems with event-sourced state  
**See also:** [state-management.md](state-management.md), [agent-orchestration.md](agent-orchestration.md)

---

## When to Use

- Agent state must be auditable and replayable
- Complex multi-agent workflows with failure recovery
- Event-driven microservices architecture
- Temporal queries on agent history
- Distributed agent coordination

## When NOT to Use

- Simple request-response agents
- No audit or replay requirements
- Latency-critical single-turn interactions
- Memory-constrained environments

## Architecture

### Event-Sourced Agent State

```
┌─────────────────────────────────────────────────────────────────────┐
│               Event-Sourced Agent Architecture                       │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                      Agent Instance                            │  │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │  │
│  │  │   Command   │───►│   Event     │───►│  Aggregate  │       │  │
│  │  │   Handler   │    │   Store     │    │   State     │       │  │
│  │  └─────────────┘    └──────┬──────┘    └─────────────┘       │  │
│  │                            │                                   │  │
│  │                            ▼                                   │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │              Event Stream (Tenant-Partitioned)           │  │  │
│  │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │  │  │
│  │  │  │ E1  │ │ E2  │ │ E3  │ │ E4  │ │ E5  │ │ E6  │      │  │  │
│  │  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘      │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Patterns: [Event Sourcing] [CQRS] [Saga] [Projection]              │
└─────────────────────────────────────────────────────────────────────┘
```

### Event Bus with Tenant Filtering

```
┌─────────────────────────────────────────────────────────────────────┐
│                 Tenant-Filtered Event Bus                            │
│                                                                      │
│  ┌─────────────────┐                                                │
│  │  Agent Producer │                                                │
│  │  (Tenant A)     │                                                │
│  └────────┬────────┘                                                │
│           │                                                          │
│           ▼                                                          │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │              Event Bus (Kafka/EventBridge)                   │    │
│  │                                                              │    │
│  │  ┌─────────────────────────────────────────────────────────┐│    │
│  │  │ Topic: agent-events                                      ││    │
│  │  │ Partition Key: tenant_id                                 ││    │
│  │  │                                                          ││    │
│  │  │ Tenant A ─► [Partition 0] ─► Consumers (Tenant A only)  ││    │
│  │  │ Tenant B ─► [Partition 1] ─► Consumers (Tenant B only)  ││    │
│  │  │ Tenant C ─► [Partition 2] ─► Consumers (Tenant C only)  ││    │
│  │  └─────────────────────────────────────────────────────────┘│    │
│  │                                                              │    │
│  │  CRITICAL: Consumer groups are tenant-scoped                │    │
│  │            No cross-tenant event visibility                 │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│           │                │                │                        │
│           ▼                ▼                ▼                        │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐              │
│  │  Consumer A   │ │  Consumer B   │ │  Consumer C   │              │
│  │  (Tenant A)   │ │  (Tenant B)   │ │  (Tenant C)   │              │
│  └───────────────┘ └───────────────┘ └───────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
event_driven_agents:
  version: "1.0.0"
  bam_controlled: true
  tenant_partitioned: true
  
  event_store:
    backend: enum[kafka, eventbridge, kinesis, pulsar, custom]
    
    partitioning:
      strategy: enum[tenant_id, agent_id, composite]
      partition_count_per_tenant: int
      
    retention:
      default_days: int
      per_tier:
        free: 7
        pro: 30
        enterprise: 365
        
    serialization:
      format: enum[json, avro, protobuf]
      schema_registry: bool
      schema_validation: strict
      
  event_schema:
    required_fields:
      - event_id: uuid
      - event_type: string
      - tenant_id: string
      - agent_id: string
      - timestamp: timestamp
      - version: int
      
    optional_fields:
      - correlation_id: uuid
      - causation_id: uuid
      - user_id: string
      - session_id: string
      
    payload:
      max_size_bytes: int
      encryption: bool
      
  consumers:
    isolation: enum[process, container, namespace]
    tenant_binding: strict  # consumers can only read their tenant's events
    
    scaling:
      min_consumers_per_tenant: int
      max_consumers_per_tenant: int
      auto_scale: bool
      
  replay:
    enabled: bool
    point_in_time_recovery: bool
    max_replay_window_days: int
    
    replay_isolation:
      separate_consumer_group: bool
      throttle_rate: float  # events per second
      
  projections:
    enabled: bool
    
    projection_types:
      - name: "agent_state"
        source_events: ["AgentCreated", "ActionExecuted", "StateChanged"]
        target_store: enum[redis, dynamodb, postgresql]
        
      - name: "agent_metrics"
        source_events: ["ActionExecuted", "ToolCalled"]
        target_store: enum[timeseries_db, prometheus]
        
  saga:
    enabled: bool
    
    compensation:
      timeout_seconds: int
      max_retries: int
      dead_letter_queue: bool
      
    coordination:
      type: enum[orchestration, choreography]
      saga_store: enum[redis, postgresql, dynamodb]
```

### Event Types for Agent Lifecycle

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Agent Event Types                                 │
│                                                                      │
│  Lifecycle Events:                                                  │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐       │
│  │ AgentCreated    │ │ AgentStarted    │ │ AgentPaused     │       │
│  │ • agent_id      │ │ • agent_id      │ │ • agent_id      │       │
│  │ • tenant_id     │ │ • config        │ │ • reason        │       │
│  │ • agent_type    │ │ • resources     │ │ • resume_at     │       │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘       │
│                                                                      │
│  Execution Events:                                                  │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐       │
│  │ TaskReceived    │ │ ActionPlanned   │ │ ActionExecuted  │       │
│  │ • task_id       │ │ • action_type   │ │ • action_id     │       │
│  │ • input         │ │ • parameters    │ │ • result        │       │
│  │ • priority      │ │ • confidence    │ │ • duration_ms   │       │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘       │
│                                                                      │
│  Communication Events:                                              │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐       │
│  │ ToolCalled      │ │ HandoffInitiated│ │ ResponseGenerated│      │
│  │ • tool_name     │ │ • target_agent  │ │ • output        │       │
│  │ • input         │ │ • context       │ │ • confidence    │       │
│  │ • result        │ │ • reason        │ │ • tokens_used   │       │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘       │
│                                                                      │
│  Error Events:                                                      │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐       │
│  │ ActionFailed    │ │ ToolTimeout     │ │ AgentCrashed    │       │
│  │ • error_code    │ │ • tool_name     │ │ • error         │       │
│  │ • error_message │ │ • timeout_ms    │ │ • stack_trace   │       │
│  │ • retry_count   │ │ • retry_policy  │ │ • recovery      │       │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
```

### Replay and Recovery

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Event Replay Patterns                            │
│                                                                      │
│  1. Point-in-Time Recovery                                          │
│     ┌──────────────────────────────────────────────────────────┐   │
│     │ Event Stream: [E1] [E2] [E3] [E4] [E5] [E6] [E7] [E8]   │   │
│     │                              ▲                            │   │
│     │                              │                            │   │
│     │                    Replay to this point                   │   │
│     │                    Reconstruct state at E4                │   │
│     └──────────────────────────────────────────────────────────┘   │
│                                                                      │
│  2. Selective Replay (Debug/Audit)                                  │
│     ┌──────────────────────────────────────────────────────────┐   │
│     │ Filter: event_type = "ActionExecuted" AND                │   │
│     │         agent_id = "agent_123" AND                       │   │
│     │         timestamp BETWEEN '2026-04-01' AND '2026-04-30'  │   │
│     └──────────────────────────────────────────────────────────┘   │
│                                                                      │
│  3. Compensation (Saga Rollback)                                    │
│     ┌──────────────────────────────────────────────────────────┐   │
│     │ Forward:  [E1: Reserve] → [E2: Charge] → [E3: Fulfill]   │   │
│     │                                              │ FAIL      │   │
│     │ Backward: [C3: UndoFulfill] ← [C2: Refund] ← ┘           │   │
│     └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full Event Sourcing | Complete audit, replay | Storage cost, complexity | Regulated industries |
| Hybrid (events + snapshots) | Faster replay | Snapshot management | High-volume agents |
| CQRS | Read/write optimization | Eventual consistency | Read-heavy workloads |
| Choreography | Loose coupling | Harder to trace | Simple workflows |
| Orchestration | Clear flow | Central coordinator | Complex workflows |

## Eventual Consistency Handling

```yaml
consistency_patterns:
  read_your_writes:
    enabled: bool
    implementation: enum[session_consistency, causal_ordering]
    
  conflict_resolution:
    strategy: enum[last_write_wins, merge, manual]
    version_vector: bool
    
  staleness_tolerance:
    max_lag_seconds: int
    fallback_on_stale: enum[error, warn, proceed]
```

## Web Research Queries

- "event sourcing AI agents patterns {date}"
- "event-driven multi-agent architecture {date}"
- "Kafka multi-tenant event streaming {date}"
- "saga pattern agent orchestration {date}"
- "CQRS event sourcing LLM agents {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Event streams tenant-partitioned, no cross-tenant leakage |
| QG-M3 | Event replay supports agent recovery |
| QG-I2 | Event consumers bound to tenant scope |

## Related Patterns

- [state-management.md](state-management.md) - Agent state persistence
- [agent-orchestration.md](agent-orchestration.md) - Multi-agent coordination
- [agent-handoff-protocol.md](agent-handoff-protocol.md) - Agent task handoff
- [disaster-recovery.md](disaster-recovery.md) - Recovery patterns
