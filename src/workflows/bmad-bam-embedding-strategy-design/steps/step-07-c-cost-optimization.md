# Step 7: Cost Optimization

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
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Optimize embedding costs through tier-based model selection, caching ROI maximization, and usage quota management while maintaining quality requirements.

---

## Prerequisites

- Steps 1-6 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: cost-optimization
- **Web research (if available):** Search for embedding cost optimization strategies

---

## Inputs

- Previous step decisions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Model Cost Analysis

| Model | Cost per 1M tokens | Quality Score | Cost/Quality Ratio |
|-------|-------------------|---------------|-------------------|
| text-embedding-3-small | $0.02 | 85% | Best value |
| text-embedding-3-large | $0.13 | 95% | Premium |
| Cohere embed-v3 | $0.10 | 92% | Good value |
| Self-hosted (BGE) | $X infra | 90% | Variable |

### 2. Design Tier-Based Model Selection

| Tier | Model | Justification | Monthly Budget |
|------|-------|---------------|----------------|
| Free | text-embedding-3-small | Cost-effective | [ ] USD/tenant |
| Pro | text-embedding-3-small | Good balance | [ ] USD/tenant |
| Enterprise | text-embedding-3-large | Best quality | [ ] USD/tenant |

### 3. Configure Usage Quotas

| Tier | Embeddings/month | Storage GB | Rate limit |
|------|------------------|------------|------------|
| Free | 10K vectors | 1 GB | 10 req/min |
| Pro | 100K vectors | 10 GB | 100 req/min |
| Enterprise | Unlimited | Custom | Custom |

### 4. Optimize Caching ROI

| Optimization | Implementation | Savings |
|--------------|----------------|---------|
| Cache hit targeting | Aim for >80% hit rate | 80% API reduction |
| TTL optimization | Extend for stable content | Reduce re-embeds |
| Pre-warming | Popular content | Reduce cold starts |

### 5. Calculate Total Cost Projections

| Cost Component | Monthly (1K tenants) | Annual |
|----------------|----------------------|--------|
| API embeddings | [ ] USD | [ ] USD |
| Cache infrastructure | [ ] USD | [ ] USD |
| Vector storage | [ ] USD | [ ] USD |
| Compute | [ ] USD | [ ] USD |
| **Total** | [ ] USD | [ ] USD |

### 6. Define Cost Alerts

| Alert | Threshold | Action |
|-------|-----------|--------|
| Tenant overage | >120% quota | Notify + throttle |
| Monthly spike | >150% projected | Alert ops |
| Anomaly detection | Statistical deviation | Investigate |

**Verify current best practices with web search:**
Search the web: "embedding API cost optimization strategies {date}"
Search the web: "LLM embedding cost reduction techniques {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the cost optimization analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cost projections and quota design
- **P (Party Mode)**: Bring finance and platform engineering perspectives
- **C (Continue)**: Accept cost optimization and proceed to integration
- **[Specific refinements]**: Describe cost concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: cost analysis, tier design, quota configuration
- Process enhanced insights on cost optimization
- Ask user: "Accept these refined cost decisions? (y/n)"
- If yes, integrate into cost specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review embedding cost optimization strategy"
- Process finance and platform engineering perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save cost optimization to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-integration.md`

---

## Verification

- [ ] Model costs analyzed
- [ ] Tier-based selection configured
- [ ] Usage quotas defined
- [ ] Caching ROI optimized
- [ ] Cost projections calculated
- [ ] Cost alerts configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Cost optimization specification
- Tier-based model selection
- Quota configuration
- Cost projection model

---

## Next Step

Proceed to `step-08-c-integration.md` to design integration patterns.
