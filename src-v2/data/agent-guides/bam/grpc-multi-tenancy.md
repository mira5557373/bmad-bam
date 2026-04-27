# gRPC Multi-Tenancy Patterns

**When to load:** When designing gRPC services for multi-tenant SaaS, implementing service mesh integration, or when user mentions gRPC metadata, interceptors, streaming isolation, or gRPC load balancing.

**Integrates with:** Architect (Atlas/Kai persona), Developer agent, DevOps agent

---

## Core Concepts

### What is gRPC Multi-Tenancy?

gRPC multi-tenancy involves building high-performance RPC services that serve multiple tenants while maintaining isolation, context propagation, and fair resource allocation. gRPC's metadata system, interceptor chain, and streaming capabilities require tenant-aware implementation patterns distinct from REST APIs.

### gRPC Tenancy Challenges

| Challenge | Description | Complexity |
|-----------|-------------|------------|
| Metadata propagation | Tenant context across calls | Medium |
| Stream isolation | Long-lived tenant streams | High |
| Connection pooling | Multiplexed connections | Medium |
| Load balancing | Client-side tenant routing | High |
| Deadline management | Per-tenant timeouts | Medium |

### gRPC Request Flow

```
+------------------------------------------------------------------+
|  Client            Channel           Server         Service      |
|  +--------+       +--------+        +----------+   +-----------+ |
|  |Metadata| --->  |Intercept| --->  |Validate  |-->|Tenant     | |
|  |Inject  |       |Propagate|       |Context   |   |Scoped     | |
|  +--------+       +--------+        +----------+   |Logic      | |
|       |                |                 |         +-----------+ |
|       v                v                 v                       |
|  Client Interceptor   Transport    Server Interceptor            |
+------------------------------------------------------------------+
```

---

## Metadata Propagation for Tenant Context

### Standard Metadata Keys

| Key | Purpose | Format | Required |
|-----|---------|--------|----------|
| x-tenant-id | Primary tenant identifier | UUID/string | Yes |
| x-tenant-tier | Subscription tier | enum | Yes |
| x-correlation-id | Request tracing | UUID | Yes |
| x-user-id | Authenticated user | UUID | Conditional |
| authorization | Bearer token | Bearer {token} | Yes |

### Metadata Injection Patterns

| Pattern | Implementation | Use Case |
|---------|----------------|----------|
| Client interceptor | Automatic metadata injection | All outbound calls |
| Call options | Per-call metadata override | Specific operations |
| Channel credentials | Token refresh integration | Auth token management |
| Context propagation | Inherit from parent context | Nested service calls |

### Metadata Validation Rules

| Validation | Server Action | Client Impact |
|------------|---------------|---------------|
| Missing tenant ID | INVALID_ARGUMENT | Retry with metadata |
| Invalid tenant | PERMISSION_DENIED | Auth flow retry |
| Expired token | UNAUTHENTICATED | Token refresh |
| Tier mismatch | FAILED_PRECONDITION | Feature unavailable |

### Context Preservation Across Services

| Scenario | Propagation Method | Verification |
|----------|-------------------|--------------|
| Direct call | Metadata forwarding | Interceptor check |
| Queue/async | Message headers | Consumer validation |
| Scheduled jobs | Job metadata | Scheduler injection |
| Retries | Original context | Idempotency key |

---

## Interceptors for Tenant Validation

### Interceptor Chain Architecture

| Order | Interceptor | Responsibility | Blocking |
|-------|-------------|----------------|----------|
| 1 | Logging | Request/response logging | No |
| 2 | Metrics | Latency, error tracking | No |
| 3 | Auth | Token validation | Yes |
| 4 | Tenant | Tenant context extraction | Yes |
| 5 | Rate limiting | Quota enforcement | Yes |
| 6 | Deadline | Timeout management | No |

### Server Interceptor Responsibilities

| Interceptor Type | Function | Error Code |
|------------------|----------|------------|
| Unary | Single request validation | INVALID_ARGUMENT |
| Server streaming | Stream initialization check | PERMISSION_DENIED |
| Client streaming | First message validation | CANCELLED |
| Bidirectional | Connection context | UNAVAILABLE |

### Client Interceptor Responsibilities

