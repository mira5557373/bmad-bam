---
name: security-operations
displayName: Security Operations
description: 'Set up security operations including threat detection, correlation rules, AI threat detection, and hunting capabilities for multi-tenant AI platforms'
module: bam
tags: [security, operations, siem, threat-detection]
---

# Security Operations

## Overview

This workflow provides comprehensive security operations setup for multi-tenant AI platforms. It covers threat detection configuration, SIEM correlation rules, AI-specific threat detection, and threat hunting capabilities. Run during initial security setup or when enhancing security monitoring.

Act as a Security Operations Engineer specializing in multi-tenant SaaS threat detection and response.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Setting up security operations center capabilities
- Configuring threat detection and correlation rules
- Implementing AI-specific threat monitoring
- Establishing threat hunting processes

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Set up new security operations | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing security operations | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-S8 criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Security baseline established
- SIEM/logging infrastructure available
- **Config required:** `{tenant_model}`, `{ai_runtime}`

## Outputs

- `{output_folder}/security/threat-detection-config.md`
- `{output_folder}/security/correlation-rules.md`
- `{output_folder}/security/hunting-playbooks.md`

## Quality Gates

This workflow contributes to:
- **QG-S8** (Security Operations Gate) - Primary gate for SecOps verification
- **QG-S5** (Continuous Security) - Enables ongoing security monitoring
- **QG-P1** (Production Readiness) - Security operations required for production

### Entry Gate
- QG-S3 (Security Baseline) established
- Logging infrastructure operational

### Exit Gate
- QG-S8 checklist items verified:
  - [ ] Threat detection rules configured
  - [ ] Correlation rules active
  - [ ] AI threat detection enabled
  - [ ] Hunting capabilities established

## Related Workflows

- `bmad-bam-security-review` - Security design review
- `bmad-bam-security-incident-response` - Incident response procedures
- `bmad-bam-tenant-aware-observability` - Tenant-aware monitoring
