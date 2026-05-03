---
name: bmad-bam-rag
description: 'Design RAG pipeline with multi-tenant vector storage. Use when creating retrieval-augmented generation architectures for multi-tenant platforms.'
module: bam
tags: [rag, ai-runtime, vector-storage]
---

# RAG Pipeline Configuration

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check config | step-20-v to step-22-v |

## Overview

Design RAG (Retrieval-Augmented Generation) pipeline configuration for multi-tenant AI platforms. This workflow establishes vector storage, chunking strategies, embedding models, and tenant-isolated retrieval patterns.

**Your Role:** Guide decisions on RAG pipeline architecture while ensuring tenant isolation and retrieval quality.

## Prerequisites

- [ ] Master architecture document available
- [ ] Tenant isolation model selected
- [ ] **Load patterns:** `{project-root}/_bmad/bam/data/patterns/rag-*.md`

## Outputs

- **RAG Pipeline Config:** `{output_folder}/planning-artifacts/rag-pipeline-config.md`
- **Load template:** `./templates/rag-pipeline-config.md`

## Related Workflows

- `bmad-bam-master-architecture`
- `bmad-bam-agent-runtime`
- `bmad-bam-tenant-isolation`

## On Activation

### Step 1: Load Persistent Facts

Load from `{project-root}/_bmad/bam/data/context/bam-core.md`

### Step 2: Greet User

Greet and confirm RAG pipeline configuration scope.

### Step 3: Begin Workflow

Read `workflow.md` to begin.
