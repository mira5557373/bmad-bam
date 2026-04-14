# Step 1: Provider Inventory

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

Document all LLM providers, models, and capabilities to establish the foundation for routing and fallback configuration.

---

## Prerequisites

- Master architecture document loaded
- AI runtime selection confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-runtime

---

## Actions

### 1. Define Primary LLM Providers

Document primary LLM providers:

| Provider | Models | Capabilities | Region | Status |
|----------|--------|--------------|--------|--------|
| OpenAI | GPT-4o, GPT-4-turbo, GPT-3.5 | Chat, function calling, vision | Global | Primary |
| Anthropic | Claude 3 Opus/Sonnet/Haiku | Chat, function calling, vision | US, EU | Primary |
| Google | Gemini Pro, Gemini Ultra | Chat, function calling, vision | Global | Secondary |
| AWS Bedrock | Claude, Titan, Llama | Chat, embeddings | US, EU | Backup |
| Azure OpenAI | GPT-4, GPT-3.5 | Chat, function calling | US, EU | Enterprise |

### 2. Document Model Capabilities

Define capabilities per model:

| Model | Context Window | Function Calling | Vision | Streaming | Cost/1K tokens |
|-------|---------------|------------------|--------|-----------|----------------|
| GPT-4o | 128K | Yes | Yes | Yes | $0.005/$0.015 |
| GPT-4-turbo | 128K | Yes | Yes | Yes | $0.01/$0.03 |
| Claude 3 Opus | 200K | Yes | Yes | Yes | $0.015/$0.075 |
| Claude 3 Sonnet | 200K | Yes | Yes | Yes | $0.003/$0.015 |
| Claude 3 Haiku | 200K | Yes | Yes | Yes | $0.00025/$0.00125 |
| Gemini Pro | 1M | Yes | Yes | Yes | $0.0005/$0.0015 |

### 3. Document Rate Limits

Define provider rate limits:

| Provider | Tier | RPM | TPM | Daily Limit |
|----------|------|-----|-----|-------------|
| OpenAI | Tier 1 | 500 | 10K | 100K |
| OpenAI | Tier 5 | 10K | 1M | 50M |
| Anthropic | Scale | 4K | 400K | Unlimited |
| Google | Pay-as-you-go | 360 | 120K | Unlimited |
| Azure | S0 | 1K | 120K | Unlimited |

### 4. Define Embedding Providers

Document embedding services:

| Provider | Model | Dimensions | Context | Cost/1K tokens |
|----------|-------|------------|---------|----------------|
| OpenAI | text-embedding-3-large | 3072 | 8K | $0.00013 |
| OpenAI | text-embedding-3-small | 1536 | 8K | $0.00002 |
| Cohere | embed-english-v3.0 | 1024 | 512 | $0.0001 |
| Voyage AI | voyage-large-2 | 1536 | 16K | $0.00012 |

### 5. Define Self-Hosted Models

Document self-hosted options:

| Model | Infrastructure | GPU | Memory | Throughput |
|-------|---------------|-----|--------|------------|
| Llama 3 70B | Kubernetes | A100 x 2 | 140 GB | 30 req/s |
| Mistral 7B | Kubernetes | A10G | 16 GB | 100 req/s |
| CodeLlama 34B | Kubernetes | A100 | 70 GB | 50 req/s |

### 6. Define Provider Health Monitoring

Establish health check configuration:

| Provider | Health Endpoint | Check Interval | Timeout | Failure Threshold |
|----------|-----------------|----------------|---------|-------------------|
| OpenAI | Status API | 30s | 5s | 3 failures |
| Anthropic | /health | 30s | 5s | 3 failures |
| Google | Service health | 60s | 5s | 2 failures |
| Self-hosted | /v1/models | 10s | 2s | 2 failures |

**Verify current best practices with web search:**
Search the web: "LLM provider comparison {date}"
Search the web: "multi-provider LLM gateway architecture {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the provider inventory above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific providers
- **P (Party Mode)**: Bring AI engineer and FinOps perspectives
- **C (Continue)**: Accept inventory and proceed to routing rules
- **[Specific refinements]**: Describe provider concerns

Select an option:
```

#### If 'C' (Continue):
- Save provider inventory to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-routing-rules.md`

---

## Verification

- [ ] Primary providers documented
- [ ] Model capabilities defined
- [ ] Rate limits documented
- [ ] Embedding providers listed
- [ ] Self-hosted options defined
- [ ] Health monitoring configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Provider inventory
- Model capability matrix
- Rate limit documentation
- Embedding provider catalog
- Self-hosted model options
- Health monitoring configuration
- **Load template:** `{project-root}/_bmad/bam/templates/llm-gateway-configuration-template.md`

---

## Next Step

Proceed to `step-02-c-routing-rules.md` to define routing rules.
