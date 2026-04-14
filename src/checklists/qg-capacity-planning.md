# QG-CP1: Capacity Planning Checklist

> Gate ID: QG-CP1 (Capacity Planning)
> Capacity planning MUST be verified quarterly in production.
> Gate definition: verifies capacity baselines, growth projections, and scaling thresholds.
> Workflow integration: BAM operations workflows feed into this gate.
> Executing workflow: `capacity-planning-review` (quarterly)
>
> **Operational Gate:** QG-CP1 is evaluated quarterly during production operations.
> Failures trigger capacity remediation before resource exhaustion.

## Capacity Baseline Establishment

### Compute Capacity

- [ ] CPU utilization baseline established per service
- [ ] Memory utilization baseline established per service
- [ ] Peak vs average utilization documented
- [ ] Per-tenant compute allocation tracked
- [ ] Container/pod count baseline per service
- [ ] Auto-scaling configuration documented

### Storage Capacity

- [ ] Database storage utilization tracked
- [ ] Database growth rate calculated (GB/month)
- [ ] Object storage utilization tracked
- [ ] Vector database storage per tenant tracked
- [ ] Log storage growth rate calculated
- [ ] Backup storage requirements calculated

### Network Capacity

- [ ] Bandwidth utilization baseline established
- [ ] Request rate baseline per service
- [ ] API gateway capacity documented
- [ ] CDN capacity and cache hit rates tracked
- [ ] Cross-region traffic patterns documented

### AI-Specific Capacity

- [ ] LLM API rate limits documented per provider
- [ ] Token consumption rate per tenant tier
- [ ] Embedding generation throughput tracked
- [ ] Vector search query rate baseline
- [ ] Agent concurrency limits defined
- [ ] Model inference capacity (if self-hosted)

## Growth Projection

### Tenant Growth Modeling

- [ ] Current tenant count documented
- [ ] Tenant acquisition rate projected (monthly)
- [ ] Tenant churn rate factored in
- [ ] Per-tenant resource consumption modeled
- [ ] Tier distribution projection (Free/Pro/Enterprise)
- [ ] Enterprise tenant onboarding pipeline visible

### Usage Growth Modeling

- [ ] Request rate growth projected
- [ ] Storage growth projected (6/12 month)
- [ ] AI usage growth projected (token consumption)
- [ ] Peak load growth projected
- [ ] Seasonal patterns documented
- [ ] Growth confidence intervals defined

### Capacity Runway

- [ ] Compute runway calculated (months until exhaustion)
- [ ] Storage runway calculated
- [ ] Network runway calculated
- [ ] LLM API quota runway calculated
- [ ] Runway warnings configured (3/6 month ahead)
- [ ] Critical runway thresholds defined (<2 months)

## Scaling Thresholds

### Auto-Scaling Configuration

- [ ] Horizontal pod autoscaler (HPA) configured
- [ ] Vertical pod autoscaler (VPA) configured (if applicable)
- [ ] Scale-up thresholds defined (CPU >70%, Memory >80%)
- [ ] Scale-down thresholds defined
- [ ] Scaling cooldown periods configured
- [ ] Maximum replica limits set

### Database Scaling

- [ ] Read replica auto-scaling configured
- [ ] Connection pool scaling configured
- [ ] Storage auto-expansion enabled
- [ ] IOPS scaling thresholds defined
- [ ] Failover capacity verified

### AI Service Scaling

- [ ] LLM provider fallback configured
- [ ] Rate limit buffer maintained (20% headroom)
- [ ] Model routing for load distribution
- [ ] Embedding service scaling configured
- [ ] Vector database scaling thresholds

## Resource Allocation Verification

### Cost vs Capacity Balance

- [ ] Current monthly infrastructure cost documented
- [ ] Cost per tenant calculated
- [ ] Cost per request/transaction calculated
- [ ] Over-provisioning identified and quantified
- [ ] Under-provisioning risks identified
- [ ] Right-sizing recommendations documented

### Tenant Tier Resource Allocation

