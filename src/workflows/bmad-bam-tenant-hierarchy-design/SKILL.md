---
name: bmad-bam-tenant-hierarchy-design
displayName: Tenant Hierarchy Design
description: Design enterprise multi-BU/department tenant structure with permission inheritance and billing rollup. Use when the user requests to 'design tenant hierarchy' or 'plan multi-level tenant structure'.
module: bam
tags: [tenant, enterprise]
---

# Tenant Hierarchy Design

## Overview

This workflow designs the enterprise multi-business-unit and department tenant hierarchy structure. It covers parent-child tenant relationships, permission inheritance models, billing aggregation, resource quotas at each level, and cross-BU isolation boundaries. Essential for enterprise customers with complex organizational structures.

Act as a Platform Architect designing scalable enterprise tenant hierarchies.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing enterprise multi-BU/department tenant hierarchies
- Creating permission inheritance models across organizational levels
- Building billing rollup and cost allocation systems
- Establishing quota distribution across tenant hierarchy

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Hierarchy Definition

Define the organizational hierarchy structure:

1. Root tenant (enterprise account) attributes
2. Business Unit (BU) level tenant creation
3. Department level sub-tenant creation
4. Team/Project level leaf tenants
5. Maximum nesting depth constraints
6. Cross-hierarchy relationships (shared services)

### Step 2: Permission Inheritance

Design the permission model:

| Level | Inherits From | Can Override | Scope |
|-------|---------------|--------------|-------|
| Root | N/A | N/A | Full enterprise |
| BU | Root | Yes (restrict only) | Business unit |
| Department | BU | Yes (restrict only) | Department |
| Team | Department | Yes (restrict only) | Team |

**Soft Gate:** Steps 1-2 complete the hierarchy and permission design. Present a summary and ask for confirmation before proceeding to billing rollup design.

### Step 3: Billing Rollup

Design cost aggregation across hierarchy:

- Charge-back models (direct, allocated, hybrid)
- Cost center mapping
- Budget enforcement at each level
- Usage reporting aggregation
- Invoice consolidation options

### Step 4: Quota Inheritance

Define resource quota distribution:

- Quota pool allocation from parent to children
- Hard vs soft limits at each level
- Burst capacity sharing rules
- Quota rebalancing procedures

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation across hierarchy levels |
| **QG-I2** | Contributes | Cross-tenant safety in hierarchy |
| **QG-P1** | Contributes | Production-ready hierarchy management |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must be defined
- **Exit Gate:** QG-M2 (Tenant Isolation) - Hierarchy must maintain tenant boundaries

### Verification Checklist

- [ ] Hierarchy levels clearly defined
- [ ] Permission inheritance model documented
- [ ] Billing rollup logic specified
- [ ] Quota distribution rules established
- [ ] Cross-hierarchy isolation verified

## Output

- `{output_folder}/planning-artifacts/architecture/tenant-hierarchy-design.md`
- Hierarchy structure diagram
- Permission inheritance matrix
- Billing rollup configuration

## References

- Template: `{project-root}/_bmad/bam/data/templates/tenant-lifecycle-template.md`, `{project-root}/_bmad/bam/data/templates/tenant-tier-matrix.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/rls-best-practices.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
