# Step 2: Routing Rules

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

Define intelligent routing rules to select optimal LLM providers and models based on request characteristics, tenant requirements, and system state.

---

## Prerequisites

- Step 1 completed: Provider inventory with capabilities
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Actions

### 1. Define Routing Dimensions

Identify factors influencing routing:

| Dimension | Values | Impact |
|-----------|--------|--------|
| Task type | chat, completion, embedding, function | Model selection |
| Context length | short, medium, long, very long | Model selection |
| Latency requirement | real-time, near-time, batch | Provider selection |
| Cost sensitivity | low, medium, high | Model/provider selection |
| Quality requirement | standard, high, critical | Model selection |
| Tenant tier | free, pro, enterprise | Provider access |
| Region | US, EU, APAC | Provider selection |

### 2. Define Task-Based Routing

Route based on task type:

| Task Type | Primary Model | Secondary | Tertiary |
|-----------|---------------|-----------|----------|
| Simple chat | Claude 3 Haiku | GPT-3.5-turbo | Gemini Pro |
| Complex reasoning | Claude 3 Opus | GPT-4o | Gemini Ultra |
| Code generation | GPT-4o | Claude 3 Sonnet | CodeLlama |
| Function calling | GPT-4o | Claude 3 Sonnet | Gemini Pro |
| Vision | GPT-4o | Claude 3 Sonnet | Gemini Pro |
| Long context | Claude 3 | Gemini Pro | GPT-4-turbo |
| Embeddings | text-embedding-3-small | Cohere | Voyage |

### 3. Define Tenant-Based Routing

Route based on tenant configuration:

| Tenant Tier | Allowed Providers | Default Model | Premium Models |
|-------------|-------------------|---------------|----------------|
| Free | OpenAI, Self-hosted | GPT-3.5-turbo | None |
| Pro | All cloud providers | Claude 3 Sonnet | GPT-4o (limited) |
| Enterprise | All + dedicated | Claude 3 Opus | All models |
| Custom | Per contract | Negotiated | Per contract |

### 4. Define Context-Aware Routing

Route based on context characteristics:

| Context Size | Model Selection | Reasoning |
|--------------|-----------------|-----------|
| < 4K tokens | Any model | All support |
| 4K-32K tokens | GPT-4-turbo, Claude 3 | Large context support |
| 32K-128K tokens | Claude 3, Gemini Pro | Extended context |
| 128K-200K tokens | Claude 3 only | Maximum context |
| > 200K tokens | Gemini Pro (1M) | Ultra-long context |

### 5. Define Load-Based Routing

Route based on system load:

| Condition | Routing Action | Threshold |
|-----------|----------------|-----------|
| Provider healthy | Use primary | Health = OK |
| Primary overloaded | Route to secondary | Latency > p95 * 1.5 |
| Rate limit approaching | Pre-emptive switch | > 80% of limit |
| Regional congestion | Route to other region | Error rate > 1% |
| All providers degraded | Graceful degradation | All above threshold |

### 6. Define Routing Algorithm

Design the routing decision flow:

| Step | Check | Action |
|------|-------|--------|
| 1 | Tenant restrictions | Filter allowed providers |
| 2 | Task requirements | Filter capable models |
| 3 | Context size | Filter by context window |
| 4 | Feature requirements | Filter by capabilities |
| 5 | Provider health | Filter healthy providers |
| 6 | Cost optimization | Select cheapest capable |
| 7 | Load balancing | Distribute across healthy |

### 7. Define Routing Configuration Schema

Document configuration format:

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `tenant_id` | UUID | Tenant identifier | Required |
| `allowed_providers` | Array | Permitted providers | All |
| `default_model` | String | Default model | Config |
| `routing_strategy` | Enum | cost, quality, balanced | balanced |
| `region_preference` | Array | Preferred regions | nearest |
| `max_latency_ms` | Integer | Latency threshold | 10000 |
| `fallback_enabled` | Boolean | Enable fallback | true |

**Verify current best practices with web search:**
Search the web: "LLM routing strategies {date}"
Search the web: "intelligent model selection patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the routing rules above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific routing scenarios
- **P (Party Mode)**: Bring AI engineer and product perspectives
- **C (Continue)**: Accept rules and proceed to fallback chains
- **[Specific refinements]**: Describe routing concerns

Select an option:
```

#### If 'C' (Continue):
- Save routing rules to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-fallback-chains.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the provider and routing foundation.**

Present summary of:
- Provider inventory with capabilities
- Routing dimensions and rules
- Tenant-based access controls

Ask for confirmation before proceeding to fallback configuration.

---

## Verification

- [ ] Routing dimensions defined
- [ ] Task-based routing specified
- [ ] Tenant-based routing defined
- [ ] Context-aware routing designed
- [ ] Load-based routing configured
- [ ] Routing algorithm documented
- [ ] Configuration schema defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Routing dimension catalog
- Task-based routing rules
- Tenant routing configuration
- Context-aware routing rules
- Load-based routing rules
- Routing algorithm specification
- Configuration schema

---

## Next Step

Proceed to `step-03-c-fallback-chains.md` to design fallback chains.
