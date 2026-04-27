# BAM RLS Best Practices Guide

**When to load:** During Phase 3 (Solutioning) when designing tenant isolation with row-level security, or when implementing RLS policies for multi-tenant data access.

**Integrates with:** Architect (Atlas persona), Dev agent, Security agent

---

## Core Concepts

### What is Row-Level Security (RLS)?

Row-Level Security is a database feature that restricts which rows a user can access based on defined policies. In multi-tenant SaaS, RLS ensures tenants can only see their own data without application-level filtering.

### When to Use RLS

| Scenario | RLS Fit | Rationale |
|----------|---------|-----------|
| < 1000 tenants | Excellent | Cost-efficient, shared tables |
| Shared database | Required | Primary isolation mechanism |
| Compliance needs | Good | Database-enforced isolation |
| Read-heavy workloads | Excellent | Policy overhead minimal |
| Complex joins | Good | Policies apply automatically |

### When NOT to Use RLS

| Scenario | Alternative | Rationale |
|----------|-------------|-----------|
| > 10,000 tenants | Schema-per-tenant | Policy evaluation overhead |
| Enterprise isolation | Database-per-tenant | Complete separation required |
| Heavy write workloads | Schema isolation | Lock contention concerns |

---

## Application Guidelines

When implementing RLS in multi-tenant systems:

1. **Always set tenant context at request boundary**: Never query without tenant context established
2. **Index tenant_id columns**: Performance depends on efficient tenant filtering
3. **Test cross-tenant access attempts**: Verify policies block unauthorized access
4. **Use FORCE ROW LEVEL SECURITY**: Prevent superuser bypass unless explicitly intended
5. **Monitor policy performance**: RLS adds overhead - track query times and optimize

---

## Implementation Patterns

### Pattern 1: Basic Tenant Column

Every tenant-scoped table includes a `tenant_id` column:

```sql
-- Table structure
CREATE TABLE documents (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,  -- Required for RLS
    title TEXT,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_documents_tenant ON documents(tenant_id);

-- RLS policy
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON documents
    USING (tenant_id = current_setting('app.tenant_id')::UUID);
```

### Pattern 2: Tenant Context Setting

Set tenant context at connection/transaction start:

```sql
-- Set at request start
SET app.tenant_id = 'tenant-uuid-here';

-- Alternative: Function-based
CREATE OR REPLACE FUNCTION set_tenant(tenant UUID)
RETURNS VOID AS $$
BEGIN
    PERFORM set_config('app.tenant_id', tenant::TEXT, false);
END;
$$ LANGUAGE plpgsql;
```

### Pattern 3: Composite Policies

Combine tenant isolation with other access rules:

```sql
-- Tenant + Status policy
CREATE POLICY tenant_active_documents ON documents
    FOR SELECT
    USING (
        tenant_id = current_setting('app.tenant_id')::UUID
        AND status != 'deleted'
    );

-- Tenant + Role policy
CREATE POLICY tenant_admin_access ON documents
    FOR ALL
    USING (
        tenant_id = current_setting('app.tenant_id')::UUID
        AND current_setting('app.user_role') IN ('admin', 'owner')
    );
```

### Pattern 4: Per-Operation Policies

Different policies for different operations:

```sql
-- Read: All tenant users
CREATE POLICY tenant_read ON documents
    FOR SELECT
    USING (tenant_id = current_setting('app.tenant_id')::UUID);

-- Write: Only document owner
CREATE POLICY owner_write ON documents
    FOR UPDATE
    USING (
        tenant_id = current_setting('app.tenant_id')::UUID
        AND owner_id = current_setting('app.user_id')::UUID
    );

-- Delete: Only admins
CREATE POLICY admin_delete ON documents
    FOR DELETE
    USING (
        tenant_id = current_setting('app.tenant_id')::UUID
        AND current_setting('app.user_role') = 'admin'
    );
```

---

## Performance Best Practices

### Index Strategy

| Index Type | Use Case | Example |
|------------|----------|---------|
| B-tree on tenant_id | Default, most queries | `CREATE INDEX ON tbl(tenant_id)` |
| Composite index | Tenant + common filter | `CREATE INDEX ON tbl(tenant_id, created_at)` |
| Partial index | Large tables, active subset | `CREATE INDEX ON tbl(tenant_id) WHERE status = 'active'` |
| Covering index | Avoid table lookups | `CREATE INDEX ON tbl(tenant_id) INCLUDE (name, email)` |

### Query Optimization

1. **Always include tenant_id in WHERE clause** - Even with RLS, explicit filtering helps optimizer
2. **Use prepared statements** - Policy evaluation cached
3. **Batch operations by tenant** - Avoid context switching overhead
4. **Monitor policy evaluation time** - `pg_stat_statements`

### Connection Pooling Considerations

| Pool Strategy | RLS Approach | Overhead |
|---------------|--------------|----------|
| Shared pool | SET per request | Low (session variable) |
| Per-tenant pool | SET per connection | Very low (once per connection) |
| Transaction pooling | SET per transaction | Medium (every transaction) |

---

## Security Best Practices

### Policy Design Rules

