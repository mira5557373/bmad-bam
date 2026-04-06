# Shared Kernel Patterns

## What Lives in Shared Kernel

- TenantContext dataclass
- BaseEntity with tenant_id, timestamps, audit fields
- EventBus protocol (publish/subscribe)
- TenantScopedRepository protocol
- AuditLog utility
- Common value objects (Money, Email, etc.)
- FacadeError hierarchy

## What Does NOT Live in Shared Kernel

- Business logic (belongs in modules)
- Module-specific entities (belongs in module/internal/)
- API routes (belongs in module/api/)
- Module facades (belongs in module/facade.py)

## TenantContext

Injected at request entry, propagated through entire call chain.
Never constructed manually in business code — always received from middleware.

```python
@dataclass(frozen=True)
class TenantContext:
    tenant_id: UUID
    user_id: UUID
    tier: TenantTier  # FREE | PRO | ENTERPRISE
    permissions: frozenset[str]
    correlation_id: str

    def assert_permission(self, perm: str) -> None:
        if perm not in self.permissions:
            raise PermissionDeniedError(self.tenant_id, perm)
```

Middleware extracts TenantContext from JWT claims and injects into request scope:

```python
async def tenant_context_middleware(request: Request, call_next):
    claims = decode_jwt(request.headers["Authorization"])
    ctx = TenantContext(
        tenant_id=UUID(claims["tenant_id"]),
        user_id=UUID(claims["sub"]),
        tier=TenantTier(claims["tier"]),
        permissions=frozenset(claims.get("permissions", [])),
        correlation_id=request.headers.get("X-Correlation-ID", str(uuid4())),
    )
    request.state.tenant_ctx = ctx
    return await call_next(request)
```

## BaseEntity

All tenant-plane entities inherit BaseEntity:

- id (UUID), tenant_id (UUID), created_at, updated_at, created_by, updated_by
- tenant_id is REQUIRED and enforced by RLS

```python
class BaseEntity(SQLModel):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    tenant_id: UUID = Field(index=True, nullable=False)
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)
    created_by: UUID | None = None
    updated_by: UUID | None = None

class TenantScopedRepository(Protocol[T]):
    """All queries automatically scoped to tenant_id from TenantContext."""
    async def get(self, ctx: TenantContext, id: UUID) -> T | None: ...
    async def list(self, ctx: TenantContext, **filters) -> list[T]: ...
    async def save(self, ctx: TenantContext, entity: T) -> T: ...
    async def delete(self, ctx: TenantContext, id: UUID) -> None: ...
```

## EventBus

- publish(event: DomainEvent) — fire-and-forget, async
- subscribe(event_type, handler, tenant_filter) — register handler
- Events always include tenant_id in payload
- Event handlers never fail the publisher (dead letter queue on error)

```python
@dataclass
class DomainEvent:
    event_id: UUID = field(default_factory=uuid4)
    tenant_id: UUID = field(default=None)
    occurred_at: datetime = field(default_factory=utcnow)
    event_type: str = ""

class EventBus(Protocol):
    async def publish(self, event: DomainEvent) -> None: ...
    async def subscribe(
        self, event_type: type[DomainEvent],
        handler: Callable, tenant_filter: UUID | None = None
    ) -> None: ...
```

## Stability Rule

Shared kernel changes affect ALL modules. Changes require:

1. ADR documenting the change
2. Impact analysis across all active modules
3. Migration plan for existing code

## Key Points

- Shared kernel is the smallest possible set of truly shared abstractions
- Changes to shared kernel are high-impact — treat like a public API
- TenantContext is the most critical shared type — every request path depends on it
- Prefer protocols (interfaces) over concrete classes to minimize coupling

## Anti-Pattern

| Anti-Pattern                                | Problem                                   | Correct Approach                         |
| ------------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| Putting business logic in shared kernel     | All modules coupled to one module's logic | Business logic belongs in owning module  |
| Module-specific entities in shared kernel   | Shared kernel grows unbounded             | Only truly cross-cutting types belong    |
| Changing shared kernel without ADR          | Silent breakage across modules            | ADR + impact analysis required           |
| Constructing TenantContext in business code | Bypasses middleware validation            | Always receive from middleware injection |

See also: module-facade-patterns.md, rls-best-practices.md, independent-development.md
