# QG-PR1: Performance Review Checklist

> Gate ID: QG-PR1 (Performance Review)
> Performance review MUST be completed quarterly (minimum) or before major releases.
> Gate definition: comprehensive performance baseline assessment and trend analysis.
> Workflow integration: Scheduled quarterly or triggered by performance concerns.
> Executing workflow: `performance-review-procedure` (SRE/Platform team led)
>
> **Performance Scope:** This gate covers baseline metrics comparison, capacity planning,
> SLA compliance verification, tenant-specific analysis, cost efficiency, and
> optimization recommendations. Benchmark references establish targets.
> Frequency: Quarterly (standard), Monthly (high-growth phases), Pre-release.

## Benchmark References

### Platform Performance Targets

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| API Latency (p50) | < 50ms | > 75ms | > 100ms |
| API Latency (p95) | < 200ms | > 300ms | > 500ms |
| API Latency (p99) | < 500ms | > 750ms | > 1000ms |
| Error Rate | < 0.1% | > 0.5% | > 1% |
| Throughput | > baseline | < baseline -10% | < baseline -25% |
| Agent Response (p95) | < 5s | > 7s | > 10s |
| Database Query (p95) | < 50ms | > 100ms | > 200ms |

### Tenant Tier SLAs

| Tier | Availability | Latency (p95) | Support Response |
|------|--------------|---------------|------------------|
| Free | 99.0% | < 500ms | Best effort |
| Pro | 99.5% | < 300ms | < 24 hours |
| Enterprise | 99.9% | < 200ms | < 4 hours |

## Baseline Comparison

### Latency Analysis

- [ ] **CRITICAL:** Current p50 latency within target
- [ ] **CRITICAL:** Current p95 latency within target
- [ ] Current p99 latency documented
- [ ] Latency trend compared to previous period
- [ ] Latency by endpoint/service documented

### Throughput Analysis

- [ ] **CRITICAL:** Current throughput meets baseline
- [ ] Peak throughput capacity documented
- [ ] Throughput trend compared to previous period
- [ ] Throughput by service/module documented

### Error Rate Analysis

- [ ] **CRITICAL:** Error rate within target (< 0.1%)
- [ ] Error categories documented (4xx vs 5xx)
- [ ] Error trend compared to previous period
- [ ] Top error sources identified

### Baseline Metrics Table

| Metric | Previous Period | Current Period | Change | Status |
|--------|-----------------|----------------|--------|--------|
| API Latency (p50) | | | | |
| API Latency (p95) | | | | |
| API Latency (p99) | | | | |
| Error Rate | | | | |
| Throughput (req/s) | | | | |
| Agent Response (p95) | | | | |
| DB Query (p95) | | | | |

## Capacity Thresholds

### Current Utilization

- [ ] **CRITICAL:** CPU utilization documented (current vs limit)
- [ ] **CRITICAL:** Memory utilization documented (current vs limit)
- [ ] Storage utilization documented (current vs limit)
- [ ] Database connection pool utilization documented
- [ ] Cache hit rate documented

### Capacity Status

| Resource | Current | Limit | Utilization | Runway |
|----------|---------|-------|-------------|--------|
| CPU | | | | |
| Memory | | | | |
| Storage | | | | |
| DB Connections | | | | |
| Cache Memory | | | | |

### Scaling Triggers

- [ ] Auto-scaling policies documented
- [ ] Scaling events from review period analyzed
- [ ] **CRITICAL:** Runway to capacity limit > 3 months (or scaling plan exists)
- [ ] Burst capacity tested

### Trend Analysis Requirements

- [ ] 30-day trend charts generated
- [ ] 90-day trend analysis completed
- [ ] Growth rate calculated
- [ ] Capacity planning recommendations documented

## SLA Compliance

### Per-Tier SLA Status

#### Free Tier

- [ ] Availability met (≥ 99.0%)
- [ ] Latency SLA met (p95 < 500ms)
- [ ] Documented exceptions (if any)

#### Pro Tier

- [ ] **CRITICAL:** Availability met (≥ 99.5%)
- [ ] **CRITICAL:** Latency SLA met (p95 < 300ms)
- [ ] Support response SLA met (< 24 hours)
- [ ] Documented exceptions (if any)

#### Enterprise Tier

- [ ] **CRITICAL:** Availability met (≥ 99.9%)
- [ ] **CRITICAL:** Latency SLA met (p95 < 200ms)
- [ ] Support response SLA met (< 4 hours)
- [ ] Custom SLA terms verified (if applicable)
- [ ] Documented exceptions (if any)

### SLA Summary Table

| Tier | Availability Target | Availability Actual | Latency Target | Latency Actual | Status |
|------|---------------------|---------------------|----------------|----------------|--------|
| Free | 99.0% | | < 500ms | | |
| Pro | 99.5% | | < 300ms | | |
| Enterprise | 99.9% | | < 200ms | | |

## Tenant-Specific Performance

### Noisy Neighbor Analysis

- [ ] **CRITICAL:** No noisy neighbor incidents in review period
- [ ] Resource consumption by tenant analyzed
- [ ] Top resource consumers identified
- [ ] Tenant isolation effectiveness verified
- [ ] Rate limiting effectiveness verified

### Tenant Performance Distribution