1. **Default deny** - Start with `FORCE ROW LEVEL SECURITY`
2. **Explicit tenant check** - Always compare tenant_id
3. **No tenant_id in policy bypass** - Never skip tenant check
4. **Audit bypass access** - Log any superuser/admin access

### Preventing Bypass

```sql
-- Force RLS for table owners too
ALTER TABLE documents FORCE ROW LEVEL SECURITY;

-- Separate role for application (no BYPASSRLS)
CREATE ROLE app_user LOGIN;
GRANT SELECT, INSERT, UPDATE, DELETE ON documents TO app_user;

-- Admin role for maintenance (audited)
CREATE ROLE admin_user LOGIN BYPASSRLS;
-- Only use with audit logging
```

### Common Vulnerabilities to Avoid

| Vulnerability | Cause | Prevention |
|---------------|-------|------------|
| Tenant enumeration | Missing RLS on count queries | Enable RLS on all operations |
| Leaked tenant context | Connection reuse without reset | Always reset context |
| Policy bypass | BYPASSRLS role in app | Separate admin role |
| Join leakage | RLS not on joined table | Enable RLS on ALL tables |

---

## Testing RLS Policies

### Unit Test Pattern

```sql
-- Test setup
INSERT INTO documents (tenant_id, title) VALUES 
    ('tenant-a', 'Doc A'),
    ('tenant-b', 'Doc B');

-- Test as Tenant A
SET app.tenant_id = 'tenant-a';
SELECT * FROM documents;
-- Expected: Only 'Doc A'

-- Test as Tenant B
SET app.tenant_id = 'tenant-b';
SELECT * FROM documents;
-- Expected: Only 'Doc B'

-- Test with no tenant (should fail or return empty)
RESET app.tenant_id;
SELECT * FROM documents;
-- Expected: Empty or error
```

### Integration Test Checklist

- [ ] Tenant A cannot see Tenant B data
- [ ] Tenant A cannot modify Tenant B data
- [ ] New rows inherit correct tenant_id
- [ ] Joins respect RLS on all tables
- [ ] Aggregations don't leak counts
- [ ] Error messages don't reveal other tenants

### Load Test Considerations

- Measure query latency with RLS vs without
- Test policy evaluation under concurrent load
- Verify connection pool behavior
- Monitor for lock contention

---

## Migration Patterns

### Adding RLS to Existing Tables

```sql
-- 1. Add tenant_id if missing
ALTER TABLE legacy_table ADD COLUMN tenant_id UUID;

-- 2. Backfill tenant_id (use default or migrate)
UPDATE legacy_table SET tenant_id = 'default-tenant' WHERE tenant_id IS NULL;

-- 3. Add NOT NULL constraint
ALTER TABLE legacy_table ALTER COLUMN tenant_id SET NOT NULL;

-- 4. Create index
CREATE INDEX CONCURRENTLY idx_legacy_tenant ON legacy_table(tenant_id);

-- 5. Enable RLS
ALTER TABLE legacy_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE legacy_table FORCE ROW LEVEL SECURITY;

-- 6. Create policy
CREATE POLICY tenant_isolation ON legacy_table
    USING (tenant_id = current_setting('app.tenant_id')::UUID);
```

### Zero-Downtime Migration

1. Deploy application with tenant context setting
2. Add tenant_id column (nullable)
3. Backfill in batches
4. Add NOT NULL, create index
5. Enable RLS (reads still work)
6. Verify isolation in staging
7. Monitor production

---

## Monitoring & Troubleshooting

### Key Metrics

| Metric | Source | Alert Threshold |
|--------|--------|-----------------|
| RLS policy time | pg_stat_statements | > 1ms avg |
| Policy cache hits | pg_stat_user_tables | < 95% |
| Cross-tenant attempts | Application logs | Any |
| Context not set | Application errors | Any |

### Common Issues

| Issue | Symptom | Resolution |
|-------|---------|------------|
| Empty results | Tenant context not set | Verify SET before queries |
| Slow queries | Missing index | Add tenant_id index |
| Permission denied | FORCE RLS without policy | Add permissive policy |
| Leaked data | RLS not on all tables | Audit all tables |

---

## Related Patterns

- `tenant-isolation` pattern in `bam-patterns.csv`
- `multi-tenant-patterns` guide
- `testing-tenant-isolation` guide
- `tenant-model-template.md` template

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "PostgreSQL RLS performance optimization {date}"
- Search: "row-level security multi-tenant patterns {date}"
- Search: "RLS policy testing strategies {date}"

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Design and select tenant isolation strategy including RLS
- `bmad-bam-convergence-verification` - Verify RLS policies are correctly implemented
- `bmad-bam-security-review` - Audit RLS configuration for security compliance

---

## Decision Framework

| Question | RLS Answer | Alternative |
|----------|------------|-------------|
| Need cost efficiency? | Yes - shared tables | Schema costs more |
| Need compliance audit? | Yes - database enforced | App-level harder to audit |
| > 10K tenants? | Consider schema | RLS overhead grows |
| Need tenant backup restore? | Harder with RLS | Schema easier |
| Complex tenant hierarchies? | Possible with policies | Schema cleaner |
