# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. **Identify affected artifacts:**
   - Which documents need updates (matrix, mapping, cross-cutting, index)
   - Which modules are affected by the changes
   - Whether dependency graph needs recalculation

2. **Apply modifications while preserving:**
   - Existing requirement IDs (no renumbering unless explicitly requested)
   - Unaffected module assignments
   - Valid dependency relationships
   - Cross-references between documents

3. **For new requirements:**
   - Assign unique IDs following existing pattern
   - Categorize by domain (Step 2 logic)
   - Map to modules (Step 3 logic)
   - Check for cross-cutting concerns (Step 4 logic)

4. **For reassignments:**
   - Update module-mapping.md
   - Recalculate affected dependency paths
   - Verify no circular dependencies introduced
   - Update cross-cutting flags if applicable

5. **Validation after changes:**
   - Run acyclic graph check on dependencies
   - Verify single-module ownership rule
   - Confirm cross-cutting concerns properly isolated

6. **Write updated artifacts:**
   - Update all affected files
   - Regenerate index.md if modules changed
   - Update sprint-status.yaml if modules added/removed

Present a diff summary of changes made and ask for confirmation.
