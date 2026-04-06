# Foundation Validation Gate Checklist

> Gate ID: QG-M1 + QG-M2 + QG-M3 (Foundation Gate — composite)
> Foundation gate MUST pass before any module development begins.
> Covers master architecture approval, tenant isolation, and AI runtime readiness.
> Gate failure recovery: resolve blocking items before enabling module development.

## Artifacts

- [ ] master-architecture.md exists with all required sections (1-7)
- [ ] master-architecture.md status is 'approved'

## Shared Kernel Implementation

- [ ] TenantContext class implemented
- [ ] TenantContext middleware implemented
- [ ] BaseEntity class implemented with tenant_id
- [ ] EventBus interface implemented
- [ ] Audit logging implemented with tenant context

## Control Plane Implementation

- [ ] Tenant provisioning API functional
- [ ] Tenant lifecycle management working
- [ ] Billing integration connected (or stub for MVP)

## AI Runtime Implementation

- [ ] Agent registry implemented
- [ ] Tool registry implemented with policy checks
- [ ] Memory manager implemented with scope enforcement
- [ ] LLM gateway connected
- [ ] Safety guardrails active
- [ ] Run contract enforcement operational (run-contract-patterns: enforces execution boundaries)
- [ ] Action gateway routing all write operations (action-gateway-patterns: mediates all mutations)
- [ ] Trust tier labeling configured for all data sources (context-compiler-patterns: data provenance)
- [ ] Context compiler functional with trust-tier priority (context-compiler-patterns: priority assembly)

## Tests Passing

- [ ] Tenant isolation test: data isolation verified
- [ ] Tenant isolation test: event isolation verified
- [ ] Tenant isolation test: cache isolation verified
- [ ] Module boundary test: no cross-module internals
- [ ] AI runtime test: policy enforcement verified

## Documentation

- [ ] Code patterns documented with examples
- [ ] Facade contract template documented
- [ ] Module creation guide exists
- [ ] All TSA technologies have version pins

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, ≥80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass — remediation plan required |
| **FAIL** | Any CRITICAL item fails — block until resolved |

## Critical vs Non-Critical Classification

| Category                              | Classification |
| ------------------------------------- | -------------- |
| Shared Kernel Implementation          | CRITICAL       |
| Tests Passing (tenant isolation)      | CRITICAL       |
| Control Plane Implementation          | CRITICAL       |
| Artifacts (status field)              | Non-critical   |
| Documentation                         | Non-critical   |
| AI Runtime (partial proceed possible) | Non-critical (conditional — requires documented mitigation plan) |
