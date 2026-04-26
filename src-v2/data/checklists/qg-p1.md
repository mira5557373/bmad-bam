# QG-P1: Production Readiness Gate

**Workflow:** bmad-bam-production-readiness  
**Prerequisites:** QG-I1, QG-I2, QG-I3

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** All prior gates passed
- [ ] **CRITICAL:** Security review complete
- [ ] **CRITICAL:** Load testing passed
- [ ] **CRITICAL:** Disaster recovery tested

## Standard Checks

- [ ] Runbook documentation complete
- [ ] Alerting configured
- [ ] Monitoring dashboards ready
- [ ] On-call rotation established
- [ ] Incident response plan documented
- [ ] SLA/SLO defined
- [ ] Capacity planning complete
- [ ] Cost projections validated

## Recovery Protocol

On FAIL: Fix issues, re-run validation. Max 3 attempts before mandatory escalation to project leadership.

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan with deadline |
| FAIL | Any critical fails - no production deployment |
