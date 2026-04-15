# RAG Observability Design Instructions

## Purpose

Design comprehensive RAG pipeline observability for multi-tenant AI platforms including retrieval metrics, chunk relevance monitoring, and per-tenant dashboards.

## Mode Detection

1. Check for existing RAG observability config at `{output_folder}/operations/ai/rag-observability-config.md`
2. If exists: Offer Edit or Validate mode
3. If not exists: Default to Create mode

## Execution Flow

1. Load project context from `{project-root}/**/project-context.md`
2. Load RAG observability guide from `{project-root}/_bmad/bam/data/agent-guides/bam/rag-observability.md`
3. Execute steps in selected mode
4. Generate output using `{project-root}/_bmad/bam/data/templates/rag-observability-template.md`
5. Verify against QG-AI2 RAG Pipeline Observability section

## Quality Gate Integration

This workflow directly supports:
- **QG-AI2**: RAG Pipeline Observability checklist items
- **QG-P1**: Production readiness for RAG-based features
