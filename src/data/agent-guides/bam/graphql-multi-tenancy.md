# GraphQL Multi-Tenancy Patterns

**When to load:** When designing GraphQL APIs for multi-tenant SaaS, implementing schema customization, or when user mentions GraphQL context, query cost limiting, DataLoader patterns, or subscription isolation.

**Integrates with:** Architect (Atlas/Kai persona), Developer agent, Security agent

---

## Core Concepts

### What is GraphQL Multi-Tenancy?

GraphQL multi-tenancy involves exposing a flexible query interface to multiple tenants while maintaining isolation, performance fairness, and schema customization capabilities. GraphQL's introspection, nested queries, and subscriptions require careful tenant-aware implementation to prevent security issues and resource abuse.

### GraphQL Tenancy Challenges

| Challenge | Description | Risk Level |
|-----------|-------------|------------|
| Query complexity | Unbounded nested queries | High |
| N+1 queries | Per-tenant data loading | Medium |
| Schema exposure | Introspection reveals structure | Medium |
| Subscription leakage | Cross-tenant event delivery | Critical |
| Cost attribution | Variable query costs | Medium |

### GraphQL Request Flow

```
+------------------------------------------------------------------+
|  Client        Gateway        GraphQL Server       Resolvers     |
|  +------+     +--------+     +---------------+    +-----------+  |
|  |Query | --> |Extract | --> |Inject Context | -> |Tenant     |  |
|  |      |     |Tenant  |     |Cost Analysis  |    |Filtered   |  |
|  +------+     +--------+     +---------------+    |Data       |  |
|                    |                |             +-----------+  |
|                    v                v                             |
|              Auth + Tenant    Complexity Limit                    |
+------------------------------------------------------------------+
```

---

## Tenant Context in GraphQL Context

### Context Injection Points

| Point | Method | Availability |
|-------|--------|--------------|
| HTTP middleware | Header/JWT extraction | Before resolution |
| Context factory | Per-request context build | Resolution time |
| Directive | Schema-level enforcement | Field-level |
| Plugin | Apollo/GraphQL plugin | Lifecycle hooks |

### Context Structure

| Field | Type | Purpose | Source |
|-------|------|---------|--------|
| tenantId | string | Primary identifier | JWT/Header |
| tier | enum | Feature/limit tier | Database/Cache |
| permissions | array | Allowed operations | Auth service |
| quotas | object | Current usage limits | Quota service |
| user | object | Authenticated user | Auth context |
| requestId | string | Tracing correlation | Generated |

### Context Propagation to Resolvers

| Resolver Type | Context Access | Isolation Enforcement |
|---------------|----------------|----------------------|
| Query | Direct from args | Filter by tenant |
| Mutation | Direct from args | Scope to tenant |
| Subscription | Connection context | Event filtering |
| Field resolver | Parent context | Inherited tenant |

### Context Validation

| Check | When | Failure Action |
|-------|------|----------------|
| Tenant exists | Context creation | 401 Unauthorized |
| Tenant active | Context creation | 403 Forbidden |
| Operation allowed | Before resolution | Permission error |
| Quota available | Before execution | 429 Rate limited |

---

## Per-Tenant Schema Customization

### Customization Approaches

| Approach | Description | Complexity | Use Case |
|----------|-------------|------------|----------|
| Field visibility | Hide fields by tier | Low | Feature gating |
| Type extension | Add tenant-specific types | Medium | Custom entities |
| Schema stitching | Compose tenant schemas | High | White-label |
| Federation per tenant | Separate subgraphs | Very High | Enterprise isolation |

### Field-Level Feature Gating

| Tier | Available Fields | Hidden Fields |
|------|------------------|---------------|
| Free | Core fields | Analytics, bulk ops |
| Pro | Core + analytics | Bulk ops, custom |
| Enterprise | All fields | None |

### Schema Visibility Rules

| Rule Type | Implementation | Performance Impact |
|-----------|----------------|-------------------|
| Static hiding | Build-time schema variants | None |
| Dynamic hiding | Runtime field filtering | Low |
| Directive-based | @requiresTier directive | Low |
| Type masking | Remove types from schema | Medium |

