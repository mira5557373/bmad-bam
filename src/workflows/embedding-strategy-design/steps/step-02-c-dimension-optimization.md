# Step 2: Dimension Optimization

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

Optimize embedding dimensions to balance quality, storage costs, and search performance while maintaining semantic fidelity.

---

## Prerequisites

- Step 1 completed with model selection
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: embedding-optimization
- **Web research (if available):** Search for embedding dimension reduction techniques

---

## Inputs

- Model selection from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Analyze Native Dimensions

Document native model dimensions:

| Model Selected | Native Dimensions | Typical Quality |
|----------------|-------------------|-----------------|
| [ ] Primary model | [ ] dims | [ ] baseline |
| [ ] Fallback model | [ ] dims | [ ] baseline |

### 2. Evaluate Reduction Techniques

Compare dimension reduction options:

| Technique | Quality Retention | Complexity | Storage Savings |
|-----------|-------------------|------------|-----------------|
| None (native) | 100% | None | 0% |
| PCA | 90-95% | Low | 50-75% |
| Matryoshka (MRL) | 95-99% | Low | Variable |
| Quantization | 95-99% | Medium | 75% |
| Product Quantization | 90-95% | High | 90%+ |

### 3. Define Target Dimensions per Use Case

| Use Case | Target Dimensions | Rationale |
|----------|-------------------|-----------|
| Document retrieval | [ ] dims | Balance quality/cost |
| Chat context | [ ] dims | Speed priority |
| Semantic search | [ ] dims | Quality priority |
| Code search | [ ] dims | Domain-specific |

### 4. Configure Matryoshka Embeddings

If using MRL-enabled models:

| Dimension Slice | Use Case | Quality Impact |
|-----------------|----------|----------------|
| Full (e.g., 1536) | Final ranking | 100% |
| Half (e.g., 768) | Initial search | ~98% |
| Quarter (e.g., 384) | Pre-filtering | ~95% |

### 5. Calculate Storage Impact

| Dimension | Storage per 1M vectors | Monthly Cost |
|-----------|------------------------|--------------|
| Native | [ ] GB | [ ] USD |
| Reduced | [ ] GB | [ ] USD |
| Savings | [ ] % | [ ] USD/month |

**Verify current best practices with web search:**
Search the web: "matryoshka embeddings dimension reduction {date}"
Search the web: "embedding PCA quality retention {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the dimension optimization analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into quality/cost trade-offs for dimensions
- **P (Party Mode)**: Bring ML engineer and data architect perspectives
- **C (Continue)**: Accept dimension optimization and proceed to tenant namespacing
- **[Specific refinements]**: Describe dimension concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: dimension options, quality metrics, storage costs
- Process enhanced insights on dimension optimization
- Ask user: "Accept these refined dimension decisions? (y/n)"
- If yes, integrate into dimension specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review embedding dimension optimization for cost and quality"
- Process ML engineer and data architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save dimension optimization to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-namespacing.md`

---

## Verification

- [ ] Native dimensions documented
- [ ] Reduction techniques evaluated
- [ ] Target dimensions per use case defined
- [ ] Matryoshka slices configured (if applicable)
- [ ] Storage impact calculated
- [ ] Patterns align with pattern registry

---

## Outputs

- Dimension optimization specification
- Storage impact analysis
- Quality/cost trade-off documentation

---

## Next Step

Proceed to `step-03-c-tenant-namespacing.md` to design tenant isolation.
