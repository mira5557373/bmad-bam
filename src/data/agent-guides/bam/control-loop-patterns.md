# BAM Control Loop Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing agent orchestration,
or when user mentions control flow, state machines, or agent coordination.

**Integrates with:** Nova (AI Runtime), LangGraph workflows

---

## Core Concepts

### Control Loop Overview

The Control Loop manages agent state transitions and multi-step workflows.

```
State A → Decision → State B → Decision → State C
   │         │          │         │          │
   └─────────┴──────────┴─────────┴──────────┘
                  Control Loop
              (Manages agent state)
```

### State Categories

| Category | Tenant Scope | Persistence |
|----------|--------------|-------------|
| Conversation | Per-session | Redis (TTL) |
| Workflow | Per-tenant | PostgreSQL |
| Agent Memory | Per-tenant | Vector DB |
| Global Config | Platform | Config store |

### Multi-Tenant State Isolation

```yaml
state_isolation:
  strategy: namespace_prefix
  pattern: "tenant:{tenant_id}:agent:{agent_id}:state"
  
  cleanup:
    on_session_end: archive_to_cold
    retention_days: 90
```

### State Transition Rules

| From State | To State | Condition | Tenant Impact |
|------------|----------|-----------|---------------|
| IDLE | PROCESSING | New request | Load tenant context |
| PROCESSING | WAITING | External call | Checkpoint state |
| WAITING | PROCESSING | Response received | Verify tenant match |
| PROCESSING | COMPLETE | Success | Archive state |
| ANY | ERROR | Failure | Isolate failure |

## Application Guidelines

1. **Namespace all state keys** - tenant_id prefix mandatory
2. **Design for interruption** - Checkpoint every state transition
3. **Implement state TTLs** - Prevent unbounded growth
4. **Audit state changes** - Compliance requirement

### Checkpoint Best Practices

Checkpointing is critical for resumable workflows and disaster recovery. Each state transition should create an immutable checkpoint before proceeding. Checkpoints must include the full tenant context, current state, pending actions, and a timestamp for audit purposes.

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
```

### State Machine Patterns

Complex agent workflows benefit from formal state machine definitions. LangGraph provides native support for state graphs, but custom implementations should follow similar patterns. Each state should have clear entry conditions, exit conditions, and timeout handling.

| State Type | Persistence | Timeout | Recovery |
|------------|-------------|---------|----------|
| Transient | Memory | 30s | Restart |
| Durable | PostgreSQL | 5min | Resume |
| Long-running | PostgreSQL | 1hr | Checkpoint |
| Background | Redis | 24hr | Re-queue |

### Concurrency Control

Multi-tenant systems must prevent state corruption from concurrent access. Use optimistic locking with version numbers for read-heavy workflows and pessimistic locking for write-heavy operations. Always scope locks to the tenant level to prevent cross-tenant blocking.

## Decision Framework

| Scenario | State Strategy | Rationale |
|----------|---------------|-----------|
| Short conversation | Redis TTL | Fast, ephemeral |
| Long workflow | PostgreSQL | Durable, queryable |
| Memory retrieval | Vector DB | Semantic search |
| Config change | Broadcast | All instances sync |

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Overall runtime design
- `bmad-bam-agent-memory-optimization` - Memory tier design

## Related Patterns

Load from pattern registry:

- **Control patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `control-loop-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent state machine patterns {date}"
- Search: "LangGraph control flow multi-tenant {date}"
