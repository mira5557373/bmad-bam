# Step 3: Fallback Chains

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

---

## Purpose

Design resilient fallback chains to ensure LLM availability when primary providers experience issues, maintaining service continuity.

---

## Prerequisites

- Step 2 completed: Routing rules with provider selection
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Actions

### 1. Define Fallback Triggers

Identify conditions triggering fallback:

| Trigger | Detection | Threshold | Action |
|---------|-----------|-----------|--------|
| API error | HTTP 5xx | 3 consecutive | Immediate fallback |
| Rate limit | HTTP 429 | 1 occurrence | Immediate fallback |
| Timeout | No response | > 30 seconds | Retry then fallback |
| Degraded latency | Slow response | > 3x p95 | Soft fallback |
| Content filter | Response blocked | 1 occurrence | Retry with different model |
| Context overflow | Context too long | 1 occurrence | Switch to larger context model |

### 2. Define Fallback Chains

Design provider fallback sequences:

**Chat Completion Chain:**

| Priority | Provider | Model | Conditions |
|----------|----------|-------|------------|
| 1 | OpenAI | GPT-4o | Default |
| 2 | Anthropic | Claude 3 Sonnet | OpenAI unavailable |
| 3 | Google | Gemini Pro | Anthropic unavailable |
| 4 | Azure OpenAI | GPT-4 | All primary unavailable |
| 5 | Self-hosted | Llama 3 70B | Cloud providers unavailable |

**Function Calling Chain:**

| Priority | Provider | Model | Conditions |
|----------|----------|-------|------------|
| 1 | OpenAI | GPT-4o | Native function calling |
| 2 | Anthropic | Claude 3 Sonnet | Tool use |
| 3 | Google | Gemini Pro | Function calling |
| 4 | Self-hosted | Llama 3 | Last resort |

**Embedding Chain:**

| Priority | Provider | Model | Conditions |
|----------|----------|-------|------------|
| 1 | OpenAI | text-embedding-3-small | Default |
| 2 | Cohere | embed-english-v3.0 | OpenAI unavailable |
| 3 | Self-hosted | Sentence Transformers | All cloud unavailable |

### 3. Design Retry Strategy

Define retry behavior before fallback:

| Attempt | Wait | Strategy | Conditions |
|---------|------|----------|------------|
| 1 | 0s | Initial request | - |
| 2 | 1s | Same provider | Transient error |
| 3 | 2s | Same provider | Transient error |
| 4 | 0s | Fallback provider | Persistent error |
| 5 | 1s | Fallback provider | If first fallback fails |
| 6 | 0s | Second fallback | If needed |

### 4. Design Circuit Breaker

Implement circuit breaker pattern:

| State | Behavior | Transition |
|-------|----------|------------|
| Closed | Normal operation | Error threshold exceeded -> Open |
| Open | Reject requests, use fallback | Timeout expires -> Half-Open |
| Half-Open | Allow limited requests | Success -> Closed, Failure -> Open |

**Circuit Breaker Configuration:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| Failure threshold | 5 | Failures before opening |
| Success threshold | 3 | Successes to close |
| Open duration | 30s | Time before half-open |
| Sample window | 60s | Error rate window |
| Error rate threshold | 10% | Percentage to open |

### 5. Design Graceful Degradation

Define degradation strategies:

| Scenario | Degradation | User Impact |
|----------|-------------|-------------|
| All premium models down | Use standard models | Reduced quality |
| All cloud providers down | Use self-hosted | Reduced throughput |
| Long context unavailable | Truncate context | Partial context |
| Function calling unavailable | Text-based tools | Different format |
| All providers down | Cached responses | Stale data |
| Complete outage | Maintenance mode | Service unavailable |

### 6. Design Fallback Monitoring

Monitor fallback effectiveness:

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Fallback rate | % requests using fallback | > 5% |
| Fallback success rate | % successful fallbacks | < 95% |
| Time in fallback | Duration of fallback state | > 5 minutes |
| Provider recovery time | Time to recover primary | > 10 minutes |
| Quality degradation | User satisfaction during fallback | < 90% |

**Verify current best practices with web search:**
Search the web: "LLM fallback strategies best practices {date}"
Search the web: "circuit breaker pattern for AI services {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the fallback design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific fallback scenarios
- **P (Party Mode)**: Bring SRE and AI engineer perspectives
- **C (Continue)**: Accept fallbacks and proceed to cost optimization
- **[Specific refinements]**: Describe fallback concerns

Select an option:
```

#### If 'C' (Continue):
- Save fallback chains to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-cost-optimization.md`

---

## Verification

- [ ] Fallback triggers defined
- [ ] Fallback chains designed
- [ ] Retry strategy specified
- [ ] Circuit breaker configured
- [ ] Graceful degradation planned
- [ ] Fallback monitoring defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Fallback trigger definitions
- Fallback chain configurations
- Retry strategy specification
- Circuit breaker configuration
- Graceful degradation plans
- Monitoring metrics

---

## Next Step

Proceed to `step-04-c-cost-optimization.md` to design cost optimization.
