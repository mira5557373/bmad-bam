# QG-CE1: Chaos Engineering Checklist

> Gate ID: QG-CE1 (Chaos Engineering)
> Resilience through chaos testing MUST be verified before production deployment.
> Gate definition: verifies failure injection tests, recovery verification, blast radius containment, and runbook validation.
> Workflow integration: BAM operations and reliability workflows feed into this gate.
> Executing workflow: `chaos-engineering-design` (resilience phase)
>
> **Prerequisite Gate:** QG-CE1 must pass before QG-P1 (Production Readiness)
> for any mission-critical production deployment.

## Failure Injection Tests

### Service Failure Scenarios

- [ ] Single service instance failure tested
- [ ] Complete service failure (all instances) tested
- [ ] Service dependency failure tested
- [ ] Database primary failure tested
- [ ] Cache service failure tested
- [ ] Message queue failure tested
- [ ] External API failure (payment, LLM) tested
- [ ] DNS resolution failure tested

### Network Failure Scenarios

- [ ] Network partition between services tested
- [ ] Network latency injection tested (100ms, 500ms, 2s)
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

- [ ] LLM provider outage tested
- [ ] LLM rate limiting scenario tested
- [ ] Agent timeout handling tested
- [ ] Tool execution failure tested
- [ ] RAG retrieval failure tested
- [ ] Model fallback on failure verified

## Recovery Verification

### Automatic Recovery

- [ ] Service auto-restart verified (< 30s)
- [ ] Health check failure triggers recovery
- [ ] Liveness probe failure triggers pod restart
- [ ] Readiness probe failure removes from rotation
- [ ] Circuit breaker opens on failure threshold
- [ ] Circuit breaker closes on recovery

### Recovery Time Objectives (RTO)

- [ ] RTO defined per service tier
- [ ] Tier 1 (critical) RTO verified (< 5 min)
- [ ] Tier 2 (important) RTO verified (< 15 min)
- [ ] Tier 3 (standard) RTO verified (< 1 hr)
- [ ] Database failover RTO verified
- [ ] Region failover RTO verified (if multi-region)

### Recovery Point Objectives (RPO)

- [ ] RPO defined per data type
- [ ] Transactional data RPO verified (< 1 min)
- [ ] Analytical data RPO verified (< 1 hr)
- [ ] Backup restoration time verified
- [ ] Point-in-time recovery tested

### Self-Healing Verification

- [ ] Auto-scaling responds to failures
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

## Blast Radius Containment

### Failure Isolation

- [ ] Single service failure does not cascade
- [ ] Dependency failure isolated via circuit breaker
- [ ] Timeout prevents hung service impact
- [ ] Bulkhead pattern isolates failure domains
- [ ] Async processing isolates producer from consumer

### Multi-Tenant Blast Radius

- [ ] Single tenant failure does not affect others
- [ ] Tenant-specific circuit breakers configured
- [ ] Per-tenant resource quotas prevent exhaustion
- [ ] Tenant isolation verified during chaos tests
- [ ] Noisy tenant detection and throttling verified

### Regional Blast Radius

- [ ] Regional failure contained to region
- [ ] Cross-region replication maintains data
- [ ] DNS failover to healthy region tested
- [ ] Global load balancer redirects traffic

### Cascading Failure Prevention

- [ ] Retry storms prevented via exponential backoff
- [ ] Circuit breakers prevent cascade
- [ ] Load shedding activates under stress
- [ ] Graceful degradation paths verified
- [ ] Queue backpressure prevents overflow

### Alert Correlation

- [ ] Related failures grouped in single incident
- [ ] Root cause identification in alerts
- [ ] Blast radius assessment automated
- [ ] Impact severity calculated automatically

## Tenant Isolation Under Failure

### Per-Tenant Resilience

- [ ] Tenant-specific failures isolated
- [ ] Tenant recovery independent of others
- [ ] Tenant SLA maintained during platform issues
- [ ] Per-tenant circuit breakers function
- [ ] Tenant failover (if multi-region) independent

### Data Isolation Under Failure

- [ ] RLS maintained during partial failures
- [ ] Cache isolation preserved during restarts
- [ ] Session isolation maintained during failover
- [ ] Tenant context not lost in recovery
- [ ] No cross-tenant data exposure during chaos

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

## Runbook Validation

### Runbook Coverage

- [ ] Runbook exists for each failure scenario
- [ ] Runbook linked in alerting system
- [ ] Runbook recently reviewed (< 6 months)
- [ ] Runbook tested during chaos exercise
- [ ] Runbook steps executable by on-call

### Runbook Accuracy

- [ ] Runbook commands work in current environment
- [ ] Runbook links to dashboards valid
- [ ] Runbook escalation paths current
- [ ] Runbook service dependencies accurate
- [ ] Runbook recovery time estimates accurate

### Runbook Automation

- [ ] Automated remediation where possible
- [ ] Runbook steps scriptable/automatable
- [ ] Auto-remediation tested in chaos scenario
- [ ] Manual intervention points documented
- [ ] Automation failure fallback documented

### Incident Response Integration

