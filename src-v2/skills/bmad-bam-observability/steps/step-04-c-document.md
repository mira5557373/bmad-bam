# Step 04: Design Distributed Tracing

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Trace context with tenant_id, span attributes, cross-module correlation, cost attribution sampling
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Tenant dimensions from Step 01, metrics/logging consistency
- 🚫 Do NOT: Design dashboards yet - that comes in Step 05
- 🔍 Use web search: Verify W3C trace context and OpenTelemetry patterns
- ⚠️ Gate: QG-OC (Observability Completeness)

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Design tenant-aware distributed tracing covering trace context propagation with tenant_id, span attributes for tenant attribution, cross-module trace correlation, and tier-based sampling for cost attribution.

---

## Prerequisites

- Step 03 complete: Logging strategy designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`

---

## Inputs

- Tenant dimension catalog from Step 01
- Logging specification from Step 03 (for correlation)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- AI agent architecture (for agent execution tracing)

---

## Actions

### 1. Define Trace Context Structure

Design W3C-compliant trace context with tenant baggage:

```yaml
trace_context:
  # W3C Trace Context standard
  standard: "W3C Trace Context Level 2"
  
  # Core trace identifiers
  identifiers:
    trace_id: "128-bit identifier (32 hex chars)"
    span_id: "64-bit identifier (16 hex chars)"
    trace_flags: "8-bit flags (sampling decision)"
    
  # Tenant baggage (propagated across services)
  baggage:
    tenant_id:
      key: "tenant_id"
      required: true
      propagation: "All downstream services"
    tenant_tier:
      key: "tenant_tier"
      required: true
      propagation: "All downstream services"
    user_id:
      key: "user_id"
      required: false
      propagation: "Internal services only"
    request_id:
      key: "request_id"
      required: true
      propagation: "All services (log correlation)"
```

### 2. Define Span Attributes for Tenant Attribution

Configure required and recommended span attributes:

```yaml
span_attributes:
  # Required on all spans
  required:
    - name: "tenant.id"
      type: string
      description: "Tenant identifier"
    - name: "tenant.tier"
      type: string
      description: "FREE | PRO | ENTERPRISE"
    - name: "service.name"
      type: string
      description: "Service producing the span"
    - name: "service.version"
      type: string
      description: "Service semantic version"
      
  # Recommended on request spans
  recommended:
    - name: "user.id"
      type: string
      description: "User identifier (hashed for FREE tier)"
    - name: "http.method"
      type: string
      description: "HTTP method"
    - name: "http.route"
      type: string
      description: "HTTP route pattern (not path)"
    - name: "http.status_code"
      type: int
      description: "HTTP response status code"
      
  # AI agent spans (when applicable)
  agent_attributes:
    - name: "agent.id"
      type: string
      description: "Agent identifier"
    - name: "agent.name"
      type: string
      description: "Agent display name"
    - name: "conversation.id"
      type: string
      description: "Conversation identifier"
    - name: "llm.model"
      type: string
      description: "LLM model used"
    - name: "llm.tokens.input"
      type: int
      description: "Input tokens consumed"
    - name: "llm.tokens.output"
      type: int
      description: "Output tokens generated"
```

### 3. Design Cross-Module Trace Correlation

Configure trace propagation across service boundaries:

```yaml
propagation:
  # HTTP/REST propagation
  http:
    headers:
      - "traceparent"  # W3C trace context
      - "tracestate"   # Vendor-specific state
      - "baggage"      # Tenant context baggage
    injection: "Automatic via OpenTelemetry SDK"
    extraction: "Automatic via OpenTelemetry SDK"
    
  # Message queue propagation
  async_messaging:
    message_attributes:
      - "traceparent"
      - "tenant_id"
      - "tenant_tier"
    queue_systems:
      - "Kafka: Headers"
      - "RabbitMQ: Headers"
      - "SQS: Message Attributes"
      
  # gRPC propagation
  grpc:
    metadata:
      - "traceparent"
      - "grpc-trace-bin"  # Binary format
      - "tenant-context-bin"
    injection: "gRPC interceptor"
    
  # Database propagation (for async operations)
  database:
    context_column: "trace_context"
    use_case: "Background job tracing"
