---
name: zero-trust-architecture
displayName: Zero Trust Architecture
description: Design zero-trust network and identity architecture for multi-tenant AI platforms. Use when the user requests to 'design zero trust' or 'create zero trust architecture'.
module: bam
tags: [security, zero-trust, identity, network, microsegmentation]
---

# Zero Trust Architecture

## Overview

This workflow designs a comprehensive zero-trust architecture for a multi-tenant AI platform. It implements "never trust, always verify" principles with identity-centric security, microsegmentation, and continuous verification for all users, devices, and services.

Act as a Security Architect specializing in zero-trust architecture for multi-tenant AI systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## When to Use

- Implementing zero-trust security model
- Designing identity-centric access controls
- Implementing microsegmentation for services

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new zero-trust design | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing design | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against security criteria | `steps/step-20-v-*` through `step-22-v-*` |

## Workflow

### Step 1: Define Identity Architecture
### Step 2: Design Network Segmentation
### Step 3: Design Continuous Verification

**Soft Gate:** Present summary and ask for confirmation.

### Step 4: Create Zero Trust Design Document

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Zero-trust required for enterprise
- **QG-M2** (Tenant Isolation) - Identity isolation validates security

## Outputs

- `{output_folder}/planning-artifacts/zero-trust-architecture.md`

## References

- Template: `bam/templates/zero-trust-template.md`
- Knowledge: `bam/knowledge/security-patterns.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution.
