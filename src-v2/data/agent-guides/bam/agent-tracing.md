# BAM Agent Tracing Guide

**When to load:** During agent debugging, distributed tracing setup, or when user mentions agent traces, execution spans, or LLM call tracing.

**Integrates with:** DevOps (operations), Architect (design), AI Platform (implementation)

---

## Core Concepts

### Agent Trace Hierarchy

Agent tracing follows a hierarchical span structure aligned with OpenTelemetry conventions.

| Span Level | Parent | Key Attributes | Purpose |
|------------|--------|----------------|---------|
| Session | None | session_id, tenant_id, user_id | User interaction boundary |
| Turn | Session | turn_id, input_tokens | Single user input/output cycle |
| Agent | Turn | agent_id, agent_type | Agent execution scope |
| LLM Call | Agent | model, prompt_tokens, completion_tokens | Model invocation |
| Tool | Agent | tool_id, tool_category | Tool execution |
| Memory | Agent | memory_tier, operation | Memory access |

### Multi-Tenant Trace Context

Traces must propagate tenant context across all spans for isolation and filtering.

| Attribute | Type | Required | Purpose |
|-----------|------|----------|---------|
| tenant.id | string | Yes | Primary tenant identifier |
| tenant.tier | string | Yes | Service tier for SLA correlation |
| session.id | string | Yes | Conversation session identifier |
| user.id | string | Yes | User within tenant |
| correlation.id | string | Yes | Cross-service correlation |

---

## Application Guidelines

When implementing agent tracing in multi-tenant systems:

1. **Create spans for all LLM calls**: Every model invocation must be a separate span with input/output tokens
2. **Propagate tenant context**: Include tenant_id and tenant_tier in all span attributes
3. **Link tool executions to agent spans**: Create child spans for each tool invocation
4. **Capture prompt/response for debugging**: Enable sampling for full prompt/response capture
5. **Support tenant-scoped trace filtering**: Enable tenants to view only their traces

---

## Trace Span Specifications

### Session Span

| Attribute | Type | Description |
|-----------|------|-------------|
| session.id | string | Unique session identifier |
| tenant.id | string | Tenant owning the session |
| user.id | string | User within tenant |
| session.start_time | timestamp | Session start |
| session.channel | string | web/mobile/api/slack |
| session.turns | int | Number of turns in session |

### Agent Span

| Attribute | Type | Description |
|-----------|------|-------------|
| agent.id | string | Unique agent identifier |
| agent.type | string | Agent type/role |
| agent.version | string | Agent version |
| agent.orchestration | string | langgraph/crewai/autogen |
| agent.status | string | success/error/timeout |
| agent.total_tokens | int | Total tokens consumed |
| agent.tools_invoked | int | Number of tool calls |

### LLM Call Span

| Attribute | Type | Description |
|-----------|------|-------------|
| llm.model | string | Model identifier |
| llm.provider | string | anthropic/openai/google |
| llm.temperature | float | Temperature setting |
| llm.max_tokens | int | Max tokens requested |
| llm.prompt_tokens | int | Input token count |
| llm.completion_tokens | int | Output token count |
| llm.latency_ms | int | Call latency |
| llm.finish_reason | string | stop/length/tool_call |
| llm.cost_usd | float | Estimated cost |

### Tool Span

| Attribute | Type | Description |
|-----------|------|-------------|
| tool.id | string | Tool identifier |
| tool.name | string | Tool display name |
| tool.category | string | Tool category |
| tool.params_hash | string | Hash of parameters |
| tool.result_status | string | success/error/timeout |
| tool.sandbox_id | string | Sandbox identifier |
| tool.latency_ms | int | Execution latency |

### Memory Span

| Attribute | Type | Description |
|-----------|------|-------------|
| memory.tier | string | session/user/tenant/global |
| memory.operation | string | read/write/delete |
| memory.keys | int | Number of keys accessed |
| memory.bytes | int | Data size |
| memory.latency_ms | int | Access latency |

---

## Tracing Platform Integration

### Langfuse Integration

