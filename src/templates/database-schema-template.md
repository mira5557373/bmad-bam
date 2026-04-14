---
name: database-schema-template
description: Document database schema including tables, indexes, foreign keys, and RLS policies for multi-tenant systems
category: architecture
version: 1.0.0
type: template
priority: HIGH
---

# Database Schema - {{project_name}}

## Purpose

Use this template to document the complete database schema including table definitions, indexes, foreign key relationships, row-level security policies, and migration history. This artifact ensures consistent database design and proper multi-tenant isolation at the data layer.

## Document Control

| Field | Value |
|-------|-------|
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | DRAFT / APPROVED / FINAL |

---

## Schema Overview

**Project:** {{project_name}}
**Database Type:** {{database_type}}
**Database Version:** {{database_version}}
**Schema Name:** {{schema_name}}
**Tenant Model:** {{tenant_model}}

### Database Configuration

```yaml
database:
  type: {{database_type}}
  version: {{database_version}}
  schema: {{schema_name}}
  charset: UTF8
  collation: {{collation}}
  timezone: UTC
  
connection_pool:
  min_connections: {{min_connections}}
  max_connections: {{max_connections}}
  idle_timeout: {{idle_timeout}}
  
multi_tenant:
  model: {{tenant_model}}
  tenant_column: {{tenant_column}}
  rls_enabled: {{rls_enabled}}
```

### Schema Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        {{schema_name}} Schema                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────┐       ┌─────────────────┐                      │
│  │    tenants      │       │     users       │                      │
│  ├─────────────────┤       ├─────────────────┤                      │
│  │ id (PK)         │◄──────│ tenant_id (FK)  │                      │
│  │ name            │       │ id (PK)         │                      │
│  │ tier            │       │ email           │                      │
│  │ config (JSONB)  │       │ role            │                      │
│  └─────────────────┘       └─────────────────┘                      │
│          │                         │                                 │
│          │ 1:N                     │ 1:N                             │
│          ▼                         ▼                                 │
│  ┌─────────────────┐       ┌─────────────────┐                      │
│  │  {{table_1}}    │       │  {{table_2}}    │                      │
│  ├─────────────────┤       ├─────────────────┤                      │
│  │ tenant_id (FK)  │       │ tenant_id (FK)  │                      │
│  │ id (PK)         │       │ id (PK)         │                      │
│  │ ...             │       │ ...             │                      │
│  └─────────────────┘       └─────────────────┘                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tables

### Table: tenants

**Description:** Control plane table for tenant metadata (not tenant-scoped)
**Plane:** Control Plane
**RLS:** Disabled (admin access only)

```sql
CREATE TABLE {{schema_name}}.tenants (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    slug            VARCHAR(100) NOT NULL UNIQUE,
    tier            VARCHAR(50) NOT NULL DEFAULT 'free',
    status          VARCHAR(50) NOT NULL DEFAULT 'active',
    config          JSONB DEFAULT '{}',
    limits          JSONB DEFAULT '{}',
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT chk_tenant_tier CHECK (tier IN ('free', 'pro', 'enterprise')),
    CONSTRAINT chk_tenant_status CHECK (status IN ('active', 'suspended', 'deleted'))
);

COMMENT ON TABLE {{schema_name}}.tenants IS 'Control plane tenant registry';
COMMENT ON COLUMN {{schema_name}}.tenants.config IS 'Tenant-specific configuration (features, branding)';
COMMENT ON COLUMN {{schema_name}}.tenants.limits IS 'Usage limits based on tier';
```

---

### Table: {{table_name}}

**Description:** {{table_description}}
**Plane:** Tenant Plane
**RLS:** Enabled
**Tenant Column:** {{tenant_column}}

```sql
CREATE TABLE {{schema_name}}.{{table_name}} (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    {{tenant_column}} UUID NOT NULL REFERENCES {{schema_name}}.tenants(id),
    {{column_1}}    {{type_1}} {{constraints_1}},
    {{column_2}}    {{type_2}} {{constraints_2}},
    {{column_3}}    {{type_3}} {{constraints_3}},
    {{column_4}}    {{type_4}} {{constraints_4}},
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_by      UUID,
    updated_by      UUID
);

COMMENT ON TABLE {{schema_name}}.{{table_name}} IS '{{table_description}}';
COMMENT ON COLUMN {{schema_name}}.{{table_name}}.{{tenant_column}} IS 'Tenant identifier for row-level isolation';
```

---

### Table: {{table_name_2}}

**Description:** {{table_description_2}}
**Plane:** Tenant Plane
**RLS:** Enabled
**Tenant Column:** {{tenant_column}}

