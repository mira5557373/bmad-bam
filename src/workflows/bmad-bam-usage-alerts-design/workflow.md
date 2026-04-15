# Usage Alerts Design

---

## When to Use This Workflow

**Use when:**
- Designing usage alerting for a multi-tenant platform
- No usage alerts design exists
- Adding new alert types or channels
- Implementing proactive cost notifications

**Do NOT use when:**
- Usage alerts design already exists (use Edit mode)
- Designing usage metering (use `usage-metering-design` workflow)
- Foundation is not complete (complete `create-master-architecture` first)

**Prerequisites:**
- `master-architecture.md` with billing system defined
- Usage metering design completed
- Notification system requirements documented

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution.

**Step Naming Convention:** `step-NN-mode-description.md`
- `01-09`: Create mode (`step-0N-c-*`)
- `10-19`: Edit mode (`step-1N-e-*`)
- `20-29`: Validate mode (`step-2N-v-*`)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Generate new artifact from scratch | `steps/` |
| **Edit** | Load existing artifact and apply targeted modifications | `steps/` |
| **Validate** | Check existing artifact against quality criteria | `steps/` |

Default: **Create** mode. In headless mode, always use Create.

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml`
2. **Load BAM config** and resolve `{tenant_model}`, `{ai_runtime}`
3. **Load project context** — Search for `**/project-context.md`
4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/usage-alerts-template.md`
