# Step 04: Design Observability and Versioning

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER design observability without architecture from Step 03**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ **CRITICAL: Design ALL observability components** - tracing, metrics, versioning, recovery
- 📋 **Document observability decisions** with clear instrumentation points
- 💬 **Present design with A/P/C menu** for user confirmation
- 🌐 **Use web search** to verify current observability and LLM versioning patterns

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Design observability, LLM versioning, and error handling
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Reference: Architecture from Step 03 for instrumentation points
- 📖 Reference: `domains/ai-runtime.md` for observability patterns
- 🚫 Do NOT: Proceed without explicit user confirmation via A/P/C
- ⚠️ Gate: QG-M3 (Agent Runtime Gate) requires observability documentation
- 🔍 Use web search: Verify LLM observability and versioning best practices

---

## CONTEXT BOUNDARIES

### Input Context

- **From Step 01:** Agent types, state management requirements
- **From Step 02:** Selected runtime and capabilities
- **From Step 03:** Architecture design - graph, tools, memory, context
- **Domain file:** `{project-root}/_bmad/bam/data/domains/ai-runtime.md`

### Output

- Agent execution tracing design
- LLM versioning strategy
- Tenant-scoped metrics design
- Error handling and recovery patterns

### Quality Gate

- QG-M3 requires documented observability and recovery patterns

---

## YOUR TASK

Design the observability layer for the agent runtime architecture. Create execution tracing instrumentation, LLM versioning strategy, tenant-scoped metrics, and error handling patterns. Present the complete design via A/P/C menu for user confirmation.

---

## Main Sequence

### Action 1: Design Agent Execution Tracing

**Execution Tracing Architecture:**

```markdown
## Agent Execution Tracing Design

### Trace Structure

```
Trace: {trace_id}
├── Span: API Request (tenant: {tenant_id})
│   ├── Span: Agent Graph Invocation
│   │   ├── Span: Node - Router
│   │   │   ├── Span: LLM Call (model: {model}, tokens: {count})
│   │   │   └── Span: Decision: route_to_{agent}
│   │   ├── Span: Node - Agent A
│   │   │   ├── Span: LLM Call (model: {model}, tokens: {count})
│   │   │   └── Span: Tool Call - {tool_name}
│   │   │       └── Span: External API (service: {service})
│   │   └── Span: Node - Aggregator
│   │       └── Span: LLM Call (model: {model}, tokens: {count})
│   └── Span: Response Formatting
└── Trace Attributes: {tenant_id, user_id, session_id, graph_id}
```

### Instrumentation Points

| Layer | What to Trace | Key Attributes |
|-------|---------------|----------------|
| **API Entry** | Request start/end | tenant_id, user_id, endpoint |
| **Graph Invocation** | Graph execution | graph_name, input_hash, config |
| **Node Execution** | Each node | node_name, node_type, duration |
| **LLM Call** | Model invocation | model, provider, tokens_in, tokens_out, latency |
| **Tool Execution** | Tool invocation | tool_name, input_summary, output_summary |
| **External Call** | API/DB calls | service, operation, status |
| **Checkpoint** | State persistence | checkpoint_type, state_size |
| **Error** | Exceptions | error_type, error_message, stack_trace |

### Trace Context Propagation

| Carrier | Format | Example |
|---------|--------|---------|
| HTTP Header | W3C Trace Context | `traceparent: 00-{trace_id}-{span_id}-01` |
| Message Envelope | Custom field | `{"trace_id": "...", "span_id": "..."}` |
| Graph State | State field | `state.trace_context = {...}` |
| Async Job | Job metadata | `job.metadata.trace_context = {...}` |

### Integration Options

| Tool | Use Case | Configuration |
|------|----------|---------------|
| **LangSmith** | LangGraph native | Project key, trace sampling |
| **OpenTelemetry** | Vendor-neutral | OTLP exporter, sampling rules |
| **Datadog APM** | Full-stack tracing | DD agent, trace propagation |
| **Custom** | Specialized needs | Structured logging + correlation |
```

Search the web: "LLM agent tracing observability {date}"
Search the web: "LangSmith vs OpenTelemetry LLM {date}"

_Source: [URL]_

### Action 2: Design LLM Versioning Strategy

**LLM Versioning Architecture:**