```sql
CREATE TABLE {{schema_name}}.{{table_name_2}} (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    {{tenant_column}} UUID NOT NULL REFERENCES {{schema_name}}.tenants(id),
    {{parent_table}}_id UUID NOT NULL REFERENCES {{schema_name}}.{{parent_table}}(id),
    {{column_1}}    {{type_1}} {{constraints_1}},
    {{column_2}}    {{type_2}} {{constraints_2}},
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE {{schema_name}}.{{table_name_2}} IS '{{table_description_2}}';
```

---

### Table: {{table_name_3}}

**Description:** {{table_description_3}}
**Plane:** Tenant Plane
**RLS:** Enabled

```sql
CREATE TABLE {{schema_name}}.{{table_name_3}} (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    {{tenant_column}} UUID NOT NULL REFERENCES {{schema_name}}.tenants(id),
    {{column_1}}    {{type_1}} {{constraints_1}},
    {{column_2}}    {{type_2}} {{constraints_2}},
    {{column_3}}    {{type_3}} {{constraints_3}},
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

---

### Table: audit_logs

**Description:** Immutable audit trail for tenant operations
**Plane:** Tenant Plane
**RLS:** Enabled (read-only for tenants)

```sql
CREATE TABLE {{schema_name}}.audit_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    {{tenant_column}} UUID NOT NULL REFERENCES {{schema_name}}.tenants(id),
    user_id         UUID,
    action          VARCHAR(100) NOT NULL,
    entity_type     VARCHAR(100) NOT NULL,
    entity_id       UUID,
    old_values      JSONB,
    new_values      JSONB,
    ip_address      INET,
    user_agent      TEXT,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE {{schema_name}}.audit_logs IS 'Immutable audit trail for compliance';
```

---

## Indexes

### Performance Indexes

| Table | Index Name | Columns | Type | Purpose |
|-------|------------|---------|------|---------|
| {{table_1}} | idx_{{table_1}}_tenant | ({{tenant_column}}) | BTREE | Tenant isolation queries |
| {{table_1}} | idx_{{table_1}}_tenant_created | ({{tenant_column}}, created_at DESC) | BTREE | Tenant timeline queries |
| {{table_1}} | idx_{{table_1}}_{{column}} | ({{column}}) | BTREE | {{query_purpose}} |
| {{table_2}} | idx_{{table_2}}_tenant | ({{tenant_column}}) | BTREE | Tenant isolation queries |
| {{table_2}} | idx_{{table_2}}_parent | ({{parent_table}}_id) | BTREE | Foreign key lookups |
| audit_logs | idx_audit_tenant_created | ({{tenant_column}}, created_at DESC) | BTREE | Audit trail queries |

### Index Definitions

```sql
-- Tenant isolation index (required for RLS performance)
CREATE INDEX idx_{{table_1}}_tenant 
    ON {{schema_name}}.{{table_1}} ({{tenant_column}});

-- Composite index for tenant-scoped queries
CREATE INDEX idx_{{table_1}}_tenant_created 
    ON {{schema_name}}.{{table_1}} ({{tenant_column}}, created_at DESC);

-- Business query index
CREATE INDEX idx_{{table_1}}_{{column}} 
    ON {{schema_name}}.{{table_1}} ({{column}}) 
    WHERE deleted_at IS NULL;

-- Partial index for active records
CREATE INDEX idx_{{table_1}}_active 
    ON {{schema_name}}.{{table_1}} ({{tenant_column}}, status) 
    WHERE status = 'active';

-- GIN index for JSONB queries
CREATE INDEX idx_{{table_1}}_metadata 
    ON {{schema_name}}.{{table_1}} USING GIN (metadata);
```

---

## Foreign Keys

### Foreign Key Definitions

| Table | Constraint | References | On Delete | On Update |
|-------|------------|------------|-----------|-----------|
| {{table_1}} | fk_{{table_1}}_tenant | tenants(id) | RESTRICT | CASCADE |
| {{table_2}} | fk_{{table_2}}_tenant | tenants(id) | RESTRICT | CASCADE |
| {{table_2}} | fk_{{table_2}}_parent | {{table_1}}(id) | CASCADE | CASCADE |
| audit_logs | fk_audit_tenant | tenants(id) | RESTRICT | CASCADE |

### Foreign Key SQL

```sql
-- Tenant foreign keys (RESTRICT to prevent orphaned tenant data)
ALTER TABLE {{schema_name}}.{{table_1}}
    ADD CONSTRAINT fk_{{table_1}}_tenant
    FOREIGN KEY ({{tenant_column}}) REFERENCES {{schema_name}}.tenants(id)
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- Parent-child foreign keys (CASCADE for aggregate deletion)
ALTER TABLE {{schema_name}}.{{table_2}}
    ADD CONSTRAINT fk_{{table_2}}_parent
    FOREIGN KEY ({{parent_table}}_id) REFERENCES {{schema_name}}.{{table_1}}(id)
    ON DELETE CASCADE ON UPDATE CASCADE;
