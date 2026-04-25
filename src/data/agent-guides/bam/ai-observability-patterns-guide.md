# BAM AI Observability Patterns Guide

**When to load:** During Phase 3-6 when designing AI monitoring, agent tracing, embedding observability, or model performance tracking. Load when user mentions AI monitoring, agent tracing, LLM observability, embedding monitoring, context window, vector store monitoring.
**Integrates with:** Architect (Nova persona), DevOps agent, SRE roles

---

## Core Concepts

### AI Observability Pillars

AI observability extends traditional observability with AI-specific concerns.

| Pillar | Traditional | AI-Specific |
|--------|-------------|-------------|
| Metrics | Latency, errors, throughput | Token usage, model latency, hallucination rate |
| Logs | Request/response logs | Prompt/completion logs, reasoning traces |
| Traces | Service-to-service | LLM call chains, agent tool usage, span hierarchy |
| Evaluation | N/A | Quality scores, accuracy metrics, drift detection |

### Multi-Tenant AI Metrics

All AI observability must be tenant-aware for isolation, billing, and SLA management.

| Metric | Scope | Purpose |
|--------|-------|---------|
| Token consumption | Per-tenant | Cost allocation |
| Model latency (p50/p95/p99) | Per-tenant | SLA monitoring |
| Completion rate | Per-tenant | Quality tracking |
| Error rate | Per-tenant | Reliability |
| Tool call success | Per-agent | Agent health |
| Context utilization | Per-agent | Efficiency tracking |
| Embedding generation | Per-tenant | Cost attribution |
| Vector query performance | Per-tenant | Index health |

### LLM Observability Stack Architecture

```
+-----------------------------------------------------+
|              AI Observability Stack                  |
|                                                      |
|  +----------+  +----------+  +----------+           |
|  |  LLM     |  |  Agent   |  |  RAG     |           |
|  | Gateway  |  | Runtime  |  | Pipeline |           |
|  +----+-----+  +----+-----+  +----+-----+           |
|       |             |             |                  |
|       +------+------+------+------+                  |
|              |             |                         |
|       +------v------+ +----v-----+                  |
|       |Trace Collector| | Metrics |                  |
|       | (OpenTelemetry)| |Aggregator|                 |
|       +------+------+ +----+-----+                  |
|              |             |                         |
|       +------v-------------v-----+                  |
|       |   Tenant-Scoped Storage   |                  |
|       |   + Cost Attribution      |                  |
|       +---------------------------+                  |
+-----------------------------------------------------+
```

### Cost Attribution Model

| Cost Component | Attribution Method | Granularity |
|----------------|-------------------|-------------|
| LLM tokens | Per-request metering | Per-tenant |
| Embedding tokens | Per-document tracking | Per-tenant |
| Vector storage | Namespace-based | Per-tenant |
| Compute time | Resource monitoring | Per-agent |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and must be followed for multi-tenant AI observability.

### Trace ID Format

| Attribute | Type | Required | Format |
|-----------|------|----------|--------|
| tenant.id | string | Yes | UUID or tenant slug |
| tenant.tier | string | Yes | `free`, `pro`, `enterprise` |
| session.id | string | Yes | UUID |
| correlation.id | string | Yes | UUID for cross-service correlation |
| agent.id | string | Yes | Agent identifier |

### Metric Naming Convention

All AI metrics follow the pattern: `{domain}_{component}_{metric}_{unit}`

| Domain | Components | Examples |
|--------|------------|----------|
| `llm` | call, token, latency | `llm_call_total`, `llm_token_count`, `llm_latency_seconds` |
| `agent` | execution, tool, memory | `agent_execution_total`, `agent_tool_latency_seconds` |
| `embedding` | generation, storage, cost | `embedding_generation_latency_seconds`, `embedding_cost_usd` |
| `vector` | query, index, storage | `vector_query_latency_seconds`, `vector_index_size_bytes` |
| `context` | tokens, utilization, overflow | `context_tokens_total`, `context_utilization_ratio` |

### Required Labels for All AI Metrics

