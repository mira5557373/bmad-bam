# Row-Level Security Best Practices

## Core Concept

RLS is the primary tenant isolation mechanism in BAM. Every tenant-plane table
must have RLS policies that enforce tenant boundaries at the database level.

## Policy Template

```sql
-- Standard RLS policy for tenant isolation
ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {table_name} FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON {table_name}
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::uuid)
    WITH CHECK (tenant_id = current_setting('app.current_tenant')::uuid);
```

## Context Setting Pattern

```python
# Middleware sets tenant context at request start
async def set_tenant_context(session: AsyncSession, tenant_id: UUID):
    await session.execute(
        text("SET LOCAL app.current_tenant = :tenant_id"),
        {"tenant_id": str(tenant_id)}
    )

# Context automatically resets at transaction end (SET LOCAL)
```

## Best Practices

### 1. Always Use SET LOCAL (Not SET)

- `SET LOCAL` scopes to current transaction only
- `SET` persists for entire session — DANGEROUS with connection pooling

### 2. Force RLS on All Tables

```sql
-- FORCE ensures RLS applies even to table owners
ALTER TABLE orders FORCE ROW LEVEL SECURITY;
```

### 3. Create Admin Bypass Policy (Documented)

```sql
-- Admin access for support/debugging (AUDIT LOGGED)
CREATE POLICY admin_bypass ON orders
    FOR ALL
    TO admin_role
    USING (true)
    WITH CHECK (true);
```

### 4. Test RLS Exhaustively

```python
# Test that tenant A cannot see tenant B's data
async def test_rls_isolation():
    # Create data as tenant A
    await set_tenant_context(session, tenant_a_id)
    order = await create_order(...)

    # Try to read as tenant B
    await set_tenant_context(session, tenant_b_id)
    result = await session.get(Order, order.id)
    assert result is None  # RLS blocks access
```

### 5. Handle Missing Context

```sql
-- Policy that blocks access if no tenant context set
CREATE POLICY require_tenant_context ON orders
    FOR ALL
    USING (
        current_setting('app.current_tenant', true) IS NOT NULL
        AND tenant_id = current_setting('app.current_tenant')::uuid
    );
```

## Common Pitfalls

| Pitfall                             | Risk                                   | Mitigation                 |
| ----------------------------------- | -------------------------------------- | -------------------------- |
| Using SET instead of SET LOCAL      | Session context bleeds across requests | Always use SET LOCAL       |
| Forgetting FORCE ROW LEVEL SECURITY | Table owners bypass RLS                | Add FORCE to all tables    |
| No policy for INSERT                | Data created without tenant_id         | WITH CHECK clause required |
| Superuser access                    | Superuser bypasses all RLS             | Never use superuser in app |

## Key Points

- RLS is the primary isolation mechanism — every tenant-plane table must have it
- SET LOCAL (not SET) ensures context is transaction-scoped with connection pooling
- FORCE ROW LEVEL SECURITY is required — without it, table owners bypass policies
- Test RLS exhaustively: tenant A must never see tenant B's data

## Anti-Pattern

| Anti-Pattern                               | Problem                       | Correct Approach                                  |
| ------------------------------------------ | ----------------------------- | ------------------------------------------------- |
| RLS disabled "temporarily" for performance | Data leak risk if forgotten   | Never disable; optimize queries instead           |
| Missing RLS on new tables                  | Silent isolation gap          | CI check: all tenant tables must have RLS         |
| Testing RLS only with happy path           | Edge cases leak data          | Test cross-tenant reads, writes, updates, deletes |
| Shared admin connection without audit      | Untracked cross-tenant access | Admin bypass must be audit-logged                 |

See also: multi-tenant-patterns.md, testing-tenant-isolation.md, shared-kernel-patterns.md