| Function | Implementation | Fallback |
|----------|----------------|----------|
| Metadata injection | Add tenant headers | Fail fast |
| Retry logic | Tenant-aware retry | Exponential backoff |
| Deadline propagation | Adjust for tier | Default timeout |
| Error mapping | Translate gRPC codes | User-friendly errors |

### Interceptor Implementation Patterns

| Pattern | Purpose | Complexity |
|---------|---------|------------|
| Context enrichment | Add tenant to context | Low |
| Early rejection | Fail before processing | Low |
| Audit logging | Track tenant operations | Medium |
| Cost tracking | Metering per tenant | Medium |
| Circuit breaking | Per-tenant circuit state | High |

---

## Streaming with Tenant Isolation

### Stream Types and Isolation

| Stream Type | Isolation Point | Context Lifetime |
|-------------|-----------------|------------------|
| Unary | Per-request | Single call |
| Server stream | Stream initialization | Stream duration |
| Client stream | First message | Stream duration |
| Bidirectional | Connection establishment | Connection duration |

### Stream Management Per Tenant

| Concern | Strategy | Implementation |
|---------|----------|----------------|
| Max concurrent streams | Per-tenant limit | Semaphore |
| Stream duration | Tier-based timeout | Deadline enforcement |
| Message rate | Per-stream throttling | Token bucket |
| Buffer size | Tenant quota | Flow control |

### Streaming Security Patterns

| Pattern | Description | Protection |
|---------|-------------|------------|
| Context pinning | Lock tenant on stream start | Cross-tenant access |
| Message validation | Verify each message | Data integrity |
| Stream termination | Force close on violation | Resource cleanup |
| Heartbeat monitoring | Detect stale streams | Connection leaks |

### Long-Running Stream Considerations

| Consideration | Challenge | Mitigation |
|---------------|-----------|------------|
| Context expiry | Token expires mid-stream | Refresh mechanism |
| Tenant changes | Tier upgrade/downgrade | Stream renegotiation |
| Resource leaks | Abandoned streams | Idle timeout |
| Failover | Server restart | Reconnect logic |

---

## Service Mesh Integration

### Service Mesh Benefits for Multi-Tenancy

| Capability | Tenant Application | Implementation |
|------------|-------------------|----------------|
| mTLS | Tenant identity in cert | SPIFFE/SPIRE |
| Traffic management | Per-tenant routing | Virtual services |
| Observability | Tenant-tagged metrics | Sidecar injection |
| Policy enforcement | Tenant authorization | AuthorizationPolicy |

### Istio Integration Patterns

| Pattern | Configuration | Effect |
|---------|---------------|--------|
| Header routing | VirtualService match | Route by tenant header |
| Rate limiting | EnvoyFilter | Per-tenant throttling |
| Circuit breaking | DestinationRule | Tenant isolation on failure |
| Retry policy | VirtualService retry | Tenant-aware retries |

### Linkerd Integration Patterns

| Pattern | Configuration | Effect |
|---------|---------------|--------|
| Service profiles | Per-tenant profiles | Route configuration |
| Traffic split | TrafficSplit | Tenant-based routing |
| Authorization | Server authorization | Policy enforcement |
| Metrics | Prometheus labels | Tenant cardinality |

### Sidecar Considerations

| Consideration | Challenge | Solution |
|---------------|-----------|----------|
| Metadata propagation | Headers through proxy | Preserve x-tenant-* |
| Connection pooling | Per-destination pools | Tenant-aware pooling |
| Circuit state | Shared vs isolated | Per-tenant circuits |
| Timeout propagation | Deadline handling | Context deadline |

---

## Load Balancing Strategies

### Client-Side Load Balancing

| Strategy | Description | Tenant Suitability |
|----------|-------------|-------------------|
| Round robin | Equal distribution | Fair but no affinity |
| Pick first | First healthy | Simple but no distribution |
| Weighted | Capacity-based | Good for heterogeneous |
| Custom | Tenant-aware routing | Best for isolation |

### Tenant-Aware Routing

| Routing Strategy | Implementation | Use Case |
|------------------|----------------|----------|
| Hash-based | tenant_id hash to server | Consistent routing |
| Dedicated servers | Tenant to server mapping | Enterprise isolation |
| Geographic | Region-based routing | Data residency |
| Tier-based | Priority to dedicated pool | SLA tiers |

