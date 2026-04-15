---
name: tenant-model-isolation
displayName: Tenant Model Isolation
description: Design tenant isolation strategy and context propagation. Use when the user requests to 'design tenant isolation' or 'create isolation matrix'.
module: bam
tags: [tenant]
---

# Tenant Model Isolation

## Overview

This workflow defines the tenancy model, context propagation, and isolation matrix for a BAM platform. It covers tenant entity structure, tier model, isolation rules for every asset type, context propagation across all boundaries (HTTP, events, jobs, WebSocket), and compliance mapping. Run after master PRD — tenant isolation errors are the hardest to fix late.

Act as a Platform Architect specializing in multi-tenant data isolation and security.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant isolation strategy for the platform
- Creating isolation matrix for all asset types
- Defining context propagation patterns
- Mapping compliance requirements to tenant data

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new tenant isolation design | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing isolation design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-M2 criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Tenant Model Definition

- Define tenant entity structure (id, name, slug, tier, status, settings)
- Define plan/tier model (FREE / PRO / ENTERPRISE or custom)
- Define tenant lifecycle states (provisioning → active → suspended → archived → deleted)

### Step 2: Isolation Matrix Creation

Classify ALL asset types by isolation strategy:

| Asset Type        | Isolation Strategy             | Notes                      |
| ----------------- | ------------------------------ | -------------------------- |
| Database rows     | RLS with tenant_id             | Default for all tables     |
| Cache entries     | Key prefix with tenant_id      | Redis namespace isolation  |
| Log entries       | Structured field tenant_id     | For Loki filtering         |
| Agent memory      | Tenant-scoped memory tier      | Mem0 + Redis isolation     |
| AI tools          | Tenant-scoped tool permissions | Per-tenant tool access     |
| Background jobs   | Tenant_id in job payload       | ARQ/Redis queue isolation  |
| Vector embeddings | Tenant-filtered collections    | Qdrant namespace isolation |
| Analytics data    | Tenant-partitioned tables      | ClickHouse partitioning    |
| File storage      | Tenant-prefixed paths          | S3 bucket/prefix isolation |
| Search indices    | Tenant-filtered                | Meilisearch tenant filter  |

### Step 3: Context Propagation Design

Define how tenant context flows across every boundary:

- JWT claim extraction → TenantContext middleware
- Async job propagation (tenant_id in job payload)
- Event context passing (tenant_id in event headers/payload)
- WebSocket connection state
- Outbound webhook headers

**Soft Gate:** Steps 1-3 complete the isolation model design. Present a summary of tenant model, isolation matrix, and context propagation decisions. Ask for confirmation before proceeding to sharing rules and compliance.

### Step 4: Sharing Rules

- Define cross-tenant data (admin/control-plane only)
- Define shared reference data (plans, features, system config)
- Define tenant-agnostic resources (public assets, documentation)

### Step 5: Compliance Mapping

- GDPR data export requirements per tenant
- Data deletion requirements (right to be forgotten)
- Audit trail requirements
- Data residency considerations

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Primary gate for tenant isolation validation
- **QG-I2** (Tenant Safety) - Tenant safety validation at integration level
- **QG-P1** (Production) - Tenant isolation required for production readiness

### Entry Gate
- QG-F1 (Foundation) must pass (master architecture defined with tenant model selection)

### Exit Gate
- QG-M2 checklist items from `tenant-isolation.md` verified:
  - [ ] Isolation matrix complete for all asset types
  - [ ] Context propagation design covers all boundaries
  - [ ] No implicit sharing of tenant data
  - [ ] Compliance requirements documented

## Related Workflows

- `bmad-bam-create-master-architecture` - Tenant model selection prerequisite
- `bmad-bam-tenant-data-migration` - Uses isolation boundaries
- `bmad-bam-tenant-data-export` - Uses tenant data boundaries
- `bmad-bam-validate-module` - Validates tenant isolation in modules

## Output

- `{output_folder}/planning-artifacts/architecture/tenant-model.md`
- `{output_folder}/planning-artifacts/architecture/tenant-isolation-matrix.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/tenant-isolation-matrix.md`, `{project-root}/_bmad/bam/data/templates/tenant-tier-matrix.md`, `{project-root}/_bmad/bam/data/templates/tenant-lifecycle-template.md`
- RLS Best Practices: `{project-root}/_bmad/bam/data/agent-guides/bam/rls-best-practices.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/rls-best-practices.md`
- Template: `{project-root}/_bmad/bam/data/templates/rls-policy.sql`
- Checklist: `{project-root}/_bmad/bam/data/checklists/tenant-isolation.md`
- RLS Best Practices: `{project-root}/_bmad/bam/data/agent-guides/bam/rls-best-practices.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
