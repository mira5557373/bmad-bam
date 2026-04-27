---
name: qg-lt1-load-testing
description: Load testing gate - verifies performance baselines, scalability, and tenant isolation under load
module: bam
tags: [load-testing, quality-gate, multi-tenant, performance, scalability]
version: 2.0.0
---

# QG-LT1: Load Testing Gate Checklist

> **Gate ID:** QG-LT1 (Load Testing)
> **Definition:** Load testing completion MUST be verified before production deployment.
> **Scope:** Covers load test coverage, performance baselines, scalability, and tenant isolation under load.
> **Recovery:** Gate failure recovery requires resolving performance gaps before production release.

**Workflow:** bmad-bam-performance-baseline, bmad-bam-load-test-design
**Prerequisites:** QG-M1 (Module Architecture), QG-P1 depends on this gate

---

## Purpose

The Load Testing Gate (QG-LT1) validates system performance and scalability. This gate ensures:

1. **Critical paths** are load tested with realistic workloads
2. **Performance baselines** (P50/P95/P99) are documented and acceptable
3. **Scaling mechanisms** work correctly under load
4. **Tenant isolation** is maintained under concurrent load (no noisy neighbor)
5. **Resource limits** are enforced accurately at scale

Passing QG-LT1 provides confidence that the system can handle production traffic.

---

## Load Test Coverage

### Critical Path Testing

- [ ] **CRITICAL:** Authentication flows load tested (login, token refresh)
- [ ] **CRITICAL:** Core API endpoints load tested (CRUD operations)
- [ ] **CRITICAL:** Search/query endpoints load tested with realistic data
- [ ] File upload/download paths load tested
- [ ] Webhook delivery under load verified
- [ ] Background job processing under load verified
- [ ] Real-time features load tested (WebSocket, SSE)
- [ ] Integration endpoints load tested (external APIs)

### Multi-Tenant Load Distribution

- [ ] **CRITICAL:** Load distributed across multiple tenant sizes (small, medium, large)
- [ ] **CRITICAL:** Concurrent tenant operations tested
- [ ] **CRITICAL:** Tenant isolation verified under concurrent load
- [ ] Mixed workload scenarios tested (read-heavy, write-heavy, balanced)
- [ ] Tenant onboarding under platform load tested
- [ ] Cross-tenant queries (admin) load tested

### AI/Agent Workloads

- [ ] **CRITICAL:** LLM inference endpoints load tested
- [ ] **CRITICAL:** Agent orchestration under load verified
- [ ] RAG retrieval performance under load measured
- [ ] Tool execution concurrency tested
- [ ] Agent memory operations under load verified
- [ ] Model switching fallback under load tested

### Data Layer Load Testing

- [ ] **CRITICAL:** Database connection pool exhaustion tested
- [ ] **CRITICAL:** Read replica distribution verified under load
- [ ] Cache hit/miss ratios under load measured
- [ ] Database query performance under load profiled
- [ ] Index effectiveness under concurrent access verified
- [ ] Deadlock detection under high concurrency tested

---

## Performance Baselines

### Latency Baselines

- [ ] **CRITICAL:** P50 latency baseline documented per endpoint
- [ ] **CRITICAL:** P95 latency baseline documented per endpoint
- [ ] **CRITICAL:** P99 latency baseline documented per endpoint
- [ ] Max latency acceptable threshold defined
- [ ] Latency baselines segmented by tenant tier
- [ ] Latency degradation threshold defined (e.g., 20% increase)

### Throughput Baselines

- [ ] **CRITICAL:** Requests per second (RPS) baseline established
- [ ] **CRITICAL:** RPS ceiling (max sustainable) documented
- [ ] RPS per tenant tier documented
- [ ] Concurrent user capacity documented
- [ ] Peak load handling capacity verified
- [ ] Sustained load duration verified (1hr, 4hr, 24hr)

### Resource Utilization Baselines

- [ ] CPU utilization baseline at target load documented
- [ ] Memory utilization baseline documented
- [ ] Disk I/O baseline documented
- [ ] Network bandwidth baseline documented
- [ ] Database connection utilization baseline documented
- [ ] Cache memory utilization baseline documented

### Baseline Documentation

- [ ] **CRITICAL:** Baseline report generated with test conditions
- [ ] Test environment specifications documented
- [ ] Test data characteristics documented
- [ ] Baseline version tagged for comparison
- [ ] Regression threshold defined (e.g., 10% degradation)

---

## Scalability Verification

### Horizontal Scaling

- [ ] **CRITICAL:** Auto-scaling triggers verified (CPU, memory, queue depth)
- [ ] **CRITICAL:** Scale-out latency measured (time to add capacity)
- [ ] Scale-in behavior verified (graceful connection drain)
- [ ] Minimum replica count maintains SLA
- [ ] Maximum replica count handles peak load
- [ ] Scaling cooldown periods configured appropriately

### Vertical Scaling

- [ ] Resource limits tested (CPU, memory per pod/instance)
- [ ] OOM behavior verified (graceful restart)
- [ ] Resource requests match actual usage patterns
- [ ] Pod/instance sizing recommendations documented

### Database Scaling

- [ ] **CRITICAL:** Read replica scaling verified
- [ ] **CRITICAL:** Connection pool scaling under load tested
- [ ] Database failover under load tested
- [ ] Sharding strategy validated (if applicable)
- [ ] Database resource limits verified

### Queue/Event Scaling

- [ ] Message queue scaling verified
- [ ] Consumer scaling matches producer rate
- [ ] Dead letter queue handling under load tested
- [ ] Event processing latency under load measured
- [ ] Queue depth alerts configured

---

## Tenant Isolation Under Load

