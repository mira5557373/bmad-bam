---
name: pci-dss-compliance
displayName: PCI-DSS Compliance
description: Design PCI-DSS compliance for payment data handling and cardholder data protection. Use when the user requests to 'design PCI compliance', 'protect payment data', or 'secure cardholder data'.
module: bam
tags: [compliance, pci-dss, payment, security, cardholder]
---

# PCI-DSS Compliance

## Overview

This workflow designs the complete PCI-DSS compliance architecture for a BAM platform -- covering cardholder data environment (CDE) scoping, network segmentation, encryption requirements, access controls, and compliance specification creation. Every payment transaction carries tenant context for proper isolation and audit trail.

Act as a Compliance Architect designing production-grade PCI-DSS compliance controls for a multi-tenant modular monolith handling payment data.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing PCI-DSS compliance for payment processing platforms
- Creating cardholder data protection controls
- Implementing network segmentation for CDE
- Preparing for PCI-DSS audit and certification

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new PCI-DSS compliance specification from scratch |
| **Edit** | Load existing PCI-DSS spec and apply targeted modifications |
| **Validate** | Check existing PCI-DSS spec against DSS requirements |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Master architecture document completed
- Tenant model isolation defined
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Scope Cardholder Data Environment

Define CDE boundaries and data flows:

- Identify systems storing/processing/transmitting CHD
- Map payment data flows across tenant boundaries
- Define network segmentation requirements
- Document third-party payment integrations
- Classify PCI scope (SAQ level determination)

### Step 2: Design Security Controls

Define PCI-DSS requirement controls:

- Build and maintain secure network (Requirements 1-2)
- Protect cardholder data (Requirements 3-4)
- Maintain vulnerability management (Requirements 5-6)
- Implement access control (Requirements 7-9)
- Monitor and test networks (Requirements 10-11)
- Maintain security policy (Requirement 12)

### Step 3: Design Tenant Payment Isolation

Create tenant-specific payment controls:

- Per-tenant encryption key management
- Tenant-scoped payment audit logging
- Tenant payment data segregation
- Cross-tenant payment isolation verification

**Soft Gate:** Steps 1-3 complete the CDE scoping, security controls, and tenant isolation. Present a summary of CDE scope, security control coverage, and tenant isolation approach. Ask for confirmation before proceeding to PCI-DSS specification creation.

### Step 4: Create PCI-DSS Compliance Spec

Generate the comprehensive PCI-DSS compliance specification document:

- CDE scope documentation
- Security control implementation matrix
- Tenant payment isolation design
- Penetration testing requirements
- Compliance monitoring dashboards

## Outputs

- `{output_folder}/planning-artifacts/pci-dss-compliance-spec.md`
- CDE scope diagram
- Security control matrix (12 requirements)
- Tenant payment isolation design
- SAQ documentation

## Quality Gates

### PCI-DSS Compliance Readiness
- [ ] CDE scope clearly defined
- [ ] All 12 PCI-DSS requirements addressed
- [ ] Network segmentation documented
- [ ] Tenant payment isolation verified
- [ ] Penetration testing plan established
- [ ] Compliance monitoring configured

This workflow contributes to:
- **QG-P1** (Production) - PCI-DSS controls required for payment processing readiness
- **QG-I2** (Tenant Safety) - Payment data isolation verification

### Entry Gate
- QG-F1 (Foundation) must pass before PCI-DSS compliance design
- Master architecture and tenant model must be defined

### Exit Gate
- PCI-DSS compliance specification document complete
- Security control matrix verified against PCI-DSS v4.0 requirements
- CDE scope documentation aligned with SAQ requirements

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-compliance-design` | Context | General compliance framework informs PCI-specific controls |
| `bmad-bam-tenant-model-isolation` | Related | Tenant isolation patterns affect payment data segregation |
| `bmad-bam-security-review` | Related | Security controls support PCI-DSS requirements |

## References

- Knowledge: `bam/knowledge/audit-logging-patterns.md`, `bam/knowledge/compliance-reporting-patterns.md`
- Template: `bam/templates/pci-dss-compliance-template.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
