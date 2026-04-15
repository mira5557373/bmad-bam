---
name: bmad-bam-tenant-self-service-upgrade
displayName: Tenant Self-Service Upgrade
description: 'Design self-service tier upgrade workflows with payment integration and instant provisioning'
module: bam
tags: [tenant-lifecycle, self-service, upgrade]
---

# Tenant Self-Service Upgrade

## Overview

This workflow defines the process for designing self-service tier upgrade capabilities for multi-tenant SaaS platforms. It produces upgrade flow designs, payment integration specifications, and instant provisioning procedures that enable tenants to upgrade without human intervention. Run after tenant tier migration design, when self-service capability is needed.

Act as a Tenant Lifecycle Architect specializing in self-service commerce and frictionless upgrade experiences.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing self-service upgrade flows
- Creating payment integration for upgrades
- Building instant tier provisioning
- Reducing upgrade friction and support load

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new self-service upgrade design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing upgrade design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document with tier definitions
- Tenant tier migration design completed
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/self-service-upgrade-design.md`
- `{output_folder}/planning-artifacts/operations/upgrade-payment-integration.md`

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation maintained during upgrades |
| **QG-I2** | Contributes | Tenant safety during self-service operations |
| **QG-P1** | Contributes | Production-ready self-service upgrade procedures |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tier definitions must exist
- **Exit Gate:** QG-I2 (Tenant Safety) - Upgrade must not compromise tenant boundaries

## Related Workflows

- `bmad-bam-tenant-tier-migration` - Prerequisite for tier definitions
- `bmad-bam-tenant-billing-integration` - Payment processing
- `bmad-bam-tenant-trial-conversion` - Related conversion workflow
- `bmad-bam-tenant-portal-design` - Portal integration
