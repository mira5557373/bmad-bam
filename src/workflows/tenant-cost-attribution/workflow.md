# Tenant Cost Attribution

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
| **Create** | Generate new cost attribution design from scratch | `steps/` |
| **Edit** | Load existing design and apply targeted modifications | `steps/` |
| **Validate** | Check existing design against quality criteria | `steps/` |

Default: **Create** mode.

---

## Activation

1. **Load BMM config** and resolve standard variables.
2. **Load BAM config** and resolve `{tenant_model}` and `{output_folder}`.
3. **Load project context** if available.
4. **EXECUTION** — Follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- Master architecture document
- Capacity planning design (recommended)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/tenant-cost-attribution-template.md`
