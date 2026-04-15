# Tenant Communication Design

**Goal:** Design the tenant communication system including notification types, templates, delivery channels, and preference management for the multi-tenant platform.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation
- You NEVER proceed to a step file if the current step file indicates the user must approve

**Step Naming Convention:** `step-NN-mode-description.md`
- `01-09`: Create mode (`step-0N-c-*`)
- `10-19`: Edit mode (`step-1N-e-*`)
- `20-29`: Validate mode (`step-2N-v-*`)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Design new communication system | `steps/step-01-c-*` |
| **Edit** | Update communication requirements | `steps/step-10-e-*` |
| **Validate** | Check against communication completeness | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow steps with prefix `step-0X-c-` sequentially (01 through 09):
1. `step-01-c-analyze-communication-needs.md` - Identify communication requirements
2. `step-02-c-design-notification-channels.md` - Define communication channels
3. `step-03-c-create-message-templates.md` - Design reusable templates
4. `step-04-c-implement-tenant-preferences.md` - Design preference management
5. `step-05-c-establish-escalation-paths.md` - Define escalation procedures
6. `step-06-c-design-incident-communication.md` - Incident notification workflow
7. `step-07-c-plan-feature-announcements.md` - Feature rollout communications
8. `step-08-c-validate-communication-compliance.md` - Ensure regulatory compliance
9. `step-09-c-finalize-communication-playbook.md` - Complete communication guide

### Edit Mode
Load the existing communication design, then follow `step-1X-e-` (10 through 11).
*(Edit mode steps to be added when needed)*

### Validate Mode
Load the existing communication design, then follow `step-2X-v-` (20 through 22).
*(Validate mode steps to be added when needed)*

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific communication considerations
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** — Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Web Research Optional**
   Web search can help find current notification best practices.
   Search queries: "SaaS notification system design {date}", "multi-tenant communication patterns {date}"

5. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-analyze-communication-needs.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document
- **Required gates passed:** QG-F1 (Foundation Gate)
- **Config required:** `{tenant_model}`

---

## Quality Gates

### Entry Gate
- QG-F1 (Foundation Gate) must pass before entering this workflow

### Exit Gate: QG-COM1 (Communication Gate)
This workflow produces artifacts that satisfy QG-COM1. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `notification_types_defined` | Complete notification type catalog | All categories documented |
| `templates_designed` | Templates for all tier/type combinations | Template library complete |
| `channels_configured` | Delivery channels with routing logic | Channel configuration documented |
| `preferences_designed` | Tenant preference management system | Preference system documented |
| `compliance_verified` | Communication meets regulatory requirements | Compliance checklist passed |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

### Contributes to: QG-P1 (Production Readiness)
This workflow contributes to QG-P1 by establishing tenant communication capabilities:

| QG-P1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `tenant-communication` | Complete notification system design |
| `tier-differentiation` | Tier-specific templates and channels |
| `compliance` | GDPR/CAN-SPAM compliant communication |
| `preference-management` | Tenant opt-in/opt-out capabilities |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `tenant-isolation`
- **Templates:** `{project-root}/_bmad/bam/data/templates/tenant-communication-design-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`
