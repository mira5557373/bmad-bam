# Step 3: Design Trace Propagation

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design trace propagation mechanisms including cross-agent context, tool execution tracing, memory operation tracing, and external API call tracing.

---

## Prerequisites

- Step 2 completed: Trace schema designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-context-propagation`, `distributed-tracing`
- **Load guide:** `{project-root}/_bmad/bam/data/domains/observability.md`

---

## Inputs

- Trace schema from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Agent topology
- Integration requirements

---

## Actions

### 1. Design Cross-Agent Trace Context

Define how trace context flows between agents:

| Handoff Type | Context Carrier | Propagation Method | Verification |
|--------------|-----------------|--------------------| -------------|
| Synchronous | Function call | Pass context object | Stack trace |
| Async message | Message headers | W3C baggage | Header check |
| Event-driven | Event metadata | Custom attributes | Event inspection |
| State-based | Shared state | Context field | State validation |

Context Propagation Schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `trace_id` | string | CRITICAL | 128-bit trace identifier |
| `span_id` | string | CRITICAL | 64-bit span identifier |
| `parent_span_id` | string | YES | Parent span for hierarchy |
| `trace_flags` | int | YES | Sampling decision |
| `trace_state` | string | NO | Vendor-specific state |
| `baggage` | map | YES | Tenant context baggage |

Baggage Contents:

| Key | Value | Purpose |
|-----|-------|---------|
| `tenant_id` | UUID | Tenant isolation |
| `user_id` | UUID | User attribution |
| `session_id` | UUID | Session correlation |
| `budget_id` | string | Cost tracking |
| `feature_flags` | JSON | Experiment context |

### 2. Design Tool Execution Tracing

Define tracing for tool invocations:

| Tool Category | Span Type | Key Attributes | Timing |
|---------------|-----------|----------------|--------|
| Internal tools | `tool.internal.{name}` | tool_version, result_type | Start/end |
| External APIs | `tool.external.{name}` | endpoint, status_code | Start/end |
| Database | `tool.db.{operation}` | query_type, row_count | Start/end |
| File system | `tool.fs.{operation}` | path, size_bytes | Start/end |

Tool Span Attributes:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `tool.name` | string | YES | Tool identifier |
| `tool.version` | string | YES | Tool version |
| `tool.input_size` | int | NO | Input payload size |
| `tool.output_size` | int | NO | Output payload size |
| `tool.success` | boolean | YES | Execution success |
| `tool.error_type` | string | NO | Error classification |
| `tool.retry_count` | int | NO | Retry attempts |

Tool Error Events:

| Event | Attributes | Trigger |
|-------|------------|---------|
| `tool.error` | error_type, error_message, stack_trace | Tool failure |
| `tool.retry` | attempt, backoff_ms, reason | Retry attempt |
| `tool.timeout` | timeout_ms, operation | Timeout reached |
| `tool.circuit_break` | state, failure_count | Circuit opened |

### 3. Design Memory Operation Tracing

Define tracing for agent memory operations:

| Memory Operation | Span Name | Key Metrics | Tenant Scope |
|------------------|-----------|-------------|--------------|
| Vector search | `memory.vector.search` | query_time, result_count | tenant_id filter |
| Vector upsert | `memory.vector.upsert` | vectors_count, dimension | tenant_id namespace |
| KV read | `memory.kv.get` | key_count, hit_rate | tenant_id prefix |
| KV write | `memory.kv.set` | key_count, ttl | tenant_id prefix |
| Context load | `memory.context.load` | tokens_loaded, source | session_id |
| Context save | `memory.context.save` | tokens_saved, destination | session_id |

Memory Span Attributes:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `memory.store` | string | YES | Store identifier |
| `memory.operation` | string | YES | Operation type |
| `memory.namespace` | string | YES | Tenant namespace |
| `memory.latency_ms` | int | YES | Operation latency |
| `memory.size_bytes` | int | NO | Data size |
| `memory.cache_hit` | boolean | NO | Cache status |

Memory Access Patterns:

| Pattern | Span Structure | Aggregation |
|---------|----------------|-------------|
| Read-through | Parent span + cache check + backend read | Cache hit ratio |
| Write-through | Write span + cache invalidation | Write latency |
| Batch | Batch span + individual operations | Batch efficiency |

### 4. Design External API Call Tracing

Define tracing for external service calls:

| API Category | Span Name | Key Attributes | Tenant Context |
|--------------|-----------|----------------|----------------|
| LLM provider | `external.llm.{provider}` | model, tokens, latency | Required in headers |
| Third-party | `external.api.{service}` | endpoint, status | If supported |
| Webhook | `external.webhook.{target}` | url, response_time | In payload |
| OAuth | `external.auth.{provider}` | grant_type, scope | User context |

External Span Attributes:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `http.method` | string | YES | HTTP method |
| `http.url` | string | YES | Target URL (sanitized) |
| `http.status_code` | int | YES | Response status |
| `http.request_size` | int | NO | Request body size |
| `http.response_size` | int | NO | Response body size |
| `external.service` | string | YES | Service identifier |
| `external.version` | string | NO | API version |

Sensitive Data Handling:

| Data Type | Handling | Span Storage |
|-----------|----------|--------------|
| API keys | Never log | Masked |
| PII | Redact | Hashed or removed |
| Credentials | Never log | Never stored |
| Request bodies | Configurable | Per tenant policy |

**Verify current best practices with web search:**
Search the web: "distributed tracing context propagation {date}"
Search the web: "OpenTelemetry baggage propagation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the trace propagation design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into propagation edge cases and failure modes
- **P (Party Mode)**: Bring distributed systems and security perspectives
- **C (Continue)**: Accept propagation design and proceed to trace analysis
- **[Specific refinements]**: Describe propagation concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save trace propagation design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] Cross-agent context propagation defined
- [ ] Tool execution tracing specified
- [ ] Memory operation tracing designed
- [ ] External API call tracing documented
- [ ] Sensitive data handling addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Context propagation specification
- Tool tracing schema
- Memory tracing schema
- External API tracing schema

---

## Next Step

Proceed to `step-04-c-document.md` to design trace analysis capabilities.
