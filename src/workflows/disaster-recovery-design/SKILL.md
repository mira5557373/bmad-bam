---
name: disaster-recovery-design
displayName: Disaster Recovery Design
description: Design tier-aware disaster recovery strategy with RTO/RPO objectives. Use when the user requests to 'design disaster recovery' or 'create DR plan'.
module: bam
tags: [operations, disaster-recovery, backup]
---

# Disaster Recovery Design

## Overview

This workflow designs a comprehensive tier-aware disaster recovery strategy for a multi-tenant SaaS platform. It defines RTO/RPO objectives per tenant tier (Free/Pro/Enterprise), backup strategies, cross-region failover procedures, and creates a complete DR plan document. Run after master architecture is defined to ensure DR strategy aligns with platform decisions.

Act as a Platform Architect specializing in business continuity and disaster recovery for multi-tenant systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing disaster recovery procedures for the platform
- Creating RTO/RPO requirements per tenant tier
- Building failover and recovery runbooks

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new DR plan from scratch | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing DR plan | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against DR completeness criteria | `steps/step-20-v-*` through `step-21-v-*` |

## Prerequisites

- Master architecture document completed
- Tenant model and tier definitions established
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Define RTO/RPO Objectives

- Define Recovery Time Objective (RTO) per tier
- Define Recovery Point Objective (RPO) per tier
- Map objectives to SLA commitments
- Document tier-specific recovery priorities

### Step 2: Design Backup Strategy

- Define backup types per tier (full, incremental, CDC)
- Configure backup frequency and retention
- Design storage locations and encryption
- Plan backup verification procedures

### Step 3: Design Cross-Region Failover

- Define failover architecture per component
- Configure failover triggers and thresholds
- Design failback procedures
- Document replication lag monitoring

**Soft Gate:** Steps 1-3 complete the core DR design. Present a summary of RTO/RPO objectives, backup strategy, and failover architecture. Ask for confirmation before proceeding to final documentation.

### Step 4: Create DR Plan Document

- Assemble comprehensive DR plan using template
- Define recovery procedures by phase
- Document communication plan
- Schedule DR testing calendar

### Quality Gates

- [ ] RTO/RPO objectives defined for all tiers
- [ ] Backup strategy covers all data types
- [ ] Failover procedures documented for all components
- [ ] Testing schedule established

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Disaster recovery required for production readiness
- **QG-I2** (Tenant Safety) - Tier-aware recovery ensures tenant SLA compliance

### Entry Gate
- QG-F1 (Foundation) must pass before DR planning
- Master architecture and tenant tier definitions must be complete

### Exit Gate
- DR plan document complete with `production-readiness.md` checklist items verified
- RTO/RPO objectives aligned with tier SLAs
- DR testing schedule established and documented

## Outputs

- `{output_folder}/planning-artifacts/disaster-recovery-plan.md`

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-create-master-architecture` | Context | Master architecture defines infrastructure for DR planning |
| `bmad-bam-tenant-data-migration` | Related | Data migration procedures align with DR backup strategy |
| `bmad-bam-compliance-design` | Related | Compliance requirements inform DR retention policies |

## References

- Template: `{project-root}/_bmad/bam/data/templates/disaster-recovery-plan-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/disaster-recovery-patterns.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
