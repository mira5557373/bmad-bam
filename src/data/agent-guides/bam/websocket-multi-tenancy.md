# WebSocket Multi-Tenancy Patterns

**When to load:** When designing real-time communication for multi-tenant SaaS, implementing WebSocket-based features, or when user mentions connection pooling, presence management, sticky sessions, or real-time collaboration isolation.

**Integrates with:** Architect (Atlas/Kai persona), Developer agent, DevOps agent

---

## Core Concepts

### What is WebSocket Multi-Tenancy?

WebSocket multi-tenancy involves maintaining persistent bidirectional connections across multiple tenants while ensuring isolation, fair resource allocation, and secure message routing. Unlike stateless HTTP, WebSocket connections maintain state that must be tenant-aware throughout their lifecycle.

### WebSocket Tenancy Challenges

| Challenge | Description | Impact |
|-----------|-------------|--------|
| Connection state | Long-lived tenant context | Memory management |
| Cross-tenant leakage | Messages to wrong tenant | Security breach |
| Resource exhaustion | One tenant consuming all connections | Service degradation |
| Scaling complexity | Stateful connection routing | Infrastructure cost |
| Failover handling | Connection migration | User experience |

### Connection Lifecycle

```
+------------------------------------------------------------------+
|  Client         Load Balancer      WebSocket Server    Backend   |
|  +------+      +-------------+     +---------------+   +-------+ |
|  |Connect| --> |Route to     | --> |Authenticate   |   |       | |
|  |      |     |Sticky Node  |     |Extract Tenant |   |       | |
|  +------+     +-------------+     +-------+-------+   |       | |
|                                          |            |       | |
|  +------+                        +-------v-------+   |       | |
|  |Message| <-------------------> |Tenant Context |<->|Events | |
|  +------+                        |Isolation      |   +-------+ |
+------------------------------------------------------------------+
```

---

## Connection Pooling Per Tenant

### Pool Configuration by Tier

| Tier | Max Connections | Connection Timeout | Idle Timeout |
|------|-----------------|-------------------|--------------|
| Free | 5 | 30s | 5 min |
| Pro | 100 | 60s | 30 min |
| Enterprise | 1000 | 120s | 60 min |

### Pool Management Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Tenant quotas | Hard limit per tenant | Resource protection |
| Priority queuing | Tier-based connection priority | Fair access |
| Graceful degradation | Reduce features under load | High availability |
| Connection recycling | Force reconnect after TTL | Memory management |

### Connection Tracking

| Metric | Storage | Purpose |
|--------|---------|---------|
| Active connections | Redis sorted set | Real-time count |
| Connection metadata | Redis hash | Tenant/user mapping |
| Connection history | Time-series DB | Analytics |
| Peak usage | Rolling window | Capacity planning |

### Pool Isolation Approaches

| Approach | Isolation Level | Complexity | Cost |
|----------|-----------------|------------|------|
| Shared pool with quotas | Low | Low | Lowest |
| Logical partitioning | Medium | Medium | Medium |
| Dedicated server pools | High | High | High |
| Separate clusters | Maximum | Very High | Highest |

---

## Tenant Context in Connection State

### Context Storage Structure

| Field | Storage Location | Lifecycle |
|-------|------------------|-----------|
| tenant_id | Connection metadata | Connection duration |
| user_id | Connection metadata | Connection duration |
| tier | Connection metadata | Connection duration |
| permissions | Cached lookup | TTL-based refresh |
| subscriptions | Server memory | Dynamic updates |

### Context Validation Points

| Point | Validation | Failure Action |
|-------|------------|----------------|
| Connection open | Authenticate + extract tenant | Reject connection |
| Message receive | Verify tenant context | Drop message + log |
| Subscription request | Check tenant permissions | Deny subscription |
| Broadcast | Filter by tenant | Tenant-scoped delivery |

### Context Propagation

