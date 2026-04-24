---
name: bmad-bam-tenant-white-labeling-design
displayName: Tenant White-Labeling Design
description: Design white-labeling and branding customization per tenant. Use when the user requests to 'design white-labeling' or 'configure tenant branding'.
module: bam
tags: [tenant, customization]
---

# Tenant White-Labeling Design

## Overview

This workflow designs the complete white-labeling and branding customization system for multi-tenant platforms. It covers branding asset management, theme customization, custom domain mapping, and tenant portal theming. This ensures tenants can present the platform under their own brand identity while maintaining tenant isolation.

Act as a Platform Architect designing production-grade white-labeling infrastructure.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing brand customization for tenants
- Creating theme systems for multi-tenant UI
- Establishing custom domain strategies
- Building tenant-specific portal experiences

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new white-labeling design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing white-labeling design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-M2 criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Branding Asset Management

Design the branding asset system:

- Logo storage and delivery (primary, favicon, email)
- Color palette configuration
- Font management and licensing
- Asset validation and constraints
- CDN delivery per tenant
- Asset versioning and rollback

### Step 2: Theme Customization

Create the theming system:

- CSS variable architecture
- Component theme mapping
- Dark/light mode per tenant
- Theme inheritance model
- Real-time preview system
- Theme validation

### Step 3: Custom Domain Mapping

Establish custom domain infrastructure:

- Domain registration and verification
- SSL certificate automation
- DNS configuration requirements
- Subdomain vs custom domain
- Fallback and error handling
- Multi-region domain routing

### Step 4: Tenant Portal Theming

Design the tenant portal experience:

- Admin portal customization
- End-user portal theming
- Email template branding
- Mobile app theming (if applicable)
- Widget/embed theming
- Documentation portal branding

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Primary gate for tenant customization isolation

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Primary | Tenant isolation in branding |
| **QG-P1** | Contributes | Production-ready white-labeling |

### Entry Gate
- QG-M2 (Tenant Isolation) must pass (tenant isolation design complete)

### Exit Gate
- QG-M2 checklist items verified:
  - [ ] Branding assets isolated per tenant
  - [ ] Themes cannot leak between tenants
  - [ ] Custom domains properly verified
  - [ ] Portal theming is tenant-scoped

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Tenant isolation prerequisite
- `bmad-bam-tenant-onboarding-design` - Branding setup during onboarding
- `bmad-bam-tenant-tier-migration` - Branding changes on tier change

## Output

- `{output_folder}/planning-artifacts/tenant/white-labeling-design.md`
- Branding asset specifications
- Theme architecture document
- Domain mapping configuration

## References

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m2-tenant-isolation.md`