### Custom Type Patterns

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| Custom fields | Tenant-defined attributes | JSON scalar + metadata |
| Custom entities | Tenant business objects | Dynamic type generation |
| Custom relations | Tenant-specific links | Virtual fields |
| Custom validations | Business rules | Directive + resolver |

---

## Query Cost Limiting Per Tier

### Cost Calculation Factors

| Factor | Weight | Description |
|--------|--------|-------------|
| Depth | 1-5 per level | Nesting complexity |
| Breadth | 1-2 per field | Selection set size |
| Lists | Multiplier | Expected result count |
| Connections | Higher weight | Pagination queries |
| Mutations | Fixed cost | Write operations |
| Subscriptions | Per-minute cost | Ongoing resource |

### Cost Limits by Tier

| Tier | Max Cost | Max Depth | Max Aliases | Rate Limit |
|------|----------|-----------|-------------|------------|
| Free | 100 | 3 | 5 | 10/min |
| Pro | 500 | 5 | 20 | 100/min |
| Enterprise | 2000 | 10 | 100 | 1000/min |

### Cost Analysis Implementation

| Stage | Analysis | Action |
|-------|----------|--------|
| Pre-execution | Static cost estimate | Reject if over limit |
| During execution | Track actual cost | Abort if exceeding |
| Post-execution | Record actual cost | Billing/analytics |

### Complexity Rules

| Query Pattern | Cost Formula | Example Cost |
|---------------|--------------|--------------|
| Simple field | 1 | `user.name` = 1 |
| Object field | 1 + children | `user { name email }` = 3 |
| List field | multiplier * children | `users(first:10) { name }` = 20 |
| Connection | 2 + (limit * children) | `users(first:10) { edges { node { name }}}` = 32 |
| Nested lists | multiply multipliers | `orgs { users { posts }}` = O(n^3) |

### Overage Handling

| Tier | Overage Policy | User Feedback |
|------|----------------|---------------|
| Free | Hard reject | Upgrade prompt |
| Pro | Soft limit + warning | Usage notification |
| Enterprise | Allow with billing | Overage report |

---

## DataLoader Patterns for Tenant Isolation

### DataLoader Architecture

| Component | Purpose | Tenant Scoping |
|-----------|---------|----------------|
| Loader factory | Create tenant-scoped loaders | Per-request context |
| Batch function | Aggregate queries | Tenant ID in WHERE |
| Cache | Request-level dedup | Tenant-prefixed keys |
| Prime | Pre-populate cache | Validate tenant match |

### Tenant-Scoped Batch Loading

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| Tenant filter | Add tenant_id to all queries | Auto-injected WHERE |
| Separate loaders | Loader per tenant per type | Loader factory |
| Composite keys | tenant_id + entity_id | Cache key strategy |
| Validation | Verify tenant on load | Post-fetch check |

### DataLoader Isolation Rules

| Rule | Purpose | Enforcement |
|------|---------|-------------|
| No cross-tenant batching | Prevent data leakage | Separate batch queues |
| Tenant in cache key | Cache isolation | Key prefix pattern |
| Request-scoped loaders | Prevent state leakage | Factory per request |
| Verify loaded data | Defense in depth | Post-load tenant check |

### Performance Optimization

| Technique | Benefit | Trade-off |
|-----------|---------|-----------|
| Request batching | Reduce DB round trips | Memory per request |
| Tenant prefetch | Warm common data | Initial latency |
| Selective loading | Only requested fields | Query complexity |
| Connection pooling | Reduce connection overhead | Pool management |

---

## Subscription Isolation

### Subscription Security Model

| Concern | Mitigation | Implementation |
|---------|------------|----------------|
| Cross-tenant events | Filter by tenant_id | Event envelope check |
| Unauthorized subscriptions | Permission check | Subscribe resolver |
| Connection hijacking | Token validation | WebSocket auth |
| Resource exhaustion | Per-tenant limits | Connection quotas |

