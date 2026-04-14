---
name: rls-policy-template
description: Template for documenting Row-Level Security policy design for PostgreSQL multi-tenant databases
category: tenant-isolation
version: "1.0.0"
---

# Row-Level Security Policy Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Database** | {{database_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents Row-Level Security (RLS) policy design for PostgreSQL multi-tenant databases, ensuring strict data isolation at the database level.

## RLS Architecture

### Tenant Context Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        Application                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Request   │──▶   Extract   │──▶  Set Tenant │             │
│  │   Handler   │  │  Tenant ID  │  │   Context   │             │
│  └─────────────┘  └─────────────┘  └──────┬──────┘             │
│                                           │                     │
│                              SET app.tenant_id = 'xxx'          │
│                                           │                     │
└───────────────────────────────────────────┼─────────────────────┘
                                            │
┌───────────────────────────────────────────┼─────────────────────┐
│                    PostgreSQL              │                     │
│                                           ▼                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    RLS Policies                          │   │
│  │   WHERE tenant_id = current_setting('app.tenant_id')     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                               │                                  │
│                    ┌──────────┼──────────┐                      │
│                    ▼          ▼          ▼                      │
│               [Table A]  [Table B]  [Table C]                   │
└─────────────────────────────────────────────────────────────────┘
```

## Table Design

### Tenant-Aware Tables

| Table | Tenant Column | RLS Enabled | Policy Type |
|-------|---------------|-------------|-------------|
| {{table_1}} | tenant_id | Yes | Restrictive |
| {{table_2}} | tenant_id | Yes | Restrictive |
| {{table_3}} | tenant_id | Yes | Restrictive |

### Table Schema

```sql
-- Standard tenant-aware table template
CREATE TABLE {{table_name}} (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    
    -- Business columns
    {{column_definitions}}
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT fk_tenant FOREIGN KEY (tenant_id) 
        REFERENCES tenants(id) ON DELETE CASCADE
);

-- Required index for RLS performance
CREATE INDEX idx_{{table_name}}_tenant_id ON {{table_name}}(tenant_id);
```

## RLS Policies

### Policy Definitions

```sql
-- Enable RLS on table
ALTER TABLE {{table_name}} ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owner (critical for security)
ALTER TABLE {{table_name}} FORCE ROW LEVEL SECURITY;

-- Tenant isolation policy (SELECT)
CREATE POLICY tenant_isolation_select ON {{table_name}}
    FOR SELECT
    USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- Tenant isolation policy (INSERT)
CREATE POLICY tenant_isolation_insert ON {{table_name}}
    FOR INSERT
    WITH CHECK (tenant_id = current_setting('app.tenant_id')::uuid);

-- Tenant isolation policy (UPDATE)
CREATE POLICY tenant_isolation_update ON {{table_name}}
    FOR UPDATE
    USING (tenant_id = current_setting('app.tenant_id')::uuid)
    WITH CHECK (tenant_id = current_setting('app.tenant_id')::uuid);

-- Tenant isolation policy (DELETE)
CREATE POLICY tenant_isolation_delete ON {{table_name}}
    FOR DELETE
    USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

### Policy Types

| Policy Type | Use Case | Example |
|-------------|----------|---------|
| Restrictive | Default tenant isolation | `USING (tenant_id = ...)` |
| Permissive | Admin cross-tenant access | `USING (is_admin())` |
| Combined | Role-based within tenant | `USING (tenant_id = ... AND role = ...)` |

## Context Management

### Setting Tenant Context

```sql
-- Application must call this before any query
CREATE OR REPLACE FUNCTION set_tenant_context(p_tenant_id UUID)
RETURNS void AS $$
BEGIN
    PERFORM set_config('app.tenant_id', p_tenant_id::text, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Clear context (important for connection pooling)
CREATE OR REPLACE FUNCTION clear_tenant_context()
RETURNS void AS $$
BEGIN
    PERFORM set_config('app.tenant_id', '', false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Connection Pool Integration

```yaml
connection_pool:
  provider: pgbouncer
  
  hooks:
    on_checkout:
      - set_tenant_context($tenant_id)
    on_checkin:
      - clear_tenant_context()
      
  validation:
    verify_tenant_context: true
    reject_if_missing: true
