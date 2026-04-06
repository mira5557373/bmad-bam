# Module Facade Patterns

## Facade Structure

Every module exposes exactly ONE facade class as its public interface.

```python
# src/modules/{module}/facade.py
class {Module}Facade:
    def __init__(self, context: TenantContext):
        self._context = context
        self._repo = {Module}Repository(context, get_session())

    async def get_{entity}(self, id: str) -> {Entity}DTO | None:
        entity = await self._repo.get(id)
        return {Entity}DTO.from_entity(entity) if entity else None
```

## Rules

1. All facade methods accept TenantContext (explicit or via constructor)
2. Facade returns DTOs, never internal entities
3. Facade raises FacadeError subtypes, never internal exceptions
4. Facade is the ONLY import other modules are allowed to use
5. Facade methods are the contract — changing signatures is a breaking change

## Contract Versioning

- Adding a method: minor version bump (non-breaking)
- Adding optional parameter: minor version bump
- Changing return type or required parameter: major version bump (breaking)
- Removing a method: major version bump, requires deprecation cycle

## Error Translation

Internal errors are NEVER exposed. Translate at the facade boundary:

- SQLAlchemy errors → DependencyUnavailableError
- Not found → EntityNotFoundError
- Validation failures → ValidationError
- Permission issues → PermissionDeniedError

```python
# Facade error hierarchy
class FacadeError(Exception):
    """Base error for all facade operations."""
    def __init__(self, module: str, message: str):
        self.module = module
        super().__init__(f"[{module}] {message}")

class EntityNotFoundError(FacadeError): ...
class ValidationError(FacadeError): ...
class PermissionDeniedError(FacadeError): ...
class DependencyUnavailableError(FacadeError): ...
```

## Domain Events

Modules communicate asynchronously via domain events:

```python
# Published by orders module when order is created
@dataclass
class OrderCreatedEvent(DomainEvent):
    event_type: str = "orders.order_created"
    order_id: UUID = field(default=None)
    tenant_id: UUID = field(default=None)
    total_amount: Decimal = field(default=Decimal("0"))
```

Events are the preferred cross-module communication for:

- Notifications (order created → send email)
- Denormalization (order created → update analytics)
- Saga orchestration (order created → reserve inventory → charge payment)

## Testing Facades

Test the facade as a black box — only through its public interface:

```python
async def test_get_order_returns_dto(tenant_ctx, order_facade):
    order = await order_facade.create_order(items=[...])
    result = await order_facade.get_order(order.id)
    assert isinstance(result, OrderDTO)  # Never an ORM entity
    assert result.tenant_id == tenant_ctx.tenant_id
```

## Key Points

- One facade per module — no exceptions
- Facade is the ONLY public API; everything else is internal
- DTOs cross boundaries, entities never do
- Changing a facade signature is a breaking change requiring major version bump

## Anti-Pattern

| Anti-Pattern                            | Problem                                 | Correct Approach                    |
| --------------------------------------- | --------------------------------------- | ----------------------------------- |
| Importing module internals directly     | Tight coupling, breaks on refactor      | Import only from `module/facade.py` |
| Returning ORM entities from facade      | Leaks internal schema, creates coupling | Return DTOs mapped from entities    |
| Raising internal exceptions             | Consumer sees implementation details    | Translate to FacadeError subtypes   |
| Multiple public entry points per module | Unclear contract surface                | Single facade class per module      |

See also: event-driven-patterns.md, shared-kernel-patterns.md, independent-development.md, api-version-routing.md
