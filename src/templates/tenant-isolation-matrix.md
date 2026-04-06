# Tenant Isolation Matrix

## Overview

**Isolation Level:** Row-Level Security (RLS)
**Tenant Identifier:** UUID from JWT `tenant_id` claim
**Context Propagation:** PostgreSQL session variable

## Asset Isolation

| Asset Type            | Strategy            | Implementation                | Verified |
| --------------------- | ------------------- | ----------------------------- | -------- |
| Database (PostgreSQL) | RLS                 | `tenant_id` column + policy   | [ ]      |
| Cache (Redis)         | Key prefix          | `{{TENANT_ID}}::{{KEY}}`      | [ ]      |
| Vectors (Qdrant)      | Filter injection    | `tenant_id` payload filter    | [ ]      |
| Logs                  | Field injection     | Structured log with tenant_id | [ ]      |
| Memory (Session)      | Conversation scope  | Per-conversation isolation    | [ ]      |
| Memory (User)         | User+tenant scope   | `user_id + tenant_id` key     | [ ]      |
| Memory (Tenant)       | Tenant scope        | `tenant_id` key               | [ ]      |
| Background Jobs       | Context propagation | Tenant ID in job payload      | [ ]      |
| Analytics             | Partition           | ClickHouse tenant column      | [ ]      |
| File Storage          | Path prefix         | `/{{TENANT_ID}}/` path        | [ ]      |

## RLS Policy Template

```sql
CREATE POLICY tenant_isolation ON {{TABLE_NAME}}
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
