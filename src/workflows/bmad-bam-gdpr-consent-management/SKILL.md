---
name: bmad-bam-gdpr-consent-management
displayName: GDPR Consent Management
description: Design GDPR consent collection and tracking for personal data processing. Use when the user requests to 'design consent management', 'implement GDPR consent', or 'track user consent'.
module: bam
tags: [compliance, gdpr, consent, privacy, data-protection]
---

# GDPR Consent Management

## Overview

This workflow designs the complete GDPR consent management architecture for a BAM platform -- covering consent collection mechanisms, purpose specification, consent storage, preference management, and audit trail generation. Every consent record carries tenant context for proper isolation.

Act as a Compliance Architect designing production-grade GDPR consent management for a multi-tenant modular monolith.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

## When to Use

- Designing GDPR-compliant consent collection for EU users
- Creating consent preference management centers
- Implementing lawful basis tracking per processing purpose
- Building consent audit trails for regulatory compliance

## Modes

| Mode | Description |
|------|-------------|
| **Create** | Generate new consent management specification from scratch |
| **Edit** | Load existing consent spec and apply targeted modifications |
| **Validate** | Check existing consent spec against GDPR requirements |

Default: **Create** mode.

## Prerequisites

- Master architecture document completed
- Tenant model isolation defined
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Define Processing Purposes

Identify all data processing purposes:

- Purpose categorization and granularity
- Lawful basis identification per purpose
- Purpose-to-processing mapping
- Tenant-specific purpose configuration

### Step 2: Design Consent Collection

Design consent capture mechanisms:

- Consent form design (granular, explicit)
- Pre-tick prohibition compliance
- Language and accessibility requirements
- Consent versioning and changelog

### Step 3: Design Consent Storage

Create consent record architecture:

- Consent record schema
- Proof of consent requirements
- Tenant-isolated consent storage
- Consent retrieval and verification

**Soft Gate:** Steps 1-3 complete the purpose definition, collection design, and storage architecture.

### Step 4: Create Consent Management Spec

Generate the comprehensive consent management specification.

## Outputs

- `{output_folder}/planning-artifacts/gdpr-consent-management-spec.md`
- Consent record schema
- Purpose-lawful basis mapping
- Consent collection UI requirements

## Quality Gates

This workflow contributes to:
- **QG-S3** (Security Baseline Gate) - Validates GDPR consent security controls
- **QG-C1** (Compliance Gate) - Validates GDPR consent compliance requirements

### GDPR Consent Readiness
- [ ] Processing purposes defined
- [ ] Lawful basis documented per purpose
- [ ] Consent collection mechanisms designed
- [ ] Consent storage architecture specified
- [ ] Preference center requirements defined
- [ ] Audit trail generation configured

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-right-to-deletion` | Related | GDPR erasure requires consent record handling |
| `bmad-bam-compliance-design` | Context | General compliance informs GDPR-specific controls |

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
