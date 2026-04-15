---
name: bmad-bam-distributed-tracing-design
displayName: Distributed Tracing Design
description: Design distributed tracing for multi-tenant microservices. Use when the user requests to 'design distributed tracing' or 'create tracing architecture'.
module: bam
tags: [observability, tracing]
---

# Distributed Tracing Design

## Overview

This workflow designs the distributed tracing architecture for a multi-tenant platform using OpenTelemetry. It covers trace context propagation across service boundaries, tenant correlation strategies, sampling policies by tier, and integration with observability backends. Run after tenant isolation design to ensure tenant context flows through all traces.

Act as a Platform Architect specializing in observability and distributed systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing distributed tracing architecture for the platform
- Creating OpenTelemetry instrumentation strategy
- Defining tenant-aware trace context propagation
- Implementing sampling strategies by tenant tier

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new distributed tracing design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing tracing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-P1 criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Tracing Architecture (OpenTelemetry)

- Define OpenTelemetry SDK configuration
- Select trace exporters (Jaeger, Tempo, Zipkin)
- Design span naming conventions by module
- Configure resource attributes for service identification

### Step 2: Context Propagation

- Define trace context propagation across boundaries:
  - HTTP (W3C Trace Context, B3)
  - gRPC metadata
  - Message queues (Kafka headers, Redis streams)
  - Background jobs (payload injection)
  - WebSocket connections

### Step 3: Tenant Correlation

- Add tenant_id as span attribute on all traces
- Design tenant context injection middleware
- Create correlation between traces and tenant audit logs
- Define span enrichment with tenant tier and plan

**Soft Gate:** Steps 1-3 complete the tracing architecture design. Present a summary of OpenTelemetry configuration, propagation patterns, and tenant correlation. Ask for confirmation before proceeding to sampling strategies.

### Step 4: Sampling Strategies

- Head-based sampling by endpoint criticality
- Tail-based sampling for error traces
- Tier-based sampling rates:
  - Enterprise: 100% sampling
  - Pro: 50% sampling
  - Free: 10% sampling with error capture
- Cost optimization through intelligent sampling

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production Readiness) - Primary gate for production tracing infrastructure
- **QG-I2** (Tenant Safety) - Tenant correlation in traces validates isolation
- **QG-M2** (Tenant Isolation) - Tenant context propagation verification

### Entry Gate
- QG-F1 (Foundation) must pass (master architecture defined)
- QG-M2 (Tenant Isolation) recommended for proper tenant context design

### Exit Gate
- QG-P1 checklist items from `production-readiness.md` verified:
  - [ ] Distributed tracing configured with tenant correlation
  - [ ] Sampling strategy defined per tenant tier
  - [ ] Context propagation covers all service boundaries
  - [ ] Trace backend integration tested

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Tenant context design prerequisite
- `bmad-bam-tenant-aware-observability` - Complete observability stack design
- `bmad-bam-sli-slo-definition` - SLI/SLO monitoring integration
- `bmad-bam-tenant-incident-response` - Tracing enables incident investigation

## Output

- `{output_folder}/planning-artifacts/architecture/distributed-tracing-design.md`
- OpenTelemetry configuration files
- Sampling policy documentation
- Trace correlation guidelines

## References

- Template: `{project-root}/_bmad/bam/data/templates/distributed-tracing-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/observability-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Web Research

Use web search to verify current best practices:
- Search: "OpenTelemetry multi-tenant tracing patterns {date}"
- Search: "distributed tracing sampling strategies {date}"
- Search: "tenant context propagation observability {date}"
