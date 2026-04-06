# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the affected contracts in the design documents
2. Present the current contract definitions
3. Apply the requested modifications while preserving:
   - Document structure and format
   - Unaffected contracts
   - Existing consumer relationships
4. If modifying contract signatures:
   - Assess breaking change impact
   - Update version appropriately
   - Document migration path
   - Notify consumers
5. If modifying boundaries:
   - Verify enforcement mechanisms still valid
   - Update test specifications
   - Check for boundary conflicts
6. If adding new contracts:
   - Follow contract structure template
   - Define all boundaries
   - Create test specifications
7. Validate the modified documents against quality gates
8. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.
