# Step 1: Analyze Cost Structure

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Analyze current cost structure and identify optimization opportunities.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: cost

---

## Actions

### 1. Infrastructure Cost Analysis

| Cost Category | Components | Typical Distribution | Optimization Potential |
|---------------|------------|----------------------|------------------------|
| Compute | VMs, containers, serverless | 30-40% | High |
| Database | RDS, managed databases | 20-30% | Medium |
| Storage | Object, block, file | 10-15% | High |
| Network | Data transfer, CDN | 10-20% | Medium |
| AI/ML | LLM APIs, GPU compute | 15-25% | Very High |

### 2. LLM Cost Drivers

| Driver | Impact | Metrics |
|--------|--------|---------|
| Token volume | High | Input + output tokens/request |
| Model selection | Very High | Cost per 1K tokens varies 100x |
| Prompt efficiency | Medium | Average tokens per prompt |
| Caching hit rate | High | % requests served from cache |
| Retry rate | Medium | Failed requests requiring retry |

### 3. Tenant Cost Distribution

| Analysis Area | Metrics | Collection Method |
|---------------|---------|-------------------|
| Per-tenant spend | Monthly cost per tenant | Cost allocation tags |
| Cost by tier | Average spend by tier | Aggregation query |
| Feature cost | Cost per feature usage | Activity correlation |
| Growth trajectory | MoM cost change | Time series analysis |

### 4. Cost Anomaly Patterns

| Anomaly Type | Detection Method | Threshold |
|--------------|------------------|-----------|
| Spike | Sudden increase > 50% | Real-time |
| Drift | Gradual 20% increase | Weekly |
| Seasonal | Recurring patterns | Monthly |
| Orphaned resources | No activity > 30 days | Daily |

**Verify current best practices with web search:**
Search the web: "cloud cost optimization multi-tenant SaaS {date}"
Search the web: "LLM API cost reduction strategies {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing cost analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific cost categories
- **P (Party Mode)**: Bring FinOps and engineering perspectives for cost review
- **C (Continue)**: Accept cost analysis and proceed to optimization design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save cost analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-optimization.md`

---

## Verification

- [ ] Infrastructure costs categorized
- [ ] LLM cost drivers identified
- [ ] Tenant cost distribution analyzed
- [ ] Anomaly patterns documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Cost structure analysis
- Cost driver breakdown
- Anomaly pattern catalog

---

## Next Step

Proceed to `step-02-c-design-optimization.md` to design optimization strategies.
