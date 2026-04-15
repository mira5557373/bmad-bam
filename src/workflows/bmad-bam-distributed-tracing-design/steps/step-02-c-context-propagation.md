# Step 2: Context Propagation

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

Define how trace context propagates across all service boundaries in the multi-tenant platform, ensuring end-to-end trace continuity.

---

## Prerequisites

- Step 1 completed (tracing architecture defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: context-propagation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: event-driven`

---


## Inputs

- Tracing architecture from Step 1
- Service boundary inventory
- Communication protocols in use (HTTP, gRPC, messaging)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

- Define HTTP context propagation:
  - W3C Trace Context format (traceparent, tracestate)
  - B3 propagation for Zipkin compatibility
  - Custom headers for legacy systems
  - CORS considerations for browser clients

- Design gRPC metadata propagation:
  - Metadata key naming conventions
  - Binary vs text encoding
  - Interceptor implementation approach

- Configure message queue propagation:
  | Queue System | Header Format | Extraction Strategy |
  |--------------|---------------|---------------------|
  | Kafka | Headers collection | Consumer interceptor |
  | Redis Streams | Message fields | Consumer wrapper |
  | RabbitMQ | Message properties | Consumer middleware |
  | SQS | Message attributes | Lambda handler wrapper |

- Define background job propagation:
  - Job payload injection (trace_id, span_id, trace_flags)
  - Worker extraction middleware
  - Async context restoration

- Design WebSocket propagation:
  - Connection handshake context capture
  - Per-message context injection
  - Long-lived connection span management

| Boundary | Propagation Format | Implementation |
|----------|-------------------|----------------|
| HTTP (internal) | W3C Trace Context | Auto-instrumentation |
| HTTP (external) | B3 + W3C | Header injection |
| gRPC | Metadata | Interceptor |
| Kafka | Headers | Producer/Consumer hooks |
| Redis jobs | Payload fields | Job wrapper |
| WebSocket | Connection state | Handshake middleware |
| Webhooks outbound | X-Trace-Id header | HTTP client interceptor |

**Verify current best practices with web search:**
Search the web: "W3C Trace Context propagation patterns {date}"
Search the web: "OpenTelemetry context propagation message queues {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the context propagation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific boundary propagation challenges
- **P (Party Mode)**: Bring analyst and architect perspectives for propagation review
- **C (Continue)**: Accept context propagation and proceed to tenant correlation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: propagation patterns, boundary types, implementation approach
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into propagation design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review context propagation: {summary of boundaries and formats}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save context propagation to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-correlation.md`

---

## Verification

- [ ] HTTP propagation (W3C/B3) configured
- [ ] gRPC metadata propagation defined
- [ ] Message queue propagation for all systems
- [ ] Background job context injection documented
- [ ] WebSocket propagation strategy defined
- [ ] All service boundaries covered
- [ ] Patterns align with pattern registry

---

## Outputs

- Context propagation specification per boundary type
- Header format documentation
- Implementation guidelines per technology
- Boundary coverage matrix

---

## Next Step

Proceed to `step-03-c-tenant-correlation.md` to add tenant_id correlation to all traces.
