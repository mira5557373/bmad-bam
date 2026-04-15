---
name: bmad-bam-right-to-deletion
displayName: Right to Deletion
description: Design GDPR Article 17 right to erasure procedures for data subject deletion requests. Use when the user requests to 'implement right to erasure', 'design deletion workflow', or 'handle GDPR deletion requests'.
module: bam
tags: [compliance, gdpr, deletion, erasure, privacy]
---

# Right to Deletion

## Overview

This workflow designs the complete GDPR Article 17 right to erasure implementation for a BAM platform -- covering deletion request intake, data discovery, deletion execution, exception handling, and audit trail generation. Every deletion operation carries tenant context for proper isolation.

Act as a Compliance Architect designing production-grade GDPR deletion procedures for a multi-tenant modular monolith.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## When to Use

- Designing GDPR-compliant deletion request handling
- Creating data discovery procedures for erasure
- Implementing deletion verification and audit trails
- Building exception handling for retention requirements

## Modes

| Mode | Description |
|------|-------------|
| **Create** | Generate new deletion procedure specification from scratch |
| **Edit** | Load existing deletion spec and apply targeted modifications |
| **Validate** | Check existing deletion spec against GDPR Article 17 requirements |

Default: **Create** mode.

## Prerequisites

- Master architecture document completed
- Tenant model isolation defined
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Design Request Intake

Design deletion request handling:

- Request submission channels
- Identity verification procedures
- Request tracking and SLA management
- Tenant-scoped request handling

### Step 2: Design Data Discovery

Create data location procedures:

- Personal data inventory mapping
- Cross-system data discovery
- Backup and archive inclusion
- Third-party data tracking

### Step 3: Design Deletion Execution

Define deletion procedures:

- Hard delete vs soft delete decisions
- Cascading deletion requirements
- Anonymization alternatives
- Verification procedures

**Soft Gate:** Steps 1-3 complete the request intake, data discovery, and deletion execution design.

### Step 4: Create Deletion Procedure Spec

Generate the comprehensive deletion procedure specification.

## Outputs

- `{output_folder}/planning-artifacts/right-to-deletion-spec.md`
- Deletion request workflow
- Data discovery procedures
- Exception handling matrix

## Quality Gates

This workflow contributes to:
- **QG-S3** (Security Baseline Gate) - Validates data deletion security controls
- **QG-C1** (Compliance Gate) - Validates GDPR Article 17 compliance requirements

### GDPR Deletion Readiness
- [ ] Request intake procedures defined
- [ ] Data discovery process documented
- [ ] Deletion execution procedures specified
- [ ] Exception handling defined
- [ ] Audit trail generation configured
- [ ] 30-day SLA compliance designed

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-gdpr-consent-management` | Related | Consent withdrawal may trigger deletion |
| `bmad-bam-tenant-offboarding-design` | Related | Tenant offboarding includes data deletion |

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
