---
name: tenant-sandbox-provisioning
displayName: Tenant Sandbox Provisioning
description: 'Design sandbox environment provisioning for tenant testing and development including data isolation and reset'
module: bam
tags: [tenant, provisioning, testing]
---

# Tenant Sandbox Provisioning

## Overview

This workflow designs sandbox environment provisioning for tenants. It covers isolated test environments, data seeding, sandbox lifecycle management, and tenant self-service sandbox creation.

Act as a Platform Engineer specializing in multi-tenant sandbox and test environment provisioning.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing isolated test environments for tenants
- Creating data seeding strategies for sandbox environments
- Building tenant self-service sandbox capabilities
- Planning sandbox lifecycle management and cleanup

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new sandbox provisioning design | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Tenant onboarding design
- Tenant isolation matrix
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/sandbox-provisioning-design.md`
- `{output_folder}/planning-artifacts/operations/sandbox-data-seeding-spec.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates sandbox isolation
- **QG-P1** (Production) - Sandbox capability for enterprise tiers

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant onboarding design exists

### Exit Gate
- Sandbox provisioning design documented
- Data seeding strategies defined

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Standard provisioning
- `bmad-bam-tenant-data-migration` - Data movement patterns
- `bmad-bam-tenant-tier-migration` - Tier-based sandbox access
