# API Version Routing Playbook

## Principle

Multi-tenant SaaS APIs use URL path versioning with tenant-specific pinning
to enable gradual migrations without breaking existing integrations.

## Rationale

Different tenants may be on different contract versions. Breaking changes
require orchestrated rollout with rollback capability.

## Version Resolution Priority

1. **URL path** (`/api/v2/orders`) - explicit version
2. **Header** (`X-API-Version: v2`) - AI agent override
3. **Tenant pin** (control plane config) - migration periods
4. **Default** (CURRENT_VERSION) - fallback

## Version Lifecycle

```
ALPHA → BETA → STABLE → DEPRECATED → SUNSET
```

| Stage      | Audience         | SLA              | Breaking Changes    | Duration         |
| ---------- | ---------------- | ---------------- | ------------------- | ---------------- |
| ALPHA      | Internal only    | None             | May break           | Until stable     |
| BETA       | Limited tenants  | Best-effort      | May break           | Until stable     |
| STABLE     | All tenants      | Full SLA         | No breaking changes | Until deprecated |
| DEPRECATED | Existing tenants | Full SLA         | No changes          | 6 months minimum |
| SUNSET     | None             | Returns 410 Gone | N/A                 | Permanent        |

## Tenant Version Pin Strategy

| Scenario          | Pin Behavior               | Cache          | Rollback            |
| ----------------- | -------------------------- | -------------- | ------------------- |
| Normal operation  | No pin (uses default)      | N/A            | N/A                 |
| Migration period  | Pinned to previous version | Redis (1h TTL) | Remove pin          |
| Enterprise lock   | Pinned to specific version | Redis (1h TTL) | Tenant admin action |
| AI agent override | Header overrides pin       | Per-request    | N/A                 |

## Facade Contract Alignment

- REST API major version must match facade contract major version
- Migration rollback window: 7 days default
- Deprecated versions add Sunset/Deprecation headers automatically

## Key Points

- Tenant version pins are cached in Redis (1h TTL)
- Deprecated versions add Sunset/Deprecation headers
- REST API major version must match facade contract major version
- Migration rollback window: 7 days default

## Anti-Patterns

| Anti-Pattern                               | Problem                                      | Correct Approach                                     |
| ------------------------------------------ | -------------------------------------------- | ---------------------------------------------------- |
| Hardcoded version checks in business logic | Unmaintainable, error-prone                  | Version-specific routers with proper response models |
| No deprecation period                      | Breaks existing integrations                 | 6 months minimum deprecation with Sunset headers     |
| Skipping tenant pin during migration       | Forces all tenants to upgrade simultaneously | Pin tenants to previous version during rollout       |
| No rollback window                         | Cannot recover from bad version release      | 7-day rollback window default                        |

## Integration Points

- Section 22.7: REST API Versioning Pattern
- Section 22.4: Facade Contract Evolution

See also: saga-orchestration-patterns.md, multi-tenant-patterns.md, module-facade-patterns.md
