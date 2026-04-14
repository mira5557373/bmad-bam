---
name: compliance-design
displayName: Compliance Design
description: Design audit logging architecture and compliance framework alignment. Use when the user requests to 'design compliance', 'setup audit logging', or 'align with SOC2/GDPR/HIPAA'.
module: bam
tags: [compliance, audit, security]
---

# Compliance Design

## Overview

This workflow designs the complete compliance architecture for a BAM platform -- covering applicable regulatory framework identification (SOC2, GDPR, HIPAA), audit logging architecture design, control mapping, and compliance specification creation. Every audit event carries tenant context for proper isolation and attribution.

Act as a Compliance Architect designing production-grade audit logging and regulatory alignment for a multi-tenant modular monolith.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing compliance frameworks for regulated industries
- Creating audit trail requirements
- Mapping regulatory requirements to platform architecture

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new compliance specification from scratch |
| **Edit** | Load existing compliance spec and apply targeted modifications |
| **Validate** | Check existing compliance spec against framework requirements |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Master architecture document completed
- Tenant model isolation defined
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Identify Compliance Frameworks

Analyze project requirements to identify applicable compliance frameworks:

- SOC 2 Type II (Trust Service Criteria)
- GDPR (EU Data Protection)
- HIPAA (Healthcare Data)
- PCI DSS (Payment Card Data)
- SOX (Financial Reporting)
- ISO 27001 (Information Security)

Framework selection criteria:
- Geographic regions served
- Industry vertical
- Data types processed
- Customer requirements
- Contractual obligations

### Step 2: Design Audit Logging Architecture

Define comprehensive audit logging:

- Audit event schema (who, what, when, where, tenant context)
- Event categories (authentication, authorization, data access, configuration, administrative)
- Immutable storage requirements
- Retention policies per framework
- Real-time vs batch processing
- Log aggregation and search

### Step 3: Map Controls to Frameworks

Create control mapping matrix:

- Map each platform control to applicable framework requirements
- Identify control gaps requiring remediation
- Define evidence collection requirements per control
- Establish control ownership and accountability
- Document control testing procedures

**Soft Gate:** Steps 1-3 complete the framework identification, audit architecture, and control mapping. Present a summary of selected frameworks, audit event schema, and control mapping. Ask for confirmation before proceeding to compliance specification creation.

### Step 4: Create Compliance Specification

Generate the comprehensive compliance specification document:

- Framework requirements summary
- Audit logging implementation guide
- Control matrix with evidence requirements
- Retention policy definitions
- Compliance monitoring dashboards
- Remediation tracking procedures

## Outputs

- `{output_folder}/planning-artifacts/compliance-spec.md`
- Audit event schema definition
- Control mapping matrix
- Evidence collection procedures

## Quality Gates

### Compliance Readiness
- [ ] Applicable frameworks identified
- [ ] Audit logging architecture defined
- [ ] All controls mapped to frameworks
- [ ] Evidence collection procedures documented
- [ ] Retention policies aligned with requirements
- [ ] Compliance monitoring configured

This workflow contributes to:
- **QG-P1** (Production) - Compliance controls required for production readiness
- **QG-I2** (Tenant Safety) - Audit logging supports tenant isolation verification

### Entry Gate
- QG-F1 (Foundation) must pass before compliance design
- Master architecture and tenant model must be defined

### Exit Gate
- Compliance specification document complete
- Control mapping matrix verified against framework requirements
- Audit logging architecture aligned with `production-readiness.md` checklist

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-create-master-architecture` | Context | Master architecture informs compliance requirements |
| `bmad-bam-tenant-model-isolation` | Related | Tenant isolation patterns affect audit logging scope |
| `bmad-bam-convergence-verification` | Downstream | Verify compliance controls during convergence |

## References

- Knowledge: `bam/knowledge/audit-logging-patterns.md`, `bam/knowledge/compliance-reporting-patterns.md`, `bam/knowledge/sox-compliance-patterns.md`, `bam/knowledge/data-sovereignty-patterns.md`
- Template: `bam/templates/compliance-checklist-template.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
