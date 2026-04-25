# BAM Integration Patterns Guide

**When to load:** During cross-module integration, API gateway design, protocol selection (GraphQL/WebSocket/gRPC), webhook implementation, message queue setup, or facade contract design for multi-tenant SaaS platforms.
**Integrates with:** Architect (Winston/Kai), Dev (James), DevOps agents, TEA agents

---

## Core Concepts

Multi-tenant integration requires tenant context propagation across all communication boundaries. Every integration point is a potential tenant isolation boundary that must be secured.

### Key Principles

| Principle | Description |
|-----------|-------------|
| Contract-First | Define facade interfaces before implementation |
| Tenant Context Always | First parameter of every method, every message |
| DTOs at Boundaries | Never expose domain entities across modules |
| Version Explicitly | Semantic versioning for all contracts |
| Fail Closed | Missing tenant context denies access |

### Integration Types Overview

| Type | Use Case | Tenant Context | Latency |
|------|----------|----------------|---------|
| Facade (sync) | Queries, immediate needs | Method parameter | Low |
| Event (async) | State changes, notifications | Event payload | Variable |
| GraphQL | Flexible queries, client control | Context injection | Low |
| WebSocket | Real-time, bidirectional | Connection state | Very low |
| gRPC | High-performance services | Metadata headers | Very low |
| Webhook | External notifications | Signed payload | Variable |
| Message Queue | Decoupled processing | Message headers | Variable |

### Tenant Context Flow

```
Client Request
     │
     v
┌──────────────────────────────────────────────────┐
│  API Gateway: Extract tenant from JWT/API key    │
│  Inject: X-Tenant-ID header                      │
└──────────────────────────────────────────────────┘
     │
     ├──► REST/GraphQL: TenantContext parameter
     ├──► WebSocket: Connection state tenant_id
     ├──► gRPC: x-tenant-id metadata
     ├──► Events: tenant_id in payload
     └──► Webhooks: tenant_id in signed body
```

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### Tenant Header

```
X-Tenant-ID: {tenant_uuid}
```

All inter-service communication MUST include the `X-Tenant-ID` header.

### Message Queue Topic Format

```
Pattern: {module}.{event_type}.tenant.{tenant_id}

Examples:
- billing.invoice-created.tenant.abc123
- agent.run-completed.tenant.abc123
- notification.email-sent.tenant.abc123
```

### Facade Contract Signature

```typescript
interface ModuleFacade {
  methodName(
    ctx: TenantContext,    // Always first parameter
    input: InputDTO        // DTOs, not domain entities
  ): Promise<OutputDTO>;   // DTOs, not domain entities
}
```

### Event Payload Structure

```typescript
interface DomainEvent {
  eventId: string;
  eventType: string;
  timestamp: Date;
  tenantId: string;      // Always include
  aggregateId: string;
  version: number;       // For ordering
  payload: object;       // Event-specific data
}
```

### Quality Gate IDs

| Gate | Purpose |
|------|---------|
| QG-I1 | Facade contract convergence verified |
| QG-I2 | Tenant isolation at integration boundaries |
| QG-I3 | Agent tool contract validation |

---

## Decision Framework

### Protocol Selection Matrix

| Factor | REST | GraphQL | WebSocket | gRPC |
|--------|------|---------|-----------|------|
| Query flexibility | Low | High | N/A | Low |
| Real-time | No | Subscriptions | Yes | Streaming |
| Performance | Good | Good | Excellent | Excellent |
| Browser support | Excellent | Excellent | Good | Limited |
| Type safety | Manual | Schema | Manual | Proto |
| Multi-tenant fit | Good | Excellent | Good | Excellent |

### Quick Decision Matrix

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Client needs flexible queries | GraphQL with tenant context | Reduces over-fetching, single endpoint |
| Real-time updates needed | WebSocket with tenant connection state | Bidirectional, low latency |
| High-performance services | gRPC with tenant metadata | Binary protocol, streaming |
| External notifications | Webhooks with HMAC signing | Industry standard, async |
| Decoupled processing | Message queue with tenant topics | Isolation, retry, ordering |
| Cross-module data read | Sync facade call | Immediate consistency |
| Cross-module state change | Async event | Loose coupling, resilience |

