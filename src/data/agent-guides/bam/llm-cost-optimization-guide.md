# BAM LLM Cost Optimization Guide

**When to load:** During Phase 3 (Solutioning) or Phase 4 (Implementation) when designing LLM cost tracking, token metering, budget enforcement, or cost attribution strategies.

**Integrates with:** Architect (Atlas persona), Dev agent, PM agent, DevOps agent

---

## Core Concepts

### What is LLM Cost Optimization?

LLM cost optimization encompasses the strategies, systems, and practices for tracking, attributing, and minimizing AI-related costs in a multi-tenant SaaS platform. This includes token metering, cost attribution per tenant, budget enforcement, and optimization techniques to reduce overall LLM spend.

### Cost Dimensions

| Dimension | Description | Measurement |
|-----------|-------------|-------------|
| Token consumption | Input and output tokens | Per-request metering |
| Model selection | Cost varies by model | Model tier tracking |
| Latency trade-offs | Faster models cost more | Response time analysis |
| Cache utilization | Cached responses save cost | Hit rate metrics |

### Cost Attribution Layers

| Layer | Granularity | Use Case |
|-------|-------------|----------|
| Platform | Total LLM spend | Executive reporting |
| Tenant | Per-tenant attribution | Billing, margin analysis |
| Feature | Per-feature cost | Product decisions |
| Request | Per-request tracking | Debugging, optimization |

---

## Application Guidelines

When implementing LLM cost optimization:

1. **Meter everything**: Track all token usage at the request level with full context
2. **Attribute costs accurately**: Map every LLM call to tenant, feature, and user
3. **Set budgets proactively**: Enforce spending limits before costs exceed thresholds
4. **Optimize model selection**: Route requests to the most cost-effective model
5. **Cache aggressively**: Semantic caching can reduce costs by 30-50%

---

## Cost Tracking Pipeline

```
+-----------------------------------------------------------+
|  +----------+   +----------+   +----------+   +----------+|
|  | Request  |-->| Token    |-->| Cost     |-->| Aggregate||
|  | Capture  |   | Counting |   | Pricing  |   | & Report ||
|  +----------+   +----------+   +----------+   +----------+|
|       |              |              |              |       |
|       v              v              v              v       |
|  +----------+   +----------+   +----------+   +----------+|
|  | Tenant   |   | Model    |   | Rate     |   | Budget   ||
|  | Context  |   | Type     |   | Card     |   | Check    ||
|  +----------+   +----------+   +----------+   +----------+|
+-----------------------------------------------------------+
```

### Pipeline Components

| Component | Purpose | Data Captured |
|-----------|---------|---------------|
| Request Capture | Log all LLM calls | Request ID, timestamp, tenant |
| Token Counting | Count in/out tokens | Token counts by type |
| Cost Pricing | Apply rate card | Cost in currency |
| Aggregate & Report | Roll up metrics | Daily/monthly summaries |

---

## Token Metering

| Model | Input Cost (per 1K) | Output Cost (per 1K) | Capture Point |
|-------|---------------------|----------------------|---------------|
| GPT-4o | $0.005 | $0.015 | LLM proxy |
| GPT-4o-mini | $0.00015 | $0.0006 | LLM proxy |
| Claude 3.5 Sonnet | $0.003 | $0.015 | LLM proxy |
| Custom fine-tuned | Variable | Variable | Model gateway |

### Metering Event Schema

```
+-----------------------------------------------------------+
|               Token Usage Event                            |
|                                                            |
|   event_id:      "tok_abc123"                             |
|   tenant_id:     "tenant_xyz"                             |
|   timestamp:     "{date}-01-15T10:30:00Z"                 |
|   model:         "gpt-4o"                                 |
|   tokens_in:     1500                                     |
|   tokens_out:    500                                      |
|   cost_usd:      0.015                                    |
|   feature:       "chat_assistant"                         |
|   request_id:    "req_xyz789"                             |
+-----------------------------------------------------------+
```

---

## Budget Enforcement

| Budget Type | Enforcement Level | Action on Exceed |
|-------------|-------------------|------------------|
| Soft limit | Warning | Alert tenant, continue |
| Hard limit | Blocking | Reject requests |
| Rate limit | Per-minute | Queue or throttle |
| Daily cap | Per-day | Block until reset |

### Budget Alert Thresholds

| Threshold | Alert Type | Recipient |
|-----------|------------|-----------|
| 50% | Info | Tenant admin |
| 75% | Warning | Tenant admin + ops |
| 90% | Critical | Tenant admin + ops + billing |
| 100% | Block | All + automatic throttle |

---

## Cost Optimization Strategies

| Strategy | Implementation | Savings Potential |
|----------|----------------|-------------------|
| Semantic caching | Cache similar prompts | 30-50% |
| Model tiering | Route by complexity | 20-40% |
| Prompt compression | Reduce context size | 10-20% |
| Batch processing | Aggregate requests | 15-25% |
| Off-peak pricing | Schedule non-urgent | 10-15% |

### Model Routing

| Request Type | Recommended Model | Cost Profile |
|--------------|-------------------|--------------|
| Simple queries | GPT-4o-mini | Low |
| Complex reasoning | GPT-4o | Medium |
| Critical tasks | Claude 3.5 Sonnet | Medium-High |
| Bulk processing | Batched lower-tier | Very Low |

---

## Per-Tier Cost Allocation

| Tier | Token Budget/Month | Model Access | Overage Rate |
|------|-------------------|--------------|--------------|
| Free | 10,000 | Mini only | Blocked |
| Pro | 500,000 | Standard | $0.002/1K |
| Enterprise | 5,000,000+ | All models | Negotiated |

---

## Cost Dashboards

| Dashboard | Audience | Metrics |
|-----------|----------|---------|
| Platform overview | Ops team | Total spend, trends |
| Tenant breakdown | Finance | Per-tenant attribution |
| Feature analysis | Product | Cost per feature |
| Real-time monitor | DevOps | Current burn rate |

---

## Related Workflows

- `bmad-bam-usage-metering-design` - Design complete metering and billing pipeline
- `bmad-bam-tenant-tier-migration` - Adjust cost tracking during tier changes
- `bmad-bam-agent-runtime-architecture` - Integrate cost tracking into agent execution

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Need real-time cost visibility? | Stream to cost dashboard |
| Tenant overspending? | Implement hard limits |
| High token waste? | Add semantic caching |
| Unpredictable costs? | Enforce per-request budgets |
| Need cost attribution? | Tag all requests with context |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Cost tracking patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `llm-cost-tracking`
- **Budget patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `token-budgeting`
- **Usage metering:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `usage-metering`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "LLM cost tracking multi-tenant {date}"
- Search: "AI cost optimization {date}"
- Search: "token budget management {date}"
- Search: "LLM usage quotas {date}"
- Search: "semantic caching LLM cost reduction {date}"
