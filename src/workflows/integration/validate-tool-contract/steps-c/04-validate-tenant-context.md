# Step 4: Validate Tenant Context

Verify the tool correctly handles multi-tenant context.

## Tasks

1. **Check Tenant Context Requirement**
   - Tool declares tenant context as required input
   - Tenant ID is validated before execution
   - Missing tenant context fails safely

2. **Verify Tenant Isolation**
   - Tool only accesses data for the provided tenant
   - Cross-tenant data access is impossible
   - Tenant context is propagated to all downstream calls

3. **Check RLS Integration**
   - Tool queries use tenant-scoped connections
   - Row-Level Security is active for data access
   - No direct database access bypassing RLS

4. **Validate Tenant-Scoped Logging**
   - Tool logs include tenant context
   - No cross-tenant log leakage
   - Audit trail maintains tenant attribution

5. **Check Resource Quotas**
   - Tool respects tenant resource limits
   - Rate limiting is tenant-aware
   - Resource exhaustion is isolated per tenant

6. **Verify Error Handling**
   - Errors don't leak cross-tenant information
   - Tenant context preserved in error responses
   - Failed operations logged with tenant context

## Output

Tenant context validation report:
- Tenant context handling status
- Isolation verification results
- RLS integration status
- Resource quota compliance
- Cross-tenant leakage risks (if any)
