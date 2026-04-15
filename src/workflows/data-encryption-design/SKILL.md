---
name: data-encryption-design
displayName: Data Encryption Design
description: Design encryption at rest and in transit with tenant-specific keys for multi-tenant AI platforms. Use when the user requests to 'design encryption' or 'create key management'.
module: bam
tags: [security, encryption, kms, tenant-keys, cryptography]
---

# Data Encryption Design

## Overview

This workflow designs a comprehensive data encryption strategy for a multi-tenant AI platform. It defines encryption at rest, in transit, and application-level encryption with tenant-specific key management to ensure data isolation and regulatory compliance.

Act as a Security Architect specializing in cryptographic systems for multi-tenant AI platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## When to Use

- Designing encryption strategy for tenant data
- Implementing tenant-specific key management
- Meeting compliance requirements (GDPR, HIPAA, SOC2)

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new encryption design | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing encryption design | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against security criteria | `steps/step-20-v-*` through `step-22-v-*` |

## Workflow

### Step 1: Define Data Classification

- Classify data types by sensitivity
- Map encryption requirements per class
- Identify tenant-specific data

### Step 2: Design Encryption at Rest

- Define storage encryption strategy
- Configure tenant key isolation
- Design key hierarchy

### Step 3: Design Encryption in Transit

- Define TLS configuration
- Configure mTLS for services
- Design API encryption

**Soft Gate:** Present summary and ask for confirmation.

### Step 4: Create Encryption Design Document

- Assemble comprehensive encryption design
- Document key management procedures
- Schedule key rotation

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Encryption required for production
- **QG-M2** (Tenant Isolation) - Tenant key isolation validates security

## Outputs

- `{output_folder}/planning-artifacts/data-encryption-design.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/encryption-design-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/security-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution.
