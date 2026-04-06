# API Version Release: v{{VERSION_NUMBER}}

## Version Metadata

| Field               | Value                                       |
| ------------------- | ------------------------------------------- |
| Version             | v{{VERSION_NUMBER}}                         |
| Status              | ALPHA / BETA / STABLE / DEPRECATED / SUNSET |
| Release Date        | {{RELEASE_DATE}}                            |
| Deprecation Date    | {{DEPRECATION_DATE}}                        |
| Sunset Date         | {{SUNSET_DATE}}                             |
| Changelog URL       | /api/v{{VERSION_NUMBER}}/changelog          |
| Migration Guide URL | /api/v{{VERSION_NUMBER}}/migration          |

## Version Lifecycle

```
ALPHA → BETA → STABLE → DEPRECATED → SUNSET
                         (6 months    (30-day
                          minimum)     warning)
```

## Breaking Changes from v{{PREVIOUS_VERSION}}

| Change                  | Type                  | Migration Path    |
| ----------------------- | --------------------- | ----------------- |
| {{CHANGE_DESCRIPTION}}  | Breaking/Non-Breaking | {{MIGRATION_STEPS}} |

## Versioned Routers

| Module             | v{{PREVIOUS_VERSION}} Router   | v{{VERSION_NUMBER}} Router   | Shared Implementation       |
| ------------------ | ------------------------------ | ---------------------------- | --------------------------- |
| {{MODULE_NAME}}    | `router_v{{PREVIOUS_VERSION}}` | `router_v{{VERSION_NUMBER}}` | `{{MODULE_NAME}}_service`   |

## Response Shape Differences

| Field           | v{{PREVIOUS_VERSION}} | v{{VERSION_NUMBER}} | Notes               |
| --------------- | --------------------- | ------------------- | ------------------- |
| {{FIELD_NAME}}  | {{OLD_SHAPE}}         | {{NEW_SHAPE}}       | {{MIGRATION_NOTE}}  |

## Tenant Version Migration

| Phase            | Duration              | Behavior                            |
| ---------------- | --------------------- | ----------------------------------- |
| Pre-migration    | —                     | All tenants on v{{PREVIOUS_VERSION}} |
| Migration active | 7-day rollback window | Both versions served per tenant pin |
| Post-migration   | —                     | All tenants on v{{VERSION_NUMBER}}  |

## Response Headers

| Header               | Value                  | Purpose                   |
| -------------------- | ---------------------- | ------------------------- |
| X-API-Version        | v{{VERSION_NUMBER}}    | Active version            |
| X-API-Version-Status | STABLE                 | Lifecycle status          |
| Deprecation          | {{DEPRECATION_DATE}}   | RFC 8594 deprecation date |
| Sunset               | {{SUNSET_DATE}}        | RFC 8594 sunset date      |
| Link                 | {{MIGRATION_URL}}      | Migration guide link      |

## OpenAPI Specification

- Endpoint: `/api/v{{VERSION_NUMBER}}/openapi.json`
- Includes deprecation notices for sunset versions
- Per-version filtering of endpoints

## Quality Gate: QG-API-VERSION

The API version release quality checks are part of the module readiness gate (QG-S1/QG-S2).
Key validation areas:

- Pre-Release: version config, docs, backward compat, testing
- Deprecation: notices, migration guides, tenant communication
- Sunset: 410 responses, cleanup, monitoring
