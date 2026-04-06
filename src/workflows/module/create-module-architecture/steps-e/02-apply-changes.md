# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the affected sections in the module architecture document
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Document structure and inheritance reference to master architecture
   - Unaffected sections (no unnecessary changes)
   - Module context summary consistency
4. If modifying the domain model or facade, verify:
   - All entities still have `tenant_id`
   - All entities still follow `BaseEntity` from master architecture
   - Facade methods remain tenant-scoped
   - No circular dependencies introduced
5. Validate the modified document against master architecture constraints
6. Update `module-context.md` if the changes affect the compact summary
7. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.
