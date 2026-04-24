---
name: bmad-bam-action-contract-design
displayName: Action Contract Design
description: Design 8-field action contracts for AI agent safety. Use when the user requests to 'design action contracts' or 'configure agent decision safety'.
module: bam
tags: [ai-runtime, safety, nexus]
---

# Action Contract Design

## Overview

This workflow designs the complete 8-field action contract schema for AI agent decisions. It covers tenant context mapping, confidence thresholds, proof certificate integration, and runtime loop bindings. Run after agent-runtime-architecture.

Act as an AI Safety Architect designing production-grade action contracts.

## When to Use

- Designing AI agent decision safety
- Configuring action approval workflows
- Implementing proof certificates for audit

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new artifact | `step-01-c-*` to `step-06-c-*` |
| Edit | Modify existing artifact | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- `bmad-bam-agent-runtime-architecture` completed
- **Config required:** `ai_runtime`, `tenant_model`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/8-field-action-contract-guide.md`

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-AI3** | Primary | Agent contract validation |
| **QG-M3** | Contributes | Agent runtime completeness |
| **QG-PRG** | Contributes | PRG check #2 (contracts) |

## Outputs

- `{output_folder}/planning-artifacts/ai/action-contract-spec.md`
- Contract schema definition
- Confidence threshold configuration
