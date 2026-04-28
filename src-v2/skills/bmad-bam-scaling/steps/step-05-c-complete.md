# Step 05: Compile Scaling Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Capacity planning, cost optimization, runbooks, final artifact
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: Consolidate all scaling designs from Steps 1-4
- 🚫 Do NOT: Revisit earlier design decisions unless explicitly requested
- 🔍 Use web search: Verify capacity planning against cloud provider best practices

---

## Purpose

Compile the complete scaling design document including capacity planning guidelines, cost optimization strategies, operational runbooks, and output the final artifact to the planning artifacts folder.

---

## Prerequisites

- Steps 01-04 complete
- All scaling components designed (horizontal, database, tenant-aware)
- **Load template:** `{project-root}/_bmad/bam/data/templates/scaling-design.md`

**Web Research (Required):**

Search the web: "cloud capacity planning multi-tenant SaaS {date}"
Search the web: "Kubernetes cost optimization autoscaling best practices {date}"
Search the web: "SRE scaling runbook templates {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Capacity Planning Guidelines

**Growth Projection Framework:**

| Timeframe | Planning Approach | Buffer |
|-----------|-------------------|--------|
| 0-3 months | Current + 20% | Reactive |
| 3-12 months | Trend-based | 50% headroom |
| 1-3 years | Strategic | 100% headroom |

**Capacity Dimensions:**

| Dimension | Metric | Planning Trigger |
|-----------|--------|------------------|
| Compute | CPU utilization | > 60% sustained |
| Memory | Memory utilization | > 70% sustained |
| Storage | Disk utilization | > 75% used |
| Network | Bandwidth utilization | > 50% sustained |
| Database | Connection utilization | > 80% pool used |

**Tenant Growth Modeling:**

| Tier | Expected Growth Rate | Capacity Impact |
|------|---------------------|-----------------|
| Free | 20% monthly | Low per tenant |
| Pro | 5% monthly | Medium per tenant |
| Enterprise | 2% monthly | High per tenant |

**Capacity Review Cadence:**

| Review Type | Frequency | Participants |
|-------------|-----------|--------------|
| Operational | Weekly | SRE team |
| Planning | Monthly | Engineering leads |
| Strategic | Quarterly | Leadership |

### 2. Cost Optimization Strategies

**Resource Right-Sizing:**

| Resource | Optimization | Expected Savings |
|----------|--------------|------------------|
| Compute | Auto-scaling + spot | 40-60% |
| Storage | Tiered storage | 30-50% |
| Database | Reserved instances | 30-40% |
| Cache | Right-size + TTL | 20-30% |

**Cost Allocation by Tier:**

| Cost Center | Free Allocation | Pro Allocation | Enterprise Allocation |
|-------------|-----------------|----------------|----------------------|
| Compute | Shared pool | Dedicated portion | Full dedicated |
| Database | Shared RLS | Shared schema | Dedicated instance |
| Support | Community | Business hours | 24/7 SLA |
| Monitoring | Basic | Standard | Custom |

**Cost Controls:**

| Control | Implementation | Alert Threshold |
|---------|----------------|-----------------|
| Budget alerts | Per-tier budgets | 80% of monthly |
| Anomaly detection | Usage spike detection | 3x normal |
| Chargeback | Per-tenant metering | N/A |
| Optimization reports | Weekly automated | > 10% waste |

**Reserved vs On-Demand Strategy:**

| Workload Type | Reservation Strategy | Commitment |
|---------------|---------------------|------------|
| Baseline | 1-year reserved | 70% of baseline |
| Growth buffer | 3-year reserved | 50% of projected |
| Burst | On-demand/spot | Remaining |

### 3. Scaling Runbooks

**Scale-Up Runbook:**

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Confirm scaling trigger | Check metrics dashboard |
| 2 | Increase desired replicas | Deployment status |
| 3 | Verify new instances healthy | Health check passing |
| 4 | Confirm load distribution | Traffic split metrics |
| 5 | Update capacity tracking | Capacity document |

**Scale-Down Runbook:**

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Confirm low utilization | Sustained < 30% for 30min |
| 2 | Drain connections | Zero active connections |
| 3 | Decrease desired replicas | Deployment status |
| 4 | Verify remaining healthy | No error spike |
| 5 | Update capacity tracking | Capacity document |

**Emergency Scaling Runbook:**

| Step | Action | Owner |
|------|--------|-------|
| 1 | Acknowledge alert | On-call SRE |
| 2 | Assess impact | On-call SRE |
| 3 | Execute emergency scale | On-call SRE |
| 4 | Communicate to stakeholders | Incident commander |
| 5 | Post-incident review | Engineering lead |

**Database Scaling Runbook:**

| Scenario | Action | Downtime |
|----------|--------|----------|
| Add read replica | Provision + sync | Zero |
| Vertical scale | Modify instance | < 5 minutes |
| Failover | Promote replica | < 1 minute |
| Add shard | Create + migrate | Maintenance window |

### 4. Compile Final Document

**Document Structure:**

| Section | Content | Source Step |
|---------|---------|-------------|
| Executive Summary | Scaling strategy overview | All |
| Horizontal Scaling | Service replication, LB, autoscaling | Step 2 |
| Database Scaling | Replicas, pooling, sharding, RLS | Step 3 |
| Tenant-Aware Scaling | Isolation, caches, queues | Step 4 |
| Capacity Planning | Growth, projections, reviews | Step 5 |
| Cost Optimization | Right-sizing, controls | Step 5 |
| Runbooks | Scale-up, scale-down, emergency | Step 5 |
| Appendix | Metrics, thresholds, contacts | All |

---

## COLLABORATION MENUS (A/P/C)

After presenting the compiled design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Refine specific sections before finalizing
- **P (Party Mode)**: Final architect review before output
- **C (Continue)**: Generate final artifact and complete Create mode

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complete scaling design document
- Process enhanced insights on gaps or improvements
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Final review of scaling design before artifact generation"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Generate final scaling design document
- Save to: `{output_folder}/planning-artifacts/scaling-design.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Create mode complete

---

## Verification

- [ ] Capacity planning guidelines documented
- [ ] Cost optimization strategies defined
- [ ] Scaling runbooks created
- [ ] All sections from Steps 1-4 consolidated
- [ ] Document follows template structure
- [ ] Web research findings incorporated with citations

---

## Outputs

- **Primary:** `{output_folder}/planning-artifacts/scaling-design.md`
- Capacity planning guidelines
- Cost optimization strategies
- Operational runbooks
- Complete scaling design document

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Create workflow complete. Scaling design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

The scaling design document has been generated. To validate the design against quality criteria, run the workflow in Validate mode.
