# BAM Vector Store Observability Guide

**When to load:** During vector database design, similarity search optimization, or when user mentions vector metrics, index health, or embedding storage monitoring.

**Integrates with:** DevOps (operations), Architect (design), AI Platform (implementation)

---

## Core Concepts

### Vector Store Metrics Hierarchy

Vector store observability tracks the health and performance of embedding storage and retrieval.

| Metric Category | Key Metrics | Purpose |
|-----------------|-------------|---------|
| Index Health | index_size, document_count, fragmentation | Storage state monitoring |
| Query Performance | query_latency, queries_per_second, recall | Search performance |
| Write Performance | insert_latency, upsert_latency, batch_size | Ingestion performance |
| Resource Usage | memory_usage, disk_usage, cpu_utilization | Infrastructure health |

### Per-Tenant Vector Isolation

Vector store metrics must track tenant-scoped namespaces and collections.

| Isolation Level | Implementation | Metrics Scope |
|-----------------|----------------|---------------|
| Namespace | Tenant-prefixed namespace | Per-namespace metrics |
| Collection | Collection per tenant | Per-collection metrics |
| Index | Separate index per tenant | Per-index metrics |
| Cluster | Dedicated cluster | Cluster-level metrics |

---

## Application Guidelines

When implementing vector store observability in multi-tenant systems:

1. **Track per-tenant document counts**: Monitor index growth per tenant for capacity planning
2. **Measure query latency by tenant**: Detect noisy neighbors affecting search performance
3. **Monitor index fragmentation**: High fragmentation degrades query performance
4. **Alert on storage quota usage**: Prevent tenant quota violations
5. **Track embedding dimensions**: Ensure consistency across tenant collections

---

## Vector Store Metrics Specification

### Index Health Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| vector_index_document_count | Gauge | tenant_id, collection_id | Documents in index |
| vector_index_size_bytes | Gauge | tenant_id, collection_id | Index storage size |
| vector_index_fragmentation_ratio | Gauge | tenant_id, collection_id | Index fragmentation level |
| vector_index_dimensions | Gauge | tenant_id, collection_id | Embedding dimensions |
| vector_index_rebuild_total | Counter | tenant_id, collection_id | Index rebuild events |

### Query Performance Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| vector_query_latency_seconds | Histogram | tenant_id, collection_id | Search latency |
| vector_query_total | Counter | tenant_id, collection_id | Query count |
| vector_query_top_k | Histogram | tenant_id, collection_id | Top-k values requested |
| vector_query_recall | Gauge | tenant_id, collection_id | Recall accuracy (sampled) |
| vector_query_empty_results_total | Counter | tenant_id, collection_id | Zero-result queries |

### Write Performance Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| vector_insert_latency_seconds | Histogram | tenant_id, collection_id | Insert latency |
| vector_upsert_latency_seconds | Histogram | tenant_id, collection_id | Upsert latency |
| vector_delete_latency_seconds | Histogram | tenant_id, collection_id | Delete latency |
| vector_batch_size | Histogram | tenant_id, collection_id | Batch operation sizes |
| vector_write_errors_total | Counter | tenant_id, collection_id, error_type | Write failures |

### Resource Usage Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| vector_memory_usage_bytes | Gauge | tenant_id, collection_id | Memory consumed |
| vector_disk_usage_bytes | Gauge | tenant_id, collection_id | Disk consumed |
| vector_cpu_utilization | Gauge | tenant_id, collection_id | CPU utilization |
| vector_connection_pool_active | Gauge | tenant_id | Active connections |
| vector_connection_pool_idle | Gauge | tenant_id | Idle connections |

---

## Alerting Patterns

### Vector Store Alerts

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| VectorQueryLatencyHigh | vector_query_latency_seconds:p95 > 100ms | WARNING | 5m |
| VectorQueryLatencyCritical | vector_query_latency_seconds:p95 > 500ms | CRITICAL | 2m |
| VectorIndexFragmentationHigh | vector_index_fragmentation_ratio > 0.3 | WARNING | 1h |
| VectorStorageQuotaWarning | vector_disk_usage_bytes / quota > 0.8 | WARNING | 15m |
| VectorStorageQuotaCritical | vector_disk_usage_bytes / quota > 0.95 | CRITICAL | 5m |
| VectorWriteErrorSpike | rate(vector_write_errors_total[5m]) > 1 | WARNING | 5m |

### Per-Tier SLA Alerts