- [ ] Runbooks integrated with incident management
- [ ] On-call rotation aware of runbooks
- [ ] Runbook execution logged for review
- [ ] Post-incident runbook updates scheduled
- [ ] Runbook effectiveness metrics tracked

### Training and Drills

- [ ] On-call team trained on runbooks
- [ ] Chaos drill conducted with runbook
- [ ] Drill results documented
- [ ] Runbook gaps identified in drills
- [ ] Drill cadence established (monthly/quarterly)

---

## Web Research Verification

- [ ] Search the web: "chaos engineering best practices multi-tenant {date}" - Verify chaos patterns
- [ ] Search the web: "resilience testing SaaS platforms {date}" - Confirm resilience approach
- [ ] _Source: [URL]_ citations documented for key decisions

## Related Patterns

Load decision criteria from pattern registry:

- **Resilience patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `resilience-*`
- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `operations-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "chaos engineering Kubernetes multi-tenant {date}"
- Search: "blast radius containment microservices {date}"
- Search: "runbook automation incident response {date}"
- Search: "circuit breaker chaos testing {date}"

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (SRE Lead or Engineering Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category                       | Classification | CONDITIONAL Threshold | FAIL Threshold |
| ------------------------------ | -------------- | --------------------- | -------------- |
| Service Failure Scenarios      | CRITICAL       | 80% scenarios tested | <50% scenarios tested |
| Network Failure Scenarios      | CRITICAL       | Latency/partition untested | No network chaos tested |
| Resource Exhaustion Scenarios  | Non-critical   | Partial coverage | N/A |
| Data Corruption Scenarios      | Non-critical   | Partial coverage | N/A |
| AI/Agent-Specific Failures     | CRITICAL       | Partial coverage | LLM outage not tested |
| Automatic Recovery             | CRITICAL       | Recovery >60s | Auto-recovery broken |
| Recovery Time Objectives       | CRITICAL       | RTO not measured | RTO exceeded significantly |
| Recovery Point Objectives      | CRITICAL       | RPO not measured | Data loss on failure |
| Self-Healing Verification      | CRITICAL       | Partial healing | Self-healing broken |
| State Recovery                 | Non-critical   | Idempotency gaps | N/A |
| Failure Isolation              | CRITICAL       | Timeout gaps | Cascading failures occur |
| Multi-Tenant Blast Radius      | CRITICAL       | Circuit breaker gaps | Cross-tenant impact |
| Regional Blast Radius          | Non-critical   | Failover untested | N/A |
| Cascading Failure Prevention   | CRITICAL       | Backoff gaps | Retry storms possible |
| Alert Correlation              | Non-critical   | Grouping incomplete | N/A |
| Per-Tenant Resilience          | CRITICAL       | Partial isolation | Tenant failures cascade |
| Data Isolation Under Failure   | CRITICAL       | Cache isolation gaps | Cross-tenant data leak |
| Resource Isolation Under Failure | Non-critical | Fair scheduling gaps | N/A |
| Tenant Communication           | Non-critical   | Notification gaps | N/A |
| Runbook Coverage               | CRITICAL       | 80% coverage | <50% runbook coverage |
| Runbook Accuracy               | CRITICAL       | Minor inaccuracies | Commands don't work |
| Runbook Automation             | Non-critical   | Manual steps required | N/A |
| Incident Response Integration  | Non-critical   | Integration gaps | N/A |
| Training and Drills            | Non-critical   | No recent drill | N/A |

## Recovery Protocol

**If QG-CE1 fails:**

1. **Attempt 1:** Immediate remediation (target: 3-5 days)
   - Identify untested failure scenarios
   - Execute missing chaos experiments
   - Fix recovery mechanism gaps
   - Update runbooks with accurate steps
   - Verify tenant isolation under failure
   - Re-run QG-CE1 validation after fixes
   - **Lock passed categories** — do not re-test locked items

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

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Service Failure Scenarios | Add chaos experiments, test scenarios | <50% coverage |
| Network Failure Scenarios | Add network chaos tests | No network chaos tested |
| Automatic Recovery | Fix health checks, restart logic | Auto-recovery broken |
| RTO/RPO | Measure recovery times, fix gaps | Objectives exceeded |
| Failure Isolation | Add circuit breakers, timeouts | Cascading failures |
| Multi-Tenant Blast Radius | Add tenant-specific isolation | Cross-tenant impact |
| Runbook Coverage | Create missing runbooks | <50% coverage |
| Runbook Accuracy | Update commands, verify steps | Commands broken |

## Related Workflows

- `bmad-bam-chaos-engineering-design` - Chaos strategy
- `bmad-bam-disaster-recovery-design` - DR planning
- `bmad-bam-incident-response-design` - Incident handling
- `bmad-bam-runbook-automation` - Runbook creation
- `bmad-bam-circuit-breaker-design` - Resilience patterns

**PASS CRITERIA:** All critical failure scenarios tested, recovery verified, runbooks validated
**OWNER:** SRE Lead / Reliability Engineering Lead
**REVIEWERS:** Engineering, SRE, Platform Architecture, Security
