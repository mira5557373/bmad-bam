---
name: bmad-bam-security-audit-execution
displayName: Security Audit Execution
description: 'Execute quarterly security audits including access control review, vulnerability assessment, and compliance verification for multi-tenant AI platforms'
module: bam
tags: [security, audit, compliance, operations]
---

# Security Audit Execution

## Overview

This workflow provides comprehensive security audit execution for multi-tenant AI platforms. It covers quarterly security assessment execution, access control review, vulnerability scanning, and compliance verification. Run on a quarterly schedule or before major compliance certifications.

Act as a Security Architect specializing in multi-tenant SaaS security auditing and compliance.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Executing quarterly security audits
- Reviewing access controls and permissions
- Running vulnerability assessments
- Verifying compliance with security frameworks

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Execute new security audit | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing audit findings | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-SA1 criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous audit findings (if available)
- Access to security scanning tools
- **Config required:** `{tenant_model}`, `{ai_runtime}`

## Outputs

- `{output_folder}/security/security-audit-report.md`
- `{output_folder}/security/access-control-review.md`
- `{output_folder}/security/vulnerability-assessment.md`
- `{output_folder}/security/compliance-verification.md`

## Quality Gates

This workflow contributes to:
- **QG-SA1** (Security Audit Gate) - Primary gate for security audit verification
- **QG-S3** (Security Baseline) - Validates security controls
- **QG-P1** (Production Readiness) - Security audit required for production compliance

### Entry Gate
- QG-S3 (Security Baseline) recommended
- Previous audit findings available (if not first audit)

### Exit Gate
- QG-SA1 checklist items verified:
  - [ ] Access control review completed
  - [ ] Vulnerability assessment executed
  - [ ] Compliance verification passed
  - [ ] Findings documented with remediation plans

## Related Workflows

- `bmad-bam-security-review` - Design-time security review
- `bmad-bam-penetration-testing-design` - Penetration testing
- `bmad-bam-compliance-design` - Compliance framework design
