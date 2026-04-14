---
name: tenant-communication-design
displayName: Tenant Communication Design
description: Design tenant notification templates and communication workflows. Use when the user requests to 'design notifications' or 'create communication templates'.
module: bam
tags: [operations, communication, tenant-management]
---

# Tenant Communication Design

## Overview

This workflow designs a comprehensive tenant notification and communication system for a multi-tenant SaaS platform. It defines notification categories, designs tier-specific templates, configures delivery channels, and creates tenant preference management. Run after master architecture is defined to ensure communication strategy aligns with platform decisions.

Act as a Platform Architect specializing in customer communication and tenant experience for multi-tenant systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing notification system for the platform
- Creating communication templates per tenant tier
- Building preference management for tenant notifications
- Setting up multi-channel delivery (email, SMS, in-app, webhook)

## Modes

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new communication design from scratch | `steps/step-01-c-*` through `step-09-c-*` |
| **Edit** | Modify existing communication design | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against communication completeness criteria | `steps/step-20-v-*` through `step-22-v-*` |

## Prerequisites

- Master architecture document completed
- Tenant model and tier definitions established
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Analyze Communication Needs

- Inventory communication categories
- Identify stakeholder groups
- Assess per-tier requirements
- Document regulatory requirements
- Analyze AI-specific communications

### Step 2: Design Notification Channels

- Define primary channels (Email, In-App, SMS, Webhook, etc.)
- Map channels to message types
- Design channel architecture
- Define delivery SLAs
- Plan multi-channel orchestration

### Step 3: Create Message Templates

- Define template categories
- Design template structure
- Establish variable standards
- Create core templates
- Define localization strategy

### Step 4: Implement Tenant Preferences

- Define preference categories
- Design preference hierarchy
- Specify configurable options
- Define non-overrideable settings
- Design contact management

**Soft Gate:** Steps 1-4 complete the core communication design. Present a summary of communication needs, channels, templates, and preferences. Ask for confirmation before proceeding.

### Step 5: Establish Escalation Paths

- Define escalation triggers
- Design escalation levels
- Specify per-tier SLAs
- Design acknowledgement system
- Plan on-call integration

### Step 6: Design Incident Communication

- Define incident classification
- Design communication lifecycle
- Specify per-severity requirements
- Design status page integration
- Plan AI-specific incident types

### Step 7: Plan Feature Announcements

- Define announcement categories
- Design announcement timeline
- Specify deprecation protocol
- Plan tier-based rollouts
- Design breaking change communication

### Step 8: Validate Communication Compliance

- Identify applicable regulations
- Validate consent management
- Verify breach notification compliance
- Assess data residency compliance
- Validate audit trail requirements

### Step 9: Finalize Communication Playbook

- Compile playbook structure
- Create decision trees
- Define key metrics
- Document operational runbooks
- Generate final deliverables

### Quality Gates

- [ ] Communication needs analyzed
- [ ] Notification channels defined
- [ ] Message templates created
- [ ] Tenant preferences designed
- [ ] Escalation paths established
- [ ] Incident communication designed
- [ ] Feature announcements planned
- [ ] Compliance validated
- [ ] Playbook finalized

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Communication system required for production readiness
- **QG-I2** (Tenant Safety) - Tier-aware communication ensures tenant experience

### Entry Gate
- QG-F1 (Foundation) must pass before communication design
- Master architecture and tenant tier definitions must be complete

### Exit Gate
- Communication design document complete with all notification types verified
- Templates aligned with tier capabilities
- Preference management system designed

## Outputs

- `{output_folder}/planning-artifacts/tenant-communication-design.md`

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-create-master-architecture` | Context | Master architecture defines platform for communication |
| `bmad-bam-ai-model-deprecation` | Uses | Uses communication templates for deprecation notices |
| `bmad-bam-tenant-onboarding-design` | Related | Onboarding uses welcome notifications |

## References

- Template: `bam/templates/tenant-communication-design-template.md`
- Knowledge: `bam/knowledge/multi-tenant-patterns.md`
- Checklist: `bam/checklists/production-readiness.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
