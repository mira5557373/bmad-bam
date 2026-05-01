---
pattern_id: tenant-isolation
shortcode: ZTI
category: tenant-isolation
qg_ref: QG-M2
version: 1.0.0
last_reviewed: 2026-04-29
---

# Tenant Isolation Patterns - BAM Pattern

**Loaded by:** ZTI
**Category:** tenant-isolation
**Quality Gate:** QG-M2

---

## When to Use

- Building multi-tenant SaaS application
- Data segregation is required between customers
- Compliance mandates data boundaries
- Multiple organizations share the same application instance
- Need different data retention policies per tenant

## When NOT to Use

- Single-tenant deployments
- Internal tools with unified access model
- When all users belong to same organization
- Prototypes without data separation needs

## Decision Framework

**Choose isolation level based on:**
- Tenant count (<1000 → RLS, 100-500 → Schema, <100 → Database)
- Compliance requirements (Medium → RLS, High → Schema, Highest → Database)
- Cost constraints (Low → RLS, Medium → Schema, High → Database)

## Architectural Principle

Tenant isolation follows **defense in depth** - multiple layers ensure that even if one layer fails, tenant data remains protected:

```
┌─────────────────────────────────────────────────────────────┐
│                    Isolation Layers                          │
├─────────────────────────────────────────────────────────────┤
│  Application: TenantContext validation (ALWAYS)              │
│  ─────────────────────────────────────────────────────────  │
│  Database: RLS / Schema / Database (CHOOSE ONE)              │
│  ─────────────────────────────────────────────────────────  │
│  Infrastructure: Network segmentation (OPTIONAL)             │
└─────────────────────────────────────────────────────────────┘
```

## Decision Matrix

| Factor | RLS | Schema-per-Tenant | Database-per-Tenant |
|--------|-----|-------------------|---------------------|
| Tenant count | <1000 | 100-500 | <100 |
| Cost | Low | Medium | High |
| Isolation level | Logical | Schema | Physical |
| Compliance fit | Medium | High | Highest |
| Schema customization | None | Per-tenant | Full |
| Backup granularity | All tenants | Per-schema | Per-tenant |
| Cross-tenant risk | Policy failure | Schema escape | Minimal |
| Query complexity | tenant_id filter | Schema routing | Connection routing |

## BAM Schema Contracts

### TenantContext Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
tenant_context:
  version: "1.0.0"
  bam_controlled: true
  
  interface:
    required:
      tenant_id: uuid
      tier: enum[free, pro, enterprise]
    optional:
      region: string
      isolation_model: enum[rls, schema, database]
  
  propagation:
    methods: [request_header, jwt_claim, session]
    header_name: "X-Tenant-ID"
    jwt_claim: "tenant_id"
```

### RLS Policy Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
rls_policy_contract:
  version: "1.0.0"
  bam_controlled: true
  
  naming: "{table}_tenant_isolation"
  required_clauses:
    using: "tenant_id = current_tenant_id()"
    check: "tenant_id = current_tenant_id()"
  tier_awareness:
    enabled: bool
    tier_column: "tenant_tier"
```

### Schema Isolation Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
schema_isolation_contract:
  version: "1.0.0"
  bam_controlled: true
  
  naming: "tenant_{tenant_id}"
  search_path: required
  migration_strategy: enum[parallel, sequential, blue_green]
```

### Database Isolation Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
database_isolation_contract:
  version: "1.0.0"
  bam_controlled: true
  
  naming: "db_{tenant_id}"
  connection_routing: required
  credential_management: vault_required
```

## Architecture Diagrams

### Row-Level Security Model

```
┌─────────────────────────────────────────┐
│           Shared Database               │
│  ┌───────────────────────────────────┐  │
│  │         Shared Tables             │  │
│  │  ┌─────────┬─────────┬─────────┐  │  │
│  │  │Tenant A │Tenant B │Tenant C │  │  │
│  │  │ (rows)  │ (rows)  │ (rows)  │  │  │
│  │  └─────────┴─────────┴─────────┘  │  │
│  │     Policy: tenant_id = ctx       │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Schema-per-Tenant Model

```
┌─────────────────────────────────────────┐
│           Shared Database               │
│  ┌───────────┐ ┌───────────┐ ┌────────┐│
│  │ tenant_a  │ │ tenant_b  │ │tenant_c││
│  │  schema   │ │  schema   │ │ schema ││
│  │ (tables)  │ │ (tables)  │ │(tables)││
│  └───────────┘ └───────────┘ └────────┘│
└─────────────────────────────────────────┘
```

### Database-per-Tenant Model

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ db_a     │  │ db_b     │  │ db_c     │
│ Tenant A │  │ Tenant B │  │ Tenant C │
└──────────┘  └──────────┘  └──────────┘
       │             │             │
       └─────────────┴─────────────┘
              Connection Router
```


## Quality Checks

- [ ] RLS policies cover all tables
- [ ] Tenant context validated on every request
- [ ] Cross-tenant queries blocked at DB level
- [ ] Isolation model documented
- [ ] **CRITICAL:** No data leakage between tenants

## Web Research (Implementation)

> **CRITICAL:** This file contains NO implementation code.
> Use web search for current implementation patterns.

**RLS Implementation:**
- Search: "PostgreSQL row level security implementation {date}"
- Search: "PostgreSQL RLS performance tuning {date}"
- Search: "RLS policy testing patterns {date}"

**Schema Isolation Implementation:**
- Search: "PostgreSQL schema per tenant implementation {date}"
- Search: "dynamic schema routing middleware {date}"
- Search: "schema migration multi-tenant {date}"

**Database Isolation Implementation:**
- Search: "database per tenant connection pooling {date}"
- Search: "multi-database tenant routing patterns {date}"
- Search: "tenant database provisioning automation {date}"

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M2 | Isolation model correctly implemented |
| QG-I2 | Cross-tenant access prevented in testing |

## Related Patterns

- [zero-trust.md](zero-trust.md) - Security boundaries
- [state-management.md](state-management.md) - Tenant-scoped state
- [secrets-management.md](secrets-management.md) - Tenant credentials

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-29 | Consolidated from rls.md, schema-per-tenant.md, database-per-tenant.md |
