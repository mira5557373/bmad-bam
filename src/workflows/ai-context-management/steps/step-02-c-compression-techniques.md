# Step 2: Compression Techniques

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ⏸️ ALWAYS pause after presenting findings and await user direction

---

## Purpose

Design summarization approaches, semantic compression, and reference extraction for context optimization.

## Prerequisites

- Step 1 (Context Strategy) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-context

---

## Actions

### 1. Define Summarization Approaches

| Approach | Use Case | Compression Ratio |
|----------|----------|-------------------|
| Extractive | Key sentences | 3:1 |
| Abstractive | Full summary | 5:1 |
| Hierarchical | Long documents | 10:1 |
| Incremental | Conversation | Rolling |

### 2. Design Semantic Compression

| Technique | Method | Quality Trade-off |
|-----------|--------|-------------------|
| Entity Extraction | Named entities only | High loss |
| Fact Extraction | Key facts | Medium loss |
| Intent Preservation | Action-oriented | Low loss |

### 3. Configure Reference Extraction

| Reference Type | Storage | Retrieval |
|----------------|---------|-----------|
| Key-value | Redis | O(1) |
| Semantic | Vector DB | Similarity |
| Structured | PostgreSQL | Query |

**Verify current best practices with web search:**
Search the web: "context compression LLM techniques {date}"

_Source: [URL]_

---

## Verification

- [ ] Summarization approaches defined
- [ ] Semantic compression designed
- [ ] Reference extraction configured

---

## Outputs

- Summarization approach specification
- Semantic compression techniques
- Reference extraction configuration

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Accept compression design and proceed to caching
```

---

## Next Step

Proceed to `step-03-c-caching-retrieval.md` to design caching and retrieval.
