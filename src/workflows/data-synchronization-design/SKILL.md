---
name: data-synchronization-design
displayName: Data Synchronization Design
description: Design data synchronization patterns for multi-tenant systems. Use when the user requests to 'design data sync' or 'configure replication patterns'.
module: bam
tags: [data, integration]
---

# Data Synchronization Design

## Overview

This workflow designs data synchronization patterns for multi-tenant systems, ensuring consistent data replication while maintaining tenant isolation. It covers sync patterns, conflict resolution, tenant isolation in sync, and monitoring strategies.

Act as a Data Architect designing multi-tenant synchronization patterns.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing data replication for multi-tenant systems
- Configuring cross-region synchronization
- Setting up tenant data isolation in sync
- Implementing conflict resolution strategies

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Sync Patterns

Define synchronization patterns:

| Pattern | Use Case | Consistency |
|---------|----------|-------------|
| Event Sourcing | Audit-critical data | Eventual |
| CDC (Change Data Capture) | Database replication | Near real-time |
| Saga Pattern | Distributed transactions | Eventual |
| Two-Phase Commit | Critical transactions | Strong |

### Step 2: Conflict Resolution

Design conflict resolution strategies:

1. Last-write-wins (timestamp-based)
2. Merge strategies for complex objects
3. Version vector conflict detection
4. Manual resolution workflows
5. Tenant-specific resolution rules

### Step 3: Tenant Isolation

Ensure tenant isolation in synchronization:

- Tenant-scoped change streams
- Isolated sync queues per tenant
- Cross-tenant sync prevention
- Tenant-aware idempotency keys

**Soft Gate:** Steps 1-3 complete the sync pattern design. Present a summary of patterns and isolation mechanisms. Ask for confirmation before proceeding to monitoring.

### Step 4: Monitoring

Configure sync monitoring:

- Sync lag metrics
- Conflict rate tracking
- Data consistency verification
- Tenant-level sync health dashboards
- Alert configuration for sync failures

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-I2** | Contributes | Tenant safety in data synchronization |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must be defined
- **Exit Gate:** QG-I2 (Tenant Safety) - Sync must maintain tenant isolation

### Verification Checklist

- [ ] Sync patterns documented
- [ ] Conflict resolution strategies defined
- [ ] Tenant isolation in sync verified
- [ ] Monitoring configuration specified
- [ ] Recovery procedures documented

## Output

- `{output_folder}/planning-artifacts/data/data-synchronization-design.md`
- Sync pattern matrix
- Conflict resolution flowchart

## References

- Template: `{project-root}/_bmad/bam/data/templates/data-template.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
