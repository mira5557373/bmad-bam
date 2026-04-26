# QG-M1: Module Architecture Gate

**Workflow:** bmad-bam-create-module-architecture  
**Prerequisites:** QG-F1 (Foundation)

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** Module boundary clearly defined
- [ ] **CRITICAL:** Public API contracts documented
- [ ] **CRITICAL:** Dependencies explicit and minimal
- [ ] **CRITICAL:** Tenant context requirements identified

## Standard Checks

- [ ] Internal component structure defined
- [ ] Data model documented
- [ ] Event contracts specified
- [ ] Error handling strategy defined
- [ ] Performance requirements stated
- [ ] Testing strategy outlined

## Recovery Protocol

On FAIL: Fix issues, re-run validation. Max 3 attempts before mandatory escalation.

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan |
| FAIL | Any critical fails |