| Label | Required | Purpose |
|-------|----------|---------|
| `tenant_id` | Yes | Tenant isolation and billing |
| `tenant_tier` | Yes | SLA differentiation |
| `model` | When applicable | Model attribution |
| `agent_id` | When applicable | Agent tracking |
| `collection_id` | For vector ops | Collection scoping |

---

## Decision Framework

### When to Use Which Observability Pattern

| Scenario | Primary Pattern | Secondary Patterns |
|----------|-----------------|-------------------|
| Agent debugging | Agent Tracing | Context Window, Model Monitoring |
| Cost optimization | Model Monitoring | Embedding Observability, Context Window |
| RAG performance issues | Vector Store Observability | Embedding Observability, Agent Tracing |
| Quality degradation | Model Monitoring | Embedding Observability |
| Token cost spikes | Context Window Monitoring | Embedding Observability |
| Tenant SLA monitoring | All patterns | Filter by tenant_id |

### Platform Selection

| Use Case | Recommended Platform | Rationale |
|----------|---------------------|-----------|
| LangChain-based agents | LangSmith | Native integration |
| Open source preference | Langfuse | Self-hosted option |
| Enterprise standardization | OpenTelemetry + vendor | Vendor flexibility |
| Cost-sensitive | OpenTelemetry + Prometheus/Grafana | No licensing costs |

---

## §agent-tracing

### Pattern: Agent Tracing

Agent tracing captures the full execution flow of AI agents with hierarchical spans.

#### Trace Hierarchy

| Span Level | Parent | Key Attributes | Purpose |
|------------|--------|----------------|---------|
| Session | None | session_id, tenant_id, user_id | User interaction boundary |
| Turn | Session | turn_id, input_tokens | Single user input/output cycle |
| Agent | Turn | agent_id, agent_type | Agent execution scope |
| LLM Call | Agent | model, prompt_tokens, completion_tokens | Model invocation |
| Tool | Agent | tool_id, tool_category | Tool execution |
| Memory | Agent | memory_tier, operation | Memory access |

#### LLM Call Span Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| llm.model | string | Model identifier |
| llm.provider | string | anthropic/openai/google |
| llm.temperature | float | Temperature setting |
| llm.max_tokens | int | Max tokens requested |
| llm.prompt_tokens | int | Input token count |
| llm.completion_tokens | int | Output token count |
| llm.latency_ms | int | Call latency |
| llm.finish_reason | string | stop/length/tool_call |
| llm.cost_usd | float | Estimated cost |

#### Tool Span Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| tool.id | string | Tool identifier |
| tool.name | string | Tool display name |
| tool.category | string | Tool category |
| tool.params_hash | string | Hash of parameters |
| tool.result_status | string | success/error/timeout |
| tool.sandbox_id | string | Sandbox identifier |
| tool.latency_ms | int | Execution latency |

#### Multi-Tenant Sampling Strategies

| Tenant Tier | Sample Rate | Full Prompt Capture | Retention |
|-------------|-------------|---------------------|-----------|
| Enterprise | 100% | Yes (with consent) | 90 days |
| Pro | 50% | 10% | 30 days |
| Free | 10% | No | 7 days |

#### Adaptive Sampling Rules

| Condition | Sampling Adjustment | Rationale |
|-----------|---------------------|-----------|
| Error occurred | 100% | Debug errors completely |
| Latency > SLO | 100% | Investigate slow requests |
| New agent version | 100% for 24h | Monitor rollout |
| High cost request | 100% | Cost optimization |

#### Platform Integration

**Langfuse Integration:**

| Feature | Configuration | Purpose |
|---------|---------------|---------|
| Trace Groups | Group by session_id | Conversation-level traces |
| Generations | Capture LLM calls | Token and latency tracking |
| Scores | Attach quality scores | Evaluation integration |
| User Attribution | Map to user.id + tenant.id | Per-tenant analysis |

**OpenTelemetry Integration:**

