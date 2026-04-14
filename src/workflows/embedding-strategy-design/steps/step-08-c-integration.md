# Step 8: Integration Patterns

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

Design integration patterns for the embedding service including API interfaces, async processing patterns, error handling, and RAG pipeline integration.

---

## Prerequisites

- Steps 1-7 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: integration
- **Web research (if available):** Search for embedding service integration patterns

---

## Inputs

- Previous step decisions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Service Interface

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/embed` | POST | Single text embedding |
| `/embed/batch` | POST | Batch embedding |
| `/embed/status/{job_id}` | GET | Batch job status |
| `/embed/cancel/{job_id}` | DELETE | Cancel batch job |

### 2. Define Request/Response Schema

Request schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| text | string/array | Yes | Text to embed |
| model | string | No | Model override |
| dimensions | int | No | Dimension reduction |
| metadata | object | No | Custom metadata |

Response schema:

| Field | Type | Description |
|-------|------|-------------|
| embeddings | array | Vector array |
| model | string | Model used |
| dimensions | int | Vector dimensions |
| usage | object | Token/cost tracking |

### 3. Design Async Processing

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| Sync (blocking) | Single embed, <100ms | Direct API call |
| Async (webhook) | Batch processing | Job queue + callback |
| Streaming | Large documents | Chunked processing |

### 4. Configure Error Handling

| Error | HTTP Code | Client Action |
|-------|-----------|---------------|
| Rate limited | 429 | Retry with backoff |
| Invalid input | 400 | Fix request |
| Model unavailable | 503 | Use fallback |
| Timeout | 504 | Retry or reduce batch |
| Internal error | 500 | Retry with exponential backoff |

### 5. Design RAG Pipeline Integration

| Stage | Embedding Role | Integration Point |
|-------|----------------|-------------------|
| Indexing | Document chunks -> vectors | Document processor |
| Query | Query text -> vector | Query processor |
| Re-embedding | Updated content | Change detector |
| Hybrid search | Query expansion | Search orchestrator |

### 6. Define Circuit Breakers

| Circuit | Open Threshold | Half-Open Check | Reset |
|---------|----------------|-----------------|-------|
| Primary model | 5 failures in 1m | 1 test request | 30s |
| Batch queue | 10 failures in 5m | Drain check | 60s |
| Cache layer | 3 failures in 30s | Health check | 15s |

**Verify current best practices with web search:**
Search the web: "embedding service API design patterns {date}"
Search the web: "RAG embedding integration architecture {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the integration analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into API design and error handling
- **P (Party Mode)**: Bring backend engineer and SRE perspectives
- **C (Continue)**: Accept integration design and proceed to documentation
- **[Specific refinements]**: Describe integration concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: API design, async patterns, error handling, circuit breakers
- Process enhanced insights on integration architecture
- Ask user: "Accept these refined integration decisions? (y/n)"
- If yes, integrate into integration specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review embedding service integration patterns"
- Process backend engineer and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save integration patterns to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-documentation.md`

---

## Verification

- [ ] Service interface designed
- [ ] Request/response schema defined
- [ ] Async processing patterns configured
- [ ] Error handling comprehensive
- [ ] RAG pipeline integration mapped
- [ ] Circuit breakers configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Integration patterns specification
- API interface design
- Error handling procedures
- Circuit breaker configuration

---

## Next Step

Proceed to `step-09-c-documentation.md` to generate documentation.
