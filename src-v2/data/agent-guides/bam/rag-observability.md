# BAM RAG Observability Guide

**When to load:** During RAG pipeline design, retrieval performance tuning, or when user mentions retrieval metrics, chunk relevance, or semantic search monitoring.

**Integrates with:** DevOps (operations), Architect (design), AI Platform (implementation)

---

## Core Concepts

### RAG Pipeline Metrics Hierarchy

RAG observability requires tracking metrics across the entire retrieval-augmented generation pipeline.

| Pipeline Stage | Key Metrics | Purpose |
|----------------|-------------|---------|
| Query Processing | query_preprocessing_latency, query_embedding_latency | Measure input processing overhead |
| Retrieval | retrieval_latency, chunks_retrieved, retrieval_recall | Track search performance |
| Reranking | rerank_latency, rerank_score_distribution | Measure relevance refinement |
| Generation | context_tokens, generation_latency, answer_quality | Track LLM augmentation |

### Per-Tenant RAG Isolation

RAG metrics must include tenant context for isolation and billing.

| Dimension | Labels | Purpose |
|-----------|--------|---------|
| Tenant | tenant_id, tenant_tier | Per-tenant billing and SLA tracking |
| Collection | collection_id, namespace | Tenant-scoped vector collections |
| Model | embedding_model, llm_model | Model-specific performance |
| Query | query_type, use_case | Usage pattern analysis |

---

## Application Guidelines

When implementing RAG observability in multi-tenant systems:

1. **Track retrieval latency by tenant**: Measure p50/p95/p99 retrieval times per tenant to detect performance degradation
2. **Monitor chunk relevance scores**: Track distribution of relevance scores to detect embedding drift or stale data
3. **Measure context utilization**: Track tokens used from retrieved context vs. total context window
4. **Alert on retrieval failures**: Set up alerts for zero-result queries and relevance score drops
5. **Per-tenant collection metrics**: Monitor index size, document count, and query patterns per tenant

---

## RAG Metrics Specification

### Retrieval Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| rag_retrieval_latency_seconds | Histogram | tenant_id, collection_id | Time to retrieve chunks |
| rag_chunks_retrieved_total | Counter | tenant_id, collection_id | Number of chunks returned |
| rag_retrieval_recall | Gauge | tenant_id, query_type | Retrieval recall score |
| rag_relevance_score_distribution | Histogram | tenant_id, collection_id | Distribution of chunk scores |
| rag_empty_retrieval_total | Counter | tenant_id, collection_id | Zero-result queries |

### Embedding Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| rag_embedding_latency_seconds | Histogram | tenant_id, model | Query embedding generation time |
| rag_embedding_batch_size | Histogram | tenant_id | Batch embedding sizes |
| rag_embedding_dimension_mismatch | Counter | tenant_id, collection_id | Dimension errors |

### Context Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| rag_context_tokens_used | Histogram | tenant_id, model | Tokens from retrieved context |
| rag_context_utilization_ratio | Gauge | tenant_id | Retrieved tokens / max tokens |
| rag_context_truncation_total | Counter | tenant_id | Context overflow events |

### Quality Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| rag_answer_groundedness_score | Gauge | tenant_id | Answer grounded in retrieved context |
| rag_answer_relevance_score | Gauge | tenant_id | Answer relevance to query |
| rag_faithfulness_score | Gauge | tenant_id | Answer faithfulness to source |
| rag_user_feedback_rating | Histogram | tenant_id | User quality feedback |

---

## Alerting Patterns

### RAG-Specific Alerts

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| RAGRetrievalLatencyHigh | rag_retrieval_latency_seconds:p95 > 500ms | WARNING | 5m |
| RAGRetrievalLatencyCritical | rag_retrieval_latency_seconds:p95 > 2s | CRITICAL | 2m |
| RAGEmptyRetrievalSpike | rate(rag_empty_retrieval_total[5m]) > 0.1 | WARNING | 5m |
| RAGRelevanceScoreDrop | avg(rag_relevance_score_distribution) < 0.6 | WARNING | 15m |
| RAGContextTruncationHigh | rate(rag_context_truncation_total[1h]) > 10 | WARNING | 30m |
| RAGGroundednessLow | rag_answer_groundedness_score < 0.7 | WARNING | 15m |

### Per-Tier SLA Alerts

| Tier | Retrieval p95 SLA | Empty Rate SLA | Alert Threshold |
|------|-------------------|----------------|-----------------|
| Enterprise | < 200ms | < 1% | Immediate |
| Pro | < 500ms | < 5% | 5m |
| Free | < 2s | < 10% | 15m |

---

## Dashboard Components

### RAG Performance Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Retrieval Latency Distribution | rag_retrieval_latency_seconds | Heatmap |
| Chunks Retrieved Over Time | rag_chunks_retrieved_total | Time series |
| Relevance Score Distribution | rag_relevance_score_distribution | Histogram |
| Empty Retrieval Rate | rag_empty_retrieval_total | Gauge |
| Context Utilization | rag_context_utilization_ratio | Gauge |

### Per-Tenant RAG Dashboard

| Panel | Metrics | Tenant Filter |
|-------|---------|---------------|
| Query Volume | sum(rate(rag_retrieval_latency_seconds_count)) | By tenant_id |
| Average Relevance | avg(rag_relevance_score_distribution) | By tenant_id |
| Collection Size | rag_collection_document_count | By tenant_id |
| Cost Attribution | rag_embedding_tokens_total * cost_per_token | By tenant_id |

---

## Implementation Checklist

### Instrumentation

- [ ] All retrieval operations emit latency histograms
- [ ] Chunk relevance scores are captured per query
- [ ] Empty retrieval events are logged with query context
- [ ] Context token counts are tracked per request
- [ ] Embedding generation latency is measured
- [ ] Quality scores (groundedness, relevance) are computed

### Dashboards

- [ ] RAG performance overview dashboard deployed
- [ ] Per-tenant RAG usage dashboard available
- [ ] Collection health monitoring enabled
- [ ] Cost attribution dashboard includes RAG

### Alerting

- [ ] Retrieval latency SLO alerts configured per tier
- [ ] Empty retrieval rate alerts active
- [ ] Relevance score degradation detection enabled
- [ ] Context truncation warnings configured

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rag-*`
- **vector-database:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `vector-database`
- **embedding-strategy:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `embedding-strategy`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "RAG observability best practices {date}"
- Search: "retrieval augmented generation monitoring {date}"
- Search: "semantic search metrics production {date}"
- Search: "Langfuse RAG tracing {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| What retrieval latency threshold indicates problems? | p95 > 500ms for Pro tier, > 200ms for Enterprise | Retrieval should not dominate end-to-end response time |
| How to detect embedding drift? | Monitor relevance score distribution weekly | Drift manifests as gradual score degradation |
| Should every chunk retrieval be logged? | Sample at 10% for high-volume, 100% for debugging | Balance observability cost with diagnostic capability |
| How to measure RAG answer quality? | Combine groundedness + relevance + faithfulness scores | Single metric misses quality dimensions |

---

## Related Workflows

- `bmad-bam-ai-observability-setup` - Full AI observability design
- `bmad-bam-tenant-aware-observability` - Tenant-scoped metrics
- `bmad-bam-agent-runtime-architecture` - RAG integration in agent runtime
