# Step 4: Cost Optimization

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

Design cost optimization strategies for LLM usage, balancing cost efficiency with quality and reliability requirements.

---

## Prerequisites

- Step 3 completed: Fallback chains configured
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

---

## Actions

### 1. Define Cost Optimization Strategies

Identify optimization opportunities:

| Strategy | Mechanism | Savings Potential | Trade-off |
|----------|-----------|-------------------|-----------|
| Model tiering | Use cheaper models for simple tasks | 50-70% | Quality |
| Caching | Cache common responses | 30-50% | Freshness |
| Prompt optimization | Reduce input tokens | 20-40% | None |
| Batching | Batch similar requests | 20-30% | Latency |
| Self-hosting | Run open-source models | 50-80% | Operations |
| Provider negotiation | Volume discounts | 10-30% | Lock-in |

### 2. Design Semantic Caching

Implement intelligent response caching:

| Cache Type | Mechanism | TTL | Use Case |
|------------|-----------|-----|----------|
| Exact match | Hash input + model | 24h | Identical queries |
| Semantic | Embedding similarity | 1h | Similar queries |
| Function result | Tool output caching | Varies | Deterministic tools |
| Partial | Prompt prefix caching | Session | Conversation context |

**Cache Configuration:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| Similarity threshold | 0.95 | Semantic match threshold |
| Max cache size | 100 GB | Per tenant limit |
| Default TTL | 3600s | Default expiration |
| Cache key | tenant_id + hash | Tenant isolation |

### 3. Design Token Optimization

Minimize token usage:

| Technique | Savings | Implementation |
|-----------|---------|----------------|
| System prompt compression | 10-20% | Optimize system prompts |
| Context summarization | 30-50% | Summarize long contexts |
| Selective history | 20-40% | Keep only relevant messages |
| Output constraints | 10-20% | Limit response length |
| Structured output | 15-25% | JSON over verbose text |

### 4. Design Model Selection Optimization

Select cost-effective models:

| Request Type | Recommended Model | Cost Savings vs Premium |
|--------------|-------------------|------------------------|
| Simple Q&A | Claude 3 Haiku | 95% vs Opus |
| Classification | GPT-3.5-turbo | 90% vs GPT-4 |
| Summarization | Claude 3 Haiku | 95% vs Opus |
| Code review | Claude 3 Sonnet | 80% vs Opus |
| Complex reasoning | Claude 3 Opus | Baseline |
| Creative writing | GPT-4o | Baseline |

### 5. Design Budget Controls

Implement spending limits:

| Control | Scope | Action | Alert |
|---------|-------|--------|-------|
| Hard limit | Per tenant monthly | Block requests | 100% budget |
| Soft limit | Per tenant daily | Throttle | 80% budget |
| Rate limit | Per tenant per minute | Queue requests | 90% limit |
| Anomaly detection | Per request | Review | 10x average |

### 6. Design Cost Reporting

Monitor and report costs:

| Report | Frequency | Metrics | Audience |
|--------|-----------|---------|----------|
| Real-time dashboard | Continuous | Current spend, rate | Operations |
| Daily summary | Daily | Tokens, cost by model | Engineering |
| Weekly analysis | Weekly | Trends, optimization | Management |
| Monthly invoice | Monthly | Detailed breakdown | Finance |

**Cost Optimization KPIs:**

| KPI | Target | Current | Tracking |
|-----|--------|---------|----------|
| Cost per conversation | < $0.05 | ${current} | Daily |
| Cost per agent run | < $0.20 | ${current} | Daily |
| Cache hit rate | > 30% | {current}% | Real-time |
| Token efficiency | > 80% | {current}% | Weekly |
| Cost reduction MoM | > 5% | {current}% | Monthly |

**Verify current best practices with web search:**
Search the web: "LLM cost optimization strategies {date}"
Search the web: "semantic caching for LLM {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the cost optimization design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific optimization areas
- **P (Party Mode)**: Bring FinOps and AI engineer perspectives
- **C (Continue)**: Finalize LLM gateway configuration
- **[Specific refinements]**: Describe optimization concerns

Select an option:
```

#### If 'C' (Continue):
- Generate final LLM gateway configuration documents
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Save all outputs to `{output_folder}/planning-artifacts/ai-runtime/`
- Present completion summary

---

## Final Gate Checkpoint

**Steps 1-4 complete the LLM gateway configuration design.**

Present final summary of:
- Provider inventory with capabilities
- Routing rules for intelligent model selection
- Fallback chains for resilience
- Cost optimization strategies

Confirm QG-M3 checklist items for LLM gateway are satisfied.

---

## Verification

- [ ] Cost optimization strategies defined
- [ ] Semantic caching designed
- [ ] Token optimization techniques specified
- [ ] Model selection optimization documented
- [ ] Budget controls configured
- [ ] Cost reporting designed
- [ ] QG-M3 gateway items verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Cost optimization strategies
- Semantic caching configuration
- Token optimization techniques
- Model selection guide
- Budget control configuration
- Cost reporting design
- **Output to:** `{output_folder}/planning-artifacts/ai-runtime/llm-gateway-design.md`
- **Output to:** `{output_folder}/planning-artifacts/ai-runtime/routing-rules.md`
- **Output to:** `{output_folder}/planning-artifacts/ai-runtime/fallback-configuration.md`

---

## Next Step

Create workflow complete. LLM gateway configuration ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

The LLM gateway configuration design workflow is complete. The following artifacts have been generated:
- `llm-gateway-design.md` - Complete gateway architecture
- `routing-rules.md` - Intelligent routing configuration
- `fallback-configuration.md` - Resilience and fallback chains

**Related Next Steps:**
- Implement gateway using LiteLLM or custom router
- Configure monitoring for cost and performance
- Run `bmad-bam-tenant-cost-attribution` for LLM cost allocation
