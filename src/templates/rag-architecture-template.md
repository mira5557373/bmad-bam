---
name: rag-architecture-template
description: Document retrieval-augmented generation pipeline architecture for multi-tenant AI platforms
category: architecture
version: 1.0.0
type: template
priority: HIGH
web_research_enabled: true
source_verification: true
---

# RAG Pipeline Architecture - {{pipeline_name}}

## Purpose

Use this template to document retrieval-augmented generation (RAG) pipeline architecture including vector store configuration, chunking strategies, embedding models, retrieval parameters, and ranking algorithms. Complete this for each RAG-enabled agent to ensure consistent knowledge retrieval across multi-tenant deployments.

## Document Control

| Field | Value |
|-------|-------|
| Version | {{version}} |
| Date | {{date}} |
| Author | {{user_name}} |
| Status | DRAFT / APPROVED / FINAL |
| Last Review | {{last_review_date}} |
| Next Review | {{next_review_date}} |

---

## Pipeline Overview

### Basic Information

| Property | Value |
|----------|-------|
| Pipeline Name | {{pipeline_name}} |
| Pipeline ID | {{pipeline_id}} |
| Agent Name | {{agent_name}} |
| Module | {{module_name}} |
| Environment | DEV / STAGING / PRODUCTION |
| Tenant Scope | SHARED / TENANT-ISOLATED / HYBRID |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     RAG Pipeline Architecture                    │
│                                                                  │
│  ┌──────────┐   ┌──────────────┐   ┌─────────────────────────┐ │
│  │  Query   │──►│   Embedding  │──►│   Vector Store Query    │ │
│  │Processing│   │    Model     │   │   ({{vector_store}})    │ │
│  └──────────┘   └──────────────┘   └───────────┬─────────────┘ │
│                                                 │               │
│                                                 ▼               │
│  ┌──────────┐   ┌──────────────┐   ┌─────────────────────────┐ │
│  │   LLM    │◄──│   Context    │◄──│       Reranking         │ │
│  │ Response │   │  Assembly    │   │    ({{reranker}})       │ │
│  └──────────┘   └──────────────┘   └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Pipeline Components

| Component | Technology | Version | Status |
|-----------|------------|---------|--------|
| Vector Store | {{vector_store}} | {{vs_version}} | {{vs_status}} |
| Embedding Model | {{embedding_model}} | {{em_version}} | {{em_status}} |
| Reranker | {{reranker}} | {{rr_version}} | {{rr_status}} |
| LLM | {{llm_model}} | {{llm_version}} | {{llm_status}} |

---

## Vector Store Configuration

### Store Selection

| Property | Value |
|----------|-------|
| Provider | {{vector_provider}} |
| Type | {{vector_type}} |
| Index Type | {{index_type}} |
| Distance Metric | {{distance_metric}} |
| Dimensions | {{dimensions}} |

### Infrastructure Configuration

```yaml
vector_store:
  provider: {{vector_provider}}
  
  connection:
    host: {{vs_host}}
    port: {{vs_port}}
    database: {{vs_database}}
    
  index:
    name: {{index_name}}
    type: {{index_type}}
    metric: {{distance_metric}}
    
  performance:
    ef_construction: {{ef_construction}}
    ef_search: {{ef_search}}
    m: {{m_parameter}}
    
  scaling:
    shards: {{shards}}
    replicas: {{replicas}}
    
  tenant_isolation:
    method: {{isolation_method}}
    namespace_field: "tenant_id"
```

### Multi-Tenant Isolation Strategy

| Strategy | Implementation | Use Case |
|----------|----------------|----------|
| Namespace | Separate namespaces per tenant | Default isolation |
| Collection | Separate collections per tenant | High isolation |
| Metadata Filter | tenant_id filter on queries | Shared index |
| Dedicated Instance | Per-tenant vector store | Enterprise tier |

### Tenant Configuration

| Tier | Isolation | Index Quota | Query Limits |
|------|-----------|-------------|--------------|
| Free | Metadata Filter | {{free_quota}} vectors | {{free_limit}}/min |
| Pro | Namespace | {{pro_quota}} vectors | {{pro_limit}}/min |
| Enterprise | Collection/Instance | {{ent_quota}} vectors | {{ent_limit}}/min |

---

## Chunking Strategy

### Chunking Configuration

```yaml
chunking:
  strategy: {{chunking_strategy}}
  
  parameters:
    chunk_size: {{chunk_size}}
    chunk_overlap: {{chunk_overlap}}
    min_chunk_size: {{min_chunk}}
    max_chunk_size: {{max_chunk}}
    
  splitters:
    - type: {{splitter_1}}
      priority: 1
      config:
        separators: {{separators_1}}
        
    - type: {{splitter_2}}
      priority: 2
      config:
        {{splitter_2_config}}
```

