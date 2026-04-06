# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the affected sections in the story documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Document structure and story format
   - Unaffected module stories
   - Existing dependencies (unless explicitly changing)
4. If modifying module involvement:
   - Re-map dependencies for new modules
   - Update integration points
   - Regenerate coordination schedule
5. If modifying dependencies:
   - Verify no circular dependencies created
   - Update critical path analysis
   - Adjust coordination schedule
6. If modifying integration points:
   - Update affected contracts
   - Adjust test strategy
   - Notify impacted module owners
7. Validate the modified documents against quality gates
8. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.
