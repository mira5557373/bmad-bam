# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the affected sections in the tenant model / isolation matrix documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Document structure
   - Unaffected asset types in the isolation matrix
   - Context propagation rules for unaffected boundaries
4. If modifying the isolation strategy for an asset type, verify:
   - No implicit sharing of tenant data is introduced
   - Context propagation still covers the affected boundary
   - Compliance requirements are still met
5. Validate the modified documents against completeness criteria
6. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.
