# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the affected sections in the onboarding documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Provisioning stage ordering and dependencies
   - Rollback strategy consistency
   - Tier configuration compatibility
   - Isolation boundary completeness
4. If modifying provisioning stages, verify:
   - Stage dependencies are still valid
   - Rollback strategies are updated accordingly
   - Timeouts and retry configurations are appropriate
5. If modifying tier configurations, verify:
   - Changes are consistent across all tier references
   - Feature flags align with quota changes
   - No downgrade of existing tenant capabilities
6. Validate the modified documents against completeness criteria
7. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.