### Chunking Strategies

| Strategy | Description | Best For | Config |
|----------|-------------|----------|--------|
| Fixed Size | Fixed token/character count | General text | size={{size}}, overlap={{overlap}} |
| Semantic | Sentence/paragraph boundaries | Documents | model={{model}} |
| Recursive | Hierarchical splitting | Code, structured | separators={{seps}} |
| Document-Aware | Respects document structure | PDF, HTML | parser={{parser}} |

### Content Type Chunking

| Content Type | Strategy | Chunk Size | Overlap | Notes |
|--------------|----------|------------|---------|-------|
| Plain Text | {{text_strategy}} | {{text_size}} | {{text_overlap}} | {{text_notes}} |
| Markdown | {{md_strategy}} | {{md_size}} | {{md_overlap}} | {{md_notes}} |
| Code | {{code_strategy}} | {{code_size}} | {{code_overlap}} | {{code_notes}} |
| PDF | {{pdf_strategy}} | {{pdf_size}} | {{pdf_overlap}} | {{pdf_notes}} |
| HTML | {{html_strategy}} | {{html_size}} | {{html_overlap}} | {{html_notes}} |

### Metadata Extraction

| Field | Extraction Method | Required | Example |
|-------|-------------------|----------|---------|
| tenant_id | Context injection | YES | "tenant_abc123" |
| source | Document property | YES | "knowledge-base" |
| document_id | Generated UUID | YES | "doc_xyz789" |
| chunk_index | Sequential | YES | 0, 1, 2... |
| created_at | Timestamp | YES | "{date}-04-07T..." |
| {{custom_field}} | {{method}} | {{required}} | {{example}} |

---

## Embedding Model

### Model Configuration

```yaml
embedding:
  provider: {{embedding_provider}}
  model: {{embedding_model}}
  version: {{embedding_version}}
  
  parameters:
    dimensions: {{dimensions}}
    max_tokens: {{max_tokens}}
    batch_size: {{batch_size}}
    normalize: {{normalize}}
    
  performance:
    latency_target: {{latency_target}}ms
    throughput: {{throughput}}/s
    
  fallback:
    enabled: {{fallback_enabled}}
    model: {{fallback_model}}
```

### Embedding Model Comparison

| Model | Dimensions | Max Tokens | Latency | Cost | Use Case |
|-------|------------|------------|---------|------|----------|
| {{model_1}} | {{dim_1}} | {{tok_1}} | {{lat_1}}ms | {{cost_1}} | {{use_1}} |
| {{model_2}} | {{dim_2}} | {{tok_2}} | {{lat_2}}ms | {{cost_2}} | {{use_2}} |
| {{model_3}} | {{dim_3}} | {{tok_3}} | {{lat_3}}ms | {{cost_3}} | {{use_3}} |

### Embedding Pipeline

| Stage | Operation | Config |
|-------|-----------|--------|
| Preprocessing | Text normalization | {{normalize_config}} |
| Tokenization | Model tokenizer | max_length={{max_len}} |
| Encoding | Model inference | batch_size={{batch}} |
| Postprocessing | Normalization | L2 / None |
| Storage | Vector insert | async={{async}} |

### Caching Strategy

```yaml
embedding_cache:
  enabled: {{cache_enabled}}
  
  storage:
    type: {{cache_type}}
    ttl: {{cache_ttl}}
    max_size: {{cache_size}}
    
  key_strategy: {{key_strategy}}
  
  tenant_isolation:
    enabled: {{tenant_cache_isolation}}
    prefix: "tenant_{{tenant_id}}"
```

---

## Retrieval Parameters

### Query Configuration

```yaml
retrieval:
  strategy: {{retrieval_strategy}}
  
  parameters:
    top_k: {{top_k}}
    similarity_threshold: {{similarity_threshold}}
    max_tokens: {{max_context_tokens}}
    
  query_expansion:
    enabled: {{expansion_enabled}}
    method: {{expansion_method}}
    
  filters:
    tenant_id: "required"
    {{custom_filter}}: "{{filter_value}}"
```

### Retrieval Strategies

| Strategy | Description | Parameters | Use Case |
|----------|-------------|------------|----------|
| Dense | Vector similarity | top_k={{k}}, threshold={{t}} | Semantic search |
| Sparse | BM25/TF-IDF | k1={{k1}}, b={{b}} | Keyword matching |
| Hybrid | Dense + Sparse | alpha={{alpha}} | Balanced |
| Multi-Query | Query variations | num_queries={{n}} | Complex queries |

### Query Processing

