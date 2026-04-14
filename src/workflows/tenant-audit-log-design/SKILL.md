---
name: tenant-audit-log-design
displayName: Tenant Audit Log Design
description: 'Design tenant-scoped audit trail architecture for compliance and security'
module: bam
tags: [audit, compliance, security, tenant-isolation]
---

# Tenant Audit Log Design

## Overview

This workflow designs comprehensive tenant-scoped audit trail architecture for multi-tenant AI platforms. It covers audit schema design, retention policies, query patterns, and compliance mapping to ensure complete audit visibility while maintaining tenant isolation.

Act as a Compliance Architect specializing in multi-tenant audit systems with enterprise security and regulatory requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing audit logging architecture for multi-tenant platforms
- Establishing compliance-ready audit trails (SOC2, GDPR, HIPAA)
- Creating tenant-scoped audit query and reporting capabilities
- Planning audit data retention and archival strategies

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new audit log design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing audit design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document with tenant model defined
- Module architecture documents (recommended)
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/compliance/audit-log-design.md`
- `{output_folder}/planning-artifacts/compliance/audit-schema.md`
- `{output_folder}/planning-artifacts/compliance/retention-policy.md`

## Quality Gates

This workflow contributes to:
- **QG-I2** (Tenant Safety) - Validates tenant-scoped audit isolation
- **QG-P1** (Production) - Audit logging required before production

### Entry Gate
- QG-F1 (Foundation) must pass (master architecture with tenant model defined)
- QG-M2 (Tenant Isolation) recommended before audit design

### Exit Gate
- QG-I2 checklist items from `qg-i2-tenant-safety.md` verified for audit isolation
- Audit schema supports all required compliance frameworks
- Retention policies meet regulatory requirements

## Related Workflows

- `bmad-bam-soc2-evidence-collection` - Uses audit logs for evidence
- `bmad-bam-tenant-model-isolation` - Isolation patterns for audit data
- `bmad-bam-security-review` - Security assessment of audit system
