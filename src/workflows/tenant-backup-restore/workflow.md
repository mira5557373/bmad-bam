# Tenant Backup and Restore

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
| **Create** | Generate new backup/restore design | `steps/step-01-c-*` |
| **Edit** | Modify existing backup/restore design | `steps/step-10-e-*` |
| **Validate** | Check backup/restore design against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-define-backup-strategy.md` - Define backup isolation per tenant
- `step-02-c-design-restore-procedures.md` - Design point-in-time recovery procedures
- `step-03-c-design-verification.md` - Design restore verification procedures
- `step-04-c-backup-scheduling.md` - Design backup scheduling and retention
- `step-05-c-assembly.md` - Combine into tenant-backup-design.md

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing backup/restore design
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load backup/restore design
- `step-21-v-validate.md` - Run validation checks against QG-M2
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{ai_runtime}` for agent runtime context

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- **Required artifacts:**
  - Tenant isolation matrix
  - Disaster recovery design (recommended)
  - `project-context.md` (if exists)
- **Required gates passed:** QG-F1 (Foundation) must pass

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
