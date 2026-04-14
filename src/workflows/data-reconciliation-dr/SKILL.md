---
name: data-reconciliation-dr
displayName: Data Reconciliation DR
description: Execute or design data reconciliation after DR failover events. Use when the user requests to 'execute data reconciliation', 'reconcile DR data', 'design data reconciliation', or 'verify DR data integrity'.
module: bam
tags: [disaster-recovery, data-integrity, reconciliation, operations, implementation, phase-4]
---

# Data Reconciliation DR

## Overview

This workflow designs data reconciliation capabilities following disaster recovery incidents. It covers data integrity validation procedures, conflict resolution rules, AI context restoration, and tenant verification for multi-tenant SaaS platforms.

Act as a Platform Architect specializing in data integrity and disaster recovery validation for multi-tenant systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing data reconciliation procedures for DR planning
- Creating data verification and integrity checks
- Building remediation procedures for data discrepancies
- Establishing conflict resolution rules for post-failover scenarios

## Modes

| Mode | Purpose | Step Files |
|------|---------|------------|
| **Create** | Design new reconciliation procedures | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing reconciliation design | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check reconciliation completeness | `steps/step-20-v-*` through `step-22-v-*` |

## Prerequisites

- Disaster recovery plan completed
- Tenant model and tier definitions established
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Define Reconciliation Scope
- Define data reconciliation scope and priorities
- Identify critical data assets per tier
- Establish reconciliation order and dependencies

### Step 2: Design Verification Procedures
- Design data verification procedures
- Define comparison methods and tolerances
- Create verification checklists per data type

### Step 3: Configure Automated Checks
- Configure automated integrity checks
- Design check scheduling and triggers
- Define alert thresholds and escalation

### Step 4: Design Remediation
- Design data remediation and correction procedures
- Define rollback and recovery options
- Create escalation procedures

### Quality Gates

- [ ] Reconciliation scope defined for all data types
- [ ] Verification procedures documented
- [ ] Automated checks configured
- [ ] Remediation procedures established

## Quality Gates

This workflow contributes to:
- **QG-DR1** (Disaster Recovery Drill) - Data reconciliation required for DR validation
- **QG-P1** (Production) - Data integrity verification for production readiness

### Entry Gate
- QG-DR1 (Disaster Recovery Drill) should be planned before reconciliation design
- Disaster recovery plan and failover procedures must be documented

### Exit Gate
- Reconciliation design document complete with `production-readiness.md` checklist items verified
- Verification procedures aligned with RPO objectives
- Automated checks cover critical data assets

## Outputs

- `{output_folder}/planning-artifacts/data-reconciliation-dr.md`

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-disaster-recovery-design` | Prerequisite | DR design defines what data needs reconciliation |
| `bmad-bam-tenant-data-migration` | Related | Migration procedures may use reconciliation checks |
| `bmad-bam-tenant-model-isolation` | Related | Isolation model affects reconciliation verification |

## References

- Template: `bam/templates/data-reconciliation-dr-template.md`
- Knowledge: `bam/knowledge/disaster-recovery-patterns.md`
- Knowledge: `bam/knowledge/data-integrity-patterns.md`
- Checklist: `bam/checklists/production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
