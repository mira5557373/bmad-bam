# BAM Context Window Observability Guide

**When to load:** During context management design, token optimization, or when user mentions context limits, token budgets, or context compression.

**Integrates with:** DevOps (operations), Architect (design), AI Platform (implementation)

---

## Core Concepts

### Context Window Metrics Hierarchy

Context window observability tracks how agents utilize their available context.

| Metric Category | Key Metrics | Purpose |
|-----------------|-------------|---------|
| Utilization | context_tokens_used, context_utilization_ratio | Context consumption |
| Composition | system_tokens, memory_tokens, rag_tokens, user_tokens | Token allocation |
| Overflow | context_truncation, context_compression | Overflow handling |
| Efficiency | relevant_token_ratio, context_waste | Context quality |

### Per-Tenant Context Tracking

Context metrics must include tenant context for cost attribution and optimization.

| Dimension | Labels | Purpose |
|-----------|--------|---------|
| Tenant | tenant_id, tenant_tier | Per-tenant tracking |
| Model | model, max_context | Model-specific limits |
| Agent | agent_id, agent_type | Agent utilization |
| Session | session_id, turn_number | Conversation context |

---

## Application Guidelines

When implementing context window observability in multi-tenant systems:

1. **Track context utilization ratio**: Monitor how much of available context is used
2. **Decompose context by source**: Know where tokens are going (system, memory, RAG, user)
3. **Alert on context truncation**: Truncation may degrade response quality
4. **Monitor context efficiency**: Identify wasted tokens that don't contribute
5. **Track context costs**: Context tokens directly impact LLM costs

---

## Context Window Metrics Specification

### Utilization Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| context_tokens_total | Counter | tenant_id, model, agent_id | Total tokens in context |
| context_tokens_available | Gauge | model | Max context window size |
| context_utilization_ratio | Gauge | tenant_id, model, agent_id | Used / available ratio |
| context_headroom_tokens | Gauge | tenant_id, model | Tokens remaining for output |

### Composition Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| context_system_tokens | Gauge | tenant_id, agent_id | System prompt tokens |
| context_memory_tokens | Gauge | tenant_id, agent_id | Memory context tokens |
| context_rag_tokens | Gauge | tenant_id, agent_id | RAG context tokens |
| context_user_tokens | Gauge | tenant_id, session_id | User message tokens |
| context_tool_tokens | Gauge | tenant_id, agent_id | Tool definitions tokens |
| context_history_tokens | Gauge | tenant_id, session_id | Conversation history tokens |

### Overflow Handling Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| context_truncation_total | Counter | tenant_id, agent_id, source | Truncation events |
| context_compression_total | Counter | tenant_id, agent_id | Compression events |
| context_tokens_dropped | Counter | tenant_id, agent_id, source | Tokens removed |
| context_summarization_total | Counter | tenant_id, agent_id | History summarization events |

### Efficiency Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| context_relevant_token_ratio | Gauge | tenant_id, agent_id | Relevant / total tokens |
| context_duplication_ratio | Gauge | tenant_id, agent_id | Duplicated content ratio |
| context_stale_token_ratio | Gauge | tenant_id, agent_id | Outdated context ratio |
| context_tokens_per_quality | Histogram | tenant_id | Tokens vs. response quality |

---

## Alerting Patterns

### Context Utilization Alerts

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| ContextUtilizationHigh | context_utilization_ratio > 0.9 | WARNING | 5m |
| ContextUtilizationCritical | context_utilization_ratio > 0.98 | CRITICAL | 1m |
| ContextTruncationSpike | rate(context_truncation_total[5m]) > 10 | WARNING | 5m |
| ContextCompressionHigh | rate(context_compression_total[5m]) > 20 | WARNING | 10m |
| ContextHeadroomLow | context_headroom_tokens < 1000 | WARNING | immediate |

### Context Efficiency Alerts

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| ContextDuplicationHigh | context_duplication_ratio > 0.2 | WARNING | 15m |
| ContextRelevanceLow | context_relevant_token_ratio < 0.5 | WARNING | 15m |
| ContextStaleHigh | context_stale_token_ratio > 0.3 | WARNING | 30m |
| SystemPromptBloat | context_system_tokens > 2000 | WARNING | 1h |

