# Step 5: Shared Kernel Definition

## Purpose

Define the common code and contracts that all modules depend on. The shared kernel provides consistent primitives for tenant context, entity modeling, event handling, and error management. This ensures uniformity across the platform and prevents duplication.

## Actions

1. **Define TenantContext Interface**
   - Specify required fields (tenant_id, organization_id, user_id)
   - Define optional enrichment fields (subscription tier, feature flags)
   - Document context creation and validation rules
   - Specify serialization format for cross-boundary passing
   - Define null/anonymous context handling
   - Establish context immutability requirements

2. **Define BaseEntity Requirements**
   - Specify required fields (id, tenant_id, created_at, updated_at)
   - Define audit fields (created_by, updated_by)
   - Document soft delete pattern (deleted_at, deleted_by)
   - Establish ID generation strategy (UUID, ULID, snowflake)
   - Define timestamp timezone handling (UTC requirement)
   - Specify optimistic locking field (version)

3. **Define EventBus Interface**
   - Specify publish method signature and options
   - Define subscribe method signature and handler contract
   - Document event envelope structure
   - Establish event ordering guarantees
   - Define acknowledgment patterns
   - Specify error handling and retry behavior

4. **Define Common Value Objects and DTOs**
   - Create standard pagination DTO (page, limit, cursor)
   - Define common response wrapper (data, meta, errors)
   - Establish money/currency value object
   - Define date range value object
   - Create standard filter/sort DTOs
   - Document validation rules for each

5. **Define Shared Exceptions and Error Types**
   - Establish exception hierarchy (base, domain, infrastructure)
   - Define standard error codes and messages
   - Create tenant-specific exceptions (TenantNotFound, TenantSuspended)
   - Define authorization exceptions (Forbidden, InsufficientPermissions)
   - Establish error serialization format for APIs
   - Document error logging requirements

## Outputs

- TenantContext interface specification with types
- BaseEntity abstract class/interface
- EventBus interface with message types
- Value object library specification
- Exception hierarchy documentation
- Shared kernel package structure

## Validation Criteria

- [ ] All modules can import shared kernel without circular dependencies
- [ ] TenantContext provides all fields needed by downstream modules
- [ ] BaseEntity covers all common persistence patterns
- [ ] Error types map to HTTP status codes consistently
- [ ] Value objects are immutable and validatable
