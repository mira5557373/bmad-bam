---
name: bmad-bam-tenant-data-anonymization
displayName: Tenant Data Anonymization
description: 'Design data anonymization and pseudonymization for tenant data including GDPR compliance and test data generation'
module: bam
tags: [compliance, privacy, tenant]
---

# Tenant Data Anonymization

## Overview

This workflow designs data anonymization and pseudonymization strategies for tenant data. It covers GDPR right to erasure, test data generation, production data masking, and audit-safe anonymization patterns.

Act as a Data Privacy Engineer specializing in data anonymization for multi-tenant SaaS platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing data anonymization strategies for GDPR compliance
- Creating PII classification and mapping
- Building production data masking for test environments
- Implementing right to erasure procedures

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new anonymization design | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Compliance design document
- Tenant data model
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/compliance/data-anonymization-design.md`
- `{output_folder}/planning-artifacts/compliance/pii-mapping.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates anonymization maintains isolation
- **QG-I2** (Tenant Safety) - Validates data privacy controls
- **QG-P1** (Production) - Anonymization required for GDPR compliance

### Entry Gate
- QG-F1 (Foundation) must pass
- Compliance design exists

### Exit Gate
- Anonymization strategies documented
- PII mapping complete

## Related Workflows

- `bmad-bam-compliance-design` - Compliance framework
- `bmad-bam-tenant-data-export` - Data portability
- `bmad-bam-tenant-offboarding-design` - Data deletion requirements
