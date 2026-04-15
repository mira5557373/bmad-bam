# Model Validation

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
| **Create** | Execute new model validation | `steps/step-01-c-*` |
| **Edit** | Modify existing validation results | `steps/step-10-e-*` |
| **Validate** | Check against QG-AI1 criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-model-quality-validation.md` - Validate model quality metrics
- `step-02-c-tenant-rollout-planning.md` - Plan tenant-specific rollout
- `step-03-c-rollback-testing.md` - Test model rollback procedures
- `step-04-c-monitoring-configuration.md` - Configure model monitoring

### Edit Mode
Load the existing validation artifacts, then follow:
- `step-10-e-load-existing.md` - Load existing validation report
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing artifacts, then follow:
- `step-20-v-load-artifact.md` - Load validation report
- `step-21-v-validate.md` - Run QG-AI1 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-aware rollout
   - Use `{ai_runtime}` for AI infrastructure
   - Use `{output_folder}` for artifact output location

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- Model artifacts available
- Evaluation dataset prepared
- **Required gates passed:** None (entry workflow for AI releases)

---

## Quality Gates

### Entry Gate
- Model artifacts available for validation

### Exit Gate: QG-AI1 (AI Model Gate)
This workflow produces artifacts that must pass QG-AI1 validation:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `model_quality_verified` | Model meets quality thresholds | Evaluation results |
| `rollout_plan_defined` | Tenant rollout planned | Rollout document |
| `rollback_tested` | Rollback procedure verified | Rollback results |
| `monitoring_configured` | Model monitoring active | Monitoring config |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-AI1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Quality Gates:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/model-validation-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/model-rollout-plan-template.md`
