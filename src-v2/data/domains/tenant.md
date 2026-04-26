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
