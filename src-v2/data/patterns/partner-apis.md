---
pattern_id: partner-apis
shortcode: ZPA
category: platform
qg_ref: QG-PL6
version: 1.0.0
last_reviewed: 2026-04-30
---

# Partner APIs - BAM Pattern

**Loaded by:** ZPA  
**Applies to:** Multi-tenant SaaS platforms managing partner/reseller API access

---

## When to Use

- Resellers needing programmatic access
- Partner integrations requiring elevated permissions
- Bulk operations for partners (customer provisioning)
- Partner-specific analytics and reporting APIs
- Automated customer management
- Revenue/commission tracking APIs

## When NOT to Use

- Direct customer APIs only
- No partner/reseller program
- Partners using standard APIs is sufficient
- Security constraints prohibit partner APIs

## Architecture

### Partner API Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    API ACCESS LAYERS                         │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              PLATFORM ADMIN APIs                       │  │
│  │  (Full access - platform operators only)               │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              PARTNER APIs                              │  │
│  │  (Sub-tenant management, revenue, bulk operations)     │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              STANDARD APIs                             │  │
│  │  (End customer access - tenant-scoped)                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Partner API Categories

| Category | Purpose | Example Endpoints |
|----------|---------|-------------------|
| Customer Management | CRUD sub-tenants | POST /partners/{id}/customers |
| Billing | Revenue, commissions | GET /partners/{id}/revenue |
| Provisioning | Bulk setup | POST /partners/{id}/bulk-provision |
| Analytics | Usage, metrics | GET /partners/{id}/analytics |
| Support | Ticket access | GET /partners/{id}/support-tickets |

### Access Control Flow

```
Partner API Request
      │
      ▼
┌─────────────────┐
│ Partner Auth    │ ← Verify partner credentials
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Scope Check     │ ← What can this partner access?
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Sub-tenant      │ ← Can partner access this customer?
│ Ownership Check │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Execute with    │ ← Partner context + customer context
│ Dual Context    │
└─────────────────┘
```

### Configuration Schema

```yaml
partner_apis:
  partner_id: uuid
  partner_type: enum[reseller, var, msp]
  bam_controlled: true
  
  authentication:
    method: enum[api_key, oauth_client_credentials]
    api_key_prefix: string  # e.g., "partner_"
    
  scopes:
    customers:
      create: bool
      read: bool
      update: bool
      delete: bool
      
    billing:
      read_revenue: bool
      read_commissions: bool
      process_payouts: bool
      
    provisioning:
      bulk_create: bool
      bulk_update: bool
      max_batch_size: int
      
    support:
      read_tickets: bool
      create_tickets: bool
      escalate: bool
      
  rate_limits:
    requests_per_minute: int
    bulk_operations_per_hour: int
    
  data_access:
    customer_visibility: enum[owned_only, all_partner, hierarchy]
    pii_access: bool
    audit_log_access: bool
    
  webhooks:
    enabled: bool
    events: string[]  # customer.created, revenue.calculated
```

### Customer Provisioning Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 PARTNER PROVISIONING                         │
│                                                              │
│  Partner API ──▶ Validate ──▶ Create Tenant ──▶ Notify     │
│       │             │              │               │         │
│       ▼             ▼              ▼               ▼         │
│  POST /partners/   Partner tier    Set parent_id   Webhook  │
│  {pid}/customers   limits check    = partner_id    sent     │
│                                                              │
│  Request:                                                    │
│  {                                                           │
│    "company_name": "Customer Inc",                          │
│    "tier": "pro",                                           │
│    "admin_email": "admin@customer.com",                     │
│    "custom_domain": "app.customer.com"                      │
│  }                                                           │
│                                                              │
│  Response:                                                   │
│  {                                                           │
│    "customer_id": "uuid",                                   │
│    "status": "provisioning",                                │
│    "estimated_ready": "2026-04-30T12:05:00Z"               │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
```

### Revenue Reporting API

```
┌─────────────────────────────────────────────────────────────┐
│                 PARTNER REVENUE API                          │
│                                                              │
│  GET /partners/{pid}/revenue                                │
│  ?start_date=2026-04-01&end_date=2026-04-30                │
│                                                              │
│  Response:                                                   │
│  {                                                           │
│    "period": { "start": "...", "end": "..." },             │
│    "summary": {                                             │
│      "total_revenue": 15000.00,                            │
│      "commission_earned": 4500.00,                         │
│      "customers_active": 25,                               │
│      "new_customers": 3                                    │
│    },                                                        │
│    "by_customer": [                                         │
│      {                                                       │
│        "customer_id": "uuid",                               │
│        "name": "Customer Inc",                              │
│        "mrr": 500.00,                                       │
│        "commission": 150.00                                 │
│      }                                                       │
│    ]                                                         │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
```

### Bulk Operations

```
POST /partners/{pid}/bulk-provision
{
  "customers": [
    { "name": "Customer 1", "tier": "pro", ... },
    { "name": "Customer 2", "tier": "starter", ... }
  ],
  "options": {
    "send_welcome_emails": true,
    "auto_activate": false
  }
}

Response:
{
  "batch_id": "uuid",
  "status": "processing",
  "total": 2,
  "completed": 0,
  "failed": 0,
  "results_url": "/batches/{batch_id}/results"
}
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Separate partner API | Clear boundaries | Maintenance overhead | Complex partner needs |
| Elevated scopes on main API | Single codebase | Complexity in authz | Simple partner access |
| Partner portal + API | Self-service + automation | Both to maintain | Full-featured partners |
| SDK for partners | Easy integration | SDK maintenance | High-volume partners |

## Quality Checks

- [ ] Partner can only access owned customers
- [ ] Bulk operations rate limited
- [ ] Revenue data matches billing system
- [ ] Audit trail for all partner actions
- [ ] **CRITICAL:** No access to other partners' customers

## Web Research Queries

- "partner API design patterns {date}"
- "reseller portal API integration {date}"
- "multi-tenant sub-tenant API {date}"
- "bulk provisioning API best practices {date}"
- "channel partner API security {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-PL6 | Pattern implementation verified |

## Related Patterns

- [api-integration.md](api-integration.md) - API foundations
- [reseller-model.md](reseller-model.md) - Partner program
