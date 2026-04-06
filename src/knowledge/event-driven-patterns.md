# Event-Driven Patterns

## Domain Event Structure

```python
class DomainEvent:
    event_type: str      # "{module}.{EventName}" e.g., "users.UserCreated"
    event_id: str        # UUID, unique per event
    tenant_id: str       # REQUIRED — which tenant this event belongs to
    occurred_at: datetime # When the event happened
    correlation_id: str  # Request trace ID
```

## Publishing Rules

1. Events published AFTER successful transaction commit
2. Event payload includes tenant_id (mandatory)
3. Event type follows convention: `{module_name}.{PastTenseVerb}`
4. Events are facts — immutable once published
5. Publisher does not know or care who consumes the event

## Consuming Rules

1. Handlers are idempotent (same event processed twice = same result)
2. Handler failures go to dead letter queue, never fail the publisher
3. Handlers filter by tenant_id if tenant-scoped
4. Cross-module event consumption declared in module architecture

## Event vs Facade

- Use FACADE when: you need a synchronous response, you need data NOW
- Use EVENT when: you're notifying others of something that happened,
  consumer can process asynchronously, you want loose coupling

## Kafka Topics

- One topic per event type: `{module}.{event_name}`
- Partitioned by tenant_id for ordering within tenant
- Schema Registry enforces payload schema

## Schema Evolution Rules

| Change Type        | Allowed?        | Consumer Impact                            | Rule                                                 |
| ------------------ | --------------- | ------------------------------------------ | ---------------------------------------------------- |
| Add optional field | ✅ Always       | None — old consumers ignore new fields     | New fields MUST have defaults                        |
| Remove field       | ❌ Never direct | Breaking — consumers fail on missing field | Deprecate field for 2 sprints, then remove           |
| Rename field       | ❌ Never        | Breaking                                   | Add new field + deprecate old (same 2-sprint window) |
| Change field type  | ❌ Never        | Breaking                                   | Publish new event type, run both in parallel         |

**Enforcement:** Schema Registry rejects any schema update that fails backward-compatibility check. Producer CI pipeline includes `schema-registry-test` step that validates new schemas against all registered consumer versions.

**Consumer migration pattern:** When a deprecated field reaches end-of-life, the producing module creates a migration story per consuming module (same pattern as facade breaking changes in S22.4). Consumer modules update within the 2-sprint window or pin to the old schema version.

## Key Points

- Events are facts about the past — immutable once published
- tenant_id in every event payload is non-negotiable
- Publisher never knows consumers; consumer failures never block publisher
- Use facade for synchronous data needs, events for async notifications

## Anti-Pattern

| Anti-Pattern                      | Problem                              | Correct Approach                        |
| --------------------------------- | ------------------------------------ | --------------------------------------- |
| Event without tenant_id           | Cross-tenant contamination risk      | tenant_id mandatory in all events       |
| Non-idempotent handler            | Duplicate processing on retry        | Design handlers to be idempotent        |
| Handler failure blocks publisher  | Cascading failures across modules    | Dead letter queue, never fail publisher |
| Using events for request/response | Adds latency, complex error handling | Use facade for synchronous needs        |

See also: module-facade-patterns.md, saga-orchestration-patterns.md, shared-kernel-patterns.md
