# Tenant Webhook Delivery Patterns

**When to load:** When designing webhook systems, event delivery, or when user mentions webhooks, event notifications, or external integrations.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What is Tenant Webhook Delivery?

Tenant webhook delivery enables sending event notifications to tenant-configured endpoints with proper isolation, reliability, and security.

### Delivery Guarantee Comparison

| Guarantee | Description | Implementation |
|-----------|-------------|----------------|
| At-least-once | May deliver multiple times | Retry on failure |
| Exactly-once | Single delivery | Idempotency + dedup |
| Best-effort | May lose events | No retry |

---

## Key Patterns

### Pattern 1: Webhook Registration

Tenant configures webhook endpoints.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Endpoint URL | Delivery destination | Per-tenant URLs |
| Secret Key | Signature verification | Per-tenant secrets |
| Event Types | Subscribed events | Tenant selection |
| Status | Active/paused | Tenant control |

### Registration Structure

```
┌─────────────────────────────────────────┐
│        Webhook Registration              │
│                                          │
│  {                                       │
│    "webhook_id": "wh_123",              │
│    "tenant_id": "tenant_abc",           │
│    "url": "https://tenant.com/hook",    │
│    "secret": "whsec_...",               │
│    "events": ["order.created", "..."],  │
│    "status": "active"                   │
│  }                                       │
└─────────────────────────────────────────┘
```

### Pattern 2: Secure Delivery

Ensure webhook authenticity and security.

| Security Measure | Purpose | Implementation |
|------------------|---------|----------------|
| Signature | Verify sender | HMAC-SHA256 |
| Timestamp | Prevent replay | Include in signature |
| HTTPS | Encrypt transit | Required |
| IP Allowlist | Source verification | Optional |

### Signature Flow

```
Webhook Payload
       │
       ├── Generate timestamp
       │
       ├── Create signature
       │   └── HMAC(secret, timestamp + payload)
       │
       └── Send with headers
           ├── X-Webhook-Signature
           └── X-Webhook-Timestamp
```

### Pattern 3: Retry with Backoff

Handle delivery failures.

| Retry Attempt | Delay | Action |
|---------------|-------|--------|
| 1 | 1 minute | Retry |
| 2 | 5 minutes | Retry |
| 3 | 30 minutes | Retry |
| 4 | 2 hours | Retry |
| 5 | 12 hours | Retry |
| 6 | - | Dead letter |

### Retry Flow

```
Webhook Event
      │
      v
┌─────────────────┐
│ Delivery Attempt│
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    v         v
 Success    Failure
    │         │
    └─┐       └── Schedule retry
      │              │
      │              ├── Retry 1-5: Retry
      │              │
      │              └── Retry 6+: Dead Letter
      │                    │
      │                    └── Notify tenant
      │
      └── Record delivery
```

### Pattern 4: Dead Letter Handling

Manage consistently failing webhooks.

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| Dead Letter Queue | Failed deliveries | Per-tenant queue |
| Alert | Notify tenant | Email/in-app |
| Manual Retry | Tenant-triggered | Self-service |
| Endpoint Health | Track success rate | Auto-disable |

---

## Application Guidelines

When implementing webhook delivery:

1. **Always sign payloads** - HMAC with tenant secret
2. **Implement retries** - Exponential backoff
3. **Handle failures** - Dead letter queue
4. **Monitor delivery** - Success rate per tenant
5. **Allow management** - Endpoint CRUD, retry control

---

## Per-Tier Webhook Configuration

| Tier | Max Endpoints | Event Types | Retry Attempts |
|------|---------------|-------------|----------------|
| Free | 1 | Limited | 3 |
| Pro | 5 | All standard | 5 |
| Enterprise | 20 | All + custom | 10 |

---

## Webhook Payload Structure

| Field | Required | Description |
|-------|----------|-------------|
| id | Yes | Unique event ID |
| type | Yes | Event type |
| tenant_id | Yes | Tenant identifier |
| created_at | Yes | Event timestamp |
| data | Yes | Event payload |
| api_version | Yes | API version |

### Example Payload

```json
{
  "id": "evt_abc123",
  "type": "order.created",
  "tenant_id": "tenant_xyz",
  "created_at": "2026-04-09T10:30:00Z",
  "data": {
    "order_id": "ord_456",
    "total": 99.99
  },
  "api_version": "2026-04-01"
}
```

---

## Delivery Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Success Rate | % successful deliveries | <95% |
| Latency | Time to deliver | >5 seconds |
| Retry Rate | % requiring retry | >10% |
| Dead Letter Rate | % failed permanently | >1% |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| No signature | Can't verify source | Always sign |
| No retry | Lost events | Implement retry |
| No dead letter | Silent failures | DLQ + alerts |
| Synchronous delivery | Slow response | Async queue |
| Missing tenant context | Wrong endpoint | Tenant-scoped |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Delivery guarantee? | At-least-once with idempotency | Balance reliability vs complexity |
| Retry strategy? | Exponential backoff with cap | Avoid overwhelming endpoint |
| Dead letter handling? | Queue + tenant notification | Visibility into failures |
| Signature algorithm? | HMAC-SHA256 | Industry standard |

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Configure initial webhooks
- `define-facade-contract` - Webhook event contracts
- `bmad-bam-convergence-verification` - Verify delivery reliability

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Webhook delivery:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `webhook-delivery`
- **Event-driven:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`
- **Tenant routing:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-routing`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "webhook delivery patterns {date}"
- Search: "tenant webhook management {date}"
- Search: "webhook reliability patterns {date}"