| Step | Operation | Configuration |
|------|-----------|---------------|
| 1 | Query Preprocessing | {{preprocess_config}} |
| 2 | Query Embedding | model={{model}} |
| 3 | Query Expansion | method={{method}} |
| 4 | Vector Search | top_k={{k}}, threshold={{t}} |
| 5 | Metadata Filtering | filters={{filters}} |
| 6 | Deduplication | method={{dedup_method}} |

### Tenant-Aware Retrieval

| Configuration | Free | Pro | Enterprise |
|---------------|------|-----|------------|
| top_k | {{free_k}} | {{pro_k}} | {{ent_k}} |
| Max Context | {{free_ctx}} tokens | {{pro_ctx}} tokens | {{ent_ctx}} tokens |
| Query Expansion | NO | YES | YES |
| Custom Filters | NO | LIMITED | FULL |

---

## Ranking and Reranking

### Reranker Configuration

```yaml
reranking:
  enabled: {{rerank_enabled}}
  model: {{rerank_model}}
  
  parameters:
    top_n: {{top_n}}
    batch_size: {{rerank_batch}}
    
  scoring:
    method: {{scoring_method}}
    weights:
      relevance: {{relevance_weight}}
      recency: {{recency_weight}}
      authority: {{authority_weight}}
      
  fallback:
    enabled: {{rerank_fallback}}
    method: {{fallback_method}}
```

### Ranking Signals

| Signal | Weight | Source | Calculation |
|--------|--------|--------|-------------|
| Semantic Similarity | {{sim_weight}} | Vector search | cosine(query, doc) |
| Reranker Score | {{rerank_weight}} | Cross-encoder | model(query, doc) |
| Recency | {{recency_weight}} | Metadata | decay(age) |
| Authority | {{auth_weight}} | Metadata | source_rank |
| User Feedback | {{feedback_weight}} | Analytics | click_rate |

### Ranking Pipeline

| Stage | Input | Output | Model/Method |
|-------|-------|--------|--------------|
| Initial Retrieval | Query | top-{{k}} candidates | Vector similarity |
| Reranking | Candidates | Reranked list | {{rerank_model}} |
| Score Fusion | Multiple scores | Final score | {{fusion_method}} |
| Final Selection | Ranked list | top-{{n}} results | Threshold filter |

### Evaluation Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| MRR@{{k}} | >{{mrr_target}} | Mean Reciprocal Rank |
| NDCG@{{k}} | >{{ndcg_target}} | Normalized DCG |
| Recall@{{k}} | >{{recall_target}} | Retrieval Recall |
| Precision@{{k}} | >{{precision_target}} | Retrieval Precision |
| Latency P99 | <{{latency_target}}ms | End-to-end latency |

---

## Context Assembly

### Context Window Configuration

```yaml
context_assembly:
  max_tokens: {{max_context_tokens}}
  
  template: |
    {{context_template}}
    
  sections:
    - name: system
      max_tokens: {{system_tokens}}
      
    - name: retrieved_context
      max_tokens: {{retrieved_tokens}}
      truncation: {{truncation_strategy}}
      
    - name: conversation_history
      max_tokens: {{history_tokens}}
      
    - name: user_query
      max_tokens: {{query_tokens}}
```

### Truncation Strategies

| Strategy | Description | Best For |
|----------|-------------|----------|
| First-N | Keep first N tokens | Ordered context |
| Last-N | Keep last N tokens | Recent context |
| Relevance | Keep highest scored | Ranked retrieval |
| Summary | Summarize overflow | Long documents |

### Source Attribution

```yaml
attribution:
  enabled: {{attribution_enabled}}
  
  format:
    inline: {{inline_citations}}
    footer: {{footer_citations}}
    
  metadata:
    - source_name
    - document_id
    - chunk_index
    - retrieval_score
```

---

## Performance Configuration

### Latency Budget

| Stage | Target | Max | Budget % |
|-------|--------|-----|----------|
| Query Processing | {{qp_target}}ms | {{qp_max}}ms | {{qp_budget}}% |
| Embedding | {{emb_target}}ms | {{emb_max}}ms | {{emb_budget}}% |
| Vector Search | {{vs_target}}ms | {{vs_max}}ms | {{vs_budget}}% |
| Reranking | {{rr_target}}ms | {{rr_max}}ms | {{rr_budget}}% |
| Context Assembly | {{ca_target}}ms | {{ca_max}}ms | {{ca_budget}}% |
| **Total** | {{total_target}}ms | {{total_max}}ms | 100% |

### Scaling Configuration

