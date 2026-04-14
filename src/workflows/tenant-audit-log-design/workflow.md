# Tenant Audit Log Design

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
| **Create** | Generate new audit log design from scratch | `steps/` |
| **Edit** | Load existing audit design and apply targeted modifications | `steps/` |
| **Validate** | Check existing audit design against quality criteria | `steps/` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially (step-01-c through step-04-c).

### Edit Mode
Load the existing output artifact, then follow `steps/` for targeted modifications (step-10-e through step-11-e).

### Validate Mode
Load the existing output artifact, then follow `steps/` for validation against quality criteria (step-20-v through step-22-v).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{output_folder}` for artifact output location

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- Master architecture document
- Module architecture documents (if available)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Tenant Models:** Load from `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Compliance Frameworks:** Load from `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Quality Gates:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/tenant-audit-log-design-template.md`
