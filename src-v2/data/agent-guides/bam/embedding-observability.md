# BAM Embedding Observability Guide

**When to load:** During embedding pipeline design, embedding model monitoring, or when user mentions embedding metrics, batch processing, or model performance.

**Integrates with:** DevOps (operations), Architect (design), AI Platform (implementation)

---

## Core Concepts

### Embedding Pipeline Metrics Hierarchy

Embedding observability tracks the generation, storage, and quality of vector embeddings.

| Pipeline Stage | Key Metrics | Purpose |
|----------------|-------------|---------|
| Generation | embedding_latency, batch_throughput | Model inference performance |
| Quality | embedding_drift, similarity_scores | Embedding quality monitoring |
| Storage | write_latency, storage_cost | Persistence performance |
| Retrieval | retrieval_recall, distance_distribution | Embedding effectiveness |

### Per-Tenant Embedding Isolation

Embedding metrics must include tenant context for cost attribution and isolation.

| Dimension | Labels | Purpose |
|-----------|--------|---------|
| Tenant | tenant_id, tenant_tier | Per-tenant billing |
| Model | embedding_model, model_version | Model-specific tracking |
| Collection | collection_id, namespace | Storage location |
| Content | content_type, source | Content classification |

---

## Application Guidelines

When implementing embedding observability in multi-tenant systems:

1. **Track embedding generation latency**: Monitor batch vs single embedding latency
2. **Monitor embedding costs per tenant**: Track API calls and token consumption
3. **Detect embedding drift**: Compare new embeddings to baseline distributions
4. **Alert on model changes**: Provider model updates can change embedding behavior
5. **Track embedding dimension consistency**: Ensure all embeddings match expected dimensions

---

## Embedding Metrics Specification

### Generation Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| embedding_generation_latency_seconds | Histogram | tenant_id, model, batch_size | Generation time |
| embedding_generation_total | Counter | tenant_id, model | Total embeddings generated |
| embedding_batch_size | Histogram | tenant_id, model | Batch sizes used |
| embedding_tokens_total | Counter | tenant_id, model | Tokens processed |
| embedding_generation_errors_total | Counter | tenant_id, model, error_type | Generation failures |

### Quality Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| embedding_dimension_count | Gauge | tenant_id, model | Embedding dimensions |
| embedding_norm_distribution | Histogram | tenant_id, model | L2 norm distribution |
| embedding_similarity_baseline | Gauge | tenant_id, model | Similarity to baseline |
| embedding_drift_score | Gauge | tenant_id, model | Drift detection score |
| embedding_zero_vector_total | Counter | tenant_id, model | Zero/null embeddings |

### Cost Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| embedding_cost_usd | Counter | tenant_id, model | Embedding API costs |
| embedding_cache_hits_total | Counter | tenant_id | Cache hit count |
| embedding_cache_misses_total | Counter | tenant_id | Cache miss count |
| embedding_cost_per_document | Histogram | tenant_id, model | Cost distribution |

### Storage Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| embedding_storage_bytes | Gauge | tenant_id, collection_id | Storage consumed |
| embedding_write_latency_seconds | Histogram | tenant_id, collection_id | Write latency |
| embedding_index_time_seconds | Histogram | tenant_id, collection_id | Indexing time |
| embedding_documents_indexed | Counter | tenant_id, collection_id | Documents indexed |

---

## Alerting Patterns

### Embedding Generation Alerts

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| EmbeddingLatencyHigh | embedding_generation_latency_seconds:p95 > 500ms | WARNING | 5m |
| EmbeddingLatencyCritical | embedding_generation_latency_seconds:p95 > 2s | CRITICAL | 2m |
| EmbeddingErrorRateHigh | rate(embedding_generation_errors_total[5m]) > 0.01 | WARNING | 5m |
| EmbeddingZeroVectorSpike | rate(embedding_zero_vector_total[5m]) > 0 | WARNING | 1m |
| EmbeddingDimensionMismatch | embedding_dimension_count != expected | CRITICAL | immediate |

### Embedding Quality Alerts

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| EmbeddingDriftDetected | embedding_drift_score > 0.15 | WARNING | 1h |
| EmbeddingDriftCritical | embedding_drift_score > 0.3 | CRITICAL | 30m |
| EmbeddingNormAnomaly | embedding_norm_distribution:stddev > threshold | WARNING | 1h |
| EmbeddingModelChanged | model_version != expected | WARNING | immediate |

