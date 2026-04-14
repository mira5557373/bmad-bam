---
name: ddos-protection-design
displayName: DDoS Protection Design
description: Design DDoS mitigation strategies for multi-tenant AI platforms. Use when the user requests to 'design DDoS protection' or 'create DDoS mitigation'.
module: bam
tags: [security, ddos, availability, rate-limiting, waf]
---

# DDoS Protection Design

## Overview

This workflow designs a comprehensive DDoS protection strategy for a multi-tenant AI platform. It covers volumetric attacks, application-layer attacks, and AI-specific resource exhaustion with tenant-fair resource allocation during attacks.

Act as a Security Architect specializing in DDoS mitigation for multi-tenant AI systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## When to Use

- Designing DDoS protection for the platform
- Implementing rate limiting and throttling
- Planning incident response for availability attacks

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new DDoS protection design | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing design | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against security criteria | `steps/step-20-v-*` through `step-22-v-*` |

## Workflow

### Step 1: Analyze Attack Vectors
### Step 2: Design Defense Layers
### Step 3: Design Tenant Fairness

**Soft Gate:** Present summary and ask for confirmation.

### Step 4: Create DDoS Protection Plan

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - DDoS protection required for production

## Outputs

- `{output_folder}/planning-artifacts/ddos-protection-design.md`

## References

- Template: `bam/templates/ddos-protection-template.md`
- Knowledge: `bam/knowledge/security-patterns.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution.
