---
name: bmad-bam-governance
description: 'Manage architecture decision records (ADRs) and governance documentation. Use when documenting architectural decisions and their rationale.'
module: bam
tags: [governance, architecture, documentation]
---

# Architecture Governance

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new ADR | step-01-c to step-05-c |
| Edit | Modify existing ADR | step-10-e to step-11-e |
| Validate | Check documentation | step-20-v to step-22-v |

## Overview

Manage architecture decision records (ADRs) and governance documentation for multi-tenant SaaS platforms. This workflow establishes decision tracking, rationale documentation, and governance verification.

**Your Role:** Guide decisions on architecture governance while ensuring all decisions are documented with context and consequences.

## Prerequisites

- [ ] Master architecture document available
- [ ] Key stakeholders identified
- [ ] **Load patterns:** `{project-root}/_bmad/bam/data/patterns/governance-*.md`

## Outputs

- **Decision Log:** `{output_folder}/planning-artifacts/decision-log.md`
- **Load template:** `./templates/decision-log.md`

## Related Workflows

- `bmad-bam-master-architecture`
- `bmad-bam-convergence`
- `bmad-bam-production-readiness`

## On Activation

### Step 1: Load Persistent Facts

Load from `{project-root}/_bmad/bam/data/context/bam-core.md`

### Step 2: Greet User

Greet and confirm governance documentation scope.

### Step 3: Begin Workflow

Read `workflow.md` to begin.