- [ ] Free tier resource limits enforced
- [ ] Pro tier resource allocation verified
- [ ] Enterprise tier resource guarantees met
- [ ] Noisy neighbor prevention verified
- [ ] Fair-share scheduling active

### Reserved Capacity

- [ ] Reserved instances/committed use documented
- [ ] Reserved capacity utilization tracked
- [ ] Savings vs on-demand calculated
- [ ] Reserved capacity renewal timeline
- [ ] Spot/preemptible usage for non-critical workloads

## Alerting and Monitoring

### Capacity Alerts

- [ ] 70% capacity utilization warning alert
- [ ] 85% capacity utilization critical alert
- [ ] 95% capacity utilization emergency alert
- [ ] Runway <3 months warning alert
- [ ] Runway <1 month critical alert
- [ ] Sudden growth spike detection

### Capacity Dashboard

- [ ] Real-time capacity utilization visible
- [ ] Trend analysis dashboard available
- [ ] Forecast visualization operational
- [ ] Per-tenant capacity view (for billing)
- [ ] Executive capacity summary

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns {date}" - Confirm validation approach
- [ ] _Source: [URL]_ citations documented for key decisions

## Related Patterns

Load decision criteria from pattern registry:

- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `operations-*`
- **Reliability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `reliability-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "capacity planning multi-tenant SaaS {date}"
- Search: "cloud capacity forecasting best practices {date}"
- Search: "LLM API capacity planning {date}"
- Search: "Kubernetes autoscaling production {date}"

## Gate Decision

| Outcome | Criteria |
|---------|----------|
| **PASS** | All categories GREEN — Continue quarterly review |
| **CONDITIONAL** | Any CRITICAL category YELLOW — Remediate within 30 days, proceed with mitigation plan |
| **FAIL** | Any CRITICAL category RED — Immediate capacity action required, block release |
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

| Category                    | Classification | CONDITIONAL Threshold | FAIL Threshold |
| --------------------------- | -------------- | --------------------- | -------------- |
| Capacity Baseline           | CRITICAL       | Incomplete baseline | No baseline |
| Compute Capacity            | CRITICAL       | Runway <6 months  | Runway <2 months   |
| Storage Capacity            | CRITICAL       | Runway <6 months  | Runway <2 months   |
| AI-Specific Capacity        | CRITICAL       | Rate limit <30% headroom | Rate limit hit |
| Growth Projection           | CRITICAL       | No projection     | Projection outdated |
| Scaling Thresholds          | CRITICAL       | Thresholds undefined | Scaling broken |
| Resource Allocation         | Non-critical   | Over-provisioned  | Under-provisioned  |
| Cost vs Capacity            | Non-critical   | Cost inefficient  | Budget exceeded    |
| Alerting and Monitoring     | CRITICAL       | Alerts incomplete | No alerts          |

## Recovery Protocol

**If QG-CP1 triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Immediate capacity action (target: 1 week)
   - Identify capacity constraints approaching limits
   - Request additional cloud resources (compute, storage)
   - Increase LLM API rate limits with providers
   - Enable/adjust auto-scaling configurations
   - Update capacity baselines with current data
   - Re-evaluate gate status after provisioning
   - **Lock passed categories**

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

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Compute Capacity | Scale up pods, add nodes | Runway <2 months |
| Storage Capacity | Expand storage, archive old data | Storage >90% |
| Network Capacity | Increase bandwidth, optimize CDN | Latency SLO breach |
| AI-Specific Capacity | Increase rate limits, add providers | Rate limit hit |
| Growth Projection | Update model with current data | Projection >3 months old |
| Scaling Thresholds | Configure/fix auto-scaling | Manual scaling required |
| Alerting | Configure missing alerts | No early warning |

## Related Workflows

- `bmad-bam-capacity-planning-review` - Quarterly capacity review
- `bmad-bam-tenant-aware-observability` - Resource monitoring
- `bmad-bam-cost-optimization-review` - Cost efficiency review

**PASS CRITERIA:** All capacity runways >6 months, scaling operational
**OWNER:** SRE / Platform Engineering
**REVIEWERS:** Finance, Engineering Leadership
