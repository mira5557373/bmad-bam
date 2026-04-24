---
name: bmad-bam-tenant-incident-response
displayName: Tenant Incident Response
description: 'Design tenant-isolated incident handling with severity levels, isolation protocols, and recovery procedures'
module: bam
tags: [incident-response, operations, tenant-safety]
---

# Tenant Incident Response

## Overview

This workflow defines tenant-isolated incident handling procedures including severity levels, isolation protocols, communication plans, recovery procedures, and operational playbooks. It ensures incidents affecting one tenant do not impact others and provides clear escalation paths. Run after observability design, before production launch.

Act as an Incident Response Architect specializing in multi-tenant SaaS platforms with tenant isolation requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant-specific incident response
- Creating incident communication procedures
- Building tenant impact assessment workflows

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new incident response plan | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing incident response plan | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document with tenant isolation patterns
- Tenant-aware observability design (recommended)
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/tenant-incident-response-plan.md`
- `{output_folder}/planning-artifacts/operations/incident-playbooks.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates tenant isolation during incident containment
- **QG-I2** (Tenant Safety) - Ensures incidents affecting one tenant do not impact others
- **QG-P1** (Production) - Incident response procedures required before production

### Entry Gate
- QG-F1 (Foundation) must pass (master architecture with tenant model)
- QG-M2 (Tenant Isolation) recommended for isolation protocol design

### Exit Gate
- QG-I2 checklist items from `qg-i2-tenant-safety.md` verified
- QG-P1 checklist items from `qg-p1-production-readiness.md` verified
- Incident playbooks complete with tenant isolation protocols

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Prerequisite for incident detection
- `bmad-bam-disaster-recovery-design` - Related resilience workflow
- `bmad-bam-ai-agent-debug` - Debug procedures for AI-related incidents
