---
name: qg-cp1-capacity-planning
description: Capacity planning gate - verifies capacity baselines, growth projections, and tenant quota management
module: bam
tags: [capacity, quality-gate, multi-tenant, scaling, resources]
version: 2.0.0
---

# QG-CP1: Capacity Planning Gate Checklist

> **Gate ID:** QG-CP1 (Capacity Planning)
> **Definition:** Capacity planning MUST be verified quarterly in production.
> **Scope:** Covers capacity baselines, growth projections, scaling thresholds, and tenant quota management.
> **Recovery:** Gate failure requires capacity remediation before resource exhaustion.

**Workflow:** bmad-bam-capacity-planning-review, bmad-bam-tenant-aware-observability
**Prerequisites:** QG-LT1 (Load Testing), evaluated quarterly during production operations

---

## Purpose

The Capacity Planning Gate (QG-CP1) validates resource management and scaling readiness. This gate ensures:

1. **Capacity baselines** are established for compute, storage, network, and AI services
2. **Growth projections** are modeled with runway calculations
3. **Scaling thresholds** are configured for automatic response
4. **Tenant quotas** are enforced to prevent resource monopolization
5. **Alerting** provides early warning before capacity exhaustion

Passing QG-CP1 ensures the platform can grow sustainably without service degradation.

---

## Capacity Baseline Establishment

### Compute Capacity

- [ ] **CRITICAL:** CPU utilization baseline established per service
- [ ] **CRITICAL:** Memory utilization baseline established per service
- [ ] Peak vs average utilization documented
- [ ] Per-tenant compute allocation tracked
- [ ] Container/pod count baseline per service
- [ ] Auto-scaling configuration documented

### Storage Capacity

- [ ] **CRITICAL:** Database storage utilization tracked
- [ ] **CRITICAL:** Database growth rate calculated (GB/month)
- [ ] Object storage utilization tracked
- [ ] Vector database storage per tenant tracked
- [ ] Log storage growth rate calculated
- [ ] Backup storage requirements calculated

### Network Capacity

- [ ] **CRITICAL:** Bandwidth utilization baseline established
- [ ] Request rate baseline per service
- [ ] API gateway capacity documented
- [ ] CDN capacity and cache hit rates tracked
- [ ] Cross-region traffic patterns documented

### AI-Specific Capacity

- [ ] **CRITICAL:** LLM API rate limits documented per provider
- [ ] **CRITICAL:** Token consumption rate per tenant tier
- [ ] Embedding generation throughput tracked
- [ ] Vector search query rate baseline
- [ ] Agent concurrency limits defined
- [ ] Model inference capacity (if self-hosted)

---

## Growth Projection

### Tenant Growth Modeling

- [ ] **CRITICAL:** Current tenant count documented
- [ ] **CRITICAL:** Tenant acquisition rate projected (monthly)
- [ ] Tenant churn rate factored in
- [ ] Per-tenant resource consumption modeled
- [ ] Tier distribution projection (Free/Pro/Enterprise)
- [ ] Enterprise tenant onboarding pipeline visible

### Usage Growth Modeling

- [ ] **CRITICAL:** Request rate growth projected
- [ ] **CRITICAL:** Storage growth projected (6/12 month)
- [ ] AI usage growth projected (token consumption)
- [ ] Peak load growth projected
- [ ] Seasonal patterns documented
- [ ] Growth confidence intervals defined

### Capacity Runway

- [ ] **CRITICAL:** Compute runway calculated (months until exhaustion)
- [ ] **CRITICAL:** Storage runway calculated
- [ ] **CRITICAL:** Network runway calculated
- [ ] **CRITICAL:** LLM API quota runway calculated
- [ ] **CRITICAL:** Runway warnings configured (3/6 month ahead)
- [ ] Critical runway thresholds defined (<2 months)

---

## Scaling Thresholds

### Auto-Scaling Configuration

- [ ] **CRITICAL:** Horizontal pod autoscaler (HPA) configured
- [ ] **CRITICAL:** Scale-up thresholds defined (CPU >70%, Memory >80%)
- [ ] Vertical pod autoscaler (VPA) configured (if applicable)
- [ ] Scale-down thresholds defined
- [ ] Scaling cooldown periods configured
- [ ] Maximum replica limits set

### Database Scaling

- [ ] **CRITICAL:** Read replica auto-scaling configured
- [ ] **CRITICAL:** Connection pool scaling configured
- [ ] Storage auto-expansion enabled
- [ ] IOPS scaling thresholds defined
- [ ] Failover capacity verified

### AI Service Scaling

- [ ] **CRITICAL:** LLM provider fallback configured
- [ ] **CRITICAL:** Rate limit buffer maintained (20% headroom)
- [ ] Model routing for load distribution
- [ ] Embedding service scaling configured
- [ ] Vector database scaling thresholds

---

## Tenant Resource Management

### Tenant Tier Resource Allocation

- [ ] **CRITICAL:** Free tier resource limits enforced
- [ ] **CRITICAL:** Pro tier resource allocation verified
- [ ] **CRITICAL:** Enterprise tier resource guarantees met
- [ ] Noisy neighbor prevention verified
- [ ] Fair-share scheduling active

### Per-Tenant Capacity Tracking

