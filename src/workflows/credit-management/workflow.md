# Credit Management

---

## When to Use This Workflow

**Use when:**
- Designing credit management for a multi-tenant platform
- No credit management design exists
- Adding new credit types or programs
- Implementing prepaid balance systems

**Do NOT use when:**
- Credit management design already exists (use Edit mode)
- Designing refund processing (use `refund-processing` workflow)
- Foundation is not complete (complete `create-master-architecture` first)

**Prerequisites:**
- `master-architecture.md` with billing system defined
- Invoice generation design completed
- Credit program requirements documented

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

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/credit-management-template.md`
