---
name: threat-modeling
displayName: Threat Modeling
description: Design threat modeling processes for multi-tenant AI platforms. Use when the user requests to 'design threat model' or 'create threat assessment'.
module: bam
tags: [security, threat-modeling, risk, STRIDE, attack-surface]
---

# Threat Modeling

## Overview

This workflow designs a comprehensive threat modeling framework for a multi-tenant AI platform. It uses STRIDE methodology to identify threats, assess attack surfaces, and define mitigations specific to multi-tenant AI systems including prompt injection, model extraction, and tenant isolation attacks.

Act as a Security Architect specializing in threat modeling for multi-tenant AI systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config and search for `{project-root}/**/project-context.md` as foundational reference.

## When to Use

- Performing threat modeling for new features or systems
- Assessing AI-specific attack vectors
- Evaluating tenant isolation security boundaries

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new threat model | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing threat model | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against security criteria | `steps/step-20-v-*` through `step-22-v-*` |

## Prerequisites

- Master architecture document completed
- Tenant model and tier definitions established
- **Config required:** `{tenant_model}`, `{ai_runtime}`

## Workflow

### Step 1: Define Attack Surface

- Identify system components and data flows
- Map external interfaces and trust boundaries
- Document AI-specific entry points
- Identify tenant isolation boundaries

### Step 2: Apply STRIDE Analysis

- Analyze Spoofing threats
- Analyze Tampering threats
- Analyze Repudiation threats
- Analyze Information Disclosure threats
- Analyze Denial of Service threats
- Analyze Elevation of Privilege threats

### Step 3: Design Mitigations

- Define mitigation strategies per threat
- Prioritize based on risk and impact
- Map mitigations to security controls
- Plan implementation roadmap

**Soft Gate:** Steps 1-3 complete the core threat model. Present summary and ask for confirmation.

### Step 4: Create Threat Model Document

- Assemble comprehensive threat model using template
- Document threat scenarios
- Create risk register
- Schedule threat model reviews

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Threat modeling required for production
- **QG-I3** (Agent Safety) - AI threat assessment validates safety

## Outputs

- `{output_folder}/planning-artifacts/threat-model.md`

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-security-review` | Related | Security review validates threat mitigations |
| `bmad-bam-ai-security-testing` | Related | Security testing validates AI threats |
| `bmad-bam-penetration-testing-design` | Related | Penetration testing validates threat model |

## References

- Template: `{project-root}/_bmad/bam/data/templates/threat-model-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/security-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