```markdown
## LLM Versioning Strategy

### Version Dimensions

| Dimension | What Changes | Impact | Versioning Strategy |
|-----------|--------------|--------|---------------------|
| **Model Version** | Provider model release | Output quality | Pin to specific version |
| **Prompt Version** | System/user prompts | Behavior | Version control + registry |
| **Agent Version** | Agent logic/tools | Functionality | Semantic versioning |
| **Runtime Version** | Framework version | Compatibility | Dependency lock |

### Model Version Management

```
┌─────────────────────────────────────────────────────────────┐
│                   LLM Model Registry                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ Model: gpt-4o   │  │ Model: claude-3 │  │ Model: ...  │ │
│  │ Version: 2024-05│  │ Version: sonnet │  │             │ │
│  │ Status: active  │  │ Status: active  │  │             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│                              │                              │
│                    ┌─────────▼─────────┐                   │
│                    │  Version Router   │                   │
│                    │  (Tenant Config)  │                   │
│                    └───────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### Model Version Configuration

| Config Level | Scope | Override Hierarchy |
|--------------|-------|-------------------|
| Platform Default | All tenants | Lowest priority |
| Tier Default | Free/Pro/Enterprise | Medium priority |
| Tenant Override | Single tenant | High priority |
| User Override | Single user (if allowed) | Highest priority |

### Prompt Version Registry

| Component | Storage | Versioning | Rollback |
|-----------|---------|------------|----------|
| System Prompts | Config DB | Git + hash | Instant via config |
| Agent Definitions | Code repo | Semver | Deployment |
| Tool Descriptions | Config DB | Versioned | Instant via config |
| Few-shot Examples | Vector DB | Timestamped | Re-index |

### Version Change Protocol

| Change Type | Testing Required | Rollout Strategy | Rollback Time |
|-------------|------------------|------------------|---------------|
| Model upgrade | Eval suite | Canary 1% → 10% → 100% | < 1 minute |
| Prompt change | A/B test | Feature flag | Instant |
| Agent update | Integration tests | Blue-green | < 5 minutes |
| Breaking change | Full regression | Staged by tenant tier | Planned |

### Tenant-Specific Model Configuration

| Capability | Free Tier | Pro Tier | Enterprise Tier |
|------------|-----------|----------|-----------------|
| Model selection | Fixed | Choice of 2-3 | Full catalog |
| Model version | Platform default | Tier default | Tenant pinned |
| BYOK (Bring Your Own Key) | No | No | Yes |
| Custom fine-tunes | No | No | Yes |
```

Search the web: "LLM versioning production {date}"
Search the web: "prompt versioning best practices {date}"

_Source: [URL]_

### Action 3: Design Tenant-Scoped Metrics

**Metrics Architecture:**

```markdown
## Tenant-Scoped Metrics Design

### Metric Categories

| Category | Metrics | Tenant Scoping | Aggregation |
|----------|---------|----------------|-------------|
| **Usage** | Requests, tokens, executions | Per-tenant | Billing period |
| **Performance** | Latency, throughput, queue depth | Per-tenant | Time windows |
| **Quality** | Success rate, error rate, retries | Per-tenant | Rolling average |
| **Cost** | LLM spend, compute, storage | Per-tenant | Daily/monthly |
| **Limits** | Quota usage, rate limit hits | Per-tenant | Real-time |

### Metric Dimensions

Every metric includes these dimensions:

| Dimension | Source | Example Values |
|-----------|--------|----------------|
| `tenant_id` | Request context | `tenant_abc123` |
| `tier` | Tenant config | `free`, `pro`, `enterprise` |
| `agent` | Graph/crew config | `analyst`, `writer` |
| `model` | LLM config | `gpt-4o`, `claude-3-sonnet` |
| `operation` | Code path | `invoke`, `tool_call`, `checkpoint` |
| `status` | Result | `success`, `error`, `timeout` |

### Key Metrics Definition

| Metric Name | Type | Description | Alert Threshold |
|-------------|------|-------------|-----------------|
| `agent.requests.total` | Counter | Total agent invocations | - |
| `agent.requests.duration_ms` | Histogram | Request latency | p99 > 30s |
| `agent.llm.tokens_in` | Counter | Input tokens consumed | - |
| `agent.llm.tokens_out` | Counter | Output tokens generated | - |
| `agent.llm.cost_usd` | Counter | LLM API cost | Budget threshold |
| `agent.tools.calls` | Counter | Tool invocations | - |
| `agent.tools.duration_ms` | Histogram | Tool execution time | p99 > 10s |
| `agent.errors.total` | Counter | Error count | > 5% error rate |
| `agent.checkpoints.size_bytes` | Gauge | Checkpoint storage | > 10MB |
| `tenant.quota.usage_percent` | Gauge | Quota consumption | > 80% |

