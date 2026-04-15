# Step 2: Chunking Strategy Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ⏸️ ALWAYS pause after presenting findings and await user direction

---

## Purpose

Design token-level vs sentence-level chunking, buffer management, and rate limiting for streaming responses.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-streaming-design
---

## Actions

### 1. Select Chunking Strategy

| Strategy | Granularity | UX | Cost |
|----------|-------------|-----|------|
| Token-level | Per token | Real-time feel | Higher |
| Word-level | Per word | Readable flow | Medium |
| Sentence-level | Per sentence | Clean display | Lower |
| Hybrid | Adaptive | Best of both | Variable |

### 2. Design Buffer Management

| Buffer Type | Size | Purpose |
|-------------|------|---------|
| Output buffer | 512 bytes | Chunk assembly |
| Client buffer | 4KB | Render smoothing |
| Retry buffer | Full response | Recovery |

### 3. Configure Rate Limiting

| Limit Type | Value | Scope |
|------------|-------|-------|
| Tokens/second | 50 | Per request |
| Concurrent streams | 10 | Per tenant |
| Bandwidth | 1 MB/s | Per tenant |

**Verify current best practices with web search:**
Search the web: "LLM streaming chunking strategies {date}"

_Source: [URL]_

---

## Verification

- [ ] Chunking strategy selected
- [ ] Buffer management designed
- [ ] Rate limiting configured

---

## Outputs

- Chunking strategy specification
- Buffer management design
- Rate limiting configuration

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Accept chunking design and proceed to error handling
```

---

## Next Step

Proceed to `step-03-c-error-handling-design.md` to design error handling.
