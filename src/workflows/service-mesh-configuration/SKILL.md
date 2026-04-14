---
name: service-mesh-configuration
displayName: Service Mesh Configuration
description: Design service mesh for multi-tenant microservices. Use when the user requests to 'design service mesh' or 'configure mesh networking'.
module: bam
tags: [infrastructure, networking]
---

# Service Mesh Configuration

## Overview

This workflow designs service mesh architecture for multi-tenant microservices, enabling advanced traffic management, tenant-aware routing, and unified observability. It covers mesh architecture selection, traffic management policies, tenant routing, and observability integration.

Act as a Platform Architect designing service mesh infrastructure.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing service mesh for microservices
- Configuring tenant-aware traffic routing
- Setting up mTLS for service communication
- Integrating observability with service mesh

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Mesh Architecture

Select and design service mesh architecture:

| Option | Use Case | Complexity |
|--------|----------|------------|
| Istio | Full-featured, enterprise | High |
| Linkerd | Lightweight, performance | Medium |
| AWS App Mesh | AWS-native integration | Medium |
| Cilium | eBPF-based, high performance | High |

### Step 2: Traffic Management

Configure traffic management policies:

1. Circuit breaker configuration
2. Retry policies with exponential backoff
3. Timeout configuration per service
4. Load balancing strategies
5. Rate limiting per tenant

### Step 3: Tenant Routing

Implement tenant-aware routing:

- Header-based tenant routing
- Namespace isolation per tenant tier
- Canary deployments per tenant
- A/B testing infrastructure

**Soft Gate:** Steps 1-3 complete the mesh architecture design. Present a summary of mesh selection and routing rules. Ask for confirmation before proceeding to observability integration.

### Step 4: Observability Integration

Configure observability features:

- Distributed tracing (Jaeger/Zipkin)
- Service-level metrics
- Tenant-tagged telemetry
- Mesh dashboard configuration

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-P1** | Contributes | Production readiness for mesh |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must be defined
- **Exit Gate:** QG-P1 (Production Readiness) - Mesh must be production-ready

### Verification Checklist

- [ ] Mesh architecture selected and documented
- [ ] Traffic management policies configured
- [ ] Tenant routing implemented
- [ ] Observability integration complete
- [ ] mTLS enabled for service communication

## Output

- `{output_folder}/planning-artifacts/infrastructure/service-mesh-configuration.md`
- Mesh architecture diagram
- Traffic policy matrix

## References

- Template: `bam/templates/infrastructure-template.md`
- Multi-Tenant Patterns: `bam/knowledge/multi-tenant-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
