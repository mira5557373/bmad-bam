# QG-F1: Foundation Gate

**Workflow:** bmad-bam-create-master-architecture  
**Prerequisites:** None (first gate)

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** Tenant isolation model selected and documented
- [ ] **CRITICAL:** Module boundaries defined
- [ ] **CRITICAL:** AI runtime framework selected
- [ ] **CRITICAL:** Master architecture document frozen

## Standard Checks

- [ ] Quality attributes defined (latency, throughput, availability)
- [ ] Cross-cutting concerns documented (logging, auth, monitoring)
- [ ] Technology stack decisions recorded
- [ ] Deployment topology specified
- [ ] Data architecture outlined
- [ ] Integration patterns selected

## Recovery Protocol

On FAIL: Fix issues, re-run validation. Max 3 attempts before mandatory escalation.

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan |
| FAIL | Any critical fails |