### Noisy Neighbor Prevention

- [ ] **CRITICAL:** Single tenant cannot exhaust shared resources
- [ ] **CRITICAL:** Rate limiting per tenant enforced under load
- [ ] **CRITICAL:** Fair scheduling verified across tenants
- [ ] Resource quotas prevent tenant monopolization
- [ ] Background job isolation verified

### Performance Isolation

- [ ] **CRITICAL:** Large tenant load does not impact small tenants
- [ ] **CRITICAL:** Tenant P95 latency maintained under platform stress
- [ ] Per-tenant SLO compliance tracked under load
- [ ] Isolation breach detection alerts configured
- [ ] Tenant performance dashboard available

### Data Isolation Under Load

- [ ] **CRITICAL:** RLS policies perform correctly under concurrent load
- [ ] **CRITICAL:** No cross-tenant data leakage under stress
- [ ] Tenant context propagation verified under load
- [ ] Cache isolation maintained under concurrent access
- [ ] Session isolation verified under load

### Failure Isolation

- [ ] Single tenant failure does not cascade
- [ ] Tenant-specific circuit breakers activate correctly
- [ ] Error rate isolated to affected tenant
- [ ] Tenant recovery does not impact others

---

## Resource Limits

### Quota Enforcement Under Load

- [ ] **CRITICAL:** API rate limits enforced accurately under load
- [ ] **CRITICAL:** Storage quotas enforced under concurrent uploads
- [ ] Compute quotas throttle appropriately under load
- [ ] Connection limits enforced under high concurrency
- [ ] Bandwidth limits enforced under sustained load

### Limit Accuracy

- [ ] Rate limit accuracy within 5% under load
- [ ] Quota counters accurate under concurrent updates
- [ ] Limit reset timing accurate under load
- [ ] Burst allowance consumed correctly under spikes

### Limit Response

- [ ] 429 responses returned correctly when limits hit
- [ ] Retry-After headers included in responses
- [ ] Limit exceeded events logged
- [ ] Tenant notified of limit approach/breach
- [ ] Admin dashboard shows limit status per tenant

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
| Critical Path Testing | CRITICAL | 80% coverage | <60% coverage |
| Multi-Tenant Load Distribution | CRITICAL | Mixed workload gaps | Single tenant only tested |
| AI/Agent Workloads | CRITICAL | Partial coverage | LLM endpoints not tested |
| Data Layer Load Testing | CRITICAL | Secondary paths untested | DB not load tested |
| Latency Baselines | CRITICAL | P99 not documented | No baselines documented |
| Throughput Baselines | CRITICAL | RPS ceiling unknown | No throughput data |
| Resource Utilization | Non-critical | Partial metrics | N/A |
| Baseline Documentation | Non-critical | Incomplete report | N/A |
| Horizontal Scaling | CRITICAL | Scale timing unknown | Auto-scaling broken |
| Vertical Scaling | Non-critical | Recommendations missing | N/A |
| Database Scaling | CRITICAL | Failover untested | Connection pool exhaustion |
| Queue/Event Scaling | Non-critical | Consumer scaling untested | N/A |
| Noisy Neighbor Prevention | CRITICAL | Fair scheduling gaps | No tenant isolation |
| Performance Isolation | CRITICAL | Per-tenant SLO gaps | Cross-tenant impact |
| Data Isolation Under Load | CRITICAL | Cache isolation untested | RLS fails under load |
| Failure Isolation | Non-critical | Circuit breaker gaps | N/A |
| Quota Enforcement | CRITICAL | >5% variance | Quotas not enforced |
| Limit Accuracy | Non-critical | Minor timing variance | N/A |
| Limit Response | Non-critical | Missing headers | N/A |

---

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Engineering Lead or SRE Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If QG-LT1 fails:**

1. **Attempt 1:** Immediate remediation (target: 3-5 days)
   - Identify untested critical paths
   - Execute missing load tests
   - Document discovered baselines
   - Fix scaling configuration issues
   - Verify tenant isolation under load
   - Re-run QG-LT1 validation after fixes
   - **Lock passed categories** - do not re-test locked items

2. **Attempt 2:** Deep performance review (target: 3-5 days)
   - Engage SRE and Performance Engineering teams
   - Review infrastructure architecture against load patterns
   - Profile application bottlenecks
   - Optimize critical paths
   - Rerun load tests with fixes
   - Re-run QG-LT1 validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Engineering Leadership and SRE Lead
   - Document performance gaps with risk assessment
   - Consider architecture changes if gaps are fundamental
   - Create remediation plan with defined load targets
   - Define minimum viable performance for production
   - Schedule follow-up validation within 1 week

---

## Web Research Verification

- [ ] Search the web: "load testing best practices multi-tenant SaaS {date}" - Verify testing patterns
- [ ] Search the web: "performance baseline documentation standards {date}" - Confirm baseline approach
- [ ] Search the web: "noisy neighbor prevention load testing {date}" - Validate isolation testing
- [ ] _Source: [URL]_ citations documented for key decisions

---

## Related Patterns

Load decision criteria from pattern registry:

- **Performance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `performance-*`
- **Scaling patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `scaling-*`

---

## Related Workflows

- `bmad-bam-performance-baseline` - Baseline establishment
- `bmad-bam-auto-scaling-configuration` - Scaling setup
- `bmad-bam-load-test-design` - Load test strategy
- `bmad-bam-tenant-quota-design` - Quota configuration
- `bmad-bam-capacity-planning` - Capacity analysis

**PASS CRITERIA:** All critical paths load tested, baselines documented, isolation verified
**OWNER:** Performance Engineering Lead / SRE Lead
**REVIEWERS:** Engineering, SRE, Platform Architecture