| Component | Configuration | Purpose |
|-----------|---------------|---------|
| TracerProvider | Tenant-aware sampler | Sampling strategy |
| SpanProcessor | BatchSpanProcessor | Efficient export |
| Exporter | OTLP or vendor-specific | Backend integration |
| Propagator | W3C TraceContext | Cross-service propagation |

---

## §model-monitoring

### Pattern: Model Monitoring

Model monitoring tracks ML/LLM model performance, behavior, and health in production.

#### Monitoring Dimensions

| Dimension | Description | Metrics |
|-----------|-------------|---------|
| Performance | Model accuracy over time | Accuracy, F1, precision, recall |
| Latency | Inference speed | p50, p95, p99 latency |
| Throughput | Request handling capacity | Requests/second, queue depth |
| Drift | Data/concept distribution changes | KL divergence, PSI, feature drift |
| Errors | Failure rates and types | Error rate, timeout rate |
| Resource | Compute utilization | GPU/CPU usage, memory |

#### Monitoring Metrics Schema

| Field | Description | Example |
|-------|-------------|---------|
| metric_id | Unique identifier | `mtc_abc123` |
| tenant_id | Tenant context | `tenant_xyz` |
| model_id | Model identifier | `mdl_xyz:2.1.3` |
| metric_type | Metric category | `performance`, `drift`, `latency` |
| metric_name | Specific metric | `accuracy`, `kl_divergence`, `p99_latency` |
| value | Metric value | `0.95` |
| timestamp | Collection time | `2026-04-11T10:30:00Z` |
| window | Aggregation window | `1h`, `1d`, `7d` |
| dimensions | Additional context | `{"agent_id": "agt_123", "endpoint": "predict"}` |

#### Drift Detection Types

| Drift Type | Description | Detection Method | Alert Threshold |
|------------|-------------|------------------|-----------------|
| Data drift | Input distribution change | KL divergence, PSI | PSI > 0.2 |
| Concept drift | Input-output relationship change | Performance degradation | Accuracy drop > 5% |
| Feature drift | Individual feature distribution | Per-feature monitoring | Feature PSI > 0.1 |
| Prediction drift | Output distribution change | Output monitoring | Distribution shift > 10% |

#### Per-Tier Monitoring Features

| Tier | Metrics Access | Alert Configuration | Dashboards | Historical Data |
|------|----------------|---------------------|------------|-----------------|
| Free | Basic latency only | Platform alerts only | None | 24 hours |
| Pro | Standard metrics | Limited custom alerts | Pre-built | 30 days |
| Enterprise | Full metrics + custom | Full alert configuration | Custom + API | 1 year |

#### Multi-Tenant Alert Configuration

| Alert Level | Scope | Recipients | Example |
|-------------|-------|------------|---------|
| Platform | All models | Platform ops | GPU utilization > 90% |
| Model | Specific model, all tenants | Model owners | Model accuracy drop |
| Tenant | Tenant-specific | Tenant admins | Tenant usage anomaly |
| Agent | Agent-specific | Agent owners | Agent performance issue |

---

## §embedding-observability

### Pattern: Embedding Observability

Embedding observability tracks the generation, storage, and quality of vector embeddings.

#### Embedding Pipeline Metrics Hierarchy

| Pipeline Stage | Key Metrics | Purpose |
|----------------|-------------|---------|
| Generation | embedding_latency, batch_throughput | Model inference performance |
| Quality | embedding_drift, similarity_scores | Embedding quality monitoring |
| Storage | write_latency, storage_cost | Persistence performance |
| Retrieval | retrieval_recall, distance_distribution | Embedding effectiveness |

#### Generation Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| embedding_generation_latency_seconds | Histogram | tenant_id, model, batch_size | Generation time |
| embedding_generation_total | Counter | tenant_id, model | Total embeddings generated |
| embedding_batch_size | Histogram | tenant_id, model | Batch sizes used |
| embedding_tokens_total | Counter | tenant_id, model | Tokens processed |
| embedding_generation_errors_total | Counter | tenant_id, model, error_type | Generation failures |

