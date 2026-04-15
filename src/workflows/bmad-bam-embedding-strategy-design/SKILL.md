---
name: bmad-bam-embedding-strategy-design
displayName: Embedding Strategy Design
description: Design embedding models and tenant isolation for vector search. Use when the user requests to 'design embedding strategy' or 'create embedding architecture'.
module: bam
tags: [ai-runtime, embeddings, vector-search]
---

# Embedding Strategy Design

## Overview

This workflow designs the embedding strategy for multi-tenant AI platforms including model selection, dimension optimization, tenant namespacing, batch processing, caching, quality metrics, cost optimization, and integration patterns. It produces comprehensive embedding specifications that ensure tenant isolation while optimizing for quality and cost.

Act as an ML Platform Architect specializing in embedding models and semantic search with multi-tenant requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing embedding infrastructure for RAG systems
- Selecting embedding models for multi-tenant platforms
- Optimizing embedding costs across tenant tiers
- Planning embedding caching and batch processing

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new embedding strategy | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing strategy | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against quality criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Model Selection

Evaluate and select embedding models:
- OpenAI text-embedding-3-small/large
- Cohere embed-v3
- Sentence transformers
- Custom fine-tuned models

### Step 2: Dimension Optimization

Optimize embedding dimensions for use case:
- Dimensionality reduction techniques
- PCA/matryoshka embeddings
- Trade-offs between quality and storage

### Step 3: Tenant Namespacing

Design tenant isolation for embeddings:
- Namespace prefixes for vectors
- Metadata tenant tagging
- Cross-tenant prevention

### Step 4: Batch Processing

Design efficient batch embedding:
- Optimal batch sizes
- Rate limiting strategies
- Retry and error handling

### Step 5: Caching Strategy

Design embedding cache architecture:
- Content-addressable caching
- Cache invalidation strategies
- Multi-tier caching

### Step 6: Quality Metrics

Define embedding quality measurement:
- Recall benchmarks
- Semantic similarity tests
- A/B testing frameworks

### Step 7: Cost Optimization

Optimize embedding costs:
- Tier-based model selection
- Caching ROI analysis
- Usage quotas

### Step 8: Integration Patterns

Design integration with RAG pipeline:
- Embedding service interfaces
- Async processing patterns
- Error handling

### Step 9: Documentation

Generate comprehensive documentation:
- Architecture decisions
- Operations runbook
- Model evaluation guide

### Quality Gates

- [ ] Embedding model selected with justification
- [ ] Tenant isolation verified
- [ ] Batch processing optimized
- [ ] Quality metrics defined
- [ ] Cost projections documented

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates embedding integration with agent runtime
- **QG-I2** (Tenant Safety) - Ensures tenant isolation in embedding generation

### Entry Gate
- Vector database design completed (bmad-bam-vector-database-design)
- RAG pipeline design available

### Exit Gate
- Embedding strategy documented
- Model selection justified with benchmarks
- Cost projections validated

## Output

- `{output_folder}/planning-artifacts/architecture/embedding-strategy-design.md`
- `{output_folder}/planning-artifacts/architecture/embedding-operations-runbook.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/embedding-strategy-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/embedding-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
