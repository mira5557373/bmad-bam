---
name: penetration-testing-design
displayName: Penetration Testing Design
description: 'Design security penetration testing procedures for multi-tenant AI platforms'
module: bam
tags: [security, testing, penetration-testing, tenant-isolation]
---

# Penetration Testing Design

## Overview

This workflow designs comprehensive security penetration testing procedures for multi-tenant AI platforms. It covers scope definition, test categories, tenant isolation testing, and reporting procedures to identify and address security vulnerabilities.

Act as a Security Architect specializing in penetration testing methodologies for multi-tenant SaaS platforms with AI agent capabilities.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Planning penetration testing programs for multi-tenant platforms
- Designing tenant isolation security tests
- Creating AI agent security testing procedures
- Establishing vulnerability assessment and reporting processes

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new penetration testing design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing testing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document with tenant model defined
- Security assessment completed (recommended)
- **Config required:** `{tenant_model}`, `{ai_runtime}`

## Outputs

- `{output_folder}/planning-artifacts/security/penetration-testing-plan.md`
- `{output_folder}/planning-artifacts/security/test-cases.md`
- `{output_folder}/planning-artifacts/security/reporting-procedures.md`

## Quality Gates

This workflow contributes to:
- **QG-I3** (Agent Safety) - Validates AI agent security testing procedures
- **QG-P1** (Production) - Penetration testing required before production

### Entry Gate
- QG-F1 (Foundation) must pass (master architecture defined)
- QG-M2 (Tenant Isolation) recommended before testing design

### Exit Gate
- QG-I3 checklist items from `qg-i3-agent-safety.md` verified for testing coverage
- All critical vulnerability categories have test cases
- Reporting procedures meet compliance requirements

## Related Workflows

- `bmad-bam-security-review` - Security assessment informs testing
- `bmad-bam-tenant-model-isolation` - Isolation patterns to test
- `bmad-bam-ai-eval-safety-design` - AI safety testing integration
