# Tenant - BAM Domain Context

**Loaded by:** ZDT, ZT, YAD  
**Related Workflows:** bmad-bam-tenant-isolation, bmad-bam-tenant-onboarding

---

## Overview

Tenant isolation is the foundation of multi-tenant SaaS. Every data access, cache operation, and agent execution must respect tenant boundaries.

## Core Concepts

### Isolation Matrix (8 Dimensions)

| Dimension | RLS | Schema | Database |
|-----------|-----|--------|----------|
| Data | Row-level | Schema-level | DB-level |
| Compute | Shared | Shared | Dedicated |
| Network | Shared | Shared | VPC |
| Storage | Prefixed | Schemed | Separated |
| Cache | Keyed | Schemed | Dedicated |
| Memory | Scoped | Scoped | Isolated |
| Agents | Scoped | Scoped | Isolated |
| Backups | Tagged | Separate | Separate |

### Tenant Context Propagation

```
Request → Middleware → TenantContext → All Services
                           ↓
              ┌────────────┴────────────┐
              ↓            ↓            ↓
           Database      Cache       Storage
           (RLS)      (Prefixed)   (Pathed)
```

## Decision Matrix

| Tenants | Compliance | Tier | Recommendation |
|---------|------------|------|----------------|
| <1000 | Low | All | RLS |
| <1000 | High | Pro/Enterprise | Schema |
| Any | PCI/HIPAA | Enterprise | Database |
| >10000 | Low | All | RLS + Sharding |

## Quality Checks

- [ ] Tenant ID in all request logs
- [ ] RLS policies on all tenant tables
- [ ] Cache keys include tenant prefix
- [ ] Storage paths include tenant segment
- [ ] **CRITICAL:** No cross-tenant data access possible

## Web Research Queries

- "PostgreSQL RLS multi-tenant {date}"
- "tenant isolation patterns SaaS {date}"

---

## Advanced Isolation Patterns

### Hybrid Isolation (RLS + Schema)

For sensitive data requiring extra isolation within RLS tenants:

```
Tenant Database (RLS)
├── public schema (shared tables, RLS policies)
│   ├── users (tenant_id column, RLS)
│   ├── settings (tenant_id column, RLS)
│   └── audit_logs (tenant_id column, RLS)
│
└── tenant_{id} schema (sensitive data)
    ├── financial_records (no RLS needed)
    ├── medical_data (no RLS needed)
    └── encryption_keys (no RLS needed)
```

### Tenant Hierarchy Models

| Model | Structure | Use Case |
|-------|-----------|----------|
| Flat | Tenant → Users | Standard SaaS |
| Parent-Child | Org → Departments | Enterprise |
| Reseller | Partner → Tenants | White-label |
| Enterprise | Corp → BUs → Teams | Large enterprise |

```yaml
tenant_hierarchy:
  type: enum[flat, parent_child, reseller, enterprise]
  
  parent_child:
    parent_tenant_id: uuid
    child_tenants: uuid[]
    shared_resources: string[]
    isolation_override: bool
    
  reseller:
    reseller_id: uuid
    branding: object
    billing_relationship: enum[direct, through_reseller]
    support_tier: enum[reseller, platform]
```

### Resource Quotas by Tier

Reference: `{project-root}/_bmad/bam/data/patterns/tenant-quotas.md`

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| API calls/day | 10,000 | 100,000 | Unlimited |
| Storage GB | 5 | 50 | 500+ |
| Users | 5 | 50 | Unlimited |
| Agent executions/day | 100 | 1,000 | 10,000+ |
| Token budget/day | 50K | 500K | 5M+ |

---

## Tenant Lifecycle Events

### Provisioning Sequence

