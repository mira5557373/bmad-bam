# Step 3: Embedding Observability

## Purpose

Set up embedding generation monitoring including latency, cost, and drift detection.

## Prerequisites

- Step 2 complete (relevance monitoring configured)
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/embedding-observability.md`

## Actions

### 1. Define Embedding Generation Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| rag_embedding_latency_seconds | Histogram | tenant_id, model | Generation latency |
| rag_embedding_tokens_total | Counter | tenant_id, model | Token consumption |
| rag_embedding_cost_usd | Counter | tenant_id, model | Cost tracking |
| rag_embedding_batch_size | Histogram | tenant_id | Batch size distribution |

### 2. Configure Drift Detection

| Check | Frequency | Method | Threshold |
|-------|-----------|--------|-----------|
| Norm Distribution | Hourly | Statistical comparison | stddev > 0.1 |
| Similarity to Baseline | Daily | Cosine similarity | < 0.95 |
| Model Version Change | Immediate | Event detection | Any change |

### 3. Set Up Cost Attribution

| Model | Input Cost/1K | Output Cost | Track By |
|-------|---------------|-------------|----------|
| text-embedding-3-small | $0.02 | N/A | tenant_id |
| text-embedding-3-large | $0.13 | N/A | tenant_id |

## Soft Gate Checkpoint

**Steps 1-3 complete the embedding observability configuration.**

Present embedding observability summary and ask for confirmation before proceeding.

## Web Research Verification

Search the web: "embedding drift detection production {date}"
Search the web: "embedding cost optimization {date}"

## Verification

- [ ] Embedding latency tracking configured
- [ ] Cost attribution per tenant enabled
- [ ] Drift detection scheduled
- [ ] Model version monitoring active

## Next Step

Proceed to `step-04-c-quality-baselines.md` with embedding observability configured.
