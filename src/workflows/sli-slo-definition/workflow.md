# SLI/SLO Definition

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
| **Create** | Generate new SLI/SLO Definition from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing SLI/SLO Definition | `steps/step-10-e-*` |
| **Validate** | Check SLI/SLO Definition against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-sli-identification.md` - Identify key reliability indicators
- `step-02-c-slo-target-setting.md` - Set SLO targets and measurement windows
- `step-03-c-error-budget-design.md` - Design error budget policies
- `step-04-c-tenant-tier-slas.md` - Define tenant-tier-specific SLAs

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing sli-slo-definition.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load SLI/SLO artifacts
- `step-21-v-validate.md` - Run QG-P1 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{ai_runtime}` for agent runtime context

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- **Required artifacts:**
  - `master-architecture.md` (from create-master-architecture) - provides base architecture
  - `observability-design.md` (from tenant-aware-observability) - provides metrics infrastructure
  - `project-context.md` (if exists)
- **Required gates passed:** QG-F1 (Foundation)

---

## Quality Gates

### Entry Gate
- QG-F1 (Foundation) must pass
- Observability infrastructure designed

### Exit Gate: QG-P1 (Production Readiness)
This workflow contributes to QG-P1. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `slis_defined` | SLIs defined for critical services | SLI specification complete |
| `slos_configured` | SLO targets with windows | Target and window documented |
| `error_budget_active` | Error budget policies | Consumption and exhaustion rules |
| `tier_slas_aligned` | Tenant-tier SLAs match SLOs | SLA-SLO mapping verified |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv -> filter: QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/sli-slo-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/error-budget-template.md`
