# Step 04: Design Tool Execution

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL security concern** - Document and await direction

## EXECUTION PROTOCOLS

- 🎯 Focus: Design sandboxed execution environment with resource limits
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Execution isolation, resource limits, timeout handling, error responses
- 🚫 Do NOT: Compile final contract document (that's Step 05)
- 🔍 Use web search: Verify tool execution sandbox patterns
- ⚠️ Gate: Tool execution must enforce tenant isolation (QG-I2) and agent safety (QG-I3)

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Sandboxed execution environment design
- Resource limits per tenant and tier
- Timeout handling strategies
- Error response standardization
- Execution monitoring and tracing

**OUT OF SCOPE:**
- Tool schema design (Step 02)
- Tool registration (Step 03)
- Contract compilation (Step 05)

---

## Purpose

Design the tool execution environment including sandboxing, resource limits, timeout handling, and standardized error responses. This ensures tools execute safely within tenant boundaries with predictable resource consumption.

---

## Prerequisites

- Step 03 completed: Tool registration designed
- Tool schemas and permissions defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-execution
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3.md`

---

## Inputs

- Tool registration design from Step 03
- Tool schemas from Step 02
- Rate limits and permissions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design tool execution environment with security and resource isolation.

---

## Main Sequence

### 1. Design Sandboxed Execution Environment

Define execution isolation layers:

| Layer | Purpose | Implementation | Tenant Isolation |
|-------|---------|----------------|------------------|
| Process | Separate process per execution | Container/Lambda | Per-execution |
| Memory | Memory isolation | Process boundaries | Per-execution |
| Network | Network policy enforcement | Network policies | Per-tenant |
| Storage | Filesystem isolation | Tenant prefix paths | Per-tenant |
| Secrets | Credential isolation | Tenant vault | Per-tenant |

**Sandbox Architecture:**

```
Agent Request
    │
    ▼
┌─────────────────────┐
│  Permission Guard   │ ── Check permissions
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│   Rate Limiter      │ ── Check quotas
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  Execution Sandbox  │ ── Isolated execution
│  ┌───────────────┐  │
│  │ Tool Instance │  │
│  │ (Tenant Ctx)  │  │
│  └───────────────┘  │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  Output Sanitizer   │ ── Validate response
└─────────────────────┘
```

### 2. Define Resource Limits Per Tenant

Configure resource limits by tenant tier:

| Resource | Free Tier | Pro Tier | Enterprise | Enforcement |
|----------|-----------|----------|------------|-------------|
| Memory | 256 MB | 1 GB | 4 GB | Hard limit |
| CPU Time | 10s | 60s | 300s | Timeout |
| File Size | 10 MB | 100 MB | 1 GB | Write check |
| Network | 1 MB/s | 10 MB/s | 100 MB/s | Throttle |
| Concurrent | 2 | 10 | 50 | Queue |

**Resource Limit Schema:**

```yaml
ResourceLimits:
  type: object
  properties:
    memory_mb:
      type: integer
      minimum: 64
      maximum: 8192
    cpu_seconds:
      type: integer
      minimum: 1
      maximum: 600
    max_file_size_mb:
      type: integer
      minimum: 1
      maximum: 1024
    network_bandwidth_mbps:
      type: integer
      minimum: 1
      maximum: 1000
    max_concurrent_executions:
      type: integer
      minimum: 1
      maximum: 100
```

### 3. Design Timeout Handling

Define timeout strategies:

| Timeout Type | Duration | Action | Retry |
|--------------|----------|--------|-------|
| Connection | 5s | Fail fast | Yes (3x) |
| Read | 30s | Return partial | No |
| Execution | Tier-based | Terminate | No |
| Graceful | Execution + 5s | Force kill | No |

**Timeout Response:**

```yaml
TimeoutError:
  success: false
  error:
    code: TIMEOUT_ERROR
    message: "Tool execution timed out after {duration} seconds"
    details:
      tool_id: "{tool_id}"
      timeout_type: "execution"
      configured_timeout: 60
      partial_result: null
```

**Graceful Shutdown:**

| Phase | Duration | Action |
|-------|----------|--------|
| Warning | T - 5s | Signal tool to wrap up |
| Soft Stop | T | Interrupt execution |
| Hard Stop | T + 5s | Force terminate |
| Cleanup | T + 10s | Release resources |

### 4. Design Error Response Standardization

Define standardized error responses:

| Error Code | HTTP Status | Retryable | Description |
|------------|-------------|-----------|-------------|
| VALIDATION_ERROR | 400 | No | Invalid input |
| PERMISSION_DENIED | 403 | No | Missing permission |
| NOT_FOUND | 404 | No | Resource not found |
| RATE_LIMITED | 429 | Yes | Quota exceeded |
| TIMEOUT_ERROR | 408 | Yes | Execution timeout |
| RESOURCE_EXHAUSTED | 507 | Yes | Memory/CPU limit |
| INTERNAL_ERROR | 500 | Yes | Unexpected failure |
| SANDBOX_VIOLATION | 403 | No | Security boundary |

**Error Response Schema:**

```yaml
ToolErrorResponse:
  type: object
  required: [success, error]
  properties:
    success:
      type: boolean
      const: false
    error:
      type: object
      required: [code, message]
      properties:
        code:
          type: string
          enum: [VALIDATION_ERROR, PERMISSION_DENIED, NOT_FOUND, RATE_LIMITED, 
                 TIMEOUT_ERROR, RESOURCE_EXHAUSTED, INTERNAL_ERROR, SANDBOX_VIOLATION]
        message:
          type: string
        details:
          type: object
        retry_after:
          type: integer
          description: "Seconds until retry allowed"
        trace_id:
          type: string
          description: "Correlation ID for debugging"
```

### 5. Design Execution Monitoring

Define monitoring and tracing:

| Metric | Type | Labels | Alert Threshold |
|--------|------|--------|-----------------|
| tool_execution_duration | histogram | tool_id, tenant_id | P99 > 10s |
| tool_execution_errors | counter | tool_id, error_code | > 10/min |
| tool_resource_usage | gauge | tenant_id, resource | > 80% limit |
| tool_rate_limit_hits | counter | tenant_id, tool_id | > 100/min |

**Trace Context:**

| Field | Description | Propagation |
|-------|-------------|-------------|
| trace_id | Request correlation ID | All calls |
| span_id | Current operation span | New per tool |
| parent_span_id | Calling agent span | From agent |
| tenant_id | Tenant identifier | All calls |
| tool_id | Tool being executed | Current tool |

### 6. Design Security Boundaries

Define security enforcement:

| Boundary | Enforcement | Violation Response |
|----------|-------------|-------------------|
| Tenant Isolation | TenantContext validation | PERMISSION_DENIED |
| Path Traversal | Path prefix validation | SANDBOX_VIOLATION |
| Network Egress | Allowlist enforcement | SANDBOX_VIOLATION |
| Secret Access | Vault tenant scope | PERMISSION_DENIED |
| Code Execution | Sandboxed runtime | SANDBOX_VIOLATION |

**Security Checks Per Execution:**

```
1. Validate TenantContext (CRITICAL)
2. Check tool exists and enabled
3. Verify permission grant
4. Validate rate limit quota
5. Check resource availability
6. Execute in sandbox
7. Validate output schema
8. Sanitize response
```

### 7. Web Research Verification

**Verify current best practices:**

Search the web: "AI agent tool sandboxing patterns {date}"
Search the web: "serverless function resource limits best practices {date}"
Search the web: "multi-tenant execution isolation security {date}"

_Source: [Document findings with URLs]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tool execution design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific execution decisions
- **P (Party Mode)**: Bring security and platform architect perspectives
- **C (Continue)**: Accept design and proceed to contract compilation
- **[Specific topic]**: Describe topic to explore in detail

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: sandbox design, resource limits, security boundaries
- Process enhanced insights on execution patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tool execution design for agent runtime: {summary}"
- Process Security Architect and Platform Architect (Atlas) perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document tool execution decisions
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## SUCCESS METRICS:

- [ ] Sandbox architecture defined
- [ ] Resource limits configured per tier
- [ ] Timeout handling documented
- [ ] Error responses standardized
- [ ] Monitoring strategy defined
- [ ] Security boundaries enforced

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| No sandbox isolation | Add process/container isolation |
| Missing resource limits | Define limits per tier |
| Unclear timeout handling | Document timeout strategy |
| Non-standard errors | Implement error schema |

---

## Verification

- [ ] Sandbox architecture complete
- [ ] Resource limits documented
- [ ] Timeout handling defined
- [ ] Error responses standardized
- [ ] Monitoring configured
- [ ] Security boundaries enforced
- [ ] Patterns align with pattern registry

---

## Outputs

- Sandbox architecture design
- Resource limits by tier
- Timeout handling strategy
- Error response schema
- Monitoring specification
- Security boundary definitions

---

## NEXT STEP:

Proceed to `step-05-c-complete.md` to compile the tool contract design document.
