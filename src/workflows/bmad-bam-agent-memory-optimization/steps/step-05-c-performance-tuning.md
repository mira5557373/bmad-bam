# Step 5: Performance Tuning

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Optimize memory performance through hot path optimization, cache warming, compression, and batch operations to meet latency SLAs.

---

## Prerequisites

- Steps 1-4 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: performance
- **Web research (if available):** Search for memory performance optimization techniques

---

## Inputs

- Quota design from Step 4
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Identify Hot Paths

| Hot Path | Frequency | Current Latency | Target Latency |
|----------|-----------|-----------------|----------------|
| Session read | Very high | [ ] ms | < 5 ms |
| User memory lookup | High | [ ] ms | < 20 ms |
| Tenant search | Medium | [ ] ms | < 50 ms |
| Memory write | Medium | [ ] ms | < 30 ms |

### 2. Design Cache Warming

| Trigger | What to Warm | Priority |
|---------|--------------|----------|
| Session start | Recent user memories | High |
| Agent activation | Relevant tenant knowledge | Medium |
| Scheduled | Popular global content | Low |

### 3. Configure Compression

| Data Type | Algorithm | Ratio | CPU Cost |
|-----------|-----------|-------|----------|
| Text memories | LZ4 | 3-4x | Low |
| JSON structures | ZSTD | 4-5x | Medium |
| Embeddings | FP16 quantization | 2x | Low |
| Large blobs | GZIP | 5-6x | High |

### 4. Implement Batch Operations

| Operation | Batch Size | Max Wait | Use Case |
|-----------|------------|----------|----------|
| Memory writes | 100 | 100ms | Bulk updates |
| Memory reads | 50 | 50ms | Context loading |
| Evictions | 1000 | 1s | Cleanup jobs |

### 5. Design Connection Pooling

| Pool | Min Connections | Max Connections | Timeout |
|------|-----------------|-----------------|---------|
| Redis | 10 | 100 | 5s |
| PostgreSQL | 5 | 50 | 10s |
| Mem0 | 5 | 30 | 10s |

### 6. Configure Read Replicas

| Tier | Read Replicas | Routing | Consistency |
|------|---------------|---------|-------------|
| Session | 2 | Round-robin | Eventual |
| User | 2 | Nearest | Eventual |
| Tenant | 3 | Weighted | Tunable |

**Verify current best practices with web search:**
Search the web: "Redis memory performance optimization {date}"
Search the web: "cache warming strategies distributed systems {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the performance tuning analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into compression and batching trade-offs
- **P (Party Mode)**: Bring SRE and database engineer perspectives
- **C (Continue)**: Accept performance tuning and proceed to cost controls
- **[Specific refinements]**: Describe performance concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: hot paths, compression, batching, connection pooling
- Process enhanced insights on performance optimization
- Ask user: "Accept these refined performance decisions? (y/n)"
- If yes, integrate into performance specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review memory performance tuning for latency and throughput"
- Process SRE and database engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save performance tuning to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-cost-controls.md`

---

## Verification

- [ ] Hot paths identified with targets
- [ ] Cache warming strategy designed
- [ ] Compression configured
- [ ] Batch operations implemented
- [ ] Connection pooling configured
- [ ] Read replicas planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Performance tuning specification
- Hot path optimization plan
- Compression configuration
- Batch operation design

---

## Next Step

Proceed to `step-06-c-cost-controls.md` to implement cost controls.
