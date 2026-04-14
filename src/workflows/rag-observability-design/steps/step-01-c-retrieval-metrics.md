# Step 1: Retrieval Metrics Design

## Purpose

Design retrieval latency and volume metrics for RAG pipeline observability.

## Prerequisites

- RAG pipeline architecture defined
- Vector store selected
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rag-observability`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/rag-observability.md`

## Actions

### 1. Define Core Retrieval Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| rag_retrieval_latency_seconds | Histogram | tenant_id, collection_id | Query latency tracking |
| rag_chunks_retrieved_total | Counter | tenant_id, collection_id | Chunk volume |
| rag_empty_retrieval_total | Counter | tenant_id, collection_id | Zero-result queries |
| rag_retrieval_recall | Gauge | tenant_id, query_type | Retrieval quality |

### 2. Define Latency Buckets

Configure histogram buckets for retrieval latency:
- Fast: 10ms, 25ms, 50ms
- Normal: 100ms, 250ms, 500ms
- Slow: 1s, 2.5s, 5s

### 3. Configure Per-Tier SLOs

| Tier | p50 | p95 | p99 | Empty Rate |
|------|-----|-----|-----|------------|
| Enterprise | 25ms | 100ms | 250ms | <1% |
| Pro | 50ms | 250ms | 500ms | <5% |
| Free | 100ms | 500ms | 2s | <10% |

## Soft Gate Checkpoint

**Steps 1-3 complete the retrieval metrics design.**

Present retrieval metrics summary and ask for confirmation before proceeding.

## Web Research Verification

Search the web: "RAG retrieval latency monitoring {date}"
Search the web: "semantic search metrics production {date}"

## Verification

- [ ] Retrieval latency histogram defined with appropriate buckets
- [ ] Chunk count metrics configured
- [ ] Empty retrieval tracking enabled
- [ ] Per-tier SLOs documented

## Next Step

Proceed to `step-02-c-relevance-monitoring.md` with retrieval metrics defined.
