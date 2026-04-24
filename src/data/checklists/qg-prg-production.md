# QG-PRG: Production-Readiness Gate Checklist

**Gate Type:** Mandatory
**Phase:** Pre-Production Deployment
**Applies To:** All AI agent components entering production

---

## Overview

The Production-Readiness Gate (PRG) validates that AI agent systems meet all 10 mandatory requirements before production deployment. This gate ensures tenant safety, operational stability, and regulatory compliance.

## PRG Mandatory Checks

### PRG-1: Action Contract Compliance

- [ ] **CRITICAL:** All agent actions have valid 8-field contracts
- [ ] Confidence thresholds configured per tenant tier
- [ ] Proof certificates enabled for high-impact actions
- [ ] Contract schema passes validation

### PRG-2: Tenant Isolation Verification

- [ ] **CRITICAL:** Cross-tenant data access impossible
- [ ] Tenant context propagation validated end-to-end
- [ ] RLS/schema isolation tested with boundary cases
- [ ] No tenant ID leakage in logs or errors

### PRG-3: Security Baseline

- [ ] **CRITICAL:** All security scans pass (SAST, DAST, dependency)
- [ ] No critical or high vulnerabilities unresolved
- [ ] Authentication and authorization tested
- [ ] Secrets management verified (no hardcoded credentials)

### PRG-4: Observability Stack

- [ ] Structured logging with tenant context
- [ ] Metrics collection for SLI/SLO tracking
- [ ] Distributed tracing enabled
- [ ] Alerting rules configured with PagerDuty/OpsGenie integration

### PRG-5: Rollback Capability

- [ ] **CRITICAL:** Automated rollback tested and functional
- [ ] Rollback triggers defined (error rate, latency thresholds)
- [ ] Database migration rollback verified
- [ ] Feature flags for gradual rollout configured

### PRG-6: Load Testing Results

- [ ] Performance baseline established
- [ ] Load test passed at 2x expected traffic
- [ ] Tenant isolation maintained under load
- [ ] No degradation of P99 latency beyond acceptable limits

### PRG-7: Disaster Recovery

- [ ] Backup procedures verified
- [ ] Recovery time objectives (RTO) documented
- [ ] Recovery point objectives (RPO) documented
- [ ] DR drill completed within last 90 days

### PRG-8: Documentation Complete

- [ ] Runbook updated with new components
- [ ] Architecture diagrams current
- [ ] API documentation published
- [ ] Incident response procedures documented

### PRG-9: AI-Specific Validation

- [ ] **CRITICAL:** AI confidence thresholds set appropriately
- [ ] Human-in-the-loop workflows configured for low-confidence
- [ ] Model versioning and rollback capability verified
- [ ] AI bias/fairness testing completed

### PRG-10: Compliance Sign-Off

- [ ] Data privacy requirements met (GDPR, CCPA)
- [ ] Tenant data handling complies with contracts
- [ ] Audit logging captures all required events
- [ ] Legal/compliance review completed (if required)

## Gate Outcomes

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | All CRITICAL checks pass, no more than 2 non-critical gaps | Proceed to production |
| **CONDITIONAL** | All CRITICAL pass, 3-5 non-critical gaps | Proceed with mitigation plan |
| **FAIL** | Any CRITICAL check fails | Enter recovery protocol |
| **WAIVED** | Non-critical item waived by release manager | Document justification |

## Recovery Protocol

If gate FAILS:
1. Document failing checks
2. Create remediation plan with timeline
3. Fix issues and re-run validation
4. Escalate to release manager if blocked

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Engineering Lead | | | |
| Security Lead | | | |
| Release Manager | | | |

## Related Resources

- `bmad-bam-prg-gate-setup` - Configure PRG automation
- `bmad-bam-convergence-verification` - Pre-PRG verification
- `prg-gate-implementation.md` - Implementation guide
- `qg-ai3-agent-contracts.md` - Action contract validation
