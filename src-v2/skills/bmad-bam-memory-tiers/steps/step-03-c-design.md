# Step 03: Design Long-Term Memory

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design tenant and global memory tiers with vector stores
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Use memory patterns and vector database patterns
- 🚫 Do NOT: Design isolation verification (that's Step 04)
- 🔍 Use web search: Verify current best practices for vector database multi-tenancy
- ⚠️ Note: Tenant-isolated embeddings are critical for data security

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Vector store design for semantic memory
- Tenant-isolated embeddings
- Memory retrieval with tenant filter
- Memory consolidation strategies
- Long-term knowledge persistence

**OUT OF SCOPE:**
- Session/conversation memory (Step 02)
- Memory isolation verification (Step 04)
- Final compilation (Step 05)

---

## Purpose

Design the long-term memory tiers (tenant and global) that persist knowledge across sessions and provide semantic retrieval capabilities. These tiers handle tenant-specific knowledge, learned preferences, and shared system knowledge.

---

## Prerequisites

- Step 02 completed: Short-term memory designed
- Memory tier requirements identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: vector-database
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: embedding-strategy

**Web Research (Required):**

Search the web: "vector database multi-tenant architecture {date}"
Search the web: "tenant-isolated embeddings patterns {date}"
Search the web: "semantic memory for AI agents best practices {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Design Vector Store Architecture

Select and configure vector database for semantic memory:

| Attribute | Specification |
|-----------|---------------|
| Vector DB | {{vector_db}} (pgvector / pinecone / weaviate / qdrant / milvus) |
| Embedding Model | {{embedding_model}} |
| Embedding Dimensions | {{dimensions}} |
| Similarity Metric | {{metric}} (cosine / euclidean / dot_product) |
| Index Type | {{index_type}} (HNSW / IVF / Flat) |

**Vector DB Selection Matrix:**

| Vector DB | Multi-Tenant | Managed | Scale | Cost |
|-----------|--------------|---------|-------|------|
| pgvector | RLS + Schema | Self | Medium | Low |
| Pinecone | Namespace | Managed | High | Medium |
| Weaviate | Multi-tenancy native | Both | High | Medium |
| Qdrant | Collection per tenant | Both | High | Medium |
| Milvus | Partition | Self | Very High | Medium |

### 2. Design Tenant Memory Tier

Tenant memory stores tenant-specific knowledge and preferences:

| Attribute | Specification |
|-----------|---------------|
| Scope | Tenant lifetime |
| Storage | Vector DB + PostgreSQL |
| Isolation | Namespace/Collection per tenant |
| TTL | None (persistent) |
| Max Size | {{max_tenant_memory}} |

**Tenant Memory Contents:**

| Content Type | Storage | Retrieval Method |
|--------------|---------|------------------|
| Knowledge Base | Vector DB | Semantic search |
| User Preferences | PostgreSQL | Key-value lookup |
| Interaction History | PostgreSQL + Vector | Hybrid search |
| Custom Instructions | PostgreSQL | Direct load |
| Learned Entities | PostgreSQL + Vector | Entity lookup |
| Domain Context | Vector DB | Semantic search |

**Tenant Memory Key Pattern:**

```
tenant:{tenant_id}:memory:{memory_type}:{memory_id}
```

Example: `tenant:abc123:memory:knowledge:doc_xyz789`

### 3. Design Tenant-Isolated Embeddings

**Isolation Strategies by Vector DB:**

| Strategy | Implementation | Pros | Cons |
|----------|----------------|------|------|
| Namespace-per-Tenant | Pinecone namespaces, Weaviate multi-tenancy | Strong isolation | Higher cost |
| Collection-per-Tenant | Qdrant collections, Milvus partitions | Strong isolation | Management overhead |
| Filtered Shared | Single collection + tenant_id filter | Lower cost | Query-time filtering |
| Hybrid | Shared for small, dedicated for large | Balanced | Complexity |

**Recommended Pattern:**

| Tenant Size | Strategy | Rationale |
|-------------|----------|-----------|
| Small (<1M vectors) | Filtered Shared | Cost efficient |
| Medium (1M-10M vectors) | Namespace/Partition | Balance of isolation and cost |
| Large (>10M vectors) | Collection-per-Tenant | Performance and isolation |
| Enterprise | Database-per-Tenant | Maximum isolation |

**Embedding Metadata Schema:**

| Field | Type | Purpose |
|-------|------|---------|
| tenant_id | string | **REQUIRED** - Tenant isolation |
| source_type | string | Document, conversation, etc. |
| created_at | timestamp | Temporal filtering |
| updated_at | timestamp | Freshness scoring |
| access_level | string | Permission filtering |
| content_hash | string | Deduplication |
| chunk_index | int | Source reconstruction |

### 4. Design Memory Retrieval with Tenant Filter

**CRITICAL: All retrieval MUST include tenant filter**

**Retrieval Query Pattern:**

```
Query:
  embedding: [query_vector]
  filter:
    tenant_id: {current_tenant_id}  # REQUIRED
    source_type: {optional_filter}
    created_after: {optional_date}
  top_k: {result_count}
  include_metadata: true
```

**Retrieval Strategies:**

| Strategy | Use Case | Implementation |
|----------|----------|----------------|
| Semantic Search | General knowledge retrieval | Vector similarity |
| Hybrid Search | Keyword + semantic | BM25 + Vector fusion |
| MMR (Maximal Marginal Relevance) | Diverse results | Similarity + diversity scoring |
| Filtered Search | Specific document types | Metadata + vector |

**Relevance Scoring:**

| Factor | Weight | Notes |
|--------|--------|-------|
| Vector Similarity | 0.6 | Primary ranking |
| Recency | 0.2 | Prefer fresh content |
| Source Authority | 0.1 | User docs > system docs |
| Access Frequency | 0.1 | Popular content boost |

### 5. Design Global Memory Tier

Global memory stores shared knowledge across all tenants:

| Attribute | Specification |
|-----------|---------------|
| Scope | System-wide |
| Storage | Vector DB (shared collection) |
| Isolation | Read-only for agents |
| TTL | Admin-managed |
| Contents | System prompts, shared knowledge, best practices |

**Global Memory Contents:**

| Content Type | Description | Update Frequency |
|--------------|-------------|------------------|
| System Prompts | Default agent instructions | On deployment |
| Domain Knowledge | Industry-specific knowledge | Monthly |
| Best Practices | Recommended approaches | Quarterly |
| Tool Documentation | Available tool descriptions | On change |
| FAQ | Common questions and answers | Weekly |

**CRITICAL: Global memory MUST NOT contain:**
- [ ] Any tenant-specific data
- [ ] User-generated content
- [ ] PII or sensitive information
- [ ] Tenant configuration details

### 6. Design Memory Consolidation

Consolidate short-term memories into long-term storage:

| Consolidation Type | Trigger | Process |
|--------------------|---------|---------|
| Conversation Summary | Session end | Summarize + embed key insights |
| Entity Learning | Pattern detected | Extract + store entities |
| Preference Update | User feedback | Update preference store |
| Knowledge Integration | Document upload | Chunk + embed + index |

**Consolidation Pipeline:**

| Stage | Action | Output |
|-------|--------|--------|
| 1. Extract | Identify memorable content | Content candidates |
| 2. Filter | Remove duplicates, low-value | Filtered candidates |
| 3. Embed | Generate embeddings | Vectors |
| 4. Index | Store with metadata | Indexed memories |
| 5. Verify | Confirm tenant isolation | Verification log |

**Memory Deduplication:**

| Method | Implementation | Dedup Threshold |
|--------|----------------|-----------------|
| Content Hash | SHA-256 of text | Exact match |
| Embedding Similarity | Cosine similarity | >0.95 |
| Semantic Dedup | LLM comparison | Context-dependent |

---

## COLLABORATION MENUS (A/P/C):

After presenting long-term memory design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into vector store architecture
- **P (Party Mode)**: Bring architect perspectives on embedding strategies
- **C (Continue)**: Proceed to memory isolation design

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: vector store design, tenant isolation strategy
- Process enhanced insights on embedding and retrieval
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review long-term memory design for multi-tenant AI agents"
- Present synthesized recommendations from Atlas (Platform), Nova (AI Runtime)
- Return to A/P/C menu

#### If 'C' (Continue):
- Save long-term memory design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to: `step-04-c-document.md`

---

## Verification

- [ ] Vector store architecture documented
- [ ] Tenant memory tier designed
- [ ] **CRITICAL:** Tenant-isolated embeddings specified
- [ ] **CRITICAL:** Retrieval includes mandatory tenant filter
- [ ] Global memory tier designed with no tenant data
- [ ] Consolidation strategies defined
- [ ] Deduplication methods specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Vector store architecture specification
- Tenant memory tier design
- Tenant-isolated embedding strategy
- Memory retrieval patterns with tenant filtering
- Global memory tier specification
- Memory consolidation pipeline
- Embedding metadata schema

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## NEXT STEP:

Proceed to `step-04-c-document.md` to design memory isolation and compliance.
