# Step 2: Tenant Model Decisions

## Purpose
Establish the foundational tenant model that governs data isolation, context propagation, and lifecycle management across all modules.

## Actions

- Select isolation strategy:
  - Row-Level Security (RLS): single database, tenant_id filtering
  - Schema-per-tenant: logical isolation within single database
  - Database-per-tenant: full physical isolation (enterprise tier)
  - Document trade-offs and tier mapping

- Define TenantContext structure:
  - Required fields: tenant_id, tenant_slug, tier, status
  - Optional fields: settings, feature_flags, quotas
  - Propagation mechanism (async context, request headers)
  - Validation rules for context integrity

- Document lifecycle states:
  - Provisioning: initial setup, resource allocation
  - Active: normal operation
  - Suspended: temporary access restriction
  - Archived: read-only, reduced storage
  - Deleted: data purge, resource cleanup

- Create isolation matrix:
  - Classify each asset type: data, cache, logs, memory, tools, jobs, vectors, analytics
  - Specify isolation level per asset (shared, pooled, dedicated)
  - Document cross-tenant access rules (never, admin-only, explicit-share)

## Outputs
- Tenant model ADR with isolation strategy selection
- TenantContext interface definition
- Lifecycle state machine diagram
- Isolation matrix spreadsheet

## Questions to Consider
- How do you handle tenant migrations between isolation levels?
- What is the data retention policy per lifecycle state?
- How are shared resources (e.g., base models) managed?