| Metric | p50 (across tenants) | p95 (across tenants) | Outliers |
|--------|----------------------|----------------------|----------|
| API Latency | | | |
| Agent Response | | | |
| Storage Usage | | | |
| Request Volume | | | |

### Per-Tenant Analysis (Top 10 by usage)

- [ ] Performance metrics reviewed for top tenants
- [ ] Anomalies investigated
- [ ] Capacity impact assessed
- [ ] Tenant-specific optimizations identified (if needed)

## Cost Efficiency

### Cost Metrics

- [ ] Cost per request calculated
- [ ] Cost per tenant calculated
- [ ] Cost per tier calculated
- [ ] AI/LLM costs tracked per tenant
- [ ] Infrastructure cost trend documented

### Cost Efficiency Table

| Metric | Previous Period | Current Period | Change | Target |
|--------|-----------------|----------------|--------|--------|
| Cost per 1K requests | | | | |
| Cost per tenant (avg) | | | | |
| LLM cost per request | | | | |
| Infrastructure cost | | | | |
| Cost efficiency ratio | | | | |

### Cost Optimization Opportunities

- [ ] Underutilized resources identified
- [ ] Reserved capacity opportunities analyzed
- [ ] Caching effectiveness reviewed
- [ ] LLM prompt optimization opportunities identified
- [ ] Database query optimization opportunities identified

## Optimization Recommendations

### Immediate Actions (< 30 days)

| Recommendation | Impact | Effort | Priority |
|----------------|--------|--------|----------|
| | | | |
| | | | |
| | | | |

### Medium-Term Actions (30-90 days)

| Recommendation | Impact | Effort | Priority |
|----------------|--------|--------|----------|
| | | | |
| | | | |
| | | | |

### Long-Term Actions (90+ days)

| Recommendation | Impact | Effort | Priority |
|----------------|--------|--------|----------|
| | | | |
| | | | |
| | | | |

### Action Items

- [ ] Immediate actions assigned with owners
- [ ] Medium-term actions scheduled for backlog
- [ ] Long-term actions documented for roadmap review
- [ ] Next review date scheduled

## Performance Review Summary

- [ ] All metrics collected and documented
- [ ] Baseline comparison completed
- [ ] Capacity assessment completed
- [ ] SLA compliance verified
- [ ] Tenant analysis completed
- [ ] Cost efficiency reviewed
- [ ] Recommendations documented
- [ ] Executive summary prepared

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL metrics within targets, SLAs met, capacity runway adequate |
| **CONDITIONAL** | All CRITICAL metrics acceptable, minor SLA misses documented with remediation plan |
| **FAIL** | Any CRITICAL metric in critical range OR SLA breach without remediation — escalate |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Baseline Comparison | CRITICAL | Metrics in warning range | Metrics in critical range |
| Capacity Thresholds | CRITICAL | Runway 1-3 months | Runway <1 month |
| SLA Compliance (Pro/Enterprise) | CRITICAL | Minor SLA miss documented | SLA breach without plan |
| SLA Compliance (Free) | Non-critical | Best effort not met | N/A |
| Tenant-Specific Performance | CRITICAL | Isolated noisy neighbor | Multiple noisy neighbors |
| Cost Efficiency | Non-critical | Cost above target | N/A |
| Optimization Recommendations | Non-critical | Recommendations delayed | N/A |

## Trend Analysis Requirements

1. **30-Day Trend:** Daily metrics aggregation with anomaly detection
2. **90-Day Trend:** Weekly metrics aggregation with growth projection
3. **Year-over-Year:** Quarterly comparison for seasonal patterns
4. **Capacity Projection:** Growth rate extrapolation for planning

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Immediate performance remediation (target: 1-2 days)
   - Identify metrics in critical or warning range
   - Determine if emergency scaling needed
   - Execute quick-win optimizations
   - Verify metrics improvement
   - Re-evaluate gate status
   - **Lock passed categories**

2. **Attempt 2:** Deep performance investigation (target: 1 week)
   - Root cause analysis for performance degradation
   - Engage SRE and platform teams
   - Execute optimization or scaling actions
   - Implement monitoring improvements
   - Re-evaluate gate status
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to VP Engineering
   - Document performance blockers with business impact
   - Conduct architecture review for systemic issues
   - Update baseline with new performance characteristics
   - Define capacity investment timeline

## Web Research Verification

- [ ] Search the web: "SaaS performance benchmarking best practices {date}" - Verify benchmark approaches
- [ ] Search the web: "multi-tenant noisy neighbor prevention patterns {date}" - Confirm isolation patterns are current
- [ ] Search the web: "cloud cost optimization SaaS platforms {date}" - Verify cost efficiency strategies
- [ ] _Source: [URL]_ citations documented for key performance review decisions

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Performance monitoring setup
- `bmad-bam-capacity-planning-review` - Capacity analysis
- `bmad-bam-cost-optimization-review` - Cost efficiency improvements
- `bmad-bam-auto-scaling-configuration` - Auto-scaling configuration

**PASS CRITERIA:** All CRITICAL metrics within targets, comprehensive analysis completed
**OWNER:** SRE/Platform Team Lead
**REVIEWERS:** Engineering Manager, VP Engineering (for capacity decisions)