| Scenario | Propagation Method | Verification |
|----------|-------------------|--------------|
| Initial connection | Auth token claims | Token validation |
| Reconnection | Session lookup | Session validity |
| Cross-server | Shared state store | State consistency |
| Event processing | Message envelope | Tenant ID match |

### State Synchronization

| Component | Sync Method | Consistency |
|-----------|-------------|-------------|
| Connection registry | Redis pub/sub | Eventual |
| Presence data | Redis + TTL | Eventual |
| Subscription map | Redis set | Strong |
| Message queues | Kafka/Redis streams | Strong |

---

## Presence Management Per Tenant

### Presence Architecture

| Component | Purpose | Storage |
|-----------|---------|---------|
| User presence | Online/offline/away status | Redis with TTL |
| Typing indicators | Real-time activity | Memory + broadcast |
| Active sessions | Multi-device tracking | Redis set |
| Last seen | Historical presence | Database |

### Presence Scoping

| Scope | Visibility | Use Case |
|-------|------------|----------|
| Tenant-wide | All users in tenant | Company directory |
| Channel/room | Channel members only | Collaboration |
| Direct | Specific users only | Private messaging |
| Public | Cross-tenant visibility | Marketplace |

### Presence Update Flow

| Event | Action | Broadcast Scope |
|-------|--------|-----------------|
| Connect | Set online + timestamp | Tenant subscribers |
| Disconnect | Set offline + last seen | Tenant subscribers |
| Heartbeat | Refresh TTL | None |
| Status change | Update status | Subscribed users |

### Presence Scaling Considerations

| Challenge | Solution | Trade-off |
|-----------|----------|-----------|
| High-frequency updates | Debouncing/throttling | Slight delay |
| Large tenant membership | Pagination + lazy load | Complexity |
| Cross-server presence | Shared state store | Latency |
| Offline detection | Heartbeat + TTL | Server load |

---

## Sticky Sessions and Load Balancing

### Load Balancing Strategies

| Strategy | Description | WebSocket Suitability |
|----------|-------------|----------------------|
| Round robin | Equal distribution | Poor (no affinity) |
| Least connections | Route to least loaded | Fair |
| IP hash | Client IP based routing | Good |
| Cookie/header based | Application-controlled | Excellent |
| Consistent hashing | Tenant ID based | Excellent |

### Sticky Session Implementation

| Method | Mechanism | Persistence |
|--------|-----------|-------------|
| Cookie | Session cookie with server ID | Browser session |
| Header | X-Server-Affinity header | Request duration |
| DNS | Tenant-specific subdomain | DNS TTL |
| Token | Server hint in auth token | Token lifetime |

### Failover Handling

| Scenario | Detection | Recovery Action |
|----------|-----------|-----------------|
| Server crash | Health check failure | Redirect to healthy node |
| Graceful shutdown | Drain notification | Planned reconnection |
| Network partition | Heartbeat timeout | Client reconnect logic |
| Overload | Capacity threshold | Load shedding |

### Connection Migration

| Migration Type | Data Preserved | User Impact |
|----------------|----------------|-------------|
| Hot migration | Full state | Minimal (brief pause) |
| Warm migration | Essential state | Short reconnect |
| Cold migration | No state | Full reconnect required |

---

## Real-Time Collaboration Isolation

### Collaboration Contexts

| Context | Scope | Isolation Requirement |
|---------|-------|----------------------|
| Document editing | Document + tenant | Strict |
| Chat rooms | Room + tenant | Strict |
| Notifications | User + tenant | Moderate |
| System broadcasts | Tenant-wide | Moderate |

### Message Routing Security

| Check | Implementation | Failure Response |
|-------|----------------|------------------|
| Tenant boundary | Tenant ID in message envelope | Drop + alert |
| Room membership | Subscription verification | Reject delivery |
| User permissions | Role-based access | Filter content |
| Content validation | Schema validation | Reject message |

### Operational Transformation for Multi-Tenant

