# Step 4: Query Optimization

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

Optimize vector search query performance through filtering strategies, caching, batching, and hybrid search configurations to meet latency SLAs.

---

## Prerequisites

- Steps 1-3 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: query-optimization
- **Web research (if available):** Search for vector query optimization techniques

---

## Inputs

- Requirements and isolation design from previous steps
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Filtering Strategy

Select pre-filtering vs post-filtering approach:

| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| Pre-filtering | Faster, accurate count | Index per filter combo | Known filter patterns |
| Post-filtering | Flexible, simple | May return fewer results | Variable filters |
| Hybrid | Balanced | Complex implementation | Mixed workloads |

### 2. Configure Caching Layers

Design multi-layer caching:

| Layer | Cache Type | TTL | Invalidation |
|-------|------------|-----|--------------|
| Query cache | Redis | [ ] seconds | Document update |
| Embedding cache | Local LRU | [ ] minutes | Model change |
| Result cache | CDN/Edge | [ ] seconds | Tenant action |

### 3. Implement Batch Query Optimization

Design batch query handling:

| Batch Size | Max Wait | Use Case |
|------------|----------|----------|
| 1 | 0ms | Real-time chat |
| 10-50 | 100ms | Document processing |
| 100+ | 500ms | Bulk indexing |

### 4. Configure Hybrid Search

Design hybrid search combining vector and keyword:

| Component | Weight | Configuration |
|-----------|--------|---------------|
| Vector similarity | [ ] 0.0-1.0 | HNSW search |
| BM25 keyword | [ ] 0.0-1.0 | Full-text index |
| Metadata boost | [ ] Multiplier | Field-specific |

### 5. Define Re-ranking Strategy

| Re-ranker | Latency | Quality | Cost |
|-----------|---------|---------|------|
| Cross-encoder | +50-100ms | Highest | High |
| ColBERT | +20-50ms | High | Medium |
| Simple score fusion | +5ms | Good | Low |

**Soft Gate:** Steps 1-4 complete the core query design. Present summary of filtering, caching, batching, and hybrid search. Ask for confirmation before proceeding.

**Verify current best practices with web search:**
Search the web: "vector search query optimization techniques {date}"
Search the web: "hybrid search BM25 vector fusion {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the query optimization analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into caching strategies and re-ranking trade-offs
- **P (Party Mode)**: Bring performance engineer and ML engineer perspectives
- **C (Continue)**: Accept query optimization and proceed to scaling
- **[Specific refinements]**: Describe optimization concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: filtering strategy, caching design, re-ranking options
- Process enhanced insights on performance tuning
- Ask user: "Accept these refined optimization decisions? (y/n)"
- If yes, integrate into optimization specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review vector query optimization for latency and throughput"
- Process performance engineer and ML engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save query optimization to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-scaling.md`

---

## Verification

- [ ] Filtering strategy selected
- [ ] Caching layers designed with TTLs
- [ ] Batch optimization configured
- [ ] Hybrid search weights defined
- [ ] Re-ranking strategy selected
- [ ] Patterns align with pattern registry

---

## Outputs

- Query optimization specification
- Caching architecture design
- Hybrid search configuration
- Re-ranking pipeline design

---

## Next Step

Proceed to `step-05-c-scaling.md` to plan scaling strategy.
