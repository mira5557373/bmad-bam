---
name: tenant-suspension-design
displayName: Tenant Suspension Design
description: Design tenant suspension and reactivation lifecycle with grace periods and notification sequences. Use when the user requests to 'design tenant suspension' or 'plan tenant lifecycle states'.
module: bam
tags: [tenant]
---

# Tenant Suspension Design

## Overview

This workflow designs the tenant suspension and reactivation lifecycle, covering state transitions from active to suspended to either reactivated or archived. It addresses suspension triggers (billing failure, policy violation, admin action), grace periods, access revocation procedures, and notification sequences throughout the lifecycle.

Act as a Platform Architect designing reliable tenant lifecycle state management.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant suspension procedures
- Creating payment failure handling
- Building account reactivation workflows

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Define State Machine

Define the tenant lifecycle state machine:

```
ACTIVE <---> SUSPENDED ---> REACTIVATED
                |
                v
            ARCHIVED
```

States and transitions:
- ACTIVE: Tenant has full access to platform
- SUSPENDED: Tenant access revoked, data preserved
- REACTIVATED: Tenant restored to ACTIVE after suspension
- ARCHIVED: Tenant data archived, account permanently deactivated

### Step 2: Suspension Triggers

Define suspension triggers and their handling:

| Trigger | Detection | Grace Period | Auto-Suspend |
|---------|-----------|--------------|--------------|
| Billing Failure | Payment webhook failure | 7 days | Yes |
| Policy Violation | Manual review or automated detection | 0-3 days | Depends |
| Admin Action | Manual suspension request | Immediate | Yes |
| Security Incident | Automated threat detection | Immediate | Yes |
| Inactivity | No API calls for N days | 30 days notice | Yes |

### Step 3: Grace Period Design

Design grace period handling:
- Warning notifications at -7, -3, -1 days
- Feature degradation during grace period
- Payment retry logic for billing failures
- Appeal process for policy violations

**Soft Gate:** Steps 1-3 complete the state machine and trigger design. Present a summary of states and triggers. Ask for confirmation before proceeding to access revocation and notifications.

### Step 4: Access Revocation

Design access revocation procedures:
- API access revocation (immediate)
- UI access revocation (session invalidation)
- Webhook delivery suspension
- Agent execution termination
- Data access (read-only vs fully revoked)

### Step 5: Notification Sequence

Design notification sequences for each trigger:
- Pre-suspension warnings
- Suspension notification
- Reactivation instructions
- Archive notification
- Data export availability

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation during suspension states |
| **QG-I2** | Contributes | Tenant safety during state transitions |
| **QG-P1** | Contributes | Production-ready suspension procedures |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tenant model must be defined
- **Exit Gate:** QG-I2 (Tenant Safety) - Suspension must preserve tenant data integrity

### Verification Checklist

- [ ] State machine fully defined
- [ ] All suspension triggers documented
- [ ] Grace periods specified per trigger
- [ ] Access revocation procedures complete
- [ ] Notification sequences defined

## Output

- `{output_folder}/planning-artifacts/operations/tenant-suspension-runbook.md`
- State machine diagram
- Notification template catalog

## References

- Template: `bam/templates/tenant-lifecycle-template.md`
- Multi-Tenant Patterns: `bam/knowledge/multi-tenant-patterns.md`
- Event-Driven Patterns: `bam/knowledge/event-driven-patterns.md`
