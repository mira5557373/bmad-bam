---
name: tenant-contract-renewal
displayName: Tenant Contract Renewal
description: 'Design contract renewal automation with pricing updates and renegotiation workflows'
module: bam
tags: [tenant-lifecycle, contract-renewal]
---

# Tenant Contract Renewal

## Overview

This workflow defines the process for designing contract renewal automation for multi-tenant SaaS platforms. It produces renewal notification workflows, pricing update mechanisms, and renegotiation procedures that ensure smooth contract renewals and minimize churn. Run after tenant onboarding design, when renewal capability is needed.

Act as a Tenant Lifecycle Architect specializing in contract management and revenue retention strategies.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing automated renewal notifications
- Creating pricing update workflows
- Building renegotiation procedures
- Planning early renewal incentives

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new renewal design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing renewal design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document with tenant model
- Tenant billing integration completed
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/contract-renewal-design.md`
- `{output_folder}/planning-artifacts/operations/renewal-runbook.md`

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation maintained during renewals |
| **QG-I2** | Contributes | Tenant safety during contract changes |
| **QG-P1** | Contributes | Production-ready renewal procedures |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Billing integration must exist
- **Exit Gate:** QG-P1 (Production Readiness) - Renewal procedures production-ready

## Related Workflows

- `bmad-bam-tenant-billing-integration` - Prerequisite for payment processing
- `bmad-bam-tenant-tier-migration` - Related tier change workflow
- `bmad-bam-usage-metering-design` - Usage for renewal pricing
- `bmad-bam-tenant-notification-system` - Renewal notifications
