# Row-Level Security (RLS) - BAM Pattern

**Loaded by:** ZPR  
**Applies to:** Multi-tenant data isolation

---

## When to Use

- <1000 tenants
- Cost efficiency is priority
- Shared infrastructure acceptable
- Low-medium compliance requirements

## When NOT to Use

- Tenants require dedicated resources
- Strict compliance (PCI-DSS, HIPAA)
- Complex per-tenant schema variations

## Architecture

```
┌─────────────────────────────────────────┐
│           Shared Database               │
│  ┌───────────────────────────────────┐  │
│  │         Shared Tables             │  │
│  │  ┌─────────┬─────────┬─────────┐  │  │
│  │  │Tenant A │Tenant B │Tenant C │  │  │
│  │  │ (rows)  │ (rows)  │ (rows)  │  │  │
│  │  └─────────┴─────────┴─────────┘  │  │
│  │     RLS Policy: tenant_id = ctx   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Implementation

```sql
-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| Simple schema | Query overhead (minor) |
| Cost efficient | Index bloat from tenant_id |
| Easy backup | All tenants in same backup |

## Web Research Queries

- "PostgreSQL RLS performance {date}"
- "row level security multi-tenant {date}"