| Feature | Configuration | Purpose |
|---------|---------------|---------|
| Trace Groups | Group by session_id | Conversation-level traces |
| Generations | Capture LLM calls | Token and latency tracking |
| Scores | Attach quality scores | Evaluation integration |
| User Attribution | Map to user.id + tenant.id | Per-tenant analysis |

### OpenTelemetry Integration

| Component | Configuration | Purpose |
|-----------|---------------|---------|
| TracerProvider | Tenant-aware sampler | Sampling strategy |
| SpanProcessor | BatchSpanProcessor | Efficient export |
| Exporter | OTLP or vendor-specific | Backend integration |
| Propagator | W3C TraceContext | Cross-service propagation |

### LangSmith Integration

| Feature | Configuration | Purpose |
|---------|---------------|---------|
| Projects | Per-tenant projects | Isolation |
| Runs | Session-grouped runs | Conversation tracking |
| Feedback | Quality scores | Evaluation |
| Datasets | Golden task storage | Regression testing |

---

## Sampling Strategies

### Multi-Tenant Sampling

| Tenant Tier | Sample Rate | Full Prompt Capture | Retention |
|-------------|-------------|---------------------|-----------|
| Enterprise | 100% | Yes (with consent) | 90 days |
| Pro | 50% | 10% | 30 days |
| Free | 10% | No | 7 days |

### Adaptive Sampling

| Condition | Sampling Adjustment | Rationale |
|-----------|---------------------|-----------|
| Error occurred | 100% | Debug errors completely |
| Latency > SLO | 100% | Investigate slow requests |
| New agent version | 100% for 24h | Monitor rollout |
| High cost request | 100% | Cost optimization |

---

## Dashboard Components

### Agent Trace Explorer

| Panel | Data Source | Visualization |
|-------|-------------|---------------|
| Trace Timeline | Spans with hierarchy | Gantt chart |
| LLM Calls Summary | llm.* attributes | Table |
| Tool Executions | tool.* spans | Table with status |
| Memory Operations | memory.* spans | Timeline |
| Error Analysis | Spans with error status | Table with stack traces |

### Per-Tenant Trace Dashboard

| Panel | Filter | Visualization |
|-------|--------|---------------|
| Session Traces | tenant_id | List with drill-down |
| Agent Utilization | agent.id by tenant_id | Pie chart |
| Error Rate | status=error by tenant_id | Time series |
| Token Consumption | llm.total_tokens by tenant_id | Counter |

---

## Implementation Checklist

### Instrumentation

- [ ] Session spans created for all user interactions
- [ ] Agent spans capture complete execution lifecycle
- [ ] LLM calls emit spans with token counts and latency
- [ ] Tool executions create child spans with results
- [ ] Memory operations are traced with tier context
- [ ] Tenant context propagates to all spans

### Platform Integration

- [ ] Tracing backend configured (Langfuse/LangSmith/OTEL)
- [ ] Sampling strategy implemented by tenant tier
- [ ] Tenant isolation verified in trace storage
- [ ] Trace retention configured per tier

### Debugging Workflow

- [ ] Trace search by session/tenant/correlation_id
- [ ] Error drill-down with full span context
- [ ] Latency breakdown visualization available
- [ ] Cost attribution from trace data

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `distributed-tracing`
- **llm-observability:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `llm-observability`
- **tenant-context-propagation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-context-propagation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "LLM agent tracing best practices {date}"
- Search: "Langfuse OpenTelemetry integration {date}"
- Search: "distributed tracing AI agents {date}"
- Search: "LangSmith tracing production {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which tracing platform to use? | Langfuse for OSS, LangSmith for LangChain | Platform alignment reduces integration effort |
| Should prompts be captured? | Yes with sampling, encrypt at rest | Debugging needs balanced with privacy |
| How to handle trace storage costs? | Tier-based retention with sampling | Balance observability with cost |
| Should traces be accessible to tenants? | Yes, their own traces only | Self-service debugging reduces support |

---

## Related Workflows

- `bmad-bam-ai-observability-setup` - Full AI observability design
- `bmad-bam-ai-agent-debug` - Agent debugging with traces
- `bmad-bam-tenant-aware-observability` - Tenant-scoped observability
