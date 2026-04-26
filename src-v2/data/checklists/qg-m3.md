# QG-M3: Agent Runtime Gate

**Workflow:** bmad-bam-agent-runtime-architecture  
**Prerequisites:** QG-M2 (Tenant Isolation)

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** Agent execution respects tenant boundaries
- [ ] **CRITICAL:** Tool calls include tenant context
- [ ] **CRITICAL:** Memory/state scoped to tenant
- [ ] **CRITICAL:** Agent outputs cannot leak across tenants

## Standard Checks

- [ ] Agent execution timeout defined
- [ ] Token usage limits per tenant
- [ ] Error handling for agent failures
- [ ] Observability hooks in place
- [ ] Agent versioning strategy defined
- [ ] Human-in-the-loop patterns documented

## Recovery Protocol

On FAIL: Fix issues, re-run validation. Max 3 attempts before mandatory escalation.

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan |
| FAIL | Any critical fails |
