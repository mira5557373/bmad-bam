# Step 3: Check Permissions

Validate the tool's permission model and access controls.

## Tasks

1. **Verify Required Permissions Declared**
   - Check tool declares all permissions it needs
   - Verify permission names match the permission model
   - Confirm no over-requesting of permissions

2. **Validate Permission Levels**
   - Read permissions for query operations
   - Write permissions for data modification
   - Admin permissions for sensitive operations
   - External permissions for third-party access

3. **Check Approval Requirements**
   - High-risk operations require human approval
   - Cost-impacting operations have thresholds
   - Sensitive data access triggers approval flow
   - Approval workflow integration is correct

4. **Verify Role Mapping**
   - Tool permissions map to defined roles
   - Role requirements are documented
   - No implicit permission assumptions

5. **Check Sandbox Configuration**
   - Untrusted tool inputs are sandboxed
   - External tool calls have appropriate isolation
   - Resource limits are configured
   - Network access is restricted appropriately

## Output

Permission validation report:
- Declared permissions list
- Permission appropriateness assessment
- Approval requirements status
- Sandbox configuration status
- Security recommendations
