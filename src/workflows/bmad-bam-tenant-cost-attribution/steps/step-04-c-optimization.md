# Step 4: Cost Optimization

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

Design cost optimization strategies and recommendations to improve margins while maintaining service quality.

---

## Prerequisites

- Step 3 completed: Chargeback reports designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

---

## Actions

### 1. Define Infrastructure Optimization

Identify infrastructure cost reduction opportunities:

| Opportunity | Strategy | Savings Potential | Effort |
|-------------|----------|-------------------|--------|
| Right-sizing | Match instance to load | 20-40% | Medium |
| Spot instances | Use for batch workloads | 50-70% | Low |
| Reserved capacity | Commit for baseline | 30-50% | Low |
| Auto-scaling | Scale down in off-hours | 20-30% | Medium |
| Storage tiering | Move cold data to archive | 40-60% | Medium |
| CDN optimization | Cache more, transfer less | 30-50% | Low |

### 2. Define AI/LLM Optimization

Identify AI cost reduction opportunities:

| Opportunity | Strategy | Savings Potential | Trade-off |
|-------------|----------|-------------------|-----------|
| Model selection | Use smaller models when appropriate | 50-80% | Quality |
| Caching | Cache common responses | 30-50% | Freshness |
| Batching | Batch similar requests | 20-30% | Latency |
| Prompt optimization | Reduce token count | 20-40% | None |
| Provider negotiation | Volume discounts | 10-30% | Lock-in |
| Self-hosting | Host open-source models | 50-70% | Operational |

### 3. Define Tenant-Level Optimization

Recommendations for tenant cost reduction:

| Recommendation | Trigger | Savings | Implementation |
|----------------|---------|---------|----------------|
| Downgrade tier | Usage < tier threshold | 20-50% | Plan change |
| Usage efficiency | High API redundancy | 10-30% | SDK optimization |
| Caching | Repeated queries | 20-40% | Client-side cache |
| Batch operations | Many small requests | 15-25% | API batching |
| Off-peak usage | Flexible timing | 10-20% | Scheduling |

### 4. Design Optimization Engine

Automate cost optimization:

| Component | Function | Frequency |
|-----------|----------|-----------|
| Usage analyzer | Identify patterns | Daily |
| Anomaly detector | Find waste | Real-time |
| Recommendation engine | Generate suggestions | Weekly |
| Auto-optimizer | Apply safe changes | Continuous |
| Savings tracker | Measure impact | Monthly |

### 5. Define FinOps Processes

Establish ongoing optimization practices:

| Process | Description | Frequency | Owner |
|---------|-------------|-----------|-------|
| Cost review | Review top spenders | Weekly | FinOps |
| Anomaly triage | Investigate spikes | Daily | Ops |
| Optimization backlog | Prioritize savings | Bi-weekly | FinOps |
| Commitment planning | RI/Savings plans | Quarterly | Finance |
| Vendor negotiation | Renegotiate contracts | Annually | Procurement |
| Architecture review | Cost-optimize design | Quarterly | Architecture |

### 6. Define Savings Tracking

Measure optimization impact:

| Metric | Calculation | Target | Current |
|--------|-------------|--------|---------|
| Cost avoidance | Projected - Actual | Track | ${current} |
| Optimization rate | Savings / Total spend | > 15% | {current}% |
| Unit cost trend | Cost per unit over time | Decreasing | {trend} |
| Waste eliminated | Unused resources removed | 100% | {current}% |
| ROI on FinOps | Savings / FinOps cost | > 5x | {current}x |

**Verify current best practices with web search:**
Search the web: "cloud cost optimization strategies {date}"
Search the web: "LLM cost reduction techniques {date}"
Search the web: "FinOps best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the optimization design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific optimization areas
- **P (Party Mode)**: Bring finance and engineering perspectives
- **C (Continue)**: Finalize cost attribution design
- **[Specific refinements]**: Describe optimization concerns

Select an option:
```

#### If 'C' (Continue):
- Generate final cost attribution design documents
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Save all outputs to `{output_folder}/planning-artifacts/operations/`
- Present completion summary

---

## Final Gate Checkpoint

**Steps 1-4 complete the tenant cost attribution design.**

Present final summary of:
- Cost categories and classification
- Allocation rules and formulas
- Chargeback and showback reports
- Optimization strategies and processes

Confirm QG-P1 checklist items for cost management are satisfied.

---

## Verification

- [ ] Infrastructure optimization defined
- [ ] AI/LLM optimization defined
- [ ] Tenant-level recommendations designed
- [ ] Optimization engine specified
- [ ] FinOps processes established
- [ ] Savings tracking defined
- [ ] QG-P1 cost items verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Infrastructure optimization strategies
- AI/LLM optimization strategies
- Tenant optimization recommendations
- Optimization engine design
- FinOps processes
- Savings tracking metrics
- **Output to:** `{output_folder}/planning-artifacts/operations/cost-allocation-model.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/chargeback-design.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/cost-optimization.md`

---

## Next Step

Create workflow complete. Tenant cost attribution design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

The tenant cost attribution design workflow is complete. The following artifacts have been generated:
- `cost-allocation-model.md` - Complete cost model and allocation rules
- `chargeback-design.md` - Reporting and invoicing design
- `cost-optimization.md` - Optimization strategies and processes

**Related Next Steps:**
- Implement metering pipeline
- Configure cost dashboards
- Run `bmad-bam-llm-gateway-configuration` for LLM cost optimization
