---
name: qg-i2-tenant-safety
description: Integration tenant safety - cross-module isolation, tenant context verification, audit trail
module: bam
tags: [integration, quality-gate, multi-tenant, tenant-safety, tea]
---

# QG-I2: Tenant Safety Gate

**Workflow:** bmad-bam-convergence-verification  
**Prerequisites:** QG-I1 (Convergence)

## Purpose

Verifies that tenant isolation holds across module boundaries during integration. Tests for cross-tenant data leakage in database, cache, vector store, and memory layers. Validates audit trail completeness for compliance. This gate is owned by TEA and must pass before release candidate approval.

---

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** Cross-tenant access tests all pass
- [ ] **CRITICAL:** Data isolation verified end-to-end
- [ ] **CRITICAL:** Cache isolation verified
- [ ] **CRITICAL:** Storage isolation verified

## Standard Checks

- [ ] Tenant deletion tested
- [ ] Tenant migration tested
- [ ] Quota enforcement verified
- [ ] Audit logging complete
- [ ] Tenant export functional
- [ ] Isolation monitoring in place

## Recovery Protocol

On FAIL: Fix issues, re-run validation. Max 3 attempts before mandatory escalation.

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan |
| FAIL | Any critical fails |
