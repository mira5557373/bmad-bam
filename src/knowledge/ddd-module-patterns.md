# DDD Module Patterns for BAM

## Core Concept

Domain-Driven Design patterns adapted for modular-monolith architecture with
multi-tenant and AI agent considerations.

## Bounded Context Rules

1. **One module = one bounded context** — never split a context across modules
2. **Ubiquitous language per context** — same term can mean different things in different modules
3. **Context mapping** — explicit relationships between modules (partnership, customer-supplier, conformist)

## Aggregate Design

```python
# Aggregate roots own their entity graph
class Order(BaseEntity):  # Aggregate root
    tenant_id: UUID       # REQUIRED - inherited from BaseEntity
    items: list[OrderItem]  # Owned entities

    def add_item(self, product_id: UUID, quantity: int) -> None:
        # All business rules enforced here
        self.items.append(OrderItem(...))
```

## Module Structure Pattern

```
src/modules/{module_name}/
├── domain/
│   ├── entities.py      # Aggregate roots and entities
│   ├── value_objects.py # Immutable value types
│   ├── events.py        # Domain events this module publishes
│   └── services.py      # Domain services (stateless logic)
├── application/
│   ├── commands.py      # Write operations
│   ├── queries.py       # Read operations
│   ├── handlers.py      # Command/query handlers
│   └── dtos.py          # Data transfer objects
├── infrastructure/
│   ├── repository.py    # Persistence implementation
│   └── adapters.py      # External service adapters
├── api/
│   └── routes.py        # HTTP endpoints (if module exposes API)
└── facade.py            # PUBLIC interface for other modules
```

## Key Points

- One module = one bounded context — never split a context across modules
- Aggregate roots own their entity graph and enforce all business rules
- Every aggregate root inherits `BaseEntity` with `tenant_id` for multi-tenant isolation
- Facade is the ONLY public interface — all cross-module access goes through `facade.py`

## Anti-Patterns

| Anti-Pattern                | Problem                                   | Correct Approach                |
| --------------------------- | ----------------------------------------- | ------------------------------- |
| Anemic domain model         | Logic in services, entities are data bags | Put logic in aggregates         |
| God aggregate               | One aggregate owns everything             | Split by transactional boundary |
| Cross-module entity sharing | Tight coupling                            | Use DTOs at boundaries          |
| Direct repository access    | Bypasses domain rules                     | Always go through aggregate     |

## Multi-Tenant Adaptation

- Every aggregate root inherits `BaseEntity` with `tenant_id`
- Repository methods automatically filter by tenant context
- Domain events include `tenant_id` in payload
- Value objects are tenant-agnostic (Money, Email, etc.)

See also: module-facade-patterns.md, shared-kernel-patterns.md, independent-development.md
