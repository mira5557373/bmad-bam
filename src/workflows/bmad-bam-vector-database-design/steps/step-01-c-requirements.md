# Step 1: Vector Storage Requirements

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

Gather comprehensive requirements for vector storage including embedding dimensions, scale expectations, latency requirements, and query load patterns to inform architecture decisions.

---

## Prerequisites

- RAG pipeline design document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: vector-database
- **Web research (if available):** Search for current vector database best practices

---

## Inputs

- User requirements and constraints for vector storage
- RAG pipeline design document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify Embedding Dimensions

Determine the embedding model dimensions being used:

| Model Type | Dimensions | Use Case |
|------------|------------|----------|
| OpenAI text-embedding-3-small | 1536 | General purpose |
| OpenAI text-embedding-3-large | 3072 | High precision |
| Cohere embed-v3 | 1024 | Multilingual |
| Sentence-BERT | 384-768 | Cost-effective |
| Custom fine-tuned | Variable | Domain-specific |

### 2. Estimate Scale Requirements

Gather scale expectations per tenant tier:

| Tier | Vectors per Tenant | Concurrent Queries | Growth Rate |
|------|-------------------|-------------------|-------------|
| Free | [ ] Estimate | [ ] Estimate | [ ] Monthly % |
| Pro | [ ] Estimate | [ ] Estimate | [ ] Monthly % |
| Enterprise | [ ] Estimate | [ ] Estimate | [ ] Monthly % |

### 3. Define Latency Requirements

Establish query latency SLAs:

| Metric | Free Tier | Pro Tier | Enterprise |
|--------|-----------|----------|------------|
| p50 latency | [ ] ms | [ ] ms | [ ] ms |
| p95 latency | [ ] ms | [ ] ms | [ ] ms |
| p99 latency | [ ] ms | [ ] ms | [ ] ms |

### 4. Assess Query Patterns

Analyze expected query patterns:
- Single vector search vs. batch queries
- Filter complexity (metadata filtering requirements)
- Hybrid search requirements (vector + keyword)
- Re-ranking requirements

### 5. Document Cost Constraints

| Constraint | Threshold | Priority |
|------------|-----------|----------|
| Monthly budget per tenant | [ ] USD | [ ] High/Med/Low |
| Storage cost per GB | [ ] USD | [ ] High/Med/Low |
| Query cost per 1M | [ ] USD | [ ] High/Med/Low |

**Verify current best practices with web search:**
Search the web: "vector database comparison {date}"
Search the web: "vector database performance benchmarks {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the requirements analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into scale projections and latency requirements
- **P (Party Mode)**: Bring data engineer and ML engineer perspectives on requirements
- **C (Continue)**: Accept requirements and proceed to index strategy
- **[Specific refinements]**: Describe requirements concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: scale estimates, latency requirements, query patterns
- Process enhanced insights on capacity planning
- Ask user: "Accept these refined requirements? (y/n)"
- If yes, integrate into requirements specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review vector storage requirements for multi-tenant AI platform"
- Process data engineer and ML engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save requirements to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-index-strategy.md`

---

## Verification

- [ ] Embedding dimensions documented
- [ ] Scale requirements per tier estimated
- [ ] Latency SLAs defined
- [ ] Query patterns analyzed
- [ ] Cost constraints documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Vector storage requirements specification
- Scale projections document
- Latency SLA definitions

---

## Next Step

Proceed to `step-02-c-index-strategy.md` to select indexing strategy.
