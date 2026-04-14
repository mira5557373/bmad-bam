# Step 2: Chunking Strategy

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the chunking strategy for document segmentation, including chunk size configuration, semantic chunking, content-type specific approaches, and metadata extraction.

---

## Prerequisites

- Step 1 completed: Ingestion design documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: chunking-patterns
- **Web research (if available):** Search for current chunking best practices

---

## Inputs

- Ingestion design from Step 1
- Content type inventory
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Embedding model constraints

---

## Actions

### 1. Define Chunk Size Configuration

Determine optimal chunk parameters:

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Default Chunk Size | {tokens} | Balance context/retrieval |
| Chunk Overlap | {tokens} | Context continuity |
| Min Chunk Size | {tokens} | Avoid fragments |
| Max Chunk Size | {tokens} | Model limits |

Embedding Model Constraints:

| Model | Max Tokens | Recommended Chunk | Notes |
|-------|------------|-------------------|-------|
| text-embedding-3-small | 8191 | 512-1024 | Cost-effective |
| text-embedding-3-large | 8191 | 512-1024 | Higher quality |
| Cohere embed-v3 | 512 | 256-512 | Multilingual |
| Custom | {limit} | {recommended} | {notes} |

### 2. Select Chunking Strategy

Choose chunking approach per content type:

| Strategy | Description | Best For | Implementation |
|----------|-------------|----------|----------------|
| Fixed Size | Token/char count | Uniform content | LangChain RecursiveTextSplitter |
| Semantic | Sentence/paragraph | Prose documents | Sentence transformers |
| Document | Headings/sections | Structured docs | Document parsers |
| Code-Aware | Functions/classes | Source code | AST-based |
| Sliding Window | Overlapping windows | Dense content | Custom |

### 3. Content-Type Specific Strategies

Define chunking per content type:

| Content Type | Strategy | Chunk Size | Overlap | Splitter Config |
|--------------|----------|------------|---------|-----------------|
| Plain Text | Semantic | 512 | 50 | Sentence boundaries |
| Markdown | Document | 1024 | 100 | Header-based |
| Code | Code-Aware | 256 | 0 | Function/class |
| PDF | Document | 512 | 50 | Page-aware |
| HTML | Document | 512 | 50 | DOM structure |
| JSON/YAML | Structural | 256 | 0 | Object-based |

### 4. Design Metadata Extraction

Define metadata to extract per chunk:

| Metadata Field | Source | Extraction Method | Required |
|----------------|--------|-------------------|----------|
| tenant_id | Context | Injected | YES |
| document_id | Source | UUID generation | YES |
| chunk_index | Processing | Sequential | YES |
| source_type | Source | File extension | YES |
| created_at | Processing | Timestamp | YES |
| title | Content | First heading/filename | NO |
| author | Content | Document metadata | NO |
| language | Content | Detection | NO |
| keywords | Content | NER/extraction | NO |
| parent_chunk | Processing | Reference | NO |

### 5. Design Parent-Child Relationships

Define hierarchical chunk structure:

| Relationship | Purpose | Implementation |
|--------------|---------|----------------|
| Document -> Sections | Navigate to context | Reference links |
| Section -> Paragraphs | Drill down | Parent ID |
| Chunk -> Sub-chunks | Fine-grained | Tree structure |
| Cross-references | Related content | Link extraction |

Hierarchy Configuration:

| Level | Chunk Size | Use Case |
|-------|------------|----------|
| Document | Full doc | Overview retrieval |
| Section | 2000 tokens | Topic retrieval |
| Paragraph | 500 tokens | Detail retrieval |
| Sentence | 100 tokens | Precise matching |

### 6. Handle Edge Cases

Define edge case handling:

| Edge Case | Detection | Handling |
|-----------|-----------|----------|
| Empty chunk | Length check | Skip |
| Too large | Size check | Split recursively |
| Too small | Size check | Merge with adjacent |
| Encoding issues | Error handler | Convert/skip |
| Tables | Content detection | Special parser |
| Images | File type | Extract alt text/caption |
| Code blocks | Fence detection | Preserve formatting |

**Verify current best practices with web search:**
Search the web: "RAG chunking strategies best practices {date}"
Search the web: "semantic chunking LLM retrieval {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the chunking strategy analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into chunking parameters and edge cases
- **P (Party Mode)**: Bring ML engineer and content specialist perspectives
- **C (Continue)**: Accept chunking strategy and proceed to embedding management
- **[Specific refinements]**: Describe chunking concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: chunk sizes, strategies per content type, metadata
- Process enhanced insights on chunking trade-offs
- Ask user: "Accept these refined chunking decisions? (y/n)"
- If yes, integrate into chunking specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review RAG chunking strategy for multi-tenant AI platform"
- Process ML engineer and content specialist perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save chunking strategy to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-embedding-management.md`

---

## Verification

- [ ] Chunk size configuration defined
- [ ] Chunking strategy selected per content type
- [ ] Metadata extraction fields specified
- [ ] Parent-child relationships designed
- [ ] Edge cases handled
- [ ] Patterns align with pattern registry

---

## Outputs

- Chunking strategy specification
- Content-type configuration
- Metadata schema
- Edge case handling rules

---

## Next Step

Proceed to `step-03-c-embedding-management.md` to configure embedding pipeline.
