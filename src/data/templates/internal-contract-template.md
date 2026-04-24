---
name: internal-contract-template
description: Document internal module contracts for intra-module communication
category: integration
version: 1.0.0
type: template
---

## Purpose

Document internal module contracts that define communication patterns within a module's bounded context. Unlike facade contracts (public APIs), internal contracts define how subcomponents within a module communicate.

# Internal Contract: {{module_name}}/{{component_name}}

## Metadata

| Field     | Value              |
| --------- | ------------------ |
| Module    | {{module_name}}    |
| Component | {{component_name}} |
| Version   | {{semver}}         |
| Status    | {{contract_status}} |
| Owner     | {{owner}}          |
| Created   | {{date}}           |

## Contract Scope

### Visibility

| Aspect | Value |
|--------|-------|
| **Visibility** | Internal (module-private) |
| **Consumers** | Components within {{module_name}} only |
| **Access Pattern** | Direct method calls / internal events |

### Tenant Context

| Requirement | Implementation |
|-------------|----------------|
| **Tenant Propagation** | Required via `TenantContext` parameter |
| **RLS Enforcement** | Applied at repository layer |
| **Cross-Tenant Access** | Blocked by design |

---

## Internal Methods

### Commands (Write Operations)

<!-- FILL: Internal write operations. These are NOT exposed on the facade. -->
| Method | Parameters | Return Type | Tenant-Scoped | Transaction Boundary |
| ------ | ---------- | ----------- | ------------- | -------------------- |

### Queries (Read Operations)

<!-- FILL: Internal read operations. These are NOT exposed on the facade. -->
| Method | Parameters | Return Type | Tenant-Scoped | Caching Strategy |
| ------ | ---------- | ----------- | ------------- | ---------------- |

### Aggregate Methods

<!-- FILL: Operations that span multiple entities within the bounded context. -->
| Method | Entities Involved | Consistency Model |
| ------ | ----------------- | ----------------- |

---

## Internal Events

### Domain Events

<!-- FILL: Events that signal state changes within the module's bounded context. -->
| Event Name | Payload Schema | Trigger | Subscribers |
| ---------- | -------------- | ------- | ----------- |

### Integration Events (Internal)

<!-- FILL: Events consumed by other components within the same module. -->
| Event Name | Source Component | Handling Component | Purpose |
| ---------- | ---------------- | ------------------ | ------- |

---

## Data Transfer Objects

### Internal DTOs

<!-- FILL: DTOs used for internal communication (not exposed on facade). -->
| DTO Name | Purpose | Fields | Validation Rules |
| -------- | ------- | ------ | ---------------- |

### Mapping Rules

| External DTO | Internal DTO | Transformation |
| ------------ | ------------ | -------------- |

---

## Dependencies

### Internal Dependencies

<!-- FILL: Other internal contracts this component depends on. -->
| Component | Contract | Usage |
| --------- | -------- | ----- |

### External Dependencies (via Facade)

<!-- FILL: Facades from other modules this component requires. -->
| Module | Facade Method | Purpose |
| ------ | ------------- | ------- |

---

## Error Handling

### Internal Errors

| Error | Propagation | Recovery Strategy |
| ----- | ----------- | ----------------- |
| `EntityNotFoundError` | Throw to caller | Caller handles |
| `ValidationError` | Throw to caller | Caller handles |
| `ConcurrencyError` | Retry logic | Optimistic locking |
| `DependencyError` | Circuit breaker | Fallback behavior |

### Error Translation

| Internal Error | Facade Error | HTTP Status |
| -------------- | ------------ | ----------- |

---

## Transaction Boundaries

### Unit of Work

| Operation | Transaction Scope | Isolation Level |
| --------- | ----------------- | --------------- |
| Create | Single aggregate | READ COMMITTED |
| Update | Single aggregate | READ COMMITTED |
| Batch | Saga pattern | EVENTUAL |

### Consistency Guarantees

| Guarantee | Implementation |
| --------- | -------------- |
| **Atomicity** | Database transactions |
| **Tenant Isolation** | RLS policies |
| **Eventual Consistency** | Domain events + outbox |

---

## Testing Contracts

### Contract Tests

| Test Type | Coverage | Automation |
| --------- | -------- | ---------- |
| Unit tests | Method behavior | Required |
| Integration tests | Component interaction | Required |
| Contract tests | Interface compliance | Required |
| Tenant isolation tests | RLS verification | Required |

### Test Fixtures

| Fixture | Purpose | Tenant Scope |
| ------- | ------- | ------------ |

---

## Web Research Queries

Before finalizing this internal contract, verify current patterns:

- Search: "internal module contracts DDD {date}"
- Search: "bounded context internal communication patterns {date}"
- Search: "aggregate root internal methods {date}"

---

## Verification Checklist

- [ ] All internal methods documented with parameters and return types
- [ ] Tenant-scoped flag correctly set for all operations
- [ ] Transaction boundaries clearly defined
- [ ] Internal events follow naming convention (Component.PastTenseVerb)
- [ ] Error handling and propagation documented
- [ ] Dependencies on other internal contracts listed
- [ ] Facade dependencies identified
- [ ] Contract tests specified
- [ ] RLS enforcement documented at repository layer

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0   | {{date}} | {{author}} | Initial creation |