### Per-Tier Alerts

| Tier | Context SLO | Truncation Tolerance | Alert Threshold |
|------|-------------|----------------------|-----------------|
| Enterprise | < 80% utilization | < 1% | Immediate |
| Pro | < 85% utilization | < 5% | 5m |
| Free | < 95% utilization | < 20% | 15m |

---

## Dashboard Components

### Context Utilization Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Context Utilization Over Time | context_utilization_ratio | Time series by agent |
| Token Headroom | context_headroom_tokens | Gauge |
| Truncation Events | context_truncation_total | Time series |
| Compression Events | context_compression_total | Time series |

### Context Composition Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Token Allocation | system/memory/rag/user/history tokens | Stacked area |
| Context Breakdown | context_*_tokens | Pie chart |
| System Prompt Size | context_system_tokens | Time series by agent |
| Memory Usage | context_memory_tokens | Time series by tier |

### Context Efficiency Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Relevance Ratio | context_relevant_token_ratio | Gauge |
| Duplication Rate | context_duplication_ratio | Time series |
| Tokens vs Quality | context_tokens_per_quality | Scatter plot |
| Optimization Opportunities | high utilization + low quality | Table |

### Per-Tenant Context Dashboard

| Panel | Metrics | Tenant Filter |
|-------|---------|---------------|
| Average Utilization | avg(context_utilization_ratio) | By tenant_id |
| Truncation Rate | rate(context_truncation_total) | By tenant_id |
| Token Cost Attribution | context_tokens_total * cost | By tenant_id |
| Efficiency Score | relevant_ratio * (1 - duplication) | By tenant_id |

---

## Context Budget Strategies

### Token Budget Allocation

| Context Component | Budget % | Priority | Truncation Strategy |
|-------------------|----------|----------|---------------------|
| System Prompt | 15% | 1 (keep) | Never truncate |
| Tool Definitions | 10% | 2 | Remove unused tools |
| RAG Context | 30% | 3 | Reduce chunks |
| Memory | 15% | 4 | Summarize |
| User Message | 15% | 5 | Truncate oldest |
| Conversation History | 15% | 6 | Summarize/trim |

### Context Optimization Metrics

| Optimization | Metric | Target | Dashboard |
|--------------|--------|--------|-----------|
| System prompt compression | context_system_tokens | < 1000 | Context Efficiency |
| RAG chunk reduction | context_rag_tokens / chunks | < 500/chunk | RAG Dashboard |
| History summarization | context_history_tokens | < 2000 | Context Composition |
| Memory pruning | context_memory_tokens | < 1000 | Memory Dashboard |

---

## Implementation Checklist

### Instrumentation

- [ ] Context token counts emitted per component (system, memory, RAG, etc.)
- [ ] Context utilization ratio calculated per request
- [ ] Truncation events logged with source and count
- [ ] Compression events tracked with before/after sizes
- [ ] Context efficiency metrics computed (relevance, duplication)
- [ ] Token costs attributed to context components

### Dashboards

- [ ] Context utilization dashboard deployed
- [ ] Context composition breakdown available
- [ ] Context efficiency dashboard enabled
- [ ] Per-tenant context usage visible

### Alerting

- [ ] Context overflow alerts configured
- [ ] Truncation spike alerts active
- [ ] Efficiency degradation alerts enabled
- [ ] Per-tier SLA alerts configured

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `ai-context`
- **memory-tiers:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `memory-tiers`
- **context-compression:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `context-compression`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "LLM context window optimization {date}"
- Search: "context management AI agents {date}"
- Search: "token budget strategies production {date}"
- Search: "context compression techniques {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| What utilization ratio is healthy? | 70-85% for optimal quality | Too low wastes capacity, too high risks truncation |
| When to trigger context compression? | > 90% utilization | Compress before truncation |
| How to prioritize context sources? | System > Tools > RAG > Memory > History | Critical context first |
| Should context metrics affect routing? | Yes, route to larger context models | Avoid truncation |

---

## Related Workflows

- `bmad-bam-ai-observability-setup` - Full AI observability design
- `bmad-bam-agent-memory-optimization` - Memory tier optimization
- `bmad-bam-ai-context-management` - Context management design
