# Tenant Isolation Strategies

Multi-tenant SaaS requires isolating tenant data and resources. This document explains the three isolation strategies BAM supports.

## Strategy Comparison

| Strategy | Isolation Level | Cost | Complexity | Best For |
|----------|-----------------|------|------------|----------|
| Row-Level Security | Medium | Low | Low | Most SaaS |
| Schema per Tenant | High | Medium | Medium | Regulated industries |
| Database per Tenant | Maximum | High | High | Enterprise tier |

## Row-Level Security (RLS)

### How It Works
```
┌─────────────────────────────────────────────┐
│              Shared Database                 │
│  ┌─────────────────────────────────────────┐│
│  │            projects table               ││
│  │  ┌───────┬───────────┬────────────────┐ ││
│  │  │ id    │ tenant_id │ name           │ ││
│  │  ├───────┼───────────┼────────────────┤ ││
│  │  │ 1     │ A         │ Tenant A Proj  │ ││
│  │  │ 2     │ B         │ Tenant B Proj  │ ││
│  │  │ 3     │ A         │ Another A Proj │ ││
│  │  └───────┴───────────┴────────────────┘ ││
│  │                                          ││
│  │  RLS Policy: WHERE tenant_id = :current  ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

### Implementation
```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects FORCE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY tenant_isolation ON projects
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

### Pros
- Simple implementation
- Efficient resource usage (shared tables)
- Low operational overhead
- Easy to add new tenants

### Cons
- Bugs could leak data (mitigated by FORCE RLS)
- Performance at extreme scale
- Harder to delete tenant completely
- Shared indexes

### Best For
- SaaS with 100+ tenants
- Standard isolation requirements
- Startups and growth-stage companies

## Schema per Tenant

### How It Works
```
┌─────────────────────────────────────────────┐
│              Shared Database                 │
│  ┌───────────────┐  ┌───────────────┐       │
│  │ schema_tenant_a│  │ schema_tenant_b│       │
│  │  ┌──────────┐ │  │  ┌──────────┐ │       │
│  │  │ projects │ │  │  │ projects │ │       │
│  │  └──────────┘ │  │  └──────────┘ │       │
│  │  ┌──────────┐ │  │  ┌──────────┐ │       │
│  │  │ users    │ │  │  │ users    │ │       │
│  │  └──────────┘ │  │  └──────────┘ │       │
│  └───────────────┘  └───────────────┘       │
└─────────────────────────────────────────────┘
```

### Implementation
```sql
-- Create schema for tenant
CREATE SCHEMA tenant_abc123;

-- Create tables in tenant schema
SET search_path TO tenant_abc123;
CREATE TABLE projects (...);

-- Switch context
SET search_path TO tenant_abc123, public;
```

### Pros
- Stronger isolation than RLS
- Easy to backup/restore per tenant
- Clear audit boundaries
- Independent schema migrations possible

### Cons
- Schema explosion at scale
- Connection pooling complexity
- Migration coordination
- Higher resource usage

### Best For
- Regulated industries (HIPAA, SOC2)
- Need per-tenant backup/restore
- 50-500 tenants
- Different data retention requirements

## Database per Tenant

### How It Works
```
┌─────────────────┐  ┌─────────────────┐
│  db_tenant_a    │  │  db_tenant_b    │
│  ┌───────────┐  │  │  ┌───────────┐  │
│  │ projects  │  │  │  │ projects  │  │
│  └───────────┘  │  │  └───────────┘  │
│  ┌───────────┐  │  │  ┌───────────┐  │
│  │ users     │  │  │  │ users     │  │
│  └───────────┘  │  │  └───────────┘  │
└─────────────────┘  └─────────────────┘
       ▲                    ▲
       └────────┬───────────┘
         Connection Router
```

### Implementation
```typescript
// Connection routing
const getConnection = (tenantId: string) => {
  const config = tenantConfigs.get(tenantId);
  return createConnection({
    host: config.host,
    database: config.database,
    ...
  });
};
```

### Pros
- Maximum isolation
- Independent scaling per tenant
- Tenant-specific customization
- Complete data sovereignty

### Cons
- Highest operational cost
- Connection management complexity
- Cross-tenant queries impossible
- Schema drift risk

### Best For
- Enterprise tier customers
- Data sovereignty requirements
- Tenants with custom compliance
- <50 high-value tenants

## Hybrid Strategy

BAM supports mixing strategies:

```
┌─────────────────────────────────────────────┐
│                Application                   │
│  ┌─────────────────────────────────────────┐│
│  │            Tenant Router                ││
│  └───────────┬───────────┬─────────────────┘│
│              │           │                   │
│      ┌───────▼───┐ ┌─────▼─────┐            │
│      │   RLS DB  │ │ Dedicated │            │
│      │(Free/Pro) │ │(Enterprise)│           │
│      └───────────┘ └───────────┘            │
└─────────────────────────────────────────────┘
```

```typescript
// Route by tier
const getConnection = (tenant: Tenant) => {
  if (tenant.tier === 'enterprise' && tenant.dedicatedDb) {
    return getDedicatedConnection(tenant.id);
  }
  return getSharedConnection();
};
```

## Decision Matrix

| Factor | RLS | Schema | Database |
|--------|-----|--------|----------|
| Tenant count | 1000+ | 100-500 | <100 |
| Compliance | Standard | High | Extreme |
| Cost sensitivity | High | Medium | Low |
| Team size | Small | Medium | Large |
| Customization need | Low | Medium | High |

## BAM Recommendation

1. **Start with RLS** for all tenants
2. **Offer schema isolation** as Pro tier upgrade
3. **Offer database isolation** as Enterprise option
4. **Use hybrid routing** to mix strategies

This gives you:
- Low cost at scale
- Upgrade path for customers
- Maximum flexibility
- Clear value proposition per tier
