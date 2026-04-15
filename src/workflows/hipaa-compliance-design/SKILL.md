---
name: hipaa-compliance-design
displayName: HIPAA Compliance Design
description: Design HIPAA controls and BAA management for healthcare data protection. Use when the user requests to 'design HIPAA compliance', 'setup PHI protection', or 'manage business associate agreements'.
module: bam
tags: [compliance, hipaa, healthcare, phi, security]
---

# HIPAA Compliance Design

## Overview

This workflow designs the complete HIPAA compliance architecture for a BAM platform -- covering PHI identification and classification, Administrative/Technical/Physical safeguards implementation, Business Associate Agreement management, breach notification procedures, and compliance specification creation. Every PHI access carries tenant context for proper isolation and audit trail.

Act as a Compliance Architect designing production-grade HIPAA compliance controls for a multi-tenant modular monolith handling healthcare data.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing HIPAA compliance for healthcare SaaS platforms
- Creating PHI protection controls and audit requirements
- Managing Business Associate Agreement lifecycle
- Implementing breach notification procedures

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new HIPAA compliance specification from scratch |
| **Edit** | Load existing HIPAA spec and apply targeted modifications |
| **Validate** | Check existing HIPAA spec against regulatory requirements |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Master architecture document completed
- Tenant model isolation defined
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Analyze PHI Data Flows

Identify and map all PHI data within the platform:

- PHI data classification (covered vs non-covered)
- Data flow mapping across tenant boundaries
- Storage locations and encryption requirements
- Transmission paths and security controls
- Third-party integrations handling PHI

### Step 2: Design HIPAA Safeguards

Define comprehensive safeguard controls:

- Administrative safeguards (policies, training, workforce security)
- Technical safeguards (access control, audit controls, transmission security)
- Physical safeguards (facility access, workstation security, device controls)
- Organizational requirements (BAA management, documentation)

### Step 3: Design BAA Management

Create Business Associate Agreement lifecycle:

- BAA template management and versioning
- Subcontractor BAA tracking
- Annual review and renewal procedures
- Termination and data return procedures
- BAA compliance monitoring

**Soft Gate:** Steps 1-3 complete the PHI analysis, safeguards design, and BAA management. Present a summary of identified PHI, safeguard controls, and BAA procedures. Ask for confirmation before proceeding to HIPAA specification creation.

### Step 4: Create HIPAA Compliance Spec

Generate the comprehensive HIPAA compliance specification document:

- PHI inventory and data flow diagrams
- Safeguard implementation requirements
- BAA management procedures
- Breach notification procedures
- Risk assessment schedule
- Compliance monitoring dashboards

## Outputs

- `{output_folder}/planning-artifacts/hipaa-compliance-spec.md`
- PHI data flow diagrams
- Safeguard control matrix
- BAA management procedures
- Breach notification runbook

## Quality Gates

### HIPAA Compliance Readiness
- [ ] PHI data flows identified and mapped
- [ ] All safeguard categories addressed
- [ ] BAA management procedures documented
- [ ] Breach notification procedures defined
- [ ] Risk assessment schedule established
- [ ] Compliance monitoring configured

This workflow contributes to:
- **QG-P1** (Production) - HIPAA controls required for healthcare production readiness
- **QG-I2** (Tenant Safety) - PHI isolation verification

### Entry Gate
- QG-F1 (Foundation) must pass before HIPAA compliance design
- Master architecture and tenant model must be defined

### Exit Gate
- HIPAA compliance specification document complete
- Safeguard control matrix verified against HIPAA requirements
- BAA management procedures aligned with regulatory requirements

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-compliance-design` | Context | General compliance framework informs HIPAA-specific controls |
| `bmad-bam-tenant-model-isolation` | Related | Tenant isolation patterns affect PHI segregation |
| `bmad-bam-security-review` | Related | Security controls support HIPAA technical safeguards |

## References

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/audit-logging-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/compliance-reporting-patterns.md`
- Template: `{project-root}/_bmad/bam/data/templates/hipaa-compliance-template.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
