# Tenant Context Propagation Patterns

**When to load:** When designing context passing across services, async boundaries, or when user mentions tenant context, correlation IDs, or distributed tracing.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What is Tenant Context Propagation?

Tenant context propagation ensures that tenant identity and related metadata flow through all layers of the system, including async operations, background jobs, and distributed services.

### Propagation Strategy Comparison

| Strategy | Scope | Use Case |
|----------|-------|----------|
| Thread-Local | Single thread | Synchronous calls |
| Async Context | Async boundaries | Promise/async-await |
| Correlation ID | Cross-service | Distributed tracing |
| Baggage | Full propagation | End-to-end context |

---

## Key Patterns

### Pattern 1: Thread-Local Context

Store context in thread-local storage.

| Component | Description | Limitation |
|-----------|-------------|------------|
| Storage | Thread-bound variable | Single thread only |
| Set | On request start | Per request |
| Get | In any handler | Same thread |
| Clear | On request end | Prevent leakage |

### Thread-Local Flow

```
Request Arrives
      │
      ├── Extract tenant_id
      │
      ├── Set thread-local context
      │
      ├── Process request
      │   └── Access context anywhere
      │
      └── Clear context
```

### Pattern 2: Async Context Propagation

Maintain context across async boundaries.

| Component | Description | Implementation |
|-----------|-------------|----------------|
| Context Store | Async-aware storage | AsyncLocalStorage |
| Propagation | Automatic in async | Runtime support |
| Manual Passing | Explicit transfer | When needed |
| Framework Support | Built-in helpers | Middleware |

### Async Context Flow

```
┌─────────────────────────────────────────┐
│        Async Context Flow               │
│                                          │
│  Request Handler                        │
│       │                                  │
│       ├── Set context                   │
│       │                                  │
│       ├── await serviceA()              │
│       │   └── context available         │
│       │                                  │
│       ├── await Promise.all([           │
│       │      serviceB(),   ← context    │
│       │      serviceC()    ← context    │
│       │   ])                            │
│       │                                  │
│       └── return response               │
└─────────────────────────────────────────┘
```

### Pattern 3: Correlation ID Chain

Link requests across services.

| Component | Description | Implementation |
|-----------|-------------|----------------|
| Generation | Create unique ID | On edge request |
| Header | Transport mechanism | X-Correlation-ID |
| Propagation | Forward to downstream | Every call |
| Logging | Include in all logs | Structured logging |

### Correlation Flow

```
Client Request
     │
     └── X-Correlation-ID: corr-123
              │
     ┌────────┴────────┐
     v                 v
  Service A        Service B
     │                 │
     └── corr-123      └── corr-123
              │
              v
         Service C
              │
              └── corr-123

All logs include corr-123 for tracing
```

### Pattern 4: Distributed Baggage

Full context propagation across services.

| Field | Description | Example |
|-------|-------------|---------|
| tenant_id | Tenant identifier | `tenant_abc` |
| user_id | Current user | `user_123` |
| correlation_id | Request trace | `corr-456` |
| tier | Subscription tier | `pro` |
| region | Data residency | `eu-west-1` |

### Baggage Structure

```
┌─────────────────────────────────────────┐
│         Context Baggage                  │
│                                          │
│  {                                       │
│    "tenant_id": "tenant_abc",           │
│    "user_id": "user_123",               │
│    "correlation_id": "corr-456",        │
│    "tier": "pro",                       │
│    "trace_id": "trace-789"              │
│  }                                       │
│                                          │
│  Propagated via headers/metadata        │
└─────────────────────────────────────────┘
```

---

## Application Guidelines

When implementing context propagation:

1. **Capture at edge** - Extract tenant context on first entry
2. **Propagate everywhere** - Async, queues, external calls
3. **Validate consistency** - Check tenant matches expectations
4. **Log with context** - Include tenant in all logs
5. **Clear on completion** - Prevent context leakage

---

## Propagation Points

| Boundary | Mechanism | Implementation |
|----------|-----------|----------------|
| HTTP | Headers | X-Tenant-ID, traceparent |
| Message Queue | Message metadata | Properties/headers |
| Background Job | Job payload | Serialize context |
| Database | Session variable | SET tenant_id |
| WebSocket | Connection state | On connect |

---

## Context Serialization

| Format | Use Case | Example |
|--------|----------|---------|
| Headers | HTTP calls | `X-Tenant-ID: abc` |
| JSON | Message payload | `{"tenant_id": "abc"}` |
| Base64 | Compact binary | Encoded context |
| W3C Baggage | Standard | `tenant_id=abc` |

---

## Integration with Observability

| Signal | Context Include | Benefit |
|--------|-----------------|---------|
| Traces | tenant_id, correlation_id | Per-tenant tracing |
| Logs | All context fields | Structured search |
| Metrics | tenant_id label | Per-tenant metrics |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Lost in async | Context not propagated | Async context support |
| Missing in jobs | Jobs process wrong tenant | Include in job payload |
| No validation | Stale context used | Validate on boundaries |
| Not logging | Can't correlate | Include in all logs |
| Memory leak | Context not cleared | Clear on request end |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How to propagate in async? | AsyncLocalStorage (Node.js) or similar | Automatic propagation |
| What to include in baggage? | tenant_id, user_id, correlation_id minimum | Essential for tracing and isolation |
| Header names? | Standard headers where possible | Interoperability |
| Queue propagation? | Message properties/headers | Separate from payload |

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Configure context extraction
- `bmad-bam-tenant-aware-observability` - Context in telemetry
- `bmad-bam-convergence-verification` - Verify propagation

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Context propagation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-context-propagation`
- **Observability:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Tenant routing:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-routing`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "tenant context propagation async {date}"
- Search: "distributed context multi-tenant {date}"
- Search: "OpenTelemetry baggage patterns {date}"
