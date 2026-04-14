# GDPR Consent Management

**Goal:** Design the GDPR consent management framework including purpose specification, consent collection, preference management, and audit trail generation.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation

**Step Naming Convention:** `step-NN-mode-description.md`
- `01-09`: Create mode (`step-0N-c-*`)
- `10-19`: Edit mode (`step-1N-e-*`)
- `20-29`: Validate mode (`step-2N-v-*`)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Design new consent management framework | `steps/step-01-c-*` |
| **Edit** | Update consent management requirements | `steps/step-10-e-*` |
| **Validate** | Check against GDPR consent checklist | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow steps with prefix `step-0X-c-` sequentially (01 through 04).

### Edit Mode
Load the existing gdpr-consent-management-spec.md, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing gdpr-consent-management-spec.md, then follow `step-2X-v-` (20 through 22).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml`
2. **Load BAM config** and resolve tenant model
3. **Load project context** -- Search for `**/project-context.md`
4. **Web Research Required** for current GDPR guidance
5. **EXECUTION** Read fully and follow: `./steps/step-01-c-define-purposes.md`

---

## Prerequisites

- **Required artifacts:** Master architecture document with tenant model
- **Required gates passed:** QG-F1 (Foundation Gate)
- **Config required:** `{tenant_model}`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `compliance`
- **Compliance:** Load from `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Templates:** `{project-root}/_bmad/bam/templates/gdpr-consent-template.md`
