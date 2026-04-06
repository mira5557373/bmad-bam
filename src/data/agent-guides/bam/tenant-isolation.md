# BAM Tenant Isolation Context

**When to load:** During implementation phase when building tenant isolation, RLS policies, or context propagation.

**Integrates with:** Dev agents, QA agents

---

## Core Concepts for Tenant Isolation

### Isolation Matrix (8 Dimensions)

| Dimension | Strategy | Implementation |
|-----------|----------|----------------|
| Database | Row-Level Security | PostgreSQL RLS policies |
| Cache | Key prefix | `tenant:{id}:cache:key` |
| Memory | Scope tagging | session/user/tenant/global |
| Tools | Tier filtering | Permission middleware |
| Jobs | Context serialization | Job payload includes tenant |
| Vectors | Filter injection | Collection per tenant or filter |
| Logs | Field injection | Structured logging with tenant_id |
| Files | Path prefix | `tenants/{id}/files/` |

### RLS Policy Pattern

```sql
-- Enable and force RLS
ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {table} FORCE ROW LEVEL SECURITY;

-- Tenant isolation policy
CREATE POLICY tenant_isolation ON {table}
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Admin bypass (audit logged)
CREATE POLICY admin_bypass ON {table}
  FOR ALL
  USING (current_setting('app.is_admin')::boolean = true)
  WITH CHECK (current_setting('app.is_admin')::boolean = true);

-- Context guard (fail-safe)
CREATE POLICY require_context ON {table}
  USING (current_setting('app.current_tenant', true) IS NOT NULL);
```

### Context Propagation

```typescript
// Set context at request boundary
await db.query("SET LOCAL app.current_tenant = $1", [ctx.tenantId]);

// Never use SET (non-transactional) - always SET LOCAL
// Context automatically cleared at transaction end
```

---

## Application Guidelines

1. **RLS is mandatory** - No tenant data without RLS
2. **Test isolation** - Verify tenant A cannot see tenant B data
3. **Audit admin access** - Log all admin bypass operations
4. **Context propagation** - Every code path must have tenant context

---

## Integration with BAM Workflows

- `bmad-bam-tenant-model-isolation` → Design isolation strategy
- `bmad-bam-validate-foundation` → Verify isolation implementation