### Communication Style Decision

```
START: What communication style?
│
├─► Need immediate response?
│   ├─► Yes → Sync facade call
│   └─► No → Async event
│
├─► Client flexibility needed?
│   ├─► Yes → GraphQL
│   └─► No → REST or gRPC
│
├─► Real-time bidirectional?
│   ├─► Yes → WebSocket
│   └─► No → Consider SSE
│
└─► External system delivery?
    ├─► Push → Webhook
    └─► Pull → API polling
```

---

## §api-gateway

### Pattern: API Gateway for Multi-Tenant

**When to use:** API entry point, tenant extraction, rate limiting
**Phase:** foundation

#### Gateway Responsibilities

| Responsibility | Description | Tenant Impact |
|---------------|-------------|---------------|
| Authentication | Validate credentials | Tenant identity extraction |
| Authorization | Check permissions | Tenant-scoped access |
| Rate limiting | Throttle requests | Per-tenant quotas |
| Routing | Direct to services | Tenant-aware routing |
| Transformation | Modify request/response | Tenant context injection |

#### Tenant Extraction Methods

| Method | Implementation | Use Case | Priority |
|--------|----------------|----------|----------|
| JWT claim | `tenant_id` in token | OAuth flows | 1 (highest) |
| API key | Key-to-tenant mapping | M2M integration | 2 |
| Subdomain | `{tenant}.api.example.com` | B2B SaaS | 3 |
| Header | `X-Tenant-ID` (internal only) | Request source validation | 4 |

#### Rate Limiting by Tier

| Tier | Requests/min | Burst | Overage Handling |
|------|--------------|-------|------------------|
| Free | 60 | 10 | Hard block |
| Pro | 600 | 100 | Soft limit + warning |
| Enterprise | 6000 | 1000 | Custom arrangement |

#### Gateway Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Trust client tenant ID | Security bypass | Verify via JWT or API key |
| Global rate limits only | Noisy neighbor | Per-tenant rate limiting |
| No request correlation | Debugging impossible | Inject X-Request-ID |
| Blocking quota check | Latency spike | Async quota updates |

#### Web Research

- "multi-tenant API gateway patterns {date}"
- "API gateway tenant isolation {date}"

---

## §graphql

### Pattern: Multi-Tenant GraphQL

**When to use:** Flexible client queries, nested data, subscriptions
**Phase:** solutioning

#### GraphQL Tenant Challenges

| Challenge | Description | Mitigation |
|-----------|-------------|------------|
| Query complexity | Unbounded nested queries | Cost analysis |
| N+1 queries | Per-tenant data loading | DataLoader batching |
| Schema exposure | Introspection reveals structure | Tier-gated introspection |
| Subscription leakage | Cross-tenant event delivery | Topic per tenant |

#### Context Injection

| Point | Method | Availability |
|-------|--------|--------------|
| HTTP middleware | Header/JWT extraction | Before resolution |
| Context factory | Per-request context build | Resolution time |
| Directive | Schema-level enforcement | Field-level |

#### Query Cost Limits by Tier

| Tier | Max Cost | Max Depth | Max Aliases | Rate Limit |
|------|----------|-----------|-------------|------------|
| Free | 100 | 3 | 5 | 10/min |
| Pro | 500 | 5 | 20 | 100/min |
| Enterprise | 2000 | 10 | 100 | 1000/min |

#### DataLoader Isolation Rules

| Rule | Purpose | Enforcement |
|------|---------|-------------|
| No cross-tenant batching | Prevent data leakage | Separate batch queues |
| Tenant in cache key | Cache isolation | Key prefix pattern |
| Request-scoped loaders | Prevent state leakage | Factory per request |
| Verify loaded data | Defense in depth | Post-load tenant check |

#### Subscription Isolation

| Strategy | Description | Performance |
|----------|-------------|-------------|
| Topic per tenant | Separate pub/sub topics | Best isolation |
| Filter on delivery | Check tenant at delivery | Most flexible |
| Hybrid | Topic + filter | Balanced |

#### Web Research

