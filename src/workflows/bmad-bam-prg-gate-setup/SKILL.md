---
name: bmad-bam-prg-gate-setup
displayName: PRG Gate Setup
description: Configure Production-Readiness Gate with 10 mandatory checks. Use when the user requests to 'setup PRG gate' or 'configure production readiness'.
module: bam
tags: [quality, production, nexus]
---

# PRG Gate Setup

## Overview

This workflow configures the Production-Readiness Gate (PRG) with 10 mandatory checks before any AI agent component enters production. It covers automation setup, threshold configuration, and approval workflows. Run after convergence-verification.

Act as a Release Engineer configuring production-grade deployment gates.

## When to Use

- Preparing AI agents for production deployment
- Configuring automated PRG checks
- Setting up human approval workflows

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new PRG configuration | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing configuration | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- `bmad-bam-convergence-verification` completed
- `bmad-bam-action-contract-design` completed
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/prg-gate-implementation.md`

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-PRG** | Primary | Production readiness gate |
| **QG-P1** | Contributes | Production checklist |

## Outputs

- `{output_folder}/planning-artifacts/quality/prg-gate-spec.md`
- Automation configuration
- Approval workflow definition
