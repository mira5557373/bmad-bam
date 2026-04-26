# QG-I3: Agent Safety Gate

**Workflow:** bmad-bam-convergence-verification  
**Prerequisites:** QG-I2 (Tenant Safety)

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** Agent tenant isolation verified
- [ ] **CRITICAL:** Tool execution boundaries enforced
- [ ] **CRITICAL:** Memory isolation between tenants
- [ ] **CRITICAL:** Output sanitization in place

## Standard Checks

- [ ] Agent timeout handling tested
- [ ] Token limits enforced
- [ ] Error recovery tested
- [ ] Agent tracing functional
- [ ] Cost attribution accurate
- [ ] Agent versioning working

## Recovery Protocol

On FAIL: Fix issues, re-run validation. Max 3 attempts before mandatory escalation.

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan |
| FAIL | Any critical fails |
