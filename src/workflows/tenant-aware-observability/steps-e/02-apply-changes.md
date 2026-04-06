# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the affected sections in the observability documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Tenant dimension consistency across signals
   - Metric cardinality management
   - Log context injection patterns
   - Trace propagation chain
4. If modifying tenant dimensions, verify:
   - All signals (metrics, logs, traces) are updated consistently
   - Cardinality impact is assessed
   - Propagation rules are updated
5. If modifying metric aggregation, verify:
   - Pre-aggregation rules are consistent
   - Retention policies are maintained
   - Tenant isolation is preserved
6. If modifying dashboards, verify:
   - Access control is maintained
   - Tenant filtering is applied correctly
   - Query performance is acceptable
7. Validate the modified documents against completeness criteria
8. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.