- [ ] **CRITICAL:** Per-tenant resource usage tracked
- [ ] Per-tenant quota utilization dashboards
- [ ] Tenant approaching limit alerts configured
- [ ] Over-quota tenant handling defined
- [ ] Tenant capacity upgrade path documented

### Cost vs Capacity Balance

- [ ] Current monthly infrastructure cost documented
- [ ] Cost per tenant calculated
- [ ] Cost per request/transaction calculated
- [ ] Over-provisioning identified and quantified
- [ ] Under-provisioning risks identified
- [ ] Right-sizing recommendations documented

### Reserved Capacity

- [ ] Reserved instances/committed use documented
- [ ] Reserved capacity utilization tracked
- [ ] Savings vs on-demand calculated
- [ ] Reserved capacity renewal timeline
- [ ] Spot/preemptible usage for non-critical workloads

---

## Alerting and Monitoring

### Capacity Alerts

- [ ] **CRITICAL:** 70% capacity utilization warning alert
- [ ] **CRITICAL:** 85% capacity utilization critical alert
- [ ] **CRITICAL:** 95% capacity utilization emergency alert
- [ ] **CRITICAL:** Runway <3 months warning alert
- [ ] **CRITICAL:** Runway <1 month critical alert
- [ ] Sudden growth spike detection

### Capacity Dashboard

- [ ] **CRITICAL:** Real-time capacity utilization visible
- [ ] Trend analysis dashboard available
- [ ] Forecast visualization operational
- [ ] Per-tenant capacity view (for billing)
- [ ] Executive capacity summary

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All capacity runways >6 months, scaling operational |
| **CONDITIONAL** | Any CRITICAL category at warning level - remediate within 30 days |
| **FAIL** | Any CRITICAL category at critical level - immediate capacity action |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Compute Capacity Baseline | CRITICAL | Incomplete baseline | No baseline |
| Storage Capacity Baseline | CRITICAL | Incomplete baseline | No baseline |
| AI-Specific Capacity | CRITICAL | Rate limit <30% headroom | Rate limit hit |
| Growth Projection | CRITICAL | Projection >3 months old | No projection |
| Capacity Runway | CRITICAL | Runway <6 months | Runway <2 months |
| Auto-Scaling Configuration | CRITICAL | Thresholds undefined | Scaling broken |
| Database Scaling | CRITICAL | Manual scaling only | No scaling |
| AI Service Scaling | CRITICAL | No provider fallback | No headroom |
| Tenant Tier Allocation | CRITICAL | Limits not enforced | No limits |
| Per-Tenant Tracking | CRITICAL | Tracking incomplete | No tracking |
| Cost vs Capacity | Non-critical | Cost inefficient | N/A |
| Reserved Capacity | Non-critical | Underutilized | N/A |
| Capacity Alerts | CRITICAL | Alerts incomplete | No alerts |
| Capacity Dashboard | Non-critical | Partial visibility | N/A |

---

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (VP Engineering or Finance)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If QG-CP1 fails:**

1. **Attempt 1:** Immediate capacity action (target: 1 week)
   - Identify capacity constraints approaching limits
   - Request additional cloud resources (compute, storage)
   - Increase LLM API rate limits with providers
   - Enable/adjust auto-scaling configurations
   - Update capacity baselines with current data
   - Re-evaluate gate status after provisioning
   - **Lock passed categories** - do not re-test locked items

2. **Attempt 2:** Capacity optimization sprint (target: 2 weeks)
   - Engage SRE and Platform teams
   - Analyze resource utilization efficiency
   - Identify cost optimization opportunities
   - Implement right-sizing recommendations
   - Update growth projections with new data
   - Configure additional capacity alerts
   - Re-evaluate gate status after optimization
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to VP Engineering and Finance
   - Document capacity emergency with impact assessment
   - Request emergency budget for capacity expansion
   - Consider tenant admission controls if at hard limits
   - Engage cloud provider for enterprise support
   - Create capacity roadmap with executive sign-off
   - Schedule weekly capacity reviews until resolved

---

## Web Research Verification

- [ ] Search the web: "capacity planning multi-tenant SaaS {date}" - Verify capacity patterns
- [ ] Search the web: "cloud capacity forecasting best practices {date}" - Confirm forecasting approach
- [ ] Search the web: "LLM API capacity planning {date}" - Validate AI capacity management
- [ ] _Source: [URL]_ citations documented for key decisions

---

## Related Patterns

Load decision criteria from pattern registry:

- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `operations-*`
- **Scaling patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` filter by category: `scaling-*`

---

## Related Workflows

- `bmad-bam-capacity-planning-review` - Quarterly capacity review
- `bmad-bam-tenant-aware-observability` - Resource monitoring
- `bmad-bam-cost-optimization-review` - Cost efficiency review
- `bmad-bam-auto-scaling-configuration` - Scaling setup
- `bmad-bam-tenant-quota-design` - Tenant quota management

**PASS CRITERIA:** All capacity runways >6 months, scaling operational, alerts configured
**OWNER:** SRE Lead / Platform Engineering Lead
**REVIEWERS:** Finance, Engineering Leadership

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | V2 BMAD format with full sections |
| 1.0.0 | - | Platform Architect | Initial V1 checklist |
