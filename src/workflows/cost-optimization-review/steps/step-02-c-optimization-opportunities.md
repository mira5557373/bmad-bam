# Step 2: Optimization Opportunity Identification

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Identify cost optimization opportunities including resource rightsizing, reserved capacity, AI cost reduction, and architectural improvements.

---

## Prerequisites

- Cost baseline established (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: cost

---

## Actions

### 1. Resource Rightsizing Opportunities

| Resource | Current Size | Recommended | Savings | Priority |
|----------|--------------|-------------|---------|----------|
| {instance type} | {size} | {size} | ${/mo} | P1/P2/P3 |
| {database} | {size} | {size} | ${/mo} | P1/P2/P3 |
| {cache} | {size} | {size} | ${/mo} | P1/P2/P3 |

### 2. Reserved Capacity Savings

| Resource Type | Current (On-Demand) | Reserved Option | Savings | Term |
|---------------|---------------------|-----------------|---------|------|
| Compute | ${value}/mo | ${value}/mo | {%} | 1yr/3yr |
| Database | ${value}/mo | ${value}/mo | {%} | 1yr/3yr |
| AI API | ${value}/mo | ${value}/mo | {%} | commitment |

### 3. AI Cost Optimization

| Optimization | Description | Savings | Effort | Impact |
|--------------|-------------|---------|--------|--------|
| Model downgrade | Use GPT-3.5 where GPT-4 not needed | ${/mo} | Low | Low |
| Caching | Implement semantic caching | ${/mo} | Medium | Medium |
| Prompt optimization | Reduce token usage | ${/mo} | Medium | Low |
| Batching | Batch similar requests | ${/mo} | High | Medium |

### 4. Architectural Optimization

| Optimization | Description | Savings | Implementation |
|--------------|-------------|---------|----------------|
| Spot instances | Use spot for batch workloads | ${/mo} | {effort} |
| Auto-scaling tune | Improve scaling efficiency | ${/mo} | {effort} |
| Data tiering | Move cold data to cheaper storage | ${/mo} | {effort} |

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into optimization feasibility
- **P (Party Mode)**: Bring engineering and finance perspectives
- **C (Continue)**: Accept opportunities and proceed to cost attribution
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save optimization opportunities to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-cost-attribution.md`

---

**Verify current best practices with web search:**
Search the web: "optimization opportunities best practices {date}"
Search the web: "optimization opportunities multi-tenant SaaS {date}"

## Verification

- [ ] Rightsizing opportunities identified
- [ ] Reserved capacity options evaluated
- [ ] AI cost optimizations documented
- [ ] Architectural optimizations listed

---

## Outputs

- Optimization opportunities document

---

## Next Step

Proceed to `step-03-c-tenant-cost-attribution.md` to verify tenant costs.