### Cost Alerts

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| EmbeddingCostSpike | rate(embedding_cost_usd[1h]) > 2x daily_avg | WARNING | 30m |
| EmbeddingCacheMissHigh | cache_misses / (cache_hits + cache_misses) > 0.5 | WARNING | 15m |
| EmbeddingBudgetWarning | sum(embedding_cost_usd) > 0.8 * monthly_budget | WARNING | 1h |

---

## Dashboard Components

### Embedding Generation Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Generation Latency Distribution | embedding_generation_latency_seconds | Heatmap by model |
| Embeddings Per Second | rate(embedding_generation_total) | Time series |
| Batch Size Distribution | embedding_batch_size | Histogram |
| Error Rate | embedding_generation_errors_total | Time series |
| Token Consumption | embedding_tokens_total | Counter |

### Embedding Quality Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Drift Score Over Time | embedding_drift_score | Time series |
| Norm Distribution | embedding_norm_distribution | Histogram |
| Dimension Consistency | embedding_dimension_count | Table |
| Zero Vector Rate | embedding_zero_vector_total | Time series |
| Similarity to Baseline | embedding_similarity_baseline | Gauge |

### Embedding Cost Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Cost by Model | embedding_cost_usd | Stacked area by model |
| Cost by Tenant | embedding_cost_usd | Table by tenant_id |
| Cache Efficiency | cache_hits / total | Gauge |
| Cost Per Document | embedding_cost_per_document | Histogram |
| Monthly Budget Burn | cumulative(embedding_cost_usd) | Time series |

---

## Embedding Model Comparison

### Provider-Specific Metrics

| Provider | Model | Dimensions | Cost/1K Tokens | BAM Metric Label |
|----------|-------|------------|----------------|------------------|
| OpenAI | text-embedding-3-small | 1536 | $0.02 | model="openai/text-embedding-3-small" |
| OpenAI | text-embedding-3-large | 3072 | $0.13 | model="openai/text-embedding-3-large" |
| Cohere | embed-english-v3.0 | 1024 | $0.10 | model="cohere/embed-english-v3.0" |
| Anthropic | voyage-2 | 1024 | $0.10 | model="voyage/voyage-2" |
| Local | sentence-transformers | varies | compute | model="local/all-MiniLM-L6-v2" |

### Model Comparison Dashboard

| Panel | Metrics | Comparison |
|-------|---------|------------|
| Latency by Model | embedding_generation_latency_seconds | Side-by-side |
| Cost per Embedding | embedding_cost_usd / embedding_generation_total | Bar chart |
| Retrieval Recall | downstream retrieval_recall | By model |
| Error Rate | embedding_generation_errors_total | By model |

---

## Implementation Checklist

### Instrumentation

- [ ] Embedding generation emits latency histograms with model labels
- [ ] Batch sizes are tracked per operation
- [ ] Token consumption is counted per tenant
- [ ] Embedding costs are calculated and tracked
- [ ] Drift detection runs on sample embeddings
- [ ] Zero/null vectors are detected and counted

### Dashboards

- [ ] Embedding generation performance dashboard deployed
- [ ] Embedding quality monitoring dashboard available
- [ ] Cost attribution dashboard enabled
- [ ] Model comparison dashboard configured

### Alerting

- [ ] Generation latency SLO alerts configured
- [ ] Drift detection alerts active
- [ ] Cost anomaly alerts enabled
- [ ] Dimension mismatch alerts immediate

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `embedding-strategy`
- **vector-database:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `vector-database`
- **llm-cost-tracking:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `llm-cost-tracking`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "embedding observability best practices {date}"
- Search: "embedding drift detection production {date}"
- Search: "embedding cost optimization multi-tenant {date}"
- Search: "text embedding monitoring {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How often to check for embedding drift? | Daily comparison against baseline | Catch model changes early |
| Should embeddings be cached? | Yes, with content hash key | Avoid regenerating identical embeddings |
| When to re-embed existing content? | After model change or drift > 0.2 | Maintain embedding quality |
| How to handle embedding model deprecation? | Monitor provider announcements, plan migration | Avoid service disruption |

---

## Related Workflows

- `bmad-bam-ai-observability-setup` - Full AI observability design
- `bmad-bam-agent-runtime-architecture` - Embedding integration
- `bmad-bam-tenant-aware-observability` - Tenant-scoped metrics