### Metrics Infrastructure

```
Agent Runtime → Metrics Collector → Time-Series DB → Dashboards
      │               │                   │             │
      │         ┌─────┴─────┐       ┌─────┴─────┐      │
      │         │ Prometheus │       │ Grafana   │      │
      │         │ / OTEL     │       │ / Datadog │      │
      │         └───────────┘       └───────────┘      │
      │                                                 │
      └─── Tenant Context Labels ──────────────────────┘
```

### Tenant Dashboard Requirements

| Dashboard | Purpose | Key Visualizations |
|-----------|---------|-------------------|
| Platform Overview | Ops team | Total requests, error rate, top tenants |
| Tenant Detail | Per-tenant | Usage, costs, quota, errors |
| Agent Performance | Per-agent | Latency, success rate, token usage |
| Cost Analysis | Finance | Spend by tenant, by model, trends |
| Alerting | On-call | Error spikes, quota breaches, latency |
```

Search the web: "multi-tenant metrics observability {date}"
Search the web: "LLM token cost tracking {date}"

_Source: [URL]_

### Action 4: Design Error Handling and Recovery

**Error Handling Architecture:**

```markdown
## Error Handling and Recovery Design

### Error Classification

| Error Category | Retryable | Tenant Impact | Recovery Strategy |
|----------------|-----------|---------------|-------------------|
| **LLM Rate Limit** | Yes | Queue delay | Exponential backoff |
| **LLM Timeout** | Yes | Retry delay | Retry with timeout increase |
| **LLM Content Filter** | No | Request rejected | Return user-friendly error |
| **Tool Failure** | Conditional | Partial result | Retry or graceful degradation |
| **State Corruption** | No | Task restart | Restore from checkpoint |
| **Tenant Quota** | No | Request blocked | Return quota exceeded error |
| **System Error** | Conditional | Service degraded | Circuit breaker |

### Retry Strategy

| Error Type | Max Retries | Backoff | Timeout |
|------------|-------------|---------|---------|
| LLM rate limit | 5 | Exponential (1s, 2s, 4s, 8s, 16s) | 60s total |
| LLM timeout | 3 | Linear (5s) | 90s total |
| Tool failure | 2 | Immediate | 30s per retry |
| External API | 3 | Exponential (1s, 2s, 4s) | 30s total |

### Checkpoint Recovery

```
Normal Execution:
[Node A] → checkpoint → [Node B] → checkpoint → [Node C] → complete

Failure at Node C:
[Node A] → checkpoint → [Node B] → checkpoint → [Node C] ✗
                                        │
                                        ▼
Recovery:
Load checkpoint from Node B → [Node C] → complete

Recovery Decision Matrix:
| Failure Type | Action | Checkpoint Used |
|--------------|--------|-----------------|
| Transient | Retry node | Current state |
| Persistent | Skip or fail | Previous checkpoint |
| State corrupt | Restart task | Initial state |
| Timeout | Retry with extension | Current state |
```

### Circuit Breaker Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    Circuit Breaker                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   CLOSED ──────────────────► OPEN                          │
│     │    (failure threshold)    │                          │
│     │                           │                          │
│     │                           ▼                          │
│     │                      HALF-OPEN                       │
│     │                           │                          │
│     │                           │                          │
│     └────◄──────────────────────┘                          │
│         (success threshold)                                 │
│                                                             │
│   Thresholds:                                               │
│   - Open after: 5 failures in 60 seconds                   │
│   - Half-open after: 30 seconds                            │
│   - Close after: 3 consecutive successes                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Graceful Degradation

| Degradation Level | Trigger | User Experience |
|-------------------|---------|-----------------|
| **Full Service** | All systems healthy | Complete functionality |
| **Partial** | Non-critical tool failure | Reduced features, notification |
| **Minimal** | LLM degraded | Cached responses, limited AI |
| **Maintenance** | System overload | Queue requests, status page |

### Error Response Format

```json
{
  "error": {
    "code": "AGENT_EXECUTION_FAILED",
    "message": "Agent could not complete the task",
    "details": {
      "agent": "analyst",
      "step": "data_retrieval",
      "reason": "External API timeout"
    },
    "recovery": {
      "action": "RETRY_AVAILABLE",
      "checkpoint_id": "chk_123",
      "retry_after_seconds": 30
    },
    "trace_id": "trace_abc123"
  }
}
```
```

Search the web: "LLM agent error handling patterns {date}"
Search the web: "circuit breaker AI agents {date}"

_Source: [URL]_

### Action 5: Compile Observability Summary

**Observability Summary:**

```markdown
## Observability and Versioning Summary