```yaml
scaling:
  embedding_service:
    min_replicas: {{emb_min}}
    max_replicas: {{emb_max}}
    target_cpu: {{emb_cpu}}%
    
  vector_store:
    shards: {{vs_shards}}
    replicas: {{vs_replicas}}
    
  reranker_service:
    min_replicas: {{rr_min}}
    max_replicas: {{rr_max}}
    gpu_enabled: {{gpu_enabled}}
```

### Caching Layers

| Cache | TTL | Size | Hit Rate Target |
|-------|-----|------|-----------------|
| Query Embedding | {{qe_ttl}} | {{qe_size}} | >{{qe_hit}}% |
| Search Results | {{sr_ttl}} | {{sr_size}} | >{{sr_hit}}% |
| Reranker Results | {{rr_ttl}} | {{rr_size}} | >{{rr_hit}}% |

---

## Data Ingestion

### Ingestion Pipeline

```yaml
ingestion:
  sources:
    - type: {{source_1}}
      config:
        {{source_1_config}}
        
    - type: {{source_2}}
      config:
        {{source_2_config}}
        
  processing:
    batch_size: {{ingest_batch}}
    parallelism: {{ingest_parallel}}
    
  schedule:
    type: {{schedule_type}}
    cron: "{{cron_expression}}"
```

### Tenant Data Management

| Operation | API | Permissions | Notes |
|-----------|-----|-------------|-------|
| Upload | POST /tenants/{id}/documents | ADMIN | {{upload_notes}} |
| Delete | DELETE /tenants/{id}/documents/{doc_id} | ADMIN | {{delete_notes}} |
| Refresh | POST /tenants/{id}/refresh | ADMIN | {{refresh_notes}} |
| List | GET /tenants/{id}/documents | READ | {{list_notes}} |

### Data Freshness

| Source Type | Update Frequency | Reindex Trigger |
|-------------|------------------|-----------------|
| Static Documents | On change | Manual |
| API Data | {{api_freq}} | Schedule |
| Database | {{db_freq}} | CDC / Schedule |
| Real-time | Streaming | Continuous |

---

## Monitoring

### Key Metrics

```yaml
metrics:
  - name: rag_retrieval_latency
    type: histogram
    buckets: [10, 25, 50, 100, 250, 500, 1000]
    labels: [tenant_tier, pipeline_stage]
    
  - name: rag_retrieval_count
    type: counter
    labels: [tenant_id, status]
    
  - name: rag_relevance_score
    type: histogram
    buckets: [0.1, 0.3, 0.5, 0.7, 0.9, 1.0]
    
  - name: rag_cache_hit_rate
    type: gauge
    labels: [cache_type]
```

### Alerts

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| High Latency | p99 > {{latency_alert}}ms | HIGH | {{latency_action}} |
| Low Relevance | avg_score < {{relevance_alert}} | MEDIUM | {{relevance_action}} |
| Index Drift | freshness > {{drift_alert}} | MEDIUM | {{drift_action}} |
| Cache Degradation | hit_rate < {{cache_alert}}% | LOW | {{cache_action}} |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version_1}} | {{date_1}} | {{author_1}} | {{changes_1}} |
| {{version_2}} | {{date_2}} | {{author_2}} | {{changes_2}} |
| {{version_3}} | {{date_3}} | {{author_3}} | {{changes_3}} |

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| AI Engineer | {{name}} | {{date}} | Pending |
| Platform Architect | {{name}} | {{date}} | Pending |
| Data Engineer | {{name}} | {{date}} | Pending |
| Security Engineer | {{name}} | {{date}} | Pending |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "RAG architecture patterns enterprise {date}"
- "vector store multi-tenant isolation {date}"
- "embedding model selection best practices {date}"
- "chunking strategies document retrieval {date}"
- "reranking algorithms RAG pipelines {date}"

Incorporate relevant findings into the document sections above.
_Source: [URL]_ for key findings.

---

## Verification Checklist

- [ ] Vector store configuration complete with tenant isolation
- [ ] Chunking strategy defined for all content types
- [ ] Embedding model selected and configured
- [ ] Retrieval parameters tuned per tenant tier
- [ ] Reranking pipeline documented
- [ ] Context assembly and truncation strategy defined
- [ ] Performance targets and latency budgets set
- [ ] Monitoring and alerting configured
- [ ] Web research findings incorporated

---

## Related Documents

- Master Architecture: `{output_folder}/planning-artifacts/master-architecture.md`
- Agent Runtime Architecture: `{output_folder}/planning-artifacts/agent-runtime.md`
- Model Card: `{output_folder}/planning-artifacts/model-card.md`
- Memory Tier Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: memory-tiers`
- QG-M3 Checklist: `{project-root}/_bmad/bam/checklists/qg-m3-agent-runtime.md`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
