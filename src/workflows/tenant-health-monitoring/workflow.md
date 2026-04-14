# Tenant Health Monitoring

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
| **Create** | Generate new health monitoring design | `steps/step-01-c-*` |
| **Edit** | Modify existing health monitoring design | `steps/step-10-e-*` |
| **Validate** | Check health monitoring design against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-sli-definition.md` - Define per-tenant SLIs and SLOs
- `step-02-c-health-scoring.md` - Design tenant health scoring algorithms
- `step-03-c-dashboards.md` - Design tenant-specific health dashboards
- `step-04-c-alerting.md` - Design tenant-aware alerting and monitoring
- `step-05-c-assembly.md` - Combine into tenant-health-monitoring-design.md

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing health monitoring design
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load health monitoring design
- `step-21-v-validate.md` - Run validation checks against QG-M2
- `step-22-v-report.md` - Generate validation report

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
  - Tenant-aware observability design
  - Tenant isolation matrix
  - `project-context.md` (if exists)
- **Required gates passed:** QG-F1 (Foundation) must pass

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
