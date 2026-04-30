---
pattern_id: semantic-chunking
shortcode: ZSC
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Semantic Chunking - BAM Pattern

**Loaded by:** ZSC  
**Applies to:** Multi-tenant RAG systems  
**See also:** [rag-pipeline.md](rag-pipeline.md), [context-compilation.md](context-compilation.md)

---

## When to Use

- Document ingestion for RAG systems
- Knowledge base construction
- Long-form content that needs context-aware splitting
- Documents with natural semantic boundaries
- Multi-format document processing (PDF, HTML, Markdown)

## When NOT to Use

- Fixed-length token requirements (use fixed chunking)
- Highly structured data (tables, forms)
- Code files (use AST-based chunking)
- Real-time streaming content

## Architecture

### Chunking Strategy Comparison

```
┌─────────────────────────────────────────────────────────────────┐
│                  CHUNKING STRATEGIES                             │
│                                                                  │
│  FIXED CHUNKING               SEMANTIC CHUNKING                  │
│  ┌──────────────────┐        ┌──────────────────────────────┐   │
│  │ Chunk 1 [500 tok]│        │ Chunk 1: Introduction        │   │
│  │ "The quick brown │        │ "The quick brown fox jumps   │   │
│  │ fox jumps over..."│        │ over the lazy dog. This      │   │
│  ├──────────────────┤        │ demonstrates agility."       │   │
│  │ Chunk 2 [500 tok]│        ├──────────────────────────────┤   │
│  │ "...the lazy dog.│        │ Chunk 2: Technical Details   │   │
│  │ This demonstrate"│        │ "The implementation uses     │   │
│  ├──────────────────┤        │ a recursive algorithm..."    │   │
│  │ Chunk 3 [500 tok]│        ├──────────────────────────────┤   │
│  │ "s agility. The  │        │ Chunk 3: Conclusion          │   │
│  │ implementation..."│        │ "In summary, this approach   │   │
│  └──────────────────┘        │ provides optimal results."   │   │
│                               └──────────────────────────────┘   │
│  Breaks mid-sentence          Preserves semantic units          │
└─────────────────────────────────────────────────────────────────┘
```

### Semantic Boundary Detection

```
┌─────────────────────────────────────────────────────────────────┐
│                SEMANTIC BOUNDARY DETECTION                       │
│                                                                  │
│  Document                                                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ # Chapter 1: Introduction                    ◄── H1 boundary ││
│  │                                                              ││
│  │ This chapter introduces the concept...                       ││
│  │                                                              ││
│  │ ## 1.1 Background                           ◄── H2 boundary ││
│  │                                                              ││
│  │ The background of this work stems from...                    ││
│  │                                                              ││
│  │ ---                                         ◄── HR boundary ││
│  │                                                              ││
│  │ ## 1.2 Motivation                           ◄── H2 boundary ││
│  │                                                              ││
│  │ Our motivation comes from three key factors:                 ││
│  │ 1. Performance requirements                                  ││
│  │ 2. Scalability needs                                         ││
│  │ 3. Cost optimization                       ◄── List context ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Boundary Priorities:                                            │
│  1. Document structure (headers, sections)                       │
│  2. Paragraph breaks (double newline)                            │
│  3. Sentence boundaries (. ! ?)                                  │
│  4. Fixed size fallback (if chunk too large)                     │
└─────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
semantic_chunking:
  version: "1.0.0"
  bam_controlled: true
  
  strategy: "semantic"  # semantic, fixed, paragraph, recursive
  
  semantic_config:
    boundary_detection:
      - type: "header"
        weight: 1.0
        patterns: ["^#{1,6}\\s", "^\\d+\\.\\s"]
      - type: "section"
        weight: 0.9
        patterns: ["^---$", "^\\*\\*\\*$"]
      - type: "paragraph"
        weight: 0.7
        patterns: ["\\n\\n"]
      - type: "sentence"
        weight: 0.5
        patterns: ["[.!?]\\s"]
        
    embedding_similarity:
      enabled: true
      model: "text-embedding-3-small"
      threshold: 0.7
      
  size_config:
    target_tokens: 512
    max_tokens: 1024
    min_tokens: 100
    overlap_tokens: 50
    
  document_types:
    markdown:
      parser: "markdown"
      preserve_code_blocks: true
    pdf:
      parser: "pdfplumber"
      extract_tables: true
    html:
      parser: "beautifulsoup"
      remove_scripts: true
      
  tenant_overrides:
    enabled: true
    configurable:
      - target_tokens
      - overlap_tokens
      - boundary_detection
```

### Chunking Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                   CHUNKING PIPELINE                              │
│                                                                  │
│  Document Input                                                  │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────────┐                                            │
│  │  Format Parser  │  Detect: PDF, Markdown, HTML, DOCX         │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐                                            │
│  │ Text Normalizer │  Clean whitespace, fix encoding            │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐                                            │
│  │Boundary Detector│  Find headers, sections, paragraphs        │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐                                            │
│  │ Semantic Scorer │  Score boundaries by importance            │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐                                            │
│  │  Size Enforcer  │  Split if > max_tokens                     │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐                                            │
│  │ Overlap Adder   │  Add context overlap between chunks        │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐                                            │
│  │Metadata Enricher│  Add chunk_id, position, doc_ref           │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼                                                      │
│  Chunks with Metadata                                            │
└─────────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| Semantic | Context-preserving, better retrieval | Complex, slower | Long-form docs |
| Fixed | Predictable, fast | Breaks context | Uniform content |
| Paragraph | Natural boundaries | Variable sizes | Blog posts |
| Recursive | Flexible, hierarchical | Complex logic | Nested structures |
| Embedding-based | Most accurate boundaries | Expensive, slow | High-value docs |

## Quality Checks

- [ ] Chunks preserve semantic meaning
- [ ] No mid-sentence breaks (unless forced by max_tokens)
- [ ] Code blocks kept intact
- [ ] Tables chunked as units
- [ ] Metadata includes document reference
- [ ] **CRITICAL:** Tenant config isolation for chunk settings

## Web Research Queries

- "semantic chunking strategies RAG {date}"
- "LangChain RecursiveCharacterTextSplitter best practices {date}"
- "document chunking for embeddings {date}"
- "PDF chunking preserving structure {date}"
- "optimal chunk size for RAG retrieval {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | Chunking quality metrics verified |

## Related Patterns

- [rag-pipeline.md](rag-pipeline.md) - End-to-end orchestration
- [embedding-lifecycle.md](embedding-lifecycle.md) - Embedding management
- [context-compilation.md](context-compilation.md) - Context assembly
- [context-window-optimization.md](context-window-optimization.md) - Token management
