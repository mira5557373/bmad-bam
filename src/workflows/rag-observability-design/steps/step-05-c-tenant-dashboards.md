# Step 5: Per-Tenant Dashboard Design

## Purpose

Design per-tenant RAG dashboards for monitoring and cost attribution.

## Prerequisites

- Step 4 complete (quality baselines established)
- **Load template:** `{project-root}/_bmad/bam/templates/rag-observability-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/vector-store-metrics-template.md`

## Actions

### 1. Design Platform Dashboard

| Panel | Metrics | Visualization | Refresh |
|-------|---------|---------------|---------|
| Retrieval Latency | rag_retrieval_latency_seconds | Heatmap | 1m |
| Query Volume | rate(rag_retrieval_total) | Time series | 1m |
| Empty Results | rag_empty_retrieval_total | Gauge | 1m |
| Relevance Distribution | rag_relevance_score_distribution | Histogram | 5m |
| Quality Scores | groundedness, relevance, faithfulness | Gauges | 5m |

### 2. Design Tenant Dashboard

| Panel | Tenant Filter | Visualization | Drill-down |
|-------|---------------|---------------|------------|
| Query Volume | By tenant_id | Time series | Per collection |
| Collection Health | By tenant_id | Status table | Document details |
| Cost Attribution | By tenant_id | Counter | Per model |
| SLO Compliance | By tenant_id | Gauge | Historical |

### 3. Configure Dashboard Access

| Tier | Dashboard Access | Custom Panels | Export |
|------|------------------|---------------|--------|
| Enterprise | Full + Custom | Yes | Full |
| Pro | Standard | Limited | Summary |
| Free | Basic | No | None |

## Web Research Verification

Search the web: "Grafana RAG dashboard design {date}"
Search the web: "multi-tenant observability dashboards {date}"

## Verification

- [ ] Platform overview dashboard designed
- [ ] Per-tenant dashboard specified
- [ ] Tier-based access configured
- [ ] Cost attribution panels included
- [ ] SLO compliance tracking enabled

## Outputs

- `{output_folder}/operations/ai/rag-observability-config.md`
- `{output_folder}/operations/ai/rag-dashboards.md`

## Quality Gate

This step completes the RAG observability design. Verify against:
- **QG-AI2**: RAG Pipeline Observability section
