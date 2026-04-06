# Step 4: Apply Change

Execute the approved emergency architecture change:

## Pre-Implementation Checklist

- [ ] Approval documented and filed
- [ ] Implementation team assembled
- [ ] Communication sent to affected teams
- [ ] Rollback procedures verified
- [ ] Monitoring dashboards prepared
- [ ] On-call support alerted

## Master Architecture Update

**Update Process:**
1. Create branch for architecture document changes
2. Apply changes to master architecture document
3. Mark sections with emergency change notation:
   ```markdown
   <!-- EMERGENCY CHANGE: EMG-YYYY-NNN -->
   <!-- Date: YYYY-MM-DD -->
   <!-- Reason: Brief description -->
   [Changed content]
   <!-- END EMERGENCY CHANGE -->
   ```
4. Create technical debt item for post-emergency review
5. Commit with reference to emergency ID

## Implementation Coordination

**Parallel Tracks:**
1. Documentation update (master architecture)
2. Module code changes (affected modules)
3. Infrastructure changes (if applicable)
4. Testing and validation

**Communication Points:**
- Implementation started notification
- Mid-implementation status update
- Implementation complete notification
- Validation complete notification

## Validation

Before declaring complete:
- [ ] Architecture document updated
- [ ] All affected modules updated
- [ ] Tests pass (existing and new)
- [ ] Security scan (if security-related)
- [ ] Compliance check (if compliance-related)
- [ ] Monitoring confirms stability

Output: Implementation log with change evidence and validation results.
