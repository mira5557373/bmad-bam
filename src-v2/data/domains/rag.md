# RAG/Knowledge - BAM Domain Context

**Loaded by:** ZRP, ZVS, ZSC, ZHS, ZKG, ZEL, ZCC, ZCW, ZIM, ZQT, ZSR  
**Related Workflows:** bmad-bam-rag-pipeline, bmad-bam-knowledge-management

---

## Overview

RAG (Retrieval-Augmented Generation) patterns for multi-tenant knowledge systems with strict tenant isolation.

## Core Concepts

### Vector Store Isolation Models

| Model | Isolation | Performance | Cost |
|-------|-----------|-------------|------|
| Index-per-tenant | Full | Optimal | High |
| Namespace | Good | Good | Medium |
| Metadata filter | Basic | Varies | Low |

### RAG Pipeline Architecture

```
┌─────────────────────────────────────────────┐
│                RAG Pipeline                  │
│  ┌─────────┐  ┌──────────┐  ┌────────────┐ │
│  │ Ingest  │─►│ Retrieve │─►│ Generate   │ │
│  │ (chunk) │  │ (search) │  │ (synthesize│ │
│  └─────────┘  └──────────┘  └────────────┘ │
│       ▲            │              │         │
│       │     tenant_id      tenant_id        │
│       └────────────┴──────────────┘         │
└─────────────────────────────────────────────┘
```

## Decision Matrix

| Requirement | Pattern | Rationale |
|-------------|---------|-----------|
| Tenant isolation | vector-store-multi-tenant | Prevent data leakage |
| Chunking | semantic-chunking | Context-aware splits |
| Search quality | hybrid-search | Vector + keyword fusion |
| Knowledge graphs | knowledge-graph | Entity relationships |

## Quality Checks

- [ ] **CRITICAL:** Vector store has tenant isolation
- [ ] **CRITICAL:** No cross-tenant retrieval possible
- [ ] Citation tracking implemented
- [ ] Embedding versioning in place

## Related Patterns

**Core RAG:**
- `{project-root}/_bmad/bam/data/patterns/rag-pipeline.md` - End-to-end orchestration
- `{project-root}/_bmad/bam/data/patterns/vector-store-multi-tenant.md` - Isolated indexes
- `{project-root}/_bmad/bam/data/patterns/semantic-chunking.md` - Document splitting

**Search & Retrieval:**
- `{project-root}/_bmad/bam/data/patterns/hybrid-search.md` - Vector + keyword
- `{project-root}/_bmad/bam/data/patterns/query-transformation.md` - Query rewriting

**Knowledge Management:**
- `{project-root}/_bmad/bam/data/patterns/knowledge-graph.md` - Graph-based storage
- `{project-root}/_bmad/bam/data/patterns/embedding-lifecycle.md` - Model management

## Web Research

- "RAG multi-tenant vector store patterns {date}"
- "semantic chunking best practices {date}"
- "hybrid search vector keyword fusion {date}"