```

### 4. Define Tier-Based Sampling for Cost Attribution

Configure sampling strategy by tenant tier:

```yaml
sampling:
  # Head-based sampling (decision at trace start)
  strategy: "ParentBased + TierBased"
  
  # Base sampling rates by tier
  tier_rates:
    FREE:
      default: 0.01  # 1% sampling
      error: 1.0     # 100% for errors
      slow: 0.5      # 50% for latency > 5s
    PRO:
      default: 0.1   # 10% sampling
      error: 1.0     # 100% for errors
      slow: 1.0      # 100% for latency > 3s
    ENTERPRISE:
      default: 1.0   # 100% sampling
      error: 1.0     # 100% for errors
      slow: 1.0      # 100% for all slow requests
      
  # Operation-specific overrides
  operation_overrides:
    agent_invocation: 0.5      # Critical operations
    billing_event: 1.0         # Always trace billing
    auth_flow: 0.2             # Moderate auth tracing
    health_check: 0.001        # Minimal health checks
    
  # Cost attribution
  cost_tracking:
    - attribute: "llm.tokens.total"
      aggregation: "sum by tenant_id"
    - attribute: "llm.model"
      aggregation: "count by tenant_id, model"
```

### 5. Design Agent Execution Tracing

Configure spans for AI agent workflows:

```yaml
agent_tracing:
  # Root span for agent invocation
  root_span:
    name: "agent.invoke"
    attributes:
      - tenant.id
      - agent.id
      - conversation.id
      - request.id
      
  # Child spans for agent operations
  child_spans:
    prompt_preparation:
      name: "agent.prepare_prompt"
      attributes:
        - context.tokens
        - memory.retrieved_count
        
    llm_call:
      name: "agent.llm_call"
      attributes:
        - llm.model
        - llm.provider
        - llm.tokens.input
        - llm.tokens.output
        - llm.latency_ms
        
    tool_execution:
      name: "agent.tool_execute"
      attributes:
        - tool.name
        - tool.outcome
        - tool.latency_ms
        
    memory_retrieval:
      name: "agent.memory_retrieve"
      attributes:
        - memory.tier
        - memory.chunks_retrieved
        
    response_generation:
      name: "agent.generate_response"
      attributes:
        - response.tokens
        - response.streaming
```

### 6. Configure Trace Export

Define export configuration:

```yaml
export:
  # OTLP exporter configuration
  exporter: "OTLP gRPC"
  endpoint: "tempo.observability.svc:4317"
  protocol: "gRPC"
  
  # Batching configuration
  batch:
    max_queue_size: 2048
    scheduled_delay_ms: 5000
    max_export_batch_size: 512
    export_timeout_ms: 30000
    
  # Retry configuration
  retry:
    enabled: true
    initial_interval_ms: 500
    max_interval_ms: 30000
    max_elapsed_time_ms: 300000
    
  # Resource attributes (attached to all spans)
  resource_attributes:
    service.name: "${SERVICE_NAME}"
    service.version: "${SERVICE_VERSION}"
    deployment.environment: "${ENVIRONMENT}"
    cloud.region: "${CLOUD_REGION}"
```

**Verify current best practices with web search:**
Search the web: "OpenTelemetry multi-tenant tracing best practices {date}"
Search the web: "W3C trace context baggage propagation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After designing distributed tracing, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into sampling strategy, agent tracing, or propagation rules
- **P (Party Mode)**: Bring SRE and AI runtime architect perspectives on tracing design
- **C (Continue)**: Accept tracing design and proceed to dashboard and alerting
- **[Specific refinements]**: Describe specific tracing aspects to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: trace context, sampling strategy, agent spans, propagation
- Process enhanced insights on distributed tracing
- Ask user: "Accept this detailed tracing analysis? (y/n)"
- If yes, integrate into tracing specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review distributed tracing design for tenant-aware observability"
- Process SRE and AI runtime architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tracing specification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the observability instrumentation design.**

Present summary of:
- Trace context structure with W3C compliance and tenant baggage
- Span attributes for tenant attribution
- Cross-module trace propagation (HTTP, async, gRPC)
- Tier-based sampling strategy for cost management
- Agent execution tracing for AI workflows

Ask for confirmation before proceeding to dashboards and alerting.

---

## Verification

- [ ] Trace context follows W3C standard
- [ ] Tenant baggage propagation configured
- [ ] Required span attributes defined
- [ ] Cross-service propagation designed
- [ ] Sampling strategy per tier documented
- [ ] Agent execution tracing specified
- [ ] Export configuration complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Trace context specification
- Span attribute schema
- Sampling strategy configuration
- Agent tracing design
- Export configuration

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-05-c-complete.md` to design dashboards and alerting.
