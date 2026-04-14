# Step 4: Batch Processing

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

Design efficient batch embedding processing including optimal batch sizes, rate limiting, error handling, and queue management for multi-tenant workloads.

---

## Prerequisites

- Steps 1-3 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: batch-processing
- **Web research (if available):** Search for embedding batch optimization techniques

---

## Inputs

- Model and isolation decisions from previous steps
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Determine Optimal Batch Sizes

| Model Provider | Max Batch Size | Optimal Batch | Token Limit |
|----------------|----------------|---------------|-------------|
| OpenAI | 2048 | 100-500 | 8191 tokens |
| Cohere | 96 | 50-96 | 512 tokens |
| Self-hosted | Variable | 32-128 | Memory-bound |

### 2. Design Rate Limiting Strategy

| Tier | Rate Limit | Burst | Queue Priority |
|------|------------|-------|----------------|
| Free | [ ] req/min | 2x | Low |
| Pro | [ ] req/min | 3x | Medium |
| Enterprise | [ ] req/min | 5x | High |
| System | Unlimited | N/A | Critical |

### 3. Configure Queue Architecture

| Queue | Purpose | Processing |
|-------|---------|------------|
| Real-time | User-initiated | Immediate |
| Batch | Document ingestion | Background |
| Priority | Enterprise/urgent | Fast-track |
| Dead-letter | Failed items | Manual review |

### 4. Design Error Handling

| Error Type | Retry Strategy | Max Retries | Backoff |
|------------|----------------|-------------|---------|
| Rate limit | Exponential | 5 | 1s, 2s, 4s, 8s, 16s |
| Timeout | Linear | 3 | 5s, 10s, 15s |
| Invalid input | None | 0 | N/A |
| Model error | Exponential | 3 | 2s, 4s, 8s |

### 5. Define Progress Tracking

| Metric | Tracking Method | Visibility |
|--------|-----------------|------------|
| Job status | State machine | Tenant dashboard |
| Completion % | Item count / total | Real-time |
| Error count | Counter per job | Alert threshold |
| ETA | Based on rate | User estimate |

**Soft Gate:** Steps 1-4 complete the core batch design. Present summary of batch sizes, rate limiting, queues, and error handling. Ask for confirmation before proceeding.

**Verify current best practices with web search:**
Search the web: "embedding batch processing optimization {date}"
Search the web: "rate limiting multi-tenant API {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the batch processing analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into queue architecture and error handling
- **P (Party Mode)**: Bring platform engineer and SRE perspectives
- **C (Continue)**: Accept batch processing design and proceed to caching
- **[Specific refinements]**: Describe batch processing concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: batch sizes, rate limits, queue design, error handling
- Process enhanced insights on batch optimization
- Ask user: "Accept these refined batch decisions? (y/n)"
- If yes, integrate into batch specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review embedding batch processing for throughput and reliability"
- Process platform engineer and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save batch processing to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-caching.md`

---

## Verification

- [ ] Optimal batch sizes determined
- [ ] Rate limiting configured per tier
- [ ] Queue architecture designed
- [ ] Error handling strategies defined
- [ ] Progress tracking implemented
- [ ] Patterns align with pattern registry

---

## Outputs

- Batch processing specification
- Rate limiting configuration
- Queue architecture design
- Error handling procedures

---

## Next Step

Proceed to `step-05-c-caching.md` to design caching strategy.