- "GraphQL multi-tenant isolation patterns {date}"
- "GraphQL query cost limiting per tenant {date}"

---

## §websocket

### Pattern: Multi-Tenant WebSocket

**When to use:** Real-time updates, bidirectional communication, presence
**Phase:** solutioning

#### WebSocket Challenges

| Challenge | Description | Impact |
|-----------|-------------|--------|
| Connection state | Long-lived tenant context | Memory management |
| Cross-tenant leakage | Messages to wrong tenant | Security breach |
| Resource exhaustion | One tenant consuming all connections | Service degradation |

#### Connection Pooling by Tier

| Tier | Max Connections | Connection Timeout | Idle Timeout |
|------|-----------------|-------------------|--------------|
| Free | 5 | 30s | 5 min |
| Pro | 100 | 60s | 30 min |
| Enterprise | 1000 | 120s | 60 min |

#### Context Validation Points

| Point | Validation | Failure Action |
|-------|------------|----------------|
| Connection open | Authenticate + extract tenant | Reject connection |
| Message receive | Verify tenant context | Drop message + log |
| Subscription request | Check tenant permissions | Deny subscription |
| Broadcast | Filter by tenant | Tenant-scoped delivery |

#### Sticky Session Strategies

| Strategy | Description | WebSocket Suitability |
|----------|-------------|----------------------|
| Round robin | Equal distribution | Poor (no affinity) |
| Consistent hashing | Tenant ID based routing | Excellent |
| Cookie/header | Application-controlled | Excellent |

#### Web Research

- "WebSocket multi-tenant isolation patterns {date}"
- "WebSocket connection pooling per tenant {date}"

---

## §grpc

### Pattern: Multi-Tenant gRPC

**When to use:** High-performance services, service mesh, streaming
**Phase:** solutioning

#### Metadata Propagation

| Key | Purpose | Format | Required |
|-----|---------|--------|----------|
| x-tenant-id | Primary tenant identifier | UUID/string | Yes |
| x-tenant-tier | Subscription tier | enum | Yes |
| x-correlation-id | Request tracing | UUID | Yes |
| authorization | Bearer token | Bearer {token} | Yes |

#### Interceptor Chain Order

| Order | Interceptor | Responsibility | Blocking |
|-------|-------------|----------------|----------|
| 1 | Logging | Request/response logging | No |
| 2 | Metrics | Latency, error tracking | No |
| 3 | Auth | Token validation | Yes |
| 4 | Tenant | Tenant context extraction | Yes |
| 5 | Rate limiting | Quota enforcement | Yes |

#### Streaming Isolation

| Stream Type | Isolation Point | Context Lifetime |
|-------------|-----------------|------------------|
| Unary | Per-request | Single call |
| Server stream | Stream initialization | Stream duration |
| Client stream | First message | Stream duration |
| Bidirectional | Connection establishment | Connection duration |

#### Service Mesh Integration

| Capability | Tenant Application | Implementation |
|------------|-------------------|----------------|
| mTLS | Tenant identity in cert | SPIFFE/SPIRE |
| Traffic management | Per-tenant routing | Virtual services |
| Circuit breaking | Tenant isolation on failure | DestinationRule |

#### Web Research

- "gRPC multi-tenant patterns {date}"
- "gRPC interceptor tenant isolation {date}"

---

## §webhook

### Pattern: Tenant Webhook Delivery

**When to use:** External notifications, event delivery, integrations
**Phase:** solutioning

#### Webhook Security

| Security Measure | Purpose | Implementation |
|------------------|---------|----------------|
| Signature | Verify sender | HMAC-SHA256 |
| Timestamp | Prevent replay | Include in signature |
| HTTPS | Encrypt transit | Required |
| IP Allowlist | Source verification | Optional |

#### Retry Strategy

| Retry Attempt | Delay | Action |
|---------------|-------|--------|
| 1 | 1 minute | Retry |
| 2 | 5 minutes | Retry |
| 3 | 30 minutes | Retry |
| 4 | 2 hours | Retry |
| 5 | 12 hours | Retry |
| 6+ | - | Dead letter + notify tenant |

#### Per-Tier Configuration

