# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the affected sections in the safety design documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Document structure and cross-references
   - Unaffected safety criteria
   - Existing golden tasks (unless explicitly updating)
   - Guardrail hierarchy integrity
4. If modifying safety criteria:
   - Verify golden tasks still cover new criteria
   - Update guardrail thresholds if needed
   - Adjust monitoring alerts accordingly
5. If adding new golden tasks:
   - Ensure coverage matrix remains complete
   - Validate task structure matches template
   - Update eval pipeline if new task type
6. Validate the modified documents against quality gates
7. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.