```

---

## RLS Policies

### Policy Overview

| Table | Policy Name | Operation | Description |
|-------|-------------|-----------|-------------|
| {{table_1}} | tenant_isolation_select | SELECT | Read own tenant data only |
| {{table_1}} | tenant_isolation_insert | INSERT | Insert to own tenant only |
| {{table_1}} | tenant_isolation_update | UPDATE | Update own tenant data only |
| {{table_1}} | tenant_isolation_delete | DELETE | Delete own tenant data only |
| audit_logs | tenant_audit_read | SELECT | Read own audit logs |

### Enable RLS

```sql
-- Enable RLS on all tenant-scoped tables
ALTER TABLE {{schema_name}}.{{table_1}} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {{schema_name}}.{{table_2}} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {{schema_name}}.{{table_3}} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {{schema_name}}.audit_logs ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owners (prevents bypass)
ALTER TABLE {{schema_name}}.{{table_1}} FORCE ROW LEVEL SECURITY;
ALTER TABLE {{schema_name}}.{{table_2}} FORCE ROW LEVEL SECURITY;
```

### Policy Definitions

```sql
-- SELECT policy: Read only tenant's own data
CREATE POLICY tenant_isolation_select ON {{schema_name}}.{{table_1}}
    FOR SELECT
    USING ({{tenant_column}} = current_setting('app.tenant_id')::UUID);

-- INSERT policy: Insert only to tenant's own data
CREATE POLICY tenant_isolation_insert ON {{schema_name}}.{{table_1}}
    FOR INSERT
    WITH CHECK ({{tenant_column}} = current_setting('app.tenant_id')::UUID);

-- UPDATE policy: Update only tenant's own data
CREATE POLICY tenant_isolation_update ON {{schema_name}}.{{table_1}}
    FOR UPDATE
    USING ({{tenant_column}} = current_setting('app.tenant_id')::UUID)
    WITH CHECK ({{tenant_column}} = current_setting('app.tenant_id')::UUID);

-- DELETE policy: Delete only tenant's own data
CREATE POLICY tenant_isolation_delete ON {{schema_name}}.{{table_1}}
    FOR DELETE
    USING ({{tenant_column}} = current_setting('app.tenant_id')::UUID);

-- Audit logs: Read-only for tenants
CREATE POLICY tenant_audit_read ON {{schema_name}}.audit_logs
    FOR SELECT
    USING ({{tenant_column}} = current_setting('app.tenant_id')::UUID);
```

### Admin Bypass Policy

```sql
-- Admin role bypasses RLS for control plane operations
CREATE POLICY admin_bypass ON {{schema_name}}.{{table_1}}
    FOR ALL
    TO admin_role
    USING (true)
    WITH CHECK (true);
```

### Setting Tenant Context

```sql
-- Application must set tenant context before queries
-- Called by repository layer after authentication