#### Quality Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| embedding_dimension_count | Gauge | tenant_id, model | Embedding dimensions |
| embedding_norm_distribution | Histogram | tenant_id, model | L2 norm distribution |
| embedding_similarity_baseline | Gauge | tenant_id, model | Similarity to baseline |
| embedding_drift_score | Gauge | tenant_id, model | Drift detection score |
| embedding_zero_vector_total | Counter | tenant_id, model | Zero/null embeddings |

#### Cost Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| embedding_cost_usd | Counter | tenant_id, model | Embedding API costs |
| embedding_cache_hits_total | Counter | tenant_id | Cache hit count |
| embedding_cache_misses_total | Counter | tenant_id | Cache miss count |
| embedding_cost_per_document | Histogram | tenant_id, model | Cost distribution |

#### Embedding Model Comparison

| Provider | Model | Dimensions | Cost/1K Tokens | BAM Metric Label |
|----------|-------|------------|----------------|------------------|
| OpenAI | text-embedding-3-small | 1536 | $0.02 | model="openai/text-embedding-3-small" |
| OpenAI | text-embedding-3-large | 3072 | $0.13 | model="openai/text-embedding-3-large" |
| Cohere | embed-english-v3.0 | 1024 | $0.10 | model="cohere/embed-english-v3.0" |
| Anthropic | voyage-2 | 1024 | $0.10 | model="voyage/voyage-2" |
| Local | sentence-transformers | varies | compute | model="local/all-MiniLM-L6-v2" |

#### Alerting Patterns

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| EmbeddingLatencyHigh | embedding_generation_latency_seconds:p95 > 500ms | WARNING | 5m |
| EmbeddingLatencyCritical | embedding_generation_latency_seconds:p95 > 2s | CRITICAL | 2m |
| EmbeddingDriftDetected | embedding_drift_score > 0.15 | WARNING | 1h |
| EmbeddingDriftCritical | embedding_drift_score > 0.3 | CRITICAL | 30m |
| EmbeddingDimensionMismatch | embedding_dimension_count != expected | CRITICAL | immediate |
| EmbeddingCostSpike | rate(embedding_cost_usd[1h]) > 2x daily_avg | WARNING | 30m |

---

## §vector-observability

### Pattern: Vector Store Observability

Vector store observability tracks the health and performance of embedding storage and retrieval.

#### Vector Store Metrics Hierarchy

| Metric Category | Key Metrics | Purpose |
|-----------------|-------------|---------|
| Index Health | index_size, document_count, fragmentation | Storage state monitoring |
| Query Performance | query_latency, queries_per_second, recall | Search performance |
| Write Performance | insert_latency, upsert_latency, batch_size | Ingestion performance |
| Resource Usage | memory_usage, disk_usage, cpu_utilization | Infrastructure health |

#### Per-Tenant Vector Isolation

| Isolation Level | Implementation | Metrics Scope |
|-----------------|----------------|---------------|
| Namespace | Tenant-prefixed namespace | Per-namespace metrics |
| Collection | Collection per tenant | Per-collection metrics |
| Index | Separate index per tenant | Per-index metrics |
| Cluster | Dedicated cluster | Cluster-level metrics |

#### Index Health Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| vector_index_document_count | Gauge | tenant_id, collection_id | Documents in index |
| vector_index_size_bytes | Gauge | tenant_id, collection_id | Index storage size |
| vector_index_fragmentation_ratio | Gauge | tenant_id, collection_id | Index fragmentation level |
| vector_index_dimensions | Gauge | tenant_id, collection_id | Embedding dimensions |
| vector_index_rebuild_total | Counter | tenant_id, collection_id | Index rebuild events |

#### Query Performance Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| vector_query_latency_seconds | Histogram | tenant_id, collection_id | Search latency |
| vector_query_total | Counter | tenant_id, collection_id | Query count |
| vector_query_top_k | Histogram | tenant_id, collection_id | Top-k values requested |
| vector_query_recall | Gauge | tenant_id, collection_id | Recall accuracy (sampled) |
| vector_query_empty_results_total | Counter | tenant_id, collection_id | Zero-result queries |

#### Vector Database Specific Metrics

