# Step 4: Setup Trace Propagation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Define tenant-aware distributed tracing configuration for request correlation.

---

## Prerequisites

- Log context configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define tenant-aware distributed tracing configuration:

## Trace Context Structure

```yaml
trace_context:
  # W3C Trace Context standard fields
  trace_id: "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
  span_id: "00f067aa0ba902b7"
  trace_flags: "01"
  
  # Tenant-specific baggage (propagated across services)
  baggage:
    tenant_id: "tenant_abc123"
    tenant_tier: "PRO"
    user_id: "user_456"
    request_id: "req_xyz789"
```

## Span Attributes

### Required Tenant Attributes
```yaml
span_attributes:
  required:
    - tenant.id
    - tenant.tier
    - service.name
    - service.version
    
  recommended:
    - user.id
    - agent.id
    - conversation.id
    - operation.name
```

### Resource Attributes
```yaml
resource_attributes:
  # Service identification
  service.name: "ai-runtime"
  service.namespace: "agentic-platform"
  service.version: "1.2.3"
  
  # Deployment context
  deployment.environment: "production"
  cloud.region: "us-east-1"
  
  # Tenant context (for dedicated resources)
  tenant.id: "${TENANT_ID}"  # Only for dedicated deployments
```

## Trace Sampling Strategy

```yaml
sampling:
  # Base sampling rate
  default: 0.1  # 10% of traces
  
  # Tenant-tier based sampling
  tier_overrides:
    FREE: 0.01      # 1% sampling
    PRO: 0.1        # 10% sampling
    ENTERPRISE: 1.0  # 100% sampling
    
  # Error traces always captured
  error_sampling: 1.0
  
  # High-latency traces captured
  latency_threshold_ms: 5000
  latency_sampling: 1.0
  
  # Specific operation sampling
  operation_overrides:
    agent_invocation: 0.5
    billing_event: 1.0
```

## Cross-Service Propagation

```yaml
propagation:
  # Propagation format
  format: "w3c_trace_context"  # W3C standard
  
  # HTTP header propagation
  http_headers:
    - traceparent
    - tracestate
    - baggage
    
  # Message queue propagation
  queue_attributes:
    - trace_parent
    - trace_state
    - tenant_context
    
  # gRPC metadata propagation
  grpc_metadata:
    - grpc-trace-bin
    - tenant-context-bin
```

## Tenant Trace Isolation

```yaml
trace_isolation:
  # Traces contain tenant_id as attribute
  attribute_name: "tenant.id"
  
  # Query restriction for tenant users
  tenant_query_filter: |
    span.attributes["tenant.id"] == "${current_user_tenant_id}"
    
  # Platform operators can query all
  platform_query_filter: null
```

## Agent Execution Tracing

Special tracing for AI agent execution:

```yaml
agent_spans:
  root_span:
    name: "agent.invocation"
    attributes:
      - agent.id
      - agent.name
      - conversation.id
      
  child_spans:
    - name: "agent.prompt_preparation"
    - name: "agent.llm_call"
      attributes:
        - llm.model
        - llm.tokens.input
        - llm.tokens.output
    - name: "agent.tool_execution"
      attributes:
        - tool.name
        - tool.outcome
    - name: "agent.memory_retrieval"
    - name: "agent.response_generation"
```

## Trace Export Configuration

```yaml
export:
  # OTLP exporter to Tempo
  endpoint: "tempo.observability.svc:4317"
  protocol: "grpc"
  
  # Batch configuration
  batch:
    max_queue_size: 2048
    scheduled_delay_ms: 5000
    max_export_batch_size: 512
    
  # Retry configuration
  retry:
    enabled: true
    max_elapsed_time_ms: 300000
```

**Verify current best practices with web search:**
Search the web: "distributed tracing tenant lifecycle {date}"
Search the web: "trace context propagation multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After setting up trace propagation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into sampling strategy, agent tracing, or propagation rules
- **P (Party Mode)**: Bring SRE and AI runtime architect perspectives on tracing design
- **C (Continue)**: Accept trace propagation setup and proceed to dashboard creation
- **[Specific refinements]**: Describe specific tracing aspects to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: trace context structure, sampling strategy, agent spans, export config
- Process enhanced insights on distributed tracing
- Ask user: "Accept this detailed tracing analysis? (y/n)"
- If yes, integrate into tracing specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review trace propagation design for tenant-aware observability"
- Process SRE and AI runtime architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save trace propagation specification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-create-dashboards.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the observability instrumentation design.**

Present summary of:
- Trace context structure with tenant baggage propagation
- Sampling strategy per tier (FREE, PRO, ENTERPRISE)
- Agent execution tracing configuration for AI workflows

Ask for confirmation before proceeding to dashboard creation.

---

## Verification

- [ ] Trace context structure defined
- [ ] Span attributes specified
- [ ] Sampling strategy configured
- [ ] Cross-service propagation designed
- [ ] Tenant isolation rules established
- [ ] Agent execution tracing specified
- [ ] Export configuration complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Trace propagation specification
- Sampling strategy configuration
- Agent tracing design

---

## Next Step

Proceed to `step-05-c-create-dashboards.md` to define observability dashboards.
