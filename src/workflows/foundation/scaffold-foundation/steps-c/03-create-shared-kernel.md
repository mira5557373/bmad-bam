# Step 3: Create Shared Kernel

Generate the shared kernel components based on master architecture specifications.

## TenantContext Implementation

Create `src/core/tenant_context.py`:

- `TenantContext` class with tenant_id, user_id, correlation_id
- Context propagation via contextvars
- Middleware integration for automatic context injection
- Thread-safe context management

## BaseEntity Implementation

Create `src/core/base_entity.py`:

- `BaseEntity` base class for all domain entities
- Required fields: `id`, `tenant_id`, `created_at`, `updated_at`, `created_by`, `updated_by`
- Automatic tenant_id injection from context
- Audit field auto-population

## EventBus Implementation

Create `src/shared_kernel/events.py`:

- `DomainEvent` base class with event_id, tenant_id, timestamp, correlation_id
- `EventBus` interface with publish/subscribe methods
- Event handler registration mechanism
- Async event dispatch support

## Common Value Objects

Create `src/shared_kernel/value_objects.py`:

- `TenantId` value object with validation
- `UserId` value object
- `Email` value object with format validation
- `Money` value object (if applicable)

## Shared Exceptions

Create `src/shared_kernel/exceptions.py`:

- `DomainException` base class
- `TenantNotFoundError`
- `TenantAccessDeniedError`
- `EntityNotFoundError`
- `ValidationError`
- `ConcurrencyError`

## Common DTOs

Create `src/shared_kernel/dtos.py`:

- `PaginationRequest` / `PaginationResponse`
- `AuditInfo` DTO
- `TenantInfo` DTO
- Standard API response wrappers

## Integrity Checks

Verify all shared kernel files contain required exports:

- `src/core/database.py` must export `AsyncSession`, `async_sessionmaker`
- `src/core/tenant_context.py` must export `TenantContext`, `get_tenant_id()`
- `src/core/base_entity.py` must export `BaseEntity` with `tenant_id: UUID`
- `src/shared_kernel/events.py` must export `EventBus`, `DomainEvent`, `publish()`

**Output:** Complete shared kernel implementation with all required interfaces.