CREATE OR REPLACE FUNCTION {{schema_name}}.set_tenant_context(p_tenant_id UUID)
RETURNS VOID AS $$
BEGIN
    PERFORM set_config('app.tenant_id', p_tenant_id::TEXT, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Clear tenant context (for connection pool return)
CREATE OR REPLACE FUNCTION {{schema_name}}.clear_tenant_context()
RETURNS VOID AS $$
BEGIN
    PERFORM set_config('app.tenant_id', '', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Migrations

### Migration History

| Version | Name | Applied | Checksum |
|---------|------|---------|----------|
| {{version_1}} | {{migration_name_1}} | {{date_1}} | {{checksum_1}} |
| {{version_2}} | {{migration_name_2}} | {{date_2}} | {{checksum_2}} |
| {{version_3}} | {{migration_name_3}} | {{date_3}} | {{checksum_3}} |

### Migration Tracking Table

```sql
CREATE TABLE {{schema_name}}.schema_migrations (
    version         VARCHAR(255) PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    applied_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    checksum        VARCHAR(64) NOT NULL,
    execution_time  INTEGER NOT NULL,
    applied_by      VARCHAR(255)
);
```

### Migration Guidelines

| Rule | Requirement |
|------|-------------|
| Forward Only | No down migrations in production |
| Backward Compatible | New schema must work with old code during rollout |
| Tenant Safe | Migrations must not break tenant isolation |
| Idempotent | Safe to run multiple times |
| Transaction | Wrap DDL in transactions where supported |

### Sample Migration

```sql
-- Migration: {{version}}_{{migration_name}}.sql
-- Description: {{migration_description}}
-- Author: {{author}}
-- Date: {{date}}

BEGIN;

-- Add new column (backward compatible)
ALTER TABLE {{schema_name}}.{{table_name}}
    ADD COLUMN IF NOT EXISTS {{new_column}} {{type}} {{constraints}};

-- Update RLS policy if needed
DROP POLICY IF EXISTS tenant_isolation_select ON {{schema_name}}.{{table_name}};
CREATE POLICY tenant_isolation_select ON {{schema_name}}.{{table_name}}
    FOR SELECT
    USING ({{tenant_column}} = current_setting('app.tenant_id')::UUID);

-- Record migration
INSERT INTO {{schema_name}}.schema_migrations (version, name, checksum, execution_time)
VALUES ('{{version}}', '{{migration_name}}', '{{checksum}}', 0);

COMMIT;
```

---

## Multi-Tenant Schema

### Isolation Approach: {{tenant_model}}

| Aspect | Implementation |
|--------|----------------|
| Data Separation | {{data_separation}} |
| Query Isolation | RLS policies with tenant context |
| Connection Handling | Pool with tenant context injection |
| Schema Evolution | Single schema, all tenants |
| Backup Strategy | Full database with tenant filtering |

### Tenant Context Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      Request Flow                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. HTTP Request arrives with JWT                                │
│     │                                                            │
│     ▼                                                            │
│  2. Auth Middleware extracts tenant_id from JWT                  │
│     │                                                            │
│     ▼                                                            │
│  3. Repository.setTenantContext(tenant_id)                       │
│     │                                                            │
│     ▼                                                            │
│  4. SET app.tenant_id = '{tenant_id}'                            │
│     │                                                            │
│     ▼                                                            │
│  5. SQL Query executes (RLS filters automatically)               │
│     │                                                            │
│     ▼                                                            │
│  6. Results returned (only tenant's data)                        │
│     │                                                            │
│     ▼                                                            │
│  7. Connection returned to pool (context cleared)                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Tier-Based Limits

```sql
-- View for tenant limits based on tier
CREATE VIEW {{schema_name}}.tenant_limits AS
SELECT 
    t.id,
    t.name,
    t.tier,
    CASE t.tier
        WHEN 'free' THEN 100
        WHEN 'pro' THEN 10000
        WHEN 'enterprise' THEN -1  -- unlimited
    END AS max_records,
    CASE t.tier
        WHEN 'free' THEN 1
        WHEN 'pro' THEN 5
        WHEN 'enterprise' THEN -1
    END AS max_api_calls_per_minute
FROM {{schema_name}}.tenants t
WHERE t.status = 'active';
```

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Database Administrator | {{name}} | {{date}} | Pending |
| Platform Architect | {{name}} | {{date}} | Pending |
| Security Engineer | {{name}} | {{date}} | Pending |

---

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "database schema design best practices {date}"
- "PostgreSQL RLS multi-tenant patterns {date}"
- "multi-tenant database isolation enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] All tenant-plane tables include tenant_id column with NOT NULL constraint
- [ ] Foreign key to tenants table is defined with ON DELETE RESTRICT
- [ ] RLS is enabled and forced on all tenant-scoped tables
- [ ] RLS policies cover SELECT, INSERT, UPDATE, and DELETE operations
- [ ] Tenant context setting function (set_tenant_context) is implemented
- [ ] Connection pool clears tenant context on connection return
- [ ] Indexes include tenant_id for RLS query performance
- [ ] Audit log table captures tenant_id for all operations
- [ ] Migration tracking table is configured with checksum verification
- [ ] Tier-based limits view is implemented for resource constraints
- [ ] Admin bypass policy is restricted to admin_role only
- [ ] Schema diagram accurately reflects all tables and relationships

---

## Related Documents

- Data Model: `{output_folder}/planning-artifacts/data-model.md`
- Master Architecture: `{output_folder}/planning-artifacts/master-architecture.md`
- RLS Best Practices: `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: rls-best-practices.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: multi-tenant-patterns.md`
- QG-M2 Checklist: `{project-root}/_bmad/bam/checklists/tenant-isolation.md`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
