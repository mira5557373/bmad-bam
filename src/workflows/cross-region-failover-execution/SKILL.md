---
name: cross-region-failover-execution
displayName: Cross-Region Failover Execution
description: Execute cross-region failover procedures during DR events. Use when the user requests to 'execute failover' or 'initiate DR procedures'.
module: bam
tags: [implementation, disaster-recovery, failover, operations]
---

# Cross-Region Failover Execution

## Overview

This workflow executes cross-region failover procedures during disaster recovery events for a multi-tenant SaaS platform. It provides step-by-step guidance for pre-failover validation, failover execution, post-failover verification, and documentation of lessons learned. Use during actual DR events or DR testing exercises.

Act as a Platform Operations Engineer specializing in disaster recovery execution and incident management for multi-tenant systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Executing planned DR failover tests
- Responding to actual disaster events requiring failover
- Validating failover procedures after DR plan updates
- Documenting failover execution for compliance

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Execute new failover procedure | `steps/step-01-c-*` through `step-04-c-*` |
| **Edit** | Modify failover execution plan | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Verify failover execution completeness | `steps/step-20-v-*` through `step-22-v-*` |

## Prerequisites

- Disaster recovery plan completed
- Failover architecture documented
- Infrastructure ready for failover
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Assess Failover Readiness

- Verify pre-failover health checks
- Confirm replication status
- Validate target region availability
- Document current system state

### Step 2: Execute Failover

- Execute failover procedures per DR plan
- Monitor failover progress
- Handle failover exceptions
- Track completion milestones

### Step 3: Validate Failover

- Execute post-failover health checks
- Verify service availability
- Validate data integrity
- Confirm tenant access

**Soft Gate:** Steps 1-3 complete the failover execution. Present a summary of failover status, validation results, and any exceptions. Ask for confirmation before proceeding to documentation.

### Step 4: Document Execution

- Document execution timeline
- Record exceptions and resolutions
- Capture lessons learned
- Update DR plan with improvements

### Quality Gates

- [ ] Pre-failover checks completed
- [ ] Failover executed successfully
- [ ] Post-failover validation passed
- [ ] Documentation complete

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - DR execution capability required for production readiness
- **QG-DR1** (Disaster Recovery) - Validates DR procedures through actual execution

### Entry Gate
- QG-F1 (Foundation) must pass before DR execution
- DR plan and failover architecture must be complete

### Exit Gate
- Failover execution documented with `production-readiness.md` checklist items verified
- All services restored and validated
- Lessons learned captured and DR plan updated

## Outputs

- `{output_folder}/planning-artifacts/failover-execution-report.md`

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-disaster-recovery-design` | Context | DR design provides failover procedures |
| `bmad-bam-tenant-aware-observability` | Related | Observability enables failover monitoring |
| `bmad-bam-sla-contract-design` | Related | SLA commitments guide failover priorities |

## References

- Template: `bam/templates/failover-execution-template.md`
- Knowledge: `bam/knowledge/disaster-recovery-patterns.md`
- Knowledge: `bam/knowledge/multi-tenant-patterns.md`
- Checklist: `bam/checklists/production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
