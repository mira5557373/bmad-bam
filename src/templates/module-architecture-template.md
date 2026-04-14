---
name: module-architecture-template
description: Document individual module architecture within the modular monolith
category: architecture
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

## Purpose

Document individual module architecture within the modular monolith

# Module Architecture - {{module_name}}

## Version History

| Version | Date | Author | Changes |
| ------- | ---- | ------ | ------- |

## Module Overview

<!-- FILL: Name of the bounded context this module represents -->
**Bounded Context:** {{context_name}}

<!-- FILL: One sentence describing what this module does -->
**Purpose:** {{purpose}}

<!-- FILL: Team responsible for this module -->
**Owning Team:** {{team_name}}

<!-- FILL: Select one: control-plane (tenant management) | tenant-plane (business logic) -->
**Control-Plane / Tenant-Plane:** {{plane}}

<!-- FILL: Select one: simple | medium | complex -->
**Complexity:** {{complexity}}

## Public Facade

### Service Interface

```python
class {{module_class}}Facade(Protocol):
    async def operation_name(self, dto: InputDTO, ctx: TenantContext) -> OutputDTO:
        """Operation description."""
        ...
```

### Commands

<!-- FILL: Add write operations. Tenant-Scoped: YES for tenant-plane, NO for control-plane only -->
| Command | Description | Tenant-Scoped |
| ------- | ----------- | ------------- |

### Queries

<!-- FILL: Add read operations. Tenant-Scoped: YES for tenant-plane, NO for control-plane only -->
| Query | Description | Tenant-Scoped |
| ----- | ----------- | ------------- |

### Domain Events Published

<!-- FILL: Events this module publishes. Format: ModuleName.PastTenseVerb (e.g., Users.UserCreated) -->
| Event | Trigger | Payload |
| ----- | ------- | ------- |

### Domain Events Consumed

<!-- FILL: Events this module subscribes to from other modules -->
| Event | Source Module | Handler |
| ----- | ------------- | ------- |

## Domain Model

### Aggregates

<!-- FILL: Define aggregate roots - the main consistency boundaries in your domain -->
| Aggregate | Root Entity | Description |
| --------- | ----------- | ----------- |

### Entities

<!-- FILL: Tenant-Scoped should be YES for all tenant-plane entities -->
| Entity | Aggregate | Tenant-Scoped | Description |
| ------ | --------- | ------------- | ----------- |

### Value Objects

<!-- FILL: Immutable domain concepts (Money, Address, EmailAddress, etc.) -->
| Value Object | Used By | Description |
| ------------ | ------- | ----------- |

## Internal Architecture

```
{{module_name}}/
├── domain/           # Entities, Value Objects, Domain Services
├── application/      # Use Cases, DTOs, Event Handlers
├── infrastructure/   # Repositories, External Adapters
└── api/              # HTTP Handlers (if module exposes API)
```

## Dependencies

### Depends On (Allowed)

<!-- FILL: Modules this module calls via their facades. Must be in allowed dependencies list. -->
| Module | Interface Used | Reason |
| ------ | -------------- | ------ |

### Consumed By

<!-- FILL: Modules that call this module's facade -->
| Module | Interface Used | Reason |
| ------ | -------------- | ------ |

### Forbidden Dependencies

<!-- FILL: Modules this module must NEVER depend on to prevent circular dependencies -->
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

<!-- FILL: Type: release | experiment | ops | permission -->
<!-- FILL: Retirement Target: date when flag should be removed (or "permanent" for ops flags) -->
| Flag Name | Type | Default | Retirement Target |
| --------- | ---- | ------- | ----------------- |

## Extraction Readiness

<!-- FILL: Score 0-8 based on module boundary clarity (8 = ready to extract as microservice) -->
**Score:** {{score_0_8}}

<!-- FILL: List blockers preventing microservice extraction (shared DB tables, etc.) -->
**Blockers:** {{extraction_blockers}}

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "module architecture bounded context patterns {date}"
- "domain-driven design module boundaries {date}"
- "facade pattern microservices best practices {date}"
- "modular monolith extraction readiness {date}"

Incorporate relevant findings into the document sections above.
_Source: [URL]_ for key findings.

---

## Verification Checklist

- [ ] Bounded context clearly defined
- [ ] Public facade interface documented
- [ ] Commands and queries identified
- [ ] Domain events published and consumed listed
- [ ] Dependencies documented and allowed
- [ ] Tenant considerations addressed
- [ ] Feature flags documented
- [ ] Extraction readiness assessed
- [ ] Web research findings incorporated

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
