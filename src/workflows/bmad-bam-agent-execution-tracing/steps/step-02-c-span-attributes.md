# Step 2: Span Attribute Definitions

## Purpose

Define detailed span attributes for each span type in the trace hierarchy.

## Prerequisites

- Step 1 complete (trace hierarchy defined)
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/agent-tracing.md`

## Actions

### 1. Session Span Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| session.id | string | Yes | Unique session identifier |
| session.channel | string | Yes | web/mobile/api/slack |
| session.start_time | timestamp | Yes | Session start |
| session.turns | int | No | Turn count |
| tenant.id | string | Yes | Tenant identifier |
| user.id | string | Yes | User identifier |

### 2. Agent Span Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| agent.id | string | Yes | Agent identifier |
| agent.type | string | Yes | Agent type/role |
| agent.version | string | Yes | Agent version |
| agent.orchestration | string | Yes | langgraph/crewai/autogen |
| agent.status | string | Yes | success/error/timeout |
| agent.total_tokens | int | No | Total tokens consumed |

### 3. LLM Call Span Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| llm.model | string | Yes | Model identifier |
| llm.provider | string | Yes | anthropic/openai/google |
| llm.prompt_tokens | int | Yes | Input tokens |
| llm.completion_tokens | int | Yes | Output tokens |
| llm.cost_usd | float | No | Estimated cost |
| llm.finish_reason | string | Yes | stop/length/tool_call |

### 4. Tool Span Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| tool.id | string | Yes | Tool identifier |
| tool.name | string | Yes | Tool display name |
| tool.category | string | Yes | Tool category |
| tool.result_status | string | Yes | success/error/timeout |
| tool.latency_ms | int | Yes | Execution latency |

## Soft Gate Checkpoint

**Steps 1-4 complete the span attribute definitions.**

Present span attribute summary and ask for confirmation before proceeding.

## Web Research Verification

Search the web: "OpenTelemetry semantic conventions LLM {date}"
Search the web: "Langfuse span attributes {date}"

## Verification

- [ ] Session span attributes defined
- [ ] Agent span attributes defined
- [ ] LLM call attributes include tokens and cost
- [ ] Tool span attributes include status and latency
- [ ] Required vs optional clearly marked

## Outputs

- Span attribute specification per span type
- Required vs optional attribute matrix
- Semantic conventions documentation

## Next Step

Proceed to `step-03-c-platform-integration.md` with attributes defined.
