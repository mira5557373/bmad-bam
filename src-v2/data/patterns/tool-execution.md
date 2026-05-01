---
pattern_id: tool-execution
shortcode: ZTE
category: ai-runtime
qg_ref: QG-M3
version: 1.0.0
last_reviewed: 2026-05-01
---

# Tool Execution - BAM Pattern

**Loaded by:** ZTE  
**Applies to:** Multi-tenant AI systems requiring controlled tool invocation

---

## When to Use

- AI agents need to execute tools/functions
- Tool calls must respect tenant boundaries
- Need audit trail of tool executions
- Tool execution requires timeout and retry handling
- Managing tool execution context across agent steps

## When NOT to Use

- Simple API calls without agent orchestration
- Single-tenant systems without isolation needs
- Synchronous-only tool calls (no orchestration needed)

## Architecture

### Tool Execution Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                   Tool Execution Lifecycle                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Agent Request                                                  │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────┐                                                │
│  │ 1. VALIDATE │ ← Check tool exists, tenant has permission     │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ 2. PREPARE  │ ← Inject tenant context, sanitize inputs       │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ 3. EXECUTE  │ ← Run with timeout, capture output             │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ 4. SANITIZE │ ← Remove sensitive data from response          │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ 5. AUDIT    │ ← Log execution for compliance                 │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  Return to Agent                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tenant-Scoped Execution Context

```yaml
tool_execution:
  tenant_id: uuid
  bam_controlled: true
  
  context:
    tenant_id: string
    user_id: string
    session_id: string
    agent_id: string
    execution_id: uuid  # Unique per tool call
    
  execution_config:
    timeout_ms: 30000
    max_retries: 3
    retry_backoff_ms: [100, 500, 2000]
    
  sandbox:
    enabled: bool
    memory_limit_mb: 256
    cpu_limit_percent: 50
    network_allowed: bool
    filesystem_access: enum[none, readonly, temp_only]
    
  audit:
    log_inputs: bool  # Careful with PII
    log_outputs: bool
    log_duration: true
    log_errors: true
    retention_days: 90
```

### Tool Invocation Flow

```
Agent calls tool("search_documents", {query: "revenue"})
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ Tool Executor                                                │
│                                                              │
│  1. Lookup tool "search_documents"                          │
│     └── Found: SearchDocumentsTool                          │
│                                                              │
│  2. Check permissions                                        │
│     └── Tenant: acme_corp                                   │
│     └── Tool allowed: ✓                                     │
│     └── Rate limit: 45/100 calls remaining                  │
│                                                              │
│  3. Prepare context                                          │
│     └── Inject: tenant_id="acme_corp"                       │
│     └── Inject: user_id="user_123"                          │
│     └── Sanitize: query (no SQL injection)                  │
│                                                              │
│  4. Execute with timeout                                     │
│     └── Start timer: 30s                                    │
│     └── Call: tool.execute(context, params)                 │
│     └── Result: [{doc_id: 1, title: "Q4 Revenue"}]          │
│                                                              │
│  5. Post-process                                             │
│     └── Filter results by tenant RLS                        │
│     └── Redact sensitive fields                             │
│     └── Log to audit trail                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
Agent receives: [{doc_id: 1, title: "Q4 Revenue"}]
```

### Error Handling Matrix

| Error Type | Retry? | Action | Return to Agent |
|------------|--------|--------|-----------------|
| Timeout | Yes (3x) | Exponential backoff | Error after retries exhausted |
| Permission denied | No | Log security event | Permission error |
| Tool not found | No | Log warning | Tool unavailable error |
| Rate limited | Yes (after delay) | Wait for window | Retry or error |
| Execution error | Depends | Log full stack trace | Sanitized error |
| Network failure | Yes (3x) | Backoff | Error after retries |

### Execution Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| Synchronous | Wait for result | Fast tools (<5s) |
| Async with callback | Fire and callback | Medium tools (5-60s) |
| Background job | Queue and poll | Long-running tools (>60s) |
| Streaming | Progressive results | Large output tools |

### Multi-Tool Orchestration

```
Agent requests parallel tools:
  ├── tool_1: search_web(query)
  ├── tool_2: search_docs(query)
  └── tool_3: search_code(query)

Execution Strategy:
┌─────────────────────────────────────────────────────────────┐
│  Parallel Executor                                          │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ Tool 1  │  │ Tool 2  │  │ Tool 3  │  ← Concurrent       │
│  │ (2.1s)  │  │ (0.8s)  │  │ (1.5s)  │                     │
│  └────┬────┘  └────┬────┘  └────┬────┘                     │
│       │            │            │                          │
│       └────────────┴────────────┘                          │
│                    │                                        │
│                    ▼                                        │
│              Aggregate Results                              │
│              (Total: 2.1s, not 4.4s)                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Audit Trail Schema

```yaml
tool_execution_audit:
  execution_id: uuid
  timestamp: datetime
  tenant_id: string
  user_id: string
  agent_id: string
  
  tool:
    name: string
    version: string
    
  execution:
    duration_ms: int
    status: enum[success, error, timeout, rate_limited]
    retry_count: int
    
  # Only if audit.log_inputs is true and data is not sensitive
  inputs_hash: string  # SHA256 for correlation without storing PII
  
  error:
    code: string
    message: string  # Sanitized
    
  metadata:
    ip_address: string
    user_agent: string
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Sync execution | Simple, predictable | Blocks agent | Fast tools |
| Async callbacks | Non-blocking | Complex error handling | Medium tools |
| Job queues | Scalable, resilient | Latency, complexity | Long-running |
| Sandboxed | Secure isolation | Overhead | Untrusted tools |

## Quality Checks

- [ ] All tools validate tenant context
- [ ] Timeout configured for all tools
- [ ] Retry logic with exponential backoff
- [ ] Audit logging enabled
- [ ] Error messages sanitized (no stack traces to agent)
- [ ] **CRITICAL:** No cross-tenant data in tool responses

## Web Research Queries

- "AI agent tool execution patterns {date}"
- "LangChain tool execution best practices {date}"
- "function calling timeout handling LLM {date}"
- "multi-tenant tool isolation patterns {date}"
- "agent tool audit logging patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M3 | Tool execution pattern implementation verified |

## Related Patterns

- [tool-permission-model.md](tool-permission-model.md) - Permission control
- [tool-resilience.md](tool-resilience.md) - Resilience patterns
- [action-contract.md](action-contract.md) - Action validation
- [rbac-per-tool.md](rbac-per-tool.md) - Tool-level RBAC
