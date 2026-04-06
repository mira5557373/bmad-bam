# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the affected scaffold components
2. Verify zone boundary compliance:
   - FROZEN zone changes require explicit override confirmation and ADR justification
   - EXTEND ONLY changes must be additions, not replacements
   - AUTONOMOUS zone changes are unrestricted

3. Present the current content of each affected file
4. Apply the requested modifications while preserving:
   - Zone boundary rules
   - Existing shared kernel contracts
   - Cross-references between components
   - Test fixture compatibility

5. If modifying core components, verify:
   - TenantContext interface unchanged (or migration plan provided)
   - BaseEntity contract preserved
   - EventBus interface compatibility maintained
   - Database session factory still functional

6. If modifying shared kernel, ensure:
   - Existing DTOs not removed (only deprecated)
   - Event contracts backward compatible
   - Exception hierarchy intact

7. Update zone boundary documentation if structure changed

8. Validate the modified scaffold against integrity checks:
   - `src/core/database.py` exports `AsyncSession`, `async_sessionmaker`
   - `src/core/tenant_context.py` exports `TenantContext`, `get_tenant_id()`
   - `src/core/base_entity.py` exports `BaseEntity` with `tenant_id: UUID`
   - `src/shared_kernel/events.py` exports `EventBus`, `DomainEvent`, `publish()`

9. Update foundation epics if new work identified

Present a diff summary of changes made and ask for confirmation.

**Output:** Modified scaffold files with updated zone documentation.
