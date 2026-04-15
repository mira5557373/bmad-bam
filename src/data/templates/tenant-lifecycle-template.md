---
name: Tenant Lifecycle Template
description: Template for tenant onboarding and offboarding orchestration
category: tenant
version: 1.0.0
type: "tenant"
---

## Purpose

Template for tenant onboarding and offboarding orchestration

# Tenant Lifecycle: {{tenant_name}}

## Onboarding Orchestration

### Provisioning Steps

| #   | Step                 | Handler                | Compensation              | Dependencies | Tier Filter | Timeout | Critical |
| --- | -------------------- | ---------------------- | ------------------------- | ------------ | ----------- | ------- | -------- |
| 1   | Validate tenant data | `validate_tenant`      | N/A                       | —            | All         | 10s     | Yes      |
| 2   | Create tenant record | `create_tenant_record` | `delete_tenant_record`    | 1            | All         | 15s     | Yes      |
| 3   | Setup database       | `setup_database`       | `teardown_database`       | 2            | All         | 60s     | Yes      |
| 4   | Configure auth       | `setup_auth`           | `teardown_auth`           | 2            | All         | 30s     | Yes      |
| 5   | Setup AI runtime     | `setup_ai_runtime`     | `teardown_ai_runtime`     | 3            | PRO+        | 45s     | No       |
| 6   | Configure billing    | `setup_billing`        | `teardown_billing`        | 2            | All         | 30s     | Yes      |
| 7   | Run module hooks     | `run_module_hooks`     | `compensate_module_hooks` | 3,4          | All         | 120s    | No       |
| 8   | Activate tenant      | `activate_tenant`      | `deactivate_tenant`       | All          | All         | 10s     | Yes      |

### Tier-Specific Resource Matrix

| Resource    | FREE           | PRO                 | ENTERPRISE       |
| ----------- | -------------- | ------------------- | ---------------- |
| Database    | Shared (RLS)   | Shared (RLS)        | Dedicated schema |
| Auth        | Realm standard | Org + IdP           | Org + IdP + SCIM |
| AI Runtime  | Basic agent    | Full agents         | Custom models    |
| Memory      | Session only   | Session + user      | All tiers        |
| Rate Limits | 100 req/min    | 1000 req/min        | Custom           |
| Billing     | Free tier      | Stripe subscription | Custom invoicing |
| Support     | Community      | Email               | Dedicated        |

### Idempotency

- Client-generated idempotency key in `Idempotency-Key` header
- Request hash stored for conflict detection
- Cached response returned for duplicate requests within TTL

## Offboarding Orchestration (GDPR-Compliant)

### Offboarding States

```
REQUESTED → GRACE_PERIOD → ARCHIVING → DELETING → COMPLETED
                ↓
            CANCELLED (if tenant reactivates during grace period)
```

### Offboarding Steps

| #   | Step                 | Duration   | Description                                        |
| --- | -------------------- | ---------- | -------------------------------------------------- |
| 1   | Request received     | Immediate  | Log request, notify admin                          |
| 2   | Grace period         | 30 days    | Tenant can cancel, data accessible read-only       |
| 3   | Data export          | 1-2 hours  | Generate portable data package (GDPR portability)  |
| 4   | Compliance archive   | 1-2 hours  | Archive financial/audit records (7-year retention) |
| 5   | Module data deletion | Per module | Run module offboarding hooks                       |
| 6   | AI data cleanup      | 30 min     | Delete memory, vectors, agent configs              |
| 7   | Auth cleanup         | 10 min     | Remove Keycloak org, users, IdP configs            |
| 8   | Database cleanup     | 30 min     | Drop schema/RLS policies, vacuum                   |
| 9   | Final deletion       | 10 min     | Remove tenant record, emit webhook                 |

### GDPR Archive Requirements

| Data Type            | Retention          | Storage                   | Encryption |
| -------------------- | ------------------ | ------------------------- | ---------- |
| Financial records    | 7 years            | Cold storage (S3 Glacier) | AES-256    |
| Audit logs           | 7 years            | Cold storage              | AES-256    |
| Compliance reports   | 7 years            | Cold storage              | AES-256    |
| User PII             | Delete immediately | N/A                       | N/A        |
| AI conversation data | Delete immediately | N/A                       | N/A        |

### Webhook Events

| Event                           | Trigger                 | Payload                       |
| ------------------------------- | ----------------------- | ----------------------------- |
| `tenant.provisioning.started`   | Onboarding begins       | tenant_id, tier, steps        |
| `tenant.provisioning.completed` | All steps pass          | tenant_id, duration           |
| `tenant.provisioning.failed`    | Critical step fails     | tenant_id, failed_step, error |
| `tenant.offboarding.started`    | Grace period begins     | tenant_id, grace_end_date     |
| `tenant.offboarding.cancelled`  | Tenant reactivates      | tenant_id                     |
| `tenant.deleted`                | Final deletion complete | tenant_id, archived_records   |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant lifecycle SaaS patterns {date}"
- "tenant onboarding orchestration multi-tenant {date}"
- "GDPR tenant offboarding best practices {date}"
- "tenant provisioning saga patterns {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] All onboarding provisioning steps defined with handlers and compensations
- [ ] Tier-specific resource matrix complete for all tiers (FREE, PRO, ENTERPRISE)
- [ ] Idempotency mechanism documented for provisioning requests
- [ ] Offboarding states and transitions clearly defined
- [ ] GDPR archive requirements documented with retention periods
- [ ] Data export (portability) mechanism defined for offboarding
- [ ] Module-specific onboarding and offboarding hooks identified
- [ ] Webhook events defined for all lifecycle state changes
- [ ] Multi-tenant isolation verified through provisioning and cleanup
- [ ] Grace period and cancellation flow documented
- [ ] Timeout values appropriate for each provisioning step
- [ ] Critical vs non-critical steps distinguished for error handling

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
