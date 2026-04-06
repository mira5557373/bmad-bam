# Step 4: Setup Tenant Context

Configure tenant context propagation and isolation mechanisms.

## Database Integration

Configure tenant-scoped database access:

1. Create `src/core/database.py`:
   - Async database session factory
   - Automatic tenant_id injection into queries
   - RLS policy activation (if using RLS isolation)
   - Connection pool configuration

2. Create Alembic migration for RLS:
   - Enable RLS on all tenant-scoped tables
   - Create RLS policies for tenant isolation
   - Set up tenant_id column defaults

## Middleware Configuration

Create `src/core/middleware/tenant_middleware.py`:

- Extract tenant_id from JWT claims or X-Tenant-ID header
- Validate tenant exists and is active
- Inject TenantContext into request scope
- Set database session tenant filter

## Request Context Propagation

Implement context propagation across:

- HTTP request handlers
- Background task execution
- Event handler processing
- Scheduled job execution

## Tenant Lifecycle Support

Create `src/control_plane/tenant_provisioning/`:

- `TenantService` with CRUD operations
- Tenant state machine (provisioning -> active -> suspended -> archived -> deleted)
- Tenant provisioning workflow hooks
- Tenant decommissioning workflow hooks

## Test Fixtures

Create `tests/conftest.py` with:

- Multi-tenant test fixtures
- Test tenant factory
- Tenant context injection for tests
- Isolation verification helpers

## Foundation Epics Creation

Create `{output_folder}/planning-artifacts/foundation-epics.md`:

1. **Shared Kernel Epic** - TenantContext, BaseEntity, EventBus, common DTOs
2. **Control-Plane Epic** - tenant provisioning, admin operations, billing integration
3. **AI Runtime Epic** - agent registry, tool registry, memory manager, kill switches

## Summary

Present what was scaffolded:

- Directory structure created
- Foundation files generated
- Zone boundaries established
- Foundation epics ready for implementation

**Next Steps:** After foundation stories are implemented, run `bmad-bam-validate-foundation` to pass QG-F1.

**CRITICAL:** `create-tenant-service` scaffold is used ONCE (this workflow only). After foundation, all module code is generated from architecture documents, not scaffolding tools.
