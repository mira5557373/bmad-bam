---
name: qg-m2-tenant-isolation
description: Tenant isolation validation - RLS policies, context propagation, cross-tenant prevention
module: bam
tags: [tenant, quality-gate, multi-tenant, isolation, rls]
---

# QG-M2: Tenant Isolation Gate

**Workflow:** bmad-bam-tenant-model-isolation  
**Prerequisites:** QG-M1 (Module Architecture)

## Purpose

Validates that tenant isolation is properly implemented at all layers of the application stack. This gate verifies RLS policies are in place, tenant context propagates correctly through all service calls, and cross-tenant data access is impossible. Critical for multi-tenant security and compliance.

---

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** RLS policies on all tenant tables
- [ ] **CRITICAL:** Tenant context propagation verified
- [ ] **CRITICAL:** No cross-tenant data access possible
- [ ] **CRITICAL:** Cache keys include tenant prefix

## Standard Checks

- [ ] Storage paths include tenant segment
- [ ] Tenant ID in all request logs
- [ ] Backup strategy includes tenant isolation
- [ ] Tenant deletion process documented
- [ ] Data export scoped to tenant
- [ ] Tenant quota enforcement in place

## Recovery Protocol

On FAIL: Fix issues, re-run validation. Max 3 attempts before mandatory escalation.

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan |
| FAIL | Any critical fails |
