# Module Architecture - {{MODULE_NAME}}

## Version History

| Version | Date | Author | Changes |
| ------- | ---- | ------ | ------- |

## Module Overview

**Bounded Context:** {{CONTEXT_NAME}}
**Purpose:** {{PURPOSE}}
**Owning Team:** {{TEAM_NAME}}
**Control-Plane / Tenant-Plane:** {{PLANE}}
**Complexity:** {{COMPLEXITY}}

## Public Facade

### Service Interface

```python
class {{MODULE_CLASS}}Facade(Protocol):
    async def operation_name(self, dto: InputDTO, ctx: TenantContext) -> OutputDTO:
        """Operation description."""
        ...
```

### Commands

| Command | Description | Tenant-Scoped |
| ------- | ----------- | ------------- |

### Queries

| Query | Description | Tenant-Scoped |
| ----- | ----------- | ------------- |

### Domain Events Published

| Event | Trigger | Payload |
| ----- | ------- | ------- |

### Domain Events Consumed

| Event | Source Module | Handler |
| ----- | ------------- | ------- |

## Domain Model

### Aggregates

| Aggregate | Root Entity | Description |
| --------- | ----------- | ----------- |

### Entities

| Entity | Aggregate | Tenant-Scoped | Description |
| ------ | --------- | ------------- | ----------- |

### Value Objects

| Value Object | Used By | Description |
| ------------ | ------- | ----------- |

## Internal Architecture

```
{{MODULE_NAME}}/
├── domain/           # Entities, Value Objects, Domain Services
├── application/      # Use Cases, DTOs, Event Handlers
├── infrastructure/   # Repositories, External Adapters
└── api/              # HTTP Handlers (if module exposes API)
```

## Dependencies

### Depends On (Allowed)

| Module | Interface Used | Reason |
| ------ | -------------- | ------ |

### Consumed By

| Module | Interface Used | Reason |
| ------ | -------------- | ------ |

### Forbidden Dependencies

| Module | Reason |
| ------ | ------ |

## Tenant Considerations

- [ ] All entities include tenant_id
- [ ] RLS policies defined and enabled
- [ ] Tenant context propagated in all operations

## AI Considerations (if applicable)

- [ ] Agent placement documented
- [ ] Tools registered in tool registry
- [ ] Memory scope defined

## Feature Flags (S21.12)

| Flag Name | Type | Default | Retirement Target |
| --------- | ---- | ------- | ----------------- |

## Extraction Readiness

**Score:** {{SCORE_0_8}}
**Blockers:** {{EXTRACTION_BLOCKERS}}