**Pinecone:**

| Metric | Source | BAM Metric Name |
|--------|--------|-----------------|
| p50/p95/p99 latency | Pinecone metrics | vector_query_latency_seconds |
| Namespace count | Index describe | vector_index_document_count |
| Index fullness | Index stats | vector_storage_utilization |

**Weaviate:**

| Metric | Source | BAM Metric Name |
|--------|--------|-----------------|
| Objects count | Schema endpoint | vector_index_document_count |
| Shard size | Cluster status | vector_index_size_bytes |
| HNSW segments | Index metrics | vector_index_health |

**Qdrant:**

| Metric | Source | BAM Metric Name |
|--------|--------|-----------------|
| Points count | Collection info | vector_index_document_count |
| Segments count | Collection info | vector_index_fragmentation |
| Indexed percentage | Collection info | vector_index_health |

**pgvector:**

| Metric | Source | BAM Metric Name |
|--------|--------|-----------------|
| Row count | pg_stat | vector_index_document_count |
| Index size | pg_relation_size | vector_index_size_bytes |
| Seq scan ratio | pg_stat | vector_query_efficiency |

#### Per-Tier SLA Alerts

| Tier | Query p95 SLA | Storage Quota | Alert Threshold |
|------|---------------|---------------|-----------------|
| Enterprise | < 50ms | 100GB | Immediate |
| Pro | < 100ms | 10GB | 5m |
| Free | < 500ms | 1GB | 15m |

---

## §context-window

### Pattern: Context Window Monitoring

Context window observability tracks how agents utilize their available context.

#### Context Window Metrics Hierarchy

| Metric Category | Key Metrics | Purpose |
|-----------------|-------------|---------|
| Utilization | context_tokens_used, context_utilization_ratio | Context consumption |
| Composition | system_tokens, memory_tokens, rag_tokens, user_tokens | Token allocation |
| Overflow | context_truncation, context_compression | Overflow handling |
| Efficiency | relevant_token_ratio, context_waste | Context quality |

#### Utilization Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| context_tokens_total | Counter | tenant_id, model, agent_id | Total tokens in context |
| context_tokens_available | Gauge | model | Max context window size |
| context_utilization_ratio | Gauge | tenant_id, model, agent_id | Used / available ratio |
| context_headroom_tokens | Gauge | tenant_id, model | Tokens remaining for output |

#### Composition Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| context_system_tokens | Gauge | tenant_id, agent_id | System prompt tokens |
| context_memory_tokens | Gauge | tenant_id, agent_id | Memory context tokens |
| context_rag_tokens | Gauge | tenant_id, agent_id | RAG context tokens |
| context_user_tokens | Gauge | tenant_id, session_id | User message tokens |
| context_tool_tokens | Gauge | tenant_id, agent_id | Tool definitions tokens |
| context_history_tokens | Gauge | tenant_id, session_id | Conversation history tokens |

#### Overflow Handling Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| context_truncation_total | Counter | tenant_id, agent_id, source | Truncation events |
| context_compression_total | Counter | tenant_id, agent_id | Compression events |
| context_tokens_dropped | Counter | tenant_id, agent_id, source | Tokens removed |
| context_summarization_total | Counter | tenant_id, agent_id | History summarization events |

#### Efficiency Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| context_relevant_token_ratio | Gauge | tenant_id, agent_id | Relevant / total tokens |
| context_duplication_ratio | Gauge | tenant_id, agent_id | Duplicated content ratio |
| context_stale_token_ratio | Gauge | tenant_id, agent_id | Outdated context ratio |
| context_tokens_per_quality | Histogram | tenant_id | Tokens vs. response quality |

#### Token Budget Allocation Strategy

| Context Component | Budget % | Priority | Truncation Strategy |
|-------------------|----------|----------|---------------------|
| System Prompt | 15% | 1 (keep) | Never truncate |
| Tool Definitions | 10% | 2 | Remove unused tools |
| RAG Context | 30% | 3 | Reduce chunks |
| Memory | 15% | 4 | Summarize |
| User Message | 15% | 5 | Truncate oldest |
| Conversation History | 15% | 6 | Summarize/trim |

