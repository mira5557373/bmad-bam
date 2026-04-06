# Multi-Tenant Patterns

## Core Concept

Patterns for building SaaS applications where multiple tenants share
infrastructure while maintaining strict data and resource isolation.

## Tenant Context Propagation

**Middleware extraction steps:**

| Step             | Action                                                       | Data Extracted                                             | Stored In                      |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------ |
| 1. Extract JWT   | `request.headers.get("Authorization")` → `decode_jwt(token)` | JWT claims                                                 | —                              |
| 2. Build context | Create `TenantContext` from claims                           | `tenant_id`, `user_id` (from `sub`), `tier`, `permissions` | `request.state.tenant_context` |
| 3. Set RLS       | `set_tenant_context(db_session, ctx.tenant_id)`              | —                                                          | PostgreSQL session variable    |

**Downstream propagation rules:**

| Operation      | Tenant Context Usage                               |
| -------------- | -------------------------------------------------- |
| Create entity  | Set `tenant_id=ctx.tenant_id` on every new record  |
| Publish event  | Include `tenant_id=ctx.tenant_id` in event payload |
| Call facade    | Pass `ctx` as first parameter                      |
| Background job | Serialize `tenant_id` into job payload (S21.6.9)   |

## Tier-Based Feature Access

**FeatureGate pattern:**

| Tier         | Features                                           | Wildcard |
| ------------ | -------------------------------------------------- | -------- |
| `free`       | `basic_ai`, `limited_storage`                      | No       |
| `pro`        | `basic_ai`, `advanced_ai`, `storage`, `api_access` | No       |
| `enterprise` | `*` (all features)                                 | Yes      |

**`can_access(ctx, feature)` logic:** Look up `TIER_FEATURES[ctx.tier]`. Return `True` if `"*"` in set OR `feature` in set. On denied: raise `HTTPException(403, "Upgrade to {required_tier} for this feature")`.

## Resource Quotas Pattern

**QuotaEnforcer tier quotas:**

| Resource            | FREE  | PRO    | ENTERPRISE |
| ------------------- | ----- | ------ | ---------- |
| `api_calls_per_day` | 1,000 | 50,000 | ∞          |
| `storage_gb`        | 1     | 50     | 500        |

**`check_quota(ctx, resource)` logic:** Get `quota = TIER_QUOTAS[ctx.tier][resource]`. Get `current = usage_store.get(ctx.tenant_id, resource)`. Return `current < quota`.

**`increment_usage(ctx, resource)` logic:** Call `usage_store.increment(tenant_id=ctx.tenant_id, resource=resource, timestamp=now())`.

## Noisy Neighbor Prevention

**TenantRateLimiter tier limits:**

| Tier         | Max Requests | Window | Redis Key Pattern             |
| ------------ | ------------ | ------ | ----------------------------- |
| `free`       | 60           | 60s    | `rate:{tenant_id}:free`       |
| `pro`        | 600          | 60s    | `rate:{tenant_id}:pro`        |
| `enterprise` | 6,000        | 60s    | `rate:{tenant_id}:enterprise` |

**`check_rate_limit(ctx)` logic:** `INCR` the Redis key. On first increment (`current == 1`), set `EXPIRE` to window duration. Return `current <= max_requests`. Apply as decorator to AI endpoints (most expensive).

## Tenant Data Lifecycle

> For detailed provisioning orchestration with saga pattern, see Section 22.8.

**Provisioning Steps:**

| Step | Action                   | Resources Created                      |
| ---- | ------------------------ | -------------------------------------- |
| 1    | Create tenant record     | `tenants` table row (status: `active`) |
| 2    | Initialize cache config  | `tenant:{id}:config` Redis key         |
| 3    | Create vector collection | `tenant_{id}` Qdrant collection        |
| 4    | Emit provisioning event  | `TenantProvisioned` domain event       |

**Offboarding Steps (GDPR):**

| Step | Action                     | Timing                        |
| ---- | -------------------------- | ----------------------------- |
| 1    | Soft delete tenant record  | Immediate (status: `deleted`) |
| 2    | Schedule data deletion job | 30-day grace period           |
| 3    | Revoke all active sessions | Immediate                     |

## Audit Logging Pattern

**Audit Record Fields:**

| Field        | Source        | Description                    |
| ------------ | ------------- | ------------------------------ |
| `tenant_id`  | TenantContext | Tenant scope                   |
| `user_id`    | TenantContext | Acting user                    |
| `action`     | Caller        | e.g., `order.created`          |
| `resource`   | Caller        | e.g., `order:{id}`             |
| `details`    | Caller        | Action-specific payload (dict) |
| `ip_address` | TenantContext | Request origin                 |
| `timestamp`  | System        | UTC timestamp                  |

## Audit Log Retention and Query

| Tier | Storage                                          | Retention                                | Query Latency           | Access                                          |
| ---- | ------------------------------------------------ | ---------------------------------------- | ----------------------- | ----------------------------------------------- |
| Hot  | PostgreSQL (same DB, `audit_log` table with RLS) | 30 days                                  | <100ms                  | Tenant admin + platform admin                   |
| Warm | S3 (Parquet, partitioned by `tenant_id/month`)   | 1 year                                   | Seconds (Athena/DuckDB) | Platform admin; tenant admin via export request |
| Cold | S3 Glacier                                       | 7 years (compliance: SOC2, GDPR Art. 17) | Hours                   | Platform admin only; legal/compliance requests  |

**Query API:** The audit module exposes `audit_facade.query(ctx, filters: AuditFilter) -> PaginatedResult[AuditEntry]` (reuses S22.1 pagination). Filters: `action`, `resource`, `user_id`, `date_range`. Tenant admins see only their tenant's logs (RLS enforced). Platform admins can query across tenants with `support:audit:read` permission.

**Compliance export:** Tenant admins can request a full audit export via `audit_facade.export(ctx, date_range) -> ExportJob`. The export runs as a background job (S21.6.9), produces a signed JSON file in the tenant's blob storage, and notifies the admin via the notification facade. Export format includes all audit fields plus a SHA-256 integrity hash per record.

**Rotation:** Hot → warm migration runs as a daily background job. Warm → cold migration runs monthly. Both are tenant-scoped (S21.6.9). Deletion of cold-tier data after 7 years is automated and logged as an audit event itself.

## Key Points

- TenantContext propagation is the foundation — every request, event, and job carries it
- Tier-based feature gating and quota enforcement happen at the application layer, not DB
- Rate limiting is per-tenant and tier-aware — AI endpoints need strictest limits
- Audit logging is mandatory for all state-changing operations

## Anti-Pattern

| Anti-Pattern                          | Problem                      | Correct Approach                                                                               |
| ------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| Constructing TenantContext manually   | Bypasses JWT validation      | Always extract from middleware                                                                 |
| Hardcoding tier features              | Cannot update without deploy | Use config-driven feature gates (static tiers); use feature flags for dynamic rollout (S21.12) |
| Rate limiting without tenant scope    | One tenant can starve others | Per-tenant rate limit keys                                                                     |
| Skipping audit on internal operations | Compliance gap               | Audit all state changes, including background jobs                                             |

See also: rls-best-practices.md, testing-tenant-isolation.md, testing-multi-tenant-fixtures.md, saga-orchestration-patterns.md
