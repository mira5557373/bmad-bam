-- RLS Policy Template
-- name: rls-policy-template
-- description: Row-Level Security policy template for multi-tenant isolation

-- =============================================================================
-- Purpose: Define RLS policies for tenant data isolation
-- Usage: Replace {{placeholders}} with actual values
-- See also: {project-root}/_bmad/bam/data/agent-guides/bam/rls-best-practices.md
-- =============================================================================

-- Enable RLS on table (ENABLE + FORCE required for complete isolation)
ALTER TABLE {{schema_name}}.{{table_name}} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {{schema_name}}.{{table_name}} FORCE ROW LEVEL SECURITY;

-- Policy: Tenant can only see their own data
-- Uses app.current_tenant setting (must be set via SET LOCAL in transaction)
CREATE POLICY tenant_isolation_policy ON {{schema_name}}.{{table_name}}
    FOR ALL
    USING (
        current_setting('app.current_tenant', true) IS NOT NULL
        AND tenant_id = current_setting('app.current_tenant')::uuid
    )
    WITH CHECK (
        current_setting('app.current_tenant', true) IS NOT NULL
        AND tenant_id = current_setting('app.current_tenant')::uuid
    );

-- Policy: System admin bypass (optional - MUST be audit logged)
-- Only enable if admin access is required and audit logging is configured
CREATE POLICY admin_bypass_policy ON {{schema_name}}.{{table_name}}
    FOR ALL
    TO {{admin_role}}
    USING (true)
    WITH CHECK (true);

-- Grant permissions to application role
GRANT SELECT, INSERT, UPDATE, DELETE ON {{schema_name}}.{{table_name}} TO {{app_role}};

-- =============================================================================
-- Context Setting (execute before queries in each transaction)
-- =============================================================================
-- SET LOCAL app.current_tenant = '{{tenant_id}}';
-- Note: Always use SET LOCAL (not SET) with connection pooling

-- =============================================================================
-- Verification Queries
-- =============================================================================
-- Check RLS is enabled and forced:
-- SELECT relname, relrowsecurity, relforcerowsecurity
--   FROM pg_class WHERE relname = '{{table_name}}';

-- List all policies on table:
-- SELECT * FROM pg_policies WHERE tablename = '{{table_name}}';
