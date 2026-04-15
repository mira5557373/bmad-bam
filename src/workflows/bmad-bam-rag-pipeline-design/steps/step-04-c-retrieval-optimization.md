# Step 4: Retrieval Optimization

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

Design the retrieval strategy including dense/sparse trade-offs, reranking pipeline, query expansion techniques, and tenant-aware filtering.

---

## Prerequisites

- Step 3 completed: Embedding management configured
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: retrieval-patterns
- **Web research (if available):** Search for current retrieval optimization practices

---

## Inputs

- Embedding configuration from Step 3
- Quality requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Latency constraints

---

## Actions

### 1. Select Vector Store

Evaluate vector database options:

| Database | Type | Tenant Isolation | Scale | Cost |
|----------|------|------------------|-------|------|
| Pinecone | Managed | Namespace/Index | High | $$$$ |
| Weaviate | Self/Managed | Class/Tenant | High | $$$ |
| Qdrant | Self/Managed | Collection | High | $$ |
| Milvus | Self-hosted | Partition | Very High | $$ |
| pgvector | PostgreSQL | RLS | Medium | $ |
| ChromaDB | Self-hosted | Collection | Low | Free |

Selection Criteria:

| Criterion | Weight | Assessment |
|-----------|--------|------------|
| Tenant Isolation | High | {method} |
| Query Performance | High | {ms} |
| Scalability | Medium | {vectors} |
| Cost | Medium | {$/month} |
| Operations | Medium | {complexity} |
| Features | Low | {list} |

### 2. Configure Dense Retrieval

Design vector similarity search:

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Top-K | {number} | Recall vs precision |
| Similarity Threshold | {value} | Quality floor |
| Distance Metric | {cosine/euclidean/dot} | Model compatibility |
| Index Type | {HNSW/IVF/FLAT} | Speed vs accuracy |
| EF Search | {value} | HNSW accuracy |
| nprobe | {value} | IVF accuracy |

### 3. Design Reranking Pipeline

Configure reranking strategy:

| Stage | Model/Method | Purpose | Latency |
|-------|--------------|---------|---------|
| Initial Retrieval | Vector similarity | Candidate selection | 10ms |
| Rerank (Optional) | Cross-encoder | Quality refinement | 50ms |
| Filtering | Metadata rules | Compliance | 5ms |
| Scoring Fusion | RRF/Linear | Final ranking | 1ms |

Reranker Options:

| Reranker | Quality | Latency | Cost |
|----------|---------|---------|------|
| Cohere Rerank | High | 50-100ms | $1/1000 |
| bge-reranker-large | High | 30-50ms | Free (self-host) |
| ms-marco-MiniLM | Medium | 10-20ms | Free (self-host) |
| None (skip) | Baseline | 0ms | Free |

### 4. Implement Query Expansion

Design query enhancement:

| Technique | Method | Use Case | Overhead |
|-----------|--------|----------|----------|
| HyDE | Generate hypothetical answer | Abstract queries | +100ms |
| Multi-Query | Generate query variations | Ambiguous queries | +50ms |
| Keyword Extraction | NER/TF-IDF | Hybrid search | +10ms |
| Synonym Expansion | WordNet/custom | Domain terms | +5ms |
| Query Rewriting | LLM rewrite | Complex queries | +100ms |

Query Expansion Configuration:

| Tenant Tier | Techniques Enabled | Max Expansion |
|-------------|-------------------|---------------|
| Free | None | 1 query |
| Pro | Multi-Query, Keywords | 3 queries |
| Enterprise | All | 5 queries |

### 5. Design Tenant-Aware Filtering

Define tenant isolation in retrieval:

| Filter Type | Implementation | Performance Impact |
|-------------|----------------|-------------------|
| Pre-filter | Namespace/partition | None |
| In-query filter | Metadata filter | Minimal |
| Post-filter | Result filtering | Linear |

Tenant Filter Configuration:

| Field | Operator | Required | Example |
|-------|----------|----------|---------|
| tenant_id | == | YES | "tenant_123" |
| tier_access | in | NO | ["pro", "enterprise"] |
| data_classification | <= | NO | "confidential" |
| expiry_date | > | NO | "2024-01-01" |

### 6. Set Retrieval Quality Targets

Define quality metrics:

| Metric | Target | Measurement |
|--------|--------|-------------|
| MRR@10 | >0.7 | Mean Reciprocal Rank |
| NDCG@10 | >0.8 | Normalized DCG |
| Recall@20 | >0.9 | Retrieved relevant |
| Precision@5 | >0.6 | Relevant in top-5 |
| Latency P95 | <200ms | End-to-end |

**Verify current best practices with web search:**
Search the web: "RAG retrieval optimization techniques {date}"
Search the web: "reranking models RAG production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the retrieval optimization analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into retrieval quality and trade-offs
- **P (Party Mode)**: Bring search engineer and ML perspectives
- **C (Continue)**: Accept retrieval optimization and proceed to hybrid search
- **[Specific refinements]**: Describe retrieval concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: vector store, reranking, query expansion
- Process enhanced insights on retrieval trade-offs
- Ask user: "Accept these refined retrieval decisions? (y/n)"
- If yes, integrate into retrieval specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review retrieval optimization for multi-tenant RAG platform"
- Process search engineer and ML perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save retrieval optimization to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-hybrid-search.md`

---

## Verification

- [ ] Vector store selected with justification
- [ ] Dense retrieval configured
- [ ] Reranking pipeline designed
- [ ] Query expansion techniques selected
- [ ] Tenant-aware filtering implemented
- [ ] Quality targets defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Vector store specification
- Retrieval configuration
- Reranking pipeline design
- Query expansion strategy
- Quality benchmarks

---

## Next Step

Proceed to `step-05-c-hybrid-search.md` to implement hybrid search.
