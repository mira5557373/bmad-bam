# Step 4: Scaling Triggers

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Design auto-scaling triggers, thresholds, and policies to automatically adjust capacity based on demand while maintaining cost efficiency.

---

## Prerequisites

- Step 3 completed: Resource planning with quotas and pools
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: scaling
- **Load checklist:** `{project-root}/_bmad/bam/checklists/production-readiness.md`

---

## Actions

### 1. Define Scaling Metrics

Identify metrics that trigger scaling:

| Metric | Scale Up Threshold | Scale Down Threshold | Evaluation Period |
|--------|-------------------|---------------------|-------------------|
| CPU utilization | > 70% | < 30% | 5 minutes |
| Memory utilization | > 80% | < 40% | 5 minutes |
| Request latency (p95) | > 500ms | < 100ms | 3 minutes |
| Queue depth | > 1000 | < 100 | 2 minutes |
| Connection count | > 80% limit | < 40% limit | 5 minutes |
| Error rate | > 1% | < 0.1% | 5 minutes |

### 2. Design Horizontal Pod Autoscaler (HPA)

Define HPA configurations:

| Service | Min Replicas | Max Replicas | Target CPU | Target Memory |
|---------|--------------|--------------|------------|---------------|
| API Gateway | 3 | 50 | 60% | 70% |
| Web App | 2 | 30 | 65% | 75% |
| Worker | 1 | 20 | 70% | 80% |
| Agent Runtime | 2 | 100 | 50% | 60% |
| Cache | 3 | 10 | 70% | 80% |

### 3. Design Vertical Pod Autoscaler (VPA)

Define VPA policies:

| Service | Mode | Min CPU | Max CPU | Min Memory | Max Memory |
|---------|------|---------|---------|------------|------------|
| Database proxy | Auto | 0.5 | 4 | 1 GB | 8 GB |
| Background worker | Recommend | 0.25 | 2 | 512 MB | 4 GB |
| Batch processor | Off | - | - | - | - |

### 4. Design Cluster Autoscaler

Define cluster-level scaling:

| Node Pool | Min Nodes | Max Nodes | Instance Type | Scale Trigger |
|-----------|-----------|-----------|---------------|---------------|
| General | 3 | 20 | 4 vCPU, 16 GB | Pod pending |
| AI Workload | 1 | 10 | 8 vCPU, 32 GB | Agent queue |
| Spot | 0 | 50 | 4 vCPU, 16 GB | Batch jobs |

### 5. Define Scaling Policies

Design scaling behavior:

| Policy | Configuration | Rationale |
|--------|---------------|-----------|
| Scale up delay | 0 seconds | Respond immediately to load |
| Scale down delay | 5 minutes | Avoid thrashing |
| Scale up step | 2 replicas or 25% | Aggressive scale up |
| Scale down step | 1 replica or 10% | Conservative scale down |
| Cooldown period | 3 minutes | Stabilization time |

### 6. Design Predictive Scaling

Configure predictive scaling:

| Pattern | Prediction Window | Scale Lead Time | Confidence |
|---------|-------------------|-----------------|------------|
| Daily pattern | 24 hours | 15 minutes | > 80% |
| Weekly pattern | 7 days | 1 hour | > 70% |
| Event-based | Event calendar | 2 hours | Manual |

### 7. Design Tenant-Aware Scaling

Scale based on tenant metrics:

| Trigger | Metric | Action | Target |
|---------|--------|--------|--------|
| Enterprise tenant spike | Tenant CPU > 80% | Scale dedicated pool | Tenant-specific |
| Multi-tenant pressure | Shared pool > 70% | Add shared nodes | Pool |
| AI agent backlog | Queue > 500 | Scale agent workers | Agent pool |
| New tenant onboarding | Tenant count + 1 | Pre-warm capacity | Pool |

### 8. Define Scaling Alerts

Configure alerting for scaling events:

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| Scale blocked | Max replicas reached | Critical | Page SRE |
| Rapid scaling | > 10 scale events/hour | Warning | Review |
| Scale down blocked | Min replicas + stuck | Warning | Investigate |
| Cost anomaly | Scaling cost > 2x budget | High | Finance alert |
| Predictive failure | Prediction error > 20% | Info | Model review |

**Verify current best practices with web search:**
Search the web: "Kubernetes autoscaling best practices {date}"
Search the web: "predictive scaling patterns SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the scaling triggers design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific scaling policies
- **P (Party Mode)**: Bring SRE and finance perspectives
- **C (Continue)**: Finalize capacity planning design
- **[Specific refinements]**: Describe scaling concerns

Select an option:
```

#### If 'C' (Continue):
- Generate final capacity planning design documents
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Save all outputs to `{output_folder}/planning-artifacts/operations/`
- Present completion summary

---

## Final Gate Checkpoint

**Steps 1-4 complete the tenant capacity planning design.**

Present final summary of:
- Usage analysis and baseline metrics
- Growth projections for planning horizon
- Resource allocation and fair-share policies
- Auto-scaling triggers and policies

Confirm QG-P1 checklist items for capacity planning are satisfied.

---

## Verification

- [ ] Scaling metrics defined
- [ ] HPA configurations designed
- [ ] VPA policies specified
- [ ] Cluster autoscaler configured
- [ ] Scaling policies documented
- [ ] Predictive scaling designed
- [ ] Tenant-aware scaling defined
- [ ] Scaling alerts configured
- [ ] QG-P1 capacity items verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Scaling metric definitions
- HPA configurations
- VPA policies
- Cluster autoscaler design
- Scaling policies
- Predictive scaling configuration
- Tenant-aware scaling rules
- Scaling alert definitions
- **Output to:** `{output_folder}/planning-artifacts/operations/capacity-planning.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/scaling-triggers.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/resource-allocation.md`

---

## Next Step

Create workflow complete. Tenant capacity planning design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

The tenant capacity planning design workflow is complete. The following artifacts have been generated:
- `capacity-planning.md` - Complete capacity analysis and projections
- `scaling-triggers.md` - Auto-scaling configurations
- `resource-allocation.md` - Resource quotas and policies

**Related Next Steps:**
- Implement HPA/VPA configurations in Kubernetes
- Run `bmad-bam-tenant-cost-attribution` for cost allocation
- Configure monitoring dashboards for capacity metrics
