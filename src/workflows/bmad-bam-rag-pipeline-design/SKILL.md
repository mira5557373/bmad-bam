---
name: bmad-bam-rag-pipeline-design
displayName: RAG Pipeline Design
description: Design retrieval-augmented generation architecture including chunking, embeddings, and retrieval optimization. Use when the user requests to 'design RAG pipeline' or 'create knowledge retrieval architecture'.
module: bam
tags: [ai-runtime, rag, knowledge-management]
---

# RAG Pipeline Design

## Overview

This workflow defines the RAG architecture including ingestion design, chunking strategy, embedding management, retrieval optimization, and hybrid search patterns for AI agents in multi-tenant environments. It produces the architectural decisions that govern all knowledge retrieval in the platform. Run after master PRD and agent runtime architecture are defined.

Act as an AI Runtime Architect specializing in retrieval-augmented generation with multi-tenant knowledge isolation requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing knowledge retrieval for AI agents
- Defining vector store architecture and tenant isolation
- Establishing chunking and embedding strategies
- Optimizing retrieval quality and performance

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new RAG pipeline architecture | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing RAG architecture | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-M3 criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Ingestion Design

Define the data ingestion pipeline:

- Source connectors (documents, APIs, databases)
- Preprocessing and transformation
- Tenant data segregation
- Incremental update strategy
- Data freshness requirements

### Step 2: Chunking Strategy

Design chunking approach:

- Chunk size and overlap configuration
- Semantic vs fixed-size chunking
- Content-type specific strategies (code, docs, HTML)
- Metadata extraction and enrichment
- Parent-child chunk relationships

### Step 3: Embedding Management

Configure embedding pipeline:

- Embedding model selection
- Batch processing configuration
- Caching strategy
- Multi-model support
- Version management

### Step 4: Retrieval Optimization

Design retrieval strategy:

- Dense vs sparse retrieval trade-offs
- Hybrid search configuration
- Reranking pipeline
- Query expansion techniques
- Tenant-aware filtering

### Step 5: Hybrid Search

Implement hybrid search:

- Dense + sparse score fusion
- BM25 keyword matching
- Semantic similarity weighting
- Multi-index strategies
- Fallback mechanisms

**Soft Gate:** Steps 1-5 complete the RAG pipeline design. Present a summary and ask for confirmation.

### Quality Gates

- [ ] Tenant isolation in vector store
- [ ] Chunking strategy documented
- [ ] Embedding model justified
- [ ] Retrieval metrics defined
- [ ] Performance targets established

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates RAG within agent runtime architecture

### Entry Gate
- QG-F1 (Foundation) must pass before starting
- Agent runtime architecture should be complete

### Exit Gate
- QG-M3 checklist items for RAG verified
- RAG pipeline architecture documented with ADRs
- Performance benchmarks established

## Output

- `{output_folder}/planning-artifacts/architecture/rag-pipeline-architecture.md`
- `{output_folder}/planning-artifacts/architecture/vector-store-design.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/rag-architecture-template.md`
- Memory Tier Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/memory-tiers.md`
- Agent Runtime Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