| Tier | Max Endpoints | Event Types | Retry Attempts |
|------|---------------|-------------|----------------|
| Free | 1 | Limited | 3 |
| Pro | 5 | All standard | 5 |
| Enterprise | 20 | All + custom | 10 |

#### Webhook Payload Structure

| Field | Required | Description |
|-------|----------|-------------|
| id | Yes | Unique event ID |
| type | Yes | Event type |
| tenant_id | Yes | Tenant identifier |
| created_at | Yes | Event timestamp |
| data | Yes | Event payload |
| api_version | Yes | API version |

#### Web Research

- "webhook delivery patterns {date}"
- "webhook reliability multi-tenant {date}"

---

## §message-queue

### Pattern: Message Queue Tenant Isolation

**When to use:** Decoupled processing, event-driven architecture, async workflows
**Phase:** solutioning

#### Isolation Strategy Comparison

| Strategy | Isolation Level | Operational Cost | Best For |
|----------|-----------------|------------------|----------|
| Topic-per-tenant | High | High | Regulated industries |
| Partition-based | Medium | Medium | Cost-conscious |
| Header-based filtering | Low | Low | Simple use cases |

#### Topic Naming Convention

```
{domain}.{event-type}.tenant.{tenant_id}
```

#### Topic Configuration by Tier (Kafka)

| Configuration | Free | Pro | Enterprise |
|---------------|------|-----|------------|
| Partitions | 1 | 3 | 6+ |
| Replication Factor | 1 | 2 | 3 |
| Retention | 1 day | 7 days | 30 days |
| Max Message Size | 1MB | 5MB | 10MB |

#### Required Message Headers

| Header | Type | Description |
|--------|------|-------------|
| X-Tenant-ID | String | Tenant identifier |
| X-Correlation-ID | String | Request trace ID |
| X-User-ID | String | Originating user |
| X-Source-Service | String | Producing service |
| X-Message-Version | String | Schema version |

#### Dead Letter Queue Handling

| Failure Type | Action | Retry Policy |
|--------------|--------|--------------|
| Transient | Route to DLQ with retry | Exponential backoff, max 5 |
| Permanent | Route to DLQ, no retry | Manual intervention |
| Poison pill | Route to quarantine | Human review |

#### Consumer Group Convention

```
{service}.{function}.tenant.{tenant_id}
```

#### Web Research

- "Kafka multi-tenant topic isolation patterns {date}"
- "message queue tenant isolation SaaS {date}"

---

## §event-driven

### Pattern: Event-Driven Integration

**When to use:** Loose coupling, eventual consistency, module decoupling
**Phase:** solutioning

#### Event Contract Rules

| Rule | Description |
|------|-------------|
| Add new optional fields only | Backward compatible |
| Never remove or rename fields | Breaking change |
| Never change field types | Breaking change |
| Always include tenant_id | Isolation requirement |
| Include version for ordering | Enables replay |

#### Schema Evolution Strategy

| Version Change | Action | Example |
|----------------|--------|---------|
| Patch | Fix typo (with alias) | `user_id` to `userId` |
| Minor | Add optional field | Add `metadata?: object` |
| Major | Breaking change | Remove required field |

#### Circuit Breaker Configuration

| Parameter | Free Tier | Pro Tier | Enterprise |
|-----------|-----------|----------|------------|
| Failure Threshold | 3 | 5 | 10 |
| Reset Timeout | 30s | 60s | 120s |
| Half-Open Max Calls | 1 | 3 | 5 |

#### Saga Compensation Pattern

| Step | Action | Compensation |
|------|--------|--------------|
| CreateTenant | Insert tenant record | Delete tenant record |
| ProvisionDB | Create schema | Drop schema |
| SetupAuth | Create org in IdP | Delete org from IdP |
| CreateSubscription | Subscribe in Stripe | Cancel subscription |

#### Web Research

- "event-driven architecture multi-tenant {date}"
- "saga pattern multi-tenant compensation {date}"

---

## §api-versioning

### Pattern: API Version Routing

**When to use:** API evolution, backward compatibility, tenant migration
**Phase:** solutioning

#### Versioning Strategy Comparison

