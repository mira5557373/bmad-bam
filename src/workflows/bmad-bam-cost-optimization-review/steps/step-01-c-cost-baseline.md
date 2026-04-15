# Step 1: Cost Baseline Establishment

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Use web search to verify current best practices

---

## Purpose

Establish current cost baseline including breakdown by category, historical trends, unit economics, and AI-specific costs.

---

## Prerequisites

- Billing data accessible
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: cost

---

## Actions

### 1. Current Cost Breakdown by Category

| Category | This Month | Last Month | Change | % of Total |
|----------|------------|------------|--------|------------|
| Compute | ${value} | ${value} | {+/-}% | {%} |
| Database | ${value} | ${value} | {+/-}% | {%} |
| Storage | ${value} | ${value} | {+/-}% | {%} |
| Network | ${value} | ${value} | {+/-}% | {%} |
| AI/LLM | ${value} | ${value} | {+/-}% | {%} |
| Monitoring | ${value} | ${value} | {+/-}% | {%} |
| Security | ${value} | ${value} | {+/-}% | {%} |
| **Total** | ${value} | ${value} | {+/-}% | 100% |

### 2. Historical Cost Trends

| Period | Total Cost | Growth | Cost/Tenant | Cost/Request |
|--------|------------|--------|-------------|--------------|
| 3 months ago | ${value} | baseline | ${value} | ${value} |
| 2 months ago | ${value} | {+/-}% | ${value} | ${value} |
| 1 month ago | ${value} | {+/-}% | ${value} | ${value} |
| Current | ${value} | {+/-}% | ${value} | ${value} |

### 3. Unit Economics Calculation

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Cost per API request | ${value} | < ${target} | OK/Warning |
| Cost per AI request | ${value} | < ${target} | OK/Warning |
| Cost per active tenant | ${value} | < ${target} | OK/Warning |
| Gross margin (Enterprise) | {%} | > 70% | OK/Warning |
| Gross margin (Pro) | {%} | > 60% | OK/Warning |

### 4. AI-Specific Cost Baseline

| AI Component | Cost | Tokens | Cost/1K Tokens | Trend |
|--------------|------|--------|----------------|-------|
| GPT-4 | ${value} | {M} | ${value} | {+/-}% |
| GPT-3.5 | ${value} | {M} | ${value} | {+/-}% |
| Embeddings | ${value} | {M} | ${value} | {+/-}% |
| Other | ${value} | {M} | ${value} | {+/-}% |

**Verify current best practices with web search:**
Search the web: "SaaS cost baseline FinOps best practices {date}"
Search the web: "LLM cost optimization strategies {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cost analysis
- **P (Party Mode)**: Bring finance and engineering perspectives
- **C (Continue)**: Accept baseline and proceed to optimization opportunities
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save cost baseline to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-optimization-opportunities.md`

---

## Verification

- [ ] Cost breakdown by category documented
- [ ] Historical trends analyzed
- [ ] Unit economics calculated
- [ ] AI costs baselined

---

## Outputs

- Cost baseline document
- **Load template:** `{project-root}/_bmad/bam/data/templates/cost-optimization-template.md`

---

## Next Step

Proceed to `step-02-c-optimization-opportunities.md` to identify optimizations.