### Subscription Architecture

| Component | Tenant Handling | Isolation Level |
|-----------|-----------------|-----------------|
| Connection | Tenant in connection context | Per-connection |
| Subscription | Tenant filter in resolver | Per-subscription |
| Event delivery | Tenant match validation | Per-event |
| Broadcast | Tenant-scoped channels | Channel-level |

### Event Filtering Strategy

| Strategy | Description | Performance |
|----------|-------------|-------------|
| Topic per tenant | Separate pub/sub topics | Best isolation |
| Filter on delivery | Check tenant at delivery | Most flexible |
| Hybrid | Topic + filter | Balanced |

### Subscription Limits by Tier

| Tier | Max Subscriptions | Max Events/min | Connection Timeout |
|------|-------------------|----------------|-------------------|
| Free | 3 | 60 | 5 min |
| Pro | 20 | 600 | 30 min |
| Enterprise | 100 | 6000 | 60 min |

---

## Application Guidelines

When designing GraphQL multi-tenancy:

1. Inject tenant context at the earliest possible point
2. Use directives for declarative tenant enforcement
3. Implement query cost analysis before execution
4. Create tenant-scoped DataLoaders per request
5. Filter subscriptions at both subscribe and publish time
6. Log and monitor query costs per tenant

---

## Implementation Example

### GraphQL Context with Tenant Injection

```typescript
// Example: Apollo Server with tenant context injection
import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';

interface TenantContext {
  tenantId: string;
  tier: 'free' | 'pro' | 'enterprise';
  permissions: string[];
  costBudget: number;
}

// Context factory for tenant injection
async function createContext({ req }): Promise<{ tenant: TenantContext }> {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHENTICATED' }
    });
  }
  
  const claims = await validateJWT(token);
  const tenantId = claims.tenant_id;
  
  // Load tenant configuration
  const tenant = await getTenantConfig(tenantId);
  
  return {
    tenant: {
      tenantId,
      tier: tenant.tier,
      permissions: tenant.permissions,
      costBudget: getTierCostLimit(tenant.tier)
    }
  };
}

// DataLoader with tenant scoping
function createTenantDataLoader(tenantId: string) {
  return new DataLoader(async (ids: string[]) => {
    // All queries automatically scoped to tenant
    return db.users.findMany({
      where: {
        id: { in: ids },
        tenant_id: tenantId  // Tenant filter always applied
      }
    });
  });
}
```

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **API patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `facade-contracts`, `tenant-routing`
- **Limit patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`, `quota-management`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "GraphQL multi-tenant isolation patterns {date}"
- Search: "GraphQL query cost limiting per tenant {date}"
- Search: "DataLoader tenant isolation patterns {date}"
- Search: "GraphQL subscription security multi-tenant {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How should tenant context be injected into GraphQL resolvers? | Create tenant context in context factory from auth token; pass to all resolvers | Single injection point ensures consistent context; avoids scattered tenant checks throughout resolver code |
| Should query complexity limits vary by tenant tier? | Yes, use tier-based cost budgets (Free: 100, Pro: 500, Enterprise: 2000) | Prevents noisy neighbor abuse while allowing premium tiers full platform capabilities |
| How should DataLoaders be scoped in multi-tenant GraphQL? | Create new DataLoader instances per request with tenant ID in batch queries | Request-scoped loaders prevent cross-request cache leakage; tenant filter in batch ensures isolation |
| Should introspection be enabled for all tenants? | Disable in production for Free tier; enable for Pro/Enterprise with schema visibility filtering | Introspection exposes API structure; tier-gated access limits reconnaissance while supporting developer experience |
| How should GraphQL subscriptions enforce tenant isolation? | Filter at both subscribe (permission check) and publish (event routing) phases | Subscribe-only filtering can miss events; publish-only filtering wastes resources; both ensure complete isolation |

---

## Related Workflows

- `create-master-architecture` - API layer decisions
- `define-facade-contract` - GraphQL schema contracts
- `bmad-bam-tenant-model-isolation` - Data access isolation
