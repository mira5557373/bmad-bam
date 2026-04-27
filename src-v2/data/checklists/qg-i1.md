---
name: qg-i1-convergence
description: Cross-module convergence validation - facade compatibility, event schemas, integration tests
module: bam
tags: [integration, quality-gate, multi-tenant, convergence, facade]
---

# QG-I1: Convergence Gate

**Workflow:** bmad-bam-convergence-verification  
**Prerequisites:** QG-M1, QG-M2, QG-M3

## Purpose

Ensures all module facades are compatible and stable, event schemas align across module boundaries, and integration tests pass comprehensively. This gate must pass before proceeding to tenant safety (QG-I2) and agent safety (QG-I3) verification. Prevents integration failures from reaching production.

---

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** All module facades implemented
- [ ] **CRITICAL:** Integration tests pass
- [ ] **CRITICAL:** Contract tests pass
- [ ] **CRITICAL:** No circular dependencies

## Standard Checks

- [ ] End-to-end flows documented
- [ ] Error propagation verified
- [ ] Performance benchmarks met
- [ ] Observability integration complete
- [ ] Feature flags working
- [ ] Rollback procedures tested

## Recovery Protocol

On FAIL: Fix issues, re-run validation. Max 3 attempts before mandatory escalation.

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan |
| FAIL | Any critical fails |
