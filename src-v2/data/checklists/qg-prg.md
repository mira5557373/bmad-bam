---
name: qg-prg-production-readiness-gate
description: Production-Readiness Gate - final gate before production deployment
module: bam
tags: [quality-gate, production, nexus, prg]
version: 2.0.0
---

# QG-PRG: Production-Readiness Gate Checklist

> **Gate ID:** QG-PRG (Production-Readiness Gate)
> **Definition:** Final gate validating all NEXUS requirements before production deployment.
> **Scope:** Action contracts, tenant isolation, observability, chaos testing, human review.
> **Recovery:** Address specific failing checks before re-validation.

**Workflow:** bmad-bam-prg-gate-setup, bmad-bam-production-readiness
**Prerequisites:** QG-I1, QG-I2, QG-I3

---

## Purpose

The Production-Readiness Gate (QG-PRG) validates all 10 NEXUS production requirements are met before deployment.

---

## NEXUS 10-Point Checklist

### Action Contract Validation
- [ ] **CRITICAL:** All action contracts have 8-field schema complete
- [ ] **CRITICAL:** Confidence thresholds configured per action type
- [ ] Proof certificates enabled for audit trail
- [ ] Loop bindings verified for all agent loops

### Tenant Isolation
- [ ] **CRITICAL:** Tenant isolation verified (no cross-tenant data access)
- [ ] RLS policies tested with cross-tenant attack simulation
- [ ] Tenant context propagation verified across async boundaries

### Rollback & Recovery
- [ ] **CRITICAL:** Rollback tested successfully (< 5 min recovery)
- [ ] Blue-green deployment configured
- [ ] Feature flags ready for kill switches

### Audit Trail
- [ ] **CRITICAL:** Audit trail complete for all agent actions
- [ ] Action gateway logging all mutations
- [ ] Compliance evidence collection automated

### Resource Budgets
- [ ] Resource budgets configured per tenant tier
- [ ] Token limits enforced per request/session
- [ ] Cost tracking active with alerts

### Confidence Thresholds
- [ ] **CRITICAL:** Confidence thresholds set for all AI actions
- [ ] Low-confidence actions route to human review
- [ ] Threshold tuning documented

### Loop Bindings
- [ ] Agent loops have max iteration limits
- [ ] Watchdog timeouts configured
- [ ] Infinite loop detection active

### Observability
- [ ] LLM metrics collected (latency, tokens, cost)
- [ ] Tenant-scoped dashboards available
- [ ] Alerting configured for anomalies

### Chaos Testing
- [ ] Critical failure scenarios tested
- [ ] Recovery verified for each scenario
- [ ] Blast radius contained

### Human Review
- [ ] **CRITICAL:** Human review sign-off obtained
- [ ] Security review completed
- [ ] Architecture review approved

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, >=80% non-critical pass |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical with remediation plan |
| **FAIL** | Any CRITICAL item fails |

---

## Recovery Protocol

**If QG-PRG fails:**

1. Identify failed CRITICAL categories
2. Address specific failing checks
3. Re-run QG-PRG validation
4. Escalate if 3 consecutive failures

---

## Related Workflows

- `bmad-bam-prg-gate-setup` - PRG gate configuration
- `bmad-bam-production-readiness` - Production readiness validation
- `bmad-bam-convergence-verification` - Prerequisites gate

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-28 | BAM V2 | Initial V2 checklist |
