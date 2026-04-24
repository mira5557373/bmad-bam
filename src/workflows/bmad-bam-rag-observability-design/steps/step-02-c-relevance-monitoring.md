# Step 2: Chunk Relevance Monitoring

## Purpose

Configure chunk relevance score tracking and baseline establishment.

## Prerequisites

- Step 1 complete (retrieval metrics defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rag-observability`

## Actions

### 1. Define Relevance Score Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| rag_relevance_score_distribution | Histogram | tenant_id, collection_id | Score distribution |
| rag_relevance_score_avg | Gauge | tenant_id, collection_id | Average relevance |
| rag_relevance_score_min | Gauge | tenant_id, collection_id | Minimum score in result |

### 2. Establish Relevance Baselines

| Quality Level | Score Range | Action |
|---------------|-------------|--------|
| High | >= 0.8 | No action |
| Medium | 0.6 - 0.8 | Monitor |
| Low | < 0.6 | Alert |

### 3. Configure Degradation Alerting

| Alert | Condition | Severity | Duration |
|-------|-----------|----------|----------|
| RelevanceScoreLow | avg(score) < 0.6 | WARNING | 15m |
| RelevanceScoreCritical | avg(score) < 0.4 | CRITICAL | 5m |
| RelevanceDrift | week-over-week drop > 10% | WARNING | 1h |

## Soft Gate Checkpoint

**Steps 1-3 complete the relevance monitoring configuration.**

Present relevance monitoring summary and ask for confirmation before proceeding.

## Web Research Verification

Search the web: "RAG relevance score monitoring {date}"
Search the web: "chunk quality metrics {date}"

## Verification

- [ ] Relevance score histogram configured
- [ ] Baseline thresholds defined
- [ ] Degradation alerts configured
- [ ] Per-tenant relevance tracking enabled

## Outputs

- Relevance monitoring configuration
- Baseline threshold specification
- Degradation alerting rules

## Next Step

Proceed to `step-03-c-embedding-observability.md` with relevance monitoring configured.