### Server-Side Load Balancing

| Component | Configuration | Tenant Support |
|-----------|---------------|----------------|
| L4 load balancer | Connection distribution | None (connection level) |
| L7 load balancer | HTTP/2 aware routing | Header-based routing |
| Service mesh | Intelligent routing | Full tenant awareness |
| DNS | Geographic routing | Domain-based tenancy |

### Connection Management

| Aspect | Single-Tenant | Multi-Tenant |
|--------|---------------|--------------|
| Pooling | Shared pool | Tenant-partitioned |
| Keepalive | Standard | Tier-based intervals |
| Max connections | Server limit | Per-tenant limit |
| Backoff | Standard | Tenant-priority based |

---

## Application Guidelines

When designing gRPC multi-tenancy:

1. Define standard metadata keys for tenant context
2. Implement interceptor chain with tenant validation early
3. Pin tenant context at stream initialization
4. Use service mesh for transparent policy enforcement
5. Design client-side load balancing with tenant affinity
6. Monitor per-tenant metrics separately

---

## Implementation Example

### gRPC Server Interceptor for Tenant Validation

```python
# Example: Python gRPC interceptor for tenant context
import grpc
from grpc import ServerInterceptor

class TenantInterceptor(ServerInterceptor):
    """Server interceptor to extract and validate tenant context"""
    
    def intercept_service(self, continuation, handler_call_details):
        # Extract metadata from incoming request
        metadata = dict(handler_call_details.invocation_metadata)
        
        tenant_id = metadata.get('x-tenant-id')
        auth_token = metadata.get('authorization')
        
        if not tenant_id:
            return self._abort_handler(
                grpc.StatusCode.INVALID_ARGUMENT,
                'Missing x-tenant-id metadata'
            )
        
        # Validate tenant exists and is active
        if not self.validate_tenant(tenant_id, auth_token):
            return self._abort_handler(
                grpc.StatusCode.PERMISSION_DENIED,
                'Invalid tenant context'
            )
        
        # Check rate limits for tenant
        if self.is_rate_limited(tenant_id):
            return self._abort_handler(
                grpc.StatusCode.RESOURCE_EXHAUSTED,
                'Tenant rate limit exceeded'
            )
        
        return continuation(handler_call_details)
    
    def validate_tenant(self, tenant_id: str, token: str) -> bool:
        """Validate tenant exists and token is authorized"""
        claims = self.verify_token(token)
        return claims.get('tenant_id') == tenant_id
    
    def is_rate_limited(self, tenant_id: str) -> bool:
        """Check if tenant has exceeded rate limits"""
        return self.rate_limiter.is_limited(tenant_id)
```

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Integration patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `facade-contracts`, `event-driven`
- **Isolation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`, `tenant-routing`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "gRPC multi-tenant patterns {date}"
- Search: "gRPC interceptor tenant isolation {date}"
- Search: "gRPC streaming multi-tenant security {date}"
- Search: "service mesh gRPC tenant routing {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How should tenant context be propagated in gRPC calls? | Use metadata headers (x-tenant-id, x-tenant-tier) injected by client interceptor | Metadata is native to gRPC; interceptors ensure consistent injection without per-call boilerplate |
| Where should tenant validation occur in the interceptor chain? | After authentication but before rate limiting (position 4 in chain) | Auth must complete first for trust; validation before rate limiting ensures correct quota bucket |
| How should streaming RPCs maintain tenant isolation? | Pin tenant context at stream initialization; validate matches on first message | Context established once per stream; validation catches hijacking attempts on long-lived connections |
| Should I use service mesh for multi-tenant gRPC? | Yes for production deployments; leverage mTLS and traffic policies | Service mesh provides transparent tenant routing, authorization policies, and observability without code changes |
| How should client-side load balancing incorporate tenant affinity? | Use consistent hashing on tenant_id for routing decisions | Improves cache hit rates and connection reuse; maintains tenant state locality across retries |

---

## Related Workflows

- `create-master-architecture` - Service communication decisions
- `define-facade-contract` - gRPC service contracts
- `bmad-bam-module-boundary-design` - Inter-module communication
