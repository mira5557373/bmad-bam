---
name: bmad-bam-tenant-offboarding-design
displayName: Tenant Offboarding Design
description: Design GDPR-compliant tenant offboarding with data archival. Use when the user requests to 'design tenant offboarding' or 'plan tenant deletion'.
module: bam
tags: [tenant]
---

# Tenant Offboarding Design

## Overview

This workflow designs GDPR-compliant tenant offboarding with grace period, data archival, and permanent deletion. It covers the complete offboarding journey from cancellation request through data purge, ensuring compliance with data protection regulations while preserving billing records as required by law.

Act as a Platform Architect designing compliant tenant data lifecycle management.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant offboarding procedures
- Creating data retention and deletion policies
- Building account termination workflows

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Offboarding Steps

Define the ordered offboarding sequence:

1. Receive cancellation request (API or admin action)
2. Enter grace period (configurable, default 30 days)
3. Suspend tenant (disable login, API access, agent execution)
4. Export tenant data (GDPR data portability)
5. Archive tenant data (move to cold storage)
6. Delete tenant data (permanent purge after retention period)
7. Remove Keycloak organization/user
8. Cancel billing subscription
9. Purge AI memory (session, user, tenant tiers)
10. Remove vector embeddings and search indices
11. Send offboarding confirmation webhook

### Step 2: Grace Period Design

- Configurable duration per tier (FREE: 7 days, PRO: 30 days, ENTERPRISE: 90 days)
- During grace period: tenant can reactivate
- After grace period: automatic progression to suspension
- Admin override: immediate offboarding (skip grace period)

**Soft Gate:** Steps 1-2 complete the offboarding sequence and grace period design. Present a summary of offboarding steps and tier-specific grace periods. Ask for confirmation before proceeding to data retention and compliance.

### Step 3: Data Retention Policy

| Data Type         | Retention After Deletion | Reason                     |
| ----------------- | ------------------------ | -------------------------- |
| Billing records   | 7 years                  | Tax/legal compliance       |
| Audit logs        | 3 years                  | Compliance                 |
| Tenant metadata   | 1 year                   | Support/dispute resolution |
| User data         | Deleted immediately      | GDPR right to erasure      |
| AI memory         | Deleted immediately      | Privacy                    |
| Vector embeddings | Deleted immediately      | Privacy                    |
| File storage      | Deleted after export     | GDPR data portability      |

### Step 4: Compliance Checklist

- [ ] Data export available before deletion (GDPR Art. 20)
- [ ] Right to erasure implemented (GDPR Art. 17)
- [ ] Billing records retained per tax law
- [ ] Audit trail of deletion actions
- [ ] Confirmation sent to tenant admin

## Output

- `{output_folder}/planning-artifacts/architecture/tenant-offboarding-design.md`
- Offboarding step matrix
- Data retention policy
- Compliance checklist

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant data isolation during offboarding |
| **QG-I2** | Contributes | Tenant safety during deletion and archival |
| **QG-P1** | Contributes | Production-ready offboarding procedures |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tenant model must be defined
- **Exit Gate:** QG-I2 (Tenant Safety) - Offboarding process must preserve tenant isolation

## References

- Template: `{project-root}/_bmad/bam/data/templates/tenant-lifecycle-template.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Agent Data Governance: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-data-governance-patterns.md`

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/agent-data-governance-patterns.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Agent Data Governance: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-data-governance-patterns.md`
