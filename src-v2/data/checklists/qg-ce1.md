---
name: qg-ce1-chaos-engineering
description: Chaos engineering gate - verifies resilience through fault injection and tenant isolation under failure
module: bam
tags: [chaos, quality-gate, multi-tenant, resilience, testing]
version: 2.0.0
---

# QG-CE1: Chaos Engineering Gate Checklist

> **Gate ID:** QG-CE1 (Chaos Engineering)
> **Definition:** Resilience through chaos testing MUST be verified before production deployment.
> **Scope:** Covers failure injection tests, recovery verification, blast radius containment, and runbook validation.
> **Recovery:** Gate failure recovery requires resolving resilience gaps before production release.

**Workflow:** bmad-bam-chaos-engineering-design, bmad-bam-disaster-recovery-design
**Prerequisites:** QG-LT1 (Load Testing), QG-P1 depends on this gate for mission-critical deployments

---

## Purpose

The Chaos Engineering Gate (QG-CE1) validates system resilience under failure conditions. This gate ensures:

1. **Failure scenarios** are tested systematically across services and infrastructure
2. **Recovery mechanisms** work within defined RTO/RPO targets
3. **Blast radius** is contained to prevent cascading failures
4. **Tenant isolation** is maintained during failures (no cross-tenant impact)
5. **Runbooks** are validated and executable by on-call teams

Passing QG-CE1 provides confidence that the system can handle production failures gracefully.

---

## Failure Injection Tests

### Service Failure Scenarios

- [ ] **CRITICAL:** Single service instance failure tested
- [ ] **CRITICAL:** Complete service failure (all instances) tested
- [ ] **CRITICAL:** Service dependency failure tested
- [ ] Database primary failure tested
- [ ] Cache service failure tested
- [ ] Message queue failure tested
- [ ] External API failure (payment, LLM) tested
- [ ] DNS resolution failure tested

### Network Failure Scenarios

- [ ] **CRITICAL:** Network partition between services tested
- [ ] **CRITICAL:** Network latency injection tested (100ms, 500ms, 2s)
- [ ] Packet loss scenarios tested (1%, 5%, 20%)
- [ ] Network bandwidth throttling tested
- [ ] Cross-zone network failure tested
- [ ] Load balancer failure tested

### Resource Exhaustion Scenarios

- [ ] CPU exhaustion scenario tested
- [ ] Memory exhaustion scenario tested
- [ ] Disk space exhaustion tested
- [ ] Connection pool exhaustion tested
- [ ] Thread pool exhaustion tested
- [ ] File descriptor exhaustion tested

### Data Corruption Scenarios

- [ ] Database connection corruption tested
- [ ] Cache data corruption tested
- [ ] Message corruption in queues tested
- [ ] Config corruption recovery tested
- [ ] Secret/credential corruption tested

### AI/Agent-Specific Failures

- [ ] **CRITICAL:** LLM provider outage tested
- [ ] **CRITICAL:** LLM rate limiting scenario tested
- [ ] Agent timeout handling tested
- [ ] Tool execution failure tested
- [ ] RAG retrieval failure tested
- [ ] Model fallback on failure verified

---

## Recovery Verification

### Automatic Recovery

- [ ] **CRITICAL:** Service auto-restart verified (< 30s)
- [ ] **CRITICAL:** Health check failure triggers recovery
- [ ] **CRITICAL:** Circuit breaker opens on failure threshold
- [ ] Liveness probe failure triggers pod restart
- [ ] Readiness probe failure removes from rotation
- [ ] Circuit breaker closes on recovery

### Recovery Time Objectives (RTO)

- [ ] **CRITICAL:** RTO defined per service tier
- [ ] **CRITICAL:** Tier 1 (critical) RTO verified (< 5 min)
- [ ] **CRITICAL:** Tier 2 (important) RTO verified (< 15 min)
- [ ] Tier 3 (standard) RTO verified (< 1 hr)
- [ ] Database failover RTO verified
- [ ] Region failover RTO verified (if multi-region)

