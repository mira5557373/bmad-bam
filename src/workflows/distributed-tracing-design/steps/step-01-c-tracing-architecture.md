# Step 1: Tracing Architecture (OpenTelemetry)

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

Define the core OpenTelemetry SDK configuration, trace exporters, span naming conventions, and resource attributes for the multi-tenant platform's distributed tracing infrastructure.

---

## Prerequisites

- Master architecture approved or in progress
- Tenant isolation design available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: tracing`

---


## Inputs

- User requirements and constraints for distributed tracing
- Master architecture document (if available)
- Tenant model document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

- Define OpenTelemetry SDK configuration:
  - SDK language bindings (Python, Node.js, Go, Java)
  - Auto-instrumentation vs manual instrumentation
  - Batch processor settings (batch size, export interval)
  - Resource attributes (service.name, service.version, deployment.environment)

- Select trace exporters:
  | Exporter | Use Case | Configuration |
  |----------|----------|---------------|
  | OTLP | Primary exporter for collectors | gRPC or HTTP/protobuf |
  | Jaeger | Development and debugging | UDP or HTTP |
  | Tempo | Grafana stack integration | OTLP to Tempo |
  | Zipkin | Legacy system compatibility | HTTP |

- Design span naming conventions:
  - HTTP: `{method} {route}` (e.g., `GET /api/v1/tenants/{id}`)
  - gRPC: `{package}.{service}/{method}`
  - Database: `{db_system} {operation} {table}`
  - Message queue: `{messaging_system} {operation} {destination}`
  - Background job: `{job_system} {job_name}`

- Configure resource attributes:
  | Attribute | Description | Example |
  |-----------|-------------|---------|
  | `service.name` | Service identifier | `billing-service` |
  | `service.version` | Semantic version | `1.2.3` |
  | `deployment.environment` | Environment | `production` |
  | `cloud.provider` | Cloud platform | `aws` |
  | `cloud.region` | Deployment region | `us-east-1` |

**Verify current best practices with web search:**
Search the web: "OpenTelemetry SDK configuration best practices {date}"
Search the web: "OpenTelemetry span naming conventions {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tracing architecture design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into exporter selection and SDK configuration
- **P (Party Mode)**: Bring analyst and architect perspectives for architecture review
- **C (Continue)**: Accept tracing architecture and proceed to context propagation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass model context: SDK configuration, exporter selection, span naming
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into tracing architecture
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tracing architecture: {summary of SDK config, exporters, and naming}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tracing architecture to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-context-propagation.md`

---

## Verification

- [ ] OpenTelemetry SDK configuration complete
- [ ] Trace exporters selected and configured
- [ ] Span naming conventions documented
- [ ] Resource attributes defined
- [ ] Patterns align with pattern registry

---

## Outputs

- OpenTelemetry SDK configuration specification
- Exporter configuration matrix
- Span naming convention guidelines
- Resource attribute schema
- **Load template:** `{project-root}/_bmad/bam/data/templates/distributed-tracing-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-lineage-architecture-template.md`

---

## Next Step

Proceed to `step-02-c-context-propagation.md` to define trace context propagation across service boundaries.
