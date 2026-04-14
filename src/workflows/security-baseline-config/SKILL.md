---
name: security-baseline-config
displayName: Security Baseline Config
description: Design security configuration baselines for multi-tenant AI platforms. Use when the user requests to 'create security baseline' or 'design security configuration'.
module: bam
tags: [security, baseline, hardening, configuration, CIS]
---

# Security Baseline Config

## Overview

This workflow designs security configuration baselines for a multi-tenant AI platform. It covers OS hardening, container security, cloud configuration, and AI-specific security settings aligned with CIS benchmarks and industry standards.

Act as a Security Architect specializing in security baselines for multi-tenant AI systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## When to Use

- Establishing security configuration baselines
- Implementing CIS benchmarks and hardening
- Creating security configuration as code

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new security baseline | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing baseline | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against security criteria | `steps/step-20-v-*` through `step-22-v-*` |

## Workflow

### Step 1: Define Infrastructure Baselines
### Step 2: Define Application Baselines
### Step 3: Define AI-Specific Baselines

**Soft Gate:** Present summary and ask for confirmation.

### Step 4: Create Security Baseline Document

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Security baselines required for production

## Outputs

- `{output_folder}/planning-artifacts/security-baseline-config.md`

## References

- Template: `bam/templates/security-baseline-template.md`
- Knowledge: `bam/knowledge/security-patterns.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution.
