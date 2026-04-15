# Step 3: Caching and Retrieval

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ⏸️ ALWAYS pause after presenting findings and await user direction

---

## Purpose

Design context caching strategies, RAG integration, and conversation state management.

## Prerequisites

- Steps 1-2 (Context Strategy, Compression Techniques) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-context

---

## Actions

### 1. Design Caching Strategies

| Cache Level | TTL | Content |
|-------------|-----|---------|
| Session | Session lifetime | Full context |
| Short-term | 1 hour | Recent summaries |
| Long-term | 24 hours | User preferences |
| Persistent | Permanent | System prompts |

### 2. Configure RAG Integration

| Integration Point | When | How |
|-------------------|------|-----|
| Pre-retrieval | Context building | Semantic search |
| Dynamic | Mid-conversation | Topic detection |
| Fallback | Low confidence | Broad retrieval |

### 3. Design State Management

| State Type | Storage | Update Frequency |
|------------|---------|------------------|
| Conversation | Redis | Per message |
| User Memory | Mem0 | Per session |
| Tenant Context | PostgreSQL | On change |

**Verify current best practices with web search:**
Search the web: "context caching AI agents {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Accept caching design and complete Create mode
```

---

## Verification

- [ ] Caching strategies designed
- [ ] RAG integration configured
- [ ] State management defined

---

## Outputs

- **Output to:** `{output_folder}/planning-artifacts/architecture/ai-context-management-design.md`

---

## Next Step

Create mode complete.
