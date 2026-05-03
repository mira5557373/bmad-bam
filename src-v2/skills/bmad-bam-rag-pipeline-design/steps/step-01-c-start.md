# Step 01: Gather RAG Pipeline Requirements

## MANDATORY EXECUTION RULES

- NEVER generate configuration without understanding requirements
- Load RAG patterns before proceeding
- Pause after gathering requirements for user confirmation

---

## YOUR TASK

Gather RAG pipeline requirements including:
- Vector store provider selection
- Tenant isolation model
- Chunking strategy preferences
- Embedding model requirements

---

## Main Sequence

### 1. Load RAG Patterns

Read: `{project-root}/_bmad/bam/data/patterns/rag-*.md`

### 2. Gather Requirements

| Dimension | Question |
|-----------|----------|
| Vector Store | Pinecone, Weaviate, Qdrant, or pgvector? |
| Isolation | Namespace, collection, or database per tenant? |
| Chunking | Fixed, semantic, recursive, or custom strategy? |
| Embedding | OpenAI, Voyage, or self-hosted model? |
| Retrieval | Top-k count, reranking, hybrid search? |

### 3. Confirm Requirements

Present summary and await user confirmation.

---

## NEXT STEP

Proceed to `step-02-c-vector.md` for vector store architecture design.
