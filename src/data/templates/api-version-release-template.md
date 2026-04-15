---
name: API Version Release Template
description: Template for documenting API version releases and migrations
category: integration
version: 1.0.0
type: "integration"
---

## Purpose

Template for documenting API version releases and migrations

# API Version Release: v{{version_number}}

## Version Metadata

| Field               | Value                                       |
| ------------------- | ------------------------------------------- |
| Version             | v{{version_number}}                         |
| Status              | ALPHA / BETA / STABLE / DEPRECATED / SUNSET |
| Release Date        | {{release_date}}                            |
| Deprecation Date    | {{deprecation_date}}                        |
| Sunset Date         | {{sunset_date}}                             |
| Changelog URL       | /api/v{{version_number}}/changelog          |
| Migration Guide URL | /api/v{{version_number}}/migration          |

## Version Lifecycle

```
ALPHA → BETA → STABLE → DEPRECATED → SUNSET
                         (6 months    (30-day
                          minimum)     warning)
```

## Breaking Changes from v{{previous_version}}

| Change                  | Type                  | Migration Path    |
| ----------------------- | --------------------- | ----------------- |
| {{change_description}}  | Breaking/Non-Breaking | {{migration_steps}} |

## Versioned Routers

| Module             | v{{previous_version}} Router   | v{{version_number}} Router   | Shared Implementation       |
| ------------------ | ------------------------------ | ---------------------------- | --------------------------- |
| {{module_name}}    | `router_v{{previous_version}}` | `router_v{{version_number}}` | `{{module_name}}_service`   |

## Response Shape Differences

| Field           | v{{previous_version}} | v{{version_number}} | Notes               |
| --------------- | --------------------- | ------------------- | ------------------- |
| {{field_name}}  | {{old_shape}}         | {{new_shape}}       | {{migration_note}}  |

## Tenant Version Migration

| Phase            | Duration              | Behavior                            |
| ---------------- | --------------------- | ----------------------------------- |
| Pre-migration    | —                     | All tenants on v{{previous_version}} |
| Migration active | 7-day rollback window | Both versions served per tenant pin |
| Post-migration   | —                     | All tenants on v{{version_number}}  |

## Response Headers

| Header               | Value                  | Purpose                   |
| -------------------- | ---------------------- | ------------------------- |
| X-API-Version        | v{{version_number}}    | Active version            |
| X-API-Version-Status | STABLE                 | Lifecycle status          |
| Deprecation          | {{deprecation_date}}   | RFC 8594 deprecation date |
| Sunset               | {{sunset_date}}        | RFC 8594 sunset date      |
| Link                 | {{migration_url}}      | Migration guide link      |

## OpenAPI Specification

- Endpoint: `/api/v{{version_number}}/openapi.json`
- Includes deprecation notices for sunset versions
- Per-version filtering of endpoints

## Quality Gate: QG-API-VERSION

The API version release quality checks are part of the module readiness gate (QG-S1/QG-S2).
Key validation areas:

- Pre-Release: version config, docs, backward compat, testing
- Deprecation: notices, migration guides, tenant communication
- Sunset: 410 responses, cleanup, monitoring

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "API versioning strategies best practices {date}"
- "API deprecation multi-tenant SaaS patterns {date}"
- "API lifecycle management enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Version metadata is complete with all lifecycle dates
- [ ] Breaking changes are documented with migration paths
- [ ] Response shape differences are clearly specified between versions
- [ ] Tenant version migration phases are defined with rollback window
- [ ] Response headers include proper RFC 8594 deprecation/sunset dates
- [ ] OpenAPI specification endpoint is accessible for this version
- [ ] Quality gate (QG-API-VERSION) checks are passing
- [ ] Backward compatibility has been verified for non-breaking changes
- [ ] Tenant communication plan is in place for deprecation notices
- [ ] Per-tenant version pinning mechanism is documented
- [ ] 410 Gone responses are configured for sunset versions

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
