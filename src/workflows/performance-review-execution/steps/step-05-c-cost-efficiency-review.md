# Step 5: Cost Efficiency Review

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

---

## Purpose

Analyze cost per request, break down AI model costs, attribute infrastructure costs, and identify optimization opportunities.

---

## Prerequisites

- Tenant performance analysis completed (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: cost

---

## Inputs

- Tenant performance analysis from Step 4
- Cost data from cloud provider
- AI provider billing data
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Cost Per Request Analysis

Calculate cost efficiency metrics:

| Metric | This Period | Previous Period | Change | Target |
|--------|-------------|-----------------|--------|--------|
| Cost per API request | ${value} | ${value} | {+/-}% | < ${target} |
| Cost per AI request | ${value} | ${value} | {+/-}% | < ${target} |
| Cost per active user | ${value} | ${value} | {+/-}% | < ${target} |
| Cost per tenant | ${value} | ${value} | {+/-}% | < ${target} |

By tier:
| Tier | Revenue/Tenant | Cost/Tenant | Margin | Target Margin |
|------|----------------|-------------|--------|---------------|
| Enterprise | ${value} | ${value} | {%} | > 70% |
| Pro | ${value} | ${value} | {%} | > 60% |
| Free | N/A | ${value} | N/A | < ${cap} |

### 2. AI Model Cost Breakdown

Analyze AI costs:

| Model | Requests | Tokens | Cost | % of AI Budget |
|-------|----------|--------|------|----------------|
| GPT-4 | {count} | {tokens} | ${cost} | {%} |
| GPT-3.5 | {count} | {tokens} | ${cost} | {%} |
| Claude | {count} | {tokens} | ${cost} | {%} |
| Embeddings | {count} | {tokens} | ${cost} | {%} |
| **Total** | {count} | {tokens} | ${cost} | 100% |

AI cost trends:
| Metric | This Period | Previous Period | Change |
|--------|-------------|-----------------|--------|
| Total AI cost | ${value} | ${value} | {+/-}% |
| Avg tokens/request | {value} | {value} | {+/-}% |
| Cache hit rate | {%} | {%} | {+/-}% |
| Cost savings from caching | ${value} | ${value} | {+/-}% |

### 3. Infrastructure Cost Attribution

Break down infrastructure costs:

| Category | Cost | % of Total | Per Tenant Avg |
|----------|------|------------|----------------|
| Compute | ${value} | {%} | ${value} |
| Database | ${value} | {%} | ${value} |
| Storage | ${value} | {%} | ${value} |
| Network | ${value} | {%} | ${value} |
| Monitoring | ${value} | {%} | ${value} |
| Security | ${value} | {%} | ${value} |
| **Total** | ${value} | 100% | ${value} |

By tenant tier:
| Tier | Tenant Count | Total Cost | Cost/Tenant | Revenue/Tenant |
|------|--------------|------------|-------------|----------------|
| Enterprise | {count} | ${value} | ${value} | ${value} |
| Pro | {count} | ${value} | ${value} | ${value} |
| Free | {count} | ${value} | ${value} | N/A |

### 4. Optimization Opportunity Identification

Identify cost optimization opportunities:

| Opportunity | Category | Potential Savings | Effort | Priority |
|-------------|----------|-------------------|--------|----------|
| {description} | Compute | ${value}/month | Low/Med/High | P1/P2/P3 |
| {description} | AI | ${value}/month | Low/Med/High | P1/P2/P3 |
| {description} | Storage | ${value}/month | Low/Med/High | P1/P2/P3 |
| {description} | Database | ${value}/month | Low/Med/High | P1/P2/P3 |

Quick wins (low effort, high impact):
- [ ] {optimization 1}
- [ ] {optimization 2}
- [ ] {optimization 3}

**Verify current best practices with web search:**
Search the web: "SaaS cost optimization strategies multi-tenant {date}"
Search the web: "LLM cost reduction techniques production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the cost efficiency review above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into optimization opportunities
- **P (Party Mode)**: Bring finance and engineering perspectives on cost efficiency
- **C (Continue)**: Finalize performance review
- **[Specific refinements]**: Describe cost concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: cost breakdown, optimization opportunities
- Process enhanced insights on cost efficiency
- Ask user: "Accept these refined cost findings? (y/n)"
- If yes, integrate into performance review
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review cost efficiency analysis for multi-tenant AI platform"
- Process finance and engineering perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save cost efficiency review to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Mark workflow as complete

---

## Verification

- [ ] Cost per request calculated
- [ ] AI model costs analyzed
- [ ] Infrastructure costs attributed
- [ ] Optimization opportunities identified
- [ ] Quick wins documented

---

## Outputs

- Cost efficiency report
- AI cost breakdown
- Infrastructure cost attribution
- Optimization recommendations
- **Load template:** `{project-root}/_bmad/bam/templates/performance-review-template.md`

---

## Workflow Complete

The performance review workflow is complete. Key artifacts produced:
- Performance review: `{output_folder}/operations/performance/performance-review-{date}.md`
- Optimization recommendations: `{output_folder}/operations/performance/optimization-recommendations-{date}.md`

Next steps:
- Review and prioritize optimization opportunities
- Schedule follow-up on quick wins
- Update baselines for next review period
- Consider running `validate` mode to verify QG-PR1 compliance