#### Context Alerting Patterns

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| ContextUtilizationHigh | context_utilization_ratio > 0.9 | WARNING | 5m |
| ContextUtilizationCritical | context_utilization_ratio > 0.98 | CRITICAL | 1m |
| ContextTruncationSpike | rate(context_truncation_total[5m]) > 10 | WARNING | 5m |
| ContextCompressionHigh | rate(context_compression_total[5m]) > 20 | WARNING | 10m |
| ContextHeadroomLow | context_headroom_tokens < 1000 | WARNING | immediate |
| ContextDuplicationHigh | context_duplication_ratio > 0.2 | WARNING | 15m |
| ContextRelevanceLow | context_relevant_token_ratio < 0.5 | WARNING | 15m |

#### Per-Tier Context SLOs

| Tier | Context SLO | Truncation Tolerance | Alert Threshold |
|------|-------------|----------------------|-----------------|
| Enterprise | < 80% utilization | < 1% | Immediate |
| Pro | < 85% utilization | < 5% | 5m |
| Free | < 95% utilization | < 20% | 15m |

---

## Quality Gates

### AI Observability Verification Checklist

#### Instrumentation

- [ ] All LLM calls emit spans with token counts and latency
- [ ] Agent spans capture complete execution lifecycle
- [ ] Tool executions create child spans with results
- [ ] Memory operations are traced with tier context
- [ ] Tenant context propagates to all spans and metrics
- [ ] Embedding generation emits latency histograms with model labels
- [ ] Vector query latency histograms emit for all search operations
- [ ] Context token counts emitted per component

#### Dashboards

- [ ] Agent trace explorer dashboard deployed
- [ ] Model performance dashboard available
- [ ] Embedding generation dashboard deployed
- [ ] Vector store health dashboard available
- [ ] Context utilization dashboard enabled
- [ ] Per-tenant dashboards with tenant_id filter

#### Alerting

- [ ] LLM latency SLO alerts configured per tier
- [ ] Drift detection alerts active
- [ ] Token cost anomaly alerts enabled
- [ ] Context overflow alerts configured
- [ ] Vector query latency alerts per tier
- [ ] Embedding dimension mismatch alerts immediate

#### Security and Privacy

- [ ] Prompt logging respects PII guidelines
- [ ] Tenant isolation verified in trace storage
- [ ] Access controls on full prompt/completion data
- [ ] Cost attribution auditable per tenant

---

## Web Research

| Topic | Query |
|-------|-------|
| LLM Observability | "LLM observability multi-tenant best practices {date}" |
| Agent Tracing | "LLM agent tracing best practices {date}" |
| Langfuse Integration | "Langfuse OpenTelemetry integration {date}" |
| LangSmith Production | "LangSmith tracing production {date}" |
| Model Drift Detection | "model drift detection multi-tenant {date}" |
| Embedding Monitoring | "embedding observability best practices {date}" |
| Embedding Drift | "embedding drift detection production {date}" |
| Vector DB Monitoring | "vector database monitoring production {date}" |
| Pinecone Observability | "Pinecone observability best practices {date}" |
| pgvector Monitoring | "pgvector performance monitoring {date}" |
| Context Window | "LLM context window optimization {date}" |
| Token Management | "token budget strategies production {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **AI observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `ai-observability-*`
- **Monitoring patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `monitoring-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **AI runtimes:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Configure tenant-scoped monitoring
- `bmad-bam-agent-runtime-architecture` - Design agent instrumentation
- `bmad-bam-distributed-tracing-design` - Set up distributed tracing
- `bmad-bam-ai-observability-setup` - Full AI observability design
- `bmad-bam-agent-memory-optimization` - Memory tier optimization
- `bmad-bam-ai-context-management` - Context management design

---

## Change Log

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 6 source files (agent-tracing.md, context-window-observability.md, vector-store-observability.md, embedding-observability.md, model-monitoring-patterns.md, ai-observability-patterns.md) |
