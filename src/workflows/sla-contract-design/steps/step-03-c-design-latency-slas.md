# Step 3: Design Latency SLAs

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead
- Use web search to verify current best practices when making technology decisions

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define AI response latency commitments for multi-tenant AI platform operations, including time-to-first-token (TTFT), end-to-end completion time, and throughput guarantees.

---

## Prerequisites

- Step 2 (Define Uptime Guarantees) completed
- Uptime guarantees documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-runtime`
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`

---

## Inputs

- Uptime guarantees from Step 2
- AI runtime configuration from master architecture
- Pattern registry: `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- LLM provider latency benchmarks

---

## Actions

### 1. Define Time-to-First-Token (TTFT) SLAs

Establish TTFT guarantees for streaming AI responses:

| Tier | TTFT P50 | TTFT P95 | TTFT P99 | Measurement |
|------|----------|----------|----------|-------------|
| Free | <2000ms | <5000ms | <10000ms | 95th percentile |
| Starter | <1000ms | <2500ms | <5000ms | 95th percentile |
| Pro | <500ms | <1000ms | <2000ms | 99th percentile |
| Enterprise | <250ms | <500ms | <1000ms | 99th percentile |
| Premium Enterprise | <100ms | <250ms | <500ms | 99.9th percentile |

### 2. Define Completion Time SLAs

Establish end-to-end response time guarantees (for typical request sizes):

| Tier | Short Request (<100 tokens) | Medium Request (100-500 tokens) | Long Request (500+ tokens) |
|------|----------------------------|--------------------------------|---------------------------|
| Free | <10s P95 | <30s P95 | Best effort |
| Starter | <5s P95 | <15s P95 | <45s P95 |
| Pro | <3s P99 | <10s P99 | <30s P99 |
| Enterprise | <2s P99 | <8s P99 | <25s P99 |

### 3. Define Throughput SLAs

Establish request rate guarantees per tier:

| Tier | Requests/Minute | Requests/Hour | Tokens/Minute | Concurrent Requests |
|------|-----------------|---------------|---------------|---------------------|
| Free | 10 | 100 | 10,000 | 2 |
| Starter | 60 | 1,000 | 100,000 | 5 |
| Pro | 300 | 10,000 | 500,000 | 20 |
| Enterprise | 1,000 | 50,000 | 2,000,000 | 100 |
| Custom | Negotiated | Negotiated | Negotiated | Negotiated |

### 4. Define Queue Time SLAs

Establish maximum wait times before processing begins:

| Tier | Queue Priority | Max Queue Time | Queue Bypass |
|------|----------------|----------------|--------------|
| Free | Lowest | 60s (then reject) | No |
| Starter | Low | 30s | No |
| Pro | Medium | 10s | Burst allowed |
| Enterprise | High | 5s | Priority queue |
| Premium Enterprise | Highest | 1s | Dedicated capacity |

### 5. Define Latency Exclusions

Specify conditions that do NOT count against latency SLAs:

| Exclusion | Description | Rationale |
|-----------|-------------|-----------|
| Rate Limit Responses | 429 responses due to quota exceeded | Customer exceeded allocation |
| Malformed Requests | 4xx errors due to invalid input | Customer responsibility |
| Large Context Windows | Requests >32K tokens | Inherently slower processing |
| Model Availability | Specific model unavailable | Fallback model used |
| Network Latency | Customer-side network delays | Beyond platform control |

### 6. Define Model-Specific Latency

Different AI models have different performance characteristics:

| Model Category | TTFT Target | Completion Speed | Tier Availability |
|----------------|-------------|------------------|-------------------|
| Fast (GPT-4o-mini equivalent) | <200ms | 100+ tokens/s | All tiers |
| Standard (GPT-4o equivalent) | <500ms | 50-100 tokens/s | Starter+ |
| Advanced (GPT-4 equivalent) | <1000ms | 30-50 tokens/s | Pro+ |
| Reasoning (o1 equivalent) | <3000ms | 20-30 tokens/s | Enterprise+ |

**Verify current best practices with web search:**
Search the web: "LLM API latency SLA best practices {date}"
Search the web: "AI response time SLA benchmarks {date}"
Search the web: "time to first token optimization patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the latency SLAs above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into model-specific latency and throughput edge cases
- **P (Party Mode)**: Bring AI engineering and product perspectives for latency review
- **C (Continue)**: Accept latency SLAs and proceed to tenant isolation guarantees
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: TTFT targets, throughput limits, model-specific latencies
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into latency SLAs
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review latency SLAs: {summary of TTFT, throughput, model latencies}"
- Process collaborative analysis from AI engineering and product personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save latency SLAs to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-establish-isolation-guarantees.md`

---

## Verification

- [ ] TTFT targets defined for all tiers
- [ ] Completion time SLAs established
- [ ] Throughput limits documented
- [ ] Queue time guarantees specified
- [ ] Exclusions clearly defined
- [ ] Model-specific latencies documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Latency SLA matrix by tier
- Throughput guarantee specifications
- Model-specific performance targets

---

## Next Step

Proceed to `step-04-c-establish-isolation-guarantees.md` to document tenant isolation SLAs.
