---
name: rag-observability-design
displayName: RAG Observability Design
description: Design RAG pipeline observability for multi-tenant platform. Use when the user requests to 'setup RAG monitoring' or 'design retrieval observability'.
module: bam
tags: [operations, ai, observability, rag]
---

# RAG Observability Design

## Overview

This workflow designs comprehensive RAG (Retrieval-Augmented Generation) pipeline observability for multi-tenant AI platforms. It covers retrieval metrics, chunk relevance monitoring, embedding observability, quality baselines, and per-tenant dashboards. Produces RAG observability configuration and monitoring documentation.

Act as an AI Platform Engineer specializing in RAG pipeline monitoring and semantic search observability.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

## When to Use

- Setting up RAG pipeline observability
- Configuring retrieval latency monitoring
- Establishing chunk relevance baselines
- Designing embedding quality tracking
- Creating per-tenant RAG dashboards

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Design new RAG observability | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify design completeness | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Retrieval Metrics Design
- Query latency tracking (p50/p95/p99)
- Chunks retrieved per query
- Empty retrieval rate monitoring
- Per-tenant retrieval metrics

### Step 2: Chunk Relevance Monitoring
- Relevance score distribution tracking
- Relevance baseline establishment
- Score degradation alerting
- Quality trend analysis

### Step 3: Embedding Observability
- Embedding generation latency
- Embedding cost per tenant
- Embedding drift detection
- Model version tracking

### Step 4: RAG Quality Baselines
- Groundedness score definition
- Answer relevance metrics
- Faithfulness tracking
- Context utilization monitoring

### Step 5: Per-Tenant Dashboard Design
- Tenant-scoped metrics views
- Collection health monitoring
- Cost attribution dashboards
- SLO compliance tracking

### Quality Gates

- [ ] Retrieval metrics defined
- [ ] Relevance baselines established
- [ ] Embedding observability configured
- [ ] Quality metrics operational
- [ ] Per-tenant dashboards designed

## Quality Gates

This workflow contributes to:
- **QG-AI2** (AI Observability Gate) - RAG Pipeline Observability section
- **QG-P1** (Production Readiness) - Supports operational readiness

### Entry Gate
- RAG pipeline architecture defined
- Vector store selected and configured

### Exit Gate
- QG-AI2 RAG checklist items verified
- RAG observability configured
- Dashboards designed

## Output

- `{output_folder}/operations/ai/rag-observability-config.md`
- `{output_folder}/operations/ai/rag-dashboards.md`

## References

- Template: `bam/templates/rag-observability-template.md`
- Guide: `bam/data/agent-guides/bam/rag-observability.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
