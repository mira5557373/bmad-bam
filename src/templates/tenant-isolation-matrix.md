---
name: Tenant Isolation Matrix
description: Template for documenting tenant isolation strategies per asset type
category: tenant
version: 1.0.0
type: "tenant"
web_research_enabled: true
source_verification: true
---

## Purpose

Template for documenting tenant isolation strategies per asset type

# Tenant Isolation Matrix

## Overview

**Isolation Level:** Row-Level Security (RLS)
**Tenant Identifier:** UUID from JWT `tenant_id` claim
**Context Propagation:** PostgreSQL session variable

## Asset Isolation

| Asset Type            | Strategy            | Implementation                | Verified |
| --------------------- | ------------------- | ----------------------------- | -------- |
| Database (PostgreSQL) | RLS                 | `tenant_id` column + policy   | [ ]      |
| Cache (Redis)         | Key prefix          | `{{tenant_id}}::{{key}}`      | [ ]      |
| Vectors (Qdrant)      | Filter injection    | `tenant_id` payload filter    | [ ]      |
| Logs                  | Field injection     | Structured log with tenant_id | [ ]      |
| Memory (Session)      | Conversation scope  | Per-conversation isolation    | [ ]      |
| Memory (User)         | User+tenant scope   | `user_id + tenant_id` key     | [ ]      |
| Memory (Tenant)       | Tenant scope        | `tenant_id` key               | [ ]      |
| Background Jobs       | Context propagation | Tenant ID in job payload      | [ ]      |
| Analytics             | Partition           | ClickHouse tenant column      | [ ]      |
| File Storage          | Path prefix         | `/{{tenant_id}}/` path        | [ ]      |

## RLS Policy Template

```sql
CREATE POLICY tenant_isolation ON {{table_name}}
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::uuid)
    WITH CHECK (tenant_id = current_setting('app.current_tenant')::uuid);
```

## Cross-Tenant Access Rules

| Scenario                    | Allowed | Controls                                 |
| --------------------------- | ------- | ---------------------------------------- |
| Admin viewing tenant data   | Yes     | Audit logged, admin role required        |
| Tenant viewing other tenant | No      | RLS enforced                             |
| Support viewing tenant      | Yes     | Audit logged, support role, time-limited |

## Shared Resources (No Tenant Isolation)

| Resource         | Reason                |
| ---------------- | --------------------- |
| Countries        | Reference data        |
| Currencies       | Reference data        |
| Plan definitions | Shared across tenants |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant isolation matrix SaaS patterns {date}"
- "row-level security multi-tenant best practices {date}"
- "cross-tenant access control enterprise SaaS {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] Isolation level selected and documented (RLS, schema-per-tenant, database-per-tenant)
- [ ] Tenant identifier source and propagation mechanism defined
- [ ] All asset types covered in isolation matrix (database, cache, vectors, logs, memory, jobs, analytics, files)
- [ ] RLS policy template verified and tested
- [ ] Cross-tenant access rules documented with audit controls
- [ ] Admin and support access properly constrained and logged
- [ ] Shared resources (reference data) explicitly listed
- [ ] Multi-tenant isolation verified for all asset types
- [ ] Context propagation tested end-to-end (JWT to database session)
- [ ] Cache key prefixing strategy validated
- [ ] Vector store filter injection tested
- [ ] Background job tenant context propagation verified

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
