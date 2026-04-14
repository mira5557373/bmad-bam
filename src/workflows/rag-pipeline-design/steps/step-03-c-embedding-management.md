# Step 3: Embedding Management

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

Configure the embedding pipeline including model selection, batch processing, caching strategy, and version management for vector embeddings.

---

## Prerequisites

- Step 2 completed: Chunking strategy documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: embedding-patterns
- **Web research (if available):** Search for current embedding model best practices

---

## Inputs

- Chunking strategy from Step 2
- Performance requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Cost constraints

---

## Actions

### 1. Select Embedding Model

Evaluate embedding model options:

| Model | Provider | Dimensions | Max Tokens | Cost | Quality |
|-------|----------|------------|------------|------|---------|
| text-embedding-3-small | OpenAI | 1536 | 8191 | $0.02/1M | Good |
| text-embedding-3-large | OpenAI | 3072 | 8191 | $0.13/1M | Best |
| embed-english-v3.0 | Cohere | 1024 | 512 | $0.10/1M | Good |
| embed-multilingual-v3.0 | Cohere | 1024 | 512 | $0.10/1M | Multilingual |
| voyage-3 | Voyage | 1024 | 32000 | $0.06/1M | Code-optimized |
| bge-large-en-v1.5 | BAAI | 1024 | 512 | Free (self-host) | Good |
| e5-large-v2 | Microsoft | 1024 | 512 | Free (self-host) | Good |

Selection Criteria:

| Criterion | Weight | Assessment |
|-----------|--------|------------|
| Quality (MTEB) | High | {score} |
| Latency | Medium | {ms} |
| Cost | Medium | {$/1M tokens} |
| Context length | Medium | {tokens} |
| Multilingual | {Low/High} | {languages} |
| Self-hosting | {Low/High} | {feasibility} |

### 2. Configure Batch Processing

Design embedding batch configuration:

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Batch Size | {count} | API limits |
| Concurrent Requests | {count} | Rate limits |
| Queue Size | {count} | Backpressure |
| Timeout | {seconds} | Reliability |
| Retry Attempts | {count} | Fault tolerance |
| Retry Backoff | {strategy} | Rate limit recovery |

Batch Processing Pipeline:

| Stage | Operation | Concurrency | Error Handling |
|-------|-----------|-------------|----------------|
| Chunk Queue | Collect chunks | Single | Overflow to disk |
| Batch Formation | Group by size | Single | Split large batches |
| API Call | Send to model | {N} parallel | Retry with backoff |
| Response Parse | Extract vectors | Single | Log failures |
| Storage | Write to vector DB | {N} parallel | Transaction rollback |

### 3. Design Caching Strategy

Define embedding cache:

| Cache Layer | TTL | Size | Purpose |
|-------------|-----|------|---------|
| L1 (Memory) | 1 hour | 100MB | Hot embeddings |
| L2 (Redis) | 24 hours | 1GB | Recent embeddings |
| L3 (Disk) | 7 days | 10GB | Batch reprocessing |

Cache Key Strategy:

| Strategy | Key Format | Collision Handling |
|----------|------------|-------------------|
| Content Hash | MD5(chunk_text) | Version suffix |
| Chunk ID | {doc_id}_{chunk_idx} | Overwrite |
| Composite | {tenant}:{hash}:{model_version} | Evict old |

### 4. Multi-Model Support

Design model switching capability:

| Use Case | Primary Model | Fallback Model | Selection Logic |
|----------|---------------|----------------|-----------------|
| Default | embedding-3-small | bge-large | Cost optimization |
| High Quality | embedding-3-large | embedding-3-small | Quality requirement |
| Code | voyage-3 | embedding-3-large | Content detection |
| Multilingual | embed-multilingual | embedding-3-small | Language detection |

Model Routing Configuration:

| Tenant Tier | Allowed Models | Default |
|-------------|----------------|---------|
| Free | embedding-3-small only | embedding-3-small |
| Pro | small, large | embedding-3-large |
| Enterprise | All | Configurable |

### 5. Version Management

Design embedding version strategy:

| Component | Versioning | Migration Strategy |
|-----------|------------|-------------------|
| Model | Semantic (1.0.0) | Gradual re-embed |
| Dimensions | Immutable per model | New index |
| Parameters | Config-based | Hot reload |
| Index | Timestamped | Blue-green deploy |

Version Migration Process:

| Phase | Action | Duration | Rollback |
|-------|--------|----------|----------|
| 1 | Create new index | {estimate} | Delete new |
| 2 | Dual-write embeddings | {estimate} | Stop dual-write |
| 3 | Backfill existing | {estimate} | Continue old |
| 4 | Switch read traffic | Instant | Switch back |
| 5 | Deprecate old index | Scheduled | Restore |

### 6. Performance Optimization

Define performance targets:

| Metric | Target | Measurement |
|--------|--------|-------------|
| Embedding Latency | <100ms | P95 per chunk |
| Throughput | >1000 chunks/min | Sustained |
| Cache Hit Rate | >80% | Requests served from cache |
| Error Rate | <0.1% | Failed embeddings |
| Cost per 1M tokens | <$0.10 | Monthly average |

**Verify current best practices with web search:**
Search the web: "embedding model selection RAG {date}"
Search the web: "embedding cache strategies production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the embedding management analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into model selection and caching
- **P (Party Mode)**: Bring ML engineer and infrastructure perspectives
- **C (Continue)**: Accept embedding management and proceed to retrieval optimization
- **[Specific refinements]**: Describe embedding concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: model selection, batch processing, caching strategy
- Process enhanced insights on embedding trade-offs
- Ask user: "Accept these refined embedding decisions? (y/n)"
- If yes, integrate into embedding specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review embedding management for multi-tenant RAG platform"
- Process ML engineer and infrastructure perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save embedding management to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-retrieval-optimization.md`

---

## Verification

- [ ] Embedding model selected with justification
- [ ] Batch processing configured
- [ ] Caching strategy designed
- [ ] Multi-model support planned
- [ ] Version management defined
- [ ] Performance targets established
- [ ] Patterns align with pattern registry

---

## Outputs

- Embedding model specification
- Batch processing configuration
- Caching architecture
- Version management plan

---

## Next Step

Proceed to `step-04-c-retrieval-optimization.md` to design retrieval strategy.
