---
name: security-incident-response
displayName: Security Incident Response
description: Design security-specific incident response procedures for multi-tenant AI platforms. Use when the user requests to 'design security incident response' or 'create security incident procedures'.
module: bam
tags: [security, incident-response, breach, forensics]
---

# Security Incident Response

## Overview

This workflow designs a comprehensive security incident response program for a multi-tenant AI platform. It defines incident classification, response procedures, tenant notification protocols, and forensic investigation workflows. Run after master architecture is defined to ensure security response aligns with platform decisions.

Act as a Security Architect specializing in incident response for multi-tenant AI systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Establishing security incident response procedures
- Creating breach notification and communication plans
- Building forensic investigation runbooks

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new security incident response plan from scratch | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing incident response plan | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against security incident readiness | `steps/step-20-v-*` through `step-22-v-*` |

## Prerequisites

- Master architecture document completed
- Tenant model and tier definitions established
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Define Incident Classification

- Define security incident severity levels
- Configure incident types and categories
- Map incidents to response priority levels
- Document tenant-impact classification

### Step 2: Design Response Procedures

- Define incident response team structure
- Configure communication escalation paths
- Design containment and eradication procedures
- Plan evidence preservation workflows

### Step 3: Design Tenant Notification

- Define notification triggers and timelines
- Configure multi-tenant communication channels
- Design regulatory notification procedures
- Plan post-incident reporting

**Soft Gate:** Steps 1-3 complete the core incident response design. Present summary and ask for confirmation before proceeding to final documentation.

### Step 4: Create Incident Response Plan

- Assemble comprehensive incident response plan using template
- Define playbooks for common incident types
- Document communication templates
- Schedule tabletop exercises

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Incident response required for production readiness
- **QG-I2** (Tenant Safety) - Tenant notification ensures SLA compliance

### Entry Gate
- QG-F1 (Foundation) must pass before security planning
- Master architecture must be complete

### Exit Gate
- Incident response plan complete with checklist items verified
- Response procedures documented for all incident types
- Tabletop exercise schedule established

## Outputs

- `{output_folder}/planning-artifacts/security-incident-response-plan.md`

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-tenant-incident-response` | Related | Tenant-scoped incidents use related procedures |
| `bmad-bam-disaster-recovery-design` | Related | Major incidents may trigger DR procedures |
| `bmad-bam-compliance-design` | Related | Compliance requirements inform notification timelines |

## References

- Template: `bam/templates/security-incident-response-template.md`
- Knowledge: `bam/knowledge/security-patterns.md`
- Checklist: `bam/checklists/production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
