# Tenant Isolation Setup

This tutorial covers implementing tenant isolation using PostgreSQL Row-Level Security (RLS).

## Prerequisites

- Module architecture designed
- PostgreSQL 12+ database
- Understanding of RLS concepts

## Why RLS?

Row-Level Security provides:
- **Automatic filtering** - No code changes needed for queries
- **Defense in depth** - Even bugs can't leak tenant data
- **Audit compliance** - Isolation enforced at database level

## Step 1: Design Tenant Context

First, define how tenant context flows through your system:

```
/dev
> bam-dev-context
```

Load the tenant isolation guide, then:

```
> implement-rls
```

### Context Propagation Options

| Method | Pros | Cons |
|--------|------|------|
| Session variable | Simple, works with RLS | Requires setting per connection |
| JWT claim | Stateless | Need middleware extraction |
| Request header | Explicit | Can be spoofed if not validated |

Recommended: **JWT claim** extracted by middleware, set as session variable.

## Step 2: Create Base Table Structure

All tenant-scoped tables need a `tenant_id` column:

```sql
-- Shared types
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tenant-scoped table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_tenant ON projects(tenant_id);
```

## Step 3: Enable RLS

```sql
-- Enable RLS on the table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Force RLS even for table owners (important!)
ALTER TABLE projects FORCE ROW LEVEL SECURITY;

-- Create isolation policy
CREATE POLICY tenant_isolation ON projects
  FOR ALL
  USING (tenant_id = current_setting('app.tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);
```

## Step 4: Create Application Role

```sql
-- Application role (not superuser)
CREATE ROLE app_user LOGIN PASSWORD 'secure_password';

-- Grant access
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON projects TO app_user;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;
```

## Step 5: Implement Middleware

### NestJS Example
```typescript
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = this.extractTenantId(req);
    
    if (!tenantId) {
      throw new UnauthorizedException('Tenant context required');
    }

    // Set tenant context for this request
    await this.dataSource.query(
      `SET LOCAL app.tenant_id = $1`,
      [tenantId]
    );

    next();
  }

  private extractTenantId(req: Request): string | null {
    // From JWT claim
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.decode(token) as { tenant_id?: string };
      return decoded?.tenant_id ?? null;
    }
    return null;
  }
}
```

### Express Example
```typescript
export const tenantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tenantId = req.user?.tenantId;
  
  if (!tenantId) {
    return res.status(401).json({ error: 'Tenant context required' });
  }

  // Use transaction to scope tenant context
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SET LOCAL app.tenant_id = $1`, [tenantId]);
    
    req.dbClient = client;
    next();
  } catch (err) {
    await client.query('ROLLBACK');
    client.release();
    next(err);
  }
};
```

## Step 6: Verify Isolation

Use TEA with BAM extensions to test:

```
/tea
> bam-tea-context
> tenant-test-strategy
```

### Test Cases

```typescript
describe('Tenant Isolation', () => {
  it('should only return tenant data', async () => {
    // Create projects for two tenants
    await createProject(tenantA, 'Project A');
    await createProject(tenantB, 'Project B');

    // Query as tenant A
    setTenantContext(tenantA);
    const projects = await listProjects();

    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe('Project A');
  });

  it('should prevent cross-tenant writes', async () => {
    setTenantContext(tenantA);
    
    // Attempt to insert with wrong tenant_id
    await expect(
      db.query(
        'INSERT INTO projects (tenant_id, name) VALUES ($1, $2)',
        [tenantB, 'Malicious']
      )
    ).rejects.toThrow();
  });
});
```

## Step 7: Pass Tenant Isolation Gate

Validate with QG-M2:

```
/kai
> validate QG-M2
```

Checklist:
- [ ] All tenant-scoped tables have RLS enabled
- [ ] Policies use `FORCE ROW LEVEL SECURITY`
- [ ] Application role is not superuser
- [ ] Middleware sets tenant context
- [ ] Tests verify isolation

## Common Pitfalls

### 1. Superuser Bypasses RLS
```sql
-- WRONG: Superuser ignores RLS
-- Use application role instead

-- RIGHT: Force RLS for all roles
ALTER TABLE projects FORCE ROW LEVEL SECURITY;
```

### 2. Missing Tenant Context
```typescript
// WRONG: Query without tenant context
const projects = await db.query('SELECT * FROM projects');

// RIGHT: Ensure middleware runs first
app.use(tenantMiddleware);
```

### 3. Connection Pooling Issues
```typescript
// WRONG: Tenant context leaks between requests
pool.query('SET app.tenant_id = ...');

// RIGHT: Use SET LOCAL in transaction
await client.query('BEGIN');
await client.query('SET LOCAL app.tenant_id = $1', [tenantId]);
```

## Next Steps

- [Testing Tenant Isolation](../how-to/test-tenant-isolation.md) - Advanced testing patterns
- [Cache Isolation](../how-to/cache-isolation.md) - Redis tenant isolation
- [Vector DB Isolation](../how-to/vector-isolation.md) - AI embedding isolation
