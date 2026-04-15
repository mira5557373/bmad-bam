---
name: bmad-bam-tenant-self-service-reporting
displayName: Tenant Self-Service Reporting
description: Design tenant self-service custom reporting capabilities. Use when the user requests to 'design tenant reporting' or 'create self-service reports'.
module: bam
tags: [reporting, analytics, self-service, tenant-features]
---

# Tenant Self-Service Reporting

## Overview

This workflow designs a comprehensive tenant self-service reporting capability for a multi-tenant SaaS platform. It defines report types per tier (Free/Pro/Enterprise), report builder interfaces, scheduling options, and export/delivery channels. Run after master architecture is defined to ensure reporting strategy aligns with platform decisions and tenant isolation requirements.

Act as a Platform Architect specializing in business intelligence and self-service analytics for multi-tenant systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing self-service reporting capabilities for tenants
- Creating tier-specific report type definitions
- Building report builder and scheduling features

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new reporting design from scratch | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing reporting design | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against reporting completeness criteria | `steps/step-20-v-*` through `step-22-v-*` |

## Prerequisites

- Master architecture document completed
- Tenant model and tier definitions established
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Define Report Types

- Define available report types per tier (usage, billing, analytics, audit)
- Map report types to data sources
- Establish tier-based access controls
- Document report type specifications

### Step 2: Design Report Builder

- Design report builder interface and capabilities
- Configure field selection and filtering options
- Design aggregation and grouping features
- Define visualization options per tier

### Step 3: Configure Scheduling

- Configure scheduled report delivery options
- Define scheduling frequency per tier
- Design schedule management interface
- Document quota and limits per tier

**Soft Gate:** Steps 1-3 complete the core reporting design. Present a summary of report types, builder capabilities, and scheduling options. Ask for confirmation before proceeding to export design.

### Step 4: Design Export Formats

- Design export formats and delivery channels
- Configure delivery methods (email, webhook, S3)
- Define format options per tier
- Document delivery security requirements

### Quality Gates

- [ ] Report types defined for all tiers
- [ ] Report builder capabilities documented
- [ ] Scheduling options configured
- [ ] Export formats and delivery channels defined

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Self-service reporting for production readiness
- **QG-I2** (Tenant Safety) - Tier-aware reporting ensures tenant data isolation

### Entry Gate
- QG-F1 (Foundation) must pass before reporting design
- Master architecture and tenant tier definitions must be complete

### Exit Gate
- Reporting design document complete with `production-readiness.md` checklist items verified
- Report types aligned with tier capabilities
- Data isolation verified for all report types

## Outputs

- `{output_folder}/planning-artifacts/tenant-self-service-reporting.md`

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-create-master-architecture` | Context | Master architecture defines data sources for reporting |
| `bmad-bam-tenant-model-isolation` | Related | Tenant isolation patterns affect report data access |
| `bmad-bam-tenant-aware-observability` | Related | Observability data may feed into tenant reports |

## References

- Template: `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/tenant-lifecycle-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