```

## Special Cases

### Cross-Tenant Tables

| Table | Access Pattern | Policy |
|-------|----------------|--------|
| system_config | Read-only | Platform admin only |
| audit_logs | Write-only | No tenant restriction on write |
| shared_resources | Controlled read | Explicit grant list |

### Admin Access

```sql
-- Admin bypass policy (use sparingly)
CREATE POLICY admin_bypass ON {{table_name}}
    FOR ALL
    USING (
        current_setting('app.tenant_id')::uuid = tenant_id
        OR current_setting('app.is_admin', true)::boolean = true
    );

-- Grant admin role
CREATE OR REPLACE FUNCTION set_admin_context()
RETURNS void AS $$
BEGIN
    PERFORM set_config('app.is_admin', 'true', false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Performance Optimization

### Index Requirements

| Index Type | Columns | Purpose |
|------------|---------|---------|
| B-tree | tenant_id | RLS filter |
| B-tree | (tenant_id, id) | Primary lookup |
| B-tree | (tenant_id, created_at) | Time-series queries |

### Query Optimization

```sql
-- Ensure tenant_id is always in WHERE clause
EXPLAIN ANALYZE
SELECT * FROM {{table_name}}
WHERE tenant_id = current_setting('app.tenant_id')::uuid
  AND {{other_conditions}};

-- Verify RLS filter is being applied
EXPLAIN (ANALYZE, VERBOSE)
SELECT * FROM {{table_name}};
```

## Testing

### RLS Verification Tests

| Test ID | Description | Expected Result |
|---------|-------------|-----------------|
| RLS-001 | Query without context | Error or empty |
| RLS-002 | Query with wrong tenant | Empty result |
| RLS-003 | Insert cross-tenant | Violation error |
| RLS-004 | Update cross-tenant | No rows affected |
| RLS-005 | Delete cross-tenant | No rows affected |

### Test Queries

```sql
-- Test 1: Should fail without tenant context
RESET app.tenant_id;
SELECT * FROM {{table_name}};  -- Should return empty or error

-- Test 2: Should return only tenant_a data
SELECT set_tenant_context('tenant_a_uuid');
SELECT count(*) FROM {{table_name}};  -- Should match tenant_a count

-- Test 3: Should not see tenant_b data
SELECT set_tenant_context('tenant_a_uuid');
SELECT * FROM {{table_name}} 
WHERE tenant_id = 'tenant_b_uuid';  -- Should return empty
```

## Migration Strategy

### Adding RLS to Existing Table

```sql
-- Step 1: Add tenant_id column if missing
ALTER TABLE {{table_name}} ADD COLUMN tenant_id UUID;

-- Step 2: Backfill tenant_id (with default if needed)
UPDATE {{table_name}} SET tenant_id = '{{default_tenant_id}}' WHERE tenant_id IS NULL;

-- Step 3: Make tenant_id NOT NULL
ALTER TABLE {{table_name}} ALTER COLUMN tenant_id SET NOT NULL;

-- Step 4: Add index
CREATE INDEX CONCURRENTLY idx_{{table_name}}_tenant_id ON {{table_name}}(tenant_id);

-- Step 5: Enable RLS
ALTER TABLE {{table_name}} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {{table_name}} FORCE ROW LEVEL SECURITY;

-- Step 6: Create policies
CREATE POLICY tenant_isolation ON {{table_name}} ...
```

## Monitoring

### RLS Metrics

| Metric | Query | Alert Threshold |
|--------|-------|-----------------|
| Policy violations | `pg_stat_user_tables` | > 0 |
| Context missing | Application logs | > 0 |
| Query performance | `pg_stat_statements` | P95 > 100ms |

## Verification Checklist

- [ ] All tenant tables have tenant_id column
- [ ] All tenant tables have RLS enabled
- [ ] FORCE ROW LEVEL SECURITY is set
- [ ] All CRUD policies defined
- [ ] tenant_id index exists
- [ ] Context management functions created
- [ ] Connection pool hooks configured
- [ ] Test suite passes
- [ ] Performance validated

## Web Research Queries

- Search: "PostgreSQL RLS multi-tenant best practices {date}"
- Search: "row level security performance optimization {date}"
- Search: "RLS connection pooling patterns {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