| Tier | Query p95 SLA | Storage Quota | Alert Threshold |
|------|---------------|---------------|-----------------|
| Enterprise | < 50ms | 100GB | Immediate |
| Pro | < 100ms | 10GB | 5m |
| Free | < 500ms | 1GB | 15m |

---

## Dashboard Components

### Vector Store Health Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Index Document Count | vector_index_document_count | Time series by collection |
| Index Size Growth | vector_index_size_bytes | Time series |
| Fragmentation Levels | vector_index_fragmentation_ratio | Gauge per collection |
| Storage Usage | vector_disk_usage_bytes | Stacked area |
| Connection Pool Status | vector_connection_pool_active/idle | Gauge |

### Query Performance Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Query Latency Distribution | vector_query_latency_seconds | Heatmap |
| Queries Per Second | rate(vector_query_total) | Time series |
| Top-K Distribution | vector_query_top_k | Histogram |
| Empty Results Rate | vector_query_empty_results_total | Time series |
| Recall Tracking | vector_query_recall | Time series |

### Per-Tenant Vector Dashboard

| Panel | Metrics | Tenant Filter |
|-------|---------|---------------|
| Document Count | vector_index_document_count | By tenant_id |
| Storage Usage | vector_disk_usage_bytes | By tenant_id |
| Query Volume | rate(vector_query_total) | By tenant_id |
| Query Latency | vector_query_latency_seconds:p95 | By tenant_id |
| Quota Utilization | usage / quota | By tenant_id |

---

## Vector Database Specific Metrics

### Pinecone Metrics

| Metric | Source | BAM Metric Name |
|--------|--------|-----------------|
| p50/p95/p99 latency | Pinecone metrics | vector_query_latency_seconds |
| Namespace count | Index describe | vector_index_document_count |
| Index fullness | Index stats | vector_storage_utilization |

### Weaviate Metrics

| Metric | Source | BAM Metric Name |
|--------|--------|-----------------|
| Objects count | Schema endpoint | vector_index_document_count |
| Shard size | Cluster status | vector_index_size_bytes |
| HNSW segments | Index metrics | vector_index_health |

### Qdrant Metrics

| Metric | Source | BAM Metric Name |
|--------|--------|-----------------|
| Points count | Collection info | vector_index_document_count |
| Segments count | Collection info | vector_index_fragmentation |
| Indexed percentage | Collection info | vector_index_health |

### pgvector Metrics

| Metric | Source | BAM Metric Name |
|--------|--------|-----------------|
| Row count | pg_stat | vector_index_document_count |
| Index size | pg_relation_size | vector_index_size_bytes |
| Seq scan ratio | pg_stat | vector_query_efficiency |

---

## Implementation Checklist

### Instrumentation

- [ ] Query latency histograms emit for all search operations
- [ ] Document counts tracked per tenant/collection
- [ ] Storage usage metrics collected per tenant
- [ ] Write operations emit latency and error metrics
- [ ] Index health metrics exported from vector DB
- [ ] Connection pool metrics monitored

### Dashboards

- [ ] Vector store health dashboard deployed
- [ ] Query performance dashboard available
- [ ] Per-tenant storage dashboard enabled
- [ ] Capacity planning dashboard with projections

### Alerting

- [ ] Query latency SLO alerts configured per tier
- [ ] Storage quota alerts active
- [ ] Fragmentation alerts with rebuild recommendations
- [ ] Write error spike detection enabled

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `vector-database`
- **embedding-strategy:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `embedding-strategy`
- **rag-retrieval:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rag-retrieval`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "vector database monitoring production {date}"
- Search: "Pinecone observability best practices {date}"
- Search: "pgvector performance monitoring {date}"
- Search: "Qdrant metrics Prometheus {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| What query latency threshold indicates problems? | p95 > 100ms for production workloads | User experience degrades above this threshold |
| How often to rebuild fragmented indexes? | When fragmentation > 30% or weekly | Balance write performance vs query performance |
| Should each tenant have separate collections? | Yes for Enterprise, shared for Free/Pro | Isolation vs cost tradeoff |
| How to handle quota violations? | Soft limit at 80%, hard block at 100% | Grace period for cleanup |

---

## Related Workflows

- `bmad-bam-ai-observability-setup` - Full AI observability design
- `bmad-bam-agent-runtime-architecture` - Vector store integration
- `bmad-bam-tenant-aware-observability` - Tenant-scoped metrics
