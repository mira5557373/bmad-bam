---
name: facade-contract-template
description: Document public facade contracts between modules
category: integration
version: 1.0.0
type: template
---

## Purpose

Document public facade contracts between modules

# Facade Contract: {{module_name}}

## Metadata

<!-- FILL: Status options: draft | rc (release candidate) | stable | deprecated -->
| Field     | Value              |
| --------- | ------------------ |
| Module    | {{module_name}}    |
| Version   | {{semver}}         |
| Status    | {{contract_status}} |
| Owner     | {{owner}}          |
| Published | {{date}}           |

## Methods

### Commands (Write Operations)

<!-- FILL: Add all write operations (create, update, delete). Parameters should be DTOs, not domain objects. -->
<!-- FILL: Idempotent YES means calling twice with same input produces same result -->
| Method | Parameters | Return Type | Tenant-Scoped | Idempotent |
| ------ | ---------- | ----------- | ------------- | ---------- |

### Queries (Read Operations)

<!-- FILL: Add all read operations (get, list, search). Return types should be DTOs, not domain objects. -->
| Method | Parameters | Return Type | Tenant-Scoped |
| ------ | ---------- | ----------- | ------------- |

## Events Published

<!-- FILL: Format: ModuleName.PastTenseVerb (e.g., Billing.InvoiceCreated). Include tenant_id in payload. -->
| Event Name | Payload Schema | Emission Trigger |
| ---------- | -------------- | ---------------- |

## Events Consumed

<!-- FILL: Events from other modules this facade reacts to -->
| Event Name | Source Module | Handler Description |
| ---------- | ------------- | ------------------- |

## Error Types

| Error                      | HTTP Status | Description                       |
| -------------------------- | ----------- | --------------------------------- |
| EntityNotFoundError        | 404         | Requested entity does not exist   |
| ValidationError            | 400         | Input validation failed           |
| PermissionDeniedError      | 403         | Insufficient permissions          |
| DependencyUnavailableError | 503         | Downstream dependency unavailable |

## Breaking Change Policy

- **Minor version** (non-breaking): Add method, add optional parameter
- **Major version** (breaking): Change return type, change required parameter, remove method
- **Deprecation timeline**: Minimum 2 sprints before removal
- **Migration guide**: Required for all major version bumps

---

## Verification Checklist

- [ ] All public methods documented with parameters and return types
- [ ] Tenant-scoped flag correctly set for all operations
- [ ] Events follow naming convention (ModuleName.PastTenseVerb)
- [ ] All events include tenant_id in payload
- [ ] Error types cover all expected failure scenarios
- [ ] Breaking change policy aligns with platform deprecation timeline
- [ ] DTOs used for all parameters and return types (no domain objects)
- [ ] Idempotency documented for all write operations
- [ ] Contract version follows semantic versioning
- [ ] Consumer modules identified and documented

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "facade contract design best practices {date}"
- "module interface contract multi-tenant SaaS patterns {date}"
- "API versioning deprecation enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
