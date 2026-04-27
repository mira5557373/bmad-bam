# Event-Driven Patterns

**When to load:** When designing async communication between modules, implementing domain events, or when user mentions event sourcing, message queues, or eventual consistency.

**Integrates with:** Architect (Atlas/Kai persona), Dev agent, DevOps agent

---

## Core Concepts

### What is Event-Driven Architecture?

Event-driven architecture enables loose coupling between modules through asynchronous event publishing and consumption. In multi-tenant SaaS, events must carry tenant context and respect isolation boundaries.

### Event Types

| Type | Scope | Purpose | Tenant Context |
|------|-------|---------|----------------|
| Domain event | Within module | State changes | Implicit |
| Integration event | Cross-module | Module coordination | Explicit in payload |
| System event | Platform-wide | Operational signals | Platform-level |

### Event Flow Architecture

```
State Change
    │
    ├── Domain Event (internal)
    │   └── Same-module handlers
    │
    ├── Integration Event (cross-module)
    │   ├── Outbox table (transactional)
    │   ├── Relay process
    │   ├── Message broker
    │   └── Consumer modules
    │
    └── System Event (platform)
        └── Operational handlers (alerts, metrics)
```

---

## Key Patterns

### Pattern 1: Event Envelope

| Field | Description | Example |
|-------|-------------|---------|
| event_id | Unique identifier | `evt_abc123` |
| event_type | Event classification | `tenant.created` |
| tenant_id | Tenant context | `tenant_xyz` |
| occurred_at | ISO timestamp | `2026-04-09T10:30:00Z` |
| correlation_id | Request tracing | `req_123` |
| payload | Event-specific data | `{name, tier, ...}` |
| version | Schema version | `1.0` |

### Event Naming Convention

| Element | Pattern | Example |
|---------|---------|---------|
| Domain | `<aggregate>.<past_tense_verb>` | `tenant.created` |
| Integration | `<module>.<aggregate>.<action>` | `billing.subscription.upgraded` |
| System | `system.<component>.<signal>` | `system.database.failover` |

### Pattern 2: Event Routing

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Topic per type | `events.tenant.created` | High throughput |
| Topic per tenant | `events.tenant_abc` | Isolation |
| Fanout | Broadcast to all | System events |
| Content-based | Route by payload | Complex routing |

### Routing Strategy Selection

| Factor | Topic per Type | Topic per Tenant |
|--------|---------------|------------------|
| Tenant isolation | Payload filtering | Strong isolation |
| Ordering | Per-partition | Per-tenant |
| Scaling | Topic partitions | Add tenant topics |
| Operations | Simpler | More topics to manage |

### Pattern 3: Event Processing Guarantees

| Guarantee | Description | Implementation |
|-----------|-------------|----------------|
| At-most-once | May lose events | Fire and forget |
| At-least-once | May duplicate | Ack after process |
| Exactly-once | No loss, no dup | Idempotency + outbox |

### Idempotency Implementation

| Strategy | How | Trade-off |
|----------|-----|-----------|
| Event ID tracking | Store processed event IDs | Storage overhead |
| Natural idempotency | Design operations to be idempotent | Not always possible |
| Deduplication window | Track IDs for limited time | Window size balance |

---

## Decision Criteria

### When to Use Events vs Direct Calls

| Scenario | Events | Direct Call |
|----------|--------|-------------|
| State notification | Yes | No |
| Query data | No | Yes |
| Loose coupling needed | Yes | No |
| Immediate response required | No | Yes |
| Multiple consumers | Yes | No |
| Audit trail needed | Yes | Optional |

### Broker Selection Criteria

| Factor | Kafka | RabbitMQ | Redis Streams |
|--------|-------|----------|---------------|
| Throughput | Very high | High | High |
| Ordering | Partition-level | Queue-level | Stream-level |
| Replay | Built-in | No | Limited |
| Complexity | Higher | Lower | Lower |
| Multi-tenant | Good | Good | Good |

---

## Application Guidelines

- Decoupling modules in modular monolith
- Implementing async workflows (saga pattern)
- Building audit trails from events
- Enabling real-time features (webhooks, notifications)
- Supporting event sourcing for state reconstruction

---

## Tenant Isolation in Events

| Strategy | Implementation | Isolation Level |
|----------|----------------|-----------------|
| Shared topic | Tenant_id in payload | Basic |
| Tenant partition | Partition key = tenant_id | Medium |
| Tenant topic | Topic per tenant | High |

---

## Outbox Pattern

| Step | Description | Failure Handling |
|------|-------------|------------------|
| 1 | Write to outbox table | Same transaction as state |
| 2 | Relay reads outbox | Polling or CDC |
| 3 | Publish to broker | Retry on failure |
| 4 | Mark as published | Idempotent operation |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Missing tenant context | Cross-tenant event processing | Always include tenant_id |
| No idempotency | Duplicate processing | Event ID tracking |
| Synchronous disguise | Events that expect immediate response | Use request-reply pattern |
| Event explosion | Too many fine-grained events | Aggregate meaningful events |
| Schema coupling | Breaking changes on update | Event versioning |
| Missing correlation | Can't trace across services | Propagate correlation_id |

### Event Versioning Strategy

| Change Type | Strategy | Consumer Impact |
|-------------|----------|-----------------|
| Add optional field | Same version | None |
| Add required field | New version | Must handle both |
| Remove field | New version | Must handle both |
| Change field type | New version | Migration required |

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Module Facade | Event publication | State change notification |
| Saga Orchestration | Event-driven steps | Workflow coordination |
| Context Propagation | Event envelope | Tenant context preservation |
| Observability | Event tracing | End-to-end visibility |
| DDD Module | Domain events | Bounded context integration |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Event patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `event-driven`
- **Related guides:** `saga-orchestration-patterns`, `module-facade-patterns`
- **background-jobs:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `background-jobs`
- **webhook-delivery:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `webhook-delivery`
- **notification-system:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `notification-system`
- **retry-policies:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `retry-policies`
- **agent-coordination:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agent-coordination`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "event-driven architecture multi-tenant {date}"
- Search: "transactional outbox pattern {date}"
- Search: "domain events modular monolith {date}"
- Search: "event sourcing SaaS platforms {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When should I use events vs direct service calls? | Use events for state change notifications and loose coupling; use direct calls for queries and immediate responses | Events enable decoupled, auditable communication; direct calls are simpler when synchronous response is required |
| How should tenant context be included in integration events? | Always include tenant_id explicitly in event envelope, not just payload | Envelope-level tenant_id enables routing and filtering before payload deserialization |
| Which message broker should I choose for multi-tenant SaaS? | Kafka for high throughput with replay needs; RabbitMQ for simpler operations; Redis Streams for existing Redis infrastructure | Broker choice depends on throughput, replay requirements, and operational expertise |
| How should events be isolated between tenants? | Shared topics with tenant_id partition key for most cases; tenant-specific topics only for compliance requirements | Partition-level isolation balances operational simplicity with tenant ordering guarantees |
| How should I ensure exactly-once processing? | Use transactional outbox pattern with idempotency keys on consumers | Outbox ensures atomicity with state change; idempotency keys handle at-least-once delivery safely |

---

## Related Workflows

- `bmad-bam-module-boundary-design` - Event contract design
- `bmad-bam-internal-contract-design` - Module event interfaces
- `bmad-bam-event-streaming-design` - Event-driven workflow coordination
