# Step 5: Hybrid Search

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Implement hybrid search combining dense and sparse retrieval, including BM25 keyword matching, semantic similarity weighting, and score fusion strategies.

---

## Prerequisites

- Step 4 completed: Retrieval optimization designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: hybrid-search
- **Web research (if available):** Search for current hybrid search best practices

---

## Inputs

- Retrieval configuration from Step 4
- Content characteristics
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Query patterns

---

## Actions

### 1. Design Dense + Sparse Architecture

Define hybrid retrieval architecture:

| Component | Dense Path | Sparse Path |
|-----------|------------|-------------|
| Indexing | Embedding vectors | Inverted index |
| Storage | Vector DB | Search engine (Elasticsearch/Typesense) |
| Query | Vector similarity | BM25/TF-IDF |
| Scoring | Cosine similarity | BM25 score |
| Top-K | Configurable | Configurable |

### 2. Configure BM25 Keyword Matching

Design sparse retrieval:

| Parameter | Value | Purpose |
|-----------|-------|---------|
| k1 | 1.2-2.0 | Term frequency saturation |
| b | 0.75 | Document length normalization |
| Analyzer | {custom} | Text preprocessing |
| Stop Words | {list} | Common word removal |
| Stemming | {algorithm} | Word normalization |

BM25 Index Configuration:

| Field | Indexed | Boost | Analyzer |
|-------|---------|-------|----------|
| content | YES | 1.0 | {standard} |
| title | YES | 2.0 | {standard} |
| keywords | YES | 1.5 | {keyword} |
| metadata | NO | - | - |

### 3. Define Score Fusion Strategy

Design score combination:

| Strategy | Formula | Use Case |
|----------|---------|----------|
| Linear | alpha * dense + (1-alpha) * sparse | Balanced |
| RRF | 1/(k + rank_dense) + 1/(k + rank_sparse) | Rank-based |
| Max | max(dense_norm, sparse_norm) | Best match |
| Learned | model(dense, sparse, features) | Optimized |

Fusion Configuration:

| Parameter | Value | Tuning Method |
|-----------|-------|---------------|
| Alpha (Dense Weight) | 0.7 | Grid search |
| RRF k | 60 | Standard |
| Score Normalization | Min-max | Per-query |
| Final Top-K | {number} | Requirements |

### 4. Implement Multi-Index Strategy

Design index organization:

| Index Type | Content | Purpose | Query Pattern |
|------------|---------|---------|---------------|
| Primary Dense | All content | Semantic search | Default |
| Primary Sparse | All content | Keyword search | Exact match |
| Code Index | Code chunks | Code search | Code queries |
| FAQ Index | Q&A pairs | FAQ matching | Questions |
| Recent Index | Last 30 days | Fresh content | Time-sensitive |

Index Routing Logic:

| Query Signal | Index Selection | Reasoning |
|--------------|-----------------|-----------|
| Code keywords | Code Index | Specialized |
| Question format | FAQ Index + Primary | FAQ first |
| Exact quotes | Sparse only | Literal match |
| Conceptual | Dense only | Semantic |
| Default | Hybrid both | Balanced |

### 5. Design Fallback Mechanisms

Define degradation strategy:

| Failure Mode | Detection | Fallback | Recovery |
|--------------|-----------|----------|----------|
| Dense timeout | >500ms | Sparse only | Auto-retry |
| Sparse timeout | >500ms | Dense only | Auto-retry |
| Both timeout | >1s | Cached results | Alert |
| Low relevance | score < 0.3 | Expand query | Log |
| No results | empty | Suggest alternatives | Log |

Fallback Configuration:

| Level | Condition | Action | Latency Impact |
|-------|-----------|--------|----------------|
| 1 | Primary fails | Secondary index | +50ms |
| 2 | Secondary fails | Cached popular | +10ms |
| 3 | Cache miss | Error response | 0ms |

### 6. Set Performance Targets

Define hybrid search performance:

| Metric | Target | Measurement |
|--------|--------|-------------|
| End-to-end Latency | <250ms | P95 |
| Dense Latency | <100ms | P95 |
| Sparse Latency | <100ms | P95 |
| Fusion Latency | <10ms | P95 |
| Quality (MRR) | >0.75 | Benchmark |

**Verify current best practices with web search:**
Search the web: "hybrid search RAG dense sparse fusion {date}"
Search the web: "BM25 vector search combination {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-5 complete the RAG pipeline design.**

Present a summary:
- Ingestion pipeline with tenant segregation
- Chunking strategy per content type
- Embedding model and caching
- Retrieval optimization with reranking
- Hybrid search with score fusion

Ask for confirmation before generating final output document.

---

## COLLABORATION MENUS (A/P/C):

After completing the hybrid search design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into hybrid search parameters and tuning
- **P (Party Mode)**: Bring search and ML perspectives on fusion strategies
- **C (Continue)**: Accept hybrid search design and generate final output
- **[Specific refinements]**: Describe hybrid search concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: BM25 config, score fusion, multi-index strategy
- Process enhanced insights on hybrid search trade-offs
- Ask user: "Accept these refined hybrid search decisions? (y/n)"
- If yes, integrate into hybrid search specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review hybrid search design for multi-tenant RAG platform"
- Process search and ML perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Generate final RAG pipeline architecture document
- Save to `{output_folder}/planning-artifacts/architecture/rag-pipeline-architecture.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Mark Create mode complete

---

## Verification

- [ ] Dense + sparse architecture defined
- [ ] BM25 configuration complete
- [ ] Score fusion strategy selected
- [ ] Multi-index strategy designed
- [ ] Fallback mechanisms documented
- [ ] Performance targets established
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete RAG pipeline architecture
- Hybrid search configuration
- Multi-index strategy
- Fallback procedures
- **Load template:** `{project-root}/_bmad/bam/templates/rag-architecture-template.md`

---

## Next Step

Create workflow complete. RAG pipeline architecture ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode is complete. The RAG pipeline architecture is now ready for validation using Validate mode (`step-20-v-*`).
