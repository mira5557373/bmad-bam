---
name: bmad-bam-compliance-continuous-verification
displayName: Compliance Continuous Verification
description: 'Design continuous compliance monitoring and automated verification for regulatory requirements'
module: bam
tags: [compliance, monitoring, automation]
---

# Compliance Continuous Verification

## Overview

This workflow designs continuous compliance monitoring systems for multi-tenant SaaS platforms. It covers automated compliance checks, audit trail verification, regulatory reporting, and drift detection for compliance controls.

Act as a Compliance Engineer specializing in automated compliance verification for multi-tenant SaaS platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Setting up automated compliance monitoring for regulatory requirements
- Designing drift detection for compliance controls
- Creating automated audit trail verification
- Building regulatory reporting automation

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new compliance verification design | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Compliance design document
- Tenant isolation matrix
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/compliance/continuous-verification-design.md`
- `{output_folder}/planning-artifacts/compliance/compliance-automation-spec.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates compliance controls for tenant data
- **QG-P1** (Production) - Continuous compliance required for regulated industries

### Entry Gate
- QG-F1 (Foundation) must pass
- Compliance design document exists

### Exit Gate
- Continuous verification design documented
- Automated compliance checks defined

## Related Workflows

- `bmad-bam-compliance-design` - Initial compliance design
- `bmad-bam-tenant-aware-observability` - Compliance monitoring integration
- `bmad-bam-tenant-data-anonymization` - Data privacy compliance
