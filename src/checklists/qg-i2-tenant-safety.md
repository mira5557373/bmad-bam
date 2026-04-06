# QG-I2: Tenant Safety Verification Checklist

> Tenant safety MUST pass before release candidate.
> Gate definition: verifies tenant data boundaries and entitlement enforcement for release readiness.
> Workflow integration: BAM `convergence-verification` feeds into this gate; TEA `tea-trace` executes formal sign-off.
> Executing workflow: `tea-trace` (extended with tenant checks)
>
> **TEA Handoff:** BAM `convergence-verification` workflow (Steps 2-3) performs
> the cross-module integration checks that feed into this gate. Once convergence
> passes, TEA `tea-trace` executes this checklist for formal gate sign-off.
> Sequence: convergence-verification → tea-trace (QG-I2) → release decision.

## Isolation Tests

- [ ] Cross-tenant data access blocked (database)
- [ ] Cross-tenant cache access blocked
- [ ] Cross-tenant vector retrieval blocked
- [ ] Cross-tenant memory access blocked
- [ ] Cross-tenant job interference blocked

## Entitlement Tests

- [ ] Feature access respects plan/tier
- [ ] Usage limits enforced
- [ ] AI token budgets enforced

## Audit Coverage

- [ ] All sensitive actions logged
- [ ] Logs include tenant context
- [ ] Audit trail queryable by tenant

## Shared Resource Isolation

- [ ] Rate limits per tenant work
- [ ] Queue fairness verified
- [ ] No noisy-neighbor degradation

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, ≥80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass — remediation plan required |
| **FAIL** | Any CRITICAL item fails — block until resolved |

## Critical vs Non-Critical Classification

| Category                  | Classification                                        |
| ------------------------- | ----------------------------------------------------- |
| Isolation Tests           | CRITICAL                                              |
| Entitlement Tests         | CRITICAL                                              |
| Audit Coverage            | Non-critical                                          |
| Shared Resource Isolation | Non-critical (can proceed with documented exceptions) |

**PASS CRITERIA:** All checkboxes completed
**OWNER:** TEA (+ AI Quality & Safety)
**REVIEWERS:** Platform Architect, Security