```
Step 1              Step 2              Step 3
Create Record       Setup Storage       Seed Data
     │                   │                  │
     ▼                   ▼                  ▼
┌──────────┐       ┌──────────┐       ┌──────────┐
│ Tenant   │──────▶│ Schema/  │──────▶│ Default  │
│ Record   │       │ Namespace│       │ Config   │
└──────────┘       └──────────┘       └──────────┘
     │                   │                  │
     ▼                   ▼                  ▼
  tenant_id          storage_path       seed_complete
  created            provisioned        flag set

Step 4              Step 5
Integrations        Welcome
     │                  │
     ▼                  ▼
┌──────────┐       ┌──────────┐
│ Webhooks │──────▶│ Welcome  │
│ + APIs   │       │ Email    │
└──────────┘       └──────────┘
     │                  │
     ▼                  ▼
  integrations_     onboarding_
  configured        complete
```

### Suspension Flow

| Stage | Access Level | Duration | Reactivation |
|-------|--------------|----------|--------------|
| Grace period | Full (warning shown) | 7 days | Auto on payment |
| Limited access | Read-only | 14 days | Payment + review |
| Suspended | Admin-only | 30 days | Payment + contact |
| Pre-termination | Export only | 14 days | Contact required |

```yaml
suspension:
  reason: enum[non_payment, tos_violation, security, requested]
  suspended_at: timestamp
  grace_period_ends: timestamp
  access_level: enum[full, limited, admin_only, export_only]
  reactivation_requirements: string[]
```

### Termination Flow

```
Request           Export Window       Backup Retention     Hard Delete
   │                   │                    │                   │
   ▼                   ▼                    ▼                   ▼
┌──────────┐     ┌──────────┐        ┌──────────┐        ┌──────────┐
│ Request  │────▶│ 30-day   │───────▶│ 90-day   │───────▶│ Purge    │
│ Received │     │ Export   │        │ Backup   │        │ All Data │
└──────────┘     └──────────┘        └──────────┘        └──────────┘
                      │                    │
                      ▼                    ▼
                 User can export     Admin can restore
                 all data            if requested
```

---

## Cross-Tenant Operations

### Admin Access Patterns

| Role | Access Scope | Audit Level | Approval |
|------|--------------|-------------|----------|
| Super-admin | All tenants | Full audit | MFA + reason |
| Support | Assigned tenants | Full audit | Ticket required |
| Tenant-admin | Own tenant | Standard | Self |
| Impersonation | Single session | Full audit | Tenant consent |

### Data Migration Scenarios

**Tenant-to-Tenant Copy**
```yaml
migration:
  type: tenant_copy
  source_tenant: uuid
  target_tenant: uuid
  data_categories: string[]
  transform_rules:
    - field: "user_id"
      action: "regenerate"
    - field: "created_at"
      action: "preserve"
```

**Tenant Merge**
```yaml
migration:
  type: merge
  source_tenants: uuid[]
  target_tenant: uuid
  conflict_resolution: enum[source_wins, target_wins, manual]
  post_merge_action: enum[archive_source, delete_source]
```

**Tenant Split**
```yaml
migration:
  type: split
  source_tenant: uuid
  split_criteria:
    - field: "department"
      values: ["sales", "engineering"]
  target_tenants:
    - criteria: "department = sales"
      new_tenant_name: "Acme Sales"
    - criteria: "department = engineering"
      new_tenant_name: "Acme Engineering"
```

### Tenant Impersonation

```yaml
impersonation:
  impersonator_id: uuid
  target_tenant_id: uuid
  session_id: uuid
  started_at: timestamp
  expires_at: timestamp
  reason: string
  consent_token: string  # Signed by tenant admin
  audit_trail: bool  # Always true
```

All actions during impersonation:
- Logged with impersonator context
- Tagged in audit trail
- Tenant notified post-session

---

## Quality Checks (Enhanced)

- [ ] Tenant provisioning <30 seconds
- [ ] Suspension flow graceful with user communication
- [ ] Termination data export works correctly
- [ ] Admin access fully audited
- [ ] **CRITICAL:** Cross-tenant data migration validated