### Recovery Point Objectives (RPO)

- [ ] **CRITICAL:** RPO defined per data type
- [ ] **CRITICAL:** Transactional data RPO verified (< 1 min)
- [ ] Analytical data RPO verified (< 1 hr)
- [ ] Backup restoration time verified
- [ ] Point-in-time recovery tested

### Self-Healing Verification

- [ ] **CRITICAL:** Auto-scaling responds to failures
- [ ] Failed pods replaced automatically
- [ ] Connection pools recover after DB failover
- [ ] Caches rebuild after restart
- [ ] Message consumers reconnect after queue failure
- [ ] Rate limiters reset after outage

### State Recovery

- [ ] In-flight requests handled on failure
- [ ] Transaction rollback on service failure verified
- [ ] Idempotency prevents duplicate processing
- [ ] Queue retry handles failed messages
- [ ] Saga/compensation patterns work correctly

---

## Blast Radius Containment

### Failure Isolation

- [ ] **CRITICAL:** Single service failure does not cascade
- [ ] **CRITICAL:** Dependency failure isolated via circuit breaker
- [ ] **CRITICAL:** Timeout prevents hung service impact
- [ ] Bulkhead pattern isolates failure domains
- [ ] Async processing isolates producer from consumer

### Multi-Tenant Blast Radius

- [ ] **CRITICAL:** Single tenant failure does not affect others
- [ ] **CRITICAL:** Tenant-specific circuit breakers configured
- [ ] **CRITICAL:** Per-tenant resource quotas prevent exhaustion
- [ ] **CRITICAL:** Tenant isolation verified during chaos tests
- [ ] Noisy tenant detection and throttling verified

### Regional Blast Radius

- [ ] Regional failure contained to region
- [ ] Cross-region replication maintains data
- [ ] DNS failover to healthy region tested
- [ ] Global load balancer redirects traffic

### Cascading Failure Prevention

- [ ] **CRITICAL:** Retry storms prevented via exponential backoff
- [ ] **CRITICAL:** Circuit breakers prevent cascade
- [ ] Load shedding activates under stress
- [ ] Graceful degradation paths verified
- [ ] Queue backpressure prevents overflow

---

## Tenant Isolation Under Failure

### Per-Tenant Resilience

- [ ] **CRITICAL:** Tenant-specific failures isolated
- [ ] **CRITICAL:** Tenant recovery independent of others
- [ ] Tenant SLA maintained during platform issues
- [ ] Per-tenant circuit breakers function
- [ ] Tenant failover (if multi-region) independent

### Data Isolation Under Failure

- [ ] **CRITICAL:** RLS maintained during partial failures
- [ ] **CRITICAL:** No cross-tenant data exposure during chaos
- [ ] Cache isolation preserved during restarts
- [ ] Session isolation maintained during failover
- [ ] Tenant context not lost in recovery

### Resource Isolation Under Failure

- [ ] Tenant quotas enforced during recovery
- [ ] Fair scheduling maintained during degradation
- [ ] Priority tenants (Enterprise) get resources first
- [ ] Resource starvation prevented for any tenant

### Tenant Communication

- [ ] Tenant-specific status page updates
- [ ] Tenant-specific incident notifications
- [ ] Tenant impact assessment per incident
- [ ] Tenant SLA credit calculation automated

---

## Runbook Validation

### Runbook Coverage

- [ ] **CRITICAL:** Runbook exists for each failure scenario
- [ ] **CRITICAL:** Runbook linked in alerting system
- [ ] Runbook recently reviewed (< 6 months)
- [ ] Runbook tested during chaos exercise
- [ ] Runbook steps executable by on-call

### Runbook Accuracy

- [ ] **CRITICAL:** Runbook commands work in current environment
- [ ] **CRITICAL:** Runbook links to dashboards valid
- [ ] Runbook escalation paths current
- [ ] Runbook service dependencies accurate
- [ ] Runbook recovery time estimates accurate

### Runbook Automation

