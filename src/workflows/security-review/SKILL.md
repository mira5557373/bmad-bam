---
name: security-review
displayName: Security Review
description: 'Dedicated security assessment for multi-tenant AI platforms including threat modeling, tenant isolation, and AI safety review'
module: bam
tags: [security, compliance, ai-safety]
---

# Security Review

## Overview

This workflow provides a dedicated security assessment for multi-tenant AI platforms. It covers threat modeling, tenant isolation review, AI safety assessment, and generates actionable security findings. Run periodically or before major releases.

Act as a Security Architect specializing in multi-tenant SaaS platforms with AI agent safety requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Conducting security reviews of platform architecture
- Validating security controls and patterns
- Creating security assessment reports

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new security assessment | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing security assessment | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document
- Module architecture documents (recommended)
- **Config required:** `{tenant_model}`, `{ai_runtime}`

## Outputs

- `{output_folder}/planning-artifacts/security/security-assessment-report.md`
- `{output_folder}/planning-artifacts/security/threat-model.md`
- `{output_folder}/planning-artifacts/security/security-findings.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates tenant isolation security controls
- **QG-I2** (Tenant Safety) - Validates tenant safety measures in integration
- **QG-I3** (Agent Safety) - Validates AI agent security controls
- **QG-P1** (Production) - Security assessment required before production

### Entry Gate
- QG-F1 (Foundation) must pass (master architecture with tenant model defined)
- QG-M2 (Tenant Isolation) recommended before comprehensive security review

### Exit Gate
- QG-I2 checklist items from `qg-i2-tenant-safety.md` verified
- QG-I3 checklist items from `qg-i3-agent-safety.md` verified
- Security findings documented with severity and remediation plans

## Related Workflows

- `bmad-bam-compliance-design` - Compliance-specific assessment
- `bmad-bam-ai-eval-safety-design` - AI safety evaluation design
- `bmad-bam-tenant-model-isolation` - Isolation pattern design