### Components Designed

| Component | Design Approach | Tenant Isolation |
|-----------|-----------------|------------------|
| Execution Tracing | {tracing_approach} | Trace attributes |
| LLM Versioning | {versioning_strategy} | Tenant config |
| Metrics | {metrics_approach} | Dimension labels |
| Error Handling | {error_strategy} | Per-tenant circuits |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Tracing tool | {choice} | {rationale} |
| Model versioning | {choice} | {rationale} |
| Metrics backend | {choice} | {rationale} |
| Retry strategy | {choice} | {rationale} |

### Integration Points

| Integration | Purpose | Configuration |
|-------------|---------|---------------|
| {tool_1} | {purpose} | {config_approach} |
| {tool_2} | {purpose} | {config_approach} |
```

---

## COLLABORATION MENUS (A/P/C)

After presenting observability design:

```
================================================================================
OBSERVABILITY AND VERSIONING DESIGN COMPLETE
================================================================================

TRACING: {tracing_approach} with {instrumentation_points} points
VERSIONING: {versioning_strategy} with {config_levels} levels
METRICS: {metric_count} metrics with tenant dimensions
ERROR HANDLING: {retry_strategies} retry strategies, circuit breaker

================================================================================
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific observability components
- **P (Party Mode)**: Gather DevOps and SRE perspectives on design
- **C (Continue)**: Accept observability design and proceed to completion

Select an option:
================================================================================
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

| Topic | Questions to Explore |
|-------|---------------------|
| **Trace Volume** | How to manage trace data at scale? |
| **Cost Control** | How to limit observability costs? |
| **Alerting** | What alerts are critical for agent health? |
| **Debugging** | How to debug tenant-specific issues? |
| **Compliance** | How to handle trace data for compliance? |
| **On-call** | What runbooks are needed? |

Pass context: Observability design, architecture from Step 03, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

#### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review agent observability design:
- Tracing: {tracing_approach}
- Versioning: {versioning_strategy}
- Metrics: {metric_count} metrics
- Error handling: {error_strategy}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| **SRE** | Operability | Can we effectively monitor and debug? |
| **DevOps** | Deployment | How does versioning integrate with CI/CD? |
| **Security** | Compliance | Are traces properly secured and retained? |
| **Product** | User experience | How do errors impact user experience? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

#### If 'C' (Continue):

1. Record the observability design in working document:

```yaml
# Add to agent-runtime-architecture.md
observability:
  tracing:
    tool: {tracing_tool}
    instrumentation: [{points}]
  versioning:
    model: {model_versioning}
    prompt: {prompt_versioning}
    config_levels: [{levels}]
  metrics:
    backend: {metrics_backend}
    key_metrics: [{metric_names}]
  error_handling:
    retry_strategy: {strategy}
    circuit_breaker: {config}
    graceful_degradation: {levels}
observability_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document  # Add this
currentStep: step-05-c-complete
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Execution tracing design with all instrumentation points
- ✅ LLM versioning strategy with tenant configuration
- ✅ Tenant-scoped metrics defined
- ✅ Error handling and recovery patterns documented
- ✅ Circuit breaker and graceful degradation designed
- ✅ Web research performed for observability best practices
- ✅ User confirmed design via A/P/C menu

---

## FAILURE MODES

- ❌ **Designing without architecture:** Observability must match component structure
- ❌ **Missing tenant context:** All traces/metrics need tenant dimensions
- ❌ **No versioning strategy:** Model changes will cause unexpected behavior
- ❌ **Incomplete error handling:** Missing retry/recovery patterns
- ❌ **Skipping web research:** May miss current observability best practices
- ❌ **Proceeding without A/P/C:** User not engaged in observability decisions

---

## NEXT STEP

After user confirms observability design with 'C':

1. Record the observability design in working document
2. Proceed to `step-05-c-complete.md` to compile final artifact
3. The observability design informs:
   - QG-M3 checklist items
   - Deployment requirements
   - Monitoring setup

**Transition to Step 05 with:**
- Observability summary: `{components_designed}`
- Key integrations: `{tools_selected}`
- Recovery patterns: `{error_handling_strategies}`
