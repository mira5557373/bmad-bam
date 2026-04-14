# Context Propagation Patterns

**When to load:** When designing distributed tenant context flow, implementing async context passing, or when user mentions context loss, distributed tracing, or cross-service tenant ID.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What is Context Propagation?

Context propagation ensures tenant identity and request context flow correctly through all layers of a distributed multi-tenant system, including synchronous calls, async queues, background jobs, and third-party integrations.

### Context Components

| Component | Description | Example |
|-----------|-------------|---------|
| Tenant ID | Primary isolation key | `tenant_abc123` |
| User ID | Acting user | `user_xyz789` |
| Request ID | Correlation identifier | `req_123456` |
| Trace ID | Distributed tracing | `trace_abcdef` |
| Feature flags | Active features | `{new_ui: true}` |
| Tier | Subscription level | `enterprise` |

### Context Propagation Flow

```
Entry Point (Gateway)
    │
    ├── Extract/validate tenant from JWT/header
    │
    ├── Create TenantContext object
    │
    ├── Store in request-scoped storage
    │
    ├── Synchronous calls
    │   ├── HTTP: X-Tenant-ID header
    │   ├── gRPC: metadata
    │   └── Database: session variable
    │
    ├── Async calls
    │   ├── Queue: message header
    │   ├── Events: envelope field
    │   └── Jobs: serialized payload
    │
    └── Exit: clear context
```

---

## Key Patterns

### Pattern 1: Synchronous Propagation

| Layer | Mechanism | Implementation |
|-------|-----------|----------------|
| HTTP | Headers | `X-Tenant-ID`, `X-Request-ID` |
| gRPC | Metadata | `tenant_id` key |
| Database | Session variable | `SET app.tenant_id` |
| Cache | Key prefix | `{tenant_id}:cache_key` |

### Header Standards

| Header | Purpose | Format |
|--------|---------|--------|
| X-Tenant-ID | Tenant identifier | UUID or slug |
| X-Request-ID | Request correlation | UUID |
| X-User-ID | Acting user | UUID |
| X-Tier | Subscription level | free/pro/enterprise |
| traceparent | W3C trace context | Standard format |

### Pattern 2: Async Context Preservation

| Channel | Pattern | Guarantee |
|---------|---------|-----------|
| Message queue | Message headers | Explicit extraction |
| Background job | Job payload | Serialize context |
| Webhook | Callback headers | Include in payload |
| Event stream | Event envelope | Context wrapper |

### Async Context Serialization

| Field | Required | Notes |
|-------|----------|-------|
| tenant_id | Yes | Primary isolation |
| user_id | Sometimes | If user-initiated |
| request_id | Yes | Correlation |
| trace_id | Yes | Distributed tracing |
| timestamp | Yes | Ordering, debugging |
| source | Yes | Origin service |

### Pattern 3: Context Scope Management

| Scope | Lifecycle | Reset Trigger |
|-------|-----------|---------------|
| Request | Single HTTP request | Request completion |
| Session | User session | Logout/timeout |
| Connection | DB connection | Connection return to pool |
| Thread | Thread-local | Thread reuse |

### Context Storage Options

| Storage Type | Pros | Cons | Best For |
|--------------|------|------|----------|
| Thread-local | Fast, simple | Thread reuse risk | Sync code |
| Async context | Async-safe | Propagation overhead | Async code |
| Request-scoped DI | Clean, testable | Framework-dependent | Web services |
| Explicit parameter | No magic, explicit | Verbose | Libraries |

---

## Decision Criteria

### Context Propagation Method Selection

| Scenario | Recommended Method | Rationale |
|----------|-------------------|-----------|
| HTTP services | Headers (X-Tenant-ID) | Standard, cacheable |
| Message queues | Message properties | Broker-native |
| Background jobs | Serialized in payload | Persistence |
| Database calls | Session variable + RLS | Automatic enforcement |
| External APIs | Query param or header | Depends on API |

### When to Propagate Full Context vs Minimal

| Situation | Propagate | Rationale |
|-----------|-----------|-----------|
| Same trust boundary | Full context | Convenience |
| External service | Minimal (tenant_id only) | Security |
| Audit-required | Full context | Compliance |
| Performance-critical | Minimal | Overhead |

---

## Application Guidelines

- Building distributed multi-tenant services
- Implementing async processing with tenant isolation
- Designing observability with tenant correlation
- Debugging cross-service tenant context issues
- Integrating third-party services

---

## Common Pitfalls and Anti-Patterns

| Pitfall | Cause | Prevention |
|---------|-------|------------|
| Context loss | Async boundary | Explicit propagation |
| Context leak | Connection reuse | Clear on return |
| Wrong tenant | Thread-local reuse | Scope validation |
| Missing context | New service | Middleware enforcement |
| Implicit trust | Accepting client-provided context | Always verify |
| No correlation | Missing request_id | Enforce at gateway |

### Context Security Checklist

- [ ] Never trust client-provided tenant_id without verification
- [ ] Validate context at service boundaries
- [ ] Clear context on connection pool return
- [ ] Audit context changes
- [ ] Encrypt context in external communications
- [ ] Timeout stale context in long-running processes

---

## Verification Checklist

- [ ] Context set at entry point
- [ ] Context propagated to all downstream calls
- [ ] Async jobs include context in payload
- [ ] Database connections set tenant context
- [ ] Cache keys include tenant prefix
- [ ] Logs include tenant correlation

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Multi-Tenant Isolation | RLS session variable | Automatic filtering |
| Event-Driven | Event envelope | Async propagation |
| Observability | Trace context | End-to-end tracing |
| API Gateway | Header injection | Entry point setup |
| Module Facade | First parameter | Cross-module flow |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Where should tenant context be established? | At the API gateway/entry point, extracted from JWT claims | Single point of trust establishment; all downstream services inherit validated context |
| How should tenant context be stored in async/await code? | Use async context (AsyncLocalStorage in Node.js, contextvars in Python) | Thread-local storage fails with async code; explicit parameters are verbose and error-prone |
| Should I trust client-provided tenant context headers? | Never for internal services; always re-validate against auth token | Prevents tenant impersonation attacks; defense in depth for multi-tenant isolation |
| How should context be preserved across message queues? | Serialize full tenant context in message envelope/headers | Message consumers may run in different process; context must travel with the message |
| When should I clear tenant context? | At transaction end for database connections, at request completion for HTTP | Prevents context leakage between tenants on connection reuse or thread pool recycling |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Context patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-context-propagation`, `tenant-routing`, `observability`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "tenant context propagation distributed systems {date}"
- Search: "async context preservation multi-tenant {date}"
- Search: "OpenTelemetry baggage tenant context {date}"
- Search: "request scoped context injection {date}"

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Define context propagation requirements for tenant isolation
- `bmad-bam-create-module-architecture` - Design context flow across module boundaries
- `bmad-bam-chaos-engineering-design` - Test context propagation in distributed scenarios
- `bmad-bam-define-facade-contract` - Include TenantContext in all facade method signatures
