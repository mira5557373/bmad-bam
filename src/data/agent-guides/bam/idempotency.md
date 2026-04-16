# Idempotency Patterns

**When to load:** When designing retry-safe APIs, handling duplicate requests, or when user mentions idempotency keys, request deduplication, or API reliability.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What is Idempotency?

Idempotency ensures that performing the same operation multiple times produces the same result as performing it once. In multi-tenant SaaS, idempotency must be scoped to tenants to prevent cross-tenant interference.

### Idempotency Levels

| Level | Description | Example |
|-------|-------------|---------|
| Natural | Operation inherently idempotent | GET, DELETE by ID |
| Key-based | Idempotency key required | POST with key header |
| Conditional | Based on state check | If-Match headers |
| Transactional | Full deduplication | Database constraints |

---

## Key Patterns

### Pattern 1: Idempotency Key Header

Client provides unique key for request deduplication.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Key Header | `Idempotency-Key` | Client-generated UUID |
| Key Scope | Tenant + key combination | Per-tenant uniqueness |
| Storage | Key-response mapping | Tenant-partitioned |
| TTL | Key expiration | Per-tier duration |

### Key Flow

```
Request with Idempotency-Key
           │
           v
    ┌──────────────────┐
    │ Check key exists │
    │ (tenant-scoped)  │
    └────────┬─────────┘
             │
    ┌────────┴────────┐
    │                 │
    v                 v
  Exists           New Key
    │                 │
    v                 ├── Process request
  Return             ├── Store key + response
  cached             └── Return response
  response
```

### Pattern 2: Request Fingerprinting

Generate key from request content.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Fingerprint | Hash of request body | Include tenant_id |
| Collision Handling | Rare conflicts | Monitor duplicates |
| Window | Time-based deduplication | Per-tenant windows |

### Fingerprint Generation

```
Fingerprint = hash(
    tenant_id +
    endpoint +
    sorted(request_body) +
    timestamp_window
)
```

### Pattern 3: Response Storage

Store and return responses for duplicate requests.

| Field | Description | Tenant Consideration |
|-------|-------------|---------------------|
| idempotency_key | Request identifier | Tenant-scoped |
| request_hash | Request fingerprint | Validation |
| response_status | HTTP status | Cached |
| response_body | Response content | Cached |
| created_at | First request time | Audit |
| expires_at | TTL expiration | Per-tier |

### Storage Schema

```
┌─────────────────────────────────────────┐
│        Idempotency Store                 │
│                                          │
│  tenant_id │ key        │ response      │
│  ──────────┼────────────┼───────────────│
│  tenant_a  │ uuid-123   │ {status:201}  │
│  tenant_a  │ uuid-456   │ {status:200}  │
│  tenant_b  │ uuid-123   │ {status:201}  │ <- Same key, different tenant
│                                          │
└─────────────────────────────────────────┘
```

### Pattern 4: At-Least-Once Processing

Handle delivery guarantees with idempotent consumers.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Message ID | Unique message identifier | Include tenant_id |
| Processed Set | Track processed IDs | Per-tenant tracking |
| Deduplication Window | Time to keep IDs | Balance memory/safety |
| Processing | Skip if seen | Check before process |

---

## Application Guidelines

When implementing idempotency:

1. **Scope to tenant** - Keys must be unique within tenant
2. **Set appropriate TTL** - Balance memory vs safety window
3. **Store full response** - Return same response on retry
4. **Handle in-progress** - Concurrent duplicate detection
5. **Log duplicates** - Monitor for client issues

---

## Per-Tier Idempotency Configuration

| Tier | Key TTL | Storage Limit | Window |
|------|---------|---------------|--------|
| Free | 1 hour | 100 keys | 1 hour |
| Pro | 24 hours | 10,000 keys | 24 hours |
| Enterprise | 7 days | Unlimited | 7 days |

---

## HTTP Headers

| Header | Direction | Description |
|--------|-----------|-------------|
| Idempotency-Key | Request | Client-provided key |
| Idempotency-Replayed | Response | Indicates cached response |
| X-Idempotent-Request | Response | Confirms idempotent handling |

---

## State Handling

| State | Action | Response |
|-------|--------|----------|
| Key not found | Process request | Normal response |
| Key found, complete | Return cached | Cached + Replayed header |
| Key found, in-progress | Wait or error | 409 Conflict |
| Key expired | Process as new | Normal response |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Global key scope | Cross-tenant conflicts | Tenant-scoped keys |
| No response storage | Different responses on retry | Store complete response |
| Missing TTL | Unbounded storage | Set expiration |
| Ignoring in-progress | Race conditions | Lock or conflict response |
| No monitoring | Hidden duplicate issues | Track duplicate rate |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which operations need idempotency? | All state-changing operations (POST, PUT, PATCH) | Prevents duplicate side effects |
| Client or server-generated key? | Client-generated for explicit control | Client knows retry intent |
| How long to keep keys? | Based on retry window and SLA | Balance storage vs safety |
| In-progress handling? | 409 Conflict with retry guidance | Clear signal to client |

---

## Related Workflows

- `define-facade-contract` - Include idempotency requirements
- `bmad-bam-api-version-release` - Idempotency in API design
- `bmad-bam-convergence-verification` - Verify idempotency implementation

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Idempotency:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `idempotency`
- **API gateway:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-gateway-patterns`
- **Event-driven:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "idempotency patterns REST API {date}"
- Search: "idempotent operations distributed systems {date}"
- Search: "idempotency key implementation {date}"
