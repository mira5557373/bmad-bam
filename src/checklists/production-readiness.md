# Production Readiness Checklist (QG-P1)

> Gate ID: QG-P1 (Production Readiness)
> Final release decision evidence. ALL critical items must pass.
> Safety outranks schedule — no release if tenant-safety or agent-safety gates fail.
> Gate definition: comprehensive pre-production verification across all quality dimensions.
> Gate failure recovery: resolve blocking items before approving production deployment.

## Prerequisite Gates

- [ ] Foundation gate (QG-M1, QG-M2, QG-M3) passed
- [ ] All module readiness gates passed
- [ ] Cross-module convergence gate (QG-I1) passed
- [ ] Tenant isolation gate (QG-I2) passed
- [ ] Agent safety gate (QG-I3) passed

## Cross-Module Integration

- [ ] Convergence verification completed
- [ ] All facade contract tests passing
- [ ] Cross-module user journeys tested end-to-end
- [ ] Domain event flows verified across modules

## Tenant Safety

- [ ] RLS policies verified on all tenant-plane tables
- [ ] Cross-tenant data isolation confirmed
- [ ] Tier entitlements enforced correctly
- [ ] Rate limiting active per tenant
- [ ] Noisy-neighbor prevention tested

## Agent Safety

- [ ] All AI agents have kill switches configured
- [ ] Circuit breakers active on agent endpoints
- [ ] Tool permissions enforced via policy engine
- [ ] Memory scope enforcement verified
- [ ] Golden task evaluation passing (relevance ≥ 0.8, completion ≥ 0.9)
- [ ] Fallback behavior tested for all agent endpoints
- [ ] NeMo Guardrails active for input/output safety

## Observability

- [ ] Structured logging with tenant_id in all log entries
- [ ] Distributed tracing configured per tenant
- [ ] Cost attribution per tenant operational
- [ ] Noisy-neighbor alerting configured
- [ ] Audit event catalog complete

## Operational Readiness

- [ ] Tenant provisioning tested (all tiers)
- [ ] Tenant offboarding tested (GDPR compliance)
- [ ] Runbooks created for emergency procedures
- [ ] Kill switch procedures documented and tested
- [ ] Rollback procedures documented and tested

## Documentation

- [ ] API documentation complete with tenant context requirements
- [ ] Module contract documentation up to date
- [ ] Architecture decision records (ADRs) current
- [ ] Operational runbooks reviewed

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, ≥80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass — remediation plan required |
| **FAIL** | Any CRITICAL item fails — block until resolved |

## Critical vs Non-Critical Classification

| Category                 | Classification                                        |
| ------------------------ | ----------------------------------------------------- |
| Prerequisite Gates       | CRITICAL                                              |
| Cross-Module Integration | CRITICAL                                              |
| Tenant Safety            | CRITICAL                                              |
| Agent Safety             | CRITICAL                                              |
| Observability            | Non-critical (can proceed with documented exceptions) |
| Operational Readiness    | CRITICAL                                              |
| Documentation            | Non-critical                                          |

## Recovery Protocol

If this gate fails, refer to the relevant recovery workflow or escalation procedure.
