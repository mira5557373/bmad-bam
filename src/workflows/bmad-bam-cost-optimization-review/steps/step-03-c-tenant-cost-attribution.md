# Step 3: Tenant Cost Attribution Verification

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Verify per-tenant cost accuracy, cost allocation methodology, profitability analysis, and free tier cost management.

---

## Prerequisites

- Optimization opportunities identified (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant

---

## Actions

### 1. Per-Tenant Cost Accuracy

Verify cost attribution accuracy:

| Tenant ID | Tier | Attributed Cost | Verified Cost | Variance | Status |
|-----------|------|-----------------|---------------|----------|--------|
| {id} | Enterprise | ${value} | ${value} | {%} | OK/Issue |
| {id} | Pro | ${value} | ${value} | {%} | OK/Issue |
| {id} | Free | ${value} | ${value} | {%} | OK/Issue |

Attribution accuracy target: < 5% variance

### 2. Cost Allocation Methodology

| Cost Category | Allocation Method | Accuracy | Notes |
|---------------|-------------------|----------|-------|
| Compute | Usage-based | {%} | {notes} |
| Database | Query-weighted | {%} | {notes} |
| Storage | Direct measurement | {%} | {notes} |
| AI/LLM | Token-based | {%} | {notes} |
| Shared infrastructure | Proportional | {%} | {notes} |

### 3. Profitability Analysis

| Tier | Revenue/Tenant | Cost/Tenant | Margin | Target | Status |
|------|----------------|-------------|--------|--------|--------|
| Enterprise | ${value} | ${value} | {%} | > 70% | OK/Warning |
| Pro | ${value} | ${value} | {%} | > 60% | OK/Warning |
| Free | N/A | ${value} | N/A | < ${cap} | OK/Warning |

Unprofitable tenants requiring attention:
| Tenant | Revenue | Cost | Loss | Reason | Action |
|--------|---------|------|------|--------|--------|
| {id} | ${value} | ${value} | ${value} | {reason} | {action} |

### 4. Free Tier Cost Management

| Metric | Current | Limit | % of Limit |
|--------|---------|-------|------------|
| Free tier total cost | ${value} | ${value} | {%} |
| Free tier tenant count | {count} | {limit} | {%} |
| Cost per free tenant | ${value} | ${value} | {%} |
| Free tier AI usage | ${value} | ${value} | {%} |

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into attribution methodology
- **P (Party Mode)**: Bring finance and product perspectives
- **C (Continue)**: Accept attribution and proceed to budget alerts
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save tenant cost attribution to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-budget-alerts.md`

---

**Verify current best practices with web search:**
Search the web: "tenant cost attribution best practices {date}"
Search the web: "tenant cost attribution multi-tenant SaaS {date}"

## Verification

- [ ] Per-tenant cost verified
- [ ] Allocation methodology documented
- [ ] Profitability analyzed
- [ ] Free tier costs managed

---

## Outputs

- Tenant cost attribution report

---

## Next Step

Proceed to `step-04-c-budget-alerts.md` to configure budget alerts.