| Strategy | Format | Pros | Cons |
|----------|--------|------|------|
| URL Path | `/v1/resources` | Clear, cacheable | URL pollution |
| Header | `API-Version: 2024-01` | Clean URLs | Less visible |
| Query Param | `?api-version=1` | Easy testing | Cache issues |

#### Version Support by Tier

| Tier | Concurrent Versions | Sunset Extension | Custom Pinning |
|------|---------------------|------------------|----------------|
| Free | Current only | No | No |
| Pro | Current + 1 prior | 3 months | Request-based |
| Enterprise | All supported | 12 months | Yes |

#### Version Routing Priority

| Priority | Check | Route To |
|----------|-------|----------|
| 1 | Tenant pinned version | Pinned version |
| 2 | Request header/path | Requested version |
| 3 | Tier default | Tier-specific default |
| 4 | Platform default | Current stable |

#### Breaking vs Non-Breaking Changes

| Change Type | Breaking | Handling |
|-------------|----------|----------|
| Remove endpoint | Yes | Major version |
| Remove field | Yes | Major version |
| Change field type | Yes | Major version |
| Add optional field | No | Minor version |
| Add new endpoint | No | Minor version |

#### Deprecation Communication

| Channel | Timing | Content |
|---------|--------|---------|
| API response headers | Immediate | Deprecation-Warning header |
| Documentation | 6 months before | Migration guide |
| Email notification | 3 months before | Impact and timeline |
| Dashboard alert | Ongoing | Usage of deprecated endpoints |

#### Web Research

- "API versioning multi-tenant SaaS {date}"
- "API deprecation best practices {date}"

---

## Quality Gates

| Gate | Key Checks | Related Patterns |
|------|------------|------------------|
| QG-I1 | Facade contracts have passing tests | §api-gateway, §event-driven |
| QG-I2 | Tenant context propagates across all protocols | §graphql, §websocket, §grpc |
| QG-I3 | Message queue topics follow tenant naming | §message-queue |

### Gate Verification Checklist

- [ ] **CRITICAL:** X-Tenant-ID propagates through all integration boundaries
- [ ] Facade contracts use TenantContext as first parameter
- [ ] GraphQL resolvers inject tenant context from auth
- [ ] WebSocket connections validate tenant at establishment
- [ ] gRPC interceptors extract tenant from metadata
- [ ] Message queue topics follow `{module}.{event}.tenant.{tenant_id}` format
- [ ] Webhooks sign payloads with tenant-specific secrets
- [ ] API versioning allows tenant-specific pinning
- [ ] Circuit breakers configured per tier
- [ ] Dead letter queues isolated per tenant

---

## Web Research

| Topic | Query |
|-------|-------|
| API integration | "multi-tenant API integration patterns {date}" |
| GraphQL | "GraphQL multi-tenant isolation patterns {date}" |
| WebSocket | "WebSocket tenant isolation real-time {date}" |
| gRPC | "gRPC service mesh multi-tenant {date}" |
| Message queues | "Kafka RabbitMQ multi-tenant isolation {date}" |
| Webhooks | "webhook delivery reliability patterns {date}" |

---

## Related Patterns

Cross-references to other domain guides:

- `security-patterns-guide.md` §api-key-security - API key management
- `tenant-patterns-guide.md` §tenant-context - Tenant context propagation
- `reliability-patterns-guide.md` §circuit-breaker - Resilience patterns
- `observability-patterns-guide.md` §distributed-tracing - Cross-service tracing

Load from pattern registry:
- `bam-patterns.csv` → filter: `integration-*`, `event-driven`, `facade-contracts`

Use the `web_queries` column from pattern registry for current best practices.

---

## Related Workflows

| Workflow | When to Use |
|----------|-------------|
| `define-facade-contract` | Design module facade contracts |
| `evolve-facade-contract` | Version and evolve contracts |
| `bmad-bam-convergence-verification` | Verify integration convergence |
| `bmad-bam-api-gateway-design` | Design API gateway layer |
| `bmad-bam-api-version-release` | Release new API versions |
| `validate-foundation` | Verify QG-F1 integration baseline |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | {date} | Initial consolidated guide from 13 source files |
