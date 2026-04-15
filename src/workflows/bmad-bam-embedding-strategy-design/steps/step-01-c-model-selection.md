# Step 1: Model Selection

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

Evaluate and select embedding models based on quality requirements, cost constraints, and multi-tenant platform needs including support for multiple languages and domains.

---

## Prerequisites

- Vector database design document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: embeddings
- **Web research (if available):** Search for current embedding model comparisons

---

## Inputs

- User requirements and constraints for embeddings
- Vector database design document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Evaluate Embedding Models

Compare primary embedding options:

| Model | Dimensions | Quality | Cost | Latency | Languages |
|-------|------------|---------|------|---------|-----------|
| OpenAI text-embedding-3-small | 1536 | Good | Low | Fast | 100+ |
| OpenAI text-embedding-3-large | 3072 | Best | Medium | Medium | 100+ |
| Cohere embed-v3 | 1024 | Great | Medium | Fast | 100+ |
| Voyage AI | 1024 | Great | Medium | Fast | 50+ |
| Sentence-BERT (self-hosted) | 384-768 | Good | Infra | Variable | Variable |
| BGE-large-en | 1024 | Great | Infra | Variable | English |

### 2. Assess Requirements per Tier

| Tier | Quality Priority | Cost Constraint | Language Support |
|------|-----------------|-----------------|------------------|
| Free | [ ] Good enough | [ ] Strict | [ ] English only / Multi |
| Pro | [ ] High quality | [ ] Moderate | [ ] Multi-language |
| Enterprise | [ ] Best available | [ ] Flexible | [ ] All languages |

### 3. Select Model Strategy

Design model selection approach:

| Strategy | Description | Complexity |
|----------|-------------|------------|
| Single model | One model for all tiers | Low |
| Tier-based | Different models per tier | Medium |
| Use-case based | Match model to content type | High |
| Hybrid | Self-hosted + API fallback | High |

### 4. Document Model Decision

| Decision | Selection | Justification |
|----------|-----------|---------------|
| Primary model | [ ] Model name | [ ] Reason |
| Fallback model | [ ] Model name | [ ] Reason |
| Self-hosted option | [ ] Yes/No | [ ] Reason |

### 5. Plan Model Versioning

| Aspect | Strategy |
|--------|----------|
| Version tracking | Semantic versioning with model name |
| Migration path | Parallel embedding with gradual cutover |
| Rollback procedure | Retain previous embeddings |

**Verify current best practices with web search:**
Search the web: "embedding model comparison {date}"
Search the web: "OpenAI vs Cohere embeddings benchmark {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the model selection analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into model benchmarks and quality trade-offs
- **P (Party Mode)**: Bring ML engineer and cost analyst perspectives on model selection
- **C (Continue)**: Accept model selection and proceed to dimension optimization
- **[Specific refinements]**: Describe model selection concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: model options, quality requirements, cost constraints
- Process enhanced insights on model selection
- Ask user: "Accept these refined model decisions? (y/n)"
- If yes, integrate into model specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review embedding model selection for multi-tenant AI platform"
- Process ML engineer and cost analyst perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save model selection to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-dimension-optimization.md`

---

## Verification

- [ ] Models evaluated against requirements
- [ ] Tier-based requirements assessed
- [ ] Model strategy selected
- [ ] Model decision documented with justification
- [ ] Versioning strategy defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Embedding model selection specification
- Model comparison analysis
- ADR for model selection

---

## Next Step

Proceed to `step-02-c-dimension-optimization.md` to optimize embedding dimensions.
