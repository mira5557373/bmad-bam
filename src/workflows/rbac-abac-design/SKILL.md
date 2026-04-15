---
name: rbac-abac-design
displayName: RBAC/ABAC Design
description: Design role-based and attribute-based access control for multi-tenant platforms. Use when the user requests to 'design access control' or 'implement RBAC/ABAC'.
module: bam
tags: [security, access-control]
---

# RBAC/ABAC Design

## Overview

This workflow defines the role-based access control (RBAC) and attribute-based access control (ABAC) architecture for multi-tenant AI platforms. It produces the access control design that governs all authorization decisions across tenants. Run after tenant-model-isolation, before production deployment.

Act as a Security Architect specializing in access control systems and identity management for multi-tenant AI platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing role-based access control for multi-tenant platforms
- Implementing attribute-based access control policies
- Establishing tenant-scoped authorization
- Configuring per-tenant permission hierarchies

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new access control architecture | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing access control design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against security criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Permission Model Design

Design the foundational permission model:
- Permission taxonomy and naming conventions
- Resource-action mappings
- Permission grouping strategies
- Cross-tenant permission boundaries

### Step 2: Role Hierarchy Design

Design the role-based access control structure:
- Platform roles vs tenant roles
- Role inheritance hierarchies
- Role assignment rules
- Separation of duties enforcement

### Step 3: Attribute Policies

Design attribute-based access control policies:
- Attribute definitions and sources
- Policy decision point architecture
- Condition evaluation engine
- Dynamic permission resolution

### Step 4: Tenant Scoping

Design tenant-aware access control:
- Tenant isolation in authorization
- Cross-tenant access patterns
- Tenant admin capabilities
- Audit trail requirements

### Quality Gates

- [ ] Permission model defined with taxonomy
- [ ] Role hierarchy documented
- [ ] ABAC policies specified
- [ ] Tenant scoping verified
- [ ] Cross-tenant isolation confirmed

## Quality Gates

This workflow contributes to:
- **QG-S3** (Security Baseline) - Validates access control fundamentals
- **QG-M2** (Tenant Isolation) - Provides foundation for tenant authorization boundaries

### Entry Gate
- QG-F1 (Foundation) must pass before starting
- Tenant model isolation must be complete

### Exit Gate
- QG-S3 checklist items from security checklists verified
- Access control architecture documented
- Tenant scoping validated

## Output

- `{output_folder}/planning-artifacts/architecture/rbac-abac-design.md`
- `{output_folder}/planning-artifacts/architecture/permission-model.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/rbac-abac-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-security-continuous.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
