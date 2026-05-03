# Step 10: Load Existing RAG Configuration

## MANDATORY EXECUTION RULES

- NEVER modify the RAG configuration during this step - load only
- Load RAG patterns before proceeding
- Pause after presenting findings and await user direction

---

## YOUR TASK

Locate, load, and parse the existing RAG pipeline configuration document. Extract current settings and present a structured summary for the user to identify what needs modification.

---

## Load Sequence

### 1. Locate Document

Search in priority order:

| Priority | Location |
|----------|----------|
| 1 | `{output_folder}/planning-artifacts/rag-pipeline-config.md` |
| 2 | `{project-root}/docs/architecture/rag-pipeline-config.md` |
| 3 | `{project-root}/**/rag-pipeline-config.md` (fallback) |

**If not found:** Suggest Create mode (step-01-c-start.md) or request path.

### 2. Parse Configuration

Extract current settings:

```yaml
rag_config:
  vector_store: [pinecone|weaviate|qdrant|pgvector]
  tenant_isolation: [namespace|collection|database]
  chunking_strategy: [fixed|semantic|recursive|custom]
  embedding_model: [string]
  retrieval_top_k: [int]
```

### 3. Present Edit Menu

Display configuration summary:

```
================================================================================
RAG PIPELINE CONFIGURATION - EDIT MODE
================================================================================
Document: rag-pipeline-config.md
Version: {version}
================================================================================

CURRENT CONFIGURATION:
- Vector Store: {provider}
- Tenant Isolation: {isolation}
- Chunking Strategy: {strategy}
- Embedding Model: {model}
- Retrieval Top-K: {top_k}

EDITABLE SECTIONS:
[1] Vector Store - Modify provider or settings
[2] Tenant Isolation - Change isolation strategy
[3] Chunking Strategy - Update chunking configuration
[4] Embedding Model - Change embedding provider
[5] Retrieval Pipeline - Adjust retrieval settings
[6] Knowledge Refresh - Update refresh schedules
[7] Tier Limits - Modify tier-based limits

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- RAG configuration document located
- Current settings extracted and displayed
- Edit menu presented
- User has selected section(s) to edit

---

## NEXT STEP

After user identifies modifications, proceed to `step-11-e-apply.md`.
