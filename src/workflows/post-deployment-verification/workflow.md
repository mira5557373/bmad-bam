# Post-Deployment Verification

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
| **Create** | Execute new post-deployment verification | `steps/step-01-c-*` |
| **Edit** | Modify existing verification checklist | `steps/step-10-e-*` |
| **Validate** | Check verification against QG-PD1 criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-smoke-test-execution.md` - Execute post-deployment smoke tests
- `step-02-c-monitoring-activation.md` - Verify monitoring and alerting activation
- `step-03-c-tenant-health-checks.md` - Run per-tenant health verification
- `step-04-c-rollback-readiness.md` - Verify rollback capability and procedures

### Edit Mode
Load the existing verification artifacts, then follow:
- `step-10-e-load-existing.md` - Load existing verification report
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing verification artifacts, then follow:
- `step-20-v-load-artifact.md` - Load verification report
- `step-21-v-validate.md` - Run QG-PD1 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific health checks
   - Use `{ai_runtime}` for AI service health validation
   - Use `{output_folder}` for artifact output location

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- Deployment pipeline completed
- Access to monitoring systems (Prometheus, Grafana, etc.)
- **Required gates passed:** Deployment pipeline success

---

## Quality Gates

### Entry Gate
- Deployment pipeline completed successfully

### Exit Gate: QG-PD1 (Post-Deployment Gate)
This workflow produces artifacts that must pass QG-PD1 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `smoke_tests_passing` | All smoke tests pass | Critical path coverage verified |
| `monitoring_active` | Monitoring dashboards operational | Dashboards showing live data |
| `alerting_verified` | Alert rules firing correctly | Test alerts received |
| `tenant_health_green` | All tenants healthy | Per-tenant health checks pass |
| `rollback_ready` | Rollback procedure tested | Rollback can execute in <15min |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-PD1`

### Contributes to Downstream Gates
- **QG-P1** (Production Readiness) - Post-deployment verification required

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Quality Gates:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/post-deployment-checklist-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/rollback-procedure-template.md`
