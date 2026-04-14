# QG-LT1: Load Testing Checklist

> Gate ID: QG-LT1 (Load Testing)
> Load testing completion MUST be verified before production deployment.
> Gate definition: verifies load test coverage, performance baselines, scalability, and tenant isolation under load.
> Workflow integration: BAM performance and quality workflows feed into this gate.
> Executing workflow: `performance-baseline` (testing phase)
>
> **Prerequisite Gate:** QG-LT1 must pass before QG-P1 (Production Readiness)
> for any production deployment.

## Load Test Coverage

### Critical Path Testing

- [ ] Authentication flows load tested (login, token refresh)
- [ ] Core API endpoints load tested (CRUD operations)
- [ ] Search/query endpoints load tested with realistic data
- [ ] File upload/download paths load tested
- [ ] Webhook delivery under load verified
- [ ] Background job processing under load verified
- [ ] Real-time features load tested (WebSocket, SSE)
- [ ] Integration endpoints load tested (external APIs)

### Multi-Tenant Load Distribution

- [ ] Load distributed across multiple tenant sizes (small, medium, large)
- [ ] Concurrent tenant operations tested
- [ ] Mixed workload scenarios tested (read-heavy, write-heavy, balanced)
- [ ] Tenant onboarding under platform load tested
- [ ] Cross-tenant queries (admin) load tested
- [ ] Tenant isolation verified under concurrent load

### AI/Agent Workloads

- [ ] LLM inference endpoints load tested
- [ ] Agent orchestration under load verified
- [ ] RAG retrieval performance under load measured
- [ ] Tool execution concurrency tested
- [ ] Agent memory operations under load verified
- [ ] Model switching fallback under load tested

### Data Layer Load Testing

- [ ] Database connection pool exhaustion tested
- [ ] Read replica distribution verified under load
- [ ] Cache hit/miss ratios under load measured
- [ ] Database query performance under load profiled
- [ ] Index effectiveness under concurrent access verified
- [ ] Deadlock detection under high concurrency tested

## Performance Baselines

### Latency Baselines

- [ ] P50 latency baseline documented per endpoint
- [ ] P95 latency baseline documented per endpoint
- [ ] P99 latency baseline documented per endpoint
- [ ] Max latency acceptable threshold defined
- [ ] Latency baselines segmented by tenant tier
- [ ] Latency degradation threshold defined (e.g., 20% increase)

### Throughput Baselines

- [ ] Requests per second (RPS) baseline established
- [ ] RPS ceiling (max sustainable) documented
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

- [ ] Baseline report generated with test conditions
- [ ] Test environment specifications documented
- [ ] Test data characteristics documented
- [ ] Baseline version tagged for comparison
- [ ] Regression threshold defined (e.g., 10% degradation)

## Scalability Verification

### Horizontal Scaling

- [ ] Auto-scaling triggers verified (CPU, memory, queue depth)
- [ ] Scale-out latency measured (time to add capacity)
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

- [ ] Read replica scaling verified
- [ ] Connection pool scaling under load tested
- [ ] Database failover under load tested
- [ ] Sharding strategy validated (if applicable)
- [ ] Database resource limits verified

### Queue/Event Scaling

- [ ] Message queue scaling verified
- [ ] Consumer scaling matches producer rate
- [ ] Dead letter queue handling under load tested
- [ ] Event processing latency under load measured
- [ ] Queue depth alerts configured

## Tenant Isolation Under Load

### Noisy Neighbor Prevention

- [ ] Single tenant cannot exhaust shared resources
- [ ] Rate limiting per tenant enforced under load
- [ ] Fair scheduling verified across tenants
- [ ] Resource quotas prevent tenant monopolization
- [ ] Background job isolation verified

### Performance Isolation

- [ ] Large tenant load does not impact small tenants
- [ ] Tenant P95 latency maintained under platform stress
- [ ] Per-tenant SLO compliance tracked under load
- [ ] Isolation breach detection alerts configured
- [ ] Tenant performance dashboard available

### Data Isolation Under Load

- [ ] RLS policies perform correctly under concurrent load
- [ ] No cross-tenant data leakage under stress
- [ ] Tenant context propagation verified under load
- [ ] Cache isolation maintained under concurrent access
- [ ] Session isolation verified under load

### Failure Isolation

