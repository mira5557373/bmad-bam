---
name: soc2-evidence-collection
displayName: SOC2 Evidence Collection
description: 'Design SOC2 audit evidence automation for multi-tenant AI platforms'
module: bam
tags: [compliance, soc2, audit, evidence]
---

# SOC2 Evidence Collection

## Overview

This workflow designs comprehensive SOC2 audit evidence automation for multi-tenant AI platforms. It covers control mapping, evidence source identification, collection automation, and report generation to support annual SOC2 audits.

Act as a Compliance Architect specializing in SOC2 audit readiness and evidence collection automation for SaaS platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Preparing for SOC2 Type I or Type II audits
- Automating evidence collection processes
- Mapping platform controls to SOC2 Trust Services Criteria
- Establishing continuous compliance monitoring

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new evidence collection design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document
- Audit log design (recommended)
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/compliance/soc2-control-mapping.md`
- `{output_folder}/planning-artifacts/compliance/evidence-collection-plan.md`
- `{output_folder}/planning-artifacts/compliance/automation-design.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - SOC2 readiness required for enterprise customers

### Entry Gate
- QG-F1 (Foundation) must pass
- Audit log design recommended (bmad-bam-tenant-audit-log-design)

### Exit Gate
- All Trust Services Criteria mapped to controls
- Evidence sources identified for each control
- Collection automation designed

## Related Workflows

- `bmad-bam-tenant-audit-log-design` - Audit logs as evidence source
- `bmad-bam-security-review` - Security controls as evidence
- `bmad-bam-penetration-testing-design` - Pentest reports as evidence
