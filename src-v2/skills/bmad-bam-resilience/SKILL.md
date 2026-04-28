---
name: bmad-bam-resilience
description: 'Design disaster recovery and chaos engineering'
module: bam
web_bundle: false
tags: [resilience, disaster-recovery, chaos-engineering, operations]
---

# Resilience

## Overview

This skill consolidates disaster recovery planning and chaos engineering capabilities for multi-tenant SaaS platforms. It guides the design of RTO/RPO targets, failover procedures, blast radius controls, and chaos experiments while ensuring tenant isolation is maintained during failure scenarios.

## Sub-Workflows

| Code | Sub-Workflow | Description |
|------|--------------|-------------|
| ZDR | Disaster Recovery | RTO/RPO targets, failover procedures, backup strategies |
| ZCH | Chaos Engineering | Blast radius controls, experiment design, steady-state validation |

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Design new resilience strategy | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing resilience artifacts | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against quality gates | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture completed (QG-F1 passed)
- Tenant model selected and documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `disaster-recovery`

## Quality Gates

| Gate | Name | When |
|------|------|------|
| QG-DR | Disaster Recovery | After DR design completion |
| QG-CE1 | Chaos Engineering | After chaos experiment design |

## Outputs

All outputs are written to `{output_folder}/resilience/`:

| Artifact | Description |
|----------|-------------|
| `disaster-recovery-plan.md` | RTO/RPO targets, failover procedures |
| `chaos-engineering-strategy.md` | Blast radius controls, experiments |
| `resilience-validation-report.md` | Validation results |

## On Activation

1. Determine mode (Create/Edit/Validate) based on existing artifacts
2. Load disaster-recovery patterns from pattern registry
3. Identify sub-workflow focus (DR or Chaos)
4. Load tenant isolation requirements for failure scenarios
5. Verify prerequisites are met
6. Route to appropriate step file

## Domain References

- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `disaster-recovery`, `chaos-engineering`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/qg-dr.md`, `qg-ce1.md`
- **Templates:** `{project-root}/_bmad/bam/data/templates/disaster-recovery-template.md`, `chaos-engineering-template.md`
