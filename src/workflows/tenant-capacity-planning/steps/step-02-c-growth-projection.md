# Step 2: Growth Projection

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

Develop growth projection models to forecast future capacity requirements based on tenant acquisition, usage trends, and business goals.

---

## Prerequisites

- Step 1 completed: Usage analysis with baselines and patterns
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

### 1. Define Growth Scenarios

Establish growth projection scenarios:

| Scenario | Description | Tenant Growth | Usage Growth | Probability |
|----------|-------------|---------------|--------------|-------------|
| Conservative | Slow growth | 5%/month | 10%/month | 30% |
| Baseline | Expected growth | 10%/month | 20%/month | 50% |
| Aggressive | Rapid expansion | 20%/month | 40%/month | 15% |
| Breakout | Viral growth | 50%/month | 100%/month | 5% |

### 2. Model Tenant Growth

Project tenant count over planning horizon:

| Time Period | Conservative | Baseline | Aggressive | Breakout |
|-------------|--------------|----------|------------|----------|
| Current | {count} | {count} | {count} | {count} |
| +3 months | {count} | {count} | {count} | {count} |
| +6 months | {count} | {count} | {count} | {count} |
| +12 months | {count} | {count} | {count} | {count} |
| +24 months | {count} | {count} | {count} | {count} |

### 3. Project Resource Requirements

Calculate resource needs per scenario:

**Baseline Scenario (+12 months):**

| Resource | Current | Projected | Growth | Lead Time |
|----------|---------|-----------|--------|-----------|
| CPU | {current} | {projected} | {%}% | 2 weeks |
| Memory | {current} | {projected} | {%}% | 2 weeks |
| Storage | {current} | {projected} | {%}% | 1 week |
| Database | {current} | {projected} | {%}% | 4 weeks |
| LLM quota | {current} | {projected} | {%}% | 1 week |

### 4. Identify Capacity Constraints

Document potential bottlenecks:

| Constraint | Current Limit | Projected Hit Date | Impact | Mitigation |
|------------|--------------|-------------------|--------|------------|
| Database connections | 1000 | +6 months | Critical | Connection pooling |
| LLM API rate limit | 10k/min | +4 months | High | Provider upgrade |
| Storage IOPS | 50k | +9 months | Medium | Storage tier upgrade |
| Network bandwidth | 10 Gbps | +12 months | Medium | CDN, edge caching |

### 5. Plan Capacity Milestones

Define capacity expansion milestones:

| Milestone | Trigger | Timeline | Resources | Budget Impact |
|-----------|---------|----------|-----------|---------------|
| M1 | 100 tenants | Q2 | Scale DB, add nodes | $5k/month |
| M2 | 500 tenants | Q3 | Dedicated cluster | $20k/month |
| M3 | 2000 tenants | Q4 | Multi-region | $80k/month |
| M4 | 10000 tenants | Q1+1 | Dedicated infrastructure | $250k/month |

### 6. Model AI/LLM Capacity

Project LLM-specific capacity needs:

| Metric | Current | +6 months | +12 months | Provider Plan |
|--------|---------|-----------|------------|---------------|
| Tokens/month | {current} | {projected} | {projected} | {plan} |
| API calls/month | {current} | {projected} | {projected} | {plan} |
| Concurrent requests | {current} | {projected} | {projected} | {plan} |
| Cost/month | {current} | {projected} | {projected} | {budget} |

**Verify current best practices with web search:**
Search the web: "SaaS growth forecasting models {date}"
Search the web: "capacity planning forecasting techniques {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the growth projection above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific scenarios
- **P (Party Mode)**: Bring finance and product perspectives
- **C (Continue)**: Accept projections and proceed to resource planning
- **[Specific refinements]**: Describe projection concerns

Select an option:
```

#### If 'C' (Continue):
- Save growth projections to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-resource-planning.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the analysis and forecasting phase.**

Present summary of:
- Current usage analysis and baselines
- Growth scenarios with projections
- Capacity constraints and milestones

Ask for confirmation before proceeding to resource planning.

---

## Verification

- [ ] Growth scenarios defined
- [ ] Tenant growth modeled
- [ ] Resource requirements projected
- [ ] Capacity constraints identified
- [ ] Milestones planned
- [ ] AI/LLM capacity modeled
- [ ] Patterns align with pattern registry

---

## Outputs

- Growth scenario definitions
- Tenant growth projections
- Resource requirement forecasts
- Capacity constraint analysis
- Milestone planning
- AI/LLM capacity model

---

## Next Step

Proceed to `step-03-c-resource-planning.md` to design resource allocation.
