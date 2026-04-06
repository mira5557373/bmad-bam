---
name: bmad-bam-tenant-aware-observability
displayName: Tenant-Aware Observability
description: Design tenant-aware metrics, logs, traces, and alerts. Use when the user requests to 'design observability' or 'configure tenant monitoring'.
module: bam
web_bundle: true
tags: [tenant]
---

# Tenant-Aware Observability

## Overview

This workflow designs the complete observability stack for a BAM platform — covering tenant-scoped and module-scoped metrics, structured logging, distributed tracing, audit events, cost attribution, noisy-neighbor detection, and dashboard design. Every metric carries both tenant and module dimensions for orthogonal drill-down.

Act as a Platform Architect designing production-grade observability for a multi-tenant modular monolith.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Telemetry Design

Structured logging schema (JSON for Loki):

- Mandatory fields: `tenant_id`, `correlation_id`, `module`, `trace_id`, `actor_id`, `span_id`
- Auto-injected via shared-kernel structlog processor

Module metric naming convention:

- `module_{name}_request_total` (labels: module, method, status)
- `module_{name}_request_duration_seconds` (histogram)
- `module_{name}_error_total` (labels: module, error_type)
- `module_{name}_dependency_call_total` (labels: module, target_module, status)

Cardinality rule: `module` label in Prometheus (bounded), `tenant_id` in structured logs only (unbounded).

Trace span naming:

- `{module}.facade.{method}` — facade entry
- `{module}.internal.{service}.{method}` — internal call
- `{module}.call.{target}.{method}` — cross-module call
- `{module}.job.{job_type}` — background job
- `{module}.event.{event_name}` — event handler

### Step 2: Audit Event Catalog

- Define auditable actions (CRUD on sensitive entities, admin operations, AI actions)
- Audit payload structure (who, what, when, where, tenant context)
- Retention policy per audit type

### Step 3: Cost Attribution

Dual-dimension cost tracking (tenant + module):

- LLM tokens: tagged by tenant_id and initiating module (Langfuse)
- Compute: proportional to request volume per module
- Storage: table size per module schema
- Background jobs: queue depth and processing time per module

Attribution rule: cross-module calls attributed to the CALLING module.

**Soft Gate:** Steps 1-3 complete the telemetry, audit, and cost attribution design. Present a summary of metric schemas, audit events, and cost tracking dimensions. Ask for confirmation before proceeding to noisy-neighbor detection and dashboard design.

### Step 4: Noisy-Neighbor Detection

- Fairness metrics (per-tenant resource consumption vs quota)
- Alerting thresholds (tenant exceeding 3x average)
- Mitigation actions (rate limiting, priority queuing)
- Tier-based priority: Enterprise > Pro > Free during degradation

### Step 5: Dashboard Design

- Ops dashboard: cross-module health, error rates, latency (with module filter)
- Per-tenant dashboard: usage, costs, AI quality metrics
- AI performance dashboard: eval scores, latency, cost trends (Langfuse integration)
- Module health integration with sprint-status

### Correlation & Propagation

| Boundary                 | correlation_id                  | tenant_id               |
| ------------------------ | ------------------------------- | ----------------------- |
| Facade call (in-process) | Shared CallContext              | Same TenantContext      |
| Domain event (Kafka)     | Event header `x-correlation-id` | Event field `tenant_id` |
| Background job (Redis)   | Job payload field               | Job payload field       |
| WebSocket                | Connection state                | Connection state        |
| Outbound webhook         | HTTP header `X-Correlation-ID`  | Webhook payload         |

## Output

- `{output_folder}/planning-artifacts/architecture/observability-design.md`
- Dashboard configurations
- Alert rules
- Audit event catalog

## References

- Knowledge: `bam/knowledge/multi-tenant-patterns.md`, `bam/knowledge/agent-data-governance-patterns.md`
