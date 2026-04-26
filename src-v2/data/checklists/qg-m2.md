# QG-M2: Tenant Isolation Gate

**Workflow:** bmad-bam-tenant-model-isolation  
**Prerequisites:** QG-M1 (Module Architecture)

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