- [ ] Automated remediation where possible
- [ ] Runbook steps scriptable/automatable
- [ ] Auto-remediation tested in chaos scenario
- [ ] Manual intervention points documented
- [ ] Automation failure fallback documented

### Training and Drills

- [ ] On-call team trained on runbooks
- [ ] Chaos drill conducted with runbook
- [ ] Drill results documented
- [ ] Runbook gaps identified in drills
- [ ] Drill cadence established (monthly/quarterly)

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Service Failure Scenarios | CRITICAL | 80% scenarios tested | <50% scenarios tested |
| Network Failure Scenarios | CRITICAL | Latency/partition untested | No network chaos tested |
| Resource Exhaustion | Non-critical | Partial coverage | N/A |
| Data Corruption | Non-critical | Partial coverage | N/A |
| AI/Agent Failures | CRITICAL | Partial coverage | LLM outage not tested |
| Automatic Recovery | CRITICAL | Recovery >60s | Auto-recovery broken |
| RTO/RPO | CRITICAL | Not measured | Exceeded significantly |
| Self-Healing | CRITICAL | Partial healing | Self-healing broken |
| Failure Isolation | CRITICAL | Timeout gaps | Cascading failures occur |
| Multi-Tenant Blast Radius | CRITICAL | Circuit breaker gaps | Cross-tenant impact |
| Cascading Prevention | CRITICAL | Backoff gaps | Retry storms possible |
| Per-Tenant Resilience | CRITICAL | Partial isolation | Tenant failures cascade |
| Data Isolation Under Failure | CRITICAL | Cache isolation gaps | Cross-tenant data leak |
| Runbook Coverage | CRITICAL | 80% coverage | <50% coverage |
| Runbook Accuracy | CRITICAL | Minor inaccuracies | Commands do not work |

---

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (SRE Lead or Engineering Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If QG-CE1 fails:**

1. **Attempt 1:** Immediate remediation (target: 3-5 days)
   - Identify untested failure scenarios
   - Execute missing chaos experiments
   - Fix recovery mechanism gaps
   - Update runbooks with accurate steps
   - Verify tenant isolation under failure
   - Re-run QG-CE1 validation after fixes
   - **Lock passed categories** - do not re-test locked items

2. **Attempt 2:** Deep resilience review (target: 3-5 days)
   - Engage SRE and Platform Architecture teams
   - Review failure handling architecture
   - Implement missing circuit breakers
   - Add blast radius containment measures
   - Conduct chaos drill with updated runbooks
   - Re-run QG-CE1 validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Engineering Leadership and SRE Lead
   - Document resilience gaps with risk assessment
   - Consider architecture changes for systemic issues
   - Create remediation plan with defined resilience targets
   - Define minimum viable resilience for production
   - Schedule follow-up validation within 1 week

---

## Web Research Verification

- [ ] Search the web: "chaos engineering best practices multi-tenant {date}" - Verify chaos patterns
- [ ] Search the web: "resilience testing SaaS platforms {date}" - Confirm resilience approach
- [ ] Search the web: "circuit breaker chaos testing {date}" - Validate failure isolation patterns
- [ ] _Source: [URL]_ citations documented for key decisions

---

## Related Patterns

Load decision criteria from pattern registry:

- **Resilience patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `resilience-*`
- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `operations-*`

---

## Related Workflows

- `bmad-bam-chaos-engineering-design` - Chaos strategy
- `bmad-bam-disaster-recovery-design` - DR planning
- `bmad-bam-incident-response-design` - Incident handling
- `bmad-bam-runbook-automation` - Runbook creation
- `bmad-bam-circuit-breaker-design` - Resilience patterns

**PASS CRITERIA:** All critical failure scenarios tested, recovery verified, runbooks validated
**OWNER:** SRE Lead / Reliability Engineering Lead
**REVIEWERS:** Engineering, SRE, Platform Architecture, Security

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | V2 BMAD format with full sections |
| 1.0.0 | - | Platform Architect | Initial V1 checklist |