- [ ] Single tenant failure does not cascade
- [ ] Tenant-specific circuit breakers activate correctly
- [ ] Error rate isolated to affected tenant
- [ ] Tenant recovery does not impact others

## Resource Limits

### Quota Enforcement Under Load

- [ ] API rate limits enforced accurately under load
- [ ] Storage quotas enforced under concurrent uploads
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

## Web Research Verification

- [ ] Search the web: "load testing best practices multi-tenant SaaS {date}" - Verify testing patterns
- [ ] Search the web: "performance baseline documentation standards {date}" - Confirm baseline approach
- [ ] _Source: [URL]_ citations documented for key decisions

## Related Patterns

Load decision criteria from pattern registry:

- **Performance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `performance-*`
- **Scaling patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `scaling-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "load testing multi-tenant applications {date}"
- Search: "performance baseline p50 p95 p99 SaaS {date}"
- Search: "auto-scaling Kubernetes load testing {date}"
- Search: "noisy neighbor prevention load testing {date}"

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
3. Obtain stakeholder sign-off (Engineering Lead or SRE Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category                       | Classification | CONDITIONAL Threshold | FAIL Threshold |
| ------------------------------ | -------------- | --------------------- | -------------- |
| Critical Path Testing          | CRITICAL       | 80% coverage | <60% coverage |
| Multi-Tenant Load Distribution | CRITICAL       | Mixed workload gaps | Single tenant only tested |
| AI/Agent Workloads             | CRITICAL       | Partial coverage | LLM endpoints not tested |
| Data Layer Load Testing        | CRITICAL       | Secondary paths untested | DB not load tested |
| Latency Baselines              | CRITICAL       | P99 not documented | No baselines documented |
| Throughput Baselines           | CRITICAL       | RPS ceiling unknown | No throughput data |
| Resource Utilization Baselines | Non-critical   | Partial metrics | N/A |
| Baseline Documentation         | Non-critical   | Incomplete report | N/A |
| Horizontal Scaling             | CRITICAL       | Scale timing unknown | Auto-scaling broken |
| Vertical Scaling               | Non-critical   | Recommendations missing | N/A |
| Database Scaling               | CRITICAL       | Failover untested | Connection pool exhaustion |
| Queue/Event Scaling            | Non-critical   | Consumer scaling untested | N/A |
| Noisy Neighbor Prevention      | CRITICAL       | Fair scheduling gaps | No tenant isolation |
| Performance Isolation          | CRITICAL       | Per-tenant SLO gaps | Cross-tenant impact verified |
| Data Isolation Under Load      | CRITICAL       | Cache isolation untested | RLS fails under load |
| Failure Isolation              | Non-critical   | Circuit breaker gaps | N/A |
| Quota Enforcement Under Load   | CRITICAL       | >5% variance | Quotas not enforced |
| Limit Accuracy                 | Non-critical   | Minor timing variance | N/A |
| Limit Response                 | Non-critical   | Missing headers | N/A |

## Recovery Protocol

**If QG-LT1 fails:**

1. **Attempt 1:** Immediate remediation (target: 3-5 days)
   - Identify untested critical paths
   - Execute missing load tests
   - Document discovered baselines
   - Fix scaling configuration issues
   - Verify tenant isolation under load
   - Re-run QG-LT1 validation after fixes
   - **Lock passed categories** — do not re-test locked items

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

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Critical Path Testing | Add missing test scenarios | <60% path coverage |
| Latency Baselines | Run benchmark suite, document results | No baselines exist |
| Throughput Baselines | Establish RPS ceiling tests | Capacity unknown |
| Horizontal Scaling | Fix auto-scaling configuration | Auto-scaling broken |
| Tenant Isolation | Add isolation tests, fix leaks | Cross-tenant impact |
| Quota Enforcement | Fix rate limiting, verify accuracy | Quotas not enforced |

## Related Workflows

- `bmad-bam-performance-baseline` - Baseline establishment
- `bmad-bam-auto-scaling-configuration` - Scaling setup
- `bmad-bam-load-test-design` - Load test strategy
- `bmad-bam-tenant-quota-design` - Quota configuration
- `bmad-bam-capacity-planning` - Capacity analysis

**PASS CRITERIA:** All critical paths load tested, baselines documented, isolation verified
**OWNER:** Performance Engineering Lead / SRE Lead
**REVIEWERS:** Engineering, SRE, Platform Architecture
