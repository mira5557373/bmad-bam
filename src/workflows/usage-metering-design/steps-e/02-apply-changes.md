# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the affected sections in the metering documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Billable resource consistency
   - Metering event schema compatibility
   - Aggregation pipeline integrity
   - Billing integration correctness
4. If modifying billable resources, verify:
   - Tier inclusions are updated
   - Overage pricing is updated
   - Attribution rules are consistent
5. If modifying metering events, verify:
   - Schema backward compatibility
   - Idempotency handling preserved
   - Event validation rules updated
6. If modifying aggregation, verify:
   - All aggregation levels are consistent
   - Retention policies are appropriate
   - Quota tracking is updated
7. If modifying billing integration, verify:
   - API contracts are maintained
   - Reconciliation checks are updated
   - Error handling is comprehensive
8. Validate the modified documents against completeness criteria
9. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.
