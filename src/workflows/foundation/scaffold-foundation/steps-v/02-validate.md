# Step 2: Validate Foundation Scaffold

## Validation Checklist

### Directory Structure
- [ ] `src/core/` exists with required files
- [ ] `src/shared_kernel/` exists with required files
- [ ] `src/control_plane/` structure present
- [ ] `src/ai_runtime/` structure present
- [ ] `src/modules/` directory exists for future modules
- [ ] `tests/` mirrors src structure
- [ ] `alembic/` migration directory present

### Core Components (FROZEN Zone)
- [ ] `src/core/database.py` exists and exports `AsyncSession`, `async_sessionmaker`
- [ ] `src/core/tenant_context.py` exists and exports `TenantContext`, `get_tenant_id()`
- [ ] `src/core/base_entity.py` exists and exports `BaseEntity` with `tenant_id: UUID`
- [ ] `src/core/config.py` exists with environment configuration

### Shared Kernel (EXTEND ONLY Zone)
- [ ] `src/shared_kernel/events.py` exists and exports `EventBus`, `DomainEvent`, `publish()`
- [ ] `src/shared_kernel/dtos.py` exists with common DTOs
- [ ] `src/shared_kernel/exceptions.py` exists with base exception hierarchy
- [ ] `src/shared_kernel/value_objects.py` exists with common value objects

### Zone Boundaries
- [ ] `ZONE_BOUNDARIES.md` exists and documents all zones
- [ ] FROZEN zone files match scaffold originals (no unauthorized changes)
- [ ] EXTEND ONLY files have additions only (no removals)

### Master Architecture Alignment
- [ ] Technology stack matches master architecture decisions
- [ ] Tenant model implementation matches isolation strategy
- [ ] Shared kernel interfaces match defined contracts
- [ ] AI runtime structure matches requirements

### Foundation Epics
- [ ] `foundation-epics.md` exists
- [ ] Shared Kernel epic defined
- [ ] Control-Plane epic defined
- [ ] AI Runtime epic defined

## Gate Decision

- **PASS**: All scaffold components present, zone boundaries intact, master architecture aligned
- **CONDITIONAL**: Minor gaps (e.g., optional components missing) - document gaps and proceed
- **FAIL**: Missing core components, zone violations, or master architecture misalignment - return to Create mode

Present validation results with specific findings for each category.

**Next Steps:** On PASS, foundation scaffold is ready for implementation. Proceed to implement foundation epics, then run `bmad-bam-validate-foundation` for QG-F1.
