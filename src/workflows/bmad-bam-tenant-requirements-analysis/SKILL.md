---
name: bmad-bam-tenant-requirements-analysis
displayName: Tenant Requirements Analysis
description: "Analyze tenant-aware requirements for multi-tenant SaaS platforms. Use when starting discovery phase for a new BAM project or when analyzing tenant personas and compliance requirements."
module: bam
tags: [discovery, tenant]
---

# Tenant Requirements Analysis

## Overview

This workflow extends BMM's discovery phase with multi-tenant considerations. It helps identify tenant personas, compliance requirements, scaling assumptions, and isolation needs specific to multi-tenant SaaS platforms.

## When to Use

- Analyzing tenant requirements for platform design
- Identifying tenant segmentation criteria
- Mapping tenant needs to platform capabilities

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new tenant requirements analysis | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify existing requirements analysis | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check requirements against BAM patterns | `steps/step-20-v-*` through `step-22-v-*` |

## Prerequisites

- BMM discovery phase completed (product brief, PRD)
- Understanding of target market segments
- **Config required:** `{tenant_model}` selection

## Outputs

- `tenant-requirements-analysis.md` in `{output_folder}/planning-artifacts/`
- Tenant persona definitions
- Compliance requirements matrix
- Scaling assumptions document

## Quality Gates

This workflow contributes to:
- **QG-F1** (Foundation) - Tenant requirements feed into master architecture
- **QG-M2** (Tenant Isolation) - Defines isolation requirements to be validated

### Entry Gate
- BMM discovery phase completed (product brief, PRD)
- Understanding of target market segments
- `{tenant_model}` configuration selected

### Exit Gate
- Tenant personas defined with tier mapping
- Compliance requirements matrix documented
- Scaling assumptions captured
- Isolation needs identified for downstream workflows

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-create-master-architecture` | Downstream | Uses outputs from this workflow to inform master architecture decisions |
| `bmad-bam-tenant-model-isolation` | Downstream | Implements isolation strategy identified in requirements analysis |
| `bmad-bam-tenant-onboarding-design` | Downstream | Designs provisioning flows for tenant personas identified here |

## References

- Knowledge: `multi-tenant-patterns.md`, `requirement-analysis-patterns.md`
- Template: `tenant-requirements-template.md`
- Checklist: None (discovery workflow)

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps. Assumes BMM discovery artifacts exist at standard paths.
