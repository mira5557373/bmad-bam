# Step 6: Quality Metrics

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

Define embedding quality measurement including recall benchmarks, semantic similarity tests, and A/B testing frameworks to ensure embedding quality meets requirements.

---

## Prerequisites

- Steps 1-5 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: evaluation
- **Web research (if available):** Search for embedding quality evaluation methods

---

## Inputs

- Previous step decisions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Quality Metrics

| Metric | Description | Target | Measurement |
|--------|-------------|--------|-------------|
| Recall@k | Relevant docs in top k | >0.90 | Test set evaluation |
| MRR | Mean Reciprocal Rank | >0.70 | Ranking position |
| NDCG | Normalized DCG | >0.80 | Graded relevance |
| Semantic similarity | Cosine sim for known pairs | >0.85 | Golden pairs |

### 2. Create Evaluation Datasets

| Dataset | Size | Purpose | Update Frequency |
|---------|------|---------|------------------|
| Golden queries | 100-500 | Recall baseline | Monthly |
| Semantic pairs | 200-1000 | Similarity baseline | Monthly |
| Domain-specific | 100+ per domain | Domain accuracy | Quarterly |
| Adversarial | 50-100 | Edge case handling | Quarterly |

### 3. Design A/B Testing Framework

| Component | Configuration | Purpose |
|-----------|---------------|---------|
| Traffic split | 5-10% to variant | Safe rollout |
| Metrics tracked | Recall, latency, user feedback | Decision data |
| Duration | 2-4 weeks minimum | Statistical significance |
| Rollback trigger | >5% quality drop | Automatic safety |

### 4. Configure Continuous Monitoring

| Check | Frequency | Alert Threshold |
|-------|-----------|-----------------|
| Recall regression | Daily | <95% of baseline |
| Latency regression | Hourly | >120% of baseline |
| Error rate spike | Real-time | >1% error rate |
| Embedding drift | Weekly | Cosine distance threshold |

### 5. Define Quality Gates

| Gate | Criteria | Action on Fail |
|------|----------|----------------|
| Pre-production | Recall@10 > 0.90 on golden set | Block deployment |
| Canary | No regression in 2 hours | Auto-rollback |
| Production | Weekly quality audit pass | Alert + investigate |

**Verify current best practices with web search:**
Search the web: "embedding quality evaluation metrics {date}"
Search the web: "RAG retrieval recall benchmark {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the quality metrics analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into evaluation datasets and testing methodology
- **P (Party Mode)**: Bring ML engineer and QA perspectives on quality assurance
- **C (Continue)**: Accept quality metrics and proceed to cost optimization
- **[Specific refinements]**: Describe quality concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: quality metrics, evaluation datasets, A/B testing design
- Process enhanced insights on quality measurement
- Ask user: "Accept these refined quality decisions? (y/n)"
- If yes, integrate into quality specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review embedding quality metrics and evaluation framework"
- Process ML engineer and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save quality metrics to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-cost-optimization.md`

---

## Verification

- [ ] Quality metrics defined with targets
- [ ] Evaluation datasets specified
- [ ] A/B testing framework designed
- [ ] Continuous monitoring configured
- [ ] Quality gates defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Quality metrics specification
- Evaluation dataset requirements
- A/B testing framework design
- Monitoring configuration

---

## Next Step

Proceed to `step-07-c-cost-optimization.md` to optimize costs.
