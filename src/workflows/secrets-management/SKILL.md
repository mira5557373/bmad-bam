---
name: secrets-management
displayName: Secrets Management
description: Design secrets rotation and vault integration for multi-tenant AI platforms. Use when the user requests to 'design secrets management' or 'create vault integration'.
module: bam
tags: [security, secrets, vault, rotation, credentials]
---

# Secrets Management

## Overview

This workflow designs a comprehensive secrets management strategy for a multi-tenant AI platform. It defines secret classification, vault integration, rotation policies, and tenant-isolated credential management. Run after master architecture is defined to ensure secrets strategy aligns with platform decisions.

Act as a Security Architect specializing in secrets management for multi-tenant AI systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml`. Search for and load `{project-root}/**/project-context.md` as foundational reference.

## When to Use

- Establishing secrets management for the platform
- Integrating with HashiCorp Vault or cloud KMS
- Designing credential rotation policies

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new secrets management plan | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing secrets management plan | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against security criteria | `steps/step-20-v-*` through `step-22-v-*` |

## Prerequisites

- Master architecture document completed
- Tenant model and tier definitions established
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Define Secret Classification

- Define secret types and sensitivity levels
- Configure secret lifecycle policies
- Map secrets to storage locations
- Document tenant-specific secret isolation

### Step 2: Design Vault Integration

- Define vault architecture and topology
- Configure authentication methods
- Design secret engines and paths
- Plan high availability and disaster recovery

### Step 3: Design Rotation Policies

- Define rotation schedules per secret type
- Configure automated rotation mechanisms
- Design emergency rotation procedures
- Plan audit and compliance logging

**Soft Gate:** Steps 1-3 complete the core secrets management design. Present summary and ask for confirmation.

### Step 4: Create Secrets Management Plan

- Assemble comprehensive secrets management plan
- Define operational runbooks
- Document access control policies
- Schedule security reviews

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Secrets management required for production
- **QG-M2** (Tenant Isolation) - Tenant secret isolation validates security

## Outputs

- `{output_folder}/planning-artifacts/secrets-management-plan.md`

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-tenant-api-key-management` | Related | API key management uses secrets infrastructure |
| `bmad-bam-security-review` | Related | Security review validates secrets practices |

## References

- Template: `bam/templates/secrets-management-template.md`
- Knowledge: `bam/knowledge/security-patterns.md`
- Checklist: `bam/checklists/production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