| Consideration | Single-Tenant | Multi-Tenant |
|---------------|---------------|--------------|
| Conflict resolution | Global clock | Per-tenant clock |
| State storage | Single store | Tenant-partitioned |
| Undo history | Global stack | Per-tenant stack |
| Cursor tracking | All users | Tenant users only |

### Broadcast Isolation

| Broadcast Type | Routing Logic | Isolation Method |
|----------------|---------------|------------------|
| Tenant broadcast | All tenant connections | Tenant ID filter |
| Room broadcast | Room subscribers only | Subscription check |
| User broadcast | User sessions only | User ID filter |
| Admin broadcast | Elevated permissions | Role verification |

---

## Application Guidelines

When designing WebSocket multi-tenancy:

1. Establish tenant context at connection time
2. Validate tenant context on every message
3. Implement per-tenant connection quotas early
4. Use tenant ID in all message envelopes
5. Design for connection migration and failover
6. Monitor connection counts and message rates per tenant

---

## Implementation Example

### WebSocket Connection Handler with Tenant Context

```typescript
// Example: WebSocket connection with tenant isolation
interface TenantConnection {
  connectionId: string;
  tenantId: string;
  userId: string;
  tier: 'free' | 'pro' | 'enterprise';
  connectedAt: Date;
}

class TenantWebSocketManager {
  private connections: Map<string, TenantConnection> = new Map();
  private tenantPools: Map<string, Set<string>> = new Map();

  async onConnect(connectionId: string, authToken: string): Promise<void> {
    // Extract and validate tenant context
    const claims = await this.validateToken(authToken);
    const tenantId = claims.tenant_id;
    
    // Check connection quota for tenant tier
    const currentCount = this.getTenantConnectionCount(tenantId);
    const limit = this.getConnectionLimit(claims.tier);
    
    if (currentCount >= limit) {
      throw new Error('Connection limit exceeded for tenant');
    }
    
    // Register connection with tenant context
    const connection: TenantConnection = {
      connectionId,
      tenantId,
      userId: claims.user_id,
      tier: claims.tier,
      connectedAt: new Date()
    };
    
    this.connections.set(connectionId, connection);
    this.addToTenantPool(tenantId, connectionId);
  }

  broadcastToTenant(tenantId: string, message: object): void {
    const pool = this.tenantPools.get(tenantId);
    if (!pool) return;
    
    // Only broadcast to connections in same tenant
    for (const connectionId of pool) {
      this.sendMessage(connectionId, message);
    }
  }
}
```

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`, `tenant-routing`
- **Performance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`, `performance-isolation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "WebSocket multi-tenant isolation patterns {date}"
- Search: "real-time collaboration tenant isolation {date}"
- Search: "WebSocket connection pooling per tenant {date}"
- Search: "sticky sessions WebSocket load balancing {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When should I validate tenant context for WebSocket connections? | At connection establishment, before accepting the upgrade | Rejecting unauthorized connections early prevents resource consumption; context cannot change mid-connection |
| How should connection limits be enforced per tenant? | Track active connections in Redis with tenant-keyed counters and tier-based limits | Prevents single tenant from exhausting server capacity; enables real-time quota enforcement |
| Should presence data be shared across tenant boundaries? | No, scope presence strictly to tenant namespace | Cross-tenant presence is a privacy violation; even anonymized data can leak organizational information |
| How should sticky sessions be implemented for WebSocket servers? | Use consistent hashing on tenant_id or connection token | Ensures reconnections return to same server for state continuity; tenant-based routing improves cache locality |
| How should I handle broadcast isolation for real-time features? | Filter broadcasts at publication time by tenant_id in subscription registry | Client-side filtering is insecure; server must enforce tenant boundaries before message delivery |

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Real-time architecture decisions
- `bmad-bam-module-boundary-design` - WebSocket module isolation
- `bmad-bam-tenant-model-isolation` - Connection isolation strategy
